"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { saveUserActivity } from "@/lib/activityTracker";
import { decodeData } from "@/lib/encoder";

// Template path to readable title map
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

    // Sirf /w/ (receiver) pages ko track karna hai
    if (!pathname || !pathname.includes("/w/")) return;

    // Hash se data nikaalo: #d=...
    const hash = window.location.hash;
    if (!hash.includes("d=")) return;

    try {
      const raw = hash.split("d=")[1]?.split("&")[0];
      if (!raw) return;

      const decoded = decodeData(decodeURIComponent(raw));
      if (!decoded) return;

      // Recipient name detect karo (alag-alag templates ke keys handle karke)
      const recipient =
        decoded.recipientName ||
        decoded.girlfriendName ||
        decoded.brideName ||
        decoded.partnerName ||
        decoded.name ||
        "Special Someone";

      const currentPath = Object.keys(TEMPLATE_NAMES).find((p) => pathname.includes(p)) || pathname;
      const templateTitle = TEMPLATE_NAMES[currentPath] || "Custom Vibe Wish";

      // Automatically save to local activity history!
      saveUserActivity({
        templateId: currentPath,
        templateName: templateTitle,
        recipientName: recipient,
        url: window.location.href,
      });
    } catch (err) {
      // Quiet fail if corrupted
    }
  }, [pathname]);

  return null;
}
