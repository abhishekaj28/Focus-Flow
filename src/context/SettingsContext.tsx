import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface Settings {
    notificationRules: boolean;
    autoDarkMode: boolean;
    focusReminders: boolean;
    strictMode: boolean;
    aiEnabled: boolean;
}

interface SettingsContextType {
    settings: Settings;
    updateSetting: (key: keyof Settings, value: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const DEFAULT_SETTINGS: Settings = {
    notificationRules: true,
    autoDarkMode: true,
    focusReminders: false,
    strictMode: false,
    aiEnabled: false,
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
    const [settings, setSettings] = useState<Settings>(() => {
        const saved = localStorage.getItem("focusflow_settings");
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    });

    useEffect(() => {
        localStorage.setItem("focusflow_settings", JSON.stringify(settings));
    }, [settings]);

    const updateSetting = (key: keyof Settings, value: boolean) => {
        setSettings((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    return (
        <SettingsContext.Provider value={{ settings, updateSetting }}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
};
