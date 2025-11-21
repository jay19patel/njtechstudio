"use client";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-white to-gray-50 px-4 py-20">
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
    <div>
      <h1 className="text-6xl md:text-8xl font-bold leading-tight text-gray-900">
        <span className="bg-linear-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent" style={{ fontFamily: "'Jersey 10', 'Arial Black', sans-serif" }}>
          NJ Tech Studio
        </span>
      </h1>
      <p className="text-lg text-gray-600 leading-relaxed">
        Transforming ideas into powerful digital solutions that drive business growth and innovation.
      </p>
    </div>
  </Block>
);

const FounderBlock = () => (
  <Block className="col-span-12 md:col-span-6 flex items-center">
    <p className="text-2xl md:text-3xl leading-snug text-gray-900">
      Hi, I'm <span className="text-purple-700 font-bold">Jay Patel</span>.{" "}
      <span className="text-gray-500">
        A passionate software developer with 2 years of experience building innovative web applications,
        mobile apps, and AI-powered solutions. I specialize in creating efficient, scalable products
        that solve real-world problems.
      </span>
    </p>
  </Block>
);

const AboutBlock = () => (
  <Block className="col-span-12">
    <p className="text-2xl md:text-3xl leading-snug text-gray-900">
      We build innovative software solutions.{" "}
      <span className="text-gray-500">
        Specializing in web development, mobile apps, AI integrations, and custom automation.
        Our passion is creating scalable, high-quality products that solve real business challenges
        and drive digital transformation.
      </span>
    </p>
  </Block>
);


const AboutNJTechStudioBlock = () => (
  <Block className="col-span-12">
      <div className="w-full max-w-6xl bg-[#1E1E22] text-white rounded-3xl 
                      p-14 shadow-xl flex flex-col md:flex-row gap-12 items-center min-h-[320px]">
        
        {/* Avatar + Badge */}
        <div className="relative">
          <img
            src="/photo.png" // Replace with your own avatar image
            alt="User Avatar"
            className="w-32 h-32 rounded-2xl object-cover border-2 border-gray-700 shadow-lg"
          />

          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white 
                           text-black px-4 py-1.5 text-xs font-semibold rounded-xl shadow-md">
            videoly
          </span>
        </div>

        {/* Text */}
        <div className="flex-1 space-y-4">
          <p className="text-gray-200 text-xl leading-relaxed">
            “We went from using only email sequences and manual steps on other
            channels to having all important tools integrated. Now we’re able to
            run multichannel campaigns from just one workflow.”
          </p>

          <p className="text-sm font-semibold pt-2">
            Patric Lindström{" "}
            <span className="text-gray-400 font-normal">Chief Sales Officer</span>
          </p>
        </div>
      </div>
  </Block>
);


const MissionBlock = () => (
  <Block className="col-span-12 md:col-span-6">
    <p className="text-2xl md:text-3xl leading-snug text-gray-900">
      <span className="text-purple-700 font-bold">Our Mission</span>
      <br />
      <span className="text-gray-500">
        To empower businesses with innovative technology solutions that drive growth,
        efficiency, and success in the digital age.
      </span>
    </p>
  </Block>
);

const VisionBlock = () => (
  <Block className="col-span-12 md:col-span-6">
    <p className="text-2xl md:text-3xl leading-snug text-gray-900">
      <span className="text-purple-700 font-bold">Our Vision</span>
      <br />
      <span className="text-gray-500">
        To be a leading technology partner known for delivering exceptional digital
        experiences and transformative solutions that shape the future.
      </span>
    </p>
  </Block>
);

