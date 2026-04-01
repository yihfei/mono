// TaskItem.tsx
import { type Task } from '../types/TaskTypes';

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
}

export const TaskItem = ({ task, onToggle }: TaskItemProps) => {
  const isDone = task.status === 'Done';
  
  return (
    <div 
      onClick={() => onToggle(task.id)}
      className={`
        group flex flex-col py-4 cursor-pointer transition-all duration-200
        ${isDone ? 'opacity-40' : 'opacity-100 hover:opacity-70'}
      `}
    >
      <div className={`
        pl-4 border-l-2 transition-colors duration-200
        ${task.urgency && !isDone ? 'border-black' : 'border-transparent'}
      `}>
        {/* Task Title */}
        <h3 className={`
          text-lg sm:text-xl font-medium tracking-tight mb-1
          ${isDone ? 'line-through text-gray-400' : 'text-black'}
        `}>
          {task.title}
        </h3>
        
        {/* Task Metadata / Subtitle */}
        {/* Note: Adjusting this based on your current Task type properties */}
        <div className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
          {task.urgency && <span>High Priority</span>}
          {task.urgency && <span className="text-gray-300">•</span>}
          <span>{isDone ? 'Completed' : 'Draft'}</span>
        </div>
      </div>
    </div>
  );
};