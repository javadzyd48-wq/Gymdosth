import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Dumbbell,
  CheckCircle,
  Play,
  X,
  Sparkles,
  Info,
  ChevronRight,
  Filter,
  Flame
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { WORKOUT_PLANS_DATA } from '../data/workoutPlansData';
import { WorkoutPlan, PlanDay } from '../types';

interface WorkoutPlansViewProps {
  setCurrentTab: (tab: string) => void;
}

export const WorkoutPlansView: React.FC<WorkoutPlansViewProps> = ({ setCurrentTab }) => {
  const { profile, updateProfile, activePlan, setActivePlanId, startWorkout } = useWorkout();

  const [selectedPlanModal, setSelectedPlanModal] = useState<WorkoutPlan | null>(null);
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [daysFilter, setDaysFilter] = useState<number | 'all'>('all');

  // Filter plans
  const filteredPlans = WORKOUT_PLANS_DATA.filter(plan => {
    if (levelFilter !== 'all' && plan.level !== levelFilter) return false;
    if (categoryFilter !== 'all' && plan.category !== categoryFilter) return false;
    if (daysFilter !== 'all' && plan.daysPerWeek !== daysFilter) return false;
    return true;
  });

  const handleSelectPlan = (plan: WorkoutPlan) => {
    setActivePlanId(plan.id);
    updateProfile({ activePlanId: plan.id });
    setSelectedPlanModal(null);
  };

  const handleStartPlanDay = (plan: WorkoutPlan, day: PlanDay) => {
    startWorkout(
      `${plan.title} — ${day.title}`,
      day.exercises.map(e => ({
        exerciseId: e.exerciseId,
        name: e.name,
        muscleGroup: day.focusMuscles.split(',')[0].trim(),
        defaultSets: e.sets,
        defaultReps: e.reps,
        defaultWeightKg: e.targetWeightKg
      }))
    );
    setSelectedPlanModal(null);
    setCurrentTab('tracker');
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-6xl mx-auto px-4 sm:px-6 pt-5">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            <span>Structured Routines</span>
            <span aria-hidden="true">·</span>
            <span>Balanced Recovery</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            Workout Plans
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Choose a proven routine built for beginners and college schedules. Every plan includes built-in rest days for optimal muscle growth.
          </p>
        </div>

        {/* Current Active Plan Badge */}
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
            <CheckCircle className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider">
              Your Current Plan
            </div>
            <div className="text-xs font-bold text-slate-900 truncate max-w-[200px]">
              {activePlan.title}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Interactive Filter Controls */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <Filter className="w-3.5 h-3.5 text-emerald-600" />
          <span>Filter by Experience & Category</span>
        </div>

        {/* Level Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {(['all', 'beginner', 'intermediate'] as const).map(lvl => (
            <button
              key={lvl}
              onClick={() => setLevelFilter(lvl)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                levelFilter === lvl
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {lvl === 'all' ? 'All Levels' : lvl.charAt(0).toUpperCase() + lvl.slice(1)}
            </button>
          ))}

          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Category Filters */}
          <button
            onClick={() => setCategoryFilter('all')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              categoryFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All Splits
          </button>
          <button
            onClick={() => setCategoryFilter('full-body')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              categoryFilter === 'full-body'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Full-Body (3-Day)
          </button>
          <button
            onClick={() => setCategoryFilter('home-hostel')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              categoryFilter === 'home-hostel'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Hostel / Bodyweight
          </button>
          <button
            onClick={() => setCategoryFilter('dumbbell-only')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              categoryFilter === 'dumbbell-only'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Dumbbells Only
          </button>
          <button
            onClick={() => setCategoryFilter('ppl')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              categoryFilter === 'ppl'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Push-Pull-Legs (PPL)
          </button>
        </div>
      </div>

      {/* 3. Workout Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPlans.map(plan => {
          const isActive = activePlan.id === plan.id;
          const trainingDaysCount = plan.days.filter(d => !d.isRest).length;
          const restDaysCount = plan.days.filter(d => d.isRest).length;

          return (
            <div
              key={plan.id}
              className={`bg-white rounded-3xl p-5 border transition-all flex flex-col justify-between shadow-sm relative group hover:shadow-md ${
                isActive
                  ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                  : 'border-slate-200/90 hover:border-slate-300'
              }`}
            >
              <div className="space-y-3">
                {/* Clean unboxed metadata with separators */}
                <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                  <span className="capitalize text-emerald-700 font-semibold">{plan.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{plan.daysPerWeek} Days / Week</span>
                  <span aria-hidden="true">·</span>
                  <span>~{plan.durationMinutes} min</span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                    {plan.title}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    {plan.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {plan.description}
                </p>

                {/* Day breakdown tags */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span>Weekly Structure</span>
                    <span className="text-slate-500 font-normal">
                      {trainingDaysCount} Workouts · {restDaysCount} Rest Days
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 text-[11px] text-slate-600">
                    {plan.days.slice(0, 4).map((d, i) => (
                      <span
                        key={i}
                        className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${
                          d.isRest ? 'bg-slate-200/60 text-slate-600' : 'bg-emerald-100/70 text-emerald-800'
                        }`}
                      >
                        {d.dayName.split(' ')[0]}: {d.isRest ? 'Rest' : d.title.split('(')[0].slice(0, 14)}
                      </span>
                    ))}
                    {plan.days.length > 4 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{plan.days.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex items-center gap-2 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setSelectedPlanModal(plan)}
                  className="flex-1 py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>View Schedule</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {isActive ? (
                  <span className="px-3 py-2.5 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-xl flex items-center gap-1 shrink-0">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Active</span>
                  </span>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className="py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors shrink-0"
                  >
                    Select Plan
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Plan Detail Modal */}
      {selectedPlanModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/50">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold uppercase tracking-wider">
                  <span>{selectedPlanModal.level}</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPlanModal.daysPerWeek} Days / Week</span>
                  <span aria-hidden="true">·</span>
                  <span>{selectedPlanModal.durationMinutes} Minutes</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {selectedPlanModal.title}
                </h2>
                <p className="text-xs text-slate-600 mt-1">
                  {selectedPlanModal.description}
                </p>
              </div>

              <button
                onClick={() => setSelectedPlanModal(null)}
                className="w-8 h-8 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body: Days Schedule */}
            <div className="p-6 overflow-y-auto space-y-4 max-h-[60vh]">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Weekly Schedule & Exercises
              </div>

              {selectedPlanModal.days.map((day, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border ${
                    day.isRest
                      ? 'bg-slate-50/70 border-slate-200/60'
                      : 'bg-white border-slate-200/90 shadow-sm'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{day.dayName}:</span>
                      <span className="text-xs font-semibold text-emerald-800">
                        {day.title}
                      </span>
                    </div>

                    {!day.isRest ? (
                      <button
                        onClick={() => handleStartPlanDay(selectedPlanModal, day)}
                        className="self-start sm:self-auto px-3 py-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Play className="w-3 h-3 fill-current" />
                        <span>Start Day</span>
                      </button>
                    ) : (
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-200/70 px-2 py-0.5 rounded-md self-start sm:self-auto">
                        Rest & Recovery Day
                      </span>
                    )}
                  </div>

                  <div className="text-xs text-slate-600 font-medium mb-2">
                    Focus: {day.focusMuscles}
                  </div>

                  {day.isRest && day.recoveryTip && (
                    <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-emerald-900 leading-relaxed">
                      💡 <span className="font-semibold">Recovery Reminder:</span> {day.recoveryTip}
                    </div>
                  )}

                  {!day.isRest && day.exercises.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {day.exercises.map((ex, eIdx) => (
                        <div
                          key={eIdx}
                          className="flex items-center justify-between text-xs py-1.5 px-2.5 bg-slate-50 rounded-lg"
                        >
                          <span className="font-medium text-slate-800">{ex.name}</span>
                          <span className="text-slate-500 font-mono tabular-nums">
                            {ex.sets} sets × {ex.reps}
                            {ex.targetWeightKg && ex.targetWeightKg > 0
                              ? ` · ${ex.targetWeightKg}kg`
                              : ''}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={() => setSelectedPlanModal(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <button
                onClick={() => handleSelectPlan(selectedPlanModal)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Set as My Active Plan</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
