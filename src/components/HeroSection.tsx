import React from 'react';
import { ArrowRight, Download, Mail, Github, Linkedin, Sparkles, Brain, Cpu, Code2 } from 'lucide-react';
import { HeroBrainSphere } from './3d/HeroBrainSphere';
import { Profile } from '../types';

interface HeroSectionProps {
  profile: Profile;
  onOpenResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ profile, onOpenResume }) => {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative pt-28 sm:pt-36 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            
            {/* Status Pill */}
            <div className="mb-2 inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold font-mono">
                Aspiring AI Engineer • BCA Student
              </span>
            </div>

            {/* Main Heading - Sophisticated Dark 8XL Typography */}
            <div className="space-y-2">
              <h1 className="text-5xl sm:text-7xl md:text-8xl font-black leading-[0.85] tracking-tighter uppercase text-white">
                DILLIBABU<br />
                <span className="text-white/20">G.</span>
              </h1>
            </div>

            {/* Core Headline */}
            <p className="text-lg sm:text-xl font-light text-white/80 max-w-xl leading-relaxed">
              Building intelligent solutions with <span className="text-cyan-400 font-semibold">Machine Learning</span>, <span className="text-white font-semibold">Deep Learning</span>, and <span className="text-cyan-400 font-semibold">NLP</span>. Focused on creating the next generation of AI-driven applications.
            </p>

            {/* Supporting Text */}
            <p className="text-white/50 text-xs sm:text-sm font-mono leading-relaxed max-w-xl border-l-2 border-cyan-500/40 pl-4 py-1">
              {profile.supportingText}
            </p>

            {/* Core Skill Chips */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                { label: 'Python', icon: Code2 },
                { label: 'Machine Learning', icon: Cpu },
                { label: 'Deep Learning', icon: Brain },
                { label: 'NLP', icon: Sparkles }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-md text-[11px] font-mono text-white/70 uppercase tracking-wider"
                >
                  <item.icon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>

            {/* Action Buttons - Sophisticated Dark CTA Pattern */}
            <div className="flex flex-wrap gap-4 items-center pt-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(34,211,238,0.25)] flex items-center gap-2 cursor-pointer"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenResume}
                className="border border-white/20 hover:border-white text-white px-8 py-4 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Resume</span>
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                className="border border-cyan-500/30 hover:border-cyan-400 text-cyan-400 px-6 py-4 font-bold text-xs uppercase tracking-widest transition-all flex items-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>Contact</span>
              </button>
            </div>

            {/* Secondary Links & Contact Quick Info */}
            <div className="pt-4 flex flex-wrap items-center gap-6 border-t border-slate-800/80 text-xs text-slate-400">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Github className="w-4 h-4 text-slate-300" />
                <span>github.com/dilli-cmyk</span>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-cyan-400 transition-colors"
              >
                <Linkedin className="w-4 h-4 text-slate-300" />
                <span>LinkedIn Profile</span>
              </a>

              <div className="text-slate-500 font-mono">
                {profile.email}
              </div>
            </div>

          </div>

          {/* Right 3D Visual Object */}
          <div className="lg:col-span-5 relative">
            <HeroBrainSphere />
          </div>

        </div>
      </div>
    </section>
  );
};
