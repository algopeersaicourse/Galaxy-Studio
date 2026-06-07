import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Info, Music2, ChevronRight } from 'lucide-react';
import { SCALES, NOTES, Scale } from '@/src/types';
import { cn } from '@/src/lib/utils';

export const ScaleExplorer: React.FC = () => {
  const [selectedScale, setSelectedScale] = useState<Scale>(SCALES[0]);
  const [rootNote, setRootNote] = useState(NOTES[0]);

  const getScaleNotes = () => {
    const baseNotes = NOTES.slice(0, 12);
    const rootIndex = baseNotes.findIndex(n => n.name === rootNote.name);
    return selectedScale.intervals.map(interval => {
      const index = (rootIndex + interval) % 12;
      return baseNotes[index];
    });
  };

  const scaleNotes = getScaleNotes();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
      <div className="lg:col-span-1 space-y-6">
        <div className="glass p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-galaxy-accent">
            <Music2 className="w-5 h-5" />
            <h3 className="font-serif italic text-xl">Select a Root</h3>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {NOTES.slice(0, 12).map(note => (
              <button
                key={note.name}
                onClick={() => setRootNote(note)}
                className={cn(
                  "py-2 rounded-lg text-xs font-mono transition-all",
                  rootNote.name === note.name 
                    ? "bg-galaxy-accent text-white" 
                    : "bg-white/5 hover:bg-white/10 text-white/60"
                )}
              >
                {note.name.replace(/\d+$/, '')}
              </button>
            ))}
          </div>
        </div>

        <div className="glass p-6 rounded-3xl space-y-4">
          <div className="flex items-center gap-2 text-galaxy-secondary">
            <Info className="w-5 h-5" />
            <h3 className="font-serif italic text-xl">Choose Scale</h3>
          </div>
          <div className="space-y-2">
            {SCALES.map(scale => (
              <button
                key={scale.name}
                onClick={() => setSelectedScale(scale)}
                className={cn(
                  "w-full flex items-center justify-between p-3 rounded-xl text-sm transition-all group",
                  selectedScale.name === scale.name 
                    ? "bg-galaxy-secondary/20 border border-galaxy-secondary/30 text-white" 
                    : "bg-white/5 hover:bg-white/10 text-white/60"
                )}
              >
                <span>{scale.name}</span>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  selectedScale.name === scale.name ? "rotate-90" : "group-hover:translate-x-1"
                )} />
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="lg:col-span-2 glass p-8 rounded-3xl flex flex-col justify-between">
        <div>
          <div className="flex items-baseline gap-3 mb-2">
            <h2 className="text-4xl font-serif italic">{rootNote.name.replace(/\d+$/, '')} {selectedScale.name}</h2>
            <span className="text-xs text-white/30 uppercase tracking-widest">Scale Visualization</span>
          </div>
          <p className="text-white/60 text-sm leading-relaxed max-w-md">
            {selectedScale.description} This scale consists of {scaleNotes.length} unique notes that create a specific emotional resonance.
          </p>
        </div>

        <div className="flex items-center justify-center gap-4 py-12">
          {scaleNotes.map((note, i) => (
            <motion.div
              key={`${note.name}-${i}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className="w-16 h-16 rounded-full glass flex items-center justify-center border-white/20 group-hover:border-galaxy-accent transition-colors">
                <span className="font-serif italic text-xl">{note.name.replace(/\d+$/, '')}</span>
              </div>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-mono text-white/20">
                {i + 1}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-white/30 uppercase tracking-[0.3em]">
          <span>Intervals: {selectedScale.intervals.join(' - ')}</span>
          <span>Galaxy Studio Engine v1.0</span>
        </div>
      </div>
    </div>
  );
};
