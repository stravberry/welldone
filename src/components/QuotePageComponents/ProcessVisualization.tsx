
import React from 'react';
import { FileText, Zap, Mail, CheckCircle } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const ProcessVisualization: React.FC = () => {
  const { elementRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(4, 200);

  const steps = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: "Wypełnij formularz",
      description: "Podaj podstawowe informacje o potrzebach szkoleniowych Twojej firmy",
      time: "2-3 minuty",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Automatyczna analiza",
      description: "Nasz system analizuje Twoje potrzeby i dobiera optymalne rozwiązania",
      time: "Natychmiast",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Mail className="h-8 w-8" />,
      title: "Otrzymaj wycenę",
      description: "Szczegółowa oferta z cenami zostanie wysłana na Twój email",
      time: "Do 15 minut",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Zaakceptuj ofertę",
      description: "Potwierdzasz wybrane szkolenia i ustalamy terminy realizacji",
      time: "Kiedy zechcesz",
      color: "from-purple-500 to-violet-500"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Jak działa błyskawiczna wycena?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Proces jest prosty, szybki i całkowicie zautomatyzowany. 
            Otrzymasz profesjonalną wycenę w rekordowym czasie.
          </p>
        </div>

        <div ref={elementRef} className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-amber-200 via-green-200 to-purple-200 rounded-full opacity-30"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-700 border border-gray-100 ${
                  visibleItems.includes(index) || showAllFallback
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                } hover:scale-105 hover:-translate-y-2`}
                style={{
                  transitionDelay: showAllFallback ? '0ms' : `${index * 200}ms`
                }}
              >
                {/* Step number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-lg">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/20`}>
                  <div className="text-white drop-shadow-lg">
                    {step.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                  {step.title}
                </h3>
                
                <p className="text-gray-700 leading-relaxed mb-4 group-hover:text-gray-800 transition-colors duration-300">
                  {step.description}
                </p>

                {/* Time badge */}
                <div className={`inline-block px-4 py-2 rounded-full bg-gradient-to-r ${step.color} bg-opacity-10 border border-current border-opacity-20`}>
                  <span className="text-sm font-semibold text-gray-700">{step.time}</span>
                </div>

                {/* Hover accent line */}
                <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${step.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-block bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Gotowy na szybką wycenę?
            </h3>
            <p className="text-gray-600 mb-6">
              Dołącz do ponad 500 firm, które już skorzystały z naszego systemu błyskawicznej wyceny.
            </p>
            <div className="flex items-center justify-center space-x-2 text-amber-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-semibold">Bezpłatnie i bez zobowiązań</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessVisualization;
