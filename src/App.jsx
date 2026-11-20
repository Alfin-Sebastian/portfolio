import React, { useState, useEffect } from 'react';
import { PortfolioProvider, usePortfolio } from './context/PortfolioContext';
import ParticleBackground from './components/ParticleBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SwipeRideDeepDive from './components/SwipeRideDeepDive';
import UrbanServeSimulator from './components/UrbanServeSimulator';
import ProjectsSection from './components/ProjectsSection';
import SkillsMatrix from './components/SkillsMatrix';
import CertificationsBento from './components/CertificationsBento';
import EducationTimeline from './components/EducationTimeline';
import PassionsSection from './components/PassionsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import InteractiveTerminal from './components/InteractiveTerminal';
import AdminLoginModal from './components/AdminLoginModal';
import AdminDashboard from './components/AdminDashboard';

function PortfolioContent() {
  const { data, loading, saveStatus, isAdminLoggedIn } = usePortfolio();
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false);

  // Keyboard shortcut listener: Ctrl+Shift+A or Alt+A to trigger stealth admin
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) || 
          (e.altKey && (e.key === 'A' || e.key === 'a'))) {
        e.preventDefault();
        if (isAdminLoggedIn) {
          setAdminDashboardOpen(true);
        } else {
          setAdminLoginOpen(true);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAdminLoggedIn]);

  // Show loading screen while fetching from Firebase
  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090E] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto" />
          <p className="text-sm font-mono text-slate-400">Loading portfolio...</p>
        </div>
      </div>
    );
  }

  const swipeRideProject = data.projects.find(p => p.id === 'swiperide');
  const urbanServeProject = data.projects.find(p => p.id === 'urbanserve');

  return (
    <div className="min-h-screen bg-[#07090E] text-slate-100 relative font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Interactive Canvas Constellation Background */}
      <ParticleBackground />

      {/* Navigation (Stealth trigger attached) */}
      <Navbar 
        onOpenTerminal={() => setTerminalOpen(true)} 
        onOpenAdminLogin={() => setAdminLoginOpen(true)}
        onOpenAdminDashboard={() => setAdminDashboardOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero 
          data={data} 
          onOpenTerminal={() => setTerminalOpen(true)} 
        />

        {/* Major Project Deep Dive: SwipeRide */}
        {swipeRideProject && (
          <SwipeRideDeepDive project={swipeRideProject} />
        )}

        {/* Enterprise Architecture Simulator: UrbanServe */}
        {urbanServeProject && (
          <UrbanServeSimulator project={urbanServeProject} />
        )}

        {/* Filterable Projects Section */}
        <ProjectsSection projects={data.projects} />

        {/* Technical Capabilities Matrix */}
        <SkillsMatrix skillsData={data.skills} />

        {/* Bento Grid: Certifications & AI Mastery */}
        <CertificationsBento certs={data.certifications} />

        {/* Education & Hackathons Timeline */}
        <EducationTimeline 
          education={data.education} 
          events={data.events} 
        />

        {/* Beyond the Code: Passions & Mindset */}
        <PassionsSection interests={data.interests} />

        {/* Direct Contact Hub */}
        <ContactSection personal={data.personal} />
      </main>

      {/* Footer */}
      <Footer 
        personal={data.personal} 
        onOpenTerminal={() => setTerminalOpen(true)} 
      />

      {/* Interactive Developer Terminal Modal */}
      <InteractiveTerminal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
        data={data} 
        onTriggerAdminLogin={() => {
          if (isAdminLoggedIn) {
            setAdminDashboardOpen(true);
          } else {
            setAdminLoginOpen(true);
          }
        }}
      />

      {/* Secret Stealth Admin Login Modal */}
      <AdminLoginModal 
        isOpen={adminLoginOpen} 
        onClose={() => setAdminLoginOpen(false)} 
        onLoginSuccess={() => setAdminDashboardOpen(true)} 
      />

      {/* Admin Dashboard & In-Browser CMS */}
      <AdminDashboard 
        isOpen={adminDashboardOpen} 
        onClose={() => setAdminDashboardOpen(false)} 
      />

      {/* Firebase Save Status Toast */}
      {saveStatus && (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded-lg text-xs font-mono border backdrop-blur-md transition-all animate-fadeIn ${
          saveStatus === 'saving' ? 'bg-cyan-950/90 text-cyan-300 border-cyan-500/40' :
          saveStatus === 'saved' ? 'bg-emerald-950/90 text-emerald-300 border-emerald-500/40' :
          'bg-rose-950/90 text-rose-300 border-rose-500/40'
        }`}>
          {saveStatus === 'saving' && '⏳ Saving to cloud...'}
          {saveStatus === 'saved' && '✅ Saved — visible to all visitors!'}
          {saveStatus === 'error' && '❌ Save failed — check connection'}
        </div>
      )}

    </div>
  );
}

export default function App() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
