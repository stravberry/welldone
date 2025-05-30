
import React from 'react';
import { Clock, Users, Target, CheckCircle, Award, Building, ArrowRight, MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ValuesJourneySection = () => {
  const { elementRef, isInView } = useScrollAnimation();

  const journeySteps = [
    {
      icon: Clock,
      title: "Elastyczność",
      description: "Dostosowujemy się do Twoich potrzeb i harmonogramu",
      detail: "Szkolenia w weekendy, po godzinach, w Twojej lokalizacji. Pełna elastyczność terminów.",
      color: "from-blue-500 to-blue-600",
      position: "start"
    },
    {
      icon: Users,
      title: "Specjalizacja",
      description: "15+ lat doświadczenia w przemyśle",
      detail: "Znamy specyfikę fabryk i zakładów. Szkolenia tworzone przez praktyków dla praktyków.",
      color: "from-purple-500 to-purple-600",
      position: "middle"
    },
    {
      icon: Target,
      title: "Bezpłatny audyt",
      description: "Sprawdzimy stan uprawnień za darmo",
      detail: "Kompleksowa analiza potrzeb i optymalne rozwiązania szkoleniowe.",
      color: "from-green-500 to-green-600",
      position: "middle"
    },
    {
      icon: CheckCircle,
      title: "Kompleksowa obsługa",
      description: "Od zapisów po certyfikaty - załatwiamy wszystko",
      detail: "Zapisy, organizacja, dokumentacja, certyfikaty. Ty się nie martwisz o nic.",
      color: "from-orange-500 to-orange-600",
      position: "middle"
    },
    {
      icon: Award,
      title: "Doskonałość",
      description: "Najwyższa jakość szkoleń i obsługi",
      detail: "5000+ przeszkolonych osób, 98% pozytywnych referencji, gwarancja jakości.",
      color: "from-red-500 to-red-600",
      position: "end"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Nasza droga do doskonałości
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            Podróż przez nasze <span className="text-orange-600">wartości</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Każdy krok w naszej podróży to konkretna korzyść dla Twoich pracowników i firmy
          </p>
        </div>

        <div 
          ref={elementRef}
          className={`relative transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Journey path */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-orange-200 to-red-200 transform -translate-y-1/2 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-orange-500 to-red-500 h-full animate-pulse opacity-30" />
          </div>

          {/* Journey steps */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
            {journeySteps.map((step, index) => (
              <div 
                key={step.title}
                className="group relative"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                {/* Connection line for mobile */}
                {index < journeySteps.length - 1 && (
                  <div className="lg:hidden absolute left-1/2 top-full w-0.5 h-8 bg-gradient-to-b from-orange-300 to-blue-300 transform -translate-x-1/2 z-0" />
                )}

                {/* Step card */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-orange-200 transform hover:scale-105 group-hover:-translate-y-2">
                  {/* Step number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300`}>
                    <step.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{step.description}</p>
                    
                    {/* Expandable detail */}
                    <div className="bg-gray-50 rounded-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <p className="text-sm text-gray-700">{step.detail}</p>
                    </div>
                  </div>

                  {/* Position indicator */}
                  <div className="absolute bottom-4 right-4">
                    <MapPin className="h-4 w-4 text-orange-400" />
                  </div>
                </div>

                {/* Arrow connector for larger screens */}
                {index < journeySteps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-6 transform -translate-y-1/2 z-20">
                    <div className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-orange-200">
                      <ArrowRight className="h-5 w-5 text-orange-500" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Journey completion badge */}
          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full shadow-xl">
              <div className="flex items-center space-x-3">
                <Award className="h-6 w-6" />
                <span className="text-lg font-bold">Twój sukces - nasz cel</span>
                <Award className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValuesJourneySection;
