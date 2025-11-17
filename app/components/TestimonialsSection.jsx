"use client";
import { Star, Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechStart Inc",
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      rating: 5,
      text: "NJ Tech Studio transformed our vision into reality. Their expertise in web development and attention to detail exceeded our expectations. The team was professional, responsive, and delivered on time."
    },
    {
      name: "Michael Chen",
      position: "Founder, HealthCare Plus",
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
      rating: 5,
      text: "Working with NJ Tech Studio was a game-changer for our healthcare platform. They understood our complex requirements and delivered a robust, scalable solution. Highly recommended!"
    },
    {
      name: "Emily Rodriguez",
      position: "CTO, FinanceHub",
      image: "bg-gradient-to-br from-green-400 to-green-600",
      rating: 5,
      text: "The mobile app developed by NJ Tech Studio has been a huge success. Their technical expertise and creative approach helped us stand out in the competitive fintech market."
    },
    {
      name: "David Thompson",
      position: "Director, EduLearn",
      image: "bg-gradient-to-br from-orange-400 to-orange-600",
      rating: 5,
      text: "Exceptional work on our learning management system! The team at NJ Tech Studio is knowledgeable, creative, and committed to delivering quality. They're now our go-to development partner."
    },
    {
      name: "Lisa Anderson",
      position: "VP Marketing, RetailPro",
      image: "bg-gradient-to-br from-pink-400 to-pink-600",
      rating: 5,
      text: "Our e-commerce platform built by NJ Tech Studio has driven significant growth. The seamless user experience and powerful backend have been instrumental to our success."
    },
    {
      name: "James Wilson",
      position: "Managing Director, PropTech Solutions",
      image: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      rating: 5,
      text: "NJ Tech Studio delivered a sophisticated real estate platform that our clients love. Their professionalism and technical prowess are unmatched. A pleasure to work with!"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Client <span className="text-blue-600">Testimonials</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it - hear what our clients have to say
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="absolute top-6 right-6 text-blue-600 opacity-20">
                <Quote className="w-12 h-12" />
              </div>

              <div className="flex items-center mb-6">
                <div className={`w-16 h-16 rounded-full ${testimonial.image} flex items-center justify-center text-white font-bold text-xl`}>
                  {testimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.position}</p>
                </div>
              </div>

              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-gray-600 leading-relaxed relative z-10">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-12">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Happy Clients
          </h3>
          <p className="text-xl text-gray-600 mb-8">
            Experience the difference of working with a dedicated tech partner
          </p>
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            Start Your Project
          </button>
        </div>
      </div>
    </section>
  );
}
