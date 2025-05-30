
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

interface Service {
  title: string;
  href: string;
}

interface ServicesDropdownProps {
  services: Service[];
  onCloseMenu: () => void;
}

const ServicesDropdown = ({ services, onCloseMenu }: ServicesDropdownProps) => {
  const navigate = useNavigate();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger 
            className="px-2 xl:px-3 py-2 text-sm font-medium text-gray-700 hover:text-orange-600 whitespace-nowrap !bg-transparent hover:!bg-transparent data-[state=open]:!bg-transparent focus:!bg-transparent h-auto border-none outline-none ring-0 focus:ring-0"
            onClick={() => navigate('/uslugi')}
          >
            Usługi
          </NavigationMenuTrigger>
          <NavigationMenuContent className="bg-white border border-gray-200 shadow-lg rounded-md mt-1 z-50">
            <ul className="grid w-[400px] gap-3 p-4">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    to={service.href}
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-600"
                    onClick={onCloseMenu}
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
  );
};

export default ServicesDropdown;
