
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from '@/lib/utils';
import { Phone, Menu } from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

interface NavigationMenuProps {
  trackLinkClick: (linkName: string) => void;
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const UDTNavigationMenu: React.FC<NavigationMenuProps> = ({ trackLinkClick, trackCTAClick }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <a 
              href="#" 
              className="flex items-center"
              onClick={() => trackLinkClick('logo')}
            >
              <img 
                src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
                alt="Well-done.pl Logo" 
                className="h-12 w-auto mr-2 flex-shrink-0" 
              />
            </a>
            <span className="ml-2 text-sm bg-orange-100 text-orange-700 px-2 py-1 rounded">
              Szkolenia UDT
            </span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    onClick={() => trackLinkClick('home')}
                    href="#"
                  >
                    Strona główna
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Szkolenia</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <ListItem 
                        title="Wózki widłowe" 
                        href="#offerings"
                        onClick={() => trackLinkClick('forklift')}
                      >
                        Szkolenia na wszystkie kategorie wózków jezdniowych
                      </ListItem>
                      <ListItem 
                        title="Podesty ruchome" 
                        href="#offerings"
                        onClick={() => trackLinkClick('platforms')}
                      >
                        Podesty przejezdne i wolnobieżne
                      </ListItem>
                      <ListItem 
                        title="Suwnice" 
                        href="#offerings"
                        onClick={() => trackLinkClick('cranes')}
                      >
                        Suwnice hakowe i specjalistyczne
                      </ListItem>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    onClick={() => trackCTAClick('nav-process', 'process')}
                    href="#process"
                  >
                    Proces
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    onClick={() => trackCTAClick('nav-faq', 'faq')}
                    href="#faq"
                  >
                    FAQ
                  </NavigationMenuLink>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={navigationMenuTriggerStyle()}
                    onClick={() => trackCTAClick('nav-contact', 'contact-form')}
                    href="#contact-form"
                  >
                    Kontakt
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
            
            {/* Phone number - hidden on smaller screens */}
            <div className="ml-4 hidden xl:flex items-center">
              <Phone className="h-5 w-5 mr-2 text-orange-600" />
              <a href="tel:+48123456789" className="text-gray-700 font-medium hover:text-orange-600 transition-colors">
                +48 123 456 789
              </a>
            </div>
            
            <Button 
              className="ml-4 bg-orange-600 hover:bg-orange-700"
              onClick={() => trackCTAClick('nav-contact-button', 'contact-form')}
            >
              Zapisz się na szkolenie
            </Button>
          </div>
          
          {/* Mobile Hamburger Menu */}
          <div className="lg:hidden">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>Menu</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 space-y-4">
                  <a 
                    href="#" 
                    className="block py-2 text-lg font-medium"
                    onClick={() => trackLinkClick('home')}
                  >
                    Strona główna
                  </a>
                  <div className="space-y-2">
                    <div className="text-lg font-medium">Szkolenia</div>
                    <a 
                      href="#offerings" 
                      className="block py-1 pl-4 text-gray-600"
                      onClick={() => trackLinkClick('forklift')}
                    >
                      Wózki widłowe
                    </a>
                    <a 
                      href="#offerings" 
                      className="block py-1 pl-4 text-gray-600"
                      onClick={() => trackLinkClick('platforms')}
                    >
                      Podesty ruchome
                    </a>
                    <a 
                      href="#offerings" 
                      className="block py-1 pl-4 text-gray-600"
                      onClick={() => trackLinkClick('cranes')}
                    >
                      Suwnice
                    </a>
                  </div>
                  <a 
                    href="#process" 
                    className="block py-2 text-lg font-medium"
                    onClick={() => trackCTAClick('nav-process', 'process')}
                  >
                    Proces
                  </a>
                  <a 
                    href="#faq" 
                    className="block py-2 text-lg font-medium"
                    onClick={() => trackCTAClick('nav-faq', 'faq')}
                  >
                    FAQ
                  </a>
                  <a 
                    href="#contact-form" 
                    className="block py-2 text-lg font-medium"
                    onClick={() => trackCTAClick('nav-contact', 'contact-form')}
                  >
                    Kontakt
                  </a>
                  <div className="flex items-center py-2">
                    <Phone className="h-5 w-5 mr-2 text-orange-600" />
                    <a href="tel:+48123456789" className="text-gray-700 font-medium">
                      +48 123 456 789
                    </a>
                  </div>
                  <DrawerClose asChild>
                    <Button 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                      onClick={() => trackCTAClick('mobile-nav-contact', 'contact-form')}
                    >
                      Zapisz się na szkolenie
                    </Button>
                  </DrawerClose>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

// Extension component for styled links
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-orange-50 hover:text-orange-700 focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default UDTNavigationMenu;
