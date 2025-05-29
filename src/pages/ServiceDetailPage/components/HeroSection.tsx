
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import StatPreviewCard from './StatPreviewCard';

interface HeroSectionProps {
  heroInView: boolean;
  showAllItems: boolean;
  onEnrollClick: (courseTitle: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ 
  heroInView, 
  showAllItems, 
  onEnrollClick 
}) => {
  const stats = [
    { value: 1500, label: 'Przeszkolonych operatorów', suffix: '+' },
    { value: 96, label: 'Zdawalność egzaminów', suffix: '%' },
    { value: 8, label: 'Lat doświadczenia', suffix: '+' },
    { value: 150, label: 'Firm partnerskich', suffix: '+' }
  ];

  return (
    <div className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-orange-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Animated Breadcrumb */}
        <div 
          className={`flex items-center space-x-2 text-orange-100 mb-8 transition-all duration-600 ${
            heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
        >
          <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
          <span>/</span>
          <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
          <span>/</span>
          <span className="text-white font-medium">Uprawnienia UDT dla operatorów</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div 
              className={`inline-block bg-orange-100 text-orange-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              ⚡ Certyfikowane szkolenia UDT
            </div>

            <h1 
              className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              Uprawnienia UDT dla <span className="text-orange-200">Operatorów</span>
            </h1>

            <p 
              className={`text-xl text-orange-100 mb-8 leading-relaxed transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '600ms' }}
            >
              Zdobądź oficjalne uprawnienia do obsługi urządzeń technicznych. 
              Profesjonalne szkolenia z najwyższą zdawalnością w regionie.
            </p>

            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
                heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              <Button 
                size="lg" 
                className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-xl"
                onClick={() => onEnrollClick('Uprawnienia UDT dla operatorów')}
              >
                <Phone className="mr-2 h-5 w-5" />
                Zapisz się na kurs
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-orange-600 hover:bg-white hover:text-orange-600 hover:scale-105 transition-all duration-300"
              >
                <Mail className="mr-2 h-5 w-5" />
                Pobierz program
              </Button>
            </div>
          </div>

          {/* Animated stats preview */}
          <div 
            className={`grid grid-cols-2 gap-6 transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            {stats.slice(0, 4).map((stat, index) => (
              <StatPreviewCard key={index} stat={stat} index={index} isVisible={heroInView || showAllItems} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
