import { Testimonial } from '../models';

const img = (seed: string, w: number, h: number) => `https://picsum.photos/seed/${seed}/${w}/${h}`;

export const TESTIMONIALS_MOCK: Testimonial[] = [
  {
    id: 'tm1',
    quote:
      'The team delivered our facility ahead of schedule without compromising on quality. Their engineering rigor and communication set them apart.',
    clientName: '[CLIENT NAME]',
    position: '[POSITION]',
    company: '[COMPANY NAME]',
    photo: img('client-1', 160, 160),
  },
  {
    id: 'tm2',
    quote:
      'From feasibility through handover, we had complete confidence in their project management and technical expertise.',
    clientName: '[CLIENT NAME]',
    position: '[POSITION]',
    company: '[COMPANY NAME]',
    photo: img('client-2', 160, 160),
  },
  {
    id: 'tm3',
    quote:
      'Safety and quality were never compromised, even under an accelerated schedule. A genuinely professional partner.',
    clientName: '[CLIENT NAME]',
    position: '[POSITION]',
    company: '[COMPANY NAME]',
    photo: img('client-3', 160, 160),
  },
];
