"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { OopsBirthdayPayload } from "@/lib/oopsTypes";
import { oopsSfx } from "@/lib/oopsSfx";
import { shootConfetti } from "@/lib/confetti";
import {
  Sparkles, Heart, Flame, Gift, Volume2, VolumeX, Mail,
  Crown, Smile, Frown, CheckCircle2, Star, ArrowRight, RefreshCcw
} from "lucide-react";
import Link from "next/link";

const ROASTS = [
  "Your childhood photos called. They want an apology for what you've become! 😂",
  "You're not getting older. You're just becoming a limited-edition vintage model! 🏆",
  "Your age is increasing, but your ability to act mature is still loading... ⏳🤣",
  "You're living proof that legends come with absolutely no instruction manual! 🤪",
  "Happy Birthday! Don't worry about getting old, you still act like an unfiltered 5-year-old anyway! 🍰"
];

const COMPLIMENTS = [
  "Jokes aside, you bring genuine sunshine into every room you walk into. ✨",
  "You have the rare superpower of turning the most boring days into laugh-riots. 💖",
  "The world is 100x cooler, warmer, and crazier because you exist in it. 👑",
  "You're our favourite chaotic human. Never change. ❤️"
];

export default function OopsBirthdayExperience() {
  const [data, setData] = useState<OopsBirthdayPayload | null>(null);
  const [currentStep, setCurrentStep] = useState<"welcome" | "quiz" | "reveal" | "main">("welcome");
  
  // Interactive state
  const [dodgePos, setDodgePos] = useState({ x: 0, y: 0 });
  const [quiz1Answer, setQuiz1Answer] = useState<string | null>(null);
  const [quiz2Answer, setQuiz2Answer] = useState<string | null>(null);
  const [boxOpened, setBoxOpened] = useState(false);
  const [candles, setCandles] = useState([true, true, true]);
  const [currentRoast, setCurrentRoast] = useState<string | null>(null);
  const [currentCompliment, setCurrentCompliment] = useState<string | null>(null);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [finalSurprise, setFinalSurprise] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        const decoded = decodeData(raw) as unknown as OopsBirthdayPayload;
        setData(decoded);
      } else {
        // High quality default demo
        setData({
          name: "Chirkut",
          senderName: "Your Favourite Human",
          relationship: "bestie",
          memories: [
            { id: "1", imgUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500", caption: "Exhibit A: The day you looked innocent. Highly suspicious! 😂", sticker: "🚨 Guilty" },
            { id: "2", imgUrl: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500", caption: "Proof that we actually survived each other without murder! 🥹", sticker: "❤️ Besties" },
            { id: "3", imgUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500", caption: "One of my absolute favourite memories. No refunds, no exchange! 🍰", sticker: "✨ Iconic" },
          ]
        });
      }
    }
  }, []);

  // Runaway button dodge logic
  const handleDodge = () => {
    oopsSfx.playBoing();
    const randomX = (Math.random() - 0.5) * 220;
    const randomY = (Math.random() - 0.5) * 160;
    setDodgePos({ x: randomX, y: randomY });
  };

  const handleBlowCandle = (idx: number) => {
    oopsSfx.playBlow();
    const updated = [...candles];
    updated[idx] = false;
    setCandles(updated);
    if (updated.every((c) => !c)) {
      shootConfetti("party");
    }
  };

  const toggleSound = () => {
    const muted = oopsSfx.toggleMute();
    setIsMuted(muted);
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#0d0914] text-zinc-100 overflow-x-hidden selection:bg-pink-500 selection:text-white">
      {/* Sound Toggle */}
      <button
        onClick={toggleSound}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-black/70 px-3.5 py-1.5 text-xs font-bold text-pink-300 backdrop-blur-md shadow-lg"
      >
        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 animate-pulse" />}
        <span>{isMuted ? "Unmute" : "Sound ON"}</span>
      </button>

      {/* ========================================================
          1. THE FUNNIEST WELCOME SCREEN
      ======================================================== */}
      {currentStep === "welcome" && (
        <section className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#1c122c] via-[#0d0914] to-black px-4 text-center">
          {/* Animated Mascot with birthday hat */}
          <div className="relative mb-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-tr from-pink-500 to-amber-400 p-1 shadow-[0_0_50px_rgba(236,72,153,0.35)] animate-bounce">
              <span className="text-6xl select-none">🥳</span>
            </div>
            <div className="absolute -top-3 -right-2 rotate-12 rounded-full bg-yellow-400 px-2 py-0.5 text-[10px] font-black text-black shadow">
              AGED +1
            </div>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
            HEY YOU! YES, YOU! 👀
          </h1>
          <p className="mt-3 max-w-sm text-sm sm:text-base font-medium text-pink-200/90 leading-relaxed">
            Someone has been getting older... and we have verified digital PROOF! 😂🎂
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 w-full max-w-xs">
            <button
              onClick={() => {
                oopsSfx.playPop();
                shootConfetti("party");
                setCurrentStep("quiz");
              }}
              className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 py-3.5 text-sm font-black tracking-wide text-white shadow-xl shadow-pink-500/25 active:scale-95 transition-transform"
            >
              I AM READY 😎
            </button>

            <button
              onMouseEnter={handleDodge}
              onTouchStart={handleDodge}
              onClick={handleDodge}
              style={{
                transform: `translate(${dodgePos.x}px, ${dodgePos.y}px)`,
                transition: "transform 0.15s ease-out"
              }}
              className="w-full rounded-2xl border border-zinc-700 bg-zinc-900/80 py-3.5 text-sm font-bold text-zinc-400 active:scale-95"
            >
              WRONG PERSON! 🏃
            </button>
          </div>
        </section>
      )}

      {/* ========================================================
          2. THE PERSONALITY TEST QUIZ
      ======================================================== */}
      {currentStep === "quiz" && (
        <section className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-b from-[#180f26] via-[#0d0914] to-black px-4 text-center">
          <div className="w-full max-w-md rounded-3xl border border-pink-500/30 bg-zinc-950/80 p-6 backdrop-blur-2xl shadow-2xl">
            <span className="rounded-full bg-pink-500/20 px-3 py-1 text-[11px] font-black uppercase tracking-wider text-pink-300">
              MANDATORY BRAIN TEST 🧠
            </span>

            {/* Question 1 */}
            {!quiz1Answer ? (
              <div className="mt-5">
                <h2 className="text-xl font-black text-white">What is your official age right now?</h2>
                <div className="mt-4 grid grid-cols-2 gap-2.5">
                  {[
                    { label: "Still a baby 👶", resp: "Age is just a number... but yours is getting real suspicious! 😂" },
                    { label: "Old enough 😂", resp: "Congratulations! You've unlocked another year of pretending to be mature. 🎓" },
                    { label: "Young forever 😎", resp: "Denial is the first step of looking fabulous! 💅" },
                    { label: "Classified 🔒", resp: "FBI has already opened your birth certificate file! 📂🤣" }
                  ].map((opt) => (
                    <button
                      key={opt.label}
                      onClick={() => {
                        oopsSfx.playPop();
                        setQuiz1Answer(opt.resp);
                      }}
                      className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/90 p-3 text-xs font-bold text-zinc-200 hover:border-pink-500 hover:bg-pink-950/30 transition-all"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ) : !quiz2Answer ? (
              /* Question 2 */
              <div className="mt-5">
                <div className="mb-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 font-medium">
                  {quiz1Answer}
                </div>
                <h2 className="text-xl font-black text-white">How awesome are you on a scale of 1 to 100?</h2>
                <div className="mt-4 space-y-2">
                  {[
                    "Pretty awesome 😌",
                    "Extremely awesome 😎",
                    "Don't ask silly questions! 👑"
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        oopsSfx.playPop();
                        setQuiz2Answer("CORRECT! We already knew that. Your ego has been successfully verified! ✅😂");
                      }}
                      className="cursor-pointer w-full rounded-xl border border-zinc-800 bg-zinc-900/90 p-3 text-xs font-bold text-zinc-200 hover:border-pink-500 hover:bg-pink-950/30 transition-all"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Quiz Cleared */
              <div className="mt-5 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 animate-bounce" />
                <h3 className="mt-3 text-lg font-black text-white">EGO VERIFICATION PASSED!</h3>
                <p className="mt-2 text-xs text-zinc-300">{quiz2Answer}</p>

                <button
                  onClick={() => {
                    oopsSfx.playPop();
                    setCurrentStep("reveal");
                  }}
                  className="cursor-pointer mt-6 w-full rounded-xl bg-gradient-to-r from-pink-500 to-amber-500 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-pink-500/30 active:scale-95"
                >
                  Proceed to Classified Box 🎁
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ========================================================
          3. DRAMATIC BIRTHDAY REVEAL
      ======================================================== */}
      {currentStep === "reveal" && (
        <section className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black px-4 text-center">
          {!boxOpened ? (
            <div className="flex flex-col items-center animate-in zoom-in-95 duration-500">
              <span className="rounded-full bg-red-600 px-3 py-0.5 font-mono text-[10px] font-black uppercase tracking-widest text-white animate-pulse">
                WARNING: HIGH VOLTAGE VIP
              </span>
              <h1 className="mt-3 text-2xl sm:text-4xl font-black text-white">
                {data.name.toUpperCase()} HAS UNLOCKED A NEW LEVEL! 🎮
              </h1>
              <p className="mt-1 text-xs text-zinc-400">An extremely special human has been detected on Earth.</p>

              <button
                onClick={() => {
                  oopsSfx.playPop();
                  shootConfetti("party");
                  setBoxOpened(true);
                }}
                className="cursor-pointer mt-8 group relative flex h-36 w-36 items-center justify-center rounded-3xl border-2 border-pink-400 bg-pink-950/40 shadow-[0_0_60px_rgba(244,63,94,0.4)] transition-transform hover:scale-110 active:scale-95"
              >
                <Gift className="h-16 w-16 text-pink-400 group-hover:rotate-12 transition-transform" />
                <span className="absolute -bottom-3 rounded-full bg-pink-500 px-3 py-1 text-[10px] font-black uppercase text-white shadow-lg">
                  OPEN SURPRISE 🎁
                </span>
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center max-w-md animate-in fade-in zoom-in-90 duration-500">
              <span className="text-5xl mb-3">👑🎂💖</span>
              <h1 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">
                HAPPY BIRTHDAY, {data.name}!
              </h1>
              <p className="mt-4 text-sm text-zinc-200 leading-relaxed font-medium">
                Another year older, a little more dramatic, and somehow STILL everyone's favourite human! 😂❤️
              </p>

              <button
                onClick={() => {
                  oopsSfx.playPop();
                  setCurrentStep("main");
                }}
                className="cursor-pointer mt-8 rounded-full bg-white px-8 py-3.5 text-xs font-black uppercase tracking-wider text-black shadow-2xl hover:bg-zinc-200 active:scale-95"
              >
                Enter the Fun Universe 👉
              </button>
            </div>
          )}
        </section>
      )}

      {/* ========================================================
          4. THE MAIN BIRTHDAY UNIVERSE
      ======================================================== */}
      {currentStep === "main" && (
        <div className="mx-auto max-w-3xl px-4 py-16">
          
          {/* 4.1 Cute Love Attack */}
          <section className="text-center rounded-3xl border border-pink-500/30 bg-gradient-to-b from-pink-950/20 to-zinc-950/60 p-8 backdrop-blur-xl shadow-2xl">
            <Heart className="mx-auto h-8 w-8 text-pink-400 animate-pulse fill-pink-500" />
            <span className="mt-2 text-[10px] font-mono uppercase tracking-widest text-pink-400 font-bold block">
              Jokes Aside For A Second...
            </span>
            <p className="mt-3 text-base sm:text-lg font-medium text-pink-100 leading-relaxed">
              "You're not just another person in this world. You're one of those rare people who can make an ordinary day feel special just by being in it. 💖"
            </p>
            <p className="mt-3 text-xs text-zinc-400 italic">
              (And yes, don't let this compliment go to your head. You're still annoying sometimes! 😂)
            </p>
          </section>

          {/* 4.2 Interactive 3D Cake & Candle Blowing */}
          <section className="my-16 flex flex-col items-center text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Make a wish... but don't tell anyone! 🤫✨
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-black text-white">Blow the Candles</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Tap each candle to blow it out!</p>

            <div className="relative mt-8 flex flex-col items-center justify-center p-8 rounded-3xl border border-zinc-800 bg-zinc-900/60 backdrop-blur-xl shadow-2xl w-full max-w-sm">
              {/* Candles */}
              <div className="flex gap-6 mb-2">
                {candles.map((isLit, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleBlowCandle(idx)}
                    className="cursor-pointer flex flex-col items-center group"
                  >
                    {isLit ? (
                      <div className="h-6 w-3 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-white shadow-[0_0_15px_#f59e0b] animate-flame" />
                    ) : (
                      <div className="h-2 w-2 rounded-full bg-zinc-600 my-2" />
                    )}
                    <div className="h-9 w-2 rounded-t-sm bg-gradient-to-b from-pink-300 to-rose-400 border border-white/20" />
                  </button>
                ))}
              </div>

              {/* Cake Top Tier */}
              <div className="h-12 w-40 rounded-2xl bg-gradient-to-r from-pink-200 via-rose-100 to-pink-200 border-2 border-white/40 shadow-inner flex items-center justify-center">
                <span className="text-[10px] font-black tracking-widest text-zinc-800">★ VINTAGE LEGEND ★</span>
              </div>
              {/* Cake Bottom Tier */}
              <div className="-mt-1 h-16 w-56 rounded-3xl bg-gradient-to-r from-pink-300 via-rose-400 to-purple-300 border-2 border-white/40 shadow-2xl flex items-center justify-center">
                <span className="text-xs font-black tracking-widest text-white">LEVEL UP! 🎂</span>
              </div>

              {candles.every((c) => !c) && (
                <div className="mt-6 rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs text-emerald-300 animate-in fade-in zoom-in-95">
                  <p className="font-bold">YOUR WISH HAS BEEN SENT TO THE UNIVERSE! 🌠</p>
                  <p className="mt-1 text-zinc-300 text-[11px]">
                    Delivery status: Hopefully successful. We are not responsible for cosmic delays! 😂
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* 4.3 The Roast Machine & Compliments */}
          <section className="my-16 rounded-3xl border border-amber-500/30 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-black font-mono text-amber-400">
                <Flame className="h-4 w-4 text-orange-500" /> THE ROAST DISPENSER 3000
              </span>
              <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-bold">100% UNFILTERED</span>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  oopsSfx.playBoing();
                  const pick = ROASTS[Math.floor(Math.random() * ROASTS.length)];
                  setCurrentRoast(pick);
                  setCurrentCompliment(null);
                }}
                className="cursor-pointer flex-1 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg active:scale-95"
              >
                ROAST ME! 😂🔥
              </button>

              <button
                onClick={() => {
                  oopsSfx.playPop();
                  const pick = COMPLIMENTS[Math.floor(Math.random() * COMPLIMENTS.length)];
                  setCurrentCompliment(pick);
                  setCurrentRoast(null);
                }}
                className="cursor-pointer flex-1 rounded-2xl bg-gradient-to-r from-pink-600 to-rose-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg active:scale-95"
              >
                COMPLIMENT ME! 🥹💖
              </button>
            </div>

            {currentRoast && (
              <div className="mt-5 rounded-2xl border border-orange-500/40 bg-orange-950/20 p-4 text-xs font-medium text-orange-200 animate-in fade-in">
                🔥 <b>Roast Delivered:</b> "{currentRoast}"
              </div>
            )}

            {currentCompliment && (
              <div className="mt-5 rounded-2xl border border-pink-500/40 bg-pink-950/20 p-4 text-xs font-medium text-pink-200 animate-in fade-in">
                🥹 <b>Truth Dropped:</b> "{currentCompliment}"
              </div>
            )}
          </section>

          {/* 4.4 Memory Time Machine */}
          <section className="my-16">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-pink-400">Time Capsule</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">The Memory Time Machine 📸</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {data.memories.map((mem) => (
                <div
                  key={mem.id}
                  className="group relative rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3 shadow-xl backdrop-blur-md transition-all hover:-translate-y-1.5 hover:border-pink-500/40"
                >
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-black">
                    <img src={mem.imgUrl} alt={mem.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {mem.sticker && (
                      <span className="absolute top-2 right-2 rounded bg-black/80 px-2 py-0.5 text-[10px] font-bold text-amber-300 border border-white/10">
                        {mem.sticker}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs text-zinc-300 font-medium leading-relaxed">{mem.caption}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 4.5 The Secret Love Letter */}
          <section className="my-16 flex flex-col items-center text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400">PSSST... THERE'S SOMETHING I HAVEN'T TOLD YOU 🤫</span>
            
            <div className="w-full max-w-lg mt-6">
              {!envelopeOpen ? (
                <button
                  onClick={() => {
                    oopsSfx.playPop();
                    setEnvelopeOpen(true);
                  }}
                  className="cursor-pointer group flex flex-col items-center justify-center w-full rounded-3xl border-2 border-dashed border-rose-500/40 bg-rose-950/20 p-10 hover:border-rose-400 transition-all shadow-xl"
                >
                  <Mail className="h-12 w-12 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="mt-3 text-sm font-black text-white">OPEN THE SECRET LETTER 💌</span>
                </button>
              ) : (
                <div className="rounded-3xl border border-amber-300/30 bg-[#16121e] p-6 sm:p-8 text-left shadow-2xl animate-in fade-in zoom-in-95">
                  <div className="text-xs font-mono text-zinc-500 mb-3">CLASSIFIED BIRTHDAY DOCUMENT • FOR YOUR EYES ONLY</div>
                  <div className="font-serif-luxury text-sm leading-relaxed text-zinc-200 whitespace-pre-line">
                    {data.customLetter || `Dear ${data.name},

First of all, congratulations on surviving another 365-day subscription to life! 😂🎂

Honestly, today is about more than cake, candles, and people singing the same song at completely different speeds.

It's about celebrating YOU.

Your smile, your personality, your little quirks, your crazy moments, and all the little things that make you who you are.

I hope this new chapter brings you beautiful surprises, genuine happiness, exciting adventures, and countless reasons to smile.

And remember, no matter how old you get, you will always have lifetime permission to act like a five-year-old when cake is involved. ❤️😂

Happy Birthday, ${data.name}!
Never stop being your wonderfully weird self. The world needs more people like you. 💖`}
                  </div>
                  <div className="mt-6 border-t border-zinc-800 pt-4 flex justify-between items-center text-xs text-zinc-400">
                    <span>Sent with all my love</span>
                    <span className="font-bold text-pink-400">— {data.senderName} ❤️</span>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* 4.6 The Most Unexpected Surprise */}
          <section className="my-20 text-center">
            {!finalSurprise ? (
              <div className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-8 shadow-2xl">
                <p className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  WAIT... YOU THOUGHT THAT WAS EVERYTHING? 😏
                </p>
                <button
                  onClick={() => {
                    oopsSfx.playPop();
                    shootConfetti("party");
                    setFinalSurprise(true);
                  }}
                  className="cursor-pointer mt-5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-transform"
                >
                  ONE LAST THING... 👀
                </button>
              </div>
            ) : (
              <div className="rounded-3xl border-2 border-pink-500/40 bg-gradient-to-b from-[#241335] via-[#120b1c] to-black p-8 text-center shadow-[0_0_80px_rgba(236,72,153,0.3)] animate-in fade-in zoom-in-95">
                <Crown className="mx-auto h-12 w-12 text-amber-400 animate-bounce" />
                <h3 className="mt-4 text-2xl sm:text-3xl font-black text-white font-serif-luxury">
                  Out of all the people in the world, there's only one YOU.
                </h3>
                <p className="mt-3 text-sm text-pink-200/90 leading-relaxed max-w-md mx-auto">
                  {data.customFinalMessage || `And that's pretty amazing. ❤️

May your life be filled with unexpected happiness, unforgettable memories, crazy adventures, genuine love, and more cake than your stomach can handle.

Stay weird. Stay wonderful. Keep smiling.

Because today, tomorrow, and every day after that, you deserve beautiful things.`}
                </p>
                <p className="mt-6 text-base font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-amber-300">
                  HAPPY BIRTHDAY, YOU ABSOLUTE LEGEND! 🎂👑💖
                </p>
              </div>
            )}
          </section>

          {/* Footer */}
          <footer className="mt-20 border-t border-zinc-900 pt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-2 text-xs text-zinc-400 hover:text-white"
            >
              <span>⚡ Made with OOPS! IT'S YOUR BIRTHDAY</span>
              <span>•</span>
              <span className="text-pink-400 font-bold">Create one for your bestie</span>
            </Link>
          </footer>
        </div>
      )}
    </main>
  );
}
