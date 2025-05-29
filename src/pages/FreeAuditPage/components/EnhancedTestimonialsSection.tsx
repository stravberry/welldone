
import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const EnhancedTestimonialsSection: React.FC = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const { elementRef, isInView } = useScrollAnimation();

  const testimonials = [
    {
      quote: "Bezpłatny audyt pomógł nam zredukować koszty szkoleniowe o 20%. Zespół dokładnie przeanalizował nasze potrzeby i zaproponował skuteczne rozwiązania.",
      author: "Jan Kowalski",
      role: "HR Manager",
      company: "Firma X",
      industry: "Produkcja",
      savings: "20%"
    },
    {
      quote: "Dzięki audytowi dowiedzieliśmy się, które szkolenia były nadmiarowe i jak zoptymalizować harmonogramy szkoleń dla naszych pracowników.",
      author: "Anna Nowak",
      role: "Specjalista BHP",
      company: "Firma Y",
      industry: "Logistyka",
      savings: "15%"
    },
    {
      quote: "Profesjonalne podejście i konkretne rekomendacje. Audyt wykazał, że mogliśmy uzyskać te same certyfikaty za połowę ceny.",
      author: "Piotr Wiśniewski",
      role: "Dyrektor Operacyjny",
      company: "Firma Z",
      industry: "Magazynowanie",
      savings: "30%"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" ref={elementRef}>
        <div className="text-center mb-16">
          <h2 className={`text-3xl md:text-4xl font-bold text-white mb-6 transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}>
            Co mówią nasi klienci?
          </h2>
          <p className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-800 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`} style={{ transitionDelay: '200ms' }}>
            Sprawdź, jak nasz audyt pomógł innym firmom w optymalizacji procesów szkoleniowych.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-12 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-12 z-10 w-12 h-12 bg-white bg-opacity-20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-opacity-30 transition-all duration-300"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Testimonial card */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 md:p-12 shadow-2xl border border-white border-opacity-20">
            <div className="text-center mb-8">
              <Quote className="h-12 w-12 text-orange-400 mx-auto mb-6" />
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
            </div>

            <div 
              key={currentTestimonial}
              className="animate-fade-in"
            >
              <blockquote className="text-xl md:text-2xl text-white text-center mb-8 leading-relaxed italic">
                "{testimonials[currentTestimonial].quote}"
              </blockquote>

              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-orange-400 to-amber-400 flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto">
                    {testimonials[currentTestimonial].author.charAt(0)}
                  </div>
                  <h4 className="text-lg font-semibold text-white">
                    {testimonials[currentTestimonial].author}
                  </h4>
                  <p className="text-gray-300">
                    {testimonials[currentTestimonial].role}
                  </p>
                  <p className="text-orange-300 font-medium">
                    {testimonials[currentTestimonial].company} • {testimonials[currentTestimonial].industry}
                  </p>
                  <div className="mt-4 inline-block bg-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    Oszczędności: {testimonials[currentTestimonial].savings}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? 'bg-orange-400 scale-125'
                    : 'bg-white bg-opacity-30 hover:bg-opacity-50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnhancedTestimonialsSection;
