
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
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Analiza potrzeb",
      description: "Przeprowadzamy bezpłatny audyt uprawnień Twoich pracowników",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Calendar className="h-8 w-8 text-white" />,
      title: "Planowanie szkoleń",
      description: "Przygotowujemy plan szkoleń dostosowany do Twoich potrzeb",
      color: "from-orange-500 to-orange-600"
    },
    {
      icon: <Award className="h-8 w-8 text-white" />,
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
              transform: translateY(-20px) translateX(10px) rotate(90deg);
              opacity: 0.6;
            }
            50% {
              transform: translateY(-10px) translateX(-15px) rotate(180deg);
              opacity: 0.4;
            }
            75% {
              transform: translateY(-30px) translateX(5px) rotate(270deg);
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
              box-shadow: 0 0 0 10px rgba(255, 102, 0, 0);
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
        className="py-20 relative overflow-hidden gradient-wave-bg"
      >
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="floating-particle absolute w-2 h-2 bg-orange-300 rounded-full opacity-30"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.3}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <div 
            className="text-center mb-16"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <div className="inline-block mb-4">
              <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                Nasz proces
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
              Jak działamy
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Nasz proces jest prosty i przejrzysty - od pierwszego kontaktu do certyfikacji
            </p>
            
            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <Progress 
                value={progressValue} 
                className="h-2 bg-gray-200"
              />
              <p className="text-sm text-gray-500 mt-2">
                Postęp: {Math.round(progressValue)}%
              </p>
            </div>
          </div>

          {/* Process Steps with Timeline */}
          <div 
            ref={stepsRef}
            className="relative"
          >
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-200 via-orange-400 to-orange-200 transform -translate-x-1/2 rounded-full" />

            <div className="space-y-12 md:space-y-20">
              {processSteps.map((step, index) => {
                const isVisible = showAllFallback || visibleItems.includes(index);
                const isEven = index % 2 === 0;

                return (
                  <div 
                    key={index}
                    className={`relative flex items-center ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                      transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      transitionDelay: `${index * 200}ms`
                    }}
                  >
                    {/* Timeline Dot */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                      <div 
                        className={`timeline-dot w-6 h-6 bg-orange-500 rounded-full border-4 border-white`}
                        style={{
                          animationDelay: `${index * 500}ms`
                        }}
                      />
                    </div>

                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${isEven ? 'md:pr-16' : 'md:pl-16'}`}>
                      <div 
                        className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 border border-gray-100 hover:border-orange-200"
                        style={{
                          transform: isVisible ? 'scale(1)' : 'scale(0.9)',
                          transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                          transitionDelay: `${index * 300 + 200}ms`
                        }}
                      >
                        {/* Icon */}
                        <div 
                          className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                        >
                          {step.icon}
                        </div>

                        {/* Content */}
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors duration-300">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {step.description}
                        </p>

                        {/* Step Number */}
                        <div className="absolute -top-4 -right-4 w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    {/* Spacer for timeline */}
                    <div className="hidden md:block w-2/12" />
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
