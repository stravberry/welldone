
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface FAQ {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const { elementRef: faqRef, isInView: faqInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });

  const faqs: FAQ[] = [
    {
      question: 'Jak długo trwa szkolenie na uprawnienia UDT?',
      answer: 'Długość szkolenia zależy od rodzaju urządzenia. Zazwyczaj trwa od 12 do 20 godzin, obejmując zarówno część teoretyczną jak i praktyczną.'
    },
    {
      question: 'Czy mogę uczestniczyć w szkoleniu bez doświadczenia?',
      answer: 'Tak! Nasze szkolenia są dostosowane również dla osób bez wcześniejszego doświadczenia. Zaczynamy od podstaw i stopniowo przechodzimy do zaawansowanych zagadnień.'
    },
    {
      question: 'Jak wygląda egzamin UDT?',
      answer: 'Egzamin składa się z części teoretycznej (test pisemny) oraz praktycznej (zadania na urządzeniu). Nasi instruktorzy przygotują Cię do obu części.'
    },
    {
      question: 'Czy uprawnienia są ważne w całej Polsce?',
      answer: 'Tak, uprawnienia UDT wydawane przez Urząd Dozoru Technicznego są ważne na terenie całej Polski.'
    },
    {
      question: 'Co się dzieje, jeśli nie zdam egzaminu za pierwszym razem?',
      answer: 'Oferujemy bezpłatny egzamin poprawkowy oraz dodatkowe zajęcia wyrównawcze, aby zapewnić Ci sukces.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <div ref={faqRef} className="max-w-4xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Najczęściej zadawane pytania
        </h2>
        <p className="text-lg text-gray-600">
          Znajdź odpowiedzi na najważniejsze pytania dotyczące naszych szkoleń
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={index} 
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-500 ${
              faqInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            }`}
            style={{
              transitionDelay: `${index * 100}ms`
            }}
          >
            <button 
              className="w-full p-6 text-left flex justify-between items-center hover:bg-orange-50 transition-colors duration-200"
              onClick={() => toggleFAQ(index)}
            >
              <h3 className="text-lg font-semibold text-gray-900 pr-4">{faq.question}</h3>
              {openFAQ === index ? 
                <ChevronUp className="h-5 w-5 text-orange-600 flex-shrink-0" /> : 
                <ChevronDown className="h-5 w-5 text-orange-600 flex-shrink-0" />
              }
            </button>
            {openFAQ === index && (
              <div className="px-6 pb-6">
                <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQSection;
