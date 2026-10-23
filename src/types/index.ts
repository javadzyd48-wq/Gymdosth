export type FitnessLevel = 'beginner' | 'intermediate' | 'advanced';
export type WorkoutLocation = 'commercial-gym' | 'college-hostel' | 'home';
export type EquipmentAvailable = 'full-gym' | 'dumbbells-only' | 'bodyweight';
export type PlanCategory = 'full-body' | 'upper-lower' | 'ppl' | 'home-hostel' | 'dumbbell-only';
export type PerceivedEffort = 'easy' | 'moderate' | 'challenging' | 'beast-mode';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: 'Chest' | 'Back' | 'Legs' | 'Shoulders' | 'Arms' | 'Core' | 'Full Body';
  secondaryMuscles?: string[];
  equipment: 'Bodyweight' | 'Dumbbells' | 'Barbell' | 'Cable/Machine' | 'Resistance Band';
  difficulty: FitnessLevel;
  instructions: string[];
  commonMistakes: string[];
  alternatives: string;
  safetyTip: string;
  defaultSets: number;
  defaultReps: string;
  defaultWeightKg: number;
}

export interface PlanExerciseItem {
  exerciseId: string;
  name: string;
  sets: number;
  reps: string;
  targetWeightKg?: number;
  restSeconds?: number;
}

export interface PlanDay {
  dayName: string;
  title: string;
  isRest: boolean;
  focusMuscles: string;
  recoveryTip?: string;
  exercises: PlanExerciseItem[];
}

export interface WorkoutPlan {
  id: string;
  title: string;
  tagline: string;
  level: FitnessLevel;
  category: PlanCategory;
  daysPerWeek: number;
  durationMinutes: number;
  description: string;
  bestFor: string;
  days: PlanDay[];
}

export interface WorkoutSetRecord {
  id: string;
  setNumber: number;
  weightKg: number;
  reps: number;
  completed: boolean;
}

export interface ActiveWorkoutExercise {
  exerciseId: string;
  name: string;
  muscleGroup: string;
  sets: WorkoutSetRecord[];
  notes?: string;
}

export interface ActiveWorkout {
  id: string;
  planId?: string;
  title: string;
  startTime: number; // timestamp
  elapsedSeconds: number;
  exercises: ActiveWorkoutExercise[];
  isPaused: boolean;
}

export interface CompletedWorkout {
  id: string;
  planId?: string;
  title: string;
  completedAt: string; // ISO date string
  durationMinutes: number;
  totalVolumeKg: number;
  totalSets: number;
  perceivedEffort: PerceivedEffort;
  notes?: string;
  exercises: {
    exerciseId: string;
    name: string;
    muscleGroup: string;
    sets: {
      setNumber: number;
      weightKg: number;
      reps: number;
    }[];
  }[];
}

export interface UserProfile {
  name: string;
  fitnessLevel: FitnessLevel;
  workoutLocation: WorkoutLocation;
  equipment: EquipmentAvailable;
  preferredDays: string[];
  weeklyGoalWorkouts: number;
  activePlanId: string;
  unit: 'kg' | 'lbs';
}

export interface HabitGoal {
  id: string;
  title: string;
  category: 'workout' | 'hydration' | 'recovery' | 'nutrition';
  completed: boolean;
}

export interface StudentTip {
  id: string;
  category: 'Nutrition' | 'Technique' | 'Hostel Hack' | 'Recovery' | 'Mindset';
  title: string;
  tip: string;
  badge: string;
}
