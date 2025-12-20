import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface User {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock User Data
const MOCK_USER: User = {
    id: "google-12345",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check local storage for existing session
        const storedUser = localStorage.getItem("focusflow_user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user data", e);
                localStorage.removeItem("focusflow_user");
            }
        }
        setIsLoading(false);
    }, []);

    const login = async () => {
        return new Promise<void>((resolve) => {
            // Simulate network delay for "Google" interaction
            setTimeout(() => {
                setUser(MOCK_USER);
                localStorage.setItem("focusflow_user", JSON.stringify(MOCK_USER));
                toast.success("Successfully signed in with Google");
                resolve();
            }, 1200); // 1.2s delay for realism
        });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("focusflow_user");
        toast.info("Signed out successfully");
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
