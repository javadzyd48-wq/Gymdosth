import React, { useState } from 'react';
import {
  User,
  ShieldCheck,
  Download,
  Upload,
  RotateCcw,
  Check,
  AlertTriangle,
  Heart,
  Lock,
  Smartphone,
  ExternalLink,
  Info
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { FitnessLevel, WorkoutLocation, EquipmentAvailable } from '../types';

export const ProfileSettingsView: React.FC = () => {
  const {
    profile,
    updateProfile,
    resetAllData,
    exportDataJson,
    importDataJson
  } = useWorkout();

  const [nameInput, setNameInput] = useState(profile.name);
  const [levelInput, setLevelInput] = useState<FitnessLevel>(profile.fitnessLevel);
  const [locationInput, setLocationInput] = useState<WorkoutLocation>(profile.workoutLocation);
  const [equipmentInput, setEquipmentInput] = useState<EquipmentAvailable>(profile.equipment);
  const [preferredDaysInput, setPreferredDaysInput] = useState<string[]>(profile.preferredDays);
  const [goalInput, setGoalInput] = useState<number>(profile.weeklyGoalWorkouts);

  const [savedSuccess, setSavedSuccess] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);

  const daysOfWeek = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const toggleDay = (day: string) => {
    setPreferredDaysInput(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: nameInput.trim() || 'Dosth',
      fitnessLevel: levelInput,
      workoutLocation: locationInput,
      equipment: equipmentInput,
      preferredDays: preferredDaysInput,
      weeklyGoalWorkouts: goalInput
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleExportData = () => {
    const jsonStr = exportDataJson();
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gymdosth_backup_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = event => {
      try {
        const text = event.target?.result as string;
        const success = importDataJson(text);
        if (success) {
          setSavedSuccess(true);
          setTimeout(() => setSavedSuccess(false), 2500);
        } else {
          setImportError('Invalid backup file format.');
        }
      } catch {
        setImportError('Failed to read or parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 pb-24 md:pb-12 max-w-4xl mx-auto px-4 sm:px-6 pt-5">
      {/* 1. Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider">
          <span>Personal Preferences</span>
          <span aria-hidden="true">·</span>
          <span>Device Storage</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-0.5">
          Profile & Settings
        </h1>
        <p className="text-sm text-slate-600 mt-1 max-w-2xl">
          Customize your fitness background, equipment availability, and workout days. Your data remains 100% on your device.
        </p>
      </div>

      {/* 2. Main Profile Form */}
      <form onSubmit={handleSaveProfile} className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-lg">
              {nameInput ? nameInput.charAt(0).toUpperCase() : 'D'}
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Training Profile</h2>
              <p className="text-xs text-slate-500">Configure your personal preferences</p>
            </div>
          </div>

          {savedSuccess && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-in fade-in">
              <Check className="w-4 h-4" />
              <span>Saved successfully!</span>
            </div>
          )}
        </div>

        {/* Name Input */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Your Name / Nickname
          </label>
          <input
            type="text"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            placeholder="e.g. Arjun, Priya, Rahul"
            className="w-full sm:w-80 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
          />
        </div>

        {/* Fitness Experience Level */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Fitness Experience Level
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {(
              [
                { id: 'beginner', title: 'Beginner', desc: '0-6 months, learning movement patterns & safe form' },
                { id: 'intermediate', title: 'Intermediate', desc: '6+ months, comfortable with compound lifts' },
                { id: 'advanced', title: 'Advanced', desc: 'Consistent training, targeting specific strength goals' }
              ] as const
            ).map(lvl => (
              <button
                type="button"
                key={lvl.id}
                onClick={() => setLevelInput(lvl.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  levelInput === lvl.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{lvl.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">{lvl.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Workout Location */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Where do you train most often?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {(
              [
                { id: 'college-hostel', title: 'College / Hostel Room', desc: 'Minimal floor space, quiet workouts' },
                { id: 'commercial-gym', title: 'Gym / Fitness Center', desc: 'Full machines, barbells & cables' },
                { id: 'home', title: 'Home / Terrace', desc: 'Comfortable living space or outdoors' }
              ] as const
            ).map(loc => (
              <button
                type="button"
                key={loc.id}
                onClick={() => setLocationInput(loc.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  locationInput === loc.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{loc.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">{loc.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Equipment Available */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Available Equipment
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {(
              [
                { id: 'bodyweight', title: 'Bodyweight Only', desc: 'Zero gear required' },
                { id: 'dumbbells-only', title: 'Dumbbells / Basic Pair', desc: 'Compact weights, high versatility' },
                { id: 'full-gym', title: 'Full Gym Setup', desc: 'Barbells, cables, racks & machines' }
              ] as const
            ).map(eq => (
              <button
                type="button"
                key={eq.id}
                onClick={() => setEquipmentInput(eq.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  equipmentInput === eq.id
                    ? 'border-emerald-600 bg-emerald-50/70 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="text-xs font-bold text-slate-900">{eq.title}</div>
                <div className="text-[11px] text-slate-500 mt-1 leading-snug">{eq.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Preferred Workout Days */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-2">
            Preferred Workout Days
          </label>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map(day => {
              const isSelected = preferredDaysInput.includes(day);
              return (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`w-11 h-11 rounded-2xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>
          <p className="text-[11px] text-slate-500 mt-2">
            Selected: {preferredDaysInput.join(', ') || 'None selected'}
          </p>
        </div>

        {/* Save Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            <span>Save Profile Preferences</span>
          </button>
        </div>
      </form>

      {/* 3. Data Privacy & Local Storage Transparency (Requirement 2 & 3) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-sm space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Data Privacy & Offline Storage
            </h3>
            <p className="text-xs text-slate-500">
              Zero cloud accounts required · 100% Free Forever
            </p>
          </div>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed space-y-2">
          <p>
            <strong>Where is my data stored?</strong> All workout logs, customized sets, active routines, and preferences are saved directly inside your device browser’s secure <code className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-800 font-mono">localStorage</code>.
          </p>
          <p>
            <strong>Do I need a paid API or monthly subscription?</strong> No. GymDosth requires zero subscriptions, zero credit cards, and zero external tracking services. It runs reliably offline on your mobile browser.
          </p>
          <p>
            <strong>Cloud Storage & Multi-Device Sync Note:</strong> If you wish to sync data across multiple devices (e.g., college laptop and phone), you can export your backup JSON file below and import it onto any other device anytime. For automated cloud sync, free-tier integrations like Firebase Authentication and Firestore can be connected with zero monthly subscription cost.
          </p>
        </div>

        {/* Data Backup & Restore Controls */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleExportData}
            className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-2 transition-colors"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Export Data (JSON Backup)</span>
          </button>

          <label className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl flex items-center gap-2 cursor-pointer transition-colors">
            <Upload className="w-4 h-4 text-slate-600" />
            <span>Import Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            type="button"
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2.5 text-rose-600 hover:bg-rose-50 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset All Data</span>
          </button>
        </div>

        {importError && (
          <div className="text-xs text-rose-600 bg-rose-50 p-3 rounded-xl border border-rose-200">
            {importError}
          </div>
        )}
      </div>

      {/* 4. Complete Health, Safety & Disclaimer (Requirement 4) */}
      <div className="bg-slate-100 rounded-3xl p-6 border border-slate-200 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Health Guidance & Safety Guidelines</span>
        </div>

        <div className="text-xs text-slate-600 leading-relaxed space-y-2">
          <p>
            <strong>1. General Fitness Information:</strong> The workouts, movement cues, and guidelines in GymDosth are intended solely for general fitness, athletic conditioning, and healthy habit development. They do not constitute medical diagnosis, physical therapy, or personalized clinical prescription.
          </p>
          <p>
            <strong>2. Warm-Up & Gradual Progression:</strong> Always perform 3–5 minutes of dynamic warm-ups (arm swings, bodyweight squats, torso twists) prior to lifting weights. Never perform sudden heavy maxes without warming up joints.
          </p>
          <p>
            <strong>3. Hydration & Adequate Rest:</strong> Drink plenty of clean water, particularly in hot or humid Indian weather conditions. Rest days are mandatory for muscle repair and central nervous system recovery.
          </p>
          <p>
            <strong>4. Pre-Existing Conditions:</strong> If you experience dizziness, shortness of breath, joint pain, or have an existing cardiovascular or orthopedic condition, stop immediately and consult a certified medical physician.
          </p>
        </div>
      </div>

      {/* 5. Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Reset All Workout Data?</h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  This will clear your logged workouts, habit checklist, and profile settings from this browser.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetAllData();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
