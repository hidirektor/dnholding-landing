"use client";

import {useEffect, useState} from "react";
import {cn} from "@/lib/utils";

interface CookieWidgetProps {
  dict?: any;
}

export function CookieWidget({ dict }: CookieWidgetProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  // Preferences state
  const [perfEnabled, setPerfEnabled] = useState(true);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Show automatically on first visit
      const timer = setTimeout(() => setShowBanner(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", "all");
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("cookie-consent", "necessary");
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", perfEnabled ? "all" : "necessary");
    setShowBanner(false);
    setShowModal(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* ─── BOTTOM BANNER ─── */}
      {showBanner && !showModal && (
        <div className="fixed bottom-0 left-0 w-full z-50 bg-white dark:bg-[#0f2b4c] border-t border-border dark:border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.08)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.3)] animate-in slide-in-from-bottom-10 duration-500">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8 py-5 flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="flex-1 text-[13px] md:text-sm text-[var(--color-text-secondary)] dark:text-white/80 leading-relaxed">
              We use cookies to improve your experience on our website. To accept all cookies, click 'Accept All,' alternatively you can set the preferred cookies by clicking on 'Cookie Preference.'
              <br />
              <a href="/privacy" className="text-accent dark:text-[#ca8a2a] underline underline-offset-2 hover:text-accent-light dark:hover:text-[#b07824] mt-2 inline-block">
                Learn more
              </a>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <button 
                onClick={handleAcceptAll}
                className="bg-accent dark:bg-[#ca8a2a] hover:bg-accent-light dark:hover:bg-[#b07824] text-white text-[13px] font-medium px-6 py-2.5 transition-colors rounded-[var(--radius-sm)]"
              >
                Accept All
              </button>
              <button 
                onClick={handleAcceptNecessary}
                className="bg-accent dark:bg-[#ca8a2a] hover:bg-accent-light dark:hover:bg-[#b07824] text-white text-[13px] font-medium px-6 py-2.5 transition-colors rounded-[var(--radius-sm)]"
              >
                Accept Only Necessary
              </button>
              <button 
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 text-accent dark:text-[#ca8a2a] hover:text-accent-light dark:hover:text-[#b07824] text-[13px] font-medium px-4 py-2.5 transition-colors group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80 group-hover:opacity-100">
                  <path d="M4 21v-7"/><path d="M4 10V3"/><path d="M12 21v-9"/><path d="M12 8V3"/><path d="M20 21v-5"/><path d="M20 12V3"/><path d="M1 14h6"/><path d="M9 8h6"/><path d="M17 16h6"/>
                </svg>
                Cookie Preference
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── MODAL ─── */}
      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white dark:bg-[#0a192f] w-full max-w-2xl max-h-[85vh] overflow-y-auto shadow-2xl relative flex flex-col rounded-[var(--radius-lg)] border border-transparent dark:border-white/10">
            
            {/* Close Button */}
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 p-2 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18"/><path d="M6 6l12 12"/>
              </svg>
            </button>

            {/* Modal Content */}
            <div className="p-6 sm:p-8 pb-6 border-b border-gray-100 dark:border-white/10">
              <h2 className="text-2xl text-[var(--color-text-heading)] dark:text-white mb-4 font-semibold tracking-tight pr-8">Cookie Preference Centre</h2>
              <p className="text-[var(--color-text-secondary)] dark:text-white/70 text-sm leading-relaxed mb-4">
                We use different types of cookies to optimize your experience on our website. Click on the categories below to learn more about their purpose. You may choose which types of cookies to allow and can change your preferences at any time. Remember that disabling cookies may affect your experience on the website. You can learn more about how we use cookies by visiting our Privacy Notice.
              </p>
              <div className="flex gap-4">
                <button onClick={() => setPerfEnabled(true)} className="text-accent dark:text-[#ca8a2a] hover:text-accent-light dark:hover:text-[#b07824] text-sm font-medium underline underline-offset-4 decoration-1">Select All</button>
                <button onClick={() => setPerfEnabled(false)} className="text-accent dark:text-[#ca8a2a] hover:text-accent-light dark:hover:text-[#b07824] text-sm font-medium underline underline-offset-4 decoration-1">Unselect All</button>
              </div>
            </div>

            {/* Toggles */}
            <div className="p-6 sm:p-8 pt-4 flex-1">
              
              {/* Strictly Necessary */}
              <div className="flex gap-6 py-4 border-b border-gray-100 dark:border-white/10 items-start">
                <div className="shrink-0 mt-0.5">
                  <div className="w-11 h-6 bg-accent/50 dark:bg-[#ca8a2a]/50 rounded-full relative cursor-not-allowed opacity-70">
                    <div className="absolute right-[2px] top-[2px] w-5 h-5 bg-white rounded-full shadow-sm"></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-medium text-[var(--color-text-heading)] dark:text-white">Strictly Necessary Cookies</h3>
                  </div>
                  <p className="text-[13px] text-[var(--color-text-secondary)] dark:text-white/70 leading-relaxed">
                    Strictly necessary cookies are crucial for the basic functions of the website and the website will not work in its intended way without them. These cookies cannot be disabled.
                  </p>
                </div>
              </div>

              {/* Performance */}
              <div className="flex gap-6 py-4 items-start">
                <div className="shrink-0 mt-0.5 cursor-pointer" onClick={() => setPerfEnabled(!perfEnabled)}>
                  <div className={cn("w-11 h-6 rounded-full relative transition-colors duration-200 border", perfEnabled ? "bg-accent dark:bg-[#ca8a2a] border-accent dark:border-[#ca8a2a]" : "bg-white dark:bg-transparent border-gray-300 dark:border-white/30")}>
                    <div className={cn("absolute top-[1px] w-5 h-5 rounded-full transition-all duration-200 shadow-sm", perfEnabled ? "bg-white right-[1px]" : "bg-gray-300 dark:bg-white/30 left-[1px]")}></div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-base font-medium text-[var(--color-text-heading)] dark:text-white">Performance & Functionality</h3>
                  </div>
                  <p className="text-[13px] text-[var(--color-text-secondary)] dark:text-white/60 leading-relaxed mb-2">
                    These cookies facilitate measurement and analytics for improved browsing experience.
                  </p>
                  <p className="text-[13px] text-[var(--color-text-secondary)] dark:text-white/60 leading-relaxed">
                    We will not be able to conduct analytics to optimize site functionality and performance.
                  </p>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-5 border-t border-gray-100 dark:border-white/10 flex justify-end bg-gray-50/50 dark:bg-white/5 rounded-b-[var(--radius-lg)]">
              <button 
                onClick={handleSavePreferences}
                className="bg-accent dark:bg-[#ca8a2a] hover:bg-accent-light dark:hover:bg-[#b07824] text-white text-sm font-medium px-6 py-2.5 transition-colors rounded-[var(--radius-sm)]"
              >
                Save Changes
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
