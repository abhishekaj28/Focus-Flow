import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Bell, BellOff, CheckCircle2, ChevronDown, Mail, MessageSquare, Calendar as CalendarIcon, Hash } from "lucide-react";

interface SummaryViewProps {
  totalFocusTime: number;
  sessionsCompleted: number;
  notificationsAllowed: number;
  notificationsDeferred: number;
}

interface BreakdownItem {
  app: string;
  count: number;
  icon: React.ElementType;
}

export function SummaryView({
  totalFocusTime,
  sessionsCompleted,
  notificationsAllowed,
  notificationsDeferred,
}: SummaryViewProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Mock breakdown data generator
  const getBreakdown = (type: string, total: number): BreakdownItem[] => {
    // Distribute total mockly
    const slack = Math.floor(total * 0.5);
    const email = Math.floor(total * 0.3);
    const calendar = Math.floor(total * 0.2);
    const social = total - slack - email - calendar;

    return [
      { app: "Slack", count: slack, icon: Hash },
      { app: "Email", count: email, icon: Mail },
      { app: "Calendar", count: calendar, icon: CalendarIcon },
      { app: "Social", count: social > 0 ? social : 0, icon: MessageSquare }, // Ensure no negative
    ];
  };

  const stats = [
    {
      id: "focus-time",
      label: "Total Focus Time",
      value: formatTime(totalFocusTime),
      icon: Clock,
      color: "text-primary",
      bgColor: "bg-primary/10",
      expandable: false,
    },
    {
      id: "sessions",
      label: "Sessions Completed",
      value: sessionsCompleted.toString(),
      icon: CheckCircle2,
      color: "text-status-allowed",
      bgColor: "bg-status-allowed/10",
      expandable: false,
    },
    {
      id: "allowed",
      label: "Notifications Allowed",
      value: notificationsAllowed.toString(),
      icon: Bell,
      color: "text-status-allowed",
      bgColor: "bg-status-allowed/10",
      expandable: true,
      breakdown: getBreakdown("allowed", notificationsAllowed),
    },
    {
      id: "deferred",
      label: "Notifications Deferred",
      value: notificationsDeferred.toString(),
      icon: BellOff,
      color: "text-status-deferred",
      bgColor: "bg-status-deferred/10",
      expandable: true,
      breakdown: getBreakdown("deferred", notificationsDeferred),
    },
  ];

  const handleCardClick = (id: string, expandable: boolean) => {
    if (!expandable) return;
    setExpandedCard(expandedCard === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Summary</h1>
        <p className="text-muted-foreground">
          Your focus session statistics at a glance.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const isExpanded = expandedCard === stat.id;

          return (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onClick={() => handleCardClick(stat.id, stat.expandable)}
              className={`glass-card p-5 relative overflow-hidden transition-all duration-300 ${stat.expandable ? "cursor-pointer hover:bg-white/5 dark:hover:bg-white/5 active:scale-[0.99]" : ""
                } ${isExpanded ? "ring-1 ring-primary/20 bg-white/5" : ""}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${stat.bgColor} flex items-center justify-center`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                {stat.expandable && (
                  <div className={`transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}>
                    <ChevronDown className="w-4 h-4 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              <div className="text-2xl font-semibold text-foreground mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>

              {/* Expandable Breakdown Section */}
              <AnimatePresence>
                {isExpanded && stat.breakdown && (
                  <motion.div
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: "auto", opacity: 1, marginTop: 16 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="overflow-hidden border-t border-border/40 pt-4"
                  >
                    <div className="flex flex-col gap-2">
                      {stat.breakdown.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <div key={item.app} className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <ItemIcon className="w-3.5 h-3.5 opacity-70" />
                              <span>{item.app}</span>
                            </div>
                            <span className={`font-medium ${item.count > 0 ? "text-foreground" : "text-muted-foreground/50"}`}>
                              {item.count} {item.count === 1 ? 'notification' : 'notifications'}
                            </span>
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
