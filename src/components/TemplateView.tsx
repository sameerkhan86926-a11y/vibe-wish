"use client";

import React from "react";
import { WishPayload } from "@/lib/types";
import { 
  ShieldAlert, Play, Heart, Star, CheckCircle, 
  Tv, Film, AlertTriangle, Fingerprint, Volume2 
} from "lucide-react";

export default function TemplateView({ data }: { data: WishPayload }) {
  const fallbackImg = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60";
  const img = data.photoUrl?.trim() || fallbackImg;

  // 1. POLICE FIR / CYBER MUGSHOT (Bestie Roast)
  if (data.vibe === "police_fir") {
    return (
      <div className="relative w-full max-w-sm rounded-2xl border-4 border-amber-500 bg-zinc-950 p-5 font-mono text-zinc-100 shadow-[0_0_40px_rgba(245,158,11,0.25)]">
        {/* FIR Tape */}
        <div className="flex items-center justify-between border-b-2 border-dashed border-amber-500 pb-3">
          <div className="flex items-center gap-1.5 text-xs font-black tracking-widest text-amber-400">
            <ShieldAlert className="h-5 w-5 animate-pulse text-amber-500" />
            CENTRAL ROAST BUREAU
          </div>
          <span className="rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-black text-white">WARRANT ISSUED</span>
        </div>

        {/* Mugshot Area */}
        <div className="relative mt-4 overflow-hidden rounded-xl border-2 border-zinc-700 bg-zinc-900">
          <img src={img} alt="Suspect" className="h-52 w-full object-cover filter contrast-125 grayscale" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-2 left-2 rounded bg-black/80 px-2 py-0.5 text-[11px] font-bold text-amber-400">
            SUSPECT: {data.to.toUpperCase()}
          </div>
        </div>

        {/* Crime Details */}
        <div className="mt-4 space-y-2 text-xs">
          <div className="rounded-lg bg-red-950/40 p-2.5 border border-red-800/40">
            <p className="font-bold text-red-400">PRIMARY CHARGES:</p>
            <p className="text-zinc-200 mt-0.5">{data.crimeOrTag || "Ghosting bestie & bad jokes"}</p>
          </div>

          <div className="rounded-lg bg-zinc-900 p-2.5 border border-zinc-800">
            <p className="font-bold text-amber-400">EVIDENCE / REMARKS:</p>
            <p className="text-zinc-300 italic whitespace-pre-line mt-0.5">"{data.message}"</p>
          </div>

          <div className="flex items-center justify-between pt-2 text-[11px] text-zinc-400 border-t border-zinc-800">
            <span>BAIL STATUS: <b className="text-red-400">{data.ratingOrStat || "DENIED"}</b></span>
            <span>REPORTED BY: <b className="text-amber-400">{data.from}</b></span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between opacity-50 text-[10px]">
          <span>CASE ID: #CRB-9981</span>
          <Fingerprint className="h-5 w-5 text-amber-500" />
        </div>
      </div>
    );
  }

  // 2. SPOTIFY NOW PLAYING (Partner / GF Vibe)
  if (data.vibe === "spotify_lofi") {
    return (
      <div className="relative w-full max-w-sm rounded-3xl border border-zinc-800 bg-gradient-to-b from-emerald-950/40 via-zinc-950 to-black p-5 text-zinc-100 shadow-[0_0_35px_rgba(16,185,129,0.2)]">
        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="uppercase tracking-widest text-[10px] text-emerald-400 font-bold">PLAYING FROM FAVORITE HUMAN</span>
          <Volume2 className="h-4 w-4 text-emerald-400 animate-pulse" />
        </div>

        {/* Album Artwork */}
        <div className="relative my-4 aspect-square overflow-hidden rounded-2xl border border-zinc-800 shadow-2xl">
          <img src={img} alt="Album" className="h-full w-full object-cover" />
          <div className="absolute top-3 right-3 rounded-full bg-black/60 p-2 backdrop-blur-md">
            <Heart className="h-4 w-4 fill-emerald-500 text-emerald-500" />
          </div>
        </div>

        {/* Track Title */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-black text-white">{data.headline || "My Favorite Melody"}</h3>
            <p className="text-xs text-emerald-400 font-medium">{data.crimeOrTag || "Featuring: " + data.to}</p>
          </div>
          <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300 border border-emerald-500/30">
            {data.ratingOrStat || "100% MATCH"}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div className="h-full w-[72%] rounded-full bg-emerald-500" />
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-zinc-500 font-mono">
            <span>2:14</span>
            <span>FOREVER</span>
          </div>
        </div>

        {/* Lyrics Scroll Box (Message) */}
        <div className="mt-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 p-3 text-xs leading-relaxed text-zinc-300 italic whitespace-pre-line">
          "{data.message}"
        </div>

        <div className="mt-3 text-right text-[11px] text-zinc-500">
          Dedication by <span className="text-white font-bold">{data.from}</span>
        </div>
      </div>
    );
  }

  // 3. FORBES / BREAKING NEWS (Father / Mentor / Boss)
  if (data.vibe === "forbes_boss") {
    return (
      <div className="relative w-full max-w-sm rounded-2xl border-4 border-zinc-300 bg-stone-900 p-5 text-white shadow-2xl">
        {/* Newspaper / Breaking Header */}
        <div className="border-b-4 border-amber-500 pb-2 text-center">
          <h2 className="font-serif text-3xl font-black tracking-widest text-amber-400">FORBES</h2>
          <p className="text-[10px] uppercase tracking-wider text-stone-400">Special Edition • Person of the Millennium</p>
        </div>

        {/* Headline Frame */}
        <div className="relative mt-3 aspect-4/3 overflow-hidden rounded-lg border border-stone-700">
          <img src={img} alt="Leader" className="h-full w-full object-cover filter contrast-110" />
          <div className="absolute bottom-0 inset-x-0 bg-red-600 px-3 py-1 text-xs font-black uppercase tracking-wide text-white flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-white animate-ping" />
            BREAKING: {data.headline || "WORLD'S GREATEST INSPIRATION"}
          </div>
        </div>

        <div className="mt-3">
          <div className="flex justify-between items-center text-xs text-amber-400 font-bold">
            <span>RANK: {data.crimeOrTag || "#1 HERO IN THE WORLD"}</span>
            <span>NET WORTH: {data.ratingOrStat || "PRICELESS"}</span>
          </div>

          <div className="mt-3 rounded-lg bg-stone-800/80 p-3 font-serif text-xs leading-relaxed text-stone-200 border-l-2 border-amber-500 whitespace-pre-line">
            "{data.message}"
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-stone-800 pt-2 text-[11px] text-stone-400">
          <span>SPECIAL TRIBUTE TO: <b className="text-stone-100">{data.to}</b></span>
          <span>FROM: <b className="text-amber-400">{data.from}</b></span>
        </div>
      </div>
    );
  }

  // 4. NETFLIX STREAMING PREMIERE (Anniversary / Couple)
  return (
    <div className="relative w-full max-w-sm rounded-3xl border border-red-900/40 bg-zinc-950 p-5 text-white shadow-[0_0_40px_rgba(220,38,38,0.25)]">
      <div className="flex items-center justify-between">
        <span className="font-black tracking-tighter text-2xl text-red-600">VIBEFLIX</span>
        <span className="rounded bg-red-600 px-2 py-0.5 text-[10px] font-bold">ORIGINAL SERIES</span>
      </div>

      {/* Poster */}
      <div className="relative my-3 aspect-16/10 overflow-hidden rounded-xl border border-zinc-800">
        <img src={img} alt="Premiere" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-xs font-bold text-red-400">
          <Film className="h-4 w-4" /> SEASON: {data.crimeOrTag || "ANNIVERSARY SPECIAL"}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs">
        <span className="font-bold text-emerald-400">{data.ratingOrStat || "99% Match for each other"}</span>
        <span className="rounded border border-zinc-700 px-1 text-[10px] text-zinc-400">4K Ultra HD</span>
        <span className="rounded border border-zinc-700 px-1 text-[10px] text-zinc-400">U/A 16+</span>
      </div>

      <h3 className="mt-2 text-xl font-black text-white">{data.headline || "The Forever Story"}</h3>
      <p className="mt-2 text-xs leading-relaxed text-zinc-300 whitespace-pre-line">{data.message}</p>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-800 pt-3 text-[11px] text-zinc-500">
        <span>Starring: <b className="text-zinc-200">{data.to} & {data.from}</b></span>
        <span className="text-red-500 font-bold">Top 1 in Hearts Today</span>
      </div>
    </div>
  );
}
