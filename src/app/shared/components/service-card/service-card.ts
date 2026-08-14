import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CompanyService } from '../../../core/models';

@Component({
  selector: 'app-service-card',
  imports: [RouterLink],
  templateUrl: './service-card.html',
  styleUrl: './service-card.scss',
})
export class ServiceCard {
  readonly service = input.required<CompanyService>();
}
