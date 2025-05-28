
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface WhyChooseUsSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ trackCTAClick }) => {
  const reasons = [
    {
      title: "Doświadczeni instruktorzy",
      description: "Nasi trenerzy to praktycy z wieloletnim doświadczeniem w branży",
      icon: "👨‍🏫"
    },
    {
      title: "Zdawalność 96%",
      description: "Jeden z najwyższych wskaźników zdawalności w Polsce",
      icon: "🏆"
    },
    {
      title: "Kursy w całym regionie",
      description: "Szkolenia UDT we Wrocławiu i okolicach - dojazd do klienta",
      icon: "🚗"
    },
    {
      title: "Wsparcie po szkoleniu",
      description: "Pomagamy w formalności związanych z uzyskaniem uprawnień",
      icon: "📝"
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-medium">Dlaczego my?</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Najlepsze szkolenia UDT w województwie dolnośląskim</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Od 10 lat zapewniamy najwyższą jakość szkoleń UDT we Wrocławiu i okolicach, gwarantując zdawalność na poziomie 96%
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="text-4xl mb-4">{reason.icon}</div>
              <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => trackCTAClick('why-us-contact', 'contact-form')}
          >
            Skontaktuj się z nami
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
