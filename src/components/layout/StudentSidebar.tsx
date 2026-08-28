import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  BookOpen,
  Search,
  CheckSquare,
  BookOpenCheck,
  TrendingUp,
  Briefcase,
  MessageSquare,
  Calendar,
  Sparkles,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  ChevronRight,
  Shield,
  PanelLeftClose,
  PanelLeftOpen,
  Play,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { HelpModal } from './HelpModal';

const EIXO_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/EIXO%20LEARNING%2F69c8934d2da4206ba4be472d1706d867.png?alt=media&token=959b1659-1d45-48c5-8ab3-2ce0be113b6b';

export const StudentSidebar: React.FC = () => {
  const {
    currentView,
    navigateTo,
    logout,
    currentUser,
    switchUserRole,
    sidebarCollapsed,
    toggleSidebar,
    courses,
    progress,
  } = useApp();

  const [myCoursesExpanded, setMyCoursesExpanded] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  // Active Enrolled Courses with real progress
  const enrolledCoursesList = [
    {
      id: 'course-xero-1',
      title: 'Xero Accounting Masterclass',
      progressPercent: 45,
      level: 'Core Track',
    },
    {
      id: 'course-fa-1',
      title: 'Financial Accounting Fundamentals',
      progressPercent: 72,
      level: 'ACCA Aligned',
    },
    {
      id: 'course-ma-1',
      title: 'Management Accounting & Costing',
      progressPercent: 31,
      level: 'CIMA Aligned',
    },
  ];

  const isCoursesActive = currentView === 'courses' || currentView === 'course-detail';
  const isBlogActive = currentView === 'blog' || currentView === 'blog-detail';
  const isMyCoursesActive = currentView === 'my-courses' || currentView === 'course-player';

  return (
    <>
      <aside
        className={`${
          sidebarCollapsed ? 'w-16' : 'w-[225px]'
        } bg-[#070a12] border-r border-white/10 shrink-0 flex flex-col justify-between hidden md:flex h-[calc(100vh-3.5rem)] sticky top-14 text-slate-300 z-30 transition-all duration-300 select-none`}
      >
        {/* Top Scrollable Area */}
        <div className="p-3 space-y-3 overflow-y-auto flex-1 custom-scrollbar">
          
          {/* Header Brand */}
          <div
            className={`pb-2.5 border-b border-white/10 flex items-center ${
              sidebarCollapsed ? 'justify-center flex-col gap-2' : 'justify-between'
            }`}
          >
            <button
              onClick={() => navigateTo('student-dashboard')}
              className="flex items-center group focus:outline-none transition-transform hover:scale-102"
              title="EIXO Learning"
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
              {sidebarCollapsed ? (
                <PanelLeftOpen className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <PanelLeftClose className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* User Mini Profile with Level & Course Progress */}
          {currentUser && !sidebarCollapsed && (
            <div className="relative">
              <div
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="p-2.5 bg-[#0d1220] hover:bg-[#11182c] rounded-2xl border border-white/10 transition-all cursor-pointer shadow-xs group"
              >
                <div className="flex items-center gap-2.5">
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-full object-cover border border-emerald-500/40 shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-white truncate leading-tight group-hover:text-emerald-300 transition-colors">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-slate-400 truncate leading-tight">
                      {currentUser.jobTitle || 'Junior Financial Analyst'}
                    </p>
                  </div>
                </div>

                {/* Level & Progress Metric Pill */}
                <div className="mt-2 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                  <span className="text-emerald-400 font-mono font-bold">Level 4</span>
                  <span className="text-slate-400 font-mono">68% progress</span>
                </div>
                <div className="w-full bg-slate-800 h-1 rounded-full mt-1 overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[68%] rounded-full" />
                </div>
              </div>

              {/* Profile Dropdown Popover */}
              {profileDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 p-2 bg-[#0b0f19] border border-white/10 rounded-2xl shadow-2xl z-40 space-y-1 animate-in fade-in zoom-in-95 text-xs">
                  <button
                    onClick={() => {
                      navigateTo('account');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-slate-400" />
                    <span>Profile & Settings</span>
                  </button>
                  <button
                    onClick={() => {
                      navigateTo('progress');
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Certificates & Badges</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Group 1: LEARN */}
          <div className="space-y-0.5">
            {!sidebarCollapsed && (
              <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Learn
              </div>
            )}

            {/* 1. Dashboard */}
            <button
              onClick={() => navigateTo('student-dashboard')}
              title={sidebarCollapsed ? 'Dashboard' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                currentView === 'student-dashboard'
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className={`w-4 h-4 shrink-0 ${currentView === 'student-dashboard' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Dashboard</span>}
              </div>
            </button>

            {/* 2. My Courses (with collapsible course badges) */}
            <div className="space-y-0.5">
              <button
                onClick={() => {
                  if (sidebarCollapsed) {
                    navigateTo('my-courses');
                  } else {
                    setMyCoursesExpanded(!myCoursesExpanded);
                  }
                }}
                title={sidebarCollapsed ? 'My Courses' : undefined}
                className={`w-full flex items-center ${
                  sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
                } rounded-xl text-xs font-medium transition-all group ${
                  isMyCoursesActive
                    ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                    : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <BookOpen className={`w-4 h-4 shrink-0 ${isMyCoursesActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                  {!sidebarCollapsed && <span>My Courses</span>}
                </div>
                {!sidebarCollapsed && (
                  <ChevronDown
                    className={`w-3 h-3 text-slate-500 transition-transform ${
                      myCoursesExpanded ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                )}
              </button>

              {/* Submenu for My Courses */}
              {!sidebarCollapsed && myCoursesExpanded && (
                <div className="pl-3 pr-1 py-1 space-y-1.5 border-l border-white/10 ml-3.5 my-1">
                  {/* Quick link: Continue Learning */}
                  <button
                    onClick={() => navigateTo('course-player', 'course-xero-1')}
                    className="w-full text-left p-1.5 rounded-lg bg-[#0e1628] hover:bg-[#14203a] text-[11px] text-slate-300 hover:text-white transition-colors flex items-center justify-between group border border-emerald-500/20"
                  >
                    <div className="flex items-center gap-1.5 truncate">
                      <Play className="w-3 h-3 text-emerald-400 fill-current shrink-0" />
                      <span className="font-bold text-emerald-300 truncate">Continue Learning</span>
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">45%</span>
                  </button>

                  {/* Active Course Pills */}
                  {enrolledCoursesList.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => navigateTo('course-player', c.id)}
                      className="w-full text-left px-2 py-1 rounded-lg hover:bg-white/5 transition-colors group"
                    >
                      <div className="flex items-center justify-between text-[11px] leading-tight">
                        <span className="text-slate-300 group-hover:text-white truncate max-w-[130px]">
                          {c.title}
                        </span>
                        <span className="text-[9px] font-mono text-slate-400 group-hover:text-emerald-300">
                          {c.progressPercent}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-800 h-0.5 rounded-full mt-1 overflow-hidden">
                        <div
                          className="bg-emerald-500/80 h-full rounded-full"
                          style={{ width: `${c.progressPercent}%` }}
                        />
                      </div>
                    </button>
                  ))}

                  {/* All My Courses & Completed links */}
                  <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 px-1">
                    <button
                      onClick={() => navigateTo('my-courses')}
                      className="hover:text-emerald-300 font-semibold"
                    >
                      All My Courses →
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Course Library */}
            <button
              onClick={() => navigateTo('courses')}
              title={sidebarCollapsed ? 'Course Library' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                isCoursesActive
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Search className={`w-4 h-4 shrink-0 ${isCoursesActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Course Library</span>}
              </div>
            </button>

            {/* 4. Practice & Assessments */}
            <button
              onClick={() => navigateTo('practice')}
              title={sidebarCollapsed ? 'Practice & Assessments' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                currentView === 'practice'
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <CheckSquare className={`w-4 h-4 shrink-0 ${currentView === 'practice' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Practice & Tests</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold border border-emerald-500/30">
                  Drills
                </span>
              )}
            </button>

            {/* 5. Accounting Insights (Blog) */}
            <button
              onClick={() => navigateTo('blog')}
              title={sidebarCollapsed ? 'Accounting Insights' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                isBlogActive
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <BookOpenCheck className={`w-4 h-4 shrink-0 ${isBlogActive ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Accounting Insights</span>}
              </div>
            </button>
          </div>

          {/* Group 2: PROGRESS */}
          <div className="space-y-0.5 pt-1">
            {!sidebarCollapsed && (
              <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Progress
              </div>
            )}
            <button
              onClick={() => navigateTo('progress')}
              title={sidebarCollapsed ? 'My Progress' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                currentView === 'progress'
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <TrendingUp className={`w-4 h-4 shrink-0 ${currentView === 'progress' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>My Progress</span>}
              </div>
            </button>
          </div>

          {/* Group 3: CAREER */}
          <div className="space-y-0.5 pt-1">
            {!sidebarCollapsed && (
              <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Career
              </div>
            )}
            <button
              onClick={() => navigateTo('jobs')}
              title={sidebarCollapsed ? 'Jobs & Careers' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                currentView === 'jobs'
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Briefcase className={`w-4 h-4 shrink-0 ${currentView === 'jobs' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Jobs & Careers</span>}
              </div>
              {!sidebarCollapsed && (
                <span className="px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 text-[9px] font-bold border border-cyan-500/30">
                  Hiring
                </span>
              )}
            </button>

            <button
              onClick={() => navigateTo('community')}
              title={sidebarCollapsed ? 'Community' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                currentView === 'community'
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageSquare className={`w-4 h-4 shrink-0 ${currentView === 'community' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Community</span>}
              </div>
            </button>
          </div>

          {/* Group 4: SCHEDULE */}
          <div className="space-y-0.5 pt-1">
            {!sidebarCollapsed && (
              <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Schedule
              </div>
            )}
            <button
              onClick={() => navigateTo('calendar')}
              title={sidebarCollapsed ? 'Calendar' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                currentView === 'calendar'
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Calendar className={`w-4 h-4 shrink-0 ${currentView === 'calendar' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Calendar</span>}
              </div>
            </button>
          </div>

          {/* Group 5: RESOURCES */}
          <div className="space-y-0.5 pt-1">
            {!sidebarCollapsed && (
              <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-slate-500">
                Resources
              </div>
            )}
            <button
              onClick={() => navigateTo('free-resources')}
              title={sidebarCollapsed ? 'Free Resources' : undefined}
              className={`w-full flex items-center ${
                sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
              } rounded-xl text-xs font-medium transition-all group ${
                currentView === 'free-resources'
                  ? 'bg-white/[0.04] text-white font-semibold border-l-2 border-emerald-500 pl-2'
                  : 'text-slate-400 hover:bg-white/[0.03] hover:text-slate-200'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Sparkles className={`w-4 h-4 shrink-0 ${currentView === 'free-resources' ? 'text-emerald-400' : 'text-slate-400 group-hover:text-slate-300'}`} />
                {!sidebarCollapsed && <span>Free Resources</span>}
              </div>
            </button>
          </div>

          {/* Group 6: ADMIN (ONLY SHOWN IF USER HAS ADMIN PRIVILEGES) */}
          {currentUser && currentUser.role === 'admin' && (
            <div className="space-y-0.5 pt-2 border-t border-white/10">
              {!sidebarCollapsed && (
                <div className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-400">
                  Admin
                </div>
              )}
              <button
                onClick={() => navigateTo('admin-dashboard')}
                title={sidebarCollapsed ? 'Faculty Admin' : undefined}
                className={`w-full flex items-center ${
                  sidebarCollapsed ? 'justify-center p-2' : 'justify-between px-2.5 py-1.5'
                } rounded-xl text-xs font-medium bg-indigo-950/30 text-indigo-300 hover:bg-indigo-900/40 hover:text-white transition-all border border-indigo-500/20`}
              >
                <div className="flex items-center gap-2.5">
                  <Shield className="w-4 h-4 text-indigo-400 shrink-0" />
                  {!sidebarCollapsed && <span>Faculty Admin</span>}
                </div>
              </button>
            </div>
          )}

        </div>

        {/* Bottom Utility Controls */}
        <div className={`p-2.5 border-t border-white/10 space-y-1 bg-[#05080f] ${sidebarCollapsed ? 'flex flex-col items-center' : ''}`}>
          {/* Settings */}
          <button
            onClick={() => navigateTo('account')}
            title="Settings"
            className={`w-full flex items-center ${
              sidebarCollapsed ? 'justify-center p-2' : 'gap-2 px-2.5 py-1.5'
            } text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors ${
              currentView === 'account' ? 'text-white bg-white/5 font-semibold' : ''
            }`}
          >
            <Settings className="w-4 h-4 text-slate-400 shrink-0" />
            {!sidebarCollapsed && <span>Settings</span>}
          </button>

          {/* Help & Support */}
          <button
            onClick={() => setHelpOpen(true)}
            title="Help & Support"
            className={`w-full flex items-center ${
              sidebarCollapsed ? 'justify-center p-2' : 'gap-2 px-2.5 py-1.5'
            } text-xs font-medium text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors`}
          >
            <HelpCircle className="w-4 h-4 text-slate-400 shrink-0" />
            {!sidebarCollapsed && <span>Help & Support</span>}
          </button>

          {/* Log Out */}
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

      {/* Help & Support Modal */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
};
