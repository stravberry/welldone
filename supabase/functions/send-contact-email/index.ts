
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";
import React from 'npm:react@18.3.1';
import { renderAsync } from 'npm:@react-email/components@0.0.22';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.50.0';
import { AdminNotificationEmail } from "./_templates/admin-notification-email.tsx";
import { ClientConfirmationEmail } from "./_templates/client-confirmation-email.tsx";
import { QuoteEmail } from "./_templates/quote-email.tsx";
import { ClientQuoteEmail } from "./_templates/client-quote-email.tsx";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  // Dodatkowe pola dla szczegółów szkolenia
  trainingType?: string;
  participants?: string;
  location?: string;
  timeline?: string;
  urgency?: string;
  // Nowe pola dla systemu wycen
  serviceType?: string;
  serviceVariant?: string;
  estimatedPrice?: number;
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

    // Inicjalizacja Supabase dla pobierania cen
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

    // Parsowanie danych formularza
    const formData: ContactFormData = await req.json();
    console.log("Otrzymane dane formularza:", {
      name: formData.name,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      messageLength: formData.message?.length || 0,
      trainingType: formData.trainingType,
      participants: formData.participants,
      location: formData.location,
      timeline: formData.timeline,
      urgency: formData.urgency,
      serviceType: formData.serviceType,
      serviceVariant: formData.serviceVariant
    });

    // Pobierz ceny z bazy danych jeśli to zapytanie o wycenę
    let priceData = null;
    
    if (formData.serviceType) {
      try {
        console.log('Pobieranie pełnych danych cenowych dla:', formData.serviceType, formData.serviceVariant, formData.participants);
        
        // Pobierz usługę bazową
        const { data: service } = await supabase
          .from('services')
          .select('id, base_price, name')
          .eq('service_type', formData.serviceType)
          .single();

        let basePrice = service?.base_price || 0;
        let variantModifier = 0;
        let participantsMultiplier = 1;

        // Pobierz wariant jeśli istnieje
        if (formData.serviceVariant && service) {
          const { data: variant } = await supabase
            .from('service_variants')
            .select('price_modifier, name')
            .eq('variant_key', formData.serviceVariant)
            .single();

          if (variant) {
            variantModifier = variant.price_modifier || 0;
          }
        }

        // Pobierz mnożnik dla liczby uczestników
        if (formData.participants && service) {
          const { data: pricingTier } = await supabase
            .from('pricing_tiers')
            .select('price_multiplier, fixed_price')
            .eq('service_id', service.id)
            .eq('participant_range', formData.participants)
            .single();

          if (pricingTier) {
            if (pricingTier.fixed_price) {
              // Jeśli jest stała cena, użyj jej
              basePrice = pricingTier.fixed_price;
              variantModifier = 0; // Resetuj modyfikator wariantu dla stałej ceny
            } else {
              participantsMultiplier = pricingTier.price_multiplier || 1;
            }
          }
        }

        const finalPrice = (basePrice + variantModifier) * participantsMultiplier;

        priceData = {
          basePrice,
          variantModifier,
          participantsMultiplier,
          finalPrice,
          serviceName: service?.name || ''
        };

        console.log('Obliczone dane cenowe:', priceData);
      } catch (error) {
        console.error('Błąd pobierania cen:', error);
      }
    }

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
    
    // Sprawdź czy to zapytanie o wycenę
    const isQuoteRequest = formData.serviceType || formData.trainingType;
    
    let adminEmailHtml;
    
    if (isQuoteRequest) {
      // Użyj nowego szablonu dla zapytań o wycenę
      adminEmailHtml = await renderAsync(
        React.createElement(QuoteEmail, {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          trainingType: formData.trainingType || formData.serviceType || '',
          participants: formData.participants || '',
          serviceVariant: formData.serviceVariant,
          message: formData.message,
          estimatedPrice: priceData?.finalPrice,
          additionalInfo: formData.message
        })
      );
    } else {
      // Użyj standardowego szablonu
      adminEmailHtml = await renderAsync(
        React.createElement(AdminNotificationEmail, {
          name: formData.name,
          company: formData.company,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          trainingType: formData.trainingType,
          participants: formData.participants,
          location: formData.location,
          timeline: formData.timeline,
          urgency: formData.urgency
        })
      );
    }
    console.log('Szablon email dla administratora wyrenderowany, długość HTML:', adminEmailHtml.length);

    const clientEmailHtml = await renderAsync(
      React.createElement(ClientConfirmationEmail, {
        name: formData.name,
        company: formData.company,
        trainingType: formData.trainingType,
        participants: formData.participants,
        location: formData.location,
        timeline: formData.timeline,
        urgency: formData.urgency
      })
    );
    console.log('Szablon email dla klienta wyrenderowany, długość HTML:', clientEmailHtml.length);

    console.log('Wysyłanie emaili przez Resend...');
    
    // Send email to admin (notification)
    console.log('Wysyłanie emaila do administratora na kontakt@well-done.pl...');
    const subject = isQuoteRequest 
      ? `💰 Zapytanie o wycenę od ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`
      : `🔔 Nowe zapytanie UDT od ${formData.name}${formData.company ? ` - ${formData.company}` : ''}`;
      
    const adminEmailResponse = await resend.emails.send({
      from: "Well-done.pl <noreply@well-done.pl>",
      to: ["kontakt@well-done.pl"],
      subject: subject,
      html: adminEmailHtml,
      reply_to: formData.email,
    });
    console.log("Email do administratora wysłany pomyślnie:", adminEmailResponse);
    console.log("Admin email ID:", adminEmailResponse.data?.id);
    
    if (adminEmailResponse.error) {
      console.error("Błąd wysyłania emaila do administratora:", adminEmailResponse.error);
    }

    // Send confirmation email to client immediately
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

    // Jeśli to zapytanie o wycenę i mamy dane cenowe, wyślij email z wyceną po opóźnieniu
    let quoteEmailSuccess = true;
    if (isQuoteRequest && priceData) {
      console.log('Planowanie wysyłki emaila z wyceną za 60 sekund...');
      
      // Opóźnienie 60 sekund dla wrażenia ręcznego przygotowania wyceny
      setTimeout(async () => {
        try {
          console.log('Wysyłanie emaila z wyceną do klienta...');
          
          const quoteEmailHtml = await renderAsync(
            React.createElement(ClientQuoteEmail, {
              name: formData.name,
              company: formData.company,
              serviceType: formData.serviceType!,
              serviceVariant: formData.serviceVariant,
              participantsCount: formData.participants || '1',
              basePrice: priceData.basePrice,
              finalPrice: priceData.finalPrice,
              priceBreakdown: {
                basePrice: priceData.basePrice,
                variantModifier: priceData.variantModifier,
                participantsMultiplier: priceData.participantsMultiplier
              }
            })
          );

          const quoteEmailResponse = await resend.emails.send({
            from: "Well-done.pl <noreply@well-done.pl>",
            to: [formData.email],
            subject: `💰 Wycena szkolenia - ${priceData.serviceName}`,
            html: quoteEmailHtml,
          });

          console.log("Email z wyceną wysłany pomyślnie:", quoteEmailResponse);
          
          if (quoteEmailResponse.error) {
            console.error("Błąd wysyłania emaila z wyceną:", quoteEmailResponse.error);
          }
        } catch (error) {
          console.error("Błąd podczas opóźnionej wysyłki emaila z wyceną:", error);
        }
      }, 60000); // 60 sekund opóźnienia
    }

    // Sprawdzenie czy podstawowe emaile zostały wysłane pomyślnie
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
