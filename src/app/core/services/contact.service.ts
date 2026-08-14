import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { ContactFormPayload } from '../models';

const SIMULATED_LATENCY = 900;

export interface ContactSubmissionResult {
  success: boolean;
}

/**
 * Mock implementation. Replace with an HttpClient POST to `/api/contact`
 * once the backend exists.
 */
@Injectable({ providedIn: 'root' })
export class ContactService {
  submit(payload: ContactFormPayload): Observable<ContactSubmissionResult> {
    return of({ success: true }).pipe(delay(SIMULATED_LATENCY));
  }
}
