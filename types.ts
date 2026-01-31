
export interface Activity {
  id: string;
  label: string;
  weight: number;
  completed: boolean;
}

export interface AIAnalysis {
  reflection: string;
  verse: string;
  reference: string;
  suggestions: string[];
}

export enum AppState {
  HOME = 'HOME',
  ANALYZING = 'ANALYZING',
  RESULT = 'RESULT'
}
