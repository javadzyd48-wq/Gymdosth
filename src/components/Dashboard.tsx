import React, { useState } from 'react';
import {
  Play,
  Calendar,
  History,
  BookOpen,
  CheckCircle2,
  Flame,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Award
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { STUDENT_TIPS_DATA } from '../data/studentTipsData';

interface DashboardProps {
  setCurrentTab: (tab: string) => void;
  onSelectPlanDay?: (dayTitle: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ setCurrentTab }) => {
  const {
    profile,
    activePlan,
    activeWorkout,
    startWorkout,
    completedWorkouts,
    habits,
    toggleHabit
  } = useWorkout();

  const [tipIndex, setTipIndex] = useState(0);

  // Time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Find next workout day from active plan
  const todayDayIndex = new Date().getDay(); // 0 is Sunday, 1 is Monday...
  // map to friendly schedule
  const activeDays = activePlan.days;
  // find first non-rest day or the current day
  const todaySession = activeDays.find(d => !d.isRest) || activeDays[0];

  // Calculate this week's completed count
  const oneWeekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const workoutsThisWeek = completedWorkouts.filter(
    w => new Date(w.completedAt).getTime() >= oneWeekAgo
  );

  const totalMinutesThisWeek = workoutsThisWeek.reduce((acc, curr) => acc + curr.durationMinutes, 0);

  // Weekly consistency dots: Last 7 days
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayNum = new Date().getDay();
  const past7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const dayDateStr = d.toISOString().split('T')[0];
    const isCompleted = completedWorkouts.some(
      w => w.completedAt.split('T')[0] === dayDateStr
    );
    return {
      dayName: daysOfWeek[d.getDay()],
      dateNum: d.getDate(),
      isToday: d.getDay() === todayNum,
      isCompleted
    };
  });

  const nextTip = () => {
    setTipIndex(prev => (prev + 1) % STUDENT_TIPS_DATA.length);
  };

  const currentTip = STUDENT_TIPS_DATA[tipIndex];

  const handleStartTodayWorkout = () => {
    if (activeWorkout) {
      setCurrentTab('tracker');
      return;
    }

    if (todaySession && todaySession.exercises.length > 0) {
      startWorkout(
        `${activePlan.title} — ${todaySession.title}`,
        todaySession.exercises.map(e => ({
          exerciseId: e.exerciseId,
          name: e.name,
          muscleGroup: todaySession.focusMuscles.split(',')[0].trim(),
          defaultSets: e.sets,
          defaultReps: e.reps,
          defaultWeightKg: e.targetWeightKg
        }))
      );
    } else {
      startWorkout('Today\'s Training');
    }
    setCurrentTab('tracker');
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-6xl mx-auto px-4 sm:px-6 pt-5">
      {/* 1. Header Greeting & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
            <span>Student & Beginner Companion</span>
            <span aria-hidden="true">·</span>
            <span>Made for India</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
            {getGreeting()}, {profile.name || 'Dosth'}! 👋
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Let&apos;s build strength, focus, and healthy habits today without any ego lifting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentTab('plans')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-600" />
            <span>My Plan</span>
          </button>
          <button
            onClick={() => setCurrentTab('progress')}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
          >
            <History className="w-3.5 h-3.5 text-emerald-600" />
            <span>History</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Card: Today's Workout or Resume */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-950 text-white shadow-xl shadow-emerald-950/20 border border-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
          <div className="p-6 sm:p-8 lg:col-span-7 z-10 space-y-4">
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
              <span className="font-semibold uppercase tracking-wider">{activePlan.title}</span>
              <span aria-hidden="true">·</span>
              <span>{activePlan.daysPerWeek} Days/Wk</span>
            </div>

            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {activeWorkout ? 'Workout In Progress' : todaySession.title}
              </h2>
              <p className="text-slate-300 text-sm mt-1 max-w-md">
                {activeWorkout
                  ? `You have an active workout in session (${Math.floor(activeWorkout.elapsedSeconds / 60)} minutes elapsed). Keep up the rhythm!`
                  : `Focus: ${todaySession.focusMuscles}. Built to fit comfortably around your college lectures and exams.`}
              </p>
            </div>

            {/* Quick Exercise Preview Tags */}
            {!activeWorkout && todaySession.exercises.length > 0 && (
              <div className="pt-1">
                <div className="text-xs text-slate-400 font-medium mb-1.5">Today&apos;s movements:</div>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-slate-300">
                  {todaySession.exercises.map((e, idx) => (
                    <React.Fragment key={e.exerciseId}>
                      <span className="text-emerald-300 font-medium">{e.name}</span>
                      {idx < todaySession.exercises.length - 1 && <span className="text-slate-500">·</span>}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleStartTodayWorkout}
                className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-bold text-sm rounded-2xl flex items-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{activeWorkout ? 'Resume Active Workout' : 'Start Today\'s Workout'}</span>
              </button>

              <button
                onClick={() => setCurrentTab('plans')}
                className="px-4 py-3 bg-white/10 hover:bg-white/15 text-white font-medium text-xs sm:text-sm rounded-2xl transition-colors"
              >
                Change Plan
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative h-48 lg:h-full min-h-[220px]">
            <img
              src="/src/assets/images/gym_hero_banner_1792783397327.jpg"
              alt="Students working out together happily"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80 lg:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-900 via-slate-900/40 to-transparent" />
          </div>
        </div>
      </div>

      {/* 3. Weekly Consistency & Metric Snapshot */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Weekly Consistency Calendar */}
        <div className="md:col-span-2 bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Weekly Consistency</h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Goal: {profile.weeklyGoalWorkouts} workouts this week ({workoutsThisWeek.length} completed)
              </p>
            </div>
            <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
              {workoutsThisWeek.length >= profile.weeklyGoalWorkouts ? 'Goal Reached! 🎯' : 'On Track'}
            </div>
          </div>

          {/* 7-day strip */}
          <div className="grid grid-cols-7 gap-2 pt-1">
            {past7Days.map((d, idx) => (
              <div
                key={idx}
                className={`flex flex-col items-center justify-center p-2.5 rounded-2xl transition-all ${
                  d.isToday
                    ? 'border-2 border-emerald-500 bg-emerald-50/50'
                    : 'bg-slate-50 border border-slate-100'
                }`}
              >
                <span className="text-[11px] font-medium text-slate-500">{d.dayName}</span>
                <span className="text-sm font-bold text-slate-900 mt-0.5">{d.dateNum}</span>
                <div className="mt-2">
                  {d.isCompleted ? (
                    <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
                    </div>
                  ) : (
                    <div className="w-5 h-5 rounded-full bg-slate-200/80" />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar towards Weekly Goal */}
          <div className="pt-2">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Weekly target</span>
              <span className="font-mono tabular-nums font-semibold text-slate-700">
                {Math.round((workoutsThisWeek.length / Math.max(1, profile.weeklyGoalWorkouts)) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
              <div
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min(
                    100,
                    (workoutsThisWeek.length / Math.max(1, profile.weeklyGoalWorkouts)) * 100
                  )}%`
                }}
              />
            </div>
          </div>
        </div>

        {/* Quick Stats Card */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Training Snapshot</h3>
            <p className="text-xs text-slate-500 mt-0.5">Lifetime & recent progress</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Flame className="w-3.5 h-3.5 text-amber-500" />
                <span>Total Workouts</span>
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {completedWorkouts.length}
              </div>
            </div>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="flex items-center gap-1.5 text-slate-500 text-xs">
                <Clock className="w-3.5 h-3.5 text-emerald-600" />
                <span>Minutes Trained</span>
              </div>
              <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
                {totalMinutesThisWeek}m
              </div>
            </div>
          </div>

          <button
            onClick={() => setCurrentTab('progress')}
            className="w-full py-2.5 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <span>View Full Analytics</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* 4. Quick Access Buttons (Requested in brief) */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Quick Access
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={handleStartTodayWorkout}
            className="p-4 bg-white hover:bg-emerald-50/50 border border-slate-200/90 rounded-2xl text-left transition-all group shadow-sm active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Play className="w-5 h-5 fill-current" />
            </div>
            <div className="font-bold text-slate-900 text-sm mt-3">Start Workout</div>
            <div className="text-xs text-slate-500 mt-0.5">Track sets & reps live</div>
          </button>

          <button
            onClick={() => setCurrentTab('plans')}
            className="p-4 bg-white hover:bg-emerald-50/50 border border-slate-200/90 rounded-2xl text-left transition-all group shadow-sm active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Calendar className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 text-sm mt-3">My Plan</div>
            <div className="text-xs text-slate-500 mt-0.5">View weekly splits</div>
          </button>

          <button
            onClick={() => setCurrentTab('progress')}
            className="p-4 bg-white hover:bg-emerald-50/50 border border-slate-200/90 rounded-2xl text-left transition-all group shadow-sm active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
              <History className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 text-sm mt-3">Workout History</div>
            <div className="text-xs text-slate-500 mt-0.5">Review logged logs</div>
          </button>

          <button
            onClick={() => setCurrentTab('library')}
            className="p-4 bg-white hover:bg-emerald-50/50 border border-slate-200/90 rounded-2xl text-left transition-all group shadow-sm active:scale-95"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <BookOpen className="w-5 h-5" />
            </div>
            <div className="font-bold text-slate-900 text-sm mt-3">Exercise Library</div>
            <div className="text-xs text-slate-500 mt-0.5">Form & mistakes guide</div>
          </button>
        </div>
      </div>

      {/* 5. Daily Dosth Tip for Indian Students */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-3xl p-5 shadow-sm">
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              Dosth Tip · {currentTip.category}
            </span>
            <span className="text-xs text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-md font-medium">
              {currentTip.badge}
            </span>
          </div>

          <button
            onClick={nextTip}
            className="text-xs text-emerald-800 hover:text-emerald-950 font-medium flex items-center gap-1 transition-colors"
          >
            <RefreshCw className="w-3 h-3" />
            <span>Next Tip</span>
          </button>
        </div>

        <h4 className="text-base font-bold text-slate-900">{currentTip.title}</h4>
        <p className="text-sm text-slate-700 mt-1 leading-relaxed">{currentTip.tip}</p>
      </div>

      {/* 6. Daily Fitness Habit Tracker (Optional, Friendly) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200/90 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Today&apos;s Healthy Habits</h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Small daily wins build long-term strength (tap to mark)
            </p>
          </div>
          <div className="text-xs text-slate-600 font-medium font-mono tabular-nums">
            {habits.filter(h => h.completed).length} / {habits.length} Done
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
          {habits.map(habit => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              className={`p-3 rounded-2xl text-left border flex items-center justify-between transition-all active:scale-[0.99] ${
                habit.completed
                  ? 'bg-emerald-50/60 border-emerald-200 text-slate-900'
                  : 'bg-slate-50/70 border-slate-100 text-slate-700 hover:border-slate-200'
              }`}
            >
              <span className={`text-xs font-medium ${habit.completed ? 'line-through text-slate-500' : ''}`}>
                {habit.title}
              </span>
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ml-2 transition-colors ${
                  habit.completed
                    ? 'bg-emerald-600 text-white'
                    : 'border-2 border-slate-300'
                }`}
              >
                {habit.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* 7. Safety & Medical Guidance Note */}
      <div className="bg-slate-100/80 rounded-2xl p-4 border border-slate-200 flex items-start gap-3 text-xs text-slate-600">
        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-800">Safety First: </span>
          GymDosth provides general fitness and form guidelines. Always warm up with 5 minutes of arm circles and bodyweight squats. If you feel sharp joint pain or have pre-existing medical conditions, stop immediately and seek advice from a qualified physician.
        </div>
      </div>
    </div>
  );
};
