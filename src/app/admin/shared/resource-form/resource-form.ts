import { Component, DestroyRef, OnInit, inject, input, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FieldConfig, ResourceConfig } from '../../core/resource-config';
import { AdminResourceService } from '../../core/admin-resource.service';
import { buildFormGroup, newObjectArrayItemGroup } from '../../core/form-builder.util';

@Component({
  selector: 'app-admin-resource-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './resource-form.html',
  styleUrl: './resource-form.scss',
})
export class ResourceForm implements OnInit {
  readonly config = input.required<ResourceConfig>();

  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);
  private service!: AdminResourceService;

  readonly isEdit = signal(false);
  readonly loading = signal(true);
  readonly saving = signal(false);
  readonly errorMessage = signal<string | null>(null);
  form = new FormGroup({});

  private entityId: string | null = null;

  ngOnInit(): void {
    this.service = new AdminResourceService(this.http, this.config().apiPath);
    this.entityId = this.route.snapshot.paramMap.get('id');
    this.isEdit.set(!!this.entityId);

    if (this.entityId) {
      this.service
        .get(this.entityId)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: (entity) => {
            this.form = buildFormGroup(this.config().fields, entity);
            this.loading.set(false);
          },
          error: () => {
            this.errorMessage.set('Failed to load this record.');
            this.loading.set(false);
          },
        });
    } else {
      this.form = buildFormGroup(this.config().fields);
      this.loading.set(false);
    }
  }

  getArray(key: string): FormArray {
    return this.form.get(key) as FormArray;
  }

  addStringItem(key: string): void {
    this.getArray(key).push(new FormControl('', { nonNullable: true }));
  }

  removeStringItem(key: string, index: number): void {
    this.getArray(key).removeAt(index);
  }

  addObjectItem(field: FieldConfig): void {
    this.getArray(field.key).push(newObjectArrayItemGroup(field));
  }

  removeObjectItem(key: string, index: number): void {
    this.getArray(key).removeAt(index);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.saving.set(true);
    this.errorMessage.set(null);
    const value = this.form.getRawValue();

    const request = this.entityId ? this.service.update(this.entityId, value) : this.service.create(value);

    request.subscribe({
      next: () => this.router.navigate(['/admin', this.config().routeSegment]),
      error: () => {
        this.saving.set(false);
        this.errorMessage.set('Failed to save. Please check the form and try again.');
      },
    });
  }
}
