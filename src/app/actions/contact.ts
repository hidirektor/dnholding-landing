"use server";

export async function submitContactForm(data: FormData) {
  const token = data.get("cf-turnstile-response");

  // In local development, we skip Cloudflare Turnstile validation
  if (process.env.NODE_ENV === "production") {
    if (!token) {
      return { success: false, error: "Please complete the CAPTCHA." };
    }

    const verifyEndpoint = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
    const secretKey = process.env.NEXT_PUBLIC_CLOUDFLARE_SECRET_KEY || "";

    const res = await fetch(verifyEndpoint, {
      method: "POST",
      body: `secret=${encodeURIComponent(secretKey)}&response=${encodeURIComponent(token.toString())}`,
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
    });

    const verifyData = await res.json();
    if (!verifyData.success) {
      return { success: false, error: "CAPTCHA validation failed." };
    }
  }

  // Extract other fields (for later use, currently simulated)
  const name = data.get("name");
  const email = data.get("email");
  const phone = data.get("phone");
  const company = data.get("company");
  const subject = data.get("subject");
  const message = data.get("message");

  // Here you would typically send an email or save to a database.
  // We're simulating a successful operation for now.
  
  return { success: true };
}
