
import React from 'react';
import { Award, Users, Shield, Target, Star, Flame } from 'lucide-react';

const LutowanieBenefitsSection: React.FC = () => {
  const benefits = [
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Certyfikaty IPC',
      description: 'Międzynarodowo uznawane certyfikaty lutowania'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Doświadczeni instruktorzy',
      description: 'Praktycy z wieloletnim doświadczeniem w elektronice'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Nowoczesne stanowiska',
      description: 'Najnowsze narzędzia i stacje lutownicze'
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: 'Małe grupy',
      description: 'Maksymalnie 8 osób - indywidualne podejście'
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: 'Praktyczne podejście',
      description: 'Hands-on learning na rzeczywistych projektach'
    },
    {
      icon: <Flame className="h-6 w-6" />,
      title: 'Wszystkie techniki',
      description: 'Od podstawowego lutowania do zaawansowanych metod'
    }
  ];

  return (
    <div className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Dlaczego warto wybrać nasze warsztaty lutowania?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center p-6 rounded-xl bg-red-50 hover:bg-red-100 transition-all duration-300">
              <div className="text-red-600 mb-4 mx-auto w-12 h-12 bg-red-200 rounded-full flex items-center justify-center">
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

export default LutowanieBenefitsSection;
