
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormStep2Props {
  formData: {
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    urgency: string;
  };
  onInputChange: (field: string, value: string) => void;
  onRegularInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormStep2: React.FC<FormStep2Props> = ({ formData, onInputChange, onRegularInputChange }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nazwa firmy *
          </label>
          <Input
            name="companyName"
            value={formData.companyName}
            onChange={onRegularInputChange}
            placeholder="Wprowadź nazwę firmy"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Osoba kontaktowa *
          </label>
          <Input
            name="contactPerson"
            value={formData.contactPerson}
            onChange={onRegularInputChange}
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
            name="email"
            value={formData.email}
            onChange={onRegularInputChange}
            placeholder="email@firma.pl"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon *
          </label>
          <Input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={onRegularInputChange}
            placeholder="+48 123 456 789"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kiedy potrzebujesz szkolenia?
        </label>
        <Select value={formData.urgency} onValueChange={(value) => onInputChange('urgency', value)}>
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
};

export default FormStep2;
