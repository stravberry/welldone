
import React from 'react';
import { Link } from 'react-router-dom';
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
      className={`bg-gradient-to-r from-blue-600 to-blue-700 py-16 sm:py-20 text-white text-center relative overflow-hidden transition-all duration-800 ${
        sectionInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6">
          Zdobądź uprawnienia na wózki unoszące już dziś
        </h2>
        <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto">
          Dołącz do ponad 3000 operatorów z Wrocławia i okolic, którzy zdobyli uprawnienia UDT na wózki unoszące z naszą pomocą
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-100 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transition-all duration-200"
            onClick={() => trackCTAClick('final-contact', 'contact-form')}
          >
            <Link to="/kontakt">Skontaktuj się z nami</Link>
          </Button>
          <Button
            size="lg"
            className="bg-blue-700 text-white hover:bg-blue-800 border-2 border-white text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transition-all duration-200"
            onClick={() => trackCTAClick('final-offerings', 'offerings')}
          >
            Zobacz nasze kursy
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
