import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Project } from '../../../core/models';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss',
})
export class ProjectCard {
  readonly project = input.required<Project>();
  readonly showProgress = input(false);
}
