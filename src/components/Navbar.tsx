
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleServices = () => {
    setServicesOpen(!servicesOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
                alt="Well-done.pl Logo" 
                className="h-10 mr-2" 
              />
            </Link>
          </div>
          
          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
            <Link to="/" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600">
              Home
            </Link>
            <Link to="/o-nas" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600">
              O Nas
            </Link>
            <div className="relative">
              <button
                onClick={toggleServices}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 flex items-center"
              >
                Usługi / Dla Firm
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    <Link
                      to="/uslugi/udt-operatorzy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setServicesOpen(false)}
                    >
                      Uprawnienia UDT dla operatorów
                    </Link>
                    <Link
                      to="/uslugi/udt-konserwatorzy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setServicesOpen(false)}
                    >
                      Uprawnienia UDT dla konserwatorów
                    </Link>
                    <Link
                      to="/uslugi/sep"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setServicesOpen(false)}
                    >
                      Uprawnienia SEP
                    </Link>
                    <Link
                      to="/uslugi/lutowanie"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setServicesOpen(false)}
                    >
                      Szkolenia z lutowania
                    </Link>
                    <Link
                      to="/uslugi/eventy"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setServicesOpen(false)}
                    >
                      Eventy edukacyjne
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/bezplatny-audyt" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600">
              Bezpłatny Audyt
            </Link>
            <Link to="/realizacje" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600">
              Realizacje
            </Link>
            <Link to="/wiedza" className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600">
              Wiedza
            </Link>
          </div>
          
          <div className="hidden md:flex items-center">
            <Button asChild variant="default" className="ml-4">
              <Link to="/kontakt">Kontakt</Link>
            </Button>
            <Button asChild variant="outline" className="ml-2 bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600">
              <Link to="/wycena">Błyskawiczna Wycena</Link>
            </Button>
          </div>
          
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500"
            >
              <span className="sr-only">Otwórz menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100">
              Home
            </Link>
            <Link to="/o-nas" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100">
              O Nas
            </Link>
            <button
              onClick={toggleServices}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100 flex items-center justify-between"
            >
              Usługi / Dla Firm
              <ChevronDown className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {servicesOpen && (
              <div className="pl-4 space-y-1">
                <Link
                  to="/uslugi/udt-operatorzy"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                >
                  Uprawnienia UDT dla operatorów
                </Link>
                <Link
                  to="/uslugi/udt-konserwatorzy"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                >
                  Uprawnienia UDT dla konserwatorów
                </Link>
                <Link
                  to="/uslugi/sep"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                >
                  Uprawnienia SEP
                </Link>
                <Link
                  to="/uslugi/lutowanie"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                >
                  Szkolenia z lutowania
                </Link>
                <Link
                  to="/uslugi/eventy"
                  className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100"
                >
                  Eventy edukacyjne
                </Link>
              </div>
            )}
            <Link to="/bezplatny-audyt" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100">
              Bezpłatny Audyt
            </Link>
            <Link to="/realizacje" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100">
              Realizacje
            </Link>
            <Link to="/wiedza" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100">
              Wiedza
            </Link>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-y-2 px-4">
            <Button asChild variant="default" className="w-full justify-center">
              <Link to="/kontakt">Kontakt</Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-center bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600">
              <Link to="/wycena">Błyskawiczna Wycena</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
