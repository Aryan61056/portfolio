import Link from "next/link";
import { Reveal } from "@/components/motion/reveal";
import { getAllPosts } from "@/lib/blog";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        Blog
      </h1>
      <p className="mt-3 max-w-prose text-muted">
        My weekly reflections on this ISM project, newest first.
      </p>

      <ul className="mt-12 divide-y divide-border">
        {posts.map((post, i) => (
          <Reveal key={post.slug} delay={i * 0.05}>
            <li>
              <Link
                href={`/blog/${post.slug}`}
                data-cursor-label="read this one"
                className="group block py-6"
              >
                <time dateTime={post.date} className="font-mono text-xs text-muted">
                  {formatDate(post.date)}
                </time>
                <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-2 text-muted">{post.excerpt}</p>
              </Link>
            </li>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
