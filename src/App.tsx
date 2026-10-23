import React, { useState } from 'react';
import { WorkoutProvider, useWorkout } from './context/WorkoutContext';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { Dashboard } from './components/Dashboard';
import { WorkoutPlansView } from './components/WorkoutPlansView';
import { LiveWorkoutTracker } from './components/LiveWorkoutTracker';
import { ExerciseLibraryView } from './components/ExerciseLibraryView';
import { ProgressView } from './components/ProgressView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { RestTimerFloating } from './components/RestTimerFloating';

function MainApp() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-emerald-100 selection:text-emerald-900">
      {/* Top Bar following Top Bar Contract */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentTab === 'dashboard' && (
          <Dashboard setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 'plans' && (
          <WorkoutPlansView setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 'tracker' && (
          <LiveWorkoutTracker setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 'library' && (
          <ExerciseLibraryView setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 'progress' && (
          <ProgressView setCurrentTab={setCurrentTab} />
        )}
        {currentTab === 'settings' && (
          <ProfileSettingsView />
        )}
      </main>

      {/* Global Floating Rest Timer (active when countdown is ticking) */}
      <RestTimerFloating />

      {/* Mobile Fixed Bottom Navigation */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />
    </div>
  );
}

export default function App() {
  return (
    <WorkoutProvider>
      <MainApp />
    </WorkoutProvider>
  );
}
