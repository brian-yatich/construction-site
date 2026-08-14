import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { BlogPost } from '../../../core/models';

@Component({
  selector: 'app-blog-card',
  imports: [RouterLink, DatePipe],
  templateUrl: './blog-card.html',
  styleUrl: './blog-card.scss',
})
export class BlogCard {
  readonly post = input.required<BlogPost>();
}
