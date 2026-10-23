import React, { useState } from 'react';
import {
  Search,
  Filter,
  Dumbbell,
  AlertTriangle,
  Lightbulb,
  ShieldCheck,
  X,
  Play,
  ArrowRight,
  Info
} from 'lucide-react';
import { EXERCISES_DATA } from '../data/exercisesData';
import { Exercise } from '../types';
import { useWorkout } from '../context/WorkoutContext';

interface ExerciseLibraryViewProps {
  setCurrentTab: (tab: string) => void;
}

export const ExerciseLibraryView: React.FC<ExerciseLibraryViewProps> = ({ setCurrentTab }) => {
  const { activeWorkout, addExerciseToWorkout, startWorkout } = useWorkout();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [selectedEquipment, setSelectedEquipment] = useState<string>('All');
  const [activeModalExercise, setActiveModalExercise] = useState<Exercise | null>(null);

  const muscles = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Full Body'];
  const equipmentOptions = ['All', 'Bodyweight', 'Dumbbells', 'Barbell', 'Cable/Machine'];

  const filteredExercises = EXERCISES_DATA.filter(ex => {
    const matchesSearch =
      ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.muscleGroup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ex.secondaryMuscles && ex.secondaryMuscles.some(m => m.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesMuscle = selectedMuscle === 'All' || ex.muscleGroup === selectedMuscle;
    const matchesEquipment = selectedEquipment === 'All' || ex.equipment === selectedEquipment;

    return matchesSearch && matchesMuscle && matchesEquipment;
  });

  const handleExerciseAction = (exercise: Exercise) => {
    if (activeWorkout) {
      addExerciseToWorkout(exercise.id);
      setActiveModalExercise(null);
      setCurrentTab('tracker');
    } else {
      startWorkout(`Focus: ${exercise.name}`, [
        {
          exerciseId: exercise.id,
          name: exercise.name,
          muscleGroup: exercise.muscleGroup,
          defaultSets: exercise.defaultSets,
          defaultReps: exercise.defaultReps,
          defaultWeightKg: exercise.defaultWeightKg
        }
      ]);
      setActiveModalExercise(null);
      setCurrentTab('tracker');
    }
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-6xl mx-auto px-4 sm:px-6 pt-5">
      {/* 1. Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <span>Technique & Form Manual</span>
          <span aria-hidden="true">·</span>
          <span>Injury Prevention</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Exercise Library
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Learn textbook form, avoid common joint-wrecking mistakes, and explore beginner-friendly progressions.
        </p>
      </div>

      {/* 2. Search & Filters Bar */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-sm space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search exercises by name, body part, or barbell/dumbbell..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 text-xs font-semibold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Muscle Group Filter Tabs */}
        <div>
          <div className="text-xs font-bold text-slate-500 mb-2">Target Muscle</div>
          <div className="flex flex-wrap gap-1.5">
            {muscles.map(m => (
              <button
                key={m}
                onClick={() => setSelectedMuscle(m)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                  selectedMuscle === m
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Filter */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 mr-1">Equipment:</span>
          {equipmentOptions.map(eq => (
            <button
              key={eq}
              onClick={() => setSelectedEquipment(eq)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors ${
                selectedEquipment === eq
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {eq}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Exercises Count & Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="text-xs text-slate-500 font-medium">
            Showing <span className="font-bold text-slate-800">{filteredExercises.length}</span> exercises
          </div>
        </div>

        {filteredExercises.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-sm max-w-md mx-auto">
            <Info className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <h3 className="font-bold text-slate-800 text-base">No exercises found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your search terms or clearing the filters.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedMuscle('All');
                setSelectedEquipment('All');
              }}
              className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map(exercise => (
              <div
                key={exercise.id}
                onClick={() => setActiveModalExercise(exercise)}
                className="bg-white rounded-3xl p-5 border border-slate-200/90 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group active:scale-[0.99]"
              >
                <div className="space-y-2.5">
                  {/* Clean unboxed metadata with separators */}
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <span className="text-emerald-700 font-semibold">{exercise.muscleGroup}</span>
                    <span aria-hidden="true">·</span>
                    <span>{exercise.equipment}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{exercise.difficulty}</span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                      {exercise.name}
                    </h3>
                    {exercise.secondaryMuscles && exercise.secondaryMuscles.length > 0 && (
                      <p className="text-xs text-slate-400 font-medium mt-0.5">
                        Secondary: {exercise.secondaryMuscles.join(', ')}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {exercise.instructions[0]}
                  </p>
                </div>

                <div className="pt-3.5 mt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-700 font-semibold flex items-center gap-1 group-hover:underline">
                    View Form Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-slate-400 font-mono text-[11px]">
                    {exercise.defaultSets} × {exercise.defaultReps}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 4. Detailed Exercise Form Modal */}
      {activeModalExercise && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-start justify-between gap-4 bg-slate-50/70">
              <div>
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold uppercase tracking-wider">
                  <span>{activeModalExercise.muscleGroup}</span>
                  <span aria-hidden="true">·</span>
                  <span>{activeModalExercise.equipment}</span>
                  <span aria-hidden="true">·</span>
                  <span className="capitalize">{activeModalExercise.difficulty}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                  {activeModalExercise.name}
                </h2>
                {activeModalExercise.secondaryMuscles && (
                  <p className="text-xs text-slate-500 font-medium mt-0.5">
                    Also targets: {activeModalExercise.secondaryMuscles.join(', ')}
                  </p>
                )}
              </div>

              <button
                onClick={() => setActiveModalExercise(null)}
                className="w-8 h-8 rounded-xl bg-slate-200/60 text-slate-600 hover:text-slate-900 flex items-center justify-center transition-colors shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-5 max-h-[60vh]">
              {/* Step by Step Execution Instructions */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Step-by-Step Instructions
                </h4>
                <ol className="space-y-2 text-xs text-slate-700">
                  {activeModalExercise.instructions.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Common Technique Mistakes */}
              <div className="p-4 bg-rose-50/80 rounded-2xl border border-rose-100 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  <span>Common Technique Mistakes to Avoid</span>
                </div>
                <ul className="space-y-1.5 text-xs text-rose-950 pl-5 list-disc leading-relaxed">
                  {activeModalExercise.commonMistakes.map((mistake, idx) => (
                    <li key={idx}>{mistake}</li>
                  ))}
                </ul>
              </div>

              {/* Beginner Alternative */}
              <div className="p-4 bg-blue-50/70 rounded-2xl border border-blue-100 flex items-start gap-3">
                <Lightbulb className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-blue-900">
                    Beginner Alternative / Scaling:
                  </div>
                  <div className="text-xs text-blue-800 mt-0.5 leading-relaxed">
                    {activeModalExercise.alternatives}
                  </div>
                </div>
              </div>

              {/* Safety & Form Tip */}
              <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-100 flex items-start gap-3">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-emerald-900">
                    Dosth Safety Cue:
                  </div>
                  <div className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                    {activeModalExercise.safetyTip}
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between gap-3">
              <button
                onClick={() => setActiveModalExercise(null)}
                className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-900"
              >
                Close
              </button>

              <button
                onClick={() => handleExerciseAction(activeModalExercise)}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>
                  {activeWorkout ? 'Add to Active Workout' : 'Start Workout with This'}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
