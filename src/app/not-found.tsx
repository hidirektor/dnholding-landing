import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="tr">
      <body
        style={{
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          margin: 0,
          padding: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#fafaf8",
          color: "#1a1a1e",
        }}
      >
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <div
            style={{
              width: 80,
              height: 80,
              margin: "0 auto 2rem",
              borderRadius: 16,
              background:
                "linear-gradient(135deg, #c9a84c, #a88a3a)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: 700,
              letterSpacing: "0.05em",
            }}
          >
            DN
          </div>
          <h1
            style={{
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 700,
              margin: "0 0 0.5rem",
              color: "#1a1a2e",
              lineHeight: 1,
            }}
          >
            404
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b6b73",
              margin: "0 0 2rem",
              maxWidth: 400,
            }}
          >
            Aradığınız sayfa bulunamadı. Ana sayfaya dönerek devam edebilirsiniz.
          </p>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "0.75rem 1.5rem",
              background: "linear-gradient(135deg, #c9a84c, #a88a3a)",
              color: "white",
              borderRadius: 10,
              textDecoration: "none",
              fontWeight: 600,
              fontSize: "0.9375rem",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            Ana Sayfa
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </body>
    </html>
  );
}
