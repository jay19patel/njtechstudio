"use client";
import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";

const solutionsData = [
  { 
    id: 1, 
    title: "Web Development", 
    description: "Build stunning, responsive websites with cutting-edge technologies and frameworks.",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6" 
  },
  { 
    id: 2, 
    title: "ERPNext Flows for Business", 
    description: "Streamline your business operations with powerful ERP solutions and workflows.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71" 
  },
  { 
    id: 3, 
    title: "AI Integrations & Automation", 
    description: "Leverage AI to automate processes and gain intelligent insights for your business.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995" 
  },
  { 
    id: 4, 
    title: "Custom Scripts & IoT Applications", 
    description: "Create custom automation scripts and IoT solutions tailored to your needs.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475" 
  },
  { 
    id: 5, 
    title: "Mobile App Development", 
    description: "Design and develop native and cross-platform mobile applications.",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c" 
  },
  { 
    id: 6, 
    title: "Cloud Solutions & DevOps", 
    description: "Scale your infrastructure with cloud services and modern DevOps practices.",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa" 
  },
];

export default function SolutionsSection() {
  const targetRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${(solutionsData.length - 1) * 100}%`]
  );

  return (
    <section
      ref={targetRef}
      className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900"
      style={{ height: `${100 + (solutionsData.length - 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen flex flex-col">
        {/* Top 30% - Header Section */}
        <div className="h-[30vh] flex items-center justify-center relative z-10 px-6 py-12">
          <div className="text-center max-w-4xl">
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Find, enrich, & reach qualified leads
              <br />
              <span className="text-purple-300">from one platform.</span>
            </h1>
          </div>
        </div>

        {/* Bottom 70% - Horizontal Scroll Cards */}
        <div className="h-[70vh] flex items-center justify-center overflow-hidden relative">
          {/* Background decorations */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-10 left-20 w-32 h-32 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-36 h-36 bg-indigo-500 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-pink-500 rounded-full opacity-15 blur-2xl"></div>
          </div>

          <motion.div style={{ x }} className="flex w-full h-full items-center">
            {solutionsData.map((solution) => (
              <Card key={solution.id} solution={solution} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const Card = ({ solution }) => {
  return (
    <div className="min-w-full h-full flex items-center justify-center px-6 md:px-12 py-8">
      <div className="w-full max-w-5xl">
        <div
          className="bg-gradient-to-br from-gray-50 to-white rounded-3xl shadow-2xl overflow-hidden
          p-6 md:p-8 lg:p-10"
        >
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center">
            {/* Left side - Text content */}
            <div className="w-full lg:w-[45%] space-y-4">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {solution.title}
              </h2>
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {solution.description}
              </p>
            </div>

            {/* Right side - Image with purple background */}
            <div className="w-full lg:w-[55%]">
              <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl p-4 shadow-xl">
                <div
                  className="w-full h-[240px] md:h-[280px] lg:h-[320px] rounded-xl overflow-hidden shadow-lg"
                  style={{
                    backgroundImage: `url(${solution.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};