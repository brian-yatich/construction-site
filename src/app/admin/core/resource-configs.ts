import { ResourceConfig } from './resource-config';

export const PROJECTS_CONFIG: ResourceConfig = {
  key: 'projects',
  title: 'Projects',
  apiPath: '/admin/projects',
  routeSegment: 'projects',
  listColumns: [
    { key: 'name', label: 'Name' },
    { key: 'categoryLabel', label: 'Category' },
    { key: 'status', label: 'Status' },
    { key: 'location', label: 'Location' },
  ],
  fields: [
    { key: 'slug', label: 'Slug', type: 'text', required: true },
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'location', label: 'Location', type: 'text', required: true },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'building', label: 'Building' },
        { value: 'civil-engineering', label: 'Civil Engineering' },
        { value: 'roads', label: 'Roads' },
        { value: 'infrastructure', label: 'Infrastructure' },
      ],
    },
    { key: 'categoryLabel', label: 'Category Label', type: 'text', required: true },
    {
      key: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { value: 'completed', label: 'Completed' },
        { value: 'ongoing', label: 'Ongoing' },
      ],
    },
    { key: 'summary', label: 'Summary', type: 'textarea', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'scopeOfWork', label: 'Scope of Work', type: 'string-array' },
    { key: 'startDate', label: 'Start Date', type: 'date', required: true },
    { key: 'completionDate', label: 'Completion Date', type: 'date', required: true },
    { key: 'durationMonths', label: 'Duration (months)', type: 'number', required: true },
    { key: 'progressPercent', label: 'Progress %', type: 'number', hint: 'Only used when status is Ongoing' },
    { key: 'client', label: 'Client', type: 'text', required: true },
    { key: 'heroImage', label: 'Hero Image URL', type: 'text', required: true },
    { key: 'thumbnailImage', label: 'Thumbnail Image URL', type: 'text', required: true },
    { key: 'gallery', label: 'Gallery Image URLs', type: 'string-array' },
    {
      key: 'stats',
      label: 'Project Statistics',
      type: 'object-array',
      itemFields: [
        { key: 'label', label: 'Label', type: 'text' },
        { key: 'value', label: 'Value', type: 'text' },
      ],
    },
    { key: 'featured', label: 'Featured on Homepage', type: 'boolean' },
  ],
};

export const SERVICES_CONFIG: ResourceConfig = {
  key: 'services',
  title: 'Services',
  apiPath: '/admin/services',
  routeSegment: 'services',
  listColumns: [
    { key: 'title', label: 'Title' },
    { key: 'shortDescription', label: 'Short Description' },
  ],
  fields: [
    { key: 'slug', label: 'Slug', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'shortDescription', label: 'Short Description', type: 'textarea', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'icon', label: 'Icon (Material Symbols name)', type: 'text', required: true },
    { key: 'image', label: 'Card Image URL', type: 'text', required: true },
    { key: 'heroImage', label: 'Hero Image URL', type: 'text', required: true },
    { key: 'capabilities', label: 'Key Capabilities', type: 'string-array' },
    { key: 'scopeOfWork', label: 'Scope of Work', type: 'string-array' },
    {
      key: 'process',
      label: 'Process Steps',
      type: 'object-array',
      itemFields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'description', label: 'Description', type: 'textarea' },
      ],
    },
    { key: 'relatedProjectSlugs', label: 'Related Project Slugs', type: 'string-array' },
  ],
};

export const TEAM_CONFIG: ResourceConfig = {
  key: 'team',
  title: 'Team Members',
  apiPath: '/admin/team',
  routeSegment: 'team',
  listColumns: [
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
  ],
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'role', label: 'Role', type: 'text', required: true },
    { key: 'bio', label: 'Bio', type: 'textarea', required: true },
    { key: 'photo', label: 'Photo URL', type: 'text', required: true },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

