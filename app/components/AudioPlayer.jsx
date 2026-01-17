"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

const AudioPlayer = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = async () => {
        if (!audioRef.current) return;

        try {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                await audioRef.current.play();
                setIsPlaying(true);
            }
        } catch (err) {
            console.error("Audio playback failed:", err);
            // Optional: reset state if play fails (e.g. strict browser autoplay policies)
            setIsPlaying(false);
        }
    };

    // Bars for the visualizer
    const bars = [1, 2, 3, 4, 5];

    return (
        <motion.div
            className="cursor-pointer flex flex-col items-center gap-1 group"
            onClick={togglePlay}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
            <audio
                ref={audioRef}
                src="/speed-returns.mp3"
                loop
                preload="auto"
            />

            {/* Waveform Icon */}
            <div className="flex items-center justify-center h-4 gap-[2px]">
                {bars.map((bar) => (
                    <motion.div
                        key={bar}
                        className={`w-[2px] rounded-full ${isPlaying ? "bg-purple-500" : "bg-white/50"}`}
                        animate={{
                            height: isPlaying ? [4, 12, 6, 16, 4] : 4,
                        }}
                        transition={{
                            duration: 0.5,
                            repeat: Infinity,
                            repeatType: "reverse",
                            delay: bar * 0.1,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>

            {/* Status Text */}
            <span className={`text-[10px] font-bold uppercase tracking-widest ${isPlaying ? "text-purple-400" : "text-white/50"}`}>
                Audio {isPlaying ? "ON" : "OFF"}
            </span>
        </motion.div>
    );
};

export default AudioPlayer;
