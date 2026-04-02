// TaskItem.tsx
import { type Task } from "../types/TaskTypes";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => {
  const isDone = task.status === 'Done';

  return (
    <div 
      onClick={() => onToggle(task.id)}
      className={`
        group flex items-start gap-6 pl-4 py-1 cursor-pointer transition-all duration-200
        ${task.urgency && !isDone ? 'border-l-2 border-[#000000]' : 'border-l-2 border-transparent'}
      `}
    >
      <div className={`
        flex-grow transition-all duration-200
        ${isDone ? 'line-through decoration-1 opacity-30' : ''}
      `}>
        <h2 className={`
          font-body text-lg leading-tight mb-1
          ${isDone ? 'text-secondary' : 'text-primary'}
        `}>
          {task.title}
        </h2>
        <div className="flex gap-3 items-center">
          {task.urgency && !isDone && (
            <>
              <span className="text-[0.6875rem] font-label text-outline opacity-60">High Priority</span>
              <span className="text-[0.6875rem] font-label text-outline opacity-30">•</span>
            </>
          )}
          
          {/* <span className="text-[0.6875rem] font-label text-outline opacity-60">
            {isDone ? 'Completed' : 'Draft'}
          </span> */}
        </div>
      </div>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onDelete(task.id);
        }}
        className="shrink-0 px-2 py-1 text-xs opacity-50 hover:opacity-100 transition-opacity"
        aria-label={`Delete ${task.title}`}
      >
        Delete
      </button>
    </div>
  );
};