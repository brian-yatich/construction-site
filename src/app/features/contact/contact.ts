import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services';
import { HeroSection } from '../../shared/components';
import { ContactForm } from './contact-form/contact-form';
import { unsplash, UNSPLASH } from '../../core/mock/unsplash';

@Component({
  selector: 'app-contact',
  imports: [HeroSection, ContactForm],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact implements OnInit {
  private readonly seo = inject(SeoService);

  readonly heroImage = unsplash(UNSPLASH.cranesAboveBuildings, 1920, 700);

  ngOnInit(): void {
    this.seo.update({
      title: 'Contact Us',
      description: 'Get in touch with [COMPANY NAME] for construction, civil engineering and infrastructure projects.',
      path: '/contact',
    });
  }
}
