"use client";

import React, {useMemo, useState} from "react";
import {cn} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

interface CompanyTabsProps {
  companies: any[];
  lang: string;
}

// Helper to get an image based on the sector
function getSectorImage(sector: string) {
  const s = sector.toLowerCase();
  if (s.includes("mermer") || s.includes("marble")) return "/assets/image/sector/section-mermer.jpeg";
  if (s.includes("enerji") || s.includes("energy")) return "/assets/image/sector/section-energy.jpeg";
  if (s.includes("maden") || s.includes("mining")) return "/assets/image/sector/section-mine.JPG";
  return "/assets/image/background/hero-bg.jpg";
}

const companyImages: Record<string, string> = {
  "dn-mermer": "/assets/image/sector/section-mermer.jpeg",
  "2m-uluslararasi-madencilik": "/assets/image/sector/section-mine.JPG",
  "4t-madencilik": "/assets/image/company-background/4t-bg.jpg",
  "alm-maden": "/assets/quarries/isparta.jpg",
  "hd-maden-mermer": "/assets/quarries/demre.jpg",
  "mby-maden": "/assets/quarries/denizli.jpg",
  "yaman-maden": "/assets/image/company-background/yaman-bg.jpg",
  "ymy-enerji": "/assets/image/sector/section-energy.jpeg",
  "ynr-maden": "/assets/about/about-2.jpg",
  "demtalya-madencilik": "/assets/image/company-background/demtalya-bg.jpg",
};

function CompanyLogo({ slug, name, isActive }: { slug: string, name: string, isActive: boolean }) {
  const [error, setError] = useState(false);
  const src = error ? "/assets/image/logo/logo_dnholding.png" : `/assets/image/companies/${slug}.png`;
  
  return (
    <div className={cn(
      "w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden shrink-0 transition-colors p-1.5 border",
      isActive ? "bg-white border-white" : "bg-white/5 border-white/10 group-hover:bg-white/10 group-hover:border-white/20"
    )}>
      <Image 
        src={src} 
        alt={`${name} logo`} 
        width={40} 
        height={40} 
        className={cn("object-contain transition-opacity", isActive ? "opacity-100" : "opacity-80 group-hover:opacity-100")}
        onError={() => setError(true)}
      />
    </div>
  );
}

export function CompanyTabs({ companies, lang }: CompanyTabsProps) {
  // Get unique sectors
  const sectors = useMemo(() => {
    const unique = new Set(companies.map(c => c.sector));
    return ["All", ...Array.from(unique)];
  }, [companies]);

  const [activeSector, setActiveSector] = useState("All");
  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0);

  const activeCompanies = useMemo(() => {
    if (activeSector === "All") return companies;
    return companies.filter(c => c.sector === activeSector);
  }, [companies, activeSector]);

  // When changing sector, reset active company
  const handleSectorChange = (sector: string) => {
    setActiveSector(sector);
    setActiveCompanyIndex(0);
  };

  const activeCompany = activeCompanies[activeCompanyIndex] || activeCompanies[0];

  return (
    <div className="relative z-50 w-full mt-12 flex flex-col lg:flex-row min-h-[600px] bg-black text-white rounded-3xl overflow-hidden shadow-2xl">
      
      {/* ─── LEFT PANE: Image & Details ─── */}
      <div className="relative w-full lg:w-[60%] min-h-[400px] lg:min-h-full flex flex-col justify-end p-8 lg:p-12 overflow-hidden bg-zinc-900 group">
        {/* Background Image */}
        {activeCompany && (
          <Image
            src={activeCompany.image || companyImages[activeCompany.slug] || getSectorImage(activeCompany.sector)}
            alt={activeCompany.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 mix-blend-luminosity"
          />
        )}
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none" />
        
        {/* Company Details */}
        {activeCompany && (
          <div className="relative z-10 w-full">
            <p className="text-accent text-sm sm:text-base font-semibold uppercase tracking-widest mb-2">
              {activeCompany.sector}
            </p>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
              {activeCompany.name}
            </h3>
            
            {/* Divider */}
            <div className="h-px w-full bg-white/20 mb-6"></div>
            
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="flex-1 max-w-xl">
                <p className="text-white/70 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {activeCompany.description}
                </p>
              </div>
              <div className="shrink-0">
                <Link
                  href={`/companies/${activeCompany.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent transition-colors group/link"
                >
                  <span className="border-b border-white/30 group-hover/link:border-accent pb-0.5">
                    {lang === 'tr' ? 'Detayları İncele' : 'View Details'}
                  </span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover/link:translate-x-1 transition-transform">
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ─── RIGHT PANE: List & Filters ─── */}
      <div className="w-full lg:w-[40%] bg-[#111] flex flex-col">
        {/* Filter Row */}
        <div className="px-6 py-6 border-b border-white/10 overflow-x-auto hide-scrollbar">
          <div className="flex gap-2">
            {sectors.map(sector => {
              const isActive = activeSector === sector;
              return (
                <button
                  key={sector}
                  onClick={() => handleSectorChange(sector)}
                  className={cn(
                    "whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wide transition-colors",
                    isActive
                      ? "bg-white text-black"
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white"
                  )}
                >
                  {sector === "All" ? (lang === 'tr' ? "Tümü" : "All") : sector}
                </button>
              );
            })}
          </div>
        </div>

        {/* Company List */}
        <div className="flex-1 overflow-y-auto hide-scrollbar flex flex-col max-h-[600px]">
          {activeCompanies.map((company, index) => {
            const isActive = activeCompanyIndex === index;
            return (
              <button
                key={company.slug}
                onClick={() => setActiveCompanyIndex(index)}
                className={cn(
                  "flex items-center gap-4 w-full text-left px-6 py-6 border-b border-white/5 transition-all duration-300 group",
                  isActive
                    ? "bg-accent text-white"
                    : "hover:bg-white/5 text-white/70"
                )}
              >
                <CompanyLogo slug={company.slug} name={company.name} isActive={isActive} />

                <div>
                  <h4 className={cn(
                    "text-lg sm:text-xl font-bold transition-colors mb-1",
                    isActive ? "text-white" : "text-white/90 group-hover:text-white"
                  )}>
                    {company.name}
                  </h4>
                  <p className={cn(
                    "text-xs transition-colors",
                    isActive ? "text-white/80" : "text-white/40"
                  )}>
                    {company.sector}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
}

export default CompanyTabs;
