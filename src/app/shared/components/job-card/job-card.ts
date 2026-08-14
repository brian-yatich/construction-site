import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { JobVacancy } from '../../../core/models';

@Component({
  selector: 'app-job-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './job-card.html',
  styleUrl: './job-card.scss',
})
export class JobCard {
  readonly job = input.required<JobVacancy>();
}
