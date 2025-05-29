
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MessageCircle, Building2, Clock, FileText, Headphones, Trophy } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ServiceStandards = () => {
  const { elementRef: servicesRef, isInView: servicesInView } = useScrollAnimation<HTMLDivElement>();

  const services = [
    {
      icon: MessageCircle,
      title: "Darmowa konsultacja i doradztwo",
      description: "Profesjonalne doradztwo w wyborze odpowiednich szkoleń dla Twojej firmy",
      highlight: "Bez zobowiązań"
    },
    {
      icon: Building2,
      title: "Szkolenia w siedzibie klienta",
      description: "Przeprowadzamy szkolenia bezpośrednio w Państwa firmie",
      highlight: "Na miejscu"
    },
    {
      icon: Clock,
      title: "Elastyczne terminy realizacji",
      description: "Dostosowujemy harmonogram szkoleń do potrzeb Twojej organizacji",
      highlight: "7 dni w tygodniu"
    },
    {
      icon: FileText,
      title: "Kompleksowa obsługa dokumentacji",
      description: "Zajmujemy się całą procedurą uzyskania uprawnień UDT",
      highlight: "Od A do Z"
    },
    {
      icon: Headphones,
      title: "Wsparcie po ukończeniu kursu",
      description: "Oferujemy ciągłe wsparcie techniczne i merytoryczne",
      highlight: "Przez 12 miesięcy"
    },
    {
      icon: Trophy,
      title: "Najwyższa zdawalność egzaminów",
      description: "Nasze metody szkoleniowe gwarantują sukces w egzaminach UDT",
      highlight: "95% zdawalność"
    }
  ];

  return (
    <section 
      ref={servicesRef}
      className={`py-20 bg-gray-50 transition-all duration-800 ${
        servicesInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-800 delay-200 ${
          servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Standardy naszej obsługi
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Profesjonalne podejście do każdego etapu współpracy - od pierwszego kontaktu po wsparcie poszkoleniowe
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card 
              key={index}
              className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 border-0 bg-white ${
                servicesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-orange-100 p-3 rounded-full group-hover:bg-orange-200 transition-colors duration-300 flex-shrink-0">
                    <service.icon className="h-6 w-6 text-orange-600" />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full font-medium inline-block mb-3">
                      {service.highlight}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-orange-600 transition-colors duration-300 mb-2">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceStandards;
