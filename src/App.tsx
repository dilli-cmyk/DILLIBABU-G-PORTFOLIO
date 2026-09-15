import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsDashboard } from './components/SkillsDashboard';
import { ProjectsSection } from './components/ProjectsSection';
import { AILabSection } from './components/AILabSection';
import { EducationSection } from './components/EducationSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { AdminPanel } from './components/AdminPanel';
import { ApiDocsModal } from './components/ApiDocsModal';
import { NeuralBackground } from './components/3d/NeuralBackground';
import { Profile, Skill, Project } from './types';
import { initialProfile, initialSkills, initialProjects } from './db/initialData';

export default function App() {
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const [resumeOpen, setResumeOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [apiDocsOpen, setApiDocsOpen] = useState(false);

  const fetchPortfolioData = async () => {
    try {
      const [profRes, skRes, projRes] = await Promise.all([
        fetch('/api/profile'),
        fetch('/api/skills'),
        fetch('/api/projects')
      ]);

      const profData = await profRes.json();
      const skData = await skRes.json();
      const projData = await projRes.json();

      if (profData.success && profData.data) setProfile(profData.data);
      if (skData.success && skData.data) setSkills(skData.data);
      if (projData.success && projData.data) setProjects(projData.data);
    } catch (err) {
      console.warn('Backend API initial fetch info (using client fallback):', err);
    }
  };

  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-[#030303] text-[#f5f5f5] font-sans selection:bg-cyan-500 selection:text-black relative overflow-x-hidden">
      
      {/* Radial Dot Grid Background Overlay */}
      <div
        className="fixed inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: 'radial-gradient(#333 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}
      />

      {/* Dynamic 3D Neural Canvas Background */}
      <NeuralBackground />

      {/* Main Navigation */}
      <Navbar
        profile={profile}
        onOpenAdmin={() => setAdminOpen(true)}
        onOpenResume={() => setResumeOpen(true)}
        onOpenApiDocs={() => setApiDocsOpen(true)}
      />

      {/* Main Sections */}
      <main className="relative z-10">
        <HeroSection
          profile={profile}
          onOpenResume={() => setResumeOpen(true)}
        />

        <AboutSection profile={profile} />

        <SkillsDashboard skills={skills} />

        <ProjectsSection projects={projects} />

        <AILabSection />

        <EducationSection profile={profile} />

        <ContactSection profile={profile} />
      </main>

      {/* Footer */}
      <Footer profile={profile} />

      {/* Modals */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
      />

      <AdminPanel
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        profile={profile}
        skills={skills}
        projects={projects}
        onRefreshData={fetchPortfolioData}
      />

      <ApiDocsModal
        isOpen={apiDocsOpen}
        onClose={() => setApiDocsOpen(false)}
      />

    </div>
  );
}
