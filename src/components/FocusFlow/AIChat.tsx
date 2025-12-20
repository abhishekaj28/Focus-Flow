import { useState, useRef, useEffect } from "react";
import { Send, User, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface Message {
    id: string;
    role: "user" | "ai";
    text: string;
    timestamp: Date;
}

const MOCK_RESPONSES = [
    "Based on your recent session, I recommend a 5-minute deep breathing exercise before starting the next block.",
    "Your focus score is trending upward! Try to maintain this momentum for another 25 minutes.",
    "I noticed you get distracted around 2 PM. Would you like me to enable strict mode then?",
    "Great work! Deep work for 45 minutes is highly effective. Remember to hydrate.",
    "To improve focus, try clearing your desk and enabling 'Do Not Disturb' on your phone.",
];

export function AIChat() {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "ai",
            text: "Hello! I'm your FocusFlow AI assistant. How can I help you optimize your productivity today?",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const newUserMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            text: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, newUserMessage]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI delay
        setTimeout(() => {
            const randomResponse = MOCK_RESPONSES[Math.floor(Math.random() * MOCK_RESPONSES.length)];
            const newAiMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                text: randomResponse,
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, newAiMessage]);
            setIsTyping(false);
        }, 1500 + Math.random() * 1000); // 1.5s - 2.5s delay
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        // Container: Fixed height, contained, matching card style
        <div className="flex flex-col h-[460px] w-full relative bg-[#F8FAFC] dark:bg-card border border-border/60 rounded-xl shadow-sm overflow-hidden">

            {/* Messages Area */}
            <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar scroll-smooth bg-[#F8FAFC] dark:bg-card"
            >
                <AnimatePresence initial={false}>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={cn(
                                "flex w-full items-start gap-3",
                                message.role === "user" ? "flex-row-reverse" : "flex-row"
                            )}
                        >
                            {/* Avatar */}
                            <div className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm",
                                message.role === "ai"
                                    ? "bg-white text-indigo-500 border border-indigo-100"
                                    : "bg-[#4F8CFF] text-white"
                            )}>
                                {message.role === "ai" ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
                            </div>

                            {/* Bubble */}
                            <div className={cn(
                                "max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm",
                                message.role === "user"
                                    ? "bg-[#4F8CFF] text-white rounded-tr-none"
                                    : "bg-[#EEF2FF] text-[#1E293B] border border-indigo-100/50 rounded-tl-none dark:bg-muted dark:text-foreground"
                            )}>
                                {message.text}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex w-full items-start gap-3"
                    >
                        <div className="w-8 h-8 rounded-full bg-white text-indigo-500 border border-indigo-100 flex items-center justify-center shrink-0 shadow-sm">
                            <Sparkles className="w-4 h-4" />
                        </div>
                        <div className="bg-[#EEF2FF] border border-indigo-100/50 rounded-2xl rounded-tl-none px-4 py-4 shadow-sm flex items-center gap-1.5 h-[44px]">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" />
                        </div>
                    </motion.div>
                )}
            </div>

            {/* Input Area: White background, sticky bottom */}
            <div className="p-4 bg-white dark:bg-card border-t border-[#E5E7EB] dark:border-border/50 z-10">
                <div className="flex gap-2 items-center bg-white dark:bg-muted border border-[#E5E7EB] dark:border-border rounded-xl px-4 py-2 focus-within:ring-2 focus-within:ring-[#4F8CFF]/20 focus-within:border-[#4F8CFF] transition-all shadow-sm">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask FocusFlow anything..."
                        className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground/60 h-8 text-foreground"
                        disabled={isTyping}
                    />
                    <button
                        onClick={handleSend}
                        disabled={!inputValue.trim() || isTyping}
                        className="p-1.5 rounded-lg bg-[#4F8CFF] text-white hover:bg-[#3b76e0] disabled:opacity-50 disabled:hover:bg-[#4F8CFF] transition-colors shadow-sm"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </div>

                {/* Suggestion Chips */}
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 no-scrollbar">
                    {["How was my last session?", "Optimize my breaks", "Why am I distracted?"].map((suggestion, i) => (
                        <button
                            key={i}
                            onClick={() => setInputValue(suggestion)}
                            className="text-xs px-3 py-1.5 rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#475569] hover:text-[#1E293B] border border-slate-200 transition-colors whitespace-nowrap dark:bg-muted dark:hover:bg-muted/80 dark:text-muted-foreground"
                        >
                            {suggestion}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
