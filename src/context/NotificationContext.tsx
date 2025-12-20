import React, { createContext, useContext, useState, ReactNode } from "react";
import { Notification } from "../components/FocusFlow/NotificationCard";

interface NotificationStats {
    allowed: number;
    deferred: number;
}

interface NotificationContextType {
    notifications: Notification[];
    stats: NotificationStats;
    addNotification: (notification: Notification) => void;
    clearNotifications: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [stats, setStats] = useState<NotificationStats>({
        allowed: 0,
        deferred: 0,
    });

    const addNotification = (notification: Notification) => {
        setNotifications((prev) => [notification, ...prev]);
        setStats((prev) => ({
            allowed: prev.allowed + (notification.status === "allowed" ? 1 : 0),
            deferred: prev.deferred + (notification.status === "deferred" ? 1 : 0),
        }));
    };

    const clearNotifications = () => {
        setNotifications([]);
        setStats({ allowed: 0, deferred: 0 });
    };

    return (
        <NotificationContext.Provider
            value={{
                notifications,
                stats,
                addNotification,
                clearNotifications,
            }}
        >
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotificationContext = () => {
    const context = useContext(NotificationContext);
    if (context === undefined) {
        throw new Error("useNotificationContext must be used within a NotificationProvider");
    }
    return context;
};
