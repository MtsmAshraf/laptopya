import { products } from '@/data/products';
import { reviews } from '@/data/reviews';
import type { FilterState, Product } from '@/types';

export async function getAllProducts(): Promise<Product[]> {
  return products;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getProductsByCategory(category: string): Promise<Product[]> {
  return products.filter((p) => p.category === category);
}

export async function getProductsByBrand(brand: string): Promise<Product[]> {
  return products.filter((p) => p.brand === brand);
}

export async function getBestSellers(): Promise<Product[]> {
  return products.filter((p) => p.isBestSeller);
}

export async function getNewArrivals(): Promise<Product[]> {
  return products.filter((p) => p.isNew);
}

export async function getRelatedProducts(slug: string, limit = 4): Promise<Product[]> {
  const p = await getProductBySlug(slug);
  if (!p) return [];
  return products
    .filter((x) => x.slug !== slug && (x.category === p.category || x.brand === p.brand))
    .slice(0, limit);
}

export async function getReviewsForProduct(slug: string) {
  return reviews.filter((r) => r.productSlug === slug);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q)),
  );
}

export async function filterProducts(filter: FilterState): Promise<Product[]> {
  let result = [...products];

  if (filter.q) {
    const q = filter.q.toLowerCase();
    result = result.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q),
    );
  }
  if (filter.brands.length) result = result.filter((p) => filter.brands.includes(p.brand));
  if (filter.categories.length) result = result.filter((p) => filter.categories.includes(p.category));
  if (filter.condition.length) result = result.filter((p) => filter.condition.includes(p.condition));
  if (filter.inStockOnly) result = result.filter((p) => p.variants.some((v) => v.stock > 0));
  if (filter.ram.length) result = result.filter((p) => p.variants.some((v) => filter.ram.includes(v.ram)));
  if (filter.storage.length)
    result = result.filter((p) => p.variants.some((v) => filter.storage.includes(v.storage)));

  result = result.filter((p) => {
    const minPrice = Math.min(...p.variants.map((v) => v.price));
    const maxPrice = Math.max(...p.variants.map((v) => v.price));
    return maxPrice >= filter.priceRange[0] && minPrice <= filter.priceRange[1];
  });

  switch (filter.sort) {
    case 'price-asc':
      result.sort((a, b) => Math.min(...a.variants.map((v) => v.price)) - Math.min(...b.variants.map((v) => v.price)));
      break;
    case 'price-desc':
      result.sort((a, b) => Math.max(...b.variants.map((v) => v.price)) - Math.max(...a.variants.map((v) => v.price)));
      break;
    case 'rating':
      result.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      break;
  }

  return result;
}

export function getProductPriceRange(p: Product) {
  const prices = p.variants.map((v) => v.price);
  const compareAt = p.variants.map((v) => v.compareAt).filter((x): x is number => !!x);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
    compareAtMin: compareAt.length ? Math.min(...compareAt) : undefined,
  };
}