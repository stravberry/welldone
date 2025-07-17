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
    { name: 'GTHR', logo: '/lovable-uploads/0dac7fe8-118a-4237-8a94-cf942035abc1.png' },
    { name: '3M', logo: '/lovable-uploads/ab5e53af-efd7-4bb4-af28-172dee25f9d4.png' },
    { name: 'Walgo', logo: '/lovable-uploads/f94101ae-b323-4fd6-8617-ad3cb1638fd7.png' },
    { name: 'Oleofarm', logo: '/lovable-uploads/e7addfaa-d3a7-4fb7-8577-d1be9b3cbc4a.png' },
    { name: 'ZF', logo: '/lovable-uploads/8af76837-91e5-4d32-acb8-7b9677852535.png' },
    { name: 'Mask Authority', logo: '/lovable-uploads/8158ab6b-33a7-49c2-a634-0eba61e5df4a.png' },
    { name: 'Colgate-Palmolive', logo: '/lovable-uploads/414a8841-5ff7-4841-a874-743f6752295e.png' },
    { name: 'Collins Aerospace', logo: '/lovable-uploads/02055021-d4ef-4d85-8eff-95ead97d9b26.png' },
    { name: 'Nutricia', logo: '/lovable-uploads/7ea5d964-6154-49e1-af19-b0f9b4b5e9e4.png' },
    { name: 'Cargill', logo: '/lovable-uploads/7d1e6908-562e-40c8-b4c0-ca5c23507339.png' }
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
        
        {/* Smooth continuous marquee */}
        <div className="relative overflow-hidden group">
          <div 
            className="flex whitespace-nowrap group-hover:[animation-play-state:paused]"
            style={{
              animation: 'marquee 60s linear infinite',
              width: 'fit-content'
            }}
          >
            {/* First set of partners */}
            {partners.map((partner, index) => (
              <div
                key={`first-${partner.name}`}
                className="mx-6 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 min-w-[160px] h-[100px] flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              </div>
            ))}
            {/* Second set for seamless loop */}
            {partners.map((partner, index) => (
              <div
                key={`second-${partner.name}`}
                className="mx-6 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 min-w-[160px] h-[100px] flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
                  />
                </div>
              </div>
            ))}
            {/* Third set for extra smoothness */}
            {partners.map((partner, index) => (
              <div
                key={`third-${partner.name}`}
                className="mx-6 flex-shrink-0"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 min-w-[160px] h-[100px] flex items-center justify-center">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain transition-all duration-300"
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
      
      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
      `}</style>
    </section>
  );
};

export default PartnersSection;
