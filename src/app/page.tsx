export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/60 px-4 py-1.5 text-xs font-medium tracking-wide text-zinc-400 backdrop-blur-md mb-6">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
        </span>
        VibeWish Engine Online
      </div>
      <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white max-w-2xl">
        Boring cards are dead. <br />
        <span className="bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
          Send a whole vibe.
        </span>
      </h1>
      <p className="mt-4 text-zinc-400 max-w-md text-sm sm:text-base">
        Aesthetic, interactive dynamic web cards for your bestie, partner, dad, and special days.
      </p>
    </main>
  );
}
