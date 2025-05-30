
import React from 'react';
import { Shield, Clock, Award, Users, CheckCircle, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const GuaranteesSection = () => {
  const { elementRef, isInView } = useScrollAnimation();

  const guarantees = [
    {
      icon: Shield,
      title: "Gwarancja jakości",
      description: "Jeśli nie będziesz zadowolony ze szkolenia - zwracamy pieniądze",
      value: "100%",
      color: "bg-green-500"
    },
    {
      icon: Clock,
      title: "Terminowość",
      description: "Szkolenia zawsze na czas lub rekompensata finansowa",
      value: "≤24h",
      color: "bg-blue-500"
    },
    {
      icon: Award,
      title: "Certyfikaty",
      description: "Wszystkie dokumenty wydajemy w ciągu 48h po szkoleniu",
      value: "48h",
      color: "bg-orange-500"
    },
    {
      icon: Users,
      title: "Wsparcie",
      description: "Bezpłatne konsultacje przez 6 miesięcy po szkoleniu",
      value: "6 mies.",
      color: "bg-purple-500"
    }
  ];

  const stats = [
    {
      icon: TrendingUp,
      value: "98%",
      label: "Firm przedłuża współpracę",
      description: "Nasi klienci wracają do nas po kolejne szkolenia"
    },
    {
      icon: CheckCircle,
      value: "99.8%",
      label: "Skuteczność zdawalności",
      description: "Prawie wszyscy kursanci zdają egzaminy za pierwszym razem"
    },
    {
      icon: Clock,
      value: "2.4h",
      label: "Średni czas odpowiedzi",
      description: "Błyskawicznie odpowiadamy na Twoje zapytania"
    },
    {
      icon: Shield,
      value: "0",
      label: "Reklamacji w 2024",
      description: "Rok bez jednej reklamacji - to nasz standard"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-orange-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Nasze gwarancje
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            Twoje bezpieczeństwo to nasz <span className="text-green-600">priorytet</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferujemy konkretne gwarancje, bo jesteśmy pewni jakości naszych usług
          </p>
        </div>

        {/* Guarantees cards */}
        <div 
          ref={elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {guarantees.map((guarantee, index) => (
            <div 
              key={guarantee.title}
              className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-green-200 transform hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 ${guarantee.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <guarantee.icon className="h-8 w-8 text-white" />
              </div>
              
              <div className="text-3xl font-bold text-gray-900 mb-2">{guarantee.value}</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">{guarantee.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{guarantee.description}</p>
            </div>
          ))}
        </div>

        {/* Trust statistics */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-blue-500/10" />
          
          <div className="relative z-10">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold mb-4">
                Liczby, które mówią same za siebie
              </h3>
              <p className="text-gray-300 text-lg">
                Konkretne rezultaty naszej pracy w liczbach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div 
                  key={stat.label}
                  className="text-center group"
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-orange-400 mb-2">{stat.value}</div>
                  <div className="text-lg font-semibold mb-2">{stat.label}</div>
                  <div className="text-gray-400 text-sm">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteesSection;
