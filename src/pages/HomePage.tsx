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
import AuditCard from '@/components/AuditCard';
import AuditStatsCounter from '@/components/AuditStatsCounter';

const HomePage = () => {
  const { elementRef: statsRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(4, 300);

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

  // Improved StatCard with proper fallback logic
  const StatCard = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
    const { elementRef, count } = useCounterAnimation<HTMLDivElement>(value, 2000);
    const index = Math.floor(delay / 300); // Updated to match new delay
    const isVisible = visibleItems.includes(index) || showAllFallback;
    
    console.log(`StatCard ${label}: index=${index}, isVisible=${isVisible}, visibleItems=`, visibleItems, 'showAllFallback=', showAllFallback);
    
    return (
      <div 
        ref={elementRef}
        className="bg-orange-50 rounded-lg p-6 text-center"
        style={{ 
          opacity: 1, // Always show card
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease-out',
          transitionDelay: isVisible ? `${delay}ms` : '0ms'
        }}
      >
        <div className="text-3xl font-bold text-orange-600 mb-2">
          {isVisible ? count : value}{value >= 1000 ? '+' : value === 80 || value === 96 ? '%' : '+'}
        </div>
        <div className="text-gray-600">{label}</div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Pomagamy firmom produkcyjnym działać bez ryzyka
              </h1>
              <p className="text-lg mb-8">
                Zapewniamy pełną zgodność uprawnień UDT i SEP dla pracowników. Stosujemy procesowe podejście, które umożliwia precyzyjne dopasowanie szkoleń do indywidualnych potrzeb klienta.
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
                  <Link to="/o-nas">Dlaczego My?</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600">
                  <Link to="/wycena">Błyskawiczna Wycena</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <AspectRatio ratio={16/9}>
                  <iframe 
                    src="https://www.youtube.com/embed/8QDIVIU9QZQ" 
                    title="Well-Done.pl Company Presentation" 
                    className="w-full h-full border-none" 
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
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nasze Usługi</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Oferujemy kompleksowe szkolenia dla firm produkcyjnych, które chcą zapewnić swoim pracownikom niezbędne uprawnienia.
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
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection benefits={benefits} statsRef={statsRef} visibleItems={visibleItems} StatCard={StatCard} showAllFallback={showAllFallback} />

      {/* Process Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className="text-center mb-12"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.8s ease-out'
            }}
          >
            <div className="relative inline-block">
              <span className="text-orange-600 font-medium text-sm uppercase tracking-wide animate-pulse-slow">
                Jak to działa?
              </span>
              <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-orange-400 to-orange-600 animate-shimmer" />
            </div>
            <h2 className="text-3xl font-bold mb-4 mt-4">
              <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Jak wygląda proces współpracy?
              </span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Nasze podejście jest oparte na jasno określonym procesie, który zapewnia skuteczne i efektywne szkolenia.
            </p>
          </div>
          
          <div className="relative">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-3xl opacity-50" />
            
            <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-4 p-8">
              {processSteps.map((step, index) => (
                <ProcessStep
                  key={step.number}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  index={index}
                />
              ))}
            </div>
          </div>
          
          <div 
            className="text-center mt-12"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.8s ease-out',
              transitionDelay: '1.8s'
            }}
          >
            <div className="relative inline-block group">
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 relative overflow-hidden">
                <Link to="/wycena">
                  <span className="relative z-10">Uzyskaj Błyskawiczną Wycenę</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              
              {/* Animated background glow */}
              <div className="absolute inset-0 bg-orange-400 rounded-lg opacity-30 blur-lg scale-110 group-hover:scale-125 transition-transform duration-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Co mówią nasi klienci</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Współpracujemy z czołowymi firmami produkcyjnymi. Poznaj opinie naszych klientów.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="Dzięki współpracy z firmą, nasi pracownicy uzyskali certyfikaty UDT, co pozwoliło nam na podniesienie standardów bezpieczeństwa w firmie."
              author="Jan Kowalski"
              role="Specjalista BHP"
              company="Firma X"
            />
            <Testimonial
              quote="Profesjonalne szkolenia, które dostosowali do naszych potrzeb. Współpraca była szybka i bezproblemowa."
              author="Anna Nowak"
              role="HR Manager"
              company="Firma Y"
            />
            <Testimonial
              quote="Bezpłatny audyt pomógł nam zoptymalizować proces szkoleniowy, co przełożyło się na realne oszczędności."
              author="Piotr Wiśniewski"
              role="Dyrektor Operacyjny"
              company="Firma Z"
            />
          </div>
        </div>
      </section>

      {/* Free Audit CTA */}
      <section className="py-12 lg:py-16 relative overflow-hidden">
        {/* Background with gradient and geometric shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header with animation */}
          <div className="text-center mb-8 lg:mb-12">
            <div 
              className="inline-block mb-4"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.8s ease-out'
              }}
            >
              <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Bezpłatna analiza
              </span>
            </div>
            <h2 
              className="text-4xl lg:text-5xl font-bold text-white mb-6"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.8s ease-out',
                transitionDelay: '200ms'
              }}
            >
              Skorzystaj z bezpłatnego audytu
            </h2>
            <p 
              className="text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.8s ease-out',
                transitionDelay: '400ms'
              }}
            >
              Zastanawiasz się, czy Twoje szkolenia są odpowiednio dobrane i czy nie przepłacasz za uzyskiwanie uprawnień pracowników? Skorzystaj z bezpłatnego audytu i dowiedz się, jak możemy pomóc.
            </p>
          </div>

          {/* Stats Section */}
          <div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12"
            style={{
              opacity: 1,
              transform: 'translateY(0)',
              transition: 'all 0.8s ease-out',
              transitionDelay: '600ms'
            }}
          >
            <AuditStatsCounter value={150} label="Przeprowadzonych audytów" suffix="+" index={0} />
            <AuditStatsCounter value={95} label="Zadowolonych klientów" suffix="%" index={1} />
            <AuditStatsCounter value={30} label="Średnia oszczędność" suffix="%" index={2} />
            <AuditStatsCounter value={48} label="Godzin na audyt" suffix="h" index={3} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left side - CTA */}
            <div 
              className="order-2 lg:order-1"
              style={{
                opacity: 1,
                transform: 'translateX(0)',
                transition: 'all 1s ease-out',
                transitionDelay: '800ms'
              }}
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Odkryj potencjał oszczędności w swojej firmie
                </h3>
                <p className="text-orange-50 text-lg leading-relaxed">
                  Nasz bezpłatny audyt pomoże Ci zidentyfikować obszary, w których możesz zoptymalizować koszty szkoleń i poprawić efektywność procesu certyfikacji pracowników.
                </p>
                <div className="relative inline-block group">
                  <div className="absolute inset-0 bg-white rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity duration-300" />
                  <Button asChild size="lg" className="relative bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                    <Link to="/bezplatny-audyt">
                      Zamów bezpłatny audyt
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right side - Cards */}
            <div className="order-1 lg:order-2 space-y-6">
              <AuditCard
                title="Ocena aktualnych szkoleń"
                description="Przeanalizujemy, czy obecne szkolenia spełniają wszystkie wymagania prawne oraz czy odpowiadają na realne potrzeby Twojej firmy."
                icon="check"
                index={0}
              />
              <AuditCard
                title="Weryfikacja uprawnień pracowników"
                description="Sprawdzimy, czy wszyscy pracownicy posiadają wymagane uprawnienia do obsługi sprzętu i urządzeń."
                icon="users"
                index={1}
              />
              <AuditCard
                title="Optymalizacja kosztów"
                description="Pomożemy zidentyfikować, czy nie przepłacasz za szkolenia i certyfikacje, oraz wskażemy obszary, w których możesz zredukować koszty."
                icon="dollar-sign"
                index={2}
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={faqItems} />
    </div>
  );
};

