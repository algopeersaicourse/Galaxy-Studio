export interface Note {
  name: string;
  frequency: number;
  type: 'natural' | 'accidental';
}

export interface Scale {
  name: string;
  intervals: number[];
  description: string;
}

export const NOTES: Note[] = [
  // Octave 4
  { name: 'C4', frequency: 261.63, type: 'natural' },
  { name: 'C#4', frequency: 277.18, type: 'accidental' },
  { name: 'D4', frequency: 293.66, type: 'natural' },
  { name: 'D#4', frequency: 311.13, type: 'accidental' },
  { name: 'E4', frequency: 329.63, type: 'natural' },
  { name: 'F4', frequency: 349.23, type: 'natural' },
  { name: 'F#4', frequency: 369.99, type: 'accidental' },
  { name: 'G4', frequency: 392.00, type: 'natural' },
  { name: 'G#4', frequency: 415.30, type: 'accidental' },
  { name: 'A4', frequency: 440.00, type: 'natural' },
  { name: 'A#4', frequency: 466.16, type: 'accidental' },
  { name: 'B4', frequency: 493.88, type: 'natural' },
  
  // Octave 5
  { name: 'C5', frequency: 523.25, type: 'natural' },
  { name: 'C#5', frequency: 554.37, type: 'accidental' },
  { name: 'D5', frequency: 587.33, type: 'natural' },
  { name: 'D#5', frequency: 622.25, type: 'accidental' },
  { name: 'E5', frequency: 659.25, type: 'natural' },
  { name: 'F5', frequency: 698.46, type: 'natural' },
  { name: 'F#5', frequency: 739.99, type: 'accidental' },
  { name: 'G5', frequency: 783.99, type: 'natural' },
  { name: 'G#5', frequency: 830.61, type: 'accidental' },
  { name: 'A5', frequency: 880.00, type: 'natural' },
  { name: 'A#5', frequency: 932.33, type: 'accidental' },
  { name: 'B5', frequency: 987.77, type: 'natural' },

  // Octave 6 Start
  { name: 'C6', frequency: 1046.50, type: 'natural' },
];

export const SCALES: Scale[] = [
  { name: 'Major', intervals: [0, 2, 4, 5, 7, 9, 11], description: 'Bright, happy, and stable.' },
  { name: 'Minor', intervals: [0, 2, 3, 5, 7, 8, 10], description: 'Sad, dark, or serious.' },
  { name: 'Pentatonic Major', intervals: [0, 2, 4, 7, 9], description: 'Open, airy, common in folk and blues.' },
  { name: 'Blues', intervals: [0, 3, 5, 6, 7, 10], description: 'Gritty and soulful.' },
];

export type InstrumentType = 'piano' | 'drums' | 'bass' | 'guitar';

export interface InstrumentInfo {
  id: InstrumentType;
  name: string;
  description: string;
  icon: string;
}

export const INSTRUMENTS: InstrumentInfo[] = [
  { id: 'piano', name: 'Piano', description: 'Master the keys and harmony.', icon: 'Keyboard' },
  { id: 'drums', name: 'Drums', description: 'Find your rhythm and pulse.', icon: 'Drum' },
  { id: 'bass', name: 'Bass Guitar', description: 'The foundation of every groove.', icon: 'Guitar' },
  { id: 'guitar', name: 'Electric Guitar', description: 'Expressive melodies and riffs.', icon: 'Zap' },
];
