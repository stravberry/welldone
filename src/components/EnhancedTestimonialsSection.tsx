
import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const EnhancedTestimonialsSection = () => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });
  
  const { elementRef: cardsRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(3, 200);

  const testimonials = [
    {
      company: '3M',
      logo: '3M',
      quote: "W trakcie współpracy zrealizowano kursy dla 31 grup szkoleniowych. Pracownicy i trenerzy firmy Well-Done.pl wykazywali się profesjonalizmem i rzetelnością. Na szczególną uwagę zasługuje wysoki poziom zaangażowania oraz elastyczne podejście do wyzwań jakie pojawiły się w trakcie współpracy.",
      industry: "Technologie przemysłowe"
    },
    {
      company: 'WAGO',
      logo: 'WAGO',
      quote: "Firma Well-Done.pl sumiennie wywiązała się ze wszystkich obowiązków, dbając o wysoką jakość usług i wzajemnych relacji. Wysoko oceniamy profesjonalizm i zaangażowanie jej pracowników. Polecamy usługi Well-Done.pl wszystkim, którzy podobnie jak my cenią sobie solidne partnerstwo w biznesie.",
      industry: "Automatyka przemysłowa"
    },
    {
      company: 'LG',
      logo: 'LG',
      quote: "Wysoko oceniamy materiały przygotowane przez firmę Well Done na nasz kurs. Zostały one przygotowane w sposób profesjonalny pod względem dydaktycznym. Reasumując, jesteśmy zadowoleni z metodyki przeprowadzonego kursu, z wiedzy i przygotowania do zajęć Wykładowcy oraz przygotowanych materiałów.",
      industry: "Elektronika użytkowa"
    }
  ];

  const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
    const isVisible = visibleItems.includes(index) || showAllFallback;
    
    return (
      <div 
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 relative overflow-hidden group"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
          transition: 'all 0.8s ease-out',
          transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
        }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-50 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700" />
        
        {/* Quote icon */}
        <div className="relative mb-6">
          <Quote className="w-8 h-8 text-orange-500 opacity-50" />
        </div>
        
        {/* Rating */}
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
          ))}
        </div>
        
        {/* Quote text */}
        <p className="text-gray-700 mb-6 italic leading-relaxed relative z-10">
          "{testimonial.quote}"
        </p>
        
        {/* Company info */}
        <div className="flex items-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {testimonial.logo}
          </div>
          <div className="ml-4">
            <p className="font-bold text-gray-900 text-lg">{testimonial.company}</p>
            <p className="text-orange-600 font-medium">{testimonial.industry}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleInView ? 1 : 0,
            transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s ease-out'
          }}
        >
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Referencje
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Co mówią o nas nasi klienci
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zaufały nam wiodące firmy z różnych branż. Poznaj opinie naszych partnerów biznesowych.
          </p>
        </div>
        
        <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.company} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonialsSection;
