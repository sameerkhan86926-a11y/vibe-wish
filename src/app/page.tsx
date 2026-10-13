"use client";

import { useState } from "react";
import { VibeType, WishPayload } from "@/lib/types";
import { encodeData } from "@/lib/encoder";
import { Heart, Flame, Award, Sparkles, Copy, Check, ExternalLink } from "lucide-react";

const VIBES: { id: VibeType; label: string; desc: string; icon: any; color: string }[] = [
  { id: "partner", label: "Partner / GF", desc: "Aesthetic lofi glow & deep romance", icon: Heart, color: "text-rose-400 border-rose-500/30" },
  { id: "friend", label: "Bestie / Homie", desc: "Pure roasting, memes & high hype", icon: Flame, color: "text-emerald-400 border-emerald-500/30" },
  { id: "father", label: "Father / Mentor", desc: "Warm, respectful & timeless editorial", icon: Award, color: "text-amber-400 border-amber-500/30" },
  { id: "anniversary", label: "Anniversary", desc: "Obsidian luxury & milestone celebration", icon: Sparkles, color: "text-yellow-400 border-yellow-500/30" },
];

export default function Home() {
  const [vibe, setVibe] = useState<VibeType>("partner");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [headline, setHeadline] = useState("Happy Birthday, You Gorgeous Soul ❤️");
  const [message, setMessage] = useState("Thank you for being my constant peace in this chaotic world. You mean everything to me!");
  const [badge, setBadge] = useState("Certified Drama Queen 👑");
  const [counterDays, setCounterDays] = useState("Day 420 of Tolerating You");
  const [photoUrl, setPhotoUrl] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: WishPayload = {
      vibe,
      to: to.trim() || "Someone Special",
      from: from.trim() || "Anonymous",
      headline: headline.trim(),
      message: message.trim(),
      badge: badge.trim(),
      counterDays: counterDays.trim(),
      photoUrl: photoUrl.trim() || undefined,
    };

    const encoded = encodeData(payload);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const basePath = "/vibe-wish"; // GitHub Pages repo base
    const link = `${origin}${basePath}/w/#d=${encoded}`;
    setGeneratedLink(link);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 p-4 sm:p-8 text-zinc-100 flex flex-col items-center">
      <header className="text-center max-w-lg mb-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-3.5 py-1 text-xs text-zinc-400 mb-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
          Gen Z Dynamic Wish Maker
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Drop a Custom <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400">Vibe.</span>
        </h1>
        <p className="mt-2 text-sm text-zinc-400">Create an interactive animated page link in 60 seconds.</p>
      </header>

      <div className="w-full max-w-xl rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 backdrop-blur-xl shadow-2xl">
        {/* Vibe Selector */}
        <div className="mb-6">
          <label className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-3 block">1. Pick the Vibe</label>
          <div className="grid grid-cols-2 gap-3">
            {VIBES.map((item) => {
              const Icon = item.icon;
              const isSelected = vibe === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setVibe(item.id)}
                  className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected ? `bg-zinc-800/80 ${item.color} shadow-lg ring-1 ring-white/10` : "border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center gap-2 font-bold text-sm text-white">
                    <Icon className="h-4 w-4" /> {item.label}
                  </div>
                  <span className="text-xs text-zinc-500 mt-1">{item.desc}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={handleGenerate} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 font-medium">To (Receiver)</label>
              <input
                type="text"
                required
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder="e.g. Priya / Bunty"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium">From (Your Name)</label>
              <input
                type="text"
                required
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="e.g. Sameer"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium">Catchy Headline</label>
            <input
              type="text"
              required
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium">Personal Note / Message</label>
            <textarea
              rows={3}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-zinc-400 font-medium">Badge / Roast Tag</label>
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="e.g. Toxic Homie / Best Papa"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400 font-medium">Milestone / Counter Tag</label>
              <input
                type="text"
                value={counterDays}
                onChange={(e) => setCounterDays(e.target.value)}
                placeholder="e.g. 500 Days Together"
                className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-400 font-medium">Photo Direct URL (Optional)</label>
            <input
              type="url"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... or imgur direct link"
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3.5 py-2 text-sm text-white placeholder-zinc-600 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer mt-4 rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-lg shadow-purple-500/20 active:scale-95 transition-transform"
          >
            Generate Secret Vibe Link ✨
          </button>
        </form>

        {/* Link Result Box */}
        {generatedLink && (
          <div className="mt-6 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Your link is ready:</span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full rounded-lg border border-zinc-800 bg-black/60 px-3 py-1.5 text-xs text-zinc-300 select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex cursor-pointer items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-emerald-400 transition-colors"
              >
                {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
