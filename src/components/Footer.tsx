
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">UDT & SEP Szkolenia</h3>
            <p className="text-gray-400 mb-4">
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
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Szybki dostęp</h3>
            <ul className="space-y-2">
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
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Usługi</h3>
            <ul className="space-y-2">
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
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Phone size={20} className="mr-2 mt-1 text-blue-400" />
                <span>+48 123 456 789</span>
              </li>
              <li className="flex items-start">
                <Mail size={20} className="mr-2 mt-1 text-blue-400" />
                <span>kontakt@udt-sep-szkolenia.pl</span>
              </li>
              <li className="flex items-start">
                <MapPin size={20} className="mr-2 mt-1 text-blue-400" />
                <span>ul. Przemysłowa 1, 00-001 Warszawa</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} UDT & SEP Szkolenia. Wszelkie prawa zastrzeżone.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/polityka-prywatnosci" className="text-gray-400 hover:text-white text-sm">
              Polityka prywatności
            </Link>
            <Link to="/regulamin" className="text-gray-400 hover:text-white text-sm">
              Regulamin
            </Link>
            <Link to="/mapa-strony" className="text-gray-400 hover:text-white text-sm">
              Mapa strony
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
