import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  BookOpen,
  Search,
  User as UserIcon,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  FolderLock,
  Menu,
  X,
  ChevronDown,
  Shield,
  Layers,
  Sparkles,
  Award,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentView,
    navigateTo,
    openAuthModal,
    logout,
    switchUserRole,
    quickSwitchUser,
    users,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('courses');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070a12]/85 backdrop-blur-xl border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Left: Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigateTo(currentUser?.role === 'admin' ? 'admin-dashboard' : currentUser ? 'student-dashboard' : 'landing')}
              className="flex items-center gap-2.5 text-left group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-lg bg-emerald-600/90 border border-emerald-400/30 flex items-center justify-center text-white font-extrabold text-lg tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)] group-hover:bg-emerald-500 transition-all">
                E
              </div>
              <div className="flex flex-col">
                <div className="text-lg font-extrabold tracking-tight text-white leading-none">
                  EIXO <span className="text-emerald-400 font-medium">LEARNING</span>
                </div>
                <span className="text-[9px] uppercase tracking-widest font-semibold text-slate-400 mt-0.5">
                  Accounting & Finance
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 text-xs font-semibold text-slate-300">
              <button
                onClick={() => navigateTo('landing')}
                className={`hover:text-emerald-400 transition-colors ${currentView === 'landing' ? 'text-emerald-400 font-bold' : ''}`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('courses')}
                className={`hover:text-emerald-400 transition-colors ${currentView === 'courses' ? 'text-emerald-400 font-bold' : ''}`}
              >
                Courses Catalogue
              </button>
              <button
                onClick={() => {
                  setSearchQuery('Accounting');
                  navigateTo('courses');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Accounting
              </button>
              <button
                onClick={() => {
                  setSearchQuery('Finance');
                  navigateTo('courses');
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Finance
              </button>
              <button
                onClick={() => {
                  setSearchQuery('Xero');
                  navigateTo('courses');
                }}
                className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              >
                <span>Practical Software</span>
                <span className="px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[9px] font-bold rounded">
                  Xero • QBO • Sage
                </span>
              </button>
              <button
                onClick={() => navigateTo('about')}
                className={`hover:text-emerald-400 transition-colors ${currentView === 'about' ? 'text-emerald-400 font-bold' : ''}`}
              >
                About EIXO
              </button>
            </nav>
          </div>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-xs lg:max-w-sm">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search accounting topics, Xero, VAT..."
                className="w-full bg-[#0d1220]/80 hover:bg-[#12182b] focus:bg-[#151c32] text-xs pl-9 pr-4 py-2 border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/60 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </form>
          </div>

          {/* Right: Auth / Quick Demo Switcher / Profile */}
          <div className="flex items-center gap-3">
            
            {/* Quick Demo Switcher (Student / Admin toggle) */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 bg-[#0f1526] hover:bg-[#16203a] text-slate-200 rounded-lg text-xs font-semibold border border-white/10 transition-all shadow-xs"
                title="Switch between Student and Admin perspective"
              >
                {currentUser?.role === 'admin' ? (
                  <>
                    <Shield className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Role: Admin</span>
                  </>
                ) : (
                  <>
                    <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Role: Student</span>
                  </>
                )}
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0b0f19] rounded-xl shadow-2xl border border-white/10 p-2 z-50 animate-in fade-in zoom-in-95 backdrop-blur-xl">
                  <div className="px-2 py-1.5 text-[11px] font-bold uppercase text-slate-400">
                    Switch Active Role
                  </div>
                  <button
                    onClick={() => {
                      switchUserRole('student');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#131b2e] flex items-center justify-between text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-emerald-400" />
                      <div>
                        <div className="font-semibold text-white">Student Portal</div>
                        <div className="text-[10px] text-slate-400">Learn, play Vimeo video, take quizzes</div>
                      </div>
                    </div>
                    {currentUser?.role === 'student' && <span className="text-emerald-400 text-xs font-bold">✓</span>}
                  </button>

                  <button
                    onClick={() => {
                      switchUserRole('admin');
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs rounded-lg hover:bg-[#131b2e] flex items-center justify-between text-slate-200 mt-1 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-indigo-400" />
                      <div>
                        <div className="font-semibold text-white">EIXO Admin Portal</div>
                        <div className="text-[10px] text-slate-400">Manage courses, modules, videos & students</div>
                      </div>
                    </div>
                    {currentUser?.role === 'admin' && <span className="text-indigo-400 text-xs font-bold">✓</span>}
                  </button>
                </div>
              )}
            </div>

            {/* If logged in */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 pl-2 hover:bg-[#12182b] border border-transparent hover:border-white/10 rounded-lg transition-colors"
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                    alt={currentUser.name}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-emerald-500/30"
                  />
                  <span className="hidden md:inline text-xs font-semibold text-slate-200">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-[#0b0f19] rounded-xl shadow-2xl border border-white/10 py-1.5 z-50 animate-in fade-in zoom-in-95 backdrop-blur-xl divide-y divide-white/5">
                    <div className="px-4 py-2">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 px-1.5 py-0.5 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold rounded">
                        {currentUser.role.toUpperCase()}
                      </span>
                    </div>

                    <div className="py-1">
                      {currentUser.role === 'admin' ? (
                        <>
                          <button
                            onClick={() => {
                              navigateTo('admin-dashboard');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-xs text-slate-300 hover:bg-[#131b2e] hover:text-white flex items-center gap-2 transition-colors"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-indigo-400" />
                            <span>Admin Dashboard</span>
                          </button>
                          <button
                            onClick={() => {
                              navigateTo('admin-courses');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-xs text-slate-300 hover:bg-[#131b2e] hover:text-white flex items-center gap-2 transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                            <span>Manage Courses</span>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => {
                              navigateTo('student-dashboard');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-xs text-slate-300 hover:bg-[#131b2e] hover:text-white flex items-center gap-2 transition-colors"
                          >
                            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Student Dashboard</span>
                          </button>
                          <button
                            onClick={() => {
                              navigateTo('my-courses');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-xs text-slate-300 hover:bg-[#131b2e] hover:text-white flex items-center gap-2 transition-colors"
                          >
                            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Enrolled Courses</span>
                          </button>
                          <button
                            onClick={() => {
                              navigateTo('progress');
                              setProfileDropdownOpen(false);
                            }}
                            className="w-full px-4 py-2 text-xs text-slate-300 hover:bg-[#131b2e] hover:text-white flex items-center gap-2 transition-colors"
                          >
                            <Award className="w-3.5 h-3.5 text-slate-400" />
                            <span>My Competencies & Certificates</span>
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => {
                          navigateTo('account');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-xs text-slate-300 hover:bg-[#131b2e] hover:text-white flex items-center gap-2 transition-colors"
                      >
                        <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                        <span>Account Settings</span>
                      </button>
                    </div>

                    <div className="pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-xs text-rose-400 hover:bg-rose-950/40 hover:text-rose-300 flex items-center gap-2 transition-colors"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
                >
                  Log In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                >
                  Create Free Account
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#070a12] border-b border-white/10 px-4 py-4 space-y-3">
          <form onSubmit={handleSearchSubmit} className="relative w-full mb-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics..."
              className="w-full bg-[#0f1526] text-xs pl-9 pr-4 py-2 border border-white/10 rounded-lg text-white placeholder:text-slate-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          </form>

          <div className="space-y-1 text-xs font-semibold text-slate-300">
            <button
              onClick={() => {
                navigateTo('landing');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-white"
            >
              Home
            </button>
            <button
              onClick={() => {
                navigateTo('courses');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-white"
            >
              Courses Catalogue
            </button>
            <button
              onClick={() => {
                setSearchQuery('Accounting');
                navigateTo('courses');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-white"
            >
              Accounting
            </button>
            <button
              onClick={() => {
                setSearchQuery('Finance');
                navigateTo('courses');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-white"
            >
              Finance
            </button>
            <button
              onClick={() => {
                setSearchQuery('Xero');
                navigateTo('courses');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-white"
            >
              Practical Software (Xero, QBO, Sage)
            </button>
            <button
              onClick={() => {
                navigateTo('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-2 px-3 hover:bg-white/5 rounded-lg text-white"
            >
              About EIXO Learning
            </button>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <button
              onClick={() => {
                switchUserRole(currentUser?.role === 'admin' ? 'student' : 'admin');
                setMobileMenuOpen(false);
              }}
              className="text-xs font-bold text-emerald-400"
            >
              Toggle Role ({currentUser?.role === 'admin' ? 'Switch to Student' : 'Switch to Admin'})
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
