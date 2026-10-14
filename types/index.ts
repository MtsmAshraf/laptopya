export type Condition = 'new' | 'open-box';

export interface ProductVariant {
  id: string;
  ram: number;        // GB
  storage: number;    // GB
  price: number;
  compareAt?: number;
  stock: number;
  sku: string;
}

export interface Product {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  tags: string[];
  condition: Condition;
  images: string[];
  description: string;
  highlights: string[];
  specs: Record<string, string>;
  variants: ProductVariant[];
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  warrantyMonths: number;
  deliveryDays: [number, number];
}

export type Category =
  | 'gaming'
  | 'business'
  | 'student'
  | 'creator'
  | 'workstation'
  | 'accessories';

export interface Brand {
  slug: string;
  name: string;
  tagline: string;
}

export interface Review {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  cover: string;
  category: string;
  readMinutes: number;
  body: string;
}

export interface CartLine {
  slug: string;
  variantId: string;
  qty: number;
}

export interface FilterState {
  brands: string[];
  categories: Category[];
  priceRange: [number, number];
  ram: number[];
  storage: number[];
  cpu: string[];
  gpu: string[];
  screenSize: number[];
  condition: Condition[];
  inStockOnly: boolean;
  q: string;
  sort: 'relevance' | 'price-asc' | 'price-desc' | 'newest' | 'rating';
}