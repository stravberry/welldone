
import React from 'react';
import FAQ from '@/components/FAQ';

const HomePageFAQ = () => {
  const faqItems = [
    {
      question: "Jakie szkolenia oferujecie?",
      answer: "Oferujemy szkolenia UDT dla operatorów i konserwatorów, uprawnienia SEP, kursy lutowania oraz eventy edukacyjne. Wszystkie szkolenia prowadzone są przez doświadczonych instruktorów."
    },
    {
      question: "Jak długo trwają szkolenia UDT?",
      answer: "Czas trwania szkoleń UDT zależy od rodzaju kursu. Zazwyczaj szkolenia trwają od 2 do 5 dni, obejmując część teoretyczną i praktyczną zakończoną egzaminem."
    },
    {
      question: "Czy prowadzicie szkolenia w firmach?",
      answer: "Tak, oferujemy szkolenia w siedzibie klienta dla grup minimum 8 osób. Przyjeżdżamy z własnym sprzętem szkoleniowym i dostosowujemy program do potrzeb firmy."
    },
    {
      question: "Jakie są koszty szkoleń?",
      answer: "Koszty szkoleń zależą od rodzaju kursu, liczby uczestników i lokalizacji. Skontaktuj się z nami, aby otrzymać bezpłatną wycenę dostosowaną do Twoich potrzeb."
    },
    {
      question: "Czy oferujecie wsparcie po szkoleniu?",
      answer: "Tak, pomagamy w formalnościach związanych z uzyskaniem uprawnień oraz oferujemy wsparcie techniczne naszym absolwentom."
    }
  ];

  return <FAQ title="Najczęściej zadawane pytania" items={faqItems} />;
};

export default HomePageFAQ;
