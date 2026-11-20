'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar, Code2, Filter, Search } from 'lucide-react';
import MovingTextBg from '../components/MovingTextBg';
import BackendStatusCard from '../components/BackendStatusCard';
import { getProjects } from '@/lib/api';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All']);

  const loadProjects = useCallback(async () => {
    setLoading(true);
    setIsError(false);
    try {
      const data = await getProjects();
      if (Array.isArray(data) && data.length > 0) {
        setProjects(data);
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category).filter(Boolean))];
        setCategories(uniqueCategories);
        setIsError(false);
      } else {
        setProjects([]);
        setCategories(['All']);
        setIsError(true);
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setProjects([]);
      setCategories(['All']);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProjects();
  }, [loadProjects]);

  // Derive the filtered list
  const filteredProjects = useMemo(() => {
    let filtered = projects;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.technologies?.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
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
              {categories.length > 1 && (
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
              )}
            </div>

            {/* Loading Skeletons */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 animate-pulse">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="bg-white border border-zinc-200 rounded-3xl overflow-hidden h-96 flex flex-col">
                    <div className="h-56 bg-zinc-200 w-full" />
                    <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                      <div className="h-6 bg-zinc-200 rounded w-2/3" />
                      <div className="h-4 bg-zinc-100 rounded w-full" />
                      <div className="flex gap-2">
                        <div className="h-6 bg-zinc-200 rounded w-16" />
                        <div className="h-6 bg-zinc-200 rounded w-20" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : isError || projects.length === 0 ? (
              <div className="py-12">
                <BackendStatusCard
                  title="Projects Service Offline"
                  resourceName="project catalog"
                  onRetry={loadProjects}
                  theme="light"
                />
              </div>
            ) : filteredProjects.length > 0 ? (
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
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-50 to-zinc-100">
                          <Code2 className="w-12 h-12 text-indigo-400" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md border border-zinc-200/80 text-zinc-900 text-[11px] font-bold uppercase tracking-wider rounded-full shadow-xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900 mb-2 group-hover:text-indigo-600 transition-colors">
                          {project.title}
                        </h2>
                        <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 mb-6">
                          {project.description}
                        </p>
                      </div>

                      {/* Tech Stack Pills */}
                      <div className="space-y-4 pt-4 border-t border-zinc-100">
                        <div className="flex flex-wrap gap-1.5">
                          {project.technologies?.slice(0, 4).map((tech, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-1 bg-zinc-50 border border-zinc-200/60 text-zinc-600 text-xs font-medium rounded-lg"
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies?.length > 4 && (
                            <span className="px-2 py-1 text-xs text-zinc-400 font-medium">
                              +{project.technologies.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* View Case Study CTA */}
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                            View Case Study &rarr;
                          </span>
                          {project.completion_date && (
                            <span className="text-xs text-zinc-400 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {project.completion_date}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white border border-zinc-200 rounded-3xl p-8">
                <p className="text-zinc-600 font-medium">No projects matched your filters.</p>
                <button
                  type="button"
                  onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                  className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-500 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

          </div>
        </section>
      </MovingTextBg>
    </div>
  );
}
