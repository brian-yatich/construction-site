import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { CompanyStat, Certification, Partner, ValueProposition, TimelineEvent } from '../models';
import { COMPANY_STATS_MOCK, CERTIFICATIONS_MOCK, PARTNERS_MOCK, VALUES_MOCK, TIMELINE_MOCK } from '../mock/company.mock';

const SIMULATED_LATENCY = 250;

/** Aggregates company-wide content (stats, certifications, partners, values, history). */
@Injectable({ providedIn: 'root' })
export class CompanyInfoService {
  getStats(): Observable<CompanyStat[]> {
    return of(COMPANY_STATS_MOCK).pipe(delay(SIMULATED_LATENCY));
  }

  getCertifications(): Observable<Certification[]> {
    return of(CERTIFICATIONS_MOCK).pipe(delay(SIMULATED_LATENCY));
  }

  getPartners(): Observable<Partner[]> {
    return of(PARTNERS_MOCK).pipe(delay(SIMULATED_LATENCY));
  }

  getValues(): Observable<ValueProposition[]> {
    return of(VALUES_MOCK).pipe(delay(SIMULATED_LATENCY));
  }

  getTimeline(): Observable<TimelineEvent[]> {
    return of(TIMELINE_MOCK).pipe(delay(SIMULATED_LATENCY));
  }
}
