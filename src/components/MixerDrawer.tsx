import { X, CloudHail, Coffee, TreePine, Flame } from "lucide-react";
import { useState, type ReactNode } from "react";

type TrackId = "rain" | "cafe" | "forest" | "fire";
interface SoundTrack {
  id: TrackId;
  name: string;
  icon: ReactNode;
  defaultVol: number;
}
const SOUND_TRACKS: SoundTrack[] = [
  { id: "rain", name: "Rain", icon: <CloudHail />, defaultVol: 45 },
  { id: "cafe", name: "Cafe", icon: <Coffee />, defaultVol: 20 },
  { id: "forest", name: "Forest", icon: <TreePine />, defaultVol: 0 },
  { id: "fire", name: "Campfire", icon: <Flame />, defaultVol: 0 },
];

const MixerDrawer = () => {
  const [volumes, setVolumes] = useState<Record<TrackId, number>>({
    rain: 45,
    cafe: 20,
    forest: 0,
    fire: 0,
  });

  const handleVolumes = (id: TrackId, newValue: string) => {
    setVolumes((prev) => ({
      ...prev,
      [id]: parseInt(newValue),
    }));
  };

  return (
    <section className="flex flex-col gap-gutter h-full" id="mixer-drawer">
      <div className="lg:hidden flex justify-end w-full -mb-8 shrink-0">
        <X className="lg:hidden cursor-pointer" id="close-mixer-btn" />
      </div>

      <div className="flex-1 flex flex-col bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-gutter gap-gutter">
        <div className="shrink-0">
          <h2 className="font-mono text-3xl font-bold">SoundScapes</h2>
          <p className="text-muted opacity-70">Compose your atmosphere</p>
        </div>

        <div className="flex flex-col gap-5 flex-1 overflow-y-auto">
          {SOUND_TRACKS.map((track) => (
            <div key={track.id} className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                {track.icon}
                <label htmlFor={`vol-${track.id}`} className="">
                  {track.name}
                </label>
              </div>

              <div className="flex items-center gap-4">
                <input
                  type="range"
                  id={`vol-${track.id}`}
                  className="vol-slider w-[88%] h-2 bg-glass-highlight rounded-full outline-none appearance-none"
                  min="0"
                  max="100"
                  value={volumes[track.id]}
                  onChange={(e) => handleVolumes(track.id, e.target.value)}
                />
                <span className="text-muted w-8 text-right">
                  {volumes[track.id]}%
                </span>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="shrink-0 bg-primary-container text-on-primary-container uppercase p-4 rounded-2xl font-bold text-center w-full transition-all duration-200 hover:opacity-90 active:scale-[0.98] active:duration-100"
          id="save-preset-btn"
        >
          Save Preset
        </button>
      </div>

      <div className="flex flex-col bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-6 gap-gutter">
        <h3 className="font-sans text-base uppercase text-primary-container mb-4">
          Daily Progress
        </h3>
        <div className="flex justify-between">
          <div className="">
            <p className="font-mono text-2xl font-extrabold text-primary">
              4.5h
            </p>
            <p className="font-sans text-muted text-sm mt-1">Focus Time</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-3xl font-bold">82%</p>
            <p className="font-sans text-muted text-sm mt-1">Goal Met</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MixerDrawer;
