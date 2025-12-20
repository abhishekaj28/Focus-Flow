import { motion, AnimatePresence } from "framer-motion";
import { Bell, Moon, Clock, Shield, Sparkles, LogOut, Loader2, CheckCircle2 } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { useAuth } from "@/context/AuthContext";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

export function SettingsView() {
  const { settings, updateSetting } = useSettings();
  const { user, login, logout, isLoading, isAuthenticated } = useAuth();

  const toggleConfigs = [
    {
      key: "notificationRules",
      icon: Bell,
      title: "Notification Rules",
      description: "Configure which apps can interrupt focus mode",
    },
    {
      key: "autoDarkMode",
      icon: Moon,
      title: "Auto Dark Mode",
      description: "Automatically switch to dark theme during focus",
    },
    {
      key: "focusReminders",
      icon: Clock,
      title: "Focus Reminders",
      description: "Get reminded to take breaks every 25 minutes",
    },
    {
      key: "strictMode",
      icon: Shield,
      title: "Strict Mode",
      description: "Block all notifications during focus sessions",
    },
    {
      key: "aiEnabled",
      icon: Sparkles,
      title: "Enable AI Assistant",
      description: "Smart notification prioritization and summaries",
      isBeta: true
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full"
    >
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Customize your FocusFlow experience.
        </p>
      </div>

      <div className="space-y-3 flex-1 overflow-y-auto pb-4">
        {/* Core Settings */}
        {toggleConfigs.map((config, index) => {
          const Icon = config.icon;
          const isEnabled = settings[config.key as keyof typeof settings];

          return (
            <motion.div
              key={config.key}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="glass-card p-4 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-medium text-foreground">{config.title}</div>
                    {config.isBeta && (
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 uppercase tracking-wide">
                        Beta
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {config.description}
                  </div>
                </div>
              </div>

              <Switch
                checked={isEnabled as boolean}
                onCheckedChange={(checked) => updateSetting(config.key as keyof typeof settings, checked)}
                className={config.key === 'aiEnabled' ? "data-[state=checked]:bg-indigo-500" : ""}
              />
            </motion.div>
          );
        })}

        {/* AI Assistant Status Panel - Visible only when AI is Enabled */}
        <AnimatePresence>
          {settings.aiEnabled && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: "auto", scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass-card p-4 flex items-center justify-between relative overflow-hidden group border-indigo-500/30 bg-indigo-500/5 mt-4">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-transparent opacity-50" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <Sparkles className="w-5 h-5 text-white animate-pulse" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-semibold text-foreground">AI Assistant Active</div>
                      <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] animate-pulse" />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      AI is helping prioritize notifications and summarize your focus sessions.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Authentication Section - Bottom */}
      <div className="mt-6 pt-6 border-t border-border/40">
        {!isAuthenticated ? (
          <div className="glass-card p-6 rounded-2xl border-white/10 dark:border-white/5 shadow-xl bg-white/5 dark:bg-black/20 backdrop-blur-md text-center">
            <button
              onClick={login}
              disabled={isLoading}
              className="w-full group relative flex items-center justify-center gap-3 bg-white dark:bg-[#1a1a1a] hover:bg-gray-50 dark:hover:bg-[#252525] text-gray-800 dark:text-gray-200 px-6 py-3 rounded-xl border border-gray-200 dark:border-gray-800 transition-all active:scale-[0.98] shadow-sm hover:shadow-md"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
              ) : (
                <>
                  <img
                    src="https://www.google.com/favicon.ico"
                    alt="Google"
                    className="w-5 h-5"
                  />
                  <span className="font-medium">Continue with Google</span>
                </>
              )}
              <div className="absolute inset-0 rounded-xl ring-2 ring-primary/20 opacity-0 group-focus-visible:opacity-100 transition-opacity" />
            </button>
            <p className="text-[10px] text-muted-foreground mt-3">
              Sync your settings across devices.
            </p>
          </div>
        ) : (
          <div className="glass-card p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-border/50">
                <AvatarImage src={user?.avatar} alt={user?.name} />
                <AvatarFallback>{user?.name?.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <div className="text-sm font-medium text-foreground">{user?.name}</div>
                <div className="text-xs text-muted-foreground">{user?.email}</div>
              </div>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
