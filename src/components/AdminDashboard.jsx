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
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminDashboard({ isOpen, onClose }) {
  const { 
    data, 
    logout, 
    updatePersonalInfo, 
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
    updatePasscode,
    resetToDefaults 
  } = usePortfolio();

  const [activeTab, setActiveTab] = useState('profile');
  const [copiedExport, setCopiedExport] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [editingCertId, setEditingCertId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [editingInterestIndex, setEditingInterestIndex] = useState(null);

  // Interest Form state
  const [interestForm, setInterestForm] = useState({
    category: '',
    description: '',
    vibe: '',
    icon: 'Sparkles'
  });

  // Profile Form state
  const [profileForm, setProfileForm] = useState({
    title: data.personal.title,
    subtitle: data.personal.subtitle,
    tagline: data.personal.tagline,
    availability: data.personal.availability,
    phone: data.personal.phone,
    email: data.personal.email,
    location: data.personal.location
  });

  // New Project Form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: 'Full-Stack MERN',
    type: 'Production Platform',
    tagline: '',
    github: '',
    technologies: '',
    highlights: ''
  });

  // New Cert Form state
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

  // New Skill Form state
  const [skillForm, setSkillForm] = useState({
    categoryId: 'web',
    name: '',
    level: 88,
    tag: 'Web Framework',
    detail: ''
  });

  // Passcode Form state
  const [newPass, setNewPass] = useState('');

  if (!isOpen) return null;

  const showNotification = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    updatePersonalInfo(profileForm);
    showNotification('Profile details updated successfully!');
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
  };

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

  const handleSaveCert = (e) => {
    e.preventDefault();
    if (!certForm.title || !certForm.issuer) return;

    if (editingCertId) {
      updateCertification(editingCertId, {
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date,
        highlight: certForm.highlight,
        badge: certForm.badge,
        description: certForm.description,
        credentialUrl: certForm.credentialUrl,
        tags: certForm.tags.split(',').map(t => t.trim()).filter(Boolean)
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
        tags: certForm.tags.split(',').map(t => t.trim()).filter(Boolean)
      });
      showNotification('New certification added to showcase!');
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });
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
      date: cert.date || new Date().getFullYear().toString(),
      highlight: cert.highlight || 'Verified Credential',
      badge: cert.badge || 'Industry Certified',
      description: cert.description || '',
      tags: Array.isArray(cert.tags) ? cert.tags.join(', ') : (cert.tags || ''),
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

  const handleAddSkill = (e) => {
    e.preventDefault();
    if (!skillForm.name) return;

    addSkill(skillForm.categoryId, {
      name: skillForm.name,
      level: skillForm.level,
      tag: skillForm.tag,
      detail: skillForm.detail
    });

    setSkillForm({
      categoryId: skillForm.categoryId,
      name: '',
      level: 88,
      tag: 'Web Framework',
      detail: ''
    });

    showNotification(`Skill "${skillForm.name}" added to skills radar!`);
  };

  const handleSaveInterest = (e) => {
    e.preventDefault();
    if (!interestForm.category || !interestForm.description) return;

    if (editingInterestIndex !== null) {
      updateInterest(editingInterestIndex, {
        category: interestForm.category,
        description: interestForm.description,
        vibe: interestForm.vibe,
        icon: interestForm.icon || 'Sparkles'
      });
      showNotification('Hobby / Passion updated successfully in cloud!');
      setEditingInterestIndex(null);
    } else {
      addInterest({
        category: interestForm.category,
        description: interestForm.description,
        vibe: interestForm.vibe,
        icon: interestForm.icon || 'Sparkles'
      });
      showNotification('New hobby / passion added to showcase!');
      confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
    }

    setInterestForm({
      category: '',
      description: '',
      vibe: '',
      icon: 'Sparkles'
    });
  };

  const startEditingInterest = (item, index) => {
    setEditingInterestIndex(index);
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

  const handlePasscodeChange = (e) => {
    e.preventDefault();
    if (newPass.length < 4) {
      alert('Passcode should be at least 4 characters');
      return;
    }
    updatePasscode(newPass);
    setNewPass('');
    showNotification('Security passcode updated successfully!');
  };

  const handleExportData = () => {
    const fileContent = `export const portfolioData = ${JSON.stringify(data, null, 2)};\n`;
    const blob = new Blob([fileContent], { type: 'application/javascript;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'portfolioData.js';
    link.click();
    URL.revokeObjectURL(url);
    showNotification('portfolioData.js downloaded!');
  };

  const handleCopyJSON = () => {
    const fileContent = `export const portfolioData = ${JSON.stringify(data, null, 2)};\n`;
    navigator.clipboard.writeText(fileContent);
    setCopiedExport(true);
    setTimeout(() => setCopiedExport(false), 2000);
    showNotification('Copied code to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-5xl rounded-3xl bg-[#090D17] border border-cyan-500/40 shadow-2xl flex flex-col h-[88vh] overflow-hidden">
        
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#0E1526] border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-300 text-xs">
              ADM
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Alfin's Portfolio Control Center</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">
                  ☁️ CLOUD SYNC LIVE
                </span>
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Edits are saved directly to Firebase and published live for all visitors.
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
            
            {/* 1. Profile Tab */}
            {activeTab === 'profile' && (
              <form onSubmit={handleProfileSubmit} className="space-y-5 max-w-2xl">
                <div className="border-b border-white/10 pb-3">
                  <h4 className="text-base font-bold text-white">Basic Information & Availability</h4>
                  <p className="text-xs text-slate-400">Updates the hero banner and contact cards immediately.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Professional Title</label>
                    <input
                      type="text"
                      value={profileForm.title}
                      onChange={(e) => setProfileForm({ ...profileForm, title: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Subtitle / Core Focus</label>
                    <input
                      type="text"
                      value={profileForm.subtitle}
                      onChange={(e) => setProfileForm({ ...profileForm, subtitle: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl bg-dark-900 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>
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

                <div className="space-y-1">
                  <label className="text-xs font-mono text-slate-300">Headline Tagline</label>
                  <textarea
                    rows={2}
                    value={profileForm.tagline}
                    onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
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

                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-2 hover:scale-[1.01] transition-transform"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Profile Updates</span>
                </button>
              </form>
            )}

            {/* 2. Projects Tab */}
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
                          <span>Publish New Project</span>
                        </>
                      )}
                    </h4>
                    {editingProjectId && (
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        Editing Mode
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Project Title *</label>
                      <input
                        type="text"
                        required
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="e.g. AI Prompt Studio"
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category</label>
                      <select
                        value={projectForm.category}
                        onChange={(e) => setProjectForm({ ...projectForm, category: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      >
                        <option value="Full-Stack MERN">Full-Stack MERN</option>
                        <option value="PHP & MySQL">PHP & MySQL</option>
                        <option value="AI & Data">AI & Data</option>
                        <option value="Security">Security</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Tagline / Overview *</label>
                    <input
                      type="text"
                      required
                      value={projectForm.tagline}
                      onChange={(e) => setProjectForm({ ...projectForm, tagline: e.target.value })}
                      placeholder="High-performance system for..."
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">GitHub URL</label>
                      <input
                        type="url"
                        value={projectForm.github}
                        onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                        placeholder="https://github.com/Alfin-Sebastian/..."
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Technologies (comma separated)</label>
                      <input
                        type="text"
                        value={projectForm.technologies}
                        onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                        placeholder="React, Node.js, Express, MongoDB"
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Key Highlights (one per line)</label>
                    <textarea
                      rows={3}
                      value={projectForm.highlights}
                      onChange={(e) => setProjectForm({ ...projectForm, highlights: e.target.value })}
                      placeholder="• Built full-stack booking web app&#10;• Implemented user login and responsive interface&#10;• Created emergency audio safety feature"
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold flex items-center gap-1.5"
                    >
                      {editingProjectId ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{editingProjectId ? 'Save Project Changes' : 'Publish Project'}</span>
                    </button>
                    {editingProjectId && (
                      <button
                        type="button"
                        onClick={cancelEditingProject}
                        className="px-3 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 text-xs font-mono border border-white/10"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* Existing Projects List */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Existing Projects ({data.projects.length})
                  </h4>
                  {data.projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="p-3.5 rounded-xl bg-dark-900 border border-white/10 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="text-xs font-bold text-white">{proj.title}</div>
                        <div className="text-[11px] font-mono text-cyan-400">{proj.category}</div>
                      </div>
                      <div className="flex items-center gap-2">
                        {proj.github && (
                          <a
                            href={proj.github}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-cyan-300 border border-white/10 text-xs"
                            title="View Repository"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <button
                          onClick={() => startEditingProject(proj)}
                          className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs flex items-center gap-1 font-mono px-2"
                          title="Edit Project"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>
                        {proj.id !== 'swiperide' && proj.id !== 'urbanserve' && (
                          <button
                            onClick={() => deleteProject(proj.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                            title="Delete Project"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Certifications Tab */}
            {activeTab === 'certs' && (
              <div className="space-y-8 max-w-3xl">
                {/* Add / Edit Cert Form */}
                <form onSubmit={handleSaveCert} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      {editingCertId ? (
                        <>
                          <Edit2 className="w-4 h-4 text-cyan-400" />
                          <span>Edit Certification & Verification Link</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-4 h-4 text-amber-400" />
                          <span>Add New Certification / Job Simulation</span>
                        </>
                      )}
                    </h4>
                    {editingCertId && (
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        Editing Active
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Certification Title *</label>
                      <input
                        type="text"
                        required
                        value={certForm.title}
                        onChange={(e) => setCertForm({ ...certForm, title: e.target.value })}
                        placeholder="e.g. AWS Certified Developer"
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Issuing Organization *</label>
                      <input
                        type="text"
                        required
                        value={certForm.issuer}
                        onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })}
                        placeholder="Anthropic, Google, Forage, etc."
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Year / Date *</label>
                      <input
                        type="text"
                        required
                        value={certForm.date}
                        onChange={(e) => setCertForm({ ...certForm, date: e.target.value })}
                        placeholder="e.g. 2024, 2025, or 2026"
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Certificate Verification URL (PDF or Verification Link)</label>
                    <input
                      type="url"
                      value={certForm.credentialUrl}
                      onChange={(e) => setCertForm({ ...certForm, credentialUrl: e.target.value })}
                      placeholder="https://academy.claude.com/verify/... or https://...completion_certificate.pdf"
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Description</label>
                    <textarea
                      rows={2}
                      value={certForm.description}
                      onChange={(e) => setCertForm({ ...certForm, description: e.target.value })}
                      placeholder="Summary of skills and competencies verified..."
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Tags (comma separated)</label>
                    <input
                      type="text"
                      value={certForm.tags}
                      onChange={(e) => setCertForm({ ...certForm, tags: e.target.value })}
                      placeholder="Prompt Engineering, Cloud, Python"
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-amber-500/20"
                    >
                      {editingCertId ? (
                        <>
                          <Save className="w-3.5 h-3.5" />
                          <span>Save Certification Changes</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Publish Certification</span>
                        </>
                      )}
                    </button>

                    {editingCertId && (
                      <button
                        type="button"
                        onClick={cancelEditingCert}
                        className="px-3 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 text-xs font-mono border border-white/10"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>

                {/* Existing Certs with Edit and Delete options */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      Existing Certifications ({data.certifications.length})
                    </h4>
                    <span className="text-[11px] font-mono text-slate-500">
                      Click Edit to modify links or details
                    </span>
                  </div>

                  {data.certifications.map((c) => (
                    <div
                      key={c.id}
                      className={`p-3.5 rounded-xl bg-dark-900 border transition-all flex items-center justify-between gap-4 ${
                        editingCertId === c.id ? 'border-cyan-400 bg-cyan-950/20 shadow-md shadow-cyan-500/10' : 'border-white/10'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-white flex items-center gap-2">
                          <span>{c.title}</span>
                          {c.credentialUrl && (
                            <span className="text-[9px] font-mono text-emerald-400 bg-emerald-950/80 px-1.5 py-0.2 rounded border border-emerald-500/30">
                              Linked
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] font-mono text-amber-400">{c.issuer} ({c.date})</div>
                      </div>

                      <div className="flex items-center gap-2">
                        {c.credentialUrl && (
                          <a
                            href={c.credentialUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-cyan-300 border border-white/10 text-xs"
                            title="Test Certificate Link"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}

                        <button
                          onClick={() => startEditingCert(c)}
                          className="p-1.5 rounded-lg bg-cyan-950/60 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/30 text-xs flex items-center gap-1 font-mono px-2"
                          title="Edit Certification"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline">Edit</span>
                        </button>

                        <button
                          onClick={() => deleteCertification(c.id)}
                          className="p-1.5 rounded-lg bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-500/30 text-xs"
                          title="Delete Certification"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Skills Tab */}
            {activeTab === 'skills' && (
              <div className="space-y-6 max-w-2xl">
                <form onSubmit={handleAddSkill} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <div className="border-b border-white/10 pb-2">
                    <h4 className="text-sm font-bold text-white">Add New Skill to Radar</h4>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category</label>
                      <select
                        value={skillForm.categoryId}
                        onChange={(e) => setSkillForm({ ...skillForm, categoryId: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      >
                        {data.skills.categories.map(c => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Skill Name *</label>
                      <input
                        type="text"
                        required
                        value={skillForm.name}
                        onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                        placeholder="e.g. Next.js, Redis, Docker"
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Proficiency Level ({skillForm.level}%)</label>
                      <input
                        type="range"
                        min="50"
                        max="100"
                        value={skillForm.level}
                        onChange={(e) => setSkillForm({ ...skillForm, level: Number(e.target.value) })}
                        className="w-full"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Skill Tag</label>
                      <input
                        type="text"
                        value={skillForm.tag}
                        onChange={(e) => setSkillForm({ ...skillForm, tag: e.target.value })}
                        placeholder="Framework / Database / Tool"
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Practical Detail</label>
                    <input
                      type="text"
                      value={skillForm.detail}
                      onChange={(e) => setSkillForm({ ...skillForm, detail: e.target.value })}
                      placeholder="e.g. Server components, caching, routing"
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold"
                  >
                    Add to Skills Radar
                  </button>
                </form>

                {/* Existing Skills List */}
                <div className="space-y-4">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Existing Skills by Category
                  </h4>
                  {data.skills.categories.map((cat) => (
                    <div key={cat.id} className="p-4 rounded-2xl bg-dark-900 border border-white/10 space-y-2">
                      <div className="text-xs font-bold text-cyan-400 flex items-center justify-between">
                        <span>{cat.name}</span>
                        <span className="text-[10px] font-mono text-slate-400">{cat.skills.length} skills</span>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-1">
                        {cat.skills.map((s) => (
                          <div
                            key={s.name}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-dark-850 border border-white/10 text-xs text-slate-200"
                          >
                            <span>{s.name}</span>
                            <span className="text-[10px] font-mono text-cyan-400">({s.level}%)</span>
                            <button
                              type="button"
                              onClick={() => {
                                deleteSkill(cat.id, s.name);
                                showNotification(`Skill "${s.name}" removed from ${cat.name}`);
                              }}
                              className="ml-1 text-slate-500 hover:text-rose-400 transition-colors"
                              title={`Remove ${s.name}`}
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Hobbies & Passions Tab */}
            {activeTab === 'interests' && (
              <div className="space-y-8 max-w-3xl">
                {/* Add / Edit Form */}
                <form onSubmit={handleSaveInterest} className="p-5 rounded-2xl bg-dark-900/90 border border-white/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <h4 className="text-sm font-bold text-white flex items-center gap-2">
                      <Heart className="w-4 h-4 text-pink-400" />
                      <span>{editingInterestIndex !== null ? 'Edit Hobby / Passion' : 'Add New Hobby & Creative Interest'}</span>
                    </h4>
                    {editingInterestIndex !== null && (
                      <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                        Editing Item #{editingInterestIndex + 1}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Category Name *</label>
                      <input
                        type="text"
                        required
                        value={interestForm.category}
                        onChange={(e) => setInterestForm({ ...interestForm, category: e.target.value })}
                        placeholder="e.g. Reading Manhwas, Video Games"
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-slate-300">Icon</label>
                      <select
                        value={interestForm.icon}
                        onChange={(e) => setInterestForm({ ...interestForm, icon: e.target.value })}
                        className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                      >
                        <option value="BookOpen">📖 BookOpen (Reading / Manga)</option>
                        <option value="Film">🎬 Film (Anime / Cinema)</option>
                        <option value="Activity">⚽ Activity (Sports / Football)</option>
                        <option value="Cpu">🤖 Cpu (AI / Technology)</option>
                        <option value="Sparkles">✨ Sparkles (Creative)</option>
                        <option value="Heart">❤️ Heart (Passions)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Core Inspiration / Mindset Vibe</label>
                    <input
                      type="text"
                      value={interestForm.vibe}
                      onChange={(e) => setInterestForm({ ...interestForm, vibe: e.target.value })}
                      placeholder="e.g. Continuous leveling up & determination"
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-slate-300">Personal Description *</label>
                    <textarea
                      rows={2}
                      required
                      value={interestForm.description}
                      onChange={(e) => setInterestForm({ ...interestForm, description: e.target.value })}
                      placeholder="What you love about this hobby and how it reflects your character..."
                      className="w-full px-3 py-2 rounded-xl bg-dark-850 border border-white/10 text-white text-xs focus:border-cyan-400 outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-pink-500/20"
                    >
                      {editingInterestIndex !== null ? <Save className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                      <span>{editingInterestIndex !== null ? 'Save Hobby Updates' : 'Publish Hobby to Live Site'}</span>
                    </button>
                    {editingInterestIndex !== null && (
                      <button
                        type="button"
                        onClick={cancelEditingInterest}
                        className="px-3 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-300 text-xs font-mono border border-white/10"
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

            {/* 6. Export Tab */}
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

            {/* 6. Security Tab */}
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
