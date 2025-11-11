"use client";

import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600 py-8 lg:py-12">
      {/* Minimal Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute top-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-24 h-24 bg-purple-300 opacity-5 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
            Ready to Get Started?
          </h2>
          <p className="text-base lg:text-lg text-purple-100 mb-6 max-w-xl mx-auto">
            Let's discuss how we can help transform your business
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <a
              href="#contact"
              className="group bg-white text-purple-600 font-semibold py-2.5 px-6 rounded-full hover:bg-purple-50 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 text-sm lg:text-base"
            >
              Get Started
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="tel:+1234567890"
              className="group bg-purple-700 text-white font-semibold py-2.5 px-6 rounded-full hover:bg-purple-800 transition-all duration-300 border border-white/20 flex items-center gap-2 text-sm lg:text-base"
            >
              <Phone className="w-4 h-4" />
              Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

