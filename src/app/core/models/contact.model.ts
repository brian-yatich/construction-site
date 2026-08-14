export interface ContactFormPayload {
  name: string;
  email: string;
  phone: string;
  company?: string;
  subject: string;
  message: string;
}

export type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';
