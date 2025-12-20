import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Mail, Bell, Calendar } from "lucide-react";

export type NotificationStatus = "allowed" | "deferred";

export interface Notification {
  id: string;
  source: string;
  message: string;
  status: NotificationStatus;
  icon: "message" | "mail" | "bell" | "calendar";
  timestamp: Date;
  insightReason?: string;
}

interface NotificationCardProps {
  notification: Notification;
  index: number;
}

const iconMap = {
  message: MessageSquare,
  mail: Mail,
  bell: Bell,
  calendar: Calendar,
};

const statusLabels = {
  allowed: "Allowed",
  deferred: "Deferred",
};

const insightReasons: Record<NotificationStatus, string[]> = {
  allowed: [
    "Marked as urgent by sender",
    "From priority contact",
    "Contains time-sensitive info",
    "Meeting reminder detected",
  ],
  deferred: [
    "Promotional content detected",
    "Low priority sender",
    "Newsletter pattern matched",
    "Social media notification",
    "Work-related but not urgent",
    "Can wait until break",
  ],
};

export function NotificationCard({ notification, index }: NotificationCardProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const Icon = iconMap[notification.icon];

  // Get a consistent reason based on the notification
  const reason = notification.insightReason ||
    insightReasons[notification.status][index % insightReasons[notification.status].length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, x: 20 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.96, x: -20 }}
      transition={{
        duration: 0.35,
        delay: index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      className="glass-card-interactive p-4 flex items-start gap-3 relative group"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 transition-colors duration-200 group-hover:bg-primary/12">
        <Icon className="w-4.5 h-4.5 text-primary" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-sm font-medium text-foreground transition-theme">
            {notification.source}
          </span>
          <span className={`status-badge status-${notification.status}`}>
            {statusLabels[notification.status]}
          </span>
        </div>
        <p className="text-sm text-muted-foreground truncate transition-theme">
          {notification.message}
        </p>
      </div>

      {/* Insight Tooltip */}
      <div
        className={`insight-tooltip bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap ${showTooltip ? 'visible' : ''
          }`}
      >
        {reason}
      </div>
    </motion.div>
  );
}
