import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseCard } from '../../components/course/CourseCard';
import { BookOpen, Search, Filter } from 'lucide-react';

export const MyCoursesPage: React.FC = () => {
  const { currentUser, courses, progress, navigateTo } = useApp();
  const [filterStatus, setFilterStatus] = useState<'all' | 'in-progress' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const enrolledCourses = courses.filter((c) =>
    currentUser?.enrolledCourseIds.includes(c.id)
  );

  const filteredCourses = enrolledCourses.filter((course) => {
    const prog = progress.find((p) => p.userId === currentUser?.id && p.courseId === course.id);
    const pct = prog?.percentComplete || 0;

    if (filterStatus === 'in-progress' && (pct === 0 || pct === 100)) return false;
    if (filterStatus === 'completed' && pct < 100) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        course.title.toLowerCase().includes(q) ||
        course.category.toLowerCase().includes(q) ||
        course.subcategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 text-white">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">My Courses</h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage your enrolled accounting and finance curriculum modules.
          </p>
        </div>

        <button
          onClick={() => navigateTo('courses')}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
        >
          Enrol in More Courses
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Status Filters */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                : 'bg-[#12182b] text-slate-300 hover:bg-[#1a233d]'
            }`}
          >
            All Enrolled ({enrolledCourses.length})
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterStatus === 'in-progress'
                ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                : 'bg-[#12182b] text-slate-300 hover:bg-[#1a233d]'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              filterStatus === 'completed'
                ? 'bg-emerald-600 text-white shadow-[0_0_10px_rgba(16,185,129,0.4)]'
                : 'bg-[#12182b] text-slate-300 hover:bg-[#1a233d]'
            }`}
          >
            Completed
          </button>
        </div>

        {/* Search */}
        <div className="w-full sm:w-64 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search my courses..."
            className="w-full text-xs pl-8 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0b0f19] rounded-2xl border border-white/10 p-8 space-y-4 shadow-xl">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-sm font-bold text-white">No courses match your filter</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try switching the status filter or explore our course catalogue to start a new learning track.
          </p>
          <button
            onClick={() => navigateTo('courses')}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            Browse Catalogue
          </button>
        </div>
      )}
    </div>
  );
};
