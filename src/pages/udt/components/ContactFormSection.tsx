
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import type { FormData } from '../types';

interface ContactFormSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  trackCTAClick: (ctaName: string) => void;
}

const ContactFormSection: React.FC<ContactFormSectionProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  trackCTAClick
}) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: formRef, isInView: formInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <section id="contact-form" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-500 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-orange-600 font-medium text-sm sm:text-base">Kontakt</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Skontaktuj się z nami</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Masz pytania? Wypełnij formularz, a nasz konsultant skontaktuje się z Tobą w ciągu 24 godzin
          </p>
        </div>
        
        <div 
          ref={formRef}
          className={`max-w-4xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md transition-all duration-500 ${
            formInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="name" className="text-gray-700">Imię i nazwisko</Label>
              <Input 
                id="name" 
                placeholder="Jan Kowalski" 
                className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="company" className="text-gray-700">Firma</Label>
              <Input 
                id="company" 
                placeholder="Nazwa firmy (opcjonalnie)" 
                className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
                name="company"
                value={formData.company}
                onChange={handleInputChange}
              />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-700">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="jan@firma.pl" 
                className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-gray-700">Telefon</Label>
              <Input 
                id="phone" 
                placeholder="123 456 789" 
                className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Label htmlFor="message" className="text-gray-700">Wiadomość</Label>
              <Textarea 
                id="message" 
                placeholder="Twoja wiadomość" 
                className="mt-1 transition-all duration-300 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 hover:border-orange-300" 
                rows={5}
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </div>
            
            <div className="md:col-span-2">
              <Button 
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 py-6 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                onClick={() => trackCTAClick('contact-form-submit')}
              >
                Wyślij wiadomość
              </Button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Wysyłając formularz akceptujesz naszą politykę prywatności
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactFormSection;
