import { Component, OnDestroy, OnInit, input, signal } from '@angular/core';
import { TestimonialCard } from '../../../../shared/components/testimonial-card/testimonial-card';
import { Testimonial } from '../../../../core/models';

@Component({
  selector: 'app-testimonials-carousel',
  imports: [TestimonialCard],
  templateUrl: './testimonials-carousel.html',
  styleUrl: './testimonials-carousel.scss',
})
export class TestimonialsCarousel implements OnInit, OnDestroy {
  readonly testimonials = input.required<Testimonial[]>();

  readonly activeIndex = signal(0);

  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduceMotion) {
      this.timer = setInterval(() => this.next(), 7000);
    }
  }

  ngOnDestroy(): void {
    if (this.timer) clearInterval(this.timer);
  }

  next(): void {
    const total = this.testimonials().length;
    if (!total) return;
    this.activeIndex.update((i) => (i + 1) % total);
  }

  prev(): void {
    const total = this.testimonials().length;
    if (!total) return;
    this.activeIndex.update((i) => (i - 1 + total) % total);
  }

  goTo(index: number): void {
    this.activeIndex.set(index);
  }
}
