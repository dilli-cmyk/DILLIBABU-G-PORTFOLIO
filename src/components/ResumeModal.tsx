import React from 'react';
import { Profile, Skill, Project } from '../types';
import { X, Download, FileText, CheckCircle2, Mail, Phone, Linkedin, Github } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  skills: Skill[];
  projects: Project[];
}

export const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-md overflow-hidden my-8 shadow-2xl">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-black border-b border-white/10 flex items-center justify-between font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-cyan-500 text-black flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white uppercase tracking-tight">
                DILLIBABU G • RESUME DOCUMENT
              </h2>
              <p className="text-[10px] text-cyan-400 uppercase tracking-wider">Aspiring AI Engineer • {profile.degree}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/api/resume"
              download="DILLIBABU_G_AI_Engineer_Resume.txt"
              className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>

            <button
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Preview Sheet */}
        <div className="p-6 sm:p-10 space-y-8 max-h-[75vh] overflow-y-auto font-mono text-white/80 bg-[#030303]">
          
          {/* Header Contact Block */}
          <div className="border-b border-white/10 pb-6 space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h1 className="text-2xl font-black text-white uppercase tracking-tight">{profile.name}</h1>
              <span className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest px-3 py-1 bg-cyan-500/10 border border-cyan-500/20">
                {profile.role}
              </span>
            </div>

            <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-white/60">
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                <span>{profile.phone}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Linkedin className="w-3.5 h-3.5 text-cyan-400" />
                <span>linkedin.com/in/dillibabu-g-395a90291</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>github.com/dilli-cmyk</span>
              </div>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
              Professional Objective
            </h3>
            <p className="text-xs text-white/70 leading-relaxed font-light">
              {profile.supportingText} {profile.bio}
            </p>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
              Technical Proficiencies
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 p-3 border border-white/10">
                <span className="font-bold text-white block mb-1 uppercase text-[10px]">Programming & Core:</span>
                <span className="text-white/60">Python, Data Structures, OOP, NumPy, Pandas</span>
              </div>
              <div className="bg-white/5 p-3 border border-white/10">
                <span className="font-bold text-white block mb-1 uppercase text-[10px]">Machine Learning:</span>
                <span className="text-white/60">Scikit-Learn, Regression, Classification, Preprocessing</span>
              </div>
              <div className="bg-white/5 p-3 border border-white/10">
                <span className="font-bold text-white block mb-1 uppercase text-[10px]">Deep Learning:</span>
                <span className="text-white/60">Neural Networks (MLP), PyTorch, Loss Optimization</span>
              </div>
              <div className="bg-white/5 p-3 border border-white/10">
                <span className="font-bold text-white block mb-1 uppercase text-[10px]">Natural Language Processing:</span>
                <span className="text-white/60">TF-IDF Vectorization, Sentiment Analysis, Text Mining</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
              Key Engineering Projects
            </h3>

            {projects.map((proj) => (
              <div key={proj.id} className="space-y-1.5 bg-[#080808] p-4 border border-white/10">
                <div className="flex justify-between items-baseline">
                  <h4 className="text-xs font-bold text-white uppercase">{proj.title}</h4>
                  <span className="text-[9px] text-cyan-400 uppercase">{proj.category}</span>
                </div>
                <p className="text-xs text-white/70 font-light">{proj.description}</p>
                <div className="text-[10px] text-white/50">
                  <span className="font-bold text-white/80">Approach: </span>
                  {proj.aiMlApproach}
                </div>
                <div className="text-[10px] text-white/50">
                  <span className="font-bold text-white/80">Tech Stack: </span>
                  {proj.technologies.join(', ')}
                </div>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="space-y-2">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 border-b border-white/10 pb-1">
              Education
            </h3>
            <div className="flex justify-between items-start text-xs bg-white/5 p-3 border border-white/10">
              <div>
                <span className="font-bold text-white block uppercase">{profile.degree}</span>
                <span className="text-[10px] text-white/50">Coursework: Computer Applications, Data Structures, Python, Databases</span>
              </div>
              <span className="text-[10px] text-cyan-400">India</span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-black border-t border-white/10 flex justify-between items-center font-mono">
          <span className="text-xs text-white/40 uppercase tracking-widest">
            OFFICIAL RESUME DOCUMENT • DILLIBABU G
          </span>

          <a
            href="/api/resume"
            download="DILLIBABU_G_AI_Engineer_Resume.txt"
            className="px-5 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download Resume</span>
          </a>
        </div>

      </div>
    </div>
  );
};
