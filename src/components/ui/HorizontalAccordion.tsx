"use client";

import React, {useState} from "react";
import {cn} from "@/lib/utils";

interface AccordionItem {
  icon: React.ReactNode;
  label: string;
}

interface HorizontalAccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function HorizontalAccordion({ items, className }: HorizontalAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("flex h-[350px] w-full gap-4 overflow-hidden", className)}>
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div
            key={item.label}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative cursor-pointer transition-all duration-[800ms] ease-[var(--ease-premium)] rounded-[var(--radius-xl)] overflow-hidden border border-white/10 group flex flex-col justify-end p-6",
              isActive 
                ? "flex-[4] sm:flex-[5] bg-primary-light shadow-[var(--shadow-large)]" 
                : "flex-1 bg-white/5 hover:bg-white/10"
            )}
          >
            {/* Dark gradient overlay for better text readability if we add images later */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            
            <div className={cn(
              "relative z-10 flex flex-col transition-all duration-500",
              isActive ? "items-start" : "items-center"
            )}>
              <div className={cn(
                "flex items-center justify-center rounded-full bg-white/10 transition-all duration-500",
                isActive ? "w-14 h-14 mb-4 text-3xl" : "w-12 h-12 text-2xl mb-0"
              )}>
                {item.icon}
              </div>
              
              <h3 
                className={cn(
                  "font-bold text-white whitespace-nowrap transition-all duration-500",
                  isActive 
                    ? "opacity-100 translate-y-0 text-2xl" 
                    : "opacity-0 translate-y-4 w-0 h-0 overflow-hidden"
                )}
              >
                {item.label}
              </h3>
              
              {isActive && (
                <div className="w-12 h-1 bg-accent mt-4 rounded-full animate-fade-in-up" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
