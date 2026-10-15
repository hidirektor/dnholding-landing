"use server";

import nodemailer from "nodemailer";

interface ContactFormResult {
  success: boolean;
  error?: string;
}

export async function submitContactForm(data: FormData): Promise<ContactFormResult> {
  const token = data.get("cf-turnstile-response");

  // Validate Cloudflare Turnstile CAPTCHA in production or when secret key is provided
  const secretKey = process.env.CLOUDFLARE_SECRET_KEY || "";
  if (process.env.NODE_ENV === "production" || secretKey) {
    if (!token) {
      return { success: false, error: "Lütfen güvenlik doğrulamasını (CAPTCHA) tamamlayın." };
    }

    try {
      const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
      const res = await fetch(verifyEndpoint, {
        method: "POST",
        body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token.toString())}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded",
        },
      });

      const verifyData = await res.json();
      if (!verifyData.success) {
        console.error("Turnstile verification failed:", verifyData);
        return { success: false, error: "Güvenlik doğrulaması başarısız oldu. Lütfen tekrar deneyin." };
      }
    } catch (err) {
      console.error("Turnstile validation error:", err);
      // In case Cloudflare verification endpoint fails unexpectedly, log error
      if (process.env.NODE_ENV === "production") {
        return { success: false, error: "Güvenlik kontrolü sırasında bir hata oluştu. Lütfen tekrar deneyin." };
      }
    }
  }

  // Extract form fields
  const name = String(data.get("name") || "").trim();
  const email = String(data.get("email") || "").trim();
  const phone = String(data.get("phone") || "").trim();
  const company = String(data.get("company") || "").trim();
  const subjectKey = String(data.get("subject") || "general").trim();
  const message = String(data.get("message") || "").trim();

  if (!name || !email || !message) {
    return { success: false, error: "Lütfen zorunlu alanları (Ad Soyad, E-posta, Mesaj) doldurunuz." };
  }

  // Subject translation mapping
  const subjectMap: Record<string, string> = {
    general: "Genel Bilgi",
    project: "Proje İşbirliği",
    sales: "Satış & Pazarlama",
    hr: "İnsan Kaynakları",
    investor: "Yatırımcı İlişkileri",
  };
  const subjectTitle = subjectMap[subjectKey] || subjectKey;

  // Target recipient email (fixed constant)
  const TARGET_EMAIL = "info@dnholding.com.tr";

  const smtpHost = process.env.SMTP_HOST;
  const smtpPort = Number(process.env.SMTP_PORT || "465");
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const mailFrom = smtpUser;

  if (smtpHost && smtpUser && smtpPass) {
    try {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      const submissionDate = new Date().toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });

      const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff; color: #1e293b;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #b89047;">
            <h2 style="color: #0f172a; margin: 0; font-size: 20px;">DN Holding Web Sitesi - İletişim Formu</h2>
            <p style="margin: 6px 0 0 0; color: #64748b; font-size: 13px;">${submissionDate}</p>
          </div>
          <div style="padding: 20px 0;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 10px 0; font-weight: bold; width: 130px; color: #64748b;">Ad Soyad:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">E-posta:</td>
                <td style="padding: 10px 0; color: #0f172a;"><a href="mailto:${email}" style="color: #b89047; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Telefon:</td>
                <td style="padding: 10px 0; color: #0f172a;">${phone ? `<a href="tel:${phone}" style="color: #0f172a; text-decoration: none;">${phone}</a>` : "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Şirket:</td>
                <td style="padding: 10px 0; color: #0f172a;">${company || "—"}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #64748b;">Konu:</td>
                <td style="padding: 10px 0; color: #0f172a; font-weight: 600;">${subjectTitle}</td>
              </tr>
              <tr>
                <td style="padding: 14px 0 6px 0; font-weight: bold; color: #64748b;" colspan="2">Mesaj:</td>
              </tr>
              <tr>
                <td colspan="2" style="background-color: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; color: #334155; line-height: 1.6; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
          </div>
          <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #94a3b8; text-align: center;">
            Bu mesaj <a href="https://www.dnholding.com.tr" style="color: #b89047; text-decoration: none;">www.dnholding.com.tr</a> iletişim formundan iletilmiştir.
          </div>
        </div>
      `;

      await transporter.sendMail({
        from: `"DN Holding İletişim Formu" <${mailFrom}>`,
        to: TARGET_EMAIL,
        replyTo: email,
        subject: `Yeni İletişim Formu: ${subjectTitle} - ${name}`,
        text: `Ad Soyad: ${name}\nE-posta: ${email}\nTelefon: ${phone || "—"}\nŞirket: ${company || "—"}\nKonu: ${subjectTitle}\n\nMesaj:\n${message}\n\nTarih: ${submissionDate}`,
        html: htmlContent,
      });
    } catch (mailError) {
      console.error("Nodemailer error:", mailError);
      return {
        success: false,
        error: "Mesajınız gönderilirken bir e-posta sunucusu hatası oluştu. Lütfen doğrudan info@dnholding.com.tr adresine yazınız.",
      };
    }
  } else {
    // When SMTP credentials are not configured in environment, log to console
    console.warn("SMTP settings are not configured in environment. Logged form submission:", {
      to: TARGET_EMAIL,
      name,
      email,
      phone,
      company,
      subject: subjectTitle,
      message,
    });
  }

  return { success: true };
}
