
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
      {/* Large Background Forklift Icon */}
      <div className="absolute -right-32 top-0 bottom-0 flex justify-end items-center transition-all duration-800 opacity-100 translate-x-0">
        <svg
          width="1600"
          height="1600"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-6"
        >
          <g className="text-orange-200">
            {/* Warehouse shelves in background */}
            <rect x="50" y="80" width="8" height="120" fill="currentColor" opacity="0.3"/>
            <rect x="50" y="80" width="40" height="8" fill="currentColor" opacity="0.3"/>
            <rect x="50" y="120" width="40" height="8" fill="currentColor" opacity="0.3"/>
            <rect x="50" y="160" width="40" height="8" fill="currentColor" opacity="0.3"/>
            <rect x="50" y="200" width="40" height="8" fill="currentColor" opacity="0.3"/>
            
            <rect x="70" y="100" width="6" height="15" fill="currentColor" opacity="0.4"/>
            <rect x="78" y="100" width="6" height="15" fill="currentColor" opacity="0.4"/>
            <rect x="70" y="140" width="6" height="15" fill="currentColor" opacity="0.4"/>
            <rect x="78" y="140" width="6" height="15" fill="currentColor" opacity="0.4"/>
            <rect x="70" y="180" width="6" height="15" fill="currentColor" opacity="0.4"/>

            {/* Main forklift body */}
            <rect x="180" y="220" width="80" height="40" rx="4" fill="currentColor" opacity="0.8"/>
            
            {/* Forklift cabin */}
            <rect x="200" y="200" width="40" height="20" rx="2" fill="currentColor" opacity="0.7"/>
            <rect x="210" y="205" width="20" height="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
            
            {/* Operator silhouette */}
            <circle cx="220" cy="208" r="4" fill="currentColor" opacity="0.9"/>
            <rect x="218" y="212" width="4" height="8" fill="currentColor" opacity="0.9"/>
            
            {/* Forklift mast */}
            <rect x="175" y="120" width="6" height="100" fill="currentColor" opacity="0.8"/>
            <rect x="183" y="120" width="6" height="100" fill="currentColor" opacity="0.8"/>
            
            {/* Forklift forks */}
            <rect x="170" y="180" width="25" height="4" fill="currentColor" opacity="0.9"/>
            <rect x="170" y="188" width="25" height="4" fill="currentColor" opacity="0.9"/>
            
            {/* Pallet on forks */}
            <rect x="150" y="170" width="30" height="18" rx="2" fill="currentColor" opacity="0.6"/>
            <rect x="152" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
            <rect x="158" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
            <rect x="164" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
            <rect x="170" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
            <rect x="176" y="175" width="4" height="8" fill="currentColor" opacity="0.4"/>
            
            {/* Boxes on pallet */}
            <rect x="152" y="165" width="12" height="10" fill="currentColor" opacity="0.7"/>
            <rect x="166" y="165" width="12" height="10" fill="currentColor" opacity="0.7"/>
            
            {/* Forklift wheels */}
            <circle cx="190" cy="268" r="8" fill="currentColor" opacity="0.8"/>
            <circle cx="230" cy="268" r="8" fill="currentColor" opacity="0.8"/>
            <circle cx="250" cy="268" r="6" fill="currentColor" opacity="0.8"/>
            
            {/* Wheel details */}
            <circle cx="190" cy="268" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            <circle cx="230" cy="268" r="4" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            <circle cx="250" cy="268" r="3" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            
            {/* Counterweight */}
            <rect x="245" y="235" width="20" height="25" rx="2" fill="currentColor" opacity="0.7"/>
            
            {/* Safety elements */}
            <circle cx="320" cy="120" r="15" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.4"/>
            <path d="M320 110 L320 130 M310 120 L330 120" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            
            {/* Warning triangle */}
            <path d="M300 300 L315 280 L330 300 Z" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
            <circle cx="315" cy="290" r="2" fill="currentColor" opacity="0.5"/>
            <path d="M315 285 L315 295" stroke="currentColor" strokeWidth="1" opacity="0.5"/>
            
            {/* Movement arrows */}
            <path d="M280 160 Q300 140 320 160" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
            <polygon points="315,158 325,160 315,162" fill="currentColor" opacity="0.4"/>
            
            {/* Additional warehouse elements */}
            <rect x="350" y="200" width="6" height="80" fill="currentColor" opacity="0.3"/>
            <rect x="350" y="200" width="30" height="6" fill="currentColor" opacity="0.3"/>
            <rect x="350" y="230" width="30" height="6" fill="currentColor" opacity="0.3"/>
            <rect x="350" y="260" width="30" height="6" fill="currentColor" opacity="0.3"/>
            
            {/* Ground/floor markings */}
            <path d="M120 280 L380 280" stroke="currentColor" strokeWidth="2" opacity="0.3" strokeDasharray="10,5"/>
            
            {/* Hydraulic lines */}
            <path d="M181 180 Q185 160 181 140" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
            <path d="M187 180 Q191 160 187 140" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
          </g>
        </svg>
      </div>

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
                asChild
              >
                <Link to="/wycena">
                  <Mail className="mr-2 h-5 w-5" />
                  Bezpłatna wycena
                </Link>
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
