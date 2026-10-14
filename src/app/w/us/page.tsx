"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { UsExePayload } from "@/lib/usExeTypes";
import { shootConfetti } from "@/lib/confetti";
import {
  Heart, Sparkles, Terminal, Activity, MessageCircle,
  Clock, Lock, Unlock, Send, ShieldAlert, Award, Smile,
  Sliders, Eye, CheckCircle2, ChevronRight
} from "lucide-react";
import Link from "next/link";

export default function UsExeExperience() {
  const [data, setData] = useState<UsExePayload | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [annoyNotice, setAnnoyNotice] = useState(false);

  // OS Diagnostic state
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(false);

  // Chat Mood Simulator
  const [chatMood, setChatMood] = useState<"flirty" | "fight" | "missing">("flirty");

  // Jealousy Simulator
  const [jealousReaction, setJealousReaction] = useState<string | null>(null);

  // Missing You Meter
  const [missLevel, setMissLevel] = useState(80);

  // Compatibility Quiz
  const [quizAnswers, setQuizAnswers] = useState<{ [key: string]: string }>({});
  const [quizDone, setQuizDone] = useState(false);

  // Vault Letter
  const [vaultUnlocked, setVaultUnlocked] = useState(false);

  // Future Time Capsule
  const [futureCapsule, setFutureCapsule] = useState("");
  const [capsuleSealed, setCapsuleSealed] = useState(false);

  // Finale Hug
  const [hugDelivered, setHugDelivered] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        setData(decodeData(raw) as unknown as UsExePayload);
      } else {
        // High-end sample demo
        setData({
          name1: "Aarav",
          name2: "Ananya",
          anniversaryDate: "14 Feb 2023",
          secretLetter: `Maybe I don't always find the perfect words.\n\nMaybe sometimes I tease you when I should simply be giving you a tight hug.\n\nMaybe we have silly arguments over food and sleep schedules that won't matter tomorrow.\n\nBut somewhere between our late night talks, stupid jokes, small fights, and random walks, you became my absolute home. I would choose an ordinary day with you over anything else in this world.\n\nI'm so glad our stars collided. ❤️`,
          chapters: [
            { id: "1", tag: "CHAPTER 01", title: "The Beginning ✨", subtitle: "Two strangers. One unexpected collision.", note: "Neither of us knew that a casual conversation would turn into a lifetime habit." },
            { id: "2", tag: "CHAPTER 02", title: "The Talking Stage 👀", subtitle: "Both pretending not to be attached. Absolutely failing! 😂", note: "Late night texts disguised as 'I'm not sleepy anyway'." },
            { id: "3", tag: "CHAPTER 03", title: "First Unforgettable Date 🥹", subtitle: "A memory that deserves its own galaxy.", note: "The butterflies were real, and so was the nervousness!" },
            { id: "4", tag: "CHAPTER 04", title: "Our Silly Fights 🤣", subtitle: "'Nothing is wrong' (meaning: everything is wrong).", note: "Fighting for 10 minutes, then laughing because we forgot what we were fighting about." },
            { id: "5", tag: "CHAPTER 05", title: "The Favourite Memories 📸", subtitle: "Moments that froze time.", note: "Chasing sunsets, sharing songs, and surviving each other's mood swings." },
            { id: "6", tag: "CHAPTER 06", title: "Our Future 💍", subtitle: "Infinite laughter, more adventures, forever Us.", note: "To choosing each other on the best days and on the tough ones." }
          ]
        });
      }
    }
  }, []);

  const handleEnter = () => {
    setHasEntered(true);
    shootConfetti("hearts");
  };

  const runDiagnostic = () => {
    setIsScanning(true);
    setScanResult(false);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(true);
    }, 1800);
  };

  const handleHug = () => {
    setHugDelivered(true);
    shootConfetti("hearts");
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#07050e] text-zinc-100 selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* ========================================================
          1. THE SECRET UNIVERSE (PORTAL SCREEN)
      ======================================================== */}
      {!hasEntered ? (
        <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#1e0e2d] via-[#0b0514] to-black px-4 text-center">
          {/* Two orbiting planetary bodies */}
          <div className="relative mb-8 flex h-36 w-36 items-center justify-center">
            <div className="absolute h-10 w-10 rounded-full bg-gradient-to-tr from-rose-500 to-pink-300 shadow-[0_0_30px_#f43f5e] animate-pulse" />
            <div className="absolute h-6 w-6 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-300 shadow-[0_0_20px_#a855f7] animate-ping" />
            <div className="h-32 w-32 rounded-full border border-dashed border-rose-400/30 animate-spin" style={{ animationDuration: "14s" }} />
          </div>

          <span className="font-mono text-xs uppercase tracking-[0.3em] text-rose-300/80">
            Coordinates: Dimension US.exe
          </span>

          <h1 className="mt-3 text-2xl sm:text-4xl font-black text-white max-w-md font-serif-luxury leading-tight">
            Somewhere in this enormous universe... <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300">
              Two idiots accidentally became each other's favourite person. ❤️😂
            </span>
          </h1>

          <div className="mt-8 flex flex-col sm:flex-row items-center gap-3.5 w-full max-w-sm">
            <button
              onClick={handleEnter}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 py-3.5 text-xs font-black tracking-widest uppercase text-white shadow-[0_0_35px_rgba(244,63,94,0.4)] transition-all hover:scale-105 active:scale-95"
            >
              ENTER OUR UNIVERSE 💗
            </button>
            <button
              onClick={() => setAnnoyNotice(true)}
              className="cursor-pointer w-full rounded-full border border-zinc-700 bg-zinc-900/60 py-3.5 text-xs font-bold text-zinc-400 hover:text-white transition-colors"
            >
              I'M JUST HERE TO ANNOY YOU 😂
            </button>
          </div>

          {annoyNotice && (
            <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-300 font-mono animate-in fade-in">
              ⚠️ SYSTEM ALERT: Annoyance module denied! You love this idiot too much to leave! 😜❤️
            </div>
          )}
        </section>
      ) : (
        /* ========================================================
            THE FULL OPERATING SYSTEM & WORLD
        ======================================================== */
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6">

          {/* Universe Header */}
          <header className="text-center py-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/20 px-4 py-1.5 text-xs font-mono text-rose-300 mb-4 backdrop-blur-md">
              <Terminal className="h-3.5 w-3.5" />
              <span>US.exe v2.0 • PRIVATE FREQUENCY</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black font-serif-luxury text-white">
              {data.name1} <span className="text-rose-500">❤️</span> {data.name2}
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-zinc-400 font-mono">
              An unnecessarily beautiful love story. Running infinitely. 😂❤️
            </p>
          </header>

          {/* ========================================================
              2. THE RELATIONSHIP OPERATING SYSTEM DASHBOARD
          ======================================================== */}
          <section className="my-12 rounded-3xl border border-rose-500/20 bg-gradient-to-b from-[#150d24] to-[#0c0715] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4 mb-6">
              <span className="flex items-center gap-2 font-mono text-xs font-bold text-rose-300">
                <Activity className="h-4 w-4 text-rose-400 animate-pulse" />
                RELATIONSHIP TELEMETRY MONITOR
              </span>
              <span className="rounded bg-rose-500/20 px-2.5 py-0.5 font-mono text-[10px] text-rose-300 border border-rose-500/30">
                STATUS: SYNCED
              </span>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">
              {[
                { label: "LOVE LEVEL", val: "100% MAXIMUM", col: "text-rose-400" },
                { label: "CUTE FIGHTS", val: "UNLIMITED 😂", col: "text-amber-400" },
                { label: "MISSING YOU", val: "CRITICAL 🚨", col: "text-red-400" },
                { label: "JEALOUSY MODE", val: "SOMETIMES ACTIVE 👀", col: "text-purple-400" },
                { label: "HUG REQUIREMENT", val: "IMMEDIATE 🤗", col: "text-emerald-400" },
                { label: "LIFETIME PASS", val: "ACTIVE 💍", col: "text-pink-300" }
              ].map((m) => (
                <div key={m.label} className="rounded-2xl border border-zinc-800/80 bg-black/40 p-3.5">
                  <p className="text-[10px] font-mono uppercase text-zinc-500">{m.label}</p>
                  <p className={`text-xs sm:text-sm font-black font-mono mt-1 ${m.col}`}>{m.val}</p>
                </div>
              ))}
            </div>

            {/* Run Diagnostic CTA */}
            <div className="mt-6 text-center">
              <button
                onClick={runDiagnostic}
                disabled={isScanning}
                className="cursor-pointer inline-flex items-center gap-2 rounded-xl bg-zinc-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-zinc-700 active:scale-95 transition-all"
              >
                {isScanning ? (
                  <>
                    <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>Analyzing Heartwaves...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="h-3.5 w-3.5 text-rose-400" />
                    <span>RUN RELATIONSHIP DIAGNOSTIC 🔍</span>
                  </>
                )}
              </button>

              {scanResult && (
                <div className="mt-4 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-4 text-left text-xs font-mono leading-relaxed text-emerald-200 animate-in fade-in">
                  <p className="font-bold text-white mb-1">SCAN COMPLETE ✅</p>
                  <p>• <b>Diagnosis:</b> Two emotionally attached humans with a suspicious addiction to each other.</p>
                  <p className="mt-1">• <b>Recommended Treatment:</b> One warm hug, three forehead kisses, endless talks, and zero unnecessary overthinking. 😂❤️</p>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================
              3. THE COUPLE CHAT (REALISTIC MOOD BRANCHES)
          ======================================================== */}
          <section className="my-16">
            <div className="text-center mb-6">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400">Archived Signals</span>
              <h2 className="text-2xl sm:text-3xl font-black text-white">The Couple Frequency 💬</h2>
            </div>

            {/* Mood Selectors */}
            <div className="flex justify-center gap-2 mb-4">
              {[
                { id: "flirty", label: "Flirty Mode 😏" },
                { id: "fight", label: "Cute Fight Mode 😂" },
                { id: "missing", label: "Missing You Mode 🥹" }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setChatMood(m.id as any)}
                  className={`cursor-pointer rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                    chatMood === m.id
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/30"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            {/* Chat Frame */}
            <div className="mx-auto max-w-md rounded-3xl border border-zinc-800 bg-[#0d0914] p-5 shadow-2xl space-y-3 font-sans">
              {chatMood === "flirty" && (
                <>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      Sunnooo 👀
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-xs text-white">
                      Kya hua ab? 😂
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      Kuch nahi, bas tumhari yaad aa rahi thi. ❤️
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-xs text-white">
                      Achha ji, pakka kuch kaam hoga! 🤨😂
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      Haan, tumhe pareshan karne ka. 😌💗
                    </div>
                  </div>
                </>
              )}

              {chatMood === "fight" && (
                <>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      I'm totally fine. 🙃
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-xs text-white">
                      Code Red! Fullstop lag gaya sentence ke aage! 🚨😭
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      Tumhe toh meri parwah hi nahi hai! 😤
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-xs text-white">
                      Achha ice cream khilaun? 🍦👀
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      ...Chocolate wali laana. Abhi gussa hoon par! 😂❤️
                    </div>
                  </div>
                </>
              )}

              {chatMood === "missing" && (
                <>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      Kahan ho tum? 🥹
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-xs text-white">
                      Yahi hoon, bas tumhari story dekh raha tha ❤️
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-xs text-zinc-200 border border-zinc-800">
                      Jaldi aao na, hug karna hai 🥺🫂
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>

          {/* ========================================================
              4. THE LOVE STORY TIME MACHINE (CHAPTERS)
          ======================================================== */}
          <section className="my-16">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400">Chronological Orbit</span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif-luxury text-white">Our Story Time Machine ⏳💕</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.chapters.map((ch) => (
                <div
                  key={ch.id}
                  className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xl shadow-lg hover:border-rose-500/40 transition-colors"
                >
                  <span className="font-mono text-[10px] text-rose-400 font-bold uppercase tracking-wider">{ch.tag}</span>
                  <h3 className="text-base font-bold text-white mt-1">{ch.title}</h3>
                  <p className="text-xs text-zinc-300 mt-1 italic font-medium">{ch.subtitle}</p>
                  <p className="text-xs text-zinc-400 mt-3 leading-relaxed border-t border-zinc-800/60 pt-3">{ch.note}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ========================================================
              5. THE JEALOUSY SIMULATOR 😂🔥
          ======================================================== */}
          <section className="my-16 rounded-3xl border border-amber-500/30 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 mb-2">
              <ShieldAlert className="h-4 w-4" /> THE JEALOUSY STRESS TEST 🚨
            </div>
            <h3 className="text-lg font-black text-white">
              YOUR PARTNER CASUALLY SAID: "Oh, they're JUST A FRIEND." 👀
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Select your immediate natural instinct:</p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { key: "a", label: "A. Okay, cool. 😌", resp: "Lies detected! You're already zooming into their profile picture from 2019! 😂🕵️" },
                { key: "b", label: "B. JUST A FRIEND? EXPLAIN. 😂", resp: "FBI interrogation started! Name, address, and birth certificate demanded! 🚨🤣" },
                { key: "c", label: "C. PowerPoint Presentation Now! 📊", resp: "Correct answer! 10 slides explaining why you are their only best friend required! 📈❤️" }
              ].map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => setJealousReaction(opt.resp)}
                  className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-xs font-bold text-left text-zinc-200 hover:border-amber-400 transition-colors"
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {jealousReaction && (
              <div className="mt-4 rounded-2xl border border-amber-500/40 bg-amber-950/20 p-4 text-xs font-mono text-amber-200 leading-relaxed animate-in fade-in">
                {jealousReaction}
                <p className="mt-2 text-[10px] text-zinc-400">Relax, detective! You own 100% of their heart anyway. ❤️</p>
              </div>
            )}
          </section>

          {/* ========================================================
              6. THE MISSING YOU METER 🥺💗
          ======================================================== */}
          <section className="my-16 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 via-zinc-950 to-black p-6 sm:p-8 text-center shadow-2xl">
            <Heart className="mx-auto h-8 w-8 text-rose-400 animate-pulse fill-rose-500" />
            <h3 className="mt-2 text-2xl font-black text-white font-serif-luxury">The Missing You Meter 🥺</h3>
            <p className="mt-1 text-xs text-zinc-300">
              "Distance is just a number... but missing you? That's an overtime full-time job."
            </p>

            <div className="mx-auto mt-6 max-w-sm">
              <div className="flex justify-between text-xs font-mono text-rose-300 mb-2">
                <span>Little Bit</span>
                <span className="font-bold">{missLevel}% NEED CUDDLES</span>
                <span>Unbearable!</span>
              </div>
              <input
                type="range"
                min="10"
                max="100"
                value={missLevel}
                onChange={(e) => setMissLevel(Number(e.target.value))}
                className="w-full accent-rose-500 cursor-pointer"
              />
            </div>

            {missLevel >= 90 && (
              <div className="mt-5 mx-auto max-w-md rounded-2xl border border-rose-500/40 bg-rose-950/40 p-3.5 text-xs text-rose-200 font-mono animate-in zoom-in-95">
                🚨 WARNING: EXTREME CUDDLE DEFICIENCY DETECTED!
                <p className="mt-0.5 text-[11px] text-zinc-300">Immediate solution: Send them this link and demand one unlimited virtual hug. 🤗❤️</p>
              </div>
            )}
          </section>

          {/* ========================================================
              7. THE COUPLE COMPATIBILITY QUIZ
          ======================================================== */}
          <section className="my-16 rounded-3xl border border-purple-500/30 bg-zinc-950 p-6 sm:p-8 shadow-2xl">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-purple-400 mb-2">
              <Award className="h-4 w-4" /> THE UNBIASED COMPATIBILITY ALGORITHM 🎮💘
            </div>
            <h3 className="text-xl font-black text-white">Who is guilty of what?</h3>
            <p className="text-xs text-zinc-400 mt-0.5">Answer truthfully without starting a fight! 😂</p>

            <div className="mt-5 space-y-4">
              {[
                { q: "Who gets angry first over small things?", id: "q1" },
                { q: "Who steals 90% of the blanket at night?", id: "q2" },
                { q: "Who says 'I'm fine' when they're obviously dramatic?", id: "q3" },
                { q: "Who falls asleep 5 minutes into the movie?", id: "q4" }
              ].map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800/80 pb-3 gap-2">
                  <span className="text-xs text-zinc-300 font-medium">{item.q}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQuizAnswers({ ...quizAnswers, [item.id]: data.name1 })}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        quizAnswers[item.id] === data.name1
                          ? "bg-rose-500 text-white"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {data.name1}
                    </button>
                    <button
                      onClick={() => setQuizAnswers({ ...quizAnswers, [item.id]: data.name2 })}
                      className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                        quizAnswers[item.id] === data.name2
                          ? "bg-purple-600 text-white"
                          : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {data.name2}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setQuizDone(true)}
                className="cursor-pointer rounded-full bg-gradient-to-r from-purple-500 to-rose-500 px-6 py-2.5 text-xs font-black uppercase text-white shadow-lg active:scale-95"
              >
                GENERATE VERDICT 📋
              </button>

              {quizDone && (
                <div className="mt-5 rounded-2xl border border-purple-500/40 bg-purple-950/20 p-4 text-xs font-mono text-purple-200 leading-relaxed text-left animate-in fade-in">
                  <p className="font-bold text-white mb-1">OFFICIAL VERDICT ISSUED:</p>
                  <p>• <b>Romance:</b> 100% High Voltage 💗</p>
                  <p>• <b>Drama Level:</b> Bollywood/Cinematic 🎬</p>
                  <p>• <b>Roasting Skills:</b> Highly Professional 😂</p>
                  <p>• <b>Teamwork:</b> Absolutely Unbeatable Together 🤝❤️</p>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================
              8. THE SECRET LOVE VAULT 🔐💌
          ======================================================== */}
          <section className="my-16 flex flex-col items-center text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400">CLASSIFIED VAULT</span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif-luxury text-white mt-1">
              Something I Don't Say Often Enough...
            </h2>

            <div className="w-full max-w-lg mt-6">
              {!vaultUnlocked ? (
                <button
                  onClick={() => {
                    setVaultUnlocked(true);
                    shootConfetti("hearts");
                  }}
                  className="cursor-pointer group flex flex-col items-center justify-center w-full rounded-3xl border-2 border-dashed border-rose-500/40 bg-rose-950/20 p-10 hover:border-rose-400 transition-all shadow-xl"
                >
                  <Lock className="h-10 w-10 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="mt-3 text-xs font-black uppercase tracking-wider text-white">TAP TO UNLOCK PRIVATE LETTER 💌</span>
                </button>
              ) : (
                <div className="rounded-3xl border border-rose-400/30 bg-[#140e1e] p-6 sm:p-8 text-left shadow-2xl animate-in zoom-in-95">
                  <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-3">
                    <Unlock className="h-3.5 w-3.5 text-rose-400" /> DECRYPTED FOR YOUR EYES ONLY
                  </div>
                  <div className="font-serif-luxury text-sm leading-relaxed text-zinc-200 whitespace-pre-line">
                    {data.secretLetter}
                  </div>
                  <div className="mt-6 border-t border-zinc-800 pt-3 text-right text-xs text-rose-400 font-bold">
                    Forever Yours, {data.name1} ❤️
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================
              9. FUTURE TIME CAPSULE
          ======================================================== */}
          <section className="my-16 rounded-3xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-400 mb-1">
              <Clock className="h-4 w-4" /> THE TIME CAPSULE TO OUR FUTURE SELVES 🌠
            </div>
            <p className="text-xs text-zinc-400">Write a sweet promise or memory to read in the years to come:</p>

            {!capsuleSealed ? (
              <div className="mt-4 space-y-3">
                <textarea
                  rows={3}
                  value={futureCapsule}
                  onChange={(e) => setFutureCapsule(e.target.value)}
                  placeholder="e.g. Promise we will always make time for spontaneous ice cream dates, no matter how busy life gets..."
                  className="w-full rounded-2xl border border-zinc-800 bg-black/70 p-3.5 text-xs text-zinc-200 focus:border-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => {
                    if (futureCapsule.trim()) {
                      localStorage.setItem("us_capsule", futureCapsule);
                      setCapsuleSealed(true);
                    }
                  }}
                  className="cursor-pointer rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-indigo-500"
                >
                  SEAL OUR MESSAGE 💌
                </button>
              </div>
            ) : (
              <div className="mt-4 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-4 text-xs font-mono text-indigo-200">
                🔒 Sealed into your browser's private time vault: "{futureCapsule}"
              </div>
            )}
          </section>

          {/* ========================================================
              10. THE FINAL HEART MELTING SURPRISE & HUG
          ======================================================== */}
          <section className="my-20 text-center rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#220d2c] via-[#100717] to-black p-8 sm:p-12 shadow-[0_0_80px_rgba(244,63,94,0.25)]">
            <span className="text-5xl animate-bounce">🌌❤️✨</span>
            <h2 className="mt-4 text-2xl sm:text-4xl font-black font-serif-luxury text-white">
              {data.name1} ❤️ {data.name2}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-rose-100/90 leading-relaxed font-sans">
              "Out of billions of people and countless possible stories, somehow our paths crossed. Our story doesn't have to be flawless to be beautiful. Because today, tomorrow, and every day after that... you are my favourite part of this life."
            </p>

            <div className="mt-8">
              {!hugDelivered ? (
                <button
                  onClick={handleHug}
                  className="cursor-pointer group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-purple-600 px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  <Heart className="h-4 w-4 fill-white animate-pulse" />
                  <span>ONE LAST HUG? 🤗</span>
                </button>
              ) : (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/30 p-4 text-xs font-mono text-emerald-300 animate-in zoom-in-95">
                  <p className="font-bold text-sm">VIRTUAL HUG DELIVERED SUCCESSFULLY! 😂💗</p>
                  <p className="mt-1 text-zinc-300">Physical delivery pending. Please meet in person immediately! 🤣❤️</p>
                </div>
              )}
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-20 border-t border-zinc-900 pt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-5 py-2 text-xs text-zinc-400 hover:text-white"
            >
              <span>⚡ Made with US.exe</span>
              <span>•</span>
              <span className="text-rose-400 font-bold">Build one for your partner</span>
            </Link>
          </footer>

        </div>
      )}

    </main>
  );
}
