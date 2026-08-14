import { CompanyStat, Certification, Partner, ValueProposition, TimelineEvent } from '../models';

export const COMPANY_STATS_MOCK: CompanyStat[] = [
  { id: 'stat-years', value: 15, suffix: '+', label: 'Years of Experience', icon: 'calendar_month' },
  { id: 'stat-projects', value: 120, suffix: '+', label: 'Projects Completed', icon: 'construction' },
  { id: 'stat-staff', value: 50, suffix: '+', label: 'Professional Staff', icon: 'groups' },
  { id: 'stat-clients', value: 25, suffix: '+', label: 'Major Clients', icon: 'handshake' },
];

export const CERTIFICATIONS_MOCK: Certification[] = [
  { id: 'c1', name: '[CERTIFICATION NAME]', issuer: '[ISSUING BODY]', logo: 'https://picsum.photos/seed/cert-1/240/140' },
  { id: 'c2', name: '[CERTIFICATION NAME]', issuer: '[ISSUING BODY]', logo: 'https://picsum.photos/seed/cert-2/240/140' },
  { id: 'c3', name: '[CERTIFICATION NAME]', issuer: '[ISSUING BODY]', logo: 'https://picsum.photos/seed/cert-3/240/140' },
  { id: 'c4', name: '[CERTIFICATION NAME]', issuer: '[ISSUING BODY]', logo: 'https://picsum.photos/seed/cert-4/240/140' },
];

export const PARTNERS_MOCK: Partner[] = Array.from({ length: 8 }, (_, i) => ({
  id: `partner-${i + 1}`,
  name: '[PARTNER NAME]',
  logo: `https://picsum.photos/seed/partner-${i + 1}/200/100`,
}));

export const VALUES_MOCK: ValueProposition[] = [
  { id: 'v1', title: 'Experienced Professionals', description: 'A team of qualified engineers and project managers with deep sector expertise.', icon: 'engineering' },
  { id: 'v2', title: 'Quality Assurance', description: 'Structured quality control processes applied at every stage of delivery.', icon: 'verified' },
  { id: 'v3', title: 'Safety First', description: 'A safety-first culture embedded across every site and every crew.', icon: 'health_and_safety' },
  { id: 'v4', title: 'On-Time Delivery', description: 'Disciplined scheduling and risk management to protect project timelines.', icon: 'schedule' },
  { id: 'v5', title: 'Cost Efficiency', description: 'Transparent cost planning and control to protect project budgets.', icon: 'payments' },
  { id: 'v6', title: 'Innovative Engineering', description: 'Modern engineering methods and technology applied to every project.', icon: 'lightbulb' },
];

export const TIMELINE_MOCK: TimelineEvent[] = [
  { year: '[YEAR]', title: 'Company Founded', description: 'Began operations delivering small-scale building construction projects.' },
  { year: '[YEAR]', title: 'Civil Engineering Division Launched', description: 'Expanded capabilities into structural and civil engineering services.' },
  { year: '[YEAR]', title: 'Infrastructure Milestone', description: 'Delivered our first major regional infrastructure program.' },
  { year: '[YEAR]', title: 'Regional Expansion', description: 'Opened a new regional office to support a growing project pipeline.' },
  { year: '[YEAR]', title: 'Today', description: 'Delivering building, civil engineering, road and infrastructure projects at scale.' },
];
