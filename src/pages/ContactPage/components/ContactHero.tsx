
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactHero = () => {
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <section 
      ref={heroRef}
      className={`bg-gradient-to-r from-orange-600 to-orange-500 text-white py-20 relative overflow-hidden transition-all duration-800 ${
        heroInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center transition-all duration-800 delay-200 ${
          heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Skontaktuj się z nami</h1>
          <p className="text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed">
            Masz pytania dotyczące naszych szkoleń? Potrzebujesz indywidualnej wyceny? 
            Jesteśmy do Twojej dyspozycji!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
