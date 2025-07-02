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
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface QuoteEmailProps {
  name: string
  company?: string
  email: string
  phone?: string
  trainingType: string
  participants: string
  serviceVariant?: string
  message: string
  estimatedPrice?: number
  additionalInfo?: string
}

export const QuoteEmail = ({
  name,
  company,
  email,
  phone,
  trainingType,
  participants,
  serviceVariant,
  message,
  estimatedPrice,
  additionalInfo,
}: QuoteEmailProps) => (
  <Html>
    <Head />
    <Preview>Nowe zapytanie o wycenę szkolenia - {trainingType}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Zapytanie o wycenę szkolenia</Heading>
        
        <Section style={section}>
          <Text style={h2}>Dane kontaktowe:</Text>
          <Text style={text}>
            <strong>Imię i nazwisko:</strong> {name}
          </Text>
          {company && (
            <Text style={text}>
              <strong>Firma:</strong> {company}
            </Text>
          )}
          <Text style={text}>
            <strong>Email:</strong> {email}
          </Text>
          {phone && (
            <Text style={text}>
              <strong>Telefon:</strong> {phone}
            </Text>
          )}
        </Section>

        <Hr style={hr} />

        <Section style={section}>
          <Text style={h2}>Szczegóły szkolenia:</Text>
          <Text style={text}>
            <strong>Rodzaj szkolenia:</strong> {trainingType}
          </Text>
          {serviceVariant && (
            <Text style={text}>
              <strong>Wariant/Kategoria:</strong> {serviceVariant}
            </Text>
          )}
          <Text style={text}>
            <strong>Liczba uczestników:</strong> {participants}
          </Text>
          {estimatedPrice && (
            <Text style={priceText}>
              <strong>Szacowana cena:</strong> {estimatedPrice.toLocaleString('pl-PL')} PLN
            </Text>
          )}
        </Section>

        {additionalInfo && (
          <>
            <Hr style={hr} />
            <Section style={section}>
              <Text style={h2}>Dodatkowe informacje:</Text>
              <Text style={text}>{additionalInfo}</Text>
            </Section>
          </>
        )}

        <Hr style={hr} />

        <Section style={section}>
          <Text style={text}>
            Prosimy o przygotowanie oferty i przesłanie jej na adres email klienta.
          </Text>
          <Text style={footer}>
            <Link
              href="https://well-done.pl"
              target="_blank"
              style={link}
            >
              Well-done.pl
            </Link>
            {' '}- Szkolenia i certyfikacja
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default QuoteEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
}

const h1 = {
  color: '#1f2937',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
}

const h2 = {
  color: '#374151',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0 10px 0',
}

const section = {
  margin: '24px 0',
}

const text = {
  color: '#374151',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '8px 0',
}

const priceText = {
  color: '#059669',
  fontSize: '18px',
  fontWeight: 'bold',
  lineHeight: '24px',
  margin: '8px 0',
  padding: '12px',
  backgroundColor: '#f0fdf4',
  borderRadius: '6px',
}

const hr = {
  borderColor: '#e5e7eb',
  margin: '20px 0',
}

const link = {
  color: '#f59e0b',
  textDecoration: 'underline',
}

const footer = {
  color: '#6b7280',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '32px 0',
}