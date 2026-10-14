"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { NotificationAnniversaryPayload } from "@/lib/notificationTypes";
import { ArrowLeft, Bell, Copy, Check, Sparkles } from "lucide-react";

export default function NotificationCreatorPage() {
  const [partnerName, setPartnerName] = useState("Anya");
  const [senderName, setSenderName] = useState("Dev");
  const [specialDate, setSpecialDate] = useState("18 October");

  const [chat1, setChat1] = useState("khana khaya? 🍕");
  const [chat2, setChat2] = useState("tumhara dimaag 🧠💀");

  const [photo1Url, setPhoto1Url] = useState("https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700");
  const [caption1, setCaption1] = useState("the day everything felt different.");

  const [photo2Url, setPhoto2Url] = useState("https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700");
  const [caption2, setCaption2] = useState("proof that we are actually so unserious 💀");

  const [blushingLetter, setBlushingLetter] = useState(
    `lowkey, i don't think you understand how special you are to me.\n\nit's not just the big aesthetic moments.\n\nit's the random 3am reels.\nthe stupid inside jokes nobody else gets.\nthe comfort of knowing you're always one text away.\n\nhappy anniversary, my favourite human. ♡`
  );

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: NotificationAnniversaryPayload = {
      partnerName: partnerName.trim(),
      senderName: senderName.trim(),
      specialDate: specialDate.trim(),
      chatDialogues: [
        { sender: "you", text: chat1.trim(), time: "23:14" },
        { sender: "them", text: "haan", time: "23:14" },
        { sender: "you", text: "kya khaya?", time: "23:15" },
        { sender: "them", text: chat2.trim(), time: "23:15" },
        { sender: "you", text: "happy anniversary to me 💀❤️", time: "23:16" }
      ],
      wrappedStats: [
        { label: "FAVOURITE PERSON", value: `${partnerName} ♡`, sub: "Out of 8 billion NPCs on earth", accent: "from-rose-500 to-pink-600" },
        { label: "COMFORT LEVEL", value: "1000000%", sub: "Zero filter, zero embarrassment", accent: "from-purple-500 to-indigo-600" },
        { label: "MOST USED WORD", value: "OYEEE 🗣️", sub: "Spammed countless times daily", accent: "from-amber-500 to-rose-500" },
        { label: "LIFETIME STATUS", value: "MY FAVOURITE NOTIFICATION", sub: "Forever subscribed without cancellation", accent: "from-rose-600 to-amber-500" }
      ],
      cameraRoll: [
        { id: "1", imgUrl: photo1Url.trim(), caption: caption1.trim(), dateTag: "First Date" },
        { id: "2", imgUrl: photo2Url.trim(), caption: caption2.trim(), dateTag: "Unfiltered" }
      ],
      blushingLetter: blushingLetter.trim(),
      finalVow: `new memories.\nnew inside jokes.\nnew little adventures.\nsame favourite person.\n\nstill choosing you. still grateful for you.\nand yes, you're still my favourite notification. ❤️‍🩹`
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/notification/#d=${encoded}`);
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
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 text-2xl border border-white/5">
              🔔
            </div>
            <div>
              <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider">
                Gen Z Romantic Experience
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl font-serif">
                POV: You're My Favourite Notification ❤️‍🩹
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
            Flower ➡️ Lockscreen Pill ➡️ Flower Tea ➡️ Iconic Chat ➡️ Relationship Wrapped ➡️ Camera Roll ➡️ Love Language ➡️ Blushing Letter ➡️ Grand Bloom!
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Partner's Name</label>
              <input
                type="text"
                required
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Your Name</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Special Date</label>
            <input
              type="text"
              value={specialDate}
              onChange={(e) => setSpecialDate(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          {/* Chat Banter */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider">
              Iconic Chat Banter
            </span>
            <input
              type="text"
              placeholder="Your message (e.g. khana khaya?)"
              value={chat1}
              onChange={(e) => setChat1(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Their witty reply (e.g. tumhara dimaag 💀)"
              value={chat2}
              onChange={(e) => setChat2(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-white"
            />
          </div>

          {/* Camera roll */}
          <div className="space-y-2 border-t border-zinc-800 pt-4">
            <span className="text-xs font-bold font-mono text-rose-400 uppercase tracking-wider">
              Camera Roll Moments
            </span>
            <input
              type="url"
              placeholder="Photo 1 URL"
              value={photo1Url}
              onChange={(e) => setPhoto1Url(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-white"
            />
            <input
              type="text"
              placeholder="Photo 1 Caption"
              value={caption1}
              onChange={(e) => setCaption1(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-white"
            />
          </div>

          {/* Letter */}
          <div className="border-t border-zinc-800 pt-4">
            <label className="text-xs font-semibold text-rose-300">
              The Message I Can't Say Without Blushing (Scene 8)
            </label>
            <textarea
              rows={4}
              required
              value={blushingLetter}
              onChange={(e) => setBlushingLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-white font-serif leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white shadow-xl hover:opacity-95 active:scale-95 transition-transform"
          >
            Launch "Favourite Notification" Link 🔔❤️‍🩹
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-zinc-900/80 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold font-mono text-rose-300 uppercase">
              GEN Z ANNIVERSARY LINK READY:
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
