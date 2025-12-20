import { motion } from "framer-motion";
import { Sparkles, Brain, Zap } from "lucide-react";
import { AIChat } from "./AIChat";

export function AIView() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col h-full"
        >
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-indigo-500" />
                    AI Assistant
                </h1>
                <p className="text-muted-foreground">
                    Your personal focus optimization engine.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="glass-card p-6 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                        <Brain className="w-5 h-5 text-indigo-500" />
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground mb-1">Session Analysis</h3>
                        <p className="text-sm text-muted-foreground">
                            AI analyzes your focus patterns to suggest optimal break times and session durations.
                        </p>
                    </div>
                </div>

                <div className="glass-card p-6 flex flex-col gap-4">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                        <Zap className="w-5 h-5 text-purple-500" />
                    </div>
                    <div>
                        <h3 className="font-medium text-foreground mb-1">Smart Prioritization</h3>
                        <p className="text-sm text-muted-foreground">
                            Notifications are automatically filtered and queued based on context and urgency.
                        </p>
                    </div>
                </div>
            </div>

            <div className="mt-8">
                <AIChat />
            </div>
        </motion.div>
    );
}
