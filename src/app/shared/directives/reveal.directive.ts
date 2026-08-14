import { AfterViewInit, Directive, ElementRef, OnDestroy, inject, input } from '@angular/core';

/**
 * Fades an element in on scroll using IntersectionObserver.
 * Applies the `.reveal` utility class (defined in styles/_utilities.scss)
 * and toggles `.is-visible` once the element enters the viewport.
 * No-ops visually under prefers-reduced-motion via the CSS itself.
 */
@Directive({
  selector: '[appReveal]',
  host: { class: 'reveal' },
})
export class Reveal implements AfterViewInit, OnDestroy {
  readonly appRevealDelay = input(0);

  private readonly hostRef = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.hostRef.nativeElement.classList.add('is-visible');
      return;
    }

    this.observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const el = this.hostRef.nativeElement;
          const delay = this.appRevealDelay();
          if (delay) {
            el.style.transitionDelay = `${delay}ms`;
          }
          el.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    this.observer.observe(this.hostRef.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
