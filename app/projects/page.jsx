'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar, Code2, Filter, Search } from 'lucide-react';
import MovingTextBg from '../components/MovingTextBg';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    // Load projects data
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
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
    <div className="bg-background text-foreground min-h-screen">
      <MovingTextBg text="PROJECTS " textColor="text-gray-400">

        {/* Edgy Left-Aligned Hero Section */}
        <section className="relative w-full pt-32 lg:pt-40 pb-6 lg:pb-10 px-4 sm:px-8 lg:px-16">
          <div className="relative z-10 max-w-7xl mx-auto text-left space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 border border-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md">
              // 02 . FEATURED WORK
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tighter uppercase text-gray-900">
              CRAFTED <br />
              <span className="text-indigo-800">PROJECTS & APPS</span>
            </h1>

            <div className="max-w-2xl text-left pt-2 border-l-2 border-indigo-900 pl-4 sm:pl-6">
              <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                Discover our portfolio of innovative web applications, AI integrations, and custom software solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative w-full py-12 lg:py-20 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

            {/* Search and Filter */}
            <div className="mb-12">
              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search projects by name, technology, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 bg-white text-gray-900 focus:border-indigo-900 outline-none transition-all text-sm sm:text-base font-medium"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter className="w-5 h-5" />
                  <span className="font-bold uppercase text-xs tracking-wider">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 font-bold uppercase text-xs tracking-wider transition-all duration-300 ${selectedCategory === category
                        ? 'bg-indigo-900 text-white border border-indigo-950 shadow-md'
                        : 'bg-white text-gray-800 border border-gray-300 hover:border-indigo-800'
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className="group relative bg-white border-2 border-zinc-200 hover:border-indigo-900 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between"
                  >
                    {/* Full Card Link Overlay */}
                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0">
                      <span className="sr-only">View {project.title}</span>
                    </Link>

                    {/* Project Image */}
                    <div className="relative h-72 overflow-hidden bg-indigo-950 border-b border-gray-200">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code2 className="w-24 h-24 text-indigo-300" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-indigo-950 border border-indigo-800 text-white text-xs font-bold uppercase tracking-wider">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-4 lg:p-6 relative z-10 pointer-events-none flex-1 flex flex-col justify-between">
                      <div>
                        {/* Title */}
                        <h3 className="text-xl lg:text-2xl font-black text-gray-900 mb-2 group-hover:text-indigo-800 transition-colors">
                          {project.title}
                        </h3>

                        {/* Subtitle */}
                        <p className="text-sm lg:text-base font-semibold text-indigo-800 mb-2 lg:mb-4">
                          {project.subtitle}
                        </p>

                        {/* Description */}
                        <p className="text-sm lg:text-base text-gray-700 mb-4 lg:mb-6 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div>
                        {/* Technologies */}
                        <div className="flex flex-wrap gap-2 mb-6">
                          {project.technologies.slice(0, 5).map((tech, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-900 font-semibold text-xs"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 5 && (
                            <span className="px-3 py-1 bg-gray-100 border border-gray-300 text-gray-700 font-medium text-xs">
                              +{project.technologies.length - 5}
                            </span>
                          )}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-200 pointer-events-auto">
                          {/* Date */}
                          <div className="flex items-center gap-2 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs sm:text-sm">
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
                                className="text-xs font-bold uppercase tracking-wider text-indigo-800 hover:text-indigo-950 transition-colors flex items-center gap-1 relative z-20"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {project.liveUrl.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3" />
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
              <div className="text-center py-20">
                <Code2 className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  No Projects Found
                </h3>
                <p className="text-gray-600">
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
