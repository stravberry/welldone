
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ title = "Najczęściej zadawane pytania", items }) => {
  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12">{title}</h2>
        <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-100">
              <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline text-left text-sm sm:text-base lg:text-lg font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 pt-1 sm:pt-2 text-gray-600 text-sm sm:text-base leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
};

export default FAQ;
