"use client";
import { CheckCircle2, Zap, Users, Shield, TrendingUp, Award } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Fast Development",
      description: "Agile methodology ensures quick turnaround times without compromising quality."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Expert Team",
      description: "Skilled developers with years of experience in cutting-edge technologies."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure Solutions",
      description: "Security-first approach with industry best practices and standards."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Scalable Architecture",
      description: "Build solutions that grow with your business needs and user base."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Quality Assured",
      description: "Rigorous testing and quality control for bug-free, reliable software."
    },
    {
      icon: <CheckCircle2 className="w-8 h-8" />,
      title: "24/7 Support",
      description: "Dedicated support team available round the clock for your needs."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-blue-600">Us</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We deliver excellence through innovation, expertise, and dedication
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="group p-8 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl hover:shadow-xl hover:border-blue-300 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                {reason.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {reason.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Let's build something amazing together
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
            Get Started Today
          </button>
        </div>
      </div>
    </section>
  );
}
