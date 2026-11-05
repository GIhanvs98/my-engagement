// Dedicated Web Audio & HTML5 Audio Controller
// Gracefully handles real mp3 tracks or falls back to a gentle acoustic harp/piano synth
// ensuring zero broken audio states.

class WeddingAudioManager {
  private audioEl: HTMLAudioElement | null = null;
  private isPlaying = false;
  private synthInterval: number | null = null;
  private audioCtx: AudioContext | null = null;
  private listeners: Set<(playing: boolean) => void> = new Set();
  private usingSynth = false;

  private notify() {
    this.listeners.forEach((cb) => cb(this.isPlaying));
  }

  public subscribe(cb: (playing: boolean) => void) {
    this.listeners.add(cb);
    cb(this.isPlaying);
    return () => {
      this.listeners.delete(cb);
    };
  }

  private initAudioElement(src: string) {
    if (typeof window === "undefined") return;
    if (!this.audioEl) {
      const audio = new Audio(src);
      audio.loop = true;
      audio.volume = 0.45;
      audio.preload = "auto";

      audio.addEventListener("playing", () => {
        this.isPlaying = true;
        this.usingSynth = false;
        this.notify();
      });

      audio.addEventListener("pause", () => {
        if (!this.usingSynth) {
          this.isPlaying = false;
          this.notify();
        }
      });

      audio.addEventListener("error", () => {
        // Fall back to synthetic ambient chords
        if (this.isPlaying) {
          this.startSynth();
        }
      });

      this.audioEl = audio;
    }
  }

  // Gentle romantic ambient harp synth
  private startSynth() {
    if (typeof window === "undefined") return;
    try {
      const AudioCtxClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.audioCtx) {
        this.audioCtx = new AudioCtxClass();
      }
      if (this.audioCtx.state === "suspended") {
        this.audioCtx.resume();
      }

      this.usingSynth = true;
      this.isPlaying = true;
      this.notify();

      // Pentatonic romantic notes in Hz (C4, D4, E4, G4, A4, C5, D5, E5)
      const notes = [261.63, 293.66, 329.63, 392.0, 440.0, 523.25, 587.33, 659.25];
      let step = 0;

      const playNote = (freq: number, dur = 2.4, gainVal = 0.04) => {
        if (!this.audioCtx || this.audioCtx.state === "closed") return;
        const now = this.audioCtx.currentTime;
        const osc = this.audioCtx.createOscillator();
        const gain = this.audioCtx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(gainVal, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + dur);

        osc.connect(gain);
        gain.connect(this.audioCtx.destination);

        osc.start(now);
        osc.stop(now + dur);
      };

      if (this.synthInterval) {
        window.clearInterval(this.synthInterval);
      }

      // Play introductory gentle arpeggio
      playNote(notes[0], 3.2, 0.05);
      setTimeout(() => playNote(notes[2], 3.0, 0.04), 400);
      setTimeout(() => playNote(notes[4], 3.0, 0.04), 800);

      const arpeggio = [0, 2, 4, 7, 5, 4, 2, 3];
      this.synthInterval = window.setInterval(() => {
        if (!this.isPlaying) return;
        const noteIdx = arpeggio[step % arpeggio.length];
        playNote(notes[noteIdx], 2.8, 0.035);
        step++;
      }, 900);
    } catch (e) {
      console.warn("Synth audio not permitted or unsupported", e);
    }
  }

  private stopSynth() {
    if (this.synthInterval) {
      window.clearInterval(this.synthInterval);
      this.synthInterval = null;
    }
    this.usingSynth = false;
  }

  public async play(src = "/audio/wedding-theme.mp3"): Promise<boolean> {
    this.initAudioElement(src);

    if (this.audioEl) {
      try {
        await this.audioEl.play();
        this.isPlaying = true;
        this.notify();
        return true;
      } catch {
        // If file cannot be played or 404, launch synthetic harp
        this.startSynth();
        return true;
      }
    } else {
      this.startSynth();
      return true;
    }
  }

  public pause() {
    if (this.audioEl) {
      this.audioEl.pause();
    }
    this.stopSynth();
    this.isPlaying = false;
    this.notify();
  }

  public toggle(src = "/audio/wedding-theme.mp3") {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play(src);
    }
  }

  public getPlaying() {
    return this.isPlaying;
  }
}

export const weddingAudio = new WeddingAudioManager();
