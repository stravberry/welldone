
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
      >
        <img 
          src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
          alt="Well-done.pl Logo" 
          className="h-8 sm:h-10 mr-2" 
        />
      </button>
    </div>
  );
};

export default NavbarLogo;
