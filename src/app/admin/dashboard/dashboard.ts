import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ADMIN_API_BASE } from '../core/admin-api.config';
import { BarChart, DonutChart, TrendChart, BarChartDatum, DonutChartDatum, TrendPoint } from '../../shared/components';

interface DashboardCard {
  label: string;
  count: number;
  icon: string;
  path: string;
}

interface LeadRow {
  id: string;
  status: 'new' | 'read' | 'archived' | string;
  createdAt: string;
}

interface ProjectRow {
  category: string;
  categoryLabel: string;
  status: string;
}

const TREND_DAYS = 14;
const LEAD_STATUS_COLORS: Record<string, string> = {
  new: '#c8912f', // $color-accent
  read: '#3d6c99', // $color-primary-400
  archived: '#8b939b', // $color-grey-500
};
const CATEGORY_PALETTE = ['#c8912f', '#3d6c99', '#7ba0bf', '#e0b25f', '#26507a'];

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink, BarChart, DonutChart, TrendChart],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly http = inject(HttpClient);

  readonly loading = signal(true);
  readonly cards = signal<DashboardCard[]>([]);
  readonly newLeadsCount = signal(0);

  private readonly contactRows = signal<LeadRow[]>([]);
  private readonly quoteRows = signal<LeadRow[]>([]);
  private readonly projectRows = signal<ProjectRow[]>([]);

  /** Content counts per resource type, excluding leads (charted separately). */
  readonly contentChartData = computed<BarChartDatum[]>(() =>
    this.cards()
      .filter((c) => c.label !== 'Contact Submissions' && c.label !== 'Quote Requests')
      .map((c) => ({ label: c.label, value: c.count })),
  );

  /** Contact + quote submissions grouped by status. */
  readonly leadsStatusData = computed<DonutChartDatum[]>(() => {
    const counts: Record<string, number> = { new: 0, read: 0, archived: 0 };
    for (const row of [...this.contactRows(), ...this.quoteRows()]) {
      counts[row.status] = (counts[row.status] ?? 0) + 1;
    }
    return [
      { label: 'New', value: counts['new'], color: LEAD_STATUS_COLORS['new'] },
      { label: 'Read', value: counts['read'], color: LEAD_STATUS_COLORS['read'] },
      { label: 'Archived', value: counts['archived'], color: LEAD_STATUS_COLORS['archived'] },
    ];
  });

  /** Projects grouped by category. */
  readonly projectCategoryData = computed<DonutChartDatum[]>(() => {
    const counts = new Map<string, number>();
    for (const project of this.projectRows()) {
      const key = project.categoryLabel || project.category || 'Other';
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([label, value], i) => ({
      label,
      value,
      color: CATEGORY_PALETTE[i % CATEGORY_PALETTE.length],
    }));
  });

  /** Daily count of new contact + quote submissions over the last 14 days. */
  readonly leadsTrendData = computed<TrendPoint[]>(() => {
    const rows = [...this.contactRows(), ...this.quoteRows()];
    const points: TrendPoint[] = [];
    const today = new Date();

    for (let i = TREND_DAYS - 1; i >= 0; i--) {
      const day = new Date(today);
      day.setDate(day.getDate() - i);
      const key = day.toISOString().slice(0, 10);
      const value = rows.filter((r) => (r.createdAt || '').slice(0, 10) === key).length;
      points.push({ label: day.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }), value });
    }
    return points;
  });

  ngOnInit(): void {
    forkJoin({
      projects: this.http.get<ProjectRow[]>(`${ADMIN_API_BASE}/admin/projects`),
      services: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/services`),
      team: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/team`),
      blog: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/blog`),
      careers: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/careers`),
      contact: this.http.get<LeadRow[]>(`${ADMIN_API_BASE}/admin/contact`),
      quotes: this.http.get<LeadRow[]>(`${ADMIN_API_BASE}/admin/quotes`),
    }).subscribe({
      next: (res) => {
        this.cards.set([
          { label: 'Projects', count: res.projects.length, icon: 'construction', path: '/admin/projects' },
          { label: 'Services', count: res.services.length, icon: 'engineering', path: '/admin/services' },
          { label: 'Team Members', count: res.team.length, icon: 'groups', path: '/admin/team' },
          { label: 'Blog Posts', count: res.blog.length, icon: 'article', path: '/admin/blog' },
          { label: 'Job Vacancies', count: res.careers.length, icon: 'work', path: '/admin/careers' },
          { label: 'Contact Submissions', count: res.contact.length, icon: 'mail', path: '/admin/leads/contact' },
          { label: 'Quote Requests', count: res.quotes.length, icon: 'request_quote', path: '/admin/leads/quotes' },
        ]);
        this.newLeadsCount.set(
          res.contact.filter((c) => c.status === 'new').length + res.quotes.filter((q) => q.status === 'new').length,
        );
        this.contactRows.set(res.contact);
        this.quoteRows.set(res.quotes);
        this.projectRows.set(res.projects);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
