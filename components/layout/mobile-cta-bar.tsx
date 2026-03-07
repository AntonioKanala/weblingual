"use client";

import { Button } from "@/components/ui/button";
import { URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useScroll } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

export const MobileCtaBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      // Show after scrolling past 100vh (hero section)
      setIsVisible(latest > window.innerHeight);
    });

    return () => unsubscribe();
  }, [scrollY]);

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isVisible ? 0 : 100 }}
      transition={{ type: "spring", damping: 30, stiffness: 300 }}
      className={cn(
        "fixed bottom-0 left-0 right-0 z-40 lg:hidden",
        "border-t border-text-light/10 bg-background-light/95 p-4 shadow-2xl backdrop-blur-lg"
      )}
    >
      <Link href={URLS.agenda}>
        <Button variant="cta" className="w-full" showArrow>
          Agenda tu Evaluación
        </Button>
      </Link>
    </motion.div>
  );
};
