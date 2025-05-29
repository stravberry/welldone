
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { FileText, Users, CheckCircle, Award } from 'lucide-react';

interface ProcessSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const ProcessSection: React.FC<ProcessSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: stepsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(4, 200);

  const steps = [
    {
      number: 1,
      title: "Zapisy i dokumenty",
      description: "Przygotowanie dokumentów, weryfikacja wymagań i ustalenie terminu szkolenia",
      icon: <FileText className="h-8 w-8 text-blue-600" />,
      details: ["Analiza potrzeb", "Przygotowanie dokumentów", "Ustalenie terminu"]
    },
    {
      number: 2,
      title: "Szkolenie teoretyczne",
      description: "Kompleksowe przygotowanie teoretyczne z zakresu obsługi wózków unoszących",
      icon: <Users className="h-8 w-8 text-blue-600" />,
      details: ["Podstawy obsługi", "Przepisy BHP", "Procedury bezpieczeństwa"]
    },
    {
      number: 3,
      title: "Szkolenie praktyczne",
      description: "Praktyczna nauka obsługi wózka pod okiem doświadczonych instruktorów",
      icon: <CheckCircle className="h-8 w-8 text-blue-600" />,
      details: ["Obsługa sprzętu", "Ćwiczenia praktyczne", "Symulacje sytuacji"]
    },
    {
      number: 4,
      title: "Egzamin i certyfikat",
      description: "Egzamin państwowy i otrzymanie uprawnień UDT do obsługi wózków",
      icon: <Award className="h-8 w-8 text-blue-600" />,
      details: ["Egzamin teoretyczny", "Egzamin praktyczny", "Certyfikat UDT"]
    }
  ];

  return (
    <section id="process" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-blue-600 font-medium text-sm sm:text-base">Jak przebiega kurs</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Proces szkolenia krok po kroku</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Nasz sprawdzony proces szkoleniowy gwarantuje skuteczne przygotowanie do egzaminu UDT
          </p>
        </div>
        
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className={`relative bg-white p-6 rounded-lg shadow-md transition-all duration-600 hover:shadow-xl hover:scale-105 group ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <div className="absolute -top-4 left-6">
                <span className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">
                  {step.number}
                </span>
              </div>
              
              <div className="flex justify-center mb-4 pt-4 group-hover:scale-110 transition-transform duration-200">
                {step.icon}
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-center group-hover:text-blue-600 transition-colors duration-200">
                {step.title}
              </h3>
              
              <p className="text-gray-600 text-center mb-4 transition-colors duration-200 group-hover:text-gray-700">
                {step.description}
              </p>
              
              <ul className="text-sm text-gray-500 space-y-1">
                {step.details.map((detail, detailIndex) => (
                  <li key={detailIndex} className="flex items-center">
                    <span className="text-blue-500 mr-2">•</span>
                    {detail}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transition-all duration-200 hover:shadow-lg"
            onClick={() => trackCTAClick('process-contact', 'contact-form')}
          >
            Rozpocznij szkolenie
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
