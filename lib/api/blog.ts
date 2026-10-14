import { posts } from '@/data/blog';
import type { BlogPost } from '@/types';

export async function getAllPosts(): Promise<BlogPost[]> {
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return posts.find((p) => p.slug === slug) ?? null;
}