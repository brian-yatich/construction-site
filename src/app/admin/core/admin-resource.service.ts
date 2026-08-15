import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ADMIN_API_BASE } from './admin-api.config';

/**
 * Thin generic CRUD client for a single admin REST resource
 * (e.g. `/admin/projects`). Instantiated per-resource by field configs.
 */
export class AdminResourceService<T = any> {
  constructor(
    private readonly http: HttpClient,
    private readonly path: string,
  ) {}

  private get url(): string {
    return `${ADMIN_API_BASE}${this.path}`;
  }

  list(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  get(id: string): Observable<T> {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  create(data: Partial<T>): Observable<T> {
    return this.http.post<T>(this.url, data);
  }

  update(id: string, data: Partial<T>): Observable<T> {
    return this.http.patch<T>(`${this.url}/${id}`, data);
  }

  remove(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }
}
