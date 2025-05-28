
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface OfferingProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
  onOfferingSelect?: (offeringTitle: string) => void;
}

const OfferingsSection: React.FC<OfferingProps> = ({ trackCTAClick, onOfferingSelect }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: cardsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(4, 200);

  const offerings = [
    {
      title: "Wózki widłowe",
      description: "Szkolenia na wszystkie kategorie wózków jezdniowych podnośnikowych",
      image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80",
      alt: "Operator wózka widłowego podczas pracy w magazynie",
      features: ["Kategorie I WJO", "Kategorie II WJO", "Kategorie III WJO"]
    },
    {
      title: "Podesty ruchome",
      description: "Szkolenia na podesty przejezdne, wolnobieżne i przewoźne",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
      alt: "Podest ruchomy nożycowy używany podczas prac na wysokości",
      features: ["Podesty nożycowe", "Podesty przejezdne", "Podesty montowane"]
    },
    {
      title: "Suwnice",
      description: "Pełne szkolenia na obsługę suwnic hakowych i specjalistycznych",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80",
      alt: "Suwnica przemysłowa w hali produkcyjnej",
      features: ["Suwnice sterowane z kabiny", "Suwnice sterowane z poziomu", "Suwnice specjalistyczne"]
    },
    {
      title: "Układnice magazynowe",
      description: "Profesjonalne szkolenia z obsługi układnic wysokiego składowania",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=800&q=80",
      alt: "Układnica magazynowa wysokiego składowania w nowoczesnym magazynie",
      features: ["Układnice półautomatyczne", "Układnice automatyczne", "Układnice specjalistyczne"]
    }
  ];

  return (
    <section id="offerings" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-1000 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Szkolenia UDT we Wrocławiu i okolicach</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oferujemy kompleksowe kursy UDT na wszystkie rodzaje urządzeń transportu bliskiego we Wrocławiu i całym województwie dolnośląskim
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {offerings.map((offering, index) => (
            <div
              key={index}
              className={`transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <OfferingCard 
                offering={offering} 
                trackCTAClick={trackCTAClick}
                onOfferingSelect={onOfferingSelect}
              />
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-xl text-gray-700 mb-6">
            Potrzebujesz szkolenia UDT w okolicach Wrocławia? Skontaktuj się z nami!
          </p>
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={() => trackCTAClick('see-more-offerings', 'contact-form')}
          >
            Sprawdź wszystkie szkolenia
          </Button>
        </div>
      </div>
    </section>
  );
};

interface OfferingCardProps {
  offering: {
    title: string;
    description: string;
    image: string;
    alt: string;
    features: string[];
  };
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
  onOfferingSelect?: (offeringTitle: string) => void;
}

const OfferingCard: React.FC<OfferingCardProps> = ({ offering, trackCTAClick, onOfferingSelect }) => {
  const handleOfferingClick = () => {
    trackCTAClick(`offering-${offering.title}`, 'contact-form');
    if (onOfferingSelect) {
      onOfferingSelect(offering.title);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={offering.image} 
          alt={offering.alt} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <h3 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
          {offering.title}
        </h3>
      </div>
      <div className="p-6">
        <p className="text-gray-600 mb-6">
          {offering.description}
        </p>
        <ul className="space-y-2 mb-6">
          {offering.features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-green-500" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className="w-full bg-orange-600 hover:bg-orange-700 mt-2 transition-all duration-200"
          onClick={handleOfferingClick}
        >
          Zapisz się na szkolenie
        </Button>
      </div>
    </div>
  );
};

export default OfferingsSection;
