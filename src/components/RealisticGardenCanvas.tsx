"use client";

import { useEffect, useRef } from "react";

export default function RealisticGardenCanvas({
  theme = "sunset",
}: {
  theme?: "sunset" | "rainy" | "moonlight" | "golden";
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Rose petals
    const petalCount = theme === "golden" ? 50 : 25;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.4 - 0.7,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.2 - 0.6,
      color:
        theme === "moonlight"
          ? ["#ffffff", "#f1f5f9", "#e2e8f0"][Math.floor(Math.random() * 3)]
          : ["#e11d48", "#be123c", "#f43f5e", "#fda4af"][Math.floor(Math.random() * 4)],
    }));

    // Rain droplets or fireflies
    const particleCount = theme === "rainy" ? 60 : theme === "moonlight" ? 35 : 20;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: theme === "rainy" ? Math.random() * 1.5 + 0.5 : Math.random() * 2 + 1,
      speedY: theme === "rainy" ? Math.random() * 6 + 4 : (Math.random() - 0.5) * 0.4,
      speedX: theme === "rainy" ? -0.5 : (Math.random() - 0.5) * 0.4,
      alpha: Math.random() * 0.7 + 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Ambient Particles / Rain / Fireflies
      particles.forEach((p) => {
        ctx.save();
        ctx.beginPath();
        if (theme === "rainy") {
          ctx.strokeStyle = `rgba(255, 255, 255, ${p.alpha * 0.4})`;
          ctx.lineWidth = 1;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 2, p.y + p.speedY * 2);
          ctx.stroke();
        } else {
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle =
            theme === "moonlight"
              ? `rgba(226, 232, 240, ${p.alpha * 0.8})`
              : `rgba(253, 224, 71, ${p.alpha * 0.6})`;
          if (theme === "moonlight") {
            ctx.shadowBlur = 8;
            ctx.shadowColor = "#93c5fd";
          }
          ctx.fill();
        }
        ctx.restore();

        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y > height) p.y = -10;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
      });

      // Render Falling Petals
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.6, p.size, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += Math.sin(p.y / 40) * p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [theme]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
