import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  PlayCircle,
  ChevronDown,
  GraduationCap,
  Shield,
  Search,
  ArrowRight,
  LogOut,
  Settings,
  User as UserIcon,
  BookOpen,
  Award,
  CheckSquare,
  Briefcase,
  Sparkles,
} from 'lucide-react';

const EIXO_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/EIXO%20LEARNING%2F69c8934d2da4206ba4be472d1706d867.png?alt=media&token=959b1659-1d45-48c5-8ab3-2ce0be113b6b';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentView,
    navigateTo,
    openAuthModal,
    login,
    logout,
    switchUserRole,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (currentView !== 'courses') {
      navigateTo('courses');
    }
  };

  const getDashboardView = () => {
    if (!currentUser) return 'landing';
    return currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard';
  };

  return (
    <>
      {/* Top Announcement Banner */}
      {showPromoBanner && !currentUser && (
        <div className="bg-emerald-900 border-b border-emerald-700/50 text-white font-medium text-xs py-2 px-4 sticky top-0 z-50 shadow-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1 flex items-center justify-center gap-2 text-center text-[11px] sm:text-xs">
              <span className="bg-emerald-950/40 text-emerald-100 border border-emerald-600/40 px-2 py-0.5 rounded font-extrabold text-[10px] tracking-wide uppercase">
                New
              </span>
              <span className="font-semibold text-emerald-50">
                Career-Ready Cloud Accounting & Xero Certification Tracks
              </span>
              <span className="text-emerald-700/50 hidden sm:inline">•</span>
              <button
                onClick={() => navigateTo('courses')}
                className="text-amber-300 hover:text-amber-200 font-bold transition-colors inline-flex items-center gap-1 hover:underline"
              >
                <span>Courses from £19.99</span>
                <ArrowRight className="w-3 h-3 inline" />
              </button>
            </div>
            <button
              onClick={() => setShowPromoBanner(false)}
              className="text-emerald-300 hover:text-white p-0.5 rounded transition-colors shrink-0"
              title="Dismiss announcement"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Main Sticky Navbar (Udemy Inspired) */}
      <header className="sticky top-0 z-40 bg-[#070a12]/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-2 sm:gap-4">
            
            {/* Left: Brand Logo */}
            <div className="flex items-center shrink-0">
              <button
                onClick={() => navigateTo(getDashboardView())}
                className="flex items-center group focus:outline-none transition-transform hover:scale-102"
                title="EIXO Learning"
              >
                <img
                  src={EIXO_LOGO_URL}
                  alt="EIXO Learning Logo"
                  referrerPolicy="no-referrer"
                  className="h-9 sm:h-10 w-auto object-contain drop-shadow-md"
                />
              </button>

              {/* Guest Explore Categories Link */}
              {!currentUser && (
                <button
                  onClick={() => navigateTo('courses')}
                  className="hidden md:block ml-6 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Explore Courses
                </button>
              )}
            </div>

            {/* Center: Search Bar (Always on top like Udemy) */}
            <div className="flex-1 max-w-sm md:max-w-xl mx-2 sm:mx-4 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-3.5 w-3.5 text-slate-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search bookkeeping, financial modelling, tax or Xero courses..."
                className="w-full pl-9 pr-12 py-1.5 bg-[#0e1424] hover:bg-[#121b30]/80 focus:bg-[#121b30] text-slate-100 placeholder-slate-400 text-xs rounded-lg border border-white/10 focus:outline-none focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/30 transition-all shadow-inner"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-[10px] text-slate-400 hover:text-white font-bold"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1 sm:gap-3 shrink-0">
              
              {/* Logged In Desktop Nav Links */}
              {currentUser && (
                <nav className="hidden lg:flex items-center gap-5 text-xs font-semibold text-slate-300 mr-2">
                  <button
                    onClick={() => navigateTo('my-courses')}
                    className={`transition-colors hover:text-white ${currentView === 'my-courses' || currentView === 'course-player' ? 'text-fuchsia-400' : ''}`}
                  >
                    My Courses
                  </button>
                  <button
                    onClick={() => navigateTo('practice')}
                    className={`transition-colors hover:text-white ${currentView === 'practice' ? 'text-fuchsia-400' : ''}`}
                  >
                    Practice & Tests
                  </button>
                  <button
                    onClick={() => navigateTo('jobs')}
                    className={`transition-colors hover:text-white ${currentView === 'jobs' ? 'text-fuchsia-400' : ''}`}
                  >
                    Jobs Portal
                  </button>
                  <button
                    onClick={() => navigateTo('free-resources')}
                    className={`transition-colors hover:text-white ${currentView === 'free-resources' ? 'text-fuchsia-400' : ''}`}
                  >
                    Resources
                  </button>
                </nav>
              )}

              {/* Guest Desktop Links */}
              {!currentUser && (
                <nav className="hidden lg:flex items-center gap-4 text-xs font-semibold text-slate-300 mr-2">
                  <button
                    onClick={() => navigateTo('free-resources')}
                    className={`transition-colors hover:text-white ${currentView === 'free-resources' ? 'text-emerald-400' : ''}`}
                  >
                    Free Templates
                  </button>
                  <button
                    onClick={() => navigateTo('community')}
                    className={`transition-colors hover:text-white ${currentView === 'community' ? 'text-emerald-400' : ''}`}
                  >
                    Community
                  </button>
                </nav>
              )}

              {/* Instant Demo Switcher */}
              {!currentUser && (
                <div className="relative">
                  <button
                    onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                    className="flex items-center gap-1 px-2 py-1.5 rounded-lg text-[10px] sm:text-xs font-bold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-all shadow-xs"
                    title="Instant login credentials"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="hidden sm:inline">Instant Demo</span>
                    <ChevronDown className="w-3 h-3 text-emerald-400/80" />
                  </button>

                  {demoMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-[#0b0f19] rounded-xl shadow-2xl border border-white/10 p-2 z-50 animate-in fade-in">
                      <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-white/5 mb-1 pb-1">
                        Select Demo Account
                      </div>
                      <button
                        onClick={() => {
                          login('alex.morgan@finance-student.com');
                          setDemoMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-white/5 flex items-center gap-2.5 transition-colors text-xs"
                      >
                        <div className="w-6 h-6 rounded-full bg-emerald-600/30 text-emerald-400 flex items-center justify-center shrink-0">
                          <GraduationCap className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Student Account</div>
                          <div className="text-[10px] text-slate-400">Alex Morgan</div>
                        </div>
                      </button>

                      <button
                        onClick={() => {
                          login('admin@eixolearning.com');
                          setDemoMenuOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-white/5 flex items-center gap-2.5 transition-colors text-xs mt-1"
                      >
                        <div className="w-6 h-6 rounded-full bg-indigo-600/30 text-indigo-400 flex items-center justify-center shrink-0">
                          <Shield className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <div className="font-semibold text-white">Faculty Admin</div>
                          <div className="text-[10px] text-slate-400">Admin Lead</div>
                        </div>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Log In & Register (Guests only) */}
              {!currentUser && (
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => openAuthModal('login')}
                    className="px-2 sm:px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => openAuthModal('register')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-lg text-xs transition-all shadow-md"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* Logged In User Avatar Dropdown */}
              {currentUser && (
                <div className="relative">
                  <button
                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                    className="flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-fuchsia-500/50 rounded-full p-0.5"
                  >
                    <img
                      src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                      alt={currentUser.name}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-fuchsia-500/50"
                    />
                    <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
                  </button>

                  {profileDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-[#0b0f19] rounded-xl shadow-2xl border border-white/10 p-2.5 z-50 animate-in fade-in">
                      <div className="px-2.5 py-1.5 border-b border-white/5 mb-1.5">
                        <div className="text-xs font-extrabold text-white leading-tight">
                          {currentUser.name}
                        </div>
                        <div className="text-[10px] text-fuchsia-400 font-bold mt-0.5">
                          {currentUser.role === 'admin' ? 'Faculty Admin' : 'Enrolled Student'}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          navigateTo('account');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-white/5 flex items-center gap-2 text-xs text-slate-200"
                      >
                        <Settings className="w-3.5 h-3.5 text-slate-400" />
                        <span>Account Settings</span>
                      </button>

                      <button
                        onClick={() => {
                          switchUserRole(currentUser.role === 'admin' ? 'student' : 'admin');
                          setProfileDropdownOpen(false);
                          navigateTo(currentUser.role === 'admin' ? 'student-dashboard' : 'admin-dashboard');
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-white/5 flex items-center gap-2 text-xs text-indigo-400 font-semibold"
                      >
                        <Shield className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Switch to {currentUser.role === 'admin' ? 'Student View' : 'Admin Control'}</span>
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left p-2 rounded-lg hover:bg-rose-500/10 flex items-center gap-2 text-xs text-rose-400 font-bold border-t border-white/5 mt-1.5 pt-2"
                      >
                        <LogOut className="w-3.5 h-3.5 text-rose-400" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-1.5 text-slate-400 hover:text-white"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Dropdown Menu (Merged Responsive Layout) */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#070a12] border-t border-white/10 px-4 py-3.5 space-y-2 animate-in slide-in-from-top-2">
            {currentUser ? (
              <>
                <button
                  onClick={() => { navigateTo('student-dashboard'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 bg-white/5 rounded-lg text-xs text-slate-200 hover:text-fuchsia-400 font-semibold"
                >
                  Dashboard
                </button>
                <button
                  onClick={() => { navigateTo('my-courses'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 bg-white/5 rounded-lg text-xs text-slate-200 hover:text-fuchsia-400 font-semibold"
                >
                  My Study Courses
                </button>
                <button
                  onClick={() => { navigateTo('practice'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 bg-white/5 rounded-lg text-xs text-slate-200 hover:text-fuchsia-400 font-semibold"
                >
                  Practice & Tests
                </button>
                <button
                  onClick={() => { navigateTo('jobs'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 bg-white/5 rounded-lg text-xs text-slate-200 hover:text-fuchsia-400 font-semibold"
                >
                  Jobs & Careers
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => { navigateTo('courses'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 bg-white/5 rounded-lg text-xs text-slate-200 hover:text-emerald-400"
                >
                  Browse Courses
                </button>
                <button
                  onClick={() => { navigateTo('free-resources'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 bg-white/5 rounded-lg text-xs text-slate-200 hover:text-emerald-400 flex items-center justify-between"
                >
                  <span>Free Templates & PDFs</span>
                  <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded">Free</span>
                </button>
                <button
                  onClick={() => { navigateTo('community'); setMobileMenuOpen(false); }}
                  className="w-full text-left py-2 px-3 bg-white/5 rounded-lg text-xs text-slate-200 hover:text-emerald-400"
                >
                  Community
                </button>
              </>
            )}
          </div>
        )}
      </header>
    </>
  );
};
