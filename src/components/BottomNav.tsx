import React from 'react';
import { Home, Calendar, Activity, BookOpen, User } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

interface BottomNavProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, setCurrentTab }) => {
  const { activeWorkout } = useWorkout();

  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'plans', label: 'Plans', icon: Calendar },
    { id: 'tracker', label: 'Workout', icon: Activity, hasBadge: !!activeWorkout },
    { id: 'library', label: 'Exercises', icon: BookOpen },
    { id: 'settings', label: 'Profile', icon: User }
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 pb-safe">
      <div className="grid grid-cols-5 items-center h-16 max-w-lg mx-auto">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className="relative flex flex-col items-center justify-center min-h-[44px] py-1 text-slate-500 transition-colors focus-visible:outline-none"
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform ${
                    isActive ? 'text-emerald-700 stroke-[2.4px] scale-105' : 'text-slate-500 stroke-[1.8px]'
                  }`}
                />
                {item.hasBadge && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse" />
                )}
              </div>
              <span
                className={`text-[11px] font-medium tracking-tight mt-1 transition-colors ${
                  isActive ? 'text-emerald-700 font-semibold' : 'text-slate-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
