import React, { memo } from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const OptimizedPartnersSection = memo(() => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  // Reduced to 8 most important partners for better performance
  const partners = [
    { name: 'Integer.pl', logo: '/lovable-uploads/0a2ae962-c06c-418a-b66b-907402b760a4.png' },
    { name: 'Parker', logo: '/lovable-uploads/55a487c4-fa08-4983-94f4-38a9d215ce0d.png' },
    { name: 'Boart Longyear', logo: '/lovable-uploads/a19e13b7-2a90-4931-a065-45e2f54f7d31.png' },
    { name: 'Elica', logo: '/lovable-uploads/2e5d717c-013b-4811-8603-c44aa25d8b41.png' },
    { name: 'DS Smith', logo: '/lovable-uploads/390f276a-c28b-4673-90e8-9597a05710ef.png' },
    { name: '3M', logo: '/lovable-uploads/ab5e53af-efd7-4bb4-af28-172dee25f9d4.png' },
    { name: 'Collins Aerospace', logo: '/lovable-uploads/02055021-d4ef-4d85-8eff-95ead97d9b26.png' },
    { name: 'Cargill', logo: '/lovable-uploads/7d1e6908-562e-40c8-b4c0-ca5c23507339.png' }
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-gray-50 to-white">
      <div 
        ref={elementRef}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div 
          className="text-center mb-10 transition-all duration-500"
          style={{
            opacity: isInView ? 1 : 0,
            transform: isInView ? 'translateY(0)' : 'translateY(20px)'
          }}
        >
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              NASI KLIENCI
            </span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Pracujemy dla firm produkcyjnych
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Szkolimy pracowników firm z branży automotive, spożywczej, farmaceutycznej, logistycznej i innych
          </p>
        </div>
        
        {/* Optimized marquee with only essential partners */}
        <div className="overflow-hidden">
          <div 
            className="flex whitespace-nowrap"
            style={{
              animation: 'marquee 30s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* Single set optimized */}
            {partners.map((partner, index) => (
              <div
                key={partner.name}
                className="mx-4 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 w-[140px] h-[80px] flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
            {/* Duplicate for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`dup-${partner.name}`}
                className="mx-4 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 w-[140px] h-[80px] flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
});

OptimizedPartnersSection.displayName = 'OptimizedPartnersSection';

export default OptimizedPartnersSection;