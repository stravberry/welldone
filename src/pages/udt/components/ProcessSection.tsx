
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProcessSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ trackCTAClick }) => {
  const steps = [
    {
      number: "01",
      title: "Konsultacja",
      description: "Bezpłatna konsultacja, podczas której dobieramy odpowiednie szkolenie do Twoich potrzeb"
    },
    {
      number: "02",
      title: "Szkolenie",
      description: "Kompleksowe szkolenie praktyczne i teoretyczne przygotowujące do egzaminu"
    },
    {
      number: "03",
      title: "Egzamin UDT",
      description: "Organizujemy i przeprowadzamy oficjalny egzamin przed komisją UDT"
    },
    {
      number: "04",
      title: "Uzyskanie uprawnień",
      description: "Otrzymujesz oficjalne uprawnienia UDT ważne przez 5 lat"
    }
  ];

  return (
    <section id="process" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-medium">Jak to działa?</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Prosty proces uzyskania uprawnień</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Przeprowadzimy Cię przez cały proces uzyskania uprawnień UDT - od konsultacji po egzamin
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white p-6 rounded-lg shadow-md relative z-10 h-full">
                <div className="text-5xl font-bold text-orange-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-full h-1 bg-orange-200 z-0" 
                style={{ width: "calc(50% - 1rem)", transform: "translateX(100%)" }} />
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => trackCTAClick('process-start', 'contact-form')}
          >
            Rozpocznij proces szkolenia
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
