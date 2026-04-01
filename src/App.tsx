// App.tsx
import { useState } from "react";
import { TaskItem } from "./components/TaskItem";
import { type Task } from "./types/TaskTypes";

// Dummy data matching your screenshot
const DUMMY_TASKS: Task[] = [
  {
    id: "1",
    title: "Redesign the Monolith design system documentation",
    urgency: true,
    status: "Queue",
    completedAt: null,
  },
  {
    id: "2",
    title: "Review quarterly architectural roadmap",
    urgency: false,
    status: "Queue",
    completedAt: null,
  },
  {
    id: "3",
    title: "Finalize typography tokens for Inter & Space Grotesk",
    urgency: false,
    status: "Queue",
    completedAt: null,
  },
  {
    id: "4",
    title: "Morning sync with engineering team",
    urgency: false,
    status: "Done",
    completedAt: Date.now(),
  },
  {
    id: "5",
    title: "Refactor navigation shell component logic",
    urgency: false,
    status: "Done",
    completedAt: Date.now(),
  },
];

export default function App() {
  const [tasks, setTasks] = useState<Task[]>(DUMMY_TASKS);

  // Temporary toggle function for the dummy view
  const handleToggle = (id: string) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            status: task.status === "Queue" ? "Done" : "Queue",
          };
        }
        return task;
      }),
    );
  };

  const activeTasks = tasks.filter((t) => t.status === "Queue");
  const completedTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black font-sans selection:bg-black selection:text-white">
      <div className="max-w-3xl mx-auto px-6 py-20 flex flex-col h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <h1 className="text-xl font-bold tracking-tighter uppercase">MONO</h1>
          <div className="flex gap-4 text-gray-400">
            <button className="hover:text-black transition-colors">⚙️</button>
            <button className="hover:text-black transition-colors">⋮</button>
          </div>
        </header>

        {/* Title */}
        <div className="mb-12">
          <p className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-2">
            Focus Mode
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Today’s Focus
          </h2>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex flex-col gap-2">
            {activeTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggle} />
            ))}
          </div>

          {/* Divider if we have completed tasks */}
          {completedTasks.length > 0 && (
            <div className="my-12 border-t border-gray-100"></div>
          )}

          <div className="flex flex-col gap-2">
            {completedTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={handleToggle} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
