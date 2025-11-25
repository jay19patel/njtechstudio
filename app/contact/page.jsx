import React from "react";
import MovingTextBg from "../components/MovingTextBg";

export default function ContactPage() {
  return (
    <MovingTextBg text="CONTACT" textColor="text-gray-400">
      <section className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 relative overflow-hidden">

        <div className="w-full max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

            {/* Left Side - Image */}
            <div className="w-full flex justify-center lg:justify-start order-1 lg:order-1">
              <div className="relative w-full max-w-md lg:max-w-lg">
                <img
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=800&auto=format&fit=crop"
                  alt="Contact illustration"
                  className="w-full h-auto rounded-2xl shadow-2xl object-cover"
                />
                {/* Floating decoration */}
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-linear-to-br from-indigo-400 to-indigo-500 opacity-20 rounded-full blur-3xl"></div>
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-linear-to-br from-indigo-400 to-indigo-500 opacity-20 rounded-full blur-2xl"></div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full order-2 lg:order-2">
              {/* Heading */}
              <div className="text-center lg:text-left mb-8 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-3 tracking-tight text-gray-900">Contact Us</h1>
                <p className="text-indigo-600 text-base sm:text-lg">
                  We'll get back to you as soon as possible!
                </p>
              </div>

              {/* Form */}
              <form className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

                {/* Full Name */}
                <div className="flex flex-col col-span-1">
                  <label className="text-xs font-semibold text-gray-500 mb-1">FULL NAME</label>
                  <input
                    type="text"
                    placeholder="Anya Smith"
                    className="bg-white border border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
                  />
                </div>

                {/* Business Name */}
                <div className="flex flex-col col-span-1">
                  <label className="text-xs font-semibold text-gray-500 mb-1">BUSINESS NAME</label>
                  <input
                    type="text"
                    placeholder="Freelancer / Company"
                    className="bg-white border border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col col-span-1">
                  <label className="text-xs font-semibold text-gray-500 mb-1">EMAIL</label>
                  <input
                    type="email"
                    placeholder="anya@gmail.com"
                    className="bg-white border border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col col-span-1">
                  <label className="text-xs font-semibold text-gray-500 mb-1">PHONE</label>
                  <input
                    type="text"
                    placeholder="+ 65 9123 4567"
                    className="bg-white border border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col col-span-1 sm:col-span-2 relative">
                  <label className="text-xs font-semibold text-gray-500 mb-1">MESSAGE</label>
                  <textarea
                    rows="5"
                    placeholder="Enter your message..."
                    className="bg-white border border-gray-300 rounded-lg sm:rounded-xl p-3 sm:p-4 text-sm sm:text-base text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 pr-14 sm:pr-16 transition resize-none"
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 bg-black hover:bg-gray-800 transition w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg"
                  >
                    <span className="text-white text-lg sm:text-xl">➤</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>
    </MovingTextBg>
  );
}
