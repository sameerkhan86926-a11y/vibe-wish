"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { UsExePayload } from "@/lib/usExeTypes";
import { ArrowLeft, Heart, Sparkles, Copy, Check } from "lucide-react";

export default function UsExeCreator() {
  const [name1, setName1] = useState("Aarav");
  const [name2, setName2] = useState("Ananya");
  const [anniversaryDate, setAnniversaryDate] = useState("14 Feb 2023");
  const [secretLetter, setSecretLetter] = useState(
    "Maybe I don't always find the perfect words.\n\nMaybe sometimes I tease you when I should simply be giving you a tight hug.\n\nMaybe we have silly arguments that won't matter tomorrow.\n\nBut somewhere between our late night talks and stupid jokes, you became my absolute home. ❤️"
  );

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UsExePayload = {
      name1: name1.trim(),
      name2: name2.trim(),
      anniversaryDate: anniversaryDate.trim(),
      secretLetter: secretLetter.trim(),
      chapters: [
        { id: "1", tag: "CHAPTER 01", title: "The Beginning ✨", subtitle: "Two strangers. One unexpected collision.", note: "Neither of us knew that a casual conversation would turn into a lifetime habit." },
        { id: "2", tag: "CHAPTER 02", title: "The Talking Stage 👀", subtitle: "Both pretending not to be attached. Failing! 😂", note: "Late night texts disguised as 'I'm not sleepy anyway'." },
        { id: "3", tag: "CHAPTER 03", title: "First Special Date 🥹", subtitle: "A memory that deserves its own galaxy.", note: "The butterflies were real, and so was the nervousness!" },
        { id: "4", tag: "CHAPTER 04", title: "Our Silly Fights 🤣", subtitle: "'Nothing is wrong' (everything is wrong).", note: "Fighting for 10 minutes, then laughing because we forgot why." },
        { id: "5", tag: "CHAPTER 05", title: "Our Favourite Memories 📸", subtitle: "Moments that froze time.", note: "Chasing sunsets, sharing songs, and surviving each other's mood swings." },
        { id: "6", tag: "CHAPTER 06", title: "Our Future 💍", subtitle: "Infinite laughter, more adventures, forever Us.", note: "To choosing each other on the best days and on the tough ones." }
      ]
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/us/#d=${encoded}`);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="rounded-3xl border border-rose-500/30 bg-rose-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 text-2xl">
              🪐
            </div>
            <div>
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 uppercase">
                COUPLE UNIVERSE OS
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">US.exe ❤️ — Our Little Universe</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Playable couple story, relationship diagnostics, chat simulator, jealousy test, missing meter, love vault & virtual hug finale.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Your Name (Partner 1)</label>
              <input
                type="text"
                required
                value={name1}
                onChange={(e) => setName1(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Their Name (Partner 2)</label>
              <input
                type="text"
                required
                value={name2}
                onChange={(e) => setName2(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Anniversary / Beginning Date</label>
            <input
              type="text"
              value={anniversaryDate}
              onChange={(e) => setAnniversaryDate(e.target.value)}
              placeholder="e.g. 14 Feb 2023"
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Secret Love Vault Letter</label>
            <textarea
              rows={4}
              required
              value={secretLetter}
              onChange={(e) => setSecretLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 py-3.5 text-sm font-black text-white shadow-xl shadow-rose-600/30 active:scale-95 transition-transform"
          >
            Launch US.exe Universe Link 🚀❤️
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-rose-950/30 p-5">
            <span className="text-xs font-bold font-mono text-rose-300">UNIVERSE FREQUENCY GENERATED:</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full rounded-xl border border-zinc-800 bg-black/80 px-3.5 py-2 text-xs text-zinc-300 font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer rounded-xl bg-rose-500 px-4 py-2 text-xs font-bold text-white hover:bg-rose-400"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
