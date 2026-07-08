import {AnimatedCounter} from "@/components/ui/AnimatedCounter";
import {Container} from "@/components/layout/Container";
import {cn} from "@/lib/utils";
import {ScrollReveal} from "@/components/ui/ScrollReveal";

interface StatsBarProps {
  stats: {
    value: number;
    label: string;
    suffix?: string;
    prefix?: string;
  }[];
  variant?: "default" | "dark";
}

export function StatsBar({ stats, variant = "default" }: StatsBarProps) {
  const isDark = variant === "dark";

  return (
    <div className={cn("py-16 md:py-24", isDark ? "bg-primary text-white" : "bg-white text-text border-y border-border")}>
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-0 divide-x divide-transparent md:divide-border/20">
          {stats.map((stat, index) => (
            <ScrollReveal key={stat.label} delay={index * 100}>
              <div className="flex flex-col items-center justify-center text-center px-4">
                <div className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-accent mb-2">
                  <AnimatedCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                  />
                </div>
                <p className={cn("text-sm md:text-base font-medium uppercase tracking-wider", isDark ? "text-white/60" : "text-[var(--text-muted)]")}>
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </div>
  );
}
