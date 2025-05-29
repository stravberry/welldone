
import React from 'react';
import { Button } from '@/components/ui/button';

const KnowledgeNewsletterSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 bg-orange-100 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="text-center mb-8 relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Nie przegap najnowszych treści!
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Bądź na bieżąco z najnowszymi filmami, zmianami w przepisach i praktycznymi poradami. 
              Otrzymuj powiadomienia o nowych treściach prosto na swoją skrzynkę.
            </p>
          </div>
          <form className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 max-w-lg mx-auto relative z-10">
            <input
              type="email"
              placeholder="Twój adres e-mail"
              className="flex-grow px-6 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
            <Button type="submit" size="lg" className="bg-orange-600 hover:bg-orange-700 font-semibold">
              Zapisz się
            </Button>
          </form>
          <p className="text-sm text-gray-500 text-center mt-4 relative z-10">
            Zapisując się, zgadzasz się na otrzymywanie od nas wiadomości e-mail. Możesz zrezygnować w dowolnym momencie.
          </p>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeNewsletterSection;
