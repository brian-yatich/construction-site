export type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'date'
  | 'boolean'
  | 'select'
  | 'string-array'
  | 'object-array';

export interface ObjectArrayField {
  key: string;
  label: string;
  type: 'text' | 'textarea';
}

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  options?: { value: string; label: string }[];
  /** Only for type: 'object-array' — the shape of each repeated item. */
  itemFields?: ObjectArrayField[];
  hint?: string;
}

export interface ResourceConfig {
  key: string;
  title: string;
  apiPath: string;
  /** Route segment, e.g. 'projects' -> /admin/projects */
  routeSegment: string;
  /** Columns shown in the list table — keys into the row object. */
  listColumns: { key: string; label: string }[];
  fields: FieldConfig[];
}
