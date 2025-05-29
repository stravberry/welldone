import React from 'react';
import { ClipboardCheck, TrendingUp, Users, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import AuditStatsCounter from './AuditStatsCounter';
interface AuditHeroSectionProps {
  onCTAClick: () => void;
}
const AuditHeroSection: React.FC<AuditHeroSectionProps> = ({
  onCTAClick
}) => {
  const {
    elementRef,
    isInView
  } = useScrollAnimation<HTMLDivElement>();
  const stats = [{
    icon: <ClipboardCheck className="h-8 w-8" />,
    value: 300,
    label: 'Audytów przeprowadzonych',
    suffix: '+'
  }, {
    icon: <Users className="h-8 w-8" />,
    value: 95,
    label: 'Zadowolenia klientów',
    suffix: '%'
  }, {
    icon: <TrendingUp className="h-8 w-8" />,
    value: 20,
    label: 'Średnie oszczędności',
    suffix: '%'
  }, {
    icon: <Award className="h-8 w-8" />,
    value: 8,
    label: 'Lat doświadczenia',
    suffix: '+'
  }];
  return <section className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 py-16 lg:py-24 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={elementRef}>
        {/* Notification badge */}
        <div className="text-center mb-8">
          <div className={`inline-block bg-white bg-opacity-25 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold transition-all duration-800 shadow-lg ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{
          transitionDelay: '200ms'
        }}>
            ✨ Bezpłatna analiza bez zobowiązań
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
          {/* Left column - Text content */}
          <div className="text-left">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: '400ms',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
              Bezpłatny Audyt<br />
              <span className="bg-gradient-to-r from-orange-200 to-yellow-200 bg-clip-text text-red-100">
                Szkoleniowy
              </span>
            </h1>

            <p className={`text-lg md:text-xl text-orange-50 mb-8 leading-relaxed transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{
            transitionDelay: '600ms',
            textShadow: '0 1px 3px rgba(0,0,0,0.4)'
          }}>
              Odkryj potencjał oszczędności w Twojej firmie. Nasza bezpłatna analiza pomoże zoptymalizować 
              procesy szkoleniowe i zredukować koszty nawet o 30%.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{
            transitionDelay: '800ms'
          }}>
              <Button size="lg" onClick={onCTAClick} className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-2xl text-lg px-8 py-6 h-auto font-semibold">
                <ClipboardCheck className="mr-3 h-6 w-6" />
                Zamów bezpłatny audyt
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-orange-600 hover:scale-105 transition-all duration-300 text-lg px-8 py-6 h-auto bg-white bg-opacity-10 backdrop-blur-sm font-semibold">
                <TrendingUp className="mr-3 h-6 w-6" />
                Zobacz przykłady oszczędności
              </Button>
            </div>
          </div>

          {/* Right column - Audit icon */}
          <div className="hidden lg:flex justify-center items-center">
            <div className={`relative transition-all duration-1000 ${isInView ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`} style={{
            transitionDelay: '1000ms'
          }}>
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full blur-3xl"></div>
              <ClipboardCheck size={280} className="text-white opacity-90 relative z-10 drop-shadow-2xl" />
              <div className="absolute top-4 right-4 w-12 h-12 bg-green-400 rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white font-bold text-xl">✓</span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated stats */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
        transitionDelay: '1200ms'
      }}>
          {stats.map((stat, index) => <AuditStatsCounter key={index} icon={stat.icon} value={stat.value} label={stat.label} suffix={stat.suffix} index={index} />)}
        </div>
      </div>
    </section>;
};
export default AuditHeroSection;