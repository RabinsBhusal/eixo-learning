import React from 'react';
import { Course } from '../../types';
import { useApp } from '../../context/AppContext';
import { Hourglass, Timer, Infinity, Star, CheckCircle2, Award, ChevronRight } from 'lucide-react';

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

  // Custom metadata mappings to match the screenshot style perfectly
  const getInstitution = (id: string) => {
    switch (id) {
      case 'course-xero-1':
        return 'EIXO Faculty & Xero Partners';
      case 'course-fin-acc-1':
        return 'London School of Business & Finance';
      case 'course-corp-fin-1':
        return 'Cambridge Financial Institute';
      case 'course-quickbooks-1':
        return 'Intuit Approved Curriculum & EIXO';
      case 'course-mgmt-acc-1':
        return 'CIMA Aligned Academic Cell';
      case 'course-sage-1':
        return 'Sage Professional Training Academy';
      case 'course-ratio-1':
        return 'Oxford Corporate Finance Group';
      case 'course-payroll-1':
        return 'HMRC Aligned Practitioner Cell';
      default:
        return 'EIXO Learning Faculty';
    }
  };

  const getWeeks = (id: string) => {
    switch (id) {
      case 'course-xero-1': return '4 weeks';
      case 'course-fin-acc-1': return '6 weeks';
      case 'course-corp-fin-1': return '8 weeks';
      case 'course-quickbooks-1': return '4 weeks';
      case 'course-mgmt-acc-1': return '6 weeks';
      case 'course-sage-1': return '4 weeks';
      case 'course-ratio-1': return '5 weeks';
      case 'course-payroll-1': return '4 weeks';
      default: return '5 weeks';
    }
  };

  const getWorkload = (id: string) => {
    switch (id) {
      case 'course-xero-1': return '3 hrs per week';
      case 'course-fin-acc-1': return '2 hrs per week';
      case 'course-corp-fin-1': return '3.5 hrs per week';
      case 'course-quickbooks-1': return '3 hrs per week';
      case 'course-mgmt-acc-1': return '4 hrs per week';
      case 'course-sage-1': return '2.5 hrs per week';
      case 'course-ratio-1': return '3 hrs per week';
      case 'course-payroll-1': return '3 hrs per week';
      default: return '3 hrs per week';
    }
  };

  const getInclusionLabel = (id: string) => {
    if (['course-xero-1', 'course-fin-acc-1', 'course-quickbooks-1', 'course-corp-fin-1'].includes(id)) {
      return 'Included in Unlimited';
    }
    return 'Free digital upgrade';
  };

  return (
    <div
      onClick={handleCardClick}
      className={`group bg-[#fafbfc] rounded-none border border-slate-200/90 hover:border-emerald-500 hover:shadow-xl hover:shadow-emerald-950/5 hover:ring-1 hover:ring-emerald-500/30 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer text-slate-800 ${
        featured ? 'ring-2 ring-emerald-500/60 shadow-lg' : ''
      }`}
    >
      {/* Thumbnail Area */}
      <div className="relative aspect-16/9 w-full bg-slate-100 overflow-hidden">
        <img
          src={course.thumbnail}
          alt={course.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
        />

        {/* Category & Level pills inside thumbnail */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          <span className="px-2 py-0.5 bg-slate-900/90 text-white text-[10px] font-bold uppercase tracking-wider rounded">
            {course.category}
          </span>
          {course.level && (
            <span className="px-2 py-0.5 bg-emerald-700/95 text-white text-[10px] font-bold uppercase tracking-wider rounded">
              {course.level}
            </span>
          )}
        </div>

        {/* Software badges */}
        {course.softwareUsed && course.softwareUsed.length > 0 && (
          <div className="absolute bottom-3 right-3 flex gap-1 pointer-events-none">
            {course.softwareUsed.map((sw) => (
              <span
                key={sw}
                className="px-1.5 py-0.5 bg-white border border-slate-200 text-slate-800 text-[9px] font-extrabold uppercase rounded shadow-xs"
              >
                {sw}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3.5">
        <div className="space-y-1.5">
          {/* Institution / Author (at the top of text description) */}
          <span className="text-[#5c6f84] text-[11px] font-bold tracking-wide uppercase block">
            {getInstitution(course.id)}
          </span>

          {/* Title */}
          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 group-hover:text-emerald-600 transition-colors leading-snug line-clamp-2">
            {course.title}
          </h3>

          {/* Progress Bar if enrolled */}
          {isEnrolled && (
            <div className="mt-2 space-y-1 bg-slate-50 p-2 rounded border border-slate-100">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-600">
                <span className="flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Your Study Progress
                </span>
                <span className="text-emerald-600">{percentComplete}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                  style={{ width: `${percentComplete}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Bottom Metadata & Find Out More Button */}
        <div className="pt-2.5 border-t border-slate-100 space-y-3">
          {/* Duration & Lessons Row */}
          <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 font-semibold">
            <div className="flex items-center gap-1.5">
              <Hourglass className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{getWeeks(course.id)}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="w-3.5 h-3.5 text-slate-500 shrink-0" />
              <span>{getWorkload(course.id)}</span>
            </div>
          </div>

          {/* Inclusion Tier */}
          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 font-medium">
            <Infinity className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>{getInclusionLabel(course.id)}</span>
          </div>
        </div>
      </div>

      {/* Find out more Emerald Button */}
      <button
        onClick={handleActionClick}
        className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider transition-colors text-center shrink-0 border-t border-transparent"
      >
        {isEnrolled ? 'Continue Study' : 'Find out more'}
      </button>
    </div>
  );
};

