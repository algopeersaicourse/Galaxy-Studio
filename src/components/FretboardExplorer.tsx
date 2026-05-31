import React, { useState, useCallback, useEffect } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/src/lib/utils';

interface FretboardExplorerProps {
  strings?: number;
  instrumentName: string;
}

const STRING_TUNINGS = {
  guitar: [82.41, 110.00, 146.83, 196.00, 246.94, 329.63], // E2, A2, D3, G3, B3, E4
  bass: [41.20, 55.00, 73.42, 98.00], // E1, A1, D2, G2
};

export const FretboardExplorer: React.FC<FretboardExplorerProps> = ({ strings = 6, instrumentName }) => {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [activeNote, setActiveNote] = useState<{ string: number; fret: number } | null>(null);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
    return () => ctx.close();
  }, []);

  const playNote = useCallback((stringIndex: number, fret: number) => {
    if (!audioContext) return;

    const baseFreq = (instrumentName.toLowerCase().includes('bass') ? STRING_TUNINGS.bass : STRING_TUNINGS.guitar)[stringIndex];
    const frequency = baseFreq * Math.pow(2, fret / 12);

    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, audioContext.currentTime);

    gain.gain.setValueAtTime(0.2, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 1.5);

    osc.connect(gain);
    gain.connect(audioContext.destination);

    osc.start();
    osc.stop(audioContext.currentTime + 1.5);

    setActiveNote({ string: stringIndex, fret });
    setTimeout(() => setActiveNote(null), 300);
  }, [audioContext, instrumentName]);

  const frets = Array.from({ length: 13 }, (_, i) => i);
  const stringArray = Array.from({ length: strings }, (_, i) => i).reverse();

  return (
    <div className="glass p-8 rounded-3xl w-full max-w-5xl mx-auto overflow-x-auto">
      <div className="text-center mb-8">
        <h3 className="font-serif italic text-2xl">{instrumentName} Fretboard</h3>
        <p className="text-[10px] text-white/40 uppercase tracking-[0.2em]">String & Fret Explorer</p>
      </div>

      <div className="relative min-w-[800px] py-8">
        {/* Fretboard Background */}
        <div className="absolute inset-y-0 left-0 right-0 bg-white/5 rounded-lg border border-white/10" />
        
        {/* Frets */}
        <div className="absolute inset-0 flex justify-between px-4">
          {frets.map((fret) => (
            <div key={fret} className="h-full w-[1px] bg-white/10 relative">
              <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20">
                {fret}
              </span>
            </div>
          ))}
        </div>

        {/* Strings */}
        <div className="relative flex flex-col justify-between h-48 px-4">
          {stringArray.map((stringIdx) => (
            <div key={stringIdx} className="relative h-[2px] w-full bg-white/20 flex items-center">
              {frets.map((fret) => (
                <motion.button
                  key={`${stringIdx}-${fret}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => playNote(stringIdx, fret)}
                  className={cn(
                    "absolute w-4 h-4 rounded-full -translate-x-1/2 z-10 transition-all",
                    activeNote?.string === stringIdx && activeNote?.fret === fret
                      ? "bg-galaxy-accent shadow-[0_0_15px_rgba(99,102,241,0.5)]"
                      : "bg-white/5 hover:bg-white/20 border border-white/10"
                  )}
                  style={{ left: `${(fret / (frets.length - 1)) * 100}%` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-8 text-[10px] text-white/30 uppercase tracking-widest italic">
        <span>Click markers to play notes</span>
        <span>Standard Tuning</span>
      </div>
    </div>
  );
};
