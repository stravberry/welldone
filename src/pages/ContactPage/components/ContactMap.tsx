
import React from 'react';
import { MapPin } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactMap = () => {
  const { elementRef: mapRef, isInView: mapInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <section 
      ref={mapRef}
      className={`py-20 bg-gray-50 transition-all duration-800 ${
        mapInView ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-8 transition-all duration-800 delay-200 ${
          mapInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl font-bold mb-4">Nasza lokalizacja</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Znajdź nas na mapie. Nasza siedziba znajduje się we Wrocławiu, 
            z dogodnym dojazdem komunikacją miejską i samochodem.
          </p>
        </div>
        <div className={`rounded-lg overflow-hidden shadow-lg transition-all duration-800 delay-400 ${
          mapInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          <div className="aspect-w-16 aspect-h-9 bg-gradient-to-br from-gray-200 to-gray-300 h-96">
            <div className="w-full h-full flex items-center justify-center text-gray-600">
              <div className="text-center">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <p className="text-lg font-medium">Mapa Google</p>
                <p className="text-sm">ul. Drzewieckiego 19/11, 54-129 Wrocław</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactMap;
