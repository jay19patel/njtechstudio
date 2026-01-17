"use client";
import MovingTextBg from "../components/MovingTextBg";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <MovingTextBg text="LET'S TALK " textColor="text-gray-400">
        {/* Hero Section */}
        <section className="relative w-full pt-32 lg:pt-40 pb-12 lg:pb-20 px-4 md:px-8 lg:px-16">
          <div className="relative z-10 max-w-6xl mx-auto text-center space-y-6 lg:space-y-8">
            <h1 className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] font-black leading-[0.8] tracking-tighter uppercase text-foreground mix-blend-difference">
              GET IN <span className="text-indigo-600">TOUCH</span>
            </h1>

            <div className="max-w-2xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Have a project in mind or just want to say hello?
                We are always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative w-full py-12 lg:py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

              {/* Left Side: Contact Info */}
              <div className="space-y-12 lg:space-y-14">
                <div>
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black uppercase tracking-tight mb-6 lg:mb-8">Contact Details</h3>
                  <div className="space-y-6 lg:space-y-8">
                    <ContactItem icon={Mail} label="Email Us" value="hello@njtechstudio.com" />
                    <ContactItem icon={Phone} label="Call Us" value="+91 98765 43210" />
                    <ContactItem icon={MapPin} label="Visit Us" value="Valsad, Gujarat, India" />
                  </div>
                </div>

                <div className="p-6 lg:p-8 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h4 className="text-lg lg:text-xl font-bold uppercase mb-4">Working Hours</h4>
                  <p className="text-zinc-500 text-base lg:text-lg">Monday - Friday</p>
                  <p className="text-zinc-900 text-xl lg:text-2xl font-bold">09:00 AM — 06:00 PM</p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div>
                <div className="mb-8 lg:mb-10">
                  <h3 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black uppercase tracking-tight mb-4">Send a Message</h3>
                  <p className="text-zinc-500 text-base lg:text-lg">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form className="space-y-8 lg:space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    <InputGroup label="Your Name" placeholder="John Doe" type="text" />
                    <InputGroup label="Your Email" placeholder="john@example.com" type="email" />
                  </div>

                  <InputGroup label="Subject" placeholder="Project Inquiry" type="text" />

                  <div className="space-y-4">
                    <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-zinc-400">Message</label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b-2 border-zinc-200 text-lg sm:text-xl md:text-xl lg:text-2xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-indigo-600 transition-colors py-3 lg:py-4 resize-none text-zinc-900"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <div className="pt-4">
                    <button className="group relative inline-flex items-center justify-center px-8 py-4 lg:px-10 lg:py-4 bg-black text-white rounded-full overflow-hidden transition-all hover:bg-indigo-600 hover:scale-105 active:scale-95 w-full md:w-auto">
                      <span className="relative z-10 flex items-center gap-3 font-bold uppercase tracking-wider text-sm lg:text-base">
                        Send Message <ArrowUpRight className="w-4 h-4 lg:w-5 lg:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </span>
                    </button>
                  </div>
                </form>
              </div>

            </div>
          </div>
        </section>
      </MovingTextBg>
    </div>
  );
}

function InputGroup({ label, placeholder, type }) {
  return (
    <div className="space-y-4">
      <label className="text-xs lg:text-sm font-bold uppercase tracking-widest text-zinc-400">{label}</label>
      <input
        type={type}
        className="w-full bg-transparent border-b-2 border-zinc-200 text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-indigo-600 transition-colors py-3 lg:py-4 text-zinc-900"
        placeholder={placeholder}
      />
    </div>
  )
}

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-4 lg:gap-6 group cursor-default">
      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-indigo-50 flex items-center justify-center group-hover:bg-indigo-600 transition-colors duration-300 flex-shrink-0">
        <Icon className="w-4 h-4 lg:w-5 lg:h-5 text-indigo-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-zinc-900 break-all sm:break-normal">{value}</p>
      </div>
    </div>
  )
}
