import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ResourceConfig } from '../../core/resource-config';
import { AdminResourceService } from '../../core/admin-resource.service';

@Component({
  selector: 'app-admin-resource-list',
  imports: [RouterLink],
  templateUrl: './resource-list.html',
  styleUrl: './resource-list.scss',
})
export class ResourceList implements OnInit {
  readonly config = input.required<ResourceConfig>();

  private readonly http = inject(HttpClient);
  private readonly destroyRef = inject(DestroyRef);
  private service!: AdminResourceService;

  readonly rows = signal<Record<string, any>[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly deletingId = signal<string | null>(null);

  ngOnInit(): void {
    this.service = new AdminResourceService(this.http, this.config().apiPath);
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.error.set(false);
    this.service
      .list()
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

  confirmDelete(row: Record<string, any>): void {
    const label = row['name'] ?? row['title'] ?? row['label'] ?? row['clientName'] ?? row['id'];
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;

    this.deletingId.set(row['id']);
    this.service.remove(row['id']).subscribe({
      next: () => {
        this.rows.update((rows) => rows.filter((r) => r['id'] !== row['id']));
        this.deletingId.set(null);
      },
      error: () => {
        this.deletingId.set(null);
        alert('Failed to delete. Please try again.');
      },
    });
  }
}
