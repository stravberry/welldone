
import React from 'react';
import { Link } from 'react-router-dom';
import ServicesDropdown from './ServicesDropdown';

interface Service {
  title: string;
  href: string;
}

interface DesktopNavigationProps {
  services: Service[];
  onCloseMenu: () => void;
}

const DesktopNavigation = ({ services, onCloseMenu }: DesktopNavigationProps) => {
  return (
    <div className="hidden lg:ml-6 lg:flex lg:items-center lg:space-x-4 xl:space-x-6">
      <Link to="/o-nas" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
        O Nas
      </Link>
      
      <ServicesDropdown services={services} onCloseMenu={onCloseMenu} />
      
      <Link to="/strefa-wiedzy" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
        Strefa Wiedzy
      </Link>
      
      <Link to="/bezplatny-audyt" className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
        Bezpłatny Audyt
      </Link>
      
      <a href="https://testy.well-done.pl" target="_blank" rel="noopener noreferrer" className="px-2 xl:px-3 py-2 text-sm font-medium text-orange-600 hover:text-orange-700 whitespace-nowrap border border-orange-300 rounded-md hover:border-orange-400 transition-colors">
        Testy UDT online
      </a>
    </div>
  );
};

export default DesktopNavigation;
