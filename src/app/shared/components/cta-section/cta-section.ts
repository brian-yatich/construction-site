import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export interface CtaAction {
  label: string;
  path: string;
  style?: 'primary' | 'secondary';
}

@Component({
  selector: 'app-cta-section',
  imports: [RouterLink],
  templateUrl: './cta-section.html',
  styleUrl: './cta-section.scss',
})
export class CtaSection {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly actions = input<CtaAction[]>([]);
}
