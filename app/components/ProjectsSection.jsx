"use client";
import { ExternalLink, Github } from "lucide-react";

export default function ProjectsSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      category: "Web Development",
      description: "A fully-featured online shopping platform with payment integration, inventory management, and real-time analytics.",
      image: "bg-gradient-to-br from-blue-400 to-blue-600",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      link: "#"
    },
    {
      title: "Healthcare Management System",
      category: "SaaS Solution",
      description: "Comprehensive patient management system with appointment scheduling, medical records, and billing features.",
      image: "bg-gradient-to-br from-purple-400 to-purple-600",
      technologies: ["Next.js", "PostgreSQL", "AWS", "Tailwind"],
      link: "#"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      description: "Secure mobile banking application with biometric authentication, fund transfers, and investment tracking.",
      image: "bg-gradient-to-br from-green-400 to-green-600",
      technologies: ["React Native", "Firebase", "Redux", "REST API"],
      link: "#"
    },
    {
      title: "AI-Powered CRM",
      category: "Enterprise Software",
      description: "Intelligent customer relationship management system with AI-driven insights and automation capabilities.",
      image: "bg-gradient-to-br from-orange-400 to-orange-600",
      technologies: ["Vue.js", "Python", "TensorFlow", "Docker"],
      link: "#"
    },
    {
      title: "Real Estate Portal",
      category: "Web Platform",
      description: "Property listing and management platform with virtual tours, mortgage calculator, and agent dashboard.",
      image: "bg-gradient-to-br from-pink-400 to-pink-600",
      technologies: ["Angular", "Express", "MySQL", "Google Maps"],
      link: "#"
    },
    {
      title: "Education LMS",
      category: "EdTech",
      description: "Learning management system with video courses, quizzes, progress tracking, and certification features.",
      image: "bg-gradient-to-br from-indigo-400 to-indigo-600",
      technologies: ["React", "Django", "Redis", "WebRTC"],
      link: "#"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-blue-600">Projects</span>
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Showcasing our expertise through successful client projects
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200"
            >
              <div className={`h-48 ${project.image} flex items-center justify-center relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative z-10 text-white text-center p-6">
                  <div className="text-sm font-semibold bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block mb-2">
                    {project.category}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-full font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold">
                    <ExternalLink className="w-4 h-4" />
                    View Project
                  </button>
                  <button className="flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors text-sm font-semibold">
                    <Github className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
}
