
import React from 'react';
import { Award, Users, Shield, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactAdvantages = () => {
  const { elementRef: advantagesRef, isInView: advantagesInView } = useScrollAnimation<HTMLDivElement>();

  const advantages = [
    {
      icon: Award,
      title: "15+ lat doświadczenia",
      description: "Jesteśmy liderem w branży szkoleń technicznych z wieloletnim doświadczeniem."
    },
    {
      icon: Users,
      title: "Ponad 5000 przeszkolonych",
      description: "Tysiące zadowolonych kursantów, którzy zdobyli uprawnienia dzięki nam."
    },
    {
      icon: Shield,
      title: "Najwyższa jakość",
      description: "Certyfikowane szkolenia zgodne z najwyższymi standardami UDT."
    },
    {
      icon: Zap,
      title: "Szybka realizacja",
      description: "Elastyczne terminy szkoleń dostosowane do potrzeb Twojej firmy."
    }
  ];

  return (
    <section 
      ref={advantagesRef}
      className={`py-20 bg-white transition-all duration-800 ${
        advantagesInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-800 delay-200 ${
          advantagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dlaczego warto wybrać nas?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Wybierając nasze szkolenia, inwestujesz w sprawdzoną jakość i profesjonalizm
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantages.map((advantage, index) => (
            <div 
              key={index}
              className={`bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-all duration-500 hover:scale-105 ${
                advantagesInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <advantage.icon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{advantage.title}</h3>
              <p className="text-gray-600">{advantage.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactAdvantages;
