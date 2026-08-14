export type ProjectCategory = 'building' | 'civil-engineering' | 'roads' | 'infrastructure';
export type ProjectStatus = 'completed' | 'ongoing';

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  location: string;
  category: ProjectCategory;
  categoryLabel: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  scopeOfWork: string[];
  startDate: string;
  completionDate: string;
  durationMonths: number;
  progressPercent?: number;
  client: string;
  heroImage: string;
  thumbnailImage: string;
  gallery: string[];
  stats: ProjectStat[];
  featured: boolean;
}
