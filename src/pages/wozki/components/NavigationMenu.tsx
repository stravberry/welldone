
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NavigationMenuProps {
  trackLinkClick: (linkName: string) => void;
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ trackLinkClick, trackCTAClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  const menuItems = [
    { label: 'Oferta', action: () => scrollToSection('offerings') },
    { label: 'Dlaczego my?', action: () => scrollToSection('why-us') },
    { label: 'Proces', action: () => scrollToSection('process') },
    { label: 'FAQ', action: () => scrollToSection('faq') },
    { label: 'Kontakt', action: () => scrollToSection('contact-form') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link 
            to="/" 
            className="text-2xl font-bold text-blue-600"
            onClick={() => trackLinkClick('logo')}
          >
            Well-done
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  trackLinkClick(item.label.toLowerCase().replace(' ', '-'));
                  item.action();
                }}
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => trackCTAClick('nav-phone', 'contact-form')}
            >
              <Phone className="h-4 w-4 mr-2" />
              Zadzwoń
            </Button>
            <Button 
              size="sm"
              onClick={() => trackCTAClick('nav-contact', 'contact-form')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Skontaktuj się
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    trackLinkClick(item.label.toLowerCase().replace(' ', '-'));
                    item.action();
                  }}
                  className="block w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              <div className="px-4 py-2 space-y-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full"
                  onClick={() => {
                    trackCTAClick('mobile-nav-phone', 'contact-form');
                    setIsOpen(false);
                  }}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Zadzwoń
                </Button>
                <Button 
                  size="sm" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    trackCTAClick('mobile-nav-contact', 'contact-form');
                    setIsOpen(false);
                  }}
                >
                  Skontaktuj się
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationMenu;
