import { motion } from "framer-motion";
import { Play, Square } from "lucide-react";
import { FocusTimer } from "./FocusTimer";

interface FocusHeaderProps {
  isFocusMode: boolean;
  onToggleFocus: () => void;
}

export function FocusHeader({ isFocusMode, onToggleFocus }: FocusHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start justify-between"
    >
      <div>
        <motion.h1
          key={isFocusMode ? "focus" : "normal"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-2xl font-semibold text-foreground mb-2 transition-theme"
        >
          {isFocusMode ? "Focus session active" : "Ready to focus?"}
        </motion.h1>
        <motion.p
          key={isFocusMode ? "focus-sub" : "normal-sub"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-muted-foreground transition-theme"
        >
          {isFocusMode
            ? "Stay in deep work while we handle notifications."
            : "Start a session to prioritize your notifications."}
        </motion.p>
      </div>

      <div className="flex items-center gap-4">
        <FocusTimer isActive={isFocusMode} />

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onToggleFocus}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 focus-glow ${
            isFocusMode
              ? "bg-destructive/10 text-destructive hover:bg-destructive/15 border border-destructive/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20"
          }`}
        >
          {isFocusMode ? (
            <>
              <Square className="w-4 h-4" />
              End Session
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              Start Focus
            </>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
