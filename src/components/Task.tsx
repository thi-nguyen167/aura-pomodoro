import { CheckCircle, Play, Trash2, X } from "lucide-react";

const Task = () => {
  return (
    <section className="flex flex-col h-full w-full">
      <div className="flex flex-col flex-1 bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-gutter shadow-drop overflow-y-auto custom-scrollbar">
        <h2 className="font-mono text-3xl font-semibold mb-10 text-on-surface">
          Tasks
        </h2>

        <div className="flex flex-col gap-4 mb-12">
          <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-muted opacity-80">
            Focusing On
          </h4>

          <div className="bg-glass-surface border border-glass-border border-l-4 border-l-primary-container p-4 rounded-2xl flex justify-between items-center transition-colors">
            <div>
              <p className="font-semibold m-0 text-on-surface">
                Finish React UI conversion
              </p>
              <span className="text-muted text-sm">25m</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-glass-highlight transition-colors text-on-surface"
                aria-label="Cancel Focus"
              >
                <X size={20} />
              </button>
              <button
                type="button"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-glass-highlight transition-colors text-primary-container"
                aria-label="Complete Focus Task"
              >
                <CheckCircle size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 mb-12">
          <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-muted opacity-80">
            Up Next
          </h4>

          <ul className="flex flex-col gap-3 max-h-[25vh] overflow-y-auto pr-2 custom-scrollbar">
            <li className="bg-glass-surface border border-glass-border p-4 rounded-2xl flex justify-between items-center transition-colors">
              <label className="flex items-center gap-3 cursor-pointer text-on-surface">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary-container cursor-pointer"
                />
                Integrate Lo-fi Audio
              </label>
              <div className="flex items-center gap-3">
                <span className="text-muted text-sm">45m</span>
                <button
                  type="button"
                  className="text-muted hover:text-primary transition-colors"
                  aria-label="Set as Focus"
                >
                  <Play size={18} />
                </button>
                <button
                  type="button"
                  className="text-muted hover:text-red-400 transition-colors"
                  aria-label="Delete Task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>

            <li className="bg-glass-surface border border-glass-border p-4 rounded-2xl flex justify-between items-center transition-colors">
              <label className="flex items-center gap-3 cursor-pointer text-on-surface">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-primary-container cursor-pointer"
                />
                Write Unit Tests
              </label>
              <div className="flex items-center gap-3">
                <span className="text-muted text-sm">30m</span>
                <button
                  type="button"
                  className="text-muted hover:text-primary transition-colors"
                  aria-label="Set as Focus"
                >
                  <Play size={18} />
                </button>
                <button
                  type="button"
                  className="text-muted hover:text-red-400 transition-colors"
                  aria-label="Delete Task"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          </ul>

          <button
            type="button"
            className="mt-4 text-muted text-sm text-center p-4 border border-dashed border-muted rounded-xl transition-colors hover:text-primary hover:border-primary"
          >
            + Add new task
          </button>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-muted opacity-80">
              Done
            </h4>
            <span className="bg-background shadow-glass-highlight text-secondary text-xs py-1 px-3 rounded-full font-semibold">
              1 Today
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            <li className="flex items-center gap-3 p-4 opacity-50 text-on-surface">
              <CheckCircle size={20} />
              <span className="line-through">Setup GitHub Actions</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Task;
