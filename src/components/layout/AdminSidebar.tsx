import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  TrendingUp,
  Settings,
  GraduationCap,
  LogOut,
  ChevronRight,
  ShieldCheck,
  Presentation,
  Search,
  Briefcase,
  MessageSquare,
  Calendar,
  BookOpenCheck,
  PanelLeftClose,
  PanelLeftOpen,
} from 'lucide-react';

const EIXO_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/EIXO%20LEARNING%2F69c8934d2da4206ba4be472d1706d867.png?alt=media&token=959b1659-1d45-48c5-8ab3-2ce0be113b6b';

export const AdminSidebar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    logout,
    currentUser,
    switchUserRole,
    sidebarCollapsed,
    toggleSidebar,
  } = useApp();

  const adminNavItems = [
    { id: 'admin-dashboard', label: 'Admin Overview', icon: LayoutDashboard },
    { id: 'admin-courses', label: 'Course Management', icon: BookOpen },
    { id: 'courses', label: 'Course Library', icon: Search },
    { id: 'admin-students', label: 'Student Directory', icon: Users },
    { id: 'jobs', label: 'Jobs & Careers', icon: Briefcase },
    { id: 'community', label: 'Community', icon: MessageSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'blog', label: 'Accounting Insights', icon: BookOpenCheck },
    { id: 'admin-resources', label: 'Resource Hub', icon: Presentation },
    { id: 'admin-analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'account', label: 'Settings', icon: Settings },
  ];

  const isCoursesActive = currentView === 'courses' || currentView === 'course-detail';
  const isBlogActive = currentView === 'blog' || currentView === 'blog-detail';

  return (
    <aside
      className={`${
        sidebarCollapsed ? 'w-16' : 'w-[225px]'
      } bg-[#070a12] text-slate-300 border-r border-white/10 shrink-0 flex flex-col justify-between hidden md:flex h-screen sticky top-0 z-30 transition-all duration-300 select-none`}
    >
      <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
        {/* Brand Header */}
        <div className={`pb-2.5 border-b border-white/10 flex items-center ${sidebarCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'}`}>
          <button
            onClick={() => navigateTo('admin-dashboard')}
            className="flex items-center group focus:outline-none transition-transform hover:scale-102"
            title="EIXO Faculty Admin"
          >
            <img
              src={EIXO_LOGO_URL}
              alt="EIXO Learning"
              referrerPolicy="no-referrer"
              className={`${sidebarCollapsed ? 'h-8' : 'h-9'} w-auto object-contain drop-shadow-md`}
            />
          </button>

          <button
            onClick={toggleSidebar}
            className="p-1 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <PanelLeftOpen className="w-3.5 h-3.5 text-indigo-400" /> : <PanelLeftClose className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* Admin Badge Banner */}
        {currentUser && !sidebarCollapsed && (
          <div className="p-2.5 bg-[#0d1220] rounded-2xl border border-white/10 flex items-center gap-2.5 shadow-xs animate-in fade-in">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{currentUser?.name || 'Administrator'}</p>
              <p className="text-[10px] text-indigo-300 font-semibold tracking-wide uppercase">Faculty Admin</p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="space-y-0.5">
          {!sidebarCollapsed && (
            <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
              Admin Command
            </div>
          )}
          <nav className="space-y-0.5">
            {adminNavItems.map((item) => {
              const Icon = item.icon;
              let isActive = currentView === item.id;
              if (item.id === 'courses' && isCoursesActive) isActive = true;
              if (item.id === 'blog' && isBlogActive) isActive = true;

              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.id)}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
                  } rounded-xl text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-indigo-500 pl-2'
                      : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && isActive && <ChevronRight className="w-3.5 h-3.5 text-indigo-400" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Switcher */}
      <div className={`p-2.5 border-t border-white/10 space-y-1 bg-[#05080f] ${sidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
        <button
          onClick={() => switchUserRole('student')}
          title="Switch to Student Campus"
          className={`w-full flex items-center ${
            sidebarCollapsed ? 'justify-center p-2' : 'gap-2 px-2.5 py-1.5'
          } text-xs font-medium text-emerald-300 bg-emerald-950/30 hover:bg-emerald-900/40 hover:text-white rounded-xl transition-colors border border-emerald-500/20`}
        >
          <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0" />
          {!sidebarCollapsed && <span className="truncate">Student Campus</span>}
        </button>

        <button
          onClick={logout}
          title="Log out"
          className={`w-full flex items-center ${
            sidebarCollapsed ? 'justify-center p-2' : 'gap-2 px-2.5 py-1.5'
          } text-xs font-medium text-rose-400 hover:bg-rose-950/30 rounded-xl transition-colors`}
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {!sidebarCollapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
};
