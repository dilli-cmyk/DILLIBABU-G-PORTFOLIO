import React, { useState } from 'react';
import { Skill } from '../types';
import { Brain, Code, Cpu, MessageSquareText, Terminal, BarChart3, Layers, Network, FileText, Smile, Database } from 'lucide-react';

interface SkillsDashboardProps {
  skills: Skill[];
}

export const SkillsDashboard: React.FC<SkillsDashboardProps> = ({ skills }) => {
  const [activeTab, setActiveTab] = useState<string>('All');

  const categories = ['All', 'Programming', 'Machine Learning', 'Deep Learning', 'NLP'];

  const filteredSkills = activeTab === 'All'
    ? skills
    : skills.filter(s => s.category === activeTab);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Code': return <Code className="w-5 h-5" />;
      case 'Terminal': return <Terminal className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'BarChart3': return <BarChart3 className="w-5 h-5" />;
      case 'Network': return <Network className="w-5 h-5" />;
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'MessageSquareText': return <MessageSquareText className="w-5 h-5" />;
      case 'Smile': return <Smile className="w-5 h-5" />;
      case 'FileText': return <FileText className="w-5 h-5" />;
      default: return <Brain className="w-5 h-5" />;
    }
  };

  return (
    <section id="skills" className="py-24 relative bg-[#030303]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-2">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold font-mono">03 // TECHNICAL CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
              Skill <span className="text-cyan-400">Dashboard</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-xs sm:text-sm font-mono leading-relaxed">
            Categorized overview of technical proficiencies across Python programming, core Machine Learning, Deep Learning neural networks, and NLP pipelines.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === cat
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              className="bg-[#080808] border border-white/10 rounded-md p-6 relative overflow-hidden group hover:border-cyan-500/50 transition-all"
            >
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="w-10 h-10 bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  {getIcon(skill.icon)}
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 border border-white/10 text-cyan-400 uppercase">
                  {skill.level}
                </span>
              </div>

              <div className="space-y-2">
                <span className="text-[9px] font-mono text-white/40 uppercase tracking-widest block">
                  {skill.category}
                </span>
                <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-cyan-400 transition-colors font-mono">
                  {skill.name}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {skill.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
