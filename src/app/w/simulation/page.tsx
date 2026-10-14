"use client";

import { useState, useEffect } from "react";
import { simSfx } from "@/lib/simulationSfx";
import {
  Skull, AlertOctagon, Terminal, Volume2, VolumeX,
  MessageSquare, DoorOpen, HelpCircle, Eye, Bug,
  Flame, RefreshCw, XCircle, ArrowRight
} from "lucide-react";
import Link from "next/link";

const ROASTS = [
  "Bhai tu website explore kar raha hai, jaake paani pee le pehle. 💧",
  "Your daily screen time is personally disappointed in you. 📉",
  "System telemetry detected: 99% overthinking, 1% actual productivity. 🧠",
  "Bhai itna free kaise hai tu is waqt? Koi assignments/kaam nahi hai kya? 😭",
  "Aapki life ka loading screen bhi skip nahi ho raha. ⏳",
  "Agar laziness Olympics ka sport hoti, toh tu gold medal lene bhi kal jaata. 🥇",
  "Your Wi-Fi speed is fast, but your career decisions are buffering. 💀"
];

const CURSED_CLICK_MSGS = [
  "Bhai mana kiya tha na! Kyun ungli ki? 💀",
  "Tu sudhrega nahi na? 😭",
  "Error: User ki zidd unke future se badi hai.",
  "System crashed: Common sense not found.",
  "Warning: Ek baar aur daba ke dekh le... kuch nahi hone wala! 😂"
];

const AI_PRESETS: { [key: string]: string } = {
  "purpose": "Pehle apna pending kaam complete kar le bhai, purpose dhoondhne baad me nikalna. 📂",
  "famous": "Pehle apni mummy ke phone mein favourite contact ban, phir duniya ka sochna. 📱",
  "intelligent": "Itna intelligent hoon ki main khud apne answers par doubt karta hoon. 🤖",
  "default": "Mere pass iska koi jawab nahi hai. Main khud is website me trapped hoon. 💀"
};

