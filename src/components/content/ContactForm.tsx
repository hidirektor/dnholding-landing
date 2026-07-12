"use client";

import {useState} from "react";
import {Button} from "@/components/ui/Button";
import Script from "next/script";
import {submitContactForm} from "@/app/actions/contact";

interface ContactFormProps {
  lang: string;
  dict: any;
}

export function ContactForm({ lang, dict }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = await submitContactForm(formData);
    
    setIsSubmitting(false);
    
    if (result.success) {
      setIsSuccess(true);
      e.currentTarget.reset();
      // Reset after 3s
      setTimeout(() => setIsSuccess(false), 3000);
    } else {
      alert(result.error || "Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[var(--radius-xl)] shadow-[var(--shadow-large)] border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-[var(--text-muted)]">{dict.name}</label>
            <input
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-[var(--text-muted)]">{dict.email}</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-[var(--text-muted)]">{dict.phone}</label>
            <input
              id="phone"
              name="phone"
              type="tel"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-semibold text-[var(--text-muted)]">{dict.company}</label>
            <input
              id="company"
              name="company"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-semibold text-[var(--text-muted)]">{dict.subject}</label>
          <select
            id="subject"
            name="subject"
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
          >
            <option value="general">{dict.form?.subjects?.general || "Genel Bilgi"}</option>
            <option value="project">{dict.form?.subjects?.project || "Proje İşbirliği"}</option>
            <option value="hr">{dict.form?.subjects?.hr || "İnsan Kaynakları"}</option>
            <option value="investor">{dict.form?.subjects?.investor || "Yatırımcı İlişkileri"}</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-[var(--text-muted)]">{dict.message}</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
          />
        </div>

        {process.env.NODE_ENV === "production" && (
          <div className="flex justify-center w-full">
            <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
            <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}></div>
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className="w-full"
          size="lg"
        >
          {isSuccess ? (dict.form?.success || "Başarıyla Gönderildi ✓") : isSubmitting ? (dict.form?.submitting || "Gönderiliyor...") : dict.submit}
        </Button>
      </form>
    </div>
  );
}
