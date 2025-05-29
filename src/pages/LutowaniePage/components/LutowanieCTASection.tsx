
import React from 'react';
import { Button } from '@/components/ui/button';

const LutowanieCTASection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-r from-red-600 to-red-500 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Rozwijaj swoje umiejętności lutowania
        </h2>
        <p className="text-xl text-red-100 max-w-3xl mx-auto mb-8">
          Dołącz do grona specjalistów lutowania i zdobądź praktyczne umiejętności w elektronice.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-xl"
            onClick={() => {
              const contactSection = document.getElementById('contact-form');
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Zapisz się teraz
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-red-600 bg-white hover:bg-red-50 hover:scale-105 transition-all duration-300"
          >
            Skontaktuj się z nami
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LutowanieCTASection;
