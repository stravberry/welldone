
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';

const ContactCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-orange-600 to-orange-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="flex items-center justify-center mb-6">
          <Star className="h-8 w-8 text-yellow-300 mr-2" />
          <h2 className="text-3xl md:text-4xl font-bold">Gotowy na współpracę?</h2>
          <Star className="h-8 w-8 text-yellow-300 ml-2" />
        </div>
        <p className="text-xl mb-8 max-w-3xl mx-auto">
          Skorzystaj z naszego formularza błyskawicznej wyceny i otrzymaj 
          szczegółową ofertę dostosowaną do potrzeb Twojej firmy.
        </p>
        <Button 
          asChild 
          size="lg" 
          className="bg-white text-orange-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
        >
          <Link to="/wycena">Uzyskaj błyskawiczną wycenę</Link>
        </Button>
      </div>
    </section>
  );
};

export default ContactCTA;
