import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/course/CourseCard';
import { CourseCardSkeleton } from '../components/ui/Skeleton';
import { CourseCategory, CourseLevel } from '../types';
import { Search, Filter, BookOpen, Layers, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';

export const CoursesCataloguePage: React.FC = () => {
  const { courses, searchQuery, setSearchQuery } = useApp();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [selectedSoftware, setSelectedSoftware] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'popular' | 'rating' | 'newest' | 'duration'>('popular');
  const [isLoading, setIsLoading] = useState(false);

  // Categories list
  const mainCategories = ['All', 'Accounting', 'Finance', 'Practical Software'];

  const subcategoriesByCat: Record<string, string[]> = {
    Accounting: [
      'Accounting Fundamentals',
      'Financial Accounting',
      'Management Accounting',
      'Bookkeeping',
      'Payroll',
    ],
    Finance: [
      'Corporate Finance',
      'Financial Analysis',
      'Financial Modelling',
    ],
    'Practical Software': ['Xero', 'QuickBooks', 'Sage'],
  };

  const levels: (CourseLevel | 'All')[] = ['All', 'Beginner', 'Intermediate', 'Advanced'];
  const softwares = ['All', 'Xero', 'QuickBooks', 'Sage', 'Excel'];

  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => c.published)
      .filter((c) => {
        // Category
        if (selectedCategory !== 'All' && c.category !== selectedCategory) return false;
        // Subcategory
        if (selectedSubcategory !== 'All' && c.subcategory !== selectedSubcategory) return false;
        // Level
        if (selectedLevel !== 'All' && c.level !== selectedLevel) return false;
        // Software
        if (selectedSoftware !== 'All') {
          if (!c.softwareUsed || !c.softwareUsed.includes(selectedSoftware as any)) return false;
        }
        // Search Query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = c.title.toLowerCase().includes(q);
          const matchDesc = c.description.toLowerCase().includes(q);
          const matchSub = c.subcategory.toLowerCase().includes(q);
          const matchCat = c.category.toLowerCase().includes(q);
          const matchSoft = c.softwareUsed?.some((s) => s.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchSub && !matchCat && !matchSoft) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return b.enrolmentsCount - a.enrolmentsCount;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        return a.title.localeCompare(b.title);
      });
  }, [courses, selectedCategory, selectedSubcategory, selectedLevel, selectedSoftware, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSubcategory('All');
    setSelectedLevel('All');
    setSelectedSoftware('All');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 text-white">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Course Catalogue
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Explore structured accounting, finance, and software courses authored exclusively by EIXO Learning.
            </p>
          </div>

          {/* Quick Search */}
          <div className="w-full sm:w-72">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search all courses..."
                className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#0b0f19] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 shadow-inner"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>
          </div>
        </div>

        {/* Primary Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 no-scrollbar">
          {mainCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setSelectedSubcategory('All');
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)] border border-emerald-400/30'
                  : 'bg-[#0b0f19] text-slate-300 hover:bg-[#12182b] border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Subcategories pills if specific category selected */}
        {selectedCategory !== 'All' && subcategoriesByCat[selectedCategory] && (
          <div className="flex items-center gap-1.5 overflow-x-auto pt-2 no-scrollbar">
            <span className="text-[11px] font-semibold text-slate-400 mr-1 uppercase">Subcategory:</span>
            <button
              onClick={() => setSelectedSubcategory('All')}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                selectedSubcategory === 'All'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                  : 'bg-[#12182b] text-slate-400 hover:bg-[#1c294a] border border-white/10'
              }`}
            >
              All {selectedCategory}
            </button>
            {subcategoriesByCat[selectedCategory].map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubcategory(sub)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  selectedSubcategory === sub
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_8px_rgba(16,185,129,0.2)]'
                    : 'bg-[#12182b] text-slate-400 hover:bg-[#1c294a] border border-white/10'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Filter & Sort Bar */}
      <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-4 text-xs">
        
        {/* Left: Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 font-semibold">
            <Filter className="w-3.5 h-3.5 text-emerald-400" />
            <span>Filter:</span>
          </div>

          {/* Level Filter */}
          <select
            value={selectedLevel}
            onChange={(e) => setSelectedLevel(e.target.value)}
            className="p-1.5 bg-[#12182b] border border-white/10 rounded-lg font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {levels.map((lvl) => (
              <option key={lvl} value={lvl} className="bg-[#0b0f19] text-white">
                Level: {lvl}
              </option>
            ))}
          </select>

          {/* Software Filter */}
          <select
            value={selectedSoftware}
            onChange={(e) => setSelectedSoftware(e.target.value)}
            className="p-1.5 bg-[#12182b] border border-white/10 rounded-lg font-medium text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {softwares.map((sw) => (
              <option key={sw} value={sw} className="bg-[#0b0f19] text-white">
                Software: {sw}
              </option>
            ))}
          </select>

          {(selectedCategory !== 'All' ||
            selectedSubcategory !== 'All' ||
            selectedLevel !== 'All' ||
            selectedSoftware !== 'All' ||
            searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 ml-1 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* Right: Results Count & Sort */}
        <div className="flex items-center gap-3 ml-auto">
          <span className="text-slate-400 font-medium">
            Showing <strong className="text-white font-bold">{filteredCourses.length}</strong> courses
          </span>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="p-1.5 bg-[#12182b] border border-white/10 rounded-lg font-semibold text-slate-200 focus:outline-none"
            >
              <option value="popular" className="bg-[#0b0f19] text-white">Most Popular</option>
              <option value="rating" className="bg-[#0b0f19] text-white">Highest Rated</option>
              <option value="newest" className="bg-[#0b0f19] text-white">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid of Course Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <CourseCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#0b0f19] rounded-2xl border border-white/10 p-8 space-y-4 shadow-xl">
          <BookOpen className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No matching courses found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search keywords or clearing specific subcategory and software filters.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            Clear All Filters
          </button>
        </div>
      )}
    </div>
  );
};
