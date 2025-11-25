'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowLeft,
  ExternalLink,
  Github,
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Code2,
  AlertCircle
} from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug;
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);

  useEffect(() => {
    // Fetch project by slug
    const fetchProject = async () => {
      try {
        const response = await fetch('/projects.json');
        const projects = await response.json();
        const foundProject = projects.find(p => p.slug === slug);

        if (!foundProject) {
          setIsLoading(false);
          return;
        }

        setProject(foundProject);
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

  const renderSection = (section, index) => {
    switch (section.type) {
      case 'text':
        return (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
              {section.content}
            </p>
          </div>
        );

      case 'bullets':
        return (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h3>
            <ul className="space-y-3">
              {section.items?.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );

      case 'table':
        return (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h3>
            <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    {section.headers?.map((header, headerIndex) => (
                      <th
                        key={headerIndex}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                  {section.rows?.map((row, rowIndex) => (
                    <tr key={rowIndex} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                      {row.map((cell, cellIndex) => (
                        <td
                          key={cellIndex}
                          className="px-6 py-4 text-sm text-gray-900 dark:text-gray-100"
                        >
                          {cell}
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
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h3>
            <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-6 rounded-r-lg">
              <div className="flex items-start">
                <AlertCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                <p className="text-blue-900 dark:text-blue-200 whitespace-pre-wrap">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        );

      case 'image':
        return (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h3>
            <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
              <div className="relative h-96">
                <Image
                  src={section.url}
                  alt={section.alt || section.title}
                  fill
                  className="object-cover"
                />
              </div>
              {section.caption && (
                <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400 text-center italic">
                    {section.caption}
                  </p>
                </div>
              )}
            </div>
          </div>
        );

      case 'code':
        return (
          <div key={index} className="mb-10">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {section.title}
            </h3>
            <div className="rounded-lg overflow-hidden border border-gray-700 shadow-2xl">
              <div className="bg-[#2d2d30] px-4 py-2 flex items-center justify-between border-b border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <span className="ml-2 text-gray-400 text-xs font-mono">
                    {section.language}
                  </span>
                </div>
              </div>
              <SyntaxHighlighter
                language={section.language}
                style={vscDarkPlus}
                showLineNumbers={true}
                customStyle={{
                  margin: 0,
                  padding: '1rem',
                  background: '#1e1e1e',
                  fontSize: '14px',
                  lineHeight: '1.5'
                }}
              >
                {formatCode(section.content)}
              </SyntaxHighlighter>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Project Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The project you're looking for doesn't exist.
        </p>
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    );
  }

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
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
          Project Demo
        </h2>
        <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-700 bg-gray-900">
          {!isPlaying ? (
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 w-full h-full group cursor-pointer"
              aria-label="Play video"
            >
              <Image
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt="Video thumbnail"
                fill
                className="object-cover transition-opacity group-hover:opacity-90"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-600 rounded-full flex items-center justify-center shadow-lg transform transition-transform group-hover:scale-110">
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

  return (
    <div className="min-h-screen py-8 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 mb-6 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>

        <article className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-[500px] w-full bg-gradient-to-br from-indigo-500 to-indigo-600">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Code2 className="w-32 h-32 text-white opacity-50" />
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            {/* Hero Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="px-4 py-1.5 bg-indigo-600/80 backdrop-blur-sm rounded-full text-sm font-medium">
                  {project.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-3">
                {project.title}
              </h1>
              <p className="text-xl text-gray-200 mb-4">
                {project.subtitle}
              </p>
            </div>
          </div>

          {/* Project Info Bar */}
          <div className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 p-6">
            <div className="flex flex-wrap gap-6">
              {project.client && (
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
                    <p className="font-medium">{project.client}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Calendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium">
                    {new Date(project.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                    {' - '}
                    {new Date(project.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
              <div className="ml-auto flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                  >
                    <ExternalLink className="w-5 h-5" />
                    {project.liveUrl.replace(/^https?:\/\//, '')}
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors font-medium"
                  >
                    <Github className="w-5 h-5" />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {/* Technologies */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded-lg text-sm font-medium border border-indigo-200 dark:border-indigo-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* YouTube Video Section */}
            {project.youtubeUrl && <VideoPlayer url={project.youtubeUrl} />}

            {/* Overview */}
            {project.content?.overview && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Project Overview
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {project.content.overview}
                </p>
              </div>
            )}

            {/* Challenge */}
            {project.content?.challenge && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  The Challenge
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {project.content.challenge}
                </p>
              </div>
            )}

            {/* Solution */}
            {project.content?.solution && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Our Solution
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                  {project.content.solution}
                </p>
              </div>
            )}

            {/* Sections */}
            {project.content?.sections?.map((section, index) => renderSection(section, index))}

            {/* Results */}
            {project.content?.results && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  Results & Impact
                </h2>
                <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    {project.content.results}
                  </p>
                </div>
              </div>
            )}

            {/* Gallery */}
            {project.gallery && project.gallery.length > 0 && (
              <div className="mb-12">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                  Project Gallery
                </h2>
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                    <Image
                      src={project.gallery[activeGalleryImage]}
                      alt={`${project.title} - Image ${activeGalleryImage + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-4">
                    {project.gallery.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveGalleryImage(index)}
                        className={`relative h-24 rounded-lg overflow-hidden border-2 transition-all ${activeGalleryImage === index
                          ? 'border-indigo-600 dark:border-indigo-400'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-400'
                          }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <div className="mt-12 bg-gradient-to-r from-indigo-50 to-indigo-50 dark:from-indigo-900/20 dark:to-indigo-900/20 rounded-2xl p-8 border border-indigo-200 dark:border-indigo-800">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Client Testimonial
                </h2>
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 italic mb-4">
                  "{project.testimonial.text}"
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {project.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {project.testimonial.author}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {project.testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
