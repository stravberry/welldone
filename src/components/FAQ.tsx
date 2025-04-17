
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
    <div className="py-12 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-8">{title}</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow">
              <AccordionTrigger className="px-6 py-4 hover:no-underline text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
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
