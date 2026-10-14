"use client";

import { useEffect, useRef } from "react";

export default function NotificationGardenCanvas({
  mood = "burgundy",
}: {
  mood?: "burgundy" | "sunset" | "softPink" | "garden";
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

    // Rose petals & aesthetic particles
    const petalCount = 30;
    const petals = Array.from({ length: petalCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height - height,
      size: Math.random() * 12 + 8,
      speedY: Math.random() * 1.2 + 0.6,
      speedX: Math.random() * 1.4 - 0.7,
      rotation: Math.random() * 360,
      rotSpeed: Math.random() * 1.4 - 0.7,
      color:
        mood === "softPink"
          ? ["#fda4af", "#f43f5e", "#fb7185", "#ffe4e6"][Math.floor(Math.random() * 4)]
          : ["#be123c", "#881337", "#9f1239", "#e11d48"][Math.floor(Math.random() * 4)],
    }));

    // Soft floating golden bokeh & film grain
    const dustCount = 25;
    const dustParticles = Array.from({ length: dustCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      alpha: Math.random() * 0.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Bokeh / ambient light dust
      dustParticles.forEach((d) => {
        d.x += d.vx;
        d.y += d.vy;
        if (d.x < 0) d.x = width;
        if (d.x > width) d.x = 0;
        if (d.y < 0) d.y = height;
        if (d.y > height) d.y = 0;

        ctx.save();
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(253, 224, 71, ${d.alpha * 0.4})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = "#facc15";
        ctx.fill();
        ctx.restore();
      });

      // Falling Petals
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
  }, [mood]);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}
