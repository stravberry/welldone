
import React from 'react';
import { Button } from '@/components/ui/button';

interface FinalCTASectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const FinalCTASection: React.FC<FinalCTASectionProps> = ({ trackCTAClick }) => {
  return (
    <section className="bg-orange-600 py-20 text-white text-center">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-6">
          Rozpocznij swoją karierę z uprawnieniami UDT
        </h2>
        <p className="text-xl mb-10 max-w-3xl mx-auto">
          Dołącz do ponad 5000 zadowolonych kursantów, którzy zdobyli uprawnienia UDT pod naszym okiem
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-orange-600 hover:bg-orange-100"
            onClick={() => trackCTAClick('final-contact', 'contact-form')}
          >
            Skontaktuj się z nami
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-orange-700"
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
