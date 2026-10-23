import React from 'react';
import { Dumbbell, Play, Timer, Sparkles } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentTab, setCurrentTab }) => {
  const { activeWorkout, startWorkout } = useWorkout();

  const handlePrimaryAction = () => {
    if (activeWorkout) {
      setCurrentTab('tracker');
    } else {
      startWorkout('Today\'s Training');
      setCurrentTab('tracker');
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text wordmark */}
        <button
          onClick={() => setCurrentTab('dashboard')}
          className="flex items-center gap-2.5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg group"
        >
          <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/20 group-hover:bg-emerald-700 transition-colors">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
              GymDosth
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              currentTab === 'dashboard' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentTab('plans')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              currentTab === 'plans' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            Workout Plans
          </button>
          <button
            onClick={() => setCurrentTab('tracker')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 flex items-center gap-1.5 ${
              currentTab === 'tracker' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            <span>Live Tracker</span>
            {activeWorkout && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setCurrentTab('library')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              currentTab === 'library' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            Exercise Guide
          </button>
          <button
            onClick={() => setCurrentTab('progress')}
            className={`whitespace-nowrap transition-colors hover:text-emerald-700 ${
              currentTab === 'progress' ? 'text-emerald-700 font-semibold' : ''
            }`}
          >
            Progress & History
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handlePrimaryAction}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-95 ${
              activeWorkout
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'
                : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-900/10'
            }`}
          >
            {activeWorkout ? (
              <>
                <Timer className="w-4 h-4 text-emerald-200" />
                <span className="whitespace-nowrap">Resume Live ({Math.floor(activeWorkout.elapsedSeconds / 60)}m)</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span className="whitespace-nowrap">Start Workout</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
