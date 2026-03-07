import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";
import { ArrowRight } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "cta";
  size?: "sm" | "md" | "lg";
  showArrow?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      showArrow = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cn(
          // Base styles
          "inline-flex items-center justify-center gap-2 rounded-full font-body font-medium transition-all duration-300 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

          // Variants
          {
            // Primary (gold)
            "bg-accent-gold text-background-dark shadow-lg hover:bg-accent-gold-light hover:shadow-xl":
              variant === "primary",

            // Secondary (green)
            "bg-accent-green text-text-dark shadow-lg hover:bg-accent-green-light hover:shadow-xl":
              variant === "secondary",

            // Outline
            "border-2 border-accent-gold bg-transparent text-accent-gold hover:bg-accent-gold hover:text-background-dark":
              variant === "outline",

            // Ghost
            "bg-transparent text-text-light hover:bg-text-light/10":
              variant === "ghost",

            // CTA (larger, more prominent)
            "bg-gradient-to-r from-accent-gold to-accent-gold-light text-background-dark shadow-xl hover:shadow-2xl":
              variant === "cta",
          },

          // Sizes
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-base": size === "md",
            "px-8 py-4 text-lg": size === "lg",
          },

          // CTA is always large
          variant === "cta" && "px-10 py-5 text-xl",

          className
        )}
        {...props}
      >
        {children}
        {showArrow && <ArrowRight className="h-5 w-5" />}
      </button>
    );
  }
);

Button.displayName = "Button";
