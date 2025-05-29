
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { ArrowUp, Scissors, Telescope, Building } from 'lucide-react';

interface WozkiOfferingsSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
  onOfferingSelect: (offeringTitle: string) => void;
}

const WozkiOfferingsSection: React.FC<WozkiOfferingsSectionProps> = ({ 
  trackCTAClick, 
  onOfferingSelect 
}) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: cardsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(4, 100);

  const offerings = [
    {
      id: 'nozycowe',
      title: 'Wózki nożycowe',
      description: 'Szkolenie na operatora wózków nożycowych - podstawowe uprawnienia do obsługi platform nożycowych',
      icon: <Scissors className="h-8 w-8 text-blue-600" />,
      duration: '16 godzin',
      price: 'od 890 zł',
      features: [
        'Teoria bezpieczeństwa pracy',
        'Praktyczna obsługa wózka',
        'Egzamin teoretyczny i praktyczny',
        'Certyfikat UDT'
      ],
      popular: true
    },
    {
      id: 'teleskopowe',
      title: 'Wózki teleskopowe',
      description: 'Kurs operatora wózków teleskopowych - uprawnienia do pracy na znacznych wysokościach',
      icon: <Telescope className="h-8 w-8 text-blue-600" />,
      duration: '20 godzin',
      price: 'od 1190 zł',
      features: [
        'Obsługa wózków teleskopowych',
        'Praca na wysokości do 20m',
        'Stabilizacja i bezpieczeństwo',
        'Praktyka na różnych modelach'
      ],
      popular: false
    },
    {
      id: 'masztowe',
      title: 'Wózki masztowe',
      description: 'Szkolenie operatorów wózków masztowych - precyzyjna praca w ograniczonych przestrzeniach',
      icon: <ArrowUp className="h-8 w-8 text-blue-600" />,
      duration: '18 godzin',
      price: 'od 990 zł',
      features: [
        'Obsługa w wąskich przestrzeniach',
        'Techniki precyzyjnego pozycjonowania',
        'Kontrola stabilności',
        'Egzamin praktyczny'
      ],
      popular: false
    },
    {
      id: 'platformy',
      title: 'Platformy robocze',
      description: 'Kompleksowe szkolenie operatorów platform roboczych i podnośników',
      icon: <Building className="h-8 w-8 text-blue-600" />,
      duration: '24 godziny',
      price: 'od 1390 zł',
      features: [
        'Różne typy platform',
        'Praca zespołowa na wysokości',
        'Procedury awaryjne',
        'Kompleksowy egzamin'
      ],
      popular: false
    }
  ];

  return (
    <section id="offerings" className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-800 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-blue-600 font-medium text-sm sm:text-base">Nasze szkolenia</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">
            Kursy operatorów wózków unoszących
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            Oferujemy kompleksowe szkolenia na wszystkie typy wózków unoszących. 
            Zdobądź uprawnienia UDT z doświadczonymi instruktorami.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {offerings.map((offering, index) => (
            <Card 
              key={offering.id}
              className={`relative transition-all duration-600 hover:shadow-xl hover:scale-105 cursor-pointer group ${
                offering.popular ? 'ring-2 ring-blue-500' : ''
              } ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-5'
              }`}
              onClick={() => {
                onOfferingSelect(offering.title);
                trackCTAClick('offering-select', 'contact-form');
              }}
            >
              {offering.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Najpopularniejsze
                  </span>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="flex justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                  {offering.icon}
                </div>
                <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-200">
                  {offering.title}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {offering.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-4">
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-500">Czas trwania:</span>
                    <span className="font-medium">{offering.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Cena:</span>
                    <span className="font-bold text-blue-600">{offering.price}</span>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {offering.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span className="text-blue-500 mr-2 mt-1">✓</span>
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOfferingSelect(offering.title);
                    trackCTAClick('offering-cta', 'contact-form');
                  }}
                >
                  Zapisz się na kurs
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WozkiOfferingsSection;
