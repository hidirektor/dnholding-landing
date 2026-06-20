"use client";

import React, {useState} from "react";
import {cn} from "@/lib/utils";

import Image from "next/image";

interface AccordionItem {
  icon: React.ReactNode;
  label: string;
  image?: string;
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
                className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100 pointer-events-none z-10" 
                style={{ backgroundColor: "var(--accordion-bg-hover)" }}
              />
            )}
            
            {/* Background Image */}
            {item.image && (
              <div className={cn(
                "absolute inset-0 transition-opacity duration-[800ms] pointer-events-none z-0",
                isActive ? "opacity-100" : "opacity-30 group-hover:opacity-50"
              )}>
                <Image src={item.image} alt={item.label} fill className="object-cover" />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            )}
            
            {/* Gradient overlay for text readability if an image is added behind */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 pointer-events-none z-10" />
            
            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center justify-end h-full">
              {/* Icon Container */}
              <div 
                className={cn(
                  "flex items-center justify-center transition-all duration-[800ms] ease-[var(--ease-premium)] text-white bg-white/20 backdrop-blur-md rounded-full",
                  isActive 
                    ? "w-16 h-16 mb-4 translate-y-0 opacity-100" 
                    : "w-12 h-12 mb-0 translate-y-4 sm:translate-y-0 opacity-100 sm:opacity-50 group-hover:opacity-100"
                )}
              >
                {item.icon}
              </div>
              
              {/* Label */}
              <h3 
                className={cn(
                  "font-bold text-center transition-all duration-[800ms] ease-[var(--ease-premium)] text-white",
                  isActive 
                    ? "text-xl sm:text-2xl opacity-100 translate-y-0 h-auto" 
                    : "text-sm sm:text-base opacity-0 sm:opacity-100 translate-y-8 sm:translate-y-0 h-0 sm:h-auto overflow-hidden sm:overflow-visible -rotate-90 sm:rotate-0 whitespace-nowrap mb-6 sm:mb-0"
                )}
              >
                {item.label}
              </h3>
            </div>  
              {isActive && (
                <div className="w-12 h-1 bg-accent mt-4 rounded-full animate-fade-in-up" />
              )}
            </div>
        );
      })}
    </div>
  );
}
