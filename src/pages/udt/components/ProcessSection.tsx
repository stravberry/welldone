
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface ProcessSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: stepsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(4, 200);
  const { elementRef: ctaRef, isInView: ctaInView } = useScrollAnimation<HTMLDivElement>();

  const steps = [
    {
      number: "01",
      title: "Konsultacja",
      description: "Bezpłatna konsultacja, podczas której dobieramy odpowiednie szkolenie do Twoich potrzeb"
    },
    {
      number: "02",
      title: "Szkolenie",
      description: "Kompleksowe szkolenie praktyczne i teoretyczne przygotowujące do egzaminu"
    },
    {
      number: "03",
      title: "Egzamin UDT",
      description: "Organizujemy i przeprowadzamy oficjalny egzamin przed komisją UDT"
    },
    {
      number: "04",
      title: "Uzyskanie uprawnień",
      description: "Otrzymujesz oficjalne uprawnienia UDT ważne przez 5 lat"
    }
  ];

  return (
    <section id="process" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-orange-600 font-medium text-sm sm:text-base animate-pulse-slow">Jak to działa?</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Prosty proces uzyskania uprawnień UDT</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Przeprowadzimy Cię przez cały proces uzyskania uprawnień UDT - od konsultacji po egzamin
          </p>
        </div>
        
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className={`bg-white p-6 rounded-lg shadow-md relative z-10 h-full transition-all duration-700 hover:shadow-xl hover:scale-105 group cursor-pointer border border-gray-100 hover:border-orange-200 ${
                visibleItems.includes(index) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="text-5xl font-bold text-orange-100 mb-4 transition-all duration-300 group-hover:text-orange-200 group-hover:scale-110">{step.number}</div>
                <h3 className="text-xl font-bold mb-2 transition-colors duration-300 group-hover:text-orange-600">{step.title}</h3>
                <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-700">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden lg:block absolute top-1/2 right-0 w-full h-1 bg-gradient-to-r from-orange-200 to-orange-300 z-0 transition-all duration-1000 ${
                  visibleItems.includes(index) ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                }`}
                style={{ 
                  width: "calc(50% - 1rem)", 
                  transform: "translateX(100%)",
                  transformOrigin: "left",
                  animationDelay: `${(index + 1) * 0.2}s`
                }} />
              )}
            </div>
          ))}
        </div>
        
        <div 
          ref={ctaRef}
          className={`text-center transition-all duration-1000 ${
            ctaInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:animate-glow"
            onClick={() => trackCTAClick('process-start', 'contact-form')}
          >
            Rozpocznij proces szkolenia
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
