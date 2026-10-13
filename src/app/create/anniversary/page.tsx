"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { ArrowLeft, Sparkles, Copy, Check, Film } from "lucide-react";

export default function AnniversaryCreatorPage() {
  const [to, setTo] = useState("My Soulmate");
  const [from, setFrom] = useState("Sameer");
  const [title, setTitle] = useState("The Forever Story: Season 3");
  const [matchScore, setMatchScore] = useState("99.9% Match for Life");
  const [daysCount, setDaysCount] = useState("1,095 Days Together");
  const [synopsis, setSynopsis] = useState(
    "Ek aur saal bina ek doosre ka murder kiye pura ho gaya! Endless late night talks, infinite coffee dates, aur dher saara pyaar. Happy Anniversary my favorite co-star ❤️"
  );
  const [photoUrl, setPhotoUrl] = useState("");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      vibe: "anniversary_premiere",
      to: to.trim() || "Love",
      from: from.trim() || "Partner",
      title: title.trim(),
      matchScore: matchScore.trim(),
      daysCount: daysCount.trim(),
      synopsis: synopsis.trim(),
      photoUrl: photoUrl.trim() || undefined,
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/anniversary/#d=${encoded}`);
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

        <div className="rounded-3xl border border-red-600/30 bg-red-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-600/20 text-red-500">
              <Film className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded bg-red-600/20 px-2 py-0.5 text-[10px] font-bold text-red-400">
                CINEMA PREMIERE
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">Vibeflix Original Series</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Anniversary par relationship ko ek Netflix show premiere style mein present karo.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-red-400">Partner's Name</label>
              <input
                type="text"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-red-400">Your Name</label>
              <input
                type="text"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-red-400">Movie / Series Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-red-400">Match Percentage</label>
              <input
                type="text"
                value={matchScore}
                onChange={(e) => setMatchScore(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-red-400">Days / Years Milestone</label>
              <input
                type="text"
                value={daysCount}
                onChange={(e) => setDaysCount(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-red-400">Episode Synopsis / Anniversary Note</label>
            <textarea
              rows={4}
              required
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-red-400">Couple Poster Photo URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-red-600 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-red-600 py-3 text-sm font-black text-white hover:bg-red-500 active:scale-95 transition-transform"
          >
            Premiere Vibeflix Show 🎬
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-red-600/40 bg-red-950/30 p-5">
            <span className="text-xs font-bold text-red-400">PREMIERE TICKET READY:</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full rounded-xl border border-zinc-800 bg-black/80 px-3.5 py-2 text-xs text-zinc-300 select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer rounded-xl bg-red-600 px-4 py-2 text-xs font-bold text-white hover:bg-red-500"
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
