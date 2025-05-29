
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PartnersSection = () => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: true
  });

  const partners = [
    { name: '3M', logo: '/lovable-uploads/3m-logo.png' },
    { name: 'WAGO', logo: '/lovable-uploads/wago-logo.png' },
    { name: 'LG', logo: '/lovable-uploads/lg-logo.png' },
    { name: 'Siemens', logo: '/lovable-uploads/siemens-logo.png' },
    { name: 'ABB', logo: '/lovable-uploads/abb-logo.png' },
    { name: 'Schneider Electric', logo: '/lovable-uploads/schneider-logo.png' }
  ];

  return (
    <section className="py-12 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={elementRef}
          className="text-center mb-8"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Zaufały nam wiodące firmy
          </h2>
          <p className="text-gray-600">
            Współpracujemy z liderami rynku w różnych branżach
          </p>
        </div>
        
        <div className="relative overflow-hidden">
          <div 
            className="flex items-center justify-center space-x-8 md:space-x-12 animate-slide-logos"
            style={{
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 1s ease-out',
              transitionDelay: '300ms'
            }}
          >
            {partners.map((partner, index) => (
              <div 
                key={partner.name}
                className="flex-shrink-0 h-16 w-24 md:h-20 md:w-32 flex items-center justify-center bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'scale(1)' : 'scale(0.8)',
                  transition: 'all 0.6s ease-out',
                  transitionDelay: isInView ? `${index * 100 + 500}ms` : '0ms'
                }}
              >
                <div className="text-2xl md:text-3xl font-bold text-gray-700 group-hover:text-orange-600 transition-colors duration-300">
                  {partner.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
