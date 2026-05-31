import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Music, BookOpen, Sparkles, Keyboard, Compass, Menu, X, Drum, Guitar, Zap } from 'lucide-react';
import { VirtualPiano } from './components/VirtualPiano';
import { MusicTutor } from './components/MusicTutor';
import { ScaleExplorer } from './components/ScaleExplorer';
import { DrumMachine } from './components/DrumMachine';
import { FretboardExplorer } from './components/FretboardExplorer';
import { cn } from './lib/utils';
import { INSTRUMENTS, InstrumentType } from './types';

type Section = 'theory' | 'instruments' | 'tutor';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('theory');
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentType>('piano');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'theory', label: 'Theory Explorer', icon: Compass },
    { id: 'instruments', label: 'Instrument Mastery', icon: Music },
    { id: 'tutor', label: 'Stellar Tutor', icon: Sparkles },
  ];

  const getInstrumentIcon = (id: InstrumentType) => {
    switch (id) {
      case 'piano': return Keyboard;
      case 'drums': return Drum;
      case 'bass': return Guitar;
      case 'guitar': return Zap;
      default: return Music;
    }
  };

  return (
    <div className="min-h-screen relative">
      <div className="atmosphere" />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-galaxy-accent to-galaxy-secondary flex items-center justify-center shadow-lg shadow-galaxy-accent/20">
              <Music className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-serif italic text-2xl tracking-tight">Galaxy Studio</h1>
              <p className="text-[10px] text-white/40 uppercase tracking-[0.2em] leading-none">Universal Music Learning</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className={cn(
                  "flex items-center gap-2 text-sm font-medium transition-all duration-300 relative py-2",
                  activeSection === item.id ? "text-white" : "text-white/40 hover:text-white/70"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-galaxy-accent to-galaxy-secondary rounded-full"
                  />
                )}
              </button>
            ))}
          </div>

          <button 
            className="md:hidden p-2 text-white/60 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <motion.div
        initial={false}
        animate={{ height: isMobileMenuOpen ? 'auto' : 0, opacity: isMobileMenuOpen ? 1 : 0 }}
        className="fixed top-20 left-0 right-0 z-40 glass border-b border-white/10 md:hidden overflow-hidden"
      >
        <div className="p-6 space-y-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveSection(item.id as Section);
                setIsMobileMenuOpen(false);
              }}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all",
                activeSection === item.id ? "bg-white/10 text-white" : "text-white/40"
              )}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-12"
        >
          {activeSection === 'theory' && (
            <div className="space-y-12">
              <header className="text-center space-y-6 max-w-3xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-block px-4 py-1 rounded-full bg-galaxy-accent/10 border border-galaxy-accent/20 text-galaxy-accent text-[10px] uppercase tracking-[0.3em] font-medium mb-4"
                >
                  Welcome to the Cosmos
                </motion.div>
                <h2 className="text-5xl md:text-7xl font-serif italic leading-tight">Music for Everyone</h2>
                <p className="text-white/50 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto">
                  Hi, I'm <span className="text-white font-medium">Benjamin Owusu Appiah Quansah Junior</span>, a 10-year-old learner from Ghana. 
                  I created <span className="text-galaxy-accent font-medium">Galaxy Studio</span> at <span className="text-galaxy-secondary font-medium">Algo Peers</span> because I noticed many students in my country struggle to learn instruments. 
                  This app is here to help you understand music clearly, step-by-step.
                </p>
              </header>
              <ScaleExplorer />
            </div>
          )}

          {activeSection === 'instruments' && (
            <div className="space-y-12">
              <header className="text-center space-y-4 max-w-2xl mx-auto">
                <h2 className="text-5xl md:text-6xl font-serif italic">Instrument Mastery</h2>
                <p className="text-white/50 text-lg">Choose your path and master the tools of musical expression. From rhythm to melody, the cosmos is yours to play.</p>
              </header>

              <div className="flex flex-wrap justify-center gap-4">
                {INSTRUMENTS.map((inst) => {
                  const Icon = getInstrumentIcon(inst.id);
                  return (
                    <button
                      key={inst.id}
                      onClick={() => setSelectedInstrument(inst.id)}
                      className={cn(
                        "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all border",
                        selectedInstrument === inst.id 
                          ? "bg-galaxy-accent/20 border-galaxy-accent text-white" 
                          : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{inst.name}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedInstrument}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  {selectedInstrument === 'piano' && <VirtualPiano />}
                  {selectedInstrument === 'drums' && <DrumMachine />}
                  {selectedInstrument === 'bass' && <FretboardExplorer strings={4} instrumentName="Bass Guitar" />}
                  {selectedInstrument === 'guitar' && <FretboardExplorer strings={6} instrumentName="Electric Guitar" />}
                </motion.div>
              </AnimatePresence>
            </div>
          )}

          {activeSection === 'tutor' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              <div className="lg:col-span-4 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-5xl font-serif italic">Stellar Tutor</h2>
                  <p className="text-white/50">Your personal AI guide to the musical cosmos. Ask anything from basic theory to advanced composition.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="glass p-6 rounded-3xl space-y-2">
                    <h4 className="text-xs font-mono text-galaxy-accent uppercase tracking-widest">Suggested Topics</h4>
                    <ul className="space-y-2">
                      {['How do major scales work?', 'Basic drum rudiments', 'Bass guitar fingerstyle tips', 'Electric guitar power chords', 'Explain the circle of fifths'].map(topic => (
                        <li key={topic} className="text-sm text-white/40 hover:text-white/80 cursor-pointer transition-colors flex items-center gap-2 group">
                          <BookOpen className="w-3 h-3 group-hover:text-galaxy-accent" />
                          {topic}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8">
                <MusicTutor />
              </div>
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <Music className="w-5 h-5 text-galaxy-accent" />
              <span className="font-serif italic text-xl">Galaxy Studio</span>
            </div>
            <p className="text-xs text-white/30 max-w-xs leading-relaxed">
              Created by 10-year-old Benjamin Owusu Appiah Quansah Junior. 
              A mission to help students in Ghana and beyond master musical instruments, 
              built at Algo Peers.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <div className="flex gap-8 text-[10px] text-white/20 uppercase tracking-[0.3em]">
              <span>© 2026 Galaxy Studio</span>
              <span>Algo Peers Ghana</span>
            </div>
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
        </div>
      </footer>
    </div>
  );
}
