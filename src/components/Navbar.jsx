import React, { useState, useEffect } from 'react';
import { Terminal, Code2, Sparkles, Send, Menu, X, ArrowUpRight, ShieldCheck, Settings } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

export default function Navbar({ onOpenTerminal, onOpenAdminLogin, onOpenAdminDashboard }) {
  const { isAdminLoggedIn } = usePortfolio();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Check URL hash #admin
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#admin') {
        if (isAdminLoggedIn) {
          onOpenAdminDashboard();
        } else {
          onOpenAdminLogin();
        }
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [isAdminLoggedIn, onOpenAdminLogin, onOpenAdminDashboard]);

  // Triple-click easter egg on the AS logo
  const handleLogoClick = () => {
    setClickCount((prev) => {
      const next = prev + 1;
      if (next >= 3) {
        if (isAdminLoggedIn) {
          onOpenAdminDashboard();
        } else {
          onOpenAdminLogin();
        }
        return 0;
      }
      return next;
    });

    // Reset click counter after 1.2 seconds of inactivity
    setTimeout(() => {
      setClickCount(0);
    }, 1200);
  };

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Architecture', href: '#deep-dive' },
    { name: 'Skills & Stack', href: '#skills' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Timeline', href: '#education' },
    { name: 'Beyond Code', href: '#passions' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07090E]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-cyan-950/20'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo & Brand (With Secret Triple-Click Admin Trigger) */}
          <div 
            onClick={handleLogoClick}
            className="flex items-center gap-3 group cursor-pointer select-none"
            title={isAdminLoggedIn ? "Click to open Admin Dashboard" : "Alfin Sebastian"}
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border border-cyan-500/40 flex items-center justify-center font-mono font-bold text-cyan-300 shadow-lg shadow-cyan-500/10 group-hover:scale-105 group-hover:border-cyan-400 transition-transform">
              <span className="text-base tracking-tighter">AS</span>
              <span className="text-xs text-cyan-400">/</span>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping opacity-75" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-slate-100 text-sm sm:text-base tracking-tight flex items-center gap-1.5 group-hover:text-cyan-300 transition-colors">
                Alfin Sebastian
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] uppercase font-mono font-semibold tracking-wider rounded bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
                  DEV
                </span>
              </span>
              <span className="text-[11px] font-mono text-slate-400 hidden sm:block">
                MERN • PHP • Claude AI
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-medium text-slate-300 hover:text-cyan-300 transition-colors tracking-wide py-1 relative group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* If Admin is Logged in, show discreet Edit button */}
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdminDashboard}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/80 text-emerald-300 border border-emerald-500/40 text-xs font-mono transition-all hover:bg-emerald-900 shadow-md shadow-emerald-950/40 animate-pulse"
                title="Manage Portfolio Details"
              >
                <Settings className="w-3.5 h-3.5" />
                <span>Admin Edit</span>
              </button>
            )}

            {/* Terminal Launch Button */}
            <button
              onClick={onOpenTerminal}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-dark-850 hover:bg-dark-800 text-slate-300 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 text-xs font-mono transition-all group shadow-inner"
              title="Open Interactive CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 group-hover:rotate-6 transition-transform" />
              <span>CLI Console</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 font-semibold">
                ~/$
              </span>
            </button>

            {/* Direct Connect CTA */}
            <a
              href="#contact"
              className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white text-xs font-semibold tracking-wide shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <span>Get in Touch</span>
              <Send className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex sm:hidden items-center gap-2">
            {isAdminLoggedIn && (
              <button
                onClick={onOpenAdminDashboard}
                className="p-2 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/40 text-xs font-mono"
              >
                <Settings className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onOpenTerminal}
              className="p-2 rounded-lg bg-dark-850 text-cyan-400 border border-cyan-500/30"
              aria-label="Open CLI"
            >
              <Terminal className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-dark-850 text-slate-300 hover:text-white border border-white/10"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 px-4 pt-4 pb-6 bg-[#0B0F19]/95 backdrop-blur-xl border-b border-white/10 space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              Status: Available for Full-Time Roles
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-dark-850/60 hover:bg-dark-800 text-xs font-medium text-slate-200 hover:text-cyan-300 border border-white/5"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-600 text-white text-xs font-semibold"
            >
              <span>Contact Alfin</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
