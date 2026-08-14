import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ServiceService, ProjectService, SeoService } from '../../../core/services';
import { CompanyService, Project } from '../../../core/models';
import { HeroSection, SectionHeader, ProjectCard, LoadingSpinner, EmptyState, CtaSection } from '../../../shared/components';
import { Reveal } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-service-detail',
  imports: [HeroSection, SectionHeader, ProjectCard, LoadingSpinner, EmptyState, CtaSection, Reveal, RouterLink, LowerCasePipe],
  templateUrl: './service-detail.html',
  styleUrl: './service-detail.scss',
})
export class ServiceDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly serviceService = inject(ServiceService);
  private readonly projectService = inject(ProjectService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly service = signal<CompanyService | undefined>(undefined);
  readonly relatedProjects = signal<Project[]>([]);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          this.notFound.set(false);
          return this.serviceService.getBySlug(params.get('slug') ?? '');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((service) => {
        this.loading.set(false);
        if (!service) {
          this.notFound.set(true);
          return;
        }
        this.service.set(service);
        this.seo.update({ title: service.title, description: service.shortDescription, path: `/services/${service.slug}` });
        this.loadRelated(service);
      });
  }

  private loadRelated(service: CompanyService): void {
    if (!service.relatedProjectSlugs.length) {
      this.relatedProjects.set([]);
      return;
    }
    this.projectService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((projects) => {
        this.relatedProjects.set(projects.filter((p) => service.relatedProjectSlugs.includes(p.slug)));
      });
  }
}
