import { createContext, useContext } from 'react';
import { type TaskContextType } from '../types/TaskTypes';

// We export the Context and the Hook
export const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};