import "./App.css";
import Header from "./components/Header";
import MixerDrawer from "./components/MixerDrawer";
import Timer from "./components/Timer";
import Task from "./components/Task";

function App() {
  return (
    <div className="w-screen h-screen font-sans text-base text-on-background bg-background flex flex-col overflow-hidden">
      <Header />

      <main className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr_1fr] gap-gutter p-container min-h-0">
        <MixerDrawer />
        <Timer />
        <Task />
      </main>
    </div>
  );
}

export default App;
