import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Project, ProjectCategory, ProjectStatus } from '../models';
import { PROJECTS_MOCK } from '../mock/projects.mock';

export interface ProjectFilter {
  category?: ProjectCategory | 'all';
  status?: ProjectStatus | 'all';
}

const SIMULATED_LATENCY = 250;

/**
 * Backed by mock data today. Swap the method bodies for HttpClient calls
 * against a REST endpoint (e.g. `this.http.get<Project[]>('/api/projects')`)
 * without changing the public API consumed by components.
 */
@Injectable({ providedIn: 'root' })
export class ProjectService {
  getAll(filter?: ProjectFilter): Observable<Project[]> {
    let results = PROJECTS_MOCK;

    if (filter?.category && filter.category !== 'all') {
      results = results.filter((p) => p.category === filter.category);
    }
    if (filter?.status && filter.status !== 'all') {
      results = results.filter((p) => p.status === filter.status);
    }

    return of(results).pipe(delay(SIMULATED_LATENCY));
  }

  getFeatured(): Observable<Project[]> {
    return of(PROJECTS_MOCK.filter((p) => p.featured)).pipe(delay(SIMULATED_LATENCY));
  }

  getOngoing(): Observable<Project[]> {
    return of(PROJECTS_MOCK.filter((p) => p.status === 'ongoing')).pipe(delay(SIMULATED_LATENCY));
  }

  getBySlug(slug: string): Observable<Project | undefined> {
    return of(PROJECTS_MOCK.find((p) => p.slug === slug)).pipe(delay(SIMULATED_LATENCY));
  }

  getRelated(project: Project, limit = 3): Observable<Project[]> {
    return of(
      PROJECTS_MOCK.filter((p) => p.slug !== project.slug && p.category === project.category).slice(0, limit),
    ).pipe(delay(SIMULATED_LATENCY));
  }
}
