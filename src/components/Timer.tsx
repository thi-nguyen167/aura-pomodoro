import { RotateCcw, Play, SkipForward, Music2 } from "lucide-react";

const Timer = () => {
  return (
    <section className="flex flex-col gap-gutter h-full items-center justify-center w-full">
      <div className="w-full flex flex-col items-center gap-16 bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-gutter shadow-glow">
        <div className="flex gap-2 bg-glass-surface p-1 rounded-full">
          <button
            type="button"
            className="py-2 px-6 rounded-full text-sm font-sans transition-all duration-300 ease-in-out bg-glass-highlight text-primary"
            data-mode="focus"
          >
            Focus
          </button>

          <button
            type="button"
            className="py-2 px-6 rounded-full text-sm font-sans text-muted transition-all duration-300 ease-in-out hover:bg-glass-highlight hover:text-primary"
            data-mode="shortBreak"
          >
            Short Break
          </button>
          <button
            type="button"
            className="py-2 px-6 rounded-full text-sm font-sans text-muted transition-all duration-300 ease-in-out hover:bg-glass-highlight hover:text-primary"
            data-mode="longBreak"
          >
            Long Break
          </button>
        </div>

        <div className="text-center">
          <span className="font-mono text-[9.6rem] leading-none font-bold text-on-surface tracking-tight">
            25:00
          </span>
          <p className="tracking-[0.3em] font-bold text-primary-container mt-6">
            STAY IN THE FLOW
          </p>
        </div>

        <div className="flex items-center gap-10">
          <button
            type="button"
            className="w-12 h-12 rounded-full bg-glass-surface border border-glass-border flex items-center justify-center transition-colors duration-200 hover:bg-glass-highlight text-on-surface"
            aria-label="Reset Timer"
          >
            <RotateCcw size={20} />
          </button>

          <button
            type="button"
            className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_4px_20px_rgba(157,141,255,0.4)] transition-transform duration-200 ease-in-out hover:scale-105"
            aria-label="Play Timer"
          >
            <Play fill="currentColor" size={32} className="ml-1" />
          </button>

          <button
            type="button"
            className="w-12 h-12 rounded-full bg-glass-surface border border-glass-border flex items-center justify-center transition-colors duration-200 hover:bg-glass-highlight text-on-surface"
            aria-label="Skip Session"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      <div
        className="w-[80%] flex items-center gap-4 py-4 px-6 mt-2 cursor-pointer bg-glass-surface backdrop-blur-xl border border-glass-border rounded-full hover:bg-glass-highlight transition-colors"
        id="lofi-toggle"
      >
        <Music2 size={24} className="text-on-surface shrink-0" />
        <div className="flex flex-col items-start justify-center gap-1 overflow-hidden">
          <p className="font-bold tracking-widest text-primary-container text-sm">
            LO-FI BEATS
          </p>
          <p className="text-primary truncate w-full">
            Coffee Lofi - Chill Lofi Ambient
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timer;
