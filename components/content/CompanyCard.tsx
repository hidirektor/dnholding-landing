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
    <Link href={`/${lang}/grup-sirketleri/${slug}`} className="block h-full group">
      <Card className="h-full p-8 border border-border hover:border-transparent transition-all duration-300 relative overflow-hidden">
        {/* Accent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 transition-all duration-300 transform origin-left scale-x-0 group-hover:scale-x-100" style={{ backgroundColor: accentColor }} />
        
        <div className="flex flex-col h-full gap-6 relative z-10">
          <div className="flex justify-between items-start">
            <div className="w-12 h-12 rounded-[var(--radius-md)] flex items-center justify-center text-white font-bold text-lg transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: accentColor }}>
              {name.split(" ").pop()?.charAt(0)}
            </div>
            <Badge variant="outline">{sector}</Badge>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors" style={{ color: accentColor }}>{name}</h3>
            <p className="text-text-secondary leading-relaxed line-clamp-3">{description}</p>
          </div>
          
          <div className="mt-auto pt-4 flex items-center gap-2 text-sm font-semibold opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300" style={{ color: accentColor }}>
            {lang === "tr" ? "Keşfet" : "Discover"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </Card>
    </Link>
  );
}
