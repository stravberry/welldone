import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import useEventTracking from '@/hooks/useEventTracking';
import { useQuotesManagement } from '@/hooks/useQuotesManagement';
import { FormData } from '../types';

export const useQuoteForm = (ref: React.RefObject<HTMLDivElement>) => {
  const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useEventTracking();
  const { createQuoteRequest } = useQuotesManagement();
  
  const serviceType = watch('serviceType');
  const participantsCount = watch('participantsCount');
  
  const getProgress = useCallback(() => (step / 3) * 100, [step]);

  const getServiceTypeLabel = useCallback((type: string) => {
    const labels: Record<string, string> = {
      'udt-operator': 'Uprawnienia UDT dla operatorów',
      'udt-conservator': 'Uprawnienia UDT dla konserwatorów',
      'sep': 'Uprawnienia SEP',
      'forklifts': 'Wózki unoszące'
    };
    return labels[type] || type;
  }, []);

  const getParticipantsLabel = useCallback((count: string) => {
    const labels: Record<string, string> = {
      '1': '1 osoba',
      '2-5': '2-5 osób',
      '6-10': '6-10 osób',
      '11-15': '11-15 osób',
      '15+': 'Powyżej 15 pracowników'
    };
    return labels[count] || count;
  }, []);

  const formatQuoteMessage = useCallback((data: FormData) => {
    let message = `=== ZAPYTANIE O WYCENĘ SZKOLENIA ===\n\n`;
    
    message += `Rodzaj usługi: ${getServiceTypeLabel(data.serviceType!)}\n`;
    
    if (data.udtOperatorType) {
      message += `Typ maszyny/pojazdu (UDT Operator): ${data.udtOperatorType}\n`;
    }
    if (data.udtConservatorType) {
      message += `Typ maszyny/pojazdu (UDT Konserwator): ${data.udtConservatorType}\n`;
    }
    if (data.sepType) {
      message += `Rodzaj uprawnień SEP: ${data.sepType}\n`;
    }
    
    message += `Liczba uczestników: ${getParticipantsLabel(data.participantsCount!)}\n`;
    
    if (data.additionalInfo) {
      message += `\nDodatkowe informacje:\n${data.additionalInfo}\n`;
    }
    
    message += `\n=== KONIEC ZAPYTANIA ===`;
    
    return message;
  }, [getServiceTypeLabel, getParticipantsLabel]);

  const handleServiceTypeChange = useCallback((value: string) => {
    setValue('serviceType', value);
    setTimeout(() => {
      setFormData({ serviceType: value });
      setStep(2);
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [setValue, ref]);
  
  const onSubmit = useCallback(async (data: FormData) => {
    if (step < 3) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
      ref.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsSubmitting(true);
      const finalData = { ...formData, ...data };
      
      try {
        await createQuoteRequest({
          name: finalData.name!,
          email: finalData.email!,
          phone: finalData.phone,
          company: finalData.company,
          service_type: finalData.serviceType!,
          service_variant: finalData.udtOperatorType || finalData.udtConservatorType || finalData.sepType,
          participants_count: finalData.participantsCount!,
          additional_info: finalData.additionalInfo,
          status: 'new'
        });
      } catch (error) {
        console.error('Error saving to CRM:', error);
      }
      
      trackEvent({
        category: 'form',
        action: 'submit',
        label: 'quote-form-submission',
        value: 1,
        additionalData: {
          serviceType: finalData.serviceType,
          participantsCount: finalData.participantsCount,
          formName: 'quote-form',
          formLocation: window.location.pathname
        }
      });

      try {
        const emailData = {
          name: finalData.name,
          company: finalData.company,
          email: finalData.email,
          phone: finalData.phone,
          message: formatQuoteMessage(finalData),
          trainingType: getServiceTypeLabel(finalData.serviceType!),
          participants: getParticipantsLabel(finalData.participantsCount!),
          urgency: 'Wycena szkolenia',
          // Dodatkowe pola dla nowego systemu wycen
          serviceType: finalData.serviceType,
          serviceVariant: finalData.udtOperatorType || finalData.udtConservatorType || finalData.sepType
        };

        const { data: response, error } = await supabase.functions.invoke('send-contact-email', {
          body: emailData
        });

        if (error) {
          throw new Error(error.message || 'Błąd podczas wysyłania wiadomości');
        }

        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'success_sent_form',
            'form_type': 'quote_request',
            'service_type': finalData.serviceType
          });
        }
        
        toast.success("Formularz został wysłany! Wycena zostanie przesłana na Twój email w ciągu kilku minut.", {
          position: "top-center",
          duration: 5000,
        });
        
        reset();
        setStep(1);
        setFormData({});
        
      } catch (error: any) {
        console.error('=== BŁĄD WYSYŁANIA FORMULARZA WYCENY ===');
        console.error('Błąd:', error);
        
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
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [step, formData, ref, trackEvent, formatQuoteMessage, getServiceTypeLabel, getParticipantsLabel, reset, createQuoteRequest]);
  
  const goBack = useCallback(() => {
    if (step === 2) {
      setValue('serviceType', '');
    }
    setStep(step - 1);
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step, setValue, ref]);

  return {
    register,
    handleSubmit,
    control,
    watch,
    errors,
    setValue,
    step,
    formData,
    isSubmitting,
    serviceType,
    participantsCount,
    getProgress,
    handleServiceTypeChange,
    onSubmit,
    goBack
  };
};