"use client";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

const Preloader = () => {
    const [percentage, setPercentage] = useState(0);
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const percentRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // 1. Percentage counter logic
        // We can use a GSAP tween to animate the number for smoother counting visually if desired,
        // but the interval approach gives that "loading" feel better sometimes.
        // Let's stick to the interval for the logic, but ensuring it matches the feel.

        let currentPercentage = 0;
        const interval = setInterval(() => {
            currentPercentage += Math.floor(Math.random() * 3) + 1; // Random increment for realism
            if (currentPercentage > 100) currentPercentage = 100;

            setPercentage(currentPercentage);

            if (currentPercentage === 100) {
                clearInterval(interval);

                // 2. Exit Animation
                const exitTl = gsap.timeline();

                exitTl
                    .to(percentRef.current, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        ease: "power2.out",
                        delay: 0.2

                    })
                    .to(containerRef.current, {
                        y: "-100%",
                        duration: 1.2,
                        ease: "power4.inOut",
                    }, "-=0.2") // Overlap slightly
                    .set(containerRef.current, { display: "none" }); // Hide after animation
            }
        }, 40); // Slightly slower for more impact

        return () => clearInterval(interval);
    }, []);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-white h-screen w-screen overflow-hidden"
        >
            <div ref={percentRef} className="flex flex-col items-center justify-center relative">
                {/* Percentage Text */}
                <div className="text-[12vw] leading-none font-bold font-[Jersey_10] tracking-tighter">
                    {percentage}%
                </div>
                <p className="mt-4 tracking-[0.5em] uppercase text-sm font-[Stack_Sans_Notch] opacity-70">
                    NJTechStudio.in
                </p>
            </div>
        </div>
    );
};

export default Preloader;
