import React from "react";
import MovingTextBg from "../components/MovingTextBg";

export default function ContactPage() {
  return (
    <MovingTextBg text="CONTACT" textColor="text-gray-400">
      <section className="min-h-screen w-full flex flex-col items-center justify-center px-6 relative overflow-hidden">
        
        {/* Heading */}
        <div className="text-center mb-12 relative z-10">
          <h1 className="text-5xl font-extrabold mb-3 tracking-tight">Contact Us</h1>
          <p className="text-purple-600 text-lg">
            We’ll get back to you as soon as possible!
          </p>
        </div>

        {/* Form */}
        <form className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          
          {/* Full Name */}
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold text-gray-500 mb-1">FULL NAME</label>
            <input
              type="text"
              placeholder="Anya Smith"
              className="bg-white border border-gray-300 rounded-xl p-4 text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
            />
          </div>

          {/* Business Name */}
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold text-gray-500 mb-1">BUSINESS NAME</label>
            <input
              type="text"
              placeholder="Freelancer / Company"
              className="bg-white border border-gray-300 rounded-xl p-4 text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold text-gray-500 mb-1">EMAIL</label>
            <input
              type="email"
              placeholder="anya@gmail.com"
              className="bg-white border border-gray-300 rounded-xl p-4 text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col col-span-1">
            <label className="text-xs font-semibold text-gray-500 mb-1">PHONE</label>
            <input
              type="text"
              placeholder="+ 65 9123 4567"
              className="bg-white border border-gray-300 rounded-xl p-4 text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 transition"
            />
          </div>

          {/* Message */}
          <div className="flex flex-col col-span-1 md:col-span-2 relative">
            <label className="text-xs font-semibold text-gray-500 mb-1">MESSAGE</label>
            <textarea
              rows="5"
              placeholder="Enter your message..."
              className="bg-white border border-gray-300 rounded-xl p-4 text-black placeholder-gray-500 outline-none focus:border-black focus:ring-2 focus:ring-black/20 pr-16 transition"
            />

            {/* Send Button */}
            <button
              type="submit"
              className="absolute bottom-4 right-4 bg-black hover:bg-gray-800 transition w-12 h-12 rounded-full flex items-center justify-center shadow-md"
            >
              <span className="text-white text-xl">➤</span>
            </button>
          </div>
        </form>
      </section>
    </MovingTextBg>
  );
}
