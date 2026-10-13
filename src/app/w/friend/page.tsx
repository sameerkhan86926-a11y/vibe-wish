"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { shootConfetti } from "@/lib/confetti";
import { ShieldAlert, AlertTriangle, Fingerprint, Lock, Unlock } from "lucide-react";
import Link from "next/link";

export default function FriendReceiverPage() {
  const [data, setData] = useState<any>(null);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) setData(decodeData(raw));
    }
  }, []);

  const handleOpen = () => {
    setUnlocked(true);
    shootConfetti("party");
  };

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-emerald-400 font-mono">
        Scanning Criminal Records...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black px-4 py-12 text-zinc-100 flex flex-col items-center justify-center font-mono">
      {!unlocked ? (
        <div className="w-full max-w-sm rounded-3xl border-2 border-red-600 bg-zinc-950 p-6 text-center shadow-[0_0_50px_rgba(220,38,38,0.3)]">
          <AlertTriangle className="mx-auto h-12 w-12 text-red-500 animate-bounce" />
          <h1 className="mt-4 text-xl font-black text-red-500 uppercase">LEGAL NOTICE / SUMMONS</h1>
          <p className="mt-2 text-xs text-zinc-400">To the Individual Known As:</p>
          <p className="text-lg font-bold text-white">{data.to}</p>

          <button
            onClick={handleOpen}
            className="cursor-pointer mt-6 flex items-center justify-center gap-2 w-full rounded-2xl bg-red-600 py-3 text-xs font-black tracking-wider uppercase text-white shadow-lg shadow-red-600/40 active:scale-95 transition-transform"
          >
            <Lock className="h-4 w-4" /> Tap to Break Case Seal
          </button>
        </div>
      ) : (
        <div className="w-full max-w-sm rounded-3xl border-4 border-amber-500 bg-zinc-950 p-6 shadow-[0_0_50px_rgba(245,158,11,0.25)]">
          <div className="flex items-center justify-between border-b-2 border-dashed border-amber-500 pb-3">
            <span className="flex items-center gap-1.5 text-xs font-black text-amber-400">
              <ShieldAlert className="h-5 w-5 text-amber-500" /> CENTRAL ROAST BUREAU
            </span>
            <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-black text-white">ARREST WARRANT</span>
          </div>

          <div className="relative mt-4 aspect-square overflow-hidden rounded-2xl border-2 border-zinc-700 bg-zinc-900">
            <img
              src={data.photoUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"}
              alt="Mugshot"
              className="h-full w-full object-cover grayscale contrast-125"
            />
            <div className="absolute bottom-2 left-2 rounded bg-black/80 px-2.5 py-1 text-[11px] font-bold text-amber-400">
              SUSPECT: {data.to.toUpperCase()}
            </div>
          </div>

          <div className="mt-4 space-y-2.5 text-xs">
            <div className="rounded-xl border border-red-900/60 bg-red-950/30 p-3">
              <span className="font-bold text-red-400">CHARGES:</span>
              <p className="text-zinc-200 mt-0.5">{data.charges}</p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/60 p-3">
              <span className="font-bold text-amber-400">COURT VERDICT:</span>
              <p className="text-zinc-300 italic mt-0.5 whitespace-pre-line">"{data.roastMessage}"</p>
            </div>

            <div className="flex justify-between border-t border-zinc-800 pt-2 text-[11px] text-zinc-400">
              <span>BAIL: <b className="text-red-400">{data.bailAmount}</b></span>
              <span>COMPLAINT: <b className="text-amber-400">{data.from}</b></span>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between opacity-40 text-[10px]">
            <span>CASE ID: #ROAST-8821</span>
            <Fingerprint className="h-5 w-5 text-amber-500" />
          </div>
        </div>
      )}

      <Link href="/" className="mt-8 rounded-full border border-zinc-800 px-4 py-1.5 text-xs text-zinc-400 hover:text-white">
        ⚡ Roast your friends too • Make with VibeWish
      </Link>
    </main>
  );
}
