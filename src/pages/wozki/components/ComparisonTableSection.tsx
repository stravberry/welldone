
import React from 'react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Check, X } from 'lucide-react';

interface ComparisonTableSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const ComparisonTableSection: React.FC<ComparisonTableSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: sectionRef, isInView: sectionInView } = useScrollAnimation<HTMLDivElement>();

  const features = [
    {
      feature: "Szkolenie teoretyczne",
      basic: true,
      standard: true,
      premium: true
    },
    {
      feature: "Szkolenie praktyczne podstawowe",
      basic: true,
      standard: true,
      premium: true
    },
    {
      feature: "Szkolenie na różnych modelach",
      basic: false,
      standard: true,
      premium: true
    },
    {
      feature: "Indywidualne podejście",
      basic: false,
      standard: true,
      premium: true
    },
    {
      feature: "Dodatkowe ćwiczenia praktyczne",
      basic: false,
      standard: false,
      premium: true
    },
    {
      feature: "Wsparcie po szkoleniu",
      basic: false,
      standard: "3 miesiące",
      premium: "12 miesięcy"
    },
    {
      feature: "Materiały szkoleniowe",
      basic: "Podstawowe",
      standard: "Rozszerzone",
      premium: "Kompletne + e-learning"
    },
    {
      feature: "Gwarancja zdawalności",
      basic: false,
      standard: false,
      premium: true
    }
  ];

  const packages = [
    {
      name: "Pakiet Podstawowy",
      price: "od 890 zł",
      description: "Standardowe szkolenie UDT",
      type: "basic" as const,
      popular: false
    },
    {
      name: "Pakiet Standard",
      price: "od 1190 zł", 
      description: "Rozszerzone szkolenie + wsparcie",
      type: "standard" as const,
      popular: true
    },
    {
      name: "Pakiet Premium",
      price: "od 1490 zł",
      description: "Kompleksowe szkolenie + gwarancje",
      type: "premium" as const,
      popular: false
    }
  ];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? <Check className="h-5 w-5 text-green-500 mx-auto" /> : <X className="h-5 w-5 text-red-500 mx-auto" />;
    }
    return <span className="text-sm text-center">{value}</span>;
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`transition-all duration-800 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-blue-600 font-medium text-sm sm:text-base">Porównanie pakietów</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Wybierz odpowiedni pakiet dla siebie</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Oferujemy różne pakiety szkoleń dostosowane do indywidualnych potrzeb i budżetu
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="px-6 py-4 text-left font-medium text-gray-900">Funkcjonalność</th>
                    {packages.map((pkg) => (
                      <th key={pkg.type} className="px-6 py-4 text-center">
                        <div className={`relative ${pkg.popular ? 'transform scale-105' : ''}`}>
                          {pkg.popular && (
                            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                              <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                                Najpopularniejszy
                              </span>
                            </div>
                          )}
                          <div className={`p-4 rounded-lg ${pkg.popular ? 'bg-blue-50 border-2 border-blue-200' : 'bg-white'}`}>
                            <h3 className="font-bold text-lg text-gray-900">{pkg.name}</h3>
                            <p className="text-2xl font-bold text-blue-600 mt-2">{pkg.price}</p>
                            <p className="text-sm text-gray-600 mt-1">{pkg.description}</p>
                          </div>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {features.map((feature, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-gray-900">{feature.feature}</td>
                      <td className="px-6 py-4 text-center">{renderFeatureValue(feature.basic)}</td>
                      <td className="px-6 py-4 text-center">{renderFeatureValue(feature.standard)}</td>
                      <td className="px-6 py-4 text-center">{renderFeatureValue(feature.premium)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-gray-50">
                    <td className="px-6 py-4"></td>
                    {packages.map((pkg) => (
                      <td key={pkg.type} className="px-6 py-4 text-center">
                        <Button 
                          className={`w-full ${pkg.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                          onClick={() => trackCTAClick(`comparison-${pkg.type}`, 'contact-form')}
                        >
                          Wybierz pakiet
                        </Button>
                      </td>
                    ))}
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTableSection;
