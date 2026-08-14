import { Component, DestroyRef, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ProjectService, SeoService } from '../../../core/services';
import { Project, ProjectCategory, ProjectStatus } from '../../../core/models';
import { HeroSection, ProjectCard, LoadingSpinner, ErrorState, EmptyState } from '../../../shared/components';
import { Reveal } from '../../../shared/directives/reveal.directive';
import { unsplash, UNSPLASH } from '../../../core/mock/unsplash';

type CategoryFilter = ProjectCategory | 'all';
type StatusFilter = ProjectStatus | 'all';

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'building', label: 'Building' },
  { value: 'civil-engineering', label: 'Civil Engineering' },
  { value: 'roads', label: 'Roads' },
  { value: 'infrastructure', label: 'Infrastructure' },
];

const STATUS_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'ongoing', label: 'Ongoing' },
];

@Component({
  selector: 'app-projects-list',
  imports: [HeroSection, ProjectCard, LoadingSpinner, ErrorState, EmptyState, Reveal],
  templateUrl: './projects-list.html',
  styleUrl: './projects-list.scss',
})
export class ProjectsList implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly statusOptions = STATUS_OPTIONS;

  readonly allProjects = signal<Project[]>([]);
  readonly loading = signal(true);
  readonly hasError = signal(false);

  readonly selectedCategory = signal<CategoryFilter>('all');
  readonly selectedStatus = signal<StatusFilter>('all');

  readonly filteredProjects = computed(() => {
    const category = this.selectedCategory();
    const status = this.selectedStatus();
    return this.allProjects().filter(
      (p) => (category === 'all' || p.category === category) && (status === 'all' || p.status === status),
    );
  });

  readonly heroImage = unsplash(UNSPLASH.nightHighRise, 1920, 900);

  ngOnInit(): void {
    this.seo.update({
      title: 'Projects',
      description: 'Browse our portfolio of building, civil engineering, road and infrastructure projects.',
      path: '/projects',
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.hasError.set(false);
    this.projectService
      .getAll()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.allProjects.set(data);
          this.loading.set(false);
        },
        error: () => {
          this.hasError.set(true);
          this.loading.set(false);
        },
      });
  }

  setCategory(value: CategoryFilter): void {
    this.selectedCategory.set(value);
  }

  setStatus(value: StatusFilter): void {
    this.selectedStatus.set(value);
  }
}
