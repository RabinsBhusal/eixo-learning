import React from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { Clock, BookOpen, Star, Play, CheckCircle2, Award, ChevronRight } from 'lucide-react';

interface CourseCardProps {
  course: Course;
  featured?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, featured = false }) => {
  const { currentUser, getCourseProgress, enrollCourse, navigateTo } = useApp();
  const isEnrolled = currentUser?.enrolledCourseIds.includes(course.id);
  const progress = getCourseProgress(course.id);
  const percentComplete = progress?.percentComplete || 0;

  const handleCardClick = () => {
    if (isEnrolled) {
      navigateTo('course-player', course.id);
    } else {
      navigateTo('course-detail', course.id);
    }
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEnrolled) {
      navigateTo('course-player', course.id);
    } else {
      enrollCourse(course.id);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-[#0d1220]/80 backdrop-blur-xl rounded-xl border border-white/10 hover:border-emerald-500/40 hover:shadow-[0_0_25px_rgba(16,185,129,0.15)] transition-all duration-300 overflow-hidden flex flex-col cursor-pointer ${
        featured ? 'ring-1 ring-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.2)]' : ''
      }`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-16/9 w-full bg-slate-900 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d1220] via-transparent to-transparent opacity-80" />

        {/* Category Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-white text-[11px] font-semibold rounded-md shadow-xs">
            {course.category}
          </span>
          {course.level && (
            <span className="px-2 py-1 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-[11px] font-medium rounded-md">
              {course.level}
            </span>
          )}
        </div>

        {/* Software badges */}
        {course.softwareUsed && course.softwareUsed.length > 0 && (
          <div className="absolute bottom-3 right-3 flex gap-1">
            {course.softwareUsed.map((sw) => (
              <span
                key={sw}
                className="px-2 py-0.5 bg-[#0b0f19]/90 backdrop-blur-md border border-white/15 text-slate-200 text-[10px] font-bold rounded shadow-xs"
              >
                {sw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          {/* Subcategory & Rating */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-medium text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded">
              {course.subcategory}
            </span>
            <div className="flex items-center gap-1 text-emerald-400 font-semibold">
              <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400" />
              <span>{course.rating.toFixed(1)}</span>
              <span className="text-slate-500 font-normal">({course.ratingCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-bold text-base text-white group-hover:text-emerald-400 transition-colors leading-snug line-clamp-2">
            {course.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {course.shortDescription}
          </p>
        </div>

        {/* Bottom Metadata & CTA */}
        <div className="pt-3 border-t border-white/10 space-y-3">
          {/* Duration & Lessons */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-slate-400" />
              <span>{course.totalLessons} Lessons</span>
            </div>
          </div>

          {/* Progress Bar if enrolled */}
          {isEnrolled && (
            <div className="space-y-1 bg-[#12182b] p-2.5 rounded-lg border border-white/10">
              <div className="flex items-center justify-between text-[11px] font-semibold text-slate-300">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Progress
                </span>
                <span className="text-emerald-400">{percentComplete}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <span className="text-xs font-semibold text-slate-300">
              {isEnrolled ? (
                percentComplete === 100 ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" /> Completed
                  </span>
                ) : (
                  'In Progress'
                )
              ) : (
                'Included in EIXO'
              )}
            </span>

            <button
              onClick={handleActionClick}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                isEnrolled
                  ? 'bg-[#151f38] hover:bg-[#1a2948] text-white border border-white/10 shadow-xs'
                  : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_12px_rgba(16,185,129,0.25)]'
              }`}
            >
              <span>{isEnrolled ? 'Continue Course' : 'View Course'}</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
