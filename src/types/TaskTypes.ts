export type TaskStatus = 'Queue' | 'Done';

export interface Task {
  id: string;
  title: string;
  urgency: boolean;
  status: TaskStatus;
  completedAt: number | null;
}

export interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, urgency: boolean) => void;
  completeTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

export const STORAGE_KEY = 'task_state';