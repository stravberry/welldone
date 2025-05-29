
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface EventyCTASectionProps {
  onContactClick: () => void;
}

const EventyCTASection: React.FC<EventyCTASectionProps> = ({ onContactClick }) => {
  return (
    <div className="relative bg-gradient-to-r from-purple-600 to-purple-500 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
          Masz pomysł na event edukacyjny?
        </h2>
        <p className="text-xl text-purple-100 max-w-3xl mx-auto mb-8">
          Skontaktuj się z nami i omówmy szczegóły Twojego wydarzenia. Zapewnimy profesjonalną organizację od A do Z.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 shadow-xl"
            onClick={onContactClick}
          >
            Skontaktuj się z nami
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-white text-purple-600 hover:bg-white hover:text-purple-600 hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link to="/wycena">
              Błyskawiczna wycena
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventyCTASection;
