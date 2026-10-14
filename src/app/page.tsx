import Link from "next/link";
import {
  Heart,
  Flame,
  Award,
  Sparkles,
  ArrowRight,
  Smile,
  MessageSquare,
  HeartHandshake,
  Flower2,
  Smartphone,
  Skull,
  Bell,
} from "lucide-react";
import MediaUploader from "@/components/MediaUploader";

const TEMPLATES = [
  {
    id: "oops",
    title: "Oops! It's Your Birthday 😂💖",
    target: "Comedy + Love + Surprises",
    description:
      "Runaway dodge button, funny ego quiz, interactive candle blowing, roast machine & sealed love letter.",
    badge: "Trending Fun 🔥",
    href: "/create/oops",
    border: "hover:border-pink-500/50",
    glow: "group-hover:shadow-pink-500/20",
    icon: Smile,
    iconColor: "text-pink-400 bg-pink-500/10",
  },
    {
    id: "jaan",
    title: "Jaan's Birthday 🎂👑",
    target: "Girlfriend / My Princess",
    description: "Gift box opening, rose rain, butterfly paradise, cute cuddle teddy, moonlit stars & flying kisses.",
    badge: "Ultimate Romance 💖",
    href: "/create/jaan",
    border: "hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    icon: Heart,
    iconColor: "text-rose-400 bg-rose-500/10",
  },

  {
    id: "notification",
    title: "POV: You're My Favourite Notification ❤️‍🩹",
    target: "Gen Z Aesthetic Anniversary",
    description:
      "Lockscreen pill notification, flower tea confessions, iconic chat, Spotify-style wrapped & blushing letter.",
    badge: "Gen Z Aesthetic 🔔",
    href: "/create/notification",
    border: "hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    icon: Bell,
    iconColor: "text-rose-400 bg-rose-500/10",
  },
  {
    id: "garden",
    title: "A Garden Full of Us 🌹",
    target: "Cinematic Botanical Anniversary",
    description:
      "Flower ➡️ Message pacing, dewdrop balcony, memory pathway, moonlight lily & interactive 3-flower pick.",
    badge: "Cinema Garden 🥀",
    href: "/create/garden",
    border: "hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    icon: Flower2,
    iconColor: "text-rose-400 bg-rose-500/10",
  },
  {
    id: "simulation",
    title: "The Simulation is Broken 💀",
    target: "Weird & Dark Comedy Internet",
    description:
      "Zero purpose loader, live roaster, cursed runaway button, fake system panic, useless AI & escape boss.",
    badge: "Most Unhinged 💀",
    href: "/create/simulation",
    border: "hover:border-red-600/50",
    glow: "group-hover:shadow-red-600/20",
    icon: Skull,
    iconColor: "text-red-400 bg-red-600/10",
  },
  {
    id: "aakhri",
    title: "Ek Aakhri Message 💌",
    target: "Real Phone Archive & Unsent Words",
    description:
      "Realistic lock screen, paced chat intervals, camera roll moments, voice memo waveform & handwritten unsent draft.",
    badge: "Cinematic Real 📱",
    href: "/create/aakhri",
    border: "hover:border-zinc-500/50",
    glow: "group-hover:shadow-zinc-500/20",
    icon: Smartphone,
    iconColor: "text-zinc-300 bg-zinc-800",
  },
  {
    id: "blooming",
    title: "Blooming Love ❤️🌹",
    target: "Grand Proposal & Romance",
    description:
      "Moonlit flower garden, interactive bud bloom, memory cards, sealed parchment & grand proposal scene.",
    badge: "Grand Proposal 💍",
    href: "/create/blooming",
    border: "hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    icon: Flower2,
    iconColor: "text-rose-400 bg-rose-500/10",
  },
  {
    id: "manaao",
    title: "Mission: Manaao Them 🥺❤️",
    target: "When Someone is Angry",
    description:
      "Gussa warning meter, funny sorry machine, simulated chat banter, mini peace tasks & sincere letter.",
    badge: "Life Saver 🩹",
    href: "/create/manaao",
    border: "hover:border-rose-400/50",
    glow: "group-hover:shadow-rose-400/20",
    icon: HeartHandshake,
    iconColor: "text-rose-300 bg-rose-500/10",
  },
  {
    id: "us",
    title: "US.exe ❤️ — Our Little Universe",
    target: "Couple Story & Secret OS",
    description:
      "Orbiting universe portal, relationship diagnostics, chat mood branches, jealousy test & secret love vault.",
    badge: "For Couples 🪐",
    href: "/create/us",
    border: "hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    icon: Heart,
    iconColor: "text-rose-400 bg-rose-500/10",
  },
  {
    id: "chat",
    title: "The Birthday Chat 😂💖",
    target: "WhatsApp-Style Adventure",
    description:
      "Realistic chat bubbles, typing indicators, funny reply branches, 3D cake reveal & pizza treat drama.",
    badge: "Most Viral 💬",
    href: "/create/chat",
    border: "hover:border-emerald-500/50",
    glow: "group-hover:shadow-emerald-500/20",
    icon: MessageSquare,
    iconColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    id: "birthday",
    title: "Birthdayverse 3D Experience",
    target: "Ultimate Birthday",
    description:
      "Cinematic unwrap box, 3D interactive blowing candles cake, audio melody, photo memories, sealed letter & guest wish wall.",
    badge: "Flagship 🎂",
    href: "/create/birthday",
    border: "hover:border-amber-400/50",
    glow: "group-hover:shadow-amber-400/20",
    icon: Sparkles,
    iconColor: "text-amber-300 bg-amber-400/10",
  },
  {
    id: "gf",
    title: "Blooming Romance & Flowers",
    target: "Girlfriend / Partner",
    description:
      "Falling rose petals, run-away security question & heartfelt glowing letter.",
    badge: "Most Loved 🌹",
    href: "/create/gf",
    border: "hover:border-rose-500/50",
    glow: "group-hover:shadow-rose-500/20",
    icon: Heart,
    iconColor: "text-rose-400 bg-rose-500/10",
  },
  {
    id: "friend",
    title: "The Ultimate Friend Roast",
    target: "Bestie / Homie",
    description:
      "Fake police arrest warrant, toxicity meter, meme stickers & pure savage vibes.",
    badge: "Unhinged ⚡",
    href: "/create/friend",
    border: "hover:border-emerald-500/50",
    glow: "group-hover:shadow-emerald-500/20",
    icon: Flame,
    iconColor: "text-emerald-400 bg-emerald-500/10",
  },
  {
    id: "father",
    title: "Parchment of Gratitude",
    target: "Dad / Mentor",
    description:
      "Classic Forbes-style magazine tribute, timeless typography & emotional respect.",
    badge: "Classic 🎖️",
    href: "/create/father",
    border: "hover:border-amber-500/50",
    glow: "group-hover:shadow-amber-500/20",
    icon: Award,
    iconColor: "text-amber-400 bg-amber-500/10",
  },
  {
    id: "anniversary",
    title: "Cinema Premiere Night",
    target: "Couple Anniversary",
    description:
      "Netflix-style movie debut, milestone countdown ticker & champagne sparkles.",
    badge: "Luxury 🥂",
    href: "/create/anniversary",
    border: "hover:border-purple-500/50",
    glow: "group-hover:shadow-purple-500/20",
    icon: Sparkles,
    iconColor: "text-purple-400 bg-purple-500/10",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-16 text-zinc-100 sm:px-8">
      {/* Hero Header */}
      <div className="mx-auto max-w-4xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-4 py-1.5 text-xs font-semibold tracking-wide text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          Interactive Vibe Drop • Gen Z Edition
        </span>

        <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-6xl">
          Pick a vibe, <br />
          <span className="bg-gradient-to-r from-rose-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
            not a boring greeting card.
          </span>
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm text-zinc-400 sm:text-base">
          Har relation ke liye alag vibe, alag dynamic animations aur alag interactive surprise links.
        </p>
      </div>

      {/* Instant Media Uploader Utility Widget */}
      <div className="my-12">
        <MediaUploader />
      </div>

      {/* Catalog Title */}
      <div className="mx-auto max-w-4xl text-center mb-6">
        <h2 className="text-xl font-bold text-white uppercase tracking-wider">
          Choose Your Interactive Template
        </h2>
        <p className="text-xs text-zinc-500">
          Pick any vibe below and create in 60 seconds
        </p>
      </div>

      {/* Template Grid Cards */}
      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
        {TEMPLATES.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`group relative flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-zinc-900/70 shadow-lg ${item.border} ${item.glow}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.iconColor}`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full border border-zinc-800 bg-black/60 px-3 py-1 text-[11px] font-semibold text-zinc-300">
                    {item.badge}
                  </span>
                </div>

                <div className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                    {item.target}
                  </p>
                  <h3 className="mt-1 text-xl font-black text-white group-hover:text-rose-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-white group-hover:translate-x-1 transition-transform">
                <span>Create This Vibe</span>
                <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
