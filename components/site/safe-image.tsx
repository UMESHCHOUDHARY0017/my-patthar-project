"use client";

import { useState } from "react";
import Image from "next/image";

type SafeImageProps = Omit<React.ComponentProps<typeof Image>, "src"> & {
  src: string;
  fallbackSrc?: string;
};

export function SafeImage({ src, fallbackSrc = "/stone-fallback.svg", alt, ...props }: SafeImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <Image
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) setCurrentSrc(fallbackSrc);
      }}
      {...props}
    />
  );
}
