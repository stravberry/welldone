
import React from 'react';
import { Button } from '@/components/ui/button';
import type { FormData } from '../types';
import StatsCounter from './StatsCounter';
import StatsBanner from './StatsBanner';
import QuickContactForm from './QuickContactForm';

interface HeroSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  trackCTAClick,
}) => {
  return (
    <section className="relative bg-gradient-to-r from-orange-600 to-orange-400 py-16 sm:py-20 overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="bg-white bg-opacity-10 p-2 rounded inline-block mb-6">
              <span className="text-white font-medium">Certyfikowane szkolenia UDT</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Szkolenia UDT Wrocław<br/>
              <span className="text-orange-200">i okolice - 96% zdawalność</span>
            </h1>
            <p className="text-white text-xl mb-8">
              Profesjonalne kursy na uprawnienia UDT dla operatorów we Wrocławiu i całym województwie dolnośląskim. Wózki widłowe, podesty ruchome, suwnice i układnice magazynowe.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => trackCTAClick('hero-contact', 'contact-form')}
                className="bg-white text-orange-600 hover:bg-orange-100 transition-all duration-200"
              >
                Skontaktuj się z nami
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => trackCTAClick('hero-offerings', 'offerings')}
                className="bg-white bg-opacity-20 text-white border-white hover:bg-white hover:text-orange-600 transition-all duration-200"
              >
                Sprawdź ofertę szkoleń
              </Button>
            </div>
            <div className="mt-8">
              <StatsCounter />
            </div>
          </div>
          <div>
            <QuickContactForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              trackCTAClick={trackCTAClick}
            />
          </div>
        </div>
      </div>
      <StatsBanner />
    </section>
  );
};

export default HeroSection;
