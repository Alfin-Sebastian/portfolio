import React, { useState } from 'react';
import { Lock, Eye, EyeOff, ShieldCheck, X, KeyRound, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';
import { usePortfolio } from '../context/PortfolioContext';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const { login } = usePortfolio();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) {
      setError('Please provide the security passcode.');
      return;
    }

    const success = login(password);
    if (success) {
      setError('');
      setPassword('');
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#00F0FF', '#10B981', '#8B5CF6']
      });
      onLoginSuccess();
      onClose();
    } else {
      setError('Invalid security passcode. Access denied.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-3xl bg-[#0B0F1A] border border-cyan-500/40 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center mx-auto text-cyan-400 shadow-lg shadow-cyan-500/20">
            <Lock className="w-6 h-6 animate-pulse" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Alfin's Secret Portal
          </h3>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            Stealth authentication portal. This area is completely hidden from public visitors and recruiters.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 flex items-center justify-between">
              <span>Security Passcode</span>
              <span className="text-[10px] text-slate-500">(Default: alfin2026)</span>
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="Enter your private passcode..."
                className="w-full px-4 py-3 rounded-xl bg-dark-900 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors pr-10 font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/25 transition-all"
          >
            <KeyRound className="w-4 h-4" />
            <span>Unlock Admin Controls</span>
          </button>
        </form>

        {/* Stealth Hint */}
        <div className="pt-2 border-t border-white/10 text-center text-[11px] font-mono text-slate-500">
          Tip: You can always open this stealth dialog with <kbd className="px-1.5 py-0.5 rounded bg-dark-850 text-cyan-300 border border-white/10">Ctrl+Shift+A</kbd> or typing <code className="text-cyan-300">admin</code> in the CLI.
        </div>

      </div>
    </div>
  );
}
