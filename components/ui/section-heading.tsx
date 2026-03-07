import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface SectionHeadingProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  subtitle?: string;
  variant?: "light" | "dark";
  align?: "left" | "center";
}

export const SectionHeading = ({
  title,
  subtitle,
  variant = "dark",
  align = "center",
  className,
  ...props
}: SectionHeadingProps) => {
  return (
    <div
      className={cn(
        "space-y-4",
        {
          "text-center": align === "center",
          "text-left": align === "left",
        },
        className
      )}
      {...props}
    >
      <h2
        className={cn(
          "font-display text-4xl font-bold leading-tight md:text-5xl lg:text-6xl",
          {
            "text-text-dark": variant === "light",
            "text-text-light": variant === "dark",
          }
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn("font-body text-lg md:text-xl lg:text-2xl", {
            "text-text-dark/80": variant === "light",
            "text-text-muted": variant === "dark",
          })}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};
