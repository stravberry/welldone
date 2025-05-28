
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TeamMember {
  name: string;
  role: string;
  description: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Adam Nowak",
    role: "Główny Trener UDT",
    description: "Specjalista z 15-letnim doświadczeniem w szkoleniach operatorów urządzeń transportu bliskiego."
  },
  {
    name: "Marta Kowalska",
    role: "Ekspert ds. Szkoleń SEP",
    description: "Ceryfikowany trener z zakresu uprawnień elektrycznych, cieplnych i gazowych."
  },
  {
    name: "Piotr Wiśniewski",
    role: "Konsultant ds. BHP",
    description: "Doświadczony praktyk z zakresu bezpieczeństwa w zakładach produkcyjnych."
  },
  {
    name: "Anna Jabłońska",
    role: "Koordynator Szkoleń",
    description: "Odpowiada za organizację i sprawny przebieg wszystkich szkoleń i certyfikacji."
  }
];

const AnimatedTeamSection = () => {
  const { elementRef: headerRef, isInView: headerInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  return (
    <section className="py-16 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          ref={headerRef}
          className="text-center mb-12"
          style={{
            opacity: headerInView ? 1 : 0,
            transform: headerInView ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform, opacity'
          }}
        >
          <h2 className="text-3xl font-bold mb-4">Nasz Zespół</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nasz zespół to wykwalifikowani specjaliści, którzy od lat wspierają firmy produkcyjne w podnoszeniu kompetencji ich pracowników.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, index) => (
            <TeamMemberCard key={index} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

interface TeamMemberCardProps {
  member: TeamMember;
  index: number;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ member, index }) => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  // Check if user prefers reduced motion
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div 
      ref={elementRef}
      className="bg-white rounded-xl shadow-md hover:shadow-xl p-6 text-center group transition-all duration-300 md:hover:scale-105 md:hover:-translate-y-2"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transition: prefersReducedMotion ? 'opacity 0.3s ease' : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: prefersReducedMotion ? '0ms' : (isInView ? `${index * (isMobile ? 100 : 150)}ms` : '0ms'),
        willChange: 'transform, opacity'
      }}
    >
      <div className="w-20 md:w-24 h-20 md:h-24 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white flex items-center justify-center text-lg md:text-2xl font-bold mx-auto mb-4 md:group-hover:scale-110 transition-transform duration-300 shadow-lg">
        {member.name.split(' ').map(n => n[0]).join('')}
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 group-hover:text-orange-600 transition-colors duration-300">
        {member.name}
      </h3>
      <p className="text-orange-600 mb-4 font-medium text-sm md:text-base">{member.role}</p>
      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300 text-sm md:text-base">
        {member.description}
      </p>
    </div>
  );
};

export default AnimatedTeamSection;
