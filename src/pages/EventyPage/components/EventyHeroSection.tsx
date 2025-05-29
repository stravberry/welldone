
import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface EventyHeroSectionProps {
  heroInView: boolean;
  showAllItems: boolean;
  onContactClick: () => void;
}

const EventyHeroSection: React.FC<EventyHeroSectionProps> = ({
  heroInView,
  showAllItems,
  onContactClick
}) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-600 via-purple-500 to-purple-400 py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full animate-pulse delay-1000"></div>
      </div>

      {/* Large Background Presentation Icon */}
      <div className={`absolute -right-32 top-0 bottom-0 flex justify-end items-center transition-all duration-800 ${
        heroInView || showAllItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}>
        <svg
          width="1600"
          height="1600"
          viewBox="0 0 400 400"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="opacity-6"
        >
          <g className="text-purple-200">
            <rect x="150" y="80" width="180" height="120" rx="8" fill="currentColor" opacity="0.6"/>
            <rect x="155" y="85" width="170" height="110" rx="5" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.8"/>
            
            <rect x="170" y="100" width="8" height="40" fill="currentColor" opacity="0.7"/>
            <rect x="185" y="110" width="8" height="30" fill="currentColor" opacity="0.7"/>
            <rect x="200" y="95" width="8" height="45" fill="currentColor" opacity="0.7"/>
            <rect x="215" y="105" width="8" height="35" fill="currentColor" opacity="0.7"/>
            
            <rect x="250" y="105" width="60" height="3" fill="currentColor" opacity="0.5"/>
            <rect x="250" y="115" width="50" height="3" fill="currentColor" opacity="0.5"/>
            <rect x="250" y="125" width="55" height="3" fill="currentColor" opacity="0.5"/>
            
            <rect x="238" y="200" width="4" height="60" fill="currentColor" opacity="0.7"/>
            <path d="M220 260 L260 260" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.6"/>
            
            {/* Group of people (audience) */}
            <circle cx="80" cy="220" r="12" fill="currentColor" opacity="0.5"/>
            <rect x="70" y="235" width="20" height="30" rx="10" fill="currentColor" opacity="0.5"/>
            
            <circle cx="110" cy="215" r="12" fill="currentColor" opacity="0.6"/>
            <rect x="100" y="230" width="20" height="30" rx="10" fill="currentColor" opacity="0.6"/>
            
            <circle cx="140" cy="225" r="12" fill="currentColor" opacity="0.5"/>
            <rect x="130" y="240" width="20" height="30" rx="10" fill="currentColor" opacity="0.5"/>
            
            <circle cx="80" cy="280" r="12" fill="currentColor" opacity="0.6"/>
            <rect x="70" y="295" width="20" height="30" rx="10" fill="currentColor" opacity="0.6"/>
            
            <circle cx="110" cy="285" r="12" fill="currentColor" opacity="0.5"/>
            <rect x="100" y="300" width="20" height="30" rx="10" fill="currentColor" opacity="0.5"/>
            
            <circle cx="140" cy="290" r="12" fill="currentColor" opacity="0.6"/>
            <rect x="130" y="305" width="20" height="30" rx="10" fill="currentColor" opacity="0.6"/>
            
            {/* Presenter */}
            <circle cx="240" cy="240" r="15" fill="currentColor" opacity="0.8"/>
            <rect x="228" y="260" width="24" height="35" rx="12" fill="currentColor" opacity="0.8"/>
            
            <path d="M250 270 L280 250" stroke="currentColor" strokeWidth="4" strokeLinecap="round" opacity="0.7"/>
            
            <circle cx="350" cy="120" r="20" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.4"/>
            <path d="M350 105 L350 135 M340 120 L360 120" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            
            <circle cx="320" cy="300" r="12" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
            <rect x="316" y="308" width="8" height="4" fill="currentColor" opacity="0.4"/>
            <path d="M315 305 L325 305" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            <path d="M315 307 L325 307" stroke="currentColor" strokeWidth="1" opacity="0.4"/>
            
            <path d="M180 250 Q200 270 220 250" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
            <polygon points="215,248 225,250 215,252" fill="currentColor" opacity="0.4"/>
          </g>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className={`flex items-center space-x-2 text-purple-100 mb-8 transition-all duration-600 ${
          heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
        }`}>
          <Link to="/" className="hover:text-white transition-colors">Strona główna</Link>
          <span>/</span>
          <Link to="/uslugi" className="hover:text-white transition-colors">Usługi</Link>
          <span>/</span>
          <span className="text-white font-medium">Eventy edukacyjne</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className={`inline-block bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              🎯 Profesjonalne eventy edukacyjne
            </div>

            <h1 className={`text-4xl md:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Eventy <span className="text-purple-200">Edukacyjne</span>
            </h1>

            <p className={`text-xl text-purple-100 mb-8 leading-relaxed transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              Organizujemy profesjonalne wydarzenia edukacyjne i szkoleniowe 
              dostosowane do potrzeb Twojej firmy i branży.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${
              heroInView || showAllItems ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}>
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-xl"
                onClick={onContactClick}
              >
                <Phone className="mr-2 h-5 w-5" />
                Skontaktuj się z nami
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-white text-purple-600 hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300"
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

export default EventyHeroSection;
