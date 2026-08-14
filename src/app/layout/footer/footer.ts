import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

interface FooterLink {
  label: string;
  path: string;
}

const QUICK_LINKS: FooterLink[] = [
  { label: 'About Us', path: '/about' },
  { label: 'Our Services', path: '/services' },
  { label: 'Projects', path: '/projects' },
  { label: 'Careers', path: '/careers' },
  { label: 'News', path: '/news' },
  { label: 'Contact', path: '/contact' },
];

const SERVICE_LINKS: FooterLink[] = [
  { label: 'Building Construction', path: '/services/building-construction' },
  { label: 'Civil Engineering', path: '/services/civil-engineering' },
  { label: 'Road Construction', path: '/services/road-construction' },
  { label: 'Structural Works', path: '/services/structural-works' },
  { label: 'Infrastructure Development', path: '/services/infrastructure-development' },
];

@Component({
  selector: 'app-footer',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  readonly currentYear = new Date().getFullYear();
  readonly quickLinks = QUICK_LINKS;
  readonly serviceLinks = SERVICE_LINKS;

  readonly newsletterEmail = new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] });
  readonly subscribed = signal(false);

  subscribe(): void {
    if (this.newsletterEmail.invalid) {
      this.newsletterEmail.markAsTouched();
      return;
    }
    this.subscribed.set(true);
    this.newsletterEmail.reset();
  }
}
