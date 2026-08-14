import { Component, HostListener, input, signal } from '@angular/core';

@Component({
  selector: 'app-project-gallery',
  templateUrl: './project-gallery.html',
  styleUrl: './project-gallery.scss',
})
export class ProjectGallery {
  readonly images = input.required<string[]>();
  readonly alt = input('Project photo');

  readonly activeIndex = signal<number | null>(null);

  open(index: number): void {
    this.activeIndex.set(index);
  }

  close(): void {
    this.activeIndex.set(null);
  }

  next(): void {
    const total = this.images().length;
    this.activeIndex.update((i) => (i === null ? null : (i + 1) % total));
  }

  prev(): void {
    const total = this.images().length;
    this.activeIndex.update((i) => (i === null ? null : (i - 1 + total) % total));
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (this.activeIndex() === null) return;
    if (event.key === 'Escape') this.close();
    if (event.key === 'ArrowRight') this.next();
    if (event.key === 'ArrowLeft') this.prev();
  }
}
