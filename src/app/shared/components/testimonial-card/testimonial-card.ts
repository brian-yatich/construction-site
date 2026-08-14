import { Component, input } from '@angular/core';
import { Testimonial } from '../../../core/models';

@Component({
  selector: 'app-testimonial-card',
  templateUrl: './testimonial-card.html',
  styleUrl: './testimonial-card.scss',
})
export class TestimonialCard {
  readonly testimonial = input.required<Testimonial>();
}
