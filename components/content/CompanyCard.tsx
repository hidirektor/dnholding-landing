import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Card, CardContent} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";

export interface CompanyCardProps {
  name: string;
  slug: string;
  description: string;
  sector: string;
  accentColor?: string;
  logo?: string;
  lang: string;
}

export function CompanyCard({
  name,
  slug,
  description,
  sector,
  accentColor = "#c9a84c",
  logo,
  lang,
}: CompanyCardProps) {
  return (
    <Link
      href={`/${lang}/grup-sirketleri/${slug}`}
      className="block group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-[var(--radius-lg)]"
    >
      <Card variant="bordered" hover className="h-full relative">
        {/* Accent top line */}
        <div
          className="absolute top-0 left-0 right-0 h-[2px] rounded-t-[var(--radius-lg)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)] opacity-60 group-hover:opacity-100"
          style={{ backgroundColor: accentColor }}
          aria-hidden="true"
        />

        <CardContent className="pt-8 pb-6 space-y-4 relative">
          {/* Logo / Icon */}
          <div className="flex items-center justify-between">
            <div
              className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold text-sm transition-transform duration-[var(--duration-medium)] ease-[var(--ease-premium)] group-hover:scale-110"
              style={{ backgroundColor: accentColor }}
            >
              {logo ? (
                <Image
                  src={logo}
                  alt={`${name} logo`}
                  width={28}
                  height={28}
                  className="object-contain"
                />
              ) : (
                name
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)
              )}
            </div>
            <Badge variant="outline" size="sm">
              {sector}
            </Badge>
          </div>

          {/* Name */}
          <h3 className="text-lg font-semibold text-text group-hover:text-accent transition-colors duration-[var(--duration-fast)] dark:text-text-inverse">
            {name}
          </h3>

          {/* Description */}
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">
            {description}
          </p>

          {/* Discover CTA — revealed on hover */}
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium text-accent",
              "transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            )}
          >
            <span>{lang === "tr" ? "Keşfet" : "Discover"}</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="transition-transform duration-[var(--duration-fast)] group-hover:translate-x-1"
              aria-hidden="true"
            >
              <path
                d="M3.333 8h9.334M8.667 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default CompanyCard;
