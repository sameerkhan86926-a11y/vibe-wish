"use client";

import { useEffect, useState, useRef } from "react";
import { decodeData } from "@/lib/encoder";
import { ChatBirthdayPayload } from "@/lib/chatTypes";
import { shootConfetti } from "@/lib/confetti";
import {
  ArrowLeft, Phone, Video, MoreVertical, CheckCheck,
  Send, Smile, Paperclip, Heart, Sparkles, Cake, Flame
} from "lucide-react";
import Link from "next/link";

interface Message {
  id: string;
  sender: "them" | "me";
  text: string;
  time: string;
  isLetter?: boolean;
}

export default function ChatBirthdayExperience() {
  const [data, setData] = useState<ChatBirthdayPayload | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [step, setStep] = useState<number>(0);
  const [showCakeSurprise, setShowCakeSurprise] = useState(false);
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [celebrationFinale, setCelebrationFinale] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const getCurrentTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        setData(decodeData(raw) as unknown as ChatBirthdayPayload);
      } else {
        setData({
          name: "Chirkut",
          senderName: "Sameer",
          relationship: "bestie",
          customLetter: "Honestly, tere bina life kaafi boring hoti. Chahe hum roz ladte rahein ya ek doosre ka mazaak udayein, tu mera sabse real dost hai. Happy Birthday! Hamesha aisa hi pagal rehna ❤️",
          treatLocation: "Dominos / Biryani House"
        });
      }
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Initial Chat Sequence
  useEffect(() => {
    if (!data) return;

    const introMessages = [
      "Heyyy 😂",
      "Sun na, ek baat bolun? 👀",
      "Naraz mat hona pehle 😭😂",
      "Teri age officially update ho gayi hai! 🎂🤣",
      "Congratulations! Tu ab aur bhi purana model ban gaya hai! 😂❤️"
    ];

    let timer: NodeJS.Timeout;
    let idx = 0;

    const pushNext = () => {
      if (idx < introMessages.length) {
        setIsTyping(true);
        timer = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: String(Date.now() + idx), sender: "them", text: introMessages[idx], time: getCurrentTime() }
          ]);
          idx++;
          timer = setTimeout(pushNext, 900);
        }, 1100);
      } else {
        // Step 1: Present initial user replies
        setStep(1);
      }
    };

    timer = setTimeout(pushNext, 1000);
    return () => clearTimeout(timer);
  }, [data]);

  // User Interactive Branches
  const handleUserReply = (replyText: string, branch: "aage" | "bakwas" | "emotional") => {
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: "me", text: replyText, time: getCurrentTime() }
    ]);
    setStep(0); // Hide buttons while typing

    let replies: string[] = [];
    if (branch === "bakwas") {
      replies = [
        "Sach sunke mirchi lagi na? 🌶️😂",
        "Achha chal, mazaak band… ❤️",
        "Aaj ka din mere liye bhi special hai, pata hai kyun? 🥹",
        "Because today, someone genuinely amazing was born. 💖"
      ];
    } else if (branch === "emotional") {
      replies = [
        "Arey abhi se emotional ho gaya? Tissue laaun? 😂🤧",
        "Lekin sach bolun toh...",
        "Aaj ke din dunya ko ek mast cartoon mila tha 💖",
        "And I am lucky to have you in my life. 🥹✨"
      ];
    } else {
      replies = [
        "Dheere dheere bataunga, sabar kar! 😂",
        "Achha chal, serious baat… ❤️",
        "Aaj ka din sirf tera nahi, hamara bhi special hai 🥹",
        "Because today, my favourite human entered this world. 💖"
      ];
    }

    let i = 0;
    const sendBranch = () => {
      if (i < replies.length) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [
            ...prev,
            { id: String(Date.now() + i), sender: "them", text: replies[i], time: getCurrentTime() }
          ]);
          i++;
          setTimeout(sendBranch, 900);
        }, 1200);
      } else {
        // Next Step: Trigger Surprise alert
        setTimeout(() => {
          triggerSurpriseIntro();
        }, 1200);
      }
    };
    sendBranch();
  };

  const triggerSurpriseIntro = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: "them", text: "WAITTTT! 😭", time: getCurrentTime() },
        { id: String(Date.now() + 1), sender: "them", text: "Ye normal chat nahi hai…", time: getCurrentTime() },
        { id: String(Date.now() + 2), sender: "them", text: "TERE LIYE EK SURPRISE HAI! 🎁", time: getCurrentTime() }
      ]);
      setStep(2); // Button: Tap to open surprise
    }, 1200);
  };

  const handleRevealCake = () => {
    setShowCakeSurprise(true);
    shootConfetti("party");
  };

  const handleBlowCake = () => {
    setCandlesBlown(true);
    shootConfetti("gold");
  };

  const handleRevealLetter = () => {
    setShowCakeSurprise(false);
    // Add Secret letter message inside chat
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: "them", text: "Ek secret baat bataun? 🤫❤️", time: getCurrentTime() },
        {
          id: String(Date.now() + 1),
          sender: "them",
          text: data?.customLetter || `Dear ${data?.name},\n\nHonestly, tere bina life kaafi boring hoti. Chahe hum roz ladte rahein ya ek doosre ka mazaak udayein, tu mera sabse real dost hai. Happy Birthday! Hamesha aisa hi pagal rehna ❤️`,
          time: getCurrentTime(),
          isLetter: true
        },
        { id: String(Date.now() + 2), sender: "them", text: `Achha ab birthday treat kab de raha hai? 😂🍕\nGift toh maine de diya! Ab teri baari hai! 😎🎂`, time: getCurrentTime() }
      ]);
      setStep(3); // Treat options
    }, 1500);
  };

  const handleTreatReply = (type: "confirm" | "kangaal") => {
    const userText = type === "confirm" ? "Treat Confirmed 😂🍕" : "Paise Nahi Hain 😭❌";
    setMessages((prev) => [
      ...prev,
      { id: String(Date.now()), sender: "me", text: userText, time: getCurrentTime() }
    ]);
    setStep(0);

    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const resp = type === "confirm"
        ? `Screenshot le liya hai! Ab mukar mat jaana! ${data?.treatLocation || "Party"} chalte hain! 🏃💨`
        : "Kidney bech ke de par treat toh deni padegi! Koi bahana nahi chalega! 🤣🔫";
      
      setMessages((prev) => [
        ...prev,
        { id: String(Date.now()), sender: "them", text: resp, time: getCurrentTime() }
      ]);

      setTimeout(() => {
        setCelebrationFinale(true);
        shootConfetti("hearts");
      }, 1500);
    }, 1200);
  };

  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#0c1317] flex justify-center items-center p-0 sm:p-4 text-zinc-100 font-sans">
      {/* Mobile Shell / WhatsApp Frame */}
      <div className="relative w-full max-w-md h-screen sm:h-[840px] bg-[#0b141a] sm:rounded-3xl border border-zinc-800 shadow-2xl flex flex-col overflow-hidden">
        
        {/* WhatsApp Top App Bar */}
        <header className="bg-[#1f2c34] px-3.5 py-3 flex items-center justify-between border-b border-zinc-800 z-10 shrink-0">
          <div className="flex items-center gap-2.5">
            <Link href="/" className="text-zinc-400 hover:text-white">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 font-bold text-white shadow overflow-hidden">
              {data.avatarUrl ? (
                <img src={data.avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
              ) : (
                <span>{data.name.charAt(0).toUpperCase()}</span>
              )}
            </div>
            <div>
              <h2 className="text-sm font-bold text-zinc-100 leading-tight">
                {data.name} 🎂❤️
              </h2>
              <p className="text-[11px] text-emerald-400 font-medium">
                {isTyping ? "typing..." : "online"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-zinc-400">
            <Video className="h-4 w-4 cursor-pointer hover:text-white" />
            <Phone className="h-4 w-4 cursor-pointer hover:text-white" />
            <MoreVertical className="h-4 w-4 cursor-pointer hover:text-white" />
          </div>
        </header>

        {/* WhatsApp Chat Wallpaper Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[radial-gradient(#1e2b33_1px,transparent_1px)] [background-size:16px_16px] relative">
          
          {/* Security Notice Pill */}
          <div className="mx-auto w-max max-w-[85%] rounded-lg bg-[#182229] px-3 py-1.5 text-center text-[11px] text-amber-300/80 shadow border border-amber-500/20">
            🔒 Messages to this chat are protected with high-voltage birthday banter.
          </div>

          {/* Render Messages */}
          {messages.map((m) => {
            const isMe = m.sender === "me";
            return (
              <div
                key={m.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
              >
                <div
                  className={`relative max-w-[82%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed shadow ${
                    isMe
                      ? "bg-[#005c4b] text-white rounded-tr-none"
                      : m.isLetter
                      ? "bg-gradient-to-br from-rose-950/70 to-zinc-900 border border-rose-500/40 text-rose-100 rounded-tl-none font-serif text-sm"
                      : "bg-[#202c33] text-zinc-100 rounded-tl-none"
                  }`}
                >
                  {m.isLetter && (
                    <div className="flex items-center gap-1.5 text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider mb-1.5">
                      <Heart className="h-3 w-3 fill-rose-500" /> Confession from {data.senderName}
                    </div>
                  )}
                  <p className="whitespace-pre-line">{m.text}</p>
                  <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-zinc-400">
                    <span>{m.time}</span>
                    {isMe && <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Realistic Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-none bg-[#202c33] px-4 py-2.5 shadow flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="h-2 w-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Reply Action Bar */}
        <div className="bg-[#1f2c34] p-3 border-t border-zinc-800 shrink-0">
          {/* Step 1: Branch Choices */}
          {step === 1 && (
            <div className="flex flex-wrap gap-2 justify-center py-1">
              <button
                onClick={() => handleUserReply("Aage bol jaldi 👀", "aage")}
                className="cursor-pointer rounded-full bg-[#005c4b] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#00755f] transition-all"
              >
                Aage bol 👀
              </button>
              <button
                onClick={() => handleUserReply("Bakwas band kar apni 😂", "bakwas")}
                className="cursor-pointer rounded-full bg-[#005c4b] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#00755f] transition-all"
              >
                Bakwas band kar 😂
              </button>
              <button
                onClick={() => handleUserReply("Emotional mat kar abhi 🥹", "emotional")}
                className="cursor-pointer rounded-full bg-[#005c4b] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#00755f] transition-all"
              >
                Emotional mat kar 🥹
              </button>
            </div>
          )}

          {/* Step 2: Open Surprise */}
          {step === 2 && (
            <div className="flex justify-center py-1">
              <button
                onClick={handleRevealCake}
                className="cursor-pointer w-full rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 py-3 text-xs font-black uppercase tracking-wider text-white shadow-lg active:scale-95 transition-transform"
              >
                OPEN YOUR SURPRISE 🎁
              </button>
            </div>
          )}

          {/* Step 3: Treat Confirmation Buttons */}
          {step === 3 && (
            <div className="flex gap-2 justify-center py-1">
              <button
                onClick={() => handleTreatReply("confirm")}
                className="cursor-pointer flex-1 rounded-xl bg-emerald-600 py-2.5 text-xs font-bold text-white hover:bg-emerald-500 active:scale-95"
              >
                Treat Confirmed 😂🍕
              </button>
              <button
                onClick={() => handleTreatReply("kangaal")}
                className="cursor-pointer flex-1 rounded-xl bg-red-600 py-2.5 text-xs font-bold text-white hover:bg-red-500 active:scale-95"
              >
                Paise Nahi Hain 😭❌
              </button>
            </div>
          )}

          {/* Normal Fake Input placeholder */}
          {step === 0 && (
            <div className="flex items-center gap-2 text-zinc-400">
              <Smile className="h-5 w-5" />
              <div className="flex-1 bg-[#2a3942] rounded-full px-4 py-2 text-xs text-zinc-500 select-none">
                Type a message...
              </div>
              <Paperclip className="h-5 w-5" />
              <div className="h-8 w-8 rounded-full bg-[#00a884] flex items-center justify-center text-white">
                <Send className="h-4 w-4" />
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            MODAL 1: THE UNEXPECTED CAKE SURPRISE
        ======================================================== */}
        {showCakeSurprise && (
          <div className="absolute inset-0 z-30 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-300">
            <span className="rounded-full bg-pink-500/20 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-pink-300 border border-pink-500/30">
              ✨ SURPRISE UNLOCKED ✨
            </span>
            <h2 className="mt-3 text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300">
              HAPPY BIRTHDAY, {data.name.toUpperCase()}!
            </h2>
            <p className="mt-1 text-xs text-zinc-300">Make a wish & blow the candles!</p>

            {/* Interactive Cake */}
            <div className="my-8 flex flex-col items-center">
              {/* Flames */}
              <div className="flex gap-4 mb-1">
                {[1, 2, 3].map((c) => (
                  <div key={c} className="flex flex-col items-center">
                    {!candlesBlown && (
                      <div className="h-5 w-2 rounded-full bg-gradient-to-t from-orange-500 to-yellow-300 animate-pulse shadow-[0_0_12px_#f59e0b]" />
                    )}
                    <div className="h-8 w-2 bg-pink-400 rounded-t-sm" />
                  </div>
                ))}
              </div>
              {/* Cake Body */}
              <div className="h-12 w-36 rounded-2xl bg-gradient-to-r from-amber-100 to-rose-200 border-2 border-white/40 shadow flex items-center justify-center">
                <span className="text-[10px] font-black text-zinc-800">★ BIRTHDAY VIBE ★</span>
              </div>
              <div className="-mt-1 h-16 w-52 rounded-3xl bg-gradient-to-r from-rose-300 to-purple-300 border-2 border-white/40 shadow-2xl flex items-center justify-center">
                <Cake className="h-6 w-6 text-white" />
              </div>
            </div>

            {!candlesBlown ? (
              <button
                onClick={handleBlowCake}
                className="cursor-pointer inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 px-6 py-3 text-xs font-black uppercase text-black shadow-lg active:scale-95"
              >
                <Flame className="h-4 w-4" /> Blow Candles ✨
              </button>
            ) : (
              <div className="flex flex-col items-center">
                <p className="text-xs font-bold text-emerald-400 mb-4">
                  Wish sent! Ab chal waapas chat pe... Ek secret baat batani hai 🤫
                </p>
                <button
                  onClick={handleRevealLetter}
                  className="cursor-pointer rounded-full bg-white px-7 py-3 text-xs font-black uppercase text-black hover:bg-zinc-200 active:scale-95"
                >
                  Haan Bata! 🤫💌
                </button>
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            MODAL 2: FULL-SCREEN CELEBRATION FINALE
        ======================================================== */}
        {celebrationFinale && (
          <div className="absolute inset-0 z-40 bg-gradient-to-b from-[#180f26] via-[#0d0914] to-black flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-90 duration-500">
            <span className="text-6xl animate-bounce">🎂👑❤️</span>
            <h1 className="mt-4 text-3xl font-black text-white font-serif-luxury">
              HAPPY BIRTHDAY, {data.name}!
            </h1>
            <p className="mt-3 text-sm text-pink-200/90 leading-relaxed max-w-xs">
              Chat khatam ho sakti hai, par teri bakchodi aur hamari memories kabhi nahi! 😂❤️
            </p>

            <div className="mt-6 rounded-2xl border border-zinc-800 bg-black/60 p-4 text-xs text-zinc-400 font-mono">
              From: <b className="text-emerald-400">{data.senderName}</b> • Relationship: <b className="text-pink-400">{data.relationship.toUpperCase()}</b>
            </div>

            <Link
              href="/"
              className="mt-8 rounded-full border border-zinc-700 bg-zinc-900 px-5 py-2 text-xs font-bold text-zinc-300 hover:text-white"
            >
              ⚡ Create Your Own Birthday Chat
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}
