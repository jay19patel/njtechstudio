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
      setIsPlaying(false);
    }
  };

  const bars = [1, 2, 3, 4, 5];

  return (
    <motion.button
      type="button"
      onClick={togglePlay}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-full text-indigo-400 font-mono text-[11px] font-bold uppercase tracking-wider cursor-pointer shadow-sm transition-all"
      aria-label={isPlaying ? "Mute audio" : "Play audio"}
    >
      <audio ref={audioRef} src="/speed-returns.mp3" loop preload="auto" />

      {/* Waveform Icon */}
      <div className="flex items-center justify-center h-3 gap-[2px]">
        {bars.map((bar) => (
          <motion.div
            key={bar}
            className={`w-[2px] rounded-full ${isPlaying ? "bg-indigo-400" : "bg-zinc-600"}`}
            animate={{
              height: isPlaying ? [3, 12, 5, 14, 3] : 4,
            }}
            transition={{
              duration: 0.45,
              repeat: Infinity,
              repeatType: "reverse",
              delay: bar * 0.08,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <span className="hidden sm:inline">AUDIO {isPlaying ? "ON" : "OFF"}</span>
    </motion.button>
  );
};

export default AudioPlayer;
