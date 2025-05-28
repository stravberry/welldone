
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
      {/* Simplified background - no moving elements that cause flicker */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white rounded-full"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="bg-white bg-opacity-10 p-2 rounded inline-block mb-6 opacity-0 animate-fade-in">
              <span className="text-white font-medium">Certyfikowane szkolenia UDT</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              Szkolenia UDT Wrocław<br/>
              <span className="text-orange-200">i okolice - 96% zdawalność</span>
            </h1>
            <p className="text-white text-xl mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              Profesjonalne kursy na uprawnienia UDT dla operatorów we Wrocławiu i całym województwie dolnośląskim. Wózki widłowe, podesty ruchome, suwnice i układnice magazynowe.
            </p>
            <div className="flex flex-wrap gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
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
                className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white transition-all duration-200"
              >
                Sprawdź ofertę szkoleń
              </Button>
            </div>
            <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <StatsCounter />
            </div>
          </div>
          <div className="opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <QuickContactForm 
              formData={formData}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
              trackCTAClick={trackCTAClick}
            />
          </div>
        </div>
      </div>
      <div className="opacity-0 animate-fade-in" style={{ animationDelay: '1s' }}>
        <StatsBanner />
      </div>
    </section>
  );
};

export default HeroSection;
