export type BlogCategory =
  | 'company-news'
  | 'project-updates'
  | 'construction'
  | 'engineering'
  | 'safety'
  | 'sustainability'
  | 'technology';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string[];
  category: BlogCategory;
  categoryLabel: string;
  author: string;
  publishedDate: string;
  featuredImage: string;
}
