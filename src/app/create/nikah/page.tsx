"use client";

import { useState } from "react";
import Link from "next/link";
import { encodeData } from "@/lib/encoder";
import { NikahPayload } from "@/lib/nikahTypes";
import { ArrowLeft, Copy, Check, Moon, Sparkles } from "lucide-react";

export default function NikahCreatorPage() {
  const [brideName, setBrideName] = useState("Zainab Fatima");
  const [groomName, setGroomName] = useState("Syed Aamir");
  const [brideFamily, setBrideFamily] = useState("Mr. & Mrs. Farooq Siddiqui");
  const [groomFamily, setGroomFamily] = useState("Mr. & Mrs. Tariq Hussain");
  const [weddingDate, setWeddingDate] = useState("2026-11-20T18:30");
  const [nikahDay, setNikahDay] = useState("Friday");
  const [nikahTime, setNikahTime] = useState("6:30 PM");
  const [venueName, setVenueName] = useState("The Grand Royal Palace & Banquet");
  const [venueAddress, setVenueAddress] = useState("Okhla Vihar, Main Ring Road, New Delhi");
  const [mapsUrl, setMapsUrl] = useState("https://maps.google.com/?q=New+Delhi");
  
  // Walima
  const [hasWalima, setHasWalima] = useState(true);
  const [walimaDate, setWalimaDate] = useState("Sunday, 22 November 2026");
  const [walimaTime, setWalimaTime] = useState("7:00 PM onwards");
  const [walimaVenue, setWalimaVenue] = useState("Al-Noor Heritage Hall, Golf Links, New Delhi");
  const [walimaAddress, setWalimaAddress] = useState("Golf Links Road, New Delhi");

  // RSVP Contact
  const [rsvpContactNumber, setRsvpContactNumber] = useState("919876543210");

  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();

    const payload: NikahPayload = {
      brideName: brideName.trim(),
      groomName: groomName.trim(),
      brideFamily: brideFamily.trim(),
      groomFamily: groomFamily.trim(),
      weddingDate,
      nikahDay: nikahDay.trim(),
      nikahTime: nikahTime.trim(),
      venueName: venueName.trim(),
      venueAddress: venueAddress.trim(),
      mapsUrl: mapsUrl.trim() || undefined,
      hasWalima,
      walimaDate: hasWalima ? walimaDate.trim() : undefined,
      walimaTime: hasWalima ? walimaTime.trim() : undefined,
      walimaVenue: hasWalima ? walimaVenue.trim() : undefined,
      walimaAddress: hasWalima ? walimaAddress.trim() : undefined,
      rsvpContactNumber: rsvpContactNumber.trim()
    };

    const encoded = encodeData(payload as any);
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    const isGitHubPages = origin.includes("github.io");
    const basePath = isGitHubPages ? "/vibe-wish" : "";
    setGeneratedLink(`${origin}${basePath}/w/nikah/#d=${encoded}`);
  };

  const handleCopy = () => {
    if (!generatedLink) return;
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <main className="min-h-screen bg-[#04120d] px-4 py-8 text-[#ebd8af] sm:px-8 font-serif">
      <div className="mx-auto max-w-2xl">
        <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-[#aabcb2] hover:text-[#ebd8af] mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Catalog
        </Link>

        <div className="rounded-3xl border border-[#d4af37]/40 bg-[#082218] p-6 mb-8 backdrop-blur-md shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#d4af37]/20 text-[#e5c07b] text-2xl border border-[#d4af37]/40">
              🌙
            </div>
            <div>
              <span className="rounded bg-[#d4af37]/15 px-2 py-0.5 text-[10px] font-sans font-bold text-[#e5c07b] uppercase tracking-wider">
                Royal Islamic Wedding Card
              </span>
              <h1 className="text-2xl font-bold text-white sm:text-3xl">
                The Nikah Invitation 🌙
              </h1>
            </div>
          </div>
          <p className="mt-3 text-xs text-[#c8d8cf] leading-relaxed font-sans">
            Bismillah opening, ivory-gold foil Nikah card, live countdown, authentic Sunnah Du'a, Walima details, Maps & calendar export.
          </p>
        </div>

        <form onSubmit={handleGenerate} className="space-y-5 rounded-3xl border border-[#d4af37]/30 bg-[#061d15] p-6 shadow-2xl font-sans text-xs">
          
          {/* Couple Names */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#fae5a8]">Bride's Name</label>
              <input
                type="text"
                required
                value={brideName}
                onChange={(e) => setBrideName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-[#fae5a8]">Groom's Name</label>
              <input
                type="text"
                required
                value={groomName}
                onChange={(e) => setGroomName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2.5 text-sm text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
          </div>

          {/* Families */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-[#fae5a8]">Bride's Parents / Family</label>
              <input
                type="text"
                required
                value={brideFamily}
                onChange={(e) => setBrideFamily(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-[#fae5a8]">Groom's Parents / Family</label>
              <input
                type="text"
                required
                value={groomFamily}
                onChange={(e) => setGroomFamily(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
          </div>

          {/* Date & Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#d4af37]/20 pt-4">
            <div>
              <label className="font-semibold text-[#fae5a8]">Wedding Date & Time</label>
              <input
                type="datetime-local"
                required
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-[#fae5a8]">Day (e.g. Friday)</label>
              <input
                type="text"
                required
                value={nikahDay}
                onChange={(e) => setNikahDay(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
            <div>
              <label className="font-semibold text-[#fae5a8]">Nikah Time (e.g. 6:30 PM)</label>
              <input
                type="text"
                required
                value={nikahTime}
                onChange={(e) => setNikahTime(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2 text-xs text-white focus:border-[#d4af37] focus:outline-none"
              />
            </div>
          </div>

          {/* Venue & Maps */}
          <div className="space-y-3 border-t border-[#d4af37]/20 pt-4">
            <div>
              <label className="font-semibold text-[#fae5a8]">Venue Name</label>
              <input
                type="text"
                required
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-[#fae5a8]">Complete Venue Address</label>
              <input
                type="text"
                required
                value={venueAddress}
                onChange={(e) => setVenueAddress(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="font-semibold text-[#fae5a8]">Google Maps URL (Optional)</label>
              <input
                type="url"
                value={mapsUrl}
                onChange={(e) => setMapsUrl(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2 text-xs text-white"
              />
            </div>
          </div>

          {/* Walima Checkbox */}
          <div className="border-t border-[#d4af37]/20 pt-4">
            <label className="flex items-center gap-2 cursor-pointer font-semibold text-[#fae5a8]">
              <input
                type="checkbox"
                checked={hasWalima}
                onChange={(e) => setHasWalima(e.target.checked)}
                className="h-4 w-4 accent-[#d4af37]"
              />
              <span>Include Walima Reception Section</span>
            </label>

            {hasWalima && (
              <div className="mt-3 space-y-3 pl-6 border-l border-[#d4af37]/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Walima Date"
                    value={walimaDate}
                    onChange={(e) => setWalimaDate(e.target.value)}
                    className="rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    placeholder="Walima Time"
                    value={walimaTime}
                    onChange={(e) => setWalimaTime(e.target.value)}
                    className="rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2 text-xs text-white"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Walima Venue & Address"
                  value={walimaVenue}
                  onChange={(e) => setWalimaVenue(e.target.value)}
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2 text-xs text-white"
                />
              </div>
            )}
          </div>

          {/* WhatsApp RSVP Host Number */}
          <div className="border-t border-[#d4af37]/20 pt-4">
            <label className="font-semibold text-[#fae5a8]">Host WhatsApp Number for Direct RSVP</label>
            <input
              type="text"
              placeholder="e.g. 919876543210 (with country code)"
              value={rsvpContactNumber}
              onChange={(e) => setRsvpContactNumber(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2 text-xs text-white"
            />
          </div>

          <button
            type="submit"
            className="w-full cursor-pointer rounded-2xl bg-gradient-to-r from-[#b38838] via-[#e5c07b] to-[#b38838] py-3.5 text-xs font-serif font-bold tracking-wider uppercase text-[#081a12] shadow-xl hover:opacity-95 active:scale-95 transition-transform"
          >
            Generate Royal Nikah Invitation Link 🌙✨
          </button>
        </form>

        {generatedLink && (
          <div className="mt-6 rounded-3xl border border-[#d4af37]/50 bg-[#082218]/90 p-5 backdrop-blur-xl">
            <span className="text-xs font-bold font-sans text-[#fae5a8] uppercase">
              ROYAL INVITATION LINK READY:
            </span>
            <div className="mt-2 flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={generatedLink}
                className="w-full rounded-xl border border-[#d4af37]/30 bg-black/80 px-3.5 py-2 text-xs text-[#fae5a8] font-mono select-all"
              />
              <button
                type="button"
                onClick={handleCopy}
                className="cursor-pointer rounded-xl bg-[#d4af37] px-4 py-2 text-xs font-bold text-[#061a14] hover:bg-[#fae5a8]"
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
