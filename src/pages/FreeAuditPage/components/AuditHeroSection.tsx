
import React from 'react';
import { ClipboardCheck, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AuditStatsCounter from './AuditStatsCounter';

interface AuditHeroSectionProps {
  onCTAClick: () => void;
}

const AuditHeroSection: React.FC<AuditHeroSectionProps> = ({ onCTAClick }) => {
  const { elementRef, isInView } = useScrollAnimation();

  const stats = [
    { icon: <ClipboardCheck className="h-8 w-8" />, value: 300, label: 'Audytów przeprowadzonych', suffix: '+' },
    { icon: <Users className="h-8 w-8" />, value: 95, label: 'Zadowolenia klientów', suffix: '%' },
    { icon: <TrendingUp className="h-8 w-8" />, value: 20, label: 'Średnie oszczędności', suffix: '%' },
    { icon: <Award className="h-8 w-8" />, value: 8, label: 'Lat doświadczenia', suffix: '+' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 py-20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-bounce-gentle"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Central audit icon */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 hidden lg:block">
        <ClipboardCheck 
          size={300}
          className="text-orange-200 opacity-20 animate-pulse-slow"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={elementRef}>
        <div className="text-center mb-16">
          <div 
            className={`inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold mb-8 transition-all duration-800 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            ✨ Bezpłatna analiza bez zobowiązań
          </div>

          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            Bezpłatny Audyt<br/>
            <span className="text-orange-200 bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-transparent">
              Szkoleniowy
            </span>
          </h1>

          <p 
            className={`text-xl md:text-2xl text-orange-100 max-w-4xl mx-auto mb-12 leading-relaxed transition-all duration-800 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '600ms' }}
          >
            Odkryj potencjał oszczędności w Twojej firmie. Nasza bezpłatna analiza pomoże zoptymalizować 
            procesy szkoleniowe i zredukować koszty nawet o 30%.
          </p>

          <div 
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-800 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{ transitionDelay: '800ms' }}
          >
            <Button 
              size="lg" 
              onClick={onCTAClick}
              className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-2xl text-lg px-8 py-6 h-auto"
            >
              <ClipboardCheck className="mr-3 h-6 w-6" />
              Zamów bezpłatny audyt
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-orange-600 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 h-auto bg-white bg-opacity-10 backdrop-blur-sm"
            >
              <TrendingUp className="mr-3 h-6 w-6" />
              Zobacz przykłady oszczędności
            </Button>
          </div>
        </div>

        {/* Animated stats */}
        <div 
          className={`grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '1000ms' }}
        >
          {stats.map((stat, index) => (
            <AuditStatsCounter 
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AuditHeroSection;
