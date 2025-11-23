"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-linear-to-b from-white to-gray-50 px-4 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.05 }}
          className="grid grid-cols-12 gap-4"
        >
          <StudioHeader />
          <StudioIntro />
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
      initial: { scale: 0.5, y: 50, opacity: 0 },
      animate: { scale: 1, y: 0, opacity: 1 },
    }}
    transition={{
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    }}
    className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-lg ${className}`}
    {...rest}
  >
    {children}
  </motion.div>
);

/* ---------------------- Studio Header ---------------------- */

const StudioHeader = () => (
  <Block className="col-span-12 md:col-span-6 flex flex-col justify-center items-center">
    <div className="text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
        <span
          className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"
          style={{ fontFamily: "'Jersey 10', 'Arial Black', sans-serif" }}
        >
          NJ Tech Studio
        </span>
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mt-2">
        Building smart digital solutions with clean code, creativity, and a joyful spirit.
      </p>
    </div>
  </Block>
);

/* ---------------------- Studio Intro ---------------------- */

const StudioIntro = () => (
  <Block className="col-span-12 md:col-span-6 flex items-center">
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900">
      <span className="text-gray-500">
      We design and develop smart, scalable digital solutions for individuals, startups and growing businesses.  
      From modern web platforms to automation systems and AI-enhanced tools —  
      our work focuses on clarity, performance and smooth user experience.
      Our motto: <span className="text-purple-700 font-bold">“Code with clarity, build with purpose, deliver with joy.”</span>
      </span>
    </p>
  </Block>
);


/* ---------------------- Founder Card ---------------------- */

const FounderCard = () => (
  <Block className="col-span-12">
    <div className="w-full max-w-6xl bg-[#1E1E22] text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-14 shadow-xl flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-center min-h-[280px] sm:min-h-[320px]">

      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <img
          src="/photo.png"
          alt="Jay Patel"
          className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl object-cover border-2 border-gray-700 shadow-lg"
        />

        {/* Name Tag (Better fit + centered + single line) */}
        <span className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-white text-black px-4 py-1 text-[11px] sm:text-sm font-semibold rounded-xl shadow-md whitespace-nowrap">
          Jay Patel
        </span>
      </div>

      {/* Text */}
      <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
      <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed"> 
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
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900">
      <span className="text-purple-700 font-bold">The Mission</span>
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
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900">
      <span className="text-purple-700 font-bold">The Vision</span>
      <br />
      <span className="text-gray-500">
        To grow a joyful, impactful tech studio that builds modern solutions,
        inspires developers, and brings creativity into engineering.  
        A place where code, content and collaboration meet — and ideas from small towns reach the world.
      </span>
    </p>
  </Block>
);
