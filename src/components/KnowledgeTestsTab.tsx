
import React from 'react';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

const tests = [
  {
    title: "Test przygotowawczy - Wózki widłowe",
    description: "Test zawierający 20 pytań podobnych do tych, które mogą pojawić się na egzaminie UDT dla operatorów wózków widłowych.",
    questions: 20,
    difficulty: "Średni",
    link: "https://testy.well-done.pl/test-wozki-widlowe"
  },
  {
    title: "Test przygotowawczy - Suwnice",
    description: "Zestaw pytań testowych dla kandydatów przygotowujących się do egzaminu na uprawnienia do obsługi suwnic.",
    questions: 25,
    difficulty: "Zaawansowany",
    link: "https://testy.well-done.pl/test-suwnice"
  },
  {
    title: "Test przygotowawczy - SEP E1",
    description: "Przykładowy test sprawdzający wiedzę z zakresu uprawnień SEP E1 (eksploatacja urządzeń elektrycznych).",
    questions: 30,
    difficulty: "Zaawansowany",
    link: "https://testy.well-done.pl/test-sep-e1"
  },
  {
    title: "Test przygotowawczy - SEP E2",
    description: "Zestaw pytań przygotowujących do egzaminu na uprawnienia SEP E2 (urządzenia cieplne).",
    questions: 25,
    difficulty: "Średni",
    link: "https://testy.well-done.pl/test-sep-e2"
  }
];

const KnowledgeTestsTab: React.FC = () => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tests.map((test, index) => (
          <Card key={index} className="h-full flex flex-col hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader>
              <div className="flex justify-between items-center mb-2">
                <Badge variant="outline">Pytań: {test.questions}</Badge>
                <Badge 
                  variant={test.difficulty === "Łatwy" ? "outline" : test.difficulty === "Średni" ? "secondary" : "default"}
                  className={
                    test.difficulty === "Łatwy" 
                      ? "bg-green-100 text-green-800 hover:bg-green-100" 
                      : test.difficulty === "Średni" 
                      ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" 
                      : "bg-red-100 text-red-800 hover:bg-red-100"
                  }
                >
                  {test.difficulty}
                </Badge>
              </div>
              <CardTitle className="text-xl hover:text-orange-600 transition-colors">{test.title}</CardTitle>
              <CardDescription>{test.description}</CardDescription>
            </CardHeader>
            <CardFooter className="mt-auto">
              <Button asChild variant="outline" className="w-full hover:bg-orange-50 hover:border-orange-200">
                <a href={test.link} target="_blank" rel="noopener noreferrer">
                  Rozpocznij test <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center mt-8">
        <Button asChild variant="default" size="lg">
          <a href="https://testy.well-done.pl/" target="_blank" rel="noopener noreferrer">
            Zobacz wszystkie testy
          </a>
        </Button>
      </div>
    </div>
  );
};

export default KnowledgeTestsTab;
