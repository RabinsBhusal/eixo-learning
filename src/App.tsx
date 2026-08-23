import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { StudentSidebar } from './components/layout/StudentSidebar';
import { AdminSidebar } from './components/layout/AdminSidebar';
import { Footer } from './components/layout/Footer';
import { AuthModal } from './components/layout/AuthModal';

// Pages
import { LandingPage } from './pages/LandingPage';
import { CoursesCataloguePage } from './pages/CoursesCataloguePage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { CoursePlayerPage } from './pages/student/CoursePlayerPage';
import { StudentDashboard } from './pages/student/StudentDashboard';
import { MyCoursesPage } from './pages/student/MyCoursesPage';
import { ProgressBadgesPage } from './pages/student/ProgressBadgesPage';
import { ResourcesHubPage } from './pages/student/ResourcesHubPage';
import { AccountSettingsPage } from './pages/student/AccountSettingsPage';
import { AboutPage } from './pages/public/AboutPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminCoursesPage } from './pages/admin/AdminCoursesPage';
import { AdminStudentsPage } from './pages/admin/AdminStudentsPage';
import { AdminResourcesPage } from './pages/admin/AdminResourcesPage';
import { AdminAnalyticsPage } from './pages/admin/AdminAnalyticsPage';
import { PortalAuthGate } from './components/layout/PortalAuthGate';
import {
  Menu,
  X,
  GraduationCap,
  ShieldCheck,
  LogOut,
  ChevronRight,
  BookOpen,
  LayoutDashboard,
  Search,
  Presentation,
  Award,
  User as UserIcon,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, currentUser, navigateTo, logout, switchUserRole } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Admin view check
  const isAdminView = currentView.startsWith('admin-');
  const isStudentView = !isAdminView;

  const renderView = () => {
    // If not authenticated and trying to access protected student or admin areas, show gate
    if (!currentUser && (
      currentView === 'student-dashboard' ||
      currentView === 'my-courses' ||
      currentView === 'progress' ||
      currentView === 'resources-hub' ||
      currentView === 'account' ||
      isAdminView
    )) {
      return (
        <PortalAuthGate
          requiredRole={isAdminView ? 'admin' : 'student'}
          title={isAdminView ? 'Faculty Admin Portal Login' : 'Student Learning Campus Login'}
        />
      );
    }

    switch (currentView) {
      case 'landing':
        return <LandingPage />;
      case 'courses':
        return <CoursesCataloguePage />;
      case 'course-detail':
        return <CourseDetailPage />;
      case 'course-player':
        return <CoursePlayerPage />;
      case 'student-dashboard':
        return <StudentDashboard />;
      case 'my-courses':
        return <MyCoursesPage />;
      case 'progress':
        return <ProgressBadgesPage />;
      case 'resources-hub':
        return <ResourcesHubPage />;
      case 'account':
        return <AccountSettingsPage />;
      case 'about':
        return <AboutPage />;
      case 'admin-dashboard':
        return <AdminDashboard />;
      case 'admin-courses':
        return <AdminCoursesPage />;
      case 'admin-students':
        return <AdminStudentsPage />;
      case 'admin-resources':
        return <AdminResourcesPage />;
      case 'admin-analytics':
        return <AdminAnalyticsPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#050508] text-slate-100 flex flex-col selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      {/* Immersive ambient background glows */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(16,185,129,0.08),rgba(255,255,255,0))] -z-10" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] pointer-events-none bg-radial from-indigo-500/5 to-transparent blur-3xl -z-10" />

      {/* UNLOGGED IN / GUEST TOP NAVBAR ONLY */}
      {!currentUser && <Navbar />}

      {/* MOBILE TOP BAR FOR LOGGED IN USERS (md:hidden) */}
      {currentUser && (
        <div className="md:hidden sticky top-0 z-40 bg-[#070a12]/95 backdrop-blur-md border-b border-white/10 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-md flex items-center justify-center font-bold text-xs ${
              currentUser.role === 'admin' ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40' : 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
            }`}>
              E
            </div>
            <div>
              <div className="text-xs font-bold text-white leading-tight">
                EIXO <span className={currentUser.role === 'admin' ? 'text-indigo-400' : 'text-emerald-400'}>LEARNING</span>
              </div>
              <span className="text-[9px] text-slate-400 font-medium">
                {currentUser.role === 'admin' ? 'Faculty Admin' : 'Student Campus'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
              className="p-1.5 bg-[#12182b] border border-white/10 rounded-lg text-slate-300 hover:text-white"
            >
              {mobileDrawerOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER MODAL FOR AUTHENTICATED USERS */}
      {currentUser && mobileDrawerOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex flex-col justify-between p-4 animate-in fade-in">
          <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2.5">
                <img
                  src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser.name}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover border border-emerald-500/40"
                />
                <div>
                  <div className="text-xs font-bold text-white">{currentUser.name}</div>
                  <div className="text-[10px] text-emerald-400 font-medium">{currentUser.role === 'admin' ? 'Faculty Lead' : 'Enrolled Student'}</div>
                </div>
              </div>
              <button
                onClick={() => setMobileDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="space-y-1.5 text-xs">
              {currentUser.role === 'admin' ? (
                <>
                  <button
                    onClick={() => { navigateTo('admin-dashboard'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <LayoutDashboard className="w-4 h-4 text-indigo-400" />
                    <span>Admin Overview</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('admin-courses'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>Course Management</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('courses'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <Search className="w-4 h-4 text-slate-400" />
                    <span>Browse Public Catalogue</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('admin-resources'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <Presentation className="w-4 h-4 text-amber-400" />
                    <span>Google Slides & Resources</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => { navigateTo('student-dashboard'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5 font-bold text-emerald-400"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Student Dashboard</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('my-courses'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <BookOpen className="w-4 h-4 text-slate-400" />
                    <span>My Enrolled Courses</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('courses'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <Search className="w-4 h-4 text-emerald-400" />
                    <span>Browse Courses</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('resources-hub'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <Presentation className="w-4 h-4 text-amber-400" />
                    <span>Google Slides & PDF Decks</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('progress'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <Award className="w-4 h-4 text-slate-400" />
                    <span>Progress & Badges</span>
                  </button>
                  <button
                    onClick={() => { navigateTo('account'); setMobileDrawerOpen(false); }}
                    className="w-full text-left p-2.5 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    <span>Account Settings</span>
                  </button>
                </>
              )}
            </nav>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  switchUserRole(currentUser.role === 'admin' ? 'student' : 'admin');
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-2 bg-white/5 hover:bg-white/10 text-slate-200 rounded-xl text-xs font-semibold"
              >
                Switch to {currentUser.role === 'admin' ? 'Student' : 'Admin'} Mode
              </button>
              <button
                onClick={() => {
                  logout();
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-2 bg-rose-950/40 text-rose-300 hover:bg-rose-900/50 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEWPORT BODY */}
      {!currentUser ? (
        // GUEST / UNLOGGED-IN: Full Width View
        <main className="flex-1 relative z-0">{renderView()}</main>
      ) : (
        // LOGGED-IN: Persistent Side Menu Shell (No Top Header!)
        <div className="flex-1 flex max-w-full relative z-0">
          {isAdminView ? <AdminSidebar /> : <StudentSidebar />}
          <main className="flex-1 min-w-0 overflow-y-auto">{renderView()}</main>
        </div>
      )}

      {/* Footer on public unauthenticated views */}
      {!currentUser && (currentView === 'landing' || currentView === 'about' || currentView === 'courses' || currentView === 'course-detail') && (
        <Footer />
      )}

      <AuthModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
