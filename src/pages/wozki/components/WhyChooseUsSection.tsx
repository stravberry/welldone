
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface WhyChooseUsSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: cardsRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(4, 150);
  const { elementRef: ctaRef, isInView: ctaInView } = useScrollAnimation<HTMLDivElement>();

  const reasons = [
    {
      title: "Specjaliści od wózków unoszących",
      description: "Nasi instruktorzy to eksperci z wieloletnim doświadczeniem w pracy na wysokości",
      icon: "🏗️"
    },
    {
      title: "Nowoczesny sprzęt szkoleniowy",
      description: "Szkolenia na najnowszych modelach wózków unoszących renomowanych marek",
      icon: "⚙️"
    },
    {
      title: "Kompleksowe przygotowanie",
      description: "Teoria + praktyka + egzamin w jednym pakiecie szkoleniowym",
      icon: "📚"
    },
    {
      title: "Elastyczne terminy",
      description: "Dostosowujemy terminy szkoleń do potrzeb Twojej firmy",
      icon: "📅"
    }
  ];

  console.log('WhyChooseUsSection render:', { visibleItems, showAllFallback });

  return (
    <section id="why-us" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-blue-600 font-medium text-sm sm:text-base">Dlaczego my?</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Najlepsze szkolenia wózków unoszących w regionie</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Zaufało nam już ponad 3000 operatorów wózków unoszących z całego województwa dolnośląskiego
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {reasons.map((reason, index) => {
            const isVisible = visibleItems.includes(index) || showAllFallback;
            console.log(`Card ${index}: isVisible=${isVisible}`);
            
            return (
              <div 
                key={index} 
                className={`bg-gray-50 p-6 rounded-lg transition-all duration-600 hover:shadow-lg hover:bg-white group cursor-pointer border border-transparent hover:border-blue-200 ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{
                  // Fallback styles to ensure visibility
                  opacity: isVisible ? 1 : (showAllFallback ? 1 : 0),
                  transform: isVisible ? 'translateY(0)' : (showAllFallback ? 'translateY(0)' : 'translateY(20px)'),
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="text-4xl mb-4 transition-transform duration-200 group-hover:scale-110">{reason.icon}</div>
                <h3 className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-blue-600">{reason.title}</h3>
                <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">{reason.description}</p>
              </div>
            );
          })}
        </div>
        
        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-800 ${
            ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transition-all duration-200 hover:shadow-lg"
            onClick={() => trackCTAClick('why-us-contact', 'contact-form')}
          >
            Skontaktuj się z nami
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
