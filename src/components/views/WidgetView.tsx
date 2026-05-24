import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export function WidgetView() {
  const [messages, setMessages] = useState<ChatMessage[]>([{
    role: 'model',
    parts: [{ text: 'Hello. I am the Gemini Nano local simulation instance. How can I assist you with offline processing today?' }]
  }]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    const newContext = [...messages, { role: 'user', parts: [{ text: userMessage }] } as ChatMessage];
    setMessages(newContext);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          contextHistory: messages.map(m => ({ role: m.role, parts: m.parts }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to connect to local hub interface');
      }
      const data = await response.json();
      setMessages([...newContext, { role: 'model', parts: [{ text: data.reply }] }]);
    } catch (error: any) {
      setMessages([...newContext, { role: 'model', parts: [{ text: `[SYSTEM ERROR]: ${error.message}. Ensure GEMINI_API_KEY is configured in your platform settings to power this widget preview.` }] }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-[calc(100vh-140px)]">
      <div className="w-full max-w-2xl bg-[#111] border border-white/10 flex flex-col h-full max-h-[800px] overflow-hidden rounded-[2rem] shadow-2xl relative">
        {/* Widget Header */}
        <div className="p-5 border-b border-white/5 bg-gradient-to-b from-[#1A1A1A] to-transparent flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-gray-100">Gemini Nano (Simulated)</h3>
            <p className="text-xs text-emerald-400/80 font-mono flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Volatile Memory Render
            </p>
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <AnimatePresence>
            {messages.map((msg, i) => (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                key={i} 
                className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-800' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4 text-gray-400" /> : <Bot className="w-4 h-4" />}
                </div>
                <div className={`p-4 rounded-xl max-w-[80%] text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-emerald-600 text-white rounded-tr-sm' 
                    : 'bg-[#1A1A1A] text-gray-300 border border-white/5 rounded-tl-sm'
                }`}>
                  {msg.parts[0].text}
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-4"
              >
                 <div className="w-8 h-8 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0 shadow-sm">
                    <Bot className="w-4 h-4" />
                 </div>
                 <div className="p-4 rounded-xl bg-[#1A1A1A] text-gray-300 border border-white/5 rounded-tl-sm flex items-center gap-2 shadow-sm">
                   <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce"></span>
                   <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></span>
                   <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></span>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={endRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 bg-black/40 border-t border-white/5">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Query the local model..."
              disabled={isLoading}
              className="w-full bg-[#1A1A1A] border border-white/10 rounded-full pl-6 pr-14 py-4 text-sm text-gray-200 placeholder-gray-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50"
            />
            <button 
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-emerald-500 text-gray-950 rounded-full hover:bg-emerald-400 disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-400 transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </form>
          <div className="text-center mt-3">
             <span className="text-[10px] text-gray-600 font-mono">Running natively isolated • NPU Accelerated</span>
          </div>
        </div>
      </div>
    </div>
  );
}
