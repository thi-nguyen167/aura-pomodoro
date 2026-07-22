import { SlidersHorizontal } from "lucide-react";

const Header = () => {
  return (
    <>
      <header className="relative z-10 px-sm lg:px-container py-4 lg:py-8 flex shrink-0">
        <div className="flex justify-between items-center w-full">
          <h1 className="font-mono text-6xl font-extrabold text-primary text-shadow-glow">
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
