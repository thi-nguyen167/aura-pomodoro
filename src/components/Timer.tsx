import { useState, useEffect, useRef } from "react";
import {
  RotateCcw,
  Play,
  Pause,
  SkipForward,
  Music2,
  PauseIcon,
} from "lucide-react";

const MODES = {
  focus: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

const SUBTITLES = {
  focus: "STAY IN THE FLOW",
  shortBreak: "TAKE A BREATHER",
  longBreak: "STEP AWAY AND RECHARGE",
};

type TimerMode = "focus" | "shortBreak" | "longBreak";

interface TimerProps {
  onSessionComplete: (minutes: number) => void;
  isLofiPlaying: boolean;
  currentTrackTitle: string;
  onToggleLofi: () => void;
}

const Timer = ({
  onSessionComplete,
  isLofiPlaying,
  currentTrackTitle,
  onToggleLofi,
}: TimerProps) => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [timeLeft, setTimeLeft] = useState(MODES.focus);
  const [isRunning, setIsRunning] = useState(false);

  const alarmAudioRef = useRef<HTMLAudioElement>(null);

  const handleModeChange = (newMode: TimerMode) => {
    setIsRunning(false);
    setMode(newMode);
    setTimeLeft(MODES[newMode]);
  };

  const handleSkipSession = () => {
    if (mode === "focus") {
      handleModeChange("shortBreak");
    } else {
      handleModeChange("focus");
    }
  };

  const handleCompleteSession = () => {
    setIsRunning(false);

    if (alarmAudioRef.current) {
      alarmAudioRef.current.volume = 0.6;
      alarmAudioRef.current
        .play()
        .catch((err) => console.log("Audio blocked by browser.", err));
    }

    if (mode === "focus") {
      onSessionComplete(25);
      console.log("Focus session complete! Progress updated (+25m).");
    }

    const notifBody =
      mode === "focus"
        ? "Focus session complete! Time for a well-deserved break."
        : "Break is over! Let's get back into the flow.";

    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Aura Pomodoro", { body: notifBody });
    }

    handleSkipSession();
  };

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    const modeLabel = mode === "focus" ? "Focus" : "Break";

    document.title = `${minutes}:${seconds} - ${modeLabel} | Aura`;
  }, [timeLeft, mode]);

  useEffect(() => {
    let interval: number;

    if (isRunning && timeLeft > 0) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft === 0 && isRunning) {
      const timeoutId = setTimeout(() => {
        handleCompleteSession();
      }, 0);
      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft, isRunning]);

  const handleToggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(MODES[mode]);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const getTabClass = (tabMode: TimerMode) => {
    const baseClass =
      "py-2 px-6 rounded-full text-sm font-sans transition-all duration-300 ease-in-out ";
    if (mode === tabMode) {
      return baseClass + "bg-glass-highlight text-primary";
    }
    return baseClass + "text-muted hover:bg-glass-highlight hover:text-primary";
  };

  return (
    <section className="flex flex-col gap-gutter h-full items-center justify-center w-full relative">
      <audio
        ref={alarmAudioRef}
        id="audio-alarm"
        src={`${import.meta.env.BASE_URL}audio/alarm.mp3`}
        preload="auto"
      />

      <div className="w-full flex flex-col items-center gap-16 bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-gutter shadow-glow">
        {/* TIMER TABS */}
        <div className="flex gap-2 bg-glass-surface p-1 rounded-full">
          <button
            type="button"
            className={getTabClass("focus")}
            onClick={() => handleModeChange("focus")}
          >
            Focus
          </button>
          <button
            type="button"
            className={getTabClass("shortBreak")}
            onClick={() => handleModeChange("shortBreak")}
          >
            Short Break
          </button>
          <button
            type="button"
            className={getTabClass("longBreak")}
            onClick={() => handleModeChange("longBreak")}
          >
            Long Break
          </button>
        </div>

        {/* TIMER DISPLAY */}
        <div className="text-center">
          <span className="font-mono text-[9.6rem] leading-none font-bold text-on-surface tracking-tight">
            {formatTime(timeLeft)}
          </span>
          <p className="tracking-[0.3em] font-bold text-primary-container mt-6 transition-all">
            {SUBTITLES[mode]}
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-10">
          <button
            type="button"
            className="w-12 h-12 rounded-full bg-glass-surface border border-glass-border flex items-center justify-center transition-colors duration-200 hover:bg-glass-highlight text-on-surface"
            aria-label="Reset Timer"
            onClick={handleResetTimer}
          >
            <RotateCcw size={20} />
          </button>

          <button
            type="button"
            className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-[0_4px_20px_rgba(157,141,255,0.4)] transition-transform duration-200 ease-in-out hover:scale-105"
            aria-label="Play/Pause Timer"
            onClick={handleToggleTimer}
          >
            {isRunning ? (
              <Pause fill="currentColor" size={32} />
            ) : (
              <Play fill="currentColor" size={32} className="ml-1" />
            )}
          </button>

          <button
            type="button"
            className="w-12 h-12 rounded-full bg-glass-surface border border-glass-border flex items-center justify-center transition-colors duration-200 hover:bg-glass-highlight text-on-surface"
            aria-label="Skip Session"
            onClick={handleSkipSession}
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      {/* --- LO-FI --- */}
      <div
        onClick={onToggleLofi}
        className="w-[80%] flex items-center gap-4 py-4 px-6 mt-2 cursor-pointer bg-glass-surface backdrop-blur-xl border border-glass-border rounded-full hover:bg-glass-highlight transition-colors"
        id="lofi-toggle"
      >
        {isLofiPlaying ? (
          <PauseIcon size={24} className="text-on-surface shrink-0" />
        ) : (
          <Music2 size={24} className="text-on-surface shrink-0" />
        )}
        <div className="flex flex-col items-start justify-center gap-1 overflow-hidden">
          <p className="font-bold tracking-widest text-primary-container text-sm">
            LO-FI BEATS
          </p>
          <p className="text-primary truncate w-full text-sm">
            {currentTrackTitle}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Timer;
