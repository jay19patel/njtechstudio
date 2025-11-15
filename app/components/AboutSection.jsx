"use client";

const founder = {
  name: "Jay Patel",
  role: "Software Engineer & Full-Stack Developer",
  description: "Passionate about building scalable web applications and innovative solutions.",
  image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  github: "https://github.com"
};

const teamMembers = [
  {
    name: "Sarah Johnson",
    role: "UI/UX Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200"
  },
  {
    name: "Mike Chen",
    role: "Backend Developer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
  },
  {
    name: "Emily Rodriguez",
    role: "Product Manager",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200"
  },
  {
    name: "David Kim",
    role: "DevOps Engineer",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200"
  },
  {
    name: "Lisa Wang",
    role: "Frontend Developer",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=200"
  }
];

export default function AboutSection() {
  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-24">
          <div className="mb-4">
            <span className="inline-block bg-indigo-100 text-indigo-600 text-sm font-semibold px-4 py-2 rounded-full">
              Meet Our Team
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            Built by Passionate <span className="text-indigo-600">Professionals</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're a team dedicated to delivering exceptional technology solutions. Our expertise spans across development, design, and strategy.
          </p>
        </div>

        {/* Grid Section - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Card 1 - Founder Spotlight */}
          <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col lg:flex-row gap-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Founder</h3>
              <p className="text-gray-600 mb-4">
                Leading the vision with passion and expertise in building scalable solutions.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end items-end">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl opacity-90 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12 rounded-xl"></div>
                <div className="relative z-10 flex flex-col items-center p-6">
                  <img 
                    className="w-20 h-20 rounded-full border-4 border-white shadow-lg" 
                    src={founder.image} 
                    alt={founder.name}
                  />
                  <h4 className="text-white text-lg font-semibold mt-3">
                    {founder.name}
                  </h4>
                  <p className="text-white/90 text-sm">
                    {founder.role}
                  </p>
                  <div className="flex items-center space-x-4 mt-4">
                    <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor"/>
                      </svg>
                    </a>
                    <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform">
                      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0m-1.521 6.98a2.85 2.85 0 0 1-2.651-1.277v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78" fill="currentColor"/>
                      </svg>
                    </a>
                    <a href={founder.github} target="_blank" rel="noopener noreferrer" className="text-white hover:scale-110 transition-transform">
                      <svg width="19" height="18" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z" fill="currentColor"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 - Team Values */}
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-lg p-8 border border-indigo-100">
            <div className="flex flex-col justify-between h-full gap-6">
              <div className="space-y-4">
                <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <span className="text-indigo-600 font-bold">🚀</span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Innovation</p>
                      <p className="text-gray-500 text-xs">Cutting-edge solutions</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <span className="text-purple-600 font-bold">💡</span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Creativity</p>
                      <p className="text-gray-500 text-xs">Unique approaches</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <span className="text-pink-600 font-bold">🎯</span>
                    </div>
                    <div>
                      <p className="text-gray-900 font-semibold text-sm">Excellence</p>
                      <p className="text-gray-500 text-xs">Quality delivery</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Our Core Values</h3>
                <p className="text-gray-600">
                  We build with purpose, innovate with passion, and deliver with excellence in every project.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Section - Second Row */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Card 3 - Team Members */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-full border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <div className="flex flex-col gap-6 h-full">
                <div className="flex items-center gap-3 justify-center lg:justify-start flex-wrap">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="relative group">
                      <div className="w-14 h-14 rounded-full overflow-hidden border-4 border-white shadow-md group-hover:scale-110 transition-transform duration-300">
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Talented Team</h3>
                  <p className="text-gray-600">
                    A diverse group of experts bringing unique skills and perspectives to every project.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4 - Growth & Impact */}
          <div className="lg:col-span-3">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl shadow-lg p-8 h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8 h-full">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-3">Growing Together</h3>
                  <p className="text-white/90 mb-6">
                    We believe in continuous learning and development. Our team grows stronger with every challenge we overcome together.
                  </p>
                  <div className="flex gap-8">
                    <div>
                      <div className="text-3xl font-bold text-white">50+</div>
                      <div className="text-white/80 text-sm">Projects Delivered</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">10+</div>
                      <div className="text-white/80 text-sm">Team Members</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white">98%</div>
                      <div className="text-white/80 text-sm">Client Satisfaction</div>
                    </div>
                  </div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-48 h-48 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}