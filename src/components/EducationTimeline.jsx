import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  Trophy, 
  Sparkles,
  Layers,
  Code2,
  Globe,
  Languages,
  CheckCircle2
} from 'lucide-react';

export default function EducationTimeline({ experience = [], education = [], events = [], languages = [] }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const expList = experience || [];
  const eduList = education || [];
  const evtList = events || [];

  const defaultLanguages = [
    {
      name: "English",
      level: "Professional & Technical Working Proficiency",
      proficiency: "Fluent (EF SET C2 Proficient)",
      badge: "C2 Top Tier",
      flag: "🌐"
    },
    {
      name: "Malayalam",
      level: "Mother Tongue",
      proficiency: "Native Speaker",
      badge: "Native",
      flag: "🌴"
    }
  ];

  const langList = (languages && languages.length > 0) ? languages : defaultLanguages;

  const filterOptions = [
    { id: 'all', label: 'All Milestones', count: expList.length + eduList.length + evtList.length + langList.length },
    { id: 'work', label: 'Work & Career', count: expList.length, icon: Briefcase },
    { id: 'education', label: 'Academic Journey', count: eduList.length, icon: GraduationCap },
    { id: 'events', label: 'Hackathons & Events', count: evtList.length, icon: Trophy },
    { id: 'languages', label: 'Languages & Linguistics', count: langList.length, icon: Languages },
  ];

  const isAll = activeFilter === 'all';
  const isWork = activeFilter === 'work';
  const isEdu = activeFilter === 'education';
  const isEvents = activeFilter === 'events';
  const isLanguages = activeFilter === 'languages';

  return (
    <section id="timeline" className="py-20 relative">
      {/* Invisible anchor for backward compatibility with #education links */}
      <span id="education" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Milestones &amp; Education</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Experience &amp; <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Academic Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Hands-on full-stack development, software engineering foundations, competitive hackathons, and multilingual communication.
          </p>

          {/* Filter Pills */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-2">
            {filterOptions.map((f) => {
              const Icon = f.icon;
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-semibold shadow-lg shadow-cyan-500/25 border border-cyan-400/40'
                      : 'bg-dark-850/80 hover:bg-dark-800 text-slate-300 border border-white/5 hover:border-white/20'
                  }`}
                >
                  {Icon && <Icon className="w-3.5 h-3.5" />}
                  <span>{f.label}</span>
                  {f.count > 0 && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-black/30 text-cyan-200' : 'bg-white/10 text-slate-400'}`}>
                      {f.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── 1. DEDICATED: HACKATHONS & EVENTS (FULL WIDTH) ── */}
        {isEvents && (
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Competitions &amp; Hackathons ({evtList.length}):</span>
            </div>
            {evtList.length === 0 ? (
              <div className="p-8 text-center glass-panel rounded-2xl border border-white/10 space-y-2">
                <p className="text-sm font-mono text-slate-400">No hackathons or events recorded yet.</p>
                <p className="text-xs text-slate-500">Add them anytime from the Admin Dashboard.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {evtList.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl glass-panel glass-panel-hover border border-amber-500/20 space-y-3 bg-gradient-to-br from-amber-950/10 via-dark-900 to-dark-950 transition-all hover:border-amber-500/40"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-semibold">
                        {ev.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400">{ev.tag}</span>
                    </div>
                    <h4 className="text-base font-bold text-white leading-snug">{ev.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── 2. DEDICATED: LANGUAGES & LINGUISTICS (FULL WIDTH) ── */}
        {isLanguages && (
          <div className="space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2 mb-2">
              <Languages className="w-4 h-4 text-cyan-400" />
              <span>Linguistic Capabilities &amp; Communication ({langList.length}):</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {langList.map((lang, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl glass-panel glass-panel-hover border border-cyan-500/30 space-y-4 bg-gradient-to-br from-cyan-950/20 via-dark-900 to-dark-950 relative overflow-hidden group transition-all"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <span className="text-3xl p-3 rounded-2xl bg-dark-850 border border-white/10 shadow-inner">
                        {lang.flag || '🌐'}
                      </span>
                      <div>
                        <h4 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {lang.name}
                        </h4>
                        <p className="text-xs font-mono text-cyan-300/90 mt-0.5">
                          {lang.level || lang.description || 'Fluent'}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-mono text-cyan-300 font-bold px-3 py-1 rounded-full bg-cyan-950 border border-cyan-500/30 whitespace-nowrap">
                      {lang.badge || 'Fluent'}
                    </span>
                  </div>

                  {lang.proficiency && (
                    <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Proficiency Benchmark:</span>
                      </span>
                      <span className="text-white font-semibold">{lang.proficiency}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 3. WORK, EDUCATION, OR ALL ── */}
        {(isAll || isWork || isEdu) && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left / Main Column */}
            <div className={`${isAll ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-8`}>

              {/* 1. Work Experience */}
              {(isAll || isWork) && expList.length > 0 && (
                <div className="space-y-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-cyan-400" />
                    <span>Work &amp; Industry Experience:</span>
                  </div>

                  <div className="space-y-6 relative pl-6 border-l-2 border-cyan-500/30">
                    {expList.map((item, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-dark-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/40" />
                        <div className="p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover border border-cyan-500/30 bg-gradient-to-br from-cyan-950/20 via-dark-900 to-dark-950 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-cyan-400" />
                              {item.period}
                            </span>
                            <span className="text-xs font-mono text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                              {item.status || 'Active'}
                            </span>
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">{item.role}</h3>
                            <p className="text-sm text-cyan-300 font-medium mt-0.5">{item.company}</p>
                            {item.location && (
                              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                {item.location}
                              </p>
                            )}
                          </div>
                          {item.description && (
                            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">{item.description}</p>
                          )}
                          {item.technologies && item.technologies.length > 0 && (
                            <div className="pt-2 border-t border-white/5">
                              <div className="flex flex-wrap gap-1.5">
                                {item.technologies.map((tech, tIdx) => (
                                  <span key={tIdx} className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 text-[10px] font-mono border border-cyan-500/20">
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. Formal Education */}
              {(isAll || isEdu) && eduList.length > 0 && (
                <div className="space-y-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-purple-300 flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-purple-400" />
                    <span>Academic Trajectory:</span>
                  </div>

                  <div className="space-y-6 relative pl-6 border-l-2 border-purple-500/30">
                    {eduList.map((edu, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-dark-950 border-2 border-purple-400 group-hover:scale-125 group-hover:bg-purple-400 transition-all shadow-md shadow-purple-500/40" />
                        <div className="p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-3">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 font-semibold flex items-center gap-1.5">
                              <Calendar className="w-3 h-3 text-purple-400" />
                              {edu.period}
                            </span>
                            <span className="text-xs font-mono text-emerald-400 font-semibold">{edu.status}</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">{edu.degree}</h3>
                            <p className="text-sm text-slate-300 font-medium mt-0.5">{edu.institution}</p>
                            {edu.university && <p className="text-xs font-mono text-purple-300 mt-0.5">{edu.university}</p>}
                            {edu.location && (
                              <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                                <MapPin className="w-3 h-3 text-slate-500" />
                                {edu.location}
                              </p>
                            )}
                          </div>
                          {edu.coursework && edu.coursework.length > 0 && (
                            <div className="pt-2 border-t border-white/5">
                              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">Core Studies:</div>
                              <div className="flex flex-wrap gap-1.5">
                                {edu.coursework.map((course, cIdx) => (
                                  <span key={cIdx} className="px-2 py-0.5 rounded bg-dark-900/90 text-slate-300 text-[10px] font-mono border border-white/5">
                                    {course}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Empty States */}
              {isWork && expList.length === 0 && (
                <div className="p-8 text-center glass-panel rounded-2xl border border-white/10 space-y-2">
                  <p className="text-sm font-mono text-slate-400">No work experience recorded yet.</p>
                  <p className="text-xs text-slate-500">Add your jobs or internships from the Admin Dashboard.</p>
                </div>
              )}
              {isEdu && eduList.length === 0 && (
                <div className="p-8 text-center glass-panel rounded-2xl border border-white/10 space-y-2">
                  <p className="text-sm font-mono text-slate-400">No education entries recorded yet.</p>
                  <p className="text-xs text-slate-500">Add your degrees from the Admin Dashboard.</p>
                </div>
              )}

            </div>

            {/* Right Column (shown in All Milestones): Hackathons & Languages Spotlight */}
            {isAll && (
              <div className="lg:col-span-5 space-y-6">
                
                {/* Competitions */}
                {evtList.length > 0 && (
                  <div className="space-y-4">
                    <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-amber-400" />
                        <span>Competitions &amp; Workshops:</span>
                      </span>
                      <button
                        onClick={() => setActiveFilter('events')}
                        className="text-[10px] font-mono text-amber-300 hover:underline"
                      >
                        Filter ({evtList.length}) →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {evtList.map((ev, idx) => (
                        <div
                          key={idx}
                          className="p-5 rounded-2xl glass-panel glass-panel-hover border border-amber-500/20 space-y-2 bg-gradient-to-br from-amber-950/10 via-dark-900 to-dark-950"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-semibold">
                              {ev.type}
                            </span>
                            <span className="text-xs font-mono text-slate-400">{ev.tag}</span>
                          </div>
                          <h4 className="text-sm font-bold text-white">{ev.title}</h4>
                          <p className="text-xs text-slate-300 leading-relaxed">{ev.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Linguistic Capabilities Spotlight */}
                <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <Languages className="w-3.5 h-3.5" />
                      <span>Linguistic Capabilities:</span>
                    </span>
                    <button
                      onClick={() => setActiveFilter('languages')}
                      className="text-[10px] font-mono text-cyan-400 hover:underline"
                    >
                      Filter ({langList.length}) →
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {langList.map((lang, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-dark-850/80 border border-white/5 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <span className="text-lg">{lang.flag || '🌐'}</span>
                          <div>
                            <div className="text-xs font-bold text-white">{lang.name}</div>
                            <div className="text-[10px] text-slate-400">{lang.level || lang.description || 'Fluent'}</div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 whitespace-nowrap">
                          {lang.badge || 'Fluent'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
