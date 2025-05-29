
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const KnowledgeCTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-600 to-orange-500 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-3/4 w-2 h-2 bg-white rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Potrzebujesz indywidualnego wsparcia?</h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto leading-relaxed">
          Skontaktuj się z nami, aby skonsultować swoje potrzeby szkoleniowe lub umówić się na bezpłatny audyt. 
          Pomożemy Ci wybrać najlepsze rozwiązania dla Twojej firmy.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
          <Button asChild size="lg" className="bg-white text-orange-600 hover:bg-gray-100 font-semibold hover:scale-105 transition-all">
            <Link to="/kontakt">Skontaktuj się z nami</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-2 border-white hover:bg-white hover:text-orange-600 font-semibold hover:scale-105 transition-all">
            <Link to="/bezplatny-audyt">Zamów bezpłatny audyt</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeCTASection;
