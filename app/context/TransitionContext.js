"use client";
import { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const TransitionContext = createContext({});

export function TransitionProvider({ children }) {
    const router = useRouter();
    const [isTransitioning, setIsTransitioning] = useState(false);

    const navigate = async (url) => {
        setIsTransitioning(true);
        // Wait for the 'enter' animation to cover the screen
        await new Promise((resolve) => setTimeout(resolve, 800));

        router.push(url);

        // Wait for route change/simulated load
        await new Promise((resolve) => setTimeout(resolve, 500));
        setIsTransitioning(false);
    };

    return (
        <TransitionContext.Provider value={{ navigate, isTransitioning }}>
            {children}

            {/* Global Page Transition Overlay */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
                        animate={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" }}
                        exit={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 bg-black z-[200] flex items-center justify-center pointer-events-none"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-white text-4xl md:text-6xl font-normal tracking-wider"
                            style={{ fontFamily: "'Jersey 10', sans-serif" }}
                        >
                            NJTechStudio
                        </motion.span>
                    </motion.div>
                )}
            </AnimatePresence>
        </TransitionContext.Provider>
    );
}

export const useTransition = () => useContext(TransitionContext);
