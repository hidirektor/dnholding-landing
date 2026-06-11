"use client";

export function CookieWidget() {
  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center group cursor-pointer">
      <div className="w-14 h-14 bg-white rounded-full shadow-[var(--shadow-large)] flex items-center justify-center border border-border transition-transform duration-300 group-hover:scale-105">
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
