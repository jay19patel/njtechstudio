'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ExternalLink, Calendar, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MovingTextBg from './MovingTextBg';
export default function LatestProjects() {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    // Load projects data
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        // Get only featured projects
        const featured = data.filter(p => p.featured);
        setProjects(featured);
      })
      .catch(err => console.error('Error loading projects:', err));
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (projects.length === 0) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 8000); // Change slide every 8 seconds

    return () => clearInterval(interval);
  }, [projects.length]);

  if (projects.length === 0) return null;

  const project = projects[currentIndex];

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    }),
  };

  return (
    <MovingTextBg text='PROJECTS' textColor='text-gray-400'>
      <section className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 flex justify-end">
            <div className="text-right">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                Crafted With Passion, <span className="text-indigo-600">Built to Impress</span>
              </h2>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl ml-auto">
                Turning bold ideas into reality with precision and creativity. Every project tells a story of innovation and excellence.
              </p>
              <div className="mt-4 flex justify-end">
                <Link
                  href="/projects"
                  className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 font-medium hover:bg-indigo-200 transition-colors text-sm"
                >
                  All Projects
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Carousel Container */}
          <div className="relative mb-8">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 }
                }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center border border-indigo-600 rounded-2xl p-4 sm:p-5 bg-white"
              >
                {/* Left Side - Image */}
                <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] rounded-2xl overflow-hidden shadow-2xl">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Code2 className="w-32 h-32 text-white opacity-50" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Badge */}
                  <div className="absolute top-6 left-6">
                    <span className="px-4 py-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full text-sm font-semibold text-indigo-600 dark:text-indigo-400">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Right Side - Details */}
                <div className="space-y-3 sm:space-y-4">
                  {/* Title */}
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white"
                  >
                    {project.title}
                  </motion.h3>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="text-base sm:text-lg text-gray-600 dark:text-gray-400"
                  >
                    {project.subtitle}
                  </motion.p>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed"
                  >
                    {project.description}
                  </motion.p>

                  {/* Website Link */}
                  {project.liveUrl && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="pt-1"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm sm:text-base font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 transition-colors"
                      >
                        {project.liveUrl}
                      </a>
                    </motion.div>
                  )}

                  {/* Technologies */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="flex flex-wrap gap-1.5 sm:gap-2"
                  >
                    {project.technologies.slice(0, 6).map((tech, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + index * 0.05, duration: 0.3 }}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-blue-50 dark:bg-blue-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs sm:text-sm font-medium"
                      >
                        {tech}
                      </motion.span>
                    ))}
                    {project.technologies.length > 6 && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 + 6 * 0.05, duration: 0.3 }}
                        className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg text-xs sm:text-sm font-medium"
                      >
                        +{project.technologies.length - 6} more
                      </motion.span>
                    )}
                  </motion.div>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                    {/* Date */}
                    <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500 dark:text-gray-400">
                      <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm">
                        {new Date(project.endDate || project.startDate).toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric'
                        })}
                      </span>
                    </div>

                    {/* View Details Link */}
                    <Link
                      href={`/projects/${project.slug}`}
                      className="flex items-center gap-1.5 text-indigo-600 dark:text-indigo-400 font-semibold hover:gap-2 transition-all duration-300 text-sm sm:text-base"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {projects.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                    ? 'w-8 bg-indigo-600'
                    : 'w-2 bg-gray-300 dark:bg-gray-600'
                    }`}
                  aria-label={`Go to project ${index + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </section>
    </MovingTextBg>
  );
}
