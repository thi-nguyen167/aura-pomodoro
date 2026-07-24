import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import MixerDrawer from "./components/MixerDrawer";
import Timer from "./components/Timer";
import Task from "./components/Task";
import ParticleBackground from "./components/ParticleBackground";

const BASE_URL = import.meta.env.BASE_URL;

const LOFI_PLAYLIST = [
  {
    title: "Coffee Lofi - Chill Lofi Ambient",
    src: `${BASE_URL}audio/lofi-1.mp3`,
  },
  { title: "Lofi Ambient Music", src: `${BASE_URL}audio/lofi-2.mp3` },
  { title: "Deep Focus Lofi", src: `${BASE_URL}audio/lofi-3.mp3` },
  { title: "Lofi Relax Song", src: `${BASE_URL}audio/lofi-4.mp3` },
  { title: "Dreamy LoFi Music", src: `${BASE_URL}audio/lofi-5.mp3` },
  { title: "Lofi Smooth Song", src: `${BASE_URL}audio/lofi-6.mp3` },
];

function App() {
  const [focusTimeMinutes, setFocusTimeMinutes] = useState(0);
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const [isLofiPlaying, setIsLofiPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [currentTrackTitle, setCurrentTrackTitle] = useState(
    LOFI_PLAYLIST[0].title,
  );

  const lofiAudioRef = useRef<HTMLAudioElement>(null);

  const toggleLofi = () => {
    const audio = lofiAudioRef.current;
    if (!audio) return;

    if (isLofiPlaying) {
      audio.pause();
      setIsLofiPlaying(false);
    } else {
      audio.volume = 0.3;
      audio
        .play()
        .then(() => {
          setIsLofiPlaying(true);
        })
        .catch((err) => console.log("Lofi playback blocked:", err));
    }
  };

  const handleTrackEnded = () => {
    const nextIndex = (currentTrackIndex + 1) % LOFI_PLAYLIST.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrackTitle(LOFI_PLAYLIST[nextIndex].title);

    if (lofiAudioRef.current) {
      lofiAudioRef.current.src = LOFI_PLAYLIST[nextIndex].src;
      lofiAudioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="w-screen h-screen font-sans text-base text-on-background bg-background flex flex-col overflow-x-hidden">
      <ParticleBackground />

      <audio
        ref={lofiAudioRef}
        id="audio-lofi"
        src={LOFI_PLAYLIST[currentTrackIndex].src}
        onEnded={handleTrackEnded}
        preload="auto"
      />

      <Header
        onOpenDrawer={() => setIsDrawerOpen(true)}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        focusTimeMinutes={focusTimeMinutes}
        dailyGoalMinutes={dailyGoalMinutes}
      />

      <main className="relative z-10 flex-1 grid grid-cols-1 overflow-y-auto lg:grid-cols-[1fr_1.5fr_1fr] gap-gutter p-container min-h-0 pb-30">
        <MixerDrawer
          focusTimeMinutes={focusTimeMinutes}
          dailyGoalMinutes={dailyGoalMinutes}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
        <Timer
          onSessionComplete={(mins) =>
            setFocusTimeMinutes((prev) => prev + mins)
          }
          isLofiPlaying={isLofiPlaying}
          currentTrackTitle={currentTrackTitle}
          onToggleLofi={toggleLofi}
        />
        <Task onUpdateGoal={setDailyGoalMinutes} />
      </main>
    </div>
  );
}

export default App;
