
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { toast } from "sonner";
import useEventTracking from '@/hooks/useEventTracking';
import { supabase } from '@/integrations/supabase/client';
import WozkiHeroSection from './wozki/components/WozkiHeroSection';
import WozkiOfferingsSection from './wozki/components/WozkiOfferingsSection';
import SafetySection from './wozki/components/SafetySection';
import WhyChooseUsSection from './wozki/components/WhyChooseUsSection';
import ProcessSection from './wozki/components/ProcessSection';
import TestimonialsSection from './wozki/components/TestimonialsSection';
import ComparisonTableSection from './wozki/components/ComparisonTableSection';
import FAQSection from './wozki/components/FAQSection';
import ContactFormSection from './wozki/components/ContactFormSection';
import FinalCTASection from './wozki/components/FinalCTASection';
import NavigationMenu from './wozki/components/NavigationMenu';
import type { FormData } from './wozki/types';

const WozkiUnoszacePage = () => {
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
      label: `wozki-landing-form-field-${name}`,
      additionalData: {
        fieldName: name,
        formType: 'Wózki Unoszące Contact'
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
      label: 'wozki-landing-contact-form',
      additionalData: {
        formType: 'Wózki Unoszące Contact',
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
      label: `wozki-landing-${ctaName}`,
      additionalData: {
        buttonLocation: 'Wózki Unoszące Landing Page',
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
      label: `wozki-landing-${linkName}`,
      additionalData: {
        linkLocation: 'Wózki Unoszące Landing Page Nav'
      }
    });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "LocalBusiness",
        "@id": "https://well-done.pl/szkolenie-wozki-unoszace#business",
        "name": "Well-done - Szkolenia Wózki Unoszące Wrocław",
        "description": "Profesjonalne szkolenia operatorów wózków unoszących we Wrocławiu i okolicach - wózki nożycowe, teleskopowe, masztowe. Uprawnienia UDT.",
        "url": "https://well-done.pl/szkolenie-wozki-unoszace",
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
        "serviceType": ["Szkolenia wózki unoszące", "Kursy operatorów wózków", "Uprawnienia UDT wózki", "Szkolenia BHP wysokość"]
      },
      {
        "@type": "Course",
        "@id": "https://well-done.pl/szkolenie-wozki-unoszace#course",
        "name": "Szkolenia Operatorów Wózków Unoszących - Wrocław",
        "description": "Kompleksowe szkolenia na uprawnienia UDT dla operatorów wózków unoszących: nożycowych, teleskopowych, masztowych",
        "provider": {
          "@id": "https://well-done.pl/szkolenie-wozki-unoszace#business"
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
        <title>Szkolenia Wózki Unoszące Wrocław - Uprawnienia UDT Operatorów | Well-done</title>
        <meta name="description" content="Profesjonalne szkolenia operatorów wózków unoszących we Wrocławiu i okolicach. Kursy UDT na wózki nożycowe, teleskopowe, masztowe. Wysokie zdawalność i doświadczeni instruktorzy." />
        <meta name="keywords" content="szkolenia wózki unoszące Wrocław, uprawnienia wózki nożycowe, kursy operatorów wózków teleskopowych, szkolenia UDT wózki masztowe, operatorzy wózków unoszących dolnośląskie" />
        
        <meta name="geo.region" content="PL-DS" />
        <meta name="geo.placename" content="Wrocław" />
        <meta name="geo.position" content="51.1079;17.0385" />
        <meta name="ICBM" content="51.1079, 17.0385" />
        
        <meta property="og:title" content="Szkolenia Wózki Unoszące Wrocław - Uprawnienia UDT Operatorów | Well-done" />
        <meta property="og:description" content="Profesjonalne szkolenia operatorów wózków unoszących we Wrocławiu i okolicach. Kursy UDT na wózki nożycowe, teleskopowe, masztowe." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://well-done.pl/szkolenie-wozki-unoszace" />
        <meta property="og:image" content="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" />
        <meta property="og:locale" content="pl_PL" />
        <meta property="og:site_name" content="Well-done" />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Szkolenia Wózki Unoszące Wrocław - Uprawnienia UDT Operatorów" />
        <meta name="twitter:description" content="Profesjonalne szkolenia operatorów wózków unoszących we Wrocławiu i okolicach. Kursy UDT na wózki nożycowe, teleskopowe, masztowe." />
        <meta name="twitter:image" content="/lovable-uploads/a2c8c546-13e6-445b-9832-abf375420d6c.png" />
        
        <link rel="canonical" href="https://well-done.pl/szkolenie-wozki-unoszace" />
        <link rel="alternate" hrefLang="pl" href="https://well-done.pl/szkolenie-wozki-unoszace" />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>
      
      <NavigationMenu trackLinkClick={trackLinkClick} trackCTAClick={trackCTAClick} />
      
      <div className="pt-16">
        <WozkiHeroSection 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          trackCTAClick={trackCTAClick}
        />
        
        <WozkiOfferingsSection 
          trackCTAClick={trackCTAClick} 
          onOfferingSelect={handleOfferingSelect}
        />

        <SafetySection trackCTAClick={trackCTAClick} />

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

export default WozkiUnoszacePage;
