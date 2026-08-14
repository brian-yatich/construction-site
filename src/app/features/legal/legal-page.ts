import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LowerCasePipe } from '@angular/common';
import { SeoService } from '../../core/services';

@Component({
  selector: 'app-legal-page',
  imports: [LowerCasePipe],
  templateUrl: './legal-page.html',
  styleUrl: './legal-page.scss',
})
export class LegalPage implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  title = 'Legal';

  ngOnInit(): void {
    this.title = this.route.snapshot.data['title'] ?? 'Legal';
    this.seo.update({
      title: this.title,
      description: `${this.title} for [COMPANY NAME].`,
      path: this.route.snapshot.routeConfig?.path ? `/${this.route.snapshot.routeConfig.path}` : '/',
    });
  }
}
