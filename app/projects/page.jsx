'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Calendar, Code2, Filter, Search } from 'lucide-react';
import MovingTextBg from '../components/MovingTextBg';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    // Load projects data
    fetch('/projects.json')
      .then(res => res.json())
      .then(data => {
        setProjects(data);
        setFilteredProjects(data);

        // Extract unique categories
        const uniqueCategories = ['All', ...new Set(data.map(p => p.category))];
        setCategories(uniqueCategories);
      })
      .catch(err => console.error('Error loading projects:', err));
  }, []);

  // Filter projects
  useEffect(() => {
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

    setFilteredProjects(filtered);
  }, [selectedCategory, searchQuery, projects]);

  return (
    <div className="bg-background text-foreground min-h-screen">
      <MovingTextBg text="PROJECTS " textColor="text-gray-400">

        {/* Big Hero Section */}
        <section className="relative w-full pt-48 pb-24 px-4 md:px-12 lg:px-24">
          <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
            <h1 className="text-[15vw] sm:text-[12vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter uppercase text-foreground mix-blend-difference">
              OUR <span className="text-purple-600">PROJECTS</span>
            </h1>

            <div className="max-w-2xl mx-auto mt-12">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                Discover our portfolio of innovative solutions and successful projects delivered to clients worldwide.
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Section */}
        <section className="relative w-full py-24 px-4 md:px-12 lg:px-24">
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
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl bg-white text-gray-900 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              {/* Category Filter */}
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter className="w-5 h-5" />
                  <span className="font-medium">Filter:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedCategory === category
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-500'
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
                    className="group relative bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl"
                  >
                    {/* Full Card Link Overlay */}
                    <Link href={`/projects/${project.slug}`} className="absolute inset-0 z-0">
                      <span className="sr-only">View {project.title}</span>
                    </Link>

                    {/* Project Image */}
                    <div className="relative h-72 overflow-hidden bg-purple-100">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Code2 className="w-24 h-24 text-purple-200" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-sm font-medium text-purple-600">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Project Content */}
                    <div className="p-6 relative z-10 pointer-events-none">
                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                        {project.title}
                      </h3>

                      {/* Subtitle */}
                      <p className="text-gray-600 mb-4">
                        {project.subtitle}
                      </p>

                      {/* Description */}
                      <p className="text-gray-700 mb-6 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.technologies.slice(0, 5).map((tech, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-purple-50 text-purple-600 rounded-lg text-sm font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>

                      {/* Footer */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200 pointer-events-auto">
                        {/* Date */}
                        <div className="flex items-center gap-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">
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
                              className="text-sm font-medium text-purple-600 hover:text-purple-800 transition-colors flex items-center gap-1 relative z-20"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {project.liveUrl.replace(/^https?:\/\//, '')} <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
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
