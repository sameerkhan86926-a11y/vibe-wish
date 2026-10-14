"use client";

import { useEffect, useState, useRef } from "react";
import { decodeData } from "@/lib/encoder";
import { JaanBirthdayPayload } from "@/lib/jaanTypes";
import { shootConfetti } from "@/lib/confetti";
import {
  Heart, Sparkles, Volume2, VolumeX, RotateCcw,
  Gift, Mail, Send
} from "lucide-react";
import Link from "next/link";

const romanticNotes = [
  261.63, 329.63, 392.00, 523.25,
  293.66, 349.23, 440.00, 587.33,
  220.00, 261.63, 329.63, 440.00,
  174.61, 220.00, 261.63, 349.23
];

export default function JaanBirthdayReceiver() {
  const [data, setData] = useState<JaanBirthdayPayload | null>(null);
  const [currentScene, setCurrentScene] = useState<number>(0);
  const [particleMode, setParticleMode] = useState<"roses" | "butterflies" | "hearts" | "flowers" | "stars">("roses");
  const [letterOpened, setLetterOpened] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const melodyTimerRef = useRef<NodeJS.Timeout | null>(null);

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
          const decoded = decodeData(rawData) as unknown as JaanBirthdayPayload;
          if (decoded && decoded.girlfriendName) {
            setData(decoded);
            return;
          }
        } catch (e) {
          console.error("Payload decode error:", e);
        }
      }

      // Default romantic fallback
      setData({
        girlfriendName: "Meri Jaan",
        senderName: "Tumhara Deewana",
        romanticQuote1: "Tum meri zindagi ki wo sabse pyari dua ho jo rab ne qubool ki hai. Aaj ka har ek pal, har ek phool sirf tumhari muskurahat ke naam hai. 🌹✨",
        butterflyQuote: "Dil mein hazaron butterflies udne lagti hain. Tumhari ek hasi mere poore din ki thakaan aur pareshaani ko ek pal mein gayab kar deti hai. 🥹💗",
        teddyQuote: "Chahe hum kitna bhi lad lein, kitni bhi silly fights ho jayein... Aakhri me mujhe sukoon sirf tumhari baahon mein milta hai. Happy Birthday, my cute little baby! 🤗❤️",
        flowerQuote: "Phool toh sabhi khoobsurat hote hain, lekin meri bagiya ka sabse anmol aur mehakta hua gulaab sirf tum ho. Hamesha khilkhilati raho. 🌹✨",
        starryQuote: "Aasman ke taaron se bhi zyada roshan tumhari aankhein hain. Agar mere bas mein hota, toh main saari kainaat ki roshni samet kar tumhare aanchal mein daal deta. 🌌💍",
        customLoveLetter: `Mujhe nahi pata ki main shabdon mein kaise bayan karun ki tum mere liye kya ho. Jab se tum meri zindagi mein aayi ho, har ek din ek khoobsurat kahani jaisa lagne laga hai.\n\nTum sirf meri girlfriend nahi ho, tum meri sabse achhi dost ho, mera sukoon ho aur meri sabse pyari aadat ho. Tumhari gusse wali naak, tumhari bachkani baatein aur tumhara bina bole sab samajh jaana—mujhe har cheez se bepanaah ishq hai.\n\nMain waada karta hoon ki zindagi ke har mod par, har hasi mein aur har mushkil mein tumhara haath mere haath mein hoga.`
      });
    }
  }, []);

  // Ambient Canvas Particle Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 36 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 16 + 10,
      speedY: Math.random() * 1.5 + 0.8,
      speedX: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 1.5
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.font = `${p.size}px serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";

        if (particleMode === "roses") {
          ctx.fillText(Math.random() > 0.5 ? "🌹" : "🌸", 0, 0);
        } else if (particleMode === "butterflies") {
          ctx.fillText(Math.random() > 0.5 ? "🦋" : "✨", 0, 0);
        } else if (particleMode === "hearts") {
          ctx.fillText(Math.random() > 0.5 ? "❤️" : "🎈", 0, 0);
        } else if (particleMode === "flowers") {
          ctx.fillText(Math.random() > 0.5 ? "💖" : "🌷", 0, 0);
        } else if (particleMode === "stars") {
          ctx.fillText(Math.random() > 0.5 ? "✨" : "⭐", 0, 0);
        }

        ctx.restore();

        p.y += p.speedY;
        p.x += Math.sin(p.y / 30) * p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height + 30) {
          p.y = -30;
          p.x = Math.random() * width;
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [particleMode]);

  // Piano Synthesizer Functions
  const playSoftTone = (freq: number, duration: number) => {
    if (!audioCtxRef.current) return;
    try {
      const osc = audioCtxRef.current.createOscillator();
      const gain = audioCtxRef.current.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, audioCtxRef.current.currentTime);

      gain.gain.setValueAtTime(0.001, audioCtxRef.current.currentTime);
      gain.gain.linearRampToValueAtTime(0.08, audioCtxRef.current.currentTime + 0.1);
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

    if (!isMusicPlaying) {
      setIsMusicPlaying(true);
      let idx = 0;
      melodyTimerRef.current = setInterval(() => {
        playSoftTone(romanticNotes[idx % romanticNotes.length], 2.2);
        idx++;
      }, 750);
    } else {
      setIsMusicPlaying(false);
      if (melodyTimerRef.current) clearInterval(melodyTimerRef.current);
    }
  };

  const handleOpenGift = () => {
    if (!isMusicPlaying) toggleMusic();
    shootConfetti("hearts");
    shootConfetti("gold");
    setTimeout(() => {
      setCurrentScene(1);
      setParticleMode("roses");
    }, 450);
  };

  const handleSendKisses = (e: React.MouseEvent) => {
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
    <main className="relative min-h-screen bg-[#07030b] text-zinc-100 flex items-center justify-center p-4 selection:bg-rose-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* Background Particle Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0 h-full w-full" />

      {/* Music Controller */}
      <button
        type="button"
        onClick={toggleMusic}
        className={`fixed top-5 right-5 z-50 flex items-center gap-2 rounded-full px-4 py-2 text-xs font-serif backdrop-blur-md transition-all shadow-xl ${
          isMusicPlaying
            ? "border border-rose-500 bg-rose-950/70 text-white shadow-[0_0_20px_rgba(244,63,94,0.4)]"
            : "border border-rose-500/30 bg-black/60 text-rose-300"
        }`}
      >
        {isMusicPlaying ? <Volume2 className="h-4 w-4 text-rose-400 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
        <span>{isMusicPlaying ? "Music Playing 🎶" : "Play Romantic Music"}</span>
      </button>

      {/* Main Experience Viewport */}
      <div className="relative z-10 w-full max-w-md min-h-[580px] flex flex-col justify-center items-center text-center">

        {/* SCENE 0: GIFT BOX */}
        {currentScene === 0 && (
          <div className="w-full flex flex-col items-center animate-in fade-in zoom-in-95 duration-500">
            <div onClick={handleOpenGift} className="relative cursor-pointer mb-6 group">
              <span className="absolute -top-6 left-8 text-5xl z-10 animate-bounce">🎀</span>
              <div className="h-32 w-32 rounded-3xl bg-gradient-to-tr from-rose-600 to-pink-500 shadow-[0_0_50px_rgba(244,63,94,0.5)] flex items-center justify-center relative overflow-hidden group-hover:scale-105 transition-transform">
                <div className="absolute inset-x-0 h-6 bg-amber-400 shadow" />
                <div className="absolute inset-y-0 w-6 bg-amber-400 shadow" />
              </div>
            </div>

            <span className="inline-block px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
              Special Delivery For You 💌
            </span>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">A Little Surprise For My Love</h2>
            <p className="mt-3 text-xs sm:text-sm text-rose-100/90 leading-relaxed max-w-xs font-serif">
              Aaj meri sabse favourite insaan ka janamdin hai... <br />
              Tap the gift box to unwrap your world! 🎁❤️
            </p>

            <button
              type="button"
              onClick={handleOpenGift}
              className="cursor-pointer mt-8 w-full rounded-full bg-gradient-to-r from-rose-600 via-pink-600 to-amber-500 py-3.5 text-xs font-bold tracking-wider uppercase text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Open Birthday Gift 💝
            </button>
          </div>
        )}

        {/* SCENE 1: HAPPY BIRTHDAY MERI JAAN (ROSE RAIN) */}
        {currentScene === 1 && (
          <div className="w-full rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#2e0819]/90 to-[#0d0208]/90 p-8 backdrop-blur-xl shadow-2xl animate-in fade-in duration-500">
            <span className="inline-block px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              Happy Birthday Princess 👑
            </span>
            <div className="text-6xl mb-2">🎂🌹</div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-rose-300">
              Happy Birthday {data.girlfriendName}! ❤️
            </h1>
            <p className="my-5 text-xs sm:text-sm text-rose-100 leading-relaxed font-serif">
              {data.romanticQuote1}
            </p>
            <button
              type="button"
              onClick={() => {
                shootConfetti("hearts");
                setCurrentScene(2);
                setParticleMode("butterflies");
              }}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-rose-600 to-pink-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Let's Walk Into Our Sky 🦋✨
            </button>
          </div>
        )}

        {/* SCENE 2: BUTTERFLIES PARADISE */}
        {currentScene === 2 && (
          <div className="w-full rounded-3xl border border-pink-500/30 bg-gradient-to-b from-[#3d142d]/90 to-[#12030d]/90 p-8 backdrop-blur-xl shadow-2xl animate-in fade-in duration-500">
            <span className="inline-block px-3.5 py-1 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider mb-4">
              Butterfly Paradise 🦋
            </span>
            <div className="text-6xl mb-2">🌸🦋</div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">Tum Saamne Aati Ho Toh...</h2>
            <p className="my-5 text-xs sm:text-sm text-pink-100 leading-relaxed font-serif">
              {data.butterflyQuote}
            </p>
            <button
              type="button"
              onClick={() => {
                shootConfetti("hearts");
                setCurrentScene(3);
                setParticleMode("hearts");
              }}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-pink-600 to-purple-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Someone Wants A Hug 🧸❤️
            </button>
          </div>
        )}

        {/* SCENE 3: CUTE TEDDY & CUDDLES */}
        {currentScene === 3 && (
          <div className="w-full rounded-3xl border border-purple-500/30 bg-gradient-to-b from-[#291234]/90 to-[#09030e]/90 p-8 backdrop-blur-xl shadow-2xl animate-in fade-in duration-500">
            <span className="inline-block px-3.5 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-wider mb-4">
              Unlimited Cuddle Pass 🧸
            </span>
            <div className="text-7xl mb-2 animate-bounce">🧸</div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">My Favourite Cuddle Partner</h2>
            <p className="my-5 text-xs sm:text-sm text-purple-100 leading-relaxed font-serif">
              {data.teddyQuote}
            </p>
            <button
              type="button"
              onClick={() => {
                shootConfetti("hearts");
                setCurrentScene(4);
                setParticleMode("flowers");
              }}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-purple-600 to-rose-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Step Into The Garden 💖🌸
            </button>
          </div>
        )}

        {/* SCENE 4: GLOWING HEART & FLOWERS */}
        {currentScene === 4 && (
          <div className="w-full rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#420822]/90 to-[#0c0207]/90 p-8 backdrop-blur-xl shadow-2xl animate-in fade-in duration-500">
            <span className="inline-block px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              You Own My Heart 🔐
            </span>
            <div className="text-7xl mb-2 animate-pulse drop-shadow-[0_0_35px_#f43f5e]">💖</div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">Har Dhadkan Tumhari Hai</h2>
            <p className="my-5 text-xs sm:text-sm text-rose-100 leading-relaxed font-serif">
              {data.flowerQuote}
            </p>
            <button
              type="button"
              onClick={() => {
                shootConfetti("gold");
                setCurrentScene(5);
                setParticleMode("stars");
              }}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-rose-600 to-amber-500 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Look At The Stars 🌌✨
            </button>
          </div>
        )}

        {/* SCENE 5: ROMANTIC MOONLIT STARS */}
        {currentScene === 5 && (
          <div className="w-full rounded-3xl border border-indigo-500/30 bg-gradient-to-b from-[#110d29]/90 to-[#04020a]/90 p-8 backdrop-blur-xl shadow-2xl animate-in fade-in duration-500">
            <span className="inline-block px-3.5 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
              A Tale Written in Stars 🌠
            </span>
            <div className="text-6xl mb-2">🌙✨</div>
            <h2 className="text-2xl sm:text-3xl font-black font-serif text-white">Under The Same Sky...</h2>
            <p className="my-5 text-xs sm:text-sm text-indigo-100 leading-relaxed font-serif">
              {data.starryQuote}
            </p>
            <button
              type="button"
              onClick={() => {
                shootConfetti("hearts");
                setCurrentScene(6);
                setParticleMode("roses");
              }}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all"
            >
              Open My Secret Letter 💌
            </button>
          </div>
        )}

        {/* SCENE 6: SPECIAL WAX ENVELOPE LOVE LETTER */}
        {currentScene === 6 && (
          <div className="w-full animate-in fade-in duration-500">
            {!letterOpened ? (
              <div
                onClick={() => {
                  setLetterOpened(true);
                  shootConfetti("hearts");
                }}
                className="cursor-pointer mx-auto w-full max-w-xs h-52 rounded-3xl bg-gradient-to-tr from-rose-800 to-pink-900 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex flex-col items-center justify-center group hover:scale-105 transition-all"
              >
                <div className="h-14 w-14 rounded-full bg-amber-500 border-2 border-dashed border-white/50 flex items-center justify-center text-2xl shadow-lg">
                  💌
                </div>
                <span className="mt-4 text-xs font-mono font-bold uppercase tracking-widest text-rose-200">
                  Tap to Unseal Letter
                </span>
              </div>
            ) : (
              <div className="rounded-3xl bg-[#fff8f8] text-[#3b0713] p-6 sm:p-8 text-left shadow-2xl animate-in zoom-in-95 font-serif max-h-[460px] overflow-y-auto">
                <h3 className="text-2xl font-black text-rose-700 mb-3">Meri Jaan, Meri Duniya... ❤️</h3>
                <div className="text-xs sm:text-sm leading-relaxed whitespace-pre-line text-zinc-800">
                  {data.customLoveLetter}
                </div>
                <p className="mt-6 text-right font-bold text-xs text-rose-900">
                  Hamesha Sirf Tumhara, <br />
                  {data.senderName} ❤️💋
                </p>

                <button
                  type="button"
                  onClick={() => {
                    shootConfetti("gold");
                    setCurrentScene(7);
                  }}
                  className="cursor-pointer mt-6 w-full rounded-full bg-gradient-to-r from-rose-600 to-pink-600 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg"
                >
                  The Grand Birthday Surprise 👑🎂
                </button>
              </div>
            )}
          </div>
        )}

        {/* SCENE 7: GRAND FINALE (KISS & CONFETTI) */}
        {currentScene === 7 && (
          <div className="w-full rounded-3xl border border-rose-500/30 bg-gradient-to-b from-[#420822]/90 to-black p-8 backdrop-blur-xl shadow-2xl animate-in fade-in duration-500">
            <span className="inline-block px-3.5 py-1 rounded-full bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4">
              Forever & Always 💍
            </span>
            <div className="text-7xl mb-2">👑💖🎂</div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-rose-400">
              Happy Birthday My Princess, {data.girlfriendName}! 💋
            </h1>
            <p className="my-5 text-xs sm:text-sm text-rose-100 leading-relaxed font-serif">
              May all your dreams come true! Send me your love, virtual kisses and seal this day forever! 💗✨
            </p>

            <button
              type="button"
              onClick={handleSendKisses}
              className="cursor-pointer w-full rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 py-4 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_40px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all"
            >
              Send Me A Kiss 😘💋💗
            </button>

            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentScene(1);
                  setParticleMode("roses");
                  setLetterOpened(false);
                }}
                className="text-xs text-rose-300 underline cursor-pointer"
              >
                Replay Our Birthday Story 🔄
              </button>
              <Link
                href="/create/jaan"
                className="text-[11px] text-zinc-500 hover:text-zinc-300 mt-2"
              >
                Create one for your girlfriend ✨
              </Link>
            </div>
          </div>
        )}

      </div>

    </main>
  );
}
