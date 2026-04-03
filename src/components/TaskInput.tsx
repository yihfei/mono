// src/components/TaskInput.tsx
import { useState, useEffect, useRef } from "react";
import { useTasks } from "../context/TaskContext";

export const TaskInput = () => {
  const [inputValue, setInputValue] = useState("");
  const [isUrgent, setIsUrgent] = useState(false);
  const { addTask } = useTasks();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 0. Handle CMD + U for urgent toggle
      if ((e.metaKey || e.ctrlKey) && e.key === "u") {
        e.preventDefault();
        setIsUrgent((prev) => !prev);
        return;
      }

      // 1. Handle CMD + K shortcut
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        return;
      }

      // 2. Handle "Type to Add" functionality
      // First, make sure they aren't already typing in an input or textarea
      // (This prevents hijacking focus if you add other inputs to the app later)
      const isTypingInInput =
        document.activeElement instanceof HTMLInputElement ||
        document.activeElement instanceof HTMLTextAreaElement;

      if (isTypingInInput) return;

      // Second, ignore any keyboard combinations (like CMD+C, ALT+Tab, etc.)
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      // Finally, if the key is a single printable character (letters, numbers, punctuation)
      if (e.key.length === 1) {
        console.log("Focusing input due to key press:", e.key);
        inputRef.current?.focus();
        // By focusing during the 'keydown' event, the browser seamlessly
        // routes the subsequent 'keypress' and 'input' events to the input field,
        // meaning the character they just typed will appear automatically!
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputValue.trim() !== "") {
      addTask(inputValue.trim(), isUrgent);
      setInputValue("");
      setIsUrgent(false);
    }
  };

  return (
    <div className="fixed bottom-12 left-0 w-full flex justify-center px-6 pointer-events-none z-50">
      <div className="monolith-column w-full max-w-2xl pointer-events-auto">
        <div
          className={`glass-panel w-full p-1 shadow-[0_20px_40px_rgba(26,28,28,0.04)] ring-1 ${isUrgent ? "ring-red-500 border-2 border-red-500" : "ring-black/[0.03]"}`}
        >
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
