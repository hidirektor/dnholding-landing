"use client";

import React, {useState} from "react";
import {cn} from "@/lib/utils";

interface SectorItem {
  icon: React.ReactNode;
  label: string;
  href?: string;
  image?: string;
}

interface GridSectorsProps {
  items: SectorItem[];
  className?: string;
  lang?: string;
}

export function GridSectors({ items, className, lang = "tr" }: GridSectorsProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-3 w-full border-y border-white/10 overflow-hidden", className)}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={item.label}
            onMouseEnter={() => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
            className={cn(
              "relative cursor-pointer transition-all duration-700 flex flex-col justify-between p-8 md:p-12 min-h-[400px] border-b md:border-b-0 md:border-r border-white/10 last:border-0 group overflow-hidden",
              isActive 
                ? "bg-transparent" 
                : "bg-transparent hover:bg-white/5"
            )}
          >
            {/* Background Image that is always visible */}
            {item.image && (
              <>
                <div 
                  className={cn(
                    "absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-out z-0",
                    isActive ? "opacity-100 scale-110" : "opacity-60 scale-100"
                  )}
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                {/* Lighter gradient overlay to keep text readable but show images */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-0 transition-opacity duration-700" />
              </>
            )}

            {/* Top Area (Icon left, Learn More right) */}
            <div className="flex justify-between items-start w-full relative z-10">
              {/* Sector Icon */}
              <div className={cn(
                "w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500",
                isActive ? "bg-accent text-white" : "bg-white/5 text-white/50 group-hover:text-white/80"
              )}>
                {item.icon}
              </div>

              {/* Learn More + Brackets (Top Right) */}
              <div className="flex flex-col items-end gap-2">
                <div 
                  className={cn(
                    "flex items-center gap-1 text-2xl font-light transition-colors duration-300",
                    isActive ? "text-accent" : "text-white/40 group-hover:text-white/60"
                  )}
                >
                  <span className="font-mono opacity-60">[</span>
                  <span className={cn(
                    "transform transition-transform duration-500",
                    isActive ? "rotate-45" : "rotate-0"
                  )}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </span>
                  <span className="font-mono opacity-60">]</span>
                </div>
                
                <span className={cn(
                  "text-xs font-semibold tracking-wide uppercase transition-all duration-500 text-right",
                  isActive ? "opacity-100 text-accent translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none absolute right-0 top-10"
                )}>
                  {lang === "tr" ? "İncele" : "Learn More"}
                </span>
              </div>
            </div>
            
            {/* Bottom Label Area */}
            <div className="relative z-10 mt-auto">
              <h3 
                className={cn(
                  "font-display text-3xl sm:text-4xl font-bold leading-tight transition-all duration-500 transform",
                  isActive ? "text-white translate-y-0" : "text-white/50 group-hover:text-white/80 translate-y-2"
                )}
              >
                {item.label}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}
