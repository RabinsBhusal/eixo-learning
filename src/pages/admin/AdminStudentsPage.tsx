import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Course } from '../../types';
import {
  Users,
  Search,
  BookOpen,
  Award,
  CheckCircle2,
  Plus,
  Mail,
  Briefcase,
  X,
} from 'lucide-react';

export const AdminStudentsPage: React.FC = () => {
  const { allUsers, courses, progress, enrollCourse } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudentForEnrol, setSelectedStudentForEnrol] = useState<User | null>(null);
  const [selectedCourseToEnrol, setSelectedCourseToEnrol] = useState('');

  const students = allUsers.filter((u) => u.role === 'student');

  const filteredStudents = students.filter((s) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        s.name.toLowerCase().includes(q) ||
        s.email.toLowerCase().includes(q) ||
        s.jobTitle?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleManualEnrol = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudentForEnrol || !selectedCourseToEnrol) return;
    enrollCourse(selectedCourseToEnrol);
    setSelectedStudentForEnrol(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Student Directory & Enrolments
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Monitor registered accounting learners, track course completion rates, and assign curriculum access.
          </p>
        </div>

        <div className="text-xs font-mono font-bold text-emerald-400 bg-[#12182b] border border-white/10 px-3.5 py-2 rounded-xl">
          {students.length} Registered Students
        </div>
      </div>

      {/* Search */}
      <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search students by name, email, title..."
            className="w-full text-xs pl-8 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
      </div>

      {/* Student Table */}
      <div className="bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0e1424] text-slate-400 font-semibold border-b border-white/10">
            <tr>
              <th className="px-5 py-3">Student Name</th>
              <th className="px-5 py-3">Contact & Role</th>
              <th className="px-5 py-3">Enrolled Courses</th>
              <th className="px-5 py-3">Joined Date</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredStudents.map((student) => {
              const enrolledCoursesList = courses.filter((c) =>
                student.enrolledCourseIds.includes(c.id)
              );

              return (
                <tr key={student.id} className="hover:bg-[#12182b]/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        referrerPolicy="no-referrer"
                        className="w-9 h-9 rounded-full object-cover border border-white/10"
                      />
                      <div>
                        <p className="font-bold text-white">{student.name}</p>
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          Active Student
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    <div className="flex items-center gap-1.5 text-slate-200 font-medium">
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{student.email}</span>
                    </div>
                    {student.jobTitle && (
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11px] mt-0.5">
                        <Briefcase className="w-3 h-3 text-slate-400" />
                        <span>{student.jobTitle}</span>
                      </div>
                    )}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {enrolledCoursesList.map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 bg-[#12182b] text-emerald-300 border border-white/10 rounded-md text-[10px] font-semibold truncate max-w-[140px]"
                        >
                          {c.title}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-400 font-mono text-[11px]">
                    {new Date(student.createdAt).toLocaleDateString()}
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedStudentForEnrol(student)}
                      className="px-3 py-1.5 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 font-bold rounded-xl text-xs transition-colors"
                    >
                      + Assign Course
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* MANUAL ENROL MODAL */}
      {selectedStudentForEnrol && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] rounded-2xl max-w-md w-full p-6 space-y-6 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Enrol Student in Course</h3>
                <p className="text-xs text-slate-400">{selectedStudentForEnrol.name}</p>
              </div>
              <button
                onClick={() => setSelectedStudentForEnrol(null)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleManualEnrol} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Select Course</label>
                <select
                  required
                  value={selectedCourseToEnrol}
                  onChange={(e) => setSelectedCourseToEnrol(e.target.value)}
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                >
                  <option value="" className="bg-[#0b0f19] text-white">-- Choose Course --</option>
                  {courses.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0b0f19] text-white">
                      {c.title} ({c.category})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedStudentForEnrol(null)}
                  className="px-4 py-2 bg-[#12182b] hover:bg-[#1a233d] border border-white/10 text-slate-300 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  Grant Enrolment Access
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
