
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from "sonner";
import useEventTracking from '@/hooks/useEventTracking';
import { supabase } from '@/integrations/supabase/client';
import HeroSection from './udt/components/HeroSection';
import OfferingsSection from './udt/components/OfferingsSection';
import WhyChooseUsSection from './udt/components/WhyChooseUsSection';
import ProcessSection from './udt/components/ProcessSection';
import TestimonialsSection from './udt/components/TestimonialsSection';
import ComparisonTableSection from './udt/components/ComparisonTableSection';
import FAQSection from './udt/components/FAQSection';
import ContactFormSection from './udt/components/ContactFormSection';
import FinalCTASection from './udt/components/FinalCTASection';
import NavigationMenu from './udt/components/NavigationMenu';
import type { FormData } from './udt/types';

const UdtLandingPage = () => {
  const { trackEvent } = useEventTracking();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    trackEvent({
      category: 'form',
      action: 'input',
      label: `udt-landing-form-field-${name}`,
      additionalData: {
        fieldName: name,
        formType: 'UDT Landing Contact'
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    trackEvent({
      category: 'form',
      action: 'submit',
      label: 'udt-landing-contact-form',
      additionalData: {
        formType: 'UDT Landing Contact',
        formLocation: window.location.pathname
      }
    });

    try {
      const response = await supabase.functions.invoke('send-contact-email', {
        body: formData
      });

      if (response.error) {
        throw new Error(response.error.message);
      }
      
      toast.success("Dziękujemy! Wkrótce się z Tobą skontaktujemy.");
      
      setFormData({
        name: '',
        company: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error("Przepraszamy, wystąpił błąd. Spróbuj ponownie później.");
    }
  };

  const trackCTAClick = (ctaName: string, destinationId?: string) => {
    trackEvent({
      category: 'button',
      action: 'click',
      label: `udt-landing-${ctaName}`,
      additionalData: {
        buttonLocation: 'UDT Landing Page',
        destinationId: destinationId || null
      }
    });
    
    if (destinationId) {
      document.getElementById(destinationId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const trackLinkClick = (linkName: string) => {
    trackEvent({
      category: 'navigation',
      action: 'click',
      label: `udt-landing-${linkName}`,
      additionalData: {
        linkLocation: 'UDT Landing Page Nav'
      }
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Szkolenia UDT i Kursy Operatorów - Najwyższa Zdawalność | Well-done</title>
        <meta name="description" content="Profesjonalne szkolenia na uprawnienia UDT dla operatorów - wózki widłowe, podesty ruchome, suwnice. Zdawalność 96%. Szkolenia w całej Polsce." />
        <meta name="keywords" content="szkolenia UDT, uprawnienia UDT, kursy operatorów, wózki widłowe, podesty ruchome, suwnice, operator wózka widłowego" />
        <meta property="og:title" content="Szkolenia UDT i Kursy Operatorów - Najwyższa Zdawalność | Well-done" />
        <meta property="og:description" content="Profesjonalne szkolenia na uprawnienia UDT dla operatorów - wózki widłowe, podesty ruchome, suwnice. Zdawalność 96%. Szkolenia w całej Polsce." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://well-done.pl/udt-szkolenia" />
        <meta property="og:image" content="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" />
        <link rel="canonical" href="https://well-done.pl/udt-szkolenia" />
      </Helmet>
      
      <NavigationMenu trackLinkClick={trackLinkClick} trackCTAClick={trackCTAClick} />
      
      {/* Add margin-top to account for fixed navigation */}
      <div className="pt-16">
        <HeroSection 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          trackCTAClick={trackCTAClick}
        />
        
        <OfferingsSection trackCTAClick={trackCTAClick} />

        <WhyChooseUsSection trackCTAClick={trackCTAClick} />

        <ProcessSection trackCTAClick={trackCTAClick} />

        <TestimonialsSection />

        <ComparisonTableSection trackCTAClick={trackCTAClick} />

        <FAQSection trackCTAClick={trackCTAClick} />

        <ContactFormSection 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          trackCTAClick={trackCTAClick}
        />

        <FinalCTASection trackCTAClick={trackCTAClick} />
      </div>
    </div>
  );
};

export default UdtLandingPage;
