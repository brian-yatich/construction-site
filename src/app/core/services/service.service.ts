import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CompanyService as ServiceOffering } from '../models';
import { SERVICES_MOCK } from '../mock/services.mock';

const SIMULATED_LATENCY = 250;

/**
 * Backed by mock data today. Swap the method bodies for HttpClient calls
 * against a REST endpoint without changing the public API consumed by components.
 */
@Injectable({ providedIn: 'root' })
export class ServiceService {
  getAll(): Observable<ServiceOffering[]> {
    return of(SERVICES_MOCK).pipe(delay(SIMULATED_LATENCY));
  }

  getBySlug(slug: string): Observable<ServiceOffering | undefined> {
    return of(SERVICES_MOCK.find((s) => s.slug === slug)).pipe(delay(SIMULATED_LATENCY));
  }

  getPreview(limit = 6): Observable<ServiceOffering[]> {
    return of(SERVICES_MOCK.slice(0, limit)).pipe(delay(SIMULATED_LATENCY));
  }
}
