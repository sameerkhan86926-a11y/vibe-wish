// src/lib/birthdayAudio.ts
class BirthdaySynthEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private isMuted = false;
  private loopTimeout: NodeJS.Timeout | null = null;

  private notes: { [key: string]: number } = {
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23,
    G4: 392.0, A4: 440.0, B4: 493.88, C5: 523.25
  };

  private melody = [
    { note: "C4", dur: 0.3 }, { note: "C4", dur: 0.15 }, { note: "D4", dur: 0.45 },
    { note: "C4", dur: 0.45 }, { note: "F4", dur: 0.45 }, { note: "E4", dur: 0.8 },
    { note: "C4", dur: 0.3 }, { note: "C4", dur: 0.15 }, { note: "D4", dur: 0.45 },
    { note: "C4", dur: 0.45 }, { note: "G4", dur: 0.45 }, { note: "F4", dur: 0.8 },
    { note: "C4", dur: 0.3 }, { note: "C4", dur: 0.15 }, { note: "C5", dur: 0.45 },
    { note: "A4", dur: 0.45 }, { note: "F4", dur: 0.45 }, { note: "E4", dur: 0.45 },
    { note: "D4", dur: 0.6 }
  ];

  public init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.playSequence(0);
  }

  private playTone(freq: number, duration: number, time: number) {
    if (!this.ctx || this.isMuted) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine"; // Warm celestial bell vibe
      osc.frequency.setValueAtTime(freq, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.exponentialRampToValueAtTime(0.12, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(time);
      osc.stop(time + duration);
    } catch {}
  }

  private playSequence(index: number) {
    if (!this.isPlaying || !this.ctx) return;
    if (index >= this.melody.length) {
      this.loopTimeout = setTimeout(() => this.playSequence(0), 1500);
      return;
    }

    const item = this.melody[index];
    const freq = this.notes[item.note] || 440;
    this.playTone(freq, item.dur, this.ctx.currentTime);

    this.loopTimeout = setTimeout(() => {
      this.playSequence(index + 1);
    }, item.dur * 1000 + 80);
  }

  public pause() {
    this.isPlaying = false;
    if (this.loopTimeout) clearTimeout(this.loopTimeout);
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    return this.isMuted;
  }
}

export const birthdayAudio = new BirthdaySynthEngine();
