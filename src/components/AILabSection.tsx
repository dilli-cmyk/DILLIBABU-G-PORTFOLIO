import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, Sparkles, Terminal, User, RefreshCw, AlertCircle, CornerDownLeft } from 'lucide-react';
import { AIChatMessage } from '../types';

export const AILabSection: React.FC = () => {
  const [messages, setMessages] = useState<AIChatMessage[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: "Hello! I am DILLIBABU's AI Portfolio Assistant powered by Gemini 3.6 Flash. Ask me anything about DILLIBABU G, his skills in Python & ML/NLP, projects, degree, or contact info!",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const quickPrompts = [
    "What skills does DILLIBABU have?",
    "Tell me about his NLP and Deep Learning projects",
    "How can I contact DILLIBABU G?",
    "What is his educational background?"
  ];

  const handleSendMessage = async (userText: string) => {
    if (!userText.trim() || loading) return;

    const query = userText.trim();
    setInput('');
    setError(null);

    const userMsg: AIChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: query })
      });

      const data = await res.json();

      if (data.success && data.response) {
        const aiMsg: AIChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.response,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages(prev => [...prev, aiMsg]);
      } else {
        throw new Error(data.message || 'Failed to receive AI response.');
      }
    } catch (err: any) {
      console.error('AI LAB Chat error:', err);
      setError('Unable to reach AI service right now. Showing default profile info.');
      const fallbackMsg: AIChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: `DILLIBABU G is an Aspiring AI Engineer pursuing his BCA degree. He specializes in Python, Machine Learning, Deep Learning, and NLP. Contact him at dillibabu2618@gmail.com or +91 7539949771.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage(input);
    }
  };

  return (
    <section id="ai-lab" className="py-24 relative bg-[#030303] border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-md mb-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[10px] uppercase tracking-widest text-cyan-400 font-bold font-mono">05 // AI TERMINAL INTERACTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tighter">
              AI <span className="text-cyan-400">Lab</span> Assistant
            </h2>
          </div>
          <p className="text-white/50 max-w-md text-xs sm:text-sm font-mono leading-relaxed">
            Interactive AI terminal powered by Gemini 3.6 Flash for recruiters & hiring managers to query DILLIBABU G's profile in real time.
          </p>
        </div>

        {/* AI Terminal Window */}
        <div className="bg-[#080808] border border-white/10 rounded-md overflow-hidden flex flex-col h-[540px]">
          
          {/* Terminal Titlebar */}
          <div className="bg-black px-6 py-3 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-red-500/80" />
              <div className="w-2.5 h-2.5 bg-amber-500/80" />
              <div className="w-2.5 h-2.5 bg-emerald-500/80" />
              <span className="text-xs font-mono text-white/40 ml-2 flex items-center gap-1.5 uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                dillibabu-ai-assistant.v1
              </span>
            </div>
            
            <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 border border-cyan-500/20 uppercase font-bold">
              <Bot className="w-3.5 h-3.5" />
              <span>Gemini Active</span>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 font-mono text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${
                  msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 flex items-center justify-center shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500 text-black font-bold'
                      : 'bg-white/10 border border-white/10 text-cyan-400'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`p-4 border ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-200'
                      : 'bg-black/60 border-white/10 text-white/90 leading-relaxed'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                  <span className="text-[9px] opacity-40 block text-right font-mono mt-1">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-3 max-w-[85%] mr-auto items-center">
                <div className="w-7 h-7 bg-white/10 border border-white/10 text-cyan-400 flex items-center justify-center">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-black/60 border border-white/10 p-3 text-xs text-white/50 font-mono flex items-center gap-2">
                  <span>Gemini thinking...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Suggestions */}
          <div className="px-6 py-2 bg-black/40 border-t border-white/10 overflow-x-auto flex gap-2 no-scrollbar">
            {quickPrompts.map((promptText, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(promptText)}
                disabled={loading}
                className="whitespace-nowrap px-3 py-1 bg-white/5 hover:bg-cyan-500 hover:text-black text-[10px] text-white/70 border border-white/10 font-mono uppercase transition-colors cursor-pointer shrink-0"
              >
                "{promptText}"
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-4 bg-black border-t border-white/10">
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about DILLIBABU's Python skills, ML projects, or degree..."
                disabled={loading}
                className="w-full bg-[#080808] text-white placeholder-white/30 text-xs font-mono px-4 py-3 border border-white/10 focus:outline-none focus:border-cyan-500 pr-12 transition-colors"
              />
              <button
                onClick={() => handleSendMessage(input)}
                disabled={loading || !input.trim()}
                className="absolute right-2 p-2 bg-cyan-500 hover:bg-cyan-400 disabled:opacity-30 text-black font-bold transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
