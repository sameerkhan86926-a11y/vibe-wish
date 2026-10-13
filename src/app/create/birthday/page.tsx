"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { BirthdayPayload } from "@/lib/birthdayTypes";
import { ArrowLeft, Sparkles, Copy, Check, Gift } from "lucide-react";

export default function BirthdayverseCreator() {
  const [name, setName] = useState("Aarav");
  const [senderName, setSenderName] = useState("Riya");
  const [heroMessage, setHeroMessage] = useState("May your new chapter be full of adventures, late night laughing fits, and unstoppable success!");
  const [envelopeLetter, setEnvelopeLetter] = useState("Thank you for being someone I can always count on. Never change your pure soul!");
  const [surpriseSecretNote, setSurpriseSecretNote] = useState("Your real gift is a booked dinner table tonight at 9 PM. Dress well!");
  
  const [photo1, setPhoto1] = useState("https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600");
  const [caption1, setCaption1] = useState("Electric Memories");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: BirthdayPayload = {
      name: name.trim(),
      senderName: senderName.trim(),
      theme: "luxury",
      heroHeadline: `Happy Birthday, ${name}!`,
      heroMessage: heroMessage.trim(),
      envelopeLetter: envelopeLetter.trim(),
      surpriseType: "gift",
      surpriseSecretNote: surpriseSecretNote.trim(),
      memories: [
        { id: "1", imgUrl: photo1.trim(), caption: caption1.trim(), yearTag: "Moment #1" }
      ]
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/birthday/#d=${encoded}`);
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

        <div className="rounded-3xl border border-amber-400/30 bg-amber-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-300">
              <Gift className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded bg-amber-400/20 px-2 py-0.5 text-[10px] font-bold text-amber-300 uppercase">
                Birthdayverse Architect
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">Craft an Interactive Universe</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Unwrap 3D animations, blowable candles, sealed handwritten letter, aur interactive guest wish wall.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-amber-300">Birthday Person's Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-amber-300">Your Name / Group Name</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-300">Hero Birthday Message</label>
            <input
              type="text"
              required
              value={heroMessage}
              onChange={(e) => setHeroMessage(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-300">Sealed Letter (Handwritten Note)</label>
            <textarea
              rows={4}
              required
              value={envelopeLetter}
              onChange={(e) => setEnvelopeLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-amber-300">Memory Image URL</label>
              <input
                type="url"
                value={photo1}
                onChange={(e) => setPhoto1(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-amber-300">Memory Caption</label>
              <input
                type="text"
                value={caption1}
                onChange={(e) => setCaption1(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-amber-300">Finale Surprise Token Message</label>
            <input
              type="text"
              required
              value={surpriseSecretNote}
              onChange={(e) => setSurpriseSecretNote(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-amber-400 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-amber-400 via-rose-500 to-purple-600 py-3.5 text-sm font-black text-white hover:opacity-95 active:scale-95 transition-transform"
          >
            Launch Birthdayverse Link 🚀
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-amber-400/40 bg-amber-950/30 p-5">
            <span className="text-xs font-bold font-mono text-amber-300">CELESTIAL LINK READY TO SHARE:</span>
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
                className="cursor-pointer rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-black hover:bg-amber-300"
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
