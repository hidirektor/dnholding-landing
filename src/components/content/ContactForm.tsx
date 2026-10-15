"use client";

import {useCallback, useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/Button";
import Script from "next/script";
import {submitContactForm} from "@/app/actions/contact";

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
          [key: string]: any;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
  }
}

interface ContactFormProps {
  lang: string;
  dict: any;
  siteKey?: string;
}

export function ContactForm({ lang, dict, siteKey }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");

  const formRef = useRef<HTMLFormElement>(null);
  const turnstileContainerRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetIdRef = useRef<string | null>(null);

  const activeSiteKey = siteKey || "";

  // Render Cloudflare Turnstile explicitly
  const renderTurnstileWidget = useCallback(() => {
    if (!turnstileContainerRef.current || !window.turnstile || !activeSiteKey) {
      return;
    }

    // Clean up existing widget if present
    if (turnstileWidgetIdRef.current) {
      try {
        window.turnstile.remove(turnstileWidgetIdRef.current);
      } catch (e) {
        // ignore
      }
      turnstileWidgetIdRef.current = null;
    }

    turnstileContainerRef.current.innerHTML = "";

    try {
      const widgetId = window.turnstile.render(turnstileContainerRef.current, {
        sitekey: activeSiteKey,
        callback: (token: string) => {
          setTurnstileToken(token);
        },
        "expired-callback": () => {
          setTurnstileToken("");
        },
        "error-callback": () => {
          setTurnstileToken("");
        },
        theme: "light",
      });
      turnstileWidgetIdRef.current = widgetId;
    } catch (err) {
      console.error("Turnstile render error:", err);
    }
  }, [activeSiteKey]);

  useEffect(() => {
    let isMounted = true;

    if (!activeSiteKey) return;

    if (typeof window !== "undefined" && window.turnstile) {
      renderTurnstileWidget();
    } else {
      const interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          if (isMounted) {
            renderTurnstileWidget();
          }
        }
      }, 100);
      const timeout = setTimeout(() => clearInterval(interval), 10000);

      return () => {
        isMounted = false;
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    return () => {
      isMounted = false;
      if (turnstileWidgetIdRef.current && window.turnstile) {
        try {
          window.turnstile.remove(turnstileWidgetIdRef.current);
        } catch (e) {
          // ignore
        }
        turnstileWidgetIdRef.current = null;
      }
    };
  }, [activeSiteKey, renderTurnstileWidget]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowSuccessModal(false);
        setShowErrorModal(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // If siteKey is present, verify CAPTCHA is completed
    if (activeSiteKey && !turnstileToken) {
      setErrorMessage(dict.captchaRequired || "Lütfen güvenlik doğrulamasını (CAPTCHA) tamamlayın.");
      setShowErrorModal(true);
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    if (turnstileToken && !formData.get("cf-turnstile-response")) {
      formData.set("cf-turnstile-response", turnstileToken);
    }

    try {
      const result = await submitContactForm(formData);

      setIsSubmitting(false);

      if (result.success) {
        setShowSuccessModal(true);
        formRef.current?.reset();
        setTurnstileToken("");
        if (turnstileWidgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(turnstileWidgetIdRef.current);
          } catch (e) {
            // ignore
          }
        }
      } else {
        setErrorMessage(result.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
        setShowErrorModal(true);
        if (turnstileWidgetIdRef.current && window.turnstile) {
          try {
            window.turnstile.reset(turnstileWidgetIdRef.current);
          } catch (e) {
            // ignore
          }
        }
        setTurnstileToken("");
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMessage("Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyiniz.");
      setShowErrorModal(true);
    }
  };

  return (
    <div className="bg-white dark:bg-surface-elevated p-8 md:p-10 rounded-[var(--radius-xl)] shadow-[var(--shadow-large)] border border-border">
      {/* Turnstile Explicit Script Loader */}
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
        onLoad={renderTurnstileWidget}
      />

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-[var(--text-muted)]">
              {dict.name}
            </label>
            <input
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-[var(--text-muted)]">
              {dict.email}
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-[var(--text-muted)]">
              {dict.phone}
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-semibold text-[var(--text-muted)]">
              {dict.company}
            </label>
            <input
              id="company"
              name="company"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-semibold text-[var(--text-muted)]">
            {dict.subject}
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
          >
            <option value="general">{dict.subjects?.general || "Genel Bilgi"}</option>
            <option value="project">{dict.subjects?.project || "Proje İşbirliği"}</option>
            <option value="sales">{dict.subjects?.sales || "Satış & Pazarlama"}</option>
            <option value="hr">{dict.subjects?.hr || "İnsan Kaynakları"}</option>
            <option value="investor">{dict.subjects?.investor || "Yatırımcı İlişkileri"}</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-[var(--text-muted)]">
            {dict.message}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
          />
        </div>

        {/* Cloudflare Turnstile Container */}
        {activeSiteKey && (
          <div className="flex flex-col items-center justify-center w-full py-2">
            <div ref={turnstileContainerRef} className="flex justify-center min-h-[65px]" />
            <input type="hidden" name="cf-turnstile-response" value={turnstileToken} />
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? (dict.submitting || "Gönderiliyor...") : dict.submit}
        </Button>
      </form>

      {/* Success Modal Popup */}
      {showSuccessModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowSuccessModal(false)}
        >
          <div
            className="bg-white dark:bg-[#111c2e] border border-border dark:border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              aria-label="Kapat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="mx-auto w-16 h-16 rounded-full bg-accent/15 flex items-center justify-center mb-5 text-accent">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {dict.modalTitle || "Mesajınız İletildi"}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              {dict.modalMessage || "Mesajınız başarıyla tarafımıza ulaştı. En kısa sürede sizinle iletişime geçeceğiz."}
            </p>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setShowSuccessModal(false)}
            >
              {dict.modalClose || "Tamam"}
            </Button>
          </div>
        </div>
      )}

      {/* Error Modal Popup */}
      {showErrorModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
          onClick={() => setShowErrorModal(false)}
        >
          <div
            className="bg-white dark:bg-[#111c2e] border border-border dark:border-white/10 rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8 text-center relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setShowErrorModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors p-1"
              aria-label="Kapat"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            <div className="mx-auto w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mb-5 text-red-600 dark:text-red-400">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {dict.errorTitle || "Dikkat"}
            </h3>

            <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed mb-6">
              {errorMessage}
            </p>

            <Button
              type="button"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setShowErrorModal(false)}
            >
              {dict.modalClose || "Tamam"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
