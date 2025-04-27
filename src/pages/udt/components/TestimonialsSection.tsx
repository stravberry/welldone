
import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection: React.FC = () => {
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
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-medium">Co mówią nasi kursanci</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Opinie uczestników szkoleń</h2>
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map(star => (
              <Star key={star} className="h-6 w-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <p className="text-xl font-bold mb-1">4.9 / 5</p>
          <p className="text-gray-500">Na podstawie ponad 450 opinii</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex mb-4">
                {Array(testimonial.rating).fill(null).map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
              <div>
                <p className="font-bold">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
