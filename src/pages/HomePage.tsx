
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Briefcase, BarChart, CheckCircle, BookOpen, Clock, ThumbsUp, Zap, Target, Star } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import ServiceCard from '@/components/ServiceCard';
import FAQ from '@/components/FAQ';
import ProcessStep from '@/components/ProcessStep';
import { useScrollAnimation, useStaggeredAnimation, useCounterAnimation } from '@/hooks/useScrollAnimation';
import AuditCard from '@/components/AuditCard';
import AuditStatsCounter from '@/components/AuditStatsCounter';
import PartnersSection from '@/components/PartnersSection';
import EnhancedTestimonialsSection from '@/components/EnhancedTestimonialsSection';
import BottomQuoteForm from '@/components/BottomQuoteForm';

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
      answer: "Proces współpracy jest uzależniony od sytuacji klienta. Jeśli klient wie jakiego typu rozwiązań potrzebuje, dostarczamy błyskawiczną wycenę która pozwala mu zrozumieć pełny koszt współpracy. Natomiast dla firm które potrzebują kompleksowego wsparcia i identyfikacji możliwych sposobów optymalizacji kosztów szkoleń rekomendujemy rozpoczęcie od audytu, który pozwala nam na zrozumienie potrzeb szkoleniowych firmy."
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
      title: "Błyskawiczne wyceny",
      description: "Otrzymaj szczegółową wycenę w ciągu 15 minut w godzinach pracy.",
      icon: <Zap size={24} className="text-orange-500" />
    },
    {
      title: "Doświadczeni trenerzy",
      description: "Nasi trenerzy to specjaliści z wieloletnim doświadczeniem w branży.",
      icon: <Award size={24} className="text-orange-500" />
    },
    {
      title: "Szkolenia szyte na miarę",
      description: "Każde szkolenie jest dopasowane do specyficznych potrzeb Twojej firmy.",
      icon: <Target size={24} className="text-orange-500" />
    },
    {
      title: "Gwarancja jakości",
      description: "Certyfikowane szkolenia zgodne z wymogami UDT i SEP oraz najwyższymi standardami.",
      icon: <Star size={24} className="text-orange-500" />
    }
  ];

  // Improved StatCard with proper fallback logic
  const StatCard = ({ value, label, delay }: { value: number; label: string; delay: number }) => {
    const { elementRef, count } = useCounterAnimation<HTMLDivElement>(value, 2000);
    const index = Math.floor(delay / 300);
    const isVisible = visibleItems.includes(index) || showAllFallback;
    
    return (
      <div 
        ref={elementRef}
        className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/15 transition-all duration-300"
        style={{ 
          opacity: 1,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
          transition: 'all 0.6s ease-out',
          transitionDelay: isVisible ? `${delay}ms` : '0ms'
        }}
      >
        <div className="text-4xl font-bold text-white mb-2">
          {isVisible ? count : value}{value >= 1000 ? '+' : value === 80 || value === 96 ? '%' : '+'}
        </div>
        <div className="text-orange-100 font-medium">{label}</div>
      </div>
    );
  };

  return (
    <div>
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        {/* Enhanced gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-red-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        
        {/* Animated background elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide animate-pulse-slow">
                  ✓ Zaufane przez liderów rynku
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Pomagamy firmom produkcyjnym 
                <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent"> działać bez ryzyka</span>
              </h1>
              <p className="text-xl text-orange-50 mb-8 leading-relaxed">
                Zapewniamy pełną zgodność uprawnień UDT i SEP dla pracowników. Stosujemy procesowe podejście, które umożliwia precyzyjne dopasowanie szkoleń do indywidualnych potrzeb klienta.
              </p>
              
              {/* Enhanced stats in hero */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" ref={statsRef}>
                <StatCard value={10} label="lat doświadczenia" delay={0} />
                <StatCard value={500} label="zadowolonych firm" delay={300} />
                <StatCard value={1000} label="zrealizowanych szkoleń" delay={600} />
                <StatCard value={96} label="zadowolonych klientów" delay={900} />
              </div>
              
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                  <Link to="/wycena">
                    <Zap className="mr-2 h-5 w-5" />
                    Błyskawiczna Wycena
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-orange-600 font-bold">
                  <Link to="/o-nas">Dlaczego My?</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <AspectRatio ratio={16/9}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 overflow-hidden shadow-2xl">
                    <iframe 
                      src="https://www.youtube.com/embed/8QDIVIU9QZQ" 
                      title="Well-Done.pl Company Presentation" 
                      className="w-full h-full border-none" 
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                    ></iframe>
                  </div>
                </AspectRatio>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <PartnersSection />

      {/* Enhanced Services Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Nasze usługi
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Kompleksowe szkolenia dla firm produkcyjnych
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Oferujemy pełen zakres szkoleń, które zapewnią Twoim pracownikom niezbędne uprawnienia i certyfikaty.
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
          
          {/* CTA for services */}
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
              <Link to="/uslugi">
                Zobacz wszystkie usługi
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <WhyChooseUsSection benefits={benefits} />

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Jak to działa?
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Jak wygląda proces współpracy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nasze podejście jest oparte na jasno określonym procesie, który zapewnia skuteczne i efektywne szkolenia.
            </p>
          </div>
          
          <div className="relative">
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
          
          <div className="text-center mt-12">
            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105">
              <Link to="/wycena">
                <Zap className="mr-2 h-5 w-5" />
                Uzyskaj Błyskawiczną Wycenę
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <EnhancedTestimonialsSection />

      {/* Free Audit CTA - shortened version */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Skorzystaj z bezpłatnego audytu
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Zastanawiasz się, czy Twoje szkolenia są odpowiednio dobrane? Skorzystaj z bezpłatnego audytu i odkryj potencjał oszczędności.
            </p>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <AuditStatsCounter value={150} label="Przeprowadzonych audytów" suffix="+" index={0} />
              <AuditStatsCounter value={95} label="Zadowolonych klientów" suffix="%" index={1} />
              <AuditStatsCounter value={30} label="Średnia oszczędność" suffix="%" index={2} />
              <AuditStatsCounter value={48} label="Godzin na audyt" suffix="h" index={3} />
            </div>

            <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105">
              <Link to="/bezplatny-audyt">
                Zamów bezpłatny audyt
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={faqItems} />

      {/* Bottom Quote Form */}
      <BottomQuoteForm />
    </div>
  );
};

// Updated WhyChooseUsSection
const WhyChooseUsSection = React.memo(({ benefits }: { benefits: any[] }) => {
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div 
              ref={titleRef}
              className="transition-all duration-800"
              style={{
                opacity: titleInView ? 1 : 0,
                transform: titleInView ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <div className="inline-block mb-4">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Dlaczego My?
                </span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Dlaczego warto z nami współpracować?
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Wyróżniamy się elastycznością i zdolnością adaptacji do potrzeb klienta. Oferujemy szkolenia dostosowane do harmonogramu firm, możliwość szkoleń stacjonarnych, online oraz hybrydowych.
              </p>
            </div>
            
            <div ref={benefitsRef} className="space-y-6">
              {benefits.map((benefit, index) => (
                <div 
                  key={index} 
                  className="flex items-start p-6 bg-gradient-to-r from-orange-50 to-transparent rounded-2xl hover:from-orange-100 transition-all duration-300"
                  style={{
                    opacity: benefitsInView ? 1 : 0,
                    transform: benefitsInView ? 'translateX(0)' : 'translateX(-30px)',
                    transitionDelay: benefitsInView ? `${index * 200}ms` : '0ms'
                  }}
                >
                  <div className="flex-shrink-0 mr-4 p-3 bg-orange-500 rounded-xl text-white transition-transform duration-300 hover:scale-110">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{benefit.title}</h3>
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
              <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white hover:scale-105 transition-transform duration-300">
                <Link to="/o-nas">
                  Poznaj nas lepiej <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-3xl p-8 text-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
              <div className="space-y-6">
                <div className="flex items-center">
                  <Clock className="w-8 h-8 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">15 minut</div>
                    <div className="text-orange-100">Na wycenę</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Users className="w-8 h-8 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">500+</div>
                    <div className="text-orange-100">Zadowolonych firm</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Award className="w-8 h-8 mr-4" />
                  <div>
                    <div className="text-2xl font-bold">10 lat</div>
                    <div className="text-orange-100">Doświadczenia</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

WhyChooseUsSection.displayName = 'WhyChooseUsSection';

export default HomePage;
