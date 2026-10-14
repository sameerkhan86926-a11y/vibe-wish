"use client";

import { useEffect, useState, useRef } from "react";
import { decodeData } from "@/lib/encoder";
import { AakhriMessagePayload } from "@/lib/aakhriTypes";
import VoiceNotePlayer from "@/components/VoiceNotePlayer";
import {
  Lock, Unlock, ChevronLeft, MoreVertical, Wifi,
  Battery, CheckCheck, Clock, FileText, ArrowDown,
  Camera, Sparkles, RotateCcw, PenTool
} from "lucide-react";
import Link from "next/link";

export default function AakhriMessageReceiver() {
  const [data, setData] = useState<AakhriMessagePayload | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  
  // Dynamic Chat Pacing
  const [visibleMessages, setVisibleMessages] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [chatProgressIdx, setChatProgressIdx] = useState(0);

  // Modals & States
  const [selectedMemory, setSelectedMemory] = useState<any | null>(null);
  const [draftOpened, setDraftOpened] = useState(false);
  const [finalMemoryUnlocked, setFinalMemoryUnlocked] = useState(false);
  const [finalEndingReached, setFinalEndingReached] = useState(false);

  const [currentTimeStr, setCurrentTimeStr] = useState("23:42");
  const [currentDateStr, setCurrentDateStr] = useState("Tuesday, 14 October");

  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const d = new Date();
    setCurrentTimeStr(d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    setCurrentDateStr(d.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" }));

    if (typeof window !== "undefined") {
      const hash = window.location.hash.replace("#", "");
      const params = new URLSearchParams(hash || window.location.search);
      const raw = params.get("d");
      if (raw) {
        setData(decodeData(raw) as unknown as AakhriMessagePayload);
      } else {
        // High quality realistic default story
        setData({
          recipientName: "Noor",
          senderName: "Kabir",
          chatMessages: [
            "Hey... online ho?",
            "Pata nahi ye sab kaise start karun...",
            "Phone gallery scroll kar raha tha, aur achanak purani baatein yaad aane lagi.",
            "Shayad us waqt hum dono bohot young aur confused the.",
            "Lekin ek sach hamesha wahi raha...",
            "Bas aaj tumse kuch kehna tha."
          ],
          memories: [
            {
              id: "1",
              dateStr: "12 Nov 2022",
              imgUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600",
              caption: "Wo pehli baar jab hum bina kisi reason ke ghanton chalte rahe the. Koi jaldi nahi thi ghar jaane ki."
            },
            {
              id: "2",
              dateStr: "04 Mar 2023",
              imgUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600",
              caption: "Hawa thandi thi aur tumhari coffee thandi ho chuki thi, par baatein khatam hone ka naam nahi le rahi thi."
            }
          ],
          voiceTranscript: "Main bas ye kehna chahta tha ki chahe waqt aage badh gaya ho, lekin mere dil ka ek hissa hamesha tumhari khushi mangta rahega. Tum apna khayal rakhna.",
          unsentDraft: `Main kai baar type karke mita chuka hoon.\n\nKuch baatein bolne ke liye sahi waqt dhoondhte dhoondhte zindagi aage nikal jaati hai. Shayad main us waqt utna mature nahi tha jitna hona chahiye tha.\n\nPar agar ek cheez sach hai toh wo ye ki tum meri zindagi ka sabse khoobsurat chapter rahi ho. Bina kisi shiqwe ke, bas ek shukriya tumhari presence ke liye.`,
          finalSecret: `Har kahani ka anjaam shadi ya sath rehna nahi hota.\n\nKuch log zindagi mein isliye aate hain taaki wo humein mehsoos karwa sakein ki pyaar asal mein hota kya hai.\n\nTum jahan bhi raho, hamesha khush rehna. You will always be respected and remembered.`
        });
      }
    }
  }, []);

  // Sequential realistic message reveal
  useEffect(() => {
    if (!isUnlocked || !data) return;

    if (chatProgressIdx < data.chatMessages.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setVisibleMessages((prev) => [...prev, data.chatMessages[chatProgressIdx]]);
        setChatProgressIdx((prev) => prev + 1);
        chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 1600);

      return () => clearTimeout(timer);
    }
  }, [isUnlocked, chatProgressIdx, data]);

  if (!data) return null;

  return (
    <main className="min-h-screen bg-[#070709] text-zinc-100 flex items-center justify-center p-0 sm:p-4 selection:bg-zinc-700 selection:text-white font-sans overflow-x-hidden">
      
      {/* ========================================================
          PHONE HARDWARE BEZEL / CHASSIS
      ======================================================== */}
      <div className="relative w-full max-w-[420px] h-screen sm:h-[860px] bg-[#0c0d11] sm:rounded-[46px] border sm:border-zinc-800 shadow-2xl flex flex-col overflow-hidden sm:ring-8 sm:ring-zinc-900/60">
        
        {/* Dynamic Island / Hardware Speaker & Status Bar */}
        <div className="relative z-40 bg-transparent px-6 pt-3 pb-2 flex items-center justify-between text-xs font-mono text-zinc-300 shrink-0 select-none">
          <span>{currentTimeStr}</span>
          <div className="h-4 w-24 bg-black rounded-full border border-white/5 flex items-center justify-center" />
          <div className="flex items-center gap-1.5">
            <Wifi className="h-3 w-3" />
            <Battery className="h-3.5 w-3.5" />
          </div>
        </div>

        {/* ========================================================
            1. REAL PHONE LOCK SCREEN
        ======================================================== */}
        {!isUnlocked ? (
          <div className="relative flex-1 flex flex-col justify-between p-6 bg-[radial-gradient(#1e1f29_1px,transparent_1px)] [background-size:18px_18px] text-center select-none">
            {/* Top Date & Clock */}
            <div className="pt-8">
              <p className="text-xs font-mono text-zinc-400 tracking-wider uppercase">{currentDateStr}</p>
              <h1 className="text-6xl font-extralight tracking-tight text-white mt-1 font-mono">{currentTimeStr}</h1>
            </div>

            {/* Realistic Notification Card */}
            <div className="mx-auto w-full max-w-sm rounded-3xl bg-zinc-900/80 border border-white/10 p-4 backdrop-blur-xl text-left shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1.5 font-bold text-rose-300">
                  <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
                  PRIVATE MEMORY DRAFT
                </span>
                <span>Just now</span>
              </div>
              <h3 className="text-sm font-bold text-white mt-2">Ek message hai tumhare liye... 💌</h3>
              <p className="text-xs text-zinc-300 mt-0.5 leading-relaxed">
                Someone left an unsent story for you. Tap to unlock the private device.
              </p>
            </div>

            {/* Unlock Action Button */}
            <div className="pb-8 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setIsUnlocked(true)}
                className="cursor-pointer group flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-7 py-3 text-xs font-mono font-medium text-white backdrop-blur-md shadow-xl hover:bg-white/20 active:scale-95 transition-all"
              >
                <Lock className="h-3.5 w-3.5 text-rose-400 group-hover:hidden" />
                <Unlock className="h-3.5 w-3.5 text-emerald-400 hidden group-hover:block" />
                <span>Unlock My Phone</span>
              </button>
              <p className="text-[10px] text-zinc-500 font-mono mt-3">Swipe up or tap to access memory archive</p>
            </div>
          </div>
        ) : (
          /* ========================================================
              UNLOCKED PHONE: MESSAGING & ARCHIVE VIEW
          ======================================================== */
          <div className="flex-1 flex flex-col bg-[#0c0d11] overflow-hidden">
            
            {/* Realistic Messenger App Topbar */}
            <header className="px-4 py-3 bg-[#13151b] border-b border-white/5 flex items-center justify-between shrink-0 select-none">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsUnlocked(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center font-serif text-sm font-bold text-rose-200">
                  {data.senderName.charAt(0)}
                </div>
                <div>
                  <h2 className="text-xs font-bold text-zinc-100 flex items-center gap-1">
                    {data.senderName}
                    <span className="text-[10px] font-mono text-zinc-500 font-normal">({data.recipientName})</span>
                  </h2>
                  <p className="text-[10px] font-mono text-emerald-400">active now</p>
                </div>
              </div>

              <div className="flex items-center gap-3 text-zinc-400">
                <button
                  type="button"
                  onClick={() => setDraftOpened(true)}
                  className="cursor-pointer flex items-center gap-1 rounded-full bg-zinc-800 px-2.5 py-1 text-[10px] font-mono text-rose-300 border border-white/5 hover:bg-zinc-700"
                >
                  <FileText className="h-3 w-3" /> Drafts (1)
                </button>
                <MoreVertical className="h-4 w-4" />
              </div>
            </header>

            {/* Conversation Feed */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[radial-gradient(#181922_1px,transparent_1px)] [background-size:16px_16px]">
              
              <div className="text-center my-2">
                <span className="rounded-full bg-zinc-900/90 border border-white/5 px-3 py-1 text-[10px] font-mono text-zinc-500">
                  Conversation Decrypted • October 2026
                </span>
              </div>

              {/* Render sequential chat bubbles */}
              {visibleMessages.map((msg, i) => (
                <div key={i} className="flex justify-start animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-[#1c1e27] border border-white/5 p-3 text-xs text-zinc-200 leading-relaxed shadow-sm font-sans">
                    <p>{msg}</p>
                    <div className="mt-1 flex items-center justify-end gap-1 text-[9px] font-mono text-zinc-500">
                      <span>{currentTimeStr}</span>
                      <CheckCheck className="h-3 w-3 text-blue-400" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Realistic Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="rounded-2xl rounded-tl-sm bg-[#1c1e27] border border-white/5 px-3 py-2 flex items-center gap-1 shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              )}

              {/* 3. HIDDEN MEMORIES SECTION (Unlocked mid-chat) */}
              {chatProgressIdx >= 3 && (
                <div className="my-6 rounded-2xl border border-white/5 bg-black/40 p-3.5 animate-in fade-in duration-500">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2.5">
                    <span className="flex items-center gap-1 text-rose-300 font-bold">
                      <Camera className="h-3.5 w-3.5" /> RECOVERED CAMERA ROLL
                    </span>
                    <span className="text-[10px] text-zinc-500">{data.memories.length} files</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {data.memories.map((mem) => (
                      <div
                        key={mem.id}
                        onClick={() => setSelectedMemory(mem)}
                        className="cursor-pointer group relative aspect-square rounded-xl overflow-hidden border border-white/10 bg-zinc-900"
                      >
                        <img
                          src={mem.imgUrl}
                          alt="Memory"
                          className="h-full w-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/40 to-transparent p-2 text-[10px] font-mono text-zinc-300">
                          {mem.dateStr}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. UNSENT VOICE MESSAGE */}
              {chatProgressIdx >= data.chatMessages.length && (
                <div className="my-4 animate-in fade-in duration-500">
                  <p className="text-[10px] font-mono text-zinc-500 mb-1.5 uppercase tracking-wider">Unsent Audio Memo</p>
                  <VoiceNotePlayer
                    audioUrl={data.voiceAudioUrl}
                    transcript={data.voiceTranscript}
                  />
                </div>
              )}

              {/* 6. UNLOCK THE FINAL LOCKED MEMORY CARD */}
              {chatProgressIdx >= data.chatMessages.length && (
                <div className="my-6 pt-4 border-t border-white/5 animate-in fade-in duration-500">
                  <div className="rounded-2xl border border-rose-500/20 bg-gradient-to-b from-rose-950/20 to-black/60 p-4 text-center">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold">
                      Classified Vault
                    </span>
                    <h3 className="text-sm font-serif text-white mt-1">There's one thing I never told you...</h3>
                    
                    {!finalMemoryUnlocked ? (
                      <button
                        type="button"
                        onClick={() => setFinalMemoryUnlocked(true)}
                        className="cursor-pointer mt-3 inline-flex items-center gap-1.5 rounded-full bg-rose-500/20 border border-rose-500/40 px-5 py-2 text-xs font-mono font-medium text-rose-200 hover:bg-rose-500 hover:text-white transition-all active:scale-95"
                      >
                        <Lock className="h-3 w-3" /> Decrypt Final Message
                      </button>
                    ) : (
                      <div className="mt-4 rounded-xl bg-black/80 border border-white/10 p-4 text-left text-xs font-serif leading-relaxed text-zinc-200 whitespace-pre-line animate-in zoom-in-95">
                        {data.finalSecret}
                        <div className="mt-4 text-right">
                          <button
                            type="button"
                            onClick={() => setFinalEndingReached(true)}
                            className="cursor-pointer text-[11px] font-mono text-rose-400 hover:underline inline-flex items-center gap-1"
                          >
                            <span>Read Final Epilogue</span>
                            <ArrowDown className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div ref={chatBottomRef} />
            </div>

            {/* Bottom Input Mimic */}
            <div className="px-4 py-3 bg-[#13151b] border-t border-white/5 flex items-center justify-between text-xs text-zinc-500 font-mono select-none">
              <span>Read-only archive mode</span>
              <button
                type="button"
                onClick={() => setDraftOpened(true)}
                className="text-rose-400 font-bold hover:underline"
              >
                Open Unsent Draft 💌
              </button>
            </div>
          </div>
        )}

        {/* ========================================================
            MODAL: INDIVIDUAL PHOTO MEMORY DIALOGUE
        ======================================================== */}
        {selectedMemory && (
          <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md p-6 flex flex-col justify-between animate-in fade-in duration-300">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400">
              <span>{selectedMemory.dateStr}</span>
              <button
                type="button"
                onClick={() => setSelectedMemory(null)}
                className="cursor-pointer text-white font-bold px-2 py-1 bg-zinc-800 rounded-lg"
              >
                Close ✕
              </button>
            </div>

            <div className="my-auto">
              <div className="aspect-4/3 rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <img src={selectedMemory.imgUrl} alt="Memory" className="h-full w-full object-cover" />
              </div>
              <p className="mt-4 text-xs font-serif text-zinc-200 leading-relaxed italic bg-zinc-900/60 p-4 rounded-2xl border border-white/5">
                "{selectedMemory.caption}"
              </p>
            </div>

            <p className="text-center text-[10px] font-mono text-zinc-500">Archived Camera Roll Item</p>
          </div>
        )}

        {/* ========================================================
            MODAL 5: THE MESSAGE THAT WAS NEVER SENT (HANDWRITTEN NOTE)
        ======================================================== */}
        {draftOpened && (
          <div className="absolute inset-0 z-50 bg-[#0e0f14]/95 backdrop-blur-xl p-6 flex flex-col justify-between animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center text-xs font-mono text-zinc-400 border-b border-white/10 pb-3">
              <span className="flex items-center gap-1.5 text-rose-300 font-bold">
                <PenTool className="h-3.5 w-3.5" /> UNSENT DRAFT NOTES
              </span>
              <button
                type="button"
                onClick={() => setDraftOpened(false)}
                className="cursor-pointer text-zinc-300 hover:text-white px-2 py-1 bg-zinc-800 rounded-lg"
              >
                Close ✕
              </button>
            </div>

            {/* Handwritten Paper Styling */}
            <div className="my-auto rounded-3xl bg-[#181922] border border-white/10 p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-rose-500/40 via-purple-500/40 to-transparent" />
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-3">
                Subject: The words I couldn't send
              </p>
              <div className="font-serif text-sm leading-relaxed text-zinc-200 whitespace-pre-line">
                {data.unsentDraft}
              </div>
              <div className="mt-6 pt-3 border-t border-white/5 text-right text-xs font-serif text-zinc-400">
                — {data.senderName}
              </div>
            </div>

            <p className="text-center text-[10px] font-mono text-zinc-500">Saved in device draft memory • Never transmitted</p>
          </div>
        )}

        {/* ========================================================
            7. FINAL ENDING — REAL FEELINGS EPILOGUE
        ======================================================== */}
        {finalEndingReached && (
          <div className="absolute inset-0 z-50 bg-black p-6 flex flex-col justify-between text-center animate-in fade-in duration-500 select-none">
            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setFinalEndingReached(false)}
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300"
              >
                Back to Chat ✕
              </button>
            </div>

            <div className="my-auto max-w-xs mx-auto">
              <span className="text-3xl text-zinc-500">🕊️</span>
              <div className="mt-6 font-serif text-sm sm:text-base leading-relaxed text-zinc-300 whitespace-pre-line space-y-3">
                <p>"Har story ka perfect ending nahi hota...</p>
                <p>Kuch memories bas dil ke paas reh jaati hain.</p>
                <p>Aur kuch baatein aisi hoti hain,</p>
                <p className="text-rose-300 font-bold">jo kehne mein der ho jaati hai."</p>
              </div>

              <div className="mt-10 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setFinalEndingReached(false);
                    setChatProgressIdx(0);
                    setVisibleMessages([]);
                  }}
                  className="cursor-pointer flex items-center justify-center gap-1.5 rounded-full bg-zinc-900 border border-white/10 py-3 text-xs font-mono text-zinc-300 hover:bg-zinc-800"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Read It Again 💌
                </button>

                <Link
                  href="/create/aakhri"
                  className="flex items-center justify-center gap-1.5 rounded-full bg-gradient-to-r from-rose-600 to-purple-600 py-3 text-xs font-mono font-bold text-white shadow-lg"
                >
                  <Sparkles className="h-3.5 w-3.5" /> Create Your Own Story ✨
                </Link>
              </div>
            </div>

            <p className="text-[10px] font-mono text-zinc-600">EK AAKHRI MESSAGE • A Story That Feels Real</p>
          </div>
        )}

      </div>
    </main>
  );
}
