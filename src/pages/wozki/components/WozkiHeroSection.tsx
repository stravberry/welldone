
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { FormData } from '../types';
import StatsCounter from './StatsCounter';
import StatsBanner from './StatsBanner';
import QuickContactForm from './QuickContactForm';

interface WozkiHeroSectionProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const WozkiHeroSection: React.FC<WozkiHeroSectionProps> = ({
  formData,
  handleInputChange,
  handleSubmit,
  trackCTAClick,
}) => {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 py-16 sm:py-20 overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="bg-white bg-opacity-10 p-2 rounded inline-block mb-6">
              <span className="text-white font-medium">Certyfikowane szkolenia wózków unoszących</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Szkolenia Wózki Unoszące<br/>
              <span className="text-blue-200">Wrocław i okolice</span>
            </h1>
            <p className="text-white text-xl mb-8">
              Profesjonalne kursy na uprawnienia UDT dla operatorów wózków unoszących we Wrocławiu i całym województwie dolnośląskim. Wózki nożycowe, teleskopowe, masztowe i platformy robocze.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                asChild
                size="lg" 
                className="bg-white text-blue-600 hover:bg-blue-100 transition-all duration-200"
                onClick={() => trackCTAClick('hero-contact', 'contact-form')}
              >
                <Link to="/kontakt">Skontaktuj się z nami</Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => trackCTAClick('hero-offerings', 'offerings')}
                className="bg-white bg-opacity-20 text-white border-white hover:bg-white hover:text-blue-600 transition-all duration-200"
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

export default WozkiHeroSection;
