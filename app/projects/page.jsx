'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar, Code2, Filter, Search } from 'lucide-react';
import MovingTextBg from '../components/MovingTextBg';
import initialProjects from '../../public/projects.json';

export default function ProjectsPage() {
  const [projects, setProjects] = useState(initialProjects);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(() => ['All', ...new Set(initialProjects.map(p => p.category))]);

  useEffect(() => {
    // Load fresh projects data without flashing
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(prev => {
            if (JSON.stringify(prev) === JSON.stringify(data)) return prev;
            return data;
          });

          const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
          setCategories(prev => {
            if (JSON.stringify(prev) === JSON.stringify(uniqueCategories)) return prev;
            return uniqueCategories;
          });
        }
      })
      .catch(err => console.error('Error loading projects:', err));
  }, []);

  // Derive the filtered list instead of syncing it via a second effect
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, projects]);

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 min-h-screen relative">
      <MovingTextBg text="PROJECTS" textColor="text-zinc-400">

        {/* Hero Section */}
        <section className="relative w-full pt-32 lg:pt-40 pb-8 lg:pb-12 px-4 sm:px-8 lg:px-16 border-b border-zinc-200/80">
          <div className="relative z-10 max-w-7xl mx-auto text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold rounded-full shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>02 - Featured Work</span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] tracking-tight text-zinc-900 max-w-4xl">
              Crafted <br />
              <span className="bg-indigo-100 text-indigo-950 px-2 pb-1 inline-block -mx-2 mt-2 rounded-sm border border-indigo-200/60">
                Projects & Apps
              </span>
            </h1>

            <div className="max-w-2xl text-left pt-4">
              <p className="text-base sm:text-lg md:text-xl text-zinc-500 leading-relaxed">
                Discover our portfolio of innovative web applications, AI integrations, custom ERPs, and hardware systems.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative w-full py-12 lg:py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Search and Filter */}
            <div className="mb-12 space-y-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by name, technology, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-zinc-200 bg-white text-zinc-900 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 rounded-2xl outline-none transition-all text-sm sm:text-base font-medium placeholder:text-zinc-400 shadow-[0_2px_10px_rgb(0,0,0,0.02)]"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-zinc-500">
                  <Filter className="w-4 h-4" />
                  <span className="font-bold uppercase text-[10px] tracking-widest">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 font-bold uppercase text-[10px] tracking-widest rounded-full transition-all duration-300 cursor-pointer ${
                        selectedCategory === category
                          ? 'bg-indigo-600 text-white border border-indigo-500 shadow-md'
                          : 'bg-white text-zinc-600 border border-zinc-200 hover:border-zinc-300 hover:text-zinc-900 shadow-xs'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            {filteredProjects.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative bg-white border border-zinc-200/90 hover:border-zinc-300 rounded-3xl transition-all duration-300 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 flex flex-col justify-between overflow-hidden"
                  >
                    {/* Full Card Link Overlay */}
                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0">
                      <span className="sr-only">View {project.title}</span>
                    </Link>

                    {/* Project Image */}
                    <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-100 border-b border-zinc-100">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code2 className="w-16 h-16 text-zinc-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md border border-zinc-200 text-zinc-800 text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 sm:p-8 relative z-10 pointer-events-none flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors tracking-tight">
                          {project.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm font-semibold text-indigo-600 mb-4">
                          {project.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-sm sm:text-base text-zinc-500 mb-6 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 4).map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-zinc-50 border border-zinc-200 text-zinc-600 font-semibold text-[10px] uppercase tracking-wider rounded-full"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-zinc-50 border border-zinc-200 text-zinc-400 font-medium text-[10px] rounded-full">
                              +{project.technologies.length - 4}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-5 border-t border-zinc-100 pointer-events-auto">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-zinc-400">
                            <Calendar className="w-4 h-4" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">
                              {new Date(project.endDate || project.startDate).toLocaleDateString('en-US', {
                                month: 'short',
                                year: 'numeric'
                              })}
                            </span>
                          </div>

                          {/* Links */}
                          <div className="flex items-center gap-3">
                            {project.liveUrl && (
                              <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 hover:text-indigo-800 transition-colors flex items-center gap-1.5 relative z-20"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {project.liveUrl.replace(/^https?:\/\//, '')} <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border border-zinc-200 rounded-3xl bg-white shadow-xs">
                <Code2 className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-zinc-900 mb-2">
                  No Projects Found
                </h3>
                <p className="text-zinc-500 text-sm">
                  Try adjusting your search or filter criteria
                </p>
              </div>
            )}
          </div>
        </section>
      </MovingTextBg>
    </div>
  );
}
