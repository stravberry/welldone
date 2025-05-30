
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';
import Navbar from '@/components/Navbar';
import LutowanieHeroSection from './LutowaniePage/components/LutowanieHeroSection';
import LutowanieCoursesSection from './LutowaniePage/components/LutowanieCoursesSection';
import LutowanieBenefitsSection from './LutowaniePage/components/LutowanieBenefitsSection';
import LutowanieCTASection from './LutowaniePage/components/LutowanieCTASection';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const LutowaniePage = () => {
  const { trackEvent } = useEventTracking();
  const [showAllItems, setShowAllItems] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });
  
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    trackEvent({
      category: 'form',
      action: 'submit',
      label: 'lutowanie-contact-form'
    });
  };

  const scrollToContactForm = (courseName: string) => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
      setFormData(prev => ({
        ...prev,
        message: `Jestem zainteresowany kursem ${courseName}`
      }));
    }
  };

  const handleContactClick = () => {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Navbar />
      
      {/* Hero Section */}
      <div ref={heroRef}>
        <LutowanieHeroSection 
          heroInView={heroInView}
          showAllItems={showAllItems}
          onContactClick={handleContactClick}
        />
      </div>

      {/* Courses Section */}
      <div ref={coursesRef}>
        <LutowanieCoursesSection 
          visibleCourses={visibleCourses}
          showAllItems={showAllItems}
          onCourseSelect={scrollToContactForm}
        />
      </div>

      {/* Benefits Section */}
      <LutowanieBenefitsSection />

      {/* CTA Section */}
      <LutowanieCTASection onContactClick={handleContactClick} />

      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default LutowaniePage;
