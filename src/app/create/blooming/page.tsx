"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { BloomingLovePayload } from "@/lib/bloomingTypes";
import { ArrowLeft, Flower2, Copy, Check, Heart } from "lucide-react";

export default function BloomingLoveCreator() {
  const [partnerName, setPartnerName] = useState("Ananya");
  const [senderName, setSenderName] = useState("Aarav");
  const [proposalType, setProposalType] = useState<"mine" | "marry">("mine");
  const [customLetter, setCustomLetter] = useState(
    `Pata nahi tumhe kaise bataun, lekin tum meri life ke un special logon mein se ho jinke saath normal moments bhi special lagne lagte hain.\n\nTumhari smile, tumhari baatein aur tumhara saath mere liye bahut matter karta hai.\n\nMain ye nahi kehta ki har din perfect hoga, lekin main chahta hoon ki hum saath mein aur bhi beautiful memories banayein.\n\nAur aaj main tumse ek special baat poochna chahta hoon... ❤️`
  );

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: BloomingLovePayload = {
      partnerName: partnerName.trim(),
      senderName: senderName.trim(),
      proposalType,
      customLetter: customLetter.trim(),
      storyCards: [
        { id: "1", title: "Our First Conversation 💬", iconName: "chat", note: "Wo pehli baar jab baat shuru hui thi, kisne socha tha ki ek din tum meri puri duniya ban jaogi." },
        { id: "2", title: "Our First Memory 🥹", iconName: "heart", note: "Wo pehli mulaqat, wo nervous smile aur ghanton bina thake baatein karna." },
        { id: "3", title: "The Moment You Became Special ❤️", iconName: "sparkle", note: "Jab ehsaas hua ki tumhare bina mera koi bhi din complete nahi lagta." },
        { id: "4", title: "Our Favourite Moments 📸", iconName: "camera", note: "Har hasi, har choti ladai, aur har wo pal jisme humne ek-doosre ko choose kiya." },
        { id: "5", title: "Our Beautiful Future ✨", iconName: "future", note: "Ek naya safar, naye sapne, aur har mod par tumhara haath mere haath mein." },
      ]
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/blooming/#d=${encoded}`);
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

        <div className="rounded-3xl border border-rose-500/30 bg-rose-950/20 p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 text-2xl">
              🌹
            </div>
            <div>
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 uppercase">
                Grand Romantic Sanctuary
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">Blooming Love ❤️🌹</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Moonlit flower garden, interactive budding rose, 5-part memory journey, sealed love letter aur grand proposal scene.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Her/His Name (The One You Love)</label>
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
            <label className="text-xs font-semibold text-rose-300">Proposal Mode</label>
            <div className="mt-1.5 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setProposalType("mine")}
                className={`cursor-pointer rounded-xl p-3 text-xs font-bold border transition-all ${
                  proposalType === "mine"
                    ? "bg-rose-600 border-rose-500 text-white"
                    : "bg-black border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                WILL YOU BE MINE? ❤️🌹
              </button>
              <button
                type="button"
                onClick={() => setProposalType("marry")}
                className={`cursor-pointer rounded-xl p-3 text-xs font-bold border transition-all ${
                  proposalType === "marry"
                    ? "bg-amber-600 border-amber-500 text-white"
                    : "bg-black border-zinc-800 text-zinc-400 hover:text-white"
                }`}
              >
                WILL YOU MARRY ME? 💍❤️
              </button>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Secret Love Letter (Editable)</label>
            <textarea
              rows={5}
              required
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-sm font-black text-white shadow-xl shadow-rose-600/30 active:scale-95 transition-transform"
          >
            Launch Blooming Love Proposal Link 🌹💍
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-rose-950/30 p-5">
            <span className="text-xs font-bold font-mono text-rose-300">PROPOSAL SANCTUARY LINK READY:</span>
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
