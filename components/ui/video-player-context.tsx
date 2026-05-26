"use client";

import {
  createContext,
  useCallback,
  useContext,
  useId,
  useState,
  type ReactNode,
} from "react";

type Ctx = {
  activeId: string | null;
  setActive: (id: string | null) => void;
};

const VideoPlayerContext = createContext<Ctx | null>(null);

export function VideoPlayerProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <VideoPlayerContext.Provider value={{ activeId, setActive: setActiveId }}>
      {children}
    </VideoPlayerContext.Provider>
  );
}

export function useVideoCoordinator() {
  const ctx = useContext(VideoPlayerContext);
  const id = useId();
  const isActive = ctx ? ctx.activeId === id : false;
  const activate = useCallback(() => ctx?.setActive(id), [ctx, id]);
  const deactivate = useCallback(() => {
    if (ctx?.activeId === id) ctx.setActive(null);
  }, [ctx, id]);
  return { isActive, activate, deactivate, isInProvider: !!ctx };
}
