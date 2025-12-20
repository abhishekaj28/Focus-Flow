import { motion, AnimatePresence } from "framer-motion";
import { NotificationCard, Notification } from "./NotificationCard";
import { Bell, BellOff } from "lucide-react";

import { useNotificationContext } from "@/context/NotificationContext";
import { useFocusContext } from "@/context/FocusContext";

export function NotificationList() {
  const { notifications } = useNotificationContext();
  const { isFocusMode } = useFocusContext();

  const allowedCount = notifications.filter((n) => n.status === "allowed").length;
  const deferredCount = notifications.filter((n) => n.status === "deferred").length;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          {isFocusMode ? (
            <BellOff className="w-4 h-4 text-muted-foreground transition-theme" />
          ) : (
            <Bell className="w-4 h-4 text-muted-foreground transition-theme" />
          )}
          <h2 className="text-sm font-medium text-foreground transition-theme">
            Notifications
          </h2>
        </div>

        {isFocusMode && notifications.length > 0 && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 text-xs"
          >
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-allowed" />
              <span className="text-muted-foreground transition-theme">{allowedCount} allowed</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-status-deferred" />
              <span className="text-muted-foreground transition-theme">{deferredCount} deferred</span>
            </span>
          </motion.div>
        )}
      </div>

      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {notifications.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-10 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-muted/10 flex items-center justify-center mx-auto mb-4">
                <Bell className="w-6 h-6 text-muted-foreground transition-theme" />
              </div>
              <p className="text-sm text-muted-foreground transition-theme">
                {isFocusMode
                  ? "No notifications yet. Stay focused!"
                  : "Start a focus session to see prioritized notifications."}
              </p>
            </motion.div>
          ) : (
            notifications.map((notification, index) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                index={index}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