export const TESTIMONIALS_CONFIG: ResourceConfig = {
  key: 'testimonials',
  title: 'Testimonials',
  apiPath: '/admin/testimonials',
  routeSegment: 'testimonials',
  listColumns: [
    { key: 'clientName', label: 'Client' },
    { key: 'company', label: 'Company' },
  ],
  fields: [
    { key: 'quote', label: 'Quote', type: 'textarea', required: true },
    { key: 'clientName', label: 'Client Name', type: 'text', required: true },
    { key: 'position', label: 'Position', type: 'text', required: true },
    { key: 'company', label: 'Company', type: 'text', required: true },
    { key: 'photo', label: 'Photo URL', type: 'text' },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

export const BLOG_CONFIG: ResourceConfig = {
  key: 'blog',
  title: 'News & Blog',
  apiPath: '/admin/blog',
  routeSegment: 'blog',
  listColumns: [
    { key: 'title', label: 'Title' },
    { key: 'categoryLabel', label: 'Category' },
  ],
  fields: [
    { key: 'slug', label: 'Slug', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'excerpt', label: 'Excerpt', type: 'textarea', required: true },
    { key: 'content', label: 'Body Paragraphs', type: 'string-array' },
    {
      key: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: [
        { value: 'company-news', label: 'Company News' },
        { value: 'project-updates', label: 'Project Updates' },
        { value: 'construction', label: 'Construction' },
        { value: 'engineering', label: 'Engineering' },
        { value: 'safety', label: 'Safety' },
        { value: 'sustainability', label: 'Sustainability' },
        { value: 'technology', label: 'Technology' },
      ],
    },
    { key: 'categoryLabel', label: 'Category Label', type: 'text', required: true },
    { key: 'author', label: 'Author', type: 'text', required: true },
    { key: 'publishedDate', label: 'Published Date', type: 'date', required: true },
    { key: 'featuredImage', label: 'Featured Image URL', type: 'text', required: true },
  ],
};

export const CAREERS_CONFIG: ResourceConfig = {
  key: 'careers',
  title: 'Job Vacancies',
  apiPath: '/admin/careers',
  routeSegment: 'careers',
  listColumns: [
    { key: 'title', label: 'Title' },
    { key: 'department', label: 'Department' },
    { key: 'location', label: 'Location' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'location', label: 'Location', type: 'text', required: true },
    {
      key: 'employmentType',
      label: 'Employment Type',
      type: 'select',
      required: true,
      options: [
        { value: 'Full-time', label: 'Full-time' },
        { value: 'Part-time', label: 'Part-time' },
        { value: 'Contract', label: 'Contract' },
        { value: 'Internship', label: 'Internship' },
      ],
    },
    { key: 'department', label: 'Department', type: 'text', required: true },
    { key: 'closingDate', label: 'Closing Date', type: 'date', required: true },
    { key: 'summary', label: 'Summary', type: 'textarea', required: true },
    { key: 'responsibilities', label: 'Responsibilities', type: 'string-array' },
    { key: 'requirements', label: 'Requirements', type: 'string-array' },
    { key: 'qualifications', label: 'Qualifications', type: 'string-array' },
    { key: 'experience', label: 'Experience', type: 'text', required: true },
    { key: 'benefits', label: 'Benefits', type: 'string-array' },
  ],
};

export const STATS_CONFIG: ResourceConfig = {
  key: 'stats',
  title: 'Company Statistics',
  apiPath: '/admin/company-info/stats',
  routeSegment: 'stats',
  listColumns: [
    { key: 'label', label: 'Label' },
    { key: 'value', label: 'Value' },
  ],
  fields: [
    { key: 'value', label: 'Value', type: 'number', required: true },
    { key: 'suffix', label: 'Suffix (e.g. "+")', type: 'text', required: true },
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'icon', label: 'Icon (Material Symbols name)', type: 'text', required: true },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

export const CERTIFICATIONS_CONFIG: ResourceConfig = {
  key: 'certifications',
  title: 'Certifications',
  apiPath: '/admin/company-info/certifications',
  routeSegment: 'certifications',
  listColumns: [
    { key: 'name', label: 'Name' },
    { key: 'issuer', label: 'Issuer' },
  ],
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'issuer', label: 'Issuer', type: 'text', required: true },
    { key: 'logo', label: 'Logo URL', type: 'text', required: true },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

export const PARTNERS_CONFIG: ResourceConfig = {
  key: 'partners',
  title: 'Clients & Partners',
  apiPath: '/admin/company-info/partners',
  routeSegment: 'partners',
  listColumns: [{ key: 'name', label: 'Name' }],
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'logo', label: 'Logo URL', type: 'text', required: true },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

export const VALUES_CONFIG: ResourceConfig = {
  key: 'values',
  title: 'Why Choose Us (Values)',
  apiPath: '/admin/company-info/values',
  routeSegment: 'values',
  listColumns: [{ key: 'title', label: 'Title' }],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'icon', label: 'Icon (Material Symbols name)', type: 'text', required: true },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

export const TIMELINE_CONFIG: ResourceConfig = {
  key: 'timeline',
  title: 'Company History Timeline',
  apiPath: '/admin/company-info/timeline',
  routeSegment: 'timeline',
  listColumns: [
    { key: 'year', label: 'Year' },
    { key: 'title', label: 'Title' },
  ],
  fields: [
    { key: 'year', label: 'Year', type: 'text', required: true },
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', required: true },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

export const ALL_RESOURCE_CONFIGS: ResourceConfig[] = [
  PROJECTS_CONFIG,
  SERVICES_CONFIG,
  TEAM_CONFIG,
  TESTIMONIALS_CONFIG,
  BLOG_CONFIG,
  CAREERS_CONFIG,
  STATS_CONFIG,
  CERTIFICATIONS_CONFIG,
  PARTNERS_CONFIG,
  VALUES_CONFIG,
  TIMELINE_CONFIG,
];