// Updated WhyChooseUsSection with improved props
const WhyChooseUsSection = React.memo(({ benefits, statsRef, visibleItems, StatCard, showAllFallback }: { 
  benefits: any[]; 
  statsRef: React.RefObject<HTMLDivElement>; 
  visibleItems: number[]; 
  StatCard: any;
  showAllFallback: boolean;
}) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>({ 
    triggerOnce: true,
    threshold: 0.3
  });
  
  const { elementRef: benefitsRef, isInView: benefitsInView } = useScrollAnimation<HTMLDivElement>({ 
    triggerOnce: true,
    threshold: 0.2
  });
  
  const { elementRef: buttonRef, isInView: buttonInView } = useScrollAnimation<HTMLDivElement>({ 
    triggerOnce: true,
    threshold: 0.5
  });

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              ref={titleRef}
              className="transition-all duration-800"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <h2 className="text-3xl font-bold mb-6">Dlaczego warto z nami współpracować?</h2>
              <p className="text-gray-600 mb-8">
                Wyróżniamy się elastycznością i zdolnością adaptacji do potrzeb klienta. Oferujemy szkolenia dostosowane do harmonogramu firm, możliwość szkoleń stacjonarnych, online oraz hybrydowych.
              </p>
            </div>
            
            <div ref={benefitsRef} className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex transition-all duration-700"
                  style={{
                    opacity: benefitsInView ? 1 : 0,
                    transform: benefitsInView ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: benefitsInView ? `${index * 200}ms` : '0ms'
                  }}
                >
                  <div className="flex-shrink-0 mr-4 transition-transform duration-300 hover:scale-110">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div 
              ref={buttonRef}
              className="mt-8 transition-all duration-800"
              style={{
                opacity: buttonInView ? 1 : 0,
                transform: buttonInView ? 'translateY(0)' : 'translateY(20px)',
                transitionDelay: buttonInView ? '800ms' : '0ms'
              }}
            >
              <Button asChild className="hover:scale-105 transition-transform duration-300">
                <Link to="/o-nas">
                  Poznaj nas lepiej <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative" ref={statsRef}>
            <div className="grid grid-cols-2 gap-4">
              <StatCard value={10} label="lat doświadczenia" delay={0} />
              <StatCard value={500} label="zadowolonych firm" delay={300} />
              <StatCard value={1000} label="zrealizowanych szkoleń" delay={600} />
              <StatCard value={80} label="zleceń dla produkcji" delay={900} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseUsSection.displayName = 'WhyChooseUsSection';

export default HomePage;
