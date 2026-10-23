import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  ActiveWorkout,
  ActiveWorkoutExercise,
  CompletedWorkout,
  WorkoutPlan,
  HabitGoal,
  PerceivedEffort
} from '../types';
import { WORKOUT_PLANS_DATA } from '../data/workoutPlansData';
import { EXERCISES_DATA } from '../data/exercisesData';
import { INITIAL_HABITS } from '../data/studentTipsData';
import { soundEffects } from '../utils/audio';

interface WorkoutContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  resetAllData: () => void;
  activePlan: WorkoutPlan;
  setActivePlanId: (planId: string) => void;
  
  // Active Live Workout
  activeWorkout: ActiveWorkout | null;
  startWorkout: (planDayTitle?: string, initialExercises?: { exerciseId: string; name: string; muscleGroup: string; defaultSets?: number; defaultReps?: string; defaultWeightKg?: number }[]) => void;
  updateSet: (exerciseIndex: number, setIndex: number, field: 'weightKg' | 'reps' | 'completed', value: number | boolean) => void;
  addSetToExercise: (exerciseIndex: number) => void;
  removeSetFromExercise: (exerciseIndex: number, setIndex: number) => void;
  addExerciseToWorkout: (exerciseId: string) => void;
  removeExerciseFromWorkout: (exerciseIndex: number) => void;
  finishWorkout: (effort: PerceivedEffort, notes?: string) => void;
  cancelWorkout: () => void;
  togglePauseWorkout: () => void;

  // Rest Timer
  restTimerSeconds: number;
  restTimerInitial: number;
  isRestTimerActive: boolean;
  startRestTimer: (seconds: number) => void;
  pauseRestTimer: () => void;
  resumeRestTimer: () => void;
  resetRestTimer: () => void;
  addRestTimerSeconds: (extraSeconds: number) => void;

  // History & Progress
  completedWorkouts: CompletedWorkout[];
  deleteWorkoutHistoryItem: (id: string) => void;
  habits: HabitGoal[];
  toggleHabit: (id: string) => void;
  exportDataJson: () => string;
  importDataJson: (jsonString: string) => boolean;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Arjun',
  fitnessLevel: 'beginner',
  workoutLocation: 'college-hostel',
  equipment: 'dumbbells-only',
  preferredDays: ['Mon', 'Wed', 'Fri'],
  weeklyGoalWorkouts: 3,
  activePlanId: 'plan-college-fullbody',
  unit: 'kg'
};

