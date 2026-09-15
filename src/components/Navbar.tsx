import React, { useState, useEffect } from 'react';
import { Bot, FileText, Github, Linkedin, Menu, X, Shield, Terminal, Code2 } from 'lucide-react';
import { Profile } from '../types';

interface NavbarProps {
  profile: Profile;
  onOpenAdmin: () => void;
  onOpenResume: () => void;
  onOpenApiDocs: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  profile,
  onOpenAdmin,
  onOpenResume,
  onOpenApiDocs
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#030303]/90 backdrop-blur-md border-b border-white/10 py-4'
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 group text-left cursor-pointer"
        >
          <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center font-bold text-black text-xs shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            DG
          </div>
          <div>
            <div className="font-semibold tracking-tighter text-base sm:text-lg text-white uppercase flex items-center gap-2">
              {profile.name}
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            </div>
            <div className="text-[9px] text-white/40 uppercase tracking-widest font-mono">
              Aspiring AI Engineer
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {[
            { id: 'hero', num: '01', label: 'Home' },
            { id: 'about', num: '02', label: 'About' },
            { id: 'skills', num: '03', label: 'Skills' },
            { id: 'projects', num: '04', label: 'Projects' },
            { id: 'ai-lab', num: '05', label: 'AI Lab', badge: 'Gemini' },
            { id: 'education', num: '06', label: 'Education' },
            { id: 'contact', num: '07', label: 'Contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-[11px] uppercase tracking-[0.18em] font-mono text-white/50 hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="text-cyan-400/80 font-bold">{item.num}.</span>
              <span>{item.label}</span>
              {item.badge && (
                <span className="px-1.5 py-0.2 bg-cyan-500/10 text-cyan-400 text-[8px] font-bold border border-cyan-500/20 rounded-xs">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons & Socials */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenApiDocs}
            title="REST API Docs"
            className="p-2 text-white/40 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors border border-white/5 hover:border-white/20"
          >
            <Code2 className="w-4 h-4" />
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            title="GitHub"
            className="p-2 text-white/40 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="p-2 text-white/40 hover:text-cyan-400 hover:bg-white/5 rounded-md transition-colors"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <button
            onClick={onOpenResume}
            className="px-4 py-1.5 border border-white/20 hover:border-cyan-500 text-white rounded-full text-[10px] uppercase tracking-widest font-mono transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <FileText className="w-3 h-3 text-cyan-400" />
            <span>Resume</span>
          </button>

          <button
            onClick={onOpenAdmin}
            title="Admin Dashboard"
            className="p-2 text-white/40 hover:text-purple-400 hover:bg-white/5 rounded-md transition-colors"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenResume}
            className="px-2.5 py-1.2 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 text-xs font-medium flex items-center gap-1"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Resume</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-300 hover:text-white rounded-lg bg-slate-900 border border-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 mt-3 space-y-2 animate-in slide-in-from-top-4 duration-200">
          {[
            { id: 'hero', label: 'Home' },
            { id: 'about', label: 'About' },
            { id: 'skills', label: 'Skills' },
            { id: 'projects', label: 'Projects' },
            { id: 'ai-lab', label: 'AI LAB Assistant' },
            { id: 'education', label: 'Education' },
            { id: 'contact', label: 'Contact' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
            >
              {item.label}
            </button>
          ))}

          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-lg border border-slate-800"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <button
                onClick={onOpenApiDocs}
                className="p-2 text-slate-400 hover:text-cyan-400 bg-slate-900 rounded-lg border border-slate-800"
              >
                <Code2 className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="px-3 py-1.5 rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/30 text-xs font-medium flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Admin Dashboard</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
