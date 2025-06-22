
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from 'npm:@react-email/components@0.0.11'
import * as React from 'npm:react@18.3.1'

interface ClientConfirmationEmailProps {
  name: string;
  company?: string;
  trainingType?: string;
  participants?: string;
  location?: string;
  timeline?: string;
  urgency?: string;
}

// Mapping functions for Polish names
const getPolishTrainingName = (value: string) => {
  const mapping: { [key: string]: string } = {
    'udt-operatorzy': 'UDT Operatorzy wózków widłowych',
    'udt-konserwatorze': 'UDT Konserwatorzy',
    'wozki-unoszace': 'Wózki unoszące',
    'sep': 'SEP',
    'lutowanie': 'Lutowanie',
    'inne': 'Inne'
  };
  return mapping[value] || value;
};

const getPolishParticipantsName = (value: string) => {
  const mapping: { [key: string]: string } = {
    '1-3': '1-3 osób',
    '4-6': '4-6 osób',
    '7-10': '7-10 osób',
    '11-15': '11-15 osób',
    '16+': 'Ponad 15 osób'
  };
  return mapping[value] || value;
};

const getPolishLocationName = (value: string) => {
  const mapping: { [key: string]: string } = {
    'our-site': 'Nasza siedziba',
    'client-site': 'U klienta',
    'online': 'Online'
  };
  return mapping[value] || value;
};

const getPolishTimelineName = (value: string) => {
  const mapping: { [key: string]: string } = {
    'asap': 'Jak najszybciej',
    '1-week': 'W ciągu tygodnia',
    '1-month': 'W ciągu 1 miesiąca',
    '3-months': 'W ciągu 3 miesięcy',
    'flexible': 'Elastyczny termin'
  };
  return mapping[value] || value;
};

