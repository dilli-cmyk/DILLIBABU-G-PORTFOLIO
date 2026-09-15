import React from 'react';
import { Profile } from '../types';
import { Bot, Mail, Phone, Github, Linkedin, ArrowUp } from 'lucide-react';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030303] border-t border-white/10 pt-16 pb-12 relative text-white/50 text-xs font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-cyan-500 rounded-sm flex items-center justify-center font-bold text-black text-xs shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                DG
              </div>
              <div>
                <span className="font-bold text-white text-base block uppercase tracking-tight">{profile.name}</span>
                <span className="text-[10px] text-cyan-400 uppercase tracking-widest">{profile.role}</span>
              </div>
            </div>

            <p className="text-xs text-white/50 leading-relaxed max-w-sm font-light">
              Focused on Python, Machine Learning, Deep Learning, and NLP. Building practical, intelligent AI applications with robust software foundations.
            </p>

            <div className="text-[10px] text-white/30 tracking-widest uppercase">
              LAT: 12.9141° N // LONG: 80.2314° E // SYSTEM.ACTIVE
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              {[
                { id: 'about', label: '02. About Me' },
                { id: 'skills', label: '03. Skills Dashboard' },
                { id: 'projects', label: '04. Featured Projects' },
                { id: 'ai-lab', label: '05. AI LAB Terminal' },
                { id: 'contact', label: '07. Contact' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-cyan-400 transition-colors cursor-pointer uppercase"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact & Social */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-2">
              Direct Channels
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <a href={`mailto:${profile.email}`} className="hover:text-cyan-400">{profile.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="text-white/80">{profile.phone}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-cyan-400 hover:border-cyan-500 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-white/5 border border-white/10 text-white/70 hover:text-cyan-400 hover:border-cyan-500 transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-[10px] text-white/30 uppercase tracking-widest">
          <span>© 2026 DILLIBABU G. ALL RIGHTS RESERVED.</span>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-white/60 hover:text-cyan-400 transition-colors cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
