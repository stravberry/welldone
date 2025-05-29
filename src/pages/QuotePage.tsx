
import React, { useEffect, useRef } from 'react';
import EnhancedQuoteHero from '@/components/QuotePageComponents/EnhancedQuoteHero';
import EnhancedQuoteForm from '@/components/QuotePageComponents/EnhancedQuoteForm';
import ProcessVisualization from '@/components/QuotePageComponents/ProcessVisualization';
import TrustSection from '@/components/QuotePageComponents/TrustSection';

const QuotePage = () => {
  const formRef = useRef<HTMLDivElement>(null);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <EnhancedQuoteHero onScrollToForm={scrollToForm} />
      
      {/* Process Visualization */}
      <ProcessVisualization />
      
      {/* Quote Form Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Otrzymaj swoją wycenę już teraz
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Wypełnij prosty formularz i otrzymaj szczegółową ofertę dostosowaną do potrzeb Twojej firmy.
            </p>
          </div>
          
          <EnhancedQuoteForm ref={formRef} />
        </div>
      </section>

      {/* Trust Section */}
      <TrustSection />

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-amber-600 via-orange-500 to-red-500 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Nie czekaj - zacznij oszczędzać już dziś!
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Dołącz do setek firm, które dzięki naszej błyskawicznej wycenie 
            zaoszczędziły czas i pieniądze na szkoleniach.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-3xl font-bold mb-2">15 min</div>
              <div className="text-orange-100">Czas odpowiedzi</div>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-3xl font-bold mb-2">0 zł</div>
              <div className="text-orange-100">Koszt wyceny</div>
            </div>
            <div className="bg-white bg-opacity-15 backdrop-blur-sm rounded-2xl p-6 border border-white border-opacity-20">
              <div className="text-3xl font-bold mb-2">30%</div>
              <div className="text-orange-100">Średnie oszczędności</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuotePage;
