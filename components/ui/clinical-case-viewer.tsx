"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type CaseStage = "antes" | "durante" | "despues";
export type CaseView = "cara" | "frente" | "superior" | "inferior";

export interface CaseImageSet {
  antes: string;
  durante?: string;
  despues: string;
}

export interface ClinicalCaseData {
  id: string;
  title: string;
  description: string;
  views: {
    cara?: CaseImageSet;
    frente?: CaseImageSet;
    superior?: CaseImageSet;
    inferior?: CaseImageSet;
  };
}

interface ClinicalCaseViewerProps {
  data: ClinicalCaseData;
}

const VIEW_LABELS: Record<CaseView, string> = {
  cara: "Cara (Frente/Perfil)",
  frente: "Dientes (Frontal)",
  superior: "Arco Superior",
  inferior: "Arco Inferior",
};

const STAGE_LABELS: Record<CaseStage, string> = {
  antes: "Antes",
  durante: "Durante",
  despues: "Después",
};

export const ClinicalCaseViewer = ({ data }: ClinicalCaseViewerProps) => {
  // Determine available views based on data
  const availableViews = (Object.keys(data.views) as CaseView[]).filter(
    (key) => data.views[key] !== undefined
  );

  const [activeView, setActiveView] = useState<CaseView>(availableViews[0] || "frente");
  const [activeStage, setActiveStage] = useState<CaseStage>("antes");

  if (availableViews.length === 0) return null;

  const currentImageSet = data.views[activeView];
  const currentImage = currentImageSet ? currentImageSet[activeStage] : null;

  // If "durante" is selected but doesn't exist for this view, fallback to "antes"
  const imageToDisplay = currentImage || (currentImageSet ? currentImageSet.antes : "");

  return (
    <div className="flex flex-col overflow-hidden rounded-3xl border border-text-light/10 bg-white shadow-xl">
      {/* View Selector (Top Tabs) */}
      <div className="flex flex-wrap items-center gap-2 border-b border-text-light/5 bg-[#fcfbf9] px-6 py-4">
        {availableViews.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-semibold transition-all",
              activeView === view
                ? "bg-text-light text-white shadow-md"
                : "bg-transparent text-text-muted hover:bg-black/5"
            )}
          >
            {VIEW_LABELS[view]}
          </button>
        ))}
      </div>

      {/* Image Viewer Area */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#e5e5e5] md:aspect-video lg:h-[480px] lg:w-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeView}-${activeStage}`}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            {imageToDisplay ? (
              <Image
                src={imageToDisplay}
                alt={`${data.title} - ${activeView} - ${activeStage}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 80vw"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-text-muted/50">
                Imagen no disponible
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Stage Selector (Bottom Pill Overlay) */}
        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center rounded-full bg-white/90 p-1.5 shadow-xl backdrop-blur-md">
          {(["antes", "durante", "despues"] as CaseStage[]).map((stage) => {
            // Disable "durante" if it doesn't exist for this image set
            const isDisabled = stage === "durante" && !currentImageSet?.durante;

            return (
              <button
                key={stage}
                onClick={() => !isDisabled && setActiveStage(stage)}
                disabled={isDisabled}
                className={cn(
                  "relative rounded-full px-6 py-2.5 text-sm font-bold transition-colors",
                  isDisabled && "opacity-40 cursor-not-allowed",
                  activeStage === stage ? "text-white" : "text-text-muted hover:text-text-light"
                )}
              >
                {activeStage === stage && (
                  <motion.div
                    layoutId="activeStageBg"
                    className="absolute inset-0 rounded-full bg-accent-gold"
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{STAGE_LABELS[stage]}</span>
              </button>
            );
          })}
        </div>
      </div>

    </div>
  );
};
