import Link from "next/link";
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
    <Link href={`/media/${slug}`} className="block h-full group relative">
      <div className="h-full flex flex-col bg-transparent rounded-2xl overflow-hidden transition-all duration-500 group-hover:bg-slate-50 dark:group-hover:bg-white/5 border border-transparent group-hover:border-slate-200 dark:group-hover:border-white/10 group-hover:-translate-y-2 hover:shadow-xl dark:group-hover:shadow-2xl">
        <div className="relative aspect-[16/9] overflow-hidden rounded-t-2xl bg-slate-200 dark:bg-black/40">
          {image ? (
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[1500ms] group-hover:scale-110 opacity-90 dark:opacity-70 group-hover:opacity-100" style={{ backgroundImage: `url(${image})` }} />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-black/5 dark:from-white/5 to-transparent transition-transform duration-[1500ms] group-hover:scale-110" />
          )}
          <div className="absolute top-4 left-4">
            <Badge variant="outline" className="shadow-sm backdrop-blur-md bg-white/80 dark:bg-black/50 text-slate-900 dark:text-white/90 border-slate-200 dark:border-white/20 px-3 py-1 uppercase tracking-wider text-[10px]">{category}</Badge>
          </div>
        </div>
        <div className="p-8 flex flex-col flex-1 relative">
          <time className="text-xs font-semibold text-accent mb-4 block tracking-widest uppercase">
            {formatDate(date, lang)}
          </time>
          <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-accent transition-colors line-clamp-2 leading-tight">
            {title}
          </h3>
          <p className="text-slate-600 dark:text-white/60 leading-relaxed line-clamp-3 mb-6 font-light text-sm">
            {excerpt}
          </p>
          <div className="mt-auto flex items-center gap-3 text-sm font-semibold text-slate-500 dark:text-white/50 group-hover:text-accent transition-all duration-300">
            <span className="tracking-wide uppercase text-[11px]">{lang === "tr" ? "Haber Detayı" : "Read Article"}</span>
            <div className="w-8 h-8 rounded-full border border-slate-300 dark:border-white/20 group-hover:border-accent flex items-center justify-center transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
