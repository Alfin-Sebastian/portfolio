import React, { useState } from 'react';
import { 
  X, 
  User, 
  FolderPlus, 
  Award, 
  Code2, 
  Key, 
  Download, 
  Trash2, 
  Save, 
  LogOut, 
  Check, 
  Copy, 
  RefreshCw,
  Plus,
  ShieldAlert,
  Edit2,
  ExternalLink,
  Heart,
  Briefcase,
  GraduationCap,
  Trophy,
  Calendar,
  MapPin,
  Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminDashboard({ isOpen, onClose }) {
  const { 
    data, 
    logout, 
    updatePersonalInfo, 
    updateStats,
    addProject, 
    updateProject, 
    deleteProject, 
    addCertification, 
    updateCertification, 
    deleteCertification, 
    addSkill, 
    deleteSkill,
    addInterest,
    updateInterest,
    deleteInterest,
    addExperience,
    updateExperience,
    deleteExperience,
    addEducation,
    updateEducation,
    deleteEducation,
    addEvent,
    updateEvent,
    deleteEvent,
    updatePasscode,
    resetToDefaults 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile');
  const [copiedExport, setCopiedExport] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Editing state trackers
  const [editingCertId, setEditingCertId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingInterestIndex, setEditingInterestIndex] = useState(null);
  const [editingExpIndex, setEditingExpIndex] = useState(null);
  const [editingEduIndex, setEditingEduIndex] = useState(null);
  const [editingEventIndex, setEditingEventIndex] = useState(null);

  // Timeline subtab: 'experience' | 'education' | 'events'
  const [timelineSubtab, setTimelineSubtab] = useState('experience');

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    name: data.personal?.name || 'Alfin Sebastian',
    title: data.personal?.title || '',
    subtitle: data.personal?.subtitle || '',
    tagline: data.personal?.tagline || '',
    bio: data.personal?.bio || '',
    availability: data.personal?.availability || '',
    phone: data.personal?.phone || '',
    email: data.personal?.email || '',
    location: data.personal?.location || '',
    github: data.personal?.github || '',
    linkedin: data.personal?.linkedin || ''
  });

  // Stats Form state
  const [statsForm, setStatsForm] = useState(
    data.personal?.stats || [
      { label: "Web Applications", value: "2+", detail: "SwipeRide & UrbanServe" },
      { label: "Core Web Stacks", value: "2", detail: "MERN Stack & PHP/MySQL" },
      { label: "Verified Credentials", value: "6", detail: "Anthropic, Forage, EF SET" },
      { label: "English Proficiency", value: "C2", detail: "EF SET Highest CEFR Tier" }
    ]
  );

  // Experience Form state
  const [expForm, setExpForm] = useState({
    role: '',
    company: '',
    period: '2024 – Present',
    status: 'Active',
    location: 'Kottayam, Kerala / Remote',
    description: '',
    technologies: ''
  });

  // Education Form state
  const [eduForm, setEduForm] = useState({
    degree: '',
    institution: '',
    university: '',
    period: '2023 – 2026',
    status: 'Graduating 2026',
    location: 'Changanacherry / Kottayam, Kerala',
    coursework: ''
  });

  // Event Form state
  const [eventForm, setEventForm] = useState({
    title: '',
    type: 'State-Level Hackathon',
    description: '',
    tag: 'Participant'
  });

  // Project Form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full-Stack MERN',
    type: 'Production Platform',
    tagline: '',
    github: '',
    technologies: '',
    highlights: ''
  });

  // Cert Form state
  const [certForm, setCertForm] = useState({
    title: '',
    issuer: '',
    date: new Date().getFullYear().toString(),
    highlight: 'Verified Credential',
    badge: 'Industry Certified',
    description: '',
    tags: '',
    credentialUrl: ''
  });

  // Skill Form state
  const [skillForm, setSkillForm] = useState({
    categoryId: 'web',
    name: '',
    level: 88,
    tag: 'Web Framework',
    detail: ''
  });

  // Interest Form state
  const [interestForm, setInterestForm] = useState({
    category: '',
    description: '',
    vibe: '',
    icon: 'Sparkles'
  });

  // Passcode Form state
  const [newPass, setNewPass] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  // --- Handlers: Profile & Stats ---
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    showNotification('Profile details updated successfully!');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  const handleStatsSubmit = (e) => {
    e.preventDefault();
    updateStats(statsForm);
    showNotification('Hero stats updated successfully!');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

  const handleStatFieldChange = (index, field, val) => {
    const updated = [...statsForm];
    updated[index] = { ...updated[index], [field]: val };
    setStatsForm(updated);
  };

  // --- Handlers: Experience ---
  const handleSaveExp = (e) => {
    e.preventDefault();
    if (!expForm.role || !expForm.company) return;

    if (editingExpIndex !== null) {
      updateExperience(editingExpIndex, expForm);
      showNotification('Experience updated successfully!');
      setEditingExpIndex(null);
    } else {
      addExperience(expForm);
      showNotification('New work experience added!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }

    setExpForm({
      role: '',
      company: '',
      period: '2024 – Present',
      status: 'Active',
      location: 'Kottayam, Kerala / Remote',
      description: '',
      technologies: ''
    });
  };

  const startEditingExp = (item, idx) => {
    setEditingExpIndex(idx);
    setExpForm({
      role: item.role || '',
      company: item.company || '',
      period: item.period || '',
      status: item.status || 'Active',
      location: item.location || '',
      description: item.description || '',
      technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : (item.technologies || '')
    });
  };

  const cancelEditingExp = () => {
    setEditingExpIndex(null);
    setExpForm({
      role: '',
      company: '',
      period: '2024 – Present',
      status: 'Active',
      location: 'Kottayam, Kerala / Remote',
      description: '',
      technologies: ''
    });
  };

  // --- Handlers: Education ---
  const handleSaveEdu = (e) => {
    e.preventDefault();
    if (!eduForm.degree || !eduForm.institution) return;

    if (editingEduIndex !== null) {
      updateEducation(editingEduIndex, eduForm);
      showNotification('Education entry updated successfully!');
      setEditingEduIndex(null);
    } else {
      addEducation(eduForm);
      showNotification('New education entry added!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }

    setEduForm({
      degree: '',
      institution: '',
      university: '',
      period: '2023 – 2026',
      status: 'Graduating 2026',
      location: 'Changanacherry / Kottayam, Kerala',
      coursework: ''
    });
  };

  const startEditingEdu = (item, idx) => {
    setEditingEduIndex(idx);
    setEduForm({
      degree: item.degree || '',
      institution: item.institution || '',
      university: item.university || '',
      period: item.period || '',
      status: item.status || '',
      location: item.location || '',
      coursework: Array.isArray(item.coursework) ? item.coursework.join(', ') : (item.coursework || '')
    });
  };

  const cancelEditingEdu = () => {
    setEditingEduIndex(null);
    setEduForm({
      degree: '',
      institution: '',
      university: '',
      period: '2023 – 2026',
      status: 'Graduating 2026',
      location: 'Changanacherry / Kottayam, Kerala',
      coursework: ''
    });
  };

  // --- Handlers: Events ---
  const handleSaveEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title) return;

    if (editingEventIndex !== null) {
      updateEvent(editingEventIndex, eventForm);
      showNotification('Event updated successfully!');
      setEditingEventIndex(null);
    } else {
      addEvent(eventForm);
      showNotification('New event added!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }

    setEventForm({
      title: '',
      type: 'State-Level Hackathon',
      description: '',
      tag: 'Participant'
    });
  };

  const startEditingEvent = (item, idx) => {
    setEditingEventIndex(idx);
    setEventForm({
      title: item.title || '',
      type: item.type || '',
      description: item.description || '',
      tag: item.tag || ''
    });
  };

  const cancelEditingEvent = () => {
    setEditingEventIndex(null);
    setEventForm({
      title: '',
      type: 'State-Level Hackathon',
      description: '',
      tag: 'Participant'
    });
  };

  // --- Handlers: Projects ---
  const handleSaveProject = (e) => {
    e.preventDefault();
    if (!projectForm.title || !projectForm.tagline) return;

    const payload = {
      title: projectForm.title,
      category: projectForm.category,
      type: projectForm.type,
      tagline: projectForm.tagline,
      github: projectForm.github,
      technologies: typeof projectForm.technologies === 'string'
        ? projectForm.technologies.split(',').map(s => s.trim()).filter(Boolean)
        : projectForm.technologies,
      highlights: typeof projectForm.highlights === 'string'
        ? projectForm.highlights.split('\n').map(s => s.trim()).filter(Boolean)
        : projectForm.highlights
    };

    if (editingProjectId) {
      updateProject(editingProjectId, payload);
      showNotification('Project updated successfully in cloud!');
      setEditingProjectId(null);
    } else {
      addProject(payload);
      showNotification('New project published to cloud portfolio!');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
    }

    setProjectForm({
      title: '',
      category: 'Full-Stack MERN',
      type: 'Production Platform',
      tagline: '',
      github: '',
      technologies: '',
      highlights: ''
    });
  };

  const startEditingProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title,
      category: proj.category || 'Full-Stack MERN',
      type: proj.type || 'Production Platform',
      tagline: proj.tagline || '',
      github: proj.github || '',
      technologies: Array.isArray(proj.technologies) ? proj.technologies.join(', ') : (proj.technologies || ''),
      highlights: Array.isArray(proj.highlights) ? proj.highlights.join('\n') : (proj.highlights || '')
    });
  };

  const cancelEditingProject = () => {
    setEditingProjectId(null);
    setProjectForm({
      title: '',
      category: 'Full-Stack MERN',
      type: 'Production Platform',
      tagline: '',
      github: '',
      technologies: '',
      highlights: ''
    });
  };

  // --- Handlers: Certifications ---
  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;

    const tagsArray = typeof certForm.tags === 'string'
      ? certForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      : certForm.tags;

    if (editingCertId) {
      updateCertification(editingCertId, {
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date,
        highlight: certForm.highlight,
        badge: certForm.badge,
        description: certForm.description,
        credentialUrl: certForm.credentialUrl,
        tags: tagsArray
      });
      showNotification('Certification updated successfully!');
      setEditingCertId(null);
    } else {
      addCertification({
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date,
        highlight: certForm.highlight,
        badge: certForm.badge,
        description: certForm.description,
        credentialUrl: certForm.credentialUrl,
        tags: tagsArray
      });
      showNotification('New certification added to showcase!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }

    setCertForm({
      title: '',
      issuer: '',
      date: new Date().getFullYear().toString(),
      highlight: 'Verified Credential',
      badge: 'Industry Certified',
      description: '',
      tags: '',
      credentialUrl: ''
    });
  };

  const startEditingCert = (cert) => {
    setEditingCertId(cert.id);
    setCertForm({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.date || '2024',
      highlight: cert.highlight || '',
      badge: cert.badge || '',
      description: cert.description || '',
      tags: Array.isArray(cert.tags) ? cert.tags.join(', ') : '',
      credentialUrl: cert.credentialUrl || ''
    });
  };

  const cancelEditingCert = () => {
    setEditingCertId(null);
    setCertForm({
      title: '',
      issuer: '',
      date: new Date().getFullYear().toString(),
      highlight: 'Verified Credential',
      badge: 'Industry Certified',
      description: '',
      tags: '',
      credentialUrl: ''
    });
  };

  // --- Handlers: Skills ---
  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillForm.name) return;

    addSkill(skillForm.categoryId, {
      name: skillForm.name,
      level: Number(skillForm.level),
      tag: skillForm.tag,
      detail: skillForm.detail
    });

    showNotification(`Skill "${skillForm.name}" added to category!`);
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });

    setSkillForm({
      categoryId: skillForm.categoryId,
      name: '',
      level: 88,
      tag: 'Web Framework',
      detail: ''
    });
  };

  // --- Handlers: Passions / Hobbies ---
  const handleSaveInterest = (e) => {
    e.preventDefault();
    if (!interestForm.category) return;

    if (editingInterestIndex !== null) {
      updateInterest(editingInterestIndex, interestForm);
      showNotification('Hobby updated successfully!');
      setEditingInterestIndex(null);
    } else {
      addInterest(interestForm);
      showNotification('New hobby/passion added!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    }

    setInterestForm({
      category: '',
      description: '',
      vibe: '',
      icon: 'Sparkles'
    });
  };

  const startEditingInterest = (item, idx) => {
    setEditingInterestIndex(idx);
    setInterestForm({
      category: item.category || '',
      description: item.description || '',
      vibe: item.vibe || '',
      icon: item.icon || 'Sparkles'
    });
  };

  const cancelEditingInterest = () => {
    setEditingInterestIndex(null);
    setInterestForm({
      category: '',
      description: '',
      vibe: '',
      icon: 'Sparkles'
    });
  };

  // --- Handlers: Security & Export ---
  const handlePasscodeChange = (e) => {
    e.preventDefault();
    if (!newPass.trim() || newPass.length < 4) {
      alert('Passcode must be at least 4 characters long.');
      return;
    }
    updatePasscode(newPass.trim());
    setNewPass('');
    showNotification('Master passcode updated securely in cloud database!');
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
  };

  const handleExportData = () => {
    const dataStr = 'export const portfolioData = ' + JSON.stringify(data, null, 2) + ';\n';
    const blob = new Blob([dataStr], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.js';
    link.click();
    URL.revokeObjectURL(url);
    showNotification('Exported portfolioData.js downloaded!');
  };

  const handleCopyJSON = () => {
    const dataStr = 'export const portfolioData = ' + JSON.stringify(data, null, 2) + ';';
    navigator.clipboard.writeText(dataStr);
    setCopiedExport(true);
    showNotification('Complete JavaScript data code copied to clipboard!');
    setTimeout(() => setCopiedExport(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-5xl h-[90vh] bg-[#07090E] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-dark-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 p-[2px]">
              <div className="w-full h-full bg-dark-950 rounded-xl flex items-center justify-center font-mono font-bold text-cyan-300 text-sm">
                CMS
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                  Portfolio Administration Console
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
                  LIVE CLOUD SYNC
                </span>
              </div>
              <p className="text-[11px] font-mono text-slate-400">
                Edits are saved directly to Firebase and published live for all visitors worldwide.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-dark-850 hover:bg-rose-950/60 text-slate-300 hover:text-rose-300 border border-white/10 text-xs font-mono transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock & Exit</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success toast notification */}
        {successMsg && (
          <div className="bg-emerald-950/90 border-b border-emerald-500/40 text-emerald-300 px-6 py-2 text-xs font-mono flex items-center gap-2 animate-fadeIn">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Main Body */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Sidebar Navigation */}
          <div className="w-full md:w-56 bg-[#080B14] border-b md:border-b-0 md:border-r border-white/10 p-3 flex md:flex-col gap-1 overflow-x-auto">
            {[
              { id: 'profile', name: 'Profile & Contact', icon: User },
              { id: 'timeline', name: 'Career & Timeline', icon: Briefcase },
              { id: 'projects', name: 'Manage Projects', icon: FolderPlus },
              { id: 'certs', name: 'Certifications', icon: Award },
              { id: 'skills', name: 'Skills Radar', icon: Code2 },
              { id: 'interests', name: 'Hobbies & Passions', icon: Heart },
              { id: 'export', name: 'Export & Code Sync', icon: Download },
              { id: 'security', name: 'Passcode & Reset', icon: Key },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-mono text-left transition-all whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950 to-purple-950 border border-cyan-500/40 text-cyan-300 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-dark-850'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>

          {/* Content Area */}
          <div className="flex-1 p-6 overflow-y-auto bg-[#0A0E1A]">
            
            {/* 1. Profile & Contact Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-8 max-w-2xl">
                <form onSubmit={handleProfileSubmit} className="space-y-5">
                  <div className="border-b border-white/10 pb-3">
                    <h4 className="text-base font-bold text-white">Basic Information & Availability</h4>
                    <p className="text-xs text-slate-400">Updates the hero banner, headlines, and contact cards live.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Full Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Professional Title</label>
                      <input
                        type="text"
                        value={profileForm.title}
                        onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Subtitle / Core Focus</label>
                      <input
                        type="text"
                        value={profileForm.subtitle}
                        onChange={(e) => setProfileForm({ ...profileForm, subtitle: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Availability Status Badge</label>
                      <input
                        type="text"
                        value={profileForm.availability}
                        onChange={(e) => setProfileForm({ ...profileForm, availability: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Headline Tagline</label>
                    <textarea
                      rows={2}
                      value={profileForm.tagline}
                      onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Bio Summary Paragraph</label>
                    <textarea
                      rows={3}
                      value={profileForm.bio}
                      onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none resize-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Phone</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Location</label>
                      <input
                        type="text"
                        value={profileForm.location}
                        onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">GitHub Profile URL</label>
                      <input
                        type="url"
                        value={profileForm.github}
                        onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">LinkedIn Profile URL</label>
                      <input
                        type="url"
                        value={profileForm.linkedin}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-2 hover:scale-[1.01] transition-transform"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Profile Updates</span>
                  </button>
                </form>

                {/* Hero Stats Ribbon Editor */}
                <form onSubmit={handleStatsSubmit} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <div className="border-b border-white/10 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>Hero Stats Bento Cards (4 Badges)</span>
                    </h4>
                    <p className="text-xs text-slate-400">Edit the 4 metric cards displayed across the bottom of the hero section.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {statsForm.map((stat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-dark-850 border border-white/5 space-y-2">
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Value (e.g. 2+)"
                            value={stat.value}
                            onChange={(e) => handleStatFieldChange(idx, 'value', e.target.value)}
                            className="w-20 px-2 py-1 rounded bg-dark-900 border border-white/10 text-white text-xs font-bold text-center focus:border-cyan-400 outline-none"
                          />
                          <input
                            type="text"
                            placeholder="Label (e.g. Web Apps)"
                            value={stat.label}
                            onChange={(e) => handleStatFieldChange(idx, 'label', e.target.value)}
                            className="flex-1 px-2 py-1 rounded bg-dark-900 border border-white/10 text-white text-xs font-medium focus:border-cyan-400 outline-none"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="Detail / Subtitle"
                          value={stat.detail}
                          onChange={(e) => handleStatFieldChange(idx, 'detail', e.target.value)}
                          className="w-full px-2 py-1 rounded bg-dark-900 border border-white/10 text-slate-300 text-[11px] font-mono focus:border-cyan-400 outline-none"
                        />
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-2"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Hero Stats</span>
                  </button>
                </form>
              </div>
            )}

            {/* 2. Career & Timeline Tab */}
            {activeTab === 'timeline' && (
              <div className="space-y-6 max-w-3xl">
                
                {/* Timeline Category Subtab Pills */}
                <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-4">
                  {[
                    { id: 'experience', label: 'Work Experience & Jobs', icon: Briefcase, count: (data.experience || []).length },
                    { id: 'education', label: 'Academic Degrees', icon: GraduationCap, count: (data.education || []).length },
                    { id: 'events', label: 'Hackathons & Events', icon: Trophy, count: (data.events || []).length }
                  ].map((st) => {
                    const Icon = st.icon;
                    const isSubActive = timelineSubtab === st.id;
                    return (
                      <button
                        key={st.id}
                        type="button"
                        onClick={() => setTimelineSubtab(st.id)}
                        className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                          isSubActive
                            ? 'bg-cyan-500 text-dark-950 font-bold shadow-md shadow-cyan-500/20'
                            : 'bg-dark-850 hover:bg-dark-800 text-slate-300 border border-white/5'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{st.label}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSubActive ? 'bg-black/20 text-dark-950 font-bold' : 'bg-white/10 text-slate-400'}`}>
                          {st.count}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Subtab 1: Work Experience */}
                {timelineSubtab === 'experience' && (
                  <div className="space-y-6">
                    {/* Add / Edit Form */}
                    <form onSubmit={handleSaveExp} className="p-5 rounded-2xl bg-dark-900/90 border border-cyan-500/30 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Briefcase className="w-4 h-4 text-cyan-400" />
                          <span>{editingExpIndex !== null ? 'Edit Work Experience' : 'Add New Work Experience / Job'}</span>
                        </h4>
                        {editingExpIndex !== null && (
                          <span className="text-[11px] font-mono text-amber-300">Editing Entry #{editingExpIndex + 1}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Job Title / Role</label>
                          <input
                            type="text"
                            placeholder="e.g. Junior Full-Stack Developer, Frontend Intern"
                            value={expForm.role}
                            onChange={(e) => setExpForm({ ...expForm, role: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Company / Organization</label>
                          <input
                            type="text"
                            placeholder="e.g. Acme Labs, Freelance, Startup"
                            value={expForm.company}
                            onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Period / Years</label>
                          <input
                            type="text"
                            placeholder="e.g. 2025 – Present, Jan 2025 – Jun 2025"
                            value={expForm.period}
                            onChange={(e) => setExpForm({ ...expForm, period: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Status Badge</label>
                          <input
                            type="text"
                            placeholder="e.g. Active, Completed, Full-Time"
                            value={expForm.status}
                            onChange={(e) => setExpForm({ ...expForm, status: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Kottayam, Kerala / Remote"
                            value={expForm.location}
                            onChange={(e) => setExpForm({ ...expForm, location: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300">Role Summary & Key Contributions</label>
                        <textarea
                          rows={2}
                          placeholder="Describe your responsibilities, key features developed, and achievements..."
                          value={expForm.description}
                          onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none resize-none"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-mono text-slate-300">Technologies Used (comma separated)</label>
                        <input
                          type="text"
                          placeholder="React.js, Node.js, Express, MongoDB, Tailwind CSS"
                          value={expForm.technologies}
                          onChange={(e) => setExpForm({ ...expForm, technologies: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-2 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingExpIndex !== null ? 'Save Experience' : 'Add Experience'}</span>
                        </button>
                        {editingExpIndex !== null && (
                          <button
                            type="button"
                            onClick={cancelEditingExp}
                            className="px-3.5 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-mono"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Existing Experience Entries */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Current Experience Items ({(data.experience || []).length})
                      </h4>
                      {(data.experience || []).length === 0 ? (
                        <div className="p-6 text-center rounded-2xl bg-dark-900 border border-white/5 text-slate-400 text-xs font-mono">
                          No work experience added yet. Add your current freelance work, internship, or full-time position using the form above!
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {(data.experience || []).map((item, idx) => (
                            <div
                              key={idx}
                              className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                            >
                              <div className="space-y-1 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-bold text-white">{item.role}</span>
                                  <span className="text-xs text-cyan-300">@ {item.company}</span>
                                  <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30">
                                    {item.status || 'Active'}
                                  </span>
                                </div>
                                <div className="text-xs font-mono text-slate-400 flex items-center gap-3">
                                  <span>{item.period}</span>
                                  {item.location && <span>• {item.location}</span>}
                                </div>
                                {item.description && (
                                  <p className="text-xs text-slate-300 pt-1 line-clamp-2">{item.description}</p>
                                )}
                              </div>

                              <div className="flex items-center gap-2 self-end sm:self-center">
                                <button
                                  type="button"
                                  onClick={() => startEditingExp(item, idx)}
                                  className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs flex items-center gap-1 font-mono px-2.5"
                                  title="Edit Entry"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                  <span>Edit</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    deleteExperience(idx);
                                    showNotification(`Experience "${item.role}" deleted`);
                                  }}
                                  className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                                  title="Delete Entry"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Subtab 2: Academic Degrees */}
                {timelineSubtab === 'education' && (
                  <div className="space-y-6">
                    {/* Add / Edit Form */}
                    <form onSubmit={handleSaveEdu} className="p-5 rounded-2xl bg-dark-900/90 border border-purple-500/30 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-purple-400" />
                          <span>{editingEduIndex !== null ? 'Edit Degree' : 'Add Academic Degree / Qualification'}</span>
                        </h4>
                        {editingEduIndex !== null && (
                          <span className="text-[11px] font-mono text-purple-300">Editing Degree #{editingEduIndex + 1}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Degree / Qualification</label>
                          <input
                            type="text"
                            placeholder="e.g. Bachelor of Computer Applications (BCA)"
                            value={eduForm.degree}
                            onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-purple-400 outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">College / Institution</label>
                          <input
                            type="text"
                            placeholder="e.g. Kristu Jyothi College of Management & Technology"
                            value={eduForm.institution}
                            onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-purple-400 outline-none"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Affiliated University</label>
                          <input
                            type="text"
                            placeholder="e.g. Mahatma Gandhi (MG) University"
                            value={eduForm.university}
                            onChange={(e) => setEduForm({ ...eduForm, university: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-purple-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Period / Years</label>
                          <input
                            type="text"
                            placeholder="e.g. 2023 – 2026"
                            value={eduForm.period}
                            onChange={(e) => setEduForm({ ...eduForm, period: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-purple-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Status</label>
                          <input
                            type="text"
                            placeholder="e.g. Graduating 2026, Completed"
                            value={eduForm.status}
                            onChange={(e) => setEduForm({ ...eduForm, status: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-purple-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Location</label>
                          <input
                            type="text"
                            placeholder="e.g. Changanacherry / Kottayam, Kerala"
                            value={eduForm.location}
                            onChange={(e) => setEduForm({ ...eduForm, location: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-purple-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Core Coursework (comma separated)</label>
                          <input
                            type="text"
                            placeholder="Web Tech, DBMS, Data Structures, Java, C++"
                            value={eduForm.coursework}
                            onChange={(e) => setEduForm({ ...eduForm, coursework: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-purple-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingEduIndex !== null ? 'Save Degree' : 'Add Degree'}</span>
                        </button>
                        {editingEduIndex !== null && (
                          <button
                            type="button"
                            onClick={cancelEditingEdu}
                            className="px-3.5 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-mono"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Existing Education Entries */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Current Qualifications ({(data.education || []).length})
                      </h4>
                      <div className="space-y-3">
                        {(data.education || []).map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{item.degree}</span>
                                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-purple-950 text-purple-300 border border-purple-500/30">
                                  {item.status}
                                </span>
                              </div>
                              <div className="text-xs text-slate-300">
                                <span>{item.institution}</span>
                                {item.university && <span className="text-purple-300"> ({item.university})</span>}
                              </div>
                              <div className="text-xs font-mono text-slate-400">
                                <span>{item.period}</span>
                                {item.location && <span> • {item.location}</span>}
                              </div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <button
                                type="button"
                                onClick={() => startEditingEdu(item, idx)}
                                className="p-1.5 rounded-lg bg-purple-950/60 hover:bg-purple-900 text-purple-300 border border-purple-500/30 text-xs flex items-center gap-1 font-mono px-2.5"
                                title="Edit Entry"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteEducation(idx);
                                  showNotification(`Degree "${item.degree}" deleted`);
                                }}
                                className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                                title="Delete Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Subtab 3: Hackathons & Events */}
                {timelineSubtab === 'events' && (
                  <div className="space-y-6">
                    {/* Add / Edit Form */}
                    <form onSubmit={handleSaveEvent} className="p-5 rounded-2xl bg-dark-900/90 border border-amber-500/30 space-y-4">
                      <div className="flex items-center justify-between border-b border-white/10 pb-2">
                        <h4 className="text-sm font-bold text-white flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-amber-400" />
                          <span>{editingEventIndex !== null ? 'Edit Competition / Workshop' : 'Add Competition / Workshop'}</span>
                        </h4>
                        {editingEventIndex !== null && (
                          <span className="text-[11px] font-mono text-amber-300">Editing Event #{editingEventIndex + 1}</span>
                        )}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Event Title</label>
                          <input
                            type="text"
                            placeholder="e.g. Authentic TECH Masters, Smart India Hackathon"
                            value={eventForm.title}
                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                            required
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Event Category / Level</label>
                          <input
                            type="text"
                            placeholder="e.g. State-Level Hackathon, Institutional Workshop"
                            value={eventForm.type}
                            onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Role / Tag Badge</label>
                          <input
                            type="text"
                            placeholder="e.g. Hackathon Participant, Winner, Organizer"
                            value={eventForm.tag}
                            onChange={(e) => setEventForm({ ...eventForm, tag: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-xs font-mono text-slate-300">Description</label>
                          <input
                            type="text"
                            placeholder="Briefly describe what you built or learned..."
                            value={eventForm.description}
                            onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-3 pt-2">
                        <button
                          type="submit"
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center gap-2 transition-colors"
                        >
                          <Save className="w-4 h-4" />
                          <span>{editingEventIndex !== null ? 'Save Event' : 'Add Event'}</span>
                        </button>
                        {editingEventIndex !== null && (
                          <button
                            type="button"
                            onClick={cancelEditingEvent}
                            className="px-3.5 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-mono"
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>

                    {/* Existing Event Entries */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                        Current Events ({(data.events || []).length})
                      </h4>
                      <div className="space-y-3">
                        {(data.events || []).map((item, idx) => (
                          <div
                            key={idx}
                            className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{item.title}</span>
                                <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                                  {item.type}
                                </span>
                              </div>
                              <p className="text-xs text-slate-300 line-clamp-2">{item.description}</p>
                              <div className="text-[11px] font-mono text-slate-400">{item.tag}</div>
                            </div>

                            <div className="flex items-center gap-2 self-end sm:self-center">
                              <button
                                type="button"
                                onClick={() => startEditingEvent(item, idx)}
                                className="p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1 font-mono px-2.5"
                                title="Edit Entry"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                                <span>Edit</span>
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  deleteEvent(idx);
                                  showNotification(`Event "${item.title}" deleted`);
                                }}
                                className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                                title="Delete Entry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* 3. Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-8 max-w-3xl">
                {/* Add / Edit Project Form */}
                <form onSubmit={handleSaveProject} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {editingProjectId ? (
                        <>
                          <Edit2 className="w-4 h-4 text-cyan-400" />
                          <span>Edit Project</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-cyan-400" />
                          <span>Add New Project</span>
                        </>
                      )}
                    </h4>
                    {editingProjectId && (
                      <span className="text-xs font-mono text-cyan-300">Editing: {projectForm.title}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Project Title</label>
                      <input
                        type="text"
                        placeholder="e.g. HealthTrack AI"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category Tag</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      >
                        <option value="Full-Stack MERN">Full-Stack MERN</option>
                        <option value="PHP & MySQL">PHP & MySQL</option>
                        <option value="AI & Data">AI & Data</option>
                        <option value="Frontend Application">Frontend Application</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Type / Milestone</label>
                      <input
                        type="text"
                        placeholder="e.g. Major Project, Capstone, Client Solution"
                        value={projectForm.type}
                        onChange={(e) => setProjectForm({ ...projectForm, type: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">GitHub Repository URL</label>
                      <input
                        type="url"
                        placeholder="https://github.com/Alfin-Sebastian/project"
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">One-Line Pitch / Tagline</label>
                    <input
                      type="text"
                      placeholder="Concise overview of what the application solves..."
                      value={projectForm.tagline}
                      onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Technologies (comma separated)</label>
                    <input
                      type="text"
                      placeholder="React.js, Node.js, Express, MongoDB, Tailwind CSS, Claude AI"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Key Highlights / Features (one per line)</label>
                    <textarea
                      rows={3}
                      placeholder="Implemented real-time ride dispatching\nIntegrated emergency SOS audio alert\nDesigned responsive dashboard..."
                      value={projectForm.highlights}
                      onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none resize-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-2 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingProjectId ? 'Save Changes' : 'Publish Project'}</span>
                    </button>
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={cancelEditingProject}
                        className="px-3.5 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-mono"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* Existing Projects List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Existing Published Projects ({data.projects.length})
                  </h4>
                  <div className="space-y-3">
                    {data.projects.map((proj) => (
                      <div
                        key={proj.id}
                        className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{proj.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                              {proj.category}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">{proj.tagline}</p>
                          <div className="flex flex-wrap gap-1 pt-1">
                            {proj.technologies?.slice(0, 5).map((tech, i) => (
                              <span key={i} className="text-[10px] font-mono text-slate-400 bg-dark-850 px-1.5 py-0.5 rounded">
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => startEditingProject(proj)}
                            className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs flex items-center gap-1 font-mono px-2.5"
                            title="Edit Project"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete project "${proj.title}" from portfolio?`)) {
                                deleteProject(proj.id);
                                showNotification(`Project "${proj.title}" deleted`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 4. Certifications Tab */}
            {activeTab === 'certs' && (
              <div className="space-y-8 max-w-3xl">
                {/* Add / Edit Certification Form */}
                <form onSubmit={handleSaveCert} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {editingCertId ? (
                        <>
                          <Edit2 className="w-4 h-4 text-amber-400" />
                          <span>Edit Certification</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-amber-400" />
                          <span>Add New Certification</span>
                        </>
                      )}
                    </h4>
                    {editingCertId && (
                      <span className="text-xs font-mono text-amber-300">Editing: {certForm.title}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Certificate Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Claude 101, IBM Data Analyst"
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Issuing Organization</label>
                      <input
                        type="text"
                        placeholder="e.g. Anthropic, TATA (Forage), IBM"
                        value={certForm.issuer}
                        onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Year / Date</label>
                      <input
                        type="text"
                        placeholder="e.g. 2024, 2025, 2026"
                        value={certForm.date}
                        onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Highlight Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. Anthropic Verified, Industry Sim"
                        value={certForm.badge}
                        onChange={(e) => setCertForm({ ...certForm, badge: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Sub-Status</label>
                      <input
                        type="text"
                        placeholder="e.g. Completed & Verified"
                        value={certForm.highlight}
                        onChange={(e) => setCertForm({ ...certForm, highlight: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Verification URL / PDF Link</label>
                    <input
                      type="url"
                      placeholder="https://academy.claude.com/verify/..."
                      value={certForm.credentialUrl}
                      onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Summary of skills validated..."
                      value={certForm.description}
                      onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none resize-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="Anthropic, Claude AI, Prompting, Vibe Coding"
                      value={certForm.tags}
                      onChange={(e) => setCertForm({ ...certForm, tags: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-amber-400 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-dark-950 font-bold text-xs flex items-center gap-2 transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingCertId ? 'Save Certificate' : 'Add Certificate'}</span>
                    </button>
                    {editingCertId && (
                      <button
                        type="button"
                        onClick={cancelEditingCert}
                        className="px-3.5 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-mono"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* Existing Certifications List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Existing Credentials ({data.certifications.length})
                  </h4>
                  <div className="space-y-3">
                    {data.certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{cert.title}</span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/30">
                              {cert.issuer}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-bold">
                              {cert.date || '2024'}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">{cert.description}</p>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1 inline-flex"
                            >
                              <span>View Certificate</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>

                        <div className="flex items-center gap-2 self-end sm:self-center">
                          <button
                            type="button"
                            onClick={() => startEditingCert(cert)}
                            className="p-1.5 rounded-lg bg-amber-950/60 hover:bg-amber-900 text-amber-300 border border-amber-500/30 text-xs flex items-center gap-1 font-mono px-2.5"
                            title="Edit Credential"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete "${cert.title}"?`)) {
                                deleteCertification(cert.id);
                                showNotification(`Certification "${cert.title}" deleted`);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                            title="Delete Credential"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 5. Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-8 max-w-3xl">
                {/* Add Skill Form */}
                <form onSubmit={handleAddSkill} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                    <Plus className="w-4 h-4 text-cyan-400" />
                    <span>Add New Skill to Matrix</span>
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Target Category</label>
                      <select
                        value={skillForm.categoryId}
                        onChange={(e) => setSkillForm({ ...skillForm, categoryId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      >
                        {data.skills.categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Skill Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Next.js, TypeScript, Docker"
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">
                        Proficiency Level ({skillForm.level}%)
                      </label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                        className="w-full accent-cyan-400 py-2"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Tag / Badge</label>
                      <input
                        type="text"
                        placeholder="e.g. Frontend Framework, Cloud, Database"
                        value={skillForm.tag}
                        onChange={(e) => setSkillForm({ ...skillForm, tag: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Detail / Experience Context</label>
                    <input
                      type="text"
                      placeholder="e.g. Server components, API routes, SSR pipelines"
                      value={skillForm.detail}
                      onChange={(e) => setSkillForm({ ...skillForm, detail: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-2 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Skill to Matrix</span>
                  </button>
                </form>

                {/* Existing Categories & Skills List */}
                <div className="space-y-6">
                  {data.skills.categories.map((cat) => (
                    <div key={cat.id} className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-3">
                      <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-xs font-bold text-cyan-300 uppercase font-mono">{cat.name}</span>
                        <span className="text-xs text-slate-400 font-mono">{cat.skills.length} skills</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cat.skills.map((skill, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 rounded-xl bg-dark-850 border border-white/5 flex items-center justify-between group hover:border-cyan-500/30 transition-colors"
                          >
                            <div className="space-y-0.5">
                              <div className="text-xs font-semibold text-white flex items-center gap-1.5">
                                <span>{skill.name}</span>
                                <span className="text-[10px] font-mono text-cyan-400">({skill.level}%)</span>
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono">{skill.tag}</div>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                deleteSkill(cat.id, skill.name);
                                showNotification(`Skill "${skill.name}" removed`);
                              }}
                              className="p-1 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/40 opacity-0 group-hover:opacity-100 transition-opacity"
                              title="Delete skill"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Hobbies & Passions Tab */}
            {activeTab === 'interests' && (
              <div className="space-y-8 max-w-3xl">
                {/* Add / Edit Passion Form */}
                <form onSubmit={handleSaveInterest} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Heart className="w-4 h-4 text-rose-400" />
                      <span>{editingInterestIndex !== null ? 'Edit Hobby / Passion' : 'Add Creative Passion'}</span>
                    </h4>
                    {editingInterestIndex !== null && (
                      <span className="text-xs font-mono text-cyan-300">Editing: {interestForm.category}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Hobby Category / Title</label>
                      <input
                        type="text"
                        placeholder="e.g. Manga & Manhwas, Football, Photography"
                        value={interestForm.category}
                        onChange={(e) => setInterestForm({ ...interestForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                        required
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Icon Name</label>
                      <select
                        value={interestForm.icon}
                        onChange={(e) => setInterestForm({ ...interestForm, icon: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      >
                        <option value="Sparkles">Sparkles ✨</option>
                        <option value="BookOpen">BookOpen 📖</option>
                        <option value="Film">Film 🎬</option>
                        <option value="Activity">Activity ⚽</option>
                        <option value="Cpu">Cpu 💻</option>
                        <option value="Heart">Heart ❤️</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Description</label>
                    <textarea
                      rows={2}
                      placeholder="Why you love it, favorites, and what you get from it..."
                      value={interestForm.description}
                      onChange={(e) => setInterestForm({ ...interestForm, description: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none resize-none"
                      required
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Mindset / Vibe Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Continuous leveling up & determination"
                      value={interestForm.vibe}
                      onChange={(e) => setInterestForm({ ...interestForm, vibe: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-500 to-purple-600 text-white font-bold text-xs flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>{editingInterestIndex !== null ? 'Save Changes' : 'Add Hobby'}</span>
                    </button>
                    {editingInterestIndex !== null && (
                      <button
                        type="button"
                        onClick={cancelEditingInterest}
                        className="px-3.5 py-2 rounded-xl bg-dark-800 text-slate-300 hover:text-white text-xs font-mono"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* Existing Hobbies List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Existing Passions ({(data.interests || []).length})
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(data.interests || []).map((item, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-xl bg-dark-900 border border-white/10 flex flex-col justify-between gap-3"
                      >
                        <div>
                          <div className="text-xs font-bold text-white flex items-center justify-between">
                            <span>{item.category}</span>
                            <span className="text-[10px] font-mono text-cyan-400">{item.icon}</span>
                          </div>
                          <p className="text-xs text-slate-300 mt-1 line-clamp-2">{item.description}</p>
                          {item.vibe && (
                            <div className="text-[11px] font-mono text-purple-300 mt-2">
                              ✨ {item.vibe}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
                          <button
                            type="button"
                            onClick={() => startEditingInterest(item, idx)}
                            className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs flex items-center gap-1 font-mono px-2"
                            title="Edit Hobby"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              deleteInterest(idx);
                              showNotification(`Hobby "${item.category}" deleted`);
                            }}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                            title="Delete Hobby"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 7. Export & Code Sync Tab */}
            {activeTab === 'export' && (
              <div className="space-y-6 max-w-2xl">
                <div className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Download className="w-4 h-4 text-cyan-400" />
                    <span>Cloud Sync & Offline Backup</span>
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    All additions and edits are synchronized directly to your <strong className="text-cyan-400">Firebase Cloud Database</strong> in real time and are live for all visitors worldwide instantly. You can also export <code className="text-cyan-300">portfolioData.js</code> anytime as an offline backup.
                  </p>

                  <div className="flex flex-wrap gap-3 pt-2">
                    <button
                      onClick={handleExportData}
                      className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-dark-950 font-bold text-xs flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download portfolioData.js</span>
                    </button>

                    <button
                      onClick={handleCopyJSON}
                      className="px-4 py-2.5 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 border border-white/10 text-xs font-mono flex items-center gap-2 transition-colors"
                    >
                      {copiedExport ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedExport ? 'Copied Code!' : 'Copy Code to Clipboard'}</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 8. Passcode & Reset Tab */}
            {activeTab === 'security' && (
              <div className="space-y-6 max-w-2xl">
                {/* Change Passcode */}
                <form onSubmit={handlePasscodeChange} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    <Key className="w-4 h-4 text-purple-400" />
                    <span>Change Admin Passcode</span>
                  </h4>
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">New Passcode</label>
                    <input
                      type="password"
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                      placeholder="Enter new private phrase..."
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold"
                  >
                    Update Passcode
                  </button>
                </form>

                {/* Factory Reset */}
                <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                  <h4 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-rose-400" />
                    <span>Reset All Data to Original Resume State</span>
                  </h4>
                  <p className="text-xs text-slate-400">
                    Removes all custom projects and skills added in the browser, returning to your original default resume portfolio.
                  </p>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to revert all changes to default?')) {
                        resetToDefaults();
                        showNotification('Reset to factory defaults.');
                      }
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-300 border border-rose-500/40 text-xs font-mono"
                  >
                    Reset Everything
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
