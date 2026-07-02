import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { buildBreadcrumbJsonLd, type BreadcrumbCrumb } from "@/lib/schema";

/**
 * Accessible breadcrumb trail. The last item is treated as the current page.
 * Also emits BreadcrumbList JSON-LD from the same items.
 */
export function Breadcrumb({ items }: { items: BreadcrumbCrumb[] }) {
  const jsonLd = buildBreadcrumbJsonLd(items);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-2 text-sm text-muted">
          {items.map((item, i) => {
            const isLast = i === items.length - 1;
            return (
              <li key={item.label} className="flex items-center gap-2">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={isLast ? "text-foreground" : undefined}
                    aria-current={isLast ? "page" : undefined}
                  >
                    {item.label}
                  </span>
                )}
                {!isLast && (
                  <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 text-faint"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
