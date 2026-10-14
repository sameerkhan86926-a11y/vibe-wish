"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { BirthdayExePayload } from "@/lib/birthdayExeTypes";
import { ArrowLeft, Copy, Check, Skull, Sparkles } from "lucide-react";

export default function BirthdayExeCreator() {
  const [girlfriendName, setGirlfriendName] = useState("Pagal Princess");
  const [senderName, setSenderName] = useState("Tumhara Patient Boyfriend");
  const [nakhreLevel, setNakhreLevel] = useState("9999+");
  const [gussaRate, setGussaRate] = useState("97%");
  const [secretLetter, setSecretLetter] = useState(
    `Happy Birthday meri jaan ❤️🎂\n\nPagal to tum ho hi 😂 lekin meri favourite pagal ho tum 🥹💗\n\nMain tumhe har din perfect promises nahi de sakta lekin itna zaroor keh sakta hu ki tumhari smile mere liye sabse zyada matter karti hai.\n\nTumhare sath hasi mazak karna, tumhe tang karna aur choti choti baaton par tumse ladna meri life ke wo moments hain jo mujhe genuinely khush karte hain ❤️\n\nAur haan madam ji birthday ke baad bhi nakhre thode kam kar dena... thode se... zyada nahi 😂💀❤️\n\nHappy Birthday meri jaan, meri favourite person aur meri lifetime wali headache! 💗👑😘`
  );

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: BirthdayExePayload = {
      girlfriendName: girlfriendName.trim(),
      senderName: senderName.trim(),
      nakhreLevel: nakhreLevel.trim(),
      gussaRate: gussaRate.trim(),
      cakeTagline: "AGE BADH RAHI HAI LEKIN NAKHRE ABHI BHI UNLIMITED HAIN 😂💀",
      secretLetter: secretLetter.trim()
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const isGitHubPages = origin.includes("github.io");
    const basePath = isGitHubPages ? "/vibe-wish" : "";
    setGeneratedLink(`${origin}${basePath}/w/birthday-exe/#d=${encoded}`);
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

        <div className="rounded-3xl border border-purple-500/30 bg-purple-950/20 p-6 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-400 text-2xl border border-white/5">
              💀
            </div>
            <div>
              <span className="rounded bg-purple-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-purple-300 uppercase tracking-wider">
                Funny + Romantic Chaos
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl font-serif">
                BIRTHDAY.exe 💘💀
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
            Funny system panic, girlfriend report telemetry, BF quiz, blow candle ceremony, drama meter & secret letter.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Girlfriend's Name / Pet Name</label>
              <input
                type="text"
                required
                value={girlfriendName}
                onChange={(e) => setGirlfriendName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Your Name / Title</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Nakhre Level Tag</label>
              <input
                type="text"
                value={nakhreLevel}
                onChange={(e) => setNakhreLevel(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Gussa Rate</label>
              <input
                type="text"
                value={gussaRate}
                onChange={(e) => setGussaRate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Secret Love Letter (Editable)</label>
            <textarea
              rows={6}
              required
              value={secretLetter}
              onChange={(e) => setSecretLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-zinc-200 leading-relaxed font-serif"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white shadow-xl hover:opacity-95 active:scale-95 transition-transform"
          >
            Launch BIRTHDAY.exe Link 💀💗
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-purple-500/40 bg-zinc-900/80 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold font-mono text-purple-300 uppercase">
              BIRTHDAY.EXE LINK READY:
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
                className="cursor-pointer rounded-xl bg-purple-600 px-4 py-2 text-xs font-bold text-white hover:bg-purple-500"
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
