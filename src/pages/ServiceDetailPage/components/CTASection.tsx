
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface CTASectionProps {
  onContactClick: () => void;
}

const CTASection: React.FC<CTASectionProps> = ({ onContactClick }) => {
  return (
    <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Gotowy na nowe możliwości?
        </h2>
        <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8">
          Nie czekaj! Zapisz się już dziś na szkolenie i zdobądź uprawnienia, 
          które otworzą przed Tobą nowe możliwości zawodowe.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl font-semibold"
            onClick={onContactClick}
          >
            Zapisz się teraz
          </Button>
          <Button 
            asChild
            size="lg" 
            variant="outline" 
            className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-orange-600 hover:scale-105 transition-all duration-300 font-semibold"
          >
            <Link to="/kontakt">Skontaktuj się z nami</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
