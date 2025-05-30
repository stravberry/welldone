
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PartnersSection = () => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const partners = [
    { name: '3M', logo: '3M' },
    { name: 'WAGO', logo: 'WAGO' },
    { name: 'LG', logo: 'LG' },
    { name: 'Siemens', logo: 'SIEMENS' },
    { name: 'Samsung', logo: 'SAMSUNG' },
    { name: 'Bosch', logo: 'BOSCH' },
    { name: 'Philips', logo: 'PHILIPS' },
    { name: 'ABB', logo: 'ABB' }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-blue-50/30" />
      
      <div 
        ref={elementRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        <div 
          className="text-center mb-10 transition-all duration-800"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(30px)'
          }}
        >
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Nasze partnerstwo
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Zaufały nam wiodące firmy
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Współpracujemy z najlepszymi firmami z różnych branż, dostarczając im profesjonalne szkolenia
          </p>
        </div>
        
        {/* Animated partners marquee */}
        <div className="relative overflow-hidden">
          <div className="flex animate-marquee whitespace-nowrap group-hover:animate-pause">
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <div
                key={`first-${partner.name}`}
                className="mx-8 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 min-w-[160px]">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">
                      {partner.logo}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Partner
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${partner.name}`}
                className="mx-8 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 min-w-[160px]">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-700 mb-2">
                      {partner.logo}
                    </div>
                    <div className="text-xs text-gray-500 uppercase tracking-wide">
                      Partner
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-orange-200 rounded-full opacity-20 animate-float" />
        <div className="absolute bottom-10 left-10 w-16 h-16 bg-blue-200 rounded-full opacity-20 animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </section>
  );
};

export default PartnersSection;
