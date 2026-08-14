export type ProjectType =
  | 'Building Construction'
  | 'Road Construction'
  | 'Civil Engineering'
  | 'Renovation'
  | 'Industrial Construction'
  | 'Infrastructure'
  | 'Other';

export interface QuoteRequestPayload {
  fullName: string;
  company?: string;
  email: string;
  phone: string;
  projectType: ProjectType;
  projectLocation: string;
  estimatedBudget?: string;
  expectedStartDate: string;
  expectedCompletion?: string;
  projectDescription: string;
  documents?: File[];
}
