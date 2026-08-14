import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { BlogCategory, BlogPost } from '../models';
import { BLOG_MOCK } from '../mock/blog.mock';

const SIMULATED_LATENCY = 250;

@Injectable({ providedIn: 'root' })
export class BlogService {
  getAll(category?: BlogCategory | 'all'): Observable<BlogPost[]> {
    const results = !category || category === 'all' ? BLOG_MOCK : BLOG_MOCK.filter((p) => p.category === category);
    return of(results).pipe(delay(SIMULATED_LATENCY));
  }

  getBySlug(slug: string): Observable<BlogPost | undefined> {
    return of(BLOG_MOCK.find((p) => p.slug === slug)).pipe(delay(SIMULATED_LATENCY));
  }

  getRecent(limit = 3): Observable<BlogPost[]> {
    return of(BLOG_MOCK.slice(0, limit)).pipe(delay(SIMULATED_LATENCY));
  }
}
