export interface Profile {
  name: string;
  role: string;
  degree: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string;
  headline: string;
  supportingText: string;
  location: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'Programming' | 'Machine Learning' | 'Deep Learning' | 'NLP';
  description: string;
  level: string; // e.g. "Proficient", "Advanced", "Exploring"
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  problem: string;
  solution: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  imageUrl: string;
  featured: boolean;
  status: 'Completed' | 'In Progress' | 'Featured';
  aiMlApproach: string;
  keyFeatures: string[];
  results: string;
  category: 'Machine Learning' | 'Deep Learning' | 'NLP' | 'Python App';
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read';
  createdAt: string;
}

export interface AIChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}

export interface AdminAuthResponse {
  success: boolean;
  token?: string;
  message?: string;
}
