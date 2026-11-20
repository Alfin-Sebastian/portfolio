import React from 'react';
import { 
  Award, 
  Sparkles, 
  Cpu, 
  BarChart3, 
  ShieldCheck, 
  ExternalLink, 
  CheckCircle, 
  BadgeCheck 
} from 'lucide-react';

export default function CertificationsBento({ certs }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Award': return <Award className="w-5 h-5 text-cyan-400" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5 text-blue-400" />;
      default: return <BadgeCheck className="w-5 h-5 text-cyan-400" />;
    }
  };

  const certList = certs || [];
  // Find featured cert (Claude 101) or default to the first
  const featuredCert = certList.find(c => c.id === 'claude-101') || certList[0];
  const otherCerts = certList.filter(c => c.id !== featuredCert?.id);

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/80 border border-amber-500/30 text-xs font-mono text-amber-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Verified Credentials & Job Simulations</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Certifications & <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-cyan-400 bg-clip-text text-transparent">Job Simulations</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Verified industry credentials in Anthropic's Claude AI ecosystem, C2-tier international English fluency, and real-world enterprise job simulations.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Featured Card: Anthropic Claude 101 (Spans 2 columns) */}
          {featuredCert && (
            <div className="md:col-span-2 lg:col-span-2 rounded-3xl glass-panel p-6 sm:p-8 border border-amber-500/30 relative overflow-hidden group hover:border-amber-400 transition-all bg-gradient-to-br from-amber-950/20 via-dark-900 to-dark-950 shadow-xl flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-500/40">
                      <Sparkles className="w-6 h-6 text-amber-300 animate-pulse" />
                    </div>
                    <div>
                      <span className="text-xs font-mono text-amber-300 uppercase tracking-wider block">{featuredCert.issuer}</span>
                      <span className="text-xs text-slate-400">{featuredCert.highlight}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-amber-950 text-amber-300 border border-amber-500/30">
                    {featuredCert.badge}
                  </span>
                </div>

                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-amber-200 transition-colors">
                    {featuredCert.title}
                  </h3>
                  <p className="text-sm text-slate-300 mt-2 max-w-2xl leading-relaxed">
                    {featuredCert.description}
                  </p>
                </div>

                {featuredCert.tags && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {featuredCert.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-1 rounded-xl bg-dark-850/80 border border-white/5 text-center text-xs font-mono text-slate-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action row with Verification link */}
              <div className="pt-6 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-slate-400">
                  Issued: {featuredCert.date}
                </span>

                {featuredCert.credentialUrl ? (
                  <a
                    href={featuredCert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-dark-950 font-bold text-xs font-mono transition-all shadow-lg shadow-amber-500/20"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-mono text-slate-500">Verified</span>
                )}
              </div>
            </div>
          )}

          {/* Remaining Certifications & Job Simulations */}
          {otherCerts.map((cert) => (
            <div
              key={cert.id}
              className="rounded-3xl glass-panel p-6 sm:p-7 border border-white/10 relative overflow-hidden group hover:border-cyan-400 transition-all bg-gradient-to-br from-dark-900 to-dark-950 shadow-xl flex flex-col justify-between"
            >
              <div className="relative z-10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-dark-850 border border-white/10 group-hover:border-cyan-500/40 transition-colors">
                    {getIcon(cert.icon)}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-dark-850 text-cyan-300 border border-cyan-500/30">
                    {cert.badge || 'Verified'}
                  </span>
                </div>

                <div>
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">{cert.issuer}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1 group-hover:text-cyan-200 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {cert.description}
                  </p>
                </div>

                {cert.tags && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {cert.tags.map((t) => (
                      <span key={t} className="px-2 py-0.5 rounded bg-dark-850 text-slate-300 text-[10px] font-mono border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Action row with Verification link */}
              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between relative z-10">
                <span className="text-xs font-mono text-slate-400">
                  {cert.date}
                </span>

                {cert.credentialUrl ? (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 text-xs font-mono transition-colors group-hover:border-cyan-400"
                  >
                    <span>View Certificate</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <span className="text-[11px] font-mono text-slate-500">Verified Credential</span>
                )}
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
