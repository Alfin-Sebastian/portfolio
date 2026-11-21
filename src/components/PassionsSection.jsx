import React from 'react';
import { BookOpen, Film, Activity, Cpu, Sparkles, Heart } from 'lucide-react';

export default function PassionsSection({ interests }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-purple-400" />;
      case 'Film': return <Film className="w-5 h-5 text-cyan-400" />;
      case 'Activity': return <Activity className="w-5 h-5 text-emerald-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-400" />;
      case 'Heart': return <Heart className="w-5 h-5 text-pink-400" />;
      default: return <Sparkles className="w-5 h-5 text-cyan-400" />;
    }
  };

  const list = interests || [];

  return (
    <section id="passions" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-purple-300">
            <Heart className="w-3.5 h-3.5 text-purple-400" />
            <span>Beyond The Terminal</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Creative Mindset & <span className="bg-gradient-to-r from-purple-400 via-pink-300 to-cyan-400 bg-clip-text text-transparent">Personal Passions</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            The creative disciplines, tactical sports, and narrative art that fuel focus, strategic thinking, and aesthetic intuition.
          </p>
        </div>

        {/* Dynamic Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl glass-panel glass-panel-hover border border-white/10 flex flex-col justify-between space-y-4 transition-all"
            >
              <div className="space-y-3">
                <div className="p-3 w-fit rounded-2xl bg-dark-850 border border-white/10">
                  {getIcon(item.icon)}
                </div>
                <h3 className="text-lg font-bold text-white">
                  {item.category}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  Core Inspiration:
                </div>
                <div className="text-xs font-mono text-cyan-300 mt-1">
                  {item.vibe}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
