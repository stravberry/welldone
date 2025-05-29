
import React from 'react';
import { ClipboardCheck, Search, TrendingUp, FileSearch, Shield, Clock } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const AnimatedBenefitsSection: React.FC = () => {
  const { elementRef, visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(6, 150);

  const benefits = [
    {
      title: "Ocena aktualnych szkoleń",
      description: "Przeanalizujemy, czy obecne szkolenia spełniają wszystkie wymagania prawne oraz czy odpowiadają na realne potrzeby Twojej firmy.",
      icon: <ClipboardCheck size={56} className="text-white drop-shadow-lg" />,
      gradient: "from-orange-500 to-red-500"
    },
    {
      title: "Weryfikacja uprawnień",
      description: "Sprawdzimy, czy wszyscy pracownicy posiadają wymagane uprawnienia do obsługi sprzętu i urządzeń w Twojej firmie.",
      icon: <Search size={56} className="text-white drop-shadow-lg" />,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      title: "Optymalizacja kosztów",
      description: "Pomożemy zidentyfikować, czy nie przepłacasz za szkolenia i certyfikacje oraz wskażemy obszary oszczędności.",
      icon: <TrendingUp size={56} className="text-white drop-shadow-lg" />,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      title: "Dostosowanie szkoleń",
      description: "Oferujemy indywidualnie dobrane programy szkoleniowe, które idealnie pasują do specyfiki Twojej działalności.",
      icon: <FileSearch size={56} className="text-white drop-shadow-lg" />,
      gradient: "from-purple-500 to-violet-500"
    },
    {
      title: "Analiza bezpieczeństwa",
      description: "Sprawdzimy zgodność z przepisami BHP i zidentyfikujemy potencjalne ryzyka w procesach szkoleniowych.",
      icon: <Shield size={56} className="text-white drop-shadow-lg" />,
      gradient: "from-amber-500 to-yellow-500"
    },
    {
      title: "Planowanie harmonogramu",
      description: "Pomożemy w utworzeniu optymalnego harmonogramu szkoleń, minimalizując przestoje w produkcji.",
      icon: <Clock size={56} className="text-white drop-shadow-lg" />,
      gradient: "from-indigo-500 to-blue-600"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Dlaczego warto skorzystać z audytu?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nasz bezpłatny audyt pozwoli Ci ocenić skuteczność obecnych procesów szkoleniowych 
            i zidentyfikować obszary do optymalizacji.
          </p>
        </div>

        <div 
          ref={elementRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform transition-all duration-500 border border-gray-100 ${
                visibleItems.includes(index) || showAllFallback
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-8 scale-95'
              } hover:scale-105 hover:-translate-y-2`}
              style={{
                transitionDelay: showAllFallback ? '0ms' : `${index * 150}ms`
              }}
            >
              {/* Gradient background overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${benefit.gradient} opacity-0 group-hover:opacity-8 rounded-2xl transition-opacity duration-300`}></div>
              
              {/* Icon with improved visibility */}
              <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${benefit.gradient} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl border border-white/20`}>
                {benefit.icon}
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-orange-700 transition-colors duration-300">
                {benefit.title}
              </h3>
              
              <p className="text-gray-700 leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                {benefit.description}
              </p>
              
              {/* Hover accent line */}
              <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${benefit.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`}></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AnimatedBenefitsSection;
