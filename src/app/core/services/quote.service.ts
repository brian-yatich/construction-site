import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { QuoteRequestPayload } from '../models';

const SIMULATED_LATENCY = 900;

export interface QuoteSubmissionResult {
  success: boolean;
  referenceId?: string;
}

/**
 * Mock implementation. Replace with an HttpClient POST to `/api/quotes`
 * (multipart/form-data if `documents` is populated) once the backend exists.
 */
@Injectable({ providedIn: 'root' })
export class QuoteService {
  submit(payload: QuoteRequestPayload): Observable<QuoteSubmissionResult> {
    return of({ success: true, referenceId: `QR-${Date.now().toString().slice(-8)}` }).pipe(delay(SIMULATED_LATENCY));
  }
}
