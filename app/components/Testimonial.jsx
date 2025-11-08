"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";

const defaultTestimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO, TechStart Inc.",
    rating: 5,
    content: "NJ Tech Studio transformed our online presence. Their team delivered a stunning website that perfectly represents our brand. Highly professional and responsive throughout the project.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder, Digital Solutions",
    rating: 5,
    content: "Working with NJ Tech Studio was a game-changer. They built our e-commerce platform from scratch and it's been performing flawlessly. Great attention to detail and excellent communication.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Marketing Director, Growth Co.",
    rating: 5,
    content: "The mobile app they developed for us exceeded all expectations. User-friendly, fast, and beautifully designed. Our user engagement has increased significantly since launch.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily"
  },
  {
    id: 4,
    name: "David Thompson",
    role: "CTO, Innovation Labs",
    rating: 5,
    content: "NJ Tech Studio's technical expertise is outstanding. They helped us modernize our legacy systems and the results have been remarkable. Highly recommend their services.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=David"
  }
];

export default function Testimonial() {
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [testimonials] = useState(defaultTestimonials);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8 max-w-sm sm:max-w-2xl lg:max-w-full mx-auto">
          {/* Left Content */}
          <div className="w-full lg:w-2/5">
            <span className="text-sm text-gray-500 font-medium mb-4 block">
              Testimonial
            </span>
            <h2 className="text-4xl font-bold text-gray-900 leading-[3.25rem] mb-8">
              {testimonials.length > 0 
                ? `${testimonials.length > 1000 ? (testimonials.length / 1000).toFixed(1) + 'k+' : testimonials.length}+ Customers gave their`
                : 'Thousands of customers gave their'}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-tr from-purple-600 to-violet-600">
                Feedback
              </span>
            </h2>

            {/* Slider Controls */}
            <div className="flex items-center justify-center lg:justify-start gap-10">
              <button
                ref={prevRef}
                className="group flex justify-center items-center border border-solid border-purple-600 w-12 h-12 transition-all duration-500 rounded-lg hover:bg-purple-600"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </button>
              <button
                ref={nextRef}
                className="group flex justify-center items-center border border-solid border-purple-600 w-12 h-12 transition-all duration-500 rounded-lg hover:bg-purple-600"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-6 w-6 text-purple-600 group-hover:text-white" />
              </button>
            </div>
          </div>

          {/* Swiper */}
          <div className="w-full lg:w-3/5">
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={28}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={{
                prevEl: prevRef.current,
                nextEl: nextRef.current,
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current;
                swiper.params.navigation.nextEl = nextRef.current;
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                  spaceBetween: 28,
                },
                1024: {
                  slidesPerView: 2,
                  spaceBetween: 32,
                },
              }}
              className="testimonial-swiper"
            >
              {testimonials.length === 0 ? (
                <SwiperSlide>
                  <div className="text-center py-12">
                    <p className="text-gray-500">No testimonials available at the moment.</p>
                  </div>
                </SwiperSlide>
              ) : (
                testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="group bg-white border border-solid border-gray-300 rounded-2xl max-sm:max-w-sm max-sm:mx-auto p-6 transition-all duration-500 hover:border-purple-600 h-full">
                    <div className="flex items-center gap-5 mb-5 sm:mb-9">
                      <img
                        className="rounded-full object-cover w-16 h-16"
                        src={testimonial.image}
                        alt={testimonial.name}
                      />
                      <div className="grid gap-1">
                        <h5 className="text-gray-900 font-medium transition-all duration-500">
                          {testimonial.name}
                        </h5>
                        <span className="text-sm leading-6 text-gray-500">
                          {testimonial.role}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center mb-5 sm:mb-9 gap-2 text-amber-500 transition-all duration-500">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 leading-6 transition-all duration-500 min-h-24 group-hover:text-gray-800">
                      {testimonial.content || testimonial.text}
                    </p>
                  </div>
                </SwiperSlide>
                ))
              )}
            </Swiper>
          </div>
        </div>
      </div>
    </section>
  );
}
