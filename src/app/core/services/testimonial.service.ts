import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Testimonial } from '../models';
import { TESTIMONIALS_MOCK } from '../mock/testimonials.mock';

const SIMULATED_LATENCY = 250;

@Injectable({ providedIn: 'root' })
export class TestimonialService {
  getAll(): Observable<Testimonial[]> {
    return of(TESTIMONIALS_MOCK).pipe(delay(SIMULATED_LATENCY));
  }
}
