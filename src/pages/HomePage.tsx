import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Briefcase, BarChart, CheckCircle, BookOpen, Clock, ThumbsUp } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ServiceCard from '@/components/ServiceCard';
import Testimonial from '@/components/Testimonial';
import FAQ from '@/components/FAQ';
import ProcessStep from '@/components/ProcessStep';
import { useScrollAnimation, useStaggeredAnimation, useCounterAnimation } from '@/hooks/useScrollAnimation';

const HomePage = () => {
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLElement>();
  const { elementRef: servicesHeaderRef, isInView: servicesHeaderInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: servicesGridRef, visibleItems: visibleServices } = useStaggeredAnimation<HTMLDivElement>(5, 200);
  const { elementRef: whyUsHeaderRef, isInView: whyUsHeaderInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: whyUsContentRef, isInView: whyUsContentInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: statsRef, visibleItems: visibleStats } = useStaggeredAnimation<HTMLDivElement>(4, 150);
  const { elementRef: processHeaderRef, isInView: processHeaderInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: processStepsRef, visibleItems: visibleSteps } = useStaggeredAnimation<HTMLDivElement>(6, 200);
  const { elementRef: testimonialsHeaderRef, isInView: testimonialsHeaderInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: testimonialsGridRef, visibleItems: visibleTestimonials } = useStaggeredAnimation<HTMLDivElement>(3, 250);
  const { elementRef: auditRef, isInView: auditInView } = useScrollAnimation<HTMLElement>();
  const { elementRef: auditBenefitsRef, visibleItems: visibleBenefits } = useStaggeredAnimation<HTMLDivElement>(3, 200);

  // Counter animations for stats
  const { elementRef: counter1Ref, count: count1 } = useCounterAnimation<HTMLDivElement>(10, 2000);
  const { elementRef: counter2Ref, count: count2 } = useCounterAnimation<HTMLDivElement>(500, 2500);
  const { elementRef: counter3Ref, count: count3 } = useCounterAnimation<HTMLDivElement>(1000, 3000);
  const { elementRef: counter4Ref, count: count4 } = useCounterAnimation<HTMLDivElement>(80, 2200);

  const services = [
    {
      title: "Uprawnienia UDT dla operatorów",
      description: "Szkolenia i certyfikacja dla operatorów urządzeń transportu bliskiego, takich jak wózki widłowe, suwnice i podesty ruchome.",
      icon: <Award size={40} className="text-orange-500" />,
      link: "/uslugi/udt-operatorzy"
    },
    {
      title: "Uprawnienia UDT dla konserwatorów",
      description: "Kursy dla konserwatorów urządzeń transportu bliskiego, takich jak suwnice i żurawie. Teoria online, praktyka stacjonarna.",
      icon: <Briefcase size={40} className="text-orange-500" />,
      link: "/uslugi/udt-konserwatorzy"
    },
    {
      title: "Uprawnienia SEP",
      description: "Szkolenia i certyfikacja w zakresie uprawnień SEP: elektryczne, cieplne i gazowe dla pracowników obsługujących specjalistyczne urządzenia.",
      icon: <BookOpen size={40} className="text-orange-500" />,
      link: "/uslugi/sep"
    },
    {
      title: "Szkolenia z lutowania",
      description: "Profesjonalne kursy dla firm zajmujących się procesami lutowania. Podnosimy jakość produkcji i redukujemy liczbę błędów.",
      icon: <BarChart size={40} className="text-orange-500" />,
      link: "/uslugi/lutowanie"
    },
    {
      title: "Eventy edukacyjne",
      description: "Organizacja wydarzeń edukacyjnych dla firm, które chcą zwiększyć świadomość pracowników w zakresie bezpieczeństwa technicznego.",
      icon: <Users size={40} className="text-orange-500" />,
      link: "/uslugi/eventy"
    }
  ];
  
  const faqItems = [
    {
      question: "Czym zajmuje się Wasza firma?",
      answer: "Specjalizujemy się w szkoleniach z zakresu BHP, uprawnień UDT (zarówno dla operatorów, jak i konserwatorów), SEP oraz w szkoleniach specjalistycznych, takich jak spawalnicze i na wózki unoszące. Nasze usługi są skierowane głównie do dużych firm produkcyjnych, które potrzebują regularnych szkoleń dla swoich pracowników."
    },
    {
      question: "Do kogo skierowane są Wasze usługi?",
      answer: "Nasze usługi są dedykowane głównie dla dużych firm produkcyjnych, które chcą podnosić kompetencje swoich pracowników oraz zapewnić im wymagane uprawnienia do obsługi specjalistycznego sprzętu."
    },
    {
      question: "Co wyróżnia Waszą firmę na rynku?",
      answer: "Wyróżnia nas elastyczność oraz głęboka znajomość specyfiki branży produkcyjnej. Oferujemy szkolenia dostosowane do harmonogramu firm oraz możliwość realizacji szkoleń w formie stacjonarnej, online i hybrydowej. Dodatkowo, zapewniamy bezpłatny audyt, który pozwala na optymalizację kosztów szkoleń w firmach."
    },
    {
      question: "Jak wygląda proces współpracy?",
      answer: "Proces współpracy jest uzależniony od sytuacji klienta. Jeśli klient wie jakiego typu rozwiązań potrzebuje, dostaraczmy błyskawiczną wycenę która pozwala mu zrozumieć pełny koszt współpracy. Natomiast dla firm które potrzebują kompleksowego wsparcia i identyfikacji możliwych sposobów optymalizacji kosztów szkoleń rekomendujemy rozpoczęcie od audytu, który pozwala nam na zrozumienie potrzeb szkoleniowych firmy."
    },
    {
      question: "Jakie doświadczenie posiada Wasz zespół?",
      answer: "Nasz zespół składa się z doświadczonych trenerów, którzy od lat specjalizują się w szkoleniach dla sektora produkcyjnego. Każdy z naszych specjalistów posiada odpowiednie certyfikaty oraz praktyczne doświadczenie, co gwarantuje najwyższą jakość szkoleń."
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
      title: "Organizacja egzaminu",
      description: "Koordynujemy cały proces egzaminacyjny."
    },
    {
      number: 6,
      title: "Przekazanie uprawnień",
      description: "Dostarczamy wszystkie niezbędne certyfikaty i uprawnienia."
    }
  ];
  
  const benefits = [
    {
      title: "Elastyczny harmonogram",
      description: "Dostosowujemy terminy szkoleń do Twojego harmonogramu pracy.",
      icon: <Clock size={24} className="text-orange-500" />
    },
    {
      title: "Doświadczeni trenerzy",
      description: "Nasi trenerzy to specjaliści z wieloletnim doświadczeniem w branży.",
      icon: <Award size={24} className="text-orange-500" />
    },
    {
      title: "Szkolenia szyte na miarę",
      description: "Każde szkolenie jest dopasowane do specyficznych potrzeb Twojej firmy.",
      icon: <CheckCircle size={24} className="text-orange-500" />
    },
    {
      title: "Najwyższa jakość",
      description: "Gwarantujemy najwyższą jakość szkoleń i wsparcie na każdym etapie.",
      icon: <ThumbsUp size={24} className="text-orange-500" />
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="hero-gradient text-white py-16 md:py-24 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className={`text-4xl md:text-5xl font-bold mb-6 transition-all duration-1000 ${
                heroInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
              }`}>
                Pomagamy firmom produkcyjnym działać bez ryzyka
              </h1>
              <p className={`text-lg mb-8 transition-all duration-1000 ${
                heroInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
              }`} style={{ animationDelay: '0.3s' }}>
                Zapewniamy pełną zgodność uprawnień UDT i SEP dla pracowników. Stosujemy procesowe podejście, które umożliwia precyzyjne dopasowanie szkoleń do indywidualnych potrzeb klienta.
              </p>
              <div className={`flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-1000 ${
                heroInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
              }`} style={{ animationDelay: '0.6s' }}>
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 will-change-transform">
                  <Link to="/o-nas">Dlaczego My?</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600 transition-all duration-300 hover:scale-105 will-change-transform">
                  <Link to="/wycena">Błyskawiczna Wycena</Link>
                </Button>
              </div>
            </div>
            <div className={`flex items-center justify-center transition-all duration-1000 ${
              heroInView ? 'animate-fade-in-left' : 'opacity-0 translate-x-10'
            }`} style={{ animationDelay: '0.4s' }}>
              <div className="w-full max-w-md">
                <AspectRatio ratio={16/9}>
                  <iframe 
                    src="https://www.youtube.com/embed/8QDIVIU9QZQ" 
                    title="Well-Done.pl Company Presentation" 
                    className="w-full h-full border-none transition-transform duration-300 hover:scale-105 will-change-transform" 
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullScreen
                  ></iframe>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={servicesHeaderRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              servicesHeaderInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">Nasze Usługi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oferujemy kompleksowe szkolenia dla firm produkcyjnych, które chcą zapewnić swoim pracownikom niezbędne uprawnienia.
            </p>
          </div>
          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  visibleServices.includes(index) 
                    ? 'animate-fade-in-up opacity-100' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  link={service.link}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div 
              ref={whyUsHeaderRef}
              className={`transition-all duration-1000 ${
                whyUsHeaderInView ? 'animate-fade-in-right' : 'opacity-0 translate-x-10'
              }`}
            >
              <h2 className="text-3xl font-bold mb-6">Dlaczego warto z nami współpracować?</h2>
              <p className="text-gray-600 mb-8">
                Wyróżniamy się elastycznością i zdolnością adaptacji do potrzeb klienta. Oferujemy szkolenia dostosowane do harmonogramu firm, możliwość szkoleń stacjonarnych, online oraz hybrydowych.
              </p>
              <div 
                ref={whyUsContentRef}
                className={`space-y-6 transition-all duration-1000 ${
                  whyUsContentInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
                }`}
                style={{ animationDelay: '0.3s' }}
              >
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex group cursor-pointer transition-all duration-300 hover:translate-x-2">
                    <div className="flex-shrink-0 mr-4 transition-transform duration-300 group-hover:scale-110">
                      {benefit.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1 transition-colors duration-300 group-hover:text-orange-600">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button asChild className="mt-8 transition-all duration-300 hover:scale-105 will-change-transform">
                <Link to="/o-nas">
                  Poznaj nas lepiej <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="relative">
              <div ref={statsRef} className="grid grid-cols-2 gap-4">
                <div 
                  ref={counter1Ref}
                  className={`bg-orange-50 rounded-lg p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-orange-100 cursor-pointer will-change-transform ${
                    visibleStats.includes(0) ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'
                  }`}
                >
                  <div className="text-3xl font-bold text-orange-600 mb-2">{count1}+</div>
                  <div className="text-gray-600">lat doświadczenia</div>
                </div>
                <div 
                  ref={counter2Ref}
                  className={`bg-orange-50 rounded-lg p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-orange-100 cursor-pointer will-change-transform ${
                    visibleStats.includes(1) ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ animationDelay: '0.15s' }}
                >
                  <div className="text-3xl font-bold text-orange-600 mb-2">{count2}+</div>
                  <div className="text-gray-600">zadowolonych firm</div>
                </div>
                <div 
                  ref={counter3Ref}
                  className={`bg-orange-50 rounded-lg p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-orange-100 cursor-pointer will-change-transform ${
                    visibleStats.includes(2) ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ animationDelay: '0.3s' }}
                >
                  <div className="text-3xl font-bold text-orange-600 mb-2">{count3}+</div>
                  <div className="text-gray-600">zrealizowanych szkoleń</div>
                </div>
                <div 
                  ref={counter4Ref}
                  className={`bg-orange-50 rounded-lg p-6 text-center transition-all duration-700 hover:scale-105 hover:shadow-xl hover:bg-orange-100 cursor-pointer will-change-transform ${
                    visibleStats.includes(3) ? 'animate-fade-in-up' : 'opacity-0 translate-y-5'
                  }`}
                  style={{ animationDelay: '0.45s' }}
                >
                  <div className="text-3xl font-bold text-orange-600 mb-2">{count4}%</div>
                  <div className="text-gray-600">zleceń dla produkcji</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={processHeaderRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              processHeaderInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">Jak wygląda proces współpracy?</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasze podejście jest oparte na jasno określonym procesie, który zapewnia skuteczne i efektywne szkolenia.
            </p>
          </div>
          <div ref={processStepsRef} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className={`transition-all duration-700 ${
                  visibleSteps.includes(step.number - 1) 
                    ? 'animate-fade-in-up opacity-100' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ animationDelay: `${(step.number - 1) * 0.2}s` }}
              >
                <ProcessStep
                  number={step.number}
                  title={step.title}
                  description={step.description}
                />
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" className="transition-all duration-300 hover:scale-105 will-change-transform animate-pulse-slow">
              <Link to="/wycena">Uzyskaj Błyskawiczną Wycenę</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            ref={testimonialsHeaderRef}
            className={`text-center mb-12 transition-all duration-1000 ${
              testimonialsHeaderInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-3xl font-bold mb-4">Co mówią nasi klienci</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Współpracujemy z czołowymi firmami produkcyjnymi. Poznaj opinie naszych klientów.
            </p>
          </div>
          <div ref={testimonialsGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className={`transition-all duration-700 ${
                visibleTestimonials.includes(0) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <Testimonial
                quote="Dzięki współpracy z firmą, nasi pracownicy uzyskali certyfikaty UDT, co pozwoliło nam na podniesienie standardów bezpieczeństwa w firmie."
                author="Jan Kowalski"
                role="Specjalista BHP"
                company="Firma X"
              />
            </div>
            <div
              className={`transition-all duration-700 ${
                visibleTestimonials.includes(1) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ animationDelay: '0.25s' }}
            >
              <Testimonial
                quote="Profesjonalne szkolenia, które dostosowali do naszych potrzeb. Współpraca była szybka i bezproblemowa."
                author="Anna Nowak"
                role="HR Manager"
                company="Firma Y"
              />
            </div>
            <div
              className={`transition-all duration-700 ${
                visibleTestimonials.includes(2) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              <Testimonial
                quote="Bezpłatny audyt pomógł nam zoptymalizować proces szkoleniowy, co przełożyło się na realne oszczędności."
                author="Piotr Wiśniewski"
                role="Dyrektor Operacyjny"
                company="Firma Z"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Free Audit CTA */}
      <section 
        ref={auditRef}
        className="py-16 bg-orange-600 text-white overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${
              auditInView ? 'animate-slide-in-left' : 'opacity-0 translate-x-10'
            }`}>
              <h2 className="text-3xl font-bold mb-4">Skorzystaj z bezpłatnego audytu</h2>
              <p className="text-lg mb-6">
                Zastanawiasz się, czy Twoje szkolenia są odpowiednio dobrane i czy nie przepłacasz za uzyskiwanie uprawnień pracowników? Skorzystaj z bezpłatnego audytu i dowiedz się, jak możemy pomóc.
              </p>
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 transition-all duration-300 hover:scale-105 will-change-transform animate-pulse-slow">
                <Link to="/bezplatny-audyt">Zamów bezpłatny audyt</Link>
              </Button>
            </div>
            <div ref={auditBenefitsRef} className="space-y-4">
              <div
                className={`bg-orange-500 rounded-lg p-4 transition-all duration-700 hover:bg-orange-400 hover:scale-105 cursor-pointer will-change-transform ${
                  visibleBenefits.includes(0) ? 'animate-fade-in-right' : 'opacity-0 translate-x-5'
                }`}
              >
                <h3 className="font-semibold mb-2">Ocena aktualnych szkoleń</h3>
                <p>Przeanalizujemy, czy obecne szkolenia spełniają wszystkie wymagania prawne oraz czy odpowiadają na realne potrzeby Twojej firmy.</p>
              </div>
              <div
                className={`bg-orange-500 rounded-lg p-4 transition-all duration-700 hover:bg-orange-400 hover:scale-105 cursor-pointer will-change-transform ${
                  visibleBenefits.includes(1) ? 'animate-fade-in-right' : 'opacity-0 translate-x-5'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                <h3 className="font-semibold mb-2">Weryfikacja uprawnień pracowników</h3>
                <p>Sprawdzimy, czy wszyscy pracownicy posiadają wymagane uprawnienia do obsługi sprzętu i urządzeń.</p>
              </div>
              <div
                className={`bg-orange-500 rounded-lg p-4 transition-all duration-700 hover:bg-orange-400 hover:scale-105 cursor-pointer will-change-transform ${
                  visibleBenefits.includes(2) ? 'animate-fade-in-right' : 'opacity-0 translate-x-5'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
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

export default HomePage;
