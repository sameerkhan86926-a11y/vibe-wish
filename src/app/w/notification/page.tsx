"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { NotificationAnniversaryPayload, CameraRollPhoto } from "@/lib/notificationTypes";
import NotificationGardenCanvas from "@/components/NotificationGardenCanvas";
import { shootConfetti } from "@/lib/confetti";
import {
  Bell, Heart, Sparkles, ChevronRight, ChevronLeft,
  Volume2, VolumeX, MessageCircle, Music, Flame,
  Camera, RotateCcw, Share2, Flower2, Check
} from "lucide-react";
import Link from "next/link";

export default function NotificationAnniversaryReceiver() {
  const [data, setData] = useState<NotificationAnniversaryPayload | null>(null);
  const [scene, setScene] = useState<number>(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Scene 1 pacing
  const [launchStep, setLaunchStep] = useState(0);

  // Scene 3 Flower Tea state
  const [selectedTeaFlower, setSelectedTeaFlower] = useState<string | null>("rose");

  // Scene 4 Chat state
  const [chatIdx, setChatIdx] = useState(1);

  // Scene 5 Wrapped active index
  const [wrappedIdx, setWrappedIdx] = useState(0);

  // Scene 6 Camera Roll Modal
  const [activePhoto, setActivePhoto] = useState<CameraRollPhoto | null>(null);

  // Scene 7 Love Language mode
  const [loveLanguageMode, setLoveLanguageMode] = useState<"romantic" | "softie" | "chaotic">("romantic");

  // Scene 8 Letter skip
  const [showFullLetter, setShowFullLetter] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        setData(decodeData(raw) as unknown as NotificationAnniversaryPayload);
      } else {
        // High quality default Gen Z payload
        setData({
          partnerName: "Anya",
          senderName: "Dev",
          specialDate: "18 October",
          chatDialogues: [
            { sender: "you", text: "khana khaya? 🍕", time: "23:14" },
            { sender: "them", text: "haan", time: "23:14" },
            { sender: "you", text: "achha kya khaya?", time: "23:15" },
            { sender: "them", text: "tumhara dimaag 🧠💀", time: "23:15" },
            { sender: "you", text: "happy anniversary to me, i guess 💀❤️", time: "23:16" },
            { sender: "them", text: "love you pookie, hamesha aise hi pareshan karungi 💅🥰", time: "23:16" }
          ],
          wrappedStats: [
            { label: "FAVOURITE PERSON", value: "YOU ♡", sub: "Out of 8 billion NPCs on earth", accent: "from-rose-500 to-pink-600" },
            { label: "MOST REPLAYED MEMORY", value: "THAT ONE 2AM CALL", sub: "Where we laughed till our stomach hurt", accent: "from-purple-500 to-indigo-600" },
            { label: "COMFORT LEVEL", value: "1000000%", sub: "Zero filter, zero embarrassment", accent: "from-amber-500 to-rose-500" },
            { label: "MOST USED WORD", value: "OYEEE 🗣️", sub: "Spammed over 4,200 times this year", accent: "from-emerald-500 to-teal-600" },
            { label: "ARGUMENTS RESOLVED BY", value: "FOOD + CUDDLES", sub: "Success rate: 100% undisputed", accent: "from-pink-500 to-rose-600" },
            { label: "LIFETIME STATUS", value: "STILL MY FAVOURITE NOTIFICATION", sub: "Forever subscribed without cancellation policy", accent: "from-rose-600 to-amber-500" }
          ],
          cameraRoll: [
            { id: "1", imgUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=700", caption: "the day everything felt different.", dateTag: "First Date" },
            { id: "2", imgUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=700", caption: "this was such a random day but i love it so much.", dateTag: "Street Chai" },
            { id: "3", imgUrl: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=700", caption: "proof that we are actually so unserious 💀", dateTag: "Chaos 101" },
            { id: "4", imgUrl: "https://images.unsplash.com/photo-1494774157365-9e04c6720e47?w=700", caption: "one of my favourite versions of this life with you.", dateTag: "Golden Hour" }
          ],
          blushingLetter: `lowkey, i don't think you understand how special you are to me.\n\nit's not just the big aesthetic moments.\n\nit's the random 3am reels.\nthe stupid inside jokes nobody else gets.\nthe little things you remember even when i forget.\nthe comfort of knowing you're always one text away.\n\ni don't need every day to be a movie scene.\n\ni just want more little, messy, beautiful moments with you.\n\nhappy anniversary, my favourite human. ♡`,
          finalVow: `new memories.\nnew inside jokes.\nnew little adventures.\nsame favourite person.\n\nstill choosing you. still grateful for you.\nand yes, you're still my favourite notification. ❤️‍🩹`
        });
      }
    }
  }, []);

  // Scene 1 timing progression
  useEffect(() => {
    if (scene === 1) {
      const t1 = setTimeout(() => setLaunchStep(1), 1200);
      const t2 = setTimeout(() => setLaunchStep(2), 2400);
      const t3 = setTimeout(() => setLaunchStep(3), 3600);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [scene]);

  // Scene 4 Auto Pacing for Chat
  useEffect(() => {
    if (scene === 4 && data) {
      if (chatIdx < data.chatDialogues.length) {
        const timer = setTimeout(() => {
          setChatIdx((prev) => prev + 1);
        }, 1300);
        return () => clearTimeout(timer);
      }
    }
  }, [scene, chatIdx, data]);

  const switchScene = (targetScene: number) => {
    setIsTransitioning(true);
    shootConfetti("hearts");
    setTimeout(() => {
      setScene(targetScene);
      setIsTransitioning(false);
    }, 450);
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#090306] text-zinc-100 font-sans selection:bg-rose-500 selection:text-white select-none overflow-x-hidden">
      
      {/* Background Ambience */}
      <NotificationGardenCanvas mood={scene === 5 ? "sunset" : scene === 8 ? "softPink" : "burgundy"} />
      
      {/* Film grain layer overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] z-10" />

      {/* Persistent Micro-header indicator */}
      <div className="fixed top-4 left-4 z-40 flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-3.5 py-1 text-[11px] font-mono text-rose-300 backdrop-blur-md">
        <Bell className="h-3 w-3 text-rose-400 animate-bounce" />
        <span>POV: YOU'RE MY FAVOURITE NOTIFICATION</span>
      </div>

      <div className="fixed top-4 right-4 z-40 text-xs font-mono text-zinc-400 bg-black/50 px-2.5 py-1 rounded-full border border-white/5">
        {scene}/9
      </div>

      {/* ========================================================
          SCENE 1: THE SOFTEST LAUNCH
      ======================================================== */}
      {scene === 1 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="relative mb-6 flex h-36 w-36 items-center justify-center">
            <div className="h-28 w-28 rounded-full bg-gradient-to-tr from-rose-950 via-rose-800 to-pink-500 p-1 shadow-[0_0_80px_rgba(244,63,94,0.45)] animate-pulse flex items-center justify-center">
              <span className="text-6xl">🌹</span>
            </div>
            <span className="absolute -bottom-1 rounded-full bg-black/70 border border-white/10 px-3 py-0.5 text-[10px] font-mono text-rose-300">
              water droplets on petals
            </span>
          </div>

          <div className="space-y-2 font-serif text-lg sm:text-2xl text-rose-100">
            {launchStep >= 1 && <p className="animate-in fade-in duration-700">"hey you..."</p>}
            {launchStep >= 2 && <p className="animate-in fade-in duration-700 text-rose-300 font-bold">"yeah, YOU. 🙄❤️"</p>}
            {launchStep >= 3 && <p className="animate-in fade-in duration-700 text-sm sm:text-base text-zinc-400 font-sans italic">"i made you a little something."</p>}
          </div>

          {launchStep >= 3 && (
            <button
              type="button"
              onClick={() => switchScene(2)}
              className="cursor-pointer mt-10 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-8 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(225,29,72,0.4)] hover:scale-105 active:scale-95 transition-all"
            >
              OPEN YOUR LITTLE UNIVERSE 🌷
            </button>
          )}
        </section>
      )}

      {/* ========================================================
          SCENE 2: YOUR NAME LOOKS GOOD HERE
      ======================================================== */}
      {scene === 2 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          {/* iOS-Inspired Notification Banner */}
          <div className="w-full max-w-sm rounded-3xl bg-zinc-950/80 border border-rose-500/30 p-5 backdrop-blur-2xl shadow-2xl text-left mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-1">
              <span className="flex items-center gap-1.5 font-bold text-rose-400">
                <Bell className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
                FAVOURITE CONTACT
              </span>
              <span>now</span>
            </div>
            <h3 className="text-sm font-bold text-white mt-1">
              "someone has a very embarrassing amount of love for you."
            </h3>
            <p className="text-[11px] font-mono text-rose-200/80 mt-1">
              sent with love. zero shame. ♡
            </p>
          </div>

          <p className="font-mono text-xs uppercase tracking-[0.25em] text-zinc-500">
            this little universe belongs to
          </p>

          <h1 className="mt-3 text-4xl sm:text-6xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-r from-rose-200 via-pink-300 to-amber-200">
            {data.partnerName} ♡
          </h1>

          <div className="mt-8 flex flex-wrap justify-center gap-2 max-w-xs">
            {["my person", "my comfort human", "my favourite plot twist"].map((badge) => (
              <span key={badge} className="rounded-full bg-rose-500/10 border border-rose-500/20 px-3 py-1 text-xs font-serif italic text-rose-300">
                {badge}
              </span>
            ))}
          </div>

          <button
            type="button"
            onClick={() => switchScene(3)}
            className="cursor-pointer mt-10 rounded-full border border-rose-500/40 bg-zinc-900/80 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-rose-300 hover:text-white transition-all"
          >
            Spill The Flower Tea 🌹
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 3: FLOWERS HAVE TEA TOO
      ======================================================== */}
      {scene === 3 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              FLOWER GARDEN CONFESSIONS 🍵
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
              Flowers Have Tea Too
            </h2>
            <p className="text-xs text-rose-200/70 font-serif italic mt-0.5">Tap each flower to read its confession</p>
          </div>

          {/* 4 Interactive Botanical Pickers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full max-w-xl mb-6">
            {[
              { id: "rose", emoji: "🌹", name: "Red Rose", tea: "you are literally my favourite notification. everyone else can wait." },
              { id: "tulip", emoji: "🌷", name: "Pink Tulip", tea: "your existence is kinda distracting ngl." },
              { id: "lily", emoji: "🤍", name: "White Lily", tea: "i blame you for this embarrassing smile on my face." },
              { id: "breath", emoji: "🌼", name: "Baby's Breath", tea: "you're my favourite person to do absolutely nothing with." }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedTeaFlower(f.id)}
                className={`cursor-pointer rounded-2xl border p-4 text-center transition-all ${
                  selectedTeaFlower === f.id
                    ? "bg-rose-950/60 border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.3)] scale-105"
                    : "bg-zinc-950/60 border-white/5 hover:border-rose-500/30"
                }`}
              >
                <span className="text-4xl block mb-1">{f.emoji}</span>
                <span className="text-xs font-bold font-serif text-white block">{f.name}</span>
              </button>
            ))}
          </div>

          {/* Active Tea Message */}
          <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-black/70 p-5 backdrop-blur-xl shadow-xl min-h-[90px] flex items-center justify-center">
            {selectedTeaFlower === "rose" && <p className="font-serif text-sm text-rose-100 italic">"you are literally my favourite notification. everyone else can wait."</p>}
            {selectedTeaFlower === "tulip" && <p className="font-serif text-sm text-rose-100 italic">"your existence is kinda distracting ngl."</p>}
            {selectedTeaFlower === "lily" && <p className="font-serif text-sm text-rose-100 italic">"i blame you for this embarrassing smile on my face."</p>}
            {selectedTeaFlower === "breath" && <p className="font-serif text-sm text-rose-100 italic">"you're my favourite person to do absolutely nothing with."</p>}
          </div>

          <button
            type="button"
            onClick={() => switchScene(4)}
            className="cursor-pointer mt-8 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-lg active:scale-95"
          >
            Check Our Iconic Chat 📱
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 4: OUR CHAT IS LOWKEY ICONIC
      ======================================================== */}
      {scene === 4 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="w-full max-w-sm rounded-[36px] bg-[#0d0910] border border-white/10 p-5 shadow-2xl flex flex-col justify-between h-[520px]">
            
            {/* Chat header */}
            <div className="flex items-center gap-3 border-b border-white/5 pb-3">
              <div className="h-9 w-9 rounded-full bg-rose-600 flex items-center justify-center font-bold text-white text-xs">
                {data.partnerName.charAt(0)}
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-white">{data.partnerName} ♡</h4>
                <p className="text-[10px] font-mono text-emerald-400">typing banter...</p>
              </div>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto py-3 space-y-2.5 text-left">
              {data.chatDialogues.slice(0, chatIdx).map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === "you" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                    msg.sender === "you" ? "bg-rose-600 text-white rounded-tr-none" : "bg-zinc-800 text-zinc-200 rounded-tl-none font-sans"
                  }`}>
                    <p>{msg.text}</p>
                    <span className="block text-[8px] font-mono text-right text-white/50 mt-0.5">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-white/5 pt-3">
              <p className="text-[10px] font-mono text-zinc-500">Unfiltered Chat Archive • 100% Us</p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => switchScene(5)}
            className="cursor-pointer mt-6 rounded-full bg-gradient-to-r from-purple-600 to-rose-600 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl"
          >
            Open Relationship Wrapped 🎧
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 5: OUR RELATIONSHIP WRAPPED
      ======================================================== */}
      {scene === 5 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center justify-center gap-1.5">
              <Music className="h-3.5 w-3.5" /> OUR LITTLE UNIVERSE WRAPPED ♡
            </span>
          </div>

          {/* Active Card */}
          <div className="w-full max-w-xs aspect-3/4 rounded-3xl p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden bg-gradient-to-br from-zinc-900 to-black border border-white/10">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>CARD {wrappedIdx + 1} OF {data.wrappedStats.length}</span>
              <span>2026 EDITION</span>
            </div>

            <div className="my-auto text-left">
              <p className="text-[10px] font-mono uppercase tracking-wider text-rose-300 font-bold">
                {data.wrappedStats[wrappedIdx].label}
              </p>
              <h3 className="text-2xl font-black font-serif text-white mt-1 leading-tight">
                {data.wrappedStats[wrappedIdx].value}
              </h3>
              <p className="text-xs text-zinc-400 mt-2 font-sans leading-relaxed">
                {data.wrappedStats[wrappedIdx].sub}
              </p>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                disabled={wrappedIdx === 0}
                onClick={() => setWrappedIdx((p) => Math.max(0, p - 1))}
                className="flex-1 py-2 rounded-xl bg-zinc-800 disabled:opacity-30 text-xs font-bold text-white cursor-pointer"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={wrappedIdx === data.wrappedStats.length - 1}
                onClick={() => {
                  setWrappedIdx((p) => Math.min(data.wrappedStats.length - 1, p + 1));
                  shootConfetti("hearts");
                }}
                className="flex-1 py-2 rounded-xl bg-rose-600 disabled:opacity-30 text-xs font-bold text-white cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => switchScene(6)}
            className="cursor-pointer mt-8 rounded-full border border-rose-500/40 bg-zinc-900 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-rose-300 hover:text-white"
          >
            View Our Camera Roll 📸
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 6: THE CAMERA ROLL THAT FEELS LIKE US
      ======================================================== */}
      {scene === 6 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">PERSONAL CAMERA ROLL</span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">Moments That Feel Like Us</h2>
            <p className="text-xs text-zinc-400 mt-0.5">Tap any polaroid for the memory note</p>
          </div>

          {/* Polaroid Cards Grid */}
          <div className="grid grid-cols-2 gap-3 w-full max-w-md mb-8">
            {data.cameraRoll.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="cursor-pointer group rounded-2xl bg-zinc-900/90 border border-white/10 p-2.5 shadow-xl transition-transform hover:-translate-y-1 hover:border-rose-400"
              >
                <div className="aspect-square rounded-xl overflow-hidden bg-black mb-2">
                  <img src={photo.imgUrl} alt={photo.caption} className="h-full w-full object-cover filter contrast-105 group-hover:scale-105 transition-transform" />
                </div>
                <p className="text-[11px] font-serif italic text-zinc-300 line-clamp-1 text-left px-1">
                  "{photo.caption}"
                </p>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => switchScene(7)}
            className="cursor-pointer rounded-full bg-gradient-to-r from-rose-600 to-amber-500 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl"
          >
            Pick Your Love Language 💗
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 7: PICK YOUR LOVE LANGUAGE
      ======================================================== */}
      {scene === 7 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <span className="text-xs font-mono uppercase tracking-widest text-rose-400 font-bold">
            OKAY POOKIE, CHOOSE YOUR FLOWER 🌺
          </span>
          <h2 className="text-2xl sm:text-3xl font-black font-serif text-white mt-1">
            Pick Your Love Language
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full max-w-md my-6">
            {[
              { id: "romantic", emoji: "🌹", label: "Romantic Mode", desc: "Slow flower bloom & heartfelt devotion" },
              { id: "softie", emoji: "🌷", label: "Softie Mode", desc: "Pastel thoughts & soft inside comfort" },
              { id: "chaotic", emoji: "🌻", label: "Chaotic Bestie", desc: "Professional annoyance & illegal smiles" }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setLoveLanguageMode(m.id as any);
                  shootConfetti("hearts");
                }}
                className={`cursor-pointer rounded-2xl p-4 border text-center transition-all ${
                  loveLanguageMode === m.id
                    ? "bg-rose-950/70 border-rose-400 shadow-[0_0_30px_rgba(244,63,94,0.3)] scale-105"
                    : "bg-zinc-950/60 border-white/5 hover:border-rose-500/30"
                }`}
              >
                <span className="text-3xl block mb-1">{m.emoji}</span>
                <span className="text-xs font-bold font-serif text-white block">{m.label}</span>
                <span className="text-[10px] text-zinc-400 block mt-1">{m.desc}</span>
              </button>
            ))}
          </div>

          <div className="w-full max-w-md rounded-2xl border border-rose-500/30 bg-black/70 p-5 font-serif text-sm leading-relaxed text-rose-100 italic">
            {loveLanguageMode === "romantic" && (
              <p>"Out of all the stories this universe could write, being in yours is the only one I ever want."</p>
            )}
            {loveLanguageMode === "softie" && (
              <p>"You're the peace I didn't know I was searching for. My safest corner in a loud world."</p>
            )}
            {loveLanguageMode === "chaotic" && (
              <p>"Happy anniversary to the person who annoys me professionally and makes me smile illegally. 💀❤️"</p>
            )}
          </div>

          <button
            type="button"
            onClick={() => switchScene(8)}
            className="cursor-pointer mt-8 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-7 py-3 text-xs font-mono font-bold uppercase tracking-wider text-white shadow-xl"
          >
            Read The Blushing Letter 💌
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 8: THE MESSAGE I CAN'T SAY WITHOUT BLUSHING
      ======================================================== */}
      {scene === 8 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="w-full max-w-lg rounded-3xl bg-[#140b12]/90 border border-rose-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl text-left relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-rose-950 pb-3 mb-4 text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
              <span>UNFILTERED HONESTY</span>
              <span>FOR: {data.partnerName}</span>
            </div>

            <div className="font-serif text-sm leading-relaxed text-rose-100 whitespace-pre-line italic">
              {data.blushingLetter}
            </div>

            <div className="mt-6 border-t border-rose-950 pt-3 flex justify-between items-center text-xs font-serif text-rose-300">
              <span>With all my love</span>
              <span className="font-bold">— {data.senderName} ♡</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              switchScene(9);
              shootConfetti("gold");
            }}
            className="cursor-pointer mt-8 rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 px-9 py-3.5 text-xs font-mono font-bold uppercase tracking-widest text-white shadow-[0_0_50px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            The Final Bloom 🌹✨
          </button>
        </section>
      )}

      {/* ========================================================
          SCENE 9: THE FINAL BLOOM
      ======================================================== */}
      {scene === 9 && (
        <section className={`relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center transition-all duration-700 ${isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-tr from-rose-700 via-pink-800 to-amber-500 p-1 shadow-[0_0_90px_rgba(225,29,72,0.6)] animate-pulse">
            <span className="text-5xl select-none">🌹</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black font-serif text-white tracking-tight">
            {data.senderName} ♡ {data.partnerName}
          </h1>

          <p className="mt-2 text-xs font-mono uppercase tracking-[0.25em] text-amber-400 font-bold">
            HAPPY ANNIVERSARY, MY FAVOURITE HUMAN.
          </p>

          <div className="my-6 max-w-md mx-auto rounded-3xl bg-black/60 border border-rose-500/30 p-6 backdrop-blur-xl">
            <p className="font-serif text-sm leading-relaxed text-rose-100 whitespace-pre-line italic">
              {data.finalVow}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              onClick={() => {
                setScene(1);
                setLaunchStep(0);
                shootConfetti("hearts");
              }}
              className="cursor-pointer inline-flex items-center justify-center gap-1.5 rounded-full border border-white/10 bg-zinc-900 px-6 py-2.5 text-xs font-mono text-zinc-300 hover:text-white"
            >
              <RotateCcw className="h-3.5 w-3.5" /> REPLAY OUR LITTLE UNIVERSE ♡
            </button>

            <Link
              href="/create/notification"
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 to-pink-600 px-6 py-2.5 text-xs font-mono font-bold text-white shadow-lg"
            >
              <Sparkles className="h-3.5 w-3.5" /> MAKE IT YOURS
            </Link>
          </div>
        </section>
      )}

      {/* Camera roll photo modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl p-6 flex flex-col justify-between items-center text-center animate-in fade-in duration-300">
          <div className="w-full flex justify-end">
            <button
              type="button"
              onClick={() => setActivePhoto(null)}
              className="cursor-pointer text-white font-mono text-xs px-3 py-1.5 bg-zinc-800 rounded-lg"
            >
              Close ✕
            </button>
          </div>

          <div className="my-auto max-w-sm w-full">
            <div className="aspect-square rounded-2xl overflow-hidden border border-rose-500/40 shadow-2xl bg-black">
              <img src={activePhoto.imgUrl} alt={activePhoto.caption} className="h-full w-full object-cover" />
            </div>
            <p className="mt-4 font-serif text-sm italic text-rose-200 leading-relaxed bg-zinc-900/80 p-4 rounded-2xl border border-white/5">
              "{activePhoto.caption}"
            </p>
          </div>

          <p className="text-[10px] font-mono text-zinc-500">Camera Roll Item • Forever In Our Universe</p>
        </div>
      )}

    </main>
  );
}
