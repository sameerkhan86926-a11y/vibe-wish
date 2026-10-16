"use client";

import { useEffect, useState, useRef } from "react";
import { decodeData } from "@/lib/encoder";
import { ShaadiIdiotsPayload } from "@/lib/shaadiIdiotsTypes";
import WeddingFairyCanvas from "@/components/WeddingFairyCanvas";
import { shootConfetti } from "@/lib/confetti";
import {
  Heart, Sparkles, Volume2, VolumeX, RotateCcw,
  Share2, ChevronRight, ChevronLeft, Gift, AlertCircle, Copy, Check
} from "lucide-react";
import Link from "next/link";

const weddingChords = [
  261.63, 329.63, 392.00, 523.25, // C - E - G - C
  293.66, 369.99, 440.00, 587.33, // D - F# - A - D
  246.94, 329.63, 392.00, 493.88, // B - E - G - B
  261.63, 349.23, 440.00, 523.25  // C - F - A - C
];

export default function ShaadiIdiotsReceiver() {
  const [data, setData] = useState<ShaadiIdiotsPayload | null>(null);
  const [scene, setScene] = useState<number>(1);
  const [transitioning, setTransitioning] = useState(false);

  // Scene 1 reveal timer
  const [newsStep, setNewsStep] = useState(0);

  // Scene 3 Flower step
  const [flowerStep, setFlowerStep] = useState(0);

  // Scene 4 Starter Pack reveal state
  const [revealedCards, setRevealedCards] = useState<Record<number, boolean>>({});

  // Scene 7 Gift box state
  const [giftOpened, setGiftOpened] = useState(false);

  // Sound Engine
  const [isPlayingSound, setIsPlayingSound] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const melodyTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Share link feedback
  const [copiedLink, setCopiedLink] = useState(false);

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
          const decoded = decodeData(rawData) as unknown as ShaadiIdiotsPayload;
          if (decoded && decoded.groomName) {
            setData(decoded);
            return;
          }
        } catch (e) {
          console.error("Decode failed", e);
        }
      }

      // Default Wholesome Chaos Mock
      setData({
        groomName: "Aman",
        brideName: "Riya",
        senderName: "Your Favourite Troublemakers",
        roastLines: [
          "Groom bhai, ab gaming se zyada grocery shopping important hogi. 😂",
          "Bride madam, ab inki saari weird harkaton ka lifetime subscription officially shuru!",
          "Ab '5 minute mein aa raha hoon' bolkar 2 ghante gayab hone ka daily audit hoga. 💀",
          "Congratulations! Tum dono ko ek lifetime ka free in-house therapist mil gaya — ek doosra. 😭❤️"
        ],
        starterPack: [
          { question: "WHO'S ALWAYS RIGHT?", answer: "Bride. Agla sawal poochhiye hi mat. 😂👑" },
          { question: "WHO APOLOGIZES FIRST?", answer: "Jo pehle bhookha ho jaaye. 💀🍕" },
          { question: "WHO STEALS THE BLANKET?", answer: "Investigation abhi tak jaari hai... 🥶" },
          { question: "WHO CONTROLS THE REMOTE?", answer: "Jiske paas snacks ki plate hai, wahi asli boss." },
          { question: "WHO SAYS 'I'M NOT ANGRY'?", answer: "Wahi jisse is waqt sabse zyada darr lagna chahiye. 🚨" }
        ],
        photos: [
          {
            id: "1",
            url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=700",
            caption: "One brain cell, two proud permanent owners."
          },
          {
            id: "2",
            url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=700",
            caption: "Together, they share infinite love and absolutely zero common sense."
          },
          {
            id: "3",
            url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=700",
            caption: "Official partners in crime. Literally, one will hide the other's dessert."
          }
        ],
        heartfeltLetter: `Dear Aman & Riya,\n\nJokes aur teasing apni jagah, par aaj se tum dono ki life ka sabse khoobsurat chapter start ho raha hai.\n\nHamesha ek doosre ki respect karna, ek doosre ki baat dhyan se sunna, chhoti-chhoti baaton mein khushi dhoondhna aur mushkil waqt mein sabse mazboot sahara banna.\n\nHar din ek movie scene nahi hoga, lekin agar tum dono ek team bankar rahoge, toh ordinary moments bhi unforgettable ban jaayenge.\n\nMay your home always be filled with endless laughter, peace, random chai dates and endless barakah.\n\nAur haan, fights mein jeetna zaroori nahi hota... kabhi kabhi bas 'sorry jaan' bol dena hi shaanti laata hai. 😂❤️\n\nHAPPY MARRIED LIFE, YOU TWO BEAUTIFUL IDIOTS! 💍🌹`,
        finalWish: `May you fall in love with each other a thousand times,\nlaugh together through the weirdest kitchen experiments,\nand always find comfort in each other's silence.\n\nHere's to forever, best friends, partners,\nand two people who finally found their favourite human. ❤️\n\nSHAADI MUBARAK, AMAN & RIYA! 💍✨`
      });
    }
  }, []);

  // News intro pacing
  useEffect(() => {
    if (scene === 1) {
      const t1 = setTimeout(() => setNewsStep(1), 800);
      const t2 = setTimeout(() => setNewsStep(2), 2200);
      const t3 = setTimeout(() => setNewsStep(3), 3600);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }
  }, [scene]);

  // Audio Synthesizer
  const playTone = (freq: number, duration = 1.8) => {
    if (!audioCtxRef.current) return;
    try {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);
      gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
      gain.gain.linearRampToValueAtTime(0.07, audioCtxRef.current.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtxRef.current.destination);
      osc.start();
      osc.stop(audioCtxRef.current.currentTime + duration);
    } catch {}
  };

  const toggleMusic = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    if (audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume();
    }

    if (!isPlayingSound) {
      setIsPlayingSound(true);
      let idx = 0;
      melodyTimerRef.current = setInterval(() => {
        playTone(weddingChords[idx % weddingChords.length], 2.0);
        idx++;
      }, 800);
    } else {
      setIsPlayingSound(false);
      if (melodyTimerRef.current) clearInterval(melodyTimerRef.current);
    }
  };

  const switchScene = (nextScene: number) => {
    setTransitioning(true);
    shootConfetti("hearts");
    setTimeout(() => {
      setScene(nextScene);
      setTransitioning(false);
    }, 400);
  };

  const toggleCard = (index: number) => {
    setRevealedCards((prev) => ({
      ...prev,
      [index]: !prev[index]
    }));
    shootConfetti("gold");
  };

  const handleShare = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      navigator.share({
        title: `Shaadi Mubarak ${data?.groomName} & ${data?.brideName}! 💍`,
        text: `Check out this hilarious wedding surprise! 😂❤️`,
        url,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#11050d] text-rose-50 selection:bg-rose-500 selection:text-white select-none overflow-x-hidden font-sans">
      
      {/* Background Ambience Canvas */}
      <WeddingFairyCanvas mood={scene === 6 ? "night" : "warm"} />
      
      {/* Atmospheric Radial Gradient Layer */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(9,2,6,0.85)_100%)] z-10" />

      {/* Persistent Audio Pill */}
      <button
        type="button"
        onClick={toggleMusic}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-pink-500/30 bg-black/60 px-3.5 py-1.5 text-[11px] font-mono text-pink-300 backdrop-blur-md shadow-xl hover:border-pink-400 transition-colors"
      >
        {isPlayingSound ? <Volume2 className="h-3.5 w-3.5 text-rose-400 animate-pulse" /> : <VolumeX className="h-3.5 w-3.5" />}
        <span>{isPlayingSound ? "Wedding Bells 🎶" : "Play Music"}</span>
      </button>

      {/* Scene Progress Indicator */}
      <div className="fixed top-4 left-4 z-40 rounded-full border border-white/10 bg-black/50 px-3 py-1 text-[10px] font-mono text-zinc-400">
        CHAPTER {scene} / 8
      </div>

      <div className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 text-center transition-all duration-500 ${transitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>

        {/* ========================================================
            SCENE 1: OYE, SHAADI HO GAYI?
        ======================================================== */}
        {scene === 1 && (
          <section className="max-w-md w-full space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 via-pink-700 to-amber-500 p-1 shadow-[0_0_60px_rgba(244,63,94,0.5)] animate-pulse">
              <span className="text-5xl">💍</span>
            </div>

            <div className="space-y-3 font-serif">
              <span className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 font-mono text-xs font-bold tracking-widest animate-bounce">
                BREAKING NEWS 🚨
              </span>

              {newsStep >= 1 && (
                <h1 className="text-2xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-200 to-amber-200 leading-snug animate-in fade-in duration-500">
                  DO PAGAL LOG OFFICIALLY EK DOOSRE KE HO GAYE! 💍😂
                </h1>
              )}

              {newsStep >= 2 && (
                <p className="text-sm sm:text-base text-rose-100/90 italic animate-in fade-in duration-500">
                  "Finally bhai, kisi ne tumhari harkatein lifetime ke liye accept kar li!"
                </p>
              )}
            </div>

            {newsStep >= 2 && (
              <button
                type="button"
                onClick={() => {
                  if (!isPlayingSound) toggleMusic();
                  switchScene(2);
                }}
                className="cursor-pointer mt-6 w-full rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-8 py-4 text-xs font-mono font-bold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(225,29,72,0.4)] hover:scale-105 active:scale-95 transition-all"
              >
                OPEN YOUR WEDDING SURPRISE ❤️
              </button>
            )}
          </section>
        )}

        {/* ========================================================
            SCENE 2: THE ROASTING CEREMONY
        ======================================================== */}
        {scene === 2 && (
          <section className="max-w-md w-full rounded-3xl border border-rose-500/30 bg-[#1e0714]/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-amber-400 font-bold block mb-1">
                OFFICIAL ROASTING CEREMONY 💀
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                {data.groomName} ❤️ {data.brideName}
              </h2>
              <p className="text-xs font-mono text-rose-300/80 mt-1">
                "CONGRATULATIONS, AB TUM GAYE! 💀"
              </p>
            </div>

            <div className="space-y-3 text-left">
              {data.roastLines.map((line, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/5 bg-black/40 p-4 text-xs sm:text-sm font-sans leading-relaxed text-zinc-200 flex items-start gap-3 shadow-inner"
                >
                  <span className="text-lg shrink-0">✨</span>
                  <p>{line}</p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => switchScene(3)}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-pink-600 to-rose-600 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Time For Some Feelings 🌹
            </button>
          </section>
        )}

        {/* ========================================================
            SCENE 3: FLOWERS & FEELINGS
        ======================================================== */}
        {scene === 3 && (
          <section className="max-w-md w-full space-y-6">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full bg-rose-950/80 border border-rose-500/40 p-1 shadow-[0_0_70px_rgba(244,63,94,0.4)]">
              <span className="text-6xl animate-bounce">
                {flowerStep === 0 ? "🌹" : "🌷"}
              </span>
            </div>

            <div className="rounded-3xl border border-rose-500/30 bg-black/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl min-h-[140px] flex items-center justify-center">
              {flowerStep === 0 ? (
                <p className="font-serif text-base sm:text-xl text-rose-100 italic leading-relaxed animate-in fade-in">
                  "Jokes apart... <br />
                  Tum dono ko saath dekhkar genuinely sukoon aur khushi hoti hai. ❤️"
                </p>
              ) : (
                <p className="font-serif text-base sm:text-xl text-pink-200 italic leading-relaxed animate-in fade-in">
                  "May your life be full of love, random 2AM adventures, endless laughter aur ek doosre ke liye unlimited patience. 🥹🌷"
                </p>
              )}
            </div>

            <div className="flex gap-3">
              {flowerStep === 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setFlowerStep(1);
                    shootConfetti("hearts");
                  }}
                  className="cursor-pointer w-full rounded-full bg-rose-600 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl hover:bg-rose-500 transition-colors"
                >
                  Next Blessing 🌷
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => switchScene(4)}
                  className="cursor-pointer w-full rounded-full bg-gradient-to-r from-purple-600 to-rose-600 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
                >
                  Open Marriage Starter Pack 😂📦
                </button>
              )}
            </div>
          </section>
        )}

        {/* ========================================================
            SCENE 4: MARRIAGE STARTER PACK
        ======================================================== */}
        {scene === 4 && (
          <section className="max-w-md w-full space-y-5">
            <div className="text-center">
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
                UNOFFICIAL RULES OF HOME
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                YOUR MARRIAGE STARTER PACK 😂
              </h2>
              <p className="text-xs text-zinc-400 mt-1">Tap each card to reveal the undisputed truth</p>
            </div>

            <div className="space-y-3 text-left">
              {data.starterPack.map((card, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleCard(idx)}
                  className="cursor-pointer rounded-2xl border border-white/10 bg-zinc-950/70 p-4 transition-all hover:border-rose-400 shadow-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-rose-300">
                      {card.question}
                    </span>
                    <span className="text-xs text-zinc-500 font-mono">
                      {revealedCards[idx] ? "Hide ▲" : "Tap ▼"}
                    </span>
                  </div>

                  {revealedCards[idx] && (
                    <div className="mt-2.5 pt-2.5 border-t border-white/5 text-xs font-serif italic text-white animate-in fade-in">
                      "{card.answer}"
                    </div>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => switchScene(5)}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-rose-600 to-amber-500 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              See Couple Of The Year 📸❤️
            </button>
          </section>
        )}

        {/* ========================================================
            SCENE 5: COUPLE OF THE YEAR (POLAROID GALLERY)
        ======================================================== */}
        {scene === 5 && (
          <section className="max-w-md w-full space-y-5">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block mb-1">
                HALL OF FAME
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-white">
                THE MAIN CHARACTERS ❤️
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {data.photos.map((item) => (
                <div
                  key={item.id}
                  className="rounded-3xl bg-[#fefbf6] text-[#2b101c] p-3.5 shadow-2xl border border-white/20 transform rotate-[-0.5deg] hover:rotate-0 transition-transform"
                >
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-black mb-3">
                    <img
                      src={item.url}
                      alt={item.caption}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover filter contrast-105"
                    />
                  </div>
                  <p className="font-serif text-xs sm:text-sm italic text-center px-2 py-1 leading-relaxed">
                    "{item.caption}"
                  </p>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => switchScene(6)}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-pink-600 to-purple-600 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Read Heartfelt Letter 💌
            </button>
          </section>
        )}

        {/* ========================================================
            SCENE 6: JOKES APART, A LITTLE LOVE
        ======================================================== */}
        {scene === 6 && (
          <section className="max-w-lg w-full space-y-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-pink-300 font-bold block">
              DIL SE WISHES FOR THE NEW BEGINNING
            </span>

            <div className="rounded-3xl border border-rose-500/30 bg-[#160613]/90 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-left relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-rose-950 pb-3 mb-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                <span>WEDDING BLESSING DRAFT</span>
                <span>TO: {data.groomName} & {data.brideName}</span>
              </div>

              <div className="font-serif text-xs sm:text-sm leading-relaxed text-rose-100 whitespace-pre-line italic">
                {data.heartfeltLetter}
              </div>

              <div className="mt-6 border-t border-rose-950 pt-3 text-right text-xs font-serif text-rose-300 font-bold">
                — {data.senderName} ❤️
              </div>
            </div>

            <button
              type="button"
              onClick={() => switchScene(7)}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-white shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              Unlock Wedding Gift 🎁✨
            </button>
          </section>
        )}

        {/* ========================================================
            SCENE 7: UNLOCK YOUR WEDDING WISH
        ======================================================== */}
        {scene === 7 && (
          <section className="max-w-md w-full space-y-6 text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold block">
              ONE LAST SURPRISE... 🎁
            </span>

            {!giftOpened ? (
              <div className="rounded-3xl border border-rose-500/30 bg-black/60 p-8 backdrop-blur-xl shadow-2xl flex flex-col items-center">
                <div
                  onClick={() => {
                    setGiftOpened(true);
                    shootConfetti("hearts");
                    shootConfetti("gold");
                  }}
                  className="cursor-pointer group flex h-28 w-28 items-center justify-center rounded-3xl bg-gradient-to-tr from-rose-700 to-amber-500 shadow-[0_0_60px_rgba(225,29,72,0.5)] hover:scale-110 active:scale-95 transition-all"
                >
                  <Gift className="h-14 w-14 text-white group-hover:rotate-12 transition-transform" />
                </div>
                <p className="mt-4 text-xs font-serif text-zinc-400">
                  Tap to unwrap your final wedding blessing
                </p>
              </div>
            ) : (
              <div className="rounded-3xl border border-amber-500/40 bg-gradient-to-b from-[#240a1d] to-[#0d0208] p-6 sm:p-8 backdrop-blur-xl shadow-2xl animate-in zoom-in-95 space-y-4">
                <span className="text-4xl block">✨💍✨</span>
                <p className="font-serif text-xs sm:text-sm text-rose-100 whitespace-pre-line leading-relaxed italic">
                  {data.finalWish}
                </p>
                <button
                  type="button"
                  onClick={() => switchScene(8)}
                  className="cursor-pointer mt-4 w-full rounded-full bg-gradient-to-r from-rose-600 to-pink-600 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg"
                >
                  The Grand Finale 🎉
                </button>
              </div>
            )}
          </section>
        )}

        {/* ========================================================
            SCENE 8: THE GRAND FINALE
        ======================================================== */}
        {scene === 8 && (
          <section className="max-w-md w-full rounded-3xl border border-rose-500/40 bg-gradient-to-b from-[#29081f] via-[#14040f] to-black p-8 text-center shadow-2xl space-y-6">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-600 via-pink-600 to-amber-500 p-1 shadow-[0_0_80px_rgba(244,63,94,0.6)] animate-pulse">
              <span className="text-5xl">👑</span>
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">
                {data.groomName} ❤️ {data.brideName}
              </h1>
              <p className="mt-3 text-base sm:text-lg font-serif font-bold text-amber-300">
                LOVE YOU BOTH, YOU BEAUTIFUL IDIOTS! 😂❤️
              </p>
              <p className="mt-1 text-xs font-mono text-zinc-400">
                Forever subscribed to happiness, banter & late night snacks.
              </p>
            </div>

            <div className="flex flex-col gap-2.5 pt-2">
              <button
                type="button"
                onClick={handleShare}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
              >
                {copiedLink ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                <span>{copiedLink ? "Link Copied!" : "SHARE THE WISH 💌"}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  shootConfetti("hearts");
                  shootConfetti("gold");
                }}
                className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-rose-500/30 bg-rose-950/40 py-2.5 text-xs font-mono text-rose-200 hover:bg-rose-900/50"
              >
                <Heart className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                <span>ONE MORE HUG 🤗</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setScene(1);
                  setNewsStep(0);
                  setGiftOpened(false);
                  setRevealedCards({});
                }}
                className="cursor-pointer inline-flex items-center justify-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white pt-2"
              >
                <RotateCcw className="h-3 w-3" />
                <span>REPLAY THE CHAOS 🔁</span>
              </button>
            </div>

            <div className="pt-4 border-t border-white/5">
              <Link
                href="/create/idiots"
                className="text-[11px] font-mono text-pink-300 hover:underline"
              >
                Create this funny wedding wish for your best friends 💍
              </Link>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
