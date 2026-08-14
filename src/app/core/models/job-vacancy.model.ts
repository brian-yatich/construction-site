export type EmploymentType = 'Full-time' | 'Part-time' | 'Contract' | 'Internship';

export interface JobVacancy {
  id: string;
  title: string;
  location: string;
  employmentType: EmploymentType;
  department: string;
  closingDate: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  experience: string;
  benefits: string[];
}
