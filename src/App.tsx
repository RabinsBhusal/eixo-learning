import React from 'react';
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

const MainContent: React.FC = () => {
  const { currentView, currentUser } = useApp();

  // Full-width views (no sidebar)
  const isFullWidthView =
    currentView === 'landing' ||
    currentView === 'about' ||
    currentView === 'courses' ||
    currentView === 'course-detail' ||
    currentView === 'course-player';

  // Admin view check
  const isAdminView = currentView.startsWith('admin-');
  const isStudentView = !isAdminView && !isFullWidthView;

  const renderView = () => {
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

      <Navbar />

      {isFullWidthView ? (
        <main className="flex-1 relative z-0">{renderView()}</main>
      ) : (
        <div className="flex-1 flex max-w-full relative z-0">
          {isAdminView && <AdminSidebar />}
          {isStudentView && <StudentSidebar />}
          <main className="flex-1 min-w-0 overflow-y-auto">{renderView()}</main>
        </div>
      )}

      {/* Footer on landing, about, courses, and detail pages */}
      {(currentView === 'landing' ||
        currentView === 'about' ||
        currentView === 'courses' ||
        currentView === 'course-detail') && <Footer />}

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
