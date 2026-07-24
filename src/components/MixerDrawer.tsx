// src/components/MixerDrawer.tsx
import { X, CloudHail, Coffee, TreePine, Flame } from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";
import ProgressCard from "./ProgressCard";

type TrackId = "rain" | "cafe" | "forest" | "fire";

interface SoundTrack {
  id: TrackId;
  name: string;
  icon: ReactNode;
  defaultVol: number;
  audioSrc: string;
}

const BASE_URL = import.meta.env.BASE_URL;

const SOUND_TRACKS: SoundTrack[] = [
  {
    id: "rain",
    name: "Rain",
    icon: <CloudHail />,
    defaultVol: 0,
    audioSrc: `${BASE_URL}audio/rain.mp3`,
  },
  {
    id: "cafe",
    name: "Cafe",
    icon: <Coffee />,
    defaultVol: 0,
    audioSrc: `${BASE_URL}audio/cafe.mp3`,
  },
  {
    id: "forest",
    name: "Forest",
    icon: <TreePine />,
    defaultVol: 0,
    audioSrc: `${BASE_URL}audio/forest.mp3`,
  },
  {
    id: "fire",
    name: "Campfire",
    icon: <Flame />,
    defaultVol: 0,
    audioSrc: `${BASE_URL}audio/fire.mp3`,
  },
];

interface MixerDrawerProps {
  focusTimeMinutes: number;
  dailyGoalMinutes: number;
}

const MixerDrawer = ({
  focusTimeMinutes,
  dailyGoalMinutes,
}: MixerDrawerProps) => {
  const [volumes, setVolumes] = useState<Record<TrackId, number>>(() => {
    const saved = localStorage.getItem("aura_audio_preset");
    if (saved) return JSON.parse(saved);
    return { rain: 10, cafe: 10, forest: 10, fire: 10 };
  });

  const [saveBtnText, setSaveBtnText] = useState("Save Preset");
  const audioRefs = useRef<Record<TrackId, HTMLAudioElement | null>>({
    rain: null,
    cafe: null,
    forest: null,
    fire: null,
  });

  useEffect(() => {
    Object.keys(volumes).forEach((key) => {
      const trackId = key as TrackId;
      const audioEl = audioRefs.current[trackId];
      const vol = volumes[trackId];

      if (audioEl) {
        audioEl.volume = vol / 100;
        if (vol === 0) {
          audioEl.pause();
        } else if (audioEl.paused) {
          audioEl.play().catch(() => {});
        }
      }
    });
  }, [volumes]);

  const handleVolumes = (id: TrackId, newValue: string) => {
    setVolumes((prev) => ({ ...prev, [id]: parseInt(newValue) }));
  };

  const handleSavePreset = () => {
    localStorage.setItem("aura_audio_preset", JSON.stringify(volumes));
    setSaveBtnText("Saved!");
    setTimeout(() => setSaveBtnText("Save Preset"), 2000);
  };

  return (
    <section
      className="flex flex-col gap-gutter h-full relative"
      id="mixer-drawer"
    >
      {SOUND_TRACKS.map((track) => (
        <audio
          key={track.id}
          ref={(el) => {
            audioRefs.current[track.id] = el;
          }}
          src={track.audioSrc}
          loop
          preload="auto"
        />
      ))}

      <div className="lg:hidden flex justify-end w-full -mb-8 shrink-0 relative z-10">
        <button className="w-12 h-12 rounded-full bg-glass-surface border border-solid border-glass-border flex items-center justify-center transition-all duration-200 hover:bg-glass-highlight">
          <X className="lg:hidden cursor-pointer" id="close-mixer-btn" />
        </button>
      </div>

      <div className="flex-1 flex flex-col bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-gutter gap-gutter shadow-drop">
        <div className="shrink-0">
          <h2 className="font-mono text-3xl font-bold text-on-surface mb-2">
            SoundScapes
          </h2>
          <p className="text-muted opacity-70">Compose your atmosphere</p>
        </div>

        <div className="flex flex-col gap-6 flex-1 overflow-y-auto custom-scrollbar pr-2">
          {SOUND_TRACKS.map((track) => (
            <div key={track.id} className="flex flex-col gap-3">
              <div className="flex gap-3 items-center text-on-surface">
                {track.icon}
                <label htmlFor={`vol-${track.id}`} className="font-semibold">
                  {track.name}
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id={`vol-${track.id}`}
                  className="vol-slider w-[88%] h-2 bg-glass-highlight rounded-full outline-none appearance-none cursor-pointer accent-primary"
                  min="0"
                  max="100"
                  value={volumes[track.id]}
                  onChange={(e) => handleVolumes(track.id, e.target.value)}
                />
                <span className="text-muted w-10 text-right font-mono text-sm">
                  {volumes[track.id]}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={handleSavePreset}
          className="shrink-0 bg-primary-container text-on-primary-container uppercase p-4 rounded-xl font-bold text-center w-full transition-all duration-200 hover:opacity-90 active:scale-95"
        >
          {saveBtnText}
        </button>
      </div>

      <ProgressCard
        focusTimeMinutes={focusTimeMinutes}
        dailyGoalMinutes={dailyGoalMinutes}
      />
    </section>
  );
};

export default MixerDrawer;
