
import React from 'react';
import ContactHero from './ContactPage/components/ContactHero';
import ContactInfo from './ContactPage/components/ContactInfo';
import ServiceStandards from './ContactPage/components/ServiceStandards';
import ContactAdvantages from './ContactPage/components/ContactAdvantages';
import ContactMap from './ContactPage/components/ContactMap';
import ContactCTA from './ContactPage/components/ContactCTA';

const ContactPage = () => {
  return (
    <div>
      <ContactHero />
      <ContactInfo />
      <ServiceStandards />
      <ContactAdvantages />
      <ContactMap />
      <ContactCTA />
    </div>
  );
};

export default ContactPage;
