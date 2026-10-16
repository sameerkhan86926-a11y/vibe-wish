"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { saveUserActivity, trackVibeEvent } from "@/lib/activityTracker";
import { decodeData } from "@/lib/encoder";

const TEMPLATE_NAMES: Record<string, string> = {
  "/w/aakhri": "Ek Aakhri Message 💌",
  "/w/jaan": "Jaan's Birthday 🎂👑",
  "/w/birthday-exe": "BIRTHDAY.exe 💘💀",
  "/w/nikah": "The Nikah Invitation 🌙",
  "/w/idiots": "Shaadi Mubarak Idiots 💍😂",
  "/w/notification": "Favourite Notification 🔔",
  "/w/roast": "Funny Roast Card 💀",
  "/w/gf": "Romantic Love Letter 💖",
};

export default function AutoActivityTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!pathname || !pathname.includes("/w/")) return;

    const hash = window.location.hash;
    if (!hash.includes("d=")) return;

    try {
      const raw = hash.split("d=")[1]?.split("&")[0];
      if (!raw) return;

      const decoded = decodeData(decodeURIComponent(raw));
      if (!decoded) return;

      const recipient =
        decoded.recipientName ||
        decoded.girlfriendName ||
        decoded.brideName ||
        decoded.partnerName ||
        decoded.name ||
        "Special Someone";

      const currentPath = Object.keys(TEMPLATE_NAMES).find((p) => pathname.includes(p)) || pathname;
      const templateTitle = TEMPLATE_NAMES[currentPath] || "Custom Vibe Wish";

      // Unique telemetry id based on compressed data string
      const telemetryId = raw.substring(0, 20);

      // 1. Save link in user's panel
      saveUserActivity({
        id: telemetryId,
        templateId: currentPath,
        templateName: templateTitle,
        recipientName: recipient,
        url: window.location.href,
      });

      // 2. Track Click (View Count)
      trackVibeEvent(telemetryId, "view");

      // 3. Track What They Did (Buttons click listener)
      const clickListener = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const btn = target.closest("button");
        if (btn) {
          const btnText = btn.innerText.trim().slice(0, 28);
          if (btnText) {
            trackVibeEvent(telemetryId, "action", `Clicked: ${btnText}`);
          }
        }
      };

      window.addEventListener("click", clickListener);
      return () => window.removeEventListener("click", clickListener);
    } catch {}
  }, [pathname]);

  return null;
}
