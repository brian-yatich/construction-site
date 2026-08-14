import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuoteService } from '../../../core/services';
import { ProjectType, SubmissionState } from '../../../core/models';

const PHONE_PATTERN = /^[+]?[\d\s()-]{7,20}$/;
const MAX_FILES = 5;

export const PROJECT_TYPE_OPTIONS: ProjectType[] = [
  'Building Construction',
  'Road Construction',
  'Civil Engineering',
  'Renovation',
  'Industrial Construction',
  'Infrastructure',
  'Other',
];

@Component({
  selector: 'app-quote-form',
  imports: [ReactiveFormsModule],
  templateUrl: './quote-form.html',
  styleUrl: './quote-form.scss',
})
export class QuoteForm {
  private readonly fb = inject(FormBuilder);
  private readonly quoteService = inject(QuoteService);

  readonly projectTypeOptions = PROJECT_TYPE_OPTIONS;
  readonly state = signal<SubmissionState>('idle');
  readonly referenceId = signal<string | undefined>(undefined);
  readonly selectedFiles = signal<File[]>([]);
  readonly fileError = signal<string | undefined>(undefined);

  readonly form = this.fb.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(80)]],
    company: ['', [Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(PHONE_PATTERN)]],
    projectType: ['' as ProjectType | '', [Validators.required]],
    projectLocation: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(120)]],
    estimatedBudget: ['', [Validators.maxLength(60)]],
    expectedStartDate: ['', [Validators.required]],
    expectedCompletion: [''],
    projectDescription: ['', [Validators.required, Validators.minLength(20), Validators.maxLength(2000)]],
  });

  get f() {
    return this.form.controls;
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const files = input.files ? Array.from(input.files) : [];

    if (this.selectedFiles().length + files.length > MAX_FILES) {
      this.fileError.set(`You can upload up to ${MAX_FILES} files.`);
      input.value = '';
      return;
    }

    this.fileError.set(undefined);
    this.selectedFiles.update((current) => [...current, ...files]);
    input.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.update((files) => files.filter((_, i) => i !== index));
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.state.set('submitting');
    const raw = this.form.getRawValue();

    this.quoteService
      .submit({
        ...raw,
        projectType: raw.projectType as ProjectType,
        documents: this.selectedFiles(),
      })
      .subscribe({
        next: (result) => {
          this.state.set('success');
          this.referenceId.set(result.referenceId);
          this.form.reset();
          this.selectedFiles.set([]);
        },
        error: () => this.state.set('error'),
      });
  }

  resetForm(): void {
    this.state.set('idle');
  }
}
