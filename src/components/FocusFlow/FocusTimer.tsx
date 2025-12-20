import { useMemo } from "react";
import { motion } from "framer-motion";
import { useFocusTimer } from "@/hooks/useFocusTimer";

interface FocusTimerProps {
  isActive: boolean;
  onTimeUpdate?: (time: number) => void;
}

type FocusIntensity = "low" | "moderate" | "deep";

export function FocusTimer({ isActive }: FocusTimerProps) {
  const { elapsedTime: seconds } = useFocusTimer();

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Calculate focus intensity based on session duration
  const focusIntensity: FocusIntensity = useMemo(() => {
    const minutes = Math.floor(seconds / 60);
    if (minutes < 5) return "low";
    if (minutes < 25) return "moderate";
    return "deep";
  }, [seconds]);

  const intensityLabels = {
    low: "Low Distraction",
    moderate: "Moderate",
    deep: "Deep Focus",
  };

  // Progress ring calculation (completes every 25 minutes - Pomodoro cycle)
  const progress = useMemo(() => {
    const cycleSeconds = 25 * 60; // 25 minutes
    return (seconds % cycleSeconds) / cycleSeconds;
  }, [seconds]);

  const circumference = 2 * Math.PI * 28; // radius = 28
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="glass-card-elevated px-5 py-4"
    >
      <div className="flex items-center gap-5">
        {/* Progress Ring with Timer */}
        <div className="relative">
          <svg width="72" height="72" className="progress-ring">
            <circle
              className="progress-ring-track"
              cx="36"
              cy="36"
              r="28"
            />
            <motion.circle
              className="progress-ring-fill"
              cx="36"
              cy="36"
              r="28"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: isActive ? strokeDashoffset : circumference }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 ${isActive ? "bg-status-allowed animate-pulse" : "bg-muted/50"
                }`}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground transition-theme">
              {isActive ? "Focus Mode ON" : "Focus Mode OFF"}
            </span>
          </div>

          {/* Timer Display */}
          <div className="text-2xl font-semibold text-foreground tabular-nums tracking-tight transition-theme">
            {formatTime(seconds)}
          </div>

          {/* Focus Intensity Indicator */}
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <span className={`intensity-badge intensity-${focusIntensity}`}>
                {intensityLabels[focusIntensity]}
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
