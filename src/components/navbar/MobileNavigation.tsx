
import React from 'react';
import { Link } from 'react-router-dom';
import NavbarButtons from './NavbarButtons';

interface Service {
  title: string;
  href: string;
}

interface MobileNavigationProps {
  isOpen: boolean;
  services: Service[];
  onCloseMenu: () => void;
}

const MobileNavigation = ({ isOpen, services, onCloseMenu }: MobileNavigationProps) => {
  return (
    <div className={`lg:hidden transition-all duration-300 ease-out overflow-hidden ${
      isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
    }`}>
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
        {/* Main Menu Items with Staggered Animation */}
        {[
          { to: '/', label: 'Home', delay: 0 },
          { to: '/o-nas', label: 'O Nas', delay: 50 },
          { to: '/uslugi', label: 'Usługi', delay: 100 },
          { to: '/strefa-wiedzy', label: 'Strefa Wiedzy', delay: 125 },
          { to: '/bezplatny-audyt', label: 'Bezpłatny Audyt', delay: 150 }
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
            onClick={onCloseMenu}
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
              onClick={onCloseMenu}
            >
              {service.title}
            </Link>
          ))}
          
          {/* Testy UDT online link */}
          <a
            href="https://testy.well-done.pl"
            target="_blank"
            rel="noopener noreferrer"
            className={`block px-3 py-2 pl-6 rounded-md text-sm font-medium text-orange-600 hover:text-orange-700 hover:bg-gray-100 transition-all duration-200 border border-orange-300 mx-3 mt-2 text-center ${
              isOpen 
                ? 'animate-fade-in opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-2'
            }`}
            style={{
              animationDelay: isOpen ? `${400 + (services.length * 75)}ms` : '0ms',
              animationFillMode: 'both'
            }}
            onClick={onCloseMenu}
          >
            Testy UDT online
          </a>
        </div>
      </div>
      
      {/* CTA Buttons with Animation */}
      <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-y-2 px-4">
        <div 
          className={`transition-all duration-200 ${
            isOpen 
              ? 'animate-scale-in opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`}
          style={{
            animationDelay: isOpen ? '600ms' : '0ms',
            animationFillMode: 'both'
          }}
        >
          <NavbarButtons isMobile={true} onCloseMenu={onCloseMenu} />
        </div>
      </div>
    </div>
  );
};

export default MobileNavigation;
