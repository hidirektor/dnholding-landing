import {Card} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import Link from "next/link";
import Image from "next/image";

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
    <Link href={`/companies/${slug}`} className="block h-full group relative">
      {/* Hover Glow Effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"
        style={{ backgroundColor: accentColor || 'rgba(255, 232, 0, 0.1)' }}
      />
      
      <Card className="h-full p-8 border border-white/10 hover:border-white/20 transition-all duration-500 relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-2xl shadow-2xl group-hover:-translate-y-2">
        
        {/* Decorative subtle gradient inside card */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full opacity-50" />

        <div className="flex flex-col h-full gap-6 relative z-10">
          <div className="flex justify-between items-start">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-black/40 border border-white/10 shadow-inner overflow-hidden p-3 backdrop-blur-md">
              <Image src="/logo_dnholding.png" alt={`${name} logo`} width={64} height={64} className="object-contain filter brightness-0 invert opacity-90 group-hover:opacity-100 transition-opacity" />
            </div>
            <Badge variant="outline" className="border-white/20 text-white/80 bg-white/5 backdrop-blur-sm px-3 py-1">{sector}</Badge>
          </div>
          
          <div className="flex-1 mt-4">
            <h3 className="text-2xl font-display font-bold mb-3 text-white group-hover:text-accent transition-colors">{name}</h3>
            <p className="text-white/60 leading-relaxed line-clamp-3 font-light text-sm">{description}</p>
          </div>
          
          <div className="pt-6 flex items-center justify-between border-t border-white/10 mt-auto">
            <span className="text-sm font-medium text-white/70 group-hover:text-white transition-colors tracking-wide uppercase">
              {lang === "tr" ? "Detaylı İncele" : "View Details"}
            </span>
            <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/70 group-hover:bg-accent group-hover:text-primary group-hover:border-accent transition-all duration-500 shadow-lg group-hover:shadow-accent/50 group-hover:scale-110">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
