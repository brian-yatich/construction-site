import { AfterViewInit, Component, ElementRef, OnDestroy, input, signal, inject } from '@angular/core';
import { CompanyStat } from '../../../core/models';

@Component({
  selector: 'app-statistic-card',
  templateUrl: './statistic-card.html',
  styleUrl: './statistic-card.scss',
  host: { class: 'statistic-card' },
})
export class StatisticCard implements AfterViewInit, OnDestroy {
  readonly stat = input.required<CompanyStat>();

  readonly displayValue = signal(0);

  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private animated = false;

  ngAfterViewInit(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.displayValue.set(this.stat().value);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !this.animated) {
          this.animated = true;
          this.animateCount();
          this.observer?.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.hostRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private animateCount(): void {
    const target = this.stat().value;
    const duration = 1400;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.displayValue.set(Math.round(target * eased));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }
}
