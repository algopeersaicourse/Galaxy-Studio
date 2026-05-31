import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { NOTES, Note } from '@/src/types';

interface VirtualPianoProps {
  onNotePlay?: (note: string) => void;
}

export const VirtualPiano: React.FC<VirtualPianoProps> = ({ onNotePlay }) => {
  const [activeNotes, setActiveNotes] = useState<Set<string>>(new Set());
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    return () => {
      ctx.close();
    };
  }, []);

  const playNote = useCallback((note: Note) => {
    if (!audioContext) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(note.frequency, audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.6, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);

    setActiveNotes(prev => new Set(prev).add(note.name));
    setTimeout(() => {
      setActiveNotes(prev => {
        const next = new Set(prev);
        next.delete(note.name);
        return next;
      });
    }, 200);

    onNotePlay?.(note.name);
  }, [audioContext, onNotePlay]);

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto p-8 glass rounded-3xl">
      <div className="flex flex-col items-center gap-2 mb-4">
        <h3 className="font-serif italic text-2xl text-white/90">Stellar Keys</h3>
        <p className="text-xs text-white/50 uppercase tracking-[0.2em]">Interactive Sound Explorer</p>
      </div>
      
      <div className="relative flex justify-center h-96 w-full select-none">
        {NOTES.map((note, index) => {
          const isAccidental = note.type === 'accidental';
          const isActive = activeNotes.has(note.name);
          
          if (isAccidental) return null;

          return (
            <motion.div
              key={note.name}
              whileTap={{ scaleY: 0.98 }}
              onClick={() => playNote(note)}
              className={cn(
                "relative flex-1 border-x border-white/5 first:rounded-l-xl last:rounded-r-xl cursor-pointer transition-colors duration-200",
                isActive ? "bg-white/40" : "bg-white/15 hover:bg-white/25"
              )}
            >
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/30">
                {note.name}
              </div>
              
              {/* Accidental Keys (Black keys) */}
              {index < NOTES.length - 1 && NOTES[index + 1].type === 'accidental' && (
                <motion.div
                  whileTap={{ scaleY: 0.95 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playNote(NOTES[index + 1]);
                  }}
                  className={cn(
                    "absolute top-0 right-0 translate-x-1/2 w-8 h-56 z-10 rounded-b-lg cursor-pointer transition-colors duration-200",
                    activeNotes.has(NOTES[index + 1].name) ? "bg-galaxy-accent shadow-[0_0_20px_rgba(99,102,241,0.4)]" : "bg-galaxy-bg border border-white/10 hover:bg-white/10"
                  )}
                >
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[8px] font-mono text-white/40">
                    {NOTES[index + 1].name}
                  </div>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
