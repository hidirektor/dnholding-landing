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
              "relative cursor-pointer transition-all duration-[800ms] ease-[var(--ease-premium)] rounded-[var(--radius-xl)] overflow-hidden group flex flex-col justify-end p-6 border",
              isActive 
                ? "flex-[4] sm:flex-[5]" 
                : "flex-1"
            )}
            style={{
              backgroundColor: isActive ? "var(--accordion-bg-active)" : "var(--accordion-bg)",
              borderColor: isActive ? "var(--accordion-border-hover)" : "var(--accordion-border)",
              boxShadow: isActive ? "var(--accordion-shadow)" : "none",
            }}
          >
            {/* Hover overlay for inactive state */}
            {!isActive && (
              <div 
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none" 
                style={{ backgroundColor: "var(--accordion-bg-hover)" }}
              />
            )}
            
            {/* Gradient overlay for text readability if an image is added behind */}
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />
            
            <div className={cn(
              "relative z-10 flex flex-col transition-all duration-500",
              isActive ? "items-start" : "items-center"
            )}>
              <div 
                className={cn(
                  "flex items-center justify-center rounded-full transition-all duration-500",
                  isActive ? "w-14 h-14 mb-4 text-3xl" : "w-12 h-12 text-2xl mb-0"
                )}
                style={{
                  backgroundColor: "var(--accordion-icon-bg)",
                  color: "var(--accordion-icon-color)"
                }}
              >
                {item.icon}
              </div>
              
              <h3 
                className={cn(
                  "font-bold whitespace-nowrap transition-all duration-500",
                  isActive 
                    ? "opacity-100 translate-y-0 text-2xl" 
                    : "opacity-0 translate-y-4 w-0 h-0 overflow-hidden"
                )}
                style={{ color: "var(--accordion-text)" }}
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
