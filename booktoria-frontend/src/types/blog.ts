export type BlogCategory =
  | 'general'
  | 'food'
  | 'travel'
  | 'technology'
  | 'lifestyle';

export type BlogTag = string;

export type BlogId = string;

export interface Blog {
  _id: BlogId;
  title: string;
  slug: string;
  content: string;
  image?: string;
  category: BlogCategory | string;
  tags?: BlogTag[];
  isPublished?: boolean;
  userId?: string;

  createdAt?: string;
  updatedAt?: string;
}
