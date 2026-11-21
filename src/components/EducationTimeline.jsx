import React, { useState } from 'react';
import { 
  GraduationCap, 
  Briefcase, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Trophy, 
  Sparkles,
  Layers,
  ChevronRight,
  Code2
} from 'lucide-react';

export default function EducationTimeline({ experience = [], education = [], events = [], languages = [] }) {
  const [activeFilter, setActiveFilter] = useState('all');

  const expList = experience || [];
  const eduList = education || [];
  const evtList = events || [];

  const filterOptions = [
    { id: 'all', label: 'All Milestones', count: expList.length + eduList.length },
    { id: 'work', label: 'Work & Career', count: expList.length, icon: Briefcase },
    { id: 'education', label: 'Academic Journey', count: eduList.length, icon: GraduationCap },
    { id: 'events', label: 'Hackathons & Events', count: evtList.length, icon: Trophy },
  ];

  const showWork = activeFilter === 'all' || activeFilter === 'work';
  const showEducation = activeFilter === 'all' || activeFilter === 'education';
  const showEvents = activeFilter === 'all' || activeFilter === 'events';

  return (
    <section id="timeline" className="py-20 relative">
      {/* Invisible anchor for backward compatibility with #education links */}
      <span id="education" className="absolute -top-24" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Career Milestones & Education</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Experience & <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Academic Journey</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Hands-on full-stack development, software engineering foundations, and competitive hackathon problem solving.
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
                    <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/30 text-cyan-200' : 'bg-white/10 text-slate-400'}`}>
                      {f.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Column: Work Experience & Education Timeline */}
          <div className={`${showEvents && evtList.length > 0 ? 'lg:col-span-7' : 'lg:col-span-12'} space-y-8`}>
            
            {/* 1. Work Experience Section */}
            {showWork && expList.length > 0 && (
              <div className="space-y-6">
                <div className="text-xs font-mono uppercase tracking-wider text-cyan-400 flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-cyan-400" />
                  <span>Work & Industry Experience:</span>
                </div>

                <div className="space-y-6 relative pl-6 border-l-2 border-cyan-500/30">
                  {expList.map((item, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline Node */}
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
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.role}
                          </h3>
                          <p className="text-sm text-cyan-300 font-medium mt-0.5">
                            {item.company}
                          </p>
                          {item.location && (
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {item.location}
                            </p>
                          )}
                        </div>

                        {item.description && (
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pt-1">
                            {item.description}
                          </p>
                        )}

                        {item.technologies && item.technologies.length > 0 && (
                          <div className="pt-2 border-t border-white/5">
                            <div className="flex flex-wrap gap-1.5">
                              {item.technologies.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-300 text-[10px] font-mono border border-cyan-500/20"
                                >
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

            {/* 2. Formal Education Section */}
            {showEducation && eduList.length > 0 && (
              <div className="space-y-6">
                <div className="text-xs font-mono uppercase tracking-wider text-purple-300 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-purple-400" />
                  <span>Academic Trajectory:</span>
                </div>

                <div className="space-y-6 relative pl-6 border-l-2 border-purple-500/30">
                  {eduList.map((edu, idx) => (
                    <div key={idx} className="relative group">
                      {/* Timeline Node */}
                      <div className="absolute -left-[31px] top-2 w-4 h-4 rounded-full bg-dark-950 border-2 border-purple-400 group-hover:scale-125 group-hover:bg-purple-400 transition-all shadow-md shadow-purple-500/40" />

                      <div className="p-5 sm:p-6 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-3">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-purple-950/80 text-purple-300 border border-purple-500/30 font-semibold flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-purple-400" />
                            {edu.period}
                          </span>
                          <span className="text-xs font-mono text-emerald-400 font-semibold">
                            {edu.status}
                          </span>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                            {edu.degree}
                          </h3>
                          <p className="text-sm text-slate-300 font-medium mt-0.5">
                            {edu.institution}
                          </p>
                          {edu.university && (
                            <p className="text-xs font-mono text-purple-300 mt-0.5">
                              {edu.university}
                            </p>
                          )}
                          {edu.location && (
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                              <MapPin className="w-3 h-3 text-slate-500" />
                              {edu.location}
                            </p>
                          )}
                        </div>

                        {edu.coursework && edu.coursework.length > 0 && (
                          <div className="pt-2 border-t border-white/5">
                            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
                              Core Studies:
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {edu.coursework.map((course, cIdx) => (
                                <span
                                  key={cIdx}
                                  className="px-2 py-0.5 rounded bg-dark-900/90 text-slate-300 text-[10px] font-mono border border-white/5"
                                >
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

            {/* Empty State when filter yields 0 */}
            {((showWork && expList.length === 0 && activeFilter === 'work') ||
              (showEducation && eduList.length === 0 && activeFilter === 'education')) && (
              <div className="p-8 text-center glass-panel rounded-2xl border border-white/10 space-y-2">
                <p className="text-sm font-mono text-slate-400">No entries recorded in this category yet.</p>
                <p className="text-xs text-slate-500">You can add your job positions, internships, or degrees anytime from the Admin Dashboard.</p>
              </div>
            )}

          </div>

          {/* Right Column: Hackathons, Workshops & Linguistic Proficiency */}
          {showEvents && (
            <div className="lg:col-span-5 space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400 flex items-center gap-2 mb-4">
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Competitions & Workshops:</span>
              </div>

              <div className="space-y-4">
                {evtList.map((ev, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl glass-panel glass-panel-hover border border-amber-500/20 space-y-3 bg-gradient-to-br from-amber-950/10 via-dark-900 to-dark-950"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/30 font-semibold">
                        {ev.type}
                      </span>
                      <span className="text-xs font-mono text-slate-400">
                        {ev.tag}
                      </span>
                    </div>

                    <h4 className="text-base font-bold text-white">
                      {ev.title}
                    </h4>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {ev.description}
                    </p>
                  </div>
                ))}

                {/* Linguistic Proficiency Spotlight */}
                <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-3">
                  <div className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Linguistic Capabilities:
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 rounded-xl bg-dark-850/80 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🌐</span>
                        <div>
                          <div className="text-xs font-bold text-white">English</div>
                          <div className="text-[10px] text-slate-400">Professional & Technical Working Proficiency</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30">
                        C2 Top Tier
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-850/80 border border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-base">🌴</span>
                        <div>
                          <div className="text-xs font-bold text-white">Malayalam</div>
                          <div className="text-[10px] text-slate-400">Mother Tongue</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/30">
                        Native
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
