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
  return <div className="w-full lg:w-2/5 bg-white p-8 rounded-lg shadow-lg mx-auto py-[51px] px-[76px] lg:mx-px">
      <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center lg:text-left">
        Zostaw kontakt, oddzwonimy!
      </h3>
      <form onSubmit={handleFormSubmit} className="space-y-6">
        <div>
          <Label htmlFor="quick-name" className="text-gray-700 font-medium mb-2 block">
            Imię i nazwisko
          </Label>
          <Input id="quick-name" placeholder="Jan Kowalski" className="h-12 text-base" name="name" value={formData.name} onChange={handleInputChange} required />
        </div>
        <div>
          <Label htmlFor="quick-phone" className="text-gray-700 font-medium mb-2 block">
            Telefon
          </Label>
          <Input id="quick-phone" type="tel" placeholder="123 456 789" className="h-12 text-base" name="phone" value={formData.phone} onChange={handleInputChange} required />
        </div>
        <Button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-4 px-6 rounded-lg transition-colors duration-200 text-base h-12" onClick={handleButtonClick}>
          Zamów bezpłatną konsultację
        </Button>
        <p className="text-sm text-gray-500 text-center leading-relaxed">
          Skontaktujemy się w ciągu 24 godzin
        </p>
      </form>
    </div>;
};
export default QuickContactForm;