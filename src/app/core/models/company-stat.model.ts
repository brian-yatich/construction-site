export interface CompanyStat {
  id: string;
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  logo: string;
}

export interface Partner {
  id: string;
  name: string;
  logo: string;
}

export interface ValueProposition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}
