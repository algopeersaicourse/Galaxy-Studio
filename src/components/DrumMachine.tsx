import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface DrumPad {
  id: string;
  name: string;
  frequency: number;
  color: string;
}

const DRUM_PADS: DrumPad[] = [
  { id: 'kick', name: 'Kick', frequency: 60, color: 'bg-galaxy-accent' },
  { id: 'snare', name: 'Snare', frequency: 200, color: 'bg-galaxy-secondary' },
  { id: 'hihat', name: 'Hi-Hat', frequency: 1000, color: 'bg-indigo-400' },
  { id: 'tom', name: 'Tom', frequency: 100, color: 'bg-purple-400' },
  { id: 'clap', name: 'Clap', frequency: 400, color: 'bg-pink-400' },
  { id: 'rim', name: 'Rim', frequency: 800, color: 'bg-blue-400' },
];

export const DrumMachine: React.FC = () => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    return () => ctx.close();
  }, []);

  const playSound = useCallback((pad: DrumPad) => {
    if (!audioContext) return;

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = pad.id === 'hihat' ? 'triangle' : 'sine';
    osc.frequency.setValueAtTime(pad.frequency, audioContext.currentTime);
    
    // Simple drum synthesis
    if (pad.id === 'kick') {
      osc.frequency.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    }

    gain.gain.setValueAtTime(0.5, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + (pad.id === 'hihat' ? 0.05 : 0.2));

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 0.2);
  }, [audioContext]);

  return (
    <div className="glass p-8 rounded-3xl w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h3 className="font-serif italic text-2xl">Nebula Beats</h3>
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">Percussion Lab</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {DRUM_PADS.map((pad) => (
          <motion.button
            key={pad.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => playSound(pad)}
            className={cn(
              "aspect-square rounded-2xl flex flex-col items-center justify-center gap-2 border border-white/10 transition-all group relative overflow-hidden",
              "bg-white/5 hover:bg-white/10"
            )}
          >
            <div className={cn("w-2 h-2 rounded-full mb-1", pad.color)} />
            <span className="text-xs font-mono uppercase tracking-widest text-white/60 group-hover:text-white">
              {pad.name}
            </span>
            <div className={cn("absolute inset-0 opacity-0 group-active:opacity-20 transition-opacity", pad.color)} />
          </motion.button>
        ))}
      </div>
      
      <div className="pt-4 border-t border-white/5 text-center">
        <p className="text-[10px] text-white/20 uppercase tracking-widest italic">
          Tap to trigger cosmic rhythms
        </p>
      </div>
    </div>
  );
};
