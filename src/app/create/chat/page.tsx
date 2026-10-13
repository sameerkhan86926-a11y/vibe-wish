"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { ChatBirthdayPayload } from "@/lib/chatTypes";
import { ArrowLeft, MessageSquare, Copy, Check } from "lucide-react";

export default function ChatCreatorPage() {
  const [name, setName] = useState("Bunty");
  const [senderName, setSenderName] = useState("Sameer");
  const [relationship, setRelationship] = useState<"bestie" | "partner" | "sibling" | "friend">("bestie");
  const [customLetter, setCustomLetter] = useState(
    "Honestly, tere bina life kaafi boring hoti. Chahe hum roz ladte rahein ya ek doosre ka mazaak udayein, tu mera sabse real dost hai. Happy Birthday! Hamesha aisa hi pagal rehna ❤️"
  );
  const [treatLocation, setTreatLocation] = useState("Dominos / Biryani Hub");
  const [avatarUrl, setAvatarUrl] = useState("");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ChatBirthdayPayload = {
      name: name.trim(),
      senderName: senderName.trim(),
      relationship,
      customLetter: customLetter.trim(),
      treatLocation: treatLocation.trim(),
      avatarUrl: avatarUrl.trim() || undefined
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/chat/#d=${encoded}`);
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
              <MessageSquare className="h-6 w-6" />
            </div>
            <div>
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-300 uppercase">
                WhatsApp-Style Adventure
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">The Birthday Chat 😂💖</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Real typing animations, double blue ticks, branches, 3D cake reveal, secret letter aur pizza treat confirmation!
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-emerald-400">His/Her Name (Chat Header)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-400">Your Name (Sender)</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-emerald-400">Secret Confession / Heartfelt Letter</label>
            <textarea
              rows={4}
              required
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none leading-relaxed"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-emerald-400">Treat Demand Place / Food</label>
              <input
                type="text"
                value={treatLocation}
                onChange={(e) => setTreatLocation(e.target.value)}
                placeholder="e.g. KFC / Burger King"
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-emerald-400">Profile Photo URL (Optional)</label>
              <input
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                placeholder="https://..."
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-emerald-500 py-3.5 text-sm font-black text-black hover:bg-emerald-400 active:scale-95 transition-transform"
          >
            Generate Realistic Birthday Chat Link 💬✨
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-emerald-500/40 bg-emerald-950/30 p-5">
            <span className="text-xs font-bold font-mono text-emerald-300">CHAT LINK READY TO SEND:</span>
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
