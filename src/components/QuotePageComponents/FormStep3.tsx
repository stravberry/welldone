import React from 'react';
import { Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Mail } from 'lucide-react';

interface FormStep3Props {
  register: any;
  control: any;
  errors: any;
  handleSubmit: any;
  onSubmit: any;
  goBack: () => void;
  isSubmitting: boolean;
}

export const FormStep3: React.FC<FormStep3Props> = ({
  register,
  control,
  errors,
  handleSubmit,
  onSubmit,
  goBack,
  isSubmitting
}) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">Dane kontaktowe</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-base font-medium">Imię i nazwisko *</Label>
          <Input
            id="name"
            {...register("name", { required: "Podaj imię i nazwisko" })}
            placeholder="Jan Kowalski"
            className="h-12"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="company" className="text-base font-medium">Nazwa firmy *</Label>
          <Input
            id="company"
            {...register("company", { required: "Podaj nazwę firmy" })}
            placeholder="ABC Sp. z o.o."
            className="h-12"
          />
          {errors.company && <p className="text-red-500 text-sm">{errors.company.message as string}</p>}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-base font-medium">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email", { 
              required: "Podaj adres email", 
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Nieprawidłowy adres email"
              }
            })}
            placeholder="kontakt@firma.pl"
            className="h-12"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-base font-medium">Telefon *</Label>
          <Input
            id="phone"
            {...register("phone", { required: "Podaj numer telefonu" })}
            placeholder="+48 123 456 789"
            className="h-12"
          />
          {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
        </div>
      </div>
      
      <div className="space-y-4 border-t pt-4">
        <div className="flex items-start space-x-3">
          <Controller
            name="consent"
            control={control}
            rules={{ required: "Wymagana zgoda na przetwarzanie danych" }}
            render={({ field }) => (
              <Checkbox 
                id="consent" 
                checked={field.value} 
                onCheckedChange={field.onChange}
                className="mt-1"
              />
            )}
          />
          <div className="flex-1">
            <Label htmlFor="consent" className="text-sm text-gray-700 cursor-pointer">
              Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania 
              i przesłania oferty szkoleniowej zgodnie z RODO. *
            </Label>
            {errors.consent && <p className="text-red-500 text-xs mt-1">{errors.consent.message as string}</p>}
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <Controller
            name="marketing"
            control={control}
            render={({ field }) => (
              <Checkbox 
                id="marketing" 
                checked={field.value} 
                onCheckedChange={field.onChange}
                className="mt-1"
              />
            )}
          />
          <Label htmlFor="marketing" className="text-sm text-gray-700 cursor-pointer">
            Wyrażam zgodę na otrzymywanie informacji marketingowych (opcjonalnie).
          </Label>
        </div>
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
        <Button type="button" variant="outline" size="lg" onClick={goBack} className="px-6 py-3">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Wstecz
        </Button>
        <Button 
          type="submit" 
          size="lg" 
          disabled={isSubmitting}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-8 py-3 font-bold"
        >
          {isSubmitting ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Wysyłanie...
            </div>
          ) : (
            <div className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Wyślij formularz
            </div>
          )}
        </Button>
      </div>
    </form>
  );
};