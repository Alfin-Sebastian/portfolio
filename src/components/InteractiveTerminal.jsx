import React, { useState, useEffect, useRef } from 'react';
import { Terminal, X, Minimize2, Maximize2, Sparkles, Send, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function InteractiveTerminal({ isOpen, onClose, data, onTriggerAdminLogin }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'ALFIN SEBASTIAN [OS v2.4.11 - Full-Stack Interactive Console]' },
    { type: 'system', text: 'Type "help" or click any shortcut below to explore.' }
  ]);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (cmdText) => {
    const trimmed = cmdText.trim().toLowerCase();
    if (!trimmed) return;

    // Add user entry
    const newHistory = [...history, { type: 'user', text: `$ ${trimmed}` }];

    switch (trimmed) {
      case 'help':
        newHistory.push({
          type: 'response',
          text: `AVAILABLE COMMANDS:
  • whoami      : Brief background & role summary
  • skills      : Full-stack skills breakdown & proficiencies
  • projects    : Major capstone & enterprise platforms
  • certs       : Certifications & verified credentials
  • swiperide   : Deep architecture of SwipeRide MERN platform
  • urbanserve  : Overview of UrbanServe PHP platform
  • claude      : Anthropic Claude 101 & AI capabilities
  • contact     : Direct email, phone, LinkedIn & GitHub links
  • hire        : Schedule an interview / recruiter quick-connect
  • anime       : Beyond the code — manga, anime & interests
  • clear       : Clears the terminal output buffer`
        });
        break;

      case 'whoami':
      case 'about':
        newHistory.push({
          type: 'response',
          text: `[PROFILE]
Name        : Alfin Sebastian
Role        : AI-Native Full-Stack Developer (MERN Stack & PHP/MySQL)
Approach    : Rapid Prototyping & AI-Assisted Vibe Coding
Education   : BCA Graduate (2023-2026), Kristu Jyothi College, MG University
Location    : Kottayam, Kerala, India (PIN: 686105)
English     : C2 Proficient (CEFR Highest Tier)
AI Fluency  : Anthropic Claude 101 Certified`
        });
        break;

      case 'skills':
        newHistory.push({
          type: 'response',
          text: `[TECHNICAL CAPABILITIES]
Web Dev   : React.js, Node.js, Express.js, PHP, HTML5, CSS3, JavaScript
AI Tools  : Claude (Anthropic), Vibe Coding, Prompt Engineering, Rapid Scaffolding
Databases : MySQL, MongoDB, SQL fundamentals
Dev Setup : XAMPP, phpMyAdmin, GitHub, Vite`
        });
        break;

      case 'projects':
        newHistory.push({
          type: 'response',
          text: `[PORTFOLIO WORKS]
1. SwipeRide (MERN Stack)
   - Ride-sharing booking app with 4-step workflow & emergency SOS audio demo.
   - GitHub: github.com/Alfin-Sebastian/swiperide

2. UrbanServe (PHP & MySQL)
   - Local home service platform with Customer, Provider, and Admin views.
   - GitHub: github.com/Alfin-Sebastian/UrbanServe

3. GenAI Data Analytics Simulation (TATA / Forage)
4. Technology & Cyber Security Fundamentals (Deloitte / Forage)`
        });
        break;

      case 'certs':
      case 'certifications':
      case 'certificates':
        newHistory.push({
          type: 'response',
          text: `[CERTIFICATIONS & CREDENTIALS]
1. Claude 101 Certification — Anthropic
   ✓ Verified: academy.claude.com/verify/94255e016aba01ebfb02ee863af228d2

2. AI Fluency: Framework & Foundations — Anthropic
   ✓ Verified: academy.claude.com/verify/692c308e7bccae70c48e5d6990a2026f

3. GenAI Powered Data Analytics — TATA (Forage)
   ✓ Industry Job Simulation Certificate

4. Technology Job Simulation — Deloitte Australia (Forage)
   ✓ Industry Job Simulation Certificate

5. Cyber Job Simulation — Deloitte Australia (Forage)
   ✓ Industry Job Simulation Certificate

6. EF SET English Certificate — C2 Proficient
   ✓ Highest CEFR Level`
        });
        break;

      case 'swiperide':
        newHistory.push({
          type: 'response',
          text: `[SWIPERIDE OVERVIEW]
• Stack: React.js, Express.js, Node.js, MongoDB
• Lifecycle: 1. Request -> 2. Driver Acceptance -> 3. Start Trip -> 4. Completion
• Safety Feature: Integrated browser audio recording demo on emergency SOS alert
• Development: Built with modern MERN fundamentals and accelerated with Claude AI
• Repo: https://github.com/Alfin-Sebastian/swiperide`
        });
        break;

      case 'urbanserve':
        newHistory.push({
          type: 'response',
          text: `[URBANSERVE OVERVIEW]
• Stack: PHP, MySQL, HTML5, CSS3, JavaScript
• Views: Admin (approvals), Provider (jobs), Customer (booking services)
• Database: Relational MySQL tables for users, listings, and bookings
• Repo: https://github.com/Alfin-Sebastian/UrbanServe`
        });
        break;

      case 'claude':
        newHistory.push({
          type: 'response',
          text: `[ANTHROPIC CLAUDE]
• Certified in Anthropic's Claude 101 curriculum
• AI Fluency: Framework & Foundations certified
• Uses Claude for rapid full-stack development, debugging, and code iteration
• Comfortable with prompt engineering and AI-assisted workflows`
        });
        break;

      case 'contact':
        newHistory.push({
          type: 'response',
          text: `[CONTACT CHANNELS]
• Email    : alfinsebastian111@gmail.com
• Phone    : +91 80784 41117
• LinkedIn : linkedin.com/in/alfin-sebastian-049390300
• GitHub   : github.com/Alfin-Sebastian
• Location : Kottayam, Kerala, India`
        });
        break;

      case 'hire':
        confetti({
          particleCount: 75,
          spread: 80,
          origin: { y: 0.6 }
        });
        newHistory.push({
          type: 'response',
          text: `🎉 EXCELLENT DECISION!
Alfin Sebastian is actively seeking Full-Stack Web Developer roles.
Direct Call / WhatsApp : +91 80784 41117
Direct Email           : alfinsebastian111@gmail.com
Status                 : Ready for immediate technical discussion & onboarding.`
        });
        break;

      case 'anime':
      case 'manga':
        newHistory.push({
          type: 'response',
          text: `[BEHIND THE CODE]
Favorite Manhwas : Solo Leveling, Omniscient Reader's Viewpoint, The Beginning After the End
Interests        : Manga, High-concept anime, Football (tactical midfield & attack)
Philosophy       : "Every complex system starts with level 1 progression. Continuous XP gains."`
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'admin':
      case 'login':
      case 'sudo':
      case 'portal':
        newHistory.push({
          type: 'response',
          text: `[SECURITY VERIFICATION]
Opening Alfin's private control gateway...`
        });
        setTimeout(() => {
          onClose();
          onTriggerAdminLogin();
        }, 500);
        break;

      default:
        newHistory.push({
          type: 'error',
          text: `Command not recognized: "${trimmed}". Type "help" to see valid commands.`
        });
        break;
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-3xl rounded-2xl bg-[#090D16] border border-cyan-500/40 shadow-2xl shadow-cyan-950/60 overflow-hidden flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#0E1424] border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-500 cursor-pointer" onClick={onClose} />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="ml-3 text-xs font-mono text-slate-300 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              alfin@sebastian-core: ~/portfolio
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button onClick={onClose} className="p-1 hover:text-white rounded">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Pills */}
        <div className="flex items-center gap-1.5 px-4 py-2 bg-dark-900/60 border-b border-white/5 overflow-x-auto text-xs font-mono">
          <span className="text-slate-500 text-[10px] uppercase mr-1">Quick:</span>
          {['help', 'whoami', 'skills', 'projects', 'certs', 'swiperide', 'claude', 'hire', 'anime'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-dark-850 hover:bg-cyan-950 text-cyan-400 hover:text-cyan-300 border border-white/5 hover:border-cyan-500/30 whitespace-nowrap text-[11px]"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Console Output Body */}
        <div className="flex-1 p-4 font-mono text-xs sm:text-sm overflow-y-auto space-y-2 text-slate-200">
          {history.map((item, idx) => {
            if (item.type === 'user') {
              return (
                <div key={idx} className="text-cyan-400 font-semibold">
                  {item.text}
                </div>
              );
            }
            if (item.type === 'error') {
              return (
                <div key={idx} className="text-rose-400">
                  {item.text}
                </div>
              );
            }
            return (
              <pre key={idx} className="text-slate-300 whitespace-pre-wrap leading-relaxed font-mono">
                {item.text}
              </pre>
            );
          })}
          <div ref={bottomRef} />
        </div>

        {/* Command Input Prompt */}
        <div className="px-4 py-3 bg-[#0B101D] border-t border-white/10 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-sm font-bold flex items-center gap-1">
            <span>alfin</span>
            <span className="text-purple-400">&gt;</span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type 'help', 'skills', 'hire', etc..."
            className="flex-1 bg-transparent border-none outline-none font-mono text-xs sm:text-sm text-white placeholder-slate-500"
          />
          <button
            onClick={() => handleCommand(inputVal)}
            className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/40 transition-colors"
          >
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
