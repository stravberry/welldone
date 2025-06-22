
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

interface AdminNotificationEmailProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export const AdminNotificationEmail = ({
  name,
  company,
  email,
  phone,
  message,
}: AdminNotificationEmailProps) => (
  <Html>
    <Head />
    <Preview>Nowe zapytanie UDT od {name} - {company}</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Header */}
        <Section style={header}>
          <Heading style={headerTitle}>🔔 Nowe zapytanie UDT</Heading>
          <Text style={headerSubtitle}>
            Otrzymałeś nowe zapytanie ze strony well-done.pl
          </Text>
        </Section>

        {/* Contact Information */}
        <Section style={section}>
          <Heading as="h2" style={sectionTitle}>👤 Dane kontaktowe</Heading>
          <div style={contactGrid}>
            <div style={contactItem}>
              <Text style={contactLabel}>Imię i nazwisko:</Text>
              <Text style={contactValue}>{name}</Text>
            </div>
            <div style={contactItem}>
              <Text style={contactLabel}>Firma:</Text>
              <Text style={contactValue}>{company || 'Nie podano'}</Text>
            </div>
            <div style={contactItem}>
              <Text style={contactLabel}>Email:</Text>
              <Text style={contactValue}>
                <Link href={`mailto:${email}`} style={emailLink}>{email}</Link>
              </Text>
            </div>
            <div style={contactItem}>
              <Text style={contactLabel}>Telefon:</Text>
              <Text style={contactValue}>
                {phone ? (
                  <Link href={`tel:${phone}`} style={phoneLink}>{phone}</Link>
                ) : 'Nie podano'}
              </Text>
            </div>
          </div>
        </Section>

        {/* Message */}
        <Section style={section}>
          <Heading as="h2" style={sectionTitle}>💬 Treść zapytania</Heading>
          <div style={messageBox}>
            <Text style={messageText}>{message}</Text>
          </div>
        </Section>

        {/* Action Buttons */}
        <Section style={actionSection}>
          <Heading as="h2" style={sectionTitle}>⚡ Szybkie akcje</Heading>
          <div style={buttonGrid}>
            <Button 
              href={`mailto:${email}?subject=Odpowiedź na zapytanie UDT&body=Dzień dobry ${name},%0D%0A%0D%0ADziękuję za zapytanie dotyczące szkoleń UDT.%0D%0A%0D%0APozdrawiam,%0D%0AZespół Well-done.pl`}
              style={primaryButton}
            >
              📧 Odpowiedz e-mailem
            </Button>
            <Button 
              href={`tel:${phone}`}
              style={secondaryButton}
            >
              📞 Zadzwoń
            </Button>
          </div>
        </Section>

        {/* Footer */}
        <Section style={footer}>
          <Text style={footerText}>
            Wiadomość wysłana ze strony{' '}
            <Link href="https://well-done.pl" style={footerLink}>
              well-done.pl
            </Link>
          </Text>
          <Text style={footerText}>
            Data otrzymania: {new Date().toLocaleString('pl-PL')}
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default AdminNotificationEmail

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
  padding: '32px 24px',
  textAlign: 'center' as const,
}

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px 0',
  textShadow: '0 2px 4px rgba(0,0,0,0.1)',
}

const headerSubtitle = {
  color: '#fef3f2',
  fontSize: '16px',
  margin: '0',
  opacity: 0.9,
}

const section = {
  backgroundColor: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  margin: '20px 0',
  padding: '24px',
}

const sectionTitle = {
  color: '#1e293b',
  fontSize: '18px',
  fontWeight: '600',
  margin: '0 0 16px 0',
  borderBottom: '2px solid #f97316',
  paddingBottom: '8px',
}

const contactGrid = {
  display: 'grid',
  gap: '12px',
}

const contactItem = {
  padding: '12px',
  backgroundColor: '#f8fafc',
  borderRadius: '6px',
  border: '1px solid #e2e8f0',
}

const contactLabel = {
  fontSize: '14px',
  fontWeight: '600',
  color: '#64748b',
  margin: '0 0 4px 0',
}

const contactValue = {
  fontSize: '16px',
  color: '#1e293b',
  margin: '0',
  fontWeight: '500',
}

const emailLink = {
  color: '#f97316',
  textDecoration: 'underline',
}

const phoneLink = {
  color: '#10b981',
  textDecoration: 'underline',
}

const messageBox = {
  backgroundColor: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '20px',
}

const messageText = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
  whiteSpace: 'pre-wrap' as const,
}

const actionSection = {
  ...section,
  backgroundColor: '#fef7ed',
  border: '1px solid #fed7aa',
}

const buttonGrid = {
  display: 'flex',
  gap: '12px',
  flexWrap: 'wrap' as const,
}

const primaryButton = {
  backgroundColor: '#f97316',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  border: 'none',
  cursor: 'pointer',
}

const secondaryButton = {
  backgroundColor: '#10b981',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
  border: 'none',
  cursor: 'pointer',
}

const footer = {
  backgroundColor: '#f8fafc',
  borderRadius: '0 0 12px 12px',
  padding: '20px 24px',
  textAlign: 'center' as const,
  marginTop: '0',
}

const footerText = {
  color: '#64748b',
  fontSize: '14px',
  margin: '4px 0',
}

const footerLink = {
  color: '#f97316',
  textDecoration: 'underline',
}
