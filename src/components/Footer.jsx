import React from 'react';
import { ArrowUp, Github, Linkedin, Mail, Heart, Sparkles } from 'lucide-react';

export default function Footer({ personal, onOpenTerminal }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-[#06080D] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-12 border-b border-white/10">
          
          {/* Logo & Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-300 text-sm">
                AS
              </div>
              <span className="font-display font-bold text-white text-lg tracking-tight">
                Alfin Sebastian
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">
              Full-Stack Web Developer • MERN Stack & PHP/MySQL • Kottayam, Kerala
            </p>
          </div>

          {/* Socials & Terminal Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenTerminal}
              className="px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-cyan-300 border border-white/10 text-xs font-mono transition-colors"
            >
              Console (~/$)
            </button>
            <a
              href={personal.github}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-dark-850 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personal.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-dark-850 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="p-2 rounded-lg bg-dark-850 text-slate-400 hover:text-white border border-white/10 transition-colors"
              title="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 border border-cyan-500/40 transition-colors ml-2"
              title="Scroll back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 font-mono gap-4">
          <div>
            © {new Date().getFullYear()} Alfin Sebastian. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with precision in</span>
            <span className="text-cyan-400 font-bold">Kerala, India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
