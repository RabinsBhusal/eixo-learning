import React from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from '../../components/course/CourseCard';
import {
  BookOpen,
  Award,
  Clock,
  CheckCircle2,
  Play,
  ArrowRight,
  TrendingUp,
  FileSpreadsheet,
  Layers,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentUser, courses, progress, navigateTo, lessons } = useApp();

  const enrolledCourses = courses.filter((c) =>
    currentUser?.enrolledCourseIds.includes(c.id)
  );

  // Find most recently accessed or highest progress course for "Continue Learning" hero
  const primaryProgress = progress.find((p) => p.userId === currentUser?.id && p.percentComplete < 100) || progress[0];
  const continueCourse = courses.find((c) => c.id === primaryProgress?.courseId) || enrolledCourses[0] || courses[0];
  const lastLesson = lessons.find((l) => l.id === primaryProgress?.lastAccessedLessonId) || lessons.find((l) => l.courseId === continueCourse?.id);

  // Stats
  const totalCompletedLessons = progress.reduce((acc, p) => acc + (p.completedLessonIds?.length || 0), 0);
  const completedCoursesCount = progress.filter((p) => p.percentComplete === 100).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-white">
      
      {/* 1. WELCOME HERO */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2.5 py-1 rounded-md">
            Student Portal
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Welcome back, {currentUser?.name.split(' ')[0] || 'Learner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Pick up where you left off and keep building practical accounting competency.
          </p>
        </div>

        <button
          onClick={() => navigateTo('courses')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Browse More Courses</span>
        </button>
      </div>

      {/* 2. STATS ROW */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="text-xs font-semibold text-slate-400">Enrolled Courses</div>
          <div className="text-2xl font-extrabold text-white">{enrolledCourses.length}</div>
          <p className="text-[11px] text-emerald-400 font-medium">Active curriculum</p>
        </div>

        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="text-xs font-semibold text-slate-400">Lessons Completed</div>
          <div className="text-2xl font-extrabold text-white">{totalCompletedLessons}</div>
          <p className="text-[11px] text-emerald-400 font-medium">Theory & practice video</p>
        </div>

        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="text-xs font-semibold text-slate-400">Completed Courses</div>
          <div className="text-2xl font-extrabold text-white">{completedCoursesCount}</div>
          <p className="text-[11px] text-emerald-400 font-medium">100% finished</p>
        </div>

        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="text-xs font-semibold text-slate-400">Verified Certificates</div>
          <div className="text-2xl font-extrabold text-emerald-400">
            {completedCoursesCount > 0 ? completedCoursesCount : 'Ready at 100%'}
          </div>
          <p className="text-[11px] text-slate-400">Accredited by EIXO</p>
        </div>
      </div>

      {/* 3. CONTINUE LEARNING LARGE CARD (PRD Section 12) */}
      {continueCourse && (
        <div className="bg-[#0b0f19] text-white rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="text-xs uppercase font-bold tracking-widest text-emerald-400 mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
            <span>Continue Learning</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {continueCourse.title}
              </h2>
              
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-300">
                <span className="bg-[#12182b] border border-white/10 px-2.5 py-0.5 rounded-lg font-semibold text-emerald-300">
                  {continueCourse.category} ({continueCourse.subcategory})
                </span>
                <span>•</span>
                <span>Last watched: <strong className="text-white">{lastLesson?.title || 'Lesson 1'}</strong></span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Course Progress</span>
                  <span className="text-emerald-400">{primaryProgress?.percentComplete || 0}% Complete</span>
                </div>
                <div className="w-full h-2.5 bg-black/60 border border-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                    style={{ width: `${primaryProgress?.percentComplete || 0}%` }}
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('course-player', continueCourse.id, lastLesson?.id)}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] flex items-center gap-2"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Resume Lesson</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-4 hidden lg:block">
              <div className="aspect-16/9 rounded-xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={continueCourse.thumbnail}
                  alt={continueCourse.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. MY ENROLLED COURSES GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">My Enrolled Courses</h2>
          <button
            onClick={() => navigateTo('my-courses')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>View all my courses</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        ) : (
          <div className="p-8 bg-[#0b0f19] rounded-2xl border border-white/10 text-center space-y-3 shadow-xl">
            <BookOpen className="w-8 h-8 text-slate-600 mx-auto" />
            <p className="text-xs text-slate-400">You have not enrolled in any courses yet.</p>
            <button
              onClick={() => navigateTo('courses')}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              Browse Catalogue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
