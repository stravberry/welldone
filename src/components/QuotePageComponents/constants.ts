import React from 'react';
import { Forklift, Wrench } from 'lucide-react';
import { ServiceOption } from './types';

export const serviceOptions: ServiceOption[] = [
  { 
    value: 'udt-operator', 
    label: 'Uprawnienia UDT dla operatorów', 
    desc: 'Szkolenia i egzaminy dla operatorów maszyn i urządzeń',
    icon: React.createElement('img', { src: "/lovable-uploads/886d72de-54ab-4cd8-b675-5cabc84d69a1.png", alt: "Hard hat icon", className: "h-8 w-8" })
  },
  { 
    value: 'udt-conservator', 
    label: 'Uprawnienia UDT dla konserwatorów', 
    desc: 'Szkolenia dla konserwatorów urządzeń technicznych',
    icon: '🔧'
  },
  { 
    value: 'sep', 
    label: 'Uprawnienia SEP', 
    desc: 'Szkolenia elektryczne, cieplne i gazowe',
    icon: '⚡'
  },
  { 
    value: 'forklifts', 
    label: 'Wózki unoszące', 
    desc: 'Szkolenia na wózki widłowe i platformy',
    icon: React.createElement('img', { src: "/lovable-uploads/a6019978-6a0d-47ee-9dc4-ab2633c22ea9.png", alt: "Pallet jack icon", className: "h-8 w-8" })
  }
];

export const udtOperatorOptions = [
  { value: 'forklifts', label: 'Wózki widłowe', desc: 'Wszystkie kategorie', icon: React.createElement(Forklift, { className: "h-6 w-6" }) },
  { value: 'cranes', label: 'Suwnice', desc: 'Wszystkie kategorie', icon: '🏭' },
  { value: 'winches', label: 'Wciągniki i wciągarki', desc: 'Wszystkie kategorie', icon: React.createElement(Wrench, { className: "h-6 w-6" }) },
  { value: 'platforms', label: 'Podesty ruchome', desc: '', icon: '🏗️' },
  { value: 'storage-stacker', label: 'Układnice magazynowe', desc: '', icon: '📦' },
  { value: 'stationary-cranes', label: 'Żurawie stacjonarne', desc: '', icon: '🚧' }
];

export const udtConservatorOptions = [
  { value: 'cranes', label: 'Suwnice', desc: 'Wszystkie kategorie', icon: '🏭' },
  { value: 'winches', label: 'Wciągniki i wciągarki', desc: 'Wszystkie kategorie', icon: React.createElement(Wrench, { className: "h-6 w-6" }) },
  { value: 'stationary-cranes', label: 'Żurawie stacjonarne', desc: '', icon: '🚧' },
  { value: 'storage-stacker', label: 'Układnice magazynowe', desc: '', icon: '📦' }
];

export const sepOptions = [
  { value: 'electrical', label: 'Elektryczne [E1, D1]', icon: '⚡' },
  { value: 'thermal', label: 'Cieplne [E2, D2]', icon: '🔥' },
  { value: 'gas', label: 'Gazowe [E3, D3]', icon: '🔥' }
];

export const participantOptions = [
  { value: '1', label: '1 osoba', icon: '👤' },
  { value: '2-5', label: '2-5 osób', icon: '👥' },
  { value: '6-10', label: '6-10 osób', icon: '👫' },
  { value: '11-15', label: '11-15 osób', icon: '👨‍👩‍👧‍👦' },
  { value: '15+', label: 'Powyżej 15 pracowników', icon: '🏢' }
];