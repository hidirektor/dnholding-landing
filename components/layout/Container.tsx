import {cn} from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
  as?: React.ElementType;
}

export function Container({
  children,
  className,
  narrow = false,
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={cn(
        "container-base",
        narrow && "container-narrow",
        className
      )}
    >
      {children}
    </Component>
  );
}

export default Container;
