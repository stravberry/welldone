import React from 'react';
import { Button } from '@/components/ui/button';
import { Calculator, TrendingUp, Clock, CheckCircle, Zap, Users } from 'lucide-react';
import { useScrollAnimation, useCounterAnimation } from '@/hooks/useScrollAnimation';
interface EnhancedQuoteHeroProps {
  onScrollToForm: () => void;
}
const EnhancedQuoteHero: React.FC<EnhancedQuoteHeroProps> = ({
  onScrollToForm
}) => {
  const {
    elementRef,
    isInView
  } = useScrollAnimation<HTMLDivElement>();
  const {
    elementRef: statsRef,
    count: clientsCount
  } = useCounterAnimation<HTMLDivElement>(500, 1000);
  const {
    elementRef: stats2Ref,
    count: satisfactionCount
  } = useCounterAnimation<HTMLDivElement>(95, 1200);
  const {
    elementRef: stats3Ref,
    count: responseCount
  } = useCounterAnimation<HTMLDivElement>(15, 800);
  const stats = [{
    icon: <Users className="h-6 w-6" />,
    value: clientsCount,
    label: 'Firm otrzymało wycenę',
    suffix: '+',
    ref: statsRef
  }, {
    icon: <CheckCircle className="h-6 w-6" />,
    value: satisfactionCount,
    label: 'Zadowolenia klientów',
    suffix: '%',
    ref: stats2Ref
  }, {
    icon: <Clock className="h-6 w-6" />,
    value: responseCount,
    label: 'Minut - średni czas odpowiedzi',
    suffix: '',
    ref: stats3Ref
  }];
  return <section className="relative bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 py-20 lg:py-32 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-20 h-20 bg-white rounded-full animate-pulse" style={{
        animationDelay: '1s'
      }}></div>
        <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-white rounded-full animate-bounce" style={{
        animationDelay: '2s'
      }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={elementRef}>
        {/* Trust badge */}
        <div className="text-center mb-12">
          <div className={`inline-block bg-white bg-opacity-20 backdrop-blur-sm px-6 py-3 rounded-full text-white font-semibold transition-all duration-800 shadow-lg ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{
          transitionDelay: '200ms'
        }}>
            ⚡ 80% klientów wybiera pierwszą otrzymaną ofertę
          </div>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Left column - Text content */}
          <div className="text-left">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
            transitionDelay: '400ms',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
              Błyskawiczna<br />
              <span className="bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-red-100">
                Wycena Online
              </span>
            </h1>

            <p className={`text-xl md:text-2xl text-orange-50 mb-10 leading-relaxed transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{
            transitionDelay: '600ms',
            textShadow: '0 1px 3px rgba(0,0,0,0.4)'
          }}>
              Otrzymaj profesjonalną wycenę szkoleń w <span className="font-bold text-yellow-200">15 minut</span>. 
              Wypełnij formularz, a my prześlemy Ci szczegółową ofertę dostosowaną do potrzeb Twojej firmy.
            </p>

            {/* Key benefits */}
            <div className={`space-y-4 mb-10 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{
            transitionDelay: '700ms'
          }}>
              <div className="flex items-center space-x-3 text-white">
                <CheckCircle className="h-6 w-6 text-green-300" />
                <span className="text-lg">Bezpłatna wycena bez zobowiązań</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <Zap className="h-6 w-6 text-yellow-300" />
                <span className="text-lg">Odpowiedź w ciągu 15 minut</span>
              </div>
              <div className="flex items-center space-x-3 text-white">
                <TrendingUp className="h-6 w-6 text-blue-300" />
                <span className="text-lg">Indywidualnie dostosowana oferta</span>
              </div>
            </div>

            <div className={`flex flex-col sm:flex-row gap-6 transition-all duration-800 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{
            transitionDelay: '800ms'
          }}>
              <Button size="lg" onClick={onScrollToForm} className="bg-white text-orange-600 hover:bg-orange-50 hover:scale-105 transition-all duration-300 shadow-2xl text-lg px-10 py-8 h-auto font-bold group">
                <Calculator className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform duration-300" />
                Otrzymaj wycenę teraz
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Button>
            </div>
          </div>

          {/* Right column - Visual element */}
          <div className="hidden lg:flex justify-center items-center">
            <div className={`relative transition-all duration-1000 ${isInView ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-12'}`} style={{
            transitionDelay: '1000ms'
          }}>
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full blur-3xl"></div>
              <Calculator size={320} className="text-white opacity-90 relative z-10 drop-shadow-2xl animate-pulse" />
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-green-400 rounded-full flex items-center justify-center animate-bounce shadow-2xl">
                <span className="text-white font-bold text-2xl">✓</span>
              </div>
              <div className="absolute -bottom-6 -left-6 w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <Zap className="text-white h-8 w-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Animated statistics */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{
        transitionDelay: '1200ms'
      }}>
          {stats.map((stat, index) => <div key={index} ref={stat.ref} className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 text-center border border-white border-opacity-20 hover:bg-opacity-25 transition-all duration-300 group">
              <div className="flex justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-orange-100 text-sm md:text-base font-medium">
                {stat.label}
              </div>
            </div>)}
        </div>
      </div>
    </section>;
};
export default EnhancedQuoteHero;