import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Target, BarChart3, Settings, LogOut, LogIn, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext";
import { useSettings } from "@/context/SettingsContext";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const { settings } = useSettings();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Direct check as requested, though existing hook usage suggests global state
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const userEmail = localStorage.getItem("userEmail");

  // Reset scroll position when activeTab changes to 'home' or component mounts
  useEffect(() => {
    if (activeTab === 'home' && sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [activeTab]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "focus", label: "Focus Session", icon: Target },
    { id: "summary", label: "Summary", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  if (settings.aiEnabled) {
    navItems.push({ id: "ai", label: "AI Assistant", icon: Sparkles });
  }

  return (
    <motion.div
      ref={sidebarRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-sidebar p-3 w-56 flex flex-col gap-1 h-full overflow-y-auto custom-scrollbar"
    >
      <div className="px-4 py-4 mb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Target className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-foreground transition-theme">FocusFlow</span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
              onClick={() => onTabChange(item.id)}
              className={`nav-item focus-glow ${isActive ? "nav-item-active" : ""} ${item.id === "ai" ? "text-indigo-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20" : ""
                }`}
            >
              <Icon className={`w-4 h-4 ${item.id === "ai" ? "animate-pulse" : ""}`} />
              <span>{item.label}</span>
            </motion.button>
          );
        })}
      </nav>

      {/* Auth Section - Bottom of Sidebar */}
      <div className="mt-auto pt-4 border-t border-border/40">
        {!isAuthenticated ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={() => navigate("/login")}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-muted hover:bg-secondary/50 transition-all text-sm font-medium text-foreground group"
          >
            <LogIn className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            <span>Login</span>
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-transparent hover:bg-destructive/10 hover:text-destructive transition-all text-sm font-medium text-muted-foreground group"
          >
            <LogOut className="w-4 h-4 group-hover:text-destructive transition-colors" />
            <div className="flex flex-col items-start leading-none text-left">
              <span className="text-foreground group-hover:text-destructive">Logout</span>
              {userEmail && <span className="text-[10px] opacity-60 mt-1 max-w-[120px] truncate">{userEmail}</span>}
            </div>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
