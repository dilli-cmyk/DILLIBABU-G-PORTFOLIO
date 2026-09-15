import React, { useState, useEffect } from 'react';
import { Profile, Skill, Project, ContactMessage } from '../types';
import { Shield, Lock, X, Plus, Trash2, Edit3, Mail, CheckCircle, RefreshCw, Key } from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  profile: Profile;
  skills: Skill[];
  projects: Project[];
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  profile,
  skills,
  projects,
  onRefreshData
}) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('dillibabu_admin_token'));
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'projects' | 'skills' | 'messages' | 'profile'>('projects');

  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // New Project Form state
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    problem: '',
    solution: '',
    technologies: 'Python, Machine Learning',
    githubUrl: 'https://github.com/dilli-cmyk',
    liveUrl: 'https://github.com/dilli-cmyk',
    category: 'Machine Learning' as Project['category'],
    aiMlApproach: '',
    keyFeatures: 'Feature 1, Feature 2'
  });

  // New Skill Form state
  const [newSkill, setNewSkill] = useState({
    name: '',
    category: 'Programming' as Skill['category'],
    description: '',
    level: 'Proficient'
  });

  // Profile Edit Form state
  const [profileForm, setProfileForm] = useState({ ...profile });

  useEffect(() => {
    if (token) {
      fetchMessages();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput })
      });

      const data = await res.json();

      if (data.success && data.token) {
        setToken(data.token);
        localStorage.setItem('dillibabu_admin_token', data.token);
        setPasswordInput('');
        fetchMessages();
      } else {
        setLoginError(data.message || 'Invalid password.');
      }
    } catch (err: any) {
      setLoginError('Server authentication failed.');
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('dillibabu_admin_token');
  };

  const fetchMessages = async () => {
    if (!token) return;
    setLoadingMessages(true);
    try {
      const res = await fetch('/api/contact/messages', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          ...newProject,
          technologies: newProject.technologies.split(',').map(s => s.trim()),
          keyFeatures: newProject.keyFeatures.split(',').map(s => s.trim())
        })
      });

      const data = await res.json();
      if (data.success) {
        onRefreshData();
        setNewProject({
          title: '',
          description: '',
          problem: '',
          solution: '',
          technologies: 'Python, Machine Learning',
          githubUrl: 'https://github.com/dilli-cmyk',
          liveUrl: 'https://github.com/dilli-cmyk',
          category: 'Machine Learning',
          aiMlApproach: '',
          keyFeatures: 'Feature 1, Feature 2'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!token || !window.confirm('Delete this project?')) return;
    try {
      await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newSkill)
      });
      const data = await res.json();
      if (data.success) {
        onRefreshData();
        setNewSkill({
          name: '',
          category: 'Programming',
          description: '',
          level: 'Proficient'
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!token || !window.confirm('Delete this skill?')) return;
    try {
      await fetch(`/api/skills/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      onRefreshData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(profileForm)
      });
      const data = await res.json();
      if (data.success) {
        onRefreshData();
        alert('Profile details updated successfully!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-md overflow-hidden shadow-2xl my-8">
        
        {/* Top Title Bar */}
        <div className="px-6 py-4 bg-black border-b border-white/10 flex items-center justify-between font-mono">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="font-bold text-white text-sm uppercase tracking-wider">DILLIBABU G • ADMIN CONTROL PANEL</span>
          </div>

          <div className="flex items-center gap-3">
            {token && (
              <button
                onClick={handleLogout}
                className="text-xs text-white/50 hover:text-cyan-400 uppercase tracking-wider underline cursor-pointer"
              >
                Log Out
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto bg-[#030303] font-mono">
          
          {/* LOGIN SCREEN */}
          {!token ? (
            <div className="max-w-md mx-auto py-8 space-y-6 text-center">
              <div className="w-12 h-12 bg-cyan-500 text-black flex items-center justify-center font-bold mx-auto">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-1">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">Admin Authentication</h3>
                <p className="text-xs text-white/50 font-light">
                  Enter password to manage portfolio profile, skills, projects, and contact messages. (Default: <code className="text-cyan-400">admin_dillibabu_2026</code>)
                </p>
              </div>

              {loginError && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                  {loginError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="relative">
                  <Key className="w-4 h-4 text-white/40 absolute left-3 top-3.5" />
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter Admin Password..."
                    className="w-full bg-black text-white placeholder-white/30 text-xs pl-10 pr-4 py-3 border border-white/10 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs uppercase tracking-widest cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                >
                  Log In as Admin
                </button>
              </form>
            </div>
          ) : (
            /* AUTHENTICATED ADMIN DASHBOARD */
            <div className="space-y-6">
              
              {/* Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
                {[
                  { key: 'projects', label: `Projects (${projects.length})` },
                  { key: 'skills', label: `Skills (${skills.length})` },
                  { key: 'messages', label: `Messages (${messages.length})` },
                  { key: 'profile', label: 'Edit Profile' }
                ].map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key as any)}
                    className={`px-4 py-2 text-xs font-bold uppercase tracking-wider cursor-pointer ${
                      activeTab === tab.key
                        ? 'bg-cyan-500 text-black'
                        : 'bg-black text-white/50 border border-white/10 hover:text-white'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* PROJECTS TAB */}
              {activeTab === 'projects' && (
                <div className="space-y-6">
                  {/* Add Project Form */}
                  <form onSubmit={handleAddProject} className="bg-[#080808] p-5 border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Add New Project</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Project Title"
                        required
                        value={newProject.title}
                        onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                        className="bg-black p-2.5 border border-white/10 text-white placeholder-white/30"
                      />
                      <select
                        value={newProject.category}
                        onChange={e => setNewProject({ ...newProject, category: e.target.value as any })}
                        className="bg-black p-2.5 border border-white/10 text-white"
                      >
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="NLP">NLP</option>
                        <option value="Python App">Python App</option>
                      </select>
                    </div>

                    <textarea
                      placeholder="Short Description"
                      required
                      value={newProject.description}
                      onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                      className="w-full bg-black p-2.5 border border-white/10 text-white text-xs placeholder-white/30"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Problem Statement"
                        value={newProject.problem}
                        onChange={e => setNewProject({ ...newProject, problem: e.target.value })}
                        className="bg-black p-2.5 border border-white/10 text-white placeholder-white/30"
                      />
                      <input
                        type="text"
                        placeholder="Solution"
                        value={newProject.solution}
                        onChange={e => setNewProject({ ...newProject, solution: e.target.value })}
                        className="bg-black p-2.5 border border-white/10 text-white placeholder-white/30"
                      />
                    </div>

                    <input
                      type="text"
                      placeholder="Technologies (comma separated)"
                      value={newProject.technologies}
                      onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
                      className="w-full bg-black p-2.5 border border-white/10 text-white text-xs placeholder-white/30"
                    />

                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Create Project</span>
                    </button>
                  </form>

                  {/* List of Projects */}
                  <div className="space-y-3">
                    {projects.map((p) => (
                      <div key={p.id} className="p-4 bg-[#080808] border border-white/10 flex items-center justify-between">
                        <div>
                          <h5 className="font-bold text-white text-xs uppercase">{p.title}</h5>
                          <span className="text-[10px] text-cyan-400">{p.category}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteProject(p.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SKILLS TAB */}
              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <form onSubmit={handleAddSkill} className="bg-[#080808] p-5 border border-white/10 space-y-4">
                    <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Add New Skill</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <input
                        type="text"
                        placeholder="Skill Name"
                        required
                        value={newSkill.name}
                        onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="bg-black p-2.5 border border-white/10 text-white placeholder-white/30"
                      />
                      <select
                        value={newSkill.category}
                        onChange={e => setNewSkill({ ...newSkill, category: e.target.value as any })}
                        className="bg-black p-2.5 border border-white/10 text-white"
                      >
                        <option value="Programming">Programming</option>
                        <option value="Machine Learning">Machine Learning</option>
                        <option value="Deep Learning">Deep Learning</option>
                        <option value="NLP">NLP</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Description"
                        value={newSkill.description}
                        onChange={e => setNewSkill({ ...newSkill, description: e.target.value })}
                        className="bg-black p-2.5 border border-white/10 text-white placeholder-white/30"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Skill</span>
                    </button>
                  </form>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {skills.map((s) => (
                      <div key={s.id} className="p-3 bg-[#080808] border border-white/10 flex items-center justify-between">
                        <div>
                          <span className="font-bold text-white text-xs block uppercase">{s.name}</span>
                          <span className="text-[10px] text-cyan-400">{s.category} • {s.level}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteSkill(s.id)}
                          className="p-1.5 text-red-400 hover:bg-red-500/10 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* MESSAGES TAB */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  {messages.length === 0 ? (
                    <div className="text-center py-8 text-white/40 text-xs">
                      No contact messages received yet.
                    </div>
                  ) : (
                    messages.map((msg) => (
                      <div key={msg.id} className="p-4 bg-[#080808] border border-white/10 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="font-bold text-white text-xs uppercase block">{msg.name}</span>
                            <span className="text-[10px] text-cyan-400">{msg.email}</span>
                          </div>
                          <span className="text-[10px] text-white/40">{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                        <div className="text-xs font-semibold text-white/80">Subject: {msg.subject}</div>
                        <p className="text-xs text-white/60 leading-relaxed bg-black p-3 border border-white/5">{msg.message}</p>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* EDIT PROFILE TAB */}
              {activeTab === 'profile' && (
                <form onSubmit={handleUpdateProfile} className="space-y-4 bg-[#080808] p-5 border border-white/10 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/50 block mb-1 uppercase text-[10px]">Name</label>
                      <input
                        type="text"
                        value={profileForm.name}
                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                        className="w-full bg-black p-2.5 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 block mb-1 uppercase text-[10px]">Role</label>
                      <input
                        type="text"
                        value={profileForm.role}
                        onChange={e => setProfileForm({ ...profileForm, role: e.target.value })}
                        className="w-full bg-black p-2.5 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-white/50 block mb-1 uppercase text-[10px]">Email</label>
                      <input
                        type="email"
                        value={profileForm.email}
                        onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                        className="w-full bg-black p-2.5 border border-white/10 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-white/50 block mb-1 uppercase text-[10px]">Phone</label>
                      <input
                        type="text"
                        value={profileForm.phone}
                        onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                        className="w-full bg-black p-2.5 border border-white/10 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/50 block mb-1 uppercase text-[10px]">Headline</label>
                    <input
                      type="text"
                      value={profileForm.headline}
                      onChange={e => setProfileForm({ ...profileForm, headline: e.target.value })}
                      className="w-full bg-black p-2.5 border border-white/10 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-white/50 block mb-1 uppercase text-[10px]">Supporting Text</label>
                    <textarea
                      value={profileForm.supportingText}
                      onChange={e => setProfileForm({ ...profileForm, supportingText: e.target.value })}
                      rows={3}
                      className="w-full bg-black p-2.5 border border-white/10 text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-cyan-500 text-black font-bold text-xs uppercase tracking-wider cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                </form>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
