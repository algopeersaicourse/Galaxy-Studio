import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, Music } from 'lucide-react';
import Markdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';
import { cn } from '@/src/lib/utils';

interface Message {
  role: 'user' | 'model';
  content: string;
}

export const MusicTutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', content: "Greetings, explorer. I am your Stellar Tutor. Whether you're curious about the physics of sound or the beauty of a symphony, I'm here to guide your journey through the musical cosmos. What shall we explore today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: messages.concat({ role: 'user', content: userMessage }).map(m => ({
          role: m.role,
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: "You are a world-class music tutor named 'Stellar' in Benjamin's Galaxy Studio. Your mission is to help students (especially those in Ghana who find instruments difficult) learn Piano, Drums, Bass Guitar, and Electric Guitar. Provide clear, step-by-step guidance for beginners who don't understand music yet. Be encouraging, patient, and use cosmic analogies. Use Markdown for formatting.",
        }
      });

      setMessages(prev => [...prev, { role: 'model', content: response.text || "The cosmos is silent on this one. Could you rephrase?" }]);
    } catch (error) {
      console.error('Gemini Error:', error);
      setMessages(prev => [...prev, { role: 'model', content: "A solar flare interrupted our connection. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full glass rounded-3xl overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center gap-3 bg-white/5">
        <div className="w-10 h-10 rounded-full overflow-hidden border border-white/10">
          <img 
            src="https://picsum.photos/seed/yamaha-montage-v8/200/200" 
            alt="Yamaha Montage V8" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div>
          <h3 className="font-serif italic text-lg leading-none">Stellar Tutor</h3>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">AI Music Guide</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={cn(
                "flex gap-4 max-w-[85%]",
                msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
              )}
            >
              <div className={cn(
                "w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden",
                msg.role === 'user' ? "bg-galaxy-secondary/20" : "bg-galaxy-accent/20 border border-white/10"
              )}>
                {msg.role === 'user' ? (
                  <User className="w-4 h-4 text-galaxy-secondary" />
                ) : (
                  <img 
                    src="https://picsum.photos/seed/yamaha-montage-v8/200/200" 
                    alt="Yamaha Montage V8" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                )}
              </div>
              <div className={cn(
                "p-4 rounded-2xl text-sm",
                msg.role === 'user' ? "bg-white/10 rounded-tr-none" : "bg-white/5 rounded-tl-none border border-white/5"
              )}>
                <div className="markdown-body">
                  <Markdown>{msg.content}</Markdown>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isLoading && (
          <div className="flex gap-4 mr-auto animate-pulse">
            <div className="w-8 h-8 rounded-full bg-white/5" />
            <div className="h-12 w-32 bg-white/5 rounded-2xl" />
          </div>
        )}
      </div>

      <div className="p-4 bg-white/5 border-t border-white/10">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about chords, scales, or music history..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-12 text-sm focus:outline-none focus:border-galaxy-accent/50 transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/40 hover:text-galaxy-accent transition-colors disabled:opacity-50"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
