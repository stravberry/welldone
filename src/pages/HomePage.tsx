import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Award, Users, Briefcase, BarChart, CheckCircle, BookOpen, Clock, ThumbsUp } from 'lucide-react';
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
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
const HomePage = () => {
  const {
    elementRef: statsRef,
    visibleItems,
    showAllFallback
  } = useStaggeredAnimation<HTMLDivElement>(4, 300);
  const navigate = useNavigate();
  const handleQuoteClick = () => {
    navigate('/wycena');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  const handleAuditClick = () => {
    navigate('/bezplatny-audyt');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  const services = [{
    title: "Uprawnienia UDT dla operatorów",
    description: "Szkolenia i uprawnienia dla operatorów wózków widłowych, suwnic, podestów / zwyżek, układnic, żurawi",
    icon: <Award size={40} className="text-orange-500" />,
    link: "/uslugi/udt-operatorzy"
  }, {
    title: "Uprawnienia UDT dla konserwatorów",
    description: "Kursy i uprawnienia dla konserwatorów suwnic, żurawi, wciągników, wózków, podestów, dźwigników",
    icon: <Briefcase size={40} className="text-orange-500" />,
    link: "/uslugi/udt-konserwatorzy"
  }, {
    title: "Uprawnienia SEP",
    description: "Szkolenia na uprawnienia energetyczne tzw. SEP: E1 / D1 elektryczne, E2 / D2 cieplne, E3 / D3 gazowe",
    icon: <BookOpen size={40} className="text-orange-500" />,
    link: "/uslugi/sep"
  }];
  const faqItems = [{
    question: "Czym zajmuje się Wasza firma?",
    answer: "Specjalizujemy się w szkoleniach z zakresu BHP, uprawnień UDT (zarówno dla operatorów, jak i konserwatorów), SEP oraz w szkoleniach specjalistycznych, takich jak spawalnicze i na wózki unoszące. Nasze usługi są skierowane głównie do dużych firm produkcyjnych, które potrzebują regularnych szkoleń dla swoich pracowników."
  }, {
    question: "Do kogo skierowane są Wasze usługi?",
    answer: "Nasze usługi są dedykowane głównie dla dużych firm produkcyjnych, które chcą podnosić kompetencje swoich pracowników oraz zapewnić im wymagane uprawnienia do obsługi specjalistycznego sprzętu."
  }, {
    question: "Co wyróżnia Waszą firmę na rynku?",
    answer: "Wyróżnia nas elastyczność oraz głęboka znajomość specyfiki branży produkcyjnej. Oferujemy szkolenia dostosowane do harmonogramu firm oraz możliwość realizacji szkoleń w formie stacjonarnej, online i hybrydowej. Dodatkowo, zapewniamy bezpłatny audyt, który pozwala na optymalizację kosztów szkoleń w firmach."
  }, {
    question: "Jak wygląda proces współpracy?",
    answer: "Proces współpracy jest uzależniony od sytuacji klienta. Jeśli klient wie jakiego typu rozwiązań potrzebuje, dostaraczmy błyskawiczną wycenę która pozwala mu zrozumieć pełny koszt współpracy. Natomiast dla firm które potrzebują kompleksowego wsparcia i identyfikacji możliwych sposobów optymalizacji kosztów szkoleń rekomendujemy rozpoczęcie od audytu, który pozwala nam na zrozumienie potrzeb szkoleniowych firmy."
  }, {
    question: "Jakie doświadczenie posiada Wasz zespół?",
    answer: "Nasz zespół składa się z doświadczonych trenerów, którzy od lat specjalizują się w szkoleniach dla sektora produkcyjnego. Każdy z naszych specjalistów posiada odpowiednie certyfikaty oraz praktyczne doświadczenie, co gwarantuje najwyższą jakość szkoleń."
  }];
  const processSteps = [{
    number: 1,
    title: "Kontakt i wycena",
    description: ""
  }, {
    number: 2,
    title: "Ustalenie szczegółów organizacyjnych",
    description: ""
  }, {
    number: 3,
    title: "Szkolenie i egzamin UDT lub SEP",
    description: ""
  }, {
    number: 4,
    title: "Wydanie uprawnień UDT lub SEP",
    description: ""
  }];
  const benefits = [{
    title: "Elastyczny harmonogram",
    description: "Dostosowujemy terminy szkoleń do Twojego harmonogramu pracy.",
    icon: <Clock size={24} className="text-orange-500" />
  }, {
    title: "Doświadczeni trenerzy",
    description: "Nasi trenerzy to specjaliści z wieloletnim doświadczeniem w branży.",
    icon: <Award size={24} className="text-orange-500" />
  }, {
    title: "Szkolenia szyte na miarę",
    description: "Każde szkolenie jest dopasowane do specyficznych potrzeb Twojej firmy.",
    icon: <CheckCircle size={24} className="text-orange-500" />
  }, {
    title: "Najwyższa zdawalność",
    description: "Gwarantujemy najwyższą zdawalność egzaminów i wsparcie na każdym etapie.",
    icon: <ThumbsUp size={24} className="text-orange-500" />
  }];

  // Improved StatCard with proper fallback logic
  const StatCard = ({
    value,
    label,
    delay
  }: {
    value: number;
    label: string;
    delay: number;
  }) => {
    const {
      elementRef,
      count
    } = useCounterAnimation<HTMLDivElement>(value, 2000);
    const index = Math.floor(delay / 300);
    const isVisible = visibleItems.includes(index) || showAllFallback;
    return <div ref={elementRef} className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 text-center transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl" style={{
      opacity: 1,
      transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
      transition: 'all 0.6s ease-out',
      transitionDelay: isVisible ? `${delay}ms` : '0ms'
    }}>
        <div className="text-4xl font-bold text-orange-600 mb-2 bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
          {isVisible ? count : value}{value >= 1000 ? '+' : value === 80 || value === 96 ? '%' : '+'}
        </div>
        <div className="text-gray-700 font-medium">{label}</div>
      </div>;
  };
  return <div>
      <Navbar />
      <div className="pt-16">
        {/* Enhanced Hero Section */}
        <section className="hero-gradient text-white pt-12 pb-20 md:pt-16 md:pb-32 relative overflow-hidden">
          {/* Enhanced background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600/20 via-transparent to-orange-500/20" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{
          animationDelay: '2s'
        }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-left">
                <div className="inline-block mb-6">
                  
                </div>
                <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                  Profesjonalne szkolenia UDT i&nbsp;SEP 
                  <span className="block bg-gradient-to-r from-orange-200 to-white bg-clip-text text-transparent animate-gradient-shift">
                    dla firm
                  </span>
                </h1>
                <p className="text-xl mb-8 text-orange-50 leading-relaxed">
                  Pomagamy firmom produkcyjnym działać bez ryzyka. Zapewniamy pełną zgodność uprawnień UDT i SEP z przepisami.
                </p>
                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl text-lg px-8 py-4">
                    <Link to="/o-nas">Dlaczego My?</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-orange-500/20 text-white hover:bg-orange-400/30 border-white/30 hover:border-white/50 backdrop-blur-sm transform hover:scale-105 transition-all duration-300 text-lg px-8 py-4">
                    <Link to="/wycena">
                      <span className="mr-2">🚀</span>
                      Błyskawiczna Wycena
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center animate-fade-in-right">
                <div className="w-full max-w-2xl transform hover:scale-105 transition-all duration-500">
                  <AspectRatio ratio={16 / 9} className="bg-black rounded-xl overflow-hidden shadow-2xl">
                    <iframe src="https://www.youtube.com/embed/8QDIVIU9QZQ" title="Well-Done.pl Company Presentation" className="w-full h-full border-none" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
                  </AspectRatio>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <PartnersSection />

        {/* Enhanced Services Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-blue-50/20" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  OFERTA
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Co robimy?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Well-Done.pl to specjaliści w obszarze szkoleń technicznych i uprawnień zawodowych
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => <div key={index} className="transform hover:scale-105 transition-all duration-300">
                  <ServiceCard title={service.title} description={service.description} icon={service.icon} link={service.link} index={index} />
                </div>)}
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <WhyChooseUsSection benefits={benefits} statsRef={statsRef} visibleItems={visibleItems} StatCard={StatCard} showAllFallback={showAllFallback} />

        {/* Enhanced Process Section */}
        <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-50/40 to-blue-50/30" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-block mb-4">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide animate-pulse-slow">
                  Jak to działa?
                </span>
              </div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Jak wygląda proces współpracy?
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Nasze podejście jest oparte na jasno określonym procesie, który zapewnia skuteczne i efektywne szkolenia.
              </p>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-50 via-white to-orange-50 rounded-3xl opacity-50" />
              
              <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 p-8 justify-items-center">
                {processSteps.map((step, index) => (
                  <div key={step.number} className="transform hover:scale-105 transition-all duration-300 w-full max-w-xs">
                    <ProcessStep number={step.number} title={step.title} description={step.description} index={index} />
                  </div>
                ))}
              </div>
            </div>
            
            <div className="text-center mt-12">
              <div className="relative inline-block">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 relative z-10 text-lg px-8 py-4" onClick={handleQuoteClick}>
                  <span>Uzyskaj Błyskawiczną Wycenę</span>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Testimonials Section */}
        <EnhancedTestimonialsSection />

        {/* Free Audit CTA */}
        <section className="py-16 lg:py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-600 via-orange-500 to-orange-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl animate-float" style={{
          animationDelay: '2s'
        }} />
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
              <div className="inline-block mb-4">
                <span className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                  Bezpłatna analiza
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Skorzystaj z bezpłatnego audytu
              </h2>
              <p className="text-xl text-orange-50 max-w-3xl mx-auto leading-relaxed">
                Zastanawiasz się, czy Twoje szkolenia są odpowiednio dobrane i czy nie przepłacasz za uzyskiwanie uprawnień pracowników? Skorzystaj z bezpłatnego audytu i dowiedz się, jak możemy pomóc.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
              <AuditStatsCounter value={150} label="Przeprowadzonych audytów" suffix="+" index={0} />
              <AuditStatsCounter value={95} label="Zadowolonych klientów" suffix="%" index={1} />
              <AuditStatsCounter value={30} label="Średnia oszczędność" suffix="%" index={2} />
              <AuditStatsCounter value={48} label="Godzin na audyt" suffix="h" index={3} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="order-2 lg:order-1">
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Odkryj potencjał oszczędności w swojej firmie
                  </h3>
                  <p className="text-orange-50 text-lg leading-relaxed">
                    Nasz bezpłatny audyt pomoże Ci zidentyfikować obszary, w których możesz zoptymalizować koszty szkoleń i poprawić efektywność procesu certyfikacji pracowników.
                  </p>
                  <div className="relative inline-block group">
                    <div className="absolute inset-0 bg-white rounded-lg blur opacity-25 group-hover:opacity-50 transition-opacity duration-300" />
                    <Button size="lg" className="relative bg-white text-orange-600 hover:bg-orange-50 font-bold text-lg px-8 py-4 shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 hover:-translate-y-1" onClick={handleAuditClick}>
                      Zamów bezpłatny audyt
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2 space-y-6">
                <AuditCard title="Ocena aktualnych szkoleń" description="Przeanalizujemy, czy obecne szkolenia spełniają wszystkie wymagania prawne oraz czy odpowiadają na realne potrzeby Twojej firmy." icon="check" index={0} />
                <AuditCard title="Weryfikacja uprawnień pracowników" description="Sprawdzimy, czy wszyscy pracownicy posiadają wymagane uprawnienia do obsługi sprzętu i urządzeń." icon="users" index={1} />
                <AuditCard title="Optymalizacja kosztów" description="Pomożemy zidentyfikować, czy nie przepłacasz za szkolenia i certyfikacje, oraz wskażemy obszary, w których możesz zredukować koszty." icon="dollar-sign" index={2} />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ items={faqItems} />

        {/* Bottom Quote Form */}
        <div id="quote-form">
          <BottomQuoteForm />
        </div>
      </div>
      <Footer />
    </div>;
};
export default HomePage;