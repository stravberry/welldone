
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { CheckCircle, ArrowRight, Building, Mail, Phone, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const InteractiveContactForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { elementRef, isInView } = useScrollAnimation();

  const watchedFields = watch();
  const totalSteps = 3;

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log(data);
    toast.success("Formularz został wysłany! Skontaktujemy się wkrótce, aby omówić szczegóły audytu.");
    setIsSubmitting(false);
    
    // Reset form and show success state
    setCurrentStep(4);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedStep1 = watchedFields.name && watchedFields.company;
  const canProceedStep2 = watchedFields.email && watchedFields.phone;

  if (currentStep === 4) {
    return (
      <section className="py-20 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
              <CheckCircle className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Dziękujemy za zgłoszenie!
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Otrzymaliśmy Twoje zgłoszenie na bezpłatny audyt. Nasz ekspert skontaktuje się z Tobą 
              w ciągu 24 godzin, aby omówić szczegóły i ustalić termin przeprowadzenia audytu.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
              <h3 className="font-semibold text-orange-800 mb-2">Co dzieje się dalej?</h3>
              <ul className="text-orange-700 text-left space-y-2">
                <li>✓ Przygotujemy wstępną analizę Twojej branży</li>
                <li>✓ Skontaktujemy się telefonicznie w ciągu 24h</li>
                <li>✓ Ustalimy dogodny termin audytu</li>
                <li>✓ Otrzymasz szczegółowy raport w ciągu 7 dni</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-amber-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" ref={elementRef}>
        <div className={`text-center mb-12 transition-all duration-800 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Zamów bezpłatny audyt już teraz!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Wypełnij formularz w 3 prostych krokach, a nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin.
          </p>
        </div>

        <div className={`bg-white rounded-3xl shadow-2xl overflow-hidden transition-all duration-800 ${
          isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`} style={{ transitionDelay: '200ms' }}>
          {/* Progress bar */}
          <div className="bg-gray-100 px-8 py-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Krok {currentStep} z {totalSteps}
              </span>
              <span className="text-sm font-medium text-orange-600">
                {Math.round((currentStep / totalSteps) * 100)}% ukończone
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-orange-500 to-amber-500 h-2 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-8">
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <Building className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Informacje o firmie</h3>
                  <p className="text-gray-600">Powiedz nam więcej o swojej firmie</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię i nazwisko *</Label>
                    <Input
                      id="name"
                      placeholder="Twoje imię i nazwisko"
                      {...register("name", { required: "To pole jest wymagane" })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Nazwa firmy *</Label>
                    <Input
                      id="company"
                      placeholder="Nazwa Twojej firmy"
                      {...register("company", { required: "To pole jest wymagane" })}
                      className={errors.company ? "border-red-500" : ""}
                    />
                    {errors.company && <p className="text-red-500 text-sm">{errors.company.message as string}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Branża</Label>
                  <Input
                    id="industry"
                    placeholder="np. Produkcja, Logistyka, Magazynowanie"
                    {...register("industry")}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <Phone className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Dane kontaktowe</h3>
                  <p className="text-gray-600">Jak możemy się z Tobą skontaktować?</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail firmowy *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="twoj@firma.pl"
                      {...register("email", { 
                        required: "To pole jest wymagane",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Nieprawidłowy adres e-mail"
                        }
                      })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon kontaktowy *</Label>
                    <Input
                      id="phone"
                      placeholder="+48 123 456 789"
                      {...register("phone", { required: "To pole jest wymagane" })}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="preferredContact">Preferowany sposób kontaktu</Label>
                  <select 
                    id="preferredContact"
                    {...register("preferredContact")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="phone">Telefon</option>
                    <option value="email">E-mail</option>
                    <option value="both">Telefon i e-mail</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Details */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <MessageCircle className="h-16 w-16 text-orange-500 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Szczegóły audytu</h3>
                  <p className="text-gray-600">Opisz swoje potrzeby i oczekiwania</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="needs">Opisz krótko swoje potrzeby *</Label>
                  <Textarea
                    id="needs"
                    placeholder="Opisz, jakie szkolenia prowadzisz, jakie masz wyzwania, czego oczekujesz po audycie..."
                    rows={6}
                    {...register("needs", { required: "To pole jest wymagane" })}
                    className={errors.needs ? "border-red-500" : ""}
                  />
                  {errors.needs && <p className="text-red-500 text-sm">{errors.needs.message as string}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Liczba pracowników</Label>
                  <select 
                    id="employeeCount"
                    {...register("employeeCount")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Wybierz zakres</option>
                    <option value="1-10">1-10 pracowników</option>
                    <option value="11-50">11-50 pracowników</option>
                    <option value="51-100">51-100 pracowników</option>
                    <option value="100+">Ponad 100 pracowników</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timeline">Preferowany termin audytu</Label>
                  <select 
                    id="timeline"
                    {...register("timeline")}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="">Wybierz termin</option>
                    <option value="asap">Jak najszybciej</option>
                    <option value="week">W ciągu tygodnia</option>
                    <option value="month">W ciągu miesiąca</option>
                    <option value="flexible">Jestem elastyczny</option>
                  </select>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
              {currentStep > 1 && (
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={prevStep}
                  className="px-6 py-3"
                >
                  Poprzedni krok
                </Button>
              )}
              
              {currentStep < totalSteps ? (
                <Button 
                  type="button" 
                  onClick={nextStep}
                  disabled={
                    (currentStep === 1 && !canProceedStep1) ||
                    (currentStep === 2 && !canProceedStep2)
                  }
                  className={`px-6 py-3 ${currentStep === 1 ? 'ml-auto' : ''}`}
                >
                  Następny krok <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Wysyłanie...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Wyślij zgłoszenie
                    </>
                  )}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default InteractiveContactForm;
