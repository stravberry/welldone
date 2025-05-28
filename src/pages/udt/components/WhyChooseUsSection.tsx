
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface WhyChooseUsSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: cardsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(4, 100);
  const { elementRef: ctaRef, isInView: ctaInView } = useScrollAnimation<HTMLDivElement>();

  const reasons = [
    {
      title: "Doświadczeni instruktorzy",
      description: "Nasi trenerzy to praktycy z wieloletnim doświadczeniem w branży",
      icon: "👨‍🏫"
    },
    {
      title: "Zdawalność 96%",
      description: "Jeden z najwyższych wskaźników zdawalności w Polsce",
      icon: "🏆"
    },
    {
      title: "Kursy w całym regionie",
      description: "Szkolenia UDT we Wrocławiu i okolicach - dojazd do klienta",
      icon: "🚗"
    },
    {
      title: "Wsparcie po szkoleniu",
      description: "Pomagamy w formalności związanych z uzyskaniem uprawnień",
      icon: "📝"
    }
  ];

  return (
    <section id="why-us" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-orange-600 font-medium text-sm sm:text-base">Dlaczego my?</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Najlepsze szkolenia UDT w województwie dolnośląskim</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Od 10 lat zapewniamy najwyższą jakość szkoleń UDT we Wrocławiu i okolicach, gwarantując zdawalność na poziomie 96%
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {reasons.map((reason, index) => (
            <div 
              key={index} 
              className={`bg-gray-50 p-6 rounded-lg transition-all duration-600 hover:shadow-lg hover:bg-white group cursor-pointer border border-transparent hover:border-orange-200 ${
                visibleItems.includes(index) 
                  ? 'animate-fade-in-up' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4 transition-transform duration-200 group-hover:scale-110">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-2 transition-colors duration-200 group-hover:text-orange-600">{reason.title}</h3>
              <p className="text-gray-600 transition-colors duration-200 group-hover:text-gray-700">{reason.description}</p>
            </div>
          ))}
        </div>
        
        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-800 ${
            ctaInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transition-all duration-200 hover:shadow-lg"
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
