
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FormStep1Props {
  formData: {
    serviceType: string;
    participantCount: string;
    trainingLocation: string;
  };
  onInputChange: (field: string, value: string) => void;
}

const FormStep1: React.FC<FormStep1Props> = ({ formData, onInputChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Rodzaj szkolenia *
        </label>
        <Select value={formData.serviceType} onValueChange={(value) => onInputChange('serviceType', value)}>
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
          <Select value={formData.participantCount} onValueChange={(value) => onInputChange('participantCount', value)}>
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
          <Select value={formData.trainingLocation} onValueChange={(value) => onInputChange('trainingLocation', value)}>
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
};

export default FormStep1;
