import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService, SeoService } from '../../../core/services';
import { Project } from '../../../core/models';
import {
  HeroSection,
  SectionHeader,
  ProjectCard,
  ProjectGallery,
  LoadingSpinner,
  EmptyState,
  CtaSection,
} from '../../../shared/components';
import { Reveal } from '../../../shared/directives/reveal.directive';

@Component({
  selector: 'app-project-detail',
  imports: [HeroSection, SectionHeader, ProjectCard, ProjectGallery, LoadingSpinner, EmptyState, CtaSection, Reveal, RouterLink, DatePipe],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.scss',
})
export class ProjectDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly project = signal<Project | undefined>(undefined);
  readonly relatedProjects = signal<Project[]>([]);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          this.notFound.set(false);
          return this.projectService.getBySlug(params.get('slug') ?? '');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((project) => {
        this.loading.set(false);
        if (!project) {
          this.notFound.set(true);
          return;
        }
        this.project.set(project);
        this.seo.update({ title: project.name.replace('[PROJECT NAME] — ', ''), description: project.summary, path: `/projects/${project.slug}` });
        this.projectService
          .getRelated(project)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((related) => this.relatedProjects.set(related));
      });
  }
}
