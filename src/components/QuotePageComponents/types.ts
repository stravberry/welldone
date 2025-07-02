export interface ServiceOption {
  value: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
}

export interface FormData {
  serviceType?: string;
  udtOperatorType?: string;
  udtConservatorType?: string;
  sepType?: string;
  participantsCount?: string;
  additionalInfo?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  consent?: boolean;
  marketing?: boolean;
}