
import React from 'react';
import { Check, X, Star, Trophy, Shield, Zap } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ComparisonSection: React.FC = () => {
  const { elementRef, isInView } = useScrollAnimation();

  const comparisons = [
    {
      feature: "Czas realizacji szkoleń",
      us: "3-5 dni",
      them: "2-3 tygodnie",
      icon: Zap
    },
    {
      feature: "Zdawalność egzaminów",
      us: "96%",
      them: "75%",
      icon: Trophy
    },
    {
      feature: "Kompleksowa obsługa",
      us: "Tak",
      them: "Nie",
      icon: Shield
    },
    {
      feature: "Bezpłatny audyt",
      us: "Tak",
      them: "Płatny",
      icon: Star
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-transparent to-blue-500/5" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Porównanie
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            Co nas wyróżnia od konkurencji
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Zobacz konkretne różnice, które sprawiają, że jesteśmy najlepszym wyborem dla Twojej firmy
          </p>
        </div>

        <div 
          ref={elementRef}
          className={`transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
              {/* Header */}
              <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900">Porównanie funkcji</h3>
              </div>
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6 md:p-8 text-center">
                <h3 className="text-xl font-bold text-white">My</h3>
                <div className="mt-2 inline-flex items-center space-x-1">
                  <Star className="h-5 w-5 text-orange-200" />
                  <Star className="h-5 w-5 text-orange-200" />
                  <Star className="h-5 w-5 text-orange-200" />
                  <Star className="h-5 w-5 text-orange-200" />
                  <Star className="h-5 w-5 text-orange-200" />
                </div>
              </div>
              <div className="bg-gradient-to-r from-gray-400 to-gray-500 p-6 md:p-8 text-center">
                <h3 className="text-xl font-bold text-white">Konkurencja</h3>
                <div className="mt-2 inline-flex items-center space-x-1">
                  <Star className="h-5 w-5 text-gray-300" />
                  <Star className="h-5 w-5 text-gray-300" />
                  <Star className="h-5 w-5 text-gray-300" />
                  <X className="h-5 w-5 text-gray-300" />
                  <X className="h-5 w-5 text-gray-300" />
                </div>
              </div>

              {/* Comparison rows */}
              {comparisons.map((item, index) => (
                <React.Fragment key={index}>
                  <div className="p-6 border-t border-gray-100 flex items-center">
                    <item.icon className="h-6 w-6 text-gray-400 mr-3" />
                    <span className="font-medium text-gray-900">{item.feature}</span>
                  </div>
                  <div className="p-6 border-t border-gray-100 text-center bg-green-50">
                    <div className="inline-flex items-center space-x-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span className="font-bold text-green-800">{item.us}</span>
                    </div>
                  </div>
                  <div className="p-6 border-t border-gray-100 text-center bg-red-50">
                    <div className="inline-flex items-center space-x-2">
                      <X className="h-5 w-5 text-red-600" />
                      <span className="font-medium text-red-800">{item.them}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
