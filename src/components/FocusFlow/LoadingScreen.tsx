import { motion } from "framer-motion";
import logo from "../../assets/focusflow.png";

export function LoadingScreen() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background overflow-hidden">

            {/* LOGO: Grows smoothly up to 400px */}
            <motion.img
                src={logo}
                alt="FocusFlow"
                // Base size is 400px, scale animates growth
                className="w-[400px] h-[400px] object-contain drop-shadow-sm mb-3"
                initial={{
                    opacity: 0,
                    scale: 0.5, // starts around 100px visually
                    y: 12
                }}
                animate={{
                    opacity: [0, 1, 1, 0],
                    scale: [0.25, 1, 1, 1.1], // grows smoothly to full 400px
                    y: [12, 0, 0, 0]
                }}
                transition={{
                    duration: 2.6,
                    times: [0, 0.35, 0.75, 1],
                    ease: [0.16, 1, 0.3, 1]
                }}
            />

            {/* TITLE: Appears after logo settles */}
            <motion.h1
                className="text-4xl font-medium tracking-tight text-foreground"
                initial={{ opacity: 0, y: 6 }}
                animate={{
                    opacity: [0, 0, 1, 1, 0],
                    y: [6, 6, 0, 0, 0]
                }}
                transition={{
                    duration: 2.6,
                    times: [0, 0.35, 0.55, 0.75, 0.95],
                    ease: "easeOut"
                }}
            >
                FocusFlow
            </motion.h1>

        </div>
    );
}
