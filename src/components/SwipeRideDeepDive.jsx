import React, { useState } from 'react';
import { 
  Car, 
  ShieldAlert, 
  Radio, 
  MapPin, 
  CheckCircle2, 
  Navigation, 
  PhoneCall, 
  Mic, 
  Volume2, 
  ExternalLink, 
  Github, 
  Cpu, 
  Lock, 
  RotateCcw,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function SwipeRideDeepDive({ project }) {
  const [activeStage, setActiveStage] = useState(1);
  const [sosActive, setSosActive] = useState(false);
  const [sosRecordedSeconds, setSosRecordedSeconds] = useState(0);

  const stages = project?.rideStages || [];
  const currentStageData = stages.find(s => s.stage === activeStage) || stages[0] || {};

  const handleTriggerSOS = () => {
    if (sosActive) {
      setSosActive(false);
      return;
    }
    setSosActive(true);
    setSosRecordedSeconds(1);

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#EF4444', '#F59E0B', '#DC2626']
    });

    // Simulate 5 seconds timer
    const interval = setInterval(() => {
      setSosRecordedSeconds(prev => {
        if (prev >= 6) {
          clearInterval(interval);
          return 6;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <section id="deep-dive" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Car className="w-3.5 h-3.5 text-cyan-400" />
            <span>Major Capstone Project Spotlight</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            SwipeRide <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Interactive Architecture</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            A production-ready ride-sharing platform built with the MERN stack. Test the live 4-stage lifecycle workflow simulator and the flagship emergency SOS audio module below.
          </p>
        </div>

        {/* The Main Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive State Machine & Architecture Details */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Stage Selector Pills */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                  4-Stage Ride Lifecycle State Machine
                </span>
                <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
                  Stage {activeStage} of 4
                </span>
              </div>

              {/* Step indicator buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {stages.map((stg) => {
                  const isActive = stg.stage === activeStage;
                  return (
                    <button
                      key={stg.stage}
                      onClick={() => setActiveStage(stg.stage)}
                      className={`p-3 rounded-xl text-left border transition-all ${
                        isActive
                          ? 'bg-gradient-to-b from-cyan-950/90 to-dark-900 border-cyan-400 shadow-lg shadow-cyan-500/20'
                          : 'bg-dark-850/60 hover:bg-dark-800 border-white/5 text-slate-400 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className={isActive ? 'text-cyan-400 font-bold' : 'text-slate-500'}>
                          0{stg.stage}
                        </span>
                        {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />}
                      </div>
                      <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {stg.name}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Active Stage Deep Details Box */}
              <div className="p-4 rounded-xl bg-dark-900/90 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-xs font-mono font-semibold border ${currentStageData.badgeColor}`}>
                      {currentStageData.status}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">RESTful State Trigger</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-dark-850/80 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">Rider App State</div>
                    <div className="text-slate-200">{currentStageData.riderPrompt}</div>
                  </div>
                  <div className="p-3 rounded-lg bg-dark-850/80 border border-white/5 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-purple-400">Driver App State</div>
                    <div className="text-slate-200">{currentStageData.driverPrompt}</div>
                  </div>
                </div>

                <div className="text-xs font-mono text-slate-400 pt-1 flex items-center gap-2">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                  <span><strong className="text-slate-300">Backend Logic:</strong> {currentStageData.techDetail}</span>
                </div>

                {/* Next Stage Navigation Button */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => setActiveStage(prev => (prev < 4 ? prev + 1 : 1))}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors"
                  >
                    <span>{activeStage < 4 ? 'Simulate Next Stage' : 'Restart Lifecycle Flow'}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

            </div>

            {/* Architecture Highlights & GitHub Access */}
            <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Layers className="w-3.5 h-3.5 text-purple-400" />
                  Full-Stack MERN Architecture
                </span>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>View Repository</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-dark-850/70 border border-white/5">
                  <div className="text-xs font-mono text-slate-400">Database</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">MongoDB</div>
                  <div className="text-[10px] text-slate-500">Document data store</div>
                </div>
                <div className="p-3 rounded-xl bg-dark-850/70 border border-white/5">
                  <div className="text-xs font-mono text-slate-400">Server</div>
                  <div className="text-sm font-bold text-cyan-400 mt-0.5">Express / Node</div>
                  <div className="text-[10px] text-slate-500">REST API & routing</div>
                </div>
                <div className="p-3 rounded-xl bg-dark-850/70 border border-white/5">
                  <div className="text-xs font-mono text-slate-400">Client</div>
                  <div className="text-sm font-bold text-purple-400 mt-0.5">React.js</div>
                  <div className="text-[10px] text-slate-500">Interactive UI components</div>
                </div>
                <div className="p-3 rounded-xl bg-dark-850/70 border border-white/5">
                  <div className="text-xs font-mono text-slate-400">Security</div>
                  <div className="text-sm font-bold text-amber-400 mt-0.5">User Auth</div>
                  <div className="text-[10px] text-slate-500">Login & route protection</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Simulated Mobile Device with Live SOS Alert Feature */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-sm rounded-[2.5rem] bg-dark-950 p-4 border-[3px] border-slate-700/80 shadow-2xl shadow-cyan-950/40">
              
              {/* Speaker / Notch bar */}
              <div className="w-28 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-slate-900" />
              </div>

              {/* Screen Area */}
              <div className="rounded-2xl bg-[#090D16] border border-white/10 p-4 space-y-4 overflow-hidden relative min-h-[480px] flex flex-col justify-between">
                
                {/* Mobile Top Bar */}
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pb-2 border-b border-white/10">
                  <span className="font-bold text-white tracking-wider">SwipeRide OS</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <Radio className="w-3 h-3 animate-pulse" /> 5G LIVE
                  </span>
                </div>

                {/* Simulated Map / Route Canvas */}
                <div className="relative h-36 rounded-xl bg-dark-900 border border-cyan-500/20 overflow-hidden flex items-center justify-center p-3">
                  <div className="absolute inset-0 cyber-grid opacity-30" />
                  
                  {/* Simulated Route Line */}
                  <div className="relative w-full flex items-center justify-between px-4 z-10">
                    <div className="flex flex-col items-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-cyan-400 ring-4 ring-cyan-500/20 animate-pulse" />
                      <span className="text-[9px] font-mono text-cyan-300 mt-1">MG Univ</span>
                    </div>

                    <div className="flex-1 mx-2 border-t-2 border-dashed border-cyan-500/60 relative">
                      <div 
                        className="absolute -top-3 transition-all duration-700"
                        style={{ left: `${(activeStage / 4) * 85}%` }}
                      >
                        <Car className="w-5 h-5 text-emerald-400 transform -rotate-12" />
                      </div>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-purple-400 ring-4 ring-purple-500/20" />
                      <span className="text-[9px] font-mono text-purple-300 mt-1">Kottayam Stn</span>
                    </div>
                  </div>
                </div>

                {/* Dynamic Status Card */}
                <div className="p-3 rounded-xl bg-dark-850 border border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white">Ride Status:</span>
                    <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${currentStageData.badgeColor}`}>
                      {currentStageData.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300">
                    {currentStageData.riderPrompt}
                  </div>
                </div>

                {/* SOS Emergency Module Interactive Demo */}
                <div className={`p-4 rounded-xl border transition-all duration-300 ${
                  sosActive
                    ? 'bg-rose-950/80 border-rose-500 shadow-xl shadow-rose-900/40'
                    : 'bg-dark-850/80 border-white/10 hover:border-rose-500/40'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                      <ShieldAlert className="w-4 h-4 animate-bounce" />
                      <span>SOS Emergency Alert Engine</span>
                    </div>
                    {sosActive && (
                      <span className="text-[10px] font-mono bg-rose-500/30 text-rose-300 px-1.5 py-0.5 rounded animate-pulse">
                        RECORDING
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-300 mb-3">
                    {sosActive
                      ? 'Live emergency broadcast active. Capturing audio stream...'
                      : 'Simulate rider emergency alert with automatic audio recording & coordinate dispatch.'}
                  </p>

                  {/* Audio Waveform visualization when active */}
                  {sosActive && (
                    <div className="flex items-center justify-center gap-1.5 h-9 my-2 bg-black/40 rounded-lg px-3">
                      <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                      <div className="flex items-center gap-1 h-6">
                        {[6, 18, 24, 12, 28, 16, 22, 10, 26, 14].map((h, i) => (
                          <span
                            key={i}
                            className="w-1 bg-rose-400 rounded-full soundwave-bar"
                            style={{ animationDelay: `${i * 0.12}s` }}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-mono text-rose-300 ml-2">
                        00:0{sosRecordedSeconds}s
                      </span>
                    </div>
                  )}

                  <button
                    onClick={handleTriggerSOS}
                    className={`w-full py-2 px-3 rounded-lg font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                      sosActive
                        ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-600/30'
                        : 'bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>{sosActive ? 'Stop Emergency Alert' : 'Trigger SOS Alert Demo'}</span>
                  </button>
                </div>

                {/* Bottom simulated navigation button */}
                <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                  <span>Fare: ₹185.00</span>
                  <span className="text-cyan-400">Driver ETA: 3 min</span>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
