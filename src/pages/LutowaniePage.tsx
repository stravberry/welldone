
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';
import ContactForm from '@/components/ContactForm';
import LutowanieHeroSection from '@/pages/LutowaniePage/components/LutowanieHeroSection';
import LutowanieCoursesSection from '@/pages/LutowaniePage/components/LutowanieCoursesSection';
import LutowanieBenefitsSection from '@/pages/LutowaniePage/components/LutowanieBenefitsSection';
import LutowanieCTASection from '@/pages/LutowaniePage/components/LutowanieCTASection';

const LutowaniePage = () => {
  const { trackEvent } = useEventTracking();
  const [showAllItems, setShowAllItems] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  
  useScrollToTop();

  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const { elementRef: coursesRef, visibleItems: visibleCourses } = useStaggeredAnimation<HTMLDivElement>(3, 150);

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowAllItems(true);
    }, 2000);
    return () => clearTimeout(fallbackTimer);
  }, []);

  const courses = [
    {
      id: 'lutowanie-podstawowe',
      title: 'Podstawy lutowania',
      description: 'Kurs podstawowych technik lutowania dla początkujących.',
      duration: '16 godzin',
      participants: 'do 8 osób',
      price: '450 zł',
      features: ['Teoria lutowania', 'Praktyczne ćwiczenia', 'Narzędzia i materiały', 'Certyfikat ukończenia'],
      badge: 'Podstawowe',
      image: '/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png',
      imageAlt: 'Praktyczne szkolenie z lutowania elektroniki'
    },
    {
      id: 'lutowanie-zaawansowane',
      title: 'Zaawansowane techniki lutowania',
      description: 'Kurs dla doświadczonych - lutowanie SMD, BGA i mikrokomponenty.',
      duration: '24 godziny',
      participants: 'do 6 osób',
      price: '680 zł',
      features: ['Lutowanie SMD', 'Techniki BGA', 'Mikrokomponenty', 'Certyfikat eksperta'],
      badge: 'Zaawansowane',
      image: '/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png',
      imageAlt: 'Zaawansowane techniki lutowania SMD'
    },
    {
      id: 'lutowanie-przemyslowe',
      title: 'Lutowanie przemysłowe',
      description: 'Szkolenie z lutowania w produkcji przemysłowej i kontroli jakości.',
      duration: '20 godzin',
      participants: 'do 10 osób',
      price: '580 zł',
      features: ['Normy IPC', 'Kontrola jakości', 'Automatyzacja', 'Certyfikat IPC'],
      badge: 'Przemysłowe',
      image: '/lovable-uploads/22043640-06d9-401c-b993-f9112b218762.png',
      imageAlt: 'Lutowanie przemysłowe według norm IPC'
    }
  ];

  const handleCourseRegistration = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    const contactSection = document.getElementById('contact-form');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef} className="relative">
        <LutowanieHeroSection heroInView={heroInView} showAllItems={showAllItems} />
        
        {/* Large Background Soldering Icon */}
        <div className={`absolute -right-32 top-0 bottom-0 flex justify-end items-center transition-all duration-800 z-0 ${
          heroInView || showAllItems ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
        }`}>
          <svg
            width="1600"
            height="1600"
            viewBox="0 0 400 400"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-6"
          >
            <g className="text-red-200">
              {/* Soldering Iron Handle */}
              <rect x="80" y="180" width="120" height="20" rx="10" fill="currentColor" opacity="0.7"/>
              <rect x="85" y="185" width="110" height="10" rx="5" fill="currentColor" opacity="0.5"/>
              
              {/* Soldering Iron Tip */}
              <path d="M200 185 L240 190 L240 195 L200 200 Z" fill="currentColor" opacity="0.8"/>
              
              {/* Heat/Steam effect */}
              <path d="M240 180 Q250 175 245 170 Q255 165 250 160" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4"/>
              <path d="M245 185 Q255 180 250 175 Q260 170 255 165" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              <path d="M250 190 Q260 185 255 180 Q265 175 260 170" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.3"/>
              
              {/* Circuit board pattern being soldered */}
              <rect x="120" y="220" width="80" height="60" rx="5" fill="none" stroke="currentColor" strokeWidth="3" opacity="0.5"/>
              
              {/* Circuit traces */}
              <path d="M130 240 L190 240" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
              <path d="M130 250 L190 250" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
              <path d="M130 260 L190 260" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
              
              {/* Component symbols */}
              <rect x="140" y="235" width="10" height="10" fill="currentColor" opacity="0.7"/>
              <rect x="160" y="235" width="10" height="10" fill="currentColor" opacity="0.7"/>
              <circle cx="175" cy="255" r="4" fill="currentColor" opacity="0.7"/>
              <rect x="150" y="265" width="8" height="8" fill="currentColor" opacity="0.7"/>
              
              {/* Solder joints */}
              <circle cx="145" cy="240" r="2" fill="currentColor" opacity="0.8"/>
              <circle cx="165" cy="240" r="2" fill="currentColor" opacity="0.8"/>
              <circle cx="175" cy="250" r="2" fill="currentColor" opacity="0.8"/>
              <circle cx="155" cy="260" r="2" fill="currentColor" opacity="0.8"/>
              
              {/* Electronic component - resistor */}
              <rect x="280" y="120" width="20" height="8" rx="2" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
              <path d="M275 124 L280 124 M300 124 L305 124" stroke="currentColor" strokeWidth="2" opacity="0.6"/>
              
              {/* Electronic component - capacitor */}
              <path d="M320 140 L320 150" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
              <path d="M330 140 L330 150" stroke="currentColor" strokeWidth="3" opacity="0.6"/>
              <path d="M315 145 L320 145 M330 145 L335 145" stroke="currentColor" strokeWidth="2" opacity="0.5"/>
              
              {/* Wire connections */}
              <path d="M100 300 Q150 280 200 300 Q250 320 300 300" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.5"/>
              <path d="M110 320 Q160 300 210 320 Q260 340 310 320" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.4"/>
            </g>
          </svg>
        </div>
      </div>

      {/* Courses Section */}
      <div ref={coursesRef}>
        <LutowanieCoursesSection
          courses={courses}
          visibleCourses={visibleCourses}
          showAllItems={showAllItems}
          onCourseRegistration={handleCourseRegistration}
        />
      </div>

      {/* Benefits Section */}
      <LutowanieBenefitsSection />

      {/* Contact Form Section */}
      <div id="contact-form" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <ContactForm 
            title="Zapisz się na kurs lutowania"
            subtitle="Wypełnij formularz, a nasz konsultant skontaktuje się z Tobą w ciągu 24 godzin"
            initialMessage={selectedCourse ? `Jestem zainteresowany kursem ${selectedCourse}` : ''}
          />
        </div>
      </div>

      {/* CTA Section */}
      <LutowanieCTASection />

      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default LutowaniePage;
