
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavbarLogo from './navbar/NavbarLogo';
import DesktopNavigation from './navbar/DesktopNavigation';
import MobileNavigation from './navbar/MobileNavigation';
import MobileMenuToggle from './navbar/MobileMenuToggle';
import NavbarButtons from './navbar/NavbarButtons';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    closeMenu();
  };

  const services = [
    { title: 'Uprawnienia UDT dla operatorów', href: '/uslugi/udt-operatorzy' },
    { title: 'Szkolenia UDT', href: '/udt-szkolenia' },
    { title: 'Uprawnienia UDT dla konserwatorów', href: '/udt-konserwatorze' },
    { title: 'Uprawnienia SEP', href: '/sep' },
    { title: 'Szkolenia z lutowania', href: '/lutowanie' },
    { title: 'Eventy edukacyjne', href: '/eventy' },
    { title: 'Szkolenie wózki unoszące', href: '/szkolenie-wozki-unoszace' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 w-full bg-white z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'} m-0 p-0`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <NavbarLogo onLogoClick={handleLogoClick} />
          
          <DesktopNavigation services={services} onCloseMenu={closeMenu} />
          
          <div className="hidden lg:flex items-center">
            <NavbarButtons />
          </div>
          
          <MobileMenuToggle isOpen={isOpen} onToggle={toggleMenu} />
        </div>
      </div>

      <MobileNavigation isOpen={isOpen} services={services} onCloseMenu={closeMenu} />
    </nav>
  );
};

export default Navbar;
