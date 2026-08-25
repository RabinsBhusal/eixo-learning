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
import { CommunityPage } from './pages/CommunityPage';
import { BlogPage } from './pages/BlogPage';
import { JobPortalPage } from './pages/JobPortalPage';
import { CalendarPage } from './pages/CalendarPage';
import { FreeResourcesPage } from './pages/FreeResourcesPage';
import { PracticePage } from './pages/student/PracticePage';
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
  CheckSquare,
  Award,
  User as UserIcon,
  Briefcase,
  MessageSquare,
  Calendar,
  BookOpenCheck,
  Sparkles,
} from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, currentUser, navigateTo, logout, switchUserRole } = useApp();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Admin view check
  const isAdminView = currentView.startsWith('admin-');

  const renderView = () => {
    // Protected student or admin areas
    if (!currentUser && (
      currentView === 'student-dashboard' ||
      currentView === 'my-courses' ||
      currentView === 'progress' ||
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
      case 'practice':
        return <PracticePage />;
      case 'progress':
        return <ProgressBadgesPage />;
      case 'resources-hub':
        return <ResourcesHubPage />;
      case 'account':
        return <AccountSettingsPage />;
      case 'community':
        return <CommunityPage />;
      case 'blog':
      case 'blog-detail':
        return <BlogPage />;
      case 'jobs':
        return <JobPortalPage />;
      case 'calendar':
        return <CalendarPage />;
      case 'free-resources':
        return <FreeResourcesPage />;
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

      {/* GUEST TOP NAVBAR (when not logged in) */}
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
          <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-5 space-y-4 shadow-2xl overflow-y-auto max-h-[85vh]">
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

            <nav className="space-y-1 text-xs">
              <div className="px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">Learn</div>
              <button
                onClick={() => { navigateTo(currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5 font-bold text-emerald-400"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button
                onClick={() => { navigateTo('my-courses'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <BookOpen className="w-4 h-4 text-slate-400" />
                <span>My Courses</span>
              </button>
              <button
                onClick={() => { navigateTo('courses'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <Search className="w-4 h-4 text-slate-400" />
                <span>Course Library</span>
              </button>
              <button
                onClick={() => { navigateTo('practice'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <CheckSquare className="w-4 h-4 text-emerald-400" />
                <span>Practice & Tests</span>
              </button>
              <button
                onClick={() => { navigateTo('blog'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <BookOpenCheck className="w-4 h-4 text-slate-400" />
                <span>Accounting Insights</span>
              </button>

              <div className="px-2 pt-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">Progress & Career</div>
              <button
                onClick={() => { navigateTo('progress'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <Award className="w-4 h-4 text-emerald-400" />
                <span>My Progress</span>
              </button>
              <button
                onClick={() => { navigateTo('jobs'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <Briefcase className="w-4 h-4 text-cyan-400" />
                <span>Jobs & Careers</span>
              </button>
              <button
                onClick={() => { navigateTo('community'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <MessageSquare className="w-4 h-4 text-slate-400" />
                <span>Community</span>
              </button>
              <button
                onClick={() => { navigateTo('calendar'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <Calendar className="w-4 h-4 text-indigo-400" />
                <span>Calendar</span>
              </button>
              <button
                onClick={() => { navigateTo('free-resources'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Free Resources</span>
              </button>

              <div className="px-2 pt-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-500">Account</div>
              <button
                onClick={() => { navigateTo('account'); setMobileDrawerOpen(false); }}
                className="w-full text-left p-2 rounded-xl hover:bg-white/5 text-white flex items-center gap-2.5"
              >
                <UserIcon className="w-4 h-4 text-slate-400" />
                <span>Settings</span>
              </button>
            </nav>

            <div className="pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  switchUserRole(currentUser.role === 'admin' ? 'student' : 'admin');
                  setMobileDrawerOpen(false);
                }}
                className="w-full py-2 bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-xs font-semibold"
              >
                Switch to {currentUser.role === 'admin' ? 'Student View' : 'Admin Command'}
              </button>
              <button
                onClick={() => { logout(); setMobileDrawerOpen(false); }}
                className="w-full py-2 bg-rose-600/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP LAYOUT WITH SIDEBAR FOR AUTHENTICATED USERS */}
      {currentUser ? (
        <div className="flex-1 flex">
          {/* Collapsible Student or Admin Sidebar */}
          {currentUser.role === 'admin' ? <AdminSidebar /> : <StudentSidebar />}
          
          <div className="flex-1 flex flex-col min-w-0 bg-[#070a12]">
            <main className="flex-1">
              {renderView()}
            </main>
            <Footer />
          </div>
        </div>
      ) : (
        /* GUEST / LANDING VIEW */
        <div className="flex-1 flex flex-col">
          <main className="flex-1">
            {renderView()}
          </main>
          <Footer />
        </div>
      )}

      {/* Global Auth Modal */}
      <AuthModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
};

export default App;
