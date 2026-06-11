"use client";

import {type ChangeEvent, type FormEvent, useState} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/Button";

export interface ContactFormProps {
  lang?: string;
  className?: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const labels = {
  tr: {
    name: "Ad Soyad",
    email: "E-posta",
    phone: "Telefon",
    company: "Şirket",
    subject: "Konu",
    message: "Mesajınız",
    submit: "Gönder",
    submitting: "Gönderiliyor...",
    success: "Mesajınız başarıyla gönderildi!",
    successSub: "En kısa sürede sizinle iletişime geçeceğiz.",
    error: "Bir hata oluştu. Lütfen tekrar deneyin.",
    required: "Bu alan zorunludur",
    emailInvalid: "Geçerli bir e-posta adresi girin",
    subjects: [
      { value: "", label: "Konu Seçin" },
      { value: "general", label: "Genel Bilgi" },
      { value: "partnership", label: "İş Birliği" },
      { value: "career", label: "Kariyer" },
      { value: "press", label: "Basın & Medya" },
      { value: "other", label: "Diğer" },
    ],
    sendAnother: "Yeni Mesaj Gönder",
  },
  en: {
    name: "Full Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    subject: "Subject",
    message: "Your Message",
    submit: "Send Message",
    submitting: "Sending...",
    success: "Message sent successfully!",
    successSub: "We will get back to you as soon as possible.",
    error: "An error occurred. Please try again.",
    required: "This field is required",
    emailInvalid: "Please enter a valid email address",
    subjects: [
      { value: "", label: "Select Subject" },
      { value: "general", label: "General Inquiry" },
      { value: "partnership", label: "Partnership" },
      { value: "career", label: "Career" },
      { value: "press", label: "Press & Media" },
      { value: "other", label: "Other" },
    ],
    sendAnother: "Send Another Message",
  },
};

const inputBaseClass = cn(
  "w-full bg-white dark:bg-primary-light",
  "border border-border dark:border-white/10",
  "rounded-[var(--radius-md)] px-4 py-3 text-sm text-text dark:text-text-inverse",
  "placeholder:text-text-light",
  "transition-all duration-[var(--duration-fast)] ease-[var(--ease-premium)]",
  "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
  "hover:border-accent/30"
);

export function ContactForm({ lang = "tr", className }: ContactFormProps) {
  const t = lang === "en" ? labels.en : labels.tr;

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    company: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  function validate(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = t.required;
    if (!formData.email.trim()) {
      newErrors.email = t.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t.emailInvalid;
    }
    if (!formData.subject) newErrors.subject = t.required;
    if (!formData.message.trim()) newErrors.message = t.required;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Contact form submitted:", formData);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function handleReset() {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: "",
    });
    setErrors({});
    setStatus("idle");
  }

  // Success state
  if (status === "success") {
    return (
      <div
        className={cn(
          "text-center py-16 px-6 rounded-[var(--radius-xl)]",
          "bg-white dark:bg-primary-light border border-border dark:border-white/5",
          "animate-scale-in",
          className
        )}
      >
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-success/10 flex items-center justify-center">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            className="text-success"
          >
            <path
              d="M20 6L9 17l-5-5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-text dark:text-text-inverse mb-2">
          {t.success}
        </h3>
        <p className="text-text-secondary mb-8">{t.successSub}</p>
        <Button variant="secondary" onClick={handleReset}>
          {t.sendAnother}
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "space-y-6 p-8 rounded-[var(--radius-xl)]",
        "bg-white dark:bg-primary-light",
        "border border-border dark:border-white/5",
        "shadow-[var(--shadow-subtle)]",
        className
      )}
      noValidate
    >
      {/* Name + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label={t.name}
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        <FormField
          label={t.email}
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
      </div>

      {/* Phone + Company row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormField
          label={t.phone}
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <FormField
          label={t.company}
          name="company"
          type="text"
          value={formData.company}
          onChange={handleChange}
        />
      </div>

      {/* Subject */}
      <div>
        <label className="block text-sm font-medium text-text dark:text-text-inverse mb-1.5">
          {t.subject} <span className="text-error">*</span>
        </label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={cn(
            inputBaseClass,
            "appearance-none cursor-pointer",
            errors.subject && "border-error focus:ring-error/50"
          )}
          required
        >
          {t.subjects.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {errors.subject && (
          <p className="mt-1 text-xs text-error">{errors.subject}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-medium text-text dark:text-text-inverse mb-1.5">
          {t.message} <span className="text-error">*</span>
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={cn(
            inputBaseClass,
            "resize-y min-h-[120px]",
            errors.message && "border-error focus:ring-error/50"
          )}
          required
        />
        {errors.message && (
          <p className="mt-1 text-xs text-error">{errors.message}</p>
        )}
      </div>

      {/* Error banner */}
      {status === "error" && (
        <div className="p-4 rounded-[var(--radius-md)] bg-error/10 border border-error/20 text-sm text-error animate-fade-in-up">
          {t.error}
        </div>
      )}

      {/* Submit */}
      <div className="pt-2">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon="arrow"
          disabled={status === "submitting"}
          className="w-full sm:w-auto"
        >
          {status === "submitting" ? t.submitting : t.submit}
        </Button>
      </div>
    </form>
  );
}

function FormField({
  label,
  name,
  type,
  value,
  onChange,
  error,
  required,
}: {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-text dark:text-text-inverse mb-1.5">
        {label}
        {required && <span className="text-error ml-0.5">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={cn(
          inputBaseClass,
          error && "border-error focus:ring-error/50"
        )}
        required={required}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
}

export default ContactForm;
