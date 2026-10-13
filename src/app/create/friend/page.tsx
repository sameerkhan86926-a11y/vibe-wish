"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { ArrowLeft, Flame, Copy, Check, ShieldAlert } from "lucide-react";

export default function FriendCreatorPage() {
  const [to, setTo] = useState("Bunty (Kutta)");
  const [from, setFrom] = useState("Sameer");
  const [charges, setCharges] = useState("Birthday aane pe gayab hona, 3 din baad WhatsApp reply karna, aur endless bakchodi.");
  const [crimeTag, setCrimeTag] = useState("Serial Ghoster & Treat Dodger");
  const [bailAmount, setBailAmount] = useState("REJECTED (Non-Bailable ❌)");
  const [roastMessage, setRoastMessage] = useState(
    "Tera kuch nahi ho sakta par dosti me tujhe jhelna meri majboori hai. Happy Birthday mere bhai, chal ab chupchap party de!"
  );
  const [photoUrl, setPhotoUrl] = useState("");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      vibe: "friend_roast",
      to: to.trim() || "Bestie",
      from: from.trim() || "The Sufferer",
      charges: charges.trim(),
      crimeTag: crimeTag.trim(),
      bailAmount: bailAmount.trim(),
      roastMessage: roastMessage.trim(),
      photoUrl: photoUrl.trim() || undefined,
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/friend/#d=${encoded}`);
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

        <div className="rounded-3xl border border-emerald-500/30 bg-emerald-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400">
              <ShieldAlert className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                CRIMINAL ROAST BUREAU
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">FIR Arrest Warrant</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Dost ko arrest warrant bhejo jisme mugshot, non-bailable tag aur certified insult cards honge.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-emerald-400">Culprit / Dost Ka Naam</label>
              <input
                type="text"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-400">Complainant (Your Name)</label>
              <input
                type="text"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-emerald-400">Major Crimes / Ilzaam</label>
            <input
              type="text"
              required
              value={charges}
              onChange={(e) => setCharges(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-emerald-400">Wanted Tag</label>
              <input
                type="text"
                value={crimeTag}
                onChange={(e) => setCrimeTag(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-400">Bail Status</label>
              <input
                type="text"
                value={bailAmount}
                onChange={(e) => setBailAmount(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-emerald-400">Final Verdict / Birthday Wish</label>
            <textarea
              rows={3}
              required
              value={roastMessage}
              onChange={(e) => setRoastMessage(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-emerald-400">Culprit Mugshot Photo URL</label>
            <input
              type="url"
              placeholder="https://..."
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-emerald-500 py-3 text-sm font-black text-black hover:bg-emerald-400 active:scale-95 transition-transform"
          >
            Issue Roast Warrant 📜
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-emerald-500/40 bg-emerald-950/30 p-5">
            <span className="text-xs font-bold font-mono text-emerald-400">WARRANT READY FOR DELIVERY:</span>
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
                className="cursor-pointer rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-black hover:bg-emerald-400"
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
