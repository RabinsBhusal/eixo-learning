import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Menu,
  X,
  PlayCircle,
  LogIn,
  ChevronDown,
  GraduationCap,
  Shield,
  Search,
  Tag,
  ArrowRight,
} from 'lucide-react';

const EIXO_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/project-b9727ea3-0bd2-4396-9ba.firebasestorage.app/o/EIXO%20LEARNING%2F69c8934d2da4206ba4be472d1706d867.png?alt=media&token=959b1659-1d45-48c5-8ab3-2ce0be113b6b';

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
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // If user is authenticated, the top header should NOT appear at all (per user requirement)
  if (currentUser) {
    return null;
  }

  return (
    <>
      {/* Top Announcement Banner with refined emerald green background */}
      {showPromoBanner && (
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

      <header className="sticky top-0 z-40 bg-[#070a12]/90 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">
            
            {/* Left: EIXO Learning Logo (Bigger & prominent, no side text per requirement) */}
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigateTo('landing')}
                className="flex items-center group focus:outline-none transition-transform hover:scale-105"
                title="EIXO Learning"
              >
                <img
                  src={EIXO_LOGO_URL}
                  alt="EIXO Learning"
                  referrerPolicy="no-referrer"
                  className="h-11 sm:h-12 w-auto object-contain drop-shadow-md"
                />
              </button>

              {/* Top Navigation Links */}
              <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-slate-300">
                <button
                  onClick={() => navigateTo('courses')}
                  className={`transition-colors hover:text-white ${currentView === 'courses' ? 'text-emerald-400 font-semibold' : ''}`}
                >
                  Explore Courses
                </button>
                <button
                  onClick={() => navigateTo('free-resources')}
                  className={`transition-colors hover:text-white ${currentView === 'free-resources' ? 'text-emerald-400 font-semibold' : ''}`}
                >
                  Free Resources
                </button>
                <button
                  onClick={() => navigateTo('community')}
                  className={`transition-colors hover:text-white ${currentView === 'community' ? 'text-emerald-400 font-semibold' : ''}`}
                >
                  Community
                </button>
                <button
                  onClick={() => navigateTo('blog')}
                  className={`transition-colors hover:text-white ${currentView === 'blog' || currentView === 'blog-detail' ? 'text-emerald-400 font-semibold' : ''}`}
                >
                  Blog
                </button>
                <button
                  onClick={() => navigateTo('about')}
                  className={`transition-colors hover:text-white ${currentView === 'about' ? 'text-emerald-400 font-semibold' : ''}`}
                >
                  About Faculty
                </button>
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2.5">
              {/* Quick Demo Switcher with PlayCircle */}
              <div className="relative">
                <button
                  onClick={() => setDemoMenuOpen(!demoMenuOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 transition-all shadow-xs"
                  title="Instant login demo credentials"
                >
                  <PlayCircle className="w-3.5 h-3.5 text-emerald-400" />
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
                        <div className="font-semibold text-white">Student Campus</div>
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
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-xs transition-all shadow-md shadow-emerald-950/40"
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
              className="w-full text-left py-1.5 text-xs text-slate-200 hover:text-emerald-400"
            >
              Browse Courses
            </button>
            <button
              onClick={() => {
                navigateTo('free-resources');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-1.5 text-xs text-slate-200 hover:text-emerald-400 flex items-center justify-between"
            >
              <span>Free Resources & Templates</span>
              <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded">Free</span>
            </button>
            <button
              onClick={() => {
                navigateTo('community');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-1.5 text-xs text-slate-200 hover:text-emerald-400"
            >
              Community Discussions
            </button>
            <button
              onClick={() => {
                navigateTo('blog');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-1.5 text-xs text-slate-200 hover:text-emerald-400"
            >
              Blog & Practical Guides
            </button>
            <button
              onClick={() => {
                navigateTo('about');
                setMobileMenuOpen(false);
              }}
              className="w-full text-left py-1.5 text-xs text-slate-200 hover:text-emerald-400"
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
    </>
  );
};

