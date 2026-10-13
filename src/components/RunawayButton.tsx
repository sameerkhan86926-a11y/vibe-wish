"use client";

import { useState } from "react";

export default function RunawayButton({ text }: { text: string }) {
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null);

  const dodge = () => {
    const randomX = (Math.random() - 0.5) * 260;
    const randomY = (Math.random() - 0.5) * 260;
    setPosition({ x: randomX, y: randomY });
  };

  return (
    <button
      type="button"
      onMouseEnter={dodge}
      onTouchStart={dodge}
      onClick={dodge}
      style={
        position
          ? {
              transform: `translate(${position.x}px, ${position.y}px)`,
              transition: "transform 0.15s ease-out",
            }
          : undefined
      }
      className="rounded-full border border-zinc-700 bg-zinc-900/80 px-6 py-2.5 text-xs font-semibold text-zinc-400 backdrop-blur-md shadow-lg"
    >
      {text}
    </button>
  );
}
