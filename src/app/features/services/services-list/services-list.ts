import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ServiceService, SeoService } from '../../../core/services';
import { CompanyService } from '../../../core/models';
import { HeroSection, SectionHeader, ServiceCard, LoadingSpinner, ErrorState, CtaSection } from '../../../shared/components';
import { Reveal } from '../../../shared/directives/reveal.directive';
import { unsplash, UNSPLASH } from '../../../core/mock/unsplash';

@Component({
  selector: 'app-services-list',
  imports: [HeroSection, SectionHeader, ServiceCard, LoadingSpinner, ErrorState, CtaSection, Reveal],
  templateUrl: './services-list.html',
  styleUrl: './services-list.scss',
})
export class ServicesList implements OnInit {
  private readonly serviceService = inject(ServiceService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly services = signal<CompanyService[]>([]);
  readonly loading = signal(true);
  readonly hasError = signal(false);

  readonly heroImage = unsplash(UNSPLASH.workersGroup, 1920, 900);

  ngOnInit(): void {
    this.seo.update({
      title: 'Our Services',
      description: 'Explore our full range of construction, civil engineering and infrastructure services.',
      path: '/services',
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.hasError.set(false);
    this.serviceService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.services.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.loading.set(false);
        },
      });
  }
}
