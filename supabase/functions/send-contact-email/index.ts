
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.11';
import { AdminNotificationEmail } from "./_templates/admin-notification-email.tsx";
import { ClientConfirmationEmail } from "./_templates/client-confirmation-email.tsx";

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

    console.log('Renderowanie szablonów email...');
    
    // Render email templates
    const adminEmailHtml = await renderAsync(
      React.createElement(AdminNotificationEmail, formData)
    );
    console.log('Szablon email dla administratora wyrenderowany, długość HTML:', adminEmailHtml.length);

    const clientEmailHtml = await renderAsync(
      React.createElement(ClientConfirmationEmail, {
        name: formData.name,
        company: formData.company
      })
    );
    console.log('Szablon email dla klienta wyrenderowany, długość HTML:', clientEmailHtml.length);

    console.log('Wysyłanie emaili przez Resend...');
    
    // Send email to admin (notification) - POPRAWIONY ADRES!
    console.log('Wysyłanie emaila do administratora na kontakt@well-done.pl...');
    const adminEmailResponse = await resend.emails.send({
      from: "Well-done.pl <noreply@well-done.pl>",
      to: ["kontakt@well-done.pl"], // ZMIENIONE Z wskopek.all@gmail.com
      subject: `🔔 Nowe zapytanie UDT od ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`,
      html: adminEmailHtml,
      reply_to: formData.email,
    });
    console.log("Email do administratora wysłany pomyślnie:", adminEmailResponse);
    console.log("Admin email ID:", adminEmailResponse.data?.id);
    
    if (adminEmailResponse.error) {
      console.error("Błąd wysyłania emaila do administratora:", adminEmailResponse.error);
    }

    // Send confirmation email to client
    console.log('Wysyłanie emaila potwierdzającego do klienta:', formData.email);
    const clientEmailResponse = await resend.emails.send({
      from: "Well-done.pl <noreply@well-done.pl>",
      to: [formData.email],
      subject: "✅ Potwierdzenie otrzymania zapytania - Well-done.pl",
      html: clientEmailHtml,
    });
    console.log("Email potwierdzający do klienta wysłany pomyślnie:", clientEmailResponse);
    console.log("Client email ID:", clientEmailResponse.data?.id);
    
    if (clientEmailResponse.error) {
      console.error("Błąd wysyłania emaila do klienta:", clientEmailResponse.error);
    }

    // Sprawdzenie czy oba emaile zostały wysłane pomyślnie
    const adminSuccess = adminEmailResponse.data?.id && !adminEmailResponse.error;
    const clientSuccess = clientEmailResponse.data?.id && !clientEmailResponse.error;
    
    console.log('Status wysyłania emaili:', {
      adminSuccess,
      clientSuccess,
      adminEmailId: adminEmailResponse.data?.id,
      clientEmailId: clientEmailResponse.data?.id
    });

    return new Response(JSON.stringify({ 
      success: true, 
      adminEmailId: adminEmailResponse.data?.id,
      clientEmailId: clientEmailResponse.data?.id,
      adminSuccess,
      clientSuccess,
      message: adminSuccess && clientSuccess 
        ? "Oba emaile wysłane pomyślnie" 
        : "Wysłano częściowo - sprawdź logi"
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
