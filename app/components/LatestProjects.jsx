'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Calendar, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import MovingTextBg from './MovingTextBg';

export default function LatestProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Load projects data
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        // Get only featured projects
        const featured = data.filter(p => p.featured).slice(0, 4);
        setProjects(featured);
      })
      .catch(err => console.error('Error loading projects:', err));
  }, []);

  if (projects.length === 0) return null;

  return (
    <MovingTextBg text='PROJECTS' textColor='text-gray-400'>
      <section className="pt-12 sm:pt-16 md:pt-20 pb-8 sm:pb-10 md:pb-12 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="mb-8 flex justify-end">
            <div className="text-right">
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-3"
              >
                Crafted With Passion, <span className="text-indigo-800">Built to Impress</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl ml-auto"
              >
                Turning bold ideas into reality with precision and creativity. Every project tells a story of innovation and excellence.
              </motion.p>
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="mt-4 flex justify-end"
              >
                <Link
                  href="/projects"
                  className="inline-flex items-center px-4 py-1.5 bg-indigo-900 hover:bg-indigo-800 text-white font-medium transition-colors text-sm border border-indigo-950 shadow-sm group"
                >
                  All Projects
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            </div>
          </div>

          {/* Stacking Cards Container */}
          <div className="relative mt-16 md:mt-24 pb-[10vh]">
            <ul className="flex flex-col gap-[8vh] relative list-none p-0">
              {projects.map((project, index) => {
                const isLast = index === projects.length - 1;
                return (
                  <li 
                    key={project.id || index}
                    className="sticky w-full origin-top"
                    style={{ 
                      top: `calc(15vh + ${index * 30}px)` 
                    }}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center border-2 border-indigo-900 p-4 sm:p-5 bg-white shadow-2xl relative"
                      style={{
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 -10px 20px -5px rgba(49, 46, 129, 0.1)'
                      }}
                    >
                      {/* Left Side - Image */}
                      <div className="relative h-[280px] sm:h-[320px] lg:h-[360px] border border-gray-300 overflow-hidden shadow-md group">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.title}
                            className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-50">
                            <Code2 className="w-32 h-32 text-indigo-200" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                        {/* Category Badge */}
                        <div className="absolute top-6 left-6">
                          <span className="px-4 py-2 bg-indigo-950 border border-indigo-800 text-white text-xs font-bold uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Right Side - Details */}
                      <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 flex flex-col justify-center h-full">
                        <div>
                          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-gray-900 leading-tight">
                            {project.title}
                          </h3>
                          <p className="text-indigo-800 font-semibold text-sm sm:text-base mt-2">
                            {project.subtitle}
                          </p>
                        </div>

                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                          {project.description}
                        </p>

                        {/* Technologies */}
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {project.technologies?.slice(0, 6).map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-900 text-xs sm:text-sm font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 6 && (
                            <span className="px-2.5 py-1 sm:px-3 sm:py-1.5 bg-gray-100 border border-gray-300 text-gray-700 text-xs sm:text-sm font-medium">
                              +{project.technologies.length - 6} more
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 sm:pt-6 border-t border-gray-200 mt-auto">
                          {/* Date */}
                          <div className="flex items-center gap-1.5 sm:gap-2 text-gray-500">
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
                            className="flex items-center gap-1.5 text-indigo-800 font-bold hover:gap-2 transition-all duration-300 text-sm sm:text-base group"
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>
    </MovingTextBg>
  );
}
