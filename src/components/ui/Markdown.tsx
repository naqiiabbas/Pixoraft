import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { CodeWindow } from "@/components/ui/CodeWindow";

/**
 * Renders post Markdown into themed elements. Fenced code blocks are shown in
 * the site's CodeWindow graphic; everything else uses the theme's prose styles.
 */
export function Markdown({ content }: { content: string }) {
  return (
    <div className="text-base leading-relaxed text-muted">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2 className="mt-10 font-display text-2xl font-semibold text-foreground">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="mt-8 font-display text-xl font-semibold text-foreground">
              {children}
            </h3>
          ),
          p: ({ children }) => <p className="mt-5">{children}</p>,
          a: ({ children, href }) => {
            const url = href ?? "";
            const isInternal = url.startsWith("/");
            const className =
              "text-accent underline underline-offset-2 hover:text-accent-strong";
            if (isInternal) {
              return (
                <Link href={url} className={className}>
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={url}
                className={className}
                target="_blank"
                rel="noopener noreferrer"
              >
                {children}
              </a>
            );
          },
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          ul: ({ children }) => (
            <ul className="mt-5 space-y-2">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="mt-5 list-decimal space-y-2 pl-5">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="flex items-start gap-3">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              <span className="min-w-0">{children}</span>
            </li>
          ),
          blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-accent/50 pl-4 italic text-muted">
              {children}
            </blockquote>
          ),
          img: ({ src, alt }) =>
            typeof src === "string" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={src}
                alt={alt ?? ""}
                loading="lazy"
                className="my-6 w-full rounded-xl border border-white/10"
              />
            ) : null,
          pre: ({ children }) => <>{children}</>,
          code: ({ className, children }) => {
            const text = String(children ?? "");
            const langMatch = /language-(\w+)/.exec(className || "");
            const isBlock = !!langMatch || text.includes("\n");
            if (isBlock) {
              const lang = langMatch?.[1] ?? "code";
              return (
                <span className="my-6 block">
                  <CodeWindow filename={lang} snippet={text.replace(/\n$/, "")} />
                </span>
              );
            }
            return (
              <code className="rounded bg-white/10 px-1.5 py-0.5 font-mono text-sm text-accent">
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
