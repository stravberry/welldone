
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import type { FormData } from '../types';

interface ContactFormSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  trackCTAClick
}) => {
  const { elementRef: sectionRef, isInView: sectionInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="contact-form" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`transition-all duration-800 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-blue-600 font-medium text-sm sm:text-base">Skontaktuj się z nami</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Zapisz się na szkolenie już dziś</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Skontaktuj się z nami, aby umówić termin szkolenia lub uzyskać więcej informacji
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-center">Formularz kontaktowy</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="text"
                      name="name"
                      placeholder="Imię i nazwisko *"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                    <Input
                      type="text"
                      name="company"
                      placeholder="Nazwa firmy"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      type="email"
                      name="email"
                      placeholder="E-mail *"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="Telefon *"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <textarea
                    name="message"
                    placeholder="Wiadomość"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  />
                  <Button 
                    type="submit" 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-lg"
                    onClick={() => trackCTAClick('contact-form-submit')}
                  >
                    Wyślij zapytanie
                  </Button>
                </form>
                <p className="text-sm text-gray-500 mt-4 text-center">
                  * Pola wymagane. Skontaktujemy się z Tobą w ciągu 24 godzin.
                </p>
              </CardContent>
            </Card>
            
            <div className="space-y-6">
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl">Dane kontaktowe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-gray-600">+48 123 456 789</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">E-mail</p>
                      <p className="text-gray-600">wozki@well-done.pl</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-gray-600">Wrocław i okolice</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Godziny pracy</p>
                      <p className="text-gray-600">Pn-Pt: 8:00-16:00</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-lg bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 text-blue-900">Szybki kontakt</h3>
                  <p className="text-blue-700 mb-4">
                    Potrzebujesz pilnej informacji? Zadzwoń bezpośrednio!
                  </p>
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => trackCTAClick('quick-call')}
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Zadzwoń teraz
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
