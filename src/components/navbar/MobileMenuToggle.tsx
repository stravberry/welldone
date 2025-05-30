
import React from 'react';
import { Menu, X } from 'lucide-react';

interface MobileMenuToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

const MobileMenuToggle = ({ isOpen, onToggle }: MobileMenuToggleProps) => {
  return (
    <div className="-mr-2 flex items-center lg:hidden py-4">
      <button
        onClick={onToggle}
        className="inline-flex items-center justify-center p-3 rounded-md text-gray-700 hover:text-orange-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500 transition-colors duration-200"
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
  );
};

export default MobileMenuToggle;
