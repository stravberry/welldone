
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const PriceListPage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-orange-500 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-8">Cennik</h1>
          <p className="text-xl max-w-3xl mx-auto text-white/90 leading-relaxed">
            Przejrzyste ceny dla wszystkich naszych usług szkoleniowych
          </p>
        </div>
      </section>

      {/* Coming Soon Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">
              Cennik będzie dostępny wkrótce
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Pracujemy nad przygotowaniem szczegółowego cennika dla wszystkich naszych usług. 
              W międzyczasie zapraszamy do skorzystania z bezpłatnej wyceny.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center">
              <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
                <Link to="/bezplatny-audyt">Bezpłatny audyt</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/kontakt">Skontaktuj się z nami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PriceListPage;
