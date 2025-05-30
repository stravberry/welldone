
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EnhancedQuoteHero from '@/components/QuotePageComponents/EnhancedQuoteHero';
import ProcessVisualization from '@/components/QuotePageComponents/ProcessVisualization';
import TrustSection from '@/components/QuotePageComponents/TrustSection';
import EnhancedQuoteForm from '@/components/QuotePageComponents/EnhancedQuoteForm';

const QuotePage = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('quote-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar />
      <EnhancedQuoteHero onCTAClick={scrollToForm} />
      <ProcessVisualization />
      <TrustSection />
      <div id="quote-form">
        <EnhancedQuoteForm />
      </div>
      <Footer />
    </div>
  );
};

export default QuotePage;
