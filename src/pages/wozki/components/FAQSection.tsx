
import React from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: sectionRef, isInView: sectionInView } = useScrollAnimation<HTMLDivElement>();

  const faqs = [
    {
      question: "Jakie są wymagania, aby uczestniczyć w szkoleniu wózków unoszących?",
      answer: "Uczestnik musi mieć ukończone 18 lat, wykształcenie minimum podstawowe oraz ważne badania lekarskie orzekające o braku przeciwwskazań do pracy na wysokości. Wymagane jest także podstawowe doświadczenie w obsłudze maszyn."
    },
    {
      question: "Ile trwa szkolenie na operatora wózka unoszącego?",
      answer: "Standardowe szkolenie trwa od 16 do 24 godzin w zależności od typu wózka. Szkolenie składa się z części teoretycznej (8h) i praktycznej (8-16h), zakończone egzaminem państwowym UDT."
    },
    {
      question: "Czy mogę prowadzić wszystkie typy wózków unoszących z jednym certyfikatem?",
      answer: "Nie, każdy typ wózka unoszącego wymaga oddzielnych uprawnień. Można jednak łączyć szkolenia i zdobywać uprawnienia na kilka typów jednocześnie, co jest często bardziej ekonomiczne."
    },
    {
      question: "Jak długo ważne są uprawnienia UDT na wózki unoszące?",
      answer: "Uprawnienia UDT są ważne przez 10 lat od daty wydania. Przed upływem tego terminu należy przejść szkolenie okresowe i zdać egzamin uzupełniający."
    },
    {
      question: "Co się dzieje, jeśli nie zdam egzaminu za pierwszym razem?",
      answer: "W przypadku niezdania egzaminu, można przystąpić do niego ponownie po dodatkowym przeszkoleniu. Oferujemy bezpłatne powtórzenie egzaminu w ramach naszej gwarancji zdawalności."
    },
    {
      question: "Czy prowadzicie szkolenia w firmach?",
      answer: "Tak, oferujemy szkolenia w siedzibie klienta dla grup minimum 8 osób. Przyjeżdżamy z własnym sprzętem szkoleniowym i dostosowujemy program do specyfiki Państwa działalności."
    },
    {
      question: "Jakie dokumenty otrzymam po ukończeniu szkolenia?",
      answer: "Po zdanym egzaminie otrzymasz legitymację operatora wydaną przez UDT, zaświadczenie o ukończeniu kursu oraz materiały szkoleniowe do dalszego wykorzystania."
    },
    {
      question: "Czy można finansować szkolenie ze środków PFRON lub innych dotacji?",
      answer: "Tak, nasze szkolenia mogą być finansowane z różnych źródeł dotacyjnych, w tym PFRON, PUP czy środków europejskich. Pomożemy w przygotowaniu odpowiedniej dokumentacji."
    }
  ];

  return (
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={sectionRef}
          className={`transition-all duration-800 ${
            sectionInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="text-center mb-12 sm:mb-16">
            <span className="text-blue-600 font-medium text-sm sm:text-base">Często zadawane pytania</span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Odpowiedzi na najważniejsze pytania</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Znajdź odpowiedzi na najczęściej zadawane pytania dotyczące szkoleń wózków unoszących
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`item-${index}`}
                  className="bg-gray-50 rounded-lg px-6 border-none"
                >
                  <AccordionTrigger className="text-left hover:no-underline hover:text-blue-600 font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="text-center mt-12">
              <p className="text-gray-600 mb-6">Nie znalazłeś odpowiedzi na swoje pytanie?</p>
              <Button 
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                onClick={() => trackCTAClick('faq-contact', 'contact-form')}
              >
                Skontaktuj się z nami
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
