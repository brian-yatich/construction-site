import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldConfig } from './resource-config';

function toDateInputValue(value: unknown): string {
  if (!value) return '';
  const date = new Date(value as string);
  if (Number.isNaN(date.getTime())) return '';
  return date.toISOString().slice(0, 10);
}

export function buildFormGroup(fields: FieldConfig[], entity?: Record<string, any>): FormGroup {
  const group: Record<string, any> = {};

  for (const field of fields) {
    const validators = field.required ? [Validators.required] : [];
    const raw = entity?.[field.key];

    switch (field.type) {
      case 'boolean':
        group[field.key] = new FormControl<boolean>(!!raw, { nonNullable: true });
        break;
      case 'date':
        group[field.key] = new FormControl(toDateInputValue(raw), { nonNullable: true, validators });
        break;
      case 'string-array': {
        const values: string[] = Array.isArray(raw) ? raw : [];
        group[field.key] = new FormArray(values.map((v) => new FormControl(v, { nonNullable: true })));
        break;
      }
      case 'object-array': {
        const items: Record<string, any>[] = Array.isArray(raw) ? raw : [];
        group[field.key] = new FormArray(
          items.map(
            (item) =>
              new FormGroup(
                Object.fromEntries(
                  (field.itemFields ?? []).map((f) => [f.key, new FormControl(item?.[f.key] ?? '', { nonNullable: true })]),
                ),
              ),
          ),
        );
        break;
      }
      case 'number':
        group[field.key] = new FormControl<number | null>(raw ?? null, validators);
        break;
      default:
        group[field.key] = new FormControl(raw ?? '', { nonNullable: true, validators });
    }
  }

  return new FormGroup(group);
}

export function newObjectArrayItemGroup(field: FieldConfig): FormGroup {
  return new FormGroup(
    Object.fromEntries((field.itemFields ?? []).map((f) => [f.key, new FormControl('', { nonNullable: true })])),
  );
}
