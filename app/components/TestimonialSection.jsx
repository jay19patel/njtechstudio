"use client";
import MovingTextBg from "./MovingTextBg";

export default function TestimonialSection() {
  const testimonials = [
    {
      id: 1,
      name: "Videoly Client",
      role: "Operations Manager",
      text: "Jay transformed our entire workflow! He built us a custom ERP system with Frappe that automated approvals, bookings, and coordination across teams. Our management speed increased by 30%!",
    },
    {
      id: 2,
      name: "Sayaji Infotech",
      role: "HR Manager",
      text: "Built AI-powered talent acquisition automation with GenAI and vector search. Manual screening time reduced by ~50%, candidates matched smarter!",
    },
    {
      id: 3,
      name: "Startup Founder",
      role: "CEO",
      text: "Shipped our MVP in just 3 weeks with Next.js and FastAPI. Clean code, fast performance, and excellent communication throughout. Highly recommend!",
    },
    {
      id: 4,
      name: "Meril Life Client",
      role: "Manufacturing Lead",
      text: "Built healthcare manufacturing automation with C# + IoT integration. Streamlined documentation workflows, reduced manual processing by over 50%!",
    },
    {
      id: 5,
      name: "Tech Company",
      role: "CTO",
      text: "Engineered a multi-microservices trading platform with event-driven architecture. Sub-250ms execution, automated strategies, real-time risk management!",
    },
    {
      id: 6,
      name: "E-commerce Business",
      role: "Product Manager",
      text: "Built our entire e-commerce platform with React and Django. Scalable, fast, and handles thousands of orders daily. Game changer for our business!",
    },
  ];

  // Duplicate for seamless infinite scroll - only 2 rows
  const row1 = [...testimonials, ...testimonials];
  const row2 = [...testimonials, ...testimonials];

  return (
    <MovingTextBg text="TESTIMONIALS" textColor="text-gray-400">
      <section className="bg-white pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative">
        <div className="mb-8 sm:mb-12 px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl mx-auto">
          <h3 className="text-gray-900 text-3xl sm:text-4xl md:text-5xl font-semibold text-left">
            What Clients Say
          </h3>
          <p className="text-left text-gray-600 text-sm sm:text-base mt-2 sm:mt-3 max-w-2xl">
            Real feedback from real clients who trusted me to build their tech solutions.
          </p>
        </div>

        <div className="p-4 overflow-x-hidden relative">
          {/* Left Gradient */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 z-10 bg-linear-to-r from-white to-transparent"></div>

          {/* Row 1 - Left to Right */}
          <div className="flex items-center mb-6">
            <div className="flex gap-4 sm:gap-6 animate-scroll-left">
              {row1.map((testimonial, idx) => (
                <TestimonialCard key={`row1-${idx}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Row 2 - Right to Left */}
          <div className="flex items-center">
            <div className="flex gap-4 sm:gap-6 animate-scroll-right">
              {row2.map((testimonial, idx) => (
                <TestimonialCard key={`row2-${idx}`} testimonial={testimonial} />
              ))}
            </div>
          </div>

          {/* Right Gradient */}
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 z-10 bg-linear-to-l from-white to-transparent"></div>
        </div>

        <style jsx>{`
          @keyframes scroll-left {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @keyframes scroll-right {
            0% {
              transform: translateX(-50%);
            }
            100% {
              transform: translateX(0);
            }
          }

          .animate-scroll-left {
            animation: scroll-left 60s linear infinite;
          }

          .animate-scroll-right {
            animation: scroll-right 60s linear infinite;
          }
        `}</style>
      </section>
    </MovingTextBg>
  );
}

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="shrink-0 w-[350px] sm:w-[450px] md:w-[500px] bg-white border border-gray-300 p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Testimonial Text */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-6">
        "{testimonial.text}"
      </p>

      {/* Author Name - Bottom */}
      <div className="border-t border-gray-200 pt-4">
        <p className="text-sm sm:text-base font-medium text-gray-900">
          — {testimonial.name}
        </p>
      </div>
    </div>
  );
};
