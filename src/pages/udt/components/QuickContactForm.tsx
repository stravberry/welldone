
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
  return (
    <div className="lg:w-2/5 bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Zostaw kontakt, oddzwonimy!</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <Label htmlFor="quick-name" className="text-gray-700">Imię i nazwisko</Label>
          <Input 
            id="quick-name" 
            placeholder="Jan Kowalski" 
            className="mt-1" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="quick-phone" className="text-gray-700">Telefon</Label>
          <Input 
            id="quick-phone" 
            placeholder="123 456 789" 
            className="mt-1" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <Button 
          type="submit"
          className="w-full bg-orange-600 hover:bg-orange-700"
          onClick={() => trackCTAClick('hero-form')}
        >
          Zamów bezpłatną konsultację
        </Button>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Skontaktujemy się w ciągu 24 godzin
        </p>
      </form>
    </div>
  );
};

export default QuickContactForm;
