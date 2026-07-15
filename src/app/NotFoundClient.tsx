"use client";

import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";

interface NotFoundClientProps {
  dict: any;
}

export function NotFoundClient({ dict }: NotFoundClientProps) {
  const router = useRouter();
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    // Hide header, footer, and cookie widget
    document.body.classList.add("hide-layout-elements");
    
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      document.body.classList.remove("hide-layout-elements");
      clearInterval(interval);
    };
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-center p-6 relative z-[100]">
      <div className="mb-8 animate-fade-in-down">
        <Image 
          src="/assets/image/logo/dnholding_v2.png" 
          alt="DN Holding Logo" 
          width={240} 
          height={60} 
          className="object-contain"
        />
      </div>
      
      <h1 className="text-7xl md:text-9xl font-bold text-[var(--color-text-heading)] mb-6 animate-scale-in">
        {dict.notFound?.title || "404"}
      </h1>
      
      <p className="text-lg md:text-xl text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed animate-fade-in-up">
        {dict.notFound?.description?.replace("{seconds}", seconds.toString()) || 
          `Aradığınız sayfa bulunamadı. ${seconds} saniye içinde ana sayfaya yönlendiriliyorsunuz...`}
      </p>

      {/* Progress Bar for visual feedback */}
      <div className="w-48 h-1 bg-gray-200 dark:bg-white/10 rounded-full mt-8 overflow-hidden animate-fade-in-up">
        <div 
          className="h-full bg-accent transition-all duration-1000 ease-linear"
          style={{ width: `${(seconds / 3) * 100}%` }}
        />
      </div>
    </div>
  );
}
