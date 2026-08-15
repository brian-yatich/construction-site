import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ADMIN_API_BASE } from '../core/admin-api.config';

const STATUS_OPTIONS = ['new', 'read', 'archived'];

@Component({
  selector: 'app-admin-leads-list',
  imports: [DatePipe],
  templateUrl: './leads-list.html',
  styleUrl: './leads-list.scss',
})
export class LeadsList implements OnInit {
  /** 'contact' or 'quotes' */
  readonly kind = input.required<'contact' | 'quotes'>();

  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);

  readonly statusOptions = STATUS_OPTIONS;
  readonly rows = signal<any[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly expandedId = signal<string | null>(null);

  get title(): string {
    return this.kind() === 'contact' ? 'Contact Submissions' : 'Quote Requests';
  }

  private get baseUrl(): string {
    return `${ADMIN_API_BASE}/admin/${this.kind()}`;
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.http
      .get<any[]>(this.baseUrl)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.rows.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.error.set(true);
          this.loading.set(false);
        },
      });
  }

  toggleExpand(id: string): void {
    this.expandedId.set(this.expandedId() === id ? null : id);
  }

  updateStatus(row: any, status: string): void {
    this.http.patch(`${this.baseUrl}/${row.id}/status`, { status }).subscribe({
      next: () => this.rows.update((rows) => rows.map((r) => (r.id === row.id ? { ...r, status } : r))),
      error: () => alert('Failed to update status.'),
    });
  }

  remove(row: any): void {
    if (!confirm('Delete this entry? This cannot be undone.')) return;
    this.http.delete(`${this.baseUrl}/${row.id}`).subscribe({
      next: () => this.rows.update((rows) => rows.filter((r) => r.id !== row.id)),
      error: () => alert('Failed to delete.'),
    });
  }
}
