import {cn} from "@/lib/utils";

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps {
  children: React.ReactNode;
  level?: HeadingLevel;
  display?: boolean;
  accent?: boolean;
  className?: string;
  id?: string;
}

const levelStyles: Record<HeadingLevel, string> = {
  h1: "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
  h2: "text-3xl sm:text-4xl md:text-5xl",
  h3: "text-2xl sm:text-3xl",
  h4: "text-xl sm:text-2xl",
  h5: "text-lg sm:text-xl",
  h6: "text-base sm:text-lg",
};

export function Heading({
  children,
  level = "h2",
  display = false,
  accent = false,
  className,
  id,
}: HeadingProps) {
  const Tag = level;

  return (
    <Tag
      id={id}
      className={cn(
        "font-bold tracking-tight text-balance",
        levelStyles[level],
        display && "font-display leading-[1.1] tracking-[-0.02em]",
        !display && "font-sans leading-tight",
        accent && "relative pb-4",
        className
      )}
    >
      {children}
      {accent && (
        <span
          className="absolute bottom-0 left-0 w-12 h-0.5 bg-accent rounded-full"
          aria-hidden="true"
        />
      )}
    </Tag>
  );
}

export default Heading;
