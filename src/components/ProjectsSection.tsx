import React, { useState } from 'react';
import { Project } from '../types';
import { Project3DCard } from './3d/Project3DCard';
import { ProjectModal } from './ProjectModal';
import { FolderGit2, Github, ExternalLink, ArrowRight, Brain, Sparkles } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Machine Learning', 'Deep Learning', 'NLP', 'Python App'];

  const filteredProjects = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 relative bg-[#030303] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-2">
              <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold font-mono">04 // ENGINEERING PORTFOLIO</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
              Featured <span className="text-cyan-400">Projects</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-xs sm:text-sm font-mono leading-relaxed">
            Practical AI/ML implementations built with Python, Scikit-learn, PyTorch, Natural Language Processing pipelines, and full-stack API architectures.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(34,211,238,0.3)]'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid with 3D Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <Project3DCard key={project.id} className="group flex flex-col h-full bg-[#080808] border border-white/10 rounded-md overflow-hidden">
              
              {/* Image Preview Banner */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

                {/* Badge tags */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 bg-black/90 backdrop-blur-md text-cyan-400 border border-cyan-500/30 text-[9px] font-mono font-bold uppercase">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="px-2.5 py-1 bg-cyan-500 text-black text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      Featured
                    </span>
                  )}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-white uppercase tracking-tight font-mono group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/60 text-xs line-clamp-2 leading-relaxed font-light">
                    {project.description}
                  </p>
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.technologies.slice(0, 5).map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-white/5 border border-white/10 text-white/70 text-[10px] font-mono uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 bg-white/5 text-white/40 text-[10px] font-mono">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>

                {/* Footer Action Links */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-xs font-mono uppercase font-bold text-cyan-400 hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="GitHub Repository"
                      className="p-2 text-white/40 hover:text-white bg-white/5 border border-white/10 rounded-xs transition-colors"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Live Demo"
                      className="p-2 text-white/40 hover:text-cyan-400 bg-white/5 border border-white/10 rounded-xs transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>

              </div>

            </Project3DCard>
          ))}
        </div>

      </div>

      {/* Project Details Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
