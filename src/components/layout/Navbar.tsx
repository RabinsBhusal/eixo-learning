import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  Sparkles,
  LogIn,
  ChevronDown,
  GraduationCap,
  Shield,
  Search,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentUser,
    currentView,
    navigateTo,
    openAuthModal,
    login,
    searchQuery,
    setSearchQuery,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);

  // If user is authenticated, the top header should NOT appear at all (per user requirement)
  if (currentUser) {
    return null;
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigateTo('courses');
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070a12]/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          
          {/* Left: Minimalist Brand */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => navigateTo('landing')}
              className="flex items-center gap-2 text-left group focus:outline-none"
            >
              <div className="w-7 h-7 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-sm tracking-wider">
                E
              </div>
              <span className="text-sm font-bold tracking-tight text-white">
                EIXO <span className="text-emerald-400">LEARNING</span>
              </span>
            </button>

            {/* Minimalist Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
              <button
                onClick={() => navigateTo('courses')}
                className={`transition-colors hover:text-white ${currentView === 'courses' ? 'text-emerald-400 font-semibold' : ''}`}
              >
                Browse Courses
              </button>
              <button
                onClick={() => {
                  setSearchQuery('Xero');
                  navigateTo('courses');
                }}
                className="transition-colors hover:text-white"
              >
                Xero & Cloud Software
              </button>
              <button
                onClick={() => navigateTo('about')}
                className={`transition-colors hover:text-white ${currentView === 'about' ? 'text-emerald-400 font-semibold' : ''}`}
              >
                About & Faculty
              </button>
            </nav>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            {/* Quick Demo Switcher */}
            <div className="relative">
              <button
                onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-all"
                title="Instant login demo credentials"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden sm:inline">Instant Demo</span>
                <ChevronDown className="w-3 h-3 text-emerald-400/80" />
              </button>

              {demoMenuOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0b0f19] rounded-xl shadow-2xl border border-white/10 p-2 z-50 animate-in fade-in">
                  <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Select Demo Persona
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
                      <div className="font-semibold text-white">Student Portal</div>
                      <div className="text-[10px] text-slate-400">Alex Morgan (Student)</div>
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
                      <div className="text-[10px] text-slate-400">Course & Student Lead</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Log In & Register */}
            <button
              onClick={() => openAuthModal('login')}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>

            <button
              onClick={() => openAuthModal('register')}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all shadow-xs"
            >
              Get Started
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer for Guest */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070a12] border-b border-white/5 px-4 py-3 space-y-2">
          <button
            onClick={() => {
              navigateTo('courses');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-1.5 text-xs text-slate-200"
          >
            Browse Courses
          </button>
          <button
            onClick={() => {
              navigateTo('about');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-1.5 text-xs text-slate-200"
          >
            About & Faculty
          </button>
          <div className="pt-2 border-t border-white/5 flex gap-2">
            <button
              onClick={() => {
                login('alex.morgan@finance-student.com');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-1.5 bg-emerald-600/20 border border-emerald-500/30 text-emerald-300 rounded text-xs font-semibold"
            >
              Demo Student
            </button>
            <button
              onClick={() => {
                login('admin@eixolearning.com');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-1.5 bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 rounded text-xs font-semibold"
            >
              Demo Admin
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
