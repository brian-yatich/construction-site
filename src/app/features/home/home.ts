import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import {
  ProjectService,
  ServiceService,
  TestimonialService,
  CompanyInfoService,
  SeoService,
} from '../../core/services';
import {
  HeroSection,
  SectionHeader,
  ServiceCard,
  ProjectCard,
  StatisticCard,
  CtaSection,
} from '../../shared/components';
import { Reveal } from '../../shared/directives/reveal.directive';
import { TestimonialsCarousel } from './components/testimonials-carousel/testimonials-carousel';
import { OngoingProjectsCarousel } from './components/ongoing-projects-carousel/ongoing-projects-carousel';
import { unsplash, UNSPLASH } from '../../core/mock/unsplash';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    HeroSection,
    SectionHeader,
    ServiceCard,
    ProjectCard,
    StatisticCard,
    CtaSection,
    TestimonialsCarousel,
    OngoingProjectsCarousel,
    Reveal,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit {
  private readonly projectService = inject(ProjectService);
  private readonly serviceService = inject(ServiceService);
  private readonly testimonialService = inject(TestimonialService);
  private readonly companyInfo = inject(CompanyInfoService);
  private readonly seo = inject(SeoService);

  readonly stats = toSignal(this.companyInfo.getStats(), { initialValue: [] });
  readonly services = toSignal(this.serviceService.getPreview(6), { initialValue: [] });
  readonly featuredProjects = toSignal(this.projectService.getFeatured(), { initialValue: [] });
  readonly ongoingProjects = toSignal(this.projectService.getOngoing(), { initialValue: [] });
  readonly values = toSignal(this.companyInfo.getValues(), { initialValue: [] });
  readonly certifications = toSignal(this.companyInfo.getCertifications(), { initialValue: [] });
  readonly partners = toSignal(this.companyInfo.getPartners(), { initialValue: [] });
  readonly testimonials = toSignal(this.testimonialService.getAll(), { initialValue: [] });

  readonly heroImage = unsplash(UNSPLASH.towerCraneLowAngle, 1920, 1080);
  readonly aboutImage = unsplash(UNSPLASH.workerHardHatFrame, 900, 1000);

  ngOnInit(): void {
    this.seo.update({
      title: 'Home',
      description:
        'We deliver reliable construction, civil engineering and infrastructure solutions through quality workmanship, innovative engineering and professional project management.',
      path: '/',
    });
  }
}
