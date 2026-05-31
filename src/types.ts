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
  { name: 'C', frequency: 261.63, type: 'natural' },
  { name: 'C#', frequency: 277.18, type: 'accidental' },
  { name: 'D', frequency: 293.66, type: 'natural' },
  { name: 'D#', frequency: 311.13, type: 'accidental' },
  { name: 'E', frequency: 329.63, type: 'natural' },
  { name: 'F', frequency: 349.23, type: 'natural' },
  { name: 'F#', frequency: 369.99, type: 'accidental' },
  { name: 'G', frequency: 392.00, type: 'natural' },
  { name: 'G#', frequency: 415.30, type: 'accidental' },
  { name: 'A', frequency: 440.00, type: 'natural' },
  { name: 'A#', frequency: 466.16, type: 'accidental' },
  { name: 'B', frequency: 493.88, type: 'natural' },
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
