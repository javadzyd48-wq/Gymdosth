import React, { useState } from 'react';
import {
  Play,
  Pause,
  Plus,
  Trash2,
  Check,
  Timer,
  Award,
  ChevronDown,
  X,
  Search,
  Dumbbell,
  AlertCircle
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { EXERCISES_DATA } from '../data/exercisesData';
import { PerceivedEffort } from '../types';

interface LiveWorkoutTrackerProps {
  setCurrentTab: (tab: string) => void;
}

export const LiveWorkoutTracker: React.FC<LiveWorkoutTrackerProps> = ({ setCurrentTab }) => {
  const {
    activeWorkout,
    startWorkout,
    updateSet,
    addSetToExercise,
    removeSetFromExercise,
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    finishWorkout,
    cancelWorkout,
    togglePauseWorkout,
    restTimerSeconds,
    isRestTimerActive,
    startRestTimer,
    pauseRestTimer,
    resumeRestTimer
  } = useWorkout();

  const [showAddExerciseModal, setShowAddExerciseModal] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState('');
  const [showFinishModal, setShowFinishModal] = useState(false);
  const [effortRating, setEffortRating] = useState<PerceivedEffort>('moderate');
  const [workoutNotes, setWorkoutNotes] = useState('');
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  // If no active workout, render beginner-friendly empty state
  if (!activeWorkout) {
    return (
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12 text-center pb-24 md:pb-12">
        <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center mb-4 shadow-sm">
          <Dumbbell className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
          Ready to Train, Dosth?
        </h2>
        <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
          No workout is currently in progress. Start today’s routine from your active plan, or launch a quick custom session right away.
        </p>

        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => startWorkout('Quick Strength Session')}
            className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm rounded-2xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Start Quick Session</span>
          </button>
          <button
            onClick={() => setCurrentTab('plans')}
            className="w-full sm:w-auto px-6 py-3 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-sm rounded-2xl shadow-sm transition-colors"
          >
            Browse Workout Plans
          </button>
        </div>
      </div>
    );
  }

  // Calculate live volume and sets done
  let totalVolumeKg = 0;
  let completedSetsCount = 0;
  let totalSetsCount = 0;

  activeWorkout.exercises.forEach(ex => {
    ex.sets.forEach(set => {
      totalSetsCount++;
      if (set.completed) {
        completedSetsCount++;
        totalVolumeKg += set.weightKg * set.reps;
      }
    });
  });

  const minutes = Math.floor(activeWorkout.elapsedSeconds / 60);
  const seconds = activeWorkout.elapsedSeconds % 60;
  const timeFormatted = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  const filteredLibraryExercises = EXERCISES_DATA.filter(
    e =>
      e.name.toLowerCase().includes(exerciseSearch.toLowerCase()) ||
      e.muscleGroup.toLowerCase().includes(exerciseSearch.toLowerCase())
  );

  const handleFinishConfirm = () => {
    finishWorkout(effortRating, workoutNotes);
    setShowFinishModal(false);
    setCurrentTab('progress');
  };

  return (
    <div className="space-y-6 pb-28 md:pb-16 max-w-4xl mx-auto px-4 sm:px-6 pt-5">
      {/* 1. Workout Session Header Bar */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
              <span>Active Session</span>
              <span aria-hidden="true">·</span>
              <span>Live Logging</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight mt-0.5">
              {activeWorkout.title}
            </h1>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            {/* Pause / Resume Button */}
            <button
              onClick={togglePauseWorkout}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition-colors"
            >
              {activeWorkout.isPaused ? (
                <>
                  <Play className="w-3.5 h-3.5 fill-current text-emerald-600" />
                  <span>Resume Timer</span>
                </>
              ) : (
                <>
                  <Pause className="w-3.5 h-3.5 fill-current text-slate-500" />
                  <span>Pause Timer</span>
                </>
              )}
            </button>

            {/* Cancel Button */}
            <button
              onClick={() => setShowCancelConfirm(true)}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent transition-colors"
            >
              Discard
            </button>
          </div>
        </div>

        {/* Live Metrics Row */}
        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100">
          <div className="p-2.5 bg-slate-50 rounded-2xl text-center">
            <div className="text-[11px] font-medium text-slate-500">Duration</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              {timeFormatted}
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-2xl text-center">
            <div className="text-[11px] font-medium text-slate-500">Completed Sets</div>
            <div className="text-lg font-bold font-mono tabular-nums text-slate-900 mt-0.5">
              {completedSetsCount} / {totalSetsCount}
            </div>
          </div>

          <div className="p-2.5 bg-slate-50 rounded-2xl text-center">
            <div className="text-[11px] font-medium text-slate-500">Volume (kg)</div>
            <div className="text-lg font-bold font-mono tabular-nums text-emerald-700 mt-0.5">
              {totalVolumeKg}
            </div>
          </div>
        </div>

        {/* Quick Rest Timer Trigger Presets */}
        <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100/90 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-900">
            <Timer className="w-4 h-4 text-emerald-600" />
            <span>Rest Timer:</span>
            {restTimerSeconds > 0 ? (
              <span className="font-mono tabular-nums font-extrabold text-emerald-700">
                {Math.floor(restTimerSeconds / 60)}:
                {restTimerSeconds % 60 < 10 ? '0' : ''}
                {restTimerSeconds % 60} left
              </span>
            ) : (
              <span className="font-normal text-emerald-700">Ready</span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {[30, 60, 90, 120].map(s => (
              <button
                key={s}
                onClick={() => startRestTimer(s)}
                className="px-2.5 py-1 text-xs font-semibold bg-white hover:bg-emerald-100 text-emerald-900 border border-emerald-200/80 rounded-lg transition-colors active:scale-95"
              >
                {s}s
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Exercise Set-by-Set Cards */}
      <div className="space-y-4">
        {activeWorkout.exercises.map((exercise, exIdx) => (
          <div
            key={exercise.exerciseId + exIdx}
            className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3"
          >
            {/* Exercise Title Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                  {exIdx + 1}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{exercise.name}</h3>
                  <div className="text-xs text-slate-500 font-medium">
                    {exercise.muscleGroup}
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeExerciseFromWorkout(exIdx)}
                aria-label="Remove exercise"
                className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Sets Table Header */}
            <div className="grid grid-cols-12 gap-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2">
              <div className="col-span-2 text-center">Set</div>
              <div className="col-span-4 text-center">Weight (kg)</div>
              <div className="col-span-4 text-center">Reps</div>
              <div className="col-span-2 text-center">Done</div>
            </div>

            {/* Sets Rows */}
            <div className="space-y-2">
              {exercise.sets.map((set, setIdx) => (
                <div
                  key={set.id}
                  className={`grid grid-cols-12 gap-2 items-center p-2 rounded-2xl transition-colors ${
                    set.completed
                      ? 'bg-emerald-50/60 border border-emerald-200/80'
                      : 'bg-slate-50 border border-slate-100'
                  }`}
                >
                  {/* Set Number */}
                  <div className="col-span-2 text-center text-xs font-bold text-slate-700 font-mono">
                    #{set.setNumber}
                  </div>

                  {/* Weight Input */}
                  <div className="col-span-4">
                    <input
                      type="number"
                      min={0}
                      step={0.5}
                      value={set.weightKg}
                      onChange={e =>
                        updateSet(
                          exIdx,
                          setIdx,
                          'weightKg',
                          Math.max(0, parseFloat(e.target.value) || 0)
                        )
                      }
                      className="w-full text-center font-mono font-bold text-sm bg-white border border-slate-200 rounded-xl py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Reps Input */}
                  <div className="col-span-4">
                    <input
                      type="number"
                      min={0}
                      step={1}
                      value={set.reps}
                      onChange={e =>
                        updateSet(
                          exIdx,
                          setIdx,
                          'reps',
                          Math.max(0, parseInt(e.target.value) || 0)
                        )
                      }
                      className="w-full text-center font-mono font-bold text-sm bg-white border border-slate-200 rounded-xl py-2 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                    />
                  </div>

                  {/* Completion Button */}
                  <div className="col-span-2 flex justify-center">
                    <button
                      onClick={() =>
                        updateSet(exIdx, setIdx, 'completed', !set.completed)
                      }
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all active:scale-95 ${
                        set.completed
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-white border-2 border-slate-300 text-transparent hover:border-emerald-500'
                      }`}
                    >
                      <Check className="w-5 h-5 stroke-[3]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Set Management Actions */}
            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => addSetToExercise(exIdx)}
                className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Set</span>
              </button>

              {exercise.sets.length > 1 && (
                <button
                  onClick={() =>
                    removeSetFromExercise(exIdx, exercise.sets.length - 1)
                  }
                  className="text-xs text-slate-400 hover:text-slate-600 py-1 px-2"
                >
                  Remove last set
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add Exercise Button */}
        <button
          onClick={() => setShowAddExerciseModal(true)}
          className="w-full py-4 border-2 border-dashed border-slate-300 hover:border-emerald-500 hover:bg-emerald-50/30 rounded-3xl text-slate-600 hover:text-emerald-700 font-bold text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          <Plus className="w-4 h-4" />
          <span>Add Another Exercise to Workout</span>
        </button>
      </div>

      {/* 3. Bottom Sticky Bar for Finishing Workout */}
      <div className="sticky bottom-16 md:bottom-4 z-20 pt-4">
        <button
          onClick={() => setShowFinishModal(true)}
          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-extrabold text-base rounded-2xl shadow-xl shadow-emerald-700/25 flex items-center justify-center gap-2 transition-all"
        >
          <Award className="w-5 h-5" />
          <span>Finish & Save Workout ({completedSetsCount} Sets Logged)</span>
        </button>
      </div>

      {/* 4. Add Exercise Modal */}
      {showAddExerciseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h3 className="font-bold text-slate-900 text-lg">Add Exercise</h3>
              <button
                onClick={() => setShowAddExerciseModal(false)}
                className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-600 flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 border-b border-slate-100">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search exercise by name or muscle..."
                  value={exerciseSearch}
                  onChange={e => setExerciseSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-slate-100 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="p-4 overflow-y-auto max-h-[50vh] space-y-2">
              {filteredLibraryExercises.map(ex => (
                <button
                  key={ex.id}
                  onClick={() => {
                    addExerciseToWorkout(ex.id);
                    setShowAddExerciseModal(false);
                  }}
                  className="w-full p-3 bg-slate-50 hover:bg-emerald-50/70 border border-slate-100 rounded-2xl text-left flex items-center justify-between transition-colors group"
                >
                  <div>
                    <div className="font-bold text-slate-900 text-sm group-hover:text-emerald-700">
                      {ex.name}
                    </div>
                    <div className="text-xs text-slate-500">
                      {ex.muscleGroup} · {ex.equipment}
                    </div>
                  </div>
                  <Plus className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. Finish Workout Modal */}
      {showFinishModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-150">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Great Effort Today!</h3>
              <p className="text-xs text-slate-600">
                You trained for {minutes}m {seconds}s and completed {completedSetsCount} sets ({totalVolumeKg}kg total volume).
              </p>
            </div>

            {/* Effort Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                How did the workout feel?
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(
                  [
                    { id: 'easy', label: 'Easy' },
                    { id: 'moderate', label: 'Just Right' },
                    { id: 'challenging', label: 'Tough' },
                    { id: 'beast-mode', label: 'Beast Mode' }
                  ] as const
                ).map(item => (
                  <button
                    key={item.id}
                    onClick={() => setEffortRating(item.id)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-semibold border transition-all ${
                      effortRating === item.id
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Workout Notes */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Notes / College schedule memo (Optional)
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Felt strong on bench press today, rested well after morning lectures..."
                value={workoutNotes}
                onChange={e => setWorkoutNotes(e.target.value)}
                className="w-full text-xs p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            {/* Confirm Actions */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setShowFinishModal(false)}
                className="flex-1 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 rounded-xl"
              >
                Back to Workout
              </button>
              <button
                onClick={handleFinishConfirm}
                className="flex-1 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20"
              >
                Save & Log History
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Cancel Confirmation Modal */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Discard Active Workout?</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Logged sets for this session will not be saved.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Keep Training
              </button>
              <button
                onClick={() => {
                  cancelWorkout();
                  setShowCancelConfirm(false);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
              >
                Discard Session
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
