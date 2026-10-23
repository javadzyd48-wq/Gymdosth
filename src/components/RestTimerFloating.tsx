import React from 'react';
import { Timer, Plus, Play, Pause, X } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

export const RestTimerFloating: React.FC = () => {
  const {
    restTimerSeconds,
    restTimerInitial,
    isRestTimerActive,
    pauseRestTimer,
    resumeRestTimer,
    resetRestTimer,
    addRestTimerSeconds
  } = useWorkout();

  if (restTimerSeconds <= 0 && !isRestTimerActive) {
    return null;
  }

  const progressPercent = Math.min(100, Math.max(0, ((restTimerInitial - restTimerSeconds) / restTimerInitial) * 100));
  const minutes = Math.floor(restTimerSeconds / 60);
  const seconds = restTimerSeconds % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-40 max-w-sm w-[calc(100vw-2rem)] sm:w-80 bg-slate-900 text-white rounded-2xl p-4 shadow-xl shadow-slate-900/25 border border-slate-800 animate-in slide-in-from-bottom-4 duration-200">
      <div className="flex items-center justify-between gap-3 mb-2.5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <Timer className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-semibold text-emerald-400">Rest Timer</span>
            <span className="text-xs text-slate-400 ml-1.5">Breathe & recover</span>
          </div>
        </div>

        <button
          onClick={resetRestTimer}
          aria-label="Close rest timer"
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-3">
        <div
          className="bg-emerald-500 h-full transition-all duration-1000 ease-linear rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold tracking-tight font-mono tabular-nums text-white">
          {formattedTime}
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => addRestTimerSeconds(15)}
            className="px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-lg flex items-center gap-0.5 transition-colors"
          >
            <Plus className="w-3 h-3" /> 15s
          </button>
          <button
            onClick={() => addRestTimerSeconds(30)}
            className="px-2.5 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 active:scale-95 text-slate-200 rounded-lg flex items-center gap-0.5 transition-colors"
          >
            <Plus className="w-3 h-3" /> 30s
          </button>

          {isRestTimerActive ? (
            <button
              onClick={pauseRestTimer}
              aria-label="Pause timer"
              className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors active:scale-95"
            >
              <Pause className="w-4 h-4 fill-current" />
            </button>
          ) : (
            <button
              onClick={resumeRestTimer}
              aria-label="Resume timer"
              className="w-8 h-8 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors active:scale-95"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
