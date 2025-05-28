
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { FormData } from '../types';

interface QuickContactFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  trackCTAClick: (ctaName: string) => void;
}

const QuickContactForm: React.FC<QuickContactFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  trackCTAClick
}) => {
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit(e);
  };

  const handleButtonClick = () => {
    trackCTAClick('hero-form');
  };

  return (
    <div className="w-full lg:w-2/5 bg-white p-4 sm:p-6 rounded-lg shadow-lg mx-auto lg:mx-0 max-w-md lg:max-w-none">
      <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-4 text-center lg:text-left">
        Zostaw kontakt, oddzwonimy!
      </h3>
      <form onSubmit={handleFormSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="quick-name" className="text-gray-700 text-sm font-medium">
            Imię i nazwisko
          </Label>
          <Input 
            id="quick-name" 
            placeholder="Jan Kowalski" 
            className="w-full h-10 text-sm" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="quick-phone" className="text-gray-700 text-sm font-medium">
            Telefon
          </Label>
          <Input 
            id="quick-phone" 
            type="tel"
            placeholder="123 456 789" 
            className="w-full h-10 text-sm" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded transition-colors duration-200 text-sm sm:text-base"
          onClick={handleButtonClick}
        >
          Zamów bezpłatną konsultację
        </Button>
        <p className="text-xs text-gray-500 text-center leading-relaxed">
          Skontaktujemy się w ciągu 24 godzin
        </p>
      </form>
    </div>
  );
};

export default QuickContactForm;
