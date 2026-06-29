'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Mail, FolderGit2, MessageSquareQuote, Youtube, 
  Cpu, HelpCircle, Send, LogOut, KeyRound, Plus, Trash2, Edit, 
  CheckCircle2, XCircle, ExternalLink, Clock, Sparkles, AlertCircle,
  Menu, X, ChevronRight, Check, RefreshCw
} from 'lucide-react';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [secretKey, setSecretKey] = useState('');
  const [authError, setAuthError] = useState('');
  const [checkingSession, setCheckingSession] = useState(true);
  const [submittingAuth, setSubmittingAuth] = useState(false);

  // Active tab
  const [activeTab, setActiveTab] = useState('overview');
  
  // Data states
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [skills, setSkills] = useState({ backend: [], frontend: [], database: [], 'other-tools': [] });
  const [faqs, setFaqs] = useState([]);
  const [leads, setLeads] = useState([]);
  
  // Loading & refresh states
  const [loadingData, setLoadingData] = useState(false);
  const [savingData, setSavingData] = useState(false);
  const [apiMessage, setApiMessage] = useState({ type: '', text: '' });

  // Leads filters
  const [leadsFilter, setLeadsFilter] = useState('all'); // all, pending, replied

  // Pagination states
  const [leadsPage, setLeadsPage] = useState(1);
  const [projectsPage, setProjectsPage] = useState(1);
  const [testimonialsPage, setTestimonialsPage] = useState(1);
  const [youtubePage, setYoutubePage] = useState(1);
  const [faqsPage, setFaqsPage] = useState(1);

  const itemsPerPage = {
    leads: 5,
    projects: 6,
    testimonials: 6,
    youtube: 6,
    faqs: 5
  };

  // Reset pagination on filter change
  useEffect(() => {
    setLeadsPage(1);
  }, [leadsFilter]);

  // Reset all paginations on tab change
  useEffect(() => {
    setLeadsPage(1);
    setProjectsPage(1);
    setTestimonialsPage(1);
    setYoutubePage(1);
    setFaqsPage(1);
  }, [activeTab]);

  // Modal / Form Editor states
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorType, setEditorType] = useState(''); // projects, testimonials, youtube, solutions, faqs
  const [editItem, setEditItem] = useState(null); // null means "new"

  // Lead reply dialog state
  const [isReplyOpen, setIsReplyOpen] = useState(false);
  const [activeLead, setActiveLead] = useState(null);
  const [replyBody, setReplyBody] = useState('');
  const [sendingReply, setSendingReply] = useState(false);

  // Mobile menu
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Check existing session on load
  useEffect(() => {
    fetch('/api/admin/check-session')
      .then(res => res.json())
      .then(data => {
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchAllData();
        }
        setCheckingSession(false);
      })
      .catch(() => {
        setCheckingSession(false);
      });
  }, []);

  // Fetch all DB content
  const fetchAllData = async () => {
    setLoadingData(true);
    try {
      const endpoints = [
        { key: 'projects', url: '/api/admin/data?type=projects' },
        { key: 'testimonials', url: '/api/admin/data?type=testimonials' },
        { key: 'youtube', url: '/api/admin/data?type=youtube' },
        { key: 'solutions', url: '/api/admin/data?type=solutions' },
        { key: 'skills', url: '/api/admin/data?type=skills' },
        { key: 'faqs', url: '/api/admin/data?type=faqs' },
        { key: 'leads', url: '/api/admin/submissions' }
      ];

      const results = await Promise.all(
        endpoints.map(e => 
          fetch(e.url)
            .then(res => {
              if (res.status === 401) throw new Error('Unauthorized');
              return res.json();
            })
            .catch(() => null)
        )
      );

      results.forEach((data, index) => {
        if (data === null) return;
        const key = endpoints[index].key;
        if (key === 'projects') setProjects(data);
        else if (key === 'testimonials') setTestimonials(data);
        else if (key === 'youtube') setYoutubeVideos(data);
        else if (key === 'solutions') setSolutions(data);
        else if (key === 'skills') setSkills(data);
        else if (key === 'faqs') setFaqs(data);
        else if (key === 'leads') setLeads(data);
      });
    } catch (err) {
      if (err.message === 'Unauthorized') {
        setIsAuthenticated(false);
      }
    } finally {
      setLoadingData(false);
    }
  };

  // Handle Admin login
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!secretKey) return;
    setSubmittingAuth(true);
    setAuthError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secretKey })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchAllData();
      } else {
        setAuthError(data.error || 'Authentication failed');
      }
    } catch (err) {
      setAuthError('An error occurred during authentication');
    } finally {
      setSubmittingAuth(false);
    }
  };

  // Handle Admin logout
  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
      setIsAuthenticated(false);
      setSecretKey('');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  // Trigger global message
  const triggerMessage = (type, text) => {
    setApiMessage({ type, text });
    setTimeout(() => setApiMessage({ type: '', text: '' }), 4000);
  };

  // Save changes to API
  const saveJsonData = async (type, updatedArray) => {
    setSavingData(true);
    try {
      const res = await fetch(`/api/admin/data?type=${type}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedArray)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        triggerMessage('success', `${type.toUpperCase()} saved successfully!`);
        fetchAllData();
      } else {
        triggerMessage('error', data.error || 'Failed to save data');
      }
    } catch (err) {
      triggerMessage('error', 'Network error occurred while saving');
    } finally {
      setSavingData(false);
    }
  };

  // Delete Item Action
  const handleDeleteItem = (type, id) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    if (type === 'projects') {
      const updated = projects.filter(p => p.id !== id);
      setProjects(updated);
      saveJsonData('projects', updated);
    } else if (type === 'testimonials') {
      const updated = testimonials.filter(t => t.id !== id);
      setTestimonials(updated);
      saveJsonData('testimonials', updated);
    } else if (type === 'youtube') {
      const updated = youtubeVideos.filter(y => y.videoId !== id);
      setYoutubeVideos(updated);
      saveJsonData('youtube', updated);
    } else if (type === 'solutions') {
      const updated = solutions.filter(s => s.id !== id);
      setSolutions(updated);
      saveJsonData('solutions', updated);
    } else if (type === 'faqs') {
      const updated = faqs.filter(f => f.id !== id);
      setFaqs(updated);
      saveJsonData('faqs', updated);
    }
  };

  // Edit / Add Item Submit
  const handleEditorSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    if (editorType === 'projects') {
      const techVal = formData.get('technologies') || '';
      const techArray = techVal.split(',').map(t => t.trim()).filter(Boolean);
      
      const projectData = {
        id: editItem ? editItem.id : Date.now(),
        slug: formData.get('slug'),
        title: formData.get('title'),
        subtitle: formData.get('subtitle'),
        description: formData.get('description'),
        image: formData.get('image'),
        featured: formData.get('featured') === 'true',
        category: formData.get('category'),
        technologies: techArray,
        liveUrl: formData.get('liveUrl'),
        githubUrl: formData.get('githubUrl'),
        startDate: formData.get('startDate'),
        endDate: formData.get('endDate') || 'Present',
        status: formData.get('status') || 'Live',
        client: formData.get('client') || 'NJ Tech Studio',
        content: {
          overview: formData.get('overview'),
          challenge: formData.get('challenge'),
          solution: formData.get('solution'),
          sections: editItem?.content?.sections || [],
          results: formData.get('results') || ''
        },
        gallery: editItem?.gallery || [formData.get('image')],
        testimonial: {
          text: formData.get('testimonialText') || '',
          author: formData.get('testimonialAuthor') || '',
          position: formData.get('testimonialPos') || ''
        }
      };

      let updated;
      if (editItem) {
        updated = projects.map(p => p.id === editItem.id ? projectData : p);
      } else {
        updated = [...projects, projectData];
      }
      setProjects(updated);
      saveJsonData('projects', updated);

    } else if (editorType === 'testimonials') {
      const itemData = {
        id: editItem ? editItem.id : Date.now(),
        name: formData.get('name'),
        role: formData.get('role'),
        text: formData.get('text')
      };

      let updated;
      if (editItem) {
        updated = testimonials.map(t => t.id === editItem.id ? itemData : t);
      } else {
        updated = [...testimonials, itemData];
      }
      setTestimonials(updated);
      saveJsonData('testimonials', updated);

    } else if (editorType === 'youtube') {
      const itemData = {
        videoId: formData.get('videoId'),
        title: formData.get('title'),
        description: formData.get('description'),
        badge: formData.get('badge')
      };

      let updated;
      if (editItem) {
        updated = youtubeVideos.map(y => y.videoId === editItem.videoId ? itemData : y);
      } else {
        updated = [...youtubeVideos, itemData];
      }
      setYoutubeVideos(updated);
      saveJsonData('youtube', updated);

    } else if (editorType === 'solutions') {
      const itemData = {
        id: editItem ? editItem.id : Date.now(),
        label: formData.get('label'),
        title: formData.get('title'),
        description: formData.get('description'),
        image: formData.get('image'),
        layout: formData.get('layout') || 'left'
      };

      let updated;
      if (editItem) {
        updated = solutions.map(s => s.id === editItem.id ? itemData : s);
      } else {
        updated = [...solutions, itemData];
      }
      setSolutions(updated);
      saveJsonData('solutions', updated);

    } else if (editorType === 'faqs') {
      const itemData = {
        id: editItem ? editItem.id : Date.now(),
        question: formData.get('question'),
        answer: formData.get('answer')
      };

      let updated;
      if (editItem) {
        updated = faqs.map(f => f.id === editItem.id ? itemData : f);
      } else {
        updated = [...faqs, itemData];
      }
      setFaqs(updated);
      saveJsonData('faqs', updated);
    }

    setIsEditorOpen(false);
    setEditItem(null);
  };

  // Skills Management Add / Delete
  const handleAddSkill = (category, e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.skillName.value.trim();
    const icon = form.skillIcon.value.trim();

    if (!name) return;

    const newSkill = { name, icon };
    const updatedCategory = [...(skills[category] || []), newSkill];
    const updatedSkills = { ...skills, [category]: updatedCategory };
    
    setSkills(updatedSkills);
    saveJsonData('skills', updatedSkills);
    form.reset();
  };

  const handleDeleteSkill = (category, skillIndex) => {
    if (!confirm('Delete this skill badge?')) return;
    const updatedCategory = skills[category].filter((_, idx) => idx !== skillIndex);
    const updatedSkills = { ...skills, [category]: updatedCategory };

    setSkills(updatedSkills);
    saveJsonData('skills', updatedSkills);
  };

  // Lead Reply submit handler
  const handleSendReplySubmit = async (e) => {
    e.preventDefault();
    if (!replyBody.trim()) return;

    setSendingReply(true);
    try {
      const res = await fetch('/api/admin/submissions/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId: activeLead.id,
          replyMessage: replyBody
        })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        triggerMessage('success', 'Reply email sent successfully!');
        
        // Update local state list
        setLeads(prevLeads => 
          prevLeads.map(lead => {
            if (lead.id === activeLead.id) {
              return {
                ...lead,
                replied: true,
                replies: [...(lead.replies || []), data.reply]
              };
            }
            return lead;
          })
        );

        setIsReplyOpen(false);
        setReplyBody('');
      } else {
        triggerMessage('error', data.error || 'Failed to send reply');
      }
    } catch (err) {
      triggerMessage('error', 'Network error sending reply');
    } finally {
      setSendingReply(false);
    }
  };

  // Navigation tabs config
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'leads', label: 'Leads / Inquiries', icon: Mail, badge: leads.filter(l => !l.replied).length },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { id: 'youtube', label: 'YouTube Videos', icon: Youtube },
    { id: 'solutions', label: 'Home Sections', icon: Sparkles },
    { id: 'skills', label: 'Tech Stack', icon: Cpu },
    { id: 'faqs', label: 'FAQs', icon: HelpCircle },
  ];

  if (checkingSession) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
          <p className="text-slate-500 font-medium">Verifying admin session...</p>
        </div>
      </div>
    );
  }

  // --- LIGHT LOGIN UI ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 relative flex items-center justify-center px-4 overflow-hidden">
        {/* Soft background glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-200/40 rounded-full blur-3xl animate-pulse delay-700"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-60"></div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative w-full max-w-md bg-white border border-slate-200 rounded-3xl p-8 shadow-xl z-10"
        >
          {/* Logo */}
          <div className="text-center mb-8">
            <span className="font-normal tracking-wide text-4xl md:text-5xl leading-none" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
              <span className="text-indigo-600">NJ</span><span className="text-slate-900">TechStudio</span>
            </span>
            <p className="text-slate-500 text-sm mt-2 font-medium">Admin Dashboard Authentication</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-slate-700 text-xs font-semibold uppercase tracking-wider mb-2" htmlFor="secretKey">
                Secret Key
              </label>
              <div className="relative">
                <KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="secretKey"
                  type="password"
                  value={secretKey}
                  onChange={(e) => setSecretKey(e.target.value)}
                  placeholder="Enter admin secret key"
                  className="w-full pl-11 pr-4 py-3 bg-white border border-slate-250 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-slate-800 rounded-xl outline-none transition-all placeholder:text-slate-350 text-sm"
                  required
                />
              </div>
            </div>

            {authError && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-650 text-xs font-medium"
              >
                <AlertCircle className="w-4 h-4 shrink-0 text-red-550" />
                <span>{authError}</span>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={submittingAuth}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors shadow-lg hover:shadow-indigo-500/10 text-sm flex items-center justify-center gap-2"
            >
              {submittingAuth ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Unlock Console</span>
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- LIGHT DASHBOARD UI ---
  const filteredLeads = leads.filter(lead => {
    if (leadsFilter === 'pending') return !lead.replied;
    if (leadsFilter === 'replied') return lead.replied;
    return true;
  });

  // Pagination calculation for Leads
  const totalLeadsPages = Math.ceil(filteredLeads.length / itemsPerPage.leads);
  const paginatedLeads = filteredLeads.slice(
    (leadsPage - 1) * itemsPerPage.leads,
    leadsPage * itemsPerPage.leads
  );

  // Pagination calculation for Projects
  const totalProjectsPages = Math.ceil(projects.length / itemsPerPage.projects);
  const paginatedProjects = projects.slice(
    (projectsPage - 1) * itemsPerPage.projects,
    projectsPage * itemsPerPage.projects
  );

  // Pagination calculation for Testimonials
  const totalTestimonialsPages = Math.ceil(testimonials.length / itemsPerPage.testimonials);
  const paginatedTestimonials = testimonials.slice(
    (testimonialsPage - 1) * itemsPerPage.testimonials,
    testimonialsPage * itemsPerPage.testimonials
  );

  // Pagination calculation for Youtube Videos
  const totalYoutubePages = Math.ceil(youtubeVideos.length / itemsPerPage.youtube);
  const paginatedYoutube = youtubeVideos.slice(
    (youtubePage - 1) * itemsPerPage.youtube,
    youtubePage * itemsPerPage.youtube
  );

  // Pagination calculation for FAQs
  const totalFaqsPages = Math.ceil(faqs.length / itemsPerPage.faqs);
  const paginatedFaqs = faqs.slice(
    (faqsPage - 1) * itemsPerPage.faqs,
    faqsPage * itemsPerPage.faqs
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col lg:flex-row">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {apiMessage.text && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`fixed top-6 right-6 z-50 px-5 py-3.5 rounded-xl border shadow-xl flex items-center gap-3 backdrop-blur-md ${
              apiMessage.type === 'success' 
                ? 'bg-emerald-50 border-emerald-250 text-emerald-800' 
                : 'bg-red-50 border-red-250 text-red-800'
            }`}
          >
            {apiMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <AlertCircle className="w-5 h-5 text-red-655" />}
            <span className="text-sm font-semibold">{apiMessage.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-white border-r border-slate-200 flex flex-col shrink-0 shadow-xs">
        
        {/* Sidebar Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-normal tracking-wide text-2xl" style={{ fontFamily: "'Jersey 10', sans-serif" }}>
              <span className="text-indigo-600">NJ</span><span className="text-slate-900">TechStudio</span>
            </span>
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-1">Management Portal</span>
          </div>
          <button 
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)} 
            className="lg:hidden text-slate-500 hover:text-slate-800"
          >
            {isMobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className={`flex-1 p-4 space-y-1 ${isMobileNavOpen ? 'block' : 'hidden lg:block'}`}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileNavOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold ${
                  isActive 
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10' 
                    : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xxs font-bold ${
                    isActive ? 'bg-white text-indigo-600 shadow-xs' : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Logout section */}
        <div className={`p-4 border-t border-slate-100 ${isMobileNavOpen ? 'block' : 'hidden lg:block'}`}>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-red-655 hover:bg-red-50 hover:text-red-700 transition-colors rounded-xl text-sm font-semibold"
          >
            <LogOut className="w-4 h-4 text-red-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="px-8 py-5 border-b border-slate-200 flex items-center justify-between bg-white shadow-xxs">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold uppercase tracking-wider text-slate-800">
              {navItems.find(n => n.id === activeTab)?.label}
            </h1>
            {loadingData && (
              <RefreshCw className="w-4 h-4 text-indigo-600 animate-spin" />
            )}
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              onClick={fetchAllData} 
              className="p-2 text-slate-500 hover:text-slate-800 bg-white border border-slate-200 rounded-xl hover:bg-slate-55 transition-colors animate-fadeIn"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <a 
              href="/" 
              target="_blank" 
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-200 hover:bg-slate-55 hover:text-indigo-600 text-xs font-bold tracking-wider text-slate-600 rounded-xl transition-colors shadow-xxs"
            >
              <span>View Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </header>

        {/* Dashboard Panels */}
        <div className="flex-1 p-8 overflow-y-auto">
          {loadingData && projects.length === 0 ? (
            <div className="h-96 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <RefreshCw className="w-8 h-8 text-indigo-600 animate-spin" />
                <p className="text-slate-500 text-sm">Loading database...</p>
              </div>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
              >
                {/* --- 1. OVERVIEW TAB --- */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Unresolved Leads</p>
                        <p className="text-4xl font-extrabold text-indigo-600 mt-2">{leads.filter(l => !l.replied).length}</p>
                        <p className="text-xs text-slate-400 mt-2">Total submissions: {leads.length}</p>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Projects</p>
                        <p className="text-4xl font-extrabold text-violet-600 mt-2">{projects.length}</p>
                        <p className="text-xs text-slate-400 mt-2">Featured projects: {projects.filter(p => p.featured).length}</p>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">YouTube Videos</p>
                        <p className="text-4xl font-extrabold text-rose-600 mt-2">{youtubeVideos.length}</p>
                        <p className="text-xs text-slate-400 mt-2">Active cards on home</p>
                      </div>
                      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total Skills</p>
                        <p className="text-4xl font-extrabold text-emerald-600 mt-2">
                          {Object.values(skills).reduce((acc, curr) => acc + (curr?.length || 0), 0)}
                        </p>
                        <p className="text-xs text-slate-400 mt-2">Across 4 categories</p>
                      </div>
                    </div>

                    {/* Quick leads summary */}
                    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-4">
                        <h3 className="text-lg font-bold text-slate-800">Recent Leads</h3>
                        <button onClick={() => setActiveTab('leads')} className="text-xs font-bold text-indigo-600 hover:text-indigo-500">
                          View All Leads
                        </button>
                      </div>
                      {leads.length === 0 ? (
                        <p className="text-slate-400 text-sm py-4">No contact form submissions recorded yet.</p>
                      ) : (
                        <div className="divide-y divide-slate-100">
                          {leads.slice(0, 5).map(lead => (
                            <div key={lead.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div>
                                <p className="font-semibold text-slate-800 text-sm">{lead.name} <span className="text-slate-400 font-normal">({lead.email})</span></p>
                                <p className="text-slate-500 text-xs mt-0.5">{lead.subject} — <span className="text-slate-400">{new Date(lead.createdAt).toLocaleDateString()}</span></p>
                              </div>
                              <div>
                                {lead.replied ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                                    <Check className="w-3 h-3 text-emerald-600" /> Replied
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 border border-indigo-200 px-2.5 py-0.5 rounded-full">
                                    <Clock className="w-3 h-3 text-indigo-600 animate-pulse" /> Pending
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* --- 2. LEADS TAB --- */}
                {activeTab === 'leads' && (
                  <div className="space-y-6">
                    {/* Filters bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
                      <div className="flex gap-2">
                        {['all', 'pending', 'replied'].map((f) => (
                          <button
                            key={f}
                            onClick={() => setLeadsFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                              leadsFilter === f 
                                ? 'bg-indigo-600 text-white shadow-xs' 
                                : 'bg-slate-105 text-slate-600 hover:bg-slate-200 hover:text-slate-800'
                            }`}
                          >
                            {f === 'pending' ? 'Pending Reply' : f}
                          </button>
                        ))}
                      </div>
                      <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                        Found {filteredLeads.length} submission(s)
                      </span>
                    </div>

                    {/* Submissions list */}
                    {paginatedLeads.length === 0 ? (
                      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center text-slate-500 shadow-sm">
                        <Mail className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                        <p className="text-sm font-medium">No leads match this filter.</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {paginatedLeads.map((lead) => (
                          <div key={lead.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                            {/* Card Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-100 pb-4 mb-4 gap-3">
                              <div>
                                <h3 className="text-lg font-bold text-slate-800">{lead.name}</h3>
                                <div className="text-xs text-slate-500 mt-1 flex flex-wrap gap-x-4 gap-y-1">
                                  <span>Email: <span className="text-indigo-600 font-semibold">{lead.email}</span></span>
                                  <span>Phone: <span className="text-slate-700">{lead.phone || 'N/A'}</span></span>
                                  <span>Type: <span className="px-2 py-0.5 bg-slate-105 rounded text-slate-600 border border-slate-200">{lead.type || 'Contact'}</span></span>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-3">
                                <span className="text-xs text-slate-400 font-medium">{new Date(lead.createdAt).toLocaleString()}</span>
                                {lead.replied ? (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-xs font-bold">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Replied
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-indigo-50 border border-indigo-200 text-indigo-700 rounded-full text-xs font-bold">
                                    <Clock className="w-4 h-4 text-indigo-600" /> Pending
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Message content */}
                            <div className="space-y-3">
                              <div>
                                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">Subject</span>
                                <p className="font-semibold text-sm mt-0.5 text-slate-800">{lead.subject}</p>
                              </div>
                              <div>
                                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">Message</span>
                                <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl mt-1 text-sm text-slate-700 whitespace-pre-wrap leading-relaxed">
                                  {lead.message}
                                </div>
                              </div>
                            </div>

                            {/* Reply History */}
                            {lead.replies && lead.replies.length > 0 && (
                              <div className="mt-6 border-t border-slate-100 pt-4 space-y-4">
                                <span className="text-slate-400 text-[10px] uppercase font-bold tracking-widest block">Reply History</span>
                                {lead.replies.map((rep) => (
                                  <div key={rep.id} className="bg-indigo-50/50 border border-indigo-100 p-4 rounded-xl space-y-1">
                                    <div className="flex justify-between items-center text-xs text-indigo-700 font-bold mb-1">
                                      <span>Replied by Admin</span>
                                      <span className="text-slate-400 font-normal">{new Date(rep.createdAt).toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-slate-700 whitespace-pre-wrap">{rep.message}</p>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Actions */}
                            <div className="mt-6 flex justify-end">
                              <button
                                onClick={() => {
                                  setActiveLead(lead);
                                  setIsReplyOpen(true);
                                }}
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
                              >
                                <Send className="w-3.5 h-3.5" />
                                <span>{lead.replied ? 'Send Another Reply' : 'Reply by Email'}</span>
                              </button>
                            </div>
                          </div>
                        ))}

                        {/* Leads Pagination */}
                        {totalLeadsPages > 1 && (
                          <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                            <span className="text-xs text-slate-500 font-semibold">
                              Page {leadsPage} of {totalLeadsPages} (Showing {paginatedLeads.length} of {filteredLeads.length} leads)
                            </span>
                            <div className="flex gap-2">
                              <button
                                disabled={leadsPage === 1}
                                onClick={() => setLeadsPage(p => Math.max(1, p - 1))}
                                className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                              >
                                Previous
                              </button>
                              <button
                                disabled={leadsPage === totalLeadsPages}
                                onClick={() => setLeadsPage(p => Math.min(totalLeadsPages, p + 1))}
                                className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                              >
                                Next
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* --- 3. PROJECTS TAB --- */}
                {activeTab === 'projects' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">Manage Portfolio Projects</h3>
                      <button
                        onClick={() => {
                          setEditorType('projects');
                          setEditItem(null);
                          setIsEditorOpen(true);
                        }}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Add Project
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedProjects.map((project) => (
                        <div key={project.id} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group hover:border-slate-350 hover:shadow-md transition-all duration-300">
                          {/* Image preview */}
                          <div className="h-44 bg-slate-100 relative overflow-hidden shrink-0 flex items-center justify-center border-b border-slate-100">
                            {project.image ? (
                              <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-550" />
                            ) : (
                              <FolderGit2 className="w-12 h-12 text-slate-300" />
                            )}
                            <div className="absolute top-3 left-3 flex gap-2">
                              <span className="text-[10px] bg-slate-900/80 backdrop-blur-xs text-indigo-300 font-bold px-2.5 py-0.5 rounded shadow-sm">
                                {project.category}
                              </span>
                              {project.featured && (
                                <span className="text-[10px] bg-indigo-600 text-white font-bold px-2 py-0.5 rounded shadow-sm flex items-center gap-1">
                                  <Sparkles className="w-2.5 h-2.5" /> Featured
                                </span>
                              )}
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-2">
                              <h4 className="font-bold text-slate-800 text-base leading-snug">{project.title}</h4>
                              <p className="text-xs text-indigo-600 font-medium">{project.subtitle}</p>
                              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{project.description}</p>
                            </div>

                            <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{project.status}</span>
                              <div className="flex gap-1.5">
                                <button
                                  onClick={() => {
                                    setEditorType('projects');
                                    setEditItem(project);
                                    setIsEditorOpen(true);
                                  }}
                                  className="p-2 bg-slate-105 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors border border-slate-200"
                                  title="Edit"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteItem('projects', project.id)}
                                  className="p-2 bg-red-50 hover:bg-red-100 text-red-655 rounded-lg transition-colors border border-red-200"
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Projects Pagination */}
                    {totalProjectsPages > 1 && (
                      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                        <span className="text-xs text-slate-500 font-semibold">
                          Page {projectsPage} of {totalProjectsPages} (Showing {paginatedProjects.length} of {projects.length} projects)
                        </span>
                        <div className="flex gap-2">
                          <button
                            disabled={projectsPage === 1}
                            onClick={() => setProjectsPage(p => Math.max(1, p - 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Previous
                          </button>
                          <button
                            disabled={projectsPage === totalProjectsPages}
                            onClick={() => setProjectsPage(p => Math.min(totalProjectsPages, p + 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- 4. TESTIMONIALS TAB --- */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">Client Testimonials</h3>
                      <button
                        onClick={() => {
                          setEditorType('testimonials');
                          setEditItem(null);
                          setIsEditorOpen(true);
                        }}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Add Testimonial
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paginatedTestimonials.map((test) => (
                        <div key={test.id} className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between gap-4 shadow-sm hover:border-slate-350 transition-colors">
                          <p className="text-sm text-slate-600 italic leading-relaxed">"{test.text}"</p>
                          <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                            <div>
                              <p className="text-sm font-bold text-slate-850">— {test.name}</p>
                              <p className="text-xs text-indigo-600 font-medium mt-0.5">{test.role}</p>
                            </div>
                            <div className="flex gap-1.5">
                              <button
                                onClick={() => {
                                  setEditorType('testimonials');
                                  setEditItem(test);
                                  setIsEditorOpen(true);
                                }}
                                className="p-2 bg-slate-105 hover:bg-slate-200 text-slate-655 rounded-lg transition-colors border border-slate-200"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('testimonials', test.id)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-655 text-sm rounded-lg transition-colors border border-red-200"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Testimonials Pagination */}
                    {totalTestimonialsPages > 1 && (
                      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                        <span className="text-xs text-slate-500 font-semibold">
                          Page {testimonialsPage} of {totalTestimonialsPages} (Showing {paginatedTestimonials.length} of {testimonials.length} testimonials)
                        </span>
                        <div className="flex gap-2">
                          <button
                            disabled={testimonialsPage === 1}
                            onClick={() => setTestimonialsPage(p => Math.max(1, p - 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Previous
                          </button>
                          <button
                            disabled={testimonialsPage === totalTestimonialsPages}
                            onClick={() => setTestimonialsPage(p => Math.min(totalTestimonialsPages, p + 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- 5. YOUTUBE VIDEOS TAB --- */}
                {activeTab === 'youtube' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">Homepage YouTube Videos</h3>
                      <button
                        onClick={() => {
                          setEditorType('youtube');
                          setEditItem(null);
                          setIsEditorOpen(true);
                        }}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Add Video Card
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {paginatedYoutube.map((video) => (
                        <div key={video.videoId} className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col group shadow-sm hover:shadow-md transition-shadow">
                          {/* Image preview */}
                          <div className="relative aspect-video bg-slate-900 flex items-center justify-center shrink-0 border-b border-slate-100">
                            <img 
                              src={`https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`} 
                              alt={video.title} 
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-95 transition-opacity" 
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-10 h-10 bg-white/95 group-hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-105">
                                <svg className="w-5 h-5 text-red-655 ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                            {video.badge && (
                              <span className="absolute bottom-3 left-3 text-[9px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded uppercase tracking-wider shadow-sm">
                                {video.badge}
                              </span>
                            )}
                          </div>

                          <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                            <div className="space-y-1.5">
                              <h4 className="font-bold text-sm text-slate-800 line-clamp-1">{video.title}</h4>
                              <p className="text-[11px] text-indigo-600 font-mono font-bold">ID: {video.videoId}</p>
                              <p className="text-xs text-slate-550 line-clamp-2 leading-relaxed">{video.description}</p>
                            </div>

                            <div className="flex justify-end gap-1.5 border-t border-slate-100 pt-4 mt-2">
                              <button
                                onClick={() => {
                                  setEditorType('youtube');
                                  setEditItem(video);
                                  setIsEditorOpen(true);
                                }}
                                className="p-2 bg-slate-105 hover:bg-slate-200 text-slate-655 rounded-lg transition-colors border border-slate-200"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteItem('youtube', video.videoId)}
                                className="p-2 bg-red-50 hover:bg-red-100 text-red-655 rounded-lg transition-colors border border-red-200"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Youtube Videos Pagination */}
                    {totalYoutubePages > 1 && (
                      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                        <span className="text-xs text-slate-500 font-semibold">
                          Page {youtubePage} of {totalYoutubePages} (Showing {paginatedYoutube.length} of {youtubeVideos.length} videos)
                        </span>
                        <div className="flex gap-2">
                          <button
                            disabled={youtubePage === 1}
                            onClick={() => setYoutubePage(p => Math.max(1, p - 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Previous
                          </button>
                          <button
                            disabled={youtubePage === totalYoutubePages}
                            onClick={() => setYoutubePage(p => Math.min(totalYoutubePages, p + 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* --- 6. HOME SOLUTIONS TAB --- */}
                {activeTab === 'solutions' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">Horizontal Scrolling Solutions (Home)</h3>
                      <button
                        onClick={() => {
                          setEditorType('solutions');
                          setEditItem(null);
                          setIsEditorOpen(true);
                        }}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Add Section
                      </button>
                    </div>

                    <div className="space-y-4">
                      {solutions.map((sol) => (
                        <div key={sol.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col md:flex-row items-center gap-6 shadow-sm hover:border-slate-350 transition-colors">
                          <div className="w-24 h-24 bg-slate-100 border border-slate-150 rounded-xl overflow-hidden shrink-0 flex items-center justify-center shadow-xs">
                            {sol.image ? (
                              <img src={sol.image} alt={sol.title} className="w-full h-full object-cover" />
                            ) : (
                              <Sparkles className="w-8 h-8 text-slate-300" />
                            )}
                          </div>
                          
                          <div className="flex-1 space-y-1.5 text-center md:text-left">
                            <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{sol.label}</span>
                            <h4 className="font-bold text-base text-slate-800 leading-snug">{sol.title}</h4>
                            <p className="text-xs text-slate-500 leading-relaxed max-w-4xl">{sol.description}</p>
                            <p className="text-[10px] text-slate-400 font-mono">Layout direction: {sol.layout === 'right' ? 'Text Right / Image Left' : 'Text Left / Image Right'}</p>
                          </div>

                          <div className="flex gap-1.5 border-t md:border-t-0 md:border-l border-slate-105 pt-4 md:pt-0 md:pl-6 shrink-0">
                            <button
                              onClick={() => {
                                  setEditorType('solutions');
                                  setEditItem(sol);
                                  setIsEditorOpen(true);
                              }}
                              className="p-2 bg-slate-105 hover:bg-slate-200 text-slate-655 rounded-lg transition-colors border border-slate-200"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('solutions', sol.id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-655 rounded-lg transition-colors border border-red-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* --- 7. TECH STACK TAB --- */}
                {activeTab === 'skills' && (
                  <div className="space-y-8">
                    {['backend', 'frontend', 'database', 'other-tools'].map((category) => (
                      <div key={category} className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6 shadow-sm">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                          <h4 className="font-bold text-base text-slate-850 capitalize">{category.replace('-', ' ')}</h4>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            {(skills[category] || []).length} Skills
                          </span>
                        </div>

                        {/* Badges list */}
                        <div className="flex flex-wrap gap-2.5">
                          {skills[category] && skills[category].map((skill, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-2 px-3 py-1.5 bg-slate-55 border border-slate-200 rounded-full text-xs font-semibold hover:border-slate-300 transition-colors"
                            >
                              {skill.icon && (
                                <img src={skill.icon} alt={skill.name} className="w-4 h-4 object-contain animate-fadeIn" />
                              )}
                              <span className="text-slate-750">{skill.name}</span>
                              <button
                                onClick={() => handleDeleteSkill(category, index)}
                                className="ml-1.5 p-0.5 text-slate-400 hover:text-red-500 rounded-full hover:bg-slate-200 transition-colors"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>

                        {/* Add Skill form */}
                        <form onSubmit={(e) => handleAddSkill(category, e)} className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 items-end">
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Skill Name</label>
                            <input
                              name="skillName"
                              type="text"
                              placeholder="e.g. Python, Next.js"
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-800 rounded-lg text-xs outline-none transition-all"
                              required
                            />
                          </div>
                          <div className="space-y-1.5">
                            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">Icon URL (optional)</label>
                            <input
                              name="skillIcon"
                              type="text"
                              placeholder="https://icon-library.com/..."
                              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-800 rounded-lg text-xs outline-none transition-all"
                            />
                          </div>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-white hover:bg-slate-50 text-indigo-650 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 border border-slate-200 shadow-xxs transition-all hover:border-slate-350"
                          >
                            <Plus className="w-3.5 h-3.5" /> Add Skill
                          </button>
                        </form>
                      </div>
                    ))}
                  </div>
                )}

                {/* --- 8. FAQS TAB --- */}
                {activeTab === 'faqs' && (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-bold text-slate-800">Frequently Asked Questions</h3>
                      <button
                        onClick={() => {
                          setEditorType('faqs');
                          setEditItem(null);
                          setIsEditorOpen(true);
                        }}
                        className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors shadow-sm"
                      >
                        <Plus className="w-4 h-4" /> Add FAQ
                      </button>
                    </div>

                    <div className="space-y-4">
                      {paginatedFaqs.map((faq) => (
                        <div key={faq.id} className="bg-white border border-slate-200 rounded-2xl p-5 flex flex-col sm:flex-row justify-between gap-4 shadow-sm hover:border-slate-350 transition-colors">
                          <div className="space-y-2">
                            <h4 className="font-bold text-base text-indigo-600">Q: {faq.question}</h4>
                            <p className="text-xs text-slate-550 leading-relaxed max-w-4xl">A: {faq.answer}</p>
                          </div>
                          <div className="flex gap-1.5 sm:border-l border-slate-100 sm:pl-5 shrink-0 h-fit self-end sm:self-center">
                            <button
                              onClick={() => {
                                setEditorType('faqs');
                                setEditItem(faq);
                                setIsEditorOpen(true);
                              }}
                              className="p-2 bg-slate-105 hover:bg-slate-200 text-slate-655 rounded-lg transition-colors border border-slate-200"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteItem('faqs', faq.id)}
                              className="p-2 bg-red-50 hover:bg-red-100 text-red-655 rounded-lg transition-colors border border-red-200"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* FAQs Pagination */}
                    {totalFaqsPages > 1 && (
                      <div className="flex items-center justify-between border-t border-slate-200 pt-4 mt-6">
                        <span className="text-xs text-slate-500 font-semibold">
                          Page {faqsPage} of {totalFaqsPages} (Showing {paginatedFaqs.length} of {faqs.length} FAQs)
                        </span>
                        <div className="flex gap-2">
                          <button
                            disabled={faqsPage === 1}
                            onClick={() => setFaqsPage(p => Math.max(1, p - 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Previous
                          </button>
                          <button
                            disabled={faqsPage === totalFaqsPages}
                            onClick={() => setFaqsPage(p => Math.min(totalFaqsPages, p + 1))}
                            className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-bold hover:bg-slate-55 transition-colors shadow-xxs"
                          >
                            Next
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </main>

      {/* --- LEAD REPLY DIALOG MODAL --- */}
      <AnimatePresence>
        {isReplyOpen && activeLead && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <div className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-indigo-600" />
                  <h3 className="font-bold text-base text-slate-800">Reply by Email to Lead</h3>
                </div>
                <button onClick={() => setIsReplyOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSendReplySubmit} className="p-6 space-y-6">
                <div className="grid grid-cols-2 gap-4 text-xs bg-slate-55 p-3.5 rounded-xl border border-slate-200">
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Recipient</span>
                    <span className="text-slate-800 font-semibold block mt-0.5">{activeLead.name} ({activeLead.email})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold uppercase tracking-wider block">Subject</span>
                    <span className="text-slate-800 font-semibold block mt-0.5">Re: {activeLead.subject}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Your Reply Message</label>
                  <textarea
                    rows={8}
                    value={replyBody}
                    onChange={(e) => setReplyBody(e.target.value)}
                    placeholder="Type your message to send. SMTP settings from your server configuration will be used to deliver the mail."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white focus:ring-1 focus:ring-indigo-550 text-slate-850 rounded-xl outline-none resize-none text-sm placeholder:text-slate-400 leading-relaxed transition-all"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setIsReplyOpen(false)}
                    className="px-4 py-2.5 text-slate-500 hover:bg-slate-105 rounded-xl text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={sendingReply}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md hover:shadow-indigo-500/10"
                  >
                    {sendingReply ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending Mail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Send Reply Email</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- CONTENT FORM EDITOR DIALOG MODAL --- */}
      <AnimatePresence>
        {isEditorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl my-8 max-h-[85vh] flex flex-col"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-55 shrink-0">
                <h3 className="font-bold text-base text-slate-800 capitalize">
                  {editItem ? `Edit ${editorType.slice(0, -1)}` : `Add New ${editorType.slice(0, -1)}`}
                </h3>
                <button onClick={() => setIsEditorOpen(false)} className="p-1 text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form content */}
              <form onSubmit={handleEditorSubmit} className="flex-1 p-6 overflow-y-auto space-y-5">
                
                {/* --- A. PROJECTS FORM FIELDS --- */}
                {editorType === 'projects' && (
                  <div className="space-y-4 text-xs">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Title</label>
                        <input name="title" type="text" defaultValue={editItem?.title || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Subtitle</label>
                        <input name="subtitle" type="text" defaultValue={editItem?.subtitle || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Unique Slug</label>
                        <input name="slug" type="text" defaultValue={editItem?.slug || ''} placeholder="e.g. trade-buddy-broker" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Category</label>
                        <input name="category" type="text" defaultValue={editItem?.category || 'Web Application'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cover Image URL</label>
                        <input name="image" type="text" defaultValue={editItem?.image || ''} placeholder="e.g. /erp-system.jpg or URL" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Featured Project</label>
                        <select name="featured" defaultValue={editItem?.featured ? 'true' : 'false'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none">
                          <option value="false">No (Normal)</option>
                          <option value="true">Yes (Show on Homepage)</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                      <textarea name="description" rows={2} defaultValue={editItem?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none resize-none" required />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Live Website URL</label>
                        <input name="liveUrl" type="text" defaultValue={editItem?.liveUrl || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">GitHub Repository URL</label>
                        <input name="githubUrl" type="text" defaultValue={editItem?.githubUrl || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                        <input name="startDate" type="text" placeholder="YYYY-MM-DD" defaultValue={editItem?.startDate || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Date</label>
                        <input name="endDate" type="text" placeholder="YYYY-MM-DD or Present" defaultValue={editItem?.endDate || 'Present'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Project Status</label>
                        <input name="status" type="text" placeholder="Live, Completed..." defaultValue={editItem?.status || 'Live'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Technologies (comma-separated)</label>
                        <input name="technologies" type="text" defaultValue={editItem?.technologies?.join(', ') || ''} placeholder="e.g. Next.js, Django, Redis" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Client / Org</label>
                        <input name="client" type="text" defaultValue={editItem?.client || 'NJ Tech Studio'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-3 space-y-3">
                      <h5 className="font-bold text-xs uppercase tracking-wider text-indigo-600">Full Project Case Study</h5>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Project Overview</label>
                          <textarea name="overview" rows={2} defaultValue={editItem?.content?.overview || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none resize-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">The Challenge</label>
                          <textarea name="challenge" rows={2} defaultValue={editItem?.content?.challenge || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none resize-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">The Solution</label>
                          <textarea name="solution" rows={2} defaultValue={editItem?.content?.solution || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none resize-none" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Results achieved</label>
                          <input name="results" type="text" defaultValue={editItem?.content?.results || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-slate-150 pt-3 space-y-3">
                      <h5 className="font-bold text-xs uppercase tracking-wider text-indigo-600">Project Testimonial</h5>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Client Feedback Text</label>
                          <textarea name="testimonialText" rows={2} defaultValue={editItem?.testimonial?.text || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none resize-none" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Author Name</label>
                            <input name="testimonialAuthor" type="text" defaultValue={editItem?.testimonial?.author || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                          </div>
                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Author Position / Role</label>
                            <input name="testimonialPos" type="text" defaultValue={editItem?.testimonial?.position || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- B. TESTIMONIALS FORM FIELDS --- */}
                {editorType === 'testimonials' && (
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Client Name</label>
                        <input name="name" type="text" defaultValue={editItem?.name || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Client Position / Org</label>
                        <input name="role" type="text" defaultValue={editItem?.role || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Feedback Description</label>
                      <textarea name="text" rows={5} defaultValue={editItem?.text || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                    </div>
                  </div>
                )}

                {/* --- C. YOUTUBE VIDEO FORM FIELDS --- */}
                {editorType === 'youtube' && (
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">YouTube Video ID</label>
                        <input name="videoId" type="text" defaultValue={editItem?.videoId || ''} placeholder="e.g. VWPyx_L3zzY" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" required disabled={!!editItem} />
                        {editItem && <span className="text-[10px] text-slate-400 font-medium">Video ID cannot be changed.</span>}
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Video Badge</label>
                        <input name="badge" type="text" defaultValue={editItem?.badge || 'NEW UPLOAD'} placeholder="e.g. NEW UPLOAD, TUTORIAL" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Video Title</label>
                      <input name="title" type="text" defaultValue={editItem?.title || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Video Description</label>
                      <textarea name="description" rows={3} defaultValue={editItem?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none resize-none" required />
                    </div>
                  </div>
                )}

                {/* --- D. HOME SECTIONS FORM FIELDS --- */}
                {editorType === 'solutions' && (
                  <div className="space-y-4 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Section Label (Mini Header)</label>
                        <input name="label" type="text" defaultValue={editItem?.label || ''} placeholder="e.g. WEB + AI DEVELOPMENT" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none" required />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Layout Side</label>
                        <select name="layout" defaultValue={editItem?.layout || 'left'} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-850 rounded-lg outline-none">
                          <option value="left">Text Left / Image Right</option>
                          <option value="right">Text Right / Image Left</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Main Title</label>
                      <input name="title" type="text" defaultValue={editItem?.title || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" required />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Cover Image Path</label>
                      <input name="image" type="text" defaultValue={editItem?.image || ''} placeholder="e.g. /web-development.jpg" className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" required />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Detailed Description</label>
                      <textarea name="description" rows={4} defaultValue={editItem?.description || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" required />
                    </div>
                  </div>
                )}

                {/* --- E. FAQS FORM FIELDS --- */}
                {editorType === 'faqs' && (
                  <div className="space-y-4 text-sm">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">FAQ Question</label>
                      <input name="question" type="text" defaultValue={editItem?.question || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" required />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">FAQ Answer</label>
                      <textarea name="answer" rows={5} defaultValue={editItem?.answer || ''} className="w-full px-3 py-2 bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:bg-white text-slate-855 rounded-lg outline-none" required />
                    </div>
                  </div>
                )}

                {/* Actions footer */}
                <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 shrink-0">
                  <button
                    type="button"
                    onClick={async () => {
                      setIsEditorOpen(false);
                      setEditItem(null);
                    }}
                    className="px-4 py-2.5 text-slate-500 hover:bg-slate-105 rounded-xl text-xs font-bold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingData}
                    className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 disabled:cursor-not-allowed text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    {savingData ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