export const ClientConfirmationEmail = ({
  name,
  company,
  trainingType,
  participants,
  location,
  timeline,
  urgency,
}: ClientConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Potwierdzenie otrzymania zapytania - Well-done.pl</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={headerTitle}>✅ Dziękujemy za zapytanie!</Heading>
          <Text style={headerSubtitle}>
            Twoja wiadomość została pomyślnie wysłana
          </Text>
        </Section>

        {/* Main Content */}
        <Section style={section}>
          <table style={iconTable}>
            <tr>
              <td style={iconCell}>
                <div style={successIcon}>📧</div>
              </td>
            </tr>
          </table>
          
          <Heading as="h2" style={greetingTitle}>
            Dzień dobry {name}!
          </Heading>
          
          <Text style={mainText}>
            Otrzymaliśmy Twoje zapytanie dotyczące szkoleń UDT{company ? ` dla firmy ${company}` : ''} 
            i bardzo dziękujemy za zainteresowanie naszą ofertą.
          </Text>

          <table style={highlightTable}>
            <tr>
              <td style={highlightCell}>
                <Text style={highlightText}>
                  <strong>Skontaktujemy się z Tobą w ciągu 24 godzin!</strong>
                </Text>
              </td>
            </tr>
          </table>
        </Section>

        {/* Training Summary */}
        {(trainingType || participants || location || timeline || urgency) && (
          <Section style={section}>
            <Heading as="h2" style={sectionTitle}>📋 Szczegóły Twojego zapytania</Heading>
            <table style={summaryTable}>
              <tbody>
                {trainingType && (
                  <tr>
                    <td style={summaryLabelCell}>
                      <Text style={summaryLabel}>Rodzaj szkolenia:</Text>
                    </td>
                    <td style={summaryValueCell}>
                      <Text style={summaryValue}>{getPolishTrainingName(trainingType)}</Text>
                    </td>
                  </tr>
                )}
                {participants && (
                  <tr>
                    <td style={summaryLabelCell}>
                      <Text style={summaryLabel}>Liczba uczestników:</Text>
                    </td>
                    <td style={summaryValueCell}>
                      <Text style={summaryValue}>{getPolishParticipantsName(participants)}</Text>
                    </td>
                  </tr>
                )}
                {location && (
                  <tr>
                    <td style={summaryLabelCell}>
                      <Text style={summaryLabel}>Miejsce szkolenia:</Text>
                    </td>
                    <td style={summaryValueCell}>
                      <Text style={summaryValue}>{getPolishLocationName(location)}</Text>
                    </td>
                  </tr>
                )}
                {timeline && (
                  <tr>
                    <td style={summaryLabelCell}>
                      <Text style={summaryLabel}>Preferowany termin:</Text>
                    </td>
                    <td style={summaryValueCell}>
                      <Text style={summaryValue}>{getPolishTimelineName(timeline)}</Text>
                    </td>
                  </tr>
                )}
                {urgency && (
                  <tr>
                    <td style={summaryLabelCell}>
                      <Text style={summaryLabel}>Pilność:</Text>
                    </td>
                    <td style={summaryValueCell}>
                      <Text style={summaryValue}>{urgency}</Text>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Section>
        )}

        {/* What's Next */}
        <Section style={section}>
          <Heading as="h2" style={sectionTitle}>🚀 Co dalej?</Heading>
          <table style={stepsTable}>
            <tbody>
              <tr>
                <td style={stepNumberCell}>
                  <div style={stepNumber}>1</div>
                </td>
                <td style={stepContentCell}>
                  <Text style={stepTitle}>Analiza zapytania</Text>
                  <Text style={stepDescription}>
                    Nasz ekspert przeanalizuje Twoje potrzeby szkoleniowe
                  </Text>
                </td>
              </tr>
              <tr>
                <td style={stepNumberCell}>
                  <div style={stepNumber}>2</div>
                </td>
                <td style={stepContentCell}>
                  <Text style={stepTitle}>Kontakt z ekspertem</Text>
                  <Text style={stepDescription}>
                    Skontaktujemy się z Tobą telefonicznie lub e-mailem
                  </Text>
                </td>
              </tr>
              <tr>
                <td style={stepNumberCell}>
                  <div style={stepNumber}>3</div>
                </td>
                <td style={stepContentCell}>
                  <Text style={stepTitle}>Indywidualna oferta</Text>
                  <Text style={stepDescription}>
                    Przedstawimy spersonalizowaną propozycję szkoleń
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* Quick Contact */}
        <Section style={contactSection}>
          <Heading as="h2" style={sectionTitle}>📞 Masz pilne pytania?</Heading>
          <Text style={contactText}>
            Nie czekaj - skontaktuj się z nami już teraz!
          </Text>
          <table style={buttonTable}>
            <tbody>
              <tr>
                <td style={buttonCell}>
                  <Button 
                    href="tel:+48504305437"
                    style={primaryButton}
                  >
                    📞 Zadzwoń: +48 504 305 437
                  </Button>
                </td>
              </tr>
              <tr>
                <td style={buttonCell}>
                  <Button 
                    href="mailto:kontakt@well-done.pl"
                    style={secondaryButton}
                  >
                    ✉️ Napisz e-mail
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* Why Choose Us */}
        <Section style={section}>
          <Heading as="h2" style={sectionTitle}>⭐ Dlaczego Well-done.pl?</Heading>
          <table style={benefitsTable}>
            <tbody>
              <tr>
                <td style={benefitCell}>
                  <Text style={benefitText}>🏆 <strong>Doświadczenie:</strong> Ponad 10 lat na rynku szkoleń</Text>
                </td>
              </tr>
              <tr>
                <td style={benefitCell}>
                  <Text style={benefitText}>✅ <strong>Certyfikaty:</strong> Uznawane przez UDT dokumenty</Text>
                </td>
              </tr>
              <tr>
                <td style={benefitCell}>
                  <Text style={benefitText}>👥 <strong>Eksperci:</strong> Wykwalifikowani instruktorzy</Text>
                </td>
              </tr>
              <tr>
                <td style={benefitCell}>
                  <Text style={benefitText}>🎯 <strong>Elastyczność:</strong> Szkolenia dostosowane do Twoich potrzeb</Text>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <table style={footerTable}>
            <tbody>
              <tr>
                <td style={footerContentCell}>
                  <Text style={footerTitle}>Well-done.pl</Text>
                  <Text style={footerSubtitle}>Kompleksowe szkolenia UDT</Text>
                </td>
              </tr>
              <tr>
                <td style={footerLinksCell}>
                  <Link href="https://well-done.pl" style={footerLink}>
                    🌐 Strona główna
                  </Link>
                  <span style={footerSeparator}>|</span>
                  <Link href="https://well-done.pl/uslugi" style={footerLink}>
                    📋 Nasze usługi
                  </Link>
                  <span style={footerSeparator}>|</span>
                  <Link href="https://well-done.pl/kontakt" style={footerLink}>
                    📧 Kontakt
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={footerCopyrightCell}>
                  <Text style={footerCopyright}>
                    © 2024 Well-done.pl. Wszystkie prawa zastrzeżone.
                  </Text>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ClientConfirmationEmail

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '640px',
}

const header = {
  background: 'linear-gradient(135deg, #f97316 0%, #fb923c 100%)',
  borderRadius: '12px 12px 0 0',
  padding: '40px 24px',
  textAlign: 'center' as const,
}

const headerTitle = {
  color: '#ffffff',
  fontSize: '32px',
  fontWeight: '700',
  margin: '0 0 12px 0',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}

const headerSubtitle = {
  color: '#fef3f2',
  fontSize: '18px',
  margin: '0',
  opacity: 0.95,
}

