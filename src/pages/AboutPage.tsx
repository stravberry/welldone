

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import StatItem from '@/components/StatItem';
import Testimonial from '@/components/Testimonial';
import FAQ from '@/components/FAQ';
import AnimatedAdvantagesSection from '@/components/AnimatedAdvantagesSection';
import AnimatedTeamSection from '@/components/AnimatedTeamSection';

const AboutPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { value: "10+", label: "lat doświadczenia" },
    { value: "500+", label: "zadowolonych firm" },
    { value: "1000+", label: "zrealizowanych szkoleń" },
    { value: "80%", label: "zleceń dla produkcji" }
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
      answer: "Nasz zespół składa się z doświadczonych trenerów, którzy od lat specjalizują się w szkoleniach dla sektora produkcyjnego. Każdy z naszych specjalistów posiada odpowiednie certyfikaty oraz praktyczne doświadczenie, co gwarantuje wysoką jakość szkoleń."
    }
  ];

  // Animation hooks for different sections
  const { elementRef: heroTextRef, isInView: heroTextInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: whatWeDoTextRef, isInView: whatWeDoTextInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: whatWeDoImageRef, isInView: whatWeDoImageInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: howWeWorkTextRef, isInView: howWeWorkTextInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: howWeWorkImageRef, isInView: howWeWorkImageInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: statsHeaderRef, isInView: statsHeaderInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: testimonialsHeaderRef, isInView: testimonialsHeaderInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const { elementRef: ctaRef, isInView: ctaInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div>
      {/* Hero Section with animated background image */}
      <section className="relative py-20 overflow-hidden">
        {/* Background image with overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/public/lovable-uploads/e53f9387-8eab-484e-95d8-dae5efb914a0.png" 
            alt="Szkolenie w fabryce" 
            className="w-full h-full object-cover"
            style={{
              filter: 'blur(1px)',
              transform: 'scale(1.05)'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
        </div>
        
        {/* Animated floating elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-orange-500/20 rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-500/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={heroTextRef}
            className="text-center"
            style={{
              opacity: heroTextInView ? 1 : 0,
              transform: heroTextInView ? 'translateY(0)' : 'translateY(40px)',
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <h1 className="text-5xl font-bold mb-8 text-white">
              O Nas
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
              Poznaj firmę, która od lat wspiera przedsiębiorstwa produkcyjne w podnoszeniu kwalifikacji pracowników i zapewnianiu zgodności z wymogami prawnymi.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div
              ref={whatWeDoTextRef}
              style={{
                opacity: whatWeDoTextInView ? 1 : 0,
                transform: whatWeDoTextInView ? 'translateX(0)' : 'translateX(-40px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Czym się zajmujemy i do kogo skierowana jest nasza usługa
              </h2>
              
              <div className="space-y-6">
                <p className="text-gray-600 leading-relaxed">
                  Firma specjalizuje się w szkoleniach z zakresu BHP oraz uzyskiwania uprawnień UDT (operatorzy i konserwatorzy), SEP, a także szkoleniach specjalistycznych, takich jak spawalnicze oraz na wózki unoszące.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Usługi te są skierowane głównie do dużych firm produkcyjnych (powyżej 500 pracowników), które potrzebują regularnych szkoleń dla swoich pracowników oraz zapewnienia uprawnień do obsługi nowego i używanego sprzętu.
                </p>

                <p className="text-gray-600 leading-relaxed">
                  Naszym celem jest pokazanie, że firma posiada dogłębną wiedzę na temat specyficznych potrzeb firm produkcyjnych, co stanowi jedną z głównych przewag konkurencyjnych.
                </p>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <Button asChild className="bg-orange-500 hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-lg">
                  <Link to="/uslugi">
                    Zobacz nasze usługi
                  </Link>
                </Button>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600 font-medium">Sprawdzone rozwiązania</span>
                </div>
              </div>
            </div>
            <div 
              ref={whatWeDoImageRef}
              className="rounded-xl overflow-hidden shadow-2xl group"
              style={{
                opacity: whatWeDoImageInView ? 1 : 0,
                transform: whatWeDoImageInView ? 'translateX(0) scale(1)' : 'translateX(40px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: whatWeDoImageInView ? '200ms' : '0ms'
              }}
            >
              <img 
                src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81" 
                alt="Szkolenie pracowników w fabryce" 
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Advantages Section - Now using the new animated component */}
      <AnimatedAdvantagesSection />

      {/* How We Work Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div 
              ref={howWeWorkImageRef}
              className="order-2 md:order-1 rounded-xl overflow-hidden shadow-2xl group"
              style={{
                opacity: howWeWorkImageInView ? 1 : 0,
                transform: howWeWorkImageInView ? 'translateX(0) scale(1)' : 'translateX(-40px) scale(0.95)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <img 
                src="/public/lovable-uploads/657768d6-dc5a-419b-80b8-b664af6c6775.png" 
                alt="Inspekcja w magazynie" 
                className="w-full h-auto group-hover:scale-105 transition-transform duration-700" 
              />
            </div>
            <div 
              ref={howWeWorkTextRef}
              className="order-1 md:order-2"
              style={{
                opacity: howWeWorkTextInView ? 1 : 0,
                transform: howWeWorkTextInView ? 'translateX(0)' : 'translateX(40px)',
                transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: howWeWorkTextInView ? '200ms' : '0ms'
              }}
            >
              <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Jak działamy
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Nasze działania są dostosowane do indywidualnych potrzeb każdej firmy. Rozpoczynamy od analizy potrzeb szkoleniowych przedsiębiorstwa poprzez oferowany audyt, następnie proponujemy plan szkoleń dostosowany do specyficznych wymagań firmy, zarówno pod kątem terminów, jak i formy (stacjonarne, online, hybrydowe).
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Działamy szybko i efektywnie, zapewniając pełną obsługę – od organizacji szkoleń, po finalne uzyskanie uprawnień przez pracowników.
              </p>
              <Button asChild variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 transform hover:scale-105 transition-all duration-300">
                <Link to="/bezplatny-audyt">
                  Zamów bezpłatny audyt
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full -translate-x-48 -translate-y-48" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-40 translate-y-40" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={statsHeaderRef}
            className="text-center mb-16"
            style={{
              opacity: statsHeaderInView ? 1 : 0,
              transform: statsHeaderInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <h2 className="text-4xl font-bold mb-6 text-white">Statystyki</h2>
            <p className="text-lg text-orange-100 max-w-3xl mx-auto leading-relaxed">
              Liczby, które pokazują skalę naszej działalności i wzmacniają naszą wiarygodność.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section - Now using the new animated component */}
      <AnimatedTeamSection />

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-orange-100 rounded-full opacity-50" />
        <div className="absolute bottom-20 left-20 w-32 h-32 bg-blue-100 rounded-full opacity-30" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div 
            ref={testimonialsHeaderRef}
            className="text-center mb-16"
            style={{
              opacity: testimonialsHeaderInView ? 1 : 0,
              transform: testimonialsHeaderInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Nasi klienci i opinie
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Współpracujemy z czołowymi firmami produkcyjnymi na polskim rynku. Poznaj opinie naszych klientów.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Dzięki współpracy z firmą, nasi pracownicy uzyskali certyfikaty UDT, co pozwoliło nam na podniesienie standardów bezpieczeństwa w firmie."
              author="Jan Kowalski"
              role="Specjalista BHP"
              company="Firma X"
              index={0}
            />
            <TestimonialCard
              quote="Profesjonalne szkolenia, które dostosowali do naszych potrzeb. Współpraca była szybka i bezproblemowa."
              author="Anna Nowak"
              role="HR Manager"
              company="Firma Y"
              index={1}
            />
            <TestimonialCard
              quote="Bezpłatny audyt pomógł nam zoptymalizować proces szkoleniowy, co przełożyło się na realne oszczędności."
              author="Piotr Wiśniewski"
              role="Dyrektor Operacyjny"
              company="Firma Z"
              index={2}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-white/10 rounded-full -translate-x-40 -translate-y-40" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-48 translate-y-48" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div
            ref={ctaRef}
            style={{
              opacity: ctaInView ? 1 : 0,
              transform: ctaInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <h2 className="text-4xl font-bold mb-8">Gotowy, aby rozpocząć współpracę?</h2>
            <p className="text-xl mb-10 max-w-3xl mx-auto opacity-90 leading-relaxed">
              Skontaktuj się z nami już dziś, aby omówić potrzeby szkoleniowe Twojej firmy i uzyskać indywidualną ofertę.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
              <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
                <Link to="/kontakt">Skontaktuj się z nami</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-transparent hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all duration-300">
                <Link to="/wycena">Błyskawiczna Wycena</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ items={faqItems} />
    </div>
  );
};

// Animated Testimonial Card Component
interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, role, company, index }) => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <div 
      ref={elementRef}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: isInView ? `${index * 150}ms` : '0ms'
      }}
    >
      <Testimonial
        quote={quote}
        author={author}
        role={role}
        company={company}
      />
    </div>
  );
};

export default AboutPage;

