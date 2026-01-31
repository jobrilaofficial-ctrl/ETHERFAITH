
import React from 'react';
import { Activity } from './types';

export const INITIAL_ACTIVITIES: Activity[] = [
  { id: 'prayer', label: 'Morning Prayer', weight: 25, completed: false },
  { id: 'bible', label: 'Bible Meditation', weight: 25, completed: false },
  { id: 'church', label: 'Church Fellowship', weight: 20, completed: false },
  { id: 'service', label: 'Acts of Service', weight: 15, completed: false },
  { id: 'gratitude', label: 'Gratitude Journal', weight: 15, completed: false },
];

export const APP_THEME = {
  primary: '#38bdf8', // Cyan
  secondary: '#facc15', // Gold
  accent: '#818cf8', // Indigo
};
