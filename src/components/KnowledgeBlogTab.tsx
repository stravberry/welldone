
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useStaggeredAnimation } from '@/hooks/useScrollAnimation';

const blogPosts = [
  {
    title: "Najważniejsze zmiany w przepisach UDT na rok 2023",
    description: "Poznaj najważniejsze zmiany w przepisach UDT, które weszły w życie w 2023 roku i mają wpływ na firmy produkcyjne.",
    date: "10.03.2023",
    category: "Przepisy",
    image: "",
    link: "/wiedza/blog/1"
  },
  {
    title: "Jak przygotować się do egzaminu SEP - praktyczne wskazówki",
    description: "Sprawdzone metody i wskazówki, które pomogą w skutecznym przygotowaniu się do egzaminu SEP.",
    date: "25.04.2023",
    category: "Porady",
    image: "",
    link: "/wiedza/blog/2"
  },
  {
    title: "Bezpieczeństwo przy obsłudze suwnic - najczęstsze błędy",
    description: "Analiza najczęstszych błędów popełnianych podczas obsługi suwnic i sposoby ich unikania.",
    date: "15.06.2023",
    category: "Bezpieczeństwo",
    image: "",
    link: "/wiedza/blog/3"
  },
  {
    title: "Jak zoptymalizować koszty szkoleń w dużej firmie produkcyjnej",
    description: "Praktyczne metody optymalizacji kosztów szkoleń bez obniżania ich jakości i efektywności.",
    date: "30.07.2023",
    category: "Zarządzanie",
    image: "",
    link: "/wiedza/blog/4"
  },
  {
    title: "Wózki widłowe - nowe technologie i ich wpływ na szkolenia",
    description: "Jak nowe technologie w wózkach widłowych wpływają na programy szkoleniowe i wymagane umiejętności operatorów.",
    date: "12.09.2023",
    category: "Technologie",
    image: "",
    link: "/wiedza/blog/5"
  },
  {
    title: "Hybrydowe formy szkoleń - wady i zalety",
    description: "Analiza zalet i wad hybrydowych form szkoleń łączących elementy nauki online i stacjonarnej.",
    date: "05.11.2023",
    category: "Metodyka",
    image: "",
    link: "/wiedza/blog/6"
  }
];

const KnowledgeBlogTab: React.FC = () => {
  const { elementRef: blogRef, visibleItems: visibleBlogItems } = useStaggeredAnimation<HTMLDivElement>(6, 150);

  return (
    <div>
      <div ref={blogRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <Card 
            key={index} 
            className={`h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02] ${
              visibleBlogItems.includes(index) ? 'animate-fade-in opacity-100' : 'opacity-0'
            }`}
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: 'forwards'
            }}
          >
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline">{post.category}</Badge>
                <span className="text-sm text-gray-500">{post.date}</span>
              </div>
              <CardTitle className="text-xl hover:text-orange-600 transition-colors">{post.title}</CardTitle>
              <CardDescription>{post.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full hover:bg-orange-50 hover:border-orange-200">
                <Link to={post.link}>
                  Czytaj więcej <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="default" size="lg">
          <Link to="/wiedza/blog">Zobacz wszystkie artykuły</Link>
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeBlogTab;
