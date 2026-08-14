import { Component, input } from '@angular/core';
import { TeamMember } from '../../../core/models';

@Component({
  selector: 'app-team-card',
  templateUrl: './team-card.html',
  styleUrl: './team-card.scss',
})
export class TeamCard {
  readonly member = input.required<TeamMember>();
}
