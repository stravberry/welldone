
import React from 'react';
import { Shield, Award, Users, Clock, Star, CheckCircle } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const TrustSection: React.FC = () => {
  const { elementRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(6, 150);

  const trustElements = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Bezpieczeństwo danych",
      description: "Wszystkie dane są szyfrowane i chronione zgodnie z RODO",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Certyfikowane szkolenia",
      description: "Wszystkie nasze kursy są akredytowane przez odpowiednie instytucje",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "500+ zadowolonych firm",
      description: "Zaufały nam wiodące przedsiębiorstwa z całej Polski",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "8 lat doświadczenia",
      description: "Konsekwentnie dostarczamy najwyższej jakości szkolenia",
      color: "from-purple-500 to-violet-500"
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "Ocena 4.9/5",
      description: "Średnia ocena wystawiona przez naszych klientów",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: <CheckCircle className="h-8 w-8" />,
      title: "Gwarancja jakości",
      description: "Jeśli nie będziesz zadowolony, zwrócimy Ci pieniądze",
      color: "from-red-500 to-pink-500"
    }
  ];

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
        {/* Trust indicators */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Dlaczego firmy nam ufają?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nasze doświadczenie, certyfikaty i zadowoleni klienci to gwarancja najwyższej jakości usług.
          </p>
        </div>

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
        >
          {trustElements.map((element, index) => (
            <div
              key={index}
              className={`group relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 border border-gray-100 ${
                visibleItems.includes(index) || showAllFallback
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              } hover:scale-105 hover:-translate-y-2`}
              style={{
                transitionDelay: showAllFallback ? '0ms' : `${index * 150}ms`
              }}
            >
              {/* Icon */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${element.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/20`}>
                <div className="text-white drop-shadow-lg">
                  {element.icon}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                {element.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {element.description}
              </p>
              
              {/* Hover accent line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${element.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
            </div>
          ))}
        </div>

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

        {/* Security badges */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-16 opacity-60">
          <div className="flex items-center space-x-2 text-gray-600">
            <Shield className="h-6 w-6" />
            <span className="font-medium">RODO</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Award className="h-6 w-6" />
            <span className="font-medium">ISO 9001</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <CheckCircle className="h-6 w-6" />
            <span className="font-medium">Certyfikowane</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
