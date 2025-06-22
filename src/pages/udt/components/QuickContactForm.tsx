
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { FormData } from '../types';

interface QuickContactFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
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

  const handleSelectChange = (field: string, value: string) => {
    // Create a synthetic event to match the existing handleInputChange signature
    const syntheticEvent = {
      target: {
        name: field,
        value: value
      }
    } as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  return (
    <div className="w-full max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-lg mx-auto p-4 sm:p-6 lg:p-8">
      <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 text-center lg:text-left">
        Zostaw kontakt, oddzwonimy!
      </h3>
      <form onSubmit={handleFormSubmit} className="space-y-4 sm:space-y-6">
        <div className="space-y-2">
          <Label htmlFor="quick-name" className="text-sm sm:text-base text-gray-700 font-medium">
            Imię i nazwisko
          </Label>
          <Input 
            id="quick-name" 
            placeholder="Jan Kowalski" 
            className="h-10 sm:h-12 text-sm sm:text-base w-full" 
            name="name" 
            value={formData.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="quick-company" className="text-sm sm:text-base text-gray-700 font-medium">
            Firma
          </Label>
          <Input 
            id="quick-company" 
            placeholder="Nazwa firmy" 
            className="h-10 sm:h-12 text-sm sm:text-base w-full" 
            name="company" 
            value={formData.company} 
            onChange={handleInputChange} 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quick-phone" className="text-sm sm:text-base text-gray-700 font-medium">
            Telefon
          </Label>
          <Input 
            id="quick-phone" 
            type="tel" 
            placeholder="123 456 789" 
            className="h-10 sm:h-12 text-sm sm:text-base w-full" 
            name="phone" 
            value={formData.phone} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quick-email" className="text-sm sm:text-base text-gray-700 font-medium">
            Email
          </Label>
          <Input 
            id="quick-email" 
            type="email" 
            placeholder="jan.kowalski@firma.pl" 
            className="h-10 sm:h-12 text-sm sm:text-base w-full" 
            name="email" 
            value={formData.email} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quick-training-type" className="text-sm sm:text-base text-gray-700 font-medium">
            Rodzaj szkolenia
          </Label>
          <Select value={formData.trainingType || ''} onValueChange={(value) => handleSelectChange('trainingType', value)}>
            <SelectTrigger className="h-10 sm:h-12">
              <SelectValue placeholder="Wybierz rodzaj szkolenia" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="udt-operatorzy">UDT Operatorzy wózków widłowych</SelectItem>
              <SelectItem value="udt-konserwatorze">UDT Konserwatorzy</SelectItem>
              <SelectItem value="wozki-unoszace">Wózki unoszące</SelectItem>
              <SelectItem value="sep">SEP</SelectItem>
              <SelectItem value="lutowanie">Lutowanie</SelectItem>
              <SelectItem value="inne">Inne</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quick-participants" className="text-sm sm:text-base text-gray-700 font-medium">
            Liczba uczestników
          </Label>
          <Select value={formData.participants || ''} onValueChange={(value) => handleSelectChange('participants', value)}>
            <SelectTrigger className="h-10 sm:h-12">
              <SelectValue placeholder="Wybierz liczbę uczestników" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3">1-3 osób</SelectItem>
              <SelectItem value="4-6">4-6 osób</SelectItem>
              <SelectItem value="7-10">7-10 osób</SelectItem>
              <SelectItem value="11-15">11-15 osób</SelectItem>
              <SelectItem value="16+">Ponad 15 osób</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quick-message" className="text-sm sm:text-base text-gray-700 font-medium">
            Dodatkowe informacje
          </Label>
          <Textarea 
            id="quick-message" 
            placeholder="Opisz swoje potrzeby szkoleniowe..." 
            className="text-sm sm:text-base w-full min-h-[80px]" 
            name="message" 
            value={formData.message} 
            onChange={handleInputChange} 
            required 
          />
        </div>

        <Button 
          type="submit" 
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-lg transition-colors duration-200 text-sm sm:text-base h-10 sm:h-12" 
          onClick={handleButtonClick}
        >
          Zamów bezpłatną konsultację
        </Button>
        <p className="text-xs sm:text-sm text-gray-500 text-center leading-relaxed">
          Skontaktujemy się w ciągu 24 godzin
        </p>
      </form>
    </div>
  );
};

export default QuickContactForm;
