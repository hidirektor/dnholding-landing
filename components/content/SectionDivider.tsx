import {cn} from "@/lib/utils";

type DividerVariant = "line" | "gradient" | "wave" | "angled";

export interface SectionDividerProps {
  variant?: DividerVariant;
  className?: string;
  flip?: boolean;
}

export function SectionDivider({
  variant = "line",
  className,
  flip = false,
}: SectionDividerProps) {
  switch (variant) {
    case "line":
      return (
        <div
          className={cn("py-2", className)}
          role="separator"
          aria-hidden="true"
        >
          <div className="container-base">
            <div className="h-px bg-border dark:bg-white/10" />
          </div>
        </div>
      );

    case "gradient":
      return (
        <div
          className={cn("py-4", className)}
          role="separator"
          aria-hidden="true"
        >
          <div className="container-base">
            <div className="h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          </div>
        </div>
      );

    case "wave":
      return (
        <div
          className={cn(
            "relative -my-px select-none pointer-events-none overflow-hidden",
            flip && "rotate-180",
            className
          )}
          role="separator"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-auto block text-surface dark:text-primary-dark"
            preserveAspectRatio="none"
          >
            <path
              d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"
              fill="currentColor"
            />
          </svg>
        </div>
      );

    case "angled":
      return (
        <div
          className={cn(
            "relative h-16 sm:h-24 -my-px select-none pointer-events-none overflow-hidden",
            className
          )}
          role="separator"
          aria-hidden="true"
        >
          <div
            className={cn(
              "absolute inset-0 bg-surface dark:bg-primary-dark",
              flip
                ? "[clip-path:polygon(0_0,100%_100%,100%_100%,0_100%)]"
                : "[clip-path:polygon(0_0,100%_0,100%_100%,0_0)]"
            )}
          />
        </div>
      );

    default:
      return null;
  }
}

export default SectionDivider;
