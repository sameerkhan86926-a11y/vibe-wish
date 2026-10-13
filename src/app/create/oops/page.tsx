"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { OopsBirthdayPayload } from "@/lib/oopsTypes";
import { ArrowLeft, Sparkles, Copy, Check, Smile } from "lucide-react";

export default function OopsCreatorPage() {
  const [name, setName] = useState("Chirkut");
  const [senderName, setSenderName] = useState("Sameer");
  const [relationship, setRelationship] = useState<"bestie" | "partner" | "sibling" | "special">("bestie");
  const [customLetter, setCustomLetter] = useState("");
  const [customFinalMessage, setCustomFinalMessage] = useState("");

  const [photo1, setPhoto1] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500");
  const [caption1, setCaption1] = useState("Exhibit A: Innocent face, dangerous mind! 😂");

  const [photo2, setPhoto2] = useState("https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500");
  const [caption2, setCaption2] = useState("Proof that we survived another year of drama! 🥹");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: OopsBirthdayPayload = {
      name: name.trim(),
      senderName: senderName.trim(),
      relationship,
      customLetter: customLetter.trim() || undefined,
      customFinalMessage: customFinalMessage.trim() || undefined,
      memories: [
        { id: "1", imgUrl: photo1.trim(), caption: caption1.trim(), sticker: "🚨 Exhibit A" },
        { id: "2", imgUrl: photo2.trim(), caption: caption2.trim(), sticker: "❤️ Real Ones" }
      ]
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/oops/#d=${encoded}`);
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

        <div className="rounded-3xl border border-pink-500/30 bg-pink-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/20 text-pink-400 text-2xl">
              🎂
            </div>
            <div>
              <span className="rounded bg-pink-500/20 px-2 py-0.5 text-[10px] font-bold text-pink-300 uppercase">
                50% Comedy • 25% Cuteness • 25% Magic
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">OOPS! It's Your Birthday 😂💖</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Dodge button, ego test quiz, candle blowing, roast dispenser, secret letter aur unexpected finale!
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-pink-300">Birthday Person (Nickname / Name)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-pink-300">Your Name</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-pink-300">Custom Secret Letter (Optional - default is preloaded)</label>
            <textarea
              rows={4}
              placeholder="Leave empty to use the funny pre-written emotional letter..."
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-pink-300">Memory Photo 1 URL</label>
              <input
                type="url"
                value={photo1}
                onChange={(e) => setPhoto1(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-pink-300">Memory 1 Caption</label>
              <input
                type="text"
                value={caption1}
                onChange={(e) => setCaption1(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-pink-300">Memory Photo 2 URL</label>
              <input
                type="url"
                value={photo2}
                onChange={(e) => setPhoto2(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-pink-300">Memory 2 Caption</label>
              <input
                type="text"
                value={caption2}
                onChange={(e) => setCaption2(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-pink-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 py-3.5 text-sm font-black text-white shadow-xl shadow-pink-500/25 active:scale-95 transition-transform"
          >
            Generate Oops Birthday Adventure Link 🎂💖
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-pink-500/40 bg-pink-950/30 p-5">
            <span className="text-xs font-bold font-mono text-pink-300">SHARE LINK READY FOR THE BIRTHDAY PERSON:</span>
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
                className="cursor-pointer rounded-xl bg-pink-500 px-4 py-2 text-xs font-bold text-white hover:bg-pink-400"
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
