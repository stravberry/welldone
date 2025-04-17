import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const QuotePage = () => {
  const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  
  const serviceType = watch('serviceType');
  const udtOperatorType = watch('udtOperatorType');
  const udtConservatorType = watch('udtConservatorType');
  const sepType = watch('sepType');
  
  const onSubmit = (data: any) => {
    if (step < 3) {
      setFormData({ ...formData, ...data });
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      const finalData = { ...formData, ...data };
      console.log('Final form data:', finalData);
      toast.success("Formularz został wysłany! Wkrótce otrzymasz e-mail z wyceną.");
      reset();
      setStep(1);
      setFormData({});
    }
  };
  
  const goBack = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-amber-500 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Błyskawiczna Wycena</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Uzyskaj szybką wycenę szkoleń i certyfikacji dostosowaną do potrzeb Twojej firmy. Wypełnij poniższy formularz, a wyślemy Ci szczegółową ofertę e-mailem.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            {/* Progress Steps */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                    1
                  </div>
                  <span className={`ml-2 text-sm font-medium ${step >= 1 ? 'text-gray-900' : 'text-gray-500'}`}>Rodzaj usługi</span>
                </div>
                <div className="w-16 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 2 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                    2
                  </div>
                  <span className={`ml-2 text-sm font-medium ${step >= 2 ? 'text-gray-900' : 'text-gray-500'}`}>Szczegóły</span>
                </div>
                <div className="w-16 h-1 bg-gray-200">
                  <div className={`h-full ${step >= 3 ? 'bg-amber-500' : 'bg-gray-200'}`}></div>
                </div>
                <div className="flex items-center">
                  <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 3 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-600'} font-bold text-sm`}>
                    3
                  </div>
                  <span className={`ml-2 text-sm font-medium ${step >= 3 ? 'text-gray-900' : 'text-gray-500'}`}>Dane kontaktowe</span>
                </div>
              </div>
            </div>
            
            {/* Form Content */}
            <div className="p-6 sm:p-10">
              {step === 1 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold mb-6">Wybierz rodzaj usługi</h2>
                    <div className="space-y-2">
                      <Controller
                        name="serviceType"
                        control={control}
                        rules={{ required: "Wybierz rodzaj usługi" }}
                        render={({ field }) => (
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="space-y-4"
                          >
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="udt-operator" id="udt-operator" />
                              <Label htmlFor="udt-operator" className="font-medium">Uprawnienia UDT dla operatorów</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="udt-conservator" id="udt-conservator" />
                              <Label htmlFor="udt-conservator" className="font-medium">Uprawnienia UDT dla konserwatorów</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="sep" id="sep" />
                              <Label htmlFor="sep" className="font-medium">Uprawnienia SEP</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="soldering" id="soldering" />
                              <Label htmlFor="soldering" className="font-medium">Szkolenie lutownicze</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="forklifts" id="forklifts" />
                              <Label htmlFor="forklifts" className="font-medium">Wózki unoszące</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="refresher" id="refresher" />
                              <Label htmlFor="refresher" className="font-medium">Szkolenia przypominające</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <RadioGroupItem value="events" id="events" />
                              <Label htmlFor="events" className="font-medium">Wydarzenia edukacyjne dla firm</Label>
                            </div>
                          </RadioGroup>
                        )}
                      />
                      {errors.serviceType && (
                        <p className="text-red-500 text-sm">{errors.serviceType.message as string}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button type="submit">
                      Dalej
                    </Button>
                  </div>
                </form>
              )}
              
              {step === 2 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Szczegóły usługi</h2>
                  
                  {/* UDT Operator Form */}
                  {serviceType === 'udt-operator' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="udtOperatorType">Wybierz maszynę lub pojazd</Label>
                        <Controller
                          name="udtOperatorType"
                          control={control}
                          rules={{ required: "Wybierz maszynę lub pojazd" }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Wybierz maszynę lub pojazd" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="forklifts-standard">Wózki bez specjalizowanych</SelectItem>
                                <SelectItem value="winches">Wciągniki i wciągarki</SelectItem>
                                <SelectItem value="platforms">Podesty ruchome</SelectItem>
                                <SelectItem value="cranes">Suwnice</SelectItem>
                                <SelectItem value="storage-stacker">Układnice magazynowe</SelectItem>
                                <SelectItem value="forklifts-specialized">Wózki specjalizowane</SelectItem>
                                <SelectItem value="stationary-cranes">Żurawie stacjonarne</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.udtOperatorType && (
                          <p className="text-red-500 text-sm">{errors.udtOperatorType.message as string}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* UDT Conservator Form */}
                  {serviceType === 'udt-conservator' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="udtConservatorType">Wybierz maszynę lub pojazd</Label>
                        <Controller
                          name="udtConservatorType"
                          control={control}
                          rules={{ required: "Wybierz maszynę lub pojazd" }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Wybierz maszynę lub pojazd" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="cranes">Suwnice</SelectItem>
                                <SelectItem value="winches">Wciągniki i wciągarki</SelectItem>
                                <SelectItem value="stationary-cranes">Żurawie stacjonarne</SelectItem>
                                <SelectItem value="storage-stacker">Układnice magazynowe</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.udtConservatorType && (
                          <p className="text-red-500 text-sm">{errors.udtConservatorType.message as string}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* SEP Form */}
                  {serviceType === 'sep' && (
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="sepType">Wybierz rodzaj uprawnień SEP</Label>
                        <Controller
                          name="sepType"
                          control={control}
                          rules={{ required: "Wybierz rodzaj uprawnień SEP" }}
                          render={({ field }) => (
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <SelectTrigger>
                                <SelectValue placeholder="Wybierz rodzaj uprawnień SEP" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="electrical">Elektryczne [E1, D1]</SelectItem>
                                <SelectItem value="thermal">Cieplne [E2, D2]</SelectItem>
                                <SelectItem value="gas">Gazowe [E3, D3]</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        {errors.sepType && (
                          <p className="text-red-500 text-sm">{errors.sepType.message as string}</p>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Other Services Form */}
                  {(serviceType === 'soldering' || serviceType === 'forklifts' || serviceType === 'refresher' || serviceType === 'events') && (
                    <div className="space-y-4">
                      <p className="text-gray-600">
                        {serviceType === 'soldering' && "Szkolenie lutownicze dla pracowników firm zajmujących się procesami lutowania."}
                        {serviceType === 'forklifts' && "Szkolenie na wózki unoszące dla operatorów."}
                        {serviceType === 'refresher' && "Szkolenia przypominające dla osób, które posiadają już uprawnienia."}
                        {serviceType === 'events' && "Wydarzenia edukacyjne dostosowane do potrzeb Twojej firmy."}
                      </p>
                      <p className="text-gray-600">
                        Prosimy o podanie dodatkowych informacji w formularzu, abyśmy mogli lepiej dopasować ofertę.
                      </p>
                    </div>
                  )}
                  
                  <Separator />
                  
                  {/* Common form fields for step 2 */}
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="participantsCount">Ile osób ma wziąć udział?</Label>
                      <Controller
                        name="participantsCount"
                        control={control}
                        rules={{ required: "Podaj liczbę uczestników" }}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Wybierz liczbę uczestników" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="1">1 osoba</SelectItem>
                              <SelectItem value="2-5">2-5 osób</SelectItem>
                              <SelectItem value="6-10">6-10 osób</SelectItem>
                              <SelectItem value="11-15">11-15 osób</SelectItem>
                              <SelectItem value="15+">Powyżej 15 pracowników - dedykowana wycena</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.participantsCount && (
                        <p className="text-red-500 text-sm">{errors.participantsCount.message as string}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="additionalInfo">Dodatkowe informacje (opcjonalnie)</Label>
                      <textarea
                        {...register("additionalInfo")}
                        id="additionalInfo"
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Dodatkowe informacje, które pomogą nam lepiej przygotować ofertę..."
                      ></textarea>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={goBack}>
                      Wstecz
                    </Button>
                    <Button type="submit">
                      Dalej
                    </Button>
                  </div>
                </form>
              )}
              
              {step === 3 && (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <h2 className="text-2xl font-bold mb-6">Dane kontaktowe</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Imię i nazwisko</Label>
                      <Input
                        id="name"
                        {...register("name", { required: "Podaj imię i nazwisko" })}
                        placeholder="Twoje imię i nazwisko"
                        className={errors.name ? "border-red-500" : ""}
                      />
                      {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="company">Nazwa firmy</Label>
                      <Input
                        id="company"
                        {...register("company", { required: "Podaj nazwę firmy" })}
                        placeholder="Nazwa firmy"
                        className={errors.company ? "border-red-500" : ""}
                      />
                      {errors.company && <p className="text-red-500 text-sm">{errors.company.message as string}</p>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email firmowy</Label>
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
                        placeholder="twoj@firma.pl"
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Numer telefonu</Label>
                      <Input
                        id="phone"
                        {...register("phone", { required: "Podaj numer telefonu" })}
                        placeholder="+48 123 456 789"
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Controller
                        name="consent"
                        control={control}
                        rules={{ required: "Wymagana zgoda na przetwarzanie danych" }}
                        render={({ field }) => (
                          <Checkbox 
                            id="consent" 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        )}
                      />
                      <div>
                        <Label htmlFor="consent" className="text-sm font-normal">
                          Wyrażam zgodę na przetwarzanie moich danych osobowych w celu przygotowania i przesłania oferty szkoleniowej.
                        </Label>
                        {errors.consent && <p className="text-red-500 text-xs">{errors.consent.message as string}</p>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Controller
                        name="marketing"
                        control={control}
                        render={({ field }) => (
                          <Checkbox 
                            id="marketing" 
                            checked={field.value} 
                            onCheckedChange={field.onChange} 
                          />
                        )}
                      />
                      <Label htmlFor="marketing" className="text-sm font-normal">
                        Wyrażam zgodę na otrzymywanie informacji marketingowych dotyczących szkoleń i usług (opcjonalnie).
                      </Label>
                    </div>
                  </div>
                  
                  <div className="pt-4 flex justify-between">
                    <Button type="button" variant="outline" onClick={goBack}>
                      Wstecz
                    </Button>
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-600">
                      Wyślij formularz
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dlaczego warto skorzystać z błyskawicznej wyceny?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Błyskawiczna wycena może być kluczową przewagą konkurencyjną i mieć znaczący wpływ na wielkość sprzedaży, ponieważ ponad 80% kupujących deklaruje, że wybiera firmę, która jako pierwsza dostarczy ofertę.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Oszczędność czasu</h3>
              <p className="text-gray-600">
                Natychmiastowa wycena pozwala na szybkie podjęcie decyzji bez długiego oczekiwania na odpowiedź.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Przejrzystość oferty</h3>
              <p className="text-gray-600">
                Dokładna wycena zawierająca wszystkie niezbędne informacje, bez ukrytych kosztów.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Optymalizacja kosztów</h3>
              <p className="text-gray-600">
                Możliwość porównania różnych opcji i wybrania najbardziej opłacalnego rozwiązania dla Twojej firmy.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;
