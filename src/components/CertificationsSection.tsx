
import React from 'react';
import { Award, Shield, CheckCircle, Calendar } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const CertificationsSection = () => {
  const { elementRef, isInView } = useScrollAnimation();

  const certifications = [
    {
      name: "UDT",
      fullName: "Urząd Dozoru Technicznego",
      year: "2010",
      description: "Uprawnienia do prowadzenia szkoleń operatorów i konserwatorów",
      icon: Shield,
      color: "bg-blue-500"
    },
    {
      name: "SEP",
      fullName: "Stowarzyszenie Elektryków Polskich",
      year: "2012",
      description: "Certyfikat do szkoleń elektrycznych do 30kV",
      icon: Award,
      color: "bg-yellow-500"
    },
    {
      name: "IPC",
      fullName: "Association Connecting Electronics Industries",
      year: "2015",
      description: "Międzynarodowe standardy lutowania elektroniki",
      icon: CheckCircle,
      color: "bg-green-500"
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Certyfikaty i uprawnienia
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-gray-900">
            Nasze akredytacje gwarantują najwyższą jakość
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Posiadamy wszystkie niezbędne certyfikaty i uprawnienia do prowadzenia profesjonalnych szkoleń technicznych
          </p>
        </div>

        <div 
          ref={elementRef}
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {certifications.map((cert, index) => (
            <div 
              key={cert.name}
              className="group bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 ${cert.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <cert.icon className="h-8 w-8 text-white" />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{cert.name}</h3>
                <p className="text-sm text-gray-600 font-medium mb-3">{cert.fullName}</p>
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">{cert.description}</p>
                
                <div className="flex items-center justify-center space-x-2 text-orange-600">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm font-medium">Od {cert.year}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-green-700 font-medium">Zgodność z przepisami</div>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6">
              <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
              <div className="text-blue-700 font-medium">Główne certyfikaty</div>
            </div>
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-6">
              <div className="text-2xl font-bold text-orange-600 mb-2">15+</div>
              <div className="text-orange-700 font-medium">Lat certyfikowanej działalności</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
