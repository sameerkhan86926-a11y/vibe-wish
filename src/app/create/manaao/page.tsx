"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { ManaaoPayload, TargetRelation } from "@/lib/manaaoTypes";
import { ArrowLeft, Sparkles, Copy, Check, HeartHandshake } from "lucide-react";

export default function ManaaoCreatorPage() {
  const [name, setName] = useState("Priya");
  const [senderName, setSenderName] = useState("Sameer");
  const [relation, setRelation] = useState<TargetRelation>("gf");
  const [reasonTag, setReasonTag] = useState("Reply late kiya 📱");
  const [customLetter, setCustomLetter] = useState(
    `Hey, meri favourite insaan. ❤️\n\nMujhe pata hai ki sirf sorry bol dene se har baat theek nahi ho jaati. Agar meri kisi baat se tumhe bura laga hai, toh main tumhari feelings samajhna chahta hoon.\n\nTum mere liye bohot important ho, isliye main nahi chahta ki misunderstanding humari baat se badi ho jaye. Main perfect nahi hoon, par behtar banne ki poori koshish karunga.\n\nJab tumhara mann ho, tab araam se baat karte hain. Take your time. ❤️`
  );
  const [customPromise, setCustomPromise] = useState("Aage se bina bataye gayab nahi hounga aur tumhari baat dhyan se sununga.");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: ManaaoPayload = {
      name: name.trim(),
      senderName: senderName.trim(),
      relation,
      reasonTag,
      customLetter: customLetter.trim(),
      customPromise: customPromise.trim()
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/manaao/#d=${encoded}`);
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
              🥺
            </div>
            <div>
              <span className="rounded bg-rose-500/20 px-2 py-0.5 text-[10px] font-bold text-rose-300 uppercase">
                GUSSA TUMHARA, MISSION HAMARA
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl">Mission: Manaao Them 🥺❤️</h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400">
            Anger warning meter, funny sorry dispenser, interactive chat banter, mini apology tasks, mood-lifters aur respectful letter.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-4 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Unka Naam (Jo Gussa Hain)</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Aapka Naam (Sender)</label>
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
            <label className="text-xs font-semibold text-rose-300">Relationship</label>
            <div className="mt-1.5 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: "gf", label: "Meri GF ❤️" },
                { id: "bf", label: "Mera BF 🥺" },
                { id: "bestie", label: "Bestie 😂" },
                { id: "special", label: "Special Person 💗" }
              ].map((r) => (
                <button
                  type="button"
                  key={r.id}
                  onClick={() => setRelation(r.id as any)}
                  className={`cursor-pointer rounded-xl p-2.5 text-xs font-bold border ${
                    relation === r.id
                      ? "bg-rose-500 border-rose-500 text-white"
                      : "bg-black border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Narazgi Ki Wajah (Reason)</label>
            <select
              value={reasonTag}
              onChange={(e) => setReasonTag(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
            >
              <option value="Reply late kiya 📱">Reply late kiya 📱</option>
              <option value="Unki baat dhyan se nahi suni 🥺">Unki baat dhyan se nahi suni 🥺</option>
              <option value="Gusse mein kuch galat bol diya 😭">Gusse mein kuch galat bol diya 😭</option>
              <option value="Chhoti si baat par behes ho gayi 💔">Chhoti si baat par behes ho gayi 💔</option>
              <option value="Special din ya waada bhool gaya 🎂">Special din ya waada bhool gaya 🎂</option>
              <option value="Meri galti hai, bas ab manana hai 🥹">Meri galti hai, bas ab manana hai 🥹</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Aapka Promise (Aage kya dhyan rakhoge)</label>
            <input
              type="text"
              value={customPromise}
              onChange={(e) => setCustomPromise(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Secret Sincere Letter (Editable)</label>
            <textarea
              rows={4}
              required
              value={customLetter}
              onChange={(e) => setCustomLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 py-3.5 text-sm font-black text-white shadow-xl shadow-rose-600/30 active:scale-95 transition-transform"
          >
            Launch Manaao Mission Link 🚀❤️
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-rose-950/30 p-5">
            <span className="text-xs font-bold font-mono text-rose-300">MANAAO LINK READY TO SEND:</span>
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
