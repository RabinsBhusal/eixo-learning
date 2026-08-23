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
  Presentation,
  Scale,
  Sparkles,
  GraduationCap,
} from 'lucide-react';

export const StudentSidebar: React.FC = () => {
  const { currentView, navigateTo, logout, currentUser, switchUserRole } = useApp();

  const navItems = [
    { id: 'student-dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
    { id: 'my-courses', label: 'My Enrolled Courses', icon: BookOpen },
    { id: 'courses', label: 'Browse Courses', icon: Search },
    { id: 'resources-hub', label: 'Google Slides & Resources', icon: Presentation },
    { id: 'progress', label: 'Progress & Badges', icon: Award },
    { id: 'account', label: 'Account Settings', icon: UserIcon },
  ];

  const isCoursesActive = currentView === 'courses' || currentView === 'course-detail';

  return (
    <aside className="w-64 bg-[#070a12] border-r border-white/10 shrink-0 flex flex-col justify-between hidden md:flex h-screen sticky top-0 text-slate-300 z-30">
      <div className="p-4 space-y-5 overflow-y-auto">
        
        {/* Brand Header */}
        <div className="pb-3 border-b border-white/10 flex items-center justify-between">
          <button
            onClick={() => navigateTo('student-dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-extrabold text-sm shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              E
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                <span>EIXO</span>
                <span className="text-emerald-400">LEARNING</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-emerald-400 font-semibold block">
                Student Campus
              </span>
            </div>
          </button>
        </div>

        {/* User Mini Profile */}
        {currentUser && (
          <div className="p-3 bg-[#0d1220] rounded-xl border border-white/10 flex items-center gap-3 shadow-xs">
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
              alt={currentUser.name}
              referrerPolicy="no-referrer"
              className="w-9 h-9 rounded-full object-cover border border-emerald-500/40 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.jobTitle || 'Student Member'}</p>
              <span className="inline-block px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded mt-0.5">
                Active Learner
              </span>
            </div>
          </div>
        )}

        {/* Navigation Section */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Navigation
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === 'courses' ? isCoursesActive : currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-300 font-bold border-l-3 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
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

        {/* Quick Launch Courses */}
        <div className="pt-2">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Active Study
          </div>
          <button
            onClick={() => navigateTo('course-player', 'course-xero-1')}
            className="w-full mt-1 p-2.5 bg-[#0e1628] hover:bg-[#131f38] border border-emerald-500/20 rounded-xl text-left transition-colors group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wide">
                Primary Course
              </span>
              <span className="text-[10px] font-mono text-emerald-300 font-bold">45%</span>
            </div>
            <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5 truncate">
              Xero Accounting Masterclass
            </div>
            <div className="w-full bg-slate-800 h-1 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full w-[45%] rounded-full" />
            </div>
          </button>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="p-4 border-t border-white/10 space-y-1.5 bg-[#05080f]">
        <button
          onClick={() => switchUserRole('admin')}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-indigo-300 bg-indigo-950/40 hover:bg-indigo-900/50 hover:text-white rounded-xl transition-colors border border-indigo-500/20"
        >
          <Shield className="w-4 h-4 text-indigo-400" />
          <span>Switch to Faculty Admin</span>
        </button>

        <button
          onClick={logout}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-950/40 rounded-xl transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
};