const section = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  margin: '20px 0',
  padding: '32px 24px',
}

const iconTable = {
  width: '100%',
  marginBottom: '24px',
}

const iconCell = {
  textAlign: 'center' as const,
}

const successIcon = {
  fontSize: '48px',
  display: 'inline-block',
  backgroundColor: '#f0fdf4',
  padding: '16px',
  borderRadius: '50%',
  border: '3px solid #10b981',
}

const greetingTitle = {
  color: '#1e293b',
  fontSize: '24px',
  fontWeight: '600',
  margin: '0 0 20px 0',
  textAlign: 'center' as const,
}

const sectionTitle = {
  color: '#1e293b',
  fontSize: '20px',
  fontWeight: '600',
  margin: '0 0 20px 0',
  borderBottom: '2px solid #f97316',
  paddingBottom: '8px',
}

const mainText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 24px 0',
  textAlign: 'center' as const,
}

const highlightTable = {
  width: '100%',
  backgroundColor: '#fef7ed',
  border: '2px solid #f97316',
  borderRadius: '8px',
}

const highlightCell = {
  padding: '20px',
  textAlign: 'center' as const,
}

const highlightText = {
  color: '#ea580c',
  fontSize: '18px',
  margin: '0',
}

const summaryTable = {
  width: '100%',
  backgroundColor: '#f0f9ff',
  border: '1px solid #bae6fd',
  borderRadius: '8px',
  borderCollapse: 'collapse' as const,
}

const summaryLabelCell = {
  padding: '12px 16px',
  borderBottom: '1px solid #e0f2fe',
  width: '40%',
  verticalAlign: 'top' as const,
}

const summaryValueCell = {
  padding: '12px 16px',
  borderBottom: '1px solid #e0f2fe',
  width: '60%',
  verticalAlign: 'top' as const,
}

const summaryLabel = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#0c4a6e',
  margin: '0',
}

const summaryValue = {
  fontSize: '14px',
  color: '#1e293b',
  margin: '0',
  fontWeight: '500',
}

const stepsTable = {
  width: '100%',
}

const stepNumberCell = {
  width: '48px',
  verticalAlign: 'top' as const,
  paddingTop: '4px',
  paddingRight: '16px',
  paddingBottom: '20px',
}

const stepContentCell = {
  verticalAlign: 'top' as const,
  paddingBottom: '20px',
}

const stepNumber = {
  backgroundColor: '#f97316',
  color: '#ffffff',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  textAlign: 'center' as const,
  lineHeight: '32px',
  fontSize: '16px',
  fontWeight: '600',
}

const stepTitle = {
  color: '#1e293b',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 4px 0',
}

const stepDescription = {
  color: '#64748b',
  fontSize: '14px',
  margin: '0',
  lineHeight: '1.5',
}

const contactSection = {
  ...section,
  backgroundColor: '#fef7ed',
  border: '1px solid #fed7aa',
  textAlign: 'center' as const,
}

const contactText = {
  color: '#92400e',
  fontSize: '16px',
  margin: '0 0 24px 0',
}

const buttonTable = {
  width: '100%',
}

const buttonCell = {
  textAlign: 'center' as const,
  paddingBottom: '12px',
}

const primaryButton = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  border: 'none',
  cursor: 'pointer',
}

const secondaryButton = {
  backgroundColor: '#f97316',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 28px',
  border: 'none',
  cursor: 'pointer',
}

const benefitsTable = {
  width: '100%',
}

const benefitCell = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  padding: '16px',
  marginBottom: '12px',
}

const benefitText = {
  color: '#374151',
  fontSize: '15px',
  margin: '0',
  lineHeight: '1.5',
}

const footer = {
  backgroundColor: '#1e293b',
  borderRadius: '0 0 12px 12px',
  padding: '32px 24px',
  textAlign: 'center' as const,
  marginTop: '0',
}

const footerTable = {
  width: '100%',
}

const footerContentCell = {
  textAlign: 'center' as const,
  paddingBottom: '20px',
}

const footerLinksCell = {
  textAlign: 'center' as const,
  paddingBottom: '20px',
}

const footerCopyrightCell = {
  textAlign: 'center' as const,
}

const footerTitle = {
  color: '#ffffff',
  fontSize: '20px',
  fontWeight: '700',
  margin: '0 0 4px 0',
}

const footerSubtitle = {
  color: '#94a3b8',
  fontSize: '14px',
  margin: '0',
}

const footerLink = {
  color: '#f97316',
  fontSize: '14px',
  textDecoration: 'underline',
}

const footerSeparator = {
  color: '#64748b',
  fontSize: '14px',
  margin: '0 8px',
}

const footerCopyright = {
  color: '#64748b',
  fontSize: '12px',
  margin: '0',
}
