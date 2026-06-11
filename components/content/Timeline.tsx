"use client";

import Image from "next/image";
import {cn} from "@/lib/utils";
import {ScrollReveal} from "@/components/ui/ScrollReveal";

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
}

export function Timeline({ items }: TimelineProps) {
  return (
    <div className="relative" aria-label="Timeline">
      {/* Central vertical line */}
      <div
        className={cn(
          "absolute left-6 md:left-1/2 top-0 bottom-0 w-px",
          "bg-gradient-to-b from-accent/40 via-border to-accent/40",
          "md:-translate-x-px"
        )}
        aria-hidden="true"
      />

      <div className="space-y-12 md:space-y-16">
        {items.map((item, index) => {
          const isLeft = index % 2 === 0;

          return (
            <ScrollReveal
              key={`${item.year}-${index}`}
              direction={isLeft ? "left" : "right"}
              delay={index * 100}
            >
              <div
                className={cn(
                  "relative flex items-start gap-8",
                  "pl-16 md:pl-0",
                  /* Alternating layout on desktop */
                  "md:grid md:grid-cols-[1fr_auto_1fr] md:gap-8"
                )}
              >
                {/* Left content */}
                <div
                  className={cn(
                    "hidden md:block",
                    isLeft ? "text-right" : "order-3"
                  )}
                >
                  {isLeft ? (
                    <TimelineContent item={item} align="right" />
                  ) : (
                    <div />
                  )}
                </div>

                {/* Center dot + year */}
                <div className="absolute left-6 md:relative md:left-auto flex flex-col items-center z-10">
                  {/* Dot */}
                  <div
                    className={cn(
                      "w-3 h-3 rounded-full bg-accent",
                      "ring-4 ring-surface dark:ring-primary-dark",
                      "transition-shadow duration-[var(--duration-medium)]",
                      "shadow-[0_0_0_0_rgba(201,168,76,0)] hover:shadow-[0_0_12px_4px_rgba(201,168,76,0.25)]"
                    )}
                  />
                  {/* Year badge */}
                  <span className="mt-2 text-xs font-bold text-accent tracking-wider whitespace-nowrap bg-surface dark:bg-primary-dark px-2 py-0.5 rounded-full border border-accent/20">
                    {item.year}
                  </span>
                </div>

                {/* Right content */}
                <div
                  className={cn(
                    "hidden md:block",
                    !isLeft ? "text-left" : "order-3"
                  )}
                >
                  {!isLeft ? (
                    <TimelineContent item={item} align="left" />
                  ) : (
                    <div />
                  )}
                </div>

                {/* Mobile content (always rendered) */}
                <div className="md:hidden flex-1">
                  <TimelineContent item={item} align="left" />
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
}

function TimelineContent({
  item,
  align,
}: {
  item: TimelineItem;
  align: "left" | "right";
}) {
  return (
    <div
      className={cn(
        "group bg-white dark:bg-primary-light rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-subtle)]",
        "border border-border dark:border-white/5",
        "hover:shadow-[var(--shadow-medium)] hover:border-accent/20",
        "transition-all duration-[var(--duration-medium)] ease-[var(--ease-premium)]",
        align === "right" && "md:ml-auto"
      )}
    >
      {item.image && (
        <div className="relative w-full aspect-video rounded-[var(--radius-md)] overflow-hidden mb-4">
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold text-text dark:text-text-inverse mb-2 group-hover:text-accent transition-colors">
        {item.title}
      </h3>
      <p className="text-sm text-text-secondary leading-relaxed">
        {item.description}
      </p>
    </div>
  );
}

export default Timeline;
