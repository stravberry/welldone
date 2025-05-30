
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface WhyChooseUsSectionProps {
  benefits: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
  statsRef: React.RefObject<HTMLDivElement>;
  visibleItems: number[];
  StatCard: React.ComponentType<{ value: number; label: string; delay: number }>;
  showAllFallback: boolean;
}

const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({ 
  benefits, 
  statsRef, 
  visibleItems, 
  StatCard, 
  showAllFallback 
}) => {
  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-blue-100/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Dlaczego my?
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dlaczego warto z nami współpracować?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nasze doświadczenie i profesjonalne podejście gwarantują najwyższą jakość szkoleń.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => {
            const isVisible = visibleItems.includes(index) || showAllFallback;
            return (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s ease-out',
                  transitionDelay: isVisible ? `${index * 100}ms` : '0ms'
                }}
              >
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-16">
          <StatCard value={150} label="Przeprowadzonych szkoleń" delay={0} />
          <StatCard value={500} label="Zadowolonych klientów" delay={300} />
          <StatCard value={96} label="Zdawalność egzaminów" delay={600} />
          <StatCard value={10} label="Lat doświadczenia" delay={900} />
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button asChild size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-lg px-8 py-4">
            <Link to="/kontakt">
              Rozpocznij współpracę z nami
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
