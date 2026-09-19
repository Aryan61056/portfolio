import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="font-mono text-xs text-muted">
          © {year} {siteConfig.name}. Built by hand, mostly on purpose.
        </p>

        <div className="flex items-center gap-4 font-mono text-xs">
          <a
            href={siteConfig.social.github}
            data-cursor-label="probably some bugs in here"
            className="text-muted transition-colors hover:text-primary"
          >
            GitHub
          </a>
          {siteConfig.social.linkedin ? (
            <a
              href={siteConfig.social.linkedin}
              data-cursor-label="the professional version of me"
              className="text-muted transition-colors hover:text-primary"
            >
              LinkedIn
            </a>
          ) : (
            <span
              data-cursor-label="not yet, anyway"
              className="text-muted/60"
            >
              LinkedIn (WIP)
            </span>
          )}
          <a
            href={`mailto:${siteConfig.email}`}
            data-cursor-label="say hi"
            className="text-muted transition-colors hover:text-primary"
          >
            Email
          </a>
        </div>

        <Link
          href="#top"
          data-cursor-label="back to the top"
          className="font-mono text-xs text-muted underline decoration-dotted underline-offset-4 transition-colors hover:text-primary sm:hidden"
        >
          Back to top ↑
        </Link>
      </div>
    </footer>
  );
}
