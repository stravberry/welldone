
import React from 'react';
import { Button } from '@/components/ui/button';
import { Star, Play, TrendingUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const KnowledgeHeroSection: React.FC = () => {
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <section ref={heroRef} className="relative bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-5 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white opacity-5 rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className={`transition-all duration-1000 ${heroInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center justify-center mb-4">
              <Star className="mr-2" size={32} />
              <h1 className="text-5xl md:text-6xl font-bold">Strefa Wiedzy</h1>
              <Star className="ml-2" size={32} />
            </div>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 leading-relaxed">
              Odkryj praktyczne poradniki, obejrzyj najnowsze filmy szkoleniowe i przetestuj swoją wiedzę 
              z zakresu UDT i SEP. Wszystko w jednym miejscu!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-semibold">
                <Play className="mr-2" size={20} />
                Obejrzyj najnowsze filmy
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-600 font-semibold">
                <TrendingUp className="mr-2" size={20} />
                Zobacz popularne treści
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default KnowledgeHeroSection;
