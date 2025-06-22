
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.11';
import { ContactEmail } from "./_templates/contact-email.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log('=== FUNKCJA SEND-CONTACT-EMAIL WYWOŁANA ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', Object.fromEntries(req.headers.entries()));

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log('Obsługiwanie CORS preflight request');
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Sprawdzenie klucza API
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log('RESEND_API_KEY obecny:', !!resendApiKey);
    console.log('RESEND_API_KEY długość:', resendApiKey?.length || 0);
    console.log('RESEND_API_KEY początek:', resendApiKey?.substring(0, 10) + '...');

    if (!resendApiKey) {
      console.error('BRAK RESEND_API_KEY!');
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY nie jest skonfigurowany" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Inicjalizacja Resend
    const resend = new Resend(resendApiKey);
    console.log('Resend zainicjalizowany');

    // Parsowanie danych formularza
    const formData: ContactFormData = await req.json();
    console.log("Otrzymane dane formularza:", {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      messageLength: formData.message?.length || 0
    });

    // Walidacja danych
    if (!formData.name || !formData.email || !formData.message) {
      console.error('Brakujące wymagane pola:', { 
        name: !!formData.name,
        email: !!formData.email, 
        message: !!formData.message 
      });
      return new Response(
        JSON.stringify({ error: "Wymagane pola: name, email, message" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    console.log('Renderowanie szablonu email...');
    // Render the email template
    const html = await renderAsync(
      React.createElement(ContactEmail, formData)
    );
    console.log('Szablon email wyrenderowany, długość HTML:', html.length);

    console.log('Wysyłanie emaila przez Resend...');
    // Send the email
    const emailResponse = await resend.emails.send({
      from: "Well-done.pl <noreply@well-done.pl>",
      to: ["wskopek.all@gmail.com"],
      subject: `Nowe zapytanie UDT od ${formData.name} - ${formData.company}`,
      html: html,
      reply_to: formData.email,
    });

    console.log("Email wysłany pomyślnie:", emailResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      emailId: emailResponse.data?.id,
      message: "Email wysłany pomyślnie" 
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });

  } catch (error: any) {
    console.error("=== BŁĄD W FUNKCJI SEND-CONTACT-EMAIL ===");
    console.error("Typ błędu:", error.constructor.name);
    console.error("Wiadomość błędu:", error.message);
    console.error("Stack trace:", error.stack);
    console.error("Pełny obiekt błędu:", JSON.stringify(error, null, 2));

    let errorMessage = "Wystąpił nieoczekiwany błąd";
    let statusCode = 500;

    if (error.message?.includes('fetch')) {
      errorMessage = "Błąd połączenia z Resend API";
    } else if (error.message?.includes('Invalid API key')) {
      errorMessage = "Nieprawidłowy klucz API Resend";
    } else if (error.message?.includes('JSON')) {
      errorMessage = "Błąd parsowania danych JSON";
      statusCode = 400;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error.message,
        timestamp: new Date().toISOString()
      }),
      {
        status: statusCode,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
