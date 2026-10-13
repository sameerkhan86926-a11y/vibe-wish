"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { ArrowLeft, Flower2, Heart, Copy, Check, Sparkles } from "lucide-react";

export default function GfCreatorPage() {
  const [to, setTo] = useState("Priya ❤️");
  const [from, setFrom] = useState("Sameer");
  const [question, setQuestion] = useState("Duniya mein sabse zyada cute aur nakhrebaaz kaun hai?");
  const [correctBtnText, setCorrectBtnText] = useState("Main hi hoon obviously 💅");
  const [trickyBtnText, setTrickyBtnText] = useState("Tum bilkul nahi 😜");
  const [secretLetter, setSecretLetter] = useState(
    "Tumhare aane se zindagi me har din phoolon jaisa khil gaya hai. Thank you for tolerating my drama and being my forever peace. Happy Special Day my favorite human! 🌹"
  );
  const [photoUrl, setPhotoUrl] = useState("");
  const [bgSong, setBgSong] = useState("Kesariya (Lofi Acoustic)");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      vibe: "gf_romance",
      to: to.trim() || "Meri Jaan",
      from: from.trim() || "Someone Who Loves You",
      question: question.trim(),
      correctBtnText: correctBtnText.trim(),
      trickyBtnText: trickyBtnText.trim(),
      secretLetter: secretLetter.trim(),
      photoUrl: photoUrl.trim() || undefined,
      bgSong: bgSong.trim() || "Soft Romantic Piano",
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const repoBase = "/vibe-wish"; // GitHub Pages repo base
    const link = `${origin}${repoBase}/w/gf/#d=${encoded}`;
    setGeneratedLink(link);
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
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to All Templates</span>
        </Link>

        {/* Header */}
        <div className="rounded-3xl border border-rose-500/20 bg-rose-950/20 p-6 backdrop-blur-md mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400">
              <Flower2 className="h-6 w-6 animate-pulse" />
            </div>
            <div>
              <span className="rounded-full bg-rose-500/20 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-rose-300">
                Romance Edition
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">
                Blooming Roses & Love Letter
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs leading-relaxed text-rose-200/70">
            Receiver ko girte phool (falling rose petals), ek naughty bhagne wala button quiz, aur ek blooming rose reveal ke sath personal photo aur letter milega.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl backdrop-blur-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Her Name / Nickname</label>
              <input
                type="text"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Priya, Chashmish"
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black/70 px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Your Name</label>
              <input
                type="text"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Sameer"
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black/70 px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Funny Interactive Trap */}
          <div className="rounded-2xl border border-rose-500/20 bg-rose-950/10 p-4 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
              <Sparkles className="h-4 w-4" />
              <span>Interactive Security Question (Trap for Her)</span>
            </div>
            <div>
              <label className="text-[11px] text-zinc-400">The Question she has to answer first</label>
              <input
                type="text"
                required
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-white focus:border-rose-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] text-emerald-400 font-medium">Right Answer (Proceeds forward)</label>
                <input
                  type="text"
                  required
                  value={correctBtnText}
                  onChange={(e) => setCorrectBtnText(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-red-400 font-medium">Tricky Button (Ye screen pe bhagega!)</label>
                <input
                  type="text"
                  required
                  value={trickyBtnText}
                  onChange={(e) => setTrickyBtnText(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-800 bg-black/70 px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Heartfelt Note */}
          <div>
            <label className="text-xs font-semibold text-rose-300">Secret Love Letter / Emotional Note</label>
            <textarea
              rows={4}
              required
              value={secretLetter}
              onChange={(e) => setSecretLetter(e.target.value)}
              placeholder="Dil ki baat likho..."
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black/70 px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 focus:border-rose-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Her Photo Link (Optional)</label>
              <input
                type="url"
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black/70 px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Background Vibe Track Title</label>
              <input
                type="text"
                value={bgSong}
                onChange={(e) => setBgSong(e.target.value)}
                placeholder="Song Name"
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black/70 px-3.5 py-2.5 text-sm text-white placeholder-zinc-700 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-rose-700 py-3.5 text-sm font-bold text-white shadow-xl shadow-rose-600/30 transition-transform active:scale-95 hover:opacity-95"
          >
            Generate Secret Surprise Link 🌹
          </button>
        </form>

        {/* Link Result Box */}
        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-rose-950/30 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold tracking-wider uppercase text-rose-300">Surprise Link is Ready!</span>
            <p className="text-[11px] text-zinc-400 mt-0.5">Copy this link and send it to her on WhatsApp or Instagram DM:</p>
            <div className="mt-3 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full rounded-xl border border-zinc-800 bg-black/80 px-3.5 py-2 text-xs text-rose-200 select-all font-mono"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-xl bg-rose-500 px-4 py-2 text-xs font-bold text-white hover:bg-rose-400 shrink-0 transition-colors"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
