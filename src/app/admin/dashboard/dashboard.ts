import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ADMIN_API_BASE } from '../core/admin-api.config';

interface DashboardCard {
  label: string;
  count: number;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard implements OnInit {
  private readonly http = inject(HttpClient);

  readonly loading = signal(true);
  readonly cards = signal<DashboardCard[]>([]);
  readonly newLeadsCount = signal(0);

  ngOnInit(): void {
    forkJoin({
      projects: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/projects`),
      services: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/services`),
      team: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/team`),
      blog: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/blog`),
      careers: this.http.get<unknown[]>(`${ADMIN_API_BASE}/admin/careers`),
      contact: this.http.get<{ status: string }[]>(`${ADMIN_API_BASE}/admin/contact`),
      quotes: this.http.get<{ status: string }[]>(`${ADMIN_API_BASE}/admin/quotes`),
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
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
