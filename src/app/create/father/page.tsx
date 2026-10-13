"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { ArrowLeft, Award, Copy, Check } from "lucide-react";

export default function FatherCreatorPage() {
  const [to, setTo] = useState("Papa");
  const [from, setFrom] = useState("Sameer");
  const [headline, setHeadline] = useState("THE REAL SUPERHERO WITHOUT A CAPE");
  const [rank, setRank] = useState("#1 Leader in the Universe");
  const [netWorth, setNetWorth] = useState("Invaluable Blessings");
  const [message, setMessage] = useState(
    "Aapne bina kisi shor ke humare saare sapne pure kiye. Aapki mehnat aur hausla hi meri sabse badi taaqat hai. Happy Birthday to the pillar of our family!"
  );
  const [photoUrl, setPhotoUrl] = useState("");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      vibe: "father_tribute",
      to: to.trim() || "Dad",
      from: from.trim() || "Grateful Child",
      headline: headline.trim(),
      rank: rank.trim(),
      netWorth: netWorth.trim(),
      message: message.trim(),
      photoUrl: photoUrl.trim() || undefined,
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/father/#d=${encoded}`);
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

        <div className="rounded-3xl border border-amber-500/30 bg-amber-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
              <Award className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded bg-amber-500/20 px-2 py-0.5 text-[10px] font-serif font-bold text-amber-300">
                LIFETIME RESPECT
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">Forbes Magazine Tribute</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Papa ya Mentor ke liye ek timeless Forbes-edition cover jisme emotional gratitude ho.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-amber-400">Honoring (His Name/Papa)</label>
              <input
                type="text"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-amber-400">From (Your Name)</label>
              <input
                type="text"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-400">Cover Headline</label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-amber-400">Rank / Title</label>
              <input
                type="text"
                value={rank}
                onChange={(e) => setRank(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-amber-400">Net Worth Tag</label>
              <input
                type="text"
                value={netWorth}
                onChange={(e) => setNetWorth(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-400">Heartfelt Editorial Note</label>
            <textarea
              rows={4}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-400">His Portrait Photo URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-amber-500 py-3 text-sm font-black text-black hover:bg-amber-400 active:scale-95 transition-transform"
          >
            Create Forbes Magazine Tribute 🎖️
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-amber-500/40 bg-amber-950/30 p-5">
            <span className="text-xs font-bold font-serif text-amber-400">MAGAZINE COVER READY:</span>
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
                className="cursor-pointer rounded-xl bg-amber-500 px-4 py-2 text-xs font-bold text-black hover:bg-amber-400"
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
