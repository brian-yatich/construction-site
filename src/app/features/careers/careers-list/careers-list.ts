import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CareerService, SeoService } from '../../../core/services';
import { JobVacancy } from '../../../core/models';
import { HeroSection, SectionHeader, JobCard, LoadingSpinner, ErrorState, EmptyState } from '../../../shared/components';
import { Reveal } from '../../../shared/directives/reveal.directive';
import { unsplash, UNSPLASH } from '../../../core/mock/unsplash';

interface WhyItem {
  icon: string;
  title: string;
  description: string;
}

const WHY_ITEMS: WhyItem[] = [
  { icon: 'trending_up', title: 'Career Growth', description: 'Structured development pathways and mentorship across every role.' },
  { icon: 'health_and_safety', title: 'Safety First', description: 'A genuine safety-first culture on every site, every day.' },
  { icon: 'diversity_3', title: 'Collaborative Culture', description: 'Work alongside experienced engineers and project professionals.' },
  { icon: 'payments', title: 'Competitive Benefits', description: 'Competitive compensation and benefits packages across our teams.' },
];

@Component({
  selector: 'app-careers-list',
  imports: [HeroSection, SectionHeader, JobCard, LoadingSpinner, ErrorState, EmptyState, Reveal],
  templateUrl: './careers-list.html',
  styleUrl: './careers-list.scss',
})
export class CareersList implements OnInit {
  private readonly careerService = inject(CareerService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly jobs = signal<JobVacancy[]>([]);
  readonly loading = signal(true);
  readonly hasError = signal(false);
  readonly whyItems = WHY_ITEMS;

  readonly heroImage = unsplash(UNSPLASH.workerPowerTool, 1920, 900);
  readonly cultureImage = unsplash(UNSPLASH.twoWorkers, 900, 1000);

  ngOnInit(): void {
    this.seo.update({
      title: 'Careers',
      description: 'Explore current job openings and build your career with [COMPANY NAME].',
      path: '/careers',
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.hasError.set(false);
    this.careerService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.jobs.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.loading.set(false);
        },
      });
  }
}
