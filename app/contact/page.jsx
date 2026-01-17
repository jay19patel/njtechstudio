"use client";
import MovingTextBg from "../components/MovingTextBg";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="bg-background text-foreground min-h-screen">
      <MovingTextBg text="LET'S TALK " textColor="text-gray-400">
        {/* Hero Section */}
        <section className="relative w-full pt-48 pb-24 px-4 md:px-12 lg:px-24">
          <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
            <h1 className="text-[12vw] sm:text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase text-foreground mix-blend-difference">
              GET IN <span className="text-purple-600">TOUCH</span>
            </h1>

            <div className="max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Have a project in mind or just want to say hello?
                We are always open to discussing new projects, creative ideas or opportunities to be part of your visions.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative w-full py-24 px-4 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">

              {/* Left Side: Contact Info */}
              <div className="space-y-16">
                <div>
                  <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-8">Contact Details</h3>
                  <div className="space-y-8">
                    <ContactItem icon={Mail} label="Email Us" value="hello@njtechstudio.com" />
                    <ContactItem icon={Phone} label="Call Us" value="+91 98765 43210" />
                    <ContactItem icon={MapPin} label="Visit Us" value="Valsad, Gujarat, India" />
                  </div>
                </div>

                <div className="p-8 bg-zinc-50 rounded-2xl border border-zinc-100">
                  <h4 className="text-xl font-bold uppercase mb-4">Working Hours</h4>
                  <p className="text-zinc-500 text-lg">Monday - Friday</p>
                  <p className="text-zinc-900 text-2xl font-bold">09:00 AM — 06:00 PM</p>
                </div>
              </div>

              {/* Right Side: Form */}
              <div>
                <div className="mb-12">
                  <h3 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">Send a Message</h3>
                  <p className="text-zinc-500 text-lg">Fill out the form below and we'll get back to you shortly.</p>
                </div>

                <form className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <InputGroup label="Your Name" placeholder="John Doe" type="text" />
                    <InputGroup label="Your Email" placeholder="john@example.com" type="email" />
                  </div>

                  <InputGroup label="Subject" placeholder="Project Inquiry" type="text" />

                  <div className="space-y-4">
                    <label className="text-sm font-bold uppercase tracking-widest text-zinc-400">Message</label>
                    <textarea
                      rows={4}
                      className="w-full bg-transparent border-b-2 border-zinc-200 text-2xl md:text-3xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-purple-600 transition-colors py-4 resize-none text-zinc-900"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <div className="pt-4">
                    <button className="group relative inline-flex items-center justify-center px-10 py-5 bg-black text-white rounded-full overflow-hidden transition-all hover:bg-purple-600 hover:scale-105 active:scale-95 w-full md:w-auto">
                      <span className="relative z-10 flex items-center gap-3 font-bold uppercase tracking-wider text-lg">
                        Send Message <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
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
      <label className="text-sm font-bold uppercase tracking-widest text-zinc-400">{label}</label>
      <input
        type={type}
        className="w-full bg-transparent border-b-2 border-zinc-200 text-2xl md:text-3xl font-medium placeholder:text-zinc-200 focus:outline-none focus:border-purple-600 transition-colors py-4 text-zinc-900"
        placeholder={placeholder}
      />
    </div>
  )
}

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-6 group cursor-default">
      <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center group-hover:bg-purple-600 transition-colors duration-300">
        <Icon className="w-5 h-5 text-purple-600 group-hover:text-white transition-colors duration-300" />
      </div>
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-zinc-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-zinc-900">{value}</p>
      </div>
    </div>
  )
}
