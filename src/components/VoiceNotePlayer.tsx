"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Mic, FileText } from "lucide-react";

export default function VoiceNotePlayer({
  audioUrl,
  transcript,
}: {
  audioUrl?: string;
  transcript: string;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(17);
  const [showTranscript, setShowTranscript] = useState(!audioUrl);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onTimeUpdate = () => setCurrentTime(audio.currentTime);
    const onLoadedMetadata = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(Math.floor(audio.duration));
      }
    };
    const onEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioUrl) {
      setShowTranscript(true);
      return;
    }
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="w-full rounded-2xl bg-[#1e232a] border border-white/5 p-3.5 text-zinc-100 shadow-md">
      {audioUrl && <audio ref={audioRef} src={audioUrl} preload="metadata" />}

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
        >
          {isPlaying ? <Pause className="h-4 w-4 fill-current" /> : <Play className="h-4 w-4 fill-current ml-0.5" />}
        </button>

        <div className="flex-1">
          {/* Animated Waveform Bars */}
          <div className="flex items-center gap-0.5 sm:gap-1 h-6">
            {[24, 45, 78, 52, 90, 60, 40, 80, 95, 70, 50, 85, 40, 65, 30, 75, 45, 90, 60, 35, 70, 40].map((h, i) => {
              const progress = (currentTime / (duration || 17)) * 22;
              const isPassed = i <= progress;
              return (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    isPassed ? "bg-rose-400" : "bg-zinc-600"
                  } ${isPlaying && isPassed ? "opacity-100" : "opacity-75"}`}
                />
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[11px] font-mono text-zinc-400 mt-1">
            <span className="flex items-center gap-1">
              <Mic className="h-3 w-3 text-rose-400" />
              {audioUrl ? (isPlaying ? formatTime(currentTime) : `Voice memo · ${formatTime(duration)}`) : "Demo Voice Note (Transcript Only)"}
            </span>
            <button
              type="button"
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-[10px] text-zinc-400 hover:text-zinc-200 underline"
            >
              {showTranscript ? "Hide Words" : "Read Transcript"}
            </button>
          </div>
        </div>
      </div>

      {showTranscript && (
        <div className="mt-3 rounded-xl bg-black/40 border border-white/5 p-3 text-xs text-zinc-300 font-serif leading-relaxed italic border-l-2 border-rose-500/50">
          <p className="not-italic text-[10px] font-mono text-zinc-500 mb-1 uppercase tracking-wider flex items-center gap-1">
            <FileText className="h-3 w-3" /> Voice Memo Transcript:
          </p>
          "{transcript}"
        </div>
      )}
    </div>
  );
}
