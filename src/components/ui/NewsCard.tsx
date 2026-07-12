import React from "react";
import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  href: string;
  category?: string;
  readTime?: string;
}

export function NewsCard({ title, description, image, href, category = "Haber", readTime = "5 dk" }: NewsCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <div className="flex flex-col gap-6">
        {/* Image Container with specific corner radii */}
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-[1.5rem] rounded-bl-[4rem] bg-zinc-100 dark:bg-zinc-800">
          <Image
            src={image || "/assets/image/background/hero-bg.jpg"}
            alt={title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
        
        {/* Content Container */}
        <div className="flex flex-col gap-4">
          {/* Tags */}
          <div className="flex items-center gap-3">
            {category && (
              <span className="bg-[#fde68a] text-black px-3 py-1 text-xs font-bold tracking-wider rounded-sm">
                {category}
              </span>
            )}
            {readTime && (
              <span className="bg-[#d5d7cd] text-black px-3 py-1 text-xs font-bold tracking-wider rounded-sm">
                {readTime}
              </span>
            )}
          </div>
          
          {/* Title */}
          <h3 className="text-2xl lg:text-3xl font-medium leading-tight text-[var(--text-heading)] group-hover:text-accent transition-colors">
            {title}
          </h3>
          
          {/* Description */}
          <p className="text-[var(--text-muted)] text-sm lg:text-base leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
