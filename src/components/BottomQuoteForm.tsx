import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calculator, Clock, CheckCircle, Star, Loader2 } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import ClickablePhone from '@/components/ClickablePhone';
import ClickableEmail from '@/components/ClickableEmail';
import FormStep1 from './BottomQuoteForm/FormStep1';
import FormStep2 from './BottomQuoteForm/FormStep2';
import FormStep3 from './BottomQuoteForm/FormStep3';

interface FormData {
  serviceType: string;
  participantCount: string;
  trainingLocation: string;
  urgency: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  additionalInfo: string;
}
const BottomQuoteForm = () => {
  const {
    elementRef,
    isInView
  } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    participantCount: '',
    trainingLocation: '',
    urgency: '',
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    additionalInfo: ''
  });
  const handleInputChange = useCallback((field: string, value: string) => {
    console.log('Changing field:', field, 'to value:', value);
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);
  const handleRegularInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    console.log('Regular input change:', name, 'to:', value);
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.serviceType || !formData.participantCount || !formData.trainingLocation) {
          toast.error('Proszę wypełnić wszystkie wymagane pola');
          return false;
        }
        break;
      case 2:
        if (!formData.companyName || !formData.contactPerson || !formData.email || !formData.phone) {
          toast.error('Proszę wypełnić wszystkie wymagane pola');
          return false;
        }
        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          toast.error('Proszę podać prawidłowy adres email');
          return false;
        }
        break;
    }
    return true;
  };
  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) setCurrentStep(currentStep + 1);
    }
  };
  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };
  const handleSubmit = async () => {
    console.log('=== FORM SUBMISSION STARTED ===');
    console.log('Submit button clicked');
    if (!validateStep(2)) {
      console.log('Validation failed, aborting submission');
      return;
    }
    setIsSubmitting(true);
    try {
      console.log('Form data before submission:', formData);

      // Test Supabase connection first
      console.log('Testing Supabase connection...');
      console.log('Supabase client initialized:', !!supabase);

      // Map form data to the format expected by send-contact-email function
      const emailData = {
        name: formData.contactPerson,
        company: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        message: `
Rodzaj szkolenia: ${formData.serviceType}
Liczba uczestników: ${formData.participantCount}
Miejsce szkolenia: ${formData.trainingLocation}
Termin: ${formData.urgency || 'Nie określono'}

Dodatkowe informacje:
${formData.additionalInfo || 'Brak dodatkowych informacji'}
        `.trim()
      };
      console.log('=== CALLING EDGE FUNCTION ===');
      console.log('Function name: send-contact-email');
      console.log('Email data being sent:', emailData);

      // Call the edge function with detailed logging
      const functionCall = supabase.functions.invoke('send-contact-email', {
        body: emailData
      });
      console.log('Function invocation started...');
      const {
        data,
        error
      } = await functionCall;
      console.log('=== EDGE FUNCTION RESPONSE ===');
      console.log('Function response data:', data);
      console.log('Function response error:', error);
      console.log('Response type - data:', typeof data);
      console.log('Response type - error:', typeof error);
      if (error) {
        console.error('=== ERROR FROM EDGE FUNCTION ===');
        console.error('Error object:', error);
        console.error('Error message:', error.message);
        console.error('Error details:', JSON.stringify(error, null, 2));
        throw new Error(`Błąd funkcji Edge: ${error.message || 'Nieznany błąd'}`);
      }
      console.log('=== SUCCESS ===');
      console.log('Email sent successfully, data:', data);
      
      // Enhanced success toast with icon, title and description
      toast.success(
        <div className="flex items-start space-x-3">
          <CheckCircle className="w-6 h-6 text-green-500 mt-1 flex-shrink-0" />
          <div>
            <div className="font-bold text-lg text-gray-900">Dziękujemy za zgłoszenie!</div>
            <div className="text-sm text-gray-600 mt-1">Wycenę otrzymasz w ciągu 2 godzin roboczych</div>
            <div className="text-xs text-gray-500 mt-2">Sprawdź swoją skrzynkę email</div>
          </div>
        </div>,
        {
          duration: 7000,
          className: 'p-6 min-h-[100px] shadow-lg border-l-4 border-l-green-500'
        }
      );

      // Reset form after successful submission
      setFormData({
        serviceType: '',
        participantCount: '',
        trainingLocation: '',
        urgency: '',
        companyName: '',
        contactPerson: '',
        email: '',
        phone: '',
        additionalInfo: ''
      });
      setCurrentStep(1);
    } catch (error: any) {
      console.error('=== SUBMISSION ERROR ===');
      console.error('Caught error:', error);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      console.error('Full error object:', JSON.stringify(error, null, 2));

      // More specific error messages
      let errorMessage = 'Wystąpił błąd podczas wysyłania formularza.';
      if (error.message) {
        if (error.message.includes('fetch')) {
          errorMessage = 'Błąd połączenia z serwerem. Sprawdź połączenie internetowe.';
        } else if (error.message.includes('Function not found')) {
          errorMessage = 'Funkcja wysyłania maili nie została znaleziona.';
        } else {
          errorMessage = error.message;
        }
      }
      toast.error(errorMessage);
    } finally {
      console.log('=== FORM SUBMISSION ENDED ===');
      setIsSubmitting(false);
    }
  };
  return <section className="py-16 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{
      animationDelay: '2s'
    }} />
      
      <div ref={elementRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12" style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s ease-out'
      }}>
          <div className="inline-block mb-4">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Błyskawiczna wycena
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Otrzymaj wycenę w <span className="text-orange-200">2 godziny</span>
          </h2>
          <p className="text-xl text-orange-50 max-w-3xl mx-auto">
            Wypełnij krótki formularz, a przygotujemy dla Ciebie spersonalizowaną ofertę szkoleń
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side - Benefits */}
          <div className="lg:col-span-1 space-y-6" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
          transition: 'all 0.8s ease-out',
          transitionDelay: '200ms'
        }}>
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-800">
                  <Star className="w-6 h-6 text-orange-500 mr-2" />
                  Dlaczego my?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Błyskawiczna odpowiedź</div>
                    <div className="text-sm text-gray-600">Wycena w ciągu 2h</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Dopasowana oferta</div>
                    <div className="text-sm text-gray-600">Indywidualne potrzeby</div>
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                  <div>
                    <div className="font-medium text-gray-800">Bez zobowiązań</div>
                    <div className="text-sm text-gray-600">Wycena całkowicie darmowa</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <div className="text-center">
                  <h4 className="font-semibold text-gray-800 mb-4">Potrzebujesz pomocy?</h4>
                  <div className="space-y-3">
                    <ClickablePhone 
                      phoneNumber="+48 504 305 437"
                      className="text-gray-600 text-sm justify-center"
                      showIcon={true}
                      iconClassName="w-4 h-4 mr-2 text-orange-400"
                    />
                    <ClickableEmail 
                      email="kontakt@well-done.pl"
                      className="text-gray-600 text-sm justify-center"
                      showIcon={true}
                      iconClassName="w-4 h-4 mr-2 text-orange-400"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Form */}
          <div className="lg:col-span-2" style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? 'translateX(0)' : 'translateX(30px)',
          transition: 'all 0.8s ease-out',
          transitionDelay: '400ms'
        }}>
            <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center text-gray-800">
                      <Calculator className="w-6 h-6 text-orange-500 mr-2" />
                      Formularz wyceny
                    </CardTitle>
                    <CardDescription>
                      Krok {currentStep} z 3 - {currentStep === 1 ? 'Szczegóły szkolenia' : currentStep === 2 ? 'Dane kontaktowe' : 'Podsumowanie'}
                    </CardDescription>
                  </div>
                  <div className="text-sm text-gray-500">
                    {Math.round(currentStep / 3 * 100)}% ukończone
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-orange-500 h-2 rounded-full transition-all duration-500" style={{
                  width: `${currentStep / 3 * 100}%`
                }} />
                </div>
              </CardHeader>

              <CardContent>
                <div>
                  {currentStep === 1 && <FormStep1 formData={formData} onInputChange={handleInputChange} />}
                  {currentStep === 2 && <FormStep2 formData={formData} onInputChange={handleInputChange} onRegularInputChange={handleRegularInputChange} />}
                  {currentStep === 3 && <FormStep3 formData={formData} onRegularInputChange={handleRegularInputChange} />}

                  <Separator className="my-6" />

                  {/* Navigation buttons */}
                  <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1 || isSubmitting}>
                      Wstecz
                    </Button>

                    {currentStep < 3 ? <Button type="button" onClick={nextStep} disabled={isSubmitting} className="bg-orange-500 hover:bg-orange-600">
                        Dalej
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button> : <Button type="button" onClick={handleSubmit} disabled={isSubmitting} className="bg-green-600 hover:bg-green-700">
                        {isSubmitting ? <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Wysyłanie...
                          </> : <>
                            Wyślij zapytanie
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </>}
                      </Button>}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>;
};
export default BottomQuoteForm;
