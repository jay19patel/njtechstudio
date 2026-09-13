"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedCounter from "./AnimatedCounter";

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
      initial: { scale: 0.95, y: 20, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 },
    }}
    transition={{
      type: "spring",
      mass: 1.2,
      stiffness: 250,
      damping: 20,
    }}
    className={`border border-zinc-800 bg-zinc-950 p-6 sm:p-8 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] hover:border-zinc-700 transition-colors ${className}`}
    {...rest}
  >
    {children}
  </motion.div>
);

/* ---------------------- Studio Header ---------------------- */

const StudioHeader = () => (
  <Block className="col-span-12 md:col-span-6 flex flex-col justify-center border border-zinc-200 bg-white hover:border-zinc-300">
    <div className="space-y-4">
      <div className="inline-block px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-500 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-sm">
        NJ Tech Studio
      </div>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight leading-tight text-zinc-900">
        Building Smart Digital Solutions
      </h2>
      <p className="text-base sm:text-lg text-zinc-500 leading-relaxed">
        With clean code, creativity, and a joyful spirit.
      </p>
    </div>
  </Block>
);

/* ---------------------- Studio Intro ---------------------- */

const StudioIntro = () => (
  <Block className="col-span-12 md:col-span-6 flex items-center">
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-zinc-300">
      We design and develop smart, scalable digital solutions for individuals, startups and growing businesses.
      From modern web platforms to automation systems and AI-enhanced tools —
      our work focuses on clarity, performance and smooth user experience.
      <br />
      <span className="block mt-6 text-indigo-400 font-medium text-lg border-l-2 border-indigo-500/50 pl-4">
        &quot;Code with clarity, build with purpose, deliver with joy.&quot;
      </span>
    </p>
  </Block>
);

/* ---------------------- Stats Row ---------------------- */

const StatsRow = () => (
  <div className="col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="p-6 bg-zinc-950 border border-zinc-800 text-center rounded-3xl hover:border-zinc-700 transition-colors">
      <p className="text-3xl sm:text-4xl font-semibold text-white">
        <AnimatedCounter value={2} suffix="+ Years" duration={1.2} />
      </p>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">Experience</p>
    </motion.div>
    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="p-6 bg-white border border-zinc-200 text-center rounded-3xl hover:border-zinc-300 transition-colors">
      <p className="text-3xl sm:text-4xl font-semibold text-zinc-900">
        <AnimatedCounter value={15} suffix="+ Apps" duration={1.5} />
      </p>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">Built & Scaled</p>
    </motion.div>
    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="p-6 bg-zinc-950 border border-zinc-800 text-center rounded-3xl hover:border-zinc-700 transition-colors">
      <p className="text-3xl sm:text-4xl font-semibold text-white">
        <AnimatedCounter value={100} suffix="%" duration={1.5} />
      </p>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">Clean Code</p>
    </motion.div>
    <motion.div variants={{ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 } }} className="p-6 bg-white border border-zinc-200 text-center rounded-3xl hover:border-zinc-300 transition-colors">
      <p className="text-3xl sm:text-4xl font-semibold text-zinc-900">Full-Stack</p>
      <p className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-500 mt-2">Systems & APIs</p>
    </motion.div>
  </div>
);

/* ---------------------- Founder Card ---------------------- */

const FounderCard = () => (
  <div className="col-span-12 w-full bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 md:p-12 shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex flex-col md:flex-row gap-8 md:gap-12 items-center hover:border-zinc-700 transition-colors">
    {/* Avatar */}
    <div className="relative flex-shrink-0">
      <Image
        src="/photo.png"
        alt="Jay Patel"
        width={192}
        height={192}
        className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover object-top border border-zinc-800 bg-black rounded-3xl shadow-xl"
        priority
      />
      {/* Name Tag */}
      <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-zinc-900 px-3 py-1 text-[10px] sm:text-xs font-bold border border-zinc-200 shadow-sm whitespace-nowrap uppercase tracking-widest rounded-full">
        Jay Patel
      </span>
    </div>

    {/* Text */}
    <div className="flex-1 space-y-5 text-center md:text-left pt-4 md:pt-0">
      <div className="inline-block px-3 py-1.5 bg-indigo-900/50 border border-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase tracking-widest rounded-full">
        Founder & Lead Engineer
      </div>

      <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
        Hi, I&apos;m Jay Patel — a Python-first Software Developer with 2 years of experience building fast, secure and scalable systems.
        I love combining technology and creativity to craft solutions that feel modern, smooth and impactful. Whether it&apos;s backend APIs,
        full-stack apps, automation or AI/ML — I build with clarity, quality and purpose.
      </p>
    </div>
  </div>
);

/* ---------------------- Mission ---------------------- */

const MissionBlock = () => (
  <Block className="col-span-12 md:col-span-6 space-y-4 border border-zinc-200 bg-white hover:border-zinc-300">
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-50 border border-zinc-200 text-zinc-500 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
      Mission
    </div>
    <p className="text-base sm:text-lg leading-relaxed text-zinc-600">
      To build clean, scalable tech that solves real problems.
      Helping businesses automate workflows, develop fast applications,
      integrate AI/ML where it matters, and create smooth digital experiences.
    </p>
  </Block>
);

/* ---------------------- Vision ---------------------- */

const VisionBlock = () => (
  <Block className="col-span-12 md:col-span-6 space-y-4 border border-zinc-800 bg-zinc-950 hover:border-zinc-700">
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-zinc-400 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-sm">
      Vision
    </div>
    <p className="text-base sm:text-lg leading-relaxed text-zinc-400">
      To grow a joyful, impactful tech studio that builds modern solutions,
      inspires developers, and brings creativity into engineering.
      A place where code, content and collaboration meet — and ideas from small towns reach the world.
    </p>
  </Block>
);
