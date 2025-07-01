
import React, { useState, useRef, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';
import { CheckCircle, ArrowRight, ArrowLeft, Mail } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import useEventTracking from '@/hooks/useEventTracking';

const EnhancedQuoteForm = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { register, handleSubmit, control, watch, reset, formState: { errors }, setValue } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { trackEvent } = useEventTracking();
  
  const serviceType = watch('serviceType');
  const participantsCount = watch('participantsCount');
  
  const getProgress = useCallback(() => (step / 3) * 100, [step]);

  const getServiceTypeLabel = useCallback((type: string) => {
    const labels = {
      'udt-operator': 'Uprawnienia UDT dla operatorów',
      'udt-conservator': 'Uprawnienia UDT dla konserwatorów',
      'sep': 'Uprawnienia SEP',
      'forklifts': 'Wózki unoszące'
    };
    return labels[type] || type;
  }, []);

  const getParticipantsLabel = useCallback((count: string) => {
    const labels = {
      '1': '1 osoba',
      '2-5': '2-5 osób',
      '6-10': '6-10 osób',
      '11-15': '11-15 osób',
      '15+': 'Powyżej 15 pracowników'
    };
    return labels[count] || count;
  }, []);

  const formatQuoteMessage = useCallback((data: any) => {
    let message = `=== ZAPYTANIE O WYCENĘ SZKOLENIA ===\n\n`;
    
    message += `Rodzaj usługi: ${getServiceTypeLabel(data.serviceType)}\n`;
    
    // Dodaj szczegóły w zależności od typu usługi
    if (data.udtOperatorType) {
      message += `Typ maszyny/pojazdu (UDT Operator): ${data.udtOperatorType}\n`;
    }
    if (data.udtConservatorType) {
      message += `Typ maszyny/pojazdu (UDT Konserwator): ${data.udtConservatorType}\n`;
    }
    if (data.sepType) {
      message += `Rodzaj uprawnień SEP: ${data.sepType}\n`;
    }
    
    message += `Liczba uczestników: ${getParticipantsLabel(data.participantsCount)}\n`;
    
    if (data.additionalInfo) {
      message += `\nDodatkowe informacje:\n${data.additionalInfo}\n`;
    }
    
    message += `\n=== KONIEC ZAPYTANIA ===`;
    
    return message;
  }, [getServiceTypeLabel, getParticipantsLabel]);

  // Automatyczne przechodzenie do następnego kroku po wyborze usługi
  const handleServiceTypeChange = useCallback((value: string) => {
    setValue('serviceType', value);
    // Automatycznie przejdź do następnego kroku po wyborze usługi
    setTimeout(() => {
      setFormData({ serviceType: value });
      setStep(2);
      const formElement = ref as React.RefObject<HTMLDivElement>;
      formElement.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }, [setValue, ref]);
  
  const onSubmit = useCallback(async (data: any) => {
    if (step < 3) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
      const formElement = ref as React.RefObject<HTMLDivElement>;
      formElement.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsSubmitting(true);
      const finalData = { ...formData, ...data };
      
      // Tracking wyceny
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
        console.log('Wysyłanie formularza wyceny...');
        
        // Przygotuj dane do wysłania
        const emailData = {
          name: finalData.name,
          company: finalData.company,
          email: finalData.email,
          phone: finalData.phone,
          message: formatQuoteMessage(finalData),
          // Dodatkowe pola dla szczegółów szkolenia
          trainingType: getServiceTypeLabel(finalData.serviceType),
          participants: getParticipantsLabel(finalData.participantsCount),
          urgency: 'Wycena szkolenia'
        };

        const { data: response, error } = await supabase.functions.invoke('send-contact-email', {
          body: emailData
        });

        console.log('Odpowiedź z funkcji Edge:', { response, error });

        if (error) {
          console.error('Błąd z funkcji Edge:', error);
          throw new Error(error.message || 'Błąd podczas wysyłania wiadomości');
        }

        console.log('Formularz wyceny wysłany pomyślnie');
        
        // GTM tracking dla sukcesu
        if (window.dataLayer) {
          window.dataLayer.push({
            'event': 'success_sent_form',
            'form_type': 'quote_request',
            'service_type': finalData.serviceType
          });
        }
        
        toast.success("Formularz został wysłany! Wycena zostanie przesłana na Twój email w ciągu 15 minut.", {
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
  }, [step, formData, ref, trackEvent, formatQuoteMessage, getServiceTypeLabel, getParticipantsLabel, reset]);
  
  const goBack = useCallback(() => {
    if (step === 2) {
      // Wyczyść wybór usługi, żeby użytkownik mógł wybrać ponownie
      setValue('serviceType', '');
    }
    setStep(step - 1);
    const formElement = ref as React.RefObject<HTMLDivElement>;
    formElement.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step, setValue, ref]);

  const stepTitles = useMemo(() => [
    'Wybierz usługę',
    'Szczegóły szkolenia',
    'Dane kontaktowe'
  ], []);

  const serviceOptions = useMemo(() => [
    { 
      value: 'udt-operator', 
      label: 'Uprawnienia UDT dla operatorów', 
      desc: 'Szkolenia i egzaminy dla operatorów maszyn i urządzeń',
      icon: '🏭'
    },
    { 
      value: 'udt-conservator', 
      label: 'Uprawnienia UDT dla konserwatorów', 
      desc: 'Szkolenia dla konserwatorów urządzeń technicznych',
      icon: '🔧'
    },
    { 
      value: 'sep', 
      label: 'Uprawnienia SEP', 
      desc: 'Szkolenia elektryczne, cieplne i gazowe',
      icon: '⚡'
    },
    { 
      value: 'forklifts', 
      label: 'Wózki unoszące', 
      desc: 'Szkolenia na wózki widłowe i platformy',
      icon: '🚛'
    }
  ], []);

  const udtOperatorOptions = useMemo(() => [
    { value: 'forklifts', label: 'Wózki widłowe', desc: 'Wszystkie kategorie', icon: '🚛' },
    { value: 'cranes', label: 'Suwnice', desc: 'Wszystkie kategorie', icon: '🏭' },
    { value: 'winches', label: 'Wciągniki i wciągarki', desc: 'Wszystkie kategorie', icon: '⚙️' },
    { value: 'platforms', label: 'Podesty ruchome', desc: '', icon: '🏗️' },
    { value: 'storage-stacker', label: 'Układnice magazynowe', desc: '', icon: '📦' },
    { value: 'stationary-cranes', label: 'Żurawie stacjonarne', desc: '', icon: '🚧' }
  ], []);

  const udtConservatorOptions = useMemo(() => [
    { value: 'cranes', label: 'Suwnice', desc: 'Wszystkie kategorie', icon: '🏭' },
    { value: 'winches', label: 'Wciągniki i wciągarki', desc: 'Wszystkie kategorie', icon: '⚙️' },
    { value: 'stationary-cranes', label: 'Żurawie stacjonarne', desc: '', icon: '🚧' },
    { value: 'storage-stacker', label: 'Układnice magazynowe', desc: '', icon: '📦' }
  ], []);

  const sepOptions = useMemo(() => [
    { value: 'electrical', label: 'Elektryczne [E1, D1]', icon: '⚡' },
    { value: 'thermal', label: 'Cieplne [E2, D2]', icon: '🔥' },
    { value: 'gas', label: 'Gazowe [E3, D3]', icon: '🔥' }
  ], []);

  const participantOptions = useMemo(() => [
    { value: '1', label: '1 osoba', icon: '👤' },
    { value: '2-5', label: '2-5 osób', icon: '👥' },
    { value: '6-10', label: '6-10 osób', icon: '👫' },
    { value: '11-15', label: '11-15 osób', icon: '👨‍👩‍👧‍👦' },
    { value: '15+', label: 'Powyżej 15 pracowników', icon: '🏢' }
  ], []);

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 sm:px-6 py-4 sm:py-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Formularz wyceny</h2>
          <div className="text-sm text-gray-600 font-medium">
            Krok {step} z 3
          </div>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Postęp</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-2 bg-gray-200" />
        </div>
        
        <div className="flex items-center justify-between">
          {stepTitles.map((title, index) => (
            <div key={index} className="flex flex-col items-center flex-1">
              <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 font-bold text-xs transition-all duration-300 ${
                step > index + 1 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : step === index + 1 
                    ? 'bg-amber-500 border-amber-500 text-white' 
                    : 'bg-gray-200 border-gray-300 text-gray-500'
              }`}>
                {step > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
              </div>
              <span className={`text-xs mt-1 text-center transition-colors duration-300 hidden sm:block ${
                step >= index + 1 ? 'text-gray-900' : 'text-gray-500'
              }`}>
                {title}
              </span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Form content */}
      <div className="p-4 sm:p-6 lg:p-8">
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900 text-center">Wybierz rodzaj usługi szkoleniowej</h3>
            <Controller
              name="serviceType"
              control={control}
              rules={{ required: "Wybierz rodzaj usługi" }}
              render={({ field }) => (
                <RadioGroup
                  onValueChange={handleServiceTypeChange}
                  value={field.value || ''}
                  className="grid grid-cols-2 gap-4"
                >
                  {serviceOptions.map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem 
                        value={option.value} 
                        id={option.value} 
                        className="peer sr-only"
                      />
                      <Label 
                        htmlFor={option.value} 
                        className="flex flex-col items-center justify-center p-6 bg-white border-2 border-gray-200 rounded-xl cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md min-h-[160px]"
                      >
                        <div className="text-3xl mb-3">{option.icon}</div>
                        <div className="font-semibold text-gray-900 mb-2 text-center text-sm">{option.label}</div>
                        <p className="text-xs text-gray-600 text-center leading-relaxed">{option.desc}</p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              )}
            />
            {errors.serviceType && (
              <p className="text-red-500 text-sm text-center">{errors.serviceType.message as string}</p>
            )}
          </div>
        )}
        
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Szczegóły szkolenia</h3>
            
            {serviceType === 'udt-operator' && (
              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-800 text-center">Wybierz urządzenie lub kategorię uprawnień</h4>
                <Controller
                  name="udtOperatorType"
                  control={control}
                  rules={{ required: "Wybierz urządzenie lub kategorię uprawnień" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      className="grid grid-cols-2 gap-3"
                    >
                      {udtOperatorOptions.map((option) => (
                        <div key={option.value} className="relative">
                          <RadioGroupItem 
                            value={option.value} 
                            id={`udt-op-${option.value}`} 
                            className="peer sr-only"
                          />
                          <Label 
                            htmlFor={`udt-op-${option.value}`} 
                            className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md min-h-[100px]"
                          >
                            <div className="text-2xl mb-2">{option.icon}</div>
                            <div className="font-medium text-gray-900 text-center text-sm">{option.label}</div>
                            {option.desc && (
                              <div className="text-xs text-gray-500 text-center mt-1">{option.desc}</div>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.udtOperatorType && (
                  <p className="text-red-500 text-sm text-center">{errors.udtOperatorType.message as string}</p>
                )}
              </div>
            )}
            
            {serviceType === 'udt-conservator' && (
              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-800 text-center">Wybierz urządzenie lub kategorię uprawnień</h4>
                <Controller
                  name="udtConservatorType"
                  control={control}
                  rules={{ required: "Wybierz urządzenie lub kategorię uprawnień" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      className="grid grid-cols-2 gap-3"
                    >
                      {udtConservatorOptions.map((option) => (
                        <div key={option.value} className="relative">
                          <RadioGroupItem 
                            value={option.value} 
                            id={`udt-con-${option.value}`} 
                            className="peer sr-only"
                          />
                          <Label 
                            htmlFor={`udt-con-${option.value}`} 
                            className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md min-h-[100px]"
                          >
                            <div className="text-2xl mb-2">{option.icon}</div>
                            <div className="font-medium text-gray-900 text-center text-sm">{option.label}</div>
                            {option.desc && (
                              <div className="text-xs text-gray-500 text-center mt-1">{option.desc}</div>
                            )}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.udtConservatorType && (
                  <p className="text-red-500 text-sm text-center">{errors.udtConservatorType.message as string}</p>
                )}
              </div>
            )}
            
            {serviceType === 'sep' && (
              <div className="space-y-4">
                <h4 className="text-base font-medium text-gray-800 text-center">Wybierz rodzaj uprawnień SEP</h4>
                <Controller
                  name="sepType"
                  control={control}
                  rules={{ required: "Wybierz rodzaj uprawnień SEP" }}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={field.value || ''}
                      className="grid grid-cols-1 gap-3"
                    >
                      {sepOptions.map((option) => (
                        <div key={option.value} className="relative">
                          <RadioGroupItem 
                            value={option.value} 
                            id={`sep-${option.value}`} 
                            className="peer sr-only"
                          />
                          <Label 
                            htmlFor={`sep-${option.value}`} 
                            className="flex items-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md"
                          >
                            <div className="text-2xl mr-4">{option.icon}</div>
                            <div className="font-medium text-gray-900">{option.label}</div>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.sepType && (
                  <p className="text-red-500 text-sm text-center">{errors.sepType.message as string}</p>
                )}
              </div>
            )}
            
            <div className="space-y-4">
              <h4 className="text-base font-medium text-gray-800 text-center">Liczba uczestników</h4>
              <Controller
                name="participantsCount"
                control={control}
                rules={{ required: "Podaj liczbę uczestników" }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value || ''}
                    className="grid grid-cols-2 gap-3"
                  >
                    {participantOptions.map((option) => (
                      <div key={option.value} className="relative">
                        <RadioGroupItem 
                          value={option.value} 
                          id={`participants-${option.value}`} 
                          className="peer sr-only"
                        />
                        <Label 
                          htmlFor={`participants-${option.value}`} 
                          className="flex flex-col items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md min-h-[100px]"
                        >
                          <div className="text-2xl mb-2">{option.icon}</div>
                          <div className="font-medium text-gray-900 text-center text-sm">{option.label}</div>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.participantsCount && (
                <p className="text-red-500 text-sm text-center">{errors.participantsCount.message as string}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="additionalInfo" className="text-base font-medium">Dodatkowe informacje (opcjonalnie)</Label>
              <Textarea
                {...register("additionalInfo")}
                id="additionalInfo"
                rows={3}
                className="resize-none"
                placeholder="Opisz szczegółowe wymagania..."
              />
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
              <Button type="button" variant="outline" size="lg" onClick={goBack} className="px-6 py-3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Wstecz
              </Button>
              <Button type="submit" size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 font-semibold">
                Dalej
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </form>
        )}
        
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Dane kontaktowe</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Imię i nazwisko *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Podaj imię i nazwisko" })}
                  placeholder="Jan Kowalski"
                  className="h-12"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-base font-medium">Nazwa firmy *</Label>
                <Input
                  id="company"
                  {...register("company", { required: "Podaj nazwę firmy" })}
                  placeholder="ABC Sp. z o.o."
                  className="h-12"
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company.message as string}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email", { 
                    required: "Podaj adres email", 
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Nieprawidłowy adres email"
                    }
                  })}
                  placeholder="kontakt@firma.pl"
                  className="h-12"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">Telefon *</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: "Podaj numer telefonu" })}
                  placeholder="+48 123 456 789"
                  className="h-12"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
              </div>
            </div>
            
            <div className="space-y-4 border-t pt-4">
              <div className="flex items-start space-x-3">
                <Controller
                  name="consent"
                  control={control}
                  rules={{ required: "Wymagana zgoda na przetwarzanie danych" }}
                  render={({ field }) => (
                    <Checkbox 
                      id="consent" 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  )}
                />
                <div className="flex-1">
                  <Label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania 
                    i przesłania oferty szkoleniowej zgodnie z RODO. *
                  </Label>
                  {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message as string}</p>}
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Controller
                  name="marketing"
                  control={control}
                  render={({ field }) => (
                    <Checkbox 
                      id="marketing" 
                      checked={field.value} 
                      onCheckedChange={field.onChange}
                      className="mt-1"
                    />
                  )}
                />
                <Label htmlFor="marketing" className="text-sm text-gray-700 cursor-pointer">
                  Wyrażam zgodę na otrzymywanie informacji marketingowych (opcjonalnie).
                </Label>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
              <Button type="button" variant="outline" size="lg" onClick={goBack} className="px-6 py-3">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Wstecz
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 font-bold"
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Wysyłanie...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    Wyślij formularz
                  </div>
                )}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
});

EnhancedQuoteForm.displayName = 'EnhancedQuoteForm';

export default EnhancedQuoteForm;
