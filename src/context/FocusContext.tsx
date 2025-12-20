import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface FocusContextType {
    isFocusMode: boolean;
    sessionStartTime: number | null;
    elapsedTime: number;
    startSession: () => void;
    endSession: () => void;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider = ({ children }: { children: ReactNode }) => {
    const [isFocusMode, setIsFocusMode] = useState<boolean>(() => {
        return localStorage.getItem("focusflow_isFocusMode") === "true";
    });

    const [sessionStartTime, setSessionStartTime] = useState<number | null>(() => {
        const saved = localStorage.getItem("focusflow_sessionStartTime");
        return saved ? parseInt(saved, 10) : null;
    });

    const [elapsedTime, setElapsedTime] = useState<number>(0);

    // Timer logic to keep elapsed time in sync with real time
    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isFocusMode && sessionStartTime) {
            // Update immediately to avoid 1s delay on load
            setElapsedTime(Math.floor((Date.now() - sessionStartTime) / 1000));

            interval = setInterval(() => {
                const now = Date.now();
                const seconds = Math.floor((now - sessionStartTime) / 1000);
                setElapsedTime(seconds);
            }, 1000) as unknown as NodeJS.Timeout;
        } else {
            setElapsedTime(0);
        }

        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isFocusMode, sessionStartTime]);

    const startSession = () => {
        const now = Date.now();
        setIsFocusMode(true);
        setSessionStartTime(now);
        setElapsedTime(0);
        localStorage.setItem("focusflow_isFocusMode", "true");
        localStorage.setItem("focusflow_sessionStartTime", now.toString());
    };

    const endSession = () => {
        setIsFocusMode(false);
        setSessionStartTime(null);
        setElapsedTime(0);
        localStorage.removeItem("focusflow_isFocusMode");
        localStorage.removeItem("focusflow_sessionStartTime");
    };

    return (
        <FocusContext.Provider
            value={{
                isFocusMode,
                sessionStartTime,
                elapsedTime,
                startSession,
                endSession,
            }}
        >
            {children}
        </FocusContext.Provider>
    );
};

export const useFocusContext = () => {
    const context = useContext(FocusContext);
    if (context === undefined) {
        throw new Error("useFocusContext must be used within a FocusProvider");
    }
    return context;
};
