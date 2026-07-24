import { useState, useEffect } from "react";
import { CheckCircle, Play, Trash2, X } from "lucide-react";

export type TaskStatus = "pending" | "active" | "done";

export interface TaskItem {
  id: string;
  text: string;
  time: string;
  status: TaskStatus;
  dateAdded: string;
}

interface TaskProps {
  onUpdateGoal: (totalMinutes: number) => void;
}

const Task = ({ onUpdateGoal }: TaskProps) => {
  const [tasks, setTasks] = useState<TaskItem[]>(() => {
    const savedData = localStorage.getItem("aura_tasks");
    if (savedData) {
      const parsedTasks = JSON.parse(savedData) as TaskItem[];
      const today = new Date().toDateString();

      return parsedTasks.filter((task) => {
        if (task.status === "done" && task.dateAdded !== today) {
          return false;
        }
        return true;
      });
    }
    return [];
  });

  const parseTimeToMinutes = (timeString: string) => {
    if (!timeString) return 0;
    const str = timeString.toLowerCase().trim();
    if (str.includes("h")) {
      return parseFloat(str) * 60;
    }
    return parseFloat(str) || 0;
  };

  useEffect(() => {
    let totalGoalMinutes = 0;
    const today = new Date().toDateString();

    tasks.forEach((task) => {
      if (task.dateAdded === today) {
        totalGoalMinutes += parseTimeToMinutes(task.time);
      }
    });

    onUpdateGoal(totalGoalMinutes);
    localStorage.setItem("aura_tasks", JSON.stringify(tasks));
  }, [tasks, onUpdateGoal]);

  const activeTask = tasks.find((t) => t.status === "active");
  const pendingTasks = tasks.filter((t) => t.status === "pending");
  const doneTasks = tasks.filter((t) => t.status === "done");
  const doneCount = doneTasks.length;

  const handleAddTask = () => {
    const taskText = window.prompt("What do you need to do?");
    if (!taskText) return;

    const taskTime =
      window.prompt("Estimated time (e.g., 25m):", "25m") || "25m";

    const newTask: TaskItem = {
      id: Date.now().toString(),
      text: taskText,
      time: taskTime,
      status: "pending",
      dateAdded: new Date().toDateString(),
    };

    setTasks((prev) => [...prev, newTask]);
  };

  const handleSetActive = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.status === "active") return { ...task, status: "pending" };
        if (task.id === id) return { ...task, status: "active" };
        return task;
      }),
    );
  };

  const handleCompleteTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: "done" } : task)),
    );
  };

  const handleCancelActive = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, status: "pending" } : task,
      ),
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <section className="flex flex-col h-full w-full">
      <div className="flex flex-col flex-1 bg-glass-surface backdrop-blur-xl border border-glass-border rounded-4xl p-gutter shadow-drop overflow-y-auto custom-scrollbar">
        <h2 className="font-mono text-3xl font-semibold mb-10 text-on-surface">
          Tasks
        </h2>

        {/* --- GROUP: FOCUSING ON --- */}
        <div className="flex flex-col gap-4 mb-12">
          <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-muted opacity-80">
            Focusing On
          </h4>

          {activeTask ? (
            <div className="bg-glass-surface border border-glass-border border-l-4 border-l-primary-container p-4 rounded-2xl flex justify-between items-center transition-colors">
              <div>
                <p className="font-semibold m-0 text-on-surface">
                  {activeTask.text}
                </p>
                <span className="text-muted text-sm">{activeTask.time}</span>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleCancelActive(activeTask.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-glass-highlight transition-colors text-on-surface"
                  aria-label="Cancel Focus"
                >
                  <X size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => handleCompleteTask(activeTask.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-glass-highlight transition-colors text-primary-container"
                  aria-label="Complete Focus Task"
                >
                  <CheckCircle size={20} />
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <p className="text-muted m-0">Select a task to focus on</p>
            </div>
          )}
        </div>

        {/* --- GROUP: UP NEXT --- */}
        <div className="flex flex-col gap-4 mb-12">
          <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-muted opacity-80">
            Up Next
          </h4>

          <ul className="flex flex-col gap-3 max-h-[25vh] overflow-y-auto pr-2 custom-scrollbar">
            {pendingTasks.map((task) => (
              <li
                key={task.id}
                className="bg-glass-surface border border-glass-border p-4 rounded-2xl flex justify-between items-center transition-colors"
              >
                <label className="flex items-center gap-3 cursor-pointer text-on-surface">
                  <input
                    type="checkbox"
                    className="w-4 h-4 accent-primary-container cursor-pointer"
                    onChange={() => handleCompleteTask(task.id)}
                  />
                  {task.text}
                </label>
                <div className="flex items-center gap-3">
                  <span className="text-muted text-sm">{task.time}</span>
                  <button
                    type="button"
                    onClick={() => handleSetActive(task.id)}
                    className="text-muted hover:text-primary transition-colors"
                    aria-label="Set as Focus"
                  >
                    <Play size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-muted hover:text-red-400 transition-colors"
                    aria-label="Delete Task"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleAddTask}
            className="mt-4 text-muted text-sm text-center p-4 border border-dashed border-muted rounded-xl transition-colors hover:text-primary hover:border-primary"
          >
            + Add new task
          </button>
        </div>

        {/* --- GROUP: DONE --- */}
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h4 className="font-sans text-sm font-bold uppercase tracking-widest text-muted opacity-80">
              Done
            </h4>
            <span className="bg-background shadow-glass-highlight text-secondary text-xs py-1 px-3 rounded-full font-semibold">
              {doneCount} Today
            </span>
          </div>

          <ul className="flex flex-col gap-2">
            {doneTasks.map((task) => (
              <li
                key={task.id}
                className="flex items-center gap-3 p-4 opacity-50 text-on-surface"
              >
                <CheckCircle size={20} />
                <span className="line-through">{task.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Task;
