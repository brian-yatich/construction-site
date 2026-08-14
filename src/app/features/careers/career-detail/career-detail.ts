import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CareerService, SeoService } from '../../../core/services';
import { JobVacancy } from '../../../core/models';
import { HeroSection, LoadingSpinner, EmptyState } from '../../../shared/components';
import { unsplash, UNSPLASH } from '../../../core/mock/unsplash';

@Component({
  selector: 'app-career-detail',
  imports: [HeroSection, LoadingSpinner, EmptyState, RouterLink, DatePipe],
  templateUrl: './career-detail.html',
  styleUrl: './career-detail.scss',
})
export class CareerDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly careerService = inject(CareerService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly job = signal<JobVacancy | undefined>(undefined);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  readonly heroImage = unsplash(UNSPLASH.workersSunset, 1920, 700);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          this.notFound.set(false);
          return this.careerService.getById(params.get('id') ?? '');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((job) => {
        this.loading.set(false);
        if (!job) {
          this.notFound.set(true);
          return;
        }
        this.job.set(job);
        this.seo.update({ title: job.title, description: job.summary, path: `/careers/${job.id}` });
      });
  }
}
