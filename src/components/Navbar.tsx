
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

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
    <nav className={`fixed top-0 left-0 right-0 bg-white shadow-sm z-50 transition-shadow duration-300 ${scrolled ? 'shadow-md' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <button 
              onClick={handleLogoClick}
              className="flex items-center hover:opacity-80 transition-opacity duration-200"
            >
              <img 
                src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
                alt="Well-done.pl Logo" 
                className="h-8 sm:h-10 mr-2" 
              />
            </button>
          </div>
          
          <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4 xl:space-x-6">
            <Link to="/" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
              Home
            </Link>
            <Link to="/o-nas" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
              O Nas
            </Link>
            
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link 
                    to="/uslugi" 
                    className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap"
                  >
                    <NavigationMenuTrigger>
                      <span className="text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
                        Usługi
                      </span>
                    </NavigationMenuTrigger>
                  </Link>
                  <NavigationMenuContent className="bg-white">
                    <ul className="grid w-[400px] gap-3 p-4">
                      {services.map((service) => (
                        <li key={service.href}>
                          <Link
                            to={service.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600"
                            onClick={closeMenu}
                          >
                            <div className="text-sm font-medium leading-none">{service.title}</div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            <Link to="/bezplatny-audyt" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
              Bezpłatny Audyt
            </Link>
            <Link to="/realizacje" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
              Realizacje
            </Link>
            <Link to="/wiedza" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
              Wiedza
            </Link>
          </div>
          
          
          <div className="hidden lg:flex items-center">
            <Button asChild variant="default" className="ml-2 text-xs xl:text-sm bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600">
              <Link to="/kontakt">Kontakt</Link>
            </Button>
            <Button asChild variant="outline" className="ml-2 text-xs xl:text-sm bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600">
              <Link to="/wycena">Błyskawiczna Wycena</Link>
            </Button>
          </div>
          
          <div className="-mr-2 flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
            >
              <span className="sr-only">Otwórz menu</span>
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                    isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu with Slide Down Animation */}
      <div className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
        isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
          {/* Main Menu Items with Staggered Animation */}
          {[
            { to: '/', label: 'Home', delay: 0 },
            { to: '/o-nas', label: 'O Nas', delay: 50 },
            { to: '/uslugi', label: 'Usługi', delay: 100 },
            { to: '/bezplatny-audyt', label: 'Bezpłatny Audyt', delay: 125 },
            { to: '/realizacje', label: 'Realizacje', delay: 150 },
            { to: '/wiedza', label: 'Wiedza', delay: 200 }
          ].map((item, index) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-orange-600 hover:bg-gray-100 transition-all duration-200 ${
                isOpen 
                  ? 'animate-fade-in opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-2'
              }`}
              style={{
                animationDelay: isOpen ? `${item.delay}ms` : '0ms',
                animationFillMode: 'both'
              }}
              onClick={closeMenu}
            >
              {item.label}
            </Link>
          ))}
          
          
          {/* Services Submenu with Animation */}
          <div className="border-l-2 border-orange-200 ml-3">
            <div className="px-3 py-1 text-xs font-semibold text-orange-600 uppercase tracking-wider">
              Nasze Usługi:
            </div>
            {services.map((service, index) => (
              <Link
                key={service.href}
                to={service.href}
                className={`block px-3 py-2 pl-6 rounded-md text-sm font-medium text-gray-600 hover:text-orange-600 hover:bg-gray-100 transition-all duration-200 ${
                  isOpen 
                    ? 'animate-fade-in opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-2'
                }`}
                style={{
                  animationDelay: isOpen ? `${300 + (index * 75)}ms` : '0ms',
                  animationFillMode: 'both'
                }}
                onClick={closeMenu}
              >
                {service.title}
              </Link>
            ))}
          </div>
        </div>
        
        {/* CTA Buttons with Animation */}
        <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-y-2 px-4">
          <Button 
            asChild 
            variant="default" 
            className={`w-full justify-center bg-orange-500 hover:bg-orange-600 border-orange-500 hover:border-orange-600 transition-all duration-200 ${
              isOpen 
                ? 'animate-scale-in opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              animationDelay: isOpen ? '600ms' : '0ms',
              animationFillMode: 'both'
            }}
          >
            <Link to="/kontakt" onClick={closeMenu}>Kontakt</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            className={`w-full justify-center bg-orange-500 text-white hover:bg-orange-600 border-orange-500 hover:border-orange-600 transition-all duration-200 ${
              isOpen 
                ? 'animate-scale-in opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-4'
            }`}
            style={{
              animationDelay: isOpen ? '700ms' : '0ms',
              animationFillMode: 'both'
            }}
          >
            <Link to="/wycena" onClick={closeMenu}>Błyskawiczna Wycena</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
