"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import MovingTextBg from "./MovingTextBg";

export default function AboutSection() {
  return (
    <div className="min-h-screen bg-linear-to-b from-white to-gray-50">
      <MovingTextBg text="ABOUT" textColor="text-gray-400">
        <section className="px-4 pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 bg-transparent relative z-10">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.05 }}
              className="grid grid-cols-12 gap-3"
            >
              <StudioHeader />
              <StudioIntro />
              <FounderCard />
              <MissionBlock />
              <VisionBlock />
            </motion.div>
          </div>
        </section>
      </MovingTextBg>
    </div>
  );
}

/* ---------------------- Block Wrapper ---------------------- */

const Block = ({ className, children, ...rest }) => (
  <motion.div
    variants={{
      initial: { scale: 0.5, y: 50, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 },
    }}
    transition={{
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    }}
    className={`rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 shadow-lg ${className}`}
    {...rest}
  >
    {children}
  </motion.div>
);

/* ---------------------- Studio Header ---------------------- */

const StudioHeader = () => (
  <Block className="col-span-12 md:col-span-6 flex flex-col justify-center items-center">
    <div className="text-center md:text-left">
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900">
        <span
          className="bg-linear-to-r from-indigo-600 to-indigo-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Jersey 10', 'Arial Black', sans-serif" }}
        >
          NJ Tech Studio
        </span>
      </h1>

      <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mt-2">
        Building smart digital solutions with clean code, creativity, and a joyful spirit.
      </p>
    </div>
  </Block>
);

/* ---------------------- Studio Intro ---------------------- */

const StudioIntro = () => (
  <Block className="col-span-12 md:col-span-6 flex items-center">
    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-900">
      <span className="text-gray-500">
        We design and develop smart, scalable digital solutions for individuals, startups and growing businesses.
        From modern web platforms to automation systems and AI-enhanced tools —
        our work focuses on clarity, performance and smooth user experience.
        Our motto: <span className="text-indigo-700 font-bold">"Code with clarity, build with purpose, deliver with joy."</span>
      </span>
    </p>
  </Block>
);


/* ---------------------- Founder Card ---------------------- */

const FounderCard = () => (
  <Block className="col-span-12">
    <div className="w-full max-w-6xl bg-[#1E1E22] text-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-xl flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-center min-h-[200px] sm:min-h-[220px]">

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Image
          src="/photo.png"
          alt="Jay Patel"
          width={192}
          height={192}
          className="w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-2xl object-cover border-2 border-gray-700 shadow-lg"
          priority
        />

        {/* Name Tag (Better fit + centered + single line) */}
        <span className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 text-[11px] sm:text-sm font-semibold rounded-xl shadow-md whitespace-nowrap">
          Jay Patel
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 space-y-2 sm:space-y-3 text-center md:text-left">
        <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">
          Hi, I'm Jay Patel — a Python-first Software Developer with 2 years of experience building fast, secure and scalable systems.
          I love combining technology and creativity to craft solutions that feel modern, smooth and impactful. Whether it's backend APIs,
          full-stack apps, automation or AI/ML — I build with clarity, quality and purpose.
        </p>

        <p className="text-sm sm:text-base font-semibold pt-2">
          Founder — <span className="text-gray-400 font-normal">NJ Tech Studio</span>
        </p>
      </div>
    </div>
  </Block>
);


/* ---------------------- Mission ---------------------- */

const MissionBlock = () => (
  <Block className="col-span-12 md:col-span-6">
    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-900">
      <span className="text-indigo-700 font-bold">The Mission</span>
      <br />
      <span className="text-gray-500">
        To build clean, scalable tech that solves real problems.
        Helping businesses automate workflows, develop fast applications,
        integrate AI/ML where it matters, and create smooth digital experiences.
      </span>
    </p>
  </Block>
);

/* ---------------------- Vision ---------------------- */

const VisionBlock = () => (
  <Block className="col-span-12 md:col-span-6">
    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-gray-900">
      <span className="text-indigo-700 font-bold">The Vision</span>
      <br />
      <span className="text-gray-500">
        To grow a joyful, impactful tech studio that builds modern solutions,
        inspires developers, and brings creativity into engineering.
        A place where code, content and collaboration meet — and ideas from small towns reach the world.
      </span>
    </p>
  </Block>
);
