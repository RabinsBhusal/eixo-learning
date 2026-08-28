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
const MainContent: React.FC = () => {
  const { currentView, currentUser, navigateTo } = useApp();

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

      {/* UNIVERSAL TOP NAVBAR (always visible like Udemy) */}
      <Navbar />

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
