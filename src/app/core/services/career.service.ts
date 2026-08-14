import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { JobVacancy } from '../models';
import { CAREERS_MOCK } from '../mock/careers.mock';

const SIMULATED_LATENCY = 250;

@Injectable({ providedIn: 'root' })
export class CareerService {
  getAll(): Observable<JobVacancy[]> {
    return of(CAREERS_MOCK).pipe(delay(SIMULATED_LATENCY));
  }

  getById(id: string): Observable<JobVacancy | undefined> {
    return of(CAREERS_MOCK.find((j) => j.id === id)).pipe(delay(SIMULATED_LATENCY));
  }
}
