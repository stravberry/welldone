import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
interface WhyChooseUsSectionProps {
  benefits: Array<{
    title: string;
    description: string;
    icon: React.ReactNode;
  }>;
  StatCard: React.ComponentType<{
    value: number;
    label: string;
    delay: number;
  }>;
}
const WhyChooseUsSection: React.FC<WhyChooseUsSectionProps> = ({
  benefits,
  StatCard
}) => {
  const navigate = useNavigate();
  const handleContactClick = () => {
    navigate('/kontakt');
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  };
  const cooperatingCompanies = [{
    name: 'UDT',
    logo: '/lovable-uploads/fc113f21-4e0a-4b9a-aaf9-f22ad0623f9b.png'
  }, {
    name: 'TDT',
    logo: '/lovable-uploads/dff32973-25de-4c17-ac6c-7dee76c2c74c.png'
  }, {
    name: 'WDT',
    logo: '/lovable-uploads/948fd290-cefc-44e8-ae3c-da17e23070c6.png'
  }, {
    name: 'CPKZ Wrocław',
    logo: '/lovable-uploads/315270ba-0391-4053-b905-d77af15142b3.png'
  }, {
    name: 'PUP Wrocław',
    logo: '/lovable-uploads/def966ea-cd05-4d1d-98e5-bfb8ae149ca4.png'
  }, {
    name: 'SNTTI Silesia',
    logo: '/lovable-uploads/423c40ce-46fe-4fec-b39a-ee6d5ebab67c.png'
  }, {
    name: 'SEP',
    logo: '/lovable-uploads/94311598-c54a-4825-8c5a-7ab251653eef.png'
  }, {
    name: 'SPE International',
    logo: '/lovable-uploads/92b2e156-b02e-4e8a-bb36-ac007bdaa1b0.png'
  }];
  const registeredCompanies = [{
    name: 'Baza Usług Rozwojowych',
    logo: '/lovable-uploads/2a844adb-5302-4517-bd5f-905e3c293b9d.png'
  }, {
    name: 'Rejestr Instytucji Szkoleniowych (RIS)',
    logo: '/lovable-uploads/96cdbf5e-6c4a-4fed-8050-f2cf9a644c49.png'
  }];
  return <section className="py-20 bg-gradient-to-br from-orange-50 to-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/30 to-blue-100/20" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
              Dlaczego my?
            </span>
          </div>
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Dlaczego warto współpracować z Well-Done.pl?
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nasze doświadczenie i profesjonalne podejście gwarantują najwyższą jakość szkoleń.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <StatCard value={1200} label="Przeszkolonych osób" delay={0} />
          <StatCard value={80} label="Firm z którymi współpracujemy" delay={100} />
          <StatCard value={96} label="Średnia zdawalność" delay={200} />
          <StatCard value={500} label="Wydanych uprawnień" delay={300} />
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-orange-200 transform hover:scale-105"
              style={{
                opacity: 1,
                transform: 'translateY(0)',
                transition: 'all 0.4s ease-out',
                transitionDelay: `${index * 100}ms`
              }}
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Cooperating Companies Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Współpracujemy z:</h3>
            
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {cooperatingCompanies.map((company, index) => <div key={company.name} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 flex items-center justify-center min-w-[120px] h-[80px]" style={{
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.6s ease-out',
            transitionDelay: `${index * 100}ms`
          }}>
                <img src={company.logo} alt={`${company.name} logo`} className="max-w-full max-h-full object-contain" style={{
              maxWidth: '100px',
              maxHeight: '60px'
            }} onError={e => {
              console.error(`Failed to load logo for ${company.name}:`, company.logo);
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              // Show company name as fallback
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-text')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-text text-sm font-semibold text-gray-600';
                fallback.textContent = company.name;
                parent.appendChild(fallback);
              }
            }} onLoad={() => {
              console.log(`Successfully loaded logo for ${company.name}`);
            }} />
              </div>)}
          </div>
        </div>

        {/* Registered Companies Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Jesteśmy wpisani do:</h3>
            
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {registeredCompanies.map((company, index) => <div key={company.name} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-orange-200 flex items-center justify-center min-w-[180px] h-[100px]" style={{
            opacity: 1,
            transform: 'translateY(0)',
            transition: 'all 0.6s ease-out',
            transitionDelay: `${(cooperatingCompanies.length + index) * 100}ms`
          }}>
                <img src={company.logo} alt={`${company.name} logo`} className="max-w-full max-h-full object-contain" style={{
              maxWidth: '160px',
              maxHeight: '80px'
            }} onError={e => {
              console.error(`Failed to load logo for ${company.name}:`, company.logo);
              const target = e.currentTarget as HTMLImageElement;
              target.style.display = 'none';
              // Show company name as fallback
              const parent = target.parentElement;
              if (parent && !parent.querySelector('.fallback-text')) {
                const fallback = document.createElement('div');
                fallback.className = 'fallback-text text-sm font-semibold text-gray-600 text-center';
                fallback.textContent = company.name;
                parent.appendChild(fallback);
              }
            }} onLoad={() => {
              console.log(`Successfully loaded logo for ${company.name}`);
            }} />
              </div>)}
          </div>
        </div>


        {/* CTA */}
        <div className="text-center">
          <Button size="lg" className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white shadow-xl hover:shadow-2xl transform transition-all duration-300 hover:scale-105 text-lg px-8 py-4" onClick={handleContactClick}>
            Rozpocznij współpracę z nami
          </Button>
        </div>
      </div>
    </section>;
};
export default WhyChooseUsSection;