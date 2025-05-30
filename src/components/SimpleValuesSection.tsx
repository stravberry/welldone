
import React from 'react';
import { Clock, Users, Target, CheckCircle, Award } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const SimpleValuesSection = () => {
  const { elementRef, isInView } = useScrollAnimation();

  const values = [
    {
      icon: Clock,
      title: "Elastyczność",
      description: "Dostosowujemy się do Twoich potrzeb i harmonogramu. Szkolenia w weekendy, po godzinach, w Twojej lokalizacji."
    },
    {
      icon: Users,
      title: "Doświadczenie",
      description: "15+ lat praktycznego doświadczenia w przemyśle. Szkolenia tworzone przez praktyków dla praktyków."
    },
    {
      icon: Target,
      title: "Bezpłatny audyt",
      description: "Sprawdzimy stan uprawnień za darmo. Kompleksowa analiza potrzeb i optymalne rozwiązania."
    },
    {
      icon: CheckCircle,
      title: "Kompleksowa obsługa",
      description: "Od zapisów po certyfikaty - załatwiamy wszystko. Ty się nie martwisz o żadne formalności."
    },
    {
      icon: Award,
      title: "Gwarancja jakości",
      description: "Najwyższa jakość szkoleń i obsługi. 5000+ przeszkolonych osób, 98% pozytywnych referencji."
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            Nasze wartości
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Poznaj zasady, którymi kierujemy się w codziennej pracy
          </p>
        </div>

        <div 
          ref={elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {values.map((value, index) => (
            <div 
              key={value.title}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600 leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SimpleValuesSection;
