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

export default function AboutSection() {
  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading */}
        <div className="text-center mb-6 lg:mb-8">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-gray-900">
            Our <span className="text-indigo-600">Teams</span>
          </h1>
                </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 min-h-[350px]">
          {/* Left Side - Team Card at End (Bottom) */}
          <div className="flex justify-center lg:justify-end items-end">
            <div
              className="group flex flex-col items-center py-8 text-sm border border-gray-300/60 w-full sm:w-80 rounded-md cursor-pointer hover:border-indigo-600 hover:border-2 transition-all duration-300 relative overflow-hidden"
            >
              {/* Gradient Background - Always Visible */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-x-12"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <img 
                  className="w-24 rounded-full border-4 border-purple-300 transition-colors duration-300" 
                  src={founder.image} 
                  alt={founder.name}
                />
                <h2 className="text-white text-lg font-medium mt-2">
                  {founder.name}
                </h2>
                <p className="text-white/80">
                  {founder.role}
                </p>
                <p className="text-center text-white/60 w-3/4 mt-4">
                  {founder.description}
                </p>
                <div className="flex items-center space-x-4 mt-6 text-white">
                  <a href={founder.linkedin} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.882 0H1.167A1.16 1.16 0 0 0 0 1.161V14.84C0 15.459.519 16 1.167 16H14.83a1.16 1.16 0 0 0 1.166-1.161V1.135C16.048.516 15.53 0 14.882 0M4.744 13.6H2.385V5.987h2.36zM3.552 4.929c-.778 0-1.374-.62-1.374-1.368a1.38 1.38 0 0 1 1.374-1.367 1.38 1.38 0 0 1 1.374 1.367c0 .749-.57 1.368-1.374 1.368M11.33 13.6V9.91c0-.878-.026-2.039-1.245-2.039-1.244 0-1.426.98-1.426 1.961V13.6H6.3V5.987h2.307v1.058h.026c.337-.62 1.09-1.239 2.256-1.239 2.411 0 2.852 1.549 2.852 3.665V13.6z" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href={founder.twitter} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14.095 0H1.905C.855 0 0 .854 0 1.905v12.19C0 15.145.854 16 1.905 16h12.19c1.05 0 1.905-.854 1.905-1.905V1.905C16 .855 15.146 0 14.095 0m-1.521 6.98a2.85 2.85 0 0 1-2.651-1.277v4.395A3.248 3.248 0 1 1 6.674 6.85c.068 0 .134.006.201.01v1.6c-.067-.007-.132-.02-.2-.02a1.658 1.658 0 1 0 0 3.316c.915 0 1.724-.721 1.724-1.637l.016-7.465h1.531a2.85 2.85 0 0 0 2.63 2.547v1.78" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href={founder.github} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                    <svg width="19" height="16" viewBox="0 0 19 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="m16.358 2.613 1.128-1.425c.326-.386.416-.683.445-.832-.89.535-1.722.713-2.256.713h-.208L15.348.95A3.83 3.83 0 0 0 12.795 0c-2.078 0-3.71 1.722-3.71 3.71 0 .12 0 .298.03.417l.088.593-.623-.03C4.78 4.573 1.663 1.307 1.158.743c-.831 1.485-.356 2.91.148 3.8l1.01 1.663-1.603-.89q.044 1.87 1.425 2.938l.801.594-.801.326c.504 1.515 1.632 2.138 2.464 2.375l1.098.297-1.04.713C2.999 13.745.92 13.656 0 13.568c1.87 1.305 4.097 1.602 5.64 1.602 1.158 0 2.02-.118 2.227-.207 8.313-1.96 8.699-9.382 8.699-10.866v-.208l.178-.119c1.01-.95 1.425-1.454 1.662-1.751-.089.03-.208.089-.326.119z" fill="currentColor"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Description Text at Start (Top) but Vertically Centered */}
          <div className="flex flex-col justify-center items-start">
            <p className="text-base lg:text-lg text-gray-600 leading-relaxed">
              We're a team of passionate professionals dedicated to delivering exceptional technology solutions. Our expertise spans across development, design, and strategy to help your business thrive.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
