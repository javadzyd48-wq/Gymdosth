import { WorkoutPlan } from '../types';

export const WORKOUT_PLANS_DATA: WorkoutPlan[] = [
  {
    id: 'plan-college-fullbody',
    title: 'College Starter 3-Day Full Body',
    tagline: 'The gold standard for beginners & busy students',
    level: 'beginner',
    category: 'full-body',
    daysPerWeek: 3,
    durationMinutes: 45,
    description: 'Scientifically designed for students juggling classes, assignments, and gym. Trains every major muscle group 3 times a week with ample rest days for muscle recovery and exam prep.',
    bestFor: 'College & school beginners starting fresh, or anyone with 3 free days a week.',
    days: [
      {
        dayName: 'Day 1 (Monday)',
        title: 'Full Body Foundation A',
        isRest: false,
        focusMuscles: 'Chest, Quads, Back & Core',
        exercises: [
          { exerciseId: 'goblet-squat', name: 'Goblet Squat (Dumbbell)', sets: 3, reps: '10-12', targetWeightKg: 8, restSeconds: 60 },
          { exerciseId: 'db-bench-press', name: 'Dumbbell Flat Bench Press', sets: 3, reps: '10-12', targetWeightKg: 10, restSeconds: 60 },
          { exerciseId: 'lat-pulldown', name: 'Lat Pulldown (Cable)', sets: 3, reps: '10-12', targetWeightKg: 25, restSeconds: 60 },
          { exerciseId: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', sets: 3, reps: '12-15', targetWeightKg: 4, restSeconds: 45 },
          { exerciseId: 'plank-std', name: 'Forearm Plank', sets: 3, reps: '30-40 sec', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 2 (Tuesday)',
        title: 'Active Recovery & Hydration',
        isRest: true,
        focusMuscles: 'Rest & Mobility',
        recoveryTip: 'Drink 2.5-3L water today. Take a 20-minute walk on campus, stretch tight hamstrings, and sleep at least 7.5 hours.',
        exercises: []
      },
      {
        dayName: 'Day 3 (Wednesday)',
        title: 'Full Body Foundation B',
        isRest: false,
        focusMuscles: 'Back, Hamstrings, Shoulders & Arms',
        exercises: [
          { exerciseId: 'db-rdl', name: 'Dumbbell Romanian Deadlift (RDL)', sets: 3, reps: '10-12', targetWeightKg: 12, restSeconds: 60 },
          { exerciseId: 'seated-cable-row', name: 'Seated Cable Row', sets: 3, reps: '10-12', targetWeightKg: 25, restSeconds: 60 },
          { exerciseId: 'db-overhead-press', name: 'Dumbbell Overhead Shoulder Press', sets: 3, reps: '8-10', targetWeightKg: 8, restSeconds: 60 },
          { exerciseId: 'db-bicep-curl', name: 'Standing Dumbbell Bicep Curl', sets: 3, reps: '10-12', targetWeightKg: 7.5, restSeconds: 45 },
          { exerciseId: 'dead-bug', name: 'Dead Bug', sets: 3, reps: '10 each side', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 4 (Thursday)',
        title: 'Midweek Rest & Study',
        isRest: true,
        focusMuscles: 'Rest & Recovery',
        recoveryTip: 'Muscles grow during rest! Eat clean protein (sprouts, eggs, paneer or dal) and review your lecture notes.',
        exercises: []
      },
      {
        dayName: 'Day 5 (Friday)',
        title: 'Full Body Energizer C',
        isRest: false,
        focusMuscles: 'Glutes, Chest, Arms & Conditioning',
        exercises: [
          { exerciseId: 'bodyweight-squat', name: 'Bodyweight Air Squat', sets: 3, reps: '15', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'pushup-std', name: 'Standard / Knee Push-Up', sets: 3, reps: '8-12', targetWeightKg: 0, restSeconds: 60 },
          { exerciseId: 'db-single-arm-row', name: 'Dumbbell Single-Arm Row', sets: 3, reps: '10-12 each', targetWeightKg: 10, restSeconds: 60 },
          { exerciseId: 'tricep-rope-pushdown', name: 'Cable Tricep Rope Pushdown', sets: 3, reps: '12-15', targetWeightKg: 15, restSeconds: 45 },
          { exerciseId: 'bird-dog', name: 'Bird Dog', sets: 3, reps: '8 each side', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 6 (Saturday)',
        title: 'Weekend Rest & Recharge',
        isRest: true,
        focusMuscles: 'Light Recreation',
        recoveryTip: 'Play a sport like badminton, cricket, or football with friends, or take a peaceful rest day.',
        exercises: []
      },
      {
        dayName: 'Day 7 (Sunday)',
        title: 'Weekly Reset & Planning',
        isRest: true,
        focusMuscles: 'Mental & Physical Reset',
        recoveryTip: 'Prepare your gym bag and water bottle for Monday. You crushed this week!',
        exercises: []
      }
    ]
  },
  {
    id: 'plan-hostel-bodyweight',
    title: 'Hostel Room Bodyweight Shred',
    tagline: '100% equipment-free workouts for small spaces',
    level: 'beginner',
    category: 'home-hostel',
    daysPerWeek: 4,
    durationMinutes: 30,
    description: 'Designed for students living in hostels or shared PGs with zero gym equipment. All you need is a 6x3 ft floor space and your own bodyweight.',
    bestFor: 'Students without gym access, rainy days, hostel living, or travelling.',
    days: [
      {
        dayName: 'Day 1',
        title: 'Upper Body Push & Core',
        isRest: false,
        focusMuscles: 'Chest, Shoulders & Abs',
        exercises: [
          { exerciseId: 'pushup-std', name: 'Standard / Knee Push-Up', sets: 3, reps: '10-15', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'bench-dips', name: 'Chair / Bed Edge Dips', sets: 3, reps: '10-12', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'plank-std', name: 'Forearm Plank', sets: 3, reps: '30-45 sec', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'dead-bug', name: 'Dead Bug', sets: 3, reps: '10 each side', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 2',
        title: 'Lower Body & Stability',
        isRest: false,
        focusMuscles: 'Quads, Glutes & Calves',
        exercises: [
          { exerciseId: 'bodyweight-squat', name: 'Bodyweight Air Squats', sets: 4, reps: '15-20', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'glute-bridge', name: 'Floor Glute Bridge', sets: 3, reps: '15', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'standing-calf-raises', name: 'Standing Calf Raises', sets: 3, reps: '20', targetWeightKg: 0, restSeconds: 30 },
          { exerciseId: 'bird-dog', name: 'Bird Dog', sets: 3, reps: '8 each side', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 3',
        title: 'Active Rest Day',
        isRest: true,
        focusMuscles: 'Rest & Recovery',
        recoveryTip: 'Do light hamstring and hip opener stretches in your room. Stay hydrated.',
        exercises: []
      },
      {
        dayName: 'Day 4',
        title: 'Conditioning & Core Burn',
        isRest: false,
        focusMuscles: 'Full Body Cardio & Abs',
        exercises: [
          { exerciseId: 'burpees-no-pushup', name: 'Step-Back Burpee (Low Noise)', sets: 3, reps: '8-10', targetWeightKg: 0, restSeconds: 60 },
          { exerciseId: 'mountain-climbers', name: 'Mountain Climbers', sets: 3, reps: '30 sec', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'pushup-knee', name: 'Knee Push-Ups Burnout', sets: 3, reps: '12-15', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'plank-std', name: 'Plank Hold', sets: 3, reps: '40 sec', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 5',
        title: 'Full Body Flow',
        isRest: false,
        focusMuscles: 'Legs, Chest & Back posture',
        exercises: [
          { exerciseId: 'bodyweight-squat', name: 'Slow Tempo Squats (3s down)', sets: 3, reps: '12', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'pushup-std', name: 'Standard Push-Up', sets: 3, reps: '8-12', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'glute-bridge', name: 'Single or Double Leg Glute Bridge', sets: 3, reps: '12', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'dead-bug', name: 'Dead Bug', sets: 3, reps: '10 each side', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 6',
        title: 'Rest & Recover',
        isRest: true,
        focusMuscles: 'Total Rest',
        recoveryTip: 'Rest your joints and muscles. Grab some fruit and fresh air.',
        exercises: []
      },
      {
        dayName: 'Day 7',
        title: 'Weekend Stretch',
        isRest: true,
        focusMuscles: 'Mobility',
        recoveryTip: 'Full body gentle stretching routine for 10 minutes.',
        exercises: []
      }
    ]
  },
  {
    id: 'plan-dumbbell-minimalist',
    title: 'Dumbbell-Only Minimalist',
    tagline: 'High results with just a pair of dumbbells',
    level: 'beginner',
    category: 'dumbbell-only',
    daysPerWeek: 3,
    durationMinutes: 40,
    description: 'Perfect if your college gym is crowded and all the machines are occupied, or if you bought a basic pair of dumbbells for your room.',
    bestFor: 'Anyone with a single pair of dumbbells or simple home gym set.',
    days: [
      {
        dayName: 'Day 1',
        title: 'Upper Push & Legs',
        isRest: false,
        focusMuscles: 'Quads, Chest & Triceps',
        exercises: [
          { exerciseId: 'goblet-squat', name: 'Goblet Squat (Dumbbell)', sets: 3, reps: '10-12', targetWeightKg: 10, restSeconds: 60 },
          { exerciseId: 'db-bench-press', name: 'Dumbbell Floor or Bench Press', sets: 3, reps: '10-12', targetWeightKg: 10, restSeconds: 60 },
          { exerciseId: 'db-overhead-press', name: 'Dumbbell Overhead Shoulder Press', sets: 3, reps: '8-10', targetWeightKg: 8, restSeconds: 60 },
          { exerciseId: 'db-overhead-tricep-ext', name: 'Overhead Tricep Extension', sets: 3, reps: '10-12', targetWeightKg: 8, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 2',
        title: 'Rest & Walk',
        isRest: true,
        focusMuscles: 'Rest',
        recoveryTip: 'Take an easy stroll across the university quad.',
        exercises: []
      },
      {
        dayName: 'Day 3',
        title: 'Upper Pull & Hamstrings',
        isRest: false,
        focusMuscles: 'Back, Hamstrings & Biceps',
        exercises: [
          { exerciseId: 'db-rdl', name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10-12', targetWeightKg: 12, restSeconds: 60 },
          { exerciseId: 'db-single-arm-row', name: 'Dumbbell Single-Arm Row', sets: 3, reps: '10-12 each', targetWeightKg: 10, restSeconds: 60 },
          { exerciseId: 'db-bicep-curl', name: 'Dumbbell Bicep Curl', sets: 3, reps: '10-12', targetWeightKg: 7.5, restSeconds: 45 },
          { exerciseId: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', sets: 3, reps: '12-15', targetWeightKg: 4, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 4',
        title: 'Rest Day',
        isRest: true,
        focusMuscles: 'Rest',
        recoveryTip: 'Focus on balanced meals and staying hydrated.',
        exercises: []
      },
      {
        dayName: 'Day 5',
        title: 'Full Body Athletic',
        isRest: false,
        focusMuscles: 'Legs, Shoulders & Core',
        exercises: [
          { exerciseId: 'db-walking-lunges', name: 'Dumbbell Lunges', sets: 3, reps: '10 each leg', targetWeightKg: 6, restSeconds: 60 },
          { exerciseId: 'db-hammer-curl', name: 'Dumbbell Hammer Curl', sets: 3, reps: '10-12', targetWeightKg: 8, restSeconds: 45 },
          { exerciseId: 'pushup-std', name: 'Standard Push-Up', sets: 3, reps: '10-12', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'plank-std', name: 'Forearm Plank', sets: 3, reps: '40 sec', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 6',
        title: 'Weekend Rest',
        isRest: true,
        focusMuscles: 'Rest',
        recoveryTip: 'Sleep, relax, and refuel.',
        exercises: []
      },
      {
        dayName: 'Day 7',
        title: 'Weekly Reflection',
        isRest: true,
        focusMuscles: 'Rest',
        recoveryTip: 'Great consistency this week!',
        exercises: []
      }
    ]
  },
  {
    id: 'plan-push-pull-legs',
    title: 'Push - Pull - Legs (PPL)',
    tagline: 'Classic muscle split for dedicated gym-goers',
    level: 'intermediate',
    category: 'ppl',
    daysPerWeek: 4,
    durationMinutes: 50,
    description: 'The beloved split for intermediate lifters. Separates pushing movements (chest, shoulders, triceps), pulling movements (back, biceps), and leg day.',
    bestFor: 'Those with 2-3 months of consistent gym experience ready to step up.',
    days: [
      {
        dayName: 'Day 1',
        title: 'Push Day (Chest, Shoulders, Triceps)',
        isRest: false,
        focusMuscles: 'Pectorals, Anterior Delts, Triceps',
        exercises: [
          { exerciseId: 'db-bench-press', name: 'Dumbbell Flat Bench Press', sets: 4, reps: '8-10', targetWeightKg: 14, restSeconds: 75 },
          { exerciseId: 'db-overhead-press', name: 'Dumbbell Overhead Shoulder Press', sets: 3, reps: '8-10', targetWeightKg: 10, restSeconds: 60 },
          { exerciseId: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', sets: 3, reps: '12-15', targetWeightKg: 5, restSeconds: 45 },
          { exerciseId: 'tricep-rope-pushdown', name: 'Cable Tricep Pushdown', sets: 3, reps: '12-15', targetWeightKg: 17.5, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 2',
        title: 'Pull Day (Back & Biceps)',
        isRest: false,
        focusMuscles: 'Lats, Rhomboids, Biceps',
        exercises: [
          { exerciseId: 'lat-pulldown', name: 'Lat Pulldown', sets: 4, reps: '8-10', targetWeightKg: 35, restSeconds: 75 },
          { exerciseId: 'seated-cable-row', name: 'Seated Cable Row', sets: 3, reps: '10-12', targetWeightKg: 30, restSeconds: 60 },
          { exerciseId: 'face-pulls-cable', name: 'Face Pulls (Rope Cable)', sets: 3, reps: '12-15', targetWeightKg: 15, restSeconds: 45 },
          { exerciseId: 'db-bicep-curl', name: 'Dumbbell Bicep Curl', sets: 3, reps: '10-12', targetWeightKg: 8, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 3',
        title: 'Legs & Core',
        isRest: false,
        focusMuscles: 'Quads, Hamstrings, Glutes, Abs',
        exercises: [
          { exerciseId: 'leg-press-machine', name: '45-Degree Leg Press', sets: 4, reps: '10-12', targetWeightKg: 60, restSeconds: 75 },
          { exerciseId: 'db-rdl', name: 'Dumbbell Romanian Deadlift', sets: 3, reps: '10-12', targetWeightKg: 14, restSeconds: 60 },
          { exerciseId: 'standing-calf-raises', name: 'Calf Raises', sets: 3, reps: '15-20', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'hanging-knee-raise', name: 'Captain’s Chair Knee Raise', sets: 3, reps: '10-12', targetWeightKg: 0, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 4',
        title: 'Rest & Recovery Day',
        isRest: true,
        focusMuscles: 'Systemic Recovery',
        recoveryTip: 'Take a full rest day. Drink water, stretch, and relax.',
        exercises: []
      },
      {
        dayName: 'Day 5',
        title: 'Upper Body Pump (Push & Pull)',
        isRest: false,
        focusMuscles: 'Full Upper Body',
        exercises: [
          { exerciseId: 'db-incline-press', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', targetWeightKg: 12, restSeconds: 60 },
          { exerciseId: 'db-single-arm-row', name: 'Dumbbell Single-Arm Row', sets: 3, reps: '10-12', targetWeightKg: 12, restSeconds: 60 },
          { exerciseId: 'db-lateral-raise', name: 'Dumbbell Lateral Raise', sets: 3, reps: '15', targetWeightKg: 4, restSeconds: 45 },
          { exerciseId: 'db-hammer-curl', name: 'Dumbbell Hammer Curl', sets: 3, reps: '12', targetWeightKg: 8, restSeconds: 45 }
        ]
      },
      {
        dayName: 'Day 6',
        title: 'Rest Day',
        isRest: true,
        focusMuscles: 'Rest',
        recoveryTip: 'Recharge for the upcoming week.',
        exercises: []
      },
      {
        dayName: 'Day 7',
        title: 'Rest Day',
        isRest: true,
        focusMuscles: 'Rest',
        recoveryTip: 'Plan meals and workout times.',
        exercises: []
      }
    ]
  },
  {
    id: 'plan-exam-week-quick',
    title: '25-Min Exam Week Energizer',
    tagline: 'Stay active & beat exam stress without brain fog',
    level: 'beginner',
    category: 'full-body',
    daysPerWeek: 3,
    durationMinutes: 25,
    description: 'During semester exams, stopping completely leads to lethargy and stress. This 25-minute low-fatigue session pumps oxygen to your brain so you study with sharper focus.',
    bestFor: 'Exam weeks, heavy assignment deadlines, or super busy study days.',
    days: [
      {
        dayName: 'Session 1',
        title: 'De-Stress Upper & Core',
        isRest: false,
        focusMuscles: 'Neck, Chest, Back & Abs',
        exercises: [
          { exerciseId: 'pushup-std', name: 'Standard or Knee Push-Up', sets: 2, reps: '10', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'face-pulls-cable', name: 'Face Pulls (Desk Posture Fix)', sets: 2, reps: '15', targetWeightKg: 12.5, restSeconds: 45 },
          { exerciseId: 'dead-bug', name: 'Dead Bug', sets: 2, reps: '10 each side', targetWeightKg: 0, restSeconds: 30 },
          { exerciseId: 'glute-bridge', name: 'Glute Bridge (Relieve Sitting Tension)', sets: 2, reps: '15', targetWeightKg: 0, restSeconds: 30 }
        ]
      },
      {
        dayName: 'Rest Day',
        title: 'Study & Hydration',
        isRest: true,
        focusMuscles: 'Brain Power',
        recoveryTip: 'Take a 5-minute break every 50 minutes of studying. Stand up and stretch.',
        exercises: []
      },
      {
        dayName: 'Session 2',
        title: 'Bloodflow & Legs',
        isRest: false,
        focusMuscles: 'Legs & Core',
        exercises: [
          { exerciseId: 'bodyweight-squat', name: 'Air Squats', sets: 3, reps: '12', targetWeightKg: 0, restSeconds: 45 },
          { exerciseId: 'bird-dog', name: 'Bird Dog', sets: 2, reps: '8 each side', targetWeightKg: 0, restSeconds: 30 },
          { exerciseId: 'plank-std', name: 'Plank', sets: 2, reps: '30 sec', targetWeightKg: 0, restSeconds: 45 }
        ]
      }
    ]
  }
];
