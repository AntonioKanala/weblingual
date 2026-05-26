"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

export interface ImageWithFallbackProps extends Omit<ImageProps, "onError" | "src"> {
  src: string;
  fallbackSrc: string;
}

export const ImageWithFallback = ({
  src,
  fallbackSrc,
  alt,
  ...rest
}: ImageWithFallbackProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
    />
  );
};
