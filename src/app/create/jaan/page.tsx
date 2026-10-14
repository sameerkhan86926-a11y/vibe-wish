"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { JaanBirthdayPayload } from "@/lib/jaanTypes";
import { ArrowLeft, Copy, Check, Heart, Sparkles } from "lucide-react";

export default function JaanBirthdayCreator() {
  const [girlfriendName, setGirlfriendName] = useState("Meri Jaan");
  const [senderName, setSenderName] = useState("Tumhara Deewana");
  const [romanticQuote1, setRomanticQuote1] = useState(
    "Tum meri zindagi ki wo sabse pyari dua ho jo rab ne qubool ki hai. Aaj ka har ek pal, har ek phool sirf tumhari muskurahat ke naam hai. 🌹✨"
  );
  const [customLoveLetter, setCustomLoveLetter] = useState(
    `Mujhe nahi pata ki main shabdon mein kaise bayan karun ki tum mere liye kya ho. Jab se tum meri zindagi mein aayi ho, har ek din ek khoobsurat kahani jaisa lagne laga hai.\n\nTum sirf meri girlfriend nahi ho, tum meri sabse achhi dost ho, mera sukoon ho aur meri sabse pyari aadat ho. Tumhari gusse wali naak, tumhari bachkani baatein aur tumhara bina bole sab samajh jaana—mujhe har cheez se bepanaah ishq hai.\n\nMain waada karta hoon ki zindagi ke har mod par, har hasi mein aur har mushkil mein tumhara haath mere haath mein hoga.`
  );

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: JaanBirthdayPayload = {
      girlfriendName: girlfriendName.trim(),
      senderName: senderName.trim(),
      romanticQuote1: romanticQuote1.trim(),
      butterflyQuote: "Dil mein hazaron butterflies udne lagti hain. Tumhari ek hasi mere poore din ki thakaan aur pareshaani ko ek pal mein gayab kar deti hai. 🥹💗",
      teddyQuote: "Chahe hum kitna bhi lad lein, kitni bhi silly fights ho jayein... Aakhri me mujhe sukoon sirf tumhari baahon mein milta hai. Happy Birthday, my cute little baby! 🤗❤️",
      flowerQuote: "Phool toh sabhi khoobsurat hote hain, lekin meri bagiya ka sabse anmol aur mehakta hua gulaab sirf tum ho. Hamesha khilkhilati raho. 🌹✨",
      starryQuote: "Aasman ke taaron se bhi zyada roshan tumhari aankhein hain. Saari kainaat ki roshni tumhare aanchal mein daal deta. 🌌💍",
      customLoveLetter: customLoveLetter.trim()
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const isGitHubPages = origin.includes("github.io");
    const basePath = isGitHubPages ? "/vibe-wish" : "";
    setGeneratedLink(`${origin}${basePath}/w/jaan/#d=${encoded}`);
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

        <div className="rounded-3xl border border-rose-500/30 bg-rose-950/20 p-6 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-500/20 text-rose-400 text-2xl border border-white/5">
              👑
            </div>
            <div>
              <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider">
                Romantic Birthday Magic
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl font-serif">
                Jaan's Birthday 🎂👑
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
            Gift box opening ceremony, rose rain, butterfly paradise, cute cuddle teddy, glowing heart, moonlit night sky, wax-sealed love letter & flying kisses.
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
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Your Name / Title</label>
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
            <label className="text-xs font-semibold text-rose-300">Birthday Wish Headline Note</label>
            <textarea
              rows={2}
              value={romanticQuote1}
              onChange={(e) => setRomanticQuote1(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Special Envelope Love Letter (Dil Se Message)</label>
            <textarea
              rows={6}
              required
              value={customLoveLetter}
              onChange={(e) => setCustomLoveLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-zinc-200 leading-relaxed font-serif"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white shadow-xl hover:opacity-95 active:scale-95 transition-transform"
          >
            Create Jaan's Birthday Experience Link 👑🎂
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-zinc-900/80 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold font-mono text-rose-300 uppercase">
              BIRTHDAY SURPRISE LINK READY:
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
