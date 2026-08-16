import { Component, computed, input } from '@angular/core';

export interface DonutChartDatum {
  label: string;
  value: number;
  color: string;
}

interface DonutSegment extends DonutChartDatum {
  dashArray: string;
  dashOffset: number;
  percent: number;
}

const RADIUS = 42;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * Minimal, dependency-free donut chart built from stacked SVG circle
 * strokes. Designed for use inside a `glass-panel` surface — colors assume
 * a dark/gradient background.
 */
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.html',
  styleUrl: './donut-chart.scss',
  host: { class: 'donut-chart' },
})
export class DonutChart {
  readonly data = input.required<DonutChartDatum[]>();

  readonly total = computed(() => this.data().reduce((sum, d) => sum + d.value, 0));

  readonly segments = computed<DonutSegment[]>(() => {
    const total = this.total();
    if (!total) return [];

    let cursor = 0;
    return this.data()
      .filter((d) => d.value > 0)
      .map((d) => {
        const fraction = d.value / total;
        const length = fraction * CIRCUMFERENCE;
        const segment: DonutSegment = {
          ...d,
          percent: Math.round(fraction * 100),
          dashArray: `${length} ${CIRCUMFERENCE - length}`,
          dashOffset: -cursor,
        };
        cursor += length;
        return segment;
      });
  });
}
