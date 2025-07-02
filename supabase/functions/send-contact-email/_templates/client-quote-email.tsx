import React from 'npm:react@18.3.1';
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
  Link,
  Row,
  Column,
} from 'npm:@react-email/components@0.0.22';

interface ClientQuoteEmailProps {
  name: string;
  company?: string;
  serviceType: string;
  serviceVariant?: string;
  participantsCount: string;
  basePrice: number;
  finalPrice: number;
  priceBreakdown?: {
    basePrice: number;
    variantModifier?: number;
    participantsMultiplier: number;
    participantsDiscount?: number;
  };
}

export const ClientQuoteEmail = ({
  name,
  company,
  serviceType,
  serviceVariant,
  participantsCount,
  basePrice,
  finalPrice,
  priceBreakdown
}: ClientQuoteEmailProps) => {
  const getServiceDisplayName = (type: string) => {
    const names: Record<string, string> = {
      'udt-operator': 'Uprawnienia UDT dla operatorów',
      'udt-conservator': 'Uprawnienia UDT dla konserwatorów', 
      'sep': 'Uprawnienia SEP',
      'forklifts': 'Szkolenie na wózki unoszące'
    };
    return names[type] || type;
  };

  const getParticipantsDisplayName = (count: string) => {
    const names: Record<string, string> = {
      '1': '1 osoba',
      '2-5': '2-5 osób',
      '6-10': '6-10 osób', 
      '11-15': '11-15 osób',
      '15+': 'Powyżej 15 osób'
    };
    return names[count] || count;
  };

  return (
    <Html>
      <Head />
      <Preview>Wycena szkolenia - {getServiceDisplayName(serviceType)}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header}>
            <Heading style={h1}>Well-done.pl</Heading>
            <Text style={headerSubtitle}>Profesjonalne szkolenia UDT i SEP</Text>
          </Section>

          {/* Main content */}
          <Section style={content}>
            <Heading style={h2}>
              Dziękujemy za zapytanie, {name}!
            </Heading>
            
            <Text style={paragraph}>
              {company && `Przygotowaliśmy dla firmy ${company} `}
              Przygotowaliśmy dla Państwa indywidualną wycenę szkolenia. 
              Poniżej znajdą Państwo szczegóły oferty:
            </Text>

            {/* Service details */}
            <Section style={serviceBox}>
              <Heading style={h3}>Szczegóły szkolenia</Heading>
              
              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={detailLabelText}>Rodzaj szkolenia:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={detailValueText}>{getServiceDisplayName(serviceType)}</Text>
                </Column>
              </Row>

              {serviceVariant && (
                <Row style={detailRow}>
                  <Column style={detailLabel}>
                    <Text style={detailLabelText}>Wariant:</Text>
                  </Column>
                  <Column style={detailValue}>
                    <Text style={detailValueText}>{serviceVariant}</Text>
                  </Column>
                </Row>
              )}

              <Row style={detailRow}>
                <Column style={detailLabel}>
                  <Text style={detailLabelText}>Liczba uczestników:</Text>
                </Column>
                <Column style={detailValue}>
                  <Text style={detailValueText}>{getParticipantsDisplayName(participantsCount)}</Text>
                </Column>
              </Row>
            </Section>

            {/* Price breakdown */}
            {priceBreakdown && (
              <Section style={priceBox}>
                <Heading style={h3}>Kalkulacja ceny</Heading>
                
                <Row style={priceRow}>
                  <Column style={priceLabel}>
                    <Text style={priceLabelText}>Cena bazowa:</Text>
                  </Column>
                  <Column style={priceValue}>
                    <Text style={priceValueText}>{priceBreakdown.basePrice.toLocaleString('pl-PL')} PLN</Text>
                  </Column>
                </Row>

                {priceBreakdown.variantModifier && priceBreakdown.variantModifier !== 0 && (
                  <Row style={priceRow}>
                    <Column style={priceLabel}>
                      <Text style={priceLabelText}>Dodatkowe opcje:</Text>
                    </Column>
                    <Column style={priceValue}>
                      <Text style={priceValueText}>
                        {priceBreakdown.variantModifier > 0 ? '+' : ''}{priceBreakdown.variantModifier.toLocaleString('pl-PL')} PLN
                      </Text>
                    </Column>
                  </Row>
                )}

                {priceBreakdown.participantsMultiplier !== 1 && (
                  <Row style={priceRow}>
                    <Column style={priceLabel}>
                      <Text style={priceLabelText}>Rabat grupowy:</Text>
                    </Column>
                    <Column style={priceValue}>
                      <Text style={priceValueText}>
                        {Math.round((1 - priceBreakdown.participantsMultiplier) * 100)}% zniżki
                      </Text>
                    </Column>
                  </Row>
                )}

                <Hr style={priceDivider} />
                
                <Row style={totalPriceRow}>
                  <Column style={priceLabel}>
                    <Text style={totalPriceLabelText}>Cena końcowa:</Text>
                  </Column>
                  <Column style={priceValue}>
                    <Text style={totalPriceValueText}>{finalPrice.toLocaleString('pl-PL')} PLN</Text>
                  </Column>
                </Row>
              </Section>
            )}

            {/* Call to action */}
            <Section style={ctaSection}>
              <Text style={paragraph}>
                Oferta ważna przez 30 dni. Aby umówić termin szkolenia lub uzyskać dodatkowe informacje, 
                prosimy o kontakt:
              </Text>
              
              <Section style={contactBox}>
                <Text style={contactItem}>
                  📧 Email: <Link href="mailto:kontakt@well-done.pl" style={contactLink}>kontakt@well-done.pl</Link>
                </Text>
                <Text style={contactItem}>
                  📞 Telefon: <Link href="tel:+48123456789" style={contactLink}>+48 123 456 789</Link>
                </Text>
                <Text style={contactItem}>
                  🌐 Strona: <Link href="https://well-done.pl" style={contactLink}>www.well-done.pl</Link>
                </Text>
              </Section>
            </Section>

            {/* Additional info */}
            <Section style={infoSection}>
              <Heading style={h4}>Dlaczego warto wybrać Well-done.pl?</Heading>
              <Text style={bulletPoint}>✓ Doświadczeni instruktorzy z wieloletnią praktyką</Text>
              <Text style={bulletPoint}>✓ Nowoczesne metody szkoleniowe</Text>
              <Text style={bulletPoint}>✓ Elastyczne terminy dopasowane do Państwa potrzeb</Text>
              <Text style={bulletPoint}>✓ Kompleksowa obsługa - od szkolenia po egzamin</Text>
              <Text style={bulletPoint}>✓ Konkurencyjne ceny i rabaty grupowe</Text>
            </Section>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Well-done.pl - Profesjonalne szkolenia UDT i SEP
            </Text>
            <Text style={footerText}>
              Ten email został wygenerowany automatycznie. Prosimy nie odpowiadać na tę wiadomość.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#ffffff',
  borderRadius: '8px 8px 0 0',
  padding: '32px 24px 24px',
  textAlign: 'center' as const,
  borderBottom: '3px solid #2563eb',
};

