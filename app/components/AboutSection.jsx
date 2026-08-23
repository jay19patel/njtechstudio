"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 bg-transparent relative z-10">
      <div className="max-w-6xl mx-auto space-y-8">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.08 }}
          className="grid grid-cols-12 gap-4 sm:gap-6"
        >
          <StudioHeader />
          <StudioIntro />
          <StatsRow />
          <FounderCard />
          <MissionBlock />
          <VisionBlock />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------- Block Wrapper ---------------------- */

const Block = ({ className, children, ...rest }) => (
  <motion.div
    variants={{
      initial: { scale: 0.96, y: 25, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 },
    }}
    transition={{
      type: "spring",
      mass: 1.5,
      stiffness: 300,
      damping: 25,
    }}
    className={`border-2 border-zinc-200 bg-white p-6 sm:p-8 shadow-md ${className}`}
    {...rest}
  >
    {children}
  </motion.div>
);

/* ---------------------- Studio Header ---------------------- */

const StudioHeader = () => (
  <Block className="col-span-12 md:col-span-6 flex flex-col justify-center">
    <div className="space-y-3">
      <div className="inline-block px-3 py-1 bg-zinc-950 border border-zinc-800 text-white text-xs font-bold uppercase tracking-wider font-mono">
        // NJ TECH STUDIO
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-gray-900">
        Building Smart Digital Solutions
      </h2>
      <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-medium">
        With clean code, creativity, and a joyful spirit.
      </p>
    </div>
  </Block>
);

/* ---------------------- Studio Intro ---------------------- */

const StudioIntro = () => (
  <Block className="col-span-12 md:col-span-6 flex items-center">
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900 font-medium">
      We design and develop smart, scalable digital solutions for individuals, startups and growing businesses.
      From modern web platforms to automation systems and AI-enhanced tools —
      our work focuses on clarity, performance and smooth user experience.
      <br />
      <span className="block mt-4 text-indigo-900 font-black text-lg border-l-4 border-indigo-900 pl-3">
        &quot;Code with clarity, build with purpose, deliver with joy.&quot;
      </span>
    </p>
  </Block>
);

/* ---------------------- Stats Row ---------------------- */

const StatsRow = () => (
  <Block className="col-span-12 !p-0 border-0 bg-transparent shadow-none">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="p-6 bg-zinc-950 border-2 border-indigo-900 text-white text-center shadow-md">
        <p className="text-3xl sm:text-4xl font-black text-white">2+ Years</p>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">Experience</p>
      </div>
      <div className="p-6 bg-zinc-950 border-2 border-indigo-900 text-white text-center shadow-md">
        <p className="text-3xl sm:text-4xl font-black text-white">15+ Apps</p>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">Built & Scaled</p>
      </div>
      <div className="p-6 bg-zinc-950 border-2 border-indigo-900 text-white text-center shadow-md">
        <p className="text-3xl sm:text-4xl font-black text-white">100%</p>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">Clean Code</p>
      </div>
      <div className="p-6 bg-zinc-950 border-2 border-indigo-900 text-white text-center shadow-md">
        <p className="text-3xl sm:text-4xl font-black text-white">Full-Stack</p>
        <p className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-400 mt-1">Systems & APIs</p>
      </div>
    </div>
  </Block>
);

/* ---------------------- Founder Card ---------------------- */

const FounderCard = () => (
  <Block className="col-span-12 !p-0 border-0 bg-transparent shadow-none">
    <div className="w-full bg-zinc-950 border-2 border-indigo-900 text-white p-6 sm:p-8 md:p-10 shadow-xl flex flex-col md:flex-row gap-6 md:gap-10 items-center">

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <Image
          src="/photo.png"
          alt="Jay Patel"
          width={192}
          height={192}
          className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover border-2 border-indigo-900 shadow-xl"
          priority
        />

        {/* Name Tag */}
        <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 text-xs sm:text-sm font-black border border-zinc-950 shadow-md whitespace-nowrap uppercase tracking-wider">
          Jay Patel
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 space-y-4 text-center md:text-left pt-2 md:pt-0">
        <div className="inline-block px-3 py-1 bg-indigo-900 text-white text-xs font-bold uppercase tracking-widest">
          Founder & Lead Engineer
        </div>

        <p className="text-gray-200 text-base sm:text-lg leading-relaxed font-medium">
          Hi, I&apos;m Jay Patel — a Python-first Software Developer with 2 years of experience building fast, secure and scalable systems.
          I love combining technology and creativity to craft solutions that feel modern, smooth and impactful. Whether it&apos;s backend APIs,
          full-stack apps, automation or AI/ML — I build with clarity, quality and purpose.
        </p>
      </div>
    </div>
  </Block>
);

/* ---------------------- Mission ---------------------- */

const MissionBlock = () => (
  <Block className="col-span-12 md:col-span-6 space-y-3">
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 text-white text-xs font-mono font-bold uppercase tracking-wider">
      // THE MISSION
    </div>
    <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-medium">
      To build clean, scalable tech that solves real problems.
      Helping businesses automate workflows, develop fast applications,
      integrate AI/ML where it matters, and create smooth digital experiences.
    </p>
  </Block>
);

/* ---------------------- Vision ---------------------- */

const VisionBlock = () => (
  <Block className="col-span-12 md:col-span-6 space-y-3">
    <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-950 border border-zinc-800 text-white text-xs font-mono font-bold uppercase tracking-wider">
      // THE VISION
    </div>
    <p className="text-base sm:text-lg leading-relaxed text-gray-700 font-medium">
      To grow a joyful, impactful tech studio that builds modern solutions,
      inspires developers, and brings creativity into engineering.
      A place where code, content and collaboration meet — and ideas from small towns reach the world.
    </p>
  </Block>
);
