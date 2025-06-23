
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PartnersSection = () => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const partners = [
    { name: 'Integer.pl', logo: '/lovable-uploads/0a2ae962-c06c-418a-b66b-907402b760a4.png' },
    { name: 'Parker', logo: '/lovable-uploads/55a487c4-fa08-4983-94f4-38a9d215ce0d.png' },
    { name: 'SteriPack', logo: '/lovable-uploads/88b74fff-f073-4ff7-a9b8-5fa5c4db6116.png' },
    { name: 'Boart Longyear', logo: '/lovable-uploads/a19e13b7-2a90-4931-a065-45e2f54f7d31.png' },
    { name: 'Elica', logo: '/lovable-uploads/2e5d717c-013b-4811-8603-c44aa25d8b41.png' },
    { name: 'Sörling', logo: '/lovable-uploads/2acf80ce-5ce2-4675-9ea3-acfaea907e2d.png' },
    { name: 'Bartek Candles', logo: '/lovable-uploads/87573245-503b-47bb-b4c4-cc146b6aaae9.png' },
    { name: 'DS Smith', logo: '/lovable-uploads/390f276a-c28b-4673-90e8-9597a05710ef.png' },
    { name: 'GTHR', logo: '/lovable-uploads/0dac7fe8-118a-4237-8a94-cf942035abc1.png' }
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
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 min-w-[180px] h-[120px] flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${partner.name}`}
                className="mx-8 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 min-w-[180px] h-[120px] flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                  />
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
