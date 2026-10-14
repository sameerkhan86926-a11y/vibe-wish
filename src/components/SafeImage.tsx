"use client";

import { useState } from "react";

interface SafeImageProps {
  src?: string;
  alt?: string;
  className?: string;
  fallback?: string;
}

export default function SafeImage({
  src,
  alt = "Memory",
  className = "",
  fallback = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700",
}: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState(src || fallback);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? fallback : imgSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(fallback);
        }
      }}
    />
  );
}
