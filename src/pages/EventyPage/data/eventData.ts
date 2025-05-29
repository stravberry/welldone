
import { Award, Users, Shield, Target, Star, Calendar } from 'lucide-react';

export const services = [
  {
    id: 'konferencje-techniczne',
    title: 'Konferencje techniczne',
    description: 'Organizacja profesjonalnych konferencji i seminariów technicznych.',
    duration: '1-3 dni',
    participants: '50-300 osób',
    price: 'Wycena indywidualna',
    features: ['Agenda dostosowana do potrzeb', 'Eksperci branżowi', 'Materiały konferencyjne', 'Catering'],
    badge: 'Popularne',
    image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
    imageAlt: 'Konferencja techniczna z ekspertami branżowymi'
  },
  {
    id: 'warsztaty-firmowe',
    title: 'Warsztaty firmowe',
    description: 'Dedykowane warsztaty szkoleniowe dla zespołów pracowniczych.',
    duration: '4-16 godzin',
    participants: '10-50 osób',
    price: 'Od 3000 zł',
    features: ['Indywidualne podejście', 'Materiały własne', 'Praktyczne ćwiczenia', 'Certyfikaty'],
    badge: 'Na zamówienie',
    image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
    imageAlt: 'Warsztat firmowy dla pracowników'
  },
  {
    id: 'dni-otwarte',
    title: 'Dni otwarte i prezentacje',
    description: 'Organizacja dni otwartych i prezentacji produktów technicznych.',
    duration: '4-8 godzin',
    participants: '20-100 osób',
    price: 'Od 2000 zł',
    features: ['Prezentacje produktów', 'Demonstracje live', 'Networking', 'Materiały promocyjne'],
    image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
    imageAlt: 'Dzień otwarty z prezentacjami technicznymi'
  },
  {
    id: 'szkolenia-online',
    title: 'Eventy online',
    description: 'Webinary i szkolenia online dostosowane do potrzeb klienta.',
    duration: '1-4 godziny',
    participants: 'Bez limitu',
    price: 'Od 1500 zł',
    features: ['Platforma online', 'Interaktywne prezentacje', 'Nagrania sesji', 'Materiały cyfrowe'],
    badge: 'Elastyczne',
    image: '/lovable-uploads/1dd9cbee-fe1a-42e5-b83b-bbbb2d075760.png',
    imageAlt: 'Webinar i szkolenie online'
  }
];

export const stats = [
  { value: 150, label: 'Zorganizowanych eventów', suffix: '+' },
  { value: 95, label: 'Zadowolenie klientów', suffix: '%' },
  { value: 5000, label: 'Uczestników', suffix: '+' },
  { value: 80, label: 'Firm partnerskich', suffix: '+' }
];

export const benefits = [
  {
    icon: Award,
    title: 'Doświadczenie',
    description: 'Ponad 150 zorganizowanych eventów edukacyjnych'
  },
  {
    icon: Users,
    title: 'Eksperci branżowi',
    description: 'Współpraca z najlepszymi specjalistami w dziedzinie'
  },
  {
    icon: Shield,
    title: 'Pełna obsługa',
    description: 'Od koncepcji po realizację - zajmujemy się wszystkim'
  },
  {
    icon: Target,
    title: 'Dostosowanie',
    description: 'Eventy szyte na miarę potrzeb Twojej firmy'
  },
  {
    icon: Star,
    title: 'Najwyższa jakość',
    description: '95% zadowolenia klientów z organizowanych eventów'
  },
  {
    icon: Calendar,
    title: 'Terminowość',
    description: 'Zawsze dotrzymujemy ustalonych terminów'
  }
];
