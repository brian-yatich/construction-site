import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogService, SeoService } from '../../../core/services';
import { BlogCategory, BlogPost } from '../../../core/models';
import { HeroSection, BlogCard, LoadingSpinner, ErrorState, EmptyState } from '../../../shared/components';
import { Reveal } from '../../../shared/directives/reveal.directive';
import { unsplash, UNSPLASH } from '../../../core/mock/unsplash';

type CategoryFilter = BlogCategory | 'all';

const CATEGORY_OPTIONS: { value: CategoryFilter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'company-news', label: 'Company News' },
  { value: 'project-updates', label: 'Project Updates' },
  { value: 'construction', label: 'Construction' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'safety', label: 'Safety' },
  { value: 'sustainability', label: 'Sustainability' },
  { value: 'technology', label: 'Technology' },
];

@Component({
  selector: 'app-blog-list',
  imports: [HeroSection, BlogCard, LoadingSpinner, ErrorState, EmptyState, Reveal],
  templateUrl: './blog-list.html',
  styleUrl: './blog-list.scss',
})
export class BlogList implements OnInit {
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categoryOptions = CATEGORY_OPTIONS;
  readonly selectedCategory = signal<CategoryFilter>('all');

  readonly posts = signal<BlogPost[]>([]);
  readonly loading = signal(true);
  readonly hasError = signal(false);

  readonly heroImage = unsplash(UNSPLASH.personDraftingBlueprint, 1920, 900);

  ngOnInit(): void {
    this.seo.update({
      title: 'News & Insights',
      description: 'Company news, project updates and engineering insights from [COMPANY NAME].',
      path: '/news',
    });
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.hasError.set(false);
    this.blogService
      .getAll(this.selectedCategory())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.posts.set(data);
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
    this.load();
  }
}
