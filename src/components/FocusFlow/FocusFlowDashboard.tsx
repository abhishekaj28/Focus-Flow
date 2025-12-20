import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { FocusHeader } from "./FocusHeader";
import { NotificationList } from "./NotificationList";
import { HomeView } from "./HomeView";
import { SummaryView } from "./SummaryView";
import { SettingsView } from "./SettingsView";
import { AIView } from "./AIView";
import { LoadingScreen } from "./LoadingScreen";
import { Notification, NotificationStatus } from "./NotificationCard";
import { useFocusContext } from "@/context/FocusContext";
import { useNotificationContext } from "@/context/NotificationContext";
import { useSettings } from "@/context/SettingsContext";
import { toast } from "sonner";

const mockNotifications: Omit<Notification, "id" | "timestamp">[] = [
  { source: "Slack", message: "Team standup in 5 minutes", status: "allowed", icon: "message", insightReason: "Meeting reminder detected" },
  { source: "Gmail", message: "Weekly newsletter from Medium", status: "deferred", icon: "mail", insightReason: "Newsletter pattern matched" },
  { source: "Calendar", message: "Meeting with design team at 3pm", status: "allowed", icon: "calendar", insightReason: "From your calendar" },
  { source: "Twitter", message: "You have 5 new notifications", status: "deferred", icon: "bell", insightReason: "Social media notification" },
  { source: "Slack", message: "Sarah shared a file with you", status: "deferred", icon: "message", insightReason: "Work-related but not urgent" },
  { source: "Gmail", message: "Your AWS bill is ready", status: "deferred", icon: "mail", insightReason: "Queued for review" },
];

export function FocusFlowDashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [isAppLoading, setIsAppLoading] = useState(true);
  // Store stats of the last completed session to display in Summary
  const [lastSessionStats, setLastSessionStats] = useState({ duration: 0, notifications: { allowed: 0, deferred: 0 } });

  const { isFocusMode, endSession, startSession, elapsedTime } = useFocusContext();
  const { notifications, stats, addNotification, clearNotifications } = useNotificationContext();

  const { settings } = useSettings();

  // Initial App Load Logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
      // Ensure we start at home
      setActiveTab("home");
    }, 2400); // 2.4s duration for bold, confident feel

    return () => clearTimeout(timer);
  }, []);

  // Apply dark mode class based on focus state with smooth transition
  useEffect(() => {
    const root = document.documentElement;

    if (isFocusMode && settings.autoDarkMode) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isFocusMode, settings.autoDarkMode]);

  // Focus Reminders Logic (Every 25 minutes)
  useEffect(() => {
    if (isFocusMode && settings.focusReminders && elapsedTime > 0 && elapsedTime % 1500 === 0) {
      toast.info("Time for a break?", {
        description: "You've been focused for 25 minutes. Take a deep breath.",
        duration: 5000,
      });
    }
  }, [elapsedTime, isFocusMode, settings.focusReminders]);

  // Simulate incoming notifications during focus mode
  useEffect(() => {
    if (!isFocusMode) return;
    if (settings.strictMode) return; // Block all notifications in Strict Mode

    let index = 0;
    const interval = setInterval(() => {
      if (index < mockNotifications.length) {
        const notif = mockNotifications[index];

        // AI / Smart Logic Simulation
        let finalStatus = notif.status;
        let finalReason = notif.insightReason;

        if (settings.aiEnabled) {
          finalReason = `AI: ${notif.insightReason}`;
          // Make it "smarter" (mock): Randomly allow some muted ones if urgent-looking
          if (notif.message.toLowerCase().includes("urgent")) {
            finalStatus = "allowed";
            finalReason = "AI detected urgency";
          }
        } else {
          // Basic Rule-based only
          finalReason = "Rule matching";
        }

        const newNotification: Notification = {
          ...notif,
          status: finalStatus,
          insightReason: finalReason,
          id: `notif-${Date.now()}-${index}`,
          timestamp: new Date(),
        };
        addNotification(newNotification);

        index++;
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isFocusMode, settings.strictMode, settings.aiEnabled, settings.notificationRules]);

  const handleToggleFocus = useCallback(() => {
    if (isFocusMode) {
      // Ending session - Capture stats first
      setLastSessionStats({
        duration: elapsedTime,
        notifications: { ...stats }
      });

      endSession();
      clearNotifications(); // Clear current notifications from context
      setActiveTab("summary");
    } else {
      startSession();
    }
  }, [isFocusMode, endSession, startSession, elapsedTime, stats, clearNotifications]);

  const handleStartFocus = useCallback(() => {
    if (!isFocusMode) {
      startSession();
    }
    setActiveTab("focus");
  }, [startSession, isFocusMode]);



  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <HomeView onStartFocus={handleStartFocus} />;
      case "focus":
        return (
          <>
            <FocusHeader
              isFocusMode={isFocusMode}
              onToggleFocus={handleToggleFocus}
            />
            <NotificationList />
          </>
        );
      case "summary":
        return (
          <SummaryView
            totalFocusTime={lastSessionStats.duration}
            sessionsCompleted={1} // In a real app we'd track lifetime sessions
            notificationsAllowed={lastSessionStats.notifications.allowed}
            notificationsDeferred={lastSessionStats.notifications.deferred}
            showSummarizeAction={!isFocusMode && lastSessionStats.duration > 0}
          />
        );
      case "settings":
        return <SettingsView />;
      case "ai":
        return <AIView />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background transition-theme flex items-center justify-center p-6 relative">
      {/* Ambient Grain Overlay */}
      <div className="ambient-grain" />

      {/* Loading Screen Overlay */}
      <AnimatePresence>
        {isAppLoading && <LoadingScreen />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 10 }}
        animate={!isAppLoading ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
        className="glass-panel w-full max-w-5xl p-4 flex gap-4 relative z-10"
      >
        <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

        <motion.main
          layout
          className="flex-1 p-6"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </motion.main>
      </motion.div>
    </div>
  );
}
