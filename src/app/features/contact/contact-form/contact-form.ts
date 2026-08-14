import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../../core/services';
import { SubmissionState } from '../../../core/models';

const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;

@Component({
  selector: 'app-contact-form',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.html',
  styleUrl: './contact-form.scss',
})
export class ContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);

  readonly state = signal<SubmissionState>('idle');

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    company: ['', [Validators.maxLength(100)]],
    subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
  });

  get f() {
    return this.form.controls;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('submitting');
    this.contactService.submit(this.form.getRawValue()).subscribe({
      next: () => {
        this.state.set('success');
        this.form.reset();
      },
      error: () => this.state.set('error'),
    });
  }

  resetForm(): void {
    this.state.set('idle');
  }
}
