"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { GardenUsPayload } from "@/lib/gardenTypes";
import RealisticGardenCanvas from "@/components/RealisticGardenCanvas";
import { shootConfetti } from "@/lib/confetti";
import {
  Heart, Sparkles, ChevronRight, ChevronLeft, Flower2,
  Calendar, RotateCcw, Volume2, VolumeX, Image as ImageIcon,
  Droplets, Moon, Sun, Flower
} from "lucide-react";
import Link from "next/link";

export default function GardenOfUsReceiver() {
  const [data, setData] = useState<GardenUsPayload | null>(null);
  const [scene, setScene] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [flowerBloomed, setFlowerBloomed] = useState(false);
  const [selectedMemory, setSelectedMemory] = useState<any | null>(null);
  const [pickedFlowerMessage, setPickedFlowerMessage] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        setData(decodeData(raw) as unknown as GardenUsPayload);
      } else {
        // High quality realistic default
        setData({
          partner1: "Aarav",
          partner2: "Ananya",
          specialDate: "24 November",
          beginningNote: "Tum meri life mein aaye,\naur pata hi nahi chala\nkab normal se din bhi special hone lage. ❤️",
          secondFlowerNote: "Sabse beautiful moments\nhamesha bade nahi hote...\n\nKabhi tumhari ek smile,\nkabhi tumhara care karna,\naur kabhi bina kisi reason ke\ntumhara mere saath hona. 🥹❤️",
          thirdFlowerNote: "Wo rasta jahan humne pehli baar bina kisi jaldi ke ghanton baatein ki thi...",
          moonlightLetter: `Shayad main har baar express nahi kar pata,\nshayad har baar sahi words bhi nahi milte...\n\nLekin tum mere liye kitne special ho,\nye sirf words mein explain karna mere liye thoda mushkil hai.\n\nBas itna samajh lo,\ntumhare saath ordinary moments bhi mere favourite memories ban jaate hain. ❤️`,
          finalMessage: `HAPPY ANNIVERSARY, MY FAVOURITE PERSON. ❤️\n\nEk aur saal...\nAur tumhare saath banane ke liye abhi bahut saari memories baaki hain.\n\nThank you meri life ka hissa banne ke liye.\nAaj bhi, kal bhi, aur har us din mein jo hum saath jeeyenge. 🌹❤️`,
          rosePickMessage: "Tum mere aaj aur hamesha ke favourite person ho. ❤️🌹",
          tulipPickMessage: "Tumhare saath ki chhoti-chhoti memories mere dil ke sabse kareeb hain. 🌷✨",
          whiteFlowerPickMessage: "Main chahta hoon ki hum aage bhi naye moments aur beautiful memories banate rahein. 🌼💍",
          memories: [
            {
              id: "1",
              label: "Memory 1",
              sublabel: "Jab hum pehli baar mile the...",
              imgUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700",
              storyNote: "Pehli baar jab hum mile the, nervousness thi par tumhari smile ne sab aasan kar diya."
            },
            {
              id: "2",
              label: "Memory 2",
              sublabel: "Woh moment jab tum aur bhi special ban gaye...",
              imgUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700",
              storyNote: "Bina kisi shor ke, bas tumhari presence ne dil ko sukoon de diya tha."
            },
            {
              id: "3",
              label: "Memory 3",
              sublabel: "Ek aisi memory jo main kabhi nahi bhoolna chahta...",
              imgUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=700",
              storyNote: "Har wo pal jahan humne sath hasna seekha aur ek doosre ka haath thama."
            }
          ]
        });
      }
    }
  }, []);

  // Natural slow flower blooming timeout per slide
  useEffect(() => {
    setFlowerBloomed(false);
    const timer = setTimeout(() => {
      setFlowerBloomed(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, [scene]);

  const handleNextScene = (next: 1 | 2 | 3 | 4 | 5 | 6) => {
    setIsTransitioning(true);
    shootConfetti("hearts");
    setTimeout(() => {
      setScene(next);
      setIsTransitioning(false);
    }, 500);
  };

  const getCanvasTheme = () => {
    if (scene === 1) return "sunset";
    if (scene === 2) return "golden";
    if (scene === 3) return "rainy";
    if (scene === 4) return "sunset";
    if (scene === 5) return "moonlight";
    return "golden";
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#070407] text-zinc-100 font-sans selection:bg-rose-600 selection:text-white select-none overflow-x-hidden">
      
      {/* Cinematic Botanical Environment Canvas */}
      <RealisticGardenCanvas theme={getCanvasTheme()} />

      {/* Floating Atmosphere Pill */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 text-xs font-serif text-rose-200 backdrop-blur-md shadow-lg">
        {scene === 3 ? (
          <span className="flex items-center gap-1 text-blue-300"><Droplets className="h-3 w-3" /> Dewdrop Balcony</span>
        ) : scene === 5 ? (
          <span className="flex items-center gap-1 text-zinc-300"><Moon className="h-3 w-3 text-blue-200" /> Moonlight Lily Garden</span>
        ) : (
          <span className="flex items-center gap-1 text-amber-300"><Sun className="h-3 w-3" /> Sunset Blossom Sanctuary</span>
        )}
      </div>

      {/* Ambient Radial Vignette */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)] z-10" />

      {/* ========================================================
          SCENE 1: THE FIRST FLOWER — BEGINNING
      ======================================================== */}
      {scene === 1 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="relative mb-8 flex h-40 w-40 items-center justify-center">
            {/* Realistic Botanical Rose SVG Icon with Blooming Expansion */}
            <div className={`transition-all duration-1000 ease-out flex items-center justify-center ${flowerBloomed ? "scale-110 opacity-100 drop-shadow-[0_0_35px_rgba(225,29,72,0.6)]" : "scale-75 opacity-70"}`}>
              <span className="text-8xl select-none">🌹</span>
            </div>
          </div>

          {flowerBloomed && (
            <div className="max-w-md animate-in fade-in slide-in-from-bottom-4 duration-1000">
              <p className="font-serif text-base sm:text-xl text-rose-100 leading-relaxed italic whitespace-pre-line">
                "Ek chhota sa flower...
                Us insaan ke liye,
                jo meri life mein sabse special hai. ❤️"
              </p>

              <button
                type="button"
                onClick={() => handleNextScene(2)}
                className="cursor-pointer mt-10 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-9 py-3.5 text-xs font-serif font-bold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(225,29,72,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                Let's Begin Our Story 🌷
              </button>
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          SCENE 2: FLOWER SLIDE → LOVE MESSAGE
      ======================================================== */}
      {scene === 2 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="relative mb-6">
            <span className="text-7xl block animate-pulse select-none">🌸</span>
          </div>

          <div className="max-w-md bg-black/40 border border-rose-500/20 rounded-3xl p-8 backdrop-blur-md shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-rose-400 font-bold block mb-3">
              THE PETAL REFLECTION
            </span>

            {flowerBloomed ? (
              <p className="font-serif text-base sm:text-xl text-rose-100 leading-relaxed italic whitespace-pre-line animate-in fade-in duration-1000">
                "{data.beginningNote}"
              </p>
            ) : (
              <p className="font-serif text-sm text-zinc-500 italic animate-pulse">
                The flower is uncurling its petals...
              </p>
            )}

            {flowerBloomed && (
              <button
                type="button"
                onClick={() => handleNextScene(3)}
                className="cursor-pointer mt-8 inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 hover:bg-rose-900/60 px-7 py-2.5 text-xs font-serif text-rose-200 transition-all"
              >
                <span>Next Memory</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          SCENE 3: SECOND FLOWER — THE LITTLE THINGS (RAINY BALCONY)
      ======================================================== */}
      {scene === 3 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="relative mb-6">
            <div className="relative inline-block">
              <span className="text-7xl select-none">🌹</span>
              <span className="absolute -top-1 -right-1 text-2xl animate-bounce">💧</span>
            </div>
          </div>

          <div className="max-w-lg bg-black/60 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
            <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-blue-300 font-bold block mb-3 flex items-center justify-center gap-1.5">
              <Droplets className="h-3.5 w-3.5 text-blue-400" />
              AFTER THE RAIN • LITTLE MOMENTS
            </span>

            <p className="font-serif text-sm sm:text-lg text-zinc-200 leading-relaxed italic whitespace-pre-line">
              "{data.secondFlowerNote}"
            </p>

            <div className="my-5 flex justify-center">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500 animate-pulse" />
            </div>

            <button
              type="button"
              onClick={() => handleNextScene(4)}
              className="cursor-pointer rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-7 py-3 text-xs font-serif uppercase tracking-wider text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            >
              There's More... 💌
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          SCENE 4: THIRD FLOWER — OUR MEMORIES PATHWAY
      ======================================================== */}
      {scene === 4 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="text-center mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              FLOWER PATHWAY
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
              Moments We Walked Together 🌸
            </h2>
            <p className="text-xs text-rose-200/70 font-serif italic mt-1">Tap a photograph to unveil the memory</p>
          </div>

          {/* 3 Real Photographic Memory Frames */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full max-w-4xl">
            {data.memories.map((mem) => (
              <div
                key={mem.id}
                onClick={() => setSelectedMemory(mem)}
                className="cursor-pointer group relative rounded-3xl overflow-hidden border border-rose-500/30 bg-black/60 p-4 shadow-xl backdrop-blur-md transition-all hover:-translate-y-2 hover:border-rose-400"
              >
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                  <img
                    src={mem.imgUrl}
                    alt={mem.sublabel}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 rounded-full bg-black/70 px-2.5 py-0.5 text-[10px] font-mono text-rose-300">
                    {mem.label}
                  </div>
                </div>
                <h3 className="mt-3 text-xs font-serif font-bold text-white leading-snug">
                  {mem.sublabel}
                </h3>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleNextScene(5)}
            className="cursor-pointer mt-10 rounded-full border border-rose-500/40 bg-zinc-900/80 px-8 py-3 text-xs font-serif uppercase tracking-wider text-rose-300 hover:text-white hover:bg-zinc-800 transition-all"
          >
            One Last Flower... 🌹
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 5: FOURTH FLOWER — THINGS I NEVER SAY (MOONLIGHT LILY)
      ======================================================== */}
      {scene === 5 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="relative mb-6">
            <span className="text-7xl block select-none">🪷</span>
          </div>

          <div className="max-w-lg bg-[#0e0f18]/90 border border-white/10 rounded-3xl p-8 backdrop-blur-xl shadow-2xl text-left relative overflow-hidden">
            <span className="text-[10px] font-mono uppercase tracking-widest text-blue-300 font-bold block mb-4">
              THINGS I DON'T SAY OFTEN ENOUGH 💌
            </span>

            <div className="font-serif text-sm sm:text-base leading-relaxed text-zinc-200 whitespace-pre-line italic">
              {data.moonlightLetter}
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 flex justify-between items-center text-xs text-zinc-400 font-serif">
              <span>Always in my heart</span>
              <span className="font-bold text-rose-300">— {data.partner1} ❤️</span>
            </div>

            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => {
                  handleNextScene(6);
                  shootConfetti("gold");
                }}
                className="cursor-pointer rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-9 py-3.5 text-xs font-serif font-black uppercase tracking-widest text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                The Final Bloom 🌹✨
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ========================================================
          SCENE 6: THE FINAL FLOWER — OUR FOREVER (GRAND BLOOM)
      ======================================================== */}
      {scene === 6 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-700 via-rose-900 to-amber-500 p-1 shadow-[0_0_80px_rgba(225,29,72,0.5)] animate-pulse">
            <span className="text-5xl select-none">🌹</span>
          </div>

          <span className="font-serif text-xs font-mono uppercase tracking-[0.3em] text-amber-400 font-bold">
            THE FOREVER SANCTUARY
          </span>

          <h1 className="mt-2 text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            HAPPY ANNIVERSARY, MY FAVOURITE PERSON. ❤️
          </h1>

          <div className="my-6 max-w-lg mx-auto bg-black/60 border border-rose-500/30 rounded-3xl p-6 backdrop-blur-xl">
            <p className="font-serif text-xs sm:text-sm leading-relaxed text-rose-100 whitespace-pre-line italic">
              {data.finalMessage}
            </p>

            <div className="mt-6 border-t border-rose-900/60 pt-4 flex flex-col sm:flex-row items-center justify-between text-xs font-serif text-rose-300 gap-2">
              <span className="font-bold text-sm text-white">{data.partner1} ❤️ {data.partner2}</span>
              <span className="flex items-center gap-1 font-mono text-[11px] bg-rose-500/10 px-3 py-1 rounded-full border border-rose-500/20">
                <Calendar className="h-3 w-3" /> {data.specialDate}
              </span>
            </div>
          </div>

          {/* ========================================================
              7. UNIQUE INTERACTION — PICK A FLOWER
          ======================================================== */}
          <div className="mt-4 w-full max-w-md">
            <p className="text-xs font-serif italic text-rose-200 mb-3">Pick a flower to reveal our bond:</p>
            <div className="grid grid-cols-3 gap-3">
              <button
                type="button"
                onClick={() => {
                  shootConfetti("hearts");
                  setPickedFlowerMessage(data.rosePickMessage || "Tum mere aaj ke favourite person ho. ❤️🌹");
                }}
                className="cursor-pointer rounded-2xl border border-rose-500/40 bg-rose-950/30 p-3 hover:border-rose-400 transition-all flex flex-col items-center gap-1"
              >
                <span className="text-3xl">🌹</span>
                <span className="text-[10px] font-serif font-bold text-rose-300">Red Rose</span>
                <span className="text-[9px] text-zinc-400">For My Love</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  shootConfetti("hearts");
                  setPickedFlowerMessage(data.tulipPickMessage || "Tumhare saath ki chhoti-chhoti memories mere liye bahut special hain. 🌷✨");
                }}
                className="cursor-pointer rounded-2xl border border-pink-500/40 bg-pink-950/30 p-3 hover:border-pink-400 transition-all flex flex-col items-center gap-1"
              >
                <span className="text-3xl">🌷</span>
                <span className="text-[10px] font-serif font-bold text-pink-300">Pink Tulip</span>
                <span className="text-[9px] text-zinc-400">For Memories</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  shootConfetti("gold");
                  setPickedFlowerMessage(data.whiteFlowerPickMessage || "Main chahta hoon ki hum aage bhi naye moments banate rahein. 🌼💍");
                }}
                className="cursor-pointer rounded-2xl border border-amber-500/40 bg-amber-950/30 p-3 hover:border-amber-400 transition-all flex flex-col items-center gap-1"
              >
                <span className="text-3xl">🌼</span>
                <span className="text-[10px] font-serif font-bold text-amber-300">White Flower</span>
                <span className="text-[9px] text-zinc-400">For Our Future</span>
              </button>
            </div>

            {pickedFlowerMessage && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-black/80 p-4 text-xs font-serif text-zinc-200 italic animate-in zoom-in-95 leading-relaxed">
                "{pickedFlowerMessage}"
              </div>
            )}
          </div>

          {/* Replay */}
          <div className="mt-10">
            <button
              type="button"
              onClick={() => {
                setScene(1);
                setPickedFlowerMessage(null);
              }}
              className="cursor-pointer inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-zinc-900/80 px-6 py-2.5 text-xs font-serif text-zinc-400 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" /> Replay Our Little Story ❤️
            </button>
          </div>
        </section>
      )}

      {/* Modal for detailed memory photo tap */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-between items-center text-center animate-in fade-in duration-300">
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={() => setSelectedMemory(null)}
              className="cursor-pointer text-white font-mono text-xs px-3 py-1.5 bg-zinc-800 rounded-lg"
            >
              Close ✕
            </button>
          </div>

          <div className="my-auto max-w-sm w-full">
            <div className="aspect-4/3 rounded-2xl overflow-hidden border border-rose-500/40 shadow-2xl bg-black">
              <img src={selectedMemory.imgUrl} alt={selectedMemory.sublabel} className="h-full w-full object-cover" />
            </div>
            <h3 className="mt-4 font-serif text-base font-bold text-white">{selectedMemory.sublabel}</h3>
            <p className="mt-2 text-xs font-serif italic text-rose-200/90 leading-relaxed bg-zinc-900/80 p-4 rounded-2xl border border-white/5">
              "{selectedMemory.storyNote}"
            </p>
          </div>

          <p className="text-[10px] font-mono text-zinc-500">A Garden Full of Us • Archived Pathway</p>
        </div>
      )}

    </main>
  );
}
