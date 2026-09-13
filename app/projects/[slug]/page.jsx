'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  User,
  CheckCircle2,
  Code2,
  AlertCircle,
  Sparkles,
  Flame,
  Check,
  Copy,
  Terminal,
  Layers
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import MovingTextBg from '../../components/MovingTextBg';
import initialProjects from '../../../public/projects.json';

const TECH_ICON_MAP = {
  python: "/icons/devicon/python.svg",
  django: "/icons/devicon/django.svg",
  "django rest": "/icons/devicon/django.svg",
  "django rest framework": "/icons/devicon/django.svg",
  fastapi: "/icons/devicon/fastapi.svg",
  docker: "/icons/devicon/docker.svg",
  nginx: "/icons/devicon/nginx.svg",
  "next.js": "/icons/devicon/nextjs.svg",
  nextjs: "/icons/devicon/nextjs.svg",
  react: "/icons/devicon/react.svg",
  redux: "/icons/devicon/react.svg",
  "redux toolkit": "/icons/devicon/react.svg",
  postgresql: "/icons/devicon/postgresql.svg",
  postgres: "/icons/devicon/postgresql.svg",
  redis: "/icons/devicon/redis.svg",
  sqlite: "/icons/devicon/sqlite.svg",
  mongodb: "/icons/devicon/mongodb.svg",
  celery: "/icons/flaticon/celery.png",
  gcp: "/icons/devicon/googlecloud.svg",
  "google cloud": "/icons/devicon/googlecloud.svg",
  frappe: "/icons/flaticon/frappe.png",
  erpnext: "/icons/flaticon/frappe.png",
  "tailwind css": "/icons/devicon/tailwindcss.svg",
  tailwindcss: "/icons/devicon/tailwindcss.svg",
  flask: "/icons/devicon/flask.svg",
  pandas: "/icons/devicon/python.svg",
  numpy: "/icons/devicon/python.svg",
  "delta exchange": "/icons/flaticon/ai-driven.png",
  "vector embeddings": "/icons/flaticon/ai-driven.png",
  "ai search": "/icons/flaticon/ai-driven.png",
  "jinja templating": "/icons/devicon/html5.svg",
  jinja: "/icons/devicon/html5.svg",
  "material ui": "/icons/devicon/react.svg",
  "shadcn ui": "/icons/devicon/tailwindcss.svg",
  javascript: "/icons/devicon/javascript.svg",
  typescript: "/icons/devicon/typescript.svg",
  html5: "/icons/devicon/html5.svg",
  css3: "/icons/devicon/css3.svg",
  git: "/icons/devicon/git.svg",
  github: "/icons/devicon/github.svg",
  postman: "/icons/devicon/postman.svg",
  figma: "/icons/devicon/figma.svg",
  mysql: "/icons/devicon/mysql.svg",
  "node.js": "/icons/devicon/nodejs.svg",
  nodejs: "/icons/devicon/nodejs.svg",
  express: "/icons/devicon/express.svg",
  "express.js": "/icons/devicon/express.svg",
  rabbitmq: "/icons/devicon/rabbitmq.svg",
  "linkedin api": "/icons/flaticon/reliable-delivery.png",
  "linkedin oauth": "/icons/flaticon/reliable-delivery.png",
};

