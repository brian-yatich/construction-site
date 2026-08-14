import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-error-state',
  templateUrl: './error-state.html',
  styleUrl: './error-state.scss',
})
export class ErrorState {
  readonly title = input('Something went wrong');
  readonly message = input('We couldn\'t load this content. Please try again.');
  readonly retryLabel = input('Try Again');
  readonly showRetry = input(true);
  readonly retry = output<void>();
}
