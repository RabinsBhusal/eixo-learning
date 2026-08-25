import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Clock,
  BookOpen,
  Star,
  CheckCircle2,
  PlayCircle,
  Download,
  Award,
  ChevronDown,
  ChevronUp,
  FileSpreadsheet,
  Lock,
  ArrowRight,
  ShieldCheck,
  Check,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const {
    selectedCourseId,
    courses,
    modules,
    lessons,
    resources,
    currentUser,
    enrollCourse,
    navigateTo,
    getCourseProgress,
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const courseModules = modules
    .filter((m) => m.courseId === course?.id)
    .sort((a, b) => a.order - b.order);
  const courseLessons = lessons.filter((l) => l.courseId === course?.id);
  const courseResources = resources.filter((r) => r.courseId === course?.id);

  const isEnrolled = currentUser?.enrolledCourseIds.includes(course?.id || '');
  const progress = course ? getCourseProgress(course.id) : undefined;

  // Accordion state
  const [expandedModules, setExpandedModules] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    courseModules.forEach((m, idx) => {
      initial[m.id] = idx === 0 || idx === 1; // Open first 2 modules by default
    });
    return initial;
  });

  const toggleModule = (modId: string) => {
    setExpandedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  const expandAll = () => {
    const next: Record<string, boolean> = {};
    courseModules.forEach((m) => (next[m.id] = true));
    setExpandedModules(next);
  };

  const collapseAll = () => {
    setExpandedModules({});
  };

  if (!course) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">Course Not Found</h2>
        <button
          onClick={() => navigateTo('courses')}
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
        >
          Return to Catalogue
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 space-y-12 text-white">
      
      {/* 1. HERO HEADER */}
      <section className="bg-[#070a12] text-white py-12 lg:py-16 border-b border-white/10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-4 text-left">
              {/* Category Breadcrumbs */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                <button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors">
                  Courses
                </button>
                <span>/</span>
                <span className="text-emerald-400 font-semibold">{course.category}</span>
                <span>/</span>
                <span className="text-slate-300">{course.subcategory}</span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                {course.title}
              </h1>

              {/* Short Description */}
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                {course.description}
              </p>

              {/* Metadata Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300 pt-2">
                <div className="flex items-center gap-1 text-emerald-400 font-bold">
                  <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  <span>{course.rating.toFixed(1)}</span>
                  <span className="text-slate-400 font-normal">({course.ratingCount} student ratings)</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  <span>{course.duration} on-demand video</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-slate-400" />
                  <span>{course.totalLessons || courseLessons.length} lessons</span>
                </div>
                <span>•</span>
                <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-semibold text-[11px]">
                  {course.level}
                </span>
              </div>

              {/* Faculty byline */}
              <div className="flex items-center gap-3 pt-2 text-xs text-slate-400">
                <span>Course provided by:</span>
                <span className="text-white font-semibold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  {course.instructor.name} ({course.instructor.title})
                </span>
              </div>
            </div>

            {/* Right Card / Enrol Box */}
            <div className="lg:col-span-4">
              <div className="bg-[#0b0f19] text-white rounded-2xl p-6 shadow-2xl border border-white/10 space-y-6">
                <div className="aspect-16/9 rounded-xl overflow-hidden bg-black/60 relative border border-white/10">
                  <img
                    src={course.thumbnail}
                    alt={course.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-600/90 text-white flex items-center justify-center shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                      <PlayCircle className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xl font-extrabold text-white">Included in Access</span>
                    <span className="text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded">
                      Full Curriculum
                    </span>
                  </div>

                  {isEnrolled ? (
                    <button
                      onClick={() => navigateTo('course-player', course.id)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Resume Course ({progress?.percentComplete || 0}%)</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => enrollCourse(course.id)}
                      className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center justify-center gap-2"
                    >
                      <span>Enrol in Course</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}

                  <p className="text-[11px] text-center text-slate-400">
                    Includes lifetime access, downloadable Excel files & Certificate of Completion.
                  </p>
                </div>

                {/* Quick Highlights */}
                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{course.duration} Vimeo HD Video Lessons</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>{courseResources.length || 3} Downloadable Practice Datasets</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Interactive Debit & Credit Sandbox</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Official EIXO Digital Certificate</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN BODY: WHAT YOU'LL LEARN, CURRICULUM, INSTRUCTOR */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Left Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* What you'll learn */}
            <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4 shadow-xl">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                What you'll learn in this course
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                {course.whatYouWillLearn.map((item, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Curriculum & Syllabus */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white">Course Curriculum</h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {courseModules.length} Modules • {courseLessons.length} Lessons • {course.duration} Total Length
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={expandAll}
                    className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                  >
                    Expand all
                  </button>
                  <span className="text-slate-600">•</span>
                  <button
                    onClick={collapseAll}
                    className="text-xs text-slate-400 hover:text-slate-200 font-medium transition-colors"
                  >
                    Collapse all
                  </button>
                </div>
              </div>

              {/* Modules Accordion List */}
              <div className="space-y-3">
                {courseModules.map((mod, modIdx) => {
                  const modLessons = courseLessons
                    .filter((l) => l.moduleId === mod.id)
                    .sort((a, b) => a.order - b.order);
                  const isExpanded = expandedModules[mod.id];

                  return (
                    <div
                      key={mod.id}
                      className="border border-white/10 rounded-xl bg-[#0b0f19] overflow-hidden shadow-lg"
                    >
                      {/* Module Title Header */}
                      <button
                        onClick={() => toggleModule(mod.id)}
                        className="w-full px-5 py-4 bg-[#12182b]/80 hover:bg-[#151f38] flex items-center justify-between text-left transition-colors border-b border-white/10"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center justify-center shrink-0">
                            {modIdx + 1}
                          </span>
                          <div>
                            <h3 className="text-sm font-bold text-white">{mod.title}</h3>
                            {mod.description && (
                              <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">{mod.description}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-400 shrink-0">
                          <span>{modLessons.length} lessons</span>
                          {mod.duration && <span>• {mod.duration}</span>}
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                      </button>

                      {/* Lessons List inside Module */}
                      {isExpanded && (
                        <div className="divide-y divide-white/5 bg-[#0b0f19]">
                          {modLessons.map((les) => (
                            <div
                              key={les.id}
                              className="px-5 py-3.5 flex items-center justify-between hover:bg-[#12182b]/50 text-xs text-slate-300"
                            >
                              <div className="flex items-center gap-3">
                                <PlayCircle className="w-4 h-4 text-slate-400 shrink-0" />
                                <span className="font-semibold text-slate-200">{les.title}</span>
                              </div>

                              <div className="flex items-center gap-3 text-slate-400">
                                {les.order === 1 && (
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 rounded">
                                    Preview
                                  </span>
                                )}
                                <span className="font-mono text-[11px]">{les.duration}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Course Requirements & Audience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-[#0b0f19] rounded-xl border border-white/10 p-6 space-y-3">
                <h3 className="font-bold text-sm text-white">Requirements & Prerequisites</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {course.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-[#0b0f19] rounded-xl border border-white/10 p-6 space-y-3">
                <h3 className="font-bold text-sm text-white">Target Audience</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {course.targetAudience.map((aud, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold">•</span>
                      <span>{aud}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Instructor Details */}
            <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-lg font-bold text-white">Instructor & Faculty</h2>
              <div className="flex items-start gap-4">
                <img
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                  referrerPolicy="no-referrer"
                  className="w-16 h-16 rounded-full object-cover border border-white/10"
                />
                <div className="space-y-1">
                  <h3 className="font-bold text-base text-white">{course.instructor.name}</h3>
                  <p className="text-xs font-semibold text-emerald-400">{course.instructor.title}</p>
                  <p className="text-xs text-slate-300 leading-relaxed pt-1">{course.instructor.bio}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {course.instructor.credentials.map((cred) => (
                      <span
                        key={cred}
                        className="px-2 py-0.5 bg-[#12182b] text-slate-300 border border-white/10 text-[10px] font-bold rounded"
                      >
                        {cred}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Sidebar Details (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Downloadable Practice Files */}
            <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-white">Practice Workbooks</h3>
              </div>
              <p className="text-xs text-slate-400">
                This course includes verified working papers and datasets for student practice:
              </p>

              <div className="space-y-2.5">
                {courseResources.length > 0 ? (
                  courseResources.map((res) => (
                    <div
                      key={res.id}
                      className="p-3 bg-[#12182b] rounded-lg border border-white/10 text-xs flex items-center justify-between"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-semibold text-slate-200 truncate">{res.name}</p>
                        <p className="text-[10px] text-slate-400">{res.size} • {res.type.toUpperCase()}</p>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded">
                        Ready
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-3 bg-[#12182b] rounded-lg border border-white/10 text-xs text-slate-400">
                    Exercise files attached to specific lesson modules.
                  </div>
                )}
              </div>
            </div>

            {/* Accreditation / Quality statement */}
            <div className="bg-emerald-950/60 border border-emerald-500/30 text-white rounded-2xl p-6 space-y-3 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-sm text-emerald-300">The EIXO Guarantee</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every curriculum module is updated regularly to reflect changes in tax legislation, accounting standards (IFRS & UK GAAP), and the latest cloud software user interfaces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
