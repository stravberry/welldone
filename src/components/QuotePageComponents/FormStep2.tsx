import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { udtOperatorOptions, udtConservatorOptions, sepOptions, participantOptions } from './constants';

interface FormStep2Props {
  serviceType: string;
  control: any;
  errors: any;
  register: any;
  handleSubmit: any;
  onSubmit: any;
  goBack: () => void;
}

export const FormStep2: React.FC<FormStep2Props> = ({
  serviceType,
  control,
  errors,
  register,
  handleSubmit,
  onSubmit,
  goBack
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Szczegóły szkolenia</h3>
      
      {serviceType === 'udt-operator' && (
        <div className="space-y-4">
          <h4 className="text-base font-medium text-gray-800 text-center">Wybierz urządzenie lub kategorię uprawnień</h4>
          <Controller
            name="udtOperatorType"
            control={control}
            rules={{ required: "Wybierz urządzenie lub kategorię uprawnień" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value || ''}
                className="grid grid-cols-2 gap-3"
              >
                {udtOperatorOptions.map((option) => (
                  <div key={option.value} className="relative">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`udt-op-${option.value}`} 
                      className="peer sr-only"
                    />
                    <Label 
                      htmlFor={`udt-op-${option.value}`} 
                      className={`flex flex-col items-center justify-center p-4 bg-white border-2 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 min-h-[140px] peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md peer-checked:ring-2 peer-checked:ring-amber-200 ${
                        field.value === option.value 
                          ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-200' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium text-gray-900 text-center text-sm">{option.label}</div>
                      {option.desc && (
                        <div className="text-xs text-gray-500 text-center mt-1">{option.desc}</div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.udtOperatorType && (
            <p className="text-red-500 text-sm text-center">{errors.udtOperatorType.message as string}</p>
          )}
        </div>
      )}
      
      {serviceType === 'udt-conservator' && (
        <div className="space-y-4">
          <h4 className="text-base font-medium text-gray-800 text-center">Wybierz urządzenie lub kategorię uprawnień</h4>
          <Controller
            name="udtConservatorType"
            control={control}
            rules={{ required: "Wybierz urządzenie lub kategorię uprawnień" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value || ''}
                className="grid grid-cols-2 gap-3"
              >
                {udtConservatorOptions.map((option) => (
                  <div key={option.value} className="relative">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`udt-con-${option.value}`} 
                      className="peer sr-only"
                    />
                    <Label 
                      htmlFor={`udt-con-${option.value}`} 
                      className={`flex flex-col items-center justify-center p-4 bg-white border-2 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 min-h-[140px] peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md peer-checked:ring-2 peer-checked:ring-amber-200 ${
                        field.value === option.value 
                          ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-200' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="text-2xl mb-2">{option.icon}</div>
                      <div className="font-medium text-gray-900 text-center text-sm">{option.label}</div>
                      {option.desc && (
                        <div className="text-xs text-gray-500 text-center mt-1">{option.desc}</div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.udtConservatorType && (
            <p className="text-red-500 text-sm text-center">{errors.udtConservatorType.message as string}</p>
          )}
        </div>
      )}
      
      {serviceType === 'sep' && (
        <div className="space-y-4">
          <h4 className="text-base font-medium text-gray-800 text-center">Wybierz rodzaj uprawnień SEP</h4>
          <Controller
            name="sepType"
            control={control}
            rules={{ required: "Wybierz rodzaj uprawnień SEP" }}
            render={({ field }) => (
              <RadioGroup
                onValueChange={field.onChange}
                value={field.value || ''}
                className="grid grid-cols-1 gap-3"
              >
                {sepOptions.map((option) => (
                  <div key={option.value} className="relative">
                    <RadioGroupItem 
                      value={option.value} 
                      id={`sep-${option.value}`} 
                      className="peer sr-only"
                    />
                    <Label 
                      htmlFor={`sep-${option.value}`} 
                      className={`flex items-center p-4 bg-white border-2 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 min-h-[80px] peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md peer-checked:ring-2 peer-checked:ring-amber-200 ${
                        field.value === option.value 
                          ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-200' 
                          : 'border-gray-200'
                      }`}
                    >
                      <div className="text-2xl mr-4">{option.icon}</div>
                      <div className="font-medium text-gray-900">{option.label}</div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            )}
          />
          {errors.sepType && (
            <p className="text-red-500 text-sm text-center">{errors.sepType.message as string}</p>
          )}
        </div>
      )}
      
      <div className="space-y-4">
        <h4 className="text-base font-medium text-gray-800 text-center">Liczba uczestników</h4>
        <Controller
          name="participantsCount"
          control={control}
          rules={{ required: "Podaj liczbę uczestników" }}
          render={({ field }) => (
            <RadioGroup
              onValueChange={field.onChange}
              value={field.value || ''}
              className="grid grid-cols-2 gap-3"
            >
              {participantOptions.map((option) => (
                <div key={option.value} className="relative">
                  <RadioGroupItem 
                    value={option.value} 
                    id={`participants-${option.value}`} 
                    className="peer sr-only"
                  />
                  <Label 
                    htmlFor={`participants-${option.value}`} 
                    className={`flex flex-col items-center justify-center p-4 bg-white border-2 rounded-lg cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition-all duration-200 min-h-[140px] peer-checked:border-amber-500 peer-checked:bg-amber-50 peer-checked:shadow-md peer-checked:ring-2 peer-checked:ring-amber-200 ${
                      field.value === option.value 
                        ? 'border-amber-500 bg-amber-50 shadow-md ring-2 ring-amber-200' 
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-2xl mb-2">{option.icon}</div>
                    <div className="font-medium text-gray-900 text-center text-sm">{option.label}</div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.participantsCount && (
          <p className="text-red-500 text-sm text-center">{errors.participantsCount.message as string}</p>
        )}
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="additionalInfo" className="text-base font-medium">Dodatkowe informacje (opcjonalnie)</Label>
        <Textarea
          {...register("additionalInfo")}
          id="additionalInfo"
          rows={3}
          className="resize-none"
          placeholder="Opisz szczegółowe wymagania..."
        />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <Button type="button" variant="outline" size="lg" onClick={goBack} className="px-6 py-3">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wstecz
        </Button>
        <Button type="submit" size="lg" className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 font-semibold">
          Dalej
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </form>
  );
};