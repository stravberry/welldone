
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
}

export const ClientConfirmationEmail = ({
  name,
  company,
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
          <div style={iconContainer}>
            <div style={successIcon}>📧</div>
          </div>
          
          <Heading as="h2" style={greetingTitle}>
            Dzień dobry {name}!
          </Heading>
          
          <Text style={mainText}>
            Otrzymaliśmy Twoje zapytanie dotyczące szkoleń UDT{company ? ` dla firmy ${company}` : ''} 
            i bardzo dziękujemy za zainteresowanie naszą ofertą.
          </Text>

          <div style={highlightBox}>
            <Text style={highlightText}>
              <strong>Skontaktujemy się z Tobą w ciągu 24 godzin!</strong>
            </Text>
          </div>
        </Section>

        {/* What's Next */}
        <Section style={section}>
          <Heading as="h2" style={sectionTitle}>🚀 Co dalej?</Heading>
          <div style={stepsList}>
            <div style={stepItem}>
              <div style={stepNumber}>1</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Analiza zapytania</Text>
                <Text style={stepDescription}>
                  Nasz ekspert przeanalizuje Twoje potrzeby szkoleniowe
                </Text>
              </div>
            </div>
            <div style={stepItem}>
              <div style={stepNumber}>2</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Kontakt z ekspertem</Text>
                <Text style={stepDescription}>
                  Skontaktujemy się z Tobą telefonicznie lub e-mailem
                </Text>
              </div>
            </div>
            <div style={stepItem}>
              <div style={stepNumber}>3</div>
              <div style={stepContent}>
                <Text style={stepTitle}>Indywidualna oferta</Text>
                <Text style={stepDescription}>
                  Przedstawimy spersonalizowaną propozycję szkoleń
                </Text>
              </div>
            </div>
          </div>
        </Section>

        {/* Quick Contact */}
        <Section style={contactSection}>
          <Heading as="h2" style={sectionTitle}>📞 Masz pilne pytania?</Heading>
          <Text style={contactText}>
            Nie czekaj - skontaktuj się z nami już teraz!
          </Text>
          <div style={buttonGrid}>
            <Button 
              href="tel:+48123456789"
              style={primaryButton}
            >
              📞 Zadzwoń: +48 123 456 789
            </Button>
            <Button 
              href="mailto:kontakt@well-done.pl"
              style={secondaryButton}
            >
              ✉️ Napisz e-mail
            </Button>
          </div>
        </Section>

        {/* Why Choose Us */}
        <Section style={section}>
          <Heading as="h2" style={sectionTitle}>⭐ Dlaczego Well-done.pl?</Heading>
          <div style={benefitsList}>
            <div style={benefitItem}>
              <Text style={benefitText}>🏆 <strong>Doświadczenie:</strong> Ponad 10 lat na rynku szkoleń</Text>
            </div>
            <div style={benefitItem}>
              <Text style={benefitText}>✅ <strong>Certyfikaty:</strong> Uznawane przez UDT dokumenty</Text>
            </div>
            <div style={benefitItem}>
              <Text style={benefitText}>👥 <strong>Eksperci:</strong> Wykwalifikowani instruktorzy</Text>
            </div>
            <div style={benefitItem}>
              <Text style={benefitText}>🎯 <strong>Elastyczność:</strong> Szkolenia dostosowane do Twoich potrzeb</Text>
            </div>
          </div>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <div style={footerContent}>
            <Text style={footerTitle}>Well-done.pl</Text>
            <Text style={footerSubtitle}>Kompleksowe szkolenia UDT</Text>
          </div>
          <div style={footerLinks}>
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
          </div>
          <Text style={footerCopyright}>
            © 2024 Well-done.pl. Wszystkie prawa zastrzeżone.
          </Text>
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

const iconContainer = {
  textAlign: 'center' as const,
  marginBottom: '24px',
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

const highlightBox = {
  backgroundColor: '#fef7ed',
  border: '2px solid #f97316',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center' as const,
}

const highlightText = {
  color: '#ea580c',
  fontSize: '18px',
  margin: '0',
}

const stepsList = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '20px',
}

const stepItem = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '16px',
}

const stepNumber = {
  backgroundColor: '#f97316',
  color: '#ffffff',
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: '600',
  flexShrink: 0,
}

const stepContent = {
  flex: 1,
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

const buttonGrid = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap' as const,
  justifyContent: 'center',
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

const benefitsList = {
  display: 'flex',
  flexDirection: 'column' as const,
  gap: '12px',
}

const benefitItem = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  padding: '16px',
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

const footerContent = {
  marginBottom: '20px',
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

const footerLinks = {
  marginBottom: '20px',
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
