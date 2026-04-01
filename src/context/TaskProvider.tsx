import { useState, useEffect, type ReactNode } from 'react';
import { type Task, type TaskContextType, STORAGE_KEY } from '../types/TaskTypes';
import { TaskContext } from './TaskContext';

export const TaskProvider = ({ children }: { children: ReactNode }) => {

  // Lazy Initializer
  const [tasks, setTasks] = useState<Task[]>(() => {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Note: We don't call setIsLoaded(true) here anymore (see useEffect below)
        return parsed.tasks || [];
      } catch (e) {
        console.error('Failed to parse state', e);
      }
    }
    return [];
  });

  // Handle Loading state correctly


  // Sync to Storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ tasks }));
  }, [tasks]);

  const addTask = (title: string, urgency: boolean) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      urgency,
      status: 'Queue',
      completedAt: null,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const completeTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: 'Done', completedAt: Date.now() } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const contextValue: TaskContextType = {
    tasks,
    addTask,
    completeTask,
    deleteTask,
  };

  return (
    <TaskContext value={contextValue}>
      {children}
    </TaskContext>
  );
};