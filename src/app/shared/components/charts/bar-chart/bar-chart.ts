import { AfterViewInit, Component, ElementRef, OnDestroy, computed, inject, input, signal } from '@angular/core';

export interface BarChartDatum {
  label: string;
  value: number;
}

/**
 * Minimal, dependency-free vertical bar chart. Bars grow in on scroll into
 * view (skipped under prefers-reduced-motion). Designed for use inside a
 * `glass-panel` surface — colors assume a dark/gradient background.
 */
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.html',
  styleUrl: './bar-chart.scss',
  host: { class: 'bar-chart' },
})
export class BarChart implements AfterViewInit, OnDestroy {
  readonly data = input.required<BarChartDatum[]>();

  readonly maxValue = computed(() => Math.max(1, ...this.data().map((d) => d.value)));
  readonly grown = signal(false);

  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.grown.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          this.grown.set(true);
          this.observer?.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    this.observer.observe(this.hostRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  barHeight(value: number): number {
    return this.grown() ? (value / this.maxValue()) * 100 : 0;
  }
}
