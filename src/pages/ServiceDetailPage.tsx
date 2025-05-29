
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useScrollAnimation, useStaggeredAnimation } from '@/hooks/useScrollAnimation';
import useEventTracking from '@/hooks/useEventTracking';
import useScrollToTop from '@/hooks/useScrollToTop';
import { toast } from 'sonner';

// Component imports
import HeroSection from './ServiceDetailPage/components/HeroSection';
import CoursesSection from './ServiceDetailPage/components/CoursesSection';
import BenefitsSection from './ServiceDetailPage/components/BenefitsSection';
import FAQSection from './ServiceDetailPage/components/FAQSection';
import CTASection from './ServiceDetailPage/components/CTASection';
import ContactFormSection from './ServiceDetailPage/components/ContactFormSection';

interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

const ServiceDetailPage = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
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

  // Animation hooks with better fallbacks
  const { elementRef: heroRef, isInView: heroInView } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: true
  });
  const { elementRef: coursesRef, visibleItems: visibleCourses } = useStaggeredAnimation<HTMLDivElement>(4, 150);

  // Fallback mechanism - show all items after 3 seconds
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowAllItems(true);
    }, 3000);

    return () => clearTimeout(fallbackTimer);
  }, []);

  const handleCourseClick = (courseId: string) => {
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `udt-course-${courseId}`,
      additionalData: {
        courseId,
        page: 'service-detail'
      }
    });
  };

  const handleCourseEnrollment = (courseTitle: string) => {
    setFormData(prev => ({ 
      ...prev, 
      message: `Jestem zainteresowany szkoleniem: ${courseTitle}` 
    }));
    
    trackEvent({
      category: 'engagement',
      action: 'click',
      label: `enroll-course-${courseTitle}`,
      additionalData: {
        courseTitle,
        page: 'service-detail'
      }
    });

    // Scroll to contact form
    document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    toast.success("Formularz został wysłany! Skontaktujemy się wkrótce.");
    setFormData({
      name: '',
      company: '',
      email: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div ref={heroRef}>
        <HeroSection 
          heroInView={heroInView}
          showAllItems={showAllItems}
          onEnrollClick={handleCourseEnrollment}
        />
      </div>

      {/* Courses Section */}
      <div ref={coursesRef}>
        <CoursesSection 
          visibleCourses={visibleCourses}
          showAllItems={showAllItems}
          onCourseClick={handleCourseClick}
          onCourseEnrollment={handleCourseEnrollment}
        />
      </div>

      {/* Benefits Section */}
      <BenefitsSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Contact Form Section */}
      <ContactFormSection 
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      {/* CTA Section */}
      <CTASection onContactClick={() => handleCourseEnrollment('Uprawnienia UDT dla operatorów')} />

      {/* Floating Back Button */}
      <Link 
        to="/uslugi" 
        className="fixed bottom-6 left-6 bg-orange-600 text-white p-3 rounded-full shadow-lg hover:bg-orange-700 hover:scale-110 transition-all duration-300 z-50"
      >
        <ArrowLeft className="h-6 w-6" />
      </Link>
    </div>
  );
};

export default ServiceDetailPage;
