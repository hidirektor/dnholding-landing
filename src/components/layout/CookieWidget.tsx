"use client";

import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

interface CookieWidgetProps {
  dict?: {
    title: string;
    description: string;
    accept: string;
    decline: string;
  };
}

export function CookieWidget({ dict }: CookieWidgetProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show automatically on first visit after a brief delay
      const timer = setTimeout(() => setIsExpanded(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsExpanded(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsExpanded(false);
  };

  if (!mounted || !dict) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-end">
      {/* Expanded Panel */}
      <div 
        className={cn(
          "absolute bottom-0 left-0 bg-white dark:bg-primary-dark shadow-[var(--shadow-large)] border border-border dark:border-white/10 rounded-2xl p-6 w-[360px] transition-all duration-500 ease-[var(--ease-premium)] origin-bottom-left",
          isExpanded ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-90 translate-y-8 pointer-events-none"
        )}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-bold text-text dark:text-white">{dict.title}</h3>
          <button 
            onClick={() => setIsExpanded(false)}
            className="text-text-light hover:text-text-secondary dark:hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
            </svg>
          </button>
        </div>
        <p className="text-sm text-text-secondary dark:text-text-light mb-6">
          {dict.description}
        </p>
        <div className="flex gap-3">
          <button 
            onClick={handleAccept}
            className="flex-1 bg-accent hover:bg-accent-light text-white text-sm font-semibold py-2.5 rounded-[var(--radius-md)] transition-colors"
          >
            {dict.accept}
          </button>
          <button 
            onClick={handleDecline}
            className="flex-1 bg-surface-dark dark:bg-white/5 hover:bg-border dark:hover:bg-white/10 text-text-secondary dark:text-white text-sm font-semibold py-2.5 rounded-[var(--radius-md)] transition-colors"
          >
            {dict.decline}
          </button>
        </div>
      </div>

      {/* Cookie Icon Trigger */}
      <div 
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          "w-14 h-14 bg-white dark:bg-primary-dark rounded-full shadow-[var(--shadow-large)] flex items-center justify-center border border-border dark:border-white/10 transition-all duration-300 cursor-pointer group",
          isExpanded ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100 hover:scale-105"
        )}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Cookie outline */}
          <circle cx="12" cy="12" r="9" stroke="#C49A45" strokeWidth="2" fill="#F4E6C3" />
          {/* Chocolate chips */}
          <circle cx="9" cy="10" r="1.5" fill="#8B5A2B" />
          <circle cx="14" cy="9" r="1" fill="#8B5A2B" />
          <circle cx="11" cy="15" r="1.5" fill="#8B5A2B" />
          <circle cx="15" cy="14" r="1" fill="#8B5A2B" />
        </svg>
      </div>
    </div>
  );
}
