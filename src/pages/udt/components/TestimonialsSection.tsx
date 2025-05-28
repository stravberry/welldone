
import React from 'react';
import { Star } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation, useCounterAnimation } from '@/hooks/useScrollAnimation';

const TestimonialsSection: React.FC = () => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: ratingRef, count: ratingCount } = useCounterAnimation<HTMLDivElement>(49, 2000);
  const { elementRef: testimonialsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(3, 200);

  const testimonials = [
    {
      name: "Jan Kowalski",
      position: "Operator wózka widłowego, Firma Logistyczna",
      content: "Szkolenie było niezwykle profesjonalne. Zdobyłem uprawnienia UDT za pierwszym razem, dzięki świetnym instruktorom i praktycznemu podejściu.",
      rating: 5
    },
    {
      name: "Anna Nowak",
      position: "Kierownik magazynu, Przedsiębiorstwo produkcyjne",
      content: "Wysłałam na szkolenie 12 pracowników i wszyscy zdali egzamin UDT. Profesjonalizm i indywidualne podejście do każdego uczestnika.",
      rating: 5
    },
    {
      name: "Piotr Wiśniewski",
      position: "Brygadzista, Firma budowlana",
      content: "Szkolenie na operatora podestu ruchomego przebiegło sprawnie i profesjonalnie. Materiały szkoleniowe były przejrzyste, a instruktor cierpliwie odpowiadał na wszystkie pytania.",
      rating: 4
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-orange-600 font-medium text-sm sm:text-base animate-pulse-slow">Co mówią nasi kursanci</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Opinie uczestników szkoleń</h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <Star 
                key={star} 
                className={`h-6 w-6 fill-yellow-400 text-yellow-400 transition-all duration-500 ${
                  titleInView ? 'animate-star-fill' : 'scale-0 opacity-0'
                }`}
                style={{ animationDelay: `${star * 0.1}s` }}
              />
            ))}
          </div>
          <div ref={ratingRef}>
            <p className="text-xl font-bold mb-1">{(ratingCount / 10).toFixed(1)} / 5</p>
          </div>
          <p className="text-gray-500">Na podstawie ponad 450 opinii</p>
        </div>
        
        <div ref={testimonialsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className={`bg-gray-50 p-6 rounded-lg shadow-md transition-all duration-700 hover:shadow-xl hover:scale-105 hover:bg-white group cursor-pointer border border-transparent hover:border-orange-200 ${
                visibleItems.includes(index) 
                  ? 'animate-fade-in-up opacity-100' 
                  : 'opacity-0 translate-y-5'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex mb-4">
                {Array(testimonial.rating).fill(null).map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 fill-yellow-400 text-yellow-400 transition-all duration-500 ${
                      visibleItems.includes(index) ? 'animate-star-fill' : 'scale-0'
                    }`}
                    style={{ animationDelay: `${(index * 0.2) + (i * 0.1)}s` }}
                  />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic transition-colors duration-300 group-hover:text-gray-800">"{testimonial.content}"</p>
              <div>
                <p className="font-bold transition-colors duration-300 group-hover:text-orange-600">{testimonial.name}</p>
                <p className="text-gray-500 text-sm transition-colors duration-300 group-hover:text-gray-600">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
