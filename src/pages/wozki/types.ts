
export interface FormData {
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
}

export interface LiftingTruckType {
  id: string;
  name: string;
  description: string;
  category: string;
  requirements: string[];
  duration: string;
  price: string;
  popular?: boolean;
  features: string[];
}

export interface SafetyFeature {
  title: string;
  description: string;
  icon: string;
}

export interface ComparisonFeature {
  feature: string;
  basic: boolean | string;
  standard: boolean | string;
  premium: boolean | string;
}
