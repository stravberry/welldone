
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  title?: string;
  items: FAQItem[];
}

const FAQ: React.FC<FAQProps> = ({ title = "Najczęściej zadawane pytania", items }) => {
  const { elementRef: titleRef, isInView: titleInView } = useScrollAnimation<HTMLHeadingElement>({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: false
  });
  
  const { elementRef: itemsRef, visibleItems } = useStaggeredAnimation<HTMLDivElement>(items.length, 100);

  console.log('FAQ Debug:', {
    titleInView,
    visibleItems,
    itemsLength: items.length
  });

  return (
    <div className="py-8 sm:py-12 lg:py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 
          ref={titleRef}
          className={`text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8 lg:mb-12 transition-all duration-700 ${
            titleInView ? 'opacity-100 translate-y-0' : 'opacity-100 translate-y-0'
          }`}
        >
          {title}
        </h2>
        <div ref={itemsRef}>
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {items.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className={`bg-white rounded-lg shadow-sm border border-gray-100 transition-all duration-500 hover:shadow-md hover:border-gray-200 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-100 translate-y-0'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <AccordionTrigger className="px-4 sm:px-6 py-3 sm:py-4 hover:no-underline text-left text-sm sm:text-base lg:text-lg font-medium transition-colors duration-300 hover:text-orange-600">
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
    </div>
  );
};

export default FAQ;
