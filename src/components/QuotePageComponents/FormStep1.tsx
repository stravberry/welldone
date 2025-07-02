import React from 'react';
import { Controller } from 'react-hook-form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { serviceOptions } from './constants';

interface FormStep1Props {
  control: any;
  errors: any;
  handleServiceTypeChange: (value: string) => void;
}

export const FormStep1: React.FC<FormStep1Props> = ({
  control,
  errors,
  handleServiceTypeChange
}) => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 text-center">Wybierz rodzaj usługi szkoleniowej</h3>
      <Controller
        name="serviceType"
        control={control}
        rules={{ required: "Wybierz rodzaj usługi" }}
        render={({ field }) => (
          <RadioGroup
            onValueChange={handleServiceTypeChange}
            value={field.value || ''}
            className="grid grid-cols-2 gap-4"
          >
            {serviceOptions.map((option) => (
              <div key={option.value} className="relative">
                <RadioGroupItem 
                  value={option.value} 
                  id={option.value} 
                  className="peer sr-only"
                />
                <Label 
                  htmlFor={option.value} 
                  className={`flex flex-col items-center justify-center p-6 bg-white border-2 rounded-xl cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 min-h-[140px] peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md peer-checked:ring-2 peer-checked:ring-amber-200 ${
                    field.value === option.value 
                      ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-200' 
                      : 'border-gray-200'
                  }`}
                >
                  <div className="mb-3">
                    {typeof option.icon === 'string' ? (
                      <div className="text-3xl">{option.icon}</div>
                    ) : (
                      option.icon
                    )}
                  </div>
                  <div className="font-semibold text-gray-900 mb-2 text-center text-sm">{option.label}</div>
                  <p className="text-xs text-gray-600 text-center leading-relaxed">{option.desc}</p>
                </Label>
              </div>
            ))}
          </RadioGroup>
        )}
      />
      {errors.serviceType && (
        <p className="text-red-500 text-sm text-center">{errors.serviceType.message as string}</p>
      )}
    </div>
  );
};