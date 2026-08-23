import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CertificateModal } from '../../components/ui/CertificateModal';
import { Course } from '../../types';
import {
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  Download,
  ShieldCheck,
  Sparkles,
  Zap,
  Layers,
} from 'lucide-react';

export const ProgressBadgesPage: React.FC = () => {
  const { currentUser, courses, progress, lessons, navigateTo } = useApp();
  const [selectedCertificateCourse, setSelectedCertificateCourse] = useState<Course | null>(null);

  const enrolledCourses = courses.filter((c) =>
    currentUser?.enrolledCourseIds.includes(c.id)
  );

  const badges = [
    {
      id: 'badge-1',
      title: 'Double-Entry Master',
      desc: 'Mastered the DEAD CLIC accounting equation and journal adjustments.',
      unlocked: true,
      icon: '⚖️',
      date: 'Earned 2 days ago',
    },
    {
      id: 'badge-2',
      title: 'Xero Certified Workflow',
      desc: 'Completed end-to-end bank feed reconciliation and sales ledger posting.',
      unlocked: true,
      icon: '📊',
      date: 'Earned yesterday',
    },
    {
      id: 'badge-3',
      title: 'Statement Architect',
      desc: 'Balanced Balance Sheets and constructed multi-step Income Statements.',
      unlocked: false,
      icon: '🏛️',
      date: 'In progress (80%)',
    },
    {
      id: 'badge-4',
      title: 'DCF Modeller',
      desc: 'Built dynamic 3-statement financial models with WACC discount rates.',
      unlocked: false,
      icon: '📈',
      date: 'Locked',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Progress & Verified Credentials
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Track your milestone completion, earn skill badges, and generate official EIXO certificates.
        </p>
      </div>

      {/* Badges Section */}
      <div className="space-y-4">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Accounting Competency Badges</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {badges.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition-all ${
                b.unlocked
                  ? 'bg-[#0b0f19] border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                  : 'bg-[#0b0f19]/40 border-white/5 opacity-50'
              }`}
            >
              <div className="text-3xl mb-3">{b.icon}</div>
              <h3 className="text-xs font-bold text-white">{b.title}</h3>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{b.desc}</p>
              <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-[10px]">
                <span className={b.unlocked ? 'text-emerald-400 font-bold' : 'text-slate-500 font-medium'}>
                  {b.date}
                </span>
                {b.unlocked && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enrolled Courses Detailed Progress Table */}
      <div className="bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-5 bg-[#070a12] border-b border-white/10 flex items-center justify-between">
          <h2 className="text-sm font-bold text-white">Course Progress Breakdown</h2>
          <span className="text-xs text-slate-400">{enrolledCourses.length} Courses Total</span>
        </div>

        <div className="divide-y divide-white/5">
          {enrolledCourses.map((course) => {
            const courseProg = progress.find(
              (p) => p.userId === currentUser?.id && p.courseId === course.id
            );
            const courseLessons = lessons.filter((l) => l.courseId === course.id);
            const completedCount = courseProg?.completedLessonIds.length || 0;
            const pct = courseProg?.percentComplete || 0;
            const isCompleted = pct >= 80;

            return (
              <div key={course.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1.5 max-w-md">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-[#12182b] text-emerald-300 border border-white/10 rounded text-[10px] font-bold">
                      {course.category}
                    </span>
                    <h3 className="text-xs font-bold text-white">{course.title}</h3>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-slate-400">
                    <span>
                      {completedCount} of {courseLessons.length || course.totalLessons} lessons completed
                    </span>
                    <span>•</span>
                    <span>{course.duration}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-black/60 border border-white/10 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs font-mono font-bold text-emerald-400">{pct}%</span>

                  {isCompleted ? (
                    <button
                      onClick={() => setSelectedCertificateCourse(course)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>View Certificate</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => navigateTo('course-player', course.id)}
                      className="px-3 py-1.5 bg-[#12182b] hover:bg-[#1a233d] border border-white/10 text-white rounded-xl text-xs font-semibold transition-all"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Certificate Modal */}
      {selectedCertificateCourse && currentUser && (
        <CertificateModal
          course={selectedCertificateCourse}
          user={currentUser}
          onClose={() => setSelectedCertificateCourse(null)}
        />
      )}
    </div>
  );
};
