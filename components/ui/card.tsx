import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "bordered" | "elevated";
  padding?: "sm" | "md" | "lg";
  hover?: boolean;
}

export const Card = ({
  className,
  variant = "default",
  padding = "md",
  hover = false,
  children,
  ...props
}: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",

        // Variants
        {
          "bg-background-light": variant === "default",
          "border border-text-light/10 bg-background-light":
            variant === "bordered",
          "bg-background-light shadow-lg": variant === "elevated",
        },

        // Padding
        {
          "p-4": padding === "sm",
          "p-6": padding === "md",
          "p-8": padding === "lg",
        },

        // Hover effect
        hover &&
          "cursor-pointer hover:-translate-y-1 hover:shadow-xl",

        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
