import { StudentTip, HabitGoal } from '../types';

export const STUDENT_TIPS_DATA: StudentTip[] = [
  {
    id: 'tip-1',
    category: 'Nutrition',
    title: 'High Protein on a Student Budget',
    tip: 'No expensive supplements needed. Top pocket-friendly Indian protein sources: Boiled eggs (₹6-7 each = 6g protein), roasted chana/sattu, soya chunks (52% protein, ₹20 packet gives 50g+ protein), paneer, and thick curd/dahi.',
    badge: 'Budget Fuel'
  },
  {
    id: 'tip-2',
    category: 'Technique',
    title: 'Zero Ego Lifting — Form Over Pride',
    tip: 'The weight on the barbell never defines your worth. A 10kg bench press with clean control and full range builds more muscle and protects your shoulders far better than a half-rep 40kg bounce.',
    badge: 'Form First'
  },
  {
    id: 'tip-3',
    category: 'Hostel Hack',
    title: 'Hostel Room Gym Space',
    tip: 'If your college hostel has no gym, use a sturdy chair for dips and elevated pushups, and fill a strong backpack with textbooks for adjustable weight rows and curls.',
    badge: 'Room Hack'
  },
  {
    id: 'tip-4',
    category: 'Recovery',
    title: 'Sleep is Free Growth Hormone',
    tip: 'Muscles do not grow in the gym; they tear in the gym and rebuild when you sleep. Aim for 7 to 8 hours of solid sleep. Late-night phone scrolling steals your recovery.',
    badge: 'Rest Well'
  },
  {
    id: 'tip-5',
    category: 'Mindset',
    title: 'Consistency Beats Intensity',
    tip: 'A focused 35-minute workout 3 times a week done consistently for 3 months will give you 10x more results than killing yourself for 2 hours once every two weeks.',
    badge: 'Habit Building'
  },
  {
    id: 'tip-6',
    category: 'Nutrition',
    title: 'Hydration Prevents Mid-Set Cramps',
    tip: 'Keep a 1-litre reusable bottle in your college bag. Aim for 2.5 to 3 litres throughout the day. Dehydration drops muscular strength by up to 15%.',
    badge: 'Hydrate'
  }
];

export const INITIAL_HABITS: HabitGoal[] = [
  { id: 'h-1', title: 'Complete today\'s planned workout', category: 'workout', completed: false },
  { id: 'h-2', title: 'Drink 2.5 litres of water', category: 'hydration', completed: true },
  { id: 'h-3', title: '5-minute dynamic warm-up before lifting', category: 'workout', completed: true },
  { id: 'h-4', title: 'Include 1 good protein source with meals', category: 'nutrition', completed: false },
  { id: 'h-5', title: 'Aim for 7+ hours of quality sleep', category: 'recovery', completed: false }
];