const h1 = {
  color: '#1f2937',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const headerSubtitle = {
  color: '#6b7280',
  fontSize: '16px',
  margin: '0',
};

const content = {
  backgroundColor: '#ffffff',
  padding: '24px',
};

const h2 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const h3 = {
  color: '#1f2937',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const h4 = {
  color: '#1f2937',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const paragraph = {
  color: '#4b5563',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 16px',
};

const serviceBox = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e5e7eb',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
};

const detailRow = {
  margin: '8px 0',
};

const detailLabel = {
  width: '40%',
  verticalAlign: 'top' as const,
};

const detailValue = {
  width: '60%',
  verticalAlign: 'top' as const,
};

const detailLabelText = {
  color: '#6b7280',
  fontSize: '14px',
  margin: '0',
  fontWeight: '500',
};

const detailValueText = {
  color: '#1f2937',
  fontSize: '14px',
  margin: '0',
  fontWeight: '600',
};

const priceBox = {
  backgroundColor: '#ecfdf5',
  border: '1px solid #10b981',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
};

const priceRow = {
  margin: '6px 0',
};

const priceLabel = {
  width: '60%',
  verticalAlign: 'top' as const,
};

const priceValue = {
  width: '40%',
  verticalAlign: 'top' as const,
  textAlign: 'right' as const,
};

const priceLabelText = {
  color: '#065f46',
  fontSize: '14px',
  margin: '0',
};

const priceValueText = {
  color: '#065f46',
  fontSize: '14px',
  margin: '0',
  fontWeight: '600',
};

const totalPriceRow = {
  margin: '12px 0 0',
};

const totalPriceLabelText = {
  color: '#065f46',
  fontSize: '16px',
  margin: '0',
  fontWeight: 'bold',
};

const totalPriceValueText = {
  color: '#065f46',
  fontSize: '18px',
  margin: '0',
  fontWeight: 'bold',
};

const priceDivider = {
  margin: '12px 0 8px',
  borderColor: '#10b981',
};

const ctaSection = {
  margin: '24px 0',
};

const contactBox = {
  backgroundColor: '#f1f5f9',
  border: '1px solid #cbd5e1',
  borderRadius: '8px',
  padding: '16px',
  margin: '16px 0',
};

const contactItem = {
  color: '#1e293b',
  fontSize: '14px',
  margin: '8px 0',
};

const contactLink = {
  color: '#2563eb',
  textDecoration: 'none',
  fontWeight: '600',
};

const infoSection = {
  margin: '24px 0',
  padding: '16px',
  backgroundColor: '#fefce8',
  border: '1px solid #facc15',
  borderRadius: '8px',
};

const bulletPoint = {
  color: '#713f12',
  fontSize: '14px',
  margin: '4px 0',
};

const footer = {
  backgroundColor: '#f9fafb',
  borderRadius: '0 0 8px 8px',
  padding: '16px 24px',
  textAlign: 'center' as const,
  borderTop: '1px solid #e5e7eb',
};

const footerText = {
  color: '#6b7280',
  fontSize: '12px',
  margin: '4px 0',
};

export default ClientQuoteEmail;