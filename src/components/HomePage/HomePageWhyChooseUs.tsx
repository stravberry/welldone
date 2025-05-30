
import React, { useRef } from 'react';
import { Award, Users, Clock, Shield } from 'lucide-react';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import { useStaggeredAnimation, useScrollAnimation } from '@/hooks/useScrollAnimation';

const StatCard: React.FC<{ value: number; label: string; delay: number }> = ({ value, label, delay }) => {
  const { elementRef, isInView } = useScrollAnimation<HTMLDivElement>();

  return (
    <div 
      ref={elementRef}
      className={`text-center transition-all duration-800 ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">
        {value}%
      </div>
      <div className="text-gray-600 text-sm lg:text-base">{label}</div>
    </div>
  );
};

const HomePageWhyChooseUs = () => {
  const statsRef = useRef<HTMLDivElement>(null);
  const { visibleItems, showAllFallback } = useStaggeredAnimation<HTMLDivElement>(4, 150);

  const benefits = [
    {
      title: "Doświadczeni instruktorzy",
      description: "Nasi trenerzy to praktycy z wieloletnim doświadczeniem w branży",
      icon: <Award className="h-12 w-12 text-orange-500" />
    },
    {
      title: "Zdawalność 96%",
      description: "Jeden z najwyższych wskaźników zdawalności w Polsce",
      icon: <Shield className="h-12 w-12 text-orange-500" />
    },
    {
      title: "Elastyczne terminy",
      description: "Dostosowujemy terminy szkoleń do potrzeb Twojej firmy",
      icon: <Clock className="h-12 w-12 text-orange-500" />
    },
    {
      title: "Kompleksowa obsługa",
      description: "Pomagamy w formalności związanych z uzyskaniem uprawnień",
      icon: <Users className="h-12 w-12 text-orange-500" />
    }
  ];

  return (
    <WhyChooseUsSection 
      benefits={benefits}
      statsRef={statsRef}
      visibleItems={visibleItems}
      StatCard={StatCard}
      showAllFallback={showAllFallback}
    />
  );
};

export default HomePageWhyChooseUs;
