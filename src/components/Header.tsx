import { SlidersHorizontal } from "lucide-react";
import MixerDrawer from "./MixerDrawer";

interface HeaderProps {
  onOpenDrawer: () => void;
  isOpen: boolean;
  onClose: () => void;
  focusTimeMinutes: number;
  dailyGoalMinutes: number;
}

const Header = ({
  onOpenDrawer,
  isOpen,
  onClose,
  focusTimeMinutes,
  dailyGoalMinutes,
}: HeaderProps) => {
  return (
    <header className="relative z-10 pt-container px-container pb-0 flex shrink-0">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-mono text-5xl font-extrabold text-primary text-shadow-glow">
          Aura <br />{" "}
          <span className="font-sans text-2xl uppercase tracking-[0.2em] text-primary-container">
            Pomodoro
          </span>
        </h1>

        {/* Mobile menu button*/}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={onOpenDrawer}
            className="w-12 h-12 rounded-full bg-glass-surface border border-solid border-glass-border flex items-center justify-center transition-all duration-200 hover:bg-glass-highlight"
            aria-label="Open Soundscapes"
          >
            <SlidersHorizontal className="text-on-surface" />
          </button>

          <MixerDrawer
            isOpen={isOpen}
            onClose={onClose}
            focusTimeMinutes={focusTimeMinutes}
            dailyGoalMinutes={dailyGoalMinutes}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
