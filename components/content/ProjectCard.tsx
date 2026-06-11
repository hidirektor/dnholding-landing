import Link from "next/link";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/Badge";

export interface ProjectCardProps {
  title: string;
  description: string;
  company: string;
  category: string;
  image: string;
  slug: string;
  lang: string;
}

export function ProjectCard({
  title,
  description,
  company,
  category,
  image,
  slug,
  lang,
}: ProjectCardProps) {
  return (
    <Link
      href={`/${lang}/projeler/${slug}`}
      className="block group focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 rounded-[var(--radius-lg)]"
    >
      <article className="relative aspect-[4/5] sm:aspect-[3/4] rounded-[var(--radius-lg)] overflow-hidden">
        {/* Full-bleed image */}
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-[var(--duration-slow)] ease-[var(--ease-premium)] group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Always-visible bottom gradient */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent"
          aria-hidden="true"
        />

        {/* Top badges */}
        <div className="absolute top-4 left-4 right-4 flex items-start gap-2 z-10">
          <Badge
            variant="accent"
            size="sm"
            className="bg-accent/90 text-primary backdrop-blur-sm"
          >
            {category}
          </Badge>
          <Badge
            variant="outline"
            size="sm"
            className="border-white/30 text-white/90 backdrop-blur-sm"
          >
            {company}
          </Badge>
        </div>

        {/* Bottom overlay: details slide up on hover */}
        <div
          className={cn(
            "absolute bottom-0 left-0 right-0 p-6",
            "transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]"
          )}
        >
          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">
            {title}
          </h3>

          {/* Description — revealed on hover */}
          <div
            className={cn(
              "overflow-hidden transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]",
              "max-h-0 opacity-0 group-hover:max-h-24 group-hover:opacity-100"
            )}
          >
            <p className="text-sm text-white/70 leading-relaxed line-clamp-3 mt-2">
              {description}
            </p>
          </div>

          {/* View project CTA */}
          <div
            className={cn(
              "flex items-center gap-1.5 text-sm font-medium text-accent mt-3",
              "transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]",
              "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0"
            )}
          >
            <span>{lang === "tr" ? "Projeyi Gör" : "View Project"}</span>
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
        </div>
      </article>
    </Link>
  );
}

export default ProjectCard;
