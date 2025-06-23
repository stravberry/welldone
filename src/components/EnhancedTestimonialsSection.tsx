
import React from 'react';
import { Quote, Star } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const EnhancedTestimonialsSection = () => {
  const { elementRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(3, 200);

  const testimonials = [
    {
      quote: "W trakcie współpracy zrealizowano kursy dla 31 grup szkoleniowych. Pracownicy i trenerzy firmy Well-Done.pl wykazywali się profesjonalizmem i rzetelnością. Na szczególną uwagę zasługuje wysoki poziom zaangażowania oraz elastyczne podejście do wyzwań jakie pojawiły się w trakcie współpracy.",
      company: "3M",
      logo: "/lovable-uploads/fb097357-e01e-4e8d-a791-8d1bc80cb34c.png",
      rating: 5
    },
    {
      quote: "Firma Well-Done.pl sumiennie wywiązała się ze wszystkich obowiązków, dbając o wysoką jakość usług i wzajemnych relacji. Wysoko oceniamy profesjonalizm i zaangażowanie jej pracowników. Polecamy usługi Well-Done.pl wszystkim, którzy podobnie jak my cenią sobie solidne partnerstwo w biznesie.",
      company: "WAGO",
      logo: "/lovable-uploads/3963c686-fb1a-4f20-bc6b-201507b49c8f.png",
      rating: 5
    },
    {
      quote: "Wysoko oceniamy materiały przygotowane przez firmę Well Done na nasz kurs. Zostały one przygotowane w sposób profesjonalny pod względem dydaktycznym. Reasumując, jesteśmy zadowoleni z metodyki przeprowadzonego kursu, z wiedzy i przygotowania do zajęć Wykładowcy oraz przygotowanych materiałów.",
      company: "LG",
      logo: "LG",
      rating: 5
    }
  ];

  const TestimonialCard = ({ testimonial, index }: { testimonial: any; index: number }) => {
    const isVisible = visibleItems.includes(index) || showAllFallback;
    
    return (
      <div 
        className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-orange-200 relative overflow-hidden group"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s ease-out',
          transitionDelay: isVisible ? `${index * 200}ms` : '0ms'
        }}
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-orange-50 rounded-full -translate-y-16 translate-x-16 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
        
        {/* Quote icon */}
        <div className="relative z-10 mb-6">
          <Quote className="w-10 h-10 text-orange-500 opacity-60" />
        </div>
        
        {/* Rating stars */}
        <div className="flex mb-4 relative z-10">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
          ))}
        </div>
        
        {/* Quote text */}
        <blockquote className="text-gray-700 mb-6 relative z-10 leading-relaxed">
          "{testimonial.quote}"
        </blockquote>
        
        {/* Company info */}
        <div className="flex items-center justify-between relative z-10">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 border border-gray-200">
              {testimonial.logo.startsWith('/') ? (
                <img 
                  src={testimonial.logo} 
                  alt={`${testimonial.company} logo`}
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <span className="text-gray-800 font-bold text-sm">{testimonial.logo}</span>
              )}
            </div>
            <div>
              <div className="font-semibold text-gray-900">{testimonial.company}</div>
              <div className="text-sm text-gray-500">Zweryfikowana opinia</div>
            </div>
          </div>
          <div className="text-sm text-orange-600 font-medium">
            ✓ Potwierdzone
          </div>
        </div>
        
        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-40 h-40 bg-orange-200 rounded-full opacity-10 animate-float" />
        <div className="absolute bottom-20 right-20 w-32 h-32 bg-blue-200 rounded-full opacity-10 animate-float" style={{ animationDelay: '3s' }} />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Referencje
            </span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Co mówią nasi <span className="text-orange-600">klienci</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Poznaj opinie firm, które zaufały naszemu doświadczeniu i profesjonalizmowi
          </p>
        </div>
        
        <div ref={elementRef} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={testimonial.company} 
              testimonial={testimonial} 
              index={index} 
            />
          ))}
        </div>
        
        {/* Trust indicators */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">100+</div>
              <div className="text-gray-600">Zadowolonych firm</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
              <div className="text-gray-600">Pozytywnych referencji</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">5+</div>
              <div className="text-gray-600">lat doświadczenia</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonialsSection;
