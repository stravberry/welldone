
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText } from 'lucide-react';

const guides = [
  {
    title: "Kompendium wiedzy operatora wózka widłowego",
    description: "Kompleksowy przewodnik zawierający wszystkie niezbędne informacje dla operatorów wózków widłowych.",
    pages: 45,
    format: "PDF",
    link: "/files/kompendium-wozki-widlowe.pdf"
  },
  {
    title: "Poradnik przygotowania do egzaminu SEP",
    description: "Przewodnik krok po kroku, jak skutecznie przygotować się do egzaminu SEP i uzyskać uprawnienia.",
    pages: 32,
    format: "PDF",
    link: "/files/poradnik-sep.pdf"
  },
  {
    title: "Przewodnik BHP dla firm produkcyjnych",
    description: "Kompendium wiedzy z zakresu BHP dostosowane do specyfiki firm produkcyjnych.",
    pages: 60,
    format: "PDF",
    link: "/files/przewodnik-bhp.pdf"
  },
  {
    title: "Słownik pojęć technicznych związanych z urządzeniami transportu bliskiego",
    description: "Słownik zawierający definicje i wyjaśnienia pojęć związanych z urządzeniami transportu bliskiego.",
    pages: 25,
    format: "PDF",
    link: "/files/slownik-udt.pdf"
  }
];

const KnowledgeGuidesTab: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {guides.map((guide, index) => (
          <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline">{guide.format}</Badge>
                <Badge variant="secondary">{guide.pages} stron</Badge>
              </div>
              <CardTitle className="text-xl hover:text-orange-600 transition-colors">{guide.title}</CardTitle>
              <CardDescription>{guide.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full hover:bg-orange-50 hover:border-orange-200">
                <a href={guide.link} target="_blank" rel="noopener noreferrer">
                  Pobierz poradnik <FileText className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="default" size="lg">
          <Link to="/wiedza/poradniki">
            Zobacz wszystkie poradniki
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeGuidesTab;
