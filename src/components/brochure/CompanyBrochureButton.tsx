"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const BrochureModal = dynamic(() => import("@/components/brochure/BrochureModal"), { ssr: false });

export function CompanyBrochureButton({ lang, slug }: { lang: string; slug: string }) {
  const [isOpen, setIsOpen] = useState(false);

  if (slug !== "dn-mermer") return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="mt-6 flex items-center gap-2 text-sm font-medium text-black dark:text-white hover:text-accent transition-colors tracking-wide uppercase px-6 py-3 bg-white/50 dark:bg-black/50 backdrop-blur-md rounded-full border border-black/20 dark:border-white/20 hover:border-accent shadow-sm"
      >
        <span>
          {lang === 'tr' ? 'Broşürü Görüntüle' : 'View Brochure'}
        </span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" x2="12" y1="15" y2="3" />
        </svg>
      </button>
      <BrochureModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
