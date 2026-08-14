import { TeamMember } from '../models';

const img = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const TEAM_MOCK: TeamMember[] = [
  {
    id: 't1',
    name: '[TEAM MEMBER NAME]',
    role: 'Chief Executive Officer',
    bio: 'Over two decades of leadership in delivering large-scale construction and infrastructure programs.',
    photo: img('team-ceo', 480, 480),
  },
  {
    id: 't2',
    name: '[TEAM MEMBER NAME]',
    role: 'Chief Engineer',
    bio: 'Leads structural and civil engineering strategy across the company\'s major project portfolio.',
    photo: img('team-engineer', 480, 480),
  },
  {
    id: 't3',
    name: '[TEAM MEMBER NAME]',
    role: 'Head of Project Management',
    bio: 'Oversees project delivery frameworks, scheduling and cost control across all active sites.',
    photo: img('team-pm', 480, 480),
  },
  {
    id: 't4',
    name: '[TEAM MEMBER NAME]',
    role: 'Head of Health & Safety',
    bio: 'Responsible for site safety standards, training programs and regulatory compliance.',
    photo: img('team-safety', 480, 480),
  },
];
