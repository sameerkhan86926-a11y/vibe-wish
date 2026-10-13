"use client";

import { useState } from "react";
import { VibeType, WishPayload } from "@/lib/types";
import { encodeData } from "@/lib/encoder";
import TemplateView from "@/components/TemplateView";
import { ShieldAlert, Music, Award, Film, Copy, Check, Eye } from "lucide-react";

const TEMPLATES: { id: VibeType; title: string; subtitle: string; icon: any; border: string }[] = [
  { id: "police_fir", title: "Police FIR Arrest Warrant", subtitle: "Bestie/Roast (Mugshot, charges, bail denied)", icon: ShieldAlert, border: "border-amber-500" },
  { id: "spotify_lofi", title: "Spotify 'Now Playing'", subtitle: "GF/Partner (Lyrics scroll, audio wave, player)", icon: Music, border: "border-emerald-500" },
  { id: "forbes_boss", title: "Forbes Magazine Cover", subtitle: "Dad/Mentor (Person of Millennium, net worth)", icon: Award, border: "border-amber-400" },
  { id: "netflix_premiere", title: "Netflix Original Movie", subtitle: "Anniversary (Season premiere, 99% match)", icon: Film, border: "border-red-600" },
];

export default function CreatorHub() {
  const [vibe, setVibe] = useState<VibeType>("police_fir");
  const [to, setTo] = useState("Bunty (Kutta)");
  const [from, setFrom] = useState("Sameer");
  const [headline, setHeadline] = useState("ARREST WARRANT: SERIAL GHOSTING");
  const [message, setMessage] = useState("Birthday aane pe sabse pehle bill bhagane ka ilzaam hai. Zindagi bhar dosti ki saza sunayi jati hai.");
  const [crimeOrTag, setCrimeOrTag] = useState("Late replies & endless bakchodi");
  const [ratingOrStat, setRatingOrStat] = useState("Bail: ₹0 (Not Eligible)");
  const [photoUrl, setPhotoUrl] = useState("");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  // Template switch presets
  const handleTemplateSwitch = (newVibe: VibeType) => {
    setVibe(newVibe);
    if (newVibe === "police_fir") {
      setHeadline("ARREST WARRANT: UNLIMITED BAKCHODI");
      setMessage("Birthday aane pe treat na dene aur WhatsApp pe 3 din baad reply karne ka jurm prove ho chuka hai.");
      setCrimeOrTag("Ghosting bestie & bad jokes");
      setRatingOrStat("Bail: REJECTED ❌");
    } else if (newVibe === "spotify_lofi") {
      setHeadline("My Absolute Favorite Person ❤️");
      setMessage("Tumhare aane se meri life ka background music change ho gaya. Happy Birthday my calm in all chaos.");
      setCrimeOrTag("Track: Pure Peace (Lofi Mix)");
      setRatingOrStat("Repeat Mode: ON 🔁");
    } else if (newVibe === "forbes_boss") {
      setHeadline("MAN OF THE DECADE: HERO WITHOUT A CAPE");
      setMessage("Unhone bina complaint kiye humare sapne pure kiye. Dunya ke sabse bade leader ko salam.");
      setCrimeOrTag("Rank: #1 Father in Universe");
      setRatingOrStat("Net Worth: Invaluable ❤️");
    } else {
      setHeadline("The Love Saga: Season 2 Released");
      setMessage("Ek aur saal sath bitaya bina kisi murder ke! Cheers to our endless drama and true love.");
      setCrimeOrTag("Episode: Another Year Together");
      setRatingOrStat("99.9% Match for Life");
    }
  };

  const payload: WishPayload = {
    vibe,
    to: to || "Friend",
    from: from || "Me",
    headline,
    message,
    crimeOrTag,
    ratingOrStat,
    photoUrl,
  };

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    const encoded = encodeData(payload);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const repoBase = "/vibe-wish";
    const link = `${origin}${repoBase}/w/#d=${encoded}`;
    setGeneratedLink(link);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-100 p-4 lg:p-10">
      <div className="mx-auto max-w-7xl">
        <header className="mb-8 text-center sm:text-left">
          <span className="rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-semibold text-rose-400">
            ⚡ Ultra-Unique Dynamic Templates
          </span>
          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">
            Choose a Vibe & Drop It.
          </h1>
          <p className="text-sm text-zinc-400">No boring generic cards. Real unhinged & aesthetic templates.</p>
        </header>

        {/* Template Selector Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {TEMPLATES.map((t) => {
            const Icon = t.icon;
            const active = vibe === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => handleTemplateSwitch(t.id)}
                className={`flex items-start gap-3 p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                  active ? `bg-zinc-900 ${t.border} ring-2 ring-white/10 shadow-lg` : "border-zinc-800 bg-zinc-950/40 text-zinc-400 hover:border-zinc-700"
                }`}
              >
                <Icon className={`h-6 w-6 mt-0.5 shrink-0 ${active ? "text-white" : "text-zinc-500"}`} />
                <div>
                  <h4 className="text-sm font-bold text-white">{t.title}</h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{t.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Split Screen Grid: Form (Left) & Live Preview (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT: FORM INPUTS */}
          <div className="lg:col-span-6 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-xl">
            <h3 className="text-base font-bold text-white mb-4">Edit Template Details</h3>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold">To (Receiver Name)</label>
                  <input
                    type="text"
                    required
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold">From (Your Name)</label>
                  <input
                    type="text"
                    required
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold">Headline / Charge</label>
                <input
                  type="text"
                  required
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold">Message / Confession</label>
                <textarea
                  rows={3}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-zinc-400 font-semibold">Subtitle / Crime / Tag</label>
                  <input
                    type="text"
                    value={crimeOrTag}
                    onChange={(e) => setCrimeOrTag(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-zinc-400 font-semibold">Stat / Bail / Rating</label>
                  <input
                    type="text"
                    value={ratingOrStat}
                    onChange={(e) => setRatingOrStat(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-sm text-white focus:border-rose-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs text-zinc-400 font-semibold">Photo Direct Link (Imgur / Unsplash / Drive)</label>
                <input
                  type="url"
                  placeholder="Paste direct image link..."
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-sm text-white placeholder-zinc-700 focus:border-rose-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 py-3 text-sm font-bold text-white shadow-xl shadow-purple-600/20 active:scale-95 transition-transform"
              >
                Generate Receiver Share Link ✨
              </button>
            </form>

            {/* Generated Link */}
            {generatedLink && (
              <div className="mt-5 rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-4">
                <span className="text-xs font-bold text-emerald-400">RECEIVER KA LINK READY HAI:</span>
                <div className="mt-2 flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="w-full rounded-lg border border-zinc-800 bg-black/80 px-3 py-1.5 text-xs text-zinc-300 select-all"
                  />
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="cursor-pointer rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold text-black hover:bg-emerald-400"
                  >
                    {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT: LIVE SENDER PREVIEW */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold text-zinc-400 uppercase tracking-widest">
              <Eye className="h-4 w-4 text-rose-400" />
              Live Phone Preview (Receiver ko ye dikhega)
            </div>

            {/* Phone Bezel */}
            <div className="w-full max-w-[360px] rounded-[40px] border-4 border-zinc-800 bg-black p-3 shadow-2xl ring-1 ring-white/10">
              <div className="mx-auto mb-3 h-4 w-28 rounded-full bg-zinc-900" />
              <div className="flex justify-center">
                <TemplateView data={payload} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
