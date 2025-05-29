
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Calculator, Clock, Phone, Mail, MapPin, CheckCircle, Star } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BottomQuoteForm = () => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
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

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Quote form submitted:', formData);
    // Here would be the actual form submission logic
  };

  const Step1Content = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rodzaj szkolenia *
        </label>
        <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz rodzaj szkolenia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="udt-operators">Uprawnienia UDT dla operatorów</SelectItem>
            <SelectItem value="udt-maintenance">Uprawnienia UDT dla konserwatorów</SelectItem>
            <SelectItem value="sep">Uprawnienia SEP</SelectItem>
            <SelectItem value="forklift">Wózki widłowe</SelectItem>
            <SelectItem value="crane">Suwnice</SelectItem>
            <SelectItem value="lifting">Wózki unoszące</SelectItem>
            <SelectItem value="welding">Szkolenia spawalnicze</SelectItem>
            <SelectItem value="other">Inne</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Liczba uczestników *
          </label>
          <Select value={formData.participantCount} onValueChange={(value) => handleInputChange('participantCount', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz liczbę" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-5">1-5 osób</SelectItem>
              <SelectItem value="6-10">6-10 osób</SelectItem>
              <SelectItem value="11-20">11-20 osób</SelectItem>
              <SelectItem value="21-50">21-50 osób</SelectItem>
              <SelectItem value="50+">Powyżej 50 osób</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Miejsce szkolenia *
          </label>
          <Select value={formData.trainingLocation} onValueChange={(value) => handleInputChange('trainingLocation', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Wybierz miejsce" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="client-site">U klienta</SelectItem>
              <SelectItem value="our-site">W naszej siedzibie</SelectItem>
              <SelectItem value="online">Online</SelectItem>
              <SelectItem value="hybrid">Hybrydowo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

  const Step2Content = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nazwa firmy *
          </label>
          <Input
            value={formData.companyName}
            onChange={(e) => handleInputChange('companyName', e.target.value)}
            placeholder="Wprowadź nazwę firmy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Osoba kontaktowa *
          </label>
          <Input
            value={formData.contactPerson}
            onChange={(e) => handleInputChange('contactPerson', e.target.value)}
            placeholder="Imię i nazwisko"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="email@firma.pl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon *
          </label>
          <Input
            type="tel"
            value={formData.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="+48 123 456 789"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kiedy potrzebujesz szkolenia?
        </label>
        <Select value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Wybierz termin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">Jak najszybciej</SelectItem>
            <SelectItem value="1-month">W ciągu miesiąca</SelectItem>
            <SelectItem value="2-3-months">2-3 miesiące</SelectItem>
            <SelectItem value="flexible">Elastycznie</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );

  const Step3Content = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dodatkowe informacje
        </label>
        <Textarea
          value={formData.additionalInfo}
          onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
          placeholder="Opisz swoje potrzeby, specjalne wymagania lub zadaj pytania..."
          rows={4}
        />
      </div>

      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <h4 className="font-semibold text-orange-800 mb-3">Podsumowanie zapytania:</h4>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Rodzaj szkolenia:</span> {formData.serviceType || 'Nie wybrano'}</p>
          <p><span className="font-medium">Liczba uczestników:</span> {formData.participantCount || 'Nie wybrano'}</p>
          <p><span className="font-medium">Miejsce:</span> {formData.trainingLocation || 'Nie wybrano'}</p>
          <p><span className="font-medium">Termin:</span> {formData.urgency || 'Nie wybrano'}</p>
          <p><span className="font-medium">Firma:</span> {formData.companyName || 'Nie podano'}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center text-blue-800">
          <Clock className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Otrzymasz wycenę w ciągu 2 godzin roboczych</span>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-16 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div 
        ref={elementRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        {/* Header */}
        <div 
          className="text-center mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
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
          <div 
            className="lg:col-span-1 space-y-6"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-30px)',
              transition: 'all 0.8s ease-out',
              transitionDelay: '200ms'
            }}
          >
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
                    <div className="flex items-center justify-center text-gray-600">
                      <Phone className="w-4 h-4 mr-2" />
                      <span className="text-sm">+48 123 456 789</span>
                    </div>
                    <div className="flex items-center justify-center text-gray-600">
                      <Mail className="w-4 h-4 mr-2" />
                      <span className="text-sm">kontakt@well-done.pl</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right side - Form */}
          <div 
            className="lg:col-span-2"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(30px)',
              transition: 'all 0.8s ease-out',
              transitionDelay: '400ms'
            }}
          >
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
                    {Math.round((currentStep / 3) * 100)}% ukończone
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${(currentStep / 3) * 100}%` }}
                  />
                </div>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit}>
                  {currentStep === 1 && <Step1Content />}
                  {currentStep === 2 && <Step2Content />}
                  {currentStep === 3 && <Step3Content />}

                  <Separator className="my-6" />

                  {/* Navigation buttons */}
                  <div className="flex justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                    >
                      Wstecz
                    </Button>

                    {currentStep < 3 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        Dalej
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        Wyślij zapytanie
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomQuoteForm;
