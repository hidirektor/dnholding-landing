"use client";

import React, {useMemo, useState} from "react";
import {cn} from "@/lib/utils";
import {CompanyCard} from "@/components/content/CompanyCard";
import {IconConstruction, IconEnergy, IconMining} from "@/components/ui/Icons";

interface CompanyTabsProps {
  companies: any[];
  lang: string;
}

// Helper to assign a specific icon based on the sector name
function getSectorIcon(sector: string) {
  const s = sector.toLowerCase();
  if (s.includes("mermer") || s.includes("inşaat")) return <IconConstruction />;
  if (s.includes("enerji")) return <IconEnergy />;
  if (s.includes("maden")) return <IconMining />;
  // Default icon (building/holding)
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
      <path d="M9 22v-4h6v4"></path>
      <path d="M8 6h.01"></path>
      <path d="M16 6h.01"></path>
      <path d="M12 6h.01"></path>
      <path d="M12 10h.01"></path>
      <path d="M12 14h.01"></path>
      <path d="M16 10h.01"></path>
      <path d="M16 14h.01"></path>
      <path d="M8 10h.01"></path>
      <path d="M8 14h.01"></path>
    </svg>
  );
}

export function CompanyTabs({ companies, lang }: CompanyTabsProps) {
  // Get unique sectors
  const sectors = useMemo(() => {
    const unique = new Set(companies.map(c => c.sector));
    return Array.from(unique);
  }, [companies]);

  const [activeSector, setActiveSector] = useState(sectors[0] || "");

  const activeCompanies = useMemo(() => {
    return companies.filter(c => c.sector === activeSector);
  }, [companies, activeSector]);

  return (
    <div className="w-full flex flex-col gap-10 mt-12">
      {/* Category Tabs — always in dark section context */}
      <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-start">
        {sectors.map(sector => {
          const isActive = activeSector === sector;
          return (
            <button
              key={sector}
              type="button"
              onClickCapture={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveSector(sector);
              }}
              className={cn(
                "relative z-10 cursor-pointer flex items-center gap-3 px-6 py-4 rounded-xl border transition-all duration-300 font-semibold text-sm",
                isActive 
                  ? "border-accent bg-accent/10 text-accent dark:text-white shadow-[0_0_20px_rgba(37,99,235,0.2)]" 
                  : "border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/50 dark:text-white/50 hover:bg-black/10 dark:hover:bg-white/10 hover:text-black dark:hover:text-white"
              )}
            >
              <span className={cn(
                "p-2 rounded-lg flex items-center justify-center transition-colors duration-300 pointer-events-none",
                isActive ? "bg-accent text-white" : "bg-black/10 dark:bg-white/10 text-black/50 dark:text-white/50"
              )}>
                <div className="w-5 h-5 flex items-center justify-center [&>svg]:w-full [&>svg]:h-full">
                  {getSectorIcon(sector)}
                </div>
              </span>
              <span className="pointer-events-none">{sector}</span>
            </button>
          );
        })}
      </div>

      {/* Grid of Companies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in zoom-in duration-500 ease-out" key={activeSector}>
        {activeCompanies.map((company, index) => (
          <CompanyCard
            key={company.slug}
            name={company.name}
            slug={company.slug}
            description={company.description}
            sector={company.sector}
            accentColor={company.accentColor}
            lang={lang}
          />
        ))}
      </div>
    </div>
  );
}
