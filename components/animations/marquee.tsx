"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface MarqueeProps {
  children: ReactNode;
  speed?: "slow" | "normal" | "fast";
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  gap?: string;
  className?: string;
}

export const Marquee = ({
  children,
  speed = "normal",
  direction = "left",
  pauseOnHover = true,
  gap = "4rem",
  className,
}: MarqueeProps) => {
  const speedMap = {
    slow: "60s",
    normal: "40s",
    fast: "20s",
  };

  const animationDuration = speedMap[speed];

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className={cn("flex", pauseOnHover && "hover:[animation-play-state:paused]")}
        style={{
          gap,
          animation: `marquee ${animationDuration} linear infinite`,
          animationDirection: direction === "right" ? "reverse" : "normal",
        }}
      >
        {/* First set of children */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex shrink-0" style={{ gap }}>
          {children}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};
