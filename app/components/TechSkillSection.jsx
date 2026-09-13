"use client";

import { motion } from "framer-motion";
import toolsData from "../data/tools.json";

export default function TechSkillSection() {
  return (
    <section className="relative w-full bg-[#fcfcfd] text-zinc-900 pt-20 pb-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Right Aligned Heading to break layout repetition */}
          <div className="relative mb-14 flex justify-end">
            <div className="space-y-4 text-right">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-zinc-900 tracking-tight leading-none">
                Our skills & <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-2">expertise.</span>
              </h2>
              <p className="text-base sm:text-lg text-zinc-500 max-w-2xl ml-auto">
                Powered by expertise, driven by innovation. We master the tools that turn ambitious ideas into real-world solutions, delivering speed, scalability, and success.
              </p>
            </div>
          </div>

          {/* Bento Box Grid Layout - Light Theme */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 md:mt-12">
            {[
              {
                id: "backend",
                title: "Backend Development",
                quote: "The engine powering your application. We build secure, scalable systems that handle millions of requests while maintaining optimal performance.",
                theme: "light"
              },
              {
                id: "frontend",
                title: "Frontend Development",
                quote: "The face of your application. We create beautiful, responsive, and intuitive interfaces ensuring seamless interactions.",
                theme: "light"
              },
              {
                id: "database",
                title: "Database Solutions",
                quote: "The foundation of data storage. We implement robust solutions that handle complex queries and ensure data integrity.",
                theme: "light"
              },
              {
                id: "other-tools",
                title: "Development Tools",
                quote: "The tools that streamline development, from version control and CI/CD pipelines to cloud infrastructure.",
                theme: "light"
              }
            ].map((section, idx) => {
              let spanClass = "col-span-1";
              if (idx === 0) spanClass = "md:col-span-2 lg:col-span-2"; // Backend box
              else if (idx === 1) spanClass = "col-span-1"; // Frontend box
              else if (idx === 2) spanClass = "col-span-1"; // Database box
              else if (idx === 3) spanClass = "md:col-span-2 lg:col-span-2"; // Tools box

              return (
                <motion.div
                  key={section.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeOut",
                    delay: idx * 0.1 
                  }}
                  whileHover={{ y: -4 }}
                  className={`
                    relative overflow-hidden group flex flex-col justify-between
                    rounded-3xl border border-zinc-200 bg-white p-6 sm:p-8 
                    transition-[border-color,box-shadow] duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)]
                    ${spanClass}
                  `}
                >
                  <div className="relative z-10 flex flex-col h-full justify-between">
                    <div>
                      <svg className={`w-8 h-8 mb-4 text-indigo-500`} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>

                      <h3 className="text-xl sm:text-2xl font-semibold mb-3 text-zinc-900 tracking-tight group-hover:text-indigo-600 transition-colors">
                        {section.title}
                      </h3>

                      <p className="text-sm sm:text-base font-normal mb-6 leading-relaxed text-zinc-500">
                        &quot;{section.quote}&quot;
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 pt-6 border-t border-zinc-100">
                        {toolsData[section.id]?.map((tool, index) => (
                          <span
                            key={index}
                            className="flex items-center gap-2 border border-zinc-200 bg-zinc-50 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-600 transition-colors group-hover:border-indigo-200 group-hover:bg-indigo-50 group-hover:text-indigo-700 shadow-sm"
                          >
                            {tool.icon && (
                              <img 
                                src={tool.icon} 
                                alt="" 
                                className="w-3.5 h-3.5 object-contain" 
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                            )}
                            <span>{tool.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
