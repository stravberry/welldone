
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from "sonner";
import useEventTracking from '@/hooks/useEventTracking';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
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

  const handleOfferingSelect = (offeringTitle: string) => {
    setFormData(prev => ({ 
      ...prev, 
      message: `Jestem zainteresowany szkoleniem: ${offeringTitle}` 
    }));
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
      
      // Track successful form submission for GTM
      if (window.dataLayer) {
        window.dataLayer.push({
          'event': 'success_sent_form'
        });
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

  // Structured Data for Local Business and Courses
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://well-done.pl/udt-szkolenia#business",
        "name": "Well-done - Szkolenia UDT Wrocław",
        "description": "Profesjonalne szkolenia UDT we Wrocławiu i okolicach - wózki widłowe, podesty ruchome, suwnice. Zdawalność 96%.",
        "url": "https://well-done.pl/udt-szkolenia",
        "telephone": "+48123456789",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Wrocław",
          "addressRegion": "Dolnośląskie",
          "addressCountry": "PL"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "51.1079",
          "longitude": "17.0385"
        },
        "areaServed": [
          {
            "@type": "City",
            "name": "Wrocław"
          },
          {
            "@type": "State",
            "name": "Dolnośląskie"
          }
        ],
        "serviceType": ["Szkolenia UDT", "Kursy operatorów", "Szkolenia wózków widłowych", "Szkolenia podestów ruchomych", "Szkolenia suwnic"]
      },
      {
        "@type": "Course",
        "@id": "https://well-done.pl/udt-szkolenia#course",
        "name": "Szkolenia UDT dla Operatorów - Wrocław",
        "description": "Kompleksowe szkolenia na uprawnienia UDT: wózki widłowe, podesty ruchome, suwnice, układnice magazynowe",
        "provider": {
          "@id": "https://well-done.pl/udt-szkolenia#business"
        },
        "courseMode": "offline",
        "locationCreated": {
          "@type": "Place",
          "name": "Wrocław, Dolnośląskie"
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>Szkolenia UDT Wrocław i Okolice - Kursy Operatorów 96% Zdawalność | Well-done</title>
        <meta name="description" content="Profesjonalne szkolenia UDT we Wrocławiu i okolicach - wózki widłowe, podesty ruchome, suwnice, układnice. Zdawalność 96%. Kursy operatorów w całym województwie dolnośląskim." />
        <meta name="keywords" content="szkolenia UDT Wrocław, kursy operatorów Wrocław, uprawnienia UDT dolnośląskie, wózki widłowe Wrocław, podesty ruchome szkolenia, suwnice kursy, operator wózka widłowego Wrocław, szkolenia UDT okolice Wrocławia, kursy UDT dolny śląsk" />
        
        {/* Geographic targeting */}
        <meta name="geo.region" content="PL-DS" />
        <meta name="geo.placename" content="Wrocław" />
        <meta name="geo.position" content="51.1079;17.0385" />
        <meta name="ICBM" content="51.1079, 17.0385" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Szkolenia UDT Wrocław i Okolice - Kursy Operatorów 96% Zdawalność | Well-done" />
        <meta property="og:description" content="Profesjonalne szkolenia UDT we Wrocławiu i okolicach - wózki widłowe, podesty ruchome, suwnice, układnice. Zdawalność 96%. Kursy operatorów w całym województwie dolnośląskim." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://well-done.pl/udt-szkolenia" />
        <meta property="og:image" content="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Well-done" />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Szkolenia UDT Wrocław i Okolice - Kursy Operatorów 96% Zdawalność" />
        <meta name="twitter:description" content="Profesjonalne szkolenia UDT we Wrocławiu i okolicach - wózki widłowe, podesty ruchome, suwnice, układnice. Zdawalność 96%." />
        <meta name="twitter:image" content="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" />
        
        {/* Canonical and hreflang */}
        <link rel="canonical" href="https://well-done.pl/udt-szkolenia" />
        <link rel="alternate" hrefLang="pl" href="https://well-done.pl/udt-szkolenia" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <Navbar />
      
      <NavigationMenu trackLinkClick={trackLinkClick} trackCTAClick={trackCTAClick} />
      
      {/* Add margin-top to account for fixed navigation */}
      <div className="pt-16">
        <HeroSection 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          trackCTAClick={trackCTAClick}
        />
        
        <OfferingsSection 
          trackCTAClick={trackCTAClick} 
          onOfferingSelect={handleOfferingSelect}
        />

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
