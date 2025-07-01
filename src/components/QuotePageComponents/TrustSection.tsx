
import React from 'react';
import { Star } from 'lucide-react';

const TrustSection: React.FC = () => {
  const testimonials = [
    {
      text: "Błyskawiczna wycena pozwoliła nam szybko podjąć decyzję o szkoleniach. Oszczędziliśmy 30% kosztów!",
      author: "Anna Kowalska",
      position: "Dyrektor HR",
      company: "TechCorp Sp. z o.o."
    },
    {
      text: "Profesjonalna obsługa i konkurencyjne ceny. Polecamy wszystkim firmom szukającym szkoleń.",
      author: "Piotr Nowak",
      position: "Właściciel",
      company: "ProdukcjaPlus"
    },
    {
      text: "System wyceny jest intuicyjny, a odpowiedź przyszła w 10 minut. Fantastyczna usługa!",
      author: "Maria Zielińska",
      position: "Menedżer ds. szkoleń",
      company: "Logistics Solutions"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials carousel */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-8 lg:p-12 border border-amber-200">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            Co mówią nasi klienci?
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 mb-6 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
                
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-900">{testimonial.author}</p>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                  <p className="text-sm text-amber-600 font-medium">{testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
