import React, { useState } from 'react';
import { 
  Briefcase, 
  Users, 
  ShieldCheck, 
  UserCheck, 
  Database, 
  CheckCircle, 
  ExternalLink, 
  Github, 
  KeyRound, 
  FileCheck2, 
  Layers, 
  Sparkles 
} from 'lucide-react';

export default function UrbanServeSimulator({ project }) {
  const [activeRole, setActiveRole] = useState('Customer');

  const roles = project?.roles || [];
  const currentRoleData = roles.find(r => r.role === activeRole) || roles[0] || {};

  return (
    <section className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Card Wrapper */}
        <div className="rounded-3xl glass-panel p-6 sm:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          
          {/* Ambient background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/80 border border-purple-500/30 text-xs font-mono text-purple-300 mb-2">
                <Briefcase className="w-3.5 h-3.5 text-purple-400" />
                <span>Full-Stack Web App • PHP & MySQL</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
                UrbanServe — <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Local Service Management System</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
                A localized service marketplace connecting customers with neighborhood technicians, featuring 3 distinct dashboard views for Customers, Providers, and Admins.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/30 text-xs font-mono transition-all"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Source</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Interactive Role Switcher & Live Dashboard Mockup */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Role Selection Tabs & Feature Matrix */}
            <div className="lg:col-span-5 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span>Select Role-Based View to Inspect Access Control:</span>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {project.roles.map((r) => {
                  const isActive = r.role === activeRole;
                  return (
                    <button
                      key={r.role}
                      onClick={() => setActiveRole(r.role)}
                      className={`py-3 px-2 rounded-xl text-center text-xs font-mono font-semibold transition-all border ${
                        isActive
                          ? 'bg-gradient-to-b from-purple-950 to-dark-900 border-purple-400 text-purple-200 shadow-lg shadow-purple-900/30'
                          : 'bg-dark-850/60 hover:bg-dark-800 border-white/5 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {r.role} View
                    </button>
                  );
                })}
              </div>

              {/* Role Scope Description */}
              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${currentRoleData.color}`}>
                    {activeRole} Permissions Scope
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
                    <KeyRound className="w-3 h-3" /> Session Guarded
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentRoleData.description}
                </p>

                {/* Feature Bullet Checklist */}
                <div className="space-y-2 pt-1">
                  {currentRoleData.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* RDBMS Schema Callout */}
              <div className="p-4 rounded-2xl bg-dark-900/80 border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300">
                  <Database className="w-4 h-4 text-cyan-400" />
                  <span>Structured MySQL Database</span>
                </div>
                <div className="text-xs text-slate-400">
                  Organized relational database tables linking registered users, service categories, booking requests, and reviews to ensure seamless data flow.
                </div>
              </div>

            </div>

            {/* Right: Simulated Dynamic Dashboard Panel */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-dark-900/95 border border-white/10 p-5 space-y-5 shadow-inner">
                
                {/* Simulated App Header */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="font-mono text-xs font-bold text-white">UrbanServe Portal</span>
                    <span className="text-slate-500 text-xs">/</span>
                    <span className="text-xs font-mono text-purple-300">{activeRole}_dashboard.php</span>
                  </div>
                  <div className="text-[11px] font-mono text-slate-400">
                    Logged in as: <span className="text-cyan-300">alfin_{activeRole.toLowerCase()}</span>
                  </div>
                </div>

                {/* Contextual Dashboard View based on role */}
                {activeRole === 'Customer' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Available Services</div>
                        <div className="text-lg font-bold text-cyan-400 mt-1">24 Categories</div>
                        <div className="text-[10px] text-slate-400">Plumbing, Electric, AC</div>
                      </div>
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Active Bookings</div>
                        <div className="text-lg font-bold text-emerald-400 mt-1">1 En Route</div>
                        <div className="text-[10px] text-slate-400">Technician arriving 2:30 PM</div>
                      </div>
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5 col-span-2 sm:col-span-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Verified Technicians</div>
                        <div className="text-lg font-bold text-purple-400 mt-1">100% KYC</div>
                        <div className="text-[10px] text-slate-400">Admin background checked</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-dark-850/60 border border-white/5 space-y-2">
                      <div className="text-xs font-bold text-white">Recent Service Request: Electrical Repair</div>
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>Provider: Joseph K. (4.9 ★)</span>
                        <span className="text-cyan-400 font-mono">Status: Confirmed</span>
                      </div>
                      <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-gradient-to-r from-cyan-400 to-purple-400 h-full w-2/3" />
                      </div>
                    </div>
                  </div>
                )}

                {activeRole === 'Provider' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">New Job Requests</div>
                        <div className="text-lg font-bold text-emerald-400 mt-1">3 Pending</div>
                        <div className="text-[10px] text-slate-400">Within 5 km radius</div>
                      </div>
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">This Week Earnings</div>
                        <div className="text-lg font-bold text-cyan-400 mt-1">₹8,450</div>
                        <div className="text-[10px] text-slate-400">12 Jobs Completed</div>
                      </div>
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5 col-span-2 sm:col-span-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Provider Badge</div>
                        <div className="text-lg font-bold text-amber-400 mt-1">Verified Pro</div>
                        <div className="text-[10px] text-slate-400">ID & Certificate Approved</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-dark-850/60 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white">Incoming Job: Water Purifier Service</span>
                        <div className="flex gap-2">
                          <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30">Accept</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-500/30">Decline</span>
                        </div>
                      </div>
                      <div className="text-xs text-slate-400">Location: Collectorate Ward, Kottayam • Scheduled: Tomorrow 10 AM</div>
                    </div>
                  </div>
                )}

                {activeRole === 'Admin' && (
                  <div className="space-y-4 animate-fadeIn">
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">KYC Review Queue</div>
                        <div className="text-lg font-bold text-purple-400 mt-1">4 Providers</div>
                        <div className="text-[10px] text-slate-400">Awaiting document check</div>
                      </div>
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">Total Transactions</div>
                        <div className="text-lg font-bold text-cyan-400 mt-1">₹142,800</div>
                        <div className="text-[10px] text-slate-400">Platform GMV</div>
                      </div>
                      <div className="p-3 rounded-xl bg-dark-850 border border-white/5 col-span-2 sm:col-span-1">
                        <div className="text-[10px] font-mono text-slate-400 uppercase">System Integrity</div>
                        <div className="text-lg font-bold text-emerald-400 mt-1">Optimal</div>
                        <div className="text-[10px] text-slate-400">0 SQL Injection attempts</div>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-dark-850/60 border border-white/5 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">Pending Approval: Manoj K. (Electrician)</span>
                        <span className="text-purple-400 font-mono text-[11px]">Inspect Documents</span>
                      </div>
                      <div className="text-xs text-slate-400">Uploaded: National ID, Wireman License, Experience Certificate.</div>
                    </div>
                  </div>
                )}

                {/* Bottom Tech Notes */}
                <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    SQL Parameterization & Input Sanitization
                  </span>
                  <span>PHP Sessions + Bcrypt Hashes</span>
                </div>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
