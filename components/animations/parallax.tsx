"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";

export interface ParallaxProps {
  children: ReactNode;
  speed?: number; // 0.5 = half speed (slower), 2 = double speed (faster)
  className?: string;
}

export const Parallax = ({
  children,
  speed = 0.5,
  className,
}: ParallaxProps) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Calculate the parallax offset
  // Speed of 0.5 means it moves at half the scroll speed
  const y = useTransform(scrollYProgress, [0, 1], [0, (1 - speed) * 100]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
};
