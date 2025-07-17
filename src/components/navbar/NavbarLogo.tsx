
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarLogoProps {
  onLogoClick: () => void;
}

const NavbarLogo = ({ onLogoClick }: NavbarLogoProps) => {
  return (
    <div className="flex-shrink-0 flex items-center">
      <button 
        onClick={onLogoClick}
        className="flex items-center hover:opacity-80 transition-opacity duration-200"
        aria-label="Przejdź do strony głównej Well-Done.pl - szkolenia UDT i SEP"
        title="Strona główna Well-Done.pl"
      >
        <img 
          src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
          alt="Well-Done.pl - Szkolenia UDT i SEP Wrocław, logo firmy szkoleniowej" 
          className="h-8 sm:h-10 mr-2"
          title="Well-Done.pl - Profesjonalne szkolenia UDT i SEP dla firm"
        />
      </button>
    </div>
  );
};

export default NavbarLogo;
