import { Component, OnInit, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TeamService, CompanyInfoService, SeoService } from '../../core/services';
import { HeroSection, SectionHeader, TeamCard, CtaSection } from '../../shared/components';
import { Reveal } from '../../shared/directives/reveal.directive';
import { unsplash, UNSPLASH } from '../../core/mock/unsplash';

interface CoreValue {
  icon: string;
  title: string;
}

const CORE_VALUES: CoreValue[] = [
  { icon: 'verified_user', title: 'Integrity' },
  { icon: 'workspace_premium', title: 'Excellence' },
  { icon: 'health_and_safety', title: 'Safety' },
  { icon: 'groups', title: 'Collaboration' },
  { icon: 'task_alt', title: 'Accountability' },
  { icon: 'lightbulb', title: 'Innovation' },
];

@Component({
  selector: 'app-about',
  imports: [HeroSection, SectionHeader, TeamCard, CtaSection, Reveal],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About implements OnInit {
  private readonly teamService = inject(TeamService);
  private readonly companyInfo = inject(CompanyInfoService);
  private readonly seo = inject(SeoService);

  readonly team = toSignal(this.teamService.getAll(), { initialValue: [] });
  readonly timeline = toSignal(this.companyInfo.getTimeline(), { initialValue: [] });
  readonly certifications = toSignal(this.companyInfo.getCertifications(), { initialValue: [] });
  readonly coreValues = CORE_VALUES;

  readonly heroImage = unsplash(UNSPLASH.buildingsCloudySky, 1920, 900);

  ngOnInit(): void {
    this.seo.update({
      title: 'About Us',
      description: 'Learn about [COMPANY NAME] — our mission, vision, core values, history and commitment to safety and quality.',
      path: '/about',
    });
  }
}
