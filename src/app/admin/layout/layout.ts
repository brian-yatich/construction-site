import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AdminAuthService } from '../core/admin-auth.service';

interface NavGroup {
  label: string;
  links: { path: string; label: string; icon: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: 'Overview',
    links: [{ path: '/admin', label: 'Dashboard', icon: 'dashboard' }],
  },
  {
    label: 'Content',
    links: [
      { path: '/admin/projects', label: 'Projects', icon: 'construction' },
      { path: '/admin/services', label: 'Services', icon: 'engineering' },
      { path: '/admin/team', label: 'Team', icon: 'groups' },
      { path: '/admin/testimonials', label: 'Testimonials', icon: 'format_quote' },
      { path: '/admin/blog', label: 'News & Blog', icon: 'article' },
      { path: '/admin/careers', label: 'Careers', icon: 'work' },
    ],
  },
  {
    label: 'Company Info',
    links: [
      { path: '/admin/stats', label: 'Statistics', icon: 'bar_chart' },
      { path: '/admin/certifications', label: 'Certifications', icon: 'verified' },
      { path: '/admin/partners', label: 'Partners', icon: 'handshake' },
      { path: '/admin/values', label: 'Values', icon: 'star' },
      { path: '/admin/timeline', label: 'History Timeline', icon: 'timeline' },
    ],
  },
  {
    label: 'Leads',
    links: [
      { path: '/admin/leads/contact', label: 'Contact Submissions', icon: 'mail' },
      { path: '/admin/leads/quotes', label: 'Quote Requests', icon: 'request_quote' },
    ],
  },
];

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  readonly navGroups = NAV_GROUPS;
  readonly auth = inject(AdminAuthService);

  logout(): void {
    this.auth.logout();
  }
}
