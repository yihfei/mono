import { useState, useEffect, useRef } from 'react';
import { useTasks } from '../context/TaskContext';

export const TaskInput = () => {
  const [inputValue, setInputValue] = useState('');
  const { addTask } = useTasks(); 
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Handle keyboard shortcut to focus the input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault(); // Prevent default browser search behavior
        inputRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 2. Handle adding the task on Enter
  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue.trim() !== '') {
      // Defaulting urgency to false for now. 
      // You could later add a shortcut (like typing "! ") to set urgency to true.
      addTask(inputValue.trim(), false);
      setInputValue(''); // Clear the input after submission
    }
  };

  return (
    <div className="fixed bottom-12 left-0 w-full flex justify-center px-6 pointer-events-none z-50">
      <div className="monolith-column w-full pointer-events-auto">
        {/* Make sure .glass-panel is defined in your global CSS */}
        <div className="glass-panel w-full p-1 shadow-[0_20px_40px_rgba(26,28,28,0.04)] ring-1 ring-black/[0.03]">
          <div className="relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-outline opacity-40">
              add
            </span>
            
            <input 
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleEnter}
              className="w-full bg-transparent border-none focus:ring-0 outline-none py-4 pl-12 pr-6 font-body text-base placeholder:text-outline/40" 
              placeholder="Type to add a new focus..." 
              type="text"
            />
            
            <div className="absolute right-4 flex gap-2">
              <kbd className="hidden md:flex items-center px-1.5 py-0.5 font-label text-[10px] bg-surface-container-high text-on-surface-variant opacity-60">
                CMD
              </kbd>
              <kbd className="hidden md:flex items-center px-1.5 py-0.5 font-label text-[10px] bg-surface-container-high text-on-surface-variant opacity-60">
                K
              </kbd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};