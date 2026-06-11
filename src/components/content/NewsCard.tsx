import Link from "next/link";
import {Card} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import {formatDate} from "@/lib/utils";

interface NewsCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image?: string;
  slug: string;
  lang: string;
}

export function NewsCard({ title, excerpt, date, category, image, slug, lang }: NewsCardProps) {
  return (
    <Link href={`/medya/${slug}`} className="block h-full group">
      <Card className="h-full flex flex-col border border-border hover:border-transparent transition-all duration-300 hover:shadow-[var(--shadow-large)]">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-[var(--radius-xl)] bg-surface-dark">
          {image ? (
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" style={{ backgroundImage: `url(${image})` }} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 transition-transform duration-500 group-hover:scale-105" />
          )}
          <div className="absolute top-4 left-4">
            <Badge variant="accent" className="shadow-sm backdrop-blur-sm bg-accent/90 text-white border-none">{category}</Badge>
          </div>
        </div>
        <div className="p-6 flex flex-col flex-1">
          <time className="text-sm font-medium text-text-light mb-3 block">
            {formatDate(date, lang)}
          </time>
          <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors line-clamp-2">
            {title}
          </h3>
          <p className="text-text-secondary leading-relaxed line-clamp-3 mb-4">
            {excerpt}
          </p>
          <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold text-accent opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            {lang === "tr" ? "Devamını Oku" : "Read More"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
