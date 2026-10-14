"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { GardenUsPayload } from "@/lib/gardenTypes";
import { ArrowLeft, Flower2, Copy, Check } from "lucide-react";

export default function GardenCreatorPage() {
  const [partner1, setPartner1] = useState("Aarav");
  const [partner2, setPartner2] = useState("Ananya");
  const [specialDate, setSpecialDate] = useState("24 November");

  const [beginningNote, setBeginningNote] = useState(
    "Tum meri life mein aaye,\naur pata hi nahi chala\nkab normal se din bhi special hone lage. ❤️"
  );

  const [secondFlowerNote, setSecondFlowerNote] = useState(
    "Sabse beautiful moments\nhamesha bade nahi hote...\n\nKabhi tumhari ek smile,\nkabhi tumhara care karna,\naur kabhi bina kisi reason ke\ntumhara mere saath hona. 🥹❤️"
  );

  const [moonlightLetter, setMoonlightLetter] = useState(
    `Shayad main har baar express nahi kar pata,\nshayad har baar sahi words bhi nahi milte...\n\nLekin tum mere liye kitne special ho,\nye sirf words mein explain karna mere liye thoda mushkil hai.\n\nBas itna samajh lo,\ntumhare saath ordinary moments bhi mere favourite memories ban jaate hain. ❤️`
  );

  const [photo1, setPhoto1] = useState("https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700");
  const [caption1, setCaption1] = useState("Jab hum pehli baar mile the...");

  const [photo2, setPhoto2] = useState("https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700");
  const [caption2, setCaption2] = useState("Woh moment jab tum aur bhi special ban gaye...");

  const [photo3, setPhoto3] = useState("https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=700");
  const [caption3, setCaption3] = useState("Ek aisi memory jo main kabhi nahi bhoolna chahta...");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: GardenUsPayload = {
      partner1: partner1.trim(),
      partner2: partner2.trim(),
      specialDate: specialDate.trim(),
      beginningNote: beginningNote.trim(),
      secondFlowerNote: secondFlowerNote.trim(),
      moonlightLetter: moonlightLetter.trim(),
      memories: [
        { id: "1", label: "Memory 1", sublabel: caption1.trim(), imgUrl: photo1.trim(), storyNote: "Pehli mulaqat ka wo lamha jo dil me hamesha taaza rahega." },
        { id: "2", label: "Memory 2", sublabel: caption2.trim(), imgUrl: photo2.trim(), storyNote: "Bina kisi shor ke sirf tumhara hona hi sukoon tha." },
        { id: "3", label: "Memory 3", sublabel: caption3.trim(), imgUrl: photo3.trim(), storyNote: "Har muskurahat aur har wo pal jo humne sath bitaaya." }
      ]
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    setGeneratedLink(`${origin}/vibe-wish/w/garden/#d=${encoded}`);
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
              🌹
            </div>
            <div>
              <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider">
                Botanical Cinematic Journey
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl font-serif">
                A Garden Full of Us 🌹
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
            Flower ➡️ Message ➡️ Flower ➡️ Dewdrop Balcony ➡️ Memory Pathway ➡️ Moonlight Lily ➡️ Grand Sunset Bloom & Flower Picking!
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Your Name (Partner 1)</label>
              <input
                type="text"
                required
                value={partner1}
                onChange={(e) => setPartner1(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Partner 2 Name</label>
              <input
                type="text"
                required
                value={partner2}
                onChange={(e) => setPartner2(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Anniversary Date</label>
            <input
              type="text"
              value={specialDate}
              onChange={(e) => setSpecialDate(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Beginning Flower Note (Slide 2)</label>
            <textarea
              rows={2}
              value={beginningNote}
              onChange={(e) => setBeginningNote(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-white"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-rose-300">Dewdrop Balcony Note (Slide 3)</label>
            <textarea
              rows={3}
              value={secondFlowerNote}
              onChange={(e) => setSecondFlowerNote(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-white"
            />
          </div>

          {/* 3 Pathway Memories */}
          <div className="space-y-3 border-t border-zinc-800 pt-4">
            <span className="text-xs font-bold font-mono text-amber-400 uppercase tracking-wider">
              Pathway Memories (3 Frames)
            </span>
            <div className="space-y-2">
              <input
                type="url"
                value={photo1}
                onChange={(e) => setPhoto1(e.target.value)}
                placeholder="Photo 1 URL"
                className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs text-white"
              />
              <input
                type="url"
                value={photo2}
                onChange={(e) => setPhoto2(e.target.value)}
                placeholder="Photo 2 URL"
                className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs text-white"
              />
              <input
                type="url"
                value={photo3}
                onChange={(e) => setPhoto3(e.target.value)}
                placeholder="Photo 3 URL"
                className="w-full rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Moonlight Lily Note */}
          <div className="border-t border-zinc-800 pt-4">
            <label className="text-xs font-semibold text-rose-300">Moonlight Lily Handwritten Letter (Slide 5)</label>
            <textarea
              rows={4}
              value={moonlightLetter}
              onChange={(e) => setMoonlightLetter(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-white font-serif leading-relaxed"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white shadow-xl hover:opacity-95 active:scale-95 transition-transform"
          >
            Launch "A Garden Full of Us" Link 🌹✨
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-zinc-900/80 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold font-mono text-rose-300 uppercase">
              CINEMATIC GARDEN LINK READY:
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
