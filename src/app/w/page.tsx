"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { WishPayload } from "@/lib/types";
import { shootConfetti } from "@/lib/confetti";
import { Heart, Flame, Sparkles, Award, Volume2, ArrowLeft } from "lucide-react";
import Link from "next/navigation";

export default function ReceiverPage() {
  const [data, setData] = useState<WishPayload | null>(null);
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Read hash params from client
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const rawData = params.get("d");
      if (rawData) {
        const decoded = decodeData(rawData);
        setData(decoded);
      }
      setLoading(false);
    }
  }, []);

  const handleOpen = () => {
    setUnlocked(true);
    if (!data) return;
    if (data.vibe === "partner") shootConfetti("hearts");
    else if (data.vibe === "anniversary") shootConfetti("gold");
    else shootConfetti("party");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-zinc-400">
        <p className="animate-pulse">Loading surprise...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-4 bg-black p-6 text-center text-zinc-300">
        <h2 className="text-xl font-bold">Invalid or Expired Wish Link 💔</h2>
        <p className="text-sm text-zinc-500">Looks like this link is incomplete or broken.</p>
        <a href="../" className="rounded-full bg-zinc-800 px-5 py-2 text-sm text-white hover:bg-zinc-700">
          Create a New Wish
        </a>
      </div>
    );
  }

  // Cover Screen before unlock
  if (!unlocked) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-center">
        <div className="relative mb-6 flex h-24 w-24 items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-2xl shadow-rose-500/10">
          <Sparkles className="h-10 w-10 animate-bounce text-rose-400" />
        </div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">A special delivery for</p>
        <h1 className="mt-1 text-3xl font-black text-white">{data.to}</h1>
        <p className="mt-2 text-sm text-zinc-400">From {data.from}</p>

        <button
          onClick={handleOpen}
          className="mt-8 cursor-pointer rounded-full bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 px-8 py-3.5 text-sm font-semibold tracking-wide text-white shadow-lg shadow-purple-500/25 transition-transform active:scale-95 hover:opacity-95"
        >
          Tap to Open 🎁
        </button>
      </main>
    );
  }

  // Revealed Themes
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-950 text-white">
      {/* 1. Partner Theme */}
      {data.vibe === "partner" && (
        <div className="w-full max-w-sm rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-950/30 to-zinc-950 p-6 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between text-xs text-rose-400">
            <span className="flex items-center gap-1 font-semibold">
              <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" /> FOR MY SPECIAL ONE
            </span>
            {data.counterDays && <span className="rounded-full bg-rose-500/10 px-2 py-0.5 border border-rose-500/20">{data.counterDays}</span>}
          </div>

          {data.photoUrl && (
            <div className="my-5 overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-900 aspect-square shadow-inner">
              <img src={data.photoUrl} alt="Memory" className="h-full w-full object-cover" />
            </div>
          )}

          <h2 className="mt-4 text-2xl font-black tracking-tight text-white">{data.headline}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">{data.message}</p>

          {data.badge && (
            <div className="mt-5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-center text-xs font-medium text-rose-300">
              ✨ {data.badge}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-zinc-800/80 pt-4 text-xs text-zinc-500">
            <span>With all my love</span>
            <span className="font-semibold text-rose-400">— {data.from}</span>
          </div>
        </div>
      )}

      {/* 2. Friend / Roast Theme */}
      {data.vibe === "friend" && (
        <div className="w-full max-w-sm rounded-3xl border border-emerald-500/30 bg-gradient-to-b from-zinc-900 to-black p-6 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-emerald-400">
            <span className="flex items-center gap-1 font-mono uppercase tracking-wider">
              <Flame className="h-4 w-4 text-emerald-400" /> CERTIFIED HOMIE
            </span>
            <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 font-mono text-emerald-300 border border-emerald-500/40">100% NO FILTER</span>
          </div>

          {data.photoUrl && (
            <div className="my-5 overflow-hidden rounded-2xl border-2 border-emerald-500/40 bg-zinc-900 aspect-square">
              <img src={data.photoUrl} alt="Bestie" className="h-full w-full object-cover" />
            </div>
          )}

          <h2 className="mt-4 text-2xl font-black tracking-tight text-emerald-400">{data.headline}</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">{data.message}</p>

          {data.badge && (
            <div className="mt-5 rounded-xl border border-dashed border-emerald-500/50 bg-emerald-950/40 p-3 text-center text-xs font-mono text-emerald-300">
              ⚡ ROAST BADGE: {data.badge}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 text-xs font-mono text-zinc-500">
            <span>Victim: {data.to}</span>
            <span className="text-emerald-400">Sent by: {data.from}</span>
          </div>
        </div>
      )}

      {/* 3. Father / Respect Theme */}
      {data.vibe === "father" && (
        <div className="w-full max-w-sm rounded-3xl border border-amber-600/30 bg-gradient-to-b from-stone-900 to-zinc-950 p-6 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-amber-400">
            <span className="flex items-center gap-1 font-serif tracking-wider">
              <Award className="h-4 w-4 text-amber-400" /> PILLAR OF STRENGTH
            </span>
            <span className="text-stone-400 font-serif italic">Honoring You</span>
          </div>

          {data.photoUrl && (
            <div className="my-5 overflow-hidden rounded-2xl border border-stone-700 bg-stone-900 aspect-square">
              <img src={data.photoUrl} alt="Father" className="h-full w-full object-cover filter contrast-105" />
            </div>
          )}

          <h2 className="mt-4 font-serif text-2xl font-bold tracking-normal text-amber-200">{data.headline}</h2>
          <p className="mt-3 font-sans text-sm leading-relaxed text-stone-300 whitespace-pre-line">{data.message}</p>

          {data.badge && (
            <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-center text-xs text-amber-300">
              🎖️ {data.badge}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-stone-800 pt-4 text-xs text-stone-400">
            <span>Always grateful</span>
            <span className="font-semibold text-amber-300">— {data.from}</span>
          </div>
        </div>
      )}

      {/* 4. Anniversary Theme */}
      {data.vibe === "anniversary" && (
        <div className="w-full max-w-sm rounded-3xl border border-yellow-500/30 bg-gradient-to-b from-zinc-900 to-black p-6 shadow-2xl">
          <div className="flex items-center justify-between text-xs text-yellow-400">
            <span className="flex items-center gap-1 font-medium tracking-widest uppercase">
              <Sparkles className="h-3.5 w-3.5 text-yellow-400" /> CELEBRATING US
            </span>
            {data.counterDays && <span className="font-mono text-yellow-300">{data.counterDays}</span>}
          </div>

          {data.photoUrl && (
            <div className="my-5 overflow-hidden rounded-2xl border border-yellow-500/40 bg-zinc-900 aspect-square">
              <img src={data.photoUrl} alt="Anniversary" className="h-full w-full object-cover" />
            </div>
          )}

          <h2 className="mt-4 text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-amber-500">
            {data.headline}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 whitespace-pre-line">{data.message}</p>

          {data.badge && (
            <div className="mt-5 rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-3 text-center text-xs font-semibold text-yellow-300">
              🥂 {data.badge}
            </div>
          )}

          <div className="mt-6 flex items-center justify-between border-t border-zinc-800 pt-4 text-xs text-zinc-500">
            <span>Forever & Always</span>
            <span className="font-semibold text-yellow-400">— {data.from}</span>
          </div>
        </div>
      )}

      {/* Viral Loop Footer */}
      <div className="mt-8 text-center">
        <a
          href="../"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <span>⚡ Made with VibeWish</span>
          <span className="text-zinc-600">•</span>
          <span className="text-rose-400 font-medium">Create your own</span>
        </a>
      </div>
    </main>
  );
}
