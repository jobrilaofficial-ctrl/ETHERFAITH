
import React from 'react';
import { Activity } from '../types';

interface Props {
  activities: Activity[];
  onToggle: (id: string) => void;
}

const ActivityTracker: React.FC<Props> = ({ activities, onToggle }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
      {activities.map((activity) => (
        <button
          key={activity.id}
          onClick={() => onToggle(activity.id)}
          className={`
            group flex items-center justify-between p-4 rounded-xl transition-all duration-300
            ${activity.completed 
              ? 'bg-cyan-500/20 border-cyan-500/50 text-cyan-100' 
              : 'bg-white/5 border-white/10 hover:bg-white/10 text-white/60'}
            border glass-panel
          `}
        >
          <div className="flex flex-col items-start">
            <span className="font-semibold text-sm">{activity.label}</span>
            <span className="text-[10px] opacity-40 uppercase tracking-widest mt-1">Weight: {activity.weight}</span>
          </div>
          <div className={`
            w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300
            ${activity.completed ? 'border-cyan-400 bg-cyan-400' : 'border-white/20'}
          `}>
            {activity.completed && (
              <svg className="w-4 h-4 text-slate-900" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default ActivityTracker;
