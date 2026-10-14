"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Skull, Copy, Check, Bug } from "lucide-react";

export default function SimulationCreatorPage() {
  const [copied, setCopied] = useState(false);
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const shareLink = `${origin}/vibe-wish/w/simulation/`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-8 font-mono">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="rounded-3xl border border-red-600/30 bg-red-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-500 text-2xl">
              💀
            </div>
            <div>
              <span className="rounded bg-red-600/20 px-2 py-0.5 text-[10px] font-bold text-red-400 uppercase tracking-wider">
                Psychological Glitch Comedy
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">THE SIMULATION IS BROKEN 💀</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
            First impression zero error, reality roast judge, runaway cursed red button, fake telemetry panic, useless AI chatbot aur escape protocol boss!
          </p>
        </div>

        <div className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl">
          <p className="text-xs text-zinc-300 leading-relaxed">
            Yeh simulation link publically share karne ke liye direct ready hai. Koi login ya credentials nahi chahiye.
          </p>

          <div className="rounded-2xl border border-red-500/40 bg-black/60 p-5">
            <span className="text-xs font-bold text-red-400 uppercase">DIRECT SIMULATION LINK:</span>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={shareLink}
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-red-300 font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-500 shrink-0 flex items-center gap-1"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          </div>

          <div className="pt-4 flex justify-center">
            <Link
              href="/w/simulation"
              className="inline-flex items-center gap-2 rounded-2xl bg-zinc-800 hover:bg-zinc-700 px-6 py-3 text-xs font-bold text-white transition-all"
            >
              <span>Test The Glitch Experience Now</span>
              <Bug className="h-4 w-4 text-red-400" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
