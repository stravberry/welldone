
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FinalCTASectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ trackCTAClick }) => {
  const { elementRef: sectionRef, isInView: sectionInView } = useScrollAnimation<HTMLElement>();

  return (
    <section 
      ref={sectionRef}
      className={`bg-gradient-to-r from-orange-600 to-orange-700 py-16 sm:py-20 text-white text-center relative overflow-hidden transition-all duration-800 ${
        sectionInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      }`}
    >
      {/* Simplified background elements - no problematic animations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-white rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 bg-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 transition-all duration-800 ${
          sectionInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`} style={{ animationDelay: '0.2s' }}>
          Rozpocznij karierę z uprawnieniami UDT we Wrocławiu
        </h2>
        <p className={`text-lg sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto transition-all duration-800 ${
          sectionInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`} style={{ animationDelay: '0.4s' }}>
          Dołącz do ponad 5000 zadowolonych kursantów z Wrocławia i okolic, którzy zdobyli uprawnienia UDT pod naszym okiem
        </p>
        <div className={`flex flex-wrap justify-center gap-4 transition-all duration-800 ${
          sectionInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`} style={{ animationDelay: '0.6s' }}>
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-100 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transition-all duration-200"
            onClick={() => trackCTAClick('final-contact', 'contact-form')}
          >
            Skontaktuj się z nami
          </Button>
          <Button
            size="lg"
            className="bg-orange-700 text-white hover:bg-orange-800 border-2 border-white text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transition-all duration-200"
            onClick={() => trackCTAClick('final-offerings', 'offerings')}
          >
            Zobacz nasze szkolenia
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
