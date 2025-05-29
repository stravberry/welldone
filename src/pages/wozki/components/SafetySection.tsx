
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { Shield, AlertTriangle, CheckCircle, Users } from 'lucide-react';

interface SafetySectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const SafetySection: React.FC<SafetySectionProps> = ({ trackCTAClick }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: featuresRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(4, 150);

  const safetyFeatures = [
    {
      title: "Praca na wysokości",
      description: "Kompleksowe szkolenie z zakresu bezpieczeństwa pracy na wysokości zgodnie z przepisami BHP",
      icon: <Shield className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Identyfikacja zagrożeń",
      description: "Nauka rozpoznawania i oceny ryzyka podczas pracy z wózkami unoszącymi",
      icon: <AlertTriangle className="h-8 w-8 text-yellow-600" />
    },
    {
      title: "Procedury bezpieczeństwa",
      description: "Szczegółowe omówienie procedur przed rozpoczęciem pracy i w sytuacjach awaryjnych",
      icon: <CheckCircle className="h-8 w-8 text-green-600" />
    },
    {
      title: "Praca zespołowa",
      description: "Koordynacja działań z sygnalistą i innymi pracownikami na stanowisku pracy",
      icon: <Users className="h-8 w-8 text-purple-600" />
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-blue-600 font-medium text-sm sm:text-base">Bezpieczeństwo przede wszystkim</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">
            Kompleksowe szkolenie BHP dla operatorów
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Nasze szkolenia kładą szczególny nacisk na bezpieczeństwo pracy. 
            Każdy uczestnik otrzymuje kompleksową wiedzę z zakresu BHP i procedur awaryjnych.
          </p>
        </div>
        
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12">
          {safetyFeatures.map((feature, index) => (
            <div 
              key={index}
              className={`bg-gray-50 p-6 rounded-lg transition-all duration-600 hover:shadow-lg hover:bg-white group cursor-pointer border border-transparent hover:border-blue-200 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
            >
              <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-center group-hover:text-blue-600 transition-colors duration-200">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-center transition-colors duration-200 group-hover:text-gray-700">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-blue-50 rounded-2xl p-8 md:p-12">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-blue-900">
              Certyfikowane środki ochrony indywidualnej
            </h3>
            <p className="text-lg text-blue-700 mb-6">
              Zapewniamy kompletne wyposażenie ochronne zgodne z normami europejskimi. 
              Każdy uczestnik otrzymuje szelki bezpieczeństwa, kask oraz inne niezbędne środki ochrony.
            </p>
            <Button 
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => trackCTAClick('safety-contact', 'contact-form')}
            >
              Dowiedz się więcej o bezpieczeństwie
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
