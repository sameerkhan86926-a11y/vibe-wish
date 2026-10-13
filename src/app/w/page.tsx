"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { WishPayload } from "@/lib/types";
import { shootConfetti } from "@/lib/confetti";
import TemplateView from "@/components/TemplateView";
import { Sparkles } from "lucide-react";

export default function ReceiverPage() {
  const [data, setData] = useState<WishPayload | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        const decoded = decodeData(raw);
        setData(decoded);
      }
      setLoading(false);
    }
  }, []);

  const handleOpen = () => {
    setUnlocked(true);
    if (!data) return;
    if (data.vibe === "police_fir") shootConfetti("party");
    else if (data.vibe === "spotify_lofi") shootConfetti("hearts");
    else if (data.vibe === "forbes_boss") shootConfetti("gold");
    else shootConfetti("party");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-zinc-500 font-mono">
        Decrypting secure delivery...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black p-4 text-center">
        <h2 className="text-xl font-bold text-red-500">Broken or Expired Link ⚠️</h2>
        <a href="../" className="mt-4 rounded-full bg-zinc-800 px-5 py-2 text-xs text-white">Create a New One</a>
      </div>
    );
  }

  if (!unlocked) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
        <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl">
          <Sparkles className="h-8 w-8 text-rose-500 animate-bounce" />
        </div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">Confidential parcel for</p>
        <h1 className="mt-1 text-3xl font-black text-white">{data.to}</h1>
        <p className="mt-2 text-xs text-zinc-400">Dispatched by: <b className="text-white">{data.from}</b></p>

        <button
          onClick={handleOpen}
          className="mt-8 cursor-pointer rounded-full bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600 px-8 py-3.5 text-sm font-bold tracking-wide text-white shadow-2xl active:scale-95 transition-transform"
        >
          Tap to Unlock Surprise 🔓
        </button>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 p-4">
      <TemplateView data={data} />
      <div className="mt-8">
        <a
          href="../"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs text-zinc-400 hover:text-white"
        >
          ⚡ Make one for your bestie / partner 👉
        </a>
      </div>
    </main>
  );
}
