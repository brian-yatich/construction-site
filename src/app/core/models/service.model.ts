export interface ServiceProcessStep {
  title: string;
  description: string;
}

export interface CompanyService {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string;
  heroImage: string;
  capabilities: string[];
  scopeOfWork: string[];
  process: ServiceProcessStep[];
  relatedProjectSlugs: string[];
}