const SAMPLE_COMPLETED_WORKOUTS: CompletedWorkout[] = [
  {
    id: 'sample-1',
    planId: 'plan-college-fullbody',
    title: 'Full Body Foundation A',
    completedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 44,
    totalVolumeKg: 1980,
    totalSets: 12,
    perceivedEffort: 'moderate',
    notes: 'Great workout. Managed 10kg on bench press smoothly. Felt energised before class!',
    exercises: [
      {
        exerciseId: 'goblet-squat',
        name: 'Goblet Squat (Dumbbell)',
        muscleGroup: 'Legs',
        sets: [
          { setNumber: 1, weightKg: 8, reps: 12 },
          { setNumber: 2, weightKg: 10, reps: 10 },
          { setNumber: 3, weightKg: 10, reps: 10 }
        ]
      },
      {
        exerciseId: 'db-bench-press',
        name: 'Dumbbell Flat Bench Press',
        muscleGroup: 'Chest',
        sets: [
          { setNumber: 1, weightKg: 10, reps: 12 },
          { setNumber: 2, weightKg: 10, reps: 10 },
          { setNumber: 3, weightKg: 10, reps: 10 }
        ]
      },
      {
        exerciseId: 'lat-pulldown',
        name: 'Lat Pulldown (Cable)',
        muscleGroup: 'Back',
        sets: [
          { setNumber: 1, weightKg: 25, reps: 12 },
          { setNumber: 2, weightKg: 25, reps: 10 },
          { setNumber: 3, weightKg: 30, reps: 8 }
        ]
      },
      {
        exerciseId: 'plank-std',
        name: 'Forearm Plank',
        muscleGroup: 'Core',
        sets: [
          { setNumber: 1, weightKg: 0, reps: 35 },
          { setNumber: 2, weightKg: 0, reps: 35 },
          { setNumber: 3, weightKg: 0, reps: 30 }
        ]
      }
    ]
  },
  {
    id: 'sample-2',
    planId: 'plan-hostel-bodyweight',
    title: 'Upper Body Push & Core',
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    durationMinutes: 28,
    totalVolumeKg: 0,
    totalSets: 9,
    perceivedEffort: 'easy',
    notes: 'Done in my hostel room before dinner. Good form on knee push-ups.',
    exercises: [
      {
        exerciseId: 'pushup-std',
        name: 'Standard Push-Up',
        muscleGroup: 'Chest',
        sets: [
          { setNumber: 1, weightKg: 0, reps: 10 },
          { setNumber: 2, weightKg: 0, reps: 10 },
          { setNumber: 3, weightKg: 0, reps: 8 }
        ]
      },
      {
        exerciseId: 'bench-dips',
        name: 'Chair / Bed Edge Dips',
        muscleGroup: 'Arms',
        sets: [
          { setNumber: 1, weightKg: 0, reps: 12 },
          { setNumber: 2, weightKg: 0, reps: 10 },
          { setNumber: 3, weightKg: 0, reps: 10 }
        ]
      },
      {
        exerciseId: 'plank-std',
        name: 'Forearm Plank',
        muscleGroup: 'Core',
        sets: [
          { setNumber: 1, weightKg: 0, reps: 30 },
          { setNumber: 2, weightKg: 0, reps: 30 },
          { setNumber: 3, weightKg: 0, reps: 30 }
        ]
      }
    ]
  }
];

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

