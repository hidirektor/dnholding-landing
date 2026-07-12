"use client";

import {useState} from "react";
import {Button} from "@/components/ui/Button";

interface ContactFormProps {
  lang: string;
  dict: any;
}

export function ContactForm({ lang, dict }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      // Reset after 3s
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white p-8 md:p-10 rounded-[var(--radius-xl)] shadow-[var(--shadow-large)] border border-border">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold text-[var(--text-muted)]">{dict.name}</label>
            <input
              id="name"
              required
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-semibold text-[var(--text-muted)]">{dict.email}</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-semibold text-[var(--text-muted)]">{dict.phone}</label>
            <input
              id="phone"
              type="tel"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="company" className="text-sm font-semibold text-[var(--text-muted)]">{dict.company}</label>
            <input
              id="company"
              className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="subject" className="text-sm font-semibold text-[var(--text-muted)]">{dict.subject}</label>
          <select
            id="subject"
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all appearance-none"
          >
            <option>{dict.form?.subjects?.general || "Genel Bilgi"}</option>
            <option>{dict.form?.subjects?.project || "Proje İşbirliği"}</option>
            <option>{dict.form?.subjects?.hr || "İnsan Kaynakları"}</option>
            <option>{dict.form?.subjects?.investor || "Yatırımcı İlişkileri"}</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-semibold text-[var(--text-muted)]">{dict.message}</label>
          <textarea
            id="message"
            required
            rows={5}
            className="w-full px-4 py-3 rounded-[var(--radius-md)] bg-surface border border-border focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-y"
          />
        </div>

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
