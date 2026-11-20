import React from 'react';
import { GraduationCap, Calendar, MapPin, BookOpen, Trophy, Sparkles } from 'lucide-react';

export default function EducationTimeline({ education, events }) {
  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Milestones & Competitions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Education & <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Hackathons</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Rigorous foundations in computer applications, software engineering principles, and rapid state-level hackathon problem solving.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Formal Education */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Academic Trajectory:</span>
            </div>

            <div className="space-y-6 relative pl-6 border-l-2 border-white/10">
              {education.map((edu, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-dark-950 border-2 border-cyan-400 group-hover:scale-125 group-hover:bg-cyan-400 transition-all shadow-md shadow-cyan-500/30" />

                  <div className="p-5 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/30 font-semibold">
                        {edu.period}
                      </span>
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        {edu.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
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
                      <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {edu.location}
                      </p>
                    </div>

                    {edu.coursework && (
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

          {/* Right Column: Hackathons & Specialized Workshops */}
          <div className="lg:col-span-5 space-y-6">
            <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2 mb-4">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Competitions & Workshops:</span>
            </div>

            <div className="space-y-4">
              {events.map((ev, idx) => (
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

              {/* Language Proficiency Spotlight */}
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

        </div>

      </div>
    </section>
  );
}
