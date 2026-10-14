"use client";

import { useEffect, useState, useRef } from "react";
import { decodeData } from "@/lib/encoder";
import { BirthdayExePayload } from "@/lib/birthdayExeTypes";
import { shootConfetti } from "@/lib/confetti";
import {
  Skull, AlertTriangle, Flame, Volume2, VolumeX,
  Share2, ChevronRight, ChevronLeft, Gift, Heart, Sparkles, RotateCcw
} from "lucide-react";
import Link from "next/link";

export default function BirthdayExeReceiver() {
  const [data, setData] = useState<BirthdayExePayload | null>(null);
  const [booted, setBooted] = useState(false);
  const [bootStep, setBootStep] = useState(0);
  const [soundMuted, setSoundMuted] = useState(false);

  // 3D Gift Open
  const [giftOpened, setGiftOpened] = useState(false);

  // Quiz State
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizFeedback, setQuizFeedback] = useState<string | null>(null);

  // Candle State
  const [candleBlown, setCandleBlown] = useState(false);

  // Slides State
  const [activeSlide, setActiveSlide] = useState(0);

  // Drama Meter
  const [meterScore, setMeterScore] = useState<string | null>(null);
  const [meterScanning, setMeterScanning] = useState(false);

  // Letter & Finale
  const [letterRevealed, setLetterRevealed] = useState(false);
  const [kissesTriggered, setKissesTriggered] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
    }
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }
  };

  const playTone = (freq: number, type: OscillatorType = "sine", dur = 0.15) => {
    if (soundMuted) return;
    initAudio();
    try {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + dur);
    } catch {}
  };

  const playGlitch = () => {
    if (soundMuted) return;
    initAudio();
    try {
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(120, ctx.currentTime);
      osc.frequency.linearRampToValueAtTime(780, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.21);
    } catch {}
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      let rawData: string | null = null;
      if (window.location.hash.includes("d=")) {
        const hashPart = window.location.hash.split("d=")[1];
        rawData = hashPart ? decodeURIComponent(hashPart.split("&")[0]) : null;
      } else {
        const params = new URLSearchParams(window.location.search);
        rawData = params.get("d");
      }

      if (rawData) {
        try {
          const decoded = decodeData(rawData) as unknown as BirthdayExePayload;
          if (decoded && decoded.girlfriendName) {
            setData(decoded);
            return;
          }
        } catch (e) {
          console.error("Decode error", e);
        }
      }

      // Default mock fallback
      setData({
        girlfriendName: "Pagal Princess",
        senderName: "Tumhara Patient Boyfriend",
        nakhreLevel: "9999+",
        gussaRate: "97%",
        cakeTagline: "AGE BADH RAHI HAI LEKIN NAKHRE ABHI BHI UNLIMITED HAIN 😂💀",
        secretLetter: `Happy Birthday meri jaan ❤️🎂\n\nPagal to tum ho hi 😂 lekin meri favourite pagal ho tum 🥹💗\n\nMain tumhe har din perfect promises nahi de sakta lekin itna zaroor keh sakta hu ki tumhari smile mere liye sabse zyada matter karti hai.\n\nTumhare sath hasi mazak karna, tumhe tang karna aur choti choti baaton par tumse ladna meri life ke wo moments hain jo mujhe genuinely khush karte hain ❤️\n\nAur haan madam ji birthday ke baad bhi nakhre thode kam kar dena... thode se... zyada nahi 😂💀❤️\n\nHappy Birthday meri jaan, meri favourite person aur meri lifetime wali headache! 💗👑😘`
      });
    }
  }, []);

  // Boot sequence timer
  useEffect(() => {
    if (!booted) {
      const t1 = setTimeout(() => { setBootStep(1); playTone(440); }, 700);
      const t2 = setTimeout(() => { setBootStep(2); playTone(520); }, 1400);
      const t3 = setTimeout(() => { setBootStep(3); playTone(660); }, 2100);
      const t4 = setTimeout(() => { setBootStep(4); playGlitch(); }, 2800);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }
  }, [booted]);

  const handleEnterUniverse = () => {
    playGlitch();
    setBooted(true);
    shootConfetti("hearts");
    shootConfetti("gold");
  };

  const handleOpenGift = () => {
    setGiftOpened(true);
    playTone(700, "triangle", 0.3);
    shootConfetti("hearts");
    setTimeout(() => {
      document.getElementById("gf-stats")?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  const quizQuestions = [
    {
      q: "Q1. Tumhara boyfriend sabse zyada kis se darta hai? 💀",
      opts: [
        { t: "Horror Movies 👻", correct: false },
        { t: "Exams & Deadlines 📚", correct: false },
        { t: "Tumhare 'HUMEIN BAAT KARNI HAI' text se 💀", correct: true, feed: "CORRECT! SHE KNOWS TOO MUCH 😭🚨" },
        { t: "Electricity Bill 😂", correct: false }
      ]
    },
    {
      q: "Q2. Agar boyfriend bole '5 minute mein aata hu' toh actual time?",
      opts: [
        { t: "Exactly 5 minutes ⏱️", correct: false },
        { t: "20+ minutes minimum 💀", correct: true, feed: "BINGO! Time dilation is real bro 😂⏳" },
        { t: "Agle janam mein 😭", correct: false }
      ]
    },
    {
      q: "Q3. Jab girlfriend bole 'I'm fine, kuch nahi hua', reality kya hai?",
      opts: [
        { t: "Sab normal hai 😌", correct: false },
        { t: "Code Red: 3rd World War shuru hone wala hai 🚨💀", correct: true, feed: "ABSOLUTELY! Worldwide emergency declared! 🤣🔥" }
      ]
    }
  ];

  const handleAnswer = (correct: boolean, feedback: string) => {
    if (correct) {
      playTone(659, "sine", 0.2);
      setQuizScore((p) => p + 1);
      setQuizFeedback(feedback);
      shootConfetti("hearts");
    } else {
      playTone(220, "sawtooth", 0.3);
      setQuizFeedback("WRONG! But she's always right anyway 😂💀");
    }

    setTimeout(() => {
      setQuizFeedback(null);
      if (quizIdx + 1 < quizQuestions.length) {
        setQuizIdx((p) => p + 1);
      } else {
        setQuizFinished(true);
      }
    }, 1200);
  };

  const slidesData = [
    { emoji: "🌹🎈", title: "The Lifetime Subscription", msg: `Happy Birthday ${data?.girlfriendName || "meri jaan"} ❤️ tum meri life ka wo software ho jise uninstall karne ka option hi nahi hai 😂💗` },
    { emoji: "💀🥊", title: "Unpaid Full-time Job", msg: "Tumse ladna meri daily routine hai aur tumhe manana meri unpaid full-time 24/7 job 😂😭❤️" },
    { emoji: "🧸💕", title: "Forever Baby Mode", msg: "Officially tum aaj ek saal badi ho gayi ho lekin mere liye tum hamesha meri choti si cute baby rahogi 🥹💗" },
    { emoji: "🎮🏆", title: "Achievement Unlocked", msg: "Achievement Unlocked: You successfully survived another year of being completely dramatic 👑🏆😂" },
    { emoji: "🌌🌹", title: "Pure Dil Se", msg: "Jokes apart baby, tum meri life ka wo part ho jise main kabhi lose nahi karna chahta ❤️🥹" }
  ];

  const handleScanDrama = () => {
    setMeterScanning(true);
    playGlitch();
    setMeterScore(null);
    setTimeout(() => {
      const results = [
        "DRAMA LEVEL: 999999% 🚨",
        "WARNING: TOO CUTE TO HANDLE 💗",
        "BOYFRIEND PATIENCE: CRITICAL 💀",
        "PRINCESS STATUS: LEGENDARY 👑"
      ];
      setMeterScore(results[Math.floor(Math.random() * results.length)]);
      setMeterScanning(false);
      shootConfetti("hearts");
    }, 1200);
  };

  const handleClaimKiss = (e: React.MouseEvent) => {
    setKissesTriggered(true);
    shootConfetti("hearts");
    shootConfetti("gold");

    const emojis = ["💋", "😘", "❤️", "🌹", "💖", "💐"];
    for (let i = 0; i < 15; i++) {
      const token = document.createElement("div");
      token.innerText = emojis[Math.floor(Math.random() * emojis.length)];
      token.style.position = "fixed";
      token.style.pointerEvents = "none";
      token.style.fontSize = "32px";
      token.style.zIndex = "999";

      const startX = e.clientX || window.innerWidth / 2;
      const startY = e.clientY || window.innerHeight * 0.7;
      token.style.left = startX + "px";
      token.style.top = startY + "px";

      const tx = (Math.random() - 0.5) * 350;
      const ty = -(Math.random() * 350 + 100);

      token.animate([
        { transform: "translate(0, 0) scale(0.5)", opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(1.6)`, opacity: 0 }
      ], {
        duration: 2000,
        easing: "ease-out",
        fill: "forwards"
      });

      document.body.appendChild(token);
      setTimeout(() => token.remove(), 2000);
    }
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#08050F] text-zinc-100 font-sans selection:bg-rose-500 selection:text-white select-none overflow-x-hidden">
      
      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-40 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-30" />

      {/* Floating Audio Controller */}
      <button
        type="button"
        onClick={() => setSoundMuted(!soundMuted)}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-black/80 px-3.5 py-1.5 text-xs font-mono text-purple-300 backdrop-blur-md shadow-xl"
      >
        {soundMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 text-purple-400 animate-pulse" />}
        <span>{soundMuted ? "Sound Off" : "Sound On"}</span>
      </button>

      {/* ========================================================
          1. FUNNY SYSTEM BOOT SCREEN
      ======================================================== */}
      {!booted ? (
        <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#06030B] px-4 text-center">
          <div className="w-full max-w-md rounded-2xl border border-purple-500/40 bg-zinc-950 p-6 font-mono text-left shadow-[0_0_50px_rgba(168,85,247,0.3)]">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-[10px] font-bold text-purple-400">GIRLFRIEND_PANIC.EXE</span>
              <span className="text-red-500 font-bold text-xs animate-pulse">OVERHEAT 🚨</span>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-zinc-400">⚡ Initializing Birthday Protocol...</p>
              {bootStep >= 1 && <p className="text-rose-300">👑 Loading Princess Attitude: 9999% Required</p>}
              {bootStep >= 2 && <p className="text-amber-300">📊 Calculating Her Drama Level: [OVERFLOW]</p>}
              {bootStep >= 3 && <p className="text-emerald-300">💸 Checking Boyfriend's Bank Balance: [₹0.00]</p>}
              {bootStep >= 4 && (
                <p className="text-red-400 font-bold bg-red-950/30 p-2 rounded-lg border border-red-500/30">
                  💀 ERROR 404: Boyfriend's Peace Not Found!
                </p>
              )}
            </div>

            {bootStep >= 4 && (
              <div className="mt-6 text-center animate-in fade-in">
                <h3 className="text-sm font-black text-white mb-4">
                  OH NOOO... IT'S HER BIRTHDAY AGAIN 💀🎂
                </h3>
                <button
                  type="button"
                  onClick={handleEnterUniverse}
                  className="cursor-pointer w-full rounded-xl bg-gradient-to-r from-pink-600 via-rose-600 to-purple-600 py-3 text-xs font-black uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  ENTER AT YOUR OWN RISK 💀💗
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* ========================================================
            THE MAIN CHAOTIC EXPERIENCE
        ======================================================== */
        <div className="mx-auto max-w-2xl px-4 py-16 space-y-16">
          
          {/* HERO SECTION */}
          <header className="text-center pt-6">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 font-mono text-[11px] font-bold uppercase mb-3">
              ALERT: EXTREME BIRTHDAY PROTOCOL 🚨
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight leading-tight">
              THE MOST DANGEROUS GIRL WAS BORN TODAY 💀👑
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-lg mx-auto">
              Happy Birthday {data.girlfriendName} ❤️😂 Aaj tumhara special day hai aur aaj main officially tumhari saari nakhre wali complaints bina kisi argument ke accept karta hu!
            </p>

            {/* 3D Gift Stage */}
            <div className="my-8 flex justify-center">
              <button
                type="button"
                onClick={handleOpenGift}
                className={`cursor-pointer group relative flex h-32 w-32 items-center justify-center rounded-3xl border-2 border-pink-500/40 bg-gradient-to-tr from-rose-950 via-purple-900 to-pink-600 shadow-[0_0_50px_rgba(255,79,163,0.35)] transition-all ${
                  giftOpened ? "rotate-12 scale-110 border-pink-400" : "hover:scale-105"
                }`}
              >
                <Gift className="h-14 w-14 text-white group-hover:animate-bounce" />
                <span className="absolute -bottom-3 rounded-full bg-pink-600 px-3 py-0.5 text-[10px] font-bold uppercase text-white shadow">
                  {giftOpened ? "UNWRAPPED 🎉" : "TAP TO OPEN 🎁"}
                </span>
              </button>
            </div>
          </header>

          {/* REPORT DASHBOARD */}
          <section id="gf-stats" className="rounded-3xl border border-pink-500/30 bg-zinc-950/80 p-6 backdrop-blur-xl shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
                CERTIFIED TELEMETRY 📊
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                OFFICIAL GIRLFRIEND REPORT 2026 📊💀
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3.5">
                <span className="text-zinc-500 block text-[10px]">NAKHRE LEVEL</span>
                <span className="text-base font-black text-pink-400">{data.nakhreLevel}</span>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3.5">
                <span className="text-zinc-500 block text-[10px]">CUTE LEVEL</span>
                <span className="text-base font-black text-rose-300">Illegal 💗</span>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3.5">
                <span className="text-zinc-500 block text-[10px]">GUSSA RATE</span>
                <span className="text-base font-black text-red-400">{data.gussaRate}</span>
              </div>
              <div className="rounded-2xl border border-zinc-800 bg-black/60 p-3.5">
                <span className="text-zinc-500 block text-[10px]">"KUCH NAHI HUA"</span>
                <span className="text-base font-black text-amber-400">0.01% Acc.</span>
              </div>
            </div>
          </section>

          {/* QUIZ SECTION */}
          <section className="rounded-3xl border border-purple-500/30 bg-zinc-950/80 p-6 shadow-xl">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest block mb-1">
              MEMORY DRILL 🧠
            </span>
            <h2 className="text-lg sm:text-xl font-black text-white mb-4">
              HOW WELL DO YOU KNOW YOUR BOYFRIEND? 💀❤️
            </h2>

            {!quizFinished ? (
              <div className="space-y-3">
                <p className="text-xs sm:text-sm font-semibold text-rose-200">
                  {quizQuestions[quizIdx].q}
                </p>
                <div className="flex flex-col gap-2">
                  {quizQuestions[quizIdx].opts.map((opt, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAnswer(opt.correct, (opt as any).feed)}
                      className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900/80 p-3 text-xs font-semibold text-left text-zinc-300 hover:border-pink-500 hover:text-white transition-colors"
                    >
                      {opt.t}
                    </button>
                  ))}
                </div>
                {quizFeedback && (
                  <p className="text-xs font-mono text-emerald-400 animate-in fade-in pt-1">
                    {quizFeedback}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4 space-y-2">
                <span className="text-4xl">🏆</span>
                <h3 className="text-base font-bold text-white">Score: {quizScore}/{quizQuestions.length}</h3>
                <p className="text-xs text-zinc-400 font-mono">
                  VERDICT: Chahe score jo bhi ho, galti boyfriend ki hi thi aur aakhri me sorry usko hi bolna hai! 😂👑
                </p>
              </div>
            )}
          </section>

          {/* CAKE & CANDLE */}
          <section className="rounded-3xl border border-pink-500/30 bg-gradient-to-b from-rose-950/20 to-black p-8 text-center shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-pink-400 font-bold">
              TIME FOR CAKE 🎂
            </span>
            <h2 className="text-2xl font-black text-white mt-1">
              HAPPY BIRTHDAY MERI PAGAL PRINCESS 🎂👑❤️
            </h2>
            <p className="text-xs text-rose-300/80 mt-1">{data.cakeTagline}</p>

            <div className="my-8 flex flex-col items-center">
              <div className="relative">
                <span className={`text-2xl block transition-all ${candleBlown ? "opacity-0 scale-50" : "animate-bounce"}`}>
                  🔥
                </span>
                <span className="text-6xl block">🎂</span>
              </div>

              {!candleBlown ? (
                <button
                  type="button"
                  onClick={() => {
                    setCandleBlown(true);
                    playTone(500);
                    shootConfetti("hearts");
                    shootConfetti("gold");
                  }}
                  className="cursor-pointer mt-6 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 px-6 py-2.5 text-xs font-black uppercase text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  BLOW THE CANDLES 🕯️💨
                </button>
              ) : (
                <div className="mt-4 rounded-xl border border-pink-500/30 bg-pink-950/30 p-3 text-xs text-pink-200 animate-in zoom-in-95 font-mono">
                  "Calories don't count on your birthday. Screenshot this before your diet starts tomorrow 😂🍰"
                </div>
              )}
            </div>
          </section>

          {/* SLIDES */}
          <section className="rounded-3xl border border-zinc-800 bg-zinc-950/80 p-6 text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
              UNFILTERED TALES OF US
            </span>

            <div className="min-h-[140px] flex flex-col items-center justify-center">
              <span className="text-4xl mb-2">{slidesData[activeSlide].emoji}</span>
              <h3 className="text-sm font-bold text-pink-400 mb-1">{slidesData[activeSlide].title}</h3>
              <p className="text-xs sm:text-sm font-serif italic text-zinc-200 leading-relaxed max-w-md">
                "{slidesData[activeSlide].msg}"
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setActiveSlide((p) => (p - 1 + slidesData.length) % slidesData.length)}
                className="cursor-pointer h-8 w-8 rounded-full border border-zinc-800 bg-black flex items-center justify-center text-xs text-zinc-300"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="text-xs font-mono text-zinc-500">{activeSlide + 1} / {slidesData.length}</span>
              <button
                type="button"
                onClick={() => setActiveSlide((p) => (p + 1) % slidesData.length)}
                className="cursor-pointer h-8 w-8 rounded-full border border-zinc-800 bg-black flex items-center justify-center text-xs text-zinc-300"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </section>

          {/* DRAMA SCANNER */}
          <section className="rounded-3xl border border-purple-500/30 bg-zinc-950 p-6 text-center shadow-xl">
            <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-widest">
              BIOMETRIC MOOD SCAN 📈
            </span>
            <h2 className="text-lg font-black text-white mt-1">MEASURING YOUR DRAMA LEVEL...</h2>

            <div className="my-6">
              <button
                type="button"
                disabled={meterScanning}
                onClick={handleScanDrama}
                className="cursor-pointer rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-3 text-xs font-black uppercase text-white shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-40"
              >
                {meterScanning ? "ANALYZING HEARTBEAT... 🌀" : "SCAN MY PERSONALITY 💀⚡"}
              </button>

              {meterScore && (
                <div className="mt-4 rounded-xl border border-purple-500/40 bg-purple-950/30 p-3 text-xs font-mono text-purple-200 animate-in fade-in">
                  {meterScore}
                </div>
              )}
            </div>
          </section>

          {/* SECRET LOVE LETTER */}
          <section className="rounded-3xl border border-rose-500/30 bg-zinc-950 p-6 text-center shadow-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold">
              MOOD SWITCH: 100% SINCERE 💌
            </span>
            <h2 className="text-xl font-black text-white mt-1">OKAY BABY... JOKES APART ❤️🥹</h2>

            {!letterRevealed ? (
              <button
                type="button"
                onClick={() => {
                  setLetterRevealed(true);
                  shootConfetti("hearts");
                }}
                className="cursor-pointer mt-6 flex flex-col items-center justify-center w-full rounded-2xl border border-dashed border-rose-500/40 bg-rose-950/20 p-8 hover:border-rose-400 transition-all"
              >
                <span className="text-4xl mb-2">💌</span>
                <span className="text-xs font-black uppercase text-white">Tap Wax Seal to Read Letter</span>
              </button>
            ) : (
              <div className="mt-6 rounded-2xl border border-rose-400/30 bg-[#160c18] p-6 text-left font-serif text-xs leading-relaxed text-zinc-200 whitespace-pre-line shadow-2xl animate-in zoom-in-95">
                {data.secretLetter}
                <div className="mt-4 pt-2 border-t border-zinc-800 text-right text-[11px] font-bold text-rose-300">
                  — {data.senderName} ❤️
                </div>
              </div>
            )}
          </section>

          {/* GRAND FINALE */}
          <section className="rounded-3xl border border-pink-500/40 bg-gradient-to-b from-[#2e0819] to-black p-8 text-center shadow-2xl">
            <span className="text-5xl animate-bounce inline-block">💖</span>
            <span className="block text-[10px] font-mono text-pink-400 uppercase tracking-widest mt-2 font-bold">
              MISSION COMPLETED 🎉
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
              PRINCESS IS NOW OFFICIALLY ONE YEAR CUTER 👑💗
            </h2>
            <p className="text-xs text-rose-200 mt-1">Happy Birthday {data.girlfriendName} ❤️🎂</p>

            <div className="mt-8 flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleClaimKiss}
                className="cursor-pointer w-full rounded-full bg-gradient-to-r from-pink-500 via-rose-600 to-amber-500 py-4 text-xs font-black uppercase tracking-widest text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                CLAIM YOUR BIRTHDAY KISS 😘💋
              </button>

              {kissesTriggered && (
                <div className="rounded-xl border border-pink-500/30 bg-pink-950/40 p-3 text-xs text-pink-200 font-mono animate-in zoom-in-95">
                  YOU HAVE WON UNLIMITED HUGS, UNLIMITED LOVE AND A BOYFRIEND WHO IS STILL TRYING TO UNDERSTAND YOU 💀❤️
                </div>
              )}

              <button
                type="button"
                onClick={() => {
                  setBooted(false);
                  setBootStep(0);
                  setGiftOpened(false);
                  setCandleBlown(false);
                }}
                className="mt-4 inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" /> Replay Whole Experience 🔄
              </button>
            </div>
          </section>

        </div>
      )}

    </main>
  );
}
