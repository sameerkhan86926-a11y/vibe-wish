"use client";

import { useEffect, useState } from "react";
import { decodeData } from "@/lib/encoder";
import { NikahPayload } from "@/lib/nikahTypes";
import IslamicAmbientCanvas from "@/components/IslamicAmbientCanvas";
import { shootConfetti } from "@/lib/confetti";
import {
  Calendar, MapPin, Clock, Moon, Sparkles,
  ExternalLink, Check, Send, RotateCcw, Heart
} from "lucide-react";
import Link from "next/link";

export default function NikahInvitationReceiver() {
  const [data, setData] = useState<NikahPayload | null>(null);
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);

  // Live Countdown state
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number; isPassed: boolean }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPassed: false,
  });

  // Real RSVP Form state (direct WhatsApp / SMS relay)
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
  const [attendance, setAttendance] = useState<"attending" | "regret">("attending");
  const [guestDua, setGuestDua] = useState("");
  const [rsvpSent, setRsvpSent] = useState(false);

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
          const decoded = decodeData(rawData) as unknown as NikahPayload;
          if (decoded && decoded.brideName) {
            setData(decoded);
            return;
          }
        } catch (e) {
          console.error("Decode error", e);
        }
      }

      // Elegant Luxury Default
      setData({
        brideName: "Zainab Fatima",
        groomName: "Syed Aamir",
        brideFamily: "Mr. & Mrs. Farooq Siddiqui",
        groomFamily: "Mr. & Mrs. Tariq Hussain",
        weddingDate: "2026-11-20T18:00:00",
        nikahDay: "Friday",
        nikahTime: "6:30 PM",
        venueName: "The Grand Royal Palace & Banquet",
        venueAddress: "Okhla Vihar, Main Ring Road, New Delhi",
        mapsUrl: "https://maps.google.com/?q=New+Delhi",
        hasWalima: true,
        walimaDate: "Sunday, 22 November 2026",
        walimaTime: "7:00 PM onwards",
        walimaVenue: "Al-Noor Heritage Hall, Golf Links, New Delhi",
        walimaAddress: "Golf Links Road, New Delhi",
        rsvpContactNumber: "919876543210"
      });
    }
  }, []);

  // Live Countdown Logic
  useEffect(() => {
    if (!data?.weddingDate) return;

    const interval = setInterval(() => {
      const targetTime = new Date(data.weddingDate).getTime();
      const now = new Date().getTime();
      const diff = targetTime - now;

      if (isNaN(targetTime) || diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        clearInterval(interval);
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data]);

  const handleOpenInvitation = () => {
    setIsInvitationOpened(true);
    shootConfetti("gold");
  };

  // Generate Native .ics Calendar File for instant Add to Calendar
  const handleAddToCalendar = () => {
    if (!data) return;
    const eventDate = new Date(data.weddingDate);
    const startStr = !isNaN(eventDate.getTime())
      ? eventDate.toISOString().replace(/-|:|\.\d\d\d/g, "")
      : "20261120T183000Z";
    const endStr = !isNaN(eventDate.getTime())
      ? new Date(eventDate.getTime() + 4 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d\d\d/g, "")
      : "20261120T223000Z";

    const icsData = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//The Nikah Invitation//EN",
      "BEGIN:VEVENT",
      `SUMMARY:The Nikah Ceremony of ${data.brideName} & ${data.groomName}`,
      `DESCRIPTION:Blessed wedding celebration of ${data.brideName} and ${data.groomName}. Venue: ${data.venueName}`,
      `LOCATION:${data.venueName}, ${data.venueAddress}`,
      `DTSTART:${startStr}`,
      `DTEND:${endStr}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\n");

    const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", `Nikah-${data.brideName}-${data.groomName}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Direct WhatsApp RSVP Relay
  const handleSendRsvp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    const message = `Assalamu Alaikum! RSVP for ${data?.brideName} & ${data?.groomName}'s Nikah:\n` +
      `Guest Name: ${guestName.trim()}\n` +
      `Total Guests: ${guestCount}\n` +
      `Status: ${attendance === "attending" ? "Insha'Allah Will Attend 🤍" : "Unable to Attend (With sincere Du'as) 🤲"}\n` +
      (guestDua.trim() ? `Du'a/Message: ${guestDua.trim()}` : "");

    const targetPhone = data?.rsvpContactNumber || "919876543210";
    const waUrl = `https://wa.me/${targetPhone}?text=${encodeURIComponent(message)}`;

    window.open(waUrl, "_blank");
    setRsvpSent(true);
    shootConfetti("gold");
  };

  if (!data) return null;

  return (
    <main className="relative min-h-screen bg-[#05140f] text-[#f4eedb] selection:bg-[#c9a050] selection:text-[#05140f] font-sans overflow-x-hidden">
      
      {/* Illuminated Golden Atmosphere Canvas */}
      <IslamicAmbientCanvas />

      {/* Subtle Islamic Arch & Mosque Silhouette Background Overlay */}
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,#0c2c20_0%,#04100c_75%)] opacity-95 z-0" />
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(#c9a05012_1px,transparent_1px)] [background-size:24px_24px] z-0" />

      {/* ========================================================
          1. OPENING SCREEN — BISMILLAH & ROYAL ENTRANCE
      ======================================================== */}
      {!isInvitationOpened ? (
        <section className="relative z-20 min-h-screen flex flex-col items-center justify-center p-6 text-center animate-in fade-in duration-700">
          
          {/* Hanging Fanoos / Golden Crescent Icon */}
          <div className="relative mb-6 flex flex-col items-center">
            <div className="h-10 w-[1px] bg-gradient-to-b from-transparent via-[#d4af37] to-[#e5c07b]" />
            <div className="flex h-20 w-20 items-center justify-center rounded-full border border-[#d4af37]/40 bg-[#07241a]/80 shadow-[0_0_50px_rgba(212,175,55,0.4)] backdrop-blur-md">
              <Moon className="h-10 w-10 text-[#e5c07b] fill-[#e5c07b]/30" />
            </div>
          </div>

          {/* Authentic Arabic Bismillah */}
          <div className="mb-4">
            <p className="font-serif text-3xl sm:text-5xl leading-loose text-transparent bg-clip-text bg-gradient-to-r from-[#fae5a8] via-[#e5c07b] to-[#b38838] tracking-wide select-none drop-shadow-[0_2px_12px_rgba(212,175,55,0.35)]">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="mt-2 text-xs sm:text-sm font-serif italic text-[#c8d8cf]/80 max-w-md mx-auto">
              "In the name of Allah, the Most Gracious, the Most Merciful."
            </p>
          </div>

          <div className="my-6 max-w-sm border-t border-b border-[#d4af37]/30 py-4">
            <p className="text-xs sm:text-sm font-serif text-[#ebd8af] leading-relaxed tracking-wider uppercase">
              With the blessings of Allah, <br />
              we invite you to celebrate a beautiful beginning.
            </p>
          </div>

          <button
            type="button"
            onClick={handleOpenInvitation}
            className="cursor-pointer group relative inline-flex items-center gap-3 rounded-full border border-[#d4af37]/60 bg-gradient-to-r from-[#0d3b2b] via-[#14533c] to-[#0d3b2b] px-9 py-4 text-xs font-serif font-bold uppercase tracking-[0.25em] text-[#fae5a8] shadow-[0_0_35px_rgba(212,175,55,0.35)] hover:scale-105 active:scale-95 transition-all"
          >
            <span>OPEN WEDDING INVITATION</span>
            <Moon className="h-4 w-4 text-[#e5c07b] group-hover:rotate-12 transition-transform" />
          </button>
        </section>
      ) : (
        /* ========================================================
            2. THE WEDDING INVITATION ODYSSEY
        ======================================================== */
        <div className="relative z-20 mx-auto max-w-2xl px-4 py-16 sm:px-6 space-y-16 animate-in fade-in duration-1000">

          {/* Top Heritage Emblem */}
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#d4af37]/40 bg-[#09261c]/80 px-4 py-1 text-xs font-serif text-[#ebd8af] backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-[#d4af37]" />
              <span>THE NIKAH CEREMONY INVITATION</span>
            </span>
          </div>

          {/* ========================================================
              CARD: IVORY & GOLD FOIL TEXTURED NIKAH CARD
          ======================================================== */}
          <section className="relative rounded-[36px] border-2 border-[#d4af37]/50 bg-gradient-to-b from-[#fdfbf7] to-[#f7f2e7] p-8 sm:p-12 text-[#1c2c24] shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden">
            
            {/* Delicate Islamic Corner Ornaments */}
            <div className="absolute top-3 left-3 text-[#d4af37] text-2xl select-none opacity-80">❖</div>
            <div className="absolute top-3 right-3 text-[#d4af37] text-2xl select-none opacity-80">❖</div>
            <div className="absolute bottom-3 left-3 text-[#d4af37] text-2xl select-none opacity-80">❖</div>
            <div className="absolute bottom-3 right-3 text-[#d4af37] text-2xl select-none opacity-80">❖</div>

            {/* Inner Gold Foil Frame Border */}
            <div className="rounded-[26px] border border-[#d4af37]/40 p-6 sm:p-8 text-center flex flex-col items-center">
              
              <p className="font-serif text-2xl sm:text-3xl text-[#0b3827] leading-relaxed mb-2">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>

              <span className="text-[11px] font-serif uppercase tracking-[0.3em] text-[#7a6b47] block mb-4">
                Together with their families
              </span>

              {/* Bride & Groom Royal Typography */}
              <div className="my-4 space-y-2">
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#092b1e] tracking-tight">
                  {data.brideName}
                </h2>
                <div className="flex items-center justify-center gap-3 text-[#c9a050]">
                  <span className="h-[1px] w-12 bg-[#c9a050]" />
                  <span className="font-serif text-2xl italic font-bold">&</span>
                  <span className="h-[1px] w-12 bg-[#c9a050]" />
                </div>
                <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#092b1e] tracking-tight">
                  {data.groomName}
                </h2>
              </div>

              <p className="mt-4 text-xs sm:text-sm font-serif italic text-[#4a5a51] max-w-md leading-relaxed">
                "Request the pleasure of your gracious presence and heartfelt du'as at the celebration of their Nikah."
              </p>

              <div className="mt-8 pt-4 border-t border-[#d4af37]/30 text-xs font-serif text-[#7a6b47]">
                <p>Cordially invited by:</p>
                <p className="font-bold text-[#092b1e] mt-1">{data.brideFamily} & {data.groomFamily}</p>
              </div>

            </div>
          </section>

          {/* ========================================================
              3. NIKAH CEREMONY DETAILS (ISLAMIC ARCH STYLE)
          ======================================================== */}
          <section className="relative rounded-[36px] border border-[#d4af37]/40 bg-gradient-to-b from-[#09291d] via-[#061e15] to-[#04140e] p-8 sm:p-10 text-center shadow-2xl backdrop-blur-xl">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/30 text-[#ebd8af] text-[10px] font-serif uppercase tracking-widest mb-3">
              Sacred Vows
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fae5a8] via-[#e5c07b] to-[#b38838]">
              The Nikah Ceremony
            </h3>

            <div className="my-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              <div className="rounded-2xl border border-[#d4af37]/25 bg-[#051810]/70 p-4">
                <span className="flex items-center gap-2 text-xs font-serif text-[#e5c07b] font-bold uppercase tracking-wider mb-1">
                  <Calendar className="h-4 w-4" /> Date & Day
                </span>
                <p className="text-sm font-serif font-bold text-white">{data.nikahDay}</p>
                <p className="text-xs text-[#c8d8cf] mt-0.5">{new Date(data.weddingDate).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) || data.weddingDate}</p>
              </div>

              <div className="rounded-2xl border border-[#d4af37]/25 bg-[#051810]/70 p-4">
                <span className="flex items-center gap-2 text-xs font-serif text-[#e5c07b] font-bold uppercase tracking-wider mb-1">
                  <Clock className="h-4 w-4" /> Auspicious Time
                </span>
                <p className="text-sm font-serif font-bold text-white">{data.nikahTime}</p>
                <p className="text-xs text-[#c8d8cf] mt-0.5">Nikah followed by Dinner</p>
              </div>
            </div>

            {/* Venue Box */}
            <div className="rounded-2xl border border-[#d4af37]/25 bg-[#051810]/80 p-5 text-left mb-6">
              <span className="flex items-center gap-2 text-xs font-serif text-[#e5c07b] font-bold uppercase tracking-wider mb-1">
                <MapPin className="h-4 w-4" /> Ceremony Venue
              </span>
              <p className="text-sm font-serif font-bold text-white">{data.venueName}</p>
              <p className="text-xs text-[#c8d8cf] mt-1 leading-relaxed">{data.venueAddress}</p>
            </div>

            {data.mapsUrl && (
              <a
                href={data.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="cursor-pointer inline-flex items-center gap-2 rounded-full border border-[#d4af37]/60 bg-[#0d3b2b] px-6 py-3 text-xs font-serif font-bold uppercase tracking-wider text-[#fae5a8] hover:bg-[#14533c] transition-colors"
              >
                <span>VIEW LOCATION ON MAPS</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </section>

          {/* ========================================================
              4. WALIMA CELEBRATION (OPTIONAL RECEPTION)
          ======================================================== */}
          {data.hasWalima && (
            <section className="relative rounded-[36px] border border-[#d4af37]/40 bg-gradient-to-b from-[#143224] to-[#071911] p-8 text-center shadow-xl">
              <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#e5c07b] font-bold block mb-1">
                The Sunnah Banquet
              </span>
              <h3 className="text-2xl font-serif font-bold text-white">The Walima Celebration</h3>
              <p className="mt-2 text-xs font-serif italic text-[#c8d8cf] max-w-md mx-auto leading-relaxed">
                "With hearts full of gratitude, we invite you to join us for the Walima and bless the couple as they begin their beautiful journey together."
              </p>

              <div className="mt-6 rounded-2xl border border-[#d4af37]/25 bg-black/40 p-4 text-xs font-serif space-y-1.5 text-[#ebd8af]">
                <p><b>Date:</b> {data.walimaDate || "TBA"}</p>
                <p><b>Time:</b> {data.walimaTime || "7:00 PM onwards"}</p>
                <p><b>Venue:</b> {data.walimaVenue || data.venueName}</p>
                {data.walimaAddress && <p className="text-[#aabcb2]">{data.walimaAddress}</p>}
              </div>
            </section>
          )}

          {/* ========================================================
              5. AUTHENTIC SUNNAH DU'A FOR THE COUPLE
          ======================================================== */}
          <section className="rounded-[36px] border border-[#d4af37]/30 bg-[#04160f]/90 p-8 text-center shadow-2xl relative">
            <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#d4af37] font-bold block mb-3">
              A BEAUTIFUL BEGINNING, A LIFETIME OF DU'AS
            </span>

            {/* Authentic Hadith Du'a Calligraphy */}
            <p className="font-serif text-2xl sm:text-3xl leading-loose text-[#fae5a8] drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)] my-2">
              بَارَكَ اللَّهُ لَكُمَا وَبَارَكَ عَلَيْكُمَا وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ
            </p>

            <p className="mt-4 text-xs sm:text-sm font-serif italic text-[#c8d8cf] leading-relaxed max-w-lg mx-auto">
              "May Allah bless you both, shower His blessings upon you, and unite you in goodness and happiness."
            </p>
            <span className="text-[10px] font-serif text-[#7a8f83] block mt-2">— Sunan Abi Dawud</span>
          </section>

          {/* ========================================================
              6. LIVE WEDDING COUNTDOWN TIMER
          ======================================================== */}
          <section className="rounded-[36px] border border-[#d4af37]/40 bg-gradient-to-b from-[#082218] to-black p-8 text-center shadow-xl">
            <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#d4af37] font-bold block mb-4">
              COUNTING DOWN TO OUR SPECIAL DAY
            </span>

            {!timeLeft.isPassed ? (
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md mx-auto">
                {[
                  { label: "DAYS", val: timeLeft.days },
                  { label: "HOURS", val: timeLeft.hours },
                  { label: "MINS", val: timeLeft.minutes },
                  { label: "SECS", val: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-[#d4af37]/30 bg-[#051710] p-3">
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-white block">
                      {String(item.val).padStart(2, "0")}
                    </span>
                    <span className="text-[9px] font-serif text-[#c9a050] tracking-wider block mt-0.5">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#d4af37]/40 bg-[#07241a] p-4 text-center">
                <p className="font-serif text-base sm:text-lg text-[#fae5a8] font-bold">
                  Alhamdulillah, the blessed day has arrived! 🤍
                </p>
              </div>
            )}
          </section>

          {/* ========================================================
              7. RSVP SECTION (DIRECT WHATSAPP CONFIRMATION RELAY)
          ======================================================== */}
          <section className="rounded-[36px] border border-[#d4af37]/40 bg-[#061d14] p-8 shadow-2xl">
            <div className="text-center mb-6">
              <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#d4af37] font-bold block mb-1">
                HONOUR US WITH YOUR PRESENCE
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                RSVP Confirmation
              </h3>
              <p className="text-xs font-serif text-[#aabcb2] mt-1">
                Kindly confirm your attendance so we may comfortably host you.
              </p>
            </div>

            <form onSubmit={handleSendRsvp} className="space-y-4 max-w-md mx-auto text-xs font-serif">
              <div>
                <label className="text-[#ebd8af] font-semibold block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="e.g. Dr. Salman Khan"
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[#ebd8af] font-semibold block mb-1">Total Guests</label>
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="1">1 Person</option>
                    <option value="2">2 Persons</option>
                    <option value="3">3 Persons</option>
                    <option value="4">4+ Family</option>
                  </select>
                </div>

                <div>
                  <label className="text-[#ebd8af] font-semibold block mb-1">Response</label>
                  <select
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value as any)}
                    className="w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3 py-2.5 text-white focus:border-[#d4af37] focus:outline-none"
                  >
                    <option value="attending">Will Attend 🤍</option>
                    <option value="regret">Unable to Attend 🤲</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[#ebd8af] font-semibold block mb-1">Du'a or Message for the Couple (Optional)</label>
                <textarea
                  rows={2}
                  value={guestDua}
                  onChange={(e) => setGuestDua(e.target.value)}
                  placeholder="May Allah bless this union with Barakah..."
                  className="w-full rounded-xl border border-[#d4af37]/30 bg-black/60 px-3.5 py-2 text-white focus:border-[#d4af37] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer rounded-xl bg-gradient-to-r from-[#b38838] via-[#e5c07b] to-[#b38838] py-3 text-xs font-serif font-bold uppercase tracking-wider text-[#081a12] hover:opacity-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="h-3.5 w-3.5" />
                <span>CONFIRM RSVP VIA WHATSAPP</span>
              </button>

              {rsvpSent && (
                <p className="text-center text-xs font-serif text-[#a8e6cf] pt-1">
                  ✓ JazakAllah Khair! Your confirmation relay has been initiated.
                </p>
              )}
            </form>
          </section>

          {/* ========================================================
              8. FINAL CLOSING BLESSING & CALENDAR ACTION
          ======================================================== */}
          <footer className="rounded-[36px] border border-[#d4af37]/40 bg-gradient-to-b from-[#0a271c] to-black p-8 text-center space-y-6">
            <span className="text-4xl select-none">🌙✨</span>

            <div className="space-y-2">
              <h4 className="font-serif text-sm uppercase tracking-[0.25em] text-[#fae5a8] font-bold">
                "YOUR PRESENCE IS OUR GIFT, YOUR DU'AS ARE OUR BLESSING."
              </h4>
              <p className="font-serif text-xs text-[#c8d8cf] pt-2">
                With love and gratitude, <br />
                <span className="font-bold text-white text-sm">{data.brideFamily} & {data.groomFamily}</span>
              </p>
            </div>

            <p className="text-xs font-serif italic text-[#ebd8af]">
              JazakAllahu Khairan for being a part of our happiness. 🤍
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleAddToCalendar}
                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#d4af37]/50 bg-[#0e3b2b] px-6 py-2.5 text-xs font-serif text-[#fae5a8] hover:bg-[#14533c] transition-colors"
              >
                <Calendar className="h-3.5 w-3.5" />
                <span>ADD TO CALENDAR</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsInvitationOpened(false);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="cursor-pointer w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-full border border-zinc-700 bg-black/60 px-5 py-2.5 text-xs font-serif text-zinc-300 hover:text-white"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>REVISIT INVITATION</span>
              </button>
            </div>

            <div className="pt-6 border-t border-[#d4af37]/20">
              <Link
                href="/create/nikah"
                className="text-[11px] font-serif text-[#aabcb2] hover:text-[#fae5a8] underline"
              >
                Create a customized Nikah invitation for your family 🌙
              </Link>
            </div>
          </footer>

        </div>
      )}

    </main>
  );
}
