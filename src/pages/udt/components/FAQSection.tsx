
import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface FAQSectionProps {
  trackCTAClick: (ctaName: string, destinationId?: string) => void;
}

const FAQSection: React.FC<FAQSectionProps> = ({ trackCTAClick }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLDivElement>();
  const { elementRef: faqRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(5, 150);

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
    <section id="faq" className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center mb-12 sm:mb-16 transition-all duration-1000 ${
            titleInView ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}
        >
          <span className="text-orange-600 font-medium text-sm sm:text-base animate-pulse-slow">FAQ</span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mt-2 mb-4">Najczęściej zadawane pytania o szkolenia UDT</h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            Odpowiadamy na najczęstsze pytania dotyczące szkoleń i uprawnień UDT we Wrocławiu i okolicach
          </p>
        </div>
        
        <div ref={faqRef} className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <Accordion type="single" collapsible className="w-full space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className={`border border-gray-200 rounded-lg bg-white shadow-sm transition-all duration-700 hover:shadow-lg hover:border-orange-200 group ${
                  visibleItems.includes(index) 
                    ? 'animate-fade-in-up opacity-100' 
                    : 'opacity-0 translate-y-5'
                }`}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <AccordionTrigger className="text-base sm:text-lg font-medium text-left px-4 sm:px-6 py-3 sm:py-4 hover:no-underline transition-all duration-300 group-hover:text-orange-600 group-hover:bg-orange-50/50">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-4 sm:px-6 pb-3 sm:pb-4 pt-1 sm:pt-2 text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center">
          <p className="text-gray-700 mb-4 text-sm sm:text-base">Nie znalazłeś odpowiedzi na swoje pytanie o szkolenia UDT?</p>
          <Button 
            size="lg"
            className="bg-orange-600 hover:bg-orange-700 text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
