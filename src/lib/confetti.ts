import confetti from "canvas-confetti";

export const shootConfetti = (type: "hearts" | "party" | "gold") => {
  if (typeof window === "undefined") return;

  if (type === "hearts") {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#f43f5e", "#fb7185", "#fda4af"],
    });
  } else if (type === "gold") {
    confetti({
      particleCount: 50,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#eab308", "#facc15", "#fef08a"],
    });
  } else {
    confetti({
      particleCount: 70,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#06b6d4", "#ec4899", "#22c55e"],
    });
  }
};