function getTechIcon(name) {
  if (!name) return null;
  const key = name.toLowerCase().trim();
  if (TECH_ICON_MAP[key]) return TECH_ICON_MAP[key];

  for (const [k, v] of Object.entries(TECH_ICON_MAP)) {
    if (key.includes(k) || k.includes(key)) {
      return v;
    }
  }
  return null;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const initialProject = Array.isArray(initialProjects) ? initialProjects.find(p => p.slug === slug) : null;
  const [project, setProject] = useState(initialProject || null);
  const [isLoading, setIsLoading] = useState(!initialProject);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [copiedIndex, setCopiedIndex] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch('/projects.json');
        const projects = await response.json();
        const foundProject = projects.find(p => p.slug === slug);

        if (!foundProject) {
          setIsLoading(false);
          return;
        }

        setProject(prev => {
          if (JSON.stringify(prev) === JSON.stringify(foundProject)) return prev;
          return foundProject;
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching project:', error);
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const formatCode = (code) => {
    return code.trim().replace(/\r\n/g, '\n').replace(/\r/g, '\n');
  };

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  // Helper function to extract video ID from YouTube URL
  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const VideoPlayer = ({ url }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const videoId = getYoutubeVideoId(url);

    if (!videoId) return null;

    return (
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-semibold mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>Live Demo</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-6">
          Watch System Walkthrough
        </h2>
        <div className="relative aspect-video rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-zinc-200 bg-zinc-950">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full group cursor-pointer"
              aria-label="Play video"
            >
              <Image
                src={`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`}
                alt="Video thumbnail"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110">
                  <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                </div>
              </div>
            </button>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            ></iframe>
          )}
        </div>
      </div>
    );
  };

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              {section.title}
            </h3>
            <p className="text-zinc-600 leading-relaxed whitespace-pre-wrap text-sm sm:text-base">
              {section.content}
            </p>
          </div>
        );

      case 'bullets':
        return (
          <div key={index} className="bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-8">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-5 flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-600" />
              {section.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {section.items?.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3 p-3.5 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                  <span className="text-zinc-700 text-xs sm:text-sm font-medium leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-8 overflow-hidden">
            <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-5">
              {section.title}
            </h3>
            <div className="overflow-x-auto rounded-2xl border border-zinc-200">
              <table className="min-w-full divide-y divide-zinc-200">
                <thead className="bg-zinc-50">
                  <tr>
                    {section.headers?.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="px-6 py-3.5 text-left text-xs font-bold text-zinc-500 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-zinc-100">
                  {section.rows?.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-zinc-50/80 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 text-xs sm:text-sm text-zinc-700 font-medium"
                        >
                          {(() => {
                            const icon = getTechIcon(cell);
                            if (icon && cellIndex > 0) {
                              return (
                                <span className="inline-flex items-center gap-2">
                                  <img src={icon} alt="" className="w-4 h-4 object-contain shrink-0" />
                                  <span>{cell}</span>
                                </span>
                              );
                            }
                            return cell;
                          })()}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'note':
        return (
          <div key={index} className="bg-indigo-50/60 border border-indigo-200/80 rounded-3xl p-6 sm:p-7 mb-8">
            <div className="flex items-start gap-3.5">
              <AlertCircle className="w-5 h-5 text-indigo-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-sm font-bold text-indigo-950 uppercase tracking-wider mb-1">
                  {section.title}
                </h4>
                <p className="text-indigo-900/80 text-sm leading-relaxed whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div key={index} className="rounded-3xl overflow-hidden border border-zinc-200/90 shadow-[0_4px_20px_rgb(0,0,0,0.03)] bg-white mb-8">
            <div className="relative h-80 sm:h-96 w-full">
              <Image
                src={section.url}
                alt={section.alt || section.title}
                fill
                className="object-cover"
              />
            </div>
            {section.caption && (
              <div className="p-4 bg-zinc-50 border-t border-zinc-100 text-center">
                <p className="text-xs text-zinc-500 italic">
                  {section.caption}
                </p>
              </div>
            )}
          </div>
        );

      case 'code':
        return (
          <div key={index} className="rounded-3xl overflow-hidden border border-zinc-800 shadow-2xl bg-[#1e1e1e] mb-8">
            <div className="bg-[#252528] px-5 py-3 flex items-center justify-between border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-mono ml-2">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>{section.title || section.language}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleCopyCode(section.content, index)}
                className="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-white transition-colors"
                aria-label="Copy code"
              >
                {copiedIndex === index ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            <SyntaxHighlighter
              language={section.language || 'python'}
              style={vscDarkPlus}
              showLineNumbers={true}
              customStyle={{
                margin: 0,
                padding: '1.25rem',
                background: '#1e1e1e',
                fontSize: '13px',
                lineHeight: '1.6',
              }}
            >
              {formatCode(section.content)}
            </SyntaxHighlighter>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcfcfd] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#fcfcfd] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white border border-zinc-200 rounded-3xl p-8 text-center shadow-lg">
          <Code2 className="w-12 h-12 text-zinc-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Project Not Found</h1>
          <p className="text-zinc-500 text-sm mb-6">
            The project you are looking for does not exist or has moved.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-zinc-900 hover:bg-black text-white rounded-full text-xs font-semibold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfcfd] text-zinc-900 min-h-screen relative">
      <MovingTextBg text={project?.title?.toUpperCase() || "PROJECT"} textColor="text-gray-400">
        
        <main className="max-w-5xl mx-auto pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Top Back Breadcrumb */}
          <div className="mb-8">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-zinc-200/90 text-zinc-600 hover:text-indigo-600 hover:border-indigo-200 transition-all text-xs font-semibold shadow-[0_2px_10px_rgb(0,0,0,0.03)] group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Projects</span>
            </Link>
          </div>

          {/* Project Header */}
          <div className="mb-10 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              <span>{project.category}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] mb-4">
              {project.title}
            </h1>

            <p className="text-base sm:text-xl text-zinc-500 font-normal leading-relaxed max-w-3xl">
              {project.subtitle}
            </p>
          </div>

          {/* Metadata & Quick Action Bento Bar */}
          <div className="bg-white border border-zinc-200/90 rounded-3xl p-5 sm:p-6 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-600">
              {project.client && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-600">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Client</span>
                    <span className="font-semibold text-zinc-800">{project.client}</span>
                  </div>
                </div>
              )}

              {project.startDate && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-600">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Duration</span>
                    <span className="font-semibold text-zinc-800">
                      {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                      {project.endDate ? ` - ${new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}` : ''}
                    </span>
                  </div>
                </div>
              )}

              {project.status && (
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div>
                    <span className="text-[10px] text-zinc-400 font-bold uppercase tracking-wider block">Status</span>
                    <span className="font-semibold text-zinc-800">{project.status}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Outbound Links */}
            <div className="flex flex-wrap items-center gap-3 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-zinc-100">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Live App</span>
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>Source Code</span>
                </a>
              )}
            </div>
          </div>

          {/* Hero Feature Image */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] max-h-[500px] rounded-3xl overflow-hidden border border-zinc-200/90 shadow-[0_8px_30px_rgb(0,0,0,0.06)] bg-zinc-950 mb-12 group">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Code2 className="w-24 h-24 text-zinc-700" />
              </div>
            )}
          </div>

          {/* Technologies Used Grid with Real Icons */}
          {project.technologies && project.technologies.length > 0 && (
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-12">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                <h2 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">
                  Architecture & Technologies
                </h2>
              </div>
              <p className="text-xs text-zinc-500 mb-6">Core technologies, frameworks, and APIs powering this project.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {project.technologies.map((tech, index) => {
                  const iconSrc = getTechIcon(tech);
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-2xl bg-zinc-50/80 hover:bg-white border border-zinc-200/80 hover:border-indigo-300 hover:shadow-xs transition-all duration-200 group"
                    >
                      <div className="w-8 h-8 rounded-xl bg-white border border-zinc-200/80 flex items-center justify-center p-1.5 shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                        {iconSrc ? (
                          <img src={iconSrc} alt={tech} className="w-full h-full object-contain" />
                        ) : (
                          <span className="text-[10px] font-mono font-bold text-indigo-600">&lt;/&gt;</span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <span className="block text-xs sm:text-sm font-semibold text-zinc-800 truncate group-hover:text-indigo-600 transition-colors">
                          {tech}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* YouTube Video Walkthrough if available */}
          {project.youtubeUrl && <VideoPlayer url={project.youtubeUrl} />}

          {/* Project Overview */}
          {project.content?.overview && (
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-9 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Summary</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 tracking-tight mb-4">
                Project Overview
              </h2>
              <p className="text-zinc-600 leading-relaxed text-sm sm:text-base font-normal">
                {project.content.overview}
              </p>
            </div>
          )}

          {/* Challenge & Solution Side-by-Side Bento Cards */}
          {(project.content?.challenge || project.content?.solution) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              {project.content?.challenge && (
                <div className="bg-gradient-to-br from-amber-50/60 to-white border border-amber-200/80 rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-amber-100/80 border border-amber-200 flex items-center justify-center text-amber-700 mb-5">
                      <Flame className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                      The Bottleneck
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-3">
                      The Challenge
                    </h3>
                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                      {project.content.challenge}
                    </p>
                  </div>
                </div>
              )}

              {project.content?.solution && (
                <div className="bg-gradient-to-br from-indigo-50/60 to-white border border-indigo-200/80 rounded-3xl p-7 sm:p-8 shadow-[0_4px_20px_rgb(0,0,0,0.02)] flex flex-col justify-between">
                  <div>
                    <div className="w-10 h-10 rounded-2xl bg-indigo-100/80 border border-indigo-200 flex items-center justify-center text-indigo-700 mb-5">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider block mb-1">
                      Our Approach
                    </span>
                    <h3 className="text-xl font-bold text-zinc-900 tracking-tight mb-3">
                      The Solution
                    </h3>
                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed">
                      {project.content.solution}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Dynamic Sections (Bullets, Tables, Notes, Code blocks) */}
          {project.content?.sections?.map((section, index) => renderSection(section, index))}

          {/* Results & Measurable Impact */}
          {project.content?.results && (
            <div className="bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-200/90 rounded-3xl p-7 sm:p-9 shadow-[0_4px_20px_rgb(0,0,0,0.02)] mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">
                    Proven Outcomes
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                    Results & Impact
                  </h3>
                </div>
              </div>
              <p className="text-zinc-700 text-sm sm:text-base leading-relaxed pl-0 sm:pl-13">
                {project.content.results}
              </p>
            </div>
          )}

          {/* Gallery View */}
          {project.gallery && project.gallery.length > 0 && (
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-9 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-12">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight mb-6">
                Project Gallery
              </h2>

              <div className="space-y-4">
                {/* Active Main Preview */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-950">
                  <Image
                    src={project.gallery[activeGalleryImage]}
                    alt={`${project.title} screenshot ${activeGalleryImage + 1}`}
                    fill
                    className="object-contain sm:object-cover"
                  />
                </div>

                {/* Thumbnail Picker */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveGalleryImage(idx)}
                      className={`relative aspect-[16/10] rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeGalleryImage === idx
                          ? "border-indigo-600 shadow-sm"
                          : "border-zinc-200 hover:border-zinc-300 opacity-70 hover:opacity-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Client Testimonial */}
          {project.testimonial && (
            <div className="bg-white border border-zinc-200/90 rounded-3xl p-7 sm:p-9 shadow-[0_4px_20px_rgb(0,0,0,0.03)] mb-12 relative overflow-hidden">
              <span className="text-5xl font-serif text-indigo-200 leading-none absolute top-4 right-6 select-none pointer-events-none">
                “
              </span>
              <p className="text-base sm:text-lg text-zinc-700 italic leading-relaxed mb-6 relative z-10">
                &ldquo;{project.testimonial.text}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                  {project.testimonial.author?.charAt(0) || "C"}
                </div>
                <div>
                  <p className="text-sm font-bold text-zinc-900">{project.testimonial.author}</p>
                  <p className="text-xs text-zinc-400">{project.testimonial.position}</p>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Back Button */}
          <div className="pt-6 border-t border-zinc-200/80 flex items-center justify-between">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 hover:bg-black text-white text-xs font-semibold transition-colors shadow-xs group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to All Projects</span>
            </Link>

            <span className="text-xs text-zinc-400 font-mono">
              NJTechStudio Case Study
            </span>
          </div>

        </main>
      </MovingTextBg>
    </div>
  );
}
