import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  UserCheck,
  TrendingUp,
  FileText,
  Settings,
  GraduationCap,
  LogOut,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const AdminSidebar: React.FC = () => {
  const { currentView, navigateTo, logout, currentUser, switchUserRole } = useApp();

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { id: 'admin-courses', label: 'Course Management', icon: BookOpen },
    { id: 'admin-students', label: 'Student Directory', icon: Users },
    { id: 'admin-resources', label: 'Resource Library', icon: FileText },
    { id: 'admin-analytics', label: 'Enrolments & Analytics', icon: TrendingUp },
    { id: 'account', label: 'Platform Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#070a12] text-slate-300 border-r border-white/10 shrink-0 flex flex-col justify-between hidden md:flex h-[calc(100vh-4rem)] sticky top-16">
      <div className="p-4 space-y-6">
        
        {/* Admin Badge Banner */}
        <div className="p-3 bg-[#0d1220] rounded-xl border border-white/10 flex items-center gap-3 shadow-xs">
          <div className="w-10 h-10 rounded-lg bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Administrator'}</p>
            <p className="text-[10px] text-indigo-300 font-semibold tracking-wide uppercase">EIXO Owner / Admin</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {adminNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-200 font-bold border-l-3 border-indigo-400 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
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

      {/* Bottom Switcher */}
      <div className="p-4 border-t border-white/10 space-y-1.5">
        <button
          onClick={() => switchUserRole('student')}
          className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-emerald-400 hover:bg-emerald-950/40 rounded-lg transition-colors border border-emerald-500/20"
        >
          <GraduationCap className="w-4 h-4" />
          <span>Switch to Student View</span>
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
