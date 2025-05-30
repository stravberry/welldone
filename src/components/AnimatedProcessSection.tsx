
import React from 'react';
import { Search, Calendar, Award } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import { Progress } from '@/components/ui/progress';

const AnimatedProcessSection = () => {
  const { elementRef: sectionRef, isInView: sectionVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: '100px'
  });

  const { elementRef: stepsRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(3, 300);

  const processSteps = [
    {
      icon: <Search className="h-6 w-6 text-white" />,
      title: "Analiza potrzeb",
      description: "Przeprowadzamy bezpłatny audyt uprawnień Twoich pracowników",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Calendar className="h-6 w-6 text-white" />,
      title: "Planowanie szkoleń",
      description: "Przygotowujemy plan szkoleń dostosowany do Twoich potrzeb",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Realizacja i certyfikacja",
      description: "Prowadzimy szkolenia i pomagamy w uzyskaniu certyfikatów",
      color: "from-green-500 to-green-600"
    }
  ];

  const progressValue = showAllFallback ? 100 : (visibleItems.length / processSteps.length) * 100;

  return (
    <>
      <style>
        {`
          @keyframes float-particles {
            0%, 100% {
              transform: translateY(0px) translateX(0px) rotate(0deg);
              opacity: 0.3;
            }
            25% {
              transform: translateY(-15px) translateX(8px) rotate(90deg);
              opacity: 0.5;
            }
            50% {
              transform: translateY(-8px) translateX(-12px) rotate(180deg);
              opacity: 0.4;
            }
            75% {
              transform: translateY(-20px) translateX(4px) rotate(270deg);
              opacity: 0.5;
            }
          }

          @keyframes gradient-wave {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
          }

          @keyframes timeline-pulse {
            0%, 100% {
              box-shadow: 0 0 0 0 rgba(255, 102, 0, 0.4);
            }
            50% {
              box-shadow: 0 0 0 8px rgba(255, 102, 0, 0);
            }
          }

          .floating-particle {
            animation: float-particles 8s ease-in-out infinite;
          }

          .gradient-wave-bg {
            background: linear-gradient(-45deg, #f8fafc, #e2e8f0, #f1f5f9, #e2e8f0);
            background-size: 400% 400%;
            animation: gradient-wave 8s ease infinite;
          }

          .timeline-dot {
            animation: timeline-pulse 2s infinite;
          }
        `}
      </style>

      <section 
        ref={sectionRef}
        className="py-12 md:py-16 relative overflow-hidden gradient-wave-bg"
      >
        {/* Floating particles - reduced number for mobile performance */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-1.5 h-1.5 bg-orange-300 rounded-full opacity-30 hidden md:block"
              style={{
                left: `${25 + i * 20}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.5}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div 
            className="text-center mb-12"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="inline-block mb-3">
              <span className="bg-orange-100 text-orange-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide">
                Nasz proces
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-gray-900">
              Jak działamy
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-6 sm:mb-8">
              Nasz proces jest prosty i przejrzysty - od pierwszego kontaktu do certyfikacji
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-sm sm:max-w-md mx-auto">
              <Progress 
                value={progressValue} 
                className="h-1.5 sm:h-2 bg-gray-200"
              />
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Postęp: {Math.round(progressValue)}%
              </p>
            </div>
          </div>

          {/* Process Steps with Timeline */}
          <div 
            ref={stepsRef}
            className="relative"
          >
            {/* Timeline Line - hidden on mobile */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-200 transform -translate-x-1/2 rounded-full" />

            <div className="space-y-8 md:space-y-12 lg:space-y-16">
              {processSteps.map((step, index) => {
                const isVisible = showAllFallback || visibleItems.includes(index);
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={index}
                    className={`relative flex items-center ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Timeline Dot - hidden on mobile */}
                    <div className="hidden lg:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <div 
                        className={`timeline-dot w-4 h-4 bg-orange-500 rounded-full border-2 border-white`}
                        style={{
                          animationDelay: `${index * 500}ms`
                        }}
                      />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full lg:w-5/12 ${isEven ? 'lg:pr-12' : 'lg:pl-12'}`}>
                      <div 
                        className="group bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-orange-200"
                        style={{
                          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          transitionDelay: `${index * 300 + 200}ms`
                        }}
                      >
                        {/* Icon */}
                        <div 
                          className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {step.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-lg sm:text-xl font-bold mb-3 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                          {step.description}
                        </p>

                        {/* Step Number */}
                        <div className="absolute -top-3 -right-3 w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-sm shadow-md">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Spacer for timeline */}
                    <div className="hidden lg:block w-2/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AnimatedProcessSection;
