import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Search,
  Award,
  FileText,
  User as UserIcon,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
} from 'lucide-react';

export const StudentSidebar: React.FC = () => {
  const { currentView, navigateTo, logout, currentUser, switchUserRole } = useApp();

  const navItems = [
    { id: 'student-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'my-courses', label: 'My Courses', icon: BookOpen },
    { id: 'courses', label: 'Browse Courses', icon: Search },
    { id: 'progress', label: 'Progress & Badges', icon: Award },
    { id: 'resources-hub', label: 'Resources & Templates', icon: FileText },
    { id: 'account', label: 'Account Settings', icon: UserIcon },
  ];

  return (
    <aside className="w-64 bg-[#070a12] border-r border-white/10 shrink-0 flex flex-col justify-between hidden md:flex h-[calc(100vh-4rem)] sticky top-16 text-slate-300">
      <div className="p-4 space-y-6">
        {/* User Mini Profile */}
        {currentUser && (
          <div className="p-3 bg-[#0d1220] rounded-xl border border-white/10 flex items-center gap-3 shadow-xs">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-10 h-10 rounded-full object-cover border border-emerald-500/40"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.jobTitle || 'Student Member'}</p>
              <span className="inline-block px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[9px] font-bold rounded">
                Learner
              </span>
            </div>
          </div>
        )}

        {/* Nav Links */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 font-bold border-l-3 border-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-3.5 h-3.5 text-emerald-400" />}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom controls */}
      <div className="p-4 border-t border-white/10 space-y-1">
        <button
          onClick={() => switchUserRole('admin')}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-indigo-400 hover:bg-indigo-950/40 hover:text-indigo-300 rounded-lg transition-colors border border-indigo-500/20"
        >
          <Shield className="w-4 h-4" />
          <span>Switch to Admin View</span>
        </button>

        <button
          onClick={() => navigateTo('about')}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-slate-400 hover:bg-white/5 hover:text-slate-200 rounded-lg transition-colors"
        >
          <HelpCircle className="w-4 h-4 text-slate-400" />
          <span>Help & Support</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
