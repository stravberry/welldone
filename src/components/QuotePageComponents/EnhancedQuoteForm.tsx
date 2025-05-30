
import React, { useState, useRef } from 'react';
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
import { CheckCircle, ArrowRight, ArrowLeft, Mail, Euro } from 'lucide-react';

const EnhancedQuoteForm = React.forwardRef<HTMLDivElement>((props, ref) => {
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const serviceType = watch('serviceType');
  const participantsCount = watch('participantsCount');
  
  const getProgress = () => (step / 3) * 100;
  
  const getEstimatedPrice = () => {
    if (!serviceType || !participantsCount) return null;
    
    const basePrices = {
      'udt-operator': 500,
      'udt-conservator': 600,
      'sep': 450,
      'soldering': 350,
      'forklifts': 400,
      'refresher': 250,
      'events': 800
    };
    
    const multipliers = {
      '1': 1,
      '2-5': 3,
      '6-10': 6,
      '11-15': 10,
      '15+': 'Wycena indywidualna'
    };
    
    const basePrice = basePrices[serviceType] || 0;
    const multiplier = multipliers[participantsCount];
    
    if (multiplier === 'Wycena indywidualna') {
      return 'Wycena indywidualna';
    }
    
    return `${basePrice * multiplier} - ${basePrice * multiplier * 1.3} PLN`;
  };
  
  const onSubmit = async (data: any) => {
    if (step < 3) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
      const formElement = ref as React.RefObject<HTMLDivElement>;
      formElement.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      setIsSubmitting(true);
      const finalData = { ...formData, ...data };
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Final form data:', finalData);
      toast.success("Formularz został wysłany! Wycena zostanie przesłana na Twój email w ciągu 15 minut.");
      reset();
      setStep(1);
      setFormData({});
      setIsSubmitting(false);
    }
  };
  
  const goBack = () => {
    setStep(step - 1);
    const formElement = ref as React.RefObject<HTMLDivElement>;
    formElement.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const stepTitles = [
    'Wybierz usługę',
    'Szczegóły szkolenia',
    'Dane kontaktowe'
  ];

  return (
    <div ref={ref} className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Enhanced progress header */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Formularz wyceny</h2>
          <div className="text-sm text-gray-600 font-medium">
            Krok {step} z 3
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
            <span>Postęp formularza</span>
            <span>{Math.round(getProgress())}%</span>
          </div>
          <Progress value={getProgress()} className="h-3 bg-gray-200" />
        </div>
        
        {/* Step indicators - responsive design */}
        <div className="space-y-4">
          {/* Mobile view - vertical stack */}
          <div className="block sm:hidden space-y-3">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className={`flex items-center justify-center h-8 w-8 rounded-full border-2 font-bold text-xs transition-all duration-300 ${
                  step > index + 1 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : step === index + 1 
                      ? 'bg-amber-500 border-amber-500 text-white shadow-lg' 
                      : 'bg-gray-200 border-gray-300 text-gray-500'
                }`}>
                  {step > index + 1 ? <CheckCircle className="h-4 w-4" /> : index + 1}
                </div>
                <span className={`text-sm font-medium transition-colors duration-300 ${
                  step >= index + 1 ? 'text-gray-900' : 'text-gray-500'
                }`}>
                  {title}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop view - horizontal layout */}
          <div className="hidden sm:flex items-center justify-between">
            {stepTitles.map((title, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-10 w-10 rounded-full border-2 font-bold text-sm transition-all duration-300 ${
                    step > index + 1 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : step === index + 1 
                        ? 'bg-amber-500 border-amber-500 text-white shadow-lg scale-110' 
                        : 'bg-gray-200 border-gray-300 text-gray-500'
                  }`}>
                    {step > index + 1 ? <CheckCircle className="h-5 w-5" /> : index + 1}
                  </div>
                  <span className={`ml-3 text-sm font-medium transition-colors duration-300 hidden lg:block ${
                    step >= index + 1 ? 'text-gray-900' : 'text-gray-500'
                  }`}>
                    {title}
                  </span>
                </div>
                {index < stepTitles.length - 1 && (
                  <div className={`flex-1 mx-4 h-1 rounded transition-colors duration-300 ${
                    step > index + 1 ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Form content */}
      <div className="p-6 sm:p-8 lg:p-12">
        {step === 1 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-6">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Wybierz rodzaj usługi szkoleniowej</h3>
              <Controller
                name="serviceType"
                control={control}
                rules={{ required: "Wybierz rodzaj usługi" }}
                render={({ field }) => (
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="space-y-4"
                  >
                    {[
                      { value: 'udt-operator', label: 'Uprawnienia UDT dla operatorów', desc: 'Szkolenia i egzaminy dla operatorów maszyn i urządzeń' },
                      { value: 'udt-conservator', label: 'Uprawnienia UDT dla konserwatorów', desc: 'Szkolenia dla konserwatorów urządzeń technicznych' },
                      { value: 'sep', label: 'Uprawnienia SEP', desc: 'Szkolenia elektryczne, cieplne i gazowe' },
                      { value: 'soldering', label: 'Szkolenie lutownicze', desc: 'Kursy lutowania dla różnych branż' },
                      { value: 'forklifts', label: 'Wózki unoszące', desc: 'Szkolenia na wózki widłowe i platformy' },
                      { value: 'refresher', label: 'Szkolenia przypominające', desc: 'Odświeżenie wiedzy i uprawnień' },
                      { value: 'events', label: 'Wydarzenia edukacyjne', desc: 'Dedykowane wydarzenia dla firm' }
                    ].map((option) => (
                      <div key={option.value} className="flex items-start space-x-3 p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all duration-300 group cursor-pointer">
                        <RadioGroupItem value={option.value} id={option.value} className="mt-1" />
                        <div className="flex-1 min-w-0">
                          <Label htmlFor={option.value} className="font-semibold text-gray-900 group-hover:text-amber-700 cursor-pointer block">
                            {option.label}
                          </Label>
                          <p className="text-sm text-gray-600 mt-1 break-words">{option.desc}</p>
                        </div>
                      </div>
                    ))}
                  </RadioGroup>
                )}
              />
              {errors.serviceType && (
                <p className="text-red-500 text-sm flex items-center">
                  <span className="mr-2">⚠️</span>
                  {errors.serviceType.message as string}
                </p>
              )}
            </div>
            
            <div className="pt-6 flex justify-end">
              <Button type="submit" size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-3 font-semibold group w-full sm:w-auto">
                Dalej
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </form>
        )}
        
        {/* Step 2 - Service Details */}
        {step === 2 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Szczegóły szkolenia</h3>
            
            {/* Service-specific options */}
            {serviceType === 'udt-operator' && (
              <div className="space-y-4">
                <Label htmlFor="udtOperatorType" className="text-base font-medium">Wybierz maszynę lub pojazd</Label>
                <Controller
                  name="udtOperatorType"
                  control={control}
                  rules={{ required: "Wybierz maszynę lub pojazd" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-12 border-2 focus:border-amber-400">
                        <SelectValue placeholder="Wybierz maszynę lub pojazd" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="forklifts-standard">Wózki bez specjalizowanych</SelectItem>
                        <SelectItem value="winches">Wciągniki i wciągarki</SelectItem>
                        <SelectItem value="platforms">Podesty ruchome</SelectItem>
                        <SelectItem value="cranes">Suwnice</SelectItem>
                        <SelectItem value="storage-stacker">Układnice magazynowe</SelectItem>
                        <SelectItem value="forklifts-specialized">Wózki specjalizowane</SelectItem>
                        <SelectItem value="stationary-cranes">Żurawie stacjonarne</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.udtOperatorType && (
                  <p className="text-red-500 text-sm">{errors.udtOperatorType.message as string}</p>
                )}
              </div>
            )}
            
            {serviceType === 'udt-conservator' && (
              <div className="space-y-4">
                <Label htmlFor="udtConservatorType" className="text-base font-medium">Wybierz maszynę lub pojazd</Label>
                <Controller
                  name="udtConservatorType"
                  control={control}
                  rules={{ required: "Wybierz maszynę lub pojazd" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-12 border-2 focus:border-amber-400">
                        <SelectValue placeholder="Wybierz maszynę lub pojazd" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cranes">Suwnice</SelectItem>
                        <SelectItem value="winches">Wciągniki i wciągarki</SelectItem>
                        <SelectItem value="stationary-cranes">Żurawie stacjonarne</SelectItem>
                        <SelectItem value="storage-stacker">Układnice magazynowe</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.udtConservatorType && (
                  <p className="text-red-500 text-sm">{errors.udtConservatorType.message as string}</p>
                )}
              </div>
            )}
            
            {serviceType === 'sep' && (
              <div className="space-y-4">
                <Label htmlFor="sepType" className="text-base font-medium">Wybierz rodzaj uprawnień SEP</Label>
                <Controller
                  name="sepType"
                  control={control}
                  rules={{ required: "Wybierz rodzaj uprawnień SEP" }}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="h-12 border-2 focus:border-amber-400">
                        <SelectValue placeholder="Wybierz rodzaj uprawnień SEP" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electrical">Elektryczne [E1, D1]</SelectItem>
                        <SelectItem value="thermal">Cieplne [E2, D2]</SelectItem>
                        <SelectItem value="gas">Gazowe [E3, D3]</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.sepType && (
                  <p className="text-red-500 text-sm">{errors.sepType.message as string}</p>
                )}
              </div>
            )}
            
            {/* Participants count */}
            <div className="space-y-4">
              <Label htmlFor="participantsCount" className="text-base font-medium">Liczba uczestników</Label>
              <Controller
                name="participantsCount"
                control={control}
                rules={{ required: "Podaj liczbę uczestników" }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="h-12 border-2 focus:border-amber-400">
                      <SelectValue placeholder="Wybierz liczbę uczestników" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 osoba</SelectItem>
                      <SelectItem value="2-5">2-5 osób</SelectItem>
                      <SelectItem value="6-10">6-10 osób</SelectItem>
                      <SelectItem value="11-15">11-15 osób</SelectItem>
                      <SelectItem value="15+">Powyżej 15 pracowników</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.participantsCount && (
                <p className="text-red-500 text-sm">{errors.participantsCount.message as string}</p>
              )}
            </div>
            
            {/* Price preview */}
            {serviceType && participantsCount && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 sm:p-6">
                <div className="flex items-center space-x-3 mb-2">
                  <Euro className="h-6 w-6 text-green-600" />
                  <h4 className="text-lg font-semibold text-green-800">Orientacyjna cena</h4>
                </div>
                <p className="text-xl sm:text-2xl font-bold text-green-700 break-words">{getEstimatedPrice()}</p>
                <p className="text-sm text-green-600 mt-1">Ostateczna cena może ulec zmianie w zależności od szczegółów</p>
              </div>
            )}
            
            {/* Additional info */}
            <div className="space-y-4">
              <Label htmlFor="additionalInfo" className="text-base font-medium">Dodatkowe informacje (opcjonalnie)</Label>
              <Textarea
                {...register("additionalInfo")}
                id="additionalInfo"
                rows={4}
                className="border-2 focus:border-amber-400"
                placeholder="Opisz szczegółowe wymagania, preferencje dotyczące terminów lub inne istotne informacje..."
              />
            </div>
            
            <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button type="button" variant="outline" size="lg" onClick={goBack} className="px-6 sm:px-8 py-3 group w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Wstecz
              </Button>
              <Button type="submit" size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-6 sm:px-8 py-3 font-semibold group w-full sm:w-auto">
                Dalej
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </div>
          </form>
        )}
        
        {/* Step 3 - Contact Details */}
        {step === 3 && (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-6">Dane kontaktowe</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-base font-medium">Imię i nazwisko *</Label>
                <Input
                  id="name"
                  {...register("name", { required: "Podaj imię i nazwisko" })}
                  placeholder="Jan Kowalski"
                  className={`h-12 border-2 focus:border-amber-400 ${errors.name ? "border-red-400" : ""}`}
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="company" className="text-base font-medium">Nazwa firmy *</Label>
                <Input
                  id="company"
                  {...register("company", { required: "Podaj nazwę firmy" })}
                  placeholder="ABC Sp. z o.o."
                  className={`h-12 border-2 focus:border-amber-400 ${errors.company ? "border-red-400" : ""}`}
                />
                {errors.company && <p className="text-red-500 text-sm">{errors.company.message as string}</p>}
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-base font-medium">Email firmowy *</Label>
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
                  className={`h-12 border-2 focus:border-amber-400 ${errors.email ? "border-red-400" : ""}`}
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-base font-medium">Numer telefonu *</Label>
                <Input
                  id="phone"
                  {...register("phone", { required: "Podaj numer telefonu" })}
                  placeholder="+48 123 456 789"
                  className={`h-12 border-2 focus:border-amber-400 ${errors.phone ? "border-red-400" : ""}`}
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
              </div>
            </div>
            
            {/* Consent checkboxes */}
            <div className="space-y-4 border-t pt-6">
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
                <div className="flex-1 min-w-0">
                  <Label htmlFor="consent" className="text-sm text-gray-700 leading-relaxed cursor-pointer break-words">
                    Wyrażam zgodę na przetwarzanie moich danych osobowych przez [Nazwa firmy] w celu przygotowania 
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
                <Label htmlFor="marketing" className="text-sm text-gray-700 leading-relaxed cursor-pointer break-words">
                  Wyrażam zgodę na otrzymywanie informacji marketingowych dotyczących szkoleń i usług (opcjonalnie).
                </Label>
              </div>
            </div>
            
            <div className="pt-6 flex flex-col sm:flex-row justify-between gap-4">
              <Button type="button" variant="outline" size="lg" onClick={goBack} className="px-6 sm:px-8 py-3 group w-full sm:w-auto">
                <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform duration-300" />
                Wstecz
              </Button>
              <Button 
                type="submit" 
                size="lg" 
                disabled={isSubmitting}
                className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 sm:px-10 py-3 font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Wysyłanie...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Mail className="mr-3 h-5 w-5" />
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
