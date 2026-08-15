import { Component, ElementRef, ViewChild, input } from '@angular/core';
import { ProjectCard } from '../../../../shared/components/project-card/project-card';
import { Project } from '../../../../core/models';

@Component({
  selector: 'app-ongoing-projects-carousel',
  imports: [ProjectCard],
  templateUrl: './ongoing-projects-carousel.html',
  styleUrl: './ongoing-projects-carousel.scss',
})
export class OngoingProjectsCarousel {
  readonly projects = input.required<Project[]>();

  @ViewChild('track') track?: ElementRef<HTMLDivElement>;

  scroll(direction: 'prev' | 'next'): void {
    const el = this.track?.nativeElement;
    if (!el) return;
    const amount = el.clientWidth * 0.9 * (direction === 'next' ? 1 : -1);
    el.scrollBy({ left: amount, behavior: 'smooth' });
  }
}
