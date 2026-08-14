import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../../core/services';
import { HeroSection } from '../../shared/components';
import { QuoteForm } from './quote-form/quote-form';
import { unsplash, UNSPLASH } from '../../core/mock/unsplash';

@Component({
  selector: 'app-quotation',
  imports: [HeroSection, QuoteForm],
  templateUrl: './quotation.html',
  styleUrl: './quotation.scss',
})
export class Quotation implements OnInit {
  private readonly seo = inject(SeoService);

  readonly heroImage = unsplash(UNSPLASH.nightHighRise, 1920, 700);

  ngOnInit(): void {
    this.seo.update({
      title: 'Request a Quote',
      description: 'Tell us about your construction project and request a tailored quote from [COMPANY NAME].',
      path: '/request-quote',
    });
  }
}
