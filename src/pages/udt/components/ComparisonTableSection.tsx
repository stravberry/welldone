
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface ComparisonTableSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const ComparisonTableSection: React.FC<ComparisonTableSectionProps> = ({ trackCTAClick }) => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-medium">Porównanie</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Dlaczego warto wybrać nasze szkolenia</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Przekonaj się, co wyróżnia nasze szkolenia UDT na tle konkurencji
          </p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="p-4 text-left bg-gray-100 border"></th>
                <th className="p-4 text-center bg-orange-600 text-white border rounded-t-lg">
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
              <tr>
                <td className="p-4 border font-medium">Zdawalność</td>
                <td className="p-4 border text-center">96%</td>
                <td className="p-4 border text-center">75-80%</td>
              </tr>
              <tr>
                <td className="p-4 border font-medium">Wielkość grup szkoleniowych</td>
                <td className="p-4 border text-center">Max. 6 osób</td>
                <td className="p-4 border text-center">10-15 osób</td>
              </tr>
              <tr>
                <td className="p-4 border font-medium">Czas praktyki na urządzeniach</td>
                <td className="p-4 border text-center">Min. 6h na osobę</td>
                <td className="p-4 border text-center">2-3h na osobę</td>
              </tr>
              <tr>
                <td className="p-4 border font-medium">Wsparcie po szkoleniu</td>
                <td className="p-4 border text-center"><Check className="inline h-5 w-5 text-green-500" /></td>
                <td className="p-4 border text-center"><X className="inline h-5 w-5 text-red-500" /></td>
              </tr>
              <tr>
                <td className="p-4 border font-medium">Gwarancja zdawalności</td>
                <td className="p-4 border text-center"><Check className="inline h-5 w-5 text-green-500" /></td>
                <td className="p-4 border text-center"><X className="inline h-5 w-5 text-red-500" /></td>
              </tr>
              <tr>
                <td className="p-4 border font-medium">Materiały szkoleniowe</td>
                <td className="p-4 border text-center">Komplet + dostęp online</td>
                <td className="p-4 border text-center">Podstawowe materiały</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-12 text-center">
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
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
