import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Users,
  BookOpen,
  TrendingUp,
  FileSpreadsheet,
  Award,
  Plus,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { courses, progress, allUsers, resources, lessons, navigateTo, switchUserRole } = useApp();

  const students = allUsers.filter((u) => u.role === 'student');
  const publishedCourses = courses.filter((c) => c.published);
  const totalCompletedLessons = progress.reduce((acc, p) => acc + (p.completedLessonIds?.length || 0), 0);
  const totalCertificatesEarned = progress.filter((p) => p.percentComplete >= 80).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* 1. Top Admin Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-extrabold uppercase tracking-wide">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Platform Owner & Administrator Panel</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            EIXO Learning Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Manage your single-standard accounting curriculum, students, and learning analytics.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigateTo('admin-courses')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Course</span>
          </button>

          <button
            onClick={() => switchUserRole('student')}
            className="px-4 py-2 bg-[#12182b] hover:bg-[#1a233d] border border-white/10 text-slate-200 rounded-xl text-xs font-semibold transition-all"
          >
            Preview Student View
          </button>
        </div>
      </div>

      {/* 2. Top Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Students</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{students.length}</div>
          <p className="text-[11px] text-emerald-400 font-medium">100% active learners</p>
        </div>

        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Published Courses</span>
            <BookOpen className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{publishedCourses.length}</div>
          <p className="text-[11px] text-slate-400">{courses.length} total authored</p>
        </div>

        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Lesson Completions</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-white">{totalCompletedLessons}</div>
          <p className="text-[11px] text-emerald-400 font-medium">{lessons.length} video lessons</p>
        </div>

        <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Certificates Issued</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-400">{totalCertificatesEarned}</div>
          <p className="text-[11px] text-slate-400">Verified credentials</p>
        </div>
      </div>

      {/* 3. Quick Action Hub */}
      <div className="bg-[#0b0f19] text-white rounded-2xl p-6 border border-white/10 shadow-xl">
        <h2 className="text-sm font-bold uppercase tracking-wider text-emerald-400 mb-4">
          Quick Curriculum Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            onClick={() => navigateTo('admin-courses')}
            className="p-3 bg-[#12182b] hover:bg-[#1a233d] rounded-xl border border-white/10 text-left transition-all flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Manage Courses</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('admin-students')}
            className="p-3 bg-[#12182b] hover:bg-[#1a233d] rounded-xl border border-white/10 text-left transition-all flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Student Roster</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('admin-resources')}
            className="p-3 bg-[#12182b] hover:bg-[#1a233d] rounded-xl border border-white/10 text-left transition-all flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">Upload Exercise Files</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => navigateTo('admin-analytics')}
            className="p-3 bg-[#12182b] hover:bg-[#1a233d] rounded-xl border border-white/10 text-left transition-all flex items-center justify-between shadow-md"
          >
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span className="text-xs font-bold text-white">View Analytics</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* 4. Course Performance Table */}
      <div className="bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-5 bg-[#070a12] border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Curriculum Portfolio & Enrolment Health</h2>
          <button
            onClick={() => navigateTo('admin-courses')}
            className="text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Manage All
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e1424] text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="px-5 py-3">Course Title</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Level</th>
                <th className="px-5 py-3">Enrolments</th>
                <th className="px-5 py-3">Rating</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {courses.map((c) => (
                <tr key={c.id} className="hover:bg-[#12182b]/60 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-white max-w-xs truncate">
                    {c.title}
                  </td>
                  <td className="px-5 py-3.5 text-slate-300">
                    {c.category} <span className="text-slate-500">({c.subcategory})</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <span className="px-2 py-0.5 bg-[#12182b] border border-white/10 text-emerald-300 rounded-md font-semibold text-[10px]">
                      {c.level}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 font-mono font-semibold text-slate-200">
                    {c.enrolmentsCount.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 font-semibold text-amber-400">
                    ★ {c.rating.toFixed(1)}
                  </td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        c.published
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {c.published ? 'Live' : 'Draft'}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-right space-x-2">
                    <button
                      onClick={() => navigateTo('admin-courses')}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => navigateTo('course-detail', c.id)}
                      className="text-xs font-bold text-slate-400 hover:text-slate-200"
                    >
                      Preview
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
