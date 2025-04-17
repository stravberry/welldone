import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Award, Briefcase, BookOpen, BarChart, Users, ArrowRight } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import ProcessStep from '@/components/ProcessStep';
import FAQ from '@/components/FAQ';

const ServicesPage = () => {
  const services = [
    {
      title: "Uprawnienia UDT dla operatorów",
      description: "Szkolenia dla operatorów urządzeń transportu bliskiego, takich jak wózki widłowe, suwnice i podesty ruchome. Dostępne w formie stacjonarnej i online, dostosowane do potrzeb dużych firm produkcyjnych.",
      icon: <Award size={40} className="text-orange-500" />,
      link: "/uslugi/udt-operatorzy"
    },
    {
      title: "Uprawnienia UDT dla konserwatorów",
      description: "Kursy dla konserwatorów urządzeń transportu bliskiego, takich jak suwnice i żurawie. Hybrydowa forma szkolenia: teoria online, praktyka stcjonarna.",
      icon: <Briefcase size={40} className="text-orange-500" />,
      link: "/uslugi/udt-konserwatorzy"
    },
    {
      title: "Uprawnienia SEP",
      description: "Szkolenia i certyfikacja w zakresie uprawnień SEP: elektryczne, cieplne i gazowe. Specjalizujemy się w szkoleniach dla pracowników obsługujących urządzenia generujące ciepło i gaz.",
      icon: <BookOpen size={40} className="text-orange-500" />,
      link: "/uslugi/sep"
    },
    {
      title: "Szkolenia z lutowania",
      description: "Kursy dla firm zajmujących się procesami lutowania. Skupiamy się na podnoszeniu jakości produkcji i redukcji błędów.",
      icon: <BarChart size={40} className="text-orange-500" />,
      link: "/uslugi/lutowanie"
    },
    {
      title: "Eventy edukacyjne",
      description: "Organizacja eventów edukacyjnych dla firm, które chcą zwiększyć świadomość pracowników w zakresie bezpieczeństwa technicznego.",
      icon: <Users size={40} className="text-orange-500" />,
      link: "/uslugi/eventy"
    }
  ];
  
  const processSteps = [
    {
      number: 1,
      title: "Wycena",
      description: "Przygotowujemy indywidualną wycenę dopasowaną do Twoich potrzeb."
    },
    {
      number: 2,
      title: "Weryfikacja założeń projektu",
      description: "Analizujemy dokładnie Twoje potrzeby i oczekiwania."
    },
    {
      number: 3,
      title: "Harmonogram realizacji",
      description: "Ustalamy dogodny dla Ciebie termin i formę szkoleń."
    },
    {
      number: 4,
      title: "Rozpoczęcie szkoleń",
      description: "Realizujemy szkolenia zgodnie z ustalonym harmonogramem."
    },
    {
      number: 5,
      title: "Organizacja egazaminu",
      description: "Koordynujemy cały proces egzaminacyjny."
    },
    {
      number: 6,
      title: "Przekazanie uprawnień",
      description: "Dostarczamy wszystkie niezbędne certyfikaty i uprawnienia."
    }
  ];
  
  const faqItems = [
    {
      question: "Jak mogę zapisać się na szkolenie?",
      answer: "Aby zapisać się na szkolenie, skontaktuj się z nami poprzez formularz kontaktowy na stronie lub zadzwoń bezpośrednio. Nasz zespół pomoże Ci wybrać odpowiedni termin i formę szkolenia dostosowaną do Twoich potrzeb."
    },
    {
      question: "Czy oferujecie szkolenia w siedzibie naszej firmy?",
      answer: "Tak, oferujemy możliwość przeprowadzenia szkoleń w siedzibie klienta. Dzięki temu możemy dostosować program szkolenia do specyfiki Twojego zakładu i sprzętu, z którego korzystacie."
    },
    {
      question: "Jakie są koszty szkoleń i czy istnieje możliwość negocjacji cen przy większych zamówieniach?",
      answer: "Koszt szkoleń zależy od ich rodzaju, liczby uczestników oraz formy realizacji. Przy większych grupach i długotrwałej współpracy oferujemy atrakcyjne rabaty. Prosimy o kontakt w celu uzyskania indywidualnej wyceny."
    },
    {
      question: "Jakie kwalifikacje mają Wasi trenerzy?",
      answer: "Nasi trenerzy to wykwalifikowani specjaliści z wieloletnim doświadczeniem w branży. Posiadają niezbędne certyfikaty oraz praktyczną wiedzę, co gwarantuje wysoką jakość szkoleń."
    },
    {
      question: "Czy po ukończeniu szkolenia otrzymam certyfikat uznawany na terenie całego kraju?",
      answer: "Tak, po pomyślnym ukończeniu szkolenia i zdaniu egzaminu uczestnicy otrzymują certyfikaty uznawane na terenie całej Polski. W przypadku uprawnień UDT i SEP są to oficjalne dokumenty potwierdzające kwalifikacje."
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Usługi / Dla Firm</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Oferujemy kompleksowe szkolenia i certyfikacje dla firm produkcyjnych, dopasowane do indywidualnych potrzeb i specyfiki działalności.
            </p>
          </div>
        </div>
      </section>

      {/* Services Overview Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nasze Usługi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Poznaj naszą ofertę szkoleń i certyfikacji dla firm produkcyjnych. Każda usługa jest dopasowana do specyficznych potrzeb klienta.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                link={service.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Dlaczego warto wybrać nasze szkolenia?</h2>
              <p className="text-gray-600 mb-6">
                Wyróżniamy się elastycznością i zdolnością adaptacji do potrzeb klienta. Oferujemy szkolenia dostosowane do harmonogramu firm, możliwość szkoleń stacjonarnych, online oraz hybrydowych.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Specjalizacja wyłącznie w firmach produkcyjnych</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Elastyczne formy szkoleń: stacjonarne, online, hybrydowe</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Doświadczeni trenerzy z praktyczną wiedzą branżową</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Pełna obsługa procesu certyfikacji</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500 text-white flex items-center justify-center mr-3 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-600">Możliwość przeprowadzenia bezpłatnego audytu szkoleniowego</p>
                </li>
              </ul>
              <Button asChild className="mt-8">
                <Link to="/o-nas">
                  Dowiedz się więcej o nas <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img 
                src="/public/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png" 
                alt="Hierarchia usług" 
                className="w-full h-auto" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Proces współpracy</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasze podejście jest oparte na jasno określonym procesie, który zapewnia skuteczne i efektywne szkolenia.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
            {processSteps.map((step) => (
              <ProcessStep
                key={step.number}
                number={step.number}
                title={step.title}
                description={step.description}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/wycena">Uzyskaj Błyskawiczną Wycenę</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Free Audit CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Skorzystaj z bezpłatnego audytu</h2>
              <p className="text-lg mb-6">
                Zastanawiasz się, czy Twoje szkolenia są odpowiednio dobrane i czy nie przepłacasz za uzyskiwanie uprawnień pracowników? Skorzystaj z bezpłatnego audytu i dowiedz się, jak możemy pomóc.
              </p>
              <Button asChild size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Link to="/bezplatny-audyt">Zamów bezpłatny audyt</Link>
              </Button>
            </div>
            <div className="space-y-4">
              <div className="bg-blue-500 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Ocena aktualnych szkoleń</h3>
                <p>Przeanalizujemy, czy obecne szkolenia spełniają wszystkie wymagania prawne oraz czy odpowiadają na realne potrzeby Twojej firmy.</p>
              </div>
              <div className="bg-blue-500 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Weryfikacja uprawnień pracowników</h3>
                <p>Sprawdzimy, czy wszyscy pracownicy posiadają wymagane uprawnienia do obsługi sprzętu i urządzeń.</p>
              </div>
              <div className="bg-blue-500 rounded-lg p-4">
                <h3 className="font-semibold mb-2">Optymalizacja kosztów</h3>
                <p>Pomożemy zidentyfikować, czy nie przepłacasz za szkolenia i certyfikacje, oraz wskażemy obszary, w których możesz zredukować koszty.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={faqItems} />
    </div>
  );
};

export default ServicesPage;
