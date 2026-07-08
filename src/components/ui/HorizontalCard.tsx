"use client";

import React from "react";
import Link from "next/link";
import {cn} from "@/lib/utils";

interface HorizontalCardProps {
  number: string;
  title: string;
  description: string;
  image?: string;
  href: string;
  linkText: string;
  className?: string;
}

export function HorizontalCard({
  number,
  title,
  description,
  image,
  href,
  linkText,
  className
}: HorizontalCardProps) {
  return (
    <div className={cn(
      "group flex flex-col sm:flex-row items-stretch gap-6 p-6 rounded-[2rem] transition-all duration-500",
      /* Light theme */
      "bg-[var(--card-bg)] border border-[var(--card-border)] shadow-[var(--card-shadow)]",
      "hover:shadow-[var(--card-hover-shadow)] hover:border-accent/30",
      className
    )}>
      {/* Left side: Image */}
      <div className="w-full sm:w-2/5 md:w-1/2 shrink-0 rounded-2xl overflow-hidden bg-[var(--card-hover-bg)] relative min-h-[200px] flex items-center justify-center p-4">
        {image ? (
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
        ) : (
          <div className="w-full h-full bg-[var(--card-hover-bg)] rounded-xl border border-[var(--card-border)]" />
        )}
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black/10 dark:bg-primary-dark/20 dark:mix-blend-multiply transition-opacity group-hover:opacity-0" />
      </div>

      {/* Right side: Content */}
      <div className="flex flex-col justify-center flex-1 py-4">
        <div className="flex items-center mb-4">
          <span className="inline-flex items-center justify-center px-3 py-1 rounded-lg bg-accent/10 text-accent font-bold text-sm font-mono tracking-wider">
            {number}
          </span>
        </div>
        
        <h3 className="text-2xl font-display font-bold text-[var(--text-heading)] mb-3 group-hover:text-accent transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6 line-clamp-3 font-light">
          {description}
        </p>
        
        <div className="mt-auto">
          <Link 
            href={href}
            className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-300"
          >
            {linkText}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
