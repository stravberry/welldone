
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { Clock, Users, Target, CheckCircle, Award, Briefcase, LucideProps } from 'lucide-react';

interface AdvantageCard {
  icon: React.ComponentType<LucideProps>;
  title: string;
  description: string;
  gradient: string;
}

const advantages: AdvantageCard[] = [
  {
    icon: Clock,
    title: "Elastyczność",
    description: "Dostosowujemy terminy i formę szkoleń do indywidualnych potrzeb i harmonogramu Twojej firmy.",
    gradient: "from-blue-500 to-blue-600"
  },
  {
    icon: Users,
    title: "Specjalizacja",
    description: "Specjalizujemy się wyłącznie we współpracy z firmami produkcyjnymi, co pozwala nam lepiej rozumieć ich wyzwania i potrzeby.",
    gradient: "from-purple-500 to-purple-600"
  },
  {
    icon: Target,
    title: "Bezpłatny audyt",
    description: "Oferujemy bezpłatny audyt, który pozwala firmom ocenić, czy aktualnie przepłacają za szkolenia i uprawnienia pracowników.",
    gradient: "from-green-500 to-green-600"
  },
  {
    icon: CheckCircle,
    title: "Kompleksowa obsługa",
    description: "Zapewniamy pełną obsługę – od organizacji szkoleń, po finalne uzyskanie uprawnień przez pracowników.",
    gradient: "from-orange-500 to-orange-600"
  },
  {
    icon: Award,
    title: "Doświadczenie",
    description: "Posiadamy wieloletnie doświadczenie w branży szkoleniowej i certyfikacyjnej.",
    gradient: "from-red-500 to-red-600"
  },
  {
    icon: Briefcase,
    title: "Różnorodność szkoleń",
    description: "Oferujemy szeroki zakres szkoleń – od UDT, przez SEP, po szkolenia specjalistyczne.",
    gradient: "from-indigo-500 to-indigo-600"
  }
];

const AnimatedAdvantagesSection = () => {
  const { elementRef: headerRef, isInView: headerInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange-100 rounded-full -translate-x-36 -translate-y-36 opacity-50" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full translate-x-48 translate-y-48 opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Na co stawiamy i co nas wyróżnia
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Wyróżniamy się elastycznością i zdolnością adaptacji do potrzeb klienta. Oferujemy szkolenia dostosowane do harmonogramu firm, możliwość szkoleń stacjonarnych, online oraz hybrydowych.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((advantage, index) => (
            <AdvantageCard key={index} advantage={advantage} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface AdvantageCardProps {
  advantage: AdvantageCard;
  index: number;
}

const AdvantageCard: React.FC<AdvantageCardProps> = ({ advantage, index }) => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.3,
    triggerOnce: true
  });

  const IconComponent = advantage.icon;

  return (
    <div 
      ref={elementRef}
      className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer overflow-hidden"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: isInView ? `${index * 150}ms` : '0ms'
      }}
    >
      {/* Background gradient overlay on hover */}
      <div className={`absolute inset-0 bg-gradient-to-br ${advantage.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-2xl`} />
      
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gray-100 rounded-full -translate-y-6 translate-x-6 group-hover:scale-150 transition-transform duration-500" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <div className={`bg-gradient-to-br ${advantage.gradient} rounded-xl p-4 mr-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg`}>
            <IconComponent size={32} className="text-white" />
          </div>
          <h3 className="font-bold text-xl text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
            {advantage.title}
          </h3>
        </div>
        <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
          {advantage.description}
        </p>
      </div>
      
      {/* Hover border effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${advantage.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500`} 
           style={{ 
             background: `linear-gradient(45deg, transparent 48%, currentColor 49%, currentColor 51%, transparent 52%)`,
             backgroundSize: '20px 20px'
           }} 
      />
    </div>
  );
};

export default AnimatedAdvantagesSection;
