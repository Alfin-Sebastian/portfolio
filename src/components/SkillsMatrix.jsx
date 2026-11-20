import React, { useState } from 'react';
import { 
  Code2, 
  Globe, 
  Database, 
  Cpu, 
  Layers, 
  Sparkles, 
  Check, 
  Terminal, 
  FileCode,
  ArrowRight
} from 'lucide-react';

export default function SkillsMatrix({ skillsData }) {
  const categories = skillsData?.categories || [];
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || 'web');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const activeCategoryData = categories.find(c => c.id === activeCategory) || categories[0] || { skills: [] };

  const codeSnippets = {
    "React.js": `// React component hook for managing ride status
export function useRideStatus(rideId) {
  const [status, setStatus] = useState("REQUESTED");
  
  const advanceStage = (nextStage) => {
    setStatus(nextStage);
  };

  return { status, advanceStage };
}`,
    "Node.js & Express": `// Express route handling ride updates
app.post('/api/rides/update-status', (req, res) => {
  const { rideId, nextStatus } = req.body;
  
  if (!rideId || !nextStatus) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Update ride in database and return response
  return res.json({ success: true, status: nextStatus });
});`,
    "PHP": `// PHP database insert for local service bookings
$stmt = $pdo->prepare("
    INSERT INTO service_bookings (customer_id, provider_id, service_id, status)
    VALUES (:c_id, :p_id, :s_id, 'PENDING')
");
$stmt->execute([
    ':c_id' => $_SESSION['user_id'],
    ':p_id' => $providerId,
    ':s_id' => $serviceId
]);`,
    "Claude (Anthropic)": `// Anthropic Claude prompt for feature scaffolding & vibe coding
const systemPrompt = \`
Act as an expert full-stack engineer. Generate a clean React + Tailwind component
for a ride-sharing booking workflow with an emergency SOS button.
Follow clean component breakdown and modern JavaScript practices.
\`;`
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Code2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities & Mastery</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
            Engineering <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 bg-clip-text text-transparent">Tech Stack & Radar</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Proficiencies forged through building production-grade web applications, mastering systems programming foundations, and pursuing AI certifications.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = cat.id === activeCategory;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setSelectedSkill(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-mono transition-all border ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 border-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/10'
                    : 'bg-dark-850/60 hover:bg-dark-800 border-white/5 text-slate-300 hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Skills Matrix + Code Snippet / Context Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Categorized Skills Cards */}
          <div className="lg:col-span-7 space-y-3">
            {activeCategoryData.skills.map((skill) => (
              <div
                key={skill.name}
                onClick={() => setSelectedSkill(skill)}
                className={`p-4 rounded-2xl glass-panel cursor-pointer transition-all border ${
                  selectedSkill?.name === skill.name
                    ? 'border-cyan-400 bg-cyan-950/40 shadow-lg shadow-cyan-500/15'
                    : 'border-white/10 hover:border-white/20 hover:bg-dark-850/70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm sm:text-base">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-dark-900 text-cyan-300 border border-white/10">
                      {skill.tag}
                    </span>
                  </div>
                  <span className="text-xs font-mono text-cyan-400 font-semibold">
                    {skill.level}%
                  </span>
                </div>

                {/* Animated Progress Bar */}
                <div className="w-full bg-dark-900 rounded-full h-1.5 overflow-hidden mb-2">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-sky-300 to-purple-400 transition-all duration-700"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>

                <div className="text-xs text-slate-400 flex items-center justify-between">
                  <span>{skill.detail}</span>
                  <span className="text-[10px] font-mono text-slate-500 hover:text-cyan-400 flex items-center gap-1">
                    Inspect Context &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Interactive Code & Architecture Inspector */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl glass-panel p-6 border border-white/15 shadow-2xl sticky top-24 space-y-5">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                  <Terminal className="w-4 h-4" />
                  <span>Architecture Context & Code Logic</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">Clean Architecture</span>
              </div>

              {selectedSkill ? (
                <div className="space-y-4 animate-fadeIn">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">Skill Focus</span>
                    <h4 className="text-xl font-bold text-white mt-0.5">{selectedSkill.name}</h4>
                    <p className="text-xs text-slate-300 mt-1">{selectedSkill.detail}</p>
                  </div>

                  {codeSnippets[selectedSkill.name] ? (
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
                        <FileCode className="w-3.5 h-3.5 text-purple-400" />
                        <span>Real Implementation Pattern:</span>
                      </div>
                      <pre className="p-3.5 rounded-xl bg-dark-950 text-cyan-300 font-mono text-[11px] overflow-x-auto border border-cyan-500/20 leading-relaxed">
                        <code>{codeSnippets[selectedSkill.name]}</code>
                      </pre>
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-dark-900/80 border border-white/5 space-y-2 text-xs text-slate-300">
                      <div className="font-semibold text-white">Practical Project Application:</div>
                      <div>Applied in full-stack projects including SwipeRide (MERN stack ride-sharing platform) and UrbanServe (PHP/MySQL local service platform).</div>
                    </div>
                  )}

                  <div className="pt-2 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Built with clean component logic & modern web conventions</span>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center mx-auto text-cyan-400">
                    <Code2 className="w-6 h-6 animate-pulse" />
                  </div>
                  <h4 className="text-sm font-semibold text-white">Click any skill to inspect code pattern</h4>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Explore practical snippets for React hooks, Express endpoints, PHP database queries, and Claude AI system prompts.
                  </p>
                </div>
              )}

              {/* Stack Comparator Ribbon */}
              <div className="p-3.5 rounded-2xl bg-dark-900/90 border border-white/5 space-y-2">
                <div className="text-[11px] font-mono text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-purple-400" />
                  Dual-Stack Versatility
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400">
                  <div className="p-2 rounded bg-dark-850 border border-white/5">
                    <span className="text-cyan-400 font-semibold block">MERN Stack</span>
                    <span>React UI, Express APIs, MongoDB store, fast prototyping</span>
                  </div>
                  <div className="p-2 rounded bg-dark-850 border border-white/5">
                    <span className="text-purple-400 font-semibold block">PHP & MySQL</span>
                    <span>Structured database tables, form processing, local services</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
