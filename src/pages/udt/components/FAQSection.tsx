
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ trackCTAClick }) => {
  const faqs = [
    {
      question: "Jak długo trwa szkolenie na uprawnienia UDT we Wrocławiu?",
      answer: "Czas trwania szkolenia zależy od rodzaju kursu. Szkolenia na wózki widłowe trwają zazwyczaj 2-3 dni, na podesty ruchome 2 dni, a na suwnice 3 dni. Każdy kurs obejmuje część teoretyczną i praktyczną. Organizujemy kursy we Wrocławiu i okolicach."
    },
    {
      question: "Czy muszę mieć jakieś doświadczenie przed przystąpieniem do kursu UDT?",
      answer: "Nie, nasze szkolenia UDT są dostępne zarówno dla początkujących, jak i osób z doświadczeniem. Instruktorzy dostosowują tempo nauki do indywidualnych potrzeb uczestników."
    },
    {
      question: "Jak wygląda egzamin UDT i gdzie się odbywa?",
      answer: "Egzamin UDT składa się z części teoretycznej (test) i praktycznej (pokaz umiejętności obsługi urządzenia). Odbywają się one tego samego dnia. Aby zdać, należy uzyskać pozytywny wynik z obu części. Egzaminy organizujemy we Wrocławiu i okolicach."
    },
    {
      question: "Jak długo ważne są uprawnienia UDT?",
      answer: "Uprawnienia UDT dla operatorów są ważne przez 5 lat. Po tym czasie należy przejść szkolenie przypominające i odnowić uprawnienia, przystępując ponownie do egzaminu."
    },
    {
      question: "Czy prowadzicie szkolenia UDT w całym województwie dolnośląskim?",
      answer: "Tak, organizujemy szkolenia UDT we Wrocławiu i całym województwie dolnośląskim. Możliwy jest dojazd instruktora do firmy klienta w przypadku szkoleń grupowych."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-orange-600 font-medium">FAQ</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">Najczęściej zadawane pytania o szkolenia UDT</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Odpowiadamy na najczęstsze pytania dotyczące szkoleń i uprawnień UDT we Wrocławiu i okolicach
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto mb-12">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center">
          <p className="text-gray-700 mb-4">Nie znalazłeś odpowiedzi na swoje pytanie o szkolenia UDT?</p>
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700"
            onClick={() => trackCTAClick('faq-contact', 'contact-form')}
          >
            Skontaktuj się z nami
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
