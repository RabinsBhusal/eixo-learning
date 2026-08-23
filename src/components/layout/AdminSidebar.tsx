import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  TrendingUp,
  FileText,
  Settings,
  GraduationCap,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Presentation,
  Search,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { currentView, navigateTo, logout, currentUser, switchUserRole } = useApp();

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { id: 'admin-courses', label: 'Course Management', icon: BookOpen },
    { id: 'courses', label: 'Browse Public Catalogue', icon: Search },
    { id: 'admin-students', label: 'Student Directory', icon: Users },
    { id: 'admin-resources', label: 'Slides & Resource Library', icon: Presentation },
    { id: 'admin-analytics', label: 'Enrolments & Analytics', icon: TrendingUp },
    { id: 'account', label: 'Platform Settings', icon: Settings },
  ];

  const isCoursesActive = currentView === 'courses' || currentView === 'course-detail';

  return (
    <aside className="w-64 bg-[#070a12] text-slate-300 border-r border-white/10 shrink-0 flex flex-col justify-between hidden md:flex h-screen sticky top-0 z-30">
      <div className="p-4 space-y-5 overflow-y-auto">
        
        {/* Brand Header */}
        <div className="pb-3 border-b border-white/10 flex items-center justify-between">
          <button
            onClick={() => navigateTo('admin-dashboard')}
            className="flex items-center gap-2.5 text-left group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-indigo-600/30 text-indigo-400 border border-indigo-500/40 flex items-center justify-center font-extrabold text-sm shadow-[0_0_12px_rgba(99,102,241,0.2)]">
              E
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight text-white flex items-center gap-1">
                <span>EIXO</span>
                <span className="text-indigo-400">LEARNING</span>
              </div>
              <span className="text-[9px] uppercase tracking-widest text-indigo-400 font-semibold block">
                Faculty Admin Command
              </span>
            </div>
          </button>
        </div>

        {/* Admin Badge Banner */}
        <div className="p-3 bg-[#0d1220] rounded-xl border border-white/10 flex items-center gap-3 shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Administrator'}</p>
            <p className="text-[10px] text-indigo-300 font-semibold tracking-wide uppercase">Faculty Lead</p>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-1">
          <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Management
          </div>
          <nav className="space-y-1">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === 'courses' ? isCoursesActive : currentView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-200 font-bold border-l-3 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Switcher */}
      <div className="p-4 border-t border-white/10 space-y-1.5 bg-[#05080f]">
        <button
          onClick={() => switchUserRole('student')}
          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 hover:text-white rounded-xl transition-colors border border-emerald-500/20"
        >
          <GraduationCap className="w-4 h-4 text-emerald-400" />
          <span>Switch to Student View</span>
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
