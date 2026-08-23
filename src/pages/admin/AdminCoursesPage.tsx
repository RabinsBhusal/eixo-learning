import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Course, CourseCategory, CourseLevel, Lesson, Module } from '../../types';
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  BookOpen,
  Search,
  CheckCircle,
  X,
  Layers,
  Save,
  Video,
  FileSpreadsheet,
} from 'lucide-react';

export const AdminCoursesPage: React.FC = () => {
  const {
    courses,
    addCourse,
    updateCourse,
    deleteCourse,
    modules,
    lessons,
    addLesson,
    updateLesson,
    deleteLesson,
    navigateTo,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreatingCourse, setIsCreatingCourse] = useState(false);
  const [managingLessonsCourse, setManagingLessonsCourse] = useState<Course | null>(null);
  const [isAddingLesson, setIsAddingLesson] = useState(false);

  // New Course Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<CourseCategory>('Accounting');
  const [newSubcategory, setNewSubcategory] = useState('Financial Accounting');
  const [newLevel, setNewLevel] = useState<CourseLevel>('Beginner');
  const [newDuration, setNewDuration] = useState('5 hours');
  const [newThumbnail, setNewThumbnail] = useState(
    'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80'
  );
  const [newDescription, setNewDescription] = useState('');
  const [newPublished, setNewPublished] = useState(true);

  // New Lesson Form State
  const [newLessonTitle, setNewLessonTitle] = useState('');
  const [newLessonVimeoId, setNewLessonVimeoId] = useState('76979871');
  const [newLessonDuration, setNewLessonDuration] = useState('12 min');
  const [newLessonDescription, setNewLessonDescription] = useState('');
  const [newLessonNotes, setNewLessonNotes] = useState('');
  const [selectedModuleId, setSelectedModuleId] = useState('');

  const filteredCourses = courses.filter((c) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        c.title.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q) ||
        c.subcategory.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    addCourse({
      title: newTitle,
      category: newCategory,
      subcategory: newSubcategory,
      level: newLevel,
      duration: newDuration,
      thumbnail: newThumbnail,
      description: newDescription,
      whatYouWillLearn: [
        'Master key double-entry mechanics and accounting rules.',
        'Understand balance sheet and income statement impacts.',
        'Perform real practical entries in cloud software.',
      ],
      requirements: ['Basic computer literacy', 'Spreadsheet software (Excel or Google Sheets)'],
      targetAudience: ['Finance students', 'Small business owners', 'Bookkeepers'],
      published: newPublished,
      instructor: {
        id: 'inst-1',
        name: 'EIXO Academic Faculty',
        title: 'Chartered Accountants & Finance Faculty',
        bio: 'Single-standard accounting curriculum verified by chartered faculty.',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        credentials: ['ICAEW', 'ACCA', 'CFA', 'Xero Certified'],
      },
    });

    setIsCreatingCourse(false);
    setNewTitle('');
    setNewDescription('');
  };

  const handleUpdateCourseSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCourse) return;
    updateCourse(editingCourse.id, editingCourse);
    setEditingCourse(null);
  };

  const handleCreateLesson = (e: React.FormEvent) => {
    e.preventDefault();
    if (!managingLessonsCourse || !newLessonTitle) return;

    const courseMods = modules.filter((m) => m.courseId === managingLessonsCourse.id);
    const modId = selectedModuleId || courseMods[0]?.id || 'mod-default';

    addLesson({
      courseId: managingLessonsCourse.id,
      moduleId: modId,
      title: newLessonTitle,
      duration: newLessonDuration,
      vimeoId: newLessonVimeoId,
      order: lessons.filter((l) => l.courseId === managingLessonsCourse.id).length + 1,
      description: newLessonDescription,
      notesMarkdown: newLessonNotes || '### Key Concept\nMaster the accounting transaction.',
    });

    setIsAddingLesson(false);
    setNewLessonTitle('');
    setNewLessonDescription('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Course Portfolio Manager
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Create, edit, and publish accounting, finance, and practical software courses.
          </p>
        </div>

        <button
          onClick={() => setIsCreatingCourse(true)}
          className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Course</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between gap-4">
        <div className="w-full sm:w-80 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses by title, category..."
            className="w-full text-xs pl-8 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
        </div>
        <span className="text-xs text-slate-400">{filteredCourses.length} Courses</span>
      </div>

      {/* Courses List Table */}
      <div className="bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#0e1424] text-slate-400 font-semibold border-b border-white/10">
            <tr>
              <th className="px-5 py-3">Course</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Level & Duration</th>
              <th className="px-5 py-3">Lessons</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filteredCourses.map((c) => {
              const courseLessons = lessons.filter((l) => l.courseId === c.id);

              return (
                <tr key={c.id} className="hover:bg-[#12182b]/60 transition-colors">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={c.thumbnail}
                        alt={c.title}
                        referrerPolicy="no-referrer"
                        className="w-12 h-8 rounded-md object-cover border border-white/10 shrink-0"
                      />
                      <div className="min-w-0 max-w-xs">
                        <p className="font-bold text-white truncate">{c.title}</p>
                        <p className="text-[10px] text-slate-400 truncate">{c.description}</p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-slate-300">
                    <div className="font-medium text-white">{c.category}</div>
                    <div className="text-[11px] text-slate-400">{c.subcategory}</div>
                  </td>

                  <td className="px-5 py-4">
                    <div className="font-medium text-white">{c.level}</div>
                    <div className="text-[11px] text-slate-400">{c.duration}</div>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => setManagingLessonsCourse(c)}
                      className="px-2.5 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold text-[11px] flex items-center gap-1 transition-colors"
                    >
                      <Video className="w-3 h-3 text-emerald-400" />
                      <span>{courseLessons.length} Lessons (Manage)</span>
                    </button>
                  </td>

                  <td className="px-5 py-4">
                    <button
                      onClick={() => updateCourse(c.id, { published: !c.published })}
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 ${
                        c.published
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          : 'bg-slate-800 text-slate-400 border border-white/5'
                      }`}
                    >
                      {c.published ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{c.published ? 'Published' : 'Draft'}</span>
                    </button>
                  </td>

                  <td className="px-5 py-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingCourse(c)}
                      className="p-1.5 text-emerald-400 hover:text-emerald-300 rounded-lg hover:bg-white/5 transition-colors"
                      title="Edit Course"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${c.title}"?`)) {
                          deleteCourse(c.id);
                        }
                      }}
                      className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors"
                      title="Delete Course"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* CREATE COURSE MODAL */}
      {isCreatingCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0f19] rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Create New Course</h2>
              <button onClick={() => setIsCreatingCourse(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Financial Statement Analysis & Modelling"
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  >
                    <option value="Accounting" className="bg-[#0b0f19] text-white">Accounting</option>
                    <option value="Finance" className="bg-[#0b0f19] text-white">Finance</option>
                    <option value="Practical Software" className="bg-[#0b0f19] text-white">Practical Software</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Subcategory</label>
                  <input
                    type="text"
                    value={newSubcategory}
                    onChange={(e) => setNewSubcategory(e.target.value)}
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Skill Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as any)}
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  >
                    <option value="Beginner" className="bg-[#0b0f19] text-white">Beginner</option>
                    <option value="Intermediate" className="bg-[#0b0f19] text-white">Intermediate</option>
                    <option value="Advanced" className="bg-[#0b0f19] text-white">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={newDuration}
                    onChange={(e) => setNewDuration(e.target.value)}
                    placeholder="e.g. 6.5 hours"
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Comprehensive description of the course, target competencies, and real-world software workflows..."
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={newPublished}
                    onChange={(e) => setNewPublished(e.target.checked)}
                    className="rounded bg-[#12182b] border-white/20 text-emerald-500 focus:ring-emerald-500/30"
                  />
                  <span className="font-semibold text-slate-300">Publish immediately to Student Catalogue</span>
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCreatingCourse(false)}
                    className="px-4 py-2 bg-[#12182b] hover:bg-[#1a233d] border border-white/10 text-slate-300 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                  >
                    Save Course
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT COURSE MODAL */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] rounded-2xl max-w-2xl w-full p-6 space-y-6 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Edit Course Details</h2>
              <button onClick={() => setEditingCourse(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateCourseSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  value={editingCourse.title}
                  onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Category</label>
                  <input
                    type="text"
                    value={editingCourse.category}
                    onChange={(e) => setEditingCourse({ ...editingCourse, category: e.target.value as any })}
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Duration</label>
                  <input
                    type="text"
                    value={editingCourse.duration}
                    onChange={(e) => setEditingCourse({ ...editingCourse, duration: e.target.value })}
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editingCourse.description}
                  onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingCourse(null)}
                  className="px-4 py-2 bg-[#12182b] hover:bg-[#1a233d] border border-white/10 text-slate-300 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  Update Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MANAGE LESSONS MODAL */}
      {managingLessonsCourse && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#0b0f19] rounded-2xl max-w-3xl w-full p-6 space-y-6 shadow-2xl border border-white/10 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-lg font-bold text-white">Manage Lessons</h2>
                <p className="text-xs text-slate-400">{managingLessonsCourse.title}</p>
              </div>
              <button onClick={() => setManagingLessonsCourse(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List of current lessons */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">Course Lessons</h3>
                <button
                  onClick={() => setIsAddingLesson(!isAddingLesson)}
                  className="text-xs text-emerald-400 font-bold hover:text-emerald-300 flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Lesson</span>
                </button>
              </div>

              <div className="divide-y divide-white/5 border border-white/10 rounded-2xl overflow-hidden bg-[#12182b]">
                {lessons
                  .filter((l) => l.courseId === managingLessonsCourse.id)
                  .map((les) => (
                    <div key={les.id} className="p-3 bg-[#12182b] flex items-center justify-between text-xs hover:bg-[#161f38] transition-colors">
                      <div>
                        <span className="font-bold text-white">{les.title}</span>
                        <div className="text-[10px] text-slate-400">
                          Vimeo ID: <span className="font-mono text-emerald-400">{les.vimeoId}</span> • Duration: {les.duration}
                        </div>
                      </div>
                      <button
                        onClick={() => deleteLesson(les.id)}
                        className="text-rose-400 hover:text-rose-300 p-1.5 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Delete lesson"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Add Lesson Form */}
            {isAddingLesson && (
              <form onSubmit={handleCreateLesson} className="p-4 bg-[#12182b] rounded-2xl border border-white/10 space-y-3 text-xs">
                <h4 className="font-bold text-white">New Lesson Details</h4>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lesson Title</label>
                  <input
                    type="text"
                    required
                    value={newLessonTitle}
                    onChange={(e) => setNewLessonTitle(e.target.value)}
                    placeholder="e.g. Bank Feed Reconciliations in Xero"
                    className="w-full p-2.5 bg-[#0b0f19] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Vimeo Video ID</label>
                    <input
                      type="text"
                      required
                      value={newLessonVimeoId}
                      onChange={(e) => setNewLessonVimeoId(e.target.value)}
                      placeholder="e.g. 76979871"
                      className="w-full p-2.5 bg-[#0b0f19] border border-white/10 rounded-xl text-white font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newLessonDuration}
                      onChange={(e) => setNewLessonDuration(e.target.value)}
                      placeholder="e.g. 15 min"
                      className="w-full p-2.5 bg-[#0b0f19] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Lesson Notes & Accounting Rules (Markdown)</label>
                  <textarea
                    rows={3}
                    value={newLessonNotes}
                    onChange={(e) => setNewLessonNotes(e.target.value)}
                    placeholder="Explain the debit and credit principles..."
                    className="w-full p-2.5 bg-[#0b0f19] border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingLesson(false)}
                    className="px-3.5 py-2 bg-[#0b0f19] hover:bg-[#161f38] border border-white/10 text-slate-300 rounded-xl font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
                  >
                    Save Lesson
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
