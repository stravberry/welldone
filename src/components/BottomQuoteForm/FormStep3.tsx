
import React from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Clock } from 'lucide-react';

interface FormStep3Props {
  formData: {
    additionalInfo: string;
    serviceType: string;
    participantCount: string;
    trainingLocation: string;
    urgency: string;
    companyName: string;
  };
  onRegularInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormStep3: React.FC<FormStep3Props> = ({ formData, onRegularInputChange }) => {
  const getServiceTypeLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'udt-operators': 'Uprawnienia UDT dla operatorów',
      'udt-maintenance': 'Uprawnienia UDT dla konserwatorów',
      'sep': 'Uprawnienia SEP',
      'forklift': 'Wózki widłowe',
      'crane': 'Suwnice',
      'lifting': 'Wózki unoszące',
      'welding': 'Szkolenia spawalnicze',
      'other': 'Inne'
    };
    return labels[value] || value;
  };

  const getParticipantCountLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      '1-5': '1-5 osób',
      '6-10': '6-10 osób',
      '11-20': '11-20 osób',
      '21-50': '21-50 osób',
      '50+': 'Powyżej 50 osób'
    };
    return labels[value] || value;
  };

  const getLocationLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'client-site': 'U klienta',
      'our-site': 'W naszej siedzibie',
      'online': 'Online',
      'hybrid': 'Hybrydowo'
    };
    return labels[value] || value;
  };

  const getUrgencyLabel = (value: string) => {
    const labels: { [key: string]: string } = {
      'asap': 'Jak najszybciej',
      '1-month': 'W ciągu miesiąca',
      '2-3-months': '2-3 miesiące',
      'flexible': 'Elastycznie'
    };
    return labels[value] || value;
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Dodatkowe informacje
        </label>
        <Textarea
          name="additionalInfo"
          value={formData.additionalInfo}
          onChange={onRegularInputChange}
          placeholder="Opisz swoje potrzeby, specjalne wymagania lub zadaj pytania..."
          rows={4}
        />
      </div>

      <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
        <h4 className="font-semibold text-orange-800 mb-3">Podsumowanie zapytania:</h4>
        <div className="space-y-2 text-sm">
          <p><span className="font-medium">Rodzaj szkolenia:</span> {formData.serviceType ? getServiceTypeLabel(formData.serviceType) : 'Nie wybrano'}</p>
          <p><span className="font-medium">Liczba uczestników:</span> {formData.participantCount ? getParticipantCountLabel(formData.participantCount) : 'Nie wybrano'}</p>
          <p><span className="font-medium">Miejsce:</span> {formData.trainingLocation ? getLocationLabel(formData.trainingLocation) : 'Nie wybrano'}</p>
          <p><span className="font-medium">Termin:</span> {formData.urgency ? getUrgencyLabel(formData.urgency) : 'Nie wybrano'}</p>
          <p><span className="font-medium">Firma:</span> {formData.companyName || 'Nie podano'}</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <div className="flex items-center text-blue-800">
          <Clock className="w-5 h-5 mr-2" />
          <span className="text-sm font-medium">Otrzymasz wycenę w ciągu 2 godzin roboczych</span>
        </div>
      </div>
    </div>
  );
};

export default FormStep3;
