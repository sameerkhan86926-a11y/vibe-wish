"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { BloomingLovePayload } from "@/lib/bloomingTypes";
import GardenCanvas from "@/components/GardenCanvas";
import { shootConfetti } from "@/lib/confetti";
import {
  Heart, Sparkles, Flower2, Mail, Flame, RotateCcw,
  MessageCircle, Camera, Check, Volume2, VolumeX, Moon
} from "lucide-react";
import Link from "next/link";

export default function BloomingLoveExperience() {
  const [data, setData] = useState<BloomingLovePayload | null>(null);
  
  // Scene Navigation
  const [scene, setScene] = useState<"opening" | "budBloom" | "story" | "letter" | "proposal" | "finale">("opening");
  
  // Interactive Flower Bud State
  const [budTapped, setBudTapped] = useState(false);
  
  // Active Memory Card
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  // Letter State
  const [letterRevealed, setLetterRevealed] = useState(false);

  // Proposal State
  const [proposalAnswer, setProposalAnswer] = useState<"yes" | "think" | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        setData(decodeData(raw) as unknown as BloomingLovePayload);
      } else {
        // High quality luxury default
        setData({
          partnerName: "Ananya",
          senderName: "Aarav",
          proposalType: "mine",
          customLetter: `Pata nahi tumhe kaise bataun, lekin tum meri life ke un special logon mein se ho jinke saath normal moments bhi special lagne lagte hain.\n\nTumhari smile, tumhari baatein aur tumhara saath mere liye bahut matter karta hai.\n\nMain ye nahi kehta ki har din perfect hoga, lekin main chahta hoon ki hum saath mein aur bhi beautiful memories banayein.\n\nAur aaj main tumse ek special baat poochna chahta hoon... ❤️`,
          storyCards: [
            { id: "1", title: "Our First Conversation 💬", iconName: "chat", note: "Wo pehli baar jab baat shuru hui thi, kisne socha tha ki ek din tum meri puri duniya ban jaogi." },
            { id: "2", title: "Our First Memory 🥹", iconName: "heart", note: "Wo pehli mulaqat, wo nervous smile aur ghanton bina thake baatein karna." },
            { id: "3", title: "The Moment You Became Special ❤️", iconName: "sparkle", note: "Jab ehsaas hua ki tumhare bina mera koi bhi din complete nahi lagta." },
            { id: "4", title: "Our Favourite Moments 📸", iconName: "camera", note: "Har hasi, har choti ladai, aur har wo pal jisme humne ek-doosre ko choose kiya." },
            { id: "5", title: "Our Beautiful Future ✨", iconName: "future", note: "Ek naya safar, naye sapne, aur har mod par tumhara haath mere haath mein." },
          ]
        });
      }
    }
  }, []);

  const handleEnterWorld = () => {
    setScene("budBloom");
    shootConfetti("hearts");
  };

  const handleTapBud = () => {
    setBudTapped(true);
    shootConfetti("hearts");
    setTimeout(() => {
      setScene("story");
    }, 4500);
  };

  const handleOpenLetter = () => {
    setLetterRevealed(true);
    shootConfetti("hearts");
  };

  const handleProposalYes = () => {
    setProposalAnswer("yes");
    shootConfetti("hearts");
    shootConfetti("gold");
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#070308] text-zinc-100 font-sans selection:bg-rose-600 selection:text-white overflow-x-hidden">
      {/* Dynamic Magical Garden Canvas */}
      <GardenCanvas intensity={proposalAnswer === "yes" ? "grand" : "normal"} />

      {/* Floating Moonlight Indicator */}
      <div className="fixed top-4 right-4 z-40 flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-black/60 px-3.5 py-1 text-xs font-serif text-rose-300 backdrop-blur-md shadow-lg">
        <Moon className="h-3.5 w-3.5 text-amber-300" />
        <span>Moonlit Rose Sanctuary</span>
      </div>

      {/* ========================================================
          SCENE 1: THE OPENING SCENE
      ======================================================== */}
      {scene === "opening" && (
        <section className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-radial from-[#220a16] via-[#09030a] to-black px-4 text-center">
          <div className="relative mb-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-rose-500/40 bg-gradient-to-tr from-rose-950 to-pink-950 p-4 shadow-[0_0_60px_rgba(244,63,94,0.35)] animate-pulse">
            <Flower2 className="h-14 w-14 text-rose-400" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-rose-500"></span>
            </span>
          </div>

          <p className="font-serif-luxury text-sm tracking-widest uppercase text-rose-300/80">
            Hey, someone special... ❤️
          </p>

          <h1 className="mt-2 text-2xl sm:text-4xl font-black text-white font-serif-luxury max-w-md leading-relaxed">
            tumhare liye kuch special banaya hai 🥹🌹
          </h1>

          <button
            onClick={handleEnterWorld}
            className="cursor-pointer mt-10 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-9 py-4 text-xs font-black tracking-widest uppercase text-white shadow-[0_0_40px_rgba(225,29,72,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            Enter My Little World 💗
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 2: MAGICAL FLOWER BUD BLOOM
      ======================================================== */}
      {scene === "budBloom" && (
        <section className="fixed inset-0 z-30 flex flex-col items-center justify-center bg-radial from-[#1e0714] via-[#08020a] to-black px-4 text-center">
          {!budTapped ? (
            <div className="flex flex-col items-center animate-in fade-in duration-700">
              <button
                onClick={handleTapBud}
                className="group relative flex h-36 w-36 cursor-pointer items-center justify-center rounded-full border-2 border-rose-500/50 bg-rose-950/40 shadow-[0_0_70px_rgba(244,63,94,0.4)] transition-transform hover:scale-110 active:scale-95"
              >
                <div className="h-16 w-8 rounded-full bg-gradient-to-t from-rose-700 to-pink-400 shadow-inner group-hover:rotate-6 transition-transform" />
                <span className="absolute -bottom-3 rounded-full bg-rose-600 px-3 py-1 text-[10px] font-black uppercase text-white tracking-widest shadow-md">
                  Tap to Bloom 🌸
                </span>
              </button>
              <p className="mt-8 text-sm font-serif-luxury text-rose-200">
                Tap the bud to breathe life into the garden...
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center max-w-lg animate-in zoom-in-95 duration-1000">
              <div className="flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 p-1 shadow-[0_0_90px_rgba(244,63,94,0.6)] animate-pulse">
                <span className="text-7xl">🌹</span>
              </div>
              <div className="mt-8 space-y-3 font-serif-luxury text-base sm:text-lg text-rose-100 leading-relaxed">
                <p className="animate-in fade-in duration-500">"Kuch flowers sunlight se khilte hain 🌷"</p>
                <p className="animate-in fade-in duration-700 delay-300">"Kuch baarish se..."</p>
                <p className="animate-in fade-in duration-1000 delay-700 text-rose-300 font-bold">
                  "Aur kuch khoobsurat cheezein tab shuru hoti hain jab do log ek-dusre ki life mein aate hain. ❤️"
                </p>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          SCENE 3, 4, 5 & 6: MAIN STORY, LETTER & PROPOSAL
      ======================================================== */}
      {(scene === "story" || scene === "letter" || scene === "proposal" || scene === "finale") && (
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-16 sm:px-6">
          
          {/* Couple Banner */}
          <header className="text-center py-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/20 px-4 py-1.5 text-xs font-serif text-rose-300 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5" /> A Tale Written In Petals
            </span>
            <h1 className="mt-4 text-4xl sm:text-6xl font-black font-serif-luxury text-white">
              {data.senderName} <span className="text-rose-500">❤️</span> {data.partnerName}
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-rose-200/80 font-serif italic">
              "Every petal holds a memory, every rose holds a beat."
            </p>
          </header>

          {/* ========================================================
              3. OUR LOVE STORY CARDS
          ======================================================== */}
          <section className="my-12">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">Memories in Bloom</span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif-luxury text-white mt-1">Our Journey Together</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.storyCards.map((card) => {
                const isSelected = activeCardId === card.id;
                return (
                  <div
                    key={card.id}
                    onClick={() => setActiveCardId(isSelected ? null : card.id)}
                    className={`cursor-pointer rounded-3xl border p-5 backdrop-blur-xl transition-all duration-300 ${
                      isSelected
                        ? "border-rose-400 bg-rose-950/40 shadow-[0_0_35px_rgba(244,63,94,0.25)]"
                        : "border-rose-900/40 bg-zinc-950/60 hover:border-rose-500/50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white font-serif-luxury">{card.title}</h3>
                      <Sparkles className="h-4 w-4 text-rose-400" />
                    </div>

                    <p className="mt-3 text-xs leading-relaxed text-rose-100/90 font-serif">
                      {card.note}
                    </p>

                    {card.photoUrl && isSelected && (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-rose-500/30 aspect-video">
                        <img src={card.photoUrl} alt={card.title} className="h-full w-full object-cover" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => setScene("letter")}
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-rose-500/40 bg-gradient-to-r from-rose-600 to-pink-700 px-7 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg active:scale-95 transition-all"
              >
                <span>Proceed to Secret Parchment 💌</span>
              </button>
            </div>
          </section>

          {/* ========================================================
              4. SECRET LOVE LETTER
          ======================================================== */}
          {scene !== "story" && (
            <section className="my-16 flex flex-col items-center text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">Confession in the Rose Garden</span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif-luxury text-white mt-1">
                Ek baat hai jo tumhe batani hai... 🥹❤️
              </h2>

              <div className="w-full max-w-lg mt-6">
                {!letterRevealed ? (
                  <button
                    onClick={handleOpenLetter}
                    className="cursor-pointer group flex flex-col items-center justify-center w-full rounded-3xl border-2 border-dashed border-rose-500/50 bg-rose-950/20 p-10 hover:border-rose-400 transition-all shadow-[0_0_50px_rgba(244,63,94,0.15)]"
                  >
                    <Mail className="h-12 w-12 text-rose-400 group-hover:scale-110 transition-transform" />
                    <span className="mt-3 text-xs font-black uppercase tracking-wider text-white">
                      Open My Heart 💌
                    </span>
                  </button>
                ) : (
                  <div className="rounded-3xl border border-rose-400/40 bg-[#14060f] p-6 sm:p-8 text-left shadow-2xl animate-in zoom-in-95">
                    <div className="font-serif-luxury text-sm leading-relaxed text-rose-100 whitespace-pre-line">
                      {data.customLetter}
                    </div>
                    <div className="mt-6 border-t border-rose-900/50 pt-4 flex justify-between items-center text-xs text-rose-300">
                      <span>Written with all my heart</span>
                      <span className="font-bold">— {data.senderName} ❤️</span>
                    </div>

                    <div className="mt-8 text-center">
                      <button
                        onClick={() => {
                          setScene("proposal");
                          shootConfetti("hearts");
                        }}
                        className="cursor-pointer rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 px-8 py-3 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                      >
                        Step into the Grand Proposal Scene 💍🌹
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* ========================================================
              5. GRAND PROPOSAL SCENE
          ======================================================== */}
          {(scene === "proposal" || scene === "finale") && (
            <section className="my-20 rounded-3xl border-2 border-rose-500/40 bg-gradient-to-b from-[#240817] via-[#0d020a] to-black p-8 sm:p-12 text-center shadow-[0_0_80px_rgba(225,29,72,0.3)]">
              {/* Glowing Heart with botanical frame */}
              <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 to-amber-400 p-1 shadow-[0_0_60px_#e11d48] animate-bounce">
                <Heart className="h-12 w-12 fill-white text-white" />
              </div>

              <span className="font-serif-luxury text-sm text-rose-300 uppercase tracking-widest font-bold">
                {data.partnerName}... ❤️
              </span>

              <p className="mx-auto mt-3 max-w-md font-serif-luxury text-sm sm:text-base text-rose-100 leading-relaxed">
                "Tum meri life ko jitna beautiful banate ho, shayad main words mein explain bhi nahi kar sakta. Aaj is beautiful moment mein tumse ek sawaal poochna hai..."
              </p>

              {/* The Big Question */}
              <h2 className="mt-6 text-3xl sm:text-5xl font-black font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-200 to-amber-300 tracking-tight">
                {data.proposalType === "marry" ? "WILL YOU MARRY ME? 💍❤️" : "WILL YOU BE MINE? ❤️🌹"}
              </h2>

              {/* Proposal Buttons */}
              {!proposalAnswer ? (
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button
                    onClick={handleProposalYes}
                    className="cursor-pointer w-full sm:w-auto rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-10 py-4 text-xs font-black tracking-widest uppercase text-white shadow-[0_0_40px_rgba(225,29,72,0.5)] hover:scale-105 active:scale-95 transition-all"
                  >
                    YESSS ❤️🥹
                  </button>
                  <button
                    onClick={() => setProposalAnswer("think")}
                    className="cursor-pointer w-full sm:w-auto rounded-full border border-rose-500/40 bg-black/60 px-8 py-4 text-xs font-bold text-rose-300 hover:text-white transition-colors"
                  >
                    Let Me Think 💗
                  </button>
                </div>
              ) : proposalAnswer === "yes" ? (
                <div className="mt-8 rounded-3xl border border-rose-400 bg-rose-950/40 p-6 animate-in zoom-in-95">
                  <span className="text-4xl">🌹💍✨</span>
                  <h3 className="mt-3 text-xl sm:text-2xl font-black font-serif-luxury text-white">
                    YOU JUST MADE MY WORLD MORE BEAUTIFUL! ❤️🌹
                  </h3>
                  <p className="mt-2 text-xs text-rose-200">
                    The entire garden blooms today in honor of us.
                  </p>
                </div>
              ) : (
                <div className="mt-8 rounded-2xl border border-rose-500/30 bg-black/70 p-5 text-xs font-serif text-rose-200 animate-in fade-in">
                  "Take your time... tumhara answer tumhari marzi se hona chahiye. Main hamesha yahin hoon. ❤️"
                </div>
              )}
            </section>
          )}

          {/* ========================================================
              6. FINAL ROMANTIC SCENE & REPLAY
          ======================================================== */}
          {proposalAnswer && (
            <footer className="my-16 text-center rounded-3xl border border-rose-950 bg-black/40 p-8 backdrop-blur-md">
              <p className="font-serif-luxury text-sm leading-relaxed text-rose-200 max-w-md mx-auto">
                "Life mein bahut saare beautiful moments aayenge... Lekin kuch log un moments ko aur bhi special bana dete hain. And for me, you're one of those people. 🌹"
              </p>

              <button
                onClick={() => {
                  setScene("opening");
                  setBudTapped(false);
                  setLetterRevealed(false);
                  setProposalAnswer(null);
                }}
                className="cursor-pointer mt-6 inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/30 px-5 py-2 text-xs font-bold text-rose-300 hover:text-white transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Replay Our Little Story ❤️
              </button>

              <div className="mt-8 border-t border-zinc-900 pt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-500 hover:text-white"
                >
                  <span>⚡ Blooming Love</span>
                  <span>•</span>
                  <span className="text-rose-400">Craft your proposal world</span>
                </Link>
              </div>
            </footer>
          )}

        </div>
      )}
    </main>
  );
}
