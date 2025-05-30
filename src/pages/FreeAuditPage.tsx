
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuditHeroSection from './FreeAuditPage/components/AuditHeroSection';
import AnimatedBenefitsSection from './FreeAuditPage/components/AnimatedBenefitsSection';
import InteractiveProcessSection from './FreeAuditPage/components/InteractiveProcessSection';
import EnhancedTestimonialsSection from './FreeAuditPage/components/EnhancedTestimonialsSection';
import InteractiveContactForm from './FreeAuditPage/components/InteractiveContactForm';

const FreeAuditPage = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('audit-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <Navbar />
      <AuditHeroSection onCTAClick={scrollToForm} />
      <AnimatedBenefitsSection />
      <InteractiveProcessSection />
      <EnhancedTestimonialsSection />
      <div id="audit-form">
        <InteractiveContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default FreeAuditPage;
