import React from "react";
import {cn} from "@/lib/utils";

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  display?: boolean;
  accent?: boolean;
}

export const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ className, level = "h2", display = false, accent = false, children, ...props }, ref) => {
    const Component = level;
    
    const baseStyles = "text-text font-bold leading-tight dark:text-white";
    
    const sizes = {
      h1: "text-4xl sm:text-5xl lg:text-6xl",
      h2: "text-3xl sm:text-4xl lg:text-5xl",
      h3: "text-2xl sm:text-3xl lg:text-4xl",
      h4: "text-xl sm:text-2xl lg:text-3xl",
      h5: "text-lg sm:text-xl lg:text-2xl",
      h6: "text-base sm:text-lg lg:text-xl",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          baseStyles,
          sizes[level],
          display && "font-display tracking-tight text-balance",
          accent && "flex items-center gap-3 before:block before:w-2 before:h-2 before:rounded-full before:bg-accent",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Heading.displayName = "Heading";
