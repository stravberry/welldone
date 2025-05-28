
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface ComparisonTableSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const ComparisonTableSection: React.FC<ComparisonTableSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: tableRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(4, 150);
  const { elementRef: ctaRef, isInView: ctaInView } = useScrollAnimation<HTMLDivElement>();

  const tableRows = [
    { label: "Zdawalność", wellDone: "96%", competition: "75-80%" },
    { label: "Czas praktyki na urządzeniach", wellDone: "Min. 6h na osobę", competition: "2-3h na osobę" },
    { label: "Wsparcie po szkoleniu", wellDone: "check", competition: "x" },
    { label: "Materiały szkoleniowe", wellDone: "Komplet + dostęp online", competition: "Podstawowe materiały" }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-orange-600 font-medium text-sm sm:text-base animate-pulse-slow">Porównanie</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Dlaczego warto wybrać nasze szkolenia UDT</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Przekonaj się, co wyróżnia nasze szkolenia UDT we Wrocławiu na tle konkurencji
          </p>
        </div>
        
        <div 
          ref={tableRef}
          className={`overflow-x-auto transition-all duration-1000 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <table className="w-full border-collapse bg-white rounded-lg shadow-lg overflow-hidden">
            <thead>
              <tr>
                <th className="p-4 text-left bg-gray-100 border"></th>
                <th className={`p-4 text-center bg-orange-600 text-white border rounded-t-lg transition-all duration-1000 hover:bg-orange-700 ${
                  titleInView ? 'animate-glow' : ''
                }`}>
                  <div className="font-bold text-xl">Well-done</div>
                  <div className="text-orange-200">Nasze szkolenia</div>
                </th>
                <th className="p-4 text-center bg-gray-200 border">
                  <div className="font-bold">Konkurencja</div>
                  <div className="text-gray-500">Inne szkolenia UDT</div>
                </th>
              </tr>
            </thead>
            <tbody>
              {tableRows.map((row, index) => (
                <tr 
                  key={index}
                  className={`transition-all duration-700 hover:bg-gray-50 ${
                    visibleItems.includes(index) 
                      ? 'animate-table-row opacity-100' 
                      : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <td className="p-4 border font-medium">{row.label}</td>
                  <td className="p-4 border text-center bg-orange-50 font-semibold text-orange-800">
                    {row.wellDone === "check" ? (
                      <Check className="inline h-5 w-5 text-green-500 animate-scale-in" />
                    ) : (
                      row.wellDone
                    )}
                  </td>
                  <td className="p-4 border text-center">
                    {row.competition === "x" ? (
                      <X className="inline h-5 w-5 text-red-500 animate-scale-in" />
                    ) : (
                      row.competition
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div 
          ref={ctaRef}
          className={`mt-8 sm:mt-12 text-center transition-all duration-1000 ${
            ctaInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:animate-glow"
            onClick={() => trackCTAClick('comparison-contact', 'contact-form')}
          >
            Wybierz najlepszych
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTableSection;
