
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LutowanieHeroSectionProps {
  heroInView: boolean;
  showAllItems: boolean;
  onContactClick: () => void;
}

const LutowanieHeroSection: React.FC<LutowanieHeroSectionProps> = ({ 
  heroInView, 
  showAllItems, 
  onContactClick 
}) => {
  return (
    <div className="relative bg-gradient-to-br from-red-600 via-red-500 to-red-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`flex items-center space-x-2 text-red-100 mb-8 transition-all duration-600 ${
          heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
          <span>/</span>
          <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
          <span>/</span>
          <span className="text-white font-medium">Szkolenia z lutowania</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-block bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              🔥 Praktyczne warsztaty lutowania
            </div>

            <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Szkolenia z <span className="text-red-200">Lutowania</span>
            </h1>

            <p className={`text-xl text-red-100 mb-8 leading-relaxed transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Praktyczne warsztaty z lutowania prowadzone przez ekspertów. 
              Od podstaw do zaawansowanych technik przemysłowych.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <Button 
                size="lg" 
                className="bg-white text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-300 shadow-xl"
                onClick={onContactClick}
              >
                <Phone className="mr-2 h-5 w-5" />
                Zapisz się na kurs
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-red-600 bg-white hover:bg-red-50 hover:scale-105 transition-all duration-300"
                asChild
              >
                <Link to="/wycena">
                  <Mail className="mr-2 h-5 w-5" />
                  Błyskawiczna wycena
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LutowanieHeroSection;
