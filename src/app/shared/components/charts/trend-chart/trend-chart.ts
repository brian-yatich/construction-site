import { AfterViewInit, Component, ElementRef, OnDestroy, computed, inject, input, signal, viewChild } from '@angular/core';

export interface TrendPoint {
  label: string;
  value: number;
}

const WIDTH = 300;
const HEIGHT = 100;
const PAD_Y = 10;

let nextId = 0;

/**
 * Minimal, dependency-free line/area trend chart. The line "draws in" via
 * an animated stroke-dashoffset when scrolled into view (skipped under
 * prefers-reduced-motion). Designed for use inside a `glass-panel` surface —
 * colors assume a dark/gradient background.
 */
@Component({
  selector: 'app-trend-chart',
  templateUrl: './trend-chart.html',
  styleUrl: './trend-chart.scss',
  host: { class: 'trend-chart' },
})
export class TrendChart implements AfterViewInit, OnDestroy {
  readonly points = input.required<TrendPoint[]>();

  readonly gradientId = `trend-fill-${nextId++}`;

  readonly total = computed(() => this.points().reduce((sum, p) => sum + p.value, 0));
  readonly maxValue = computed(() => Math.max(1, ...this.points().map((p) => p.value)));

  readonly coords = computed(() => {
    const pts = this.points();
    const max = this.maxValue();
    const step = pts.length > 1 ? WIDTH / (pts.length - 1) : 0;
    return pts.map((p, i) => ({
      x: pts.length > 1 ? i * step : WIDTH / 2,
      y: HEIGHT - PAD_Y - (p.value / max) * (HEIGHT - PAD_Y * 2),
      label: p.label,
      value: p.value,
    }));
  });

  readonly linePath = computed(() =>
    this.coords()
      .map((c, i) => `${i === 0 ? 'M' : 'L'}${c.x.toFixed(1)},${c.y.toFixed(1)}`)
      .join(' '),
  );

  readonly areaPath = computed(() => {
    const coords = this.coords();
    if (!coords.length) return '';
    const line = this.linePath();
    return `${line} L${coords[coords.length - 1].x.toFixed(1)},${HEIGHT} L${coords[0].x.toFixed(1)},${HEIGHT} Z`;
  });

  readonly dashLength = signal(0);
  readonly drawn = signal(false);

  private readonly pathRef = viewChild<ElementRef<SVGPathElement>>('lineEl');
  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const length = this.pathRef()?.nativeElement.getTotalLength() ?? 0;
    this.dashLength.set(length);

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      this.drawn.set(true);
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(() => this.drawn.set(true));
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
}
