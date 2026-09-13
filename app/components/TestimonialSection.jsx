"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import MovingTextBg from "./MovingTextBg";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState([
    {
      id: 1,
      name: "Videoly Client",
      role: "Operations Manager",
      text: "Jay transformed our workflow! Custom ERP with Frappe automated approvals, bookings, and coordination. Management speed increased by 30%! 🎉",
    },
    {
      id: 2,
      name: "Sayaji Infotech",
      role: "HR Manager",
      text: "Built AI-powered talent acquisition automation with GenAI and vector search. Manual screening reduced by ~50%, candidates matched smarter! 🚀",
    },
    {
      id: 3,
      name: "Startup Founder",
      role: "CEO",
      text: "Shipped MVP in 3 weeks with Next.js & FastAPI. Clean code, fast performance, excellent communication. Highly recommend! 💡",
    },
    {
      id: 4,
      name: "Meril Life Client",
      role: "Manufacturing Lead",
      text: "Healthcare manufacturing automation with C# + IoT integration. Reduced manual processing by over 50%! ⭐",
    },
    {
      id: 5,
      name: "Tech Company",
      role: "CTO",
      text: "Multi-microservices trading platform with event-driven architecture. Sub-250ms execution, automated strategies, real-time risk management! ⚡",
    },
    {
      id: 6,
      name: "E-commerce Business",
      role: "Product Manager",
      text: "Built entire e-commerce platform with React & Django. Scalable, fast, handles thousands of orders daily. Game changer! 🎯",
    },
  ]);

  useEffect(() => {
    fetch('/api/admin/data?type=testimonials')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTestimonials(prev => {
            if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
            return data;
          });
        }
      })
      .catch(err => console.error('Error fetching testimonials:', err));
  }, []);

  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials, ...testimonials];

  return (
    <MovingTextBg text="TESTIMONIALS" textColor="text-white" className="bg-black">
      <section className="relative w-full bg-transparent text-white pt-20 pb-24 overflow-hidden border-t border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white mb-4">
              What clients <span className="bg-indigo-900/50 text-indigo-300 px-2 pb-1 inline-block -mx-2 mt-2 rounded-sm border border-indigo-500/20">say.</span>
            </h2>
            <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
              Real feedback from real clients who trusted me to build their tech solutions.
            </p>
          </motion.div>
        </div>

        <div className="p-4 overflow-x-hidden relative max-w-[1600px] mx-auto z-10">
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-32 z-10 bg-gradient-to-r from-black to-transparent pointer-events-none"></div>

          <div className="flex items-center mb-6">
            <div className="flex gap-4 sm:gap-6 animate-scroll-left">
              {row1.map((testimonial, idx) => (
                <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex gap-4 sm:gap-6 animate-scroll-right">
              {row2.map((testimonial, idx) => (
                <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-32 z-10 bg-gradient-to-l from-black to-transparent pointer-events-none"></div>
        </div>

        <style jsx>{`
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes scroll-right {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
          .animate-scroll-left {
            animation: scroll-left 60s linear infinite;
            will-change: transform;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
          }
          .animate-scroll-right {
            animation: scroll-right 60s linear infinite;
            will-change: transform;
            transform: translate3d(0, 0, 0);
            backface-visibility: hidden;
          }
          .animate-scroll-left:hover, .animate-scroll-right:hover {
            animation-play-state: paused;
          }
        `}</style>
      </section>
    </MovingTextBg>
  );
}

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="shrink-0 w-[300px] sm:w-[400px] bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:border-zinc-700 transition-colors duration-300 flex flex-col justify-between">
      <p className="text-zinc-300 text-sm sm:text-[15px] leading-relaxed mb-8 font-medium">
        &quot;{testimonial.text}&quot;
      </p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-sm">
           {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-sm font-semibold text-white tracking-tight">
            {testimonial.name}
          </p>
          <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wider">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};
