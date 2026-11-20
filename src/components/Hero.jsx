import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Copy, 
  Check, 
  Terminal, 
  ArrowRight, 
  Github, 
  Linkedin, 
  Mail, 
  Phone, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Code,
  Layers,
  Award,
  Globe2
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero({ data, onOpenTerminal }) {
  const [copiedField, setCopiedField] = useState(null);
  const [localTime, setLocalTime] = useState('');

  // Live Kerala Clock (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
      setLocalTime(new Intl.DateTimeFormat('en-IN', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#00F0FF', '#10B981', '#8B5CF6']
    });
    setTimeout(() => setCopiedField(null), 2200);
  };

  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Introduction */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Status Pill with live pulse */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-dark-850/90 border border-cyan-500/30 text-xs font-mono shadow-lg shadow-cyan-950/40">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span className="text-slate-300">Open to Roles & Relocation</span>
              <span className="text-slate-500">|</span>
              <span className="text-cyan-400 font-semibold flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Kottayam, Kerala
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-3">
              <div className="text-xs sm:text-sm font-mono tracking-widest text-cyan-400 uppercase font-semibold">
                Hi, I am
              </div>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08]">
                Alfin <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Sebastian</span>
              </h1>
              <p className="text-lg sm:text-2xl font-light text-slate-300 max-w-2xl font-sans leading-snug">
                AI-Native Web Developer building interactive <span className="text-white font-medium">MERN</span> and <span className="text-white font-medium">PHP/MySQL</span> web applications through modern prototyping and AI workflows.
              </p>
            </div>

            {/* Bio summary */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl font-normal leading-relaxed">
              BCA Graduate (2026) certified in <span className="text-amber-300 font-medium">Anthropic Claude 101</span> and holding <span className="text-cyan-300 font-medium">C2 Proficient English</span> fluency. Combining practical web development with AI-assisted vibe coding to ship clean, responsive digital solutions rapidly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white font-semibold text-sm shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Explore Full-Stack Works</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={onOpenTerminal}
                className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-xl bg-dark-850/80 hover:bg-dark-800 text-slate-200 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-sm font-mono transition-all shadow-inner group"
              >
                <Terminal className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
                <span>Launch Interactive CLI</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 text-sm font-medium transition-all"
              >
                <span>Contact Me</span>
              </a>
            </div>

            {/* Social & Contact Bar */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-slate-400">
              <a
                href={data.personal.github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg bg-dark-850/50 border border-white/5 hover:border-white/20"
              >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={data.personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg bg-dark-850/50 border border-white/5 hover:border-white/20"
              >
                <Linkedin className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
              <button
                onClick={() => copyToClipboard(data.personal.email, 'email')}
                className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors px-3 py-1.5 rounded-lg bg-dark-850/50 border border-white/5 hover:border-white/20"
                title="Click to copy email"
              >
                <Mail className="w-4 h-4 text-purple-400" />
                <span>{data.personal.email}</span>
                {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-500" />}
              </button>
            </div>

          </div>

          {/* Right Column: Holographic Interactive Profile & Live Console Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative ambient glow ring */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-500 via-purple-600 to-emerald-500 opacity-30 blur-xl group-hover:opacity-50 transition duration-1000 animate-pulse" />

              {/* Glass Card */}
              <div className="relative rounded-2xl glass-panel p-6 sm:p-7 border border-white/15 shadow-2xl space-y-6">
                
                {/* Header bar */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-xs font-mono text-slate-400">alfin_core_sys.v2</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    <Globe2 className="w-3 h-3 animate-spin-slow" />
                    <span>IST: {localTime || '10:20 AM'}</span>
                  </div>
                </div>

                {/* Identity Spotlight */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 p-[2px] shadow-lg shadow-cyan-500/20">
                    <div className="w-full h-full bg-[#0B0F19] rounded-2xl flex items-center justify-center font-display font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 via-white to-purple-300">
                      AS
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-1.5">
                      Alfin Sebastian
                      <ShieldCheck className="w-4 h-4 text-emerald-400" title="Verified Credentials" />
                    </h3>
                    <p className="text-xs font-mono text-cyan-300">Full-Stack Engineer</p>
                    <p className="text-xs text-slate-400">Kristu Jyothi College, MG University</p>
                  </div>
                </div>

                {/* Interactive Tech Orbitals / Quick highlights */}
                <div className="space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Key Weaponry</span>
                    <span className="text-emerald-400 font-semibold">Active Ready</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-xl bg-dark-850/80 border border-cyan-500/20 hover:border-cyan-400 transition-colors">
                      <div className="text-cyan-400 font-mono font-bold text-sm">MERN</div>
                      <div className="text-[10px] text-slate-400">React + Node + Mongo</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-dark-850/80 border border-purple-500/20 hover:border-purple-400 transition-colors">
                      <div className="text-purple-400 font-mono font-bold text-sm">PHP & MySQL</div>
                      <div className="text-[10px] text-slate-400">Full-Stack Web</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-dark-850/80 border border-amber-500/20 hover:border-amber-400 transition-colors">
                      <div className="text-amber-400 font-mono font-bold text-sm">Claude AI</div>
                      <div className="text-[10px] text-slate-400">Anthropic Certified</div>
                    </div>
                  </div>
                </div>

                {/* Live Quick Phone & Direct Action */}
                <div className="p-3.5 rounded-xl bg-dark-900/90 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-cyan-400" />
                      Direct Line:
                    </span>
                    <button
                      onClick={() => copyToClipboard(data.personal.phone, 'phone')}
                      className="text-slate-200 hover:text-cyan-300 flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <span>{data.personal.phone}</span>
                      {copiedField === 'phone' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-500" />}
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      English Level:
                    </span>
                    <span className="text-emerald-300 font-semibold px-2 py-0.5 rounded bg-emerald-950/50 border border-emerald-500/30">
                      C2 Proficient (CEFR)
                    </span>
                  </div>
                </div>

                {/* Terminal Quick Callout */}
                <div className="pt-1">
                  <button
                    onClick={onOpenTerminal}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-cyan-950/80 to-purple-950/80 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-mono flex items-center justify-between group transition-all"
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-emerald-400">$</span>
                      <span>run alfin.inspectProfile()</span>
                    </span>
                    <span className="text-[11px] text-slate-400 group-hover:text-white group-hover:translate-x-1 transition-all">
                      Try Terminal &rarr;
                    </span>
                  </button>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Bottom Hero Stats Bento Ribbon */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {data.personal.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl glass-panel glass-panel-hover border border-white/10"
            >
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-white flex items-center gap-2">
                <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  {stat.value}
                </span>
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-200 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                {stat.detail}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
