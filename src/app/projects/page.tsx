import type { Metadata } from "next";
import Image from "next/image";
import { Reveal, Stagger } from "@/components/motion/reveal";
import { projects, type Project } from "@/content/projects";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Projects",
};

function ProjectCard({ project, tilt }: { project: Project; tilt: "left" | "right" }) {
  return (
    <div
      data-cursor-label={project.title}
      className={`group rounded-2xl border border-border bg-surface p-5 shadow-ambient transition-transform duration-300 hover:-translate-y-1 hover:shadow-lift ${
        tilt === "left" ? "sm:-rotate-1 sm:hover:rotate-0" : "sm:rotate-1 sm:hover:rotate-0"
      }`}
    >
      <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl bg-bg">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 45vw, 90vw"
          />
        ) : (
          <span className="font-mono text-xs uppercase tracking-wide text-muted">
            [Project image]
          </span>
        )}
      </div>

      <h3 className="mt-4 font-display text-xl font-semibold tracking-tight group-hover:text-primary">
        {project.title}
      </h3>
      <p className="mt-2 text-sm text-muted">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {project.tags.map((tag, i) => (
          <span
            key={`${tag}-${i}`}
            className="rounded-full bg-bg px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {project.links.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-4">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-xs font-semibold text-primary underline decoration-dotted underline-offset-4"
            >
              {link.label} →
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function ProjectSection({
  title,
  items,
  alwaysShow = false,
}: {
  title: string;
  items: Project[];
  /** Required sections (Original Work, Final Product) render even when
   *  empty, matching the /research page's pattern of always showing the
   *  category structure. "Other Work" is optional and stays hidden. */
  alwaysShow?: boolean;
}) {
  if (items.length === 0 && !alwaysShow) return null;

  return (
    <section className="mt-16 first:mt-0">
      <h2 className="font-mono text-xs uppercase tracking-wide text-primary">
        {title}
      </h2>
      {items.length === 0 ? (
        <p className="mt-3 text-muted">
          Coming soon — check{" "}
          <a
            href={siteConfig.social.github}
            data-cursor-label="probably some bugs in here"
            className="text-primary underline decoration-dotted underline-offset-4"
          >
            my GitHub
          </a>{" "}
          in the meantime.
        </p>
      ) : (
        <Stagger className="mt-6 grid gap-6 sm:grid-cols-2" step={0.06}>
          {items.map((project, i) => (
            <ProjectCard key={project.id} project={project} tilt={i % 2 === 0 ? "left" : "right"} />
          ))}
        </Stagger>
      )}
    </section>
  );
}

export default function ProjectsPage() {
  const originalWork = projects.filter((p) => p.category === "original-work");
  const finalProduct = projects.filter((p) => p.category === "final-product");
  const other = projects.filter(
    (p) => p.category !== "original-work" && p.category !== "final-product"
  );

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
      <Reveal>
        <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
          Projects
        </h1>
        <p className="mt-3 max-w-prose text-muted">
          Split the way ISM grades it: original work and the final product.
        </p>
      </Reveal>

      <ProjectSection title="Original Work" items={originalWork} alwaysShow />
      <ProjectSection title="Final Product" items={finalProduct} alwaysShow />
      <ProjectSection title="Other Work" items={other} />
    </div>
  );
}
