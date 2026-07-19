"use client";

import {Card} from "@/components/ui/Card";
import {Badge} from "@/components/ui/Badge";
import Link from "next/link";
import Image from "next/image";
import {useState} from "react";
import dynamic from "next/dynamic";

const BrochureModal = dynamic(() => import("@/components/brochure/BrochureModal"), { ssr: false });

interface CompanyCardProps {
  name: string;
  slug: string;
  description: string;
  sector: string;
  accentColor: string;
  lang: string;
}

export function CompanyCard({ name, slug, description, sector, accentColor, lang }: CompanyCardProps) {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  return (
    <>
      <div className="block h-full group relative">
        <Card className="h-full p-8 border border-black/5 dark:border-white/10 hover:border-black/10 dark:hover:border-white/20 transition-all duration-500 relative overflow-hidden bg-white dark:bg-white/5 backdrop-blur-xl rounded-2xl shadow-xl dark:shadow-2xl group-hover:-translate-y-2">
          
          {/* Decorative subtle gradient inside card */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-black/5 dark:from-white/10 to-transparent rounded-bl-full opacity-50" />

          <div className="flex flex-col h-full gap-6 relative z-10">
            <Link href={`/companies/${slug}`} className="absolute inset-0 z-0" aria-label={`View ${name} details`} />
            <div className="flex justify-between items-start pointer-events-none z-10">
              <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 shadow-inner overflow-hidden p-3 backdrop-blur-md">
                <Image src={`/assets/image/companies/${slug}.png`} alt={`${name} logo`} width={64} height={64} className="object-contain opacity-90 group-hover:opacity-100 transition-opacity" />
              </div>
              <Badge variant="outline" className="border-black/10 dark:border-white/20 text-black/70 dark:text-white/80 bg-black/5 dark:bg-white/5 backdrop-blur-sm px-3 py-1 pointer-events-auto">{sector}</Badge>
            </div>
            
            <div className="flex-1 mt-4 pointer-events-none z-10">
              <h3 className="text-2xl font-display font-bold mb-3 text-black dark:text-white group-hover:text-accent transition-colors">{name}</h3>
              <p className="text-black/60 dark:text-white/60 leading-relaxed line-clamp-3 font-light text-sm">{description}</p>
            </div>
            
            <div className="pt-6 flex items-center justify-between border-t border-black/10 dark:border-white/10 mt-auto relative z-20">
              {slug === "dn-mermer" ? (
                <button 
                  onClick={(e) => { e.preventDefault(); setIsBrochureOpen(true); }}
                  className="flex items-center gap-2 text-sm font-medium text-black/70 dark:text-white/70 hover:text-accent transition-colors tracking-wide uppercase cursor-pointer"
                >
                  <span className="border-b border-black/20 dark:border-white/20 hover:border-accent pb-0.5">
                    {lang === 'tr' ? 'Broşür' : 'Brochure'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform -translate-y-0.5">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                  </svg>
                </button>
              ) : (
                <span className="text-sm font-medium text-black/70 dark:text-white/70 group-hover:text-black dark:group-hover:text-white transition-colors tracking-wide uppercase pointer-events-none">
                  {lang === "tr" ? "Detaylı İncele" : "View Details"}
                </span>
              )}
              <Link href={`/companies/${slug}`} className="w-10 h-10 rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center text-black/70 dark:text-white/70 hover:bg-accent hover:text-white dark:hover:text-primary hover:border-accent transition-all duration-500 shadow-lg hover:shadow-accent/50 hover:scale-110 cursor-pointer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </Card>
      </div>
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />
    </>
  );
}
