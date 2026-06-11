import {Card} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import Link from "next/link";

interface CompanyCardProps {
  name: string;
  slug: string;
  description: string;
  sector: string;
  accentColor: string;
  lang: string;
}

export function CompanyCard({ name, slug, description, sector, accentColor, lang }: CompanyCardProps) {
  return (
    <Link href={`/grup-sirketleri/${slug}`} className="block h-full group">
      <Card className="h-full p-8 border border-border/50 hover:border-border transition-all duration-300 relative overflow-hidden bg-white dark:bg-white/5 group-hover:shadow-lg group-hover:-translate-y-1">
        
        <div className="flex flex-col h-full gap-6 relative z-10">
          <div className="flex justify-between items-center">
            <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-darker dark:bg-white/10 text-primary dark:text-white transition-colors duration-300 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-primary">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
              </svg>
            </div>
            <Badge variant="outline" className="border-border/50 dark:border-white/10">{sector}</Badge>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-3 text-primary dark:text-white group-hover:text-accent transition-colors">{name}</h3>
            <p className="text-text-secondary dark:text-text-light leading-relaxed line-clamp-3 font-light">{description}</p>
          </div>
          
          <div className="pt-4 flex items-center justify-between border-t border-border/50 dark:border-white/10">
            <span className="text-sm font-semibold text-text-secondary dark:text-text-light group-hover:text-primary dark:group-hover:text-white transition-colors">
              {lang === "tr" ? "Detaylı İncele" : "View Details"}
            </span>
            <div className="w-8 h-8 rounded-full border border-border/50 dark:border-white/10 flex items-center justify-center text-text-secondary dark:text-text-light group-hover:bg-primary group-hover:text-white group-hover:border-primary dark:group-hover:bg-white dark:group-hover:text-primary transition-all duration-300">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
