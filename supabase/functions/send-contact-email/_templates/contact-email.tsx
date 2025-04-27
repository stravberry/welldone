
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
} from 'npm:@react-email/components@0.0.11'
import * as React from 'npm:react@18.3.1'

interface ContactEmailProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export const ContactEmail = ({
  name,
  company,
  email,
  phone,
  message,
}: ContactEmailProps) => (
  <Html>
    <Head />
    <Preview>Nowe zapytanie ze strony UDT od {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nowe zapytanie ze strony UDT</Heading>
        
        <Section style={section}>
          <Heading as="h2" style={h2}>Dane kontaktowe:</Heading>
          <Text style={text}><strong>Imię i nazwisko:</strong> {name}</Text>
          <Text style={text}><strong>Firma:</strong> {company}</Text>
          <Text style={text}><strong>Email:</strong> {email}</Text>
          <Text style={text}><strong>Telefon:</strong> {phone}</Text>
        </Section>

        <Section style={section}>
          <Heading as="h2" style={h2}>Wiadomość:</Heading>
          <Text style={messageStyle}>{message}</Text>
        </Section>

        <Text style={footer}>
          Wiadomość wysłana ze strony{' '}
          <Link href="https://well-done.pl/udt-szkolenia" style={link}>
            well-done.pl/udt-szkolenia
          </Link>
        </Text>
      </Container>
    </Body>
  </Html>
)

export default ContactEmail

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
}

const h1 = {
  color: '#f97316',
  fontSize: '24px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0',
}

const h2 = {
  color: '#444',
  fontSize: '20px',
  fontWeight: '600',
  margin: '20px 0 10px',
}

const section = {
  backgroundColor: '#f8fafc',
  border: '1px solid #eee',
  borderRadius: '5px',
  margin: '20px 0',
  padding: '20px',
}

const text = {
  color: '#3c3c3c',
  fontSize: '16px',
  margin: '8px 0',
  lineHeight: '24px',
}

const messageStyle = {
  ...text,
  backgroundColor: '#fff',
  padding: '15px',
  borderRadius: '4px',
  border: '1px solid #e2e8f0',
  whiteSpace: 'pre-wrap',
}

const link = {
  color: '#f97316',
  textDecoration: 'underline',
}

const footer = {
  color: '#898989',
  fontSize: '14px',
  margin: '24px 0',
}
