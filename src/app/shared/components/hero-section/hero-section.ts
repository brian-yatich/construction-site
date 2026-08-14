import { Component, input } from '@angular/core';
import { Breadcrumb, BreadcrumbItem } from '../breadcrumb/breadcrumb';

@Component({
  selector: 'app-hero-section',
  imports: [Breadcrumb],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.scss',
})
export class HeroSection {
  readonly image = input.required<string>();
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly size = input<'full' | 'compact'>('compact');
  readonly breadcrumbs = input<BreadcrumbItem[]>();
  readonly showScrollHint = input(false);
}
