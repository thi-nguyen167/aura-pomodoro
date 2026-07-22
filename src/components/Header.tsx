import { SlidersHorizontal } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className="relative z-10 pt-container px-container pb-0 flex shrink-0">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-mono text-5xl font-extrabold text-primary text-shadow-glow">
            Aura <br />{" "}
            <span className="font-sans text-2xl uppercase tracking-[0.2em] text-primary-container">
              Pomodoro
            </span>
          </h1>

          {/* Mobile menu */}
          <SlidersHorizontal />
        </div>
      </header>
    </>
  );
};

export default Header;
