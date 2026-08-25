import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  BookOpen,
  Scale,
} from 'lucide-react';

export const AdminAnalyticsPage: React.FC = () => {
  const { courses, progress, allUsers } = useApp();

  const students = allUsers.filter((u) => u.role === 'student');
  const certificatesEarned = progress.filter((p) => p.percentComplete >= 80).length;

  const categories = [
    { name: 'Accounting', count: courses.filter((c) => c.category === 'Accounting').length, color: 'bg-emerald-600' },
    { name: 'Finance', count: courses.filter((c) => c.category === 'Finance').length, color: 'bg-blue-600' },
    { name: 'Practical Software', count: courses.filter((c) => c.category === 'Practical Software').length, color: 'bg-indigo-600' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Curriculum & Learner Analytics
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Detailed metrics across student completion rates, quiz assessments, and curriculum engagement.
        </p>
      </div>

      {/* Top High-level stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0b0f19] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="text-xs font-semibold text-slate-400">Average Student Progress</div>
          <div className="text-3xl font-extrabold text-white">68.4%</div>
          <p className="text-xs text-emerald-400 font-medium">↑ 12% increase across Xero modules</p>
        </div>

        <div className="bg-[#0b0f19] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="text-xs font-semibold text-slate-400">Quiz First-Time Pass Rate</div>
          <div className="text-3xl font-extrabold text-white">89.2%</div>
          <p className="text-xs text-emerald-400 font-medium">Strong retention on double-entry rules</p>
        </div>

        <div className="bg-[#0b0f19] p-6 rounded-2xl border border-white/10 shadow-lg space-y-2">
          <div className="text-xs font-semibold text-slate-400">Official Certificates Issued</div>
          <div className="text-3xl font-extrabold text-emerald-400">{certificatesEarned}</div>
          <p className="text-xs text-slate-400">Tamper-evident verification IDs</p>
        </div>
      </div>

      {/* Course Enrollment Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Category distribution */}
        <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white">Curriculum Portfolio Distribution</h2>
          <p className="text-xs text-slate-400">Course offerings across core disciplines</p>

          <div className="space-y-4 pt-2">
            {categories.map((cat) => (
              <div key={cat.name} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-slate-200">{cat.name}</span>
                  <span className="text-slate-400">{cat.count} courses</span>
                </div>
                <div className="w-full h-2.5 bg-[#12182b] rounded-full overflow-hidden border border-white/5">
                  <div
                    className={`h-full ${cat.color} rounded-full`}
                    style={{ width: `${(cat.count / courses.length) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Courses */}
        <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
          <h2 className="text-base font-bold text-white">Top Enrolled Courses</h2>
          <div className="space-y-3 text-xs">
            {courses.slice(0, 4).map((c, i) => (
              <div key={c.id} className="p-3 bg-[#12182b] rounded-xl flex items-center justify-between border border-white/10 hover:border-emerald-500/30 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold flex items-center justify-center text-[10px]">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-bold text-white">{c.title}</p>
                    <p className="text-[10px] text-slate-400">{c.category}</p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-white">{c.enrolmentsCount.toLocaleString()}</div>
                  <div className="text-[10px] text-slate-400">students</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
