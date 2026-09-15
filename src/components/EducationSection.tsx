import React from 'react';
import { Profile } from '../types';
import { GraduationCap, BookOpen, Award, CheckCircle2, Terminal } from 'lucide-react';

interface EducationSectionProps {
  profile: Profile;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ profile }) => {
  return (
    <section id="education" className="py-24 relative bg-[#030303] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-2">
              <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold font-mono">06 // ACADEMIC BACKGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
              Education & <span className="text-cyan-400">Learning Path</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-xs sm:text-sm font-mono leading-relaxed">
            Formal computer application degree coursework combined with rigorous self-directed AI/ML specialization.
          </p>
        </div>

        {/* Education Card */}
        <div className="max-w-4xl mx-auto bg-[#080808] border border-white/10 rounded-md p-6 sm:p-8 space-y-6">
          
          <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-cyan-500 text-black font-bold flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight font-mono">BCA (Bachelor of Computer Applications)</h3>
                <p className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Student • Aspiring AI Engineer</p>
              </div>
            </div>

            <div className="px-3 py-1 bg-white/5 border border-white/10 text-xs font-mono text-white/70 uppercase">
              India
            </div>
          </div>

          <p className="text-white/80 text-xs sm:text-sm leading-relaxed font-light">
            Pursuing a comprehensive curriculum in computer applications, programming paradigms, computer architecture, and database management systems, supplemented by intensive self-guided practice in Python, Machine Learning, Deep Neural Networks, and Natural Language Processing.
          </p>

          {/* Coursework Highlight Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            
            <div className="bg-black/60 p-4 border border-white/10 space-y-2">
              <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2">
                <BookOpen className="w-4 h-4" />
                <span>Core Computer Science</span>
              </h4>
              <ul className="space-y-2 text-xs font-mono text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Data Structures & OOP in Python</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Database Systems & Relational SQL Queries</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Software Lifecycle & REST API Architecture</span>
                </li>
              </ul>
            </div>

            <div className="bg-black/60 p-4 border border-white/10 space-y-2">
              <h4 className="text-xs font-bold font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-2">
                <Terminal className="w-4 h-4" />
                <span>Specialized AI / ML Path</span>
              </h4>
              <ul className="space-y-2 text-xs font-mono text-white/70">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Machine Learning Algorithms (Scikit-Learn)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Deep Learning & Neural Networks (PyTorch)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Text Vectorization & Sentiment Analysis (NLP)</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
