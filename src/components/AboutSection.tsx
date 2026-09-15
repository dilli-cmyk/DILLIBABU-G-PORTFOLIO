import React from 'react';
import { Profile } from '../types';
import { User, GraduationCap, Code, Brain, Cpu, MessageSquareText, Sparkles, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const learningJourney = [
    {
      step: "01",
      title: "Python Foundations",
      icon: Code,
      desc: "Core OOP, Data Structures, NumPy, Pandas, Scipy & Scripting algorithms.",
      status: "Mastered"
    },
    {
      step: "02",
      title: "Machine Learning",
      icon: Cpu,
      desc: "Supervised/unsupervised algorithms, Scikit-learn models, data preprocessing & validation.",
      status: "Proficient"
    },
    {
      step: "03",
      title: "Deep Learning",
      icon: Brain,
      desc: "Multi-layer Neural Networks, PyTorch framework fundamentals, activation & backpropagation.",
      status: "Developing"
    },
    {
      step: "04",
      title: "Natural Language Processing",
      icon: MessageSquareText,
      desc: "Tokenization, TF-IDF, Sentiment Analysis, NLTK/SpaCy & text classification.",
      status: "Developing"
    },
    {
      step: "05",
      title: "AI Engineering & Full-Stack",
      icon: Sparkles,
      desc: "Deploying LLM APIs, REST microservices, vector embeddings & 3D user interfaces.",
      status: "Active Focus"
    }
  ];

  return (
    <section id="about" className="py-24 relative bg-[#030303] border-y border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-2">
              <User className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold font-mono">02 // PROFILE & BACKGROUND</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
              About <span className="text-cyan-400">Me</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-xs sm:text-sm font-mono leading-relaxed">
            Driven BCA student dedicated to understanding the mathematical foundations and practical software engineering of artificial intelligence.
          </p>
        </div>

        {/* Grid Layout: Biography & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          {/* Bio Box */}
          <div className="lg:col-span-7 bg-[#080808] border border-white/10 rounded-md p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-10 h-10 bg-cyan-500 text-black font-bold flex items-center justify-center text-sm shadow-[0_0_15px_rgba(34,211,238,0.3)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">{profile.name}</h3>
                <p className="text-xs text-cyan-400 font-mono uppercase tracking-widest">{profile.degree} • AI Engineering Path</p>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed font-light">
              {profile.bio}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-mono uppercase tracking-widest text-white/40">Core Engineering Principles:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono text-white/80">
                {[
                  "Clean, modular Python code",
                  "Structured data preprocessing pipelines",
                  "Rigorous model evaluation metrics",
                  "Practical AI & REST API integration",
                  "Algorithmic problem solving",
                  "Continuous learning & research"
                ].map((principle, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-white/5 p-2.5 border border-white/5 hover:border-white/20 transition-colors">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Key Contact Summary Card */}
          <div className="lg:col-span-5 bg-[#080808] border border-white/10 rounded-md p-6 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-cyan-400 font-mono border-b border-white/10 pb-3">
              Quick Profile Details
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase">Name</span>
                <span className="text-white font-semibold">{profile.name}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase">Degree</span>
                <span className="text-cyan-400 font-semibold">{profile.degree}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase">Focus</span>
                <span className="text-white">Python, ML, DL, NLP</span>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase">Email</span>
                <a href={`mailto:${profile.email}`} className="text-cyan-400 hover:underline">{profile.email}</a>
              </div>
              <div className="flex justify-between py-2 border-b border-white/5">
                <span className="text-white/40 uppercase">Phone</span>
                <span className="text-white/90">{profile.phone}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-white/40 uppercase">Location</span>
                <span className="text-white/90">{profile.location}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Connect on LinkedIn</span>
              </a>
            </div>
          </div>

        </div>

        {/* Learning Journey Timeline */}
        <div className="space-y-6">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <h3 className="text-base font-bold uppercase tracking-tight text-white font-mono">AI Learning Roadmap</h3>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400">Progression Milestones</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {learningJourney.map((item, idx) => (
              <div
                key={idx}
                className="bg-[#080808] border border-white/10 rounded-md p-4 hover:border-cyan-500/50 transition-all group"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono font-bold text-black bg-cyan-400 px-2 py-0.5">
                    {item.step}
                  </span>
                  <span className="text-[9px] text-white/60 font-mono border border-white/10 px-1.5 py-0.5 uppercase">
                    {item.status}
                  </span>
                </div>

                <div className="w-7 h-7 bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center mb-3 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <item.icon className="w-3.5 h-3.5" />
                </div>

                <h4 className="text-xs font-bold uppercase text-white mb-1.5 tracking-tight font-mono">{item.title}</h4>
                <p className="text-[11px] text-white/50 leading-relaxed font-mono">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
