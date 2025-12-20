import { motion } from "framer-motion";
import { Target, Zap, Shield, Clock } from "lucide-react";

import { useFocusContext } from "@/context/FocusContext";
import { useFocusTimer } from "@/hooks/useFocusTimer";


interface HomeViewProps {
  onStartFocus: () => void;
}

export function HomeView({ onStartFocus }: HomeViewProps) {
  const { isFocusMode } = useFocusContext();
  const { formattedTime } = useFocusTimer();

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  const features = [
    {
      icon: Zap,
      title: "Smart Prioritization",
      description: "AI-powered notification filtering",
    },
    {
      icon: Shield,
      title: "Distraction Shield",
      description: "Block non-essential interruptions",
    },
    {
      icon: Clock,
      title: "Time Tracking",
      description: "Monitor your focus sessions",
    },
  ];

  return (
    <div className="relative min-h-[600px] flex flex-col">
      {!isAuthenticated && (
        <div className="absolute top-0 right-0 z-20">
          <a href="/login" className="px-5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
            Login
          </a>
        </div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex-1 flex flex-col items-center justify-center pt-8"
      >
        <div className="text-center mb-10 w-full max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6"
          >
            <Target className="w-8 h-8 text-primary" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="text-4xl md:text-5xl font-bold text-foreground mb-4 tracking-tight leading-tight"
          >
            Prioritize focus.
            <br />
            <span className="text-primary/90">Not noise.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.25 }}
            className="text-lg text-muted-foreground/90 max-w-md mx-auto mb-10 leading-relaxed"
          >
            We don’t block notifications, we prioritize them.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
          >
            <button
              onClick={onStartFocus}
              className={`px-8 py-3.5 rounded-full font-medium text-base transition-all transform hover:scale-[1.02] active:scale-[0.98] ${isFocusMode
                ? "bg-status-allowed text-white hover:bg-status-allowed/90 animate-pulse shadow-lg shadow-status-allowed/20"
                : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25"
                }`}
            >
              {isFocusMode ? (
                <span className="flex items-center gap-2.5">
                  <span>Return to Focus Session</span>
                  <span className="bg-white/20 px-2 py-0.5 rounded-md text-sm font-mono">
                    {formattedTime}
                  </span>
                </span>
              ) : (
                "Start Focus Session"
              )}
            </button>
          </motion.div>

          {isFocusMode && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm font-medium text-status-allowed"
            >
              Focus Session Active
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mb-12"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.45 + index * 0.05 }}
                className="glass-card p-5 text-center flex flex-col items-center hover:bg-secondary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-sm font-medium text-foreground mb-1">
                  {feature.title}
                </div>
                <div className="text-xs text-muted-foreground">
                  {feature.description}
                </div>
              </motion.div>
            );
          })}
        </motion.div>


      </motion.div>
    </div>
  );
}
