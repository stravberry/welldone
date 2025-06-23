
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react';
import ClickablePhone from './ClickablePhone';
import ClickableEmail from './ClickableEmail';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" 
                  alt="Well-done.pl Logo" 
                  className="h-12 sm:h-14 md:h-16 mr-2 object-contain" 
                />
              </div>
              <p className="text-gray-400 mb-4 text-sm sm:text-base">
                Pomagamy firmom produkcyjnym działać bez ryzyka – zapewniamy pełną zgodność uprawnień UDT i SEP dla pracowników.
              </p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Facebook size={20} />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Youtube size={20} />
                </a>
              </div>
            </div>
            
            <div className="mt-8 sm:mt-0">
              <h3 className="text-lg font-semibold mb-4">Szybki dostęp</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-white">Home</Link>
                </li>
                <li>
                  <Link to="/o-nas" className="text-gray-400 hover:text-white">O Nas</Link>
                </li>
                <li>
                  <Link to="/uslugi" className="text-gray-400 hover:text-white">Usługi / Dla Firm</Link>
                </li>
                <li>
                  <Link to="/bezplatny-audyt" className="text-gray-400 hover:text-white">Bezpłatny Audyt</Link>
                </li>
                <li>
                  <Link to="/realizacje" className="text-gray-400 hover:text-white">Realizacje</Link>
                </li>
                <li>
                  <Link to="/wiedza" className="text-gray-400 hover:text-white">Wiedza</Link>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 md:mt-0">
              <h3 className="text-lg font-semibold mb-4">Usługi</h3>
              <ul className="space-y-2 text-sm sm:text-base">
                <li>
                  <Link to="/uslugi/udt-operatorzy" className="text-gray-400 hover:text-white">Uprawnienia UDT dla operatorów</Link>
                </li>
                <li>
                  <Link to="/uslugi/udt-konserwatorzy" className="text-gray-400 hover:text-white">Uprawnienia UDT dla konserwatorów</Link>
                </li>
                <li>
                  <Link to="/uslugi/sep" className="text-gray-400 hover:text-white">Uprawnienia SEP</Link>
                </li>
                <li>
                  <Link to="/uslugi/lutowanie" className="text-gray-400 hover:text-white">Szkolenia z lutowania</Link>
                </li>
                <li>
                  <Link to="/uslugi/eventy" className="text-gray-400 hover:text-white">Eventy edukacyjne</Link>
                </li>
              </ul>
            </div>
            
            <div className="mt-8 md:mt-0">
              <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
              <ul className="space-y-4 text-sm sm:text-base">
                <li>
                  <ClickablePhone showIcon={true} />
                </li>
                <li className="flex items-start">
                  <Mail size={20} className="mr-2 mt-1 text-orange-400 flex-shrink-0" />
                  <ClickableEmail 
                    email="pgerus@well-done.pl" 
                    className="break-all text-white hover:text-orange-400"
                  />
                </li>
                <li className="flex items-start">
                  <MapPin size={20} className="mr-2 mt-1 text-orange-400 flex-shrink-0" />
                  <div>
                    <span>ul. Drzewieckiego 19/11</span>
                    <br />
                    <span>54-129 Wrocław</span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-500 mt-2">
                      Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus
                    </span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-500">
                      NIP: 884-248-74-55
                    </span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-500">
                      REGON: 022303775
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs sm:text-sm">
              © {new Date().getFullYear()} Well-Done.pl. Wszelkie prawa zastrzeżone.
            </p>
            <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-2 sm:space-y-0 mt-4 md:mt-0">
              <Link to="/polityka-prywatnosci" className="text-gray-400 hover:text-white text-xs sm:text-sm">
                Polityka prywatności
              </Link>
              <Link to="/regulamin" className="text-gray-400 hover:text-white text-xs sm:text-sm">
                Regulamin
              </Link>
              <Link to="/mapa-strony" className="text-gray-400 hover:text-white text-xs sm:text-sm">
                Mapa strony
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
