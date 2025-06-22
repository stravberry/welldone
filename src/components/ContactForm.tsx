import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import useEventTracking from '@/hooks/useEventTracking';
import { supabase } from '@/integrations/supabase/client';

interface ContactFormProps {
  title?: string;
  subtitle?: string;
  initialMessage?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({
  title = "Skontaktuj się z nami",
  subtitle = "Wypełnij formularz, a nasz zespół skontaktuje się z Tobą najszybciej jak to możliwe.",
  initialMessage = ""
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm();
  const { trackEvent } = useEventTracking();

  useEffect(() => {
    if (initialMessage) {
      setValue('message', initialMessage);
    }
  }, [initialMessage, setValue]);

  const onSubmit = async (data: any) => {
    console.log('=== WYSYŁANIE FORMULARZA ===');
    console.log('Dane formularza:', data);

    try {
      trackEvent({
        category: 'form',
        action: 'submit',
        label: 'contact-form',
        value: 1,
        additionalData: {
          formName: 'contact-form',
          formLocation: window.location.pathname
        }
      });

      console.log('Wywołanie funkcji Edge send-contact-email...');
      const { data: response, error } = await supabase.functions.invoke('send-contact-email', {
        body: {
          name: data.name || '',
          company: data.company || '',
          email: data.email,
          phone: data.phone || '',
          message: data.message
        }
      });

      console.log('Odpowiedź z funkcji Edge:', { response, error });

      if (error) {
        console.error('Błąd z funkcji Edge:', error);
        throw new Error(error.message || 'Błąd podczas wysyłania wiadomości');
      }

      console.log('Formularz wysłany pomyślnie');
      toast.success("Twoja wiadomość została wysłana, skontaktujemy się z Tobą wkrótce", {
        position: "top-center",
        duration: 5000,
      });
      reset();

    } catch (error: any) {
      console.error('=== BŁĄD WYSYŁANIA FORMULARZA ===');
      console.error('Błąd:', error);
      console.error('Typ błędu:', error.constructor.name);
      console.error('Wiadomość:', error.message);

      let errorMessage = "Wystąpił błąd podczas wysyłania formularza.";
      
      if (error.message?.includes('fetch')) {
        errorMessage = "Błąd połączenia. Sprawdź internetowe połączenie i spróbuj ponownie.";
      } else if (error.message?.includes('Function not found')) {
        errorMessage = "Funkcja wysyłania nie została znaleziona. Skontaktuj się z administratorem.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage, {
        position: "top-center",
        duration: 5000,
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    trackEvent({
      category: 'form',
      action: 'input',
      label: `contact-form-${e.target.name}`,
      additionalData: {
        fieldName: e.target.name,
        formName: 'contact-form',
        page: window.location.pathname
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 md:p-8 transition-all duration-300 hover:shadow-lg">
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-6">{subtitle}</p>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input 
              id="name" 
              placeholder="Jan Kowalski" 
              {...register("name")} 
              onChange={handleInputChange} 
              className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company">Firma</Label>
            <Input 
              id="company" 
              placeholder="Nazwa firmy (opcjonalnie)" 
              {...register("company")} 
              onChange={handleInputChange} 
              className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Numer telefonu</Label>
          <Input 
            id="phone" 
            placeholder="+48 123 456 789" 
            {...register("phone")} 
            onChange={handleInputChange} 
            className="transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Adres e-mail *</Label>
          <Input 
            id="email" 
            type="email" 
            placeholder="jan.kowalski@firma.pl" 
            {...register("email", {
              required: "Adres e-mail jest wymagany",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Nieprawidłowy adres e-mail"
              }
            })} 
            className={`transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 ${errors.email ? "border-red-500" : ""}`} 
            onChange={handleInputChange} 
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="message">Wiadomość *</Label>
          <Textarea 
            id="message" 
            placeholder="Opisz czego potrzebujesz..." 
            rows={5} 
            {...register("message", {
              required: "Wiadomość jest wymagana"
            })} 
            className={`transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300 ${errors.message ? "border-red-500" : ""}`} 
            onChange={handleInputChange} 
          />
          {errors.message && <p className="text-red-500 text-sm">{errors.message.message as string}</p>}
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          onClick={() => trackEvent({
            category: 'button',
            action: 'click',
            label: 'submit-contact-form',
            additionalData: {
              buttonLocation: 'contact-form',
              page: window.location.pathname
            }
          })} 
          className="w-full transition-all duration-300 hover:scale-105 hover:shadow-lg bg-blue-500 hover:bg-blue-400 disabled:opacity-50"
        >
          {isSubmitting ? 'Wysyłanie...' : 'Wyślij wiadomość'}
        </Button>
        <p className="text-xs text-gray-500 text-center">
          * Pola wymagane
        </p>
      </form>
    </div>
  );
};

export default ContactForm;
