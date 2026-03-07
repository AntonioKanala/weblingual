import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "outline";
}

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium uppercase tracking-widest transition-all",

        // Variants
        {
          "bg-text-light/10 text-text-light": variant === "default",
          "bg-gradient-to-r from-accent-gold to-accent-gold-light text-background-dark shadow-md":
            variant === "gold",
          "border-2 border-accent-gold bg-transparent text-accent-gold":
            variant === "outline",
        },

        className
      )}
      {...props}
    />
  );
};
