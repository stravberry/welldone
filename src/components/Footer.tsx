import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Youtube, Mail, MapPin } from 'lucide-react';
import ClickablePhone from './ClickablePhone';
import ClickableEmail from './ClickableEmail';
import ClickableText from './ClickableText';

// Custom TikTok icon component
const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.948-1.263-2.101-1.263-3.52V0h-3.016v16.06c0 1.177-.954 2.133-2.127 2.133s-2.127-.956-2.127-2.133.954-2.133 2.127-2.133c.234 0 .459.038.671.109V10.96a5.147 5.147 0 0 0-.671-.044c-2.832 0-5.135 2.304-5.135 5.144S8.503 21.204 11.335 21.204s5.135-2.304 5.135-5.144V8.572a9.239 9.239 0 0 0 5.321 1.664V7.227a6.226 6.226 0 0 1-2.47-1.665z"/>
  </svg>
);

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
                <a href="https://www.facebook.com/people/Pawe%C5%82-Gerus-Uprawnienia-UDT-SEP/61572194412744/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Facebook size={20} />
                </a>
                <a href="https://www.instagram.com/Pawel.od.udt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Instagram size={20} />
                </a>
                <a href="https://www.tiktok.com/@pawelodudt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <TikTokIcon size={20} />
                </a>
                <a href="https://www.linkedin.com/in/pawel-gerus-well-donepl/?originalSubdomain=pl" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.youtube.com/@Well-Done.Szkolenia" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
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
                  <Link to="/strefa-wiedzy" className="text-gray-400 hover:text-white">Strefa Wiedzy</Link>
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
                  <a href="https://akademia-lutowania.pl/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">Szkolenia z lutowania</a>
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
                    <ClickableText
                      text="ul. Drzewieckiego 19/11, 54-129 Wrocław"
                      className="text-white hover:text-orange-400"
                      successMessage="Adres został skopiowany do schowka!"
                      title="Kliknij aby skopiować adres"
                    >
                      <span>ul. Drzewieckiego 19/11</span>
                      <br />
                      <span>54-129 Wrocław</span>
                    </ClickableText>
                    <br />
                    <ClickableText
                      text="Centrum Kompetencji Zawodowych Well-Done.pl Paweł Gerus"
                      className="text-xs sm:text-sm text-gray-500 mt-2 hover:text-orange-400"
                      successMessage="Nazwa firmy została skopiowana do schowka!"
                      title="Kliknij aby skopiować nazwę firmy"
                    />
                    <br />
                    <span className="text-xs sm:text-sm text-gray-500">
                      NIP: <ClickableText
                        text="884-248-74-55"
                        className="hover:text-orange-400 inline"
                        successMessage="NIP został skopiowany do schowka!"
                        title="Kliknij aby skopiować NIP"
                      />
                    </span>
                    <br />
                    <span className="text-xs sm:text-sm text-gray-500">
                      REGON: <ClickableText
                        text="022303775"
                        className="hover:text-orange-400 inline"
                        successMessage="REGON został skopiowany do schowka!"
                        title="Kliknij aby skopiować REGON"
                      />
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
