"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MovingTextBg from "./MovingTextBg";

const AUTOPLAY_DELAY = 3000;

// Container has no visual motion of its own — it only drives mount/unmount
// timing for AnimatePresence. Text and image animate independently below.
const containerVariants = {
  enter: {},
  center: {},
  exit: {},
};

const textVariants = {
  enter: (direction) => ({ opacity: 0, y: 24, x: direction > 0 ? 40 : -40 }),
  center: { opacity: 1, y: 0, x: 0, transition: { duration: 0.45, ease: "easeOut" } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.25, ease: "easeIn" } },
};

const imageVariants = {
  enter: (direction) => ({ opacity: 0, scale: 0.9, x: direction > 0 ? 60 : -60 }),
  center: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 },
  },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.25, ease: "easeIn" } },
};

export default function HorizontalScrollSection() {
  const [sections, setSections] = useState([
    {
      id: 1,
      label: "CONTENT & YOUTUBE CREATION",
      title: "CREATIVE TECH CONTENT THAT TEACHES & ENTERTAINS",
      description:
        "I create fun, engaging and value-packed content around programming, startups, software development and real-world tech journeys. With a joyful delivery style, I turn complex tech topics into simple, enjoyable and relatable experiences through YouTube, reels and storytelling.",
      image: "/content-creation.png",
      layout: "left",
    },
    {
      id: 2,
      label: "WEB + AI DEVELOPMENT",
      title: "MODERN WEB APPS SUPERCHARGED WITH AI",
      description:
        "I build fast, scalable and intelligent applications using Next.js, React, FastAPI, Django and GenAI tools. From backend APIs to smart automation, vector search, AI agents and real-time dashboards — your digital product becomes faster, smarter and future-ready.",
      image: "/web-development.jpg",
      layout: "right",
    },
    {
      id: 3,
      label: "ERP & BUSINESS AUTOMATION",
      title: "CUSTOM ERP FOR SMALL & MEDIUM BUSINESSES",
      description:
        "Automate your business with tailored ERP systems built using Frappe/ERPNext + React. From inventory and HR to approvals and finance dashboards — I deliver fast, clean and efficient workflows that boost productivity and reduce manual work.",
      image: "/erp-system.jpg",
      layout: "left",
    },
    {
      id: 4,
      label: "IOT & SMART AUTOMATION",
      title: "CONNECT DEVICES WITH REAL-WORLD SOFTWARE",
      description:
        "I design IoT-enabled systems that combine sensors, cloud services and smart automation. From real-time monitoring to device dashboards and industry automation — I bridge hardware, software and AI to bring ideas to life.",
      image: "/iot-automation.jpg",
      layout: "right",
    },
    {
      id: 5,
      label: "SCHOOL & COLLEGE PROJECTS",
      title: "HIGH-SCORING MODERN STUDENT PROJECTS",
      description:
        "Helping students build impactful, presentation-ready academic projects using Web Development, Python, AI, ML, automation and IoT. Clean code, proper documentation and impressive UI — perfect for final-year submissions and demos.",
      image: "/student-projects.jpg",
      layout: "left",
    }
  ]);

  useEffect(() => {
    fetch('/api/admin/data?type=solutions')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSections(data);
        }
      })
      .catch(err => console.error('Error fetching solutions:', err));
  }, []);

  const [[current, direction], setSlide] = useState([0, 0]);
  const [isPaused, setIsPaused] = useState(false);

  const paginate = (newDirection) => {
    setSlide(([prev]) => {
      const next = (prev + newDirection + sections.length) % sections.length;
      return [next, newDirection];
    });
  };

  const goTo = (index) => {
    setSlide(([prev]) => [index, index > prev ? 1 : -1]);
  };

  const handleDragEnd = (_, info) => {
    const swipeThreshold = 60;
    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  useEffect(() => {
    if (isPaused || sections.length <= 1) return;
    const timer = setInterval(() => paginate(1), AUTOPLAY_DELAY);
    return () => clearInterval(timer);
  }, [current, isPaused, sections.length]);

  return (
    <section className="relative bg-black py-12 sm:py-16 md:py-20">
      <div
        className="relative overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={sections[current].id}
            variants={containerVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragStart={() => setIsPaused(true)}
            onDragEnd={(e, info) => {
              handleDragEnd(e, info);
              setIsPaused(false);
            }}
          >
            <SectionCard section={sections[current]} direction={direction} />
          </motion.div>
        </AnimatePresence>

        {/* Prev / Next arrows */}
        <button
          type="button"
          onClick={() => paginate(-1)}
          aria-label="Previous service"
          className="hidden sm:flex absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          type="button"
          onClick={() => paginate(1)}
          aria-label="Next service"
          className="hidden sm:flex absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 bg-black/40 text-white hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Dots navigation */}
      <div className="flex items-center justify-center gap-2 mt-6 sm:mt-8">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to ${section.label}`}
            className={`h-2 rounded-full transition-all ${
              index === current ? "w-8 bg-white" : "w-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}


const SectionCard = ({ section, direction }) => {
  const isLeftLayout = section.layout === "left";

  return (
    <div className="w-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
      <div className="w-full max-w-7xl">
        <MovingTextBg text="WHAT I CAN DO" textColor="text-gray-100">
          <div className={`flex flex-col ${isLeftLayout ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-6 sm:gap-8 md:gap-10 lg:gap-16 items-center`}>
            {/* Text Content — animates independently (slide + fade) */}
            <motion.div
              custom={direction}
              variants={textVariants}
              className="w-full lg:w-1/2 space-y-4 sm:space-y-6 text-center lg:text-left"
            >
              <div className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 border border-white/30 rounded-full">
                <span className="text-white text-xs sm:text-sm font-medium tracking-wider">
                  {section.label}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight px-2 sm:px-0">
                {section.title}
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed px-2 sm:px-0">
                {section.description}
              </p>
            </motion.div>

            {/* Image Content — animates independently (scale + fade, slight delay) */}
            <motion.div
              custom={direction}
              variants={imageVariants}
              className="w-full lg:w-1/2"
            >
              <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={section.image}
                  alt={section.title}
                  className="w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[500px] xl:h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-liner-to-t from-black/20 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </MovingTextBg>
      </div>
    </div>
  );
};