import Link from "next/link";
import Image from "next/image";
import {cn, formatDate} from "@/lib/utils";
import {Card, CardContent, CardImage} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";

export interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
  lang: string;
}

export function NewsCard({
  title,
  excerpt,
  date,
  category,
  image,
  slug,
  lang,
}: NewsCardProps) {
  return (
    <Link
      href={`/${lang}/medya/${slug}`}
      className="block group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-[var(--radius-lg)]"
    >
      <Card variant="default" hover className="h-full flex flex-col">
        {/* Image */}
        <CardImage className="relative aspect-[16/10]">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-premium)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Date overlay badge */}
          <div className="absolute top-4 left-4 z-10">
            <div className="bg-white/90 dark:bg-primary/90 backdrop-blur-sm rounded-[var(--radius-md)] px-3 py-1.5 text-center shadow-[var(--shadow-subtle)]">
              <span className="block text-xs font-medium text-text-secondary dark:text-text-light">
                {formatDate(date, lang)}
              </span>
            </div>
          </div>

          {/* Hover overlay */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent",
              "opacity-0 group-hover:opacity-100 transition-opacity duration-[var(--duration-medium)]"
            )}
            aria-hidden="true"
          />
        </CardImage>

        {/* Content */}
        <CardContent className="flex-1 flex flex-col gap-3">
          <Badge variant="accent" size="sm" className="self-start">
            {category}
          </Badge>

          <h3 className="text-base font-semibold text-text dark:text-text-inverse leading-snug line-clamp-2 group-hover:text-accent transition-colors duration-[var(--duration-fast)]">
            {title}
          </h3>

          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 flex-1">
            {excerpt}
          </p>

          {/* Read more link */}
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium text-accent mt-auto pt-2",
              "transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]"
            )}
          >
            <span>{lang === "tr" ? "Devamını Oku" : "Read More"}</span>
            <svg
              width="14"
              height="14"
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

export default NewsCard;
