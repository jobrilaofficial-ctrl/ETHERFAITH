
import React, { useState, useEffect, useCallback } from 'react';
import { INITIAL_ACTIVITIES } from './constants';
import { Activity, AppState, AIAnalysis } from './types';
import HolographicGauge from './components/HolographicGauge';
import ActivityTracker from './components/ActivityTracker';
import { getSpiritualAnalysis } from './services/geminiService';

const App: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>(INITIAL_ACTIVITIES);
  const [score, setScore] = useState(0);
  const [appState, setAppState] = useState<AppState>(AppState.HOME);
  const [analysis, setAnalysis] = useState<AIAnalysis | null>(null);

  useEffect(() => {
    const total = activities.reduce((acc, curr) => acc + (curr.completed ? curr.weight : 0), 0);
    setScore(total);
  }, [activities]);

  const handleToggleActivity = (id: string) => {
    setActivities(prev => prev.map(a => a.id === id ? { ...a, completed: !a.completed } : a));
  };

  const runAnalysis = async () => {
    setAppState(AppState.ANALYZING);
    try {
      const result = await getSpiritualAnalysis(activities, score);
      setAnalysis(result);
      setAppState(AppState.RESULT);
    } catch (error) {
      console.error("Analysis Error:", error);
      setAppState(AppState.HOME);
    }
  };

  const reset = () => {
    setAppState(AppState.HOME);
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-12 flex flex-col items-center">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-3xl md:text-5xl font-syncopate font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-indigo-400 to-yellow-400 mb-2">
          ETHERFAITH
        </h1>
        <p className="text-slate-400 font-light tracking-widest text-xs uppercase">Quantum Spiritual Reflection Interface</p>
      </header>

      {appState === AppState.HOME && (
        <main className="w-full flex flex-col items-center space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <HolographicGauge percentage={score} />

          <div className="w-full max-w-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm font-syncopate text-white/80 uppercase tracking-widest">Daily Disciplines</h2>
              <span className="text-[10px] text-cyan-400/60 uppercase">Updated real-time</span>
            </div>
            <ActivityTracker activities={activities} onToggle={handleToggleActivity} />
          </div>

          <button
            onClick={runAnalysis}
            className="group relative px-12 py-4 overflow-hidden rounded-full glass-panel border-cyan-500/30 hover:border-cyan-400 transition-all duration-500 active:scale-95"
          >
            <div className="absolute inset-0 bg-cyan-400/5 group-hover:bg-cyan-400/10 transition-colors" />
            <span className="relative text-cyan-400 font-syncopate text-xs tracking-widest font-bold">Initiate AI Analysis</span>
          </button>
        </main>
      )}

      {appState === AppState.ANALYZING && (
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 min-h-[50vh]">
          <div className="relative">
            <div className="w-24 h-24 border-2 border-cyan-500/20 rounded-full animate-rotate-slow" />
            <div className="absolute inset-0 border-t-2 border-cyan-400 rounded-full animate-spin" />
            <div className="absolute inset-2 border-b-2 border-indigo-400 rounded-full animate-spin [animation-direction:reverse]" />
          </div>
          <div className="text-center space-y-2">
            <h3 className="font-syncopate text-xl text-cyan-400 animate-pulse">Scanning Soul Frequency</h3>
            <p className="text-xs text-slate-500 tracking-[0.2em] uppercase">Processing spiritual metrics...</p>
          </div>
        </div>
      )}

      {appState === AppState.RESULT && analysis && (
        <main className="w-full max-w-2xl space-y-8 animate-in zoom-in-95 duration-700">
          <div className="flex justify-center mb-8">
            <div className="p-1 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-[0_0_20px_rgba(56,189,248,0.5)]">
              <div className="px-8 py-2 bg-slate-900 rounded-full relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-400/10 animate-pulse" />
                <span className="relative font-syncopate text-[10px] tracking-widest text-white uppercase z-10">Analysis Complete</span>
              </div>
            </div>
          </div>

          <section className="glass-panel p-8 rounded-3xl space-y-6 relative overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_rgba(6,182,212,0.15)] group">
             {/* Holographic Effects Layers */}
             <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none z-0" />
             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[80px] rounded-full -mr-20 -mt-20 pointer-events-none z-0" />
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full -ml-20 -mb-20 pointer-events-none z-0" />
             
             {/* Shimmer Animation */}
             <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden rounded-3xl">
                <div className="absolute top-0 left-0 w-[200%] h-full bg-gradient-to-r from-transparent via-cyan-400/5 to-transparent -translate-x-full animate-shimmer" />
             </div>

             {/* Tech Corners */}
             <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/50 rounded-tl-xl opacity-60" />
             <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50 rounded-tr-xl opacity-60" />
             <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50 rounded-bl-xl opacity-60" />
             <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/50 rounded-br-xl opacity-60" />

             {/* Content */}
             <div className="relative z-10 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-cyan-400 font-syncopate text-xs uppercase tracking-widest drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">The Reflection</h3>
                  <p className="text-xl leading-relaxed font-light text-slate-100 drop-shadow-sm">
                    "{analysis.reflection}"
                  </p>
                </div>

                <div className="py-6 border-y border-white/10 space-y-4 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-50" />
                  <h3 className="text-yellow-400 font-syncopate text-xs uppercase tracking-widest drop-shadow-[0_0_5px_rgba(250,204,21,0.5)] relative z-10">Holy Scripture</h3>
                  <div className="bg-slate-900/40 p-6 rounded-2xl italic text-slate-200 relative border border-white/5 shadow-inner">
                    <span className="absolute top-2 left-4 text-4xl text-cyan-500/20 font-serif">"</span>
                    <span className="relative z-10">{analysis.verse}</span>
                    <div className="mt-4 not-italic font-syncopate text-[10px] text-yellow-500/80 text-right">
                      — {analysis.reference}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-indigo-400 font-syncopate text-xs uppercase tracking-widest drop-shadow-[0_0_5px_rgba(129,140,248,0.5)]">Ascension Pathways</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {analysis.suggestions.map((s, i) => (
                      <li key={i} className="bg-slate-800/40 hover:bg-slate-800/60 transition-colors px-4 py-3 rounded-xl text-sm text-slate-300 border border-white/10 flex items-start space-x-3 group/item backdrop-blur-sm">
                        <span className="text-indigo-400 group-hover/item:text-indigo-300 transition-colors font-bold shadow-[0_0_10px_rgba(129,140,248,0.0)] group-hover/item:shadow-[0_0_10px_rgba(129,140,248,0.5)]">•</span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ul>
                </div>
            </div>
          </section>

          <div className="flex justify-center pt-8">
            <button
              onClick={reset}
              className="text-white/40 hover:text-cyan-400 text-xs font-syncopate tracking-[0.3em] uppercase transition-all hover:scale-105 hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]"
            >
              Return to Core
            </button>
          </div>
        </main>
      )}

      {/* Footer Branding */}
      <footer className="mt-auto pt-24 pb-8 opacity-20 text-center">
        <p className="text-[10px] font-syncopate tracking-[0.4em] uppercase">Faith-Based AI Interface v2.5.0</p>
      </footer>
    </div>
  );
};

export default App;