export const WorkoutProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Profile State
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const stored = localStorage.getItem('gymdosth_profile');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return DEFAULT_PROFILE;
  });

  // 2. Active Workout State
  const [activeWorkout, setActiveWorkout] = useState<ActiveWorkout | null>(() => {
    try {
      const stored = localStorage.getItem('gymdosth_active_workout');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return null;
  });

  // 3. Completed History
  const [completedWorkouts, setCompletedWorkouts] = useState<CompletedWorkout[]>(() => {
    try {
      const stored = localStorage.getItem('gymdosth_history');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return SAMPLE_COMPLETED_WORKOUTS;
  });

  // 4. Habits State
  const [habits, setHabits] = useState<HabitGoal[]>(() => {
    try {
      const stored = localStorage.getItem('gymdosth_habits');
      if (stored) return JSON.parse(stored);
    } catch {
      // fallback
    }
    return INITIAL_HABITS;
  });

  // 5. Rest Timer State
  const [restTimerSeconds, setRestTimerSeconds] = useState<number>(0);
  const [restTimerInitial, setRestTimerInitial] = useState<number>(60);
  const [isRestTimerActive, setIsRestTimerActive] = useState<boolean>(false);

  // Sync profile to localStorage
  useEffect(() => {
    localStorage.setItem('gymdosth_profile', JSON.stringify(profile));
  }, [profile]);

  // Sync active workout
  useEffect(() => {
    if (activeWorkout) {
      localStorage.setItem('gymdosth_active_workout', JSON.stringify(activeWorkout));
    } else {
      localStorage.removeItem('gymdosth_active_workout');
    }
  }, [activeWorkout]);

  // Sync history
  useEffect(() => {
    localStorage.setItem('gymdosth_history', JSON.stringify(completedWorkouts));
  }, [completedWorkouts]);

  // Sync habits
  useEffect(() => {
    localStorage.setItem('gymdosth_habits', JSON.stringify(habits));
  }, [habits]);

  // Active workout elapsed timer ticker
  useEffect(() => {
    if (!activeWorkout || activeWorkout.isPaused) return;

    const interval = setInterval(() => {
      setActiveWorkout(prev => {
        if (!prev || prev.isPaused) return prev;
        return {
          ...prev,
          elapsedSeconds: prev.elapsedSeconds + 1
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeWorkout?.isPaused]);

  // Rest Timer Ticker with Audio alert
  useEffect(() => {
    if (!isRestTimerActive) return;

    if (restTimerSeconds <= 0) {
      setIsRestTimerActive(false);
      soundEffects.playTimerComplete();
      return;
    }

    const timer = setInterval(() => {
      setRestTimerSeconds(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsRestTimerActive(false);
          soundEffects.playTimerComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isRestTimerActive, restTimerSeconds]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const activePlan = WORKOUT_PLANS_DATA.find(p => p.id === profile.activePlanId) || WORKOUT_PLANS_DATA[0];

  const setActivePlanId = (planId: string) => {
    setProfile(prev => ({ ...prev, activePlanId: planId }));
  };

  // Start workout session
  const startWorkout = (
    planDayTitle = 'Quick Custom Workout',
    initialExercises?: { exerciseId: string; name: string; muscleGroup: string; defaultSets?: number; defaultReps?: string; defaultWeightKg?: number }[]
  ) => {
    let exerciseList: ActiveWorkout['exercises'] = [];

    if (initialExercises && initialExercises.length > 0) {
      exerciseList = initialExercises.map(ex => {
        const fullEx = EXERCISES_DATA.find(e => e.id === ex.exerciseId);
        const count = ex.defaultSets || fullEx?.defaultSets || 3;
        const defaultWeight = ex.defaultWeightKg ?? fullEx?.defaultWeightKg ?? 0;
        const repsVal = fullEx ? parseInt(fullEx.defaultReps) || 10 : 10;

        return {
          exerciseId: ex.exerciseId,
          name: ex.name,
          muscleGroup: ex.muscleGroup,
          sets: Array.from({ length: count }, (_, idx) => ({
            id: `set-${Date.now()}-${ex.exerciseId}-${idx}`,
            setNumber: idx + 1,
            weightKg: defaultWeight,
            reps: repsVal,
            completed: false
          }))
        };
      });
    } else {
      // Default to 2 starter exercises
      const starter1 = EXERCISES_DATA[0];
      const starter2 = EXERCISES_DATA[2];
      exerciseList = [
        {
          exerciseId: starter1.id,
          name: starter1.name,
          muscleGroup: starter1.muscleGroup,
          sets: [
            { id: `set-${Date.now()}-1`, setNumber: 1, weightKg: 0, reps: 10, completed: false },
            { id: `set-${Date.now()}-2`, setNumber: 2, weightKg: 0, reps: 10, completed: false },
            { id: `set-${Date.now()}-3`, setNumber: 3, weightKg: 0, reps: 10, completed: false }
          ]
        },
        {
          exerciseId: starter2.id,
          name: starter2.name,
          muscleGroup: starter2.muscleGroup,
          sets: [
            { id: `set-${Date.now()}-4`, setNumber: 1, weightKg: 10, reps: 10, completed: false },
            { id: `set-${Date.now()}-5`, setNumber: 2, weightKg: 10, reps: 10, completed: false },
            { id: `set-${Date.now()}-6`, setNumber: 3, weightKg: 10, reps: 10, completed: false }
          ]
        }
      ];
    }

    const newWorkout: ActiveWorkout = {
      id: `workout-${Date.now()}`,
      planId: profile.activePlanId,
      title: planDayTitle,
      startTime: Date.now(),
      elapsedSeconds: 0,
      exercises: exerciseList,
      isPaused: false
    };

    setActiveWorkout(newWorkout);
    soundEffects.playClick();
  };

  const updateSet = (exerciseIndex: number, setIndex: number, field: 'weightKg' | 'reps' | 'completed', value: number | boolean) => {
    setActiveWorkout(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const targetEx = { ...updatedExercises[exerciseIndex] };
      const updatedSets = [...targetEx.sets];
      
      const currentSet = { ...updatedSets[setIndex], [field]: value };
      updatedSets[setIndex] = currentSet;
      targetEx.sets = updatedSets;
      updatedExercises[exerciseIndex] = targetEx;

      return {
        ...prev,
        exercises: updatedExercises
      };
    });

    if (field === 'completed' && value === true) {
      soundEffects.playClick();
      // Start 60 second rest timer automatically if not running
      if (!isRestTimerActive) {
        startRestTimer(60);
      }
    }
  };

  const addSetToExercise = (exerciseIndex: number) => {
    setActiveWorkout(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const targetEx = { ...updatedExercises[exerciseIndex] };
      const lastSet = targetEx.sets[targetEx.sets.length - 1];
      const newSetNumber = targetEx.sets.length + 1;

      targetEx.sets = [
        ...targetEx.sets,
        {
          id: `set-${Date.now()}-${newSetNumber}`,
          setNumber: newSetNumber,
          weightKg: lastSet ? lastSet.weightKg : 10,
          reps: lastSet ? lastSet.reps : 10,
          completed: false
        }
      ];

      updatedExercises[exerciseIndex] = targetEx;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const removeSetFromExercise = (exerciseIndex: number, setIndex: number) => {
    setActiveWorkout(prev => {
      if (!prev) return null;
      const updatedExercises = [...prev.exercises];
      const targetEx = { ...updatedExercises[exerciseIndex] };
      if (targetEx.sets.length <= 1) return prev; // keep at least 1 set

      targetEx.sets = targetEx.sets.filter((_, idx) => idx !== setIndex).map((s, idx) => ({
        ...s,
        setNumber: idx + 1
      }));

      updatedExercises[exerciseIndex] = targetEx;
      return { ...prev, exercises: updatedExercises };
    });
  };

  const addExerciseToWorkout = (exerciseId: string) => {
    const exercise = EXERCISES_DATA.find(e => e.id === exerciseId);
    if (!exercise) return;

    setActiveWorkout(prev => {
      if (!prev) return null;
      const repsNum = parseInt(exercise.defaultReps) || 10;
      const newExItem: ActiveWorkoutExercise = {
        exerciseId: exercise.id,
        name: exercise.name,
        muscleGroup: exercise.muscleGroup,
        sets: Array.from({ length: exercise.defaultSets || 3 }, (_, idx) => ({
          id: `set-${Date.now()}-${exercise.id}-${idx}`,
          setNumber: idx + 1,
          weightKg: exercise.defaultWeightKg || 0,
          reps: repsNum,
          completed: false
        }))
      };

      return {
        ...prev,
        exercises: [...prev.exercises, newExItem]
      };
    });
    soundEffects.playClick();
  };

  const removeExerciseFromWorkout = (exerciseIndex: number) => {
    setActiveWorkout(prev => {
      if (!prev) return null;
      const updated = prev.exercises.filter((_, idx) => idx !== exerciseIndex);
      return { ...prev, exercises: updated };
    });
  };

  const finishWorkout = (effort: PerceivedEffort, notes = '') => {
    if (!activeWorkout) return;

    let totalVolume = 0;
    let completedSetsCount = 0;

    const savedExercises = activeWorkout.exercises.map(ex => {
      const finishedSets = ex.sets.filter(s => s.completed || s.reps > 0);
      finishedSets.forEach(s => {
        totalVolume += s.weightKg * s.reps;
        completedSetsCount++;
      });

      return {
        exerciseId: ex.exerciseId,
        name: ex.name,
        muscleGroup: ex.muscleGroup,
        sets: (finishedSets.length > 0 ? finishedSets : ex.sets).map(s => ({
          setNumber: s.setNumber,
          weightKg: s.weightKg,
          reps: s.reps
        }))
      };
    });

    const durationMinutes = Math.max(1, Math.round(activeWorkout.elapsedSeconds / 60));

    const completed: CompletedWorkout = {
      id: `comp-${Date.now()}`,
      planId: activeWorkout.planId,
      title: activeWorkout.title,
      completedAt: new Date().toISOString(),
      durationMinutes,
      totalVolumeKg: totalVolume,
      totalSets: completedSetsCount || activeWorkout.exercises.reduce((acc, curr) => acc + curr.sets.length, 0),
      perceivedEffort: effort,
      notes,
      exercises: savedExercises
    };

    setCompletedWorkouts(prev => [completed, ...prev]);
    setActiveWorkout(null);
    setIsRestTimerActive(false);
    setRestTimerSeconds(0);

    // mark today's habit as completed
    setHabits(prev =>
      prev.map(h => (h.category === 'workout' && h.id === 'h-1' ? { ...h, completed: true } : h))
    );

    soundEffects.playTimerComplete();
  };

  const cancelWorkout = () => {
    setActiveWorkout(null);
    setIsRestTimerActive(false);
    setRestTimerSeconds(0);
  };

  const togglePauseWorkout = () => {
    setActiveWorkout(prev => (prev ? { ...prev, isPaused: !prev.isPaused } : null));
  };

  // Rest Timer Controls
  const startRestTimer = (seconds: number) => {
    setRestTimerInitial(seconds);
    setRestTimerSeconds(seconds);
    setIsRestTimerActive(true);
    soundEffects.playClick();
  };

  const pauseRestTimer = () => {
    setIsRestTimerActive(false);
  };

  const resumeRestTimer = () => {
    if (restTimerSeconds > 0) {
      setIsRestTimerActive(true);
    }
  };

  const resetRestTimer = () => {
    setIsRestTimerActive(false);
    setRestTimerSeconds(0);
  };

  const addRestTimerSeconds = (extraSeconds: number) => {
    setRestTimerSeconds(prev => Math.max(0, prev + extraSeconds));
  };

  // History & Habit Controls
  const deleteWorkoutHistoryItem = (id: string) => {
    setCompletedWorkouts(prev => prev.filter(w => w.id !== id));
  };

  const toggleHabit = (id: string) => {
    setHabits(prev =>
      prev.map(h => (h.id === id ? { ...h, completed: !h.completed } : h))
    );
    soundEffects.playClick();
  };

  const resetAllData = () => {
    localStorage.removeItem('gymdosth_profile');
    localStorage.removeItem('gymdosth_active_workout');
    localStorage.removeItem('gymdosth_history');
    localStorage.removeItem('gymdosth_habits');
    setProfile(DEFAULT_PROFILE);
    setActiveWorkout(null);
    setCompletedWorkouts([]);
    setHabits(INITIAL_HABITS);
    setIsRestTimerActive(false);
    setRestTimerSeconds(0);
  };

  const exportDataJson = (): string => {
    const data = {
      profile,
      completedWorkouts,
      habits,
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(data, null, 2);
  };

  const importDataJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.profile) setProfile(parsed.profile);
      if (Array.isArray(parsed.completedWorkouts)) setCompletedWorkouts(parsed.completedWorkouts);
      if (Array.isArray(parsed.habits)) setHabits(parsed.habits);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        profile,
        updateProfile,
        resetAllData,
        activePlan,
        setActivePlanId,
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
        restTimerInitial,
        isRestTimerActive,
        startRestTimer,
        pauseRestTimer,
        resumeRestTimer,
        resetRestTimer,
        addRestTimerSeconds,
        completedWorkouts,
        deleteWorkoutHistoryItem,
        habits,
        toggleHabit,
        exportDataJson,
        importDataJson
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
