import React, { useState } from 'react';
import { Profile } from '../types';
import { Mail, Phone, Linkedin, Github, Send, CheckCircle2, AlertCircle, RefreshCw, MessageSquare } from 'lucide-react';

interface ContactSectionProps {
  profile: Profile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please fill in your name, email, and message.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (data.success) {
        setSuccessMsg(data.message || 'Thank you! Your message has been sent successfully.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error(data.message || 'Failed to send message.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 relative bg-[#030303] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-2">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold font-mono">07 // CONTACT & COLLABORATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
              Get In <span className="text-cyan-400">Touch</span>
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-xs sm:text-sm font-mono leading-relaxed">
            Open for AI/ML engineering internships, fresher software roles, research collaborations, and project discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Direct Contact Info */}
          <div className="lg:col-span-5 bg-[#080808] border border-white/10 rounded-md p-6 sm:p-8 space-y-6">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white uppercase font-mono tracking-tight">Direct Contact Info</h3>
              <p className="text-xs text-white/50 font-mono">
                Reach out directly via email, phone, or connect on professional channels.
              </p>
            </div>

            <div className="space-y-3 font-mono">
              
              {/* Email */}
              <a
                href={`mailto:${profile.email}`}
                className="flex items-center gap-4 p-4 bg-black/60 border border-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block">Email Address</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-400">{profile.email}</span>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${profile.phone}`}
                className="flex items-center gap-4 p-4 bg-black/60 border border-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block">Phone Number</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-400">{profile.phone}</span>
                </div>
              </a>

              {/* LinkedIn */}
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-black/60 border border-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <Linkedin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block">LinkedIn Profile</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-400">DILLIBABU G</span>
                </div>
              </a>

              {/* GitHub */}
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-black/60 border border-white/10 hover:border-cyan-500/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-white/5 border border-white/10 text-cyan-400 flex items-center justify-center shrink-0 group-hover:bg-cyan-500 group-hover:text-black transition-colors">
                  <Github className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[9px] text-white/40 uppercase tracking-widest block">GitHub Repositories</span>
                  <span className="text-xs font-bold text-white group-hover:text-cyan-400">dilli-cmyk</span>
                </div>
              </a>

            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7 bg-[#080808] border border-white/10 rounded-md p-6 sm:p-8 space-y-6">
            <div className="space-y-1 border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white uppercase font-mono tracking-tight">Send a Message</h3>
              <p className="text-xs text-white/50 font-mono">Fill out the form below to connect directly with DILLIBABU G.</p>
            </div>

            {successMsg && (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-3">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            {errorMsg && (
              <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-mono">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 uppercase tracking-wider block">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-black text-white placeholder-white/30 text-xs px-4 py-3 border border-white/10 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-white/50 uppercase tracking-wider block">Your Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. visitor@company.com"
                    className="w-full bg-black text-white placeholder-white/30 text-xs px-4 py-3 border border-white/10 focus:outline-none focus:border-cyan-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-wider block">Subject</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={e => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. AI Internship / Collaboration"
                  className="w-full bg-black text-white placeholder-white/30 text-xs px-4 py-3 border border-white/10 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-white/50 uppercase tracking-wider block">Message *</label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full bg-black text-white placeholder-white/30 text-xs p-4 border border-white/10 focus:outline-none focus:border-cyan-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.25)]"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
