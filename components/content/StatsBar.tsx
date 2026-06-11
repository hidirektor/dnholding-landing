import {cn} from "@/lib/utils";
import {AnimatedCounter} from "@/components/ui/AnimatedCounter";

export interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
}

export interface StatsBarProps {
  stats: StatItem[];
  variant?: "default" | "dark";
}

export function StatsBar({ stats, variant = "default" }: StatsBarProps) {
  return (
    <section
      className={cn(
        "relative py-12 sm:py-16 overflow-hidden",
        variant === "dark"
          ? "bg-primary dark:bg-primary-dark"
          : "bg-surface dark:bg-primary-light"
      )}
      aria-label="Statistics"
    >
      {/* Decorative accent lines */}
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"
        aria-hidden="true"
      />

      <div className="container-base">
        <div
          className={cn(
            "grid gap-8 sm:gap-0",
            stats.length <= 4
              ? "grid-cols-2 sm:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-" + stats.length
          )}
        >
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={cn(
                "relative flex flex-col items-center text-center px-4 py-2",
                /* Divider line between items on desktop */
                index > 0 &&
                  "sm:before:absolute sm:before:left-0 sm:before:top-1/2 sm:before:-translate-y-1/2 sm:before:h-12 sm:before:w-px",
                index > 0 &&
                  (variant === "dark"
                    ? "sm:before:bg-white/10"
                    : "sm:before:bg-border")
              )}
            >
              <span
                className={cn(
                  "text-3xl sm:text-4xl lg:text-5xl font-bold font-display tracking-tight",
                  variant === "dark"
                    ? "text-accent"
                    : "text-primary dark:text-accent"
                )}
              >
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2200}
                />
              </span>
              <span
                className={cn(
                  "mt-2 text-sm font-medium tracking-wide uppercase",
                  variant === "dark"
                    ? "text-white/60"
                    : "text-text-secondary dark:text-text-light"
                )}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsBar;
