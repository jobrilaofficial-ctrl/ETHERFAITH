
import React from 'react';

interface Props {
  percentage: number;
  size?: number;
}

const HolographicGauge: React.FC<Props> = ({ percentage, size = 280 }) => {
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Background Glow */}
      <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl animate-pulse-soft" />
      
      {/* Outer Rotating Ring */}
      <svg className="absolute w-full h-full animate-rotate-slow opacity-30" viewBox="0 0 100 100">
        <circle
          cx="50" cy="50" r="48"
          fill="none"
          stroke="url(#grad1)"
          strokeWidth="0.5"
          strokeDasharray="4 4"
        />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
        </defs>
      </svg>

      {/* Main Progress Ring */}
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="rgba(255, 255, 255, 0.05)"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Fill */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="url(#gaugeGrad)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-1000 ease-out"
        />
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#facc15" />
          </linearGradient>
        </defs>
      </svg>

      {/* Internal Content */}
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-sm font-syncopate tracking-widest text-cyan-400 uppercase opacity-60">Attunement</span>
        <div className="flex items-baseline">
          <span className="text-6xl font-extrabold font-syncopate holo-glow">{Math.round(percentage)}</span>
          <span className="text-2xl font-bold text-cyan-500 ml-1">%</span>
        </div>
        <span className="text-[10px] font-syncopate text-white/40 mt-2 tracking-tighter uppercase">Spiritual Connection</span>
      </div>
    </div>
  );
};

export default HolographicGauge;
