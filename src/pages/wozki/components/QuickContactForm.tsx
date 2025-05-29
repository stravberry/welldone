
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { FormData } from '../types';

interface QuickContactFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const QuickContactForm: React.FC<QuickContactFormProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  trackCTAClick
}) => {
  return (
    <Card className="w-full max-w-md bg-white shadow-2xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl text-gray-900">Bezpłatna konsultacja</CardTitle>
        <p className="text-gray-600">Skontaktuj się z nami już dziś</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="name"
            placeholder="Imię i nazwisko"
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
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <Input
            type="tel"
            name="phone"
            placeholder="Telefon"
            value={formData.phone}
            onChange={handleInputChange}
            required
            className="w-full"
          />
          <Button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
            onClick={() => trackCTAClick('hero-form-submit')}
          >
            Wyślij zapytanie
          </Button>
        </form>
        <p className="text-xs text-gray-500 mt-4 text-center">
          Skontaktujemy się z Tobą w ciągu 24 godzin
        </p>
      </CardContent>
    </Card>
  );
};

export default QuickContactForm;
