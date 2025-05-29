
import React from 'react';
import { Award, Users, Shield, Target, CheckCircle, Zap } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const BenefitsSection: React.FC = () => {
  const { elementRef: benefitsRef, visibleItems: visibleBenefits } = useStaggeredAnimation<HTMLDivElement>(6, 100);

  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: '96% zdawalność',
      description: 'Najwyższa zdawalność egzaminów w regionie'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Doświadczeni instruktorzy',
      description: 'Kadra z wieloletnim doświadczeniem praktycznym'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nowoczesny sprzęt',
      description: 'Szkolenia na najnowszych modelach urządzeń'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Małe grupy',
      description: 'Indywidualne podejście do każdego uczestnika'
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: 'Wsparcie po kursie',
      description: 'Pomoc i doradztwo również po ukończeniu szkolenia'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Szybka realizacja',
      description: 'Elastyczne terminy dostosowane do Twoich potrzeb'
    }
  ];

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dlaczego warto wybrać nasze szkolenia?
          </h2>
          <p className="text-lg text-gray-600">
            Przekonaj się, co wyróżnia nasze kursy na tle konkurencji
          </p>
        </div>

        <div ref={benefitsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`text-center p-6 rounded-xl bg-orange-50 hover:bg-orange-100 transition-all duration-500 hover:scale-105 ${
                visibleBenefits.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="text-orange-600 mb-4 mx-auto w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsSection;
