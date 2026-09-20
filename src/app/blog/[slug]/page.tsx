import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllSlugs, getPostSource } from "@/lib/blog";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostSource(slug);
  return { title: post?.frontmatter.title ?? "Blog" };
}

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostSource(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <Link
        href="/blog"
        data-cursor-label="back to all weeks"
        className="font-mono text-xs uppercase tracking-wide text-muted hover:text-primary"
      >
        ← All posts
      </Link>

      <time dateTime={post.frontmatter.date} className="mt-6 block font-mono text-xs text-muted">
        {formatDate(post.frontmatter.date)}
      </time>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        {post.frontmatter.title}
      </h1>

      <div className="prose prose-neutral mt-10 max-w-none prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary">
        <MDXRemote source={post.content} />
      </div>
    </article>
  );
}