export default function SimulationGlitchPage() {
  // Scene 1: First Impression
  const [firstImpressionDone, setFirstImpressionDone] = useState(false);
  const [loadingStuck, setLoadingStuck] = useState(false);

  // Sound toggle
  const [isMuted, setIsMuted] = useState(false);

  // Screen Glitch Trigger
  const [isGlitching, setIsGlitching] = useState(false);

  // Roaster state
  const [currentRoast, setCurrentRoast] = useState(ROASTS[0]);

  // Cursed Button state
  const [cursedCount, setCursedCount] = useState(0);
  const [cursedPos, setCursedPos] = useState({ x: 0, y: 0 });
  const [cursedNotice, setCursedNotice] = useState<string | null>(null);

  // Fake System Notifications
  const [panics, setPanics] = useState<string[]>([
    "Warning: Brain.exe has stopped working. 🚨",
    "Your motivation has left the chat. 🚪",
    "Downloading common sense... Failed (0KB/s) ❌"
  ]);

  // Chatbot state
  const [chatInput, setChatInput] = useState("");
  const [chatLog, setChatLog] = useState<{ sender: "user" | "bot"; text: string }[]>([
    { sender: "bot", text: "Pooch le bhai jo poochhna hai. Useless answers hi milenge." }
  ]);

  // Cursed Room state
  const [roomDialog, setRoomDialog] = useState<string | null>(null);

  // Amnesia section
  const [amnesiaState, setAmnesiaState] = useState(0);

  // Exit Boss
  const [exitStage, setExitStage] = useState(0);

  // Easter Eggs
  const [logoClicks, setLogoClicks] = useState(0);
  const [easterNotice, setEasterNotice] = useState<string | null>(null);

  const triggerGlitch = () => {
    setIsGlitching(true);
    simSfx.playGlitch();
    setTimeout(() => setIsGlitching(false), 220);
  };

  const handleUnderstandNothing = () => {
    setLoadingStuck(true);
    simSfx.playBeep();
    setTimeout(() => {
      setFirstImpressionDone(true);
      triggerGlitch();
    }, 2800);
  };

  const handleCursedClick = () => {
    triggerGlitch();
    const nextCount = cursedCount + 1;
    setCursedCount(nextCount);
    const msg = CURSED_CLICK_MSGS[nextCount % CURSED_CLICK_MSGS.length];
    setCursedNotice(msg);

    // Random dodge offset
    const randomX = (Math.random() - 0.5) * 160;
    const randomY = (Math.random() - 0.5) * 100;
    setCursedPos({ x: randomX, y: randomY });
  };

  const handleAiSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const query = chatInput.toLowerCase();
    let reply = AI_PRESETS["default"];
    if (query.includes("purpose") || query.includes("life") || query.includes("zindagi")) reply = AI_PRESETS["purpose"];
    else if (query.includes("famous") || query.includes("ameer") || query.includes("paisa")) reply = AI_PRESETS["famous"];
    else if (query.includes("intelligent") || query.includes("smart") || query.includes("ai")) reply = AI_PRESETS["intelligent"];

    setChatLog((prev) => [
      ...prev,
      { sender: "user", text: chatInput.trim() },
      { sender: "bot", text: reply }
    ]);
    setChatInput("");
    simSfx.playBeep();
  };

  const handleLogoTap = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);
    if (next === 5) {
      setEasterNotice("🥚 SECRET EASTER EGG FOUND: Developer khud 3 saal se simulation exit karne ki koshish kar raha hai! 💀");
      triggerGlitch();
    }
  };

  const toggleSound = () => {
    simSfx.isMuted = !simSfx.isMuted;
    setIsMuted(simSfx.isMuted);
  };

  return (
    <main className={`relative min-h-screen bg-[#050505] text-zinc-200 font-mono select-none overflow-x-hidden ${isGlitching ? "invert contrast-200" : ""}`}>
      
      {/* CRT Scanline Overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px] opacity-40" />

      {/* Floating Audio Controller */}
      <button
        type="button"
        onClick={toggleSound}
        className="fixed top-4 right-4 z-50 flex items-center gap-1.5 rounded-full border border-red-500/30 bg-black/80 px-3 py-1.5 text-xs text-red-400 backdrop-blur-md shadow-xl"
      >
        {isMuted ? <VolumeX className="h-3.5 w-3.5" /> : <Volume2 className="h-3.5 w-3.5 animate-pulse" />}
        <span>{isMuted ? "Audio Muted" : "Glitch Audio ON"}</span>
      </button>

      {/* ========================================================
          1. FIRST IMPRESSION (SYSTEM ERROR ZERO STATE)
      ======================================================== */}
      {!firstImpressionDone ? (
        <section className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black px-4 text-center">
          <div className="w-full max-w-md rounded-2xl border-2 border-red-600/50 bg-[#0d090a] p-6 sm:p-8 shadow-[0_0_60px_rgba(220,38,38,0.2)]">
            <Skull className="mx-auto h-14 w-14 text-red-500 animate-pulse" />
            
            <p className="mt-4 text-xs tracking-widest text-zinc-500 uppercase">
              STATUS CODE: 0x000_VOID
            </p>
            <h1 className="mt-2 text-xl sm:text-2xl font-black text-white leading-snug">
              Congratulations! You have been selected for absolutely nothing.
            </h1>

            {!loadingStuck ? (
              <button
                type="button"
                onClick={handleUnderstandNothing}
                className="cursor-pointer mt-8 w-full rounded-xl bg-red-600/90 hover:bg-red-500 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg active:scale-95 transition-all"
              >
                Understand Nothing
              </button>
            ) : (
              <div className="mt-8 space-y-3">
                <div className="flex justify-between text-xs text-zinc-400 font-mono">
                  <span>Loading your purpose in life...</span>
                  <span className="text-red-400 font-bold animate-pulse">3%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-zinc-900 overflow-hidden border border-zinc-800">
                  <div className="h-full w-[3%] bg-red-600 animate-pulse" />
                </div>
                <p className="text-xs text-red-400 font-bold pt-2 animate-in fade-in">
                  Sorry, purpose not found. 💀
                </p>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* ========================================================
            THE MAIN BROKEN SIMULATION ADVENTURE
        ======================================================== */
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 space-y-16">
          
          {/* Header */}
          <header className="text-center pt-6">
            <button
              type="button"
              onClick={handleLogoTap}
              className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-950/20 px-4 py-1 text-xs text-red-400 hover:scale-105 active:scale-95 transition-transform"
            >
              <Bug className="h-3.5 w-3.5 animate-spin" />
              <span>THE SIMULATION IS BROKEN 💀</span>
            </button>
            <h1 className="mt-4 text-3xl sm:text-5xl font-black tracking-tight text-white uppercase">
              Glitch In The Matrix
            </h1>
            <p className="mt-2 text-xs text-zinc-500">
              Browser window normal hai, problem tumhari reality mein hai. 😂
            </p>

            {easterNotice && (
              <div className="mt-4 rounded-xl border border-yellow-500/40 bg-yellow-950/20 p-3 text-xs text-yellow-300 animate-in zoom-in-95">
                {easterNotice}
              </div>
            )}
          </header>

          {/* ========================================================
              2. THE WEBSITE THAT JUDGES YOU 🗿
          ======================================================== */}
          <section className="rounded-3xl border border-zinc-800 bg-[#0c0c0e] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3 mb-4">
              <span className="text-xs font-bold text-zinc-400 flex items-center gap-1.5">
                <span className="text-lg">🗿</span> THE REALITY JUDGE AI
              </span>
              <span className="rounded bg-red-600/20 text-red-400 px-2 py-0.5 text-[10px] font-bold">100% JUDGMENTAL</span>
            </div>

            <div className="rounded-2xl border border-white/5 bg-black/60 p-5 text-sm font-sans leading-relaxed text-zinc-200">
              "{currentRoast}"
            </div>

            <button
              type="button"
              onClick={() => {
                triggerGlitch();
                const pick = ROASTS[Math.floor(Math.random() * ROASTS.length)];
                setCurrentRoast(pick);
              }}
              className="cursor-pointer mt-4 w-full rounded-xl bg-zinc-900 border border-zinc-700 py-2.5 text-xs font-bold text-zinc-300 hover:text-white hover:bg-zinc-800 active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Roast Me Again 🗿
            </button>
          </section>

          {/* ========================================================
              3. THE CURSED BUTTON 🔴
          ======================================================== */}
          <section className="rounded-3xl border border-red-950/60 bg-gradient-to-b from-red-950/10 to-black p-8 text-center shadow-2xl relative overflow-hidden">
            <span className="text-[10px] tracking-widest uppercase text-red-500 font-bold">
              HAZARD PROTOCOL • DO NOT TOUCH
            </span>
            <p className="text-xs text-zinc-400 mt-1">Seriously bhai, mat daba isko.</p>

            <div className="my-8 flex justify-center">
              <button
                type="button"
                onClick={handleCursedClick}
                style={{
                  transform: `translate(${cursedPos.x}px, ${cursedPos.y}px)`,
                  transition: "transform 0.15s ease-out"
                }}
                className="cursor-pointer h-28 w-28 rounded-full border-4 border-red-500 bg-red-600 shadow-[0_0_50px_rgba(239,68,68,0.5)] flex items-center justify-center text-xs font-black text-white uppercase tracking-wider active:scale-90"
              >
                DO NOT CLICK
              </button>
            </div>

            {cursedNotice && (
              <div className="rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-xs text-red-300 font-mono animate-in fade-in">
                {cursedNotice} (Clicks: {cursedCount})
              </div>
            )}
          </section>

          {/* ========================================================
              4. FAKE SYSTEM PANIC 😭
          ======================================================== */}
          <section className="rounded-3xl border border-zinc-800 bg-[#09090b] p-6 shadow-xl">
            <div className="flex items-center justify-between text-xs text-zinc-400 font-bold mb-4">
              <span className="flex items-center gap-1.5 text-amber-400">
                <AlertOctagon className="h-4 w-4" /> SYSTEM TELEMETRY WARNINGS
              </span>
              <span className="text-[10px] text-zinc-600">Clearly Fictional</span>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {panics.map((p, idx) => (
                <div key={idx} className="rounded-xl border border-zinc-800/80 bg-zinc-950/80 p-3 text-zinc-300 flex items-center justify-between">
                  <span>{p}</span>
                  <span className="text-[10px] text-red-400 font-bold">CRITICAL</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                simSfx.playBeep();
                const morePanics = [
                  "Searching for your future... Server not found (404) 🛰️",
                  "Your last 3 brain cells are currently boxing each other. 🥊",
                  "Memory leak: Forgot why you opened this tab. 🤯"
                ];
                setPanics((prev) => [...prev, morePanics[Math.floor(Math.random() * morePanics.length)]]);
              }}
              className="cursor-pointer mt-4 rounded-xl border border-zinc-800 bg-black px-4 py-2 text-[11px] font-bold text-zinc-400 hover:text-white"
            >
              + Trigger Another Glitch Warning
            </button>
          </section>

          {/* ========================================================
              5. THE MOST USELESS AI CHATBOT 🤖
          ======================================================== */}
          <section className="rounded-3xl border border-zinc-800 bg-[#0d0d10] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-xs font-bold text-zinc-300 flex items-center gap-1.5">
                <Terminal className="h-4 w-4 text-emerald-400" /> THE MOST USELESS AI BOT
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">Unhelpful v0.001</span>
            </div>

            {/* Chat Messages */}
            <div className="h-48 overflow-y-auto space-y-2.5 p-3 rounded-2xl bg-black/60 border border-white/5 text-xs">
              {chatLog.map((c, i) => (
                <div key={i} className={`flex ${c.sender === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] rounded-xl p-2.5 leading-relaxed ${
                    c.sender === "user"
                      ? "bg-zinc-800 text-white rounded-tr-none"
                      : "bg-red-950/30 border border-red-500/30 text-red-200 rounded-tl-none font-sans"
                  }`}>
                    {c.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleAiSend} className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Ask anything (e.g. purpose, famous, smart)..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                className="flex-1 rounded-xl border border-zinc-800 bg-black px-3 py-2 text-xs text-white focus:border-red-500 focus:outline-none"
              />
              <button
                type="submit"
                className="cursor-pointer rounded-xl bg-zinc-800 px-4 py-2 text-xs font-bold text-white hover:bg-zinc-700 active:scale-95"
              >
                Send
              </button>
            </form>
          </section>

          {/* ========================================================
              6. THE CURSED ROOM 👁️
          ======================================================== */}
          <section className="rounded-3xl border border-zinc-800 bg-black p-6 sm:p-8 text-center shadow-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 flex items-center justify-center gap-1">
              <Eye className="h-4 w-4 text-red-500" /> THE CURSED VOID ROOM
            </span>
            <p className="text-xs text-zinc-400 mt-1">Tap an object inside the room:</p>

            <div className="my-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "🪑 The Chair", note: "Yahan baithkar bhi kuch nahi hone wala. Aalas tab bhi wahi rahega." },
                { label: "🪵 The Table", note: "Tumhare future se zyada stable hoon main." },
                { label: "🪞 The Mirror", note: "Bhai, tu sach mein ready hai kal subah duniya ka saamna karne ke liye?" },
                { label: "🚪 The Door", note: "Exit mil gaya toh mujhe bhi batana, main kabse dhoondh raha hoon." }
              ].map((obj) => (
                <button
                  key={obj.label}
                  type="button"
                  onClick={() => {
                    simSfx.playBeep();
                    setRoomDialog(obj.note);
                  }}
                  className="cursor-pointer rounded-2xl border border-zinc-800 bg-zinc-950 p-4 text-xs font-bold text-zinc-300 hover:border-red-500 hover:text-white transition-all"
                >
                  {obj.label}
                </button>
              ))}
            </div>

            {roomDialog && (
              <div className="rounded-xl border border-zinc-700 bg-zinc-900/80 p-3.5 text-xs text-zinc-200 font-sans italic animate-in fade-in">
                "{roomDialog}"
              </div>
            )}
          </section>

          {/* ========================================================
              7. THE WEBSITE REMEMBERS NOTHING 🧠
          ======================================================== */}
          <section className="rounded-3xl border border-zinc-800 bg-[#0c0c0e] p-6 text-center">
            <span className="text-[10px] uppercase font-mono text-zinc-500">Volatile State Engine</span>
            <h3 className="text-base font-bold text-white mt-1">Main tumhe hamesha yaad rakhunga.</h3>

            {amnesiaState === 0 && (
              <button
                type="button"
                onClick={() => setAmnesiaState(1)}
                className="cursor-pointer mt-4 rounded-xl border border-zinc-700 bg-black px-5 py-2 text-xs text-zinc-300 hover:text-white"
              >
                Really?
              </button>
            )}

            {amnesiaState === 1 && (
              <div className="mt-4 space-y-2 text-xs font-mono text-red-400 animate-in fade-in">
                <p className="font-bold text-lg">Kaun bhai? 🤨</p>
                <p className="text-zinc-500">• Memory capacity: 0 bytes</p>
                <p className="text-zinc-500">• Emotional attachment: Not installed</p>
                <button
                  type="button"
                  onClick={() => setAmnesiaState(0)}
                  className="mt-2 text-[10px] text-zinc-400 underline cursor-pointer"
                >
                  Reset Memory Attempt
                </button>
              </div>
            )}
          </section>

          {/* ========================================================
              8. FINAL BOSS: ESCAPE 💀
          ======================================================== */}
          <section className="rounded-3xl border border-red-600/40 bg-gradient-to-b from-[#180809] to-black p-8 text-center shadow-2xl">
            <h3 className="text-xl font-black text-white uppercase tracking-tight">
              Final Boss: The Escape Protocol
            </h3>
            <p className="text-xs text-zinc-400 mt-1">Ready to wake up to reality?</p>

            <div className="mt-6 flex flex-col items-center">
              {exitStage === 0 && (
                <button
                  type="button"
                  onClick={() => setExitStage(1)}
                  className="cursor-pointer rounded-full bg-red-600 px-7 py-3 text-xs font-black uppercase text-white shadow-xl hover:bg-red-500"
                >
                  EXIT WEBSITE 💀
                </button>
              )}

              {exitStage === 1 && (
                <div className="space-y-3 animate-in fade-in">
                  <p className="text-xs text-emerald-400 font-bold">Exit approved by the matrix.</p>
                  <button
                    type="button"
                    onClick={() => setExitStage(2)}
                    className="cursor-pointer rounded-full bg-zinc-800 border border-zinc-700 px-6 py-2.5 text-xs font-bold text-white hover:bg-zinc-700"
                  >
                    Confirm Exit?
                  </button>
                </div>
              )}

              {exitStage === 2 && (
                <div className="space-y-4 max-w-sm animate-in zoom-in-95">
                  <p className="text-xs text-amber-400 font-bold">One last thing...</p>
                  <p className="text-sm font-sans text-zinc-200 leading-relaxed font-bold">
                    "Bhai 10 minute se yahan bakchodi dekh raha hai. Ab asli life mein bhi login kar le jaake!" 😂❤️
                  </p>
                  <div>
                    <a
                      href="https://google.com"
                      className="inline-flex items-center gap-1.5 rounded-full bg-white px-6 py-2.5 text-xs font-black uppercase text-black hover:bg-zinc-200"
                    >
                      <span>Leave For Real 🚪</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Footer Confession Easter Egg */}
          <footer className="pt-10 border-t border-zinc-900 text-center">
            <button
              type="button"
              onClick={() => alert("Confession: Is website ko banane wala developer khud simulation se bahar nikalne ka rasta dhoondh raha hai. 💀")}
              className="text-[11px] font-mono text-zinc-600 hover:text-zinc-400 cursor-pointer"
            >
              [ Click here for confidential developer confession ]
            </button>
            <div className="mt-4">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-400 hover:text-white"
              >
                <span>⚡ Return to VibeWish Hub</span>
              </Link>
            </div>
          </footer>

        </div>
      )}

    </main>
  );
}
