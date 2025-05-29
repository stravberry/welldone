
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowRight, Calculator, Clock, Shield } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const BottomQuoteForm = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    serviceType: '',
    employeeCount: '',
    message: ''
  });

  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Odpowiedź w 15 minut",
      description: "Błyskawiczna wycena dostosowana do Twoich potrzeb"
    },
    {
      icon: <Calculator className="w-6 h-6" />,
      title: "Precyzyjne ceny",
      description: "Szczegółowa kalkulacja kosztów bez ukrytych opłat"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Gwarancja jakości",
      description: "Certyfikowane szkolenia zgodne z wymogami UDT i SEP"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-red-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      {/* Animated background elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={elementRef}
          className="text-center mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <div className="inline-block mb-4">
            <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Błyskawiczna Wycena
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Otrzymaj wycenę w 15 minut
          </h2>
          <p className="text-xl text-orange-50 max-w-3xl mx-auto mb-8">
            Wypełnij formularz i otrzymaj spersonalizowaną ofertę dostosowaną do potrzeb Twojej firmy
          </p>
        </div>

        {/* Features */}
        <div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.8s ease-out',
            transitionDelay: '200ms'
          }}
        >
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-white border border-white/20 hover:bg-white/15 transition-all duration-300"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-white/20 rounded-lg mr-3">
                  {feature.icon}
                </div>
                <h3 className="font-semibold">{feature.title}</h3>
              </div>
              <p className="text-orange-100 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Form */}
        <div 
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(50px)',
            transition: 'all 1s ease-out',
            transitionDelay: '400ms'
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nazwa firmy *
                </label>
                <Input
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  placeholder="Wpisz nazwę swojej firmy"
                  required
                  className="h-12"
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
                  required
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="twoj@email.com"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder="+48 123 456 789"
                  required
                  className="h-12"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rodzaj usługi *
                </label>
                <Select value={formData.serviceType} onValueChange={(value) => handleInputChange('serviceType', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Wybierz usługę" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="udt-operatorzy">Uprawnienia UDT dla operatorów</SelectItem>
                    <SelectItem value="udt-konserwatorzy">Uprawnienia UDT dla konserwatorów</SelectItem>
                    <SelectItem value="sep">Uprawnienia SEP</SelectItem>
                    <SelectItem value="lutowanie">Szkolenia z lutowania</SelectItem>
                    <SelectItem value="eventy">Eventy edukacyjne</SelectItem>
                    <SelectItem value="inne">Inne</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Liczba pracowników
                </label>
                <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange('employeeCount', value)}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Wybierz zakres" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1-10 osób</SelectItem>
                    <SelectItem value="11-50">11-50 osób</SelectItem>
                    <SelectItem value="51-100">51-100 osób</SelectItem>
                    <SelectItem value="100+">Powyżej 100 osób</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Dodatkowe informacje
              </label>
              <Textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Opisz szczegóły swojego zapotrzebowania..."
                className="min-h-[100px]"
              />
            </div>

            <div className="text-center pt-6">
              <Button 
                type="submit" 
                size="lg" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-12 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105"
              >
                Otrzymaj błyskawiczną wycenę
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <p className="text-sm text-gray-500 mt-3">
                Otrzymasz odpowiedź w ciągu 15 minut w godzinach pracy
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BottomQuoteForm;
