import React, { useState } from 'react';
import { X, Code2, Play, CheckCircle2, Copy } from 'lucide-react';

interface ApiDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApiDocsModal: React.FC<ApiDocsModalProps> = ({ isOpen, onClose }) => {
  const [activeEndpoint, setActiveEndpoint] = useState<string>('profile');
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const endpoints = [
    { id: 'profile', method: 'GET', path: '/api/profile', desc: 'Fetch DILLIBABU G profile metadata' },
    { id: 'skills', method: 'GET', path: '/api/skills', desc: 'Fetch technical skills array' },
    { id: 'projects', method: 'GET', path: '/api/projects', desc: 'Fetch AI/ML portfolio project items' },
    { id: 'contact', method: 'POST', path: '/api/contact', desc: 'Submit visitor contact form message' },
    { id: 'aichat', method: 'POST', path: '/api/ai/chat', desc: 'Gemini AI Assistant Chat Endpoint' }
  ];

  const handleTestEndpoint = async (path: string, method: string) => {
    setLoading(true);
    setTestResponse(null);

    try {
      let res;
      if (method === 'GET') {
        res = await fetch(path);
      } else if (path === '/api/contact') {
        res = await fetch(path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: 'API Inspector Test',
            email: 'test@example.com',
            subject: 'API Test Inquiry',
            message: 'Testing the live REST API endpoint from inspector.'
          })
        });
      } else {
        res = await fetch(path, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: 'What skills does DILLIBABU G specialize in?'
          })
        });
      }

      const data = await res.json();
      setTestResponse(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setTestResponse(JSON.stringify({ error: err.message }, null, 2));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200 font-mono">
      <div className="relative w-full max-w-4xl bg-[#080808] border border-white/10 rounded-md overflow-hidden shadow-2xl my-8">
        
        {/* Header */}
        <div className="px-6 py-4 bg-black border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Code2 className="w-5 h-5 text-cyan-400" />
            <h2 className="font-bold text-white text-sm uppercase tracking-wider">OpenAPI & REST Inspector (/api/docs)</h2>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white hover:bg-white/10 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto bg-[#030303]">
          
          <p className="text-white/50 text-xs leading-relaxed font-light">
            Live REST API specifications powering the portfolio backend architecture. Click "Test Request" on any endpoint to execute a real server call.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Endpoints Sidebar */}
            <div className="md:col-span-5 space-y-2">
              {endpoints.map((ep) => (
                <button
                  key={ep.id}
                  onClick={() => {
                    setActiveEndpoint(ep.id);
                    setTestResponse(null);
                  }}
                  className={`w-full text-left p-3 border transition-all cursor-pointer ${
                    activeEndpoint === ep.id
                      ? 'bg-white/10 border-cyan-500 text-white'
                      : 'bg-black border-white/10 hover:border-white/30 text-white/60'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 ${
                      ep.method === 'GET' ? 'bg-cyan-500 text-black' : 'bg-emerald-500 text-black'
                    }`}>
                      {ep.method}
                    </span>
                    <span className="text-xs font-bold text-white">{ep.path}</span>
                  </div>
                  <p className="text-[10px] text-white/40">{ep.desc}</p>
                </button>
              ))}
            </div>

            {/* Test Panel */}
            <div className="md:col-span-7 bg-black p-5 border border-white/10 space-y-4">
              {(() => {
                const currentEp = endpoints.find(e => e.id === activeEndpoint)!;
                return (
                  <>
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <div>
                        <span className="text-xs font-bold text-cyan-400">{currentEp.method} {currentEp.path}</span>
                        <p className="text-[10px] text-white/50">{currentEp.desc}</p>
                      </div>

                      <button
                        onClick={() => handleTestEndpoint(currentEp.path, currentEp.method)}
                        disabled={loading}
                        className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Test Request</span>
                      </button>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] text-white/40 uppercase tracking-widest block">Live Server Response:</span>
                      <pre className="bg-[#080808] p-4 border border-white/10 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-64 leading-relaxed">
                        {loading
                          ? 'Executing HTTP request to server...'
                          : testResponse || 'Click "Test Request" above to execute endpoint.'}
                      </pre>
                    </div>
                  </>
                );
              })()}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
