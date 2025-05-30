
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactHero from './ContactPage/components/ContactHero';
import ContactInfo from './ContactPage/components/ContactInfo';
import ServiceStandards from './ContactPage/components/ServiceStandards';
import ContactAdvantages from './ContactPage/components/ContactAdvantages';
import ContactMap from './ContactPage/components/ContactMap';
import ContactCTA from './ContactPage/components/ContactCTA';

const ContactPage = () => {
  return (
    <div>
      <Navbar />
      <ContactHero />
      <ContactInfo />
      <ServiceStandards />
      <ContactAdvantages />
      <ContactMap />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default ContactPage;
