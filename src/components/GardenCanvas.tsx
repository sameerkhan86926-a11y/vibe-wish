"use client";

import { useEffect, useRef } from "react";

export default function GardenCanvas({ intensity = "normal" }: { intensity?: "normal" | "grand" }) {
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

    const petalCount = intensity === "grand" ? 65 : 35;
    const fireflyCount = 28;

    // Rose petals with curved botanical shapes
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 14 + 10,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: Math.random() * 1.8 - 0.9,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.6 - 0.8,
      color: ["#e11d48", "#be123c", "#f43f5e", "#fda4af"][Math.floor(Math.random() * 4)],
    }));

    // Soft glowing golden fireflies / lanterns
    const fireflies = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.7 + 0.3,
      speedAlpha: (Math.random() * 0.02 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Render Fireflies (Golden garden lanterns)
      fireflies.forEach((f) => {
        f.alpha += f.speedAlpha;
        if (f.alpha > 0.9 || f.alpha < 0.2) f.speedAlpha *= -1;
        f.x += f.vx;
        f.y += f.vy;
        if (f.x < 0) f.x = width;
        if (f.x > width) f.x = 0;
        if (f.y < 0) f.y = height;
        if (f.y > height) f.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${f.alpha})`;
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#facc15";
        ctx.fill();
        ctx.restore();
      });

      // Render Falling Rose Petals
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.size * 0.65, p.size, Math.PI / 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();

        p.y += p.speedY;
        p.x += Math.sin(p.y / 35) * p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 25) {
          p.y = -25;
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
  }, [intensity]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
