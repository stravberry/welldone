
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
      <Link to="/" className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
        Home
      </Link>
      <Link to="/o-nas" className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
        O Nas
      </Link>
      
      <ServicesDropdown services={services} onCloseMenu={onCloseMenu} />
      
      <Link to="/bezplatny-audyt" className="px-3 xl:px-4 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap">
        Bezpłatny Audyt
      </Link>
    </div>
  );
};

export default DesktopNavigation;
