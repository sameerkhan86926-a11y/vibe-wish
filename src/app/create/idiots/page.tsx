"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { ShaadiIdiotsPayload } from "@/lib/shaadiIdiotsTypes";
import { ArrowLeft, Copy, Check, Heart, Sparkles } from "lucide-react";

export default function ShaadiIdiotsCreator() {
  const [groomName, setGroomName] = useState("Aman");
  const [brideName, setBrideName] = useState("Riya");
  const [senderName, setSenderName] = useState("Your Favourite Troublemakers");

  const [roast1, setRoast1] = useState("Groom bhai, ab gaming se zyada grocery shopping important hogi. 😂");
  const [roast2, setRoast2] = useState("Bride madam, ab inki saari weird harkaton ka lifetime subscription shuru!");
  const [roast3, setRoast3] = useState("Ab '5 minute mein aa raha hoon' bolkar 2 ghante gayab hone ka daily audit hoga. 💀");

  const [photo1, setPhoto1] = useState("https://images.unsplash.com/photo-1519741497674-611481863552?w=700");
  const [caption1, setCaption1] = useState("One brain cell, two proud permanent owners.");

  const [photo2, setPhoto2] = useState("https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700");
  const [caption2, setCaption2] = useState("Together, they share infinite love and absolutely zero common sense.");

  const [letter, setLetter] = useState(
    `Dear Aman & Riya,\n\nJokes aur teasing apni jagah, par aaj se tum dono ki life ka sabse khoobsurat chapter start ho raha hai.\n\nHamesha ek doosre ki respect karna, ek doosre ki baat dhyan se sunna, chhoti-chhoti baaton mein khushi dhoondhna aur mushkil waqt mein sabse mazboot sahara banna.\n\nMay your home always be filled with endless laughter, peace, random chai dates and endless barakah.\n\nHAPPY MARRIED LIFE, YOU TWO BEAUTIFUL IDIOTS! 💍🌹`
  );

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ShaadiIdiotsPayload = {
      groomName: groomName.trim(),
      brideName: brideName.trim(),
      senderName: senderName.trim(),
      roastLines: [roast1.trim(), roast2.trim(), roast3.trim()].filter(Boolean),
      starterPack: [
        { question: "WHO'S ALWAYS RIGHT?", answer: `${brideName}. Agla sawal poochhiye hi mat. 😂👑` },
        { question: "WHO APOLOGIZES FIRST?", answer: "Jo pehle bhookha ho jaaye. 💀🍕" },
        { question: "WHO STEALS THE BLANKET?", answer: "Investigation abhi tak jaari hai... 🥶" },
        { question: "WHO CONTROLS THE REMOTE?", answer: "Jiske paas snacks ki plate hai, wahi asli boss." }
      ],
      photos: [
        { id: "1", url: photo1.trim(), caption: caption1.trim() },
        { id: "2", url: photo2.trim(), caption: caption2.trim() }
      ],
      heartfeltLetter: letter.trim(),
      finalWish: `May you fall in love with each other a thousand times,\nlaugh together through the weirdest kitchen experiments,\nand always find comfort in each other's silence.\n\nSHAADI MUBARAK, ${groomName.toUpperCase()} & ${brideName.toUpperCase()}! 💍✨`
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const isGitHubPages = origin.includes("github.io");
    const basePath = isGitHubPages ? "/vibe-wish" : "";
    setGeneratedLink(`${origin}${basePath}/w/idiots/#d=${encoded}`);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-8 font-sans">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="rounded-3xl border border-rose-500/30 bg-rose-950/20 p-6 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-300 text-2xl border border-white/5">
              💍
            </div>
            <div>
              <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider">
                Wholesome Wedding Teasing
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl font-serif">
                Shaadi Mubarak, You Two Idiots! 😂❤️
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
            Breaking news intro, friendly roasting ceremony, starter pack Q&A, polaroid moments, heartfelt letter & grand finale.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Groom's Name</label>
              <input
                type="text"
                required
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Bride's Name</label>
              <input
                type="text"
                required
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Your Name / Group Name (Sender)</label>
            <input
              type="text"
              required
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          {/* Roasting Lines */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider block">
              Cute Roasting Lines (Scene 2)
            </span>
            <input
              type="text"
              value={roast1}
              onChange={(e) => setRoast1(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
            />
            <input
              type="text"
              value={roast2}
              onChange={(e) => setRoast2(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
            />
            <input
              type="text"
              value={roast3}
              onChange={(e) => setRoast3(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
            />
          </div>

          {/* Photos */}
          <div className="space-y-3 border-t border-zinc-800 pt-4">
            <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider block">
              Couple Photo Memories (Scene 5)
            </span>
            <div className="space-y-2">
              <input
                type="url"
                placeholder="Photo 1 Direct URL"
                value={photo1}
                onChange={(e) => setPhoto1(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
              />
              <input
                type="text"
                placeholder="Photo 1 Funny Caption"
                value={caption1}
                onChange={(e) => setCaption1(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
              />
            </div>
            <div className="space-y-2 pt-2">
              <input
                type="url"
                placeholder="Photo 2 Direct URL"
                value={photo2}
                onChange={(e) => setPhoto2(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
              />
              <input
                type="text"
                placeholder="Photo 2 Funny Caption"
                value={caption2}
                onChange={(e) => setCaption2(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
              />
            </div>
          </div>

          {/* Letter */}
          <div className="border-t border-zinc-800 pt-4">
            <label className="text-xs font-semibold text-rose-300">
              Heartfelt Wedding Letter (Scene 6)
            </label>
            <textarea
              rows={5}
              required
              value={letter}
              onChange={(e) => setLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-zinc-200 leading-relaxed font-serif"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white shadow-xl hover:opacity-95 active:scale-95 transition-transform"
          >
            Generate "Shaadi Mubarak Idiots" Link 💍❤️
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-zinc-900/80 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold font-mono text-rose-300 uppercase">
              COUPLE SURPRISE LINK READY:
            </span>
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
