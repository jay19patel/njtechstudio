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
          transition={{
            staggerChildren: 0.05,
          }}
          className="grid grid-cols-12 gap-4"
        >
          <HeaderBlock />
          <FounderBlock />
          <AboutNJTechStudioBlock/>
          <AboutBlock />
          <MissionBlock />
          <VisionBlock />
        </motion.div>
      </div>
    </section>
  );
}

const Block = ({ className, children, ...rest }) => {
  return (
    <motion.div
      variants={{
        initial: {
          scale: 0.5,
          y: 50,
          opacity: 0,
        },
        animate: {
          scale: 1,
          y: 0,
          opacity: 1,
        },
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
};

const HeaderBlock = () => (
  <Block className="col-span-12 md:col-span-6 flex flex-col justify-center items-center">
    <div className="text-center md:text-left">
      <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight text-gray-900">
        <span className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontFamily: "'Jersey 10', 'Arial Black', sans-serif" }}>
          NJ Tech Studio
        </span>
      </h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mt-2">
        Transforming ideas into powerful digital solutions that drive business growth and innovation.
      </p>
    </div>
  </Block>
);

const FounderBlock = () => (
  <Block className="col-span-12 md:col-span-6 flex items-center">
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900">
      Hi, I'm <span className="text-purple-700 font-bold">Jay Patel</span>.{" "}
      <span className="text-gray-500">
        Full-Stack Engineer with 2 years shipping Python & JavaScript magic ✨ — from AI/ML systems to GenAI integrations,
        ERP automation (Frappe/ERPNext), and cloud-deployed apps on GCP. I code, create content, and now building my own startup.
        Let's build something that actually works!
      </span>
    </p>
  </Block>
);

const AboutBlock = () => (
  <Block className="col-span-12">
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900">
      From code to camera — I do both.{" "}
      <span className="text-gray-500">
        By day, I'm architecting AI-powered business apps (think: talent acquisition automation, vector search with OpenSearch,
        trading platforms with sub-250ms execution). By night? Creating content, teaching tech, and documenting the startup journey.
        Whether it's Django, React, FastAPI, or Frappe — if it ships fast and scales hard, I'm in!
      </span>
    </p>
  </Block>
);


const AboutNJTechStudioBlock = () => (
  <Block className="col-span-12">
      <div className="w-full max-w-6xl bg-[#1E1E22] text-white rounded-2xl sm:rounded-3xl
                      p-6 sm:p-8 md:p-10 lg:p-14 shadow-xl flex flex-col md:flex-row gap-6 sm:gap-8 md:gap-12 items-center min-h-[280px] sm:min-h-[320px]">

        {/* Avatar + Badge */}
        <div className="relative flex-shrink-0">
          <img
            src="/photo.png"
            alt="User Avatar"
            className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl object-cover border-2 border-gray-700 shadow-lg"
          />

          <span className="absolute -bottom-3 sm:-bottom-4 left-1/2 -translate-x-1/2 bg-white
                           text-black px-3 sm:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-xl shadow-md">
            videoly
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 space-y-3 sm:space-y-4 text-center md:text-left">
          <p className="text-gray-200 text-base sm:text-lg md:text-xl leading-relaxed">
            "Jay transformed our entire workflow! He built us a custom ERP system with Frappe that automated
            approvals, bookings, and coordination across teams. Now everything runs on autopilot with email loops
            and real-time tracking. Our management speed increased by 30%!"
          </p>

          <p className="text-sm sm:text-base font-semibold pt-2">
            Happy Client{" "}
            <span className="text-gray-400 font-normal">Operations Manager</span>
          </p>
        </div>
      </div>
  </Block>
);


const MissionBlock = () => (
  <Block className="col-span-12 md:col-span-6">
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900">
      <span className="text-purple-700 font-bold">The Mission</span>
      <br />
      <span className="text-gray-500">
        Build smart, scalable tech solutions that actually solve problems (not just look pretty in demos).
        Automate the boring stuff, ship fast, iterate faster, and help businesses level up with AI/ML magic.
        Oh, and teach others along the way! 
      </span>
    </p>
  </Block>
);

const VisionBlock = () => (
  <Block className="col-span-12 md:col-span-6">
    <p className="text-base sm:text-lg md:text-xl leading-relaxed text-gray-900">
      <span className="text-purple-700 font-bold">The Vision</span>
      <br />
      <span className="text-gray-500">
        Build a thriving tech startup that ships products people love, creates content that inspires developers,
        and proves that you can code, create, and scale — all at the same time. From Valsad to the world!
      </span>
    </p>
  </Block>
);

