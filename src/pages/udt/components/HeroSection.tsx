
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useEventTracking from '@/hooks/useEventTracking';
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
    <section className="relative bg-gradient-to-r from-orange-600 to-orange-400 py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="bg-white bg-opacity-10 p-2 rounded inline-block mb-6">
              <span className="text-white font-medium">Certyfikowane szkolenia UDT</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Zdobądź uprawnienia UDT<br/>
              <span className="text-orange-200">dla operatorów</span>
            </h1>
            <p className="text-white text-xl mb-8">
              Kompleksowe szkolenia na urządzenia techniczne ze zdawalnością 96%
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                onClick={() => trackCTAClick('hero-contact', 'contact-form')}
                className="bg-white text-orange-600 hover:bg-orange-100"
              >
                Skontaktuj się z nami
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => trackCTAClick('hero-offerings', 'offerings')}
                className="text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white"
              >
                Sprawdź ofertę szkoleń
              </Button>
            </div>
            <StatsCounter />
          </div>
          <QuickContactForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            trackCTAClick={trackCTAClick}
          />
        </div>
      </div>
      <StatsBanner />
    </section>
  );
};

export default HeroSection;
