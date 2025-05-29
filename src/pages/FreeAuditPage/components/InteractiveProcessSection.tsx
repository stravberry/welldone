
import React, { useState } from 'react';
import { CheckCircle, MessageSquare, ClipboardList, FileText, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const InteractiveProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const { elementRef, isInView } = useScrollAnimation();

  const steps = [
    {
      number: 1,
      title: "Wypełnienie formularza zgłoszeniowego",
      description: "Skontaktuj się z nami poprzez formularz poniżej, a my skontaktujemy się z Tobą w ciągu 24 godzin.",
      icon: <FileText className="h-8 w-8" />,
      details: [
        "Podstawowe informacje o firmie",
        "Obecne procesy szkoleniowe", 
        "Główne wyzwania i cele",
        "Preferowany termin kontaktu"
      ]
    },
    {
      number: 2,
      title: "Spotkanie konsultacyjne",
      description: "Umówimy się na krótką rozmowę, podczas której omówimy specyfikę Twojej firmy oraz wymagania dotyczące szkoleń.",
      icon: <MessageSquare className="h-8 w-8" />,
      details: [
        "Analiza potrzeb szkoleniowych",
        "Przegląd obecnej dokumentacji",
        "Ustalenie zakresu audytu",
        "Planowanie harmonogramu"
      ]
    },
    {
      number: 3,
      title: "Przeprowadzenie audytu",
      description: "Nasi eksperci dokonają analizy Twoich obecnych procesów szkoleniowych, przeglądając dokumenty i certyfikaty.",
      icon: <ClipboardList className="h-8 w-8" />,
      details: [
        "Audyt dokumentacji szkoleniowej",
        "Weryfikacja uprawnień pracowników",
        "Analiza kosztów i efektywności",
        "Identyfikacja luk i możliwości"
      ]
    },
    {
      number: 4,
      title: "Raport i rekomendacje",
      description: "Po audycie otrzymasz pełny raport z wnioskami i rekomendacjami dotyczącymi optymalizacji procesów szkoleniowych.",
      icon: <CheckCircle className="h-8 w-8" />,
      details: [
        "Szczegółowy raport audytu",
        "Konkretne rekomendacje",
        "Plan optymalizacji kosztów",
        "Harmonogram wdrożenia"
      ]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-orange-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={elementRef}>
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-gray-900 mb-6 transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Jak wygląda proces audytu?
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`} style={{ transitionDelay: '200ms' }}>
            Nasz proces audytu jest prosty i nieinwazyjny, zaprojektowany tak, aby dostarczyć wartość 
            przy minimalnym obciążeniu dla Twojego zespołu.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Progress line */}
            <div className="absolute top-16 left-0 w-full h-1 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-orange-500 to-amber-500 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
              ></div>
            </div>

            <div className="grid grid-cols-4 gap-8 relative z-10">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={`text-center cursor-pointer transition-all duration-500 ${
                    isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                  onClick={() => setActiveStep(index)}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Step number and icon */}
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                    activeStep >= index 
                      ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-lg scale-110' 
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}>
                    {activeStep >= index ? step.icon : <span className="text-xl font-bold">{step.number}</span>}
                  </div>

                  {/* Step title */}
                  <h3 className={`text-lg font-semibold mb-2 transition-colors duration-300 ${
                    activeStep >= index ? 'text-orange-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </h3>

                  {/* Step description */}
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Active step details */}
          <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mr-4">
                {steps[activeStep].icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{steps[activeStep].title}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps[activeStep].details.map((detail, index) => (
                <div key={index} className="flex items-center">
                  <ChevronRight className="h-5 w-5 text-orange-500 mr-3" />
                  <span className="text-gray-700">{detail}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg transition-all duration-500 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center text-white mr-4 flex-shrink-0">
                  <span className="text-lg font-bold">{step.number}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 mb-4">{step.description}</p>
                  <div className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <div key={detailIndex} className="flex items-center">
                        <ChevronRight className="h-4 w-4 text-orange-500 mr-2" />
                        <span className="text-sm text-gray-600">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InteractiveProcessSection;
