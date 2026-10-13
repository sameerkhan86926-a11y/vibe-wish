"use client";

import { useEffect, useState, useMemo } from "react";
import { decodeData } from "@/lib/encoder";
import { BirthdayPayload } from "@/lib/birthdayTypes";
import { birthdayAudio } from "@/lib/birthdayAudio";
import { shootConfetti } from "@/lib/confetti";
import {
  Sparkles, Gift, Heart, Volume2, VolumeX, Mail,
  Send, Flame, Music, Camera, Star, Award
} from "lucide-react";
import Link from "next/link";

export default function BirthdayverseExperience() {
  const [data, setData] = useState<BirthdayPayload | null>(null);
  const [unwrapped, setUnwrapped] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [surpriseRevealed, setSurpriseRevealed] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Local Wish Wall state
  const [wishes, setWishes] = useState<Array<{ name: string; msg: string; time: string }>>([]);
  const [newAuthor, setNewAuthor] = useState("");
  const [newMsg, setNewMsg] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        const decoded = decodeData(raw) as unknown as BirthdayPayload;
        setData(decoded);
      } else {
        // Fallback default rich demo
        setData({
          name: "Aarav",
          senderName: "Riya & Gang",
          theme: "luxury",
          heroHeadline: "Happiest Birthday to the Real One ✨",
          heroMessage: "May this orbit around the sun bring infinite wins, deep peace, and unforgettable moments.",
          envelopeLetter: "Dear Aarav,\n\nFrom our late-night discussions to spontaneous road trips, you have been an absolute anchor. Keep shining and never let that pure energy fade away.\n\nAlways got your back!",
          surpriseType: "gift",
          surpriseSecretNote: "Your actual present has been dispatched to your doorstep. Check your WhatsApp tonight at 12:00 for tracking!",
          memories: [
            { id: "1", imgUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600", caption: "Electric Nights & Wild Conversations", yearTag: "Chapter 1" },
            { id: "2", imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600", caption: "Chasing sunsets that never ended", yearTag: "Chapter 2" },
            { id: "3", imgUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600", caption: "Always laughing through the chaos", yearTag: "Chapter 3" }
          ]
        });
      }

      const cachedWishes = localStorage.getItem("bv_wishes");
      if (cachedWishes) {
        try { setWishes(JSON.parse(cachedWishes)); } catch {}
      } else {
        setWishes([
          { name: "Priya", msg: "Keep winning! Proud of you always 🎉", time: "Just now" },
          { name: "Kabir", msg: "Party kab de raha hai bhai? HBD! 🎂", time: "10m ago" }
        ]);
      }
    }
  }, []);

  const handleUnwrap = () => {
    setUnwrapped(true);
    birthdayAudio.play();
    shootConfetti("party");
  };

  const handleBlowCandles = () => {
    setCandlesBlown(true);
    shootConfetti("gold");
  };

  const toggleSound = () => {
    const muted = birthdayAudio.toggleMute();
    setIsMuted(muted);
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newMsg.trim()) return;
    const item = { name: newAuthor.trim(), msg: newMsg.trim(), time: "Just now" };
    const updated = [item, ...wishes];
    setWishes(updated);
    localStorage.setItem("bv_wishes", JSON.stringify(updated));
    setNewAuthor("");
    setNewMsg("");
    shootConfetti("party");
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#07070d] text-zinc-100 overflow-x-hidden selection:bg-amber-400 selection:text-black">
      {/* Floating Audio Controller */}
      {unwrapped && (
        <button
          onClick={toggleSound}
          className="fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full border border-amber-400/30 bg-black/60 px-4 py-2 text-xs font-semibold text-amber-300 backdrop-blur-xl shadow-xl transition-all hover:scale-105 active:scale-95"
        >
          {isMuted ? <VolumeX className="h-4 w-4 text-rose-400" /> : <Volume2 className="h-4 w-4 animate-pulse text-amber-400" />}
          <span>{isMuted ? "Unmute Beats" : "Birthday Melody 🎵"}</span>
        </button>
      )}

      {/* 1. CINEMATIC UNWRAP SCREEN */}
      {!unwrapped ? (
        <section className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-radial from-[#1e1338] via-[#0b0914] to-black px-4 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
          
          <div className="relative mb-8 flex h-32 w-32 items-center justify-center rounded-3xl border border-amber-400/30 bg-gradient-to-tr from-amber-500/20 via-purple-500/20 to-transparent p-5 shadow-[0_0_80px_rgba(245,158,11,0.25)] backdrop-blur-2xl">
            <Gift className="h-16 w-16 text-amber-300 animate-bounce" />
            <span className="absolute -top-2 -right-2 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex h-4 w-4 rounded-full bg-amber-500"></span>
            </span>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.3em] text-amber-400/80">
            A Celestial Surprise Awaits
          </p>
          <h1 className="mt-3 text-3xl sm:text-5xl font-black text-white tracking-tight font-serif-luxury max-w-lg">
            Someone Special Has a Surprise Waiting for You...
          </h1>

          <button
            onClick={handleUnwrap}
            className="mt-10 cursor-pointer group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-amber-400/40 bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 px-9 py-4 text-sm font-extrabold tracking-wider uppercase text-white shadow-[0_0_40px_rgba(245,158,11,0.35)] transition-all hover:scale-105 active:scale-95"
          >
            <span>UNWRAP YOUR SURPRISE 🎁</span>
            <Sparkles className="h-4 w-4 transition-transform group-hover:rotate-45" />
          </button>
        </section>
      ) : (
        /* 2. THE BIRTHDAY UNIVERSE */
        <div className="relative z-10 mx-auto max-w-4xl px-4 py-16 sm:px-6">
          
          {/* Hero Section */}
          <section className="text-center py-12">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold text-amber-300 backdrop-blur-md">
              <Star className="h-3.5 w-3.5 fill-amber-300" /> Welcome to the Celebration
            </span>

            <h1 className="mt-6 text-4xl sm:text-7xl font-black font-serif-luxury text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-rose-300 to-purple-300">
              Happy Birthday, <br />
              <span className="text-white underline decoration-amber-400/50 decoration-wavy underline-offset-8">
                {data.name}!
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-base sm:text-lg text-zinc-300 leading-relaxed font-sans-luxury">
              {data.heroMessage}
            </p>
          </section>

          {/* 3. INTERACTIVE 3D CAKE & CANDLES */}
          <section className="my-16 flex flex-col items-center">
            <div className="relative flex flex-col items-center justify-center p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-xl shadow-2xl w-full max-w-md">
              
              {/* Candles */}
              <div className="flex gap-6 mb-2">
                {[1, 2, 3].map((candleIndex) => (
                  <div key={candleIndex} className="flex flex-col items-center">
                    {!candlesBlown && (
                      <div className="h-6 w-3 rounded-full bg-gradient-to-t from-orange-500 via-yellow-400 to-white shadow-[0_0_15px_#f59e0b] animate-flame" />
                    )}
                    <div className="h-10 w-2.5 rounded-t-sm bg-gradient-to-b from-rose-300 to-rose-400 border border-white/20" />
                  </div>
                ))}
              </div>

              {/* Cake Top Tier */}
              <div className="h-14 w-44 rounded-2xl bg-gradient-to-r from-amber-100 via-rose-200 to-amber-100 border-2 border-white/40 shadow-inner flex items-center justify-center">
                <span className="text-[10px] font-bold tracking-widest text-zinc-700 uppercase">★ Sweet Wishes ★</span>
              </div>
              {/* Cake Bottom Tier */}
              <div className="-mt-1 h-20 w-60 rounded-3xl bg-gradient-to-r from-amber-200 via-rose-300 to-purple-200 border-2 border-white/40 shadow-2xl flex items-center justify-center">
                <span className="text-xs font-black tracking-widest text-zinc-800 uppercase">Special Edition</span>
              </div>

              {/* Cake Interaction */}
              <div className="mt-8 text-center">
                {!candlesBlown ? (
                  <button
                    onClick={handleBlowCandles}
                    className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-amber-400/50 bg-gradient-to-r from-amber-500 to-yellow-600 px-7 py-3 text-xs font-black uppercase tracking-wider text-black shadow-lg shadow-amber-500/20 active:scale-95 transition-transform"
                  >
                    <Flame className="h-4 w-4" /> Make a Wish & Blow Candles ✨
                  </button>
                ) : (
                  <div className="rounded-2xl border border-emerald-500/40 bg-emerald-950/20 p-4 text-emerald-300 text-xs font-medium animate-in fade-in zoom-in-95">
                    🎉 Wish captured into the stars! May all your desires manifest this year.
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 4. MEMORY ARCHIVE */}
          <section className="my-20">
            <div className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400">Chapters & Milestones</span>
              <h2 className="mt-2 text-3xl font-black font-serif-luxury text-white">Our Beautiful Memories</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {data.memories.map((mem) => (
                <div
                  key={mem.id}
                  className="group relative rounded-3xl border border-zinc-800 bg-zinc-900/50 p-4 backdrop-blur-xl shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-amber-400/40"
                >
                  <div className="relative aspect-4/3 overflow-hidden rounded-2xl bg-zinc-800">
                    <img src={mem.imgUrl} alt={mem.caption} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    {mem.yearTag && (
                      <span className="absolute top-2 right-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] font-mono text-amber-300 border border-white/10">
                        {mem.yearTag}
                      </span>
                    )}
                  </div>
                  <p className="mt-3 text-xs font-medium text-zinc-300 leading-snug">{mem.caption}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 5. A HEARTFELT PERSONALIZED LETTER */}
          <section className="my-20 flex flex-col items-center">
            <div className="w-full max-w-xl text-center">
              <span className="text-xs font-mono uppercase tracking-widest text-rose-400">Personal Parchment</span>
              <h2 className="mt-2 text-3xl font-black font-serif-luxury text-white">A Little Letter Just for You 💌</h2>

              <div className="mt-8">
                {!envelopeOpen ? (
                  <button
                    onClick={() => setEnvelopeOpen(true)}
                    className="cursor-pointer group flex flex-col items-center justify-center w-full rounded-3xl border-2 border-dashed border-rose-400/40 bg-rose-950/20 p-10 hover:border-rose-400 transition-all"
                  >
                    <Mail className="h-12 w-12 text-rose-400 group-hover:scale-110 transition-transform" />
                    <span className="mt-3 text-sm font-bold text-white">Tap to Break Seal & Unfold Note</span>
                  </button>
                ) : (
                  <div className="rounded-3xl border border-amber-300/30 bg-[#16141a] p-8 text-left shadow-2xl relative animate-in fade-in zoom-in-95">
                    <div className="absolute top-4 right-4 text-xs font-mono text-zinc-500">PRIVATE & CONFIDENTIAL</div>
                    <p className="font-serif-luxury text-sm leading-relaxed text-zinc-200 whitespace-pre-line">
                      {data.envelopeLetter}
                    </p>
                    <div className="mt-6 border-t border-zinc-800 pt-4 flex justify-between items-center text-xs text-zinc-400">
                      <span>Written with love</span>
                      <span className="font-bold text-amber-300">— {data.senderName}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* 6. ONE LAST SURPRISE */}
          <section className="my-20 flex flex-col items-center text-center">
            <div className="w-full max-w-md rounded-3xl border border-purple-500/30 bg-gradient-to-b from-purple-950/30 to-zinc-950 p-8 shadow-2xl">
              <Award className="mx-auto h-10 w-10 text-purple-400" />
              <h3 className="mt-3 text-2xl font-bold font-serif-luxury text-white">One Last Surprise...</h3>
              <p className="mt-1 text-xs text-zinc-400">A hidden token kept just for the finale.</p>

              {!surpriseRevealed ? (
                <button
                  onClick={() => {
                    setSurpriseRevealed(true);
                    shootConfetti("hearts");
                  }}
                  className="cursor-pointer mt-6 w-full rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-xl hover:opacity-90 active:scale-95 transition-transform"
                >
                  Tap to Discover Your Gift ✨
                </button>
              ) : (
                <div className="mt-6 rounded-2xl border border-purple-400/40 bg-black/60 p-5 text-left text-xs leading-relaxed text-purple-200">
                  <p className="font-semibold text-white">🎁 Revealed Surprise:</p>
                  <p className="mt-1 whitespace-pre-line">{data.surpriseSecretNote}</p>
                </div>
              )}
            </div>
          </section>

          {/* 7. WISH WALL */}
          <section className="my-20">
            <div className="text-center mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">Guest Wall</span>
              <h2 className="mt-1 text-3xl font-black font-serif-luxury text-white">Write Your Blessing</h2>
            </div>

            {/* Form */}
            <form onSubmit={handleAddWish} className="mb-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 flex flex-col gap-3">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={newAuthor}
                onChange={(e) => setNewAuthor(e.target.value)}
                className="rounded-xl border border-zinc-800 bg-black px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
              <textarea
                placeholder="Write a sweet birthday wish..."
                required
                rows={2}
                value={newMsg}
                onChange={(e) => setNewMsg(e.target.value)}
                className="rounded-xl border border-zinc-800 bg-black px-4 py-2.5 text-xs text-white focus:border-amber-400 focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer flex items-center justify-center gap-1.5 rounded-xl bg-amber-400 py-2.5 text-xs font-bold text-black hover:bg-amber-300"
              >
                <Send className="h-3.5 w-3.5" /> Post on Wish Wall
              </button>
            </form>

            {/* List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {wishes.map((w, idx) => (
                <div key={idx} className="rounded-2xl border border-zinc-800/80 bg-zinc-900/30 p-4">
                  <div className="flex justify-between items-center text-[11px] text-zinc-500 mb-1">
                    <span className="font-bold text-amber-300">{w.name}</span>
                    <span>{w.time}</span>
                  </div>
                  <p className="text-xs text-zinc-300">{w.msg}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Viral Footer */}
          <footer className="mt-20 border-t border-zinc-900 pt-8 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-5 py-2 text-xs text-zinc-400 hover:text-white transition-colors"
            >
              <span>✨ Built with Birthdayverse</span>
              <span>•</span>
              <span className="text-amber-400 font-bold">Create one for your favorite person</span>
            </Link>
          </footer>
        </div>
      )}
    </main>
  );
}
