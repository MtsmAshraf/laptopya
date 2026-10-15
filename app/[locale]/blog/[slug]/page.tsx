import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AppLink from '@/components/ui/AppLink';
import Image from 'next/image';
import { getPostBySlug, getAllPosts } from '@/lib/api/blog';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { Button } from '@/components/ui/Button';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getPostBySlug(params.slug);
  if (!p) return {};
  return { title: p.title, description: p.excerpt };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();
  const paragraphs = post.body.split('\n\n').filter(Boolean);

  return (
    <article className="border-b border-brand-line">
      <div className="container-page py-10">
        <Breadcrumbs items={[{ label: 'Buying guides', href: '/blog' }, { label: post.title }]} />
      </div>
      <header className="container-page pb-10">
        <div className="max-w-3xl">
          <div className="text-xs font-mono uppercase tracking-widest text-brand-red mb-4">{post.category} · {post.readMinutes} min read</div>
          <h1 className="font-display text-display-xl">{post.title}</h1>
          <p className="mt-6 text-body-lg text-brand-muted">{post.excerpt}</p>
          <div className="mt-6 text-xs font-mono text-brand-muted">{post.author} · {post.date}</div>
        </div>
      </header>
      <div className="relative aspect-[21/9] bg-brand-line/30">
        <Image src={post.cover} alt={post.title} fill className="object-cover" sizes="100vw" priority />
      </div>
      <div className="container-page py-16 max-w-3xl">
        {paragraphs.map((p, i) => {
          if (p.startsWith('## ')) {
            return <h2 key={i} className="font-display text-display-md mt-12 mb-4">{p.slice(3)}</h2>;
          }
          return <p key={i} className="text-body-lg mb-4">{p}</p>;
        })}
        <div className="mt-16 pt-8 border-t border-brand-line flex items-center justify-between gap-4">
          <AppLink href="/blog" className="text-xs font-mono uppercase tracking-widest link-underline">All guides</AppLink>
          <Button href="/shop">Shop now</Button>
        </div>
      </div>
    </article>
  );
}