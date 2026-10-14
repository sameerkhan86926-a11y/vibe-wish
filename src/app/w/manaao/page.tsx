"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { ManaaoPayload } from "@/lib/manaaoTypes";
import { shootConfetti } from "@/lib/confetti";
import {
  Heart, AlertTriangle, MessageCircle, ShieldAlert,
  Sparkles, CheckCircle2, Copy, Check, Send, Award,
  Smile, RefreshCw, Mail, Share2
} from "lucide-react";
import Link from "next/link";

export default function ManaaoReceiverPage() {
  const [data, setData] = useState<ManaaoPayload | null>(null);
  const [missionStarted, setMissionStarted] = useState(false);
  const [sorryTab, setSorryTab] = useState<"cute" | "funny" | "dilSe">("cute");
  
  // Chat banter state
  const [chatStep, setChatStep] = useState(1);
  const [chatReply, setChatReply] = useState<string | null>(null);

  // Mini-Game Tasks
  const [task1Done, setTask1Done] = useState(false);
  const [task2Choice, setTask2Choice] = useState<string | null>(null);
  const [task3Promise, setTask3Promise] = useState("");
  const [tasksCompleted, setTasksCompleted] = useState(false);

  // Mood lifter
  const [moodMsg, setMoodMsg] = useState<string | null>(null);
  const [hugDelivered, setHugDelivered] = useState(false);

  // Secret letter
  const [letterOpen, setLetterOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        setData(decodeData(raw) as unknown as ManaaoPayload);
      } else {
        // High quality fallback
        setData({
          name: "Chhoti Don",
          senderName: "Sameer",
          relation: "gf",
          reasonTag: "Reply late kiya 📱",
          customLetter: `Hey, meri favourite insaan. ❤️\n\nMujhe pata hai ki sirf sorry bol dene se har baat theek nahi ho jaati. Agar meri kisi baat se tumhe hurt hua hai, toh main tumhari feelings samajhna chahta hoon.\n\nTum mere liye important ho, isliye main nahi chahta ki misunderstanding humari baat se zyada badi ho jaye. Main perfect nahi hoon, lekin apni galti samajhne aur behtar banne ki koshish zaroor kar sakta hoon.\n\nJab tumhara mann ho, tab araam se baat karte hain. Tab tak apna khayal rakhna. ❤️`,
          customPromise: "Promise: Aage se bina bataye gayab nahi hounga aur tumhari baat dhyan se sununga."
        });
      }
    }
  }, []);

  const handleStartMission = () => {
    setMissionStarted(true);
    shootConfetti("hearts");
  };

  const handleShare = () => {
    const text = `Hey ${data?.name}, maine dil se ek sorry mission banaya hai tumhare liye: ${window.location.href}`;
    if (navigator.share) {
      navigator.share({ title: "Mission: Manaao Them", text, url: window.location.href }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#0e0a14] text-zinc-100 font-sans selection:bg-rose-500 selection:text-white pb-20 overflow-x-hidden">
      
      {/* ========================================================
          1. THE ANGRY PERSON DETECTED WARNING
      ======================================================== */}
      {!missionStarted ? (
        <section className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-radial from-[#241029] via-[#0d0714] to-black px-4 text-center">
          {/* Animated character hiding & peeking */}
          <div className="relative mb-6">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-1 shadow-[0_0_50px_rgba(244,63,94,0.35)] animate-bounce">
              <span className="text-6xl select-none">🫣</span>
            </div>
            <div className="absolute -top-2 -right-3 rounded-full bg-red-600 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-white shadow animate-pulse">
              RED ALERT
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            OH NOOO! 🚨 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-pink-300 to-amber-300">
              KOI APNA HUMSE GUSSA HAI!
            </span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-rose-200/80 max-w-sm">
            Target Name: <b className="text-white font-bold">{data.name}</b> • Situation thodi serious hai... par mission abhi baaki hai! 🥹😂
          </p>

          {/* Warning Meter */}
          <div className="mt-6 w-full max-w-xs rounded-2xl border border-rose-500/30 bg-black/60 p-4 text-left font-mono text-xs space-y-1.5 shadow-2xl">
            <div className="flex justify-between text-red-400">
              <span>ANGER LEVEL:</span>
              <span className="font-bold">🔥🔥🔥🔥 (Extreme)</span>
            </div>
            <div className="flex justify-between text-amber-300">
              <span>SMILE LEVEL:</span>
              <span>Currently offline 📵</span>
            </div>
            <div className="flex justify-between text-emerald-400">
              <span>MISSION STATUS:</span>
              <span>ACTIVE RESOLUTION 🛠️</span>
            </div>
          </div>

          <button
            onClick={handleStartMission}
            className="cursor-pointer mt-8 rounded-full bg-gradient-to-r from-rose-500 via-pink-600 to-amber-500 px-9 py-4 text-xs font-black uppercase tracking-widest text-white shadow-[0_0_35px_rgba(244,63,94,0.4)] hover:scale-105 active:scale-95 transition-all"
          >
            START MANAO MISSION ❤️
          </button>
        </section>
      ) : (
        /* ========================================================
            THE MAIN APOLOGY ADVENTURE
        ======================================================== */
        <div className="mx-auto max-w-2xl px-4 py-12">
          
          {/* Header */}
          <header className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-rose-500/30 bg-rose-950/20 px-3.5 py-1 text-xs font-semibold text-rose-300">
              <Sparkles className="h-3.5 w-3.5" /> Gussa tumhara, mission hamara! 😂💗
            </span>
            <h1 className="mt-3 text-3xl sm:text-4xl font-black text-white font-serif-luxury">
              Special Peace Treaty for {data.name}
            </h1>
            <p className="mt-1 text-xs text-zinc-400">
              Sent with genuine apologies & lots of love by <b className="text-rose-300">{data.senderName}</b>
            </p>
          </header>

          {/* ========================================================
              2. THE FUNNY SORRY MACHINE
          ======================================================== */}
          <section className="mb-12 rounded-3xl border border-rose-500/30 bg-gradient-to-b from-rose-950/20 to-zinc-950 p-6 shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <span className="text-xs font-black font-mono text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4" /> The Sorry Department 🤖
              </span>
              <span className="text-[10px] text-zinc-400">100% Sincere</span>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed">
              "Hum galti theek karne ki instant guarantee nahi dete... par ek sincere sorry se shuruaat zaroor kar sakte hain! 😂❤️"
            </p>

            {/* Mode Switcher */}
            <div className="mt-5 grid grid-cols-3 gap-2">
              {[
                { id: "cute", label: "CUTE 🥺" },
                { id: "funny", label: "FUNNY 😂" },
                { id: "dilSe", label: "DIL SE ❤️" }
              ].map((t) => (
                <button
                  key={t.id}
                  onClick={() => setSorryTab(t.id as any)}
                  className={`cursor-pointer rounded-xl py-2.5 text-xs font-bold transition-all ${
                    sorryTab === t.id
                      ? "bg-rose-500 text-white shadow-lg shadow-rose-500/25"
                      : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Mode Content */}
            <div className="mt-4 rounded-2xl border border-zinc-800/80 bg-black/60 p-4 text-xs leading-relaxed font-mono">
              {sorryTab === "funny" && (
                <div className="text-amber-200">
                  <p>Madam/Sir, meri akal temporary maintenance par thi! 😭😂</p>
                  <p className="mt-2 text-zinc-300">
                    Ab software update ho chuka hai. Dobara aisi gadbad na karne ki poori koshish rahegi! Pls forgive kar do na! 🙏
                  </p>
                </div>
              )}
              {sorryTab === "cute" && (
                <div className="text-rose-200">
                  <p>Achha baba, sorry na... 🥺❤️</p>
                  <p className="mt-2 text-zinc-300">
                    Tum mere liye bohot important ho, aur main nahi chahta/chahti ki meri kisi stupidity ki wajah se tum hurt feel karo.
                  </p>
                </div>
              )}
              {sorryTab === "dilSe" && (
                <div className="text-pink-200">
                  <p>Mujhe ehsaas hai ki meri baat ya harkat se tumhe bura laga.</p>
                  <p className="mt-2 text-zinc-300">
                    Main tumhari feelings ko bilkul lightly nahi lena chahta. I am genuinely sorry. Jab tumhara mann ho, main tumhari baat sunne ko ready hoon.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================
              3. SIMULATED MANANE CHAT 💬
          ======================================================== */}
          <section className="mb-12 rounded-3xl border border-zinc-800 bg-[#0d0914] p-5 shadow-2xl">
            <div className="text-center mb-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                SIMULATED CONVERSATION LAB 💬
              </span>
            </div>

            <div className="space-y-3 font-sans text-xs">
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-zinc-200 border border-zinc-800">
                  Suno na... 🥺
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-white">
                  Ab kya hai? 😒
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-zinc-200 border border-zinc-800">
                  Ek chhoti si baat kehni thi...
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-white">
                  Kaho. 🙄
                </div>
              </div>

              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-tl-none bg-zinc-900 p-3 text-zinc-200 border border-zinc-800">
                  I'm really sorry. ❤️
                </div>
              </div>

              <div className="flex justify-end">
                <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-rose-600 p-3 text-white">
                  Bas itna hi? 🤔
                </div>
              </div>

              {chatReply && (
                <div className="flex justify-start animate-in fade-in">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-none bg-emerald-950/80 border border-emerald-500/40 p-3 text-emerald-200">
                    {chatReply}
                  </div>
                </div>
              )}
            </div>

            {/* Interactive choices */}
            {!chatReply && (
              <div className="mt-5 border-t border-zinc-800 pt-3">
                <p className="text-[11px] text-zinc-400 mb-2 text-center">Pick how to answer them:</p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => setChatReply("Nahi, sirf bolna nahi hai, galti samajhni bhi hai aur aage theek bhi karni hai! 🥺❤️")}
                    className="cursor-pointer rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-left text-zinc-300 hover:border-rose-500 transition-colors"
                  >
                    1. "Galti samajhni bhi hai aur sudharni bhi hai 🥺"
                  </button>
                  <button
                    onClick={() => setChatReply("Aur chocolate + ice cream treat bhi deni hai compensation mein! 🍦🍫😂")}
                    className="cursor-pointer rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs text-left text-zinc-300 hover:border-rose-500 transition-colors"
                  >
                    2. "Compensation mein treat bhi shamil hai! 🍦😂"
                  </button>
                </div>
              </div>
            )}
          </section>

          {/* ========================================================
              4. OPERATION: BRING BACK THAT SMILE (3 TASKS)
          ======================================================== */}
          <section className="mb-12 rounded-3xl border border-amber-500/30 bg-zinc-950 p-6 shadow-xl">
            <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block mb-1">
              OPERATION: BRING BACK THAT SMILE 🥹
            </span>
            <h2 className="text-lg font-black text-white">Complete 3 Tasks to Unlock Full Peace Treaty</h2>

            <div className="mt-5 space-y-4 text-xs">
              {/* Task 1 */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-200">TASK 1: Acknowledge the reason</span>
                  {task1Done && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                </div>
                <p className="text-zinc-400 mt-1">Reason: <b className="text-amber-300">{data.reasonTag || "Chhoti si misunderstanding"}</b></p>
                {!task1Done && (
                  <button
                    onClick={() => setTask1Done(true)}
                    className="cursor-pointer mt-2.5 rounded-lg bg-amber-500 px-3 py-1.5 text-[11px] font-bold text-black hover:bg-amber-400"
                  >
                    Acknowledge & Confirm ✅
                  </button>
                )}
              </div>

              {/* Task 2 */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-200">TASK 2: What I genuinely appreciate about you</span>
                  {task2Choice && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {[
                    "Tumhari cute smile 😊",
                    "Tumhara caring nature 💗",
                    "Tumhara funny side 😂",
                    "Tumhara saath nibhana 🤝"
                  ].map((c) => (
                    <button
                      key={c}
                      onClick={() => setTask2Choice(c)}
                      className={`cursor-pointer rounded-lg px-2.5 py-1 text-[11px] font-semibold border ${
                        task2Choice === c
                          ? "bg-rose-500 border-rose-500 text-white"
                          : "bg-black border-zinc-800 text-zinc-400 hover:text-white"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Task 3 */}
              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/50 p-3.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-zinc-200">TASK 3: Personal Promise</span>
                  {tasksCompleted && <CheckCircle2 className="h-4 w-4 text-emerald-400" />}
                </div>
                <p className="text-zinc-300 italic mt-1.5 font-mono">
                  "{data.customPromise || "Promise: Aage se aisi situation avoid karunga aur communication clear rakhunga."}"
                </p>
                {!tasksCompleted && (
                  <button
                    disabled={!task1Done || !task2Choice}
                    onClick={() => {
                      setTasksCompleted(true);
                      shootConfetti("hearts");
                    }}
                    className="cursor-pointer mt-3 w-full rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 py-2.5 text-xs font-bold text-black disabled:opacity-40"
                  >
                    Complete All Tasks & Unlock Peace Treaty 🔓
                  </button>
                )}
              </div>
            </div>
          </section>

          {/* ========================================================
              5. THE CUTE MOOD-LIFTER
          ======================================================== */}
          <section className="mb-12 rounded-3xl border border-rose-500/20 bg-gradient-to-b from-rose-950/20 to-black p-6 text-center">
            <span className="text-4xl mb-2 inline-block">🎈</span>
            <p className="text-xs text-rose-200/90 font-medium max-w-sm mx-auto">
              "Thoda sa smile karna allowed hai... par maaf karna compulsory nahi hai jab tak tumhara mann na maane! 🥺❤️"
            </p>

            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                onClick={() => setMoodMsg("Main apni galti maan chuka hoon. Ab meri beizzati ka daily subscription cancel kar do please! 😭😂")}
                className="cursor-pointer rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs font-bold text-zinc-300 hover:border-rose-400"
              >
                EK CUTE JOKE 😂
              </button>
              <button
                onClick={() => setMoodMsg("Naraz hona tumhara haq hai. Bas itna chahta hoon ki jab tum ready ho, hum araam se baat kar sakein. ❤️")}
                className="cursor-pointer rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs font-bold text-zinc-300 hover:border-rose-400"
              >
                EK PYARI SI BAAT 💗
              </button>
              <button
                onClick={() => {
                  setHugDelivered(true);
                  shootConfetti("hearts");
                }}
                className="cursor-pointer rounded-xl bg-zinc-900 border border-zinc-800 p-2.5 text-xs font-bold text-zinc-300 hover:border-rose-400"
              >
                EK VIRTUAL HUG 🤗
              </button>
            </div>

            {moodMsg && (
              <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-950/30 p-3 text-xs text-rose-200 animate-in fade-in">
                {moodMsg}
              </div>
            )}

            {hugDelivered && (
              <div className="mt-4 rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-3 text-xs text-emerald-300 animate-in zoom-in-95">
                🤗 <b>Virtual Hug Delivered!</b> Gussa thoda kam hua kya? Ek baar smile kar do! 🥹❤️
              </div>
            )}
          </section>

          {/* ========================================================
              6. THE SECRET APOLOGY LETTER
          ======================================================== */}
          <section className="mb-12 flex flex-col items-center text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Ek baat jo mazaak mein nahi kehna chahta...
            </span>

            <div className="w-full max-w-lg mt-4">
              {!letterOpen ? (
                <button
                  onClick={() => setLetterOpen(true)}
                  className="cursor-pointer group flex flex-col items-center justify-center w-full rounded-3xl border-2 border-dashed border-rose-500/40 bg-rose-950/20 p-8 hover:border-rose-400 transition-all shadow-xl"
                >
                  <Mail className="h-10 w-10 text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="mt-3 text-xs font-black uppercase tracking-wider text-white">
                    TAP TO OPEN SINCERE LETTER 💌
                  </span>
                </button>
              ) : (
                <div className="rounded-3xl border border-rose-400/30 bg-[#160e1d] p-6 sm:p-8 text-left shadow-2xl animate-in zoom-in-95">
                  <div className="font-serif-luxury text-sm leading-relaxed text-zinc-200 whitespace-pre-line">
                    {data.customLetter}
                  </div>
                  <div className="mt-6 border-t border-zinc-800 pt-3 text-right text-xs text-rose-300 font-bold">
                    Always here for you, {data.senderName} ❤️
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* ========================================================
              7. FINAL RESPECTFUL FINALE
          ======================================================== */}
          <section className="text-center rounded-3xl border border-zinc-800 bg-zinc-950 p-8 shadow-2xl">
            <span className="text-4xl">🥹❤️</span>
            <h3 className="mt-3 text-xl font-bold font-serif-luxury text-white">
              MISSION ALMOST COMPLETE!
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
              "Tumse narazgi door karna mere liye important hai, lekin tumhari feelings ki respect karna usse bhi zyada important hai. Take your time, main sunne ke liye yahin hoon."
            </p>

            <button
              onClick={handleShare}
              className="cursor-pointer mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 px-6 py-3 text-xs font-black uppercase text-white shadow-lg active:scale-95 transition-all"
            >
              {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
              <span>{copied ? "Link Copied!" : "Share / Copy Response 💌"}</span>
            </button>
          </section>

          {/* Footer */}
          <footer className="mt-16 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs text-zinc-500 hover:text-white"
            >
              <span>⚡ Mission: Manaao Them</span>
              <span>•</span>
              <span className="text-rose-400">Make one for your person</span>
            </Link>
          </footer>

        </div>
      )}

    </main>
  );
}
