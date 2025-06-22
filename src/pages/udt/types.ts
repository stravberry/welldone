
export interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  // Dodatkowe pola dla szczegółów szkolenia
  trainingType?: string;
  participants?: string;
  location?: string;
  timeline?: string;
  urgency?: string;
}
