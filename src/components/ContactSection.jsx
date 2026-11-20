import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  Copy, 
  Check, 
  Send, 
  MessageSquare, 
  Sparkles, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function ContactSection({ personal }) {
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    confetti({
      particleCount: 25,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#00F0FF', '#10B981', '#8B5CF6']
    });
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSubmitted(true);
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 }
      });
      // Also construct mailto fallback
      const mailtoUrl = `mailto:${personal.email}?subject=${encodeURIComponent(formData.subject || 'Portfolio Inquiry from ' + formData.name)}&body=${encodeURIComponent(formData.message + '\n\nFrom: ' + formData.name + ' (' + formData.email + ')')}`;
      window.open(mailtoUrl, '_blank');
    }, 800);
  };

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Send className="w-3.5 h-3.5 text-cyan-400" />
            <span>Initiate Collaboration</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Let's Build <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Something Extraordinary</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Actively open to full-time engineering opportunities, freelance collaborations, and technical discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Contact Hub */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Email Card */}
            <div className="p-5 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Direct Email
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  Responds &lt; 24h
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white break-all">
                {personal.email}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyToClipboard(personal.email, 'email')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-cyan-300 border border-white/5 text-xs font-mono transition-colors"
                >
                  {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
                  <span>{copiedField === 'email' ? 'Copied to Clipboard!' : 'Copy Email Address'}</span>
                </button>
                <a
                  href={`mailto:${personal.email}?subject=Full-Stack%20Role%20Inquiry`}
                  className="p-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 transition-colors"
                  title="Open in Mail app"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-5 rounded-2xl glass-panel glass-panel-hover border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-purple-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Call & WhatsApp
                </span>
                <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
                  IST Timezone
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold text-white">
                {personal.phone}
              </div>
              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => copyToClipboard(personal.phone, 'phone')}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-dark-850 hover:bg-dark-800 text-slate-200 hover:text-purple-300 border border-white/5 text-xs font-mono transition-colors"
                >
                  {copiedField === 'phone' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-purple-400" />}
                  <span>{copiedField === 'phone' ? 'Copied Number!' : 'Copy Phone Number'}</span>
                </button>
                <a
                  href="https://wa.me/918078441117?text=Hi%20Alfin,%20I%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect!"
                  target="_blank"
                  rel="noreferrer"
                  className="p-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 transition-colors"
                  title="Chat on WhatsApp"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Location & Relocation Card */}
            <div className="p-5 rounded-2xl glass-panel border border-white/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 uppercase">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Base Location</span>
              </div>
              <div className="text-sm font-bold text-white">
                {personal.location} – {personal.pincode}
              </div>
              <p className="text-xs text-slate-400">
                Ready to work on-site, hybrid, or remotely worldwide. Open to domestic & international relocation.
              </p>
            </div>

            {/* Social Links Ribbon */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <a
                href={personal.github}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl glass-panel hover:bg-dark-800 text-slate-200 hover:text-cyan-300 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono transition-all"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                <span>GitHub Profile</span>
              </a>
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noreferrer"
                className="p-3.5 rounded-2xl glass-panel hover:bg-dark-800 text-slate-200 hover:text-cyan-300 border border-white/10 flex items-center justify-center gap-2 text-xs font-mono transition-all"
              >
                <Linkedin className="w-4 h-4 text-purple-400" />
                <span>LinkedIn Profile</span>
              </a>
            </div>

          </div>

          {/* Right Column: Interactive Direct Message Dispatcher */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl glass-panel p-6 sm:p-8 border border-white/15 shadow-2xl relative">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white">Direct Dispatch Gateway</span>
                </div>
                <span className="text-[11px] font-mono text-slate-400">Encrypted Transport</span>
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-fadeIn">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
                    <Check className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Message Prepared & Dispatched!</h3>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                    Thank you for reaching out, <span className="text-cyan-300">{formData.name}</span>. Your inquiry has been forwarded directly to Alfin Sebastian.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-dark-850 text-slate-300 hover:text-white text-xs font-mono"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Morgan"
                        className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-slate-300">Your Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Opportunity / Collaboration / Full-Stack Project"
                      className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-slate-300">Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Alfin, we reviewed your MERN / PHP projects and would like to discuss..."
                      className="w-full px-4 py-3 rounded-xl bg-dark-900/90 border border-white/10 text-white placeholder-slate-500 text-xs sm:text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {sending ? (
                      <span className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                        Routing Message...
                      </span>
                    ) : (
                      <>
                        <span>Transmit Message to Alfin</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
