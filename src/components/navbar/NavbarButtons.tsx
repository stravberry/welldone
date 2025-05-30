
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface NavbarButtonsProps {
  isMobile?: boolean;
  onCloseMenu?: () => void;
}

const NavbarButtons = ({ isMobile = false, onCloseMenu }: NavbarButtonsProps) => {
  const buttonClasses = isMobile 
    ? "w-full justify-center bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600"
    : "ml-2 text-xs xl:text-sm bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600";

  const outlineButtonClasses = isMobile
    ? "w-full justify-center bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600"
    : "ml-2 text-xs xl:text-sm bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600";

  return (
    <>
      <Button asChild variant="default" className={buttonClasses}>
        <Link to="/kontakt" onClick={onCloseMenu}>Kontakt</Link>
      </Button>
      <Button asChild variant="outline" className={outlineButtonClasses}>
        <Link to="/wycena" onClick={onCloseMenu}>Błyskawiczna Wycena</Link>
      </Button>
    </>
  );
};

export default NavbarButtons;
