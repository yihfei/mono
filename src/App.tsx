import { useTasks } from "./context/TaskContext";
import { TaskItem } from "./components/TaskItem";
import { TaskInput } from "./components/TaskInput";
import { Clock } from "./components/Clock";

export default function App() {
  const { tasks, completeTask, deleteTask } = useTasks();

  const activeTasks = tasks.filter((t) => t.status === "Queue");
  const completedTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-black font-sans selection:bg-black selection:text-white">
      <div className="max-w-3xl mx-auto px-6 py-12 flex flex-col h-screen">

        <div className="mb-8">
          <h2 className="text-2xl sm:text-5xl text-gray-400 font-semibold tracking-tight">
            Today’s Focus
          </h2>
          <Clock />
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto pb-32">
          <div className="flex flex-col gap-4">
            {activeTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={completeTask}
                onDelete={deleteTask}
              />
            ))}
          </div>

          {/* Divider if we have uncompleted AND completed tasks */}
          {activeTasks.length > 0 && completedTasks.length > 0 && (
            <div className="my-12 border-t border-gray-100"></div>
          )}

          <div className="flex flex-col gap-2">
            {completedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={completeTask}
                onDelete={deleteTask}
              />
            ))}
          </div>
        </div>
        <TaskInput />
      </div>
    </div>
  );
}
