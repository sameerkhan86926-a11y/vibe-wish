"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { AakhriMessagePayload } from "@/lib/aakhriTypes";
import { ArrowLeft, Copy, Check } from "lucide-react";

export default function AakhriCreatorPage() {
  const [recipientName, setRecipientName] = useState("Noor");
  const [senderName, setSenderName] = useState("Kabir");

  const [msg1, setMsg1] = useState("Hey... online ho?");
  const [msg2, setMsg2] = useState("Pata nahi ye sab kaise start karun...");
  const [msg3, setMsg3] = useState("Phone gallery scroll kar raha tha, aur achanak purani baatein yaad aane lagi.");
  const [msg4, setMsg4] = useState("Bas aaj tumse kuch kehna tha.");

  const [photo1Url, setPhoto1Url] = useState("https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600");
  const [caption1, setCaption1] = useState("Wo pehli baar jab hum bina kisi reason ke ghanton chalte rahe the.");
  const [date1, setDate1] = useState("12 Nov 2022");

  const [photo2Url, setPhoto2Url] = useState("https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600");
  const [caption2, setCaption2] = useState("Hawa thandi thi aur baatein khatam hone ka naam nahi le rahi thi.");
  const [date2, setDate2] = useState("04 Mar 2023");

  const [voiceAudioUrl, setVoiceAudioUrl] = useState("");
  const [voiceTranscript, setVoiceTranscript] = useState(
    "Main bas ye kehna chahta tha ki chahe waqt aage badh gaya ho, lekin mere dil ka ek hissa hamesha tumhari khushi mangta rahega. Tum apna khayal rakhna."
  );

  const [unsentDraft, setUnsentDraft] = useState(
    `Main kai baar type karke mita chuka hoon.\n\nKuch baatein bolne ke liye sahi waqt dhoondhte dhoondhte zindagi aage nikal jaati hai. Shayad main us waqt utna mature nahi tha jitna hona chahiye tha.\n\nPar agar ek cheez sach hai toh wo ye ki tum meri zindagi ka sabse khoobsurat chapter rahi ho. Bina kisi shiqwe ke, bas ek shukriya tumhari presence ke liye.`
  );

  const [finalSecret, setFinalSecret] = useState(
    `Har kahani ka anjaam shadi ya sath rehna nahi hota.\n\nKuch log zindagi mein isliye aate hain taaki wo humein mehsoos karwa sakein ki pyaar asal mein hota kya hai.\n\nTum jahan bhi raho, hamesha khush rehna. You will always be respected and remembered.`
  );

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const fallbackImg1 = "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=600";
    const fallbackImg2 = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600";

    const cleanImg1 = photo1Url.trim().length > 5 ? photo1Url.trim() : fallbackImg1;
    const cleanImg2 = photo2Url.trim().length > 5 ? photo2Url.trim() : fallbackImg2;

    const payload: AakhriMessagePayload = {
      recipientName: recipientName.trim(),
      senderName: senderName.trim(),
      chatMessages: [msg1.trim(), msg2.trim(), msg3.trim(), msg4.trim()].filter(Boolean),
      memories: [
        { id: "1", dateStr: date1.trim() || "Nov 2022", imgUrl: cleanImg1, caption: caption1.trim() || "Memory 1" },
        { id: "2", dateStr: date2.trim() || "Mar 2023", imgUrl: cleanImg2, caption: caption2.trim() || "Memory 2" }
      ],
      voiceAudioUrl: voiceAudioUrl.trim() || undefined,
      voiceTranscript: voiceTranscript.trim(),
      unsentDraft: unsentDraft.trim(),
      finalSecret: finalSecret.trim()
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    // Base path dynamic match
    const isGitHubPages = origin.includes("github.io");
    const basePath = isGitHubPages ? "/vibe-wish" : "";
    setGeneratedLink(`${origin}${basePath}/w/aakhri/#d=${encoded}`);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-8 text-zinc-100 sm:px-8">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-white mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-6 mb-8 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-800 text-rose-300 text-2xl border border-white/5">
              📱
            </div>
            <div>
              <span className="rounded bg-rose-500/10 px-2 py-0.5 text-[10px] font-mono font-bold text-rose-300 uppercase tracking-wider">
                Realistic Smartphone Memory OS
              </span>
              <h1 className="text-2xl font-black text-white sm:text-3xl font-serif">
                EK AAKHRI MESSAGE 💌
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-zinc-400 leading-relaxed font-sans">
            Real phone lock screen, notification banner, progressive chat pacing, camera roll memories, voice memo waveform aur unsent handwritten draft.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5 rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-rose-300">Recipient Name (Whom it's for)</label>
              <input
                type="text"
                required
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-rose-300">Your Name (Sender)</label>
              <input
                type="text"
                required
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-sm text-white focus:border-rose-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Sequential Chat Lines */}
          <div className="space-y-2 border-t border-zinc-800/80 pt-4">
            <span className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider">
              1. Sequential Chat Lines (Paced appearance)
            </span>
            <input
              type="text"
              value={msg1}
              onChange={(e) => setMsg1(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
            />
            <input
              type="text"
              value={msg2}
              onChange={(e) => setMsg2(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
            />
            <input
              type="text"
              value={msg3}
              onChange={(e) => setMsg3(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
            />
            <input
              type="text"
              value={msg4}
              onChange={(e) => setMsg4(e.target.value)}
              className="w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200 focus:border-rose-500 focus:outline-none"
            />
          </div>

          {/* Memories (Both Photo 1 & Photo 2) */}
          <div className="space-y-4 border-t border-zinc-800/80 pt-4">
            <span className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-wider block">
              2. Camera Roll Moments (Real Photo Memories)
            </span>

            {/* Photo 1 */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800 space-y-2">
              <span className="text-[11px] font-bold text-rose-400 font-mono">Photo Memory #1</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Date (e.g. 12 Nov 2022)"
                  value={date1}
                  onChange={(e) => setDate1(e.target.value)}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
                />
                <input
                  type="url"
                  placeholder="Photo 1 Direct URL"
                  value={photo1Url}
                  onChange={(e) => setPhoto1Url(e.target.value)}
                  className="sm:col-span-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
                />
              </div>
              <input
                type="text"
                placeholder="Photo 1 Caption"
                value={caption1}
                onChange={(e) => setCaption1(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
              />
            </div>

            {/* Photo 2 */}
            <div className="p-3.5 rounded-2xl bg-black/60 border border-zinc-800 space-y-2">
              <span className="text-[11px] font-bold text-rose-400 font-mono">Photo Memory #2</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Date (e.g. 04 Mar 2023)"
                  value={date2}
                  onChange={(e) => setDate2(e.target.value)}
                  className="rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
                />
                <input
                  type="url"
                  placeholder="Photo 2 Direct URL"
                  value={photo2Url}
                  onChange={(e) => setPhoto2Url(e.target.value)}
                  className="sm:col-span-2 rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
                />
              </div>
              <input
                type="text"
                placeholder="Photo 2 Caption"
                value={caption2}
                onChange={(e) => setCaption2(e.target.value)}
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-200"
              />
            </div>
          </div>

          {/* Voice Memo Transcript */}
          <div className="border-t border-zinc-800/80 pt-4">
            <label className="text-xs font-semibold text-rose-300">
              3. Voice Memo Transcript / Optional Audio URL
            </label>
            <input
              type="url"
              placeholder="Direct Audio MP3 URL (Optional - leave empty for demo transcript)"
              value={voiceAudioUrl}
              onChange={(e) => setVoiceAudioUrl(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200"
            />
            <textarea
              rows={2}
              value={voiceTranscript}
              onChange={(e) => setVoiceTranscript(e.target.value)}
              className="mt-2 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2 text-xs text-zinc-200 leading-relaxed"
            />
          </div>

          {/* Unsent Draft */}
          <div className="border-t border-zinc-800/80 pt-4">
            <label className="text-xs font-semibold text-rose-300">
              4. The Message That Was Never Sent (Handwritten Draft)
            </label>
            <textarea
              rows={4}
              required
              value={unsentDraft}
              onChange={(e) => setUnsentDraft(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-zinc-200 leading-relaxed font-serif"
            />
          </div>

          {/* Final Secret */}
          <div className="border-t border-zinc-800/80 pt-4">
            <label className="text-xs font-semibold text-rose-300">
              5. Final Decrypted Truth (The Closing Reflection)
            </label>
            <textarea
              rows={3}
              required
              value={finalSecret}
              onChange={(e) => setFinalSecret(e.target.value)}
              className="mt-1 w-full rounded-xl border border-zinc-800 bg-black px-3.5 py-2.5 text-xs text-zinc-200 leading-relaxed font-serif"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-rose-600 to-purple-600 py-3.5 text-xs font-mono font-bold tracking-wider uppercase text-white shadow-xl hover:opacity-95 active:scale-95 transition-transform"
          >
            Generate Real Smartphone Memory Link 📱💌
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-rose-500/40 bg-zinc-900/80 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold font-mono text-rose-300 uppercase">
              SMARTPHONE EXPERIENCE LINK READY:
            </span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full rounded-xl border border-zinc-800 bg-black/80 px-3.5 py-2 text-xs text-zinc-300 font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer rounded-xl bg-rose-500 px-4 py-2 text-xs font-bold text-white hover:bg-rose-400"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
