"use client";

import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface VideoPlayerProps {
  type: "youtube" | "native";
  src: string; // YouTube video ID or mp4 URL
  poster?: string; // Thumbnail image
  title?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
}

export const VideoPlayer = ({
  type,
  src,
  poster,
  title = "Video",
  className,
  autoPlay = false,
  muted = true,
  loop = false,
  playsInline = true,
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);

  if (type === "youtube") {
    const thumbnailUrl =
      poster || `https://img.youtube.com/vi/${src}/maxresdefault.jpg`;

    return (
      <div className={cn("group relative overflow-hidden rounded-2xl", className)}>
        {!isPlaying ? (
          // Facade: Show thumbnail with play button
          <div className="relative aspect-video">
            <Image
              src={thumbnailUrl}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark/60 to-transparent transition-opacity group-hover:opacity-90" />
            {/* Play button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center"
              aria-label={`Play ${title}`}
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-accent-gold shadow-2xl transition-all hover:scale-110 hover:bg-accent-gold-light">
                <Play className="h-8 w-8 fill-background-dark text-background-dark" />
              </div>
            </button>
          </div>
        ) : (
          // Actual YouTube iframe
          <div className="relative aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${src}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 h-full w-full"
            />
          </div>
        )}
      </div>
    );
  }

  // Native video
  return (
    <div className={cn("relative overflow-hidden rounded-2xl", className)}>
      <video
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        controls={!autoPlay}
        className="h-full w-full object-cover"
      >
        Tu navegador no soporta video HTML5.
      </video>
    </div>
  );
};
