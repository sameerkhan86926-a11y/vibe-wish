"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import FallingPetals from "@/components/FallingPetals";
import RunawayButton from "@/components/RunawayButton";
import { shootConfetti } from "@/lib/confetti";
import { Heart, Sparkles, Flower2, Music2 } from "lucide-react";
import Link from "next/link";

export default function GfReceiverPage() {
  const [data, setData] = useState<any>(null);
  const [stage, setStage] = useState<1 | 2 | 3>(1);
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

  const handleCorrect = () => {
    setStage(2);
  };

  const handleBloom = () => {
    setStage(3);
    shootConfetti("hearts");
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-rose-400 font-mono text-sm">
        <span className="animate-pulse">Loading romantic surprise...</span>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex h-screen flex-col items-center justify-center bg-black p-4 text-center">
        <p className="text-rose-400 font-bold">This love link is broken or incomplete 💔</p>
        <Link href="/" className="mt-4 rounded-full bg-zinc-900 px-4 py-2 text-xs text-white border border-zinc-800">
          Go to VibeWish Home
        </Link>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-rose-950/40 via-zinc-950 to-black p-4 text-white flex flex-col items-center justify-center">
      {/* Falling Rose Petals in Background */}
      <FallingPetals type="rose" />

      {/* Floating Song pill */}
      <div className="fixed top-5 right-5 z-20 flex items-center gap-2 rounded-full border border-rose-500/30 bg-black/60 px-3.5 py-1.5 text-xs text-rose-300 backdrop-blur-md shadow-lg">
        <Music2 className="h-3.5 w-3.5 animate-spin text-rose-400" />
        <span className="font-medium">{data.bgSong || "Soft Melody"}</span>
      </div>

      {/* STAGE 1: Funny Security Question */}
      {stage === 1 && (
        <div className="relative z-10 w-full max-w-sm rounded-3xl border border-rose-500/30 bg-zinc-950/85 p-6 text-center backdrop-blur-2xl shadow-[0_0_60px_rgba(244,63,94,0.3)] animate-in fade-in duration-500">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 shadow-inner">
            <Heart className="h-7 w-7 animate-pulse fill-rose-500" />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400">Special Security Check for</span>
          <h2 className="mt-1 text-2xl font-black text-white">{data.to}</h2>

          <p className="mt-4 text-sm font-semibold text-rose-100/90 leading-snug">
            "{data.question}"
          </p>

          <div className="mt-8 flex flex-col gap-3">
            <button
              onClick={handleCorrect}
              className="cursor-pointer rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-rose-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-rose-500/30 transition-transform active:scale-95 hover:scale-105"
            >
              {data.correctBtnText}
            </button>

            <RunawayButton text={data.trickyBtnText} />
          </div>

          <p className="mt-4 text-[10px] text-zinc-500">Sent with love by {data.from} • Cannot click the other one! 😉</p>
        </div>
      )}

      {/* STAGE 2: 3D Blooming Rose Click */}
      {stage === 2 && (
        <div className="relative z-10 text-center flex flex-col items-center animate-in zoom-in-90 duration-500">
          <button
            onClick={handleBloom}
            className="group relative flex h-36 w-36 cursor-pointer items-center justify-center rounded-full border-2 border-rose-400 bg-rose-950/70 shadow-[0_0_70px_rgba(251,113,133,0.5)] transition-all duration-500 hover:scale-110 active:scale-95"
          >
            <Flower2 className="h-16 w-16 text-rose-400 transition-transform duration-700 group-hover:rotate-45" />
            <span className="absolute -bottom-2 rounded-full bg-rose-500 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow-md">
              Tap to Bloom 🌸
            </span>
          </button>
          <h3 className="mt-6 text-xl font-bold text-rose-100">A special rose just for you, {data.to}</h3>
          <p className="mt-1 text-xs text-rose-300/70">Click the rose to open your secret letter</p>
        </div>
      )}

      {/* STAGE 3: Final Emotional Letter & Photo */}
      {stage === 3 && (
        <div className="relative z-10 w-full max-w-sm rounded-3xl border border-rose-400/30 bg-zinc-950/90 p-6 backdrop-blur-2xl shadow-[0_0_80px_rgba(244,63,94,0.35)] animate-in fade-in zoom-in-95 duration-500">
          <div className="flex items-center justify-between text-xs text-rose-300">
            <span className="flex items-center gap-1 font-semibold tracking-wide">
              <Sparkles className="h-3.5 w-3.5 text-rose-400" /> FOR {data.to.toUpperCase()}
            </span>
            <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-medium text-rose-200 border border-rose-500/30">
              Only for You ✨
            </span>
          </div>

          {data.photoUrl && (
            <div className="my-5 overflow-hidden rounded-2xl border-2 border-rose-500/30 bg-black aspect-square shadow-2xl">
              <img src={data.photoUrl} alt="Memory" className="h-full w-full object-cover" />
            </div>
          )}

          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/30 p-4 mt-3">
            <p className="text-sm leading-relaxed text-rose-100 whitespace-pre-line italic font-serif">
              "{data.secretLetter}"
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-rose-900/40 pt-4 text-xs text-zinc-400">
            <span>With all my love & flowers,</span>
            <span className="font-bold text-rose-400">— {data.from} ❤️</span>
          </div>
        </div>
      )}

      {/* Viral Watermark */}
      <div className="relative z-10 mt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-[11px] text-zinc-400 hover:text-white backdrop-blur-md"
        >
          <span>⚡ Made with VibeWish</span>
          <span className="text-zinc-600">•</span>
          <span className="text-rose-400 font-medium">Create your own</span>
        </Link>
      </div>
    </main>
  );
}
