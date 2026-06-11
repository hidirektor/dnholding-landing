import Link from "next/link";
import {cn} from "@/lib/utils";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  lang: string;
  className?: string;
}

export function BreadcrumbNav({ items, lang, className }: BreadcrumbNavProps) {
  // Build JSON-LD structured data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item:
        index < items.length - 1
          ? `${typeof window !== "undefined" ? window.location.origin : ""}${item.href}`
          : undefined,
    })),
  };

  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className={cn("py-4", className)}
      >
        <ol className="flex items-center flex-wrap gap-1 text-sm">
          {/* Home link */}
          <li className="flex items-center">
            <Link
              href={`/${lang}`}
              className="text-text-light hover:text-accent transition-colors duration-[var(--duration-fast)]"
              aria-label={lang === "tr" ? "Ana Sayfa" : "Home"}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <li key={item.href} className="flex items-center gap-1">
                {/* Arrow separator */}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-text-light/40 shrink-0"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>

                {isLast ? (
                  <span
                    className="font-medium text-text dark:text-text-inverse truncate max-w-[200px]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-text-light hover:text-accent transition-colors duration-[var(--duration-fast)] truncate max-w-[200px]"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

export default BreadcrumbNav;
