import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogService, SeoService } from '../../../core/services';
import { BlogPost } from '../../../core/models';
import { HeroSection, SectionHeader, BlogCard, LoadingSpinner, EmptyState } from '../../../shared/components';

@Component({
  selector: 'app-blog-detail',
  imports: [HeroSection, SectionHeader, BlogCard, LoadingSpinner, EmptyState, RouterLink, DatePipe],
  templateUrl: './blog-detail.html',
  styleUrl: './blog-detail.scss',
})
export class BlogDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly blogService = inject(BlogService);
  private readonly seo = inject(SeoService);
  private readonly destroyRef = inject(DestroyRef);

  readonly post = signal<BlogPost | undefined>(undefined);
  readonly recentPosts = signal<BlogPost[]>([]);
  readonly loading = signal(true);
  readonly notFound = signal(false);

  ngOnInit(): void {
    this.route.paramMap
      .pipe(
        switchMap((params) => {
          this.loading.set(true);
          this.notFound.set(false);
          return this.blogService.getBySlug(params.get('slug') ?? '');
        }),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((post) => {
        this.loading.set(false);
        if (!post) {
          this.notFound.set(true);
          return;
        }
        this.post.set(post);
        this.seo.update({ title: post.title, description: post.excerpt, path: `/news/${post.slug}` });
        this.blogService
          .getRecent(3)
          .pipe(takeUntilDestroyed(this.destroyRef))
          .subscribe((recent) => this.recentPosts.set(recent.filter((p) => p.slug !== post.slug)));
      });
  }
}
