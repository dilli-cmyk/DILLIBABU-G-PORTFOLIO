import { Profile, Skill, Project, ContactMessage } from '../types';
import { initialProfile, initialSkills, initialProjects, initialMessages } from '../db/initialData';

class PortfolioStore {
  private profile: Profile = { ...initialProfile };
  private skills: Skill[] = [...initialSkills];
  private projects: Project[] = [...initialProjects];
  private messages: ContactMessage[] = [...initialMessages];

  // Profile Methods
  getProfile(): Profile {
    return { ...this.profile };
  }

  updateProfile(updates: Partial<Profile>): Profile {
    this.profile = { ...this.profile, ...updates };
    return { ...this.profile };
  }

  // Skills Methods
  getSkills(): Skill[] {
    return [...this.skills];
  }

  addSkill(skill: Omit<Skill, 'id'>): Skill {
    const newSkill: Skill = {
      ...skill,
      id: `sk-${Date.now()}`
    };
    this.skills.unshift(newSkill);
    return newSkill;
  }

  deleteSkill(id: string): boolean {
    const initialLen = this.skills.length;
    this.skills = this.skills.filter(s => s.id !== id);
    return this.skills.length < initialLen;
  }

  // Projects Methods
  getProjects(): Project[] {
    return [...this.projects];
  }

  getProjectById(idOrSlug: string): Project | undefined {
    return this.projects.find(p => p.id === idOrSlug || p.slug === idOrSlug);
  }

  addProject(project: Omit<Project, 'id'>): Project {
    const newProject: Project = {
      ...project,
      id: `proj-${Date.now()}`,
      slug: project.slug || project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    };
    this.projects.unshift(newProject);
    return newProject;
  }

  updateProject(id: string, updates: Partial<Project>): Project | undefined {
    const index = this.projects.findIndex(p => p.id === id);
    if (index === -1) return undefined;
    
    this.projects[index] = {
      ...this.projects[index],
      ...updates
    };
    return { ...this.projects[index] };
  }

  deleteProject(id: string): boolean {
    const initialLen = this.projects.length;
    this.projects = this.projects.filter(p => p.id !== id);
    return this.projects.length < initialLen;
  }

  // Contact Messages Methods
  getMessages(): ContactMessage[] {
    return [...this.messages];
  }

  addMessage(msg: { name: string; email: string; subject?: string; message: string }): ContactMessage {
    const newMessage: ContactMessage = {
      id: `msg-${Date.now()}`,
      name: msg.name,
      email: msg.email,
      subject: msg.subject || 'Portfolio Inquiry',
      message: msg.message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.messages.unshift(newMessage);
    return newMessage;
  }

  markMessageRead(id: string): ContactMessage | undefined {
    const msg = this.messages.find(m => m.id === id);
    if (msg) {
      msg.status = 'read';
    }
    return msg;
  }
}

export const portfolioStore = new PortfolioStore();
