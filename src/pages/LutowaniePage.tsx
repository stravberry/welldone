
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
      <div ref={heroRef}>
        <LutowanieHeroSection heroInView={heroInView} showAllItems={showAllItems} />
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
