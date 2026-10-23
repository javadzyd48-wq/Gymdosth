import React, { useState } from 'react';
import {
  History,
  TrendingUp,
  Award,
  Calendar,
  Clock,
  Dumbbell,
  Trash2,
  ChevronDown,
  ChevronUp,
  Target,
  Sparkles,
  Play,
  Heart
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { CompletedWorkout } from '../types';

interface ProgressViewProps {
  setCurrentTab: (tab: string) => void;
}

export const ProgressView: React.FC<ProgressViewProps> = ({ setCurrentTab }) => {
  const {
    completedWorkouts,
    deleteWorkoutHistoryItem,
    profile,
    updateProfile,
    startWorkout
  } = useWorkout();

  const [expandedWorkoutId, setExpandedWorkoutId] = useState<string | null>(null);
  const [weeklyGoalInput, setWeeklyGoalInput] = useState<number>(profile.weeklyGoalWorkouts || 3);
  const [showGoalEditor, setShowGoalEditor] = useState<boolean>(false);

  // Lifetime Stats
  const totalWorkouts = completedWorkouts.length;
  const totalVolumeLifetime = completedWorkouts.reduce((acc, curr) => acc + curr.totalVolumeKg, 0);
  const totalMinutesLifetime = completedWorkouts.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Group workouts into last 4 weeks for the clean chart
  const now = new Date();
  const weeksData = [3, 2, 1, 0].map(weekOffset => {
    const endOfWeek = new Date(now.getTime() - weekOffset * 7 * 24 * 60 * 60 * 1000);
    const startOfWeek = new Date(endOfWeek.getTime() - 7 * 24 * 60 * 60 * 1000);

    const workoutsInWeek = completedWorkouts.filter(w => {
      const time = new Date(w.completedAt).getTime();
      return time >= startOfWeek.getTime() && time <= endOfWeek.getTime();
    });

    const weekLabel = weekOffset === 0 ? 'This Wk' : `${weekOffset}w ago`;

    return {
      label: weekLabel,
      count: workoutsInWeek.length,
      volume: workoutsInWeek.reduce((acc, curr) => acc + curr.totalVolumeKg, 0)
    };
  });

  const maxWeeklyCount = Math.max(5, ...weeksData.map(w => w.count));

  const toggleExpand = (id: string) => {
    setExpandedWorkoutId(prev => (prev === id ? null : id));
  };

  const handleSaveGoal = () => {
    updateProfile({ weeklyGoalWorkouts: weeklyGoalInput });
    setShowGoalEditor(false);
  };

  const getEffortColor = (effort: CompletedWorkout['perceivedEffort']) => {
    switch (effort) {
      case 'easy':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'moderate':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'challenging':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'beast-mode':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-slate-50 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-5xl mx-auto px-4 sm:px-6 pt-5">
      {/* 1. Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            <span>Consistency & Logbook</span>
            <span aria-hidden="true">·</span>
            <span>Zero Judgment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Progress & History
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-xl">
            We celebrate consistency, endurance, and strength — not superficial body standards. Every workout you finish builds lifelong discipline.
          </p>
        </div>

        {/* Goal Quick Edit */}
        <div className="p-3 bg-white rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Weekly Target
            </div>
            <div className="text-xs font-bold text-slate-900">
              {profile.weeklyGoalWorkouts} workouts / week
            </div>
          </div>
          <button
            onClick={() => setShowGoalEditor(!showGoalEditor)}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold ml-2 underline"
          >
            Edit
          </button>
        </div>
      </div>

      {/* Goal Editor Dropdown */}
      {showGoalEditor && (
        <div className="bg-emerald-50/80 border border-emerald-200 p-4 rounded-3xl flex flex-wrap items-center justify-between gap-3 animate-in fade-in duration-150">
          <div>
            <div className="text-xs font-bold text-emerald-950">Set Your Realistic Weekly Goal</div>
            <div className="text-xs text-emerald-800">
              Pick what realistically fits your college schedule and exams:
            </div>
          </div>
          <div className="flex items-center gap-2">
            {[2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => setWeeklyGoalInput(num)}
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  weeklyGoalInput === num
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-emerald-200 hover:bg-emerald-100'
                }`}
              >
                {num}
              </button>
            ))}
            <button
              onClick={handleSaveGoal}
              className="px-3 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl ml-2 hover:bg-slate-800"
            >
              Save Goal
            </button>
          </div>
        </div>
      )}

      {/* 2. Lifetime Totals Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Calendar className="w-4 h-4 text-emerald-600" />
            <span>Total Workouts</span>
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {totalWorkouts}
          </div>
          <div className="text-xs text-slate-400">Sessions recorded locally</div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span>Total Time Invested</span>
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900">
            {totalMinutesLifetime} <span className="text-lg font-normal text-slate-500">mins</span>
          </div>
          <div className="text-xs text-slate-400">
            ~{Math.round((totalMinutesLifetime / 60) * 10) / 10} hours of active health
          </div>
        </div>

        <div className="bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm space-y-1">
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
            <Dumbbell className="w-4 h-4 text-emerald-600" />
            <span>Total Weight Moved</span>
          </div>
          <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-700">
            {totalVolumeLifetime.toLocaleString()} <span className="text-lg font-normal text-slate-500">kg</span>
          </div>
          <div className="text-xs text-slate-400">Calculated across all completed sets</div>
        </div>
      </div>

      {/* 3. Consistency Bar Chart */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Weekly Consistency Chart</h3>
            <p className="text-xs text-slate-500 mt-0.5">Number of workouts logged per week</p>
          </div>
          <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1 rounded-xl">
            Target: {profile.weeklyGoalWorkouts}/wk
          </div>
        </div>

        {/* SVG/Tailwind Bar Chart */}
        <div className="pt-4 pb-2">
          <div className="grid grid-cols-4 gap-4 items-end h-36 border-b border-slate-200 px-4">
            {weeksData.map((w, idx) => {
              const heightPercent = Math.min(100, Math.max(8, (w.count / maxWeeklyCount) * 100));
              const isGoalMet = w.count >= profile.weeklyGoalWorkouts;

              return (
                <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end">
                  <div className="text-xs font-mono font-bold text-slate-700 tabular-nums">
                    {w.count}
                  </div>
                  <div className="w-full max-w-[56px] bg-slate-100 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className={`w-full rounded-t-xl transition-all duration-700 ${
                        isGoalMet
                          ? 'bg-emerald-600'
                          : w.count > 0
                          ? 'bg-emerald-400'
                          : 'bg-slate-200'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap mt-1">
                    {w.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Workout History Log List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">Workout History Log</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed records of previous training sessions
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">
            {completedWorkouts.length} logged
          </span>
        </div>

        {completedWorkouts.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm max-w-md mx-auto space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
              <History className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-slate-800 text-base">No workouts recorded yet</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              When you finish your first workout, your sets, reps, weights, and effort notes will be preserved right here.
            </p>
            <button
              onClick={() => {
                startWorkout('First Session');
                setCurrentTab('tracker');
              }}
              className="mt-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm inline-flex items-center gap-1.5"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Log First Workout</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {completedWorkouts.map(workout => {
              const isExpanded = expandedWorkoutId === workout.id;
              const dateObj = new Date(workout.completedAt);
              const formattedDate = dateObj.toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
              });

              return (
                <div
                  key={workout.id}
                  className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden transition-all"
                >
                  {/* Top Bar Summary Row */}
                  <div
                    onClick={() => toggleExpand(workout.id)}
                    className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-colors"
                  >
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <span>{formattedDate}</span>
                        <span aria-hidden="true">·</span>
                        <span>{workout.durationMinutes} mins</span>
                        <span aria-hidden="true">·</span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold border ${getEffortColor(workout.perceivedEffort)}`}>
                          {workout.perceivedEffort}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {workout.title}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4 text-xs">
                      <div className="text-right">
                        <div className="font-mono tabular-nums font-bold text-slate-800">
                          {workout.totalVolumeKg > 0 ? `${workout.totalVolumeKg.toLocaleString()} kg` : 'Bodyweight'}
                        </div>
                        <div className="text-slate-400 text-[11px]">
                          {workout.totalSets} sets
                        </div>
                      </div>

                      <div className="text-slate-400 hover:text-slate-600">
                        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Breakdown */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-1 border-t border-slate-100 bg-slate-50/50 space-y-3">
                      {workout.notes && (
                        <div className="p-3 bg-white rounded-xl border border-slate-200/80 text-xs text-slate-700 italic">
                          &quot;{workout.notes}&quot;
                        </div>
                      )}

                      <div className="space-y-2">
                        <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Exercise Breakdown
                        </div>
                        {workout.exercises.map((ex, eIdx) => (
                          <div
                            key={eIdx}
                            className="bg-white p-3 rounded-2xl border border-slate-200/70 text-xs space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-800">{ex.name}</span>
                              <span className="text-[11px] text-slate-500">{ex.muscleGroup}</span>
                            </div>
                            <div className="flex flex-wrap gap-2 text-slate-600 font-mono text-[11px]">
                              {ex.sets.map((s, sIdx) => (
                                <span key={sIdx} className="bg-slate-100 px-2 py-0.5 rounded-md">
                                  Set {s.setNumber}: {s.weightKg}kg × {s.reps} reps
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 flex justify-end">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            deleteWorkoutHistoryItem(workout.id);
                          }}
                          className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 font-semibold py-1 px-2.5 rounded-lg hover:bg-rose-50 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete Log</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Non-judgmental Fitness Philosophy Card */}
      <div className="p-4 bg-emerald-50/60 rounded-3xl border border-emerald-100 flex items-start gap-3">
        <Heart className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="text-xs text-emerald-950 space-y-1 leading-relaxed">
          <span className="font-bold">The GymDosth Promise: </span>
          You won&apos;t find fake six-pack transformations or body-shaming metrics here. Fitness is about feeling energized for your classes, boosting mental clarity, keeping your joints pain-free, and building confidence. Listen to your body and celebrate every session!
        </div>
      </div>
    </div>
  );
};
