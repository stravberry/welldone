
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useForm } from 'react-hook-form';
import { Check, ClipboardCheck, Search, TrendingUp, FileSearch } from 'lucide-react';
import { toast } from 'sonner';

const FreeAuditPage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    toast.success("Formularz został wysłany! Skontaktujemy się wkrótce, aby omówić szczegóły audytu.");
    reset();
  };

  const benefits = [
    {
      title: "Ocena aktualnych szkoleń",
      description: "Przeanalizujemy, czy obecne szkolenia spełniają wszystkie wymagania prawne oraz czy odpowiadają na realne potrzeby Twojej firmy.",
      icon: <ClipboardCheck size={40} className="text-blue-500" />
    },
    {
      title: "Weryfikacja uprawnień pracowników",
      description: "Sprawdzimy, czy wszyscy pracownicy posiadają wymagane uprawnienia do obsługi sprzętu i urządzeń w Twojej firmie.",
      icon: <Search size={40} className="text-blue-500" />
    },
    {
      title: "Optymalizacja kosztów",
      description: "Pomożemy zidentyfikować, czy nie przepłacasz za szkolenia i certyfikacje, oraz wskażemy obszary, w których możesz zredukować koszty.",
      icon: <TrendingUp size={40} className="text-blue-500" />
    },
    {
      title: "Dostosowanie szkoleń do potrzeb firmy",
      description: "Oferujemy indywidualnie dobrane programy szkoleniowe, które idealnie pasują do specyfiki Twojej produkcji i działalności.",
      icon: <FileSearch size={40} className="text-blue-500" />
    }
  ];
  
  const steps = [
    {
      number: 1,
      title: "Wypełnienie formularza zgłoszeniowego",
      description: "Skontaktuj się z nami poprzez formularz poniżej, a my skontaktujemy się z Tobą w ciągu 24 godzin."
    },
    {
      number: 2,
      title: "Spotkanie konsultacyjne",
      description: "Umówimy się na krótką rozmowę, podczas której omówimy specyfikę Twojej firmy oraz wymagania dotyczące szkoleń."
    },
    {
      number: 3,
      title: "Przeprowadzenie audytu",
      description: "Nasi eksperci dokonają analizy Twoich obecnych procesów szkoleniowych, przeglądając dokumenty i certyfikaty."
    },
    {
      number: 4,
      title: "Raport i rekomendacje",
      description: "Po audycie otrzymasz pełny raport z wnioskami i rekomendacjami dotyczącymi optymalizacji procesów szkoleniowych."
    }
  ];
  
  const testimonials = [
    {
      quote: "Bezpłatny audyt pomógł nam zredukować koszty szkoleniowe o 20%. Zespół dokładnie przeanalizował nasze potrzeby i zaproponował skuteczne rozwiązania.",
      author: "Jan Kowalski",
      role: "HR Manager",
      company: "Firma X"
    },
    {
      quote: "Dzięki audytowi dowiedzieliśmy się, które szkolenia były nadmiarowe i jak zoptymalizować harmonogramy szkoleń dla naszych pracowników.",
      author: "Anna Nowak",
      role: "Specjalista BHP",
      company: "Firma Y"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Bezpłatny audyt szkoleniowy</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Zastanawiasz się, czy Twoje szkolenia są odpowiednio dobrane i czy nie przepłacasz za uzyskiwanie uprawnień pracowników? Skorzystaj z bezpłatnego audytu i dowiedz się, jak możemy pomóc w optymalizacji procesów szkoleniowych.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Dlaczego warto skorzystać z audytu?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz bezpłatny audyt pozwoli Ci ocenić skuteczność obecnych procesów szkoleniowych i zidentyfikować obszary do optymalizacji.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What Includes Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Co obejmuje audyt?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz kompleksowy audyt obejmuje wszystkie kluczowe aspekty procesów szkoleniowych w Twojej firmie.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Analiza dokumentacji szkoleniowej</h3>
              <p className="text-gray-600">
                Sprawdzimy, jakie szkolenia i certyfikaty są aktualnie wymagane oraz które z nich mogą wymagać odświeżenia.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Przegląd kompetencji pracowników</h3>
              <p className="text-gray-600">
                Zidentyfikujemy luki w kompetencjach pracowników i wskażemy obszary, które mogą wymagać uzupełnienia.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-3">Rekomendacje dotyczące przyszłych szkoleń</h3>
              <p className="text-gray-600">
                Po audycie przedstawimy raport z rekomendacjami, które kursy są konieczne, a które można przełożyć lub zoptymalizować.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Jak wygląda proces audytu?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasz proces audytu jest prosty i nieinwazyjny, zaprojektowany tak, aby dostarczyć wartość przy minimalnym obciążeniu dla Twojego zespołu.
            </p>
          </div>
          <div className="space-y-12 md:space-y-0 md:grid md:grid-cols-4 md:gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex md:block md:text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white font-bold md:mx-auto">
                    {step.number}
                  </div>
                  <div className="ml-4 md:ml-0 md:mt-4">
                    <h3 className="text-lg font-semibold mb-1">{step.title}</h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
                {step.number < steps.length && (
                  <div className="hidden md:block absolute top-6 left-full w-full transform -translate-x-1/2 mt-6 border-t-2 border-dashed border-gray-300"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Opinie klientów</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Sprawdź, co mówią nasi klienci o przeprowadzonych audytach.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-gray-600">{testimonial.role}, {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-xl overflow-hidden">
            <div className="p-6 sm:p-10">
              <h2 className="text-2xl font-bold mb-6 text-center">Skorzystaj z bezpłatnego audytu już teraz!</h2>
              <p className="text-gray-600 mb-8 text-center">
                Wypełnij poniższy formularz, a nasz ekspert skontaktuje się z Tobą w ciągu 24 godzin.
              </p>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Imię i nazwisko</Label>
                    <Input
                      id="name"
                      placeholder="Twoje imię i nazwisko"
                      {...register("name", { required: "To pole jest wymagane" })}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && <p className="text-red-500 text-sm">{errors.name.message as string}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company">Nazwa firmy</Label>
                    <Input
                      id="company"
                      placeholder="Nazwa Twojej firmy"
                      {...register("company", { required: "To pole jest wymagane" })}
                      className={errors.company ? "border-red-500" : ""}
                    />
                    {errors.company && <p className="text-red-500 text-sm">{errors.company.message as string}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail firmowy</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="twoj@firma.pl"
                      {...register("email", { 
                        required: "To pole jest wymagane",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Nieprawidłowy adres e-mail"
                        }
                      })}
                      className={errors.email ? "border-red-500" : ""}
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message as string}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefon kontaktowy</Label>
                    <Input
                      id="phone"
                      placeholder="+48 123 456 789"
                      {...register("phone", { required: "To pole jest wymagane" })}
                      className={errors.phone ? "border-red-500" : ""}
                    />
                    {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message as string}</p>}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="needs">Opisz krótko swoje potrzeby / co chciałbyś osiągnąć</Label>
                  <Textarea
                    id="needs"
                    placeholder="Opisz, jakie szkolenia prowadzisz, jakie masz wyzwania, czego oczekujesz po audycie..."
                    rows={5}
                    {...register("needs", { required: "To pole jest wymagane" })}
                    className={errors.needs ? "border-red-500" : ""}
                  />
                  {errors.needs && <p className="text-red-500 text-sm">{errors.needs.message as string}</p>}
                </div>
                
                <Button type="submit" className="w-full" size="lg">
                  Zgłoś się na audyt
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Free<lov-add-dependency>react-hook-form@^7.43.0</lov-add-dependency>AuditPage;
