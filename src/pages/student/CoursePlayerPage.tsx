import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { VimeoPlayer } from '../../components/course/VimeoPlayer';
import { DoubleEntrySandbox } from '../../components/course/DoubleEntrySandbox';
import { InteractiveQuiz } from '../../components/course/InteractiveQuiz';
import { SlideDeckViewer } from '../../components/course/SlideDeckViewer';
import { SoftwareScreenshotsViewer } from '../../components/course/SoftwareScreenshotsViewer';
import { CertificateModal } from '../../components/ui/CertificateModal';
import {
  CheckCircle2,
  PlayCircle,
  Download,
  FileSpreadsheet,
  FileText,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Scale,
  Monitor,
  Edit3,
  HelpCircle,
  Sparkles,
  Share2,
  Presentation,
} from 'lucide-react';

export const CoursePlayerPage: React.FC = () => {
  const {
    selectedCourseId,
    selectedLessonId,
    courses,
    modules,
    lessons,
    resources,
    quizzes,
    currentUser,
    getCourseProgress,
    markLessonComplete,
    updateLastAccessedLesson,
    saveLessonNote,
    getLessonNote,
    navigateTo,
  } = useApp();

  const course = courses.find((c) => c.id === selectedCourseId) || courses[0];
  const courseModules = modules
    .filter((m) => m.courseId === course?.id)
    .sort((a, b) => a.order - b.order);
  const courseLessons = lessons
    .filter((l) => l.courseId === course?.id)
    .sort((a, b) => a.order - b.order);

  // Active lesson determination
  const [activeLessonId, setActiveLessonId] = useState<string>(() => {
    if (selectedLessonId) return selectedLessonId;
    const progress = course ? getCourseProgress(course.id) : undefined;
    if (progress?.lastAccessedLessonId) return progress.lastAccessedLessonId;
    return courseLessons[0]?.id || '';
  });

  useEffect(() => {
    if (selectedLessonId) {
      setActiveLessonId(selectedLessonId);
    } else if (!activeLessonId && courseLessons[0]) {
      setActiveLessonId(courseLessons[0].id);
    }
  }, [selectedLessonId, courseLessons]);

  const activeLesson = courseLessons.find((l) => l.id === activeLessonId) || courseLessons[0];
  const progress = course ? getCourseProgress(course.id) : undefined;
  const isLessonCompleted = progress?.completedLessonIds.includes(activeLesson?.id || '') || false;
  const percentComplete = progress?.percentComplete || 0;

  // Active tab under video player
  const [activeTab, setActiveTab] = useState<'notes' | 'slides' | 'resources' | 'quiz' | 'software' | 'sandbox' | 'scratchpad'>('notes');
  const [personalNote, setPersonalNote] = useState<string>('');
  const [showCertificateModal, setShowCertificateModal] = useState<boolean>(false);

  // Load note for active lesson
  useEffect(() => {
    if (activeLesson) {
      setPersonalNote(getLessonNote(activeLesson.id));
      if (course) {
        updateLastAccessedLesson(course.id, activeLesson.id);
      }
    }
  }, [activeLessonId]);

  const handleSaveNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeLesson && course) {
      saveLessonNote(activeLesson.id, course.id, personalNote);
    }
  };

  // Lesson navigation
  const currentIndex = courseLessons.findIndex((l) => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? courseLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < courseLessons.length - 1 ? courseLessons[currentIndex + 1] : null;

  const handleSwitchLesson = (lesId: string) => {
    setActiveLessonId(lesId);
    if (course) {
      updateLastAccessedLesson(course.id, lesId);
    }
    // Auto switch to quiz tab if lesson has a quiz and not completed
    const targetLesson = courseLessons.find((l) => l.id === lesId);
    if (targetLesson?.quizId) {
      setActiveTab('quiz');
    } else {
      setActiveTab('notes');
    }
  };

  const handleToggleComplete = () => {
    if (course && activeLesson) {
      markLessonComplete(course.id, activeLesson.id, !isLessonCompleted);
    }
  };

  const handleNextLessonWithComplete = () => {
    if (course && activeLesson) {
      markLessonComplete(course.id, activeLesson.id, true);
    }
    if (nextLesson) {
      handleSwitchLesson(nextLesson.id);
    }
  };

  // Active lesson quiz & resources
  const activeQuiz = quizzes.find((q) => q.id === activeLesson?.quizId);
  const activeResources = resources.filter(
    (r) => r.courseId === course?.id && (r.lessonId === activeLesson?.id || !r.lessonId)
  );

  if (!course || !activeLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold">No lesson content available.</h2>
        <button
          onClick={() => navigateTo('courses')}
          className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold"
        >
          Return to Courses
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050508] flex flex-col text-white">
      
      {/* Top Course Player Header */}
      <div className="bg-[#070a12]/90 backdrop-blur-xl text-white border-b border-white/10 px-4 sm:px-6 py-3 shrink-0 flex items-center justify-between gap-4 sticky top-16 z-30 shadow-lg">
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => navigateTo('student-dashboard')}
            className="p-1.5 hover:bg-[#12182b] rounded-lg text-slate-400 hover:text-white transition-colors"
            title="Back to Dashboard"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <div className="min-w-0">
            <h1 className="text-xs sm:text-sm font-bold text-white truncate">
              {course.title}
            </h1>
            <div className="flex items-center gap-2 text-[11px] text-slate-400 truncate">
              <span className="text-emerald-400 font-semibold">{activeLesson.title}</span>
              <span>•</span>
              <span>{percentComplete}% Completed</span>
            </div>
          </div>
        </div>

        {/* Certificate Button if 100% */}
        <div className="flex items-center gap-3">
          {percentComplete >= 80 && currentUser && (
            <button
              onClick={() => setShowCertificateModal(true)}
              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all animate-pulse"
            >
              <Award className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Certificate</span>
            </button>
          )}

          <div className="w-24 sm:w-32 bg-black/60 border border-white/10 rounded-full h-2 overflow-hidden">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(16,185,129,0.6)]"
              style={{ width: `${percentComplete}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Dual Pane Layout: Video/Content (Left 65%) + Curriculum (Right 35%) */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLS: Video Player + Interactive Tab Bar */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Vimeo Player Container */}
            <VimeoPlayer
              vimeoId={activeLesson.vimeoId}
              title={activeLesson.title}
              isCompleted={isLessonCompleted}
              onCompleteToggle={handleToggleComplete}
              onNextLesson={nextLesson ? handleNextLessonWithComplete : undefined}
            />

            {/* Interactive Lower Navigation Tabs */}
            <div className="bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
              
              {/* Tab Header Bar */}
              <div className="flex items-center gap-1 overflow-x-auto border-b border-white/10 px-4 pt-3 bg-[#070a12]/80 no-scrollbar">
                <button
                  onClick={() => setActiveTab('notes')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'notes'
                      ? 'border-emerald-400 text-emerald-300 bg-[#0b0f19] shadow-sm'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-emerald-400" />
                  <span>Notes & Principles</span>
                </button>

                <button
                  onClick={() => setActiveTab('slides')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'slides'
                      ? 'border-emerald-400 text-emerald-300 bg-[#0b0f19] shadow-sm'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Presentation className="w-4 h-4 text-emerald-400" />
                  <span>Lecture Slides & PDF Deck</span>
                </button>

                <button
                  onClick={() => setActiveTab('resources')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'resources'
                      ? 'border-emerald-400 text-emerald-300 bg-[#0b0f19] shadow-sm'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                  <span>Exercises & Data Files ({activeResources.length})</span>
                </button>

                {activeQuiz && (
                  <button
                    onClick={() => setActiveTab('quiz')}
                    className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                      activeTab === 'quiz'
                        ? 'border-emerald-400 text-emerald-300 bg-[#0b0f19] shadow-sm'
                        : 'border-transparent text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Knowledge Check Quiz</span>
                  </button>
                )}

                <button
                  onClick={() => setActiveTab('software')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'software'
                      ? 'border-emerald-400 text-emerald-300 bg-[#0b0f19] shadow-sm'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Monitor className="w-4 h-4 text-emerald-400" />
                  <span>Real Software Walkthrough</span>
                </button>

                <button
                  onClick={() => setActiveTab('sandbox')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'sandbox'
                      ? 'border-emerald-400 text-emerald-300 bg-[#0b0f19] shadow-sm'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span>Double-Entry Sandbox</span>
                </button>

                <button
                  onClick={() => setActiveTab('scratchpad')}
                  className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all border-b-2 flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'scratchpad'
                      ? 'border-emerald-400 text-emerald-300 bg-[#0b0f19] shadow-sm'
                      : 'border-transparent text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Edit3 className="w-4 h-4 text-emerald-400" />
                  <span>My Notes</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="p-6">
                
                {/* 1. LESSON NOTES TAB */}
                {activeTab === 'notes' && (
                  <div className="space-y-6">
                    <div className="border-b border-white/10 pb-4">
                      <h2 className="text-xl font-bold text-white">{activeLesson.title}</h2>
                      <p className="text-xs text-slate-400 mt-1">{activeLesson.description}</p>
                    </div>

                    {/* Double Entry Breakdown Card if present */}
                    {activeLesson.doubleEntryExample && (
                      <div className="bg-[#12182b] text-white rounded-xl p-5 space-y-3 border border-white/10 shadow-lg">
                        <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wide">
                          <Scale className="w-4 h-4" />
                          <span>Double-Entry Transaction Analysis</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-100">
                          {activeLesson.doubleEntryExample.description}
                        </p>

                        <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                          <div className="p-3 bg-emerald-950/60 border border-emerald-500/30 rounded-lg">
                            <span className="font-bold text-emerald-400 block mb-1">DEBIT LEG:</span>
                            <div className="font-medium text-slate-200">{activeLesson.doubleEntryExample.debitAccount}</div>
                            <div className="text-base font-mono font-bold text-emerald-300 mt-1">
                              +£{activeLesson.doubleEntryExample.debitAmount.toLocaleString()}
                            </div>
                          </div>

                          <div className="p-3 bg-blue-950/60 border border-blue-500/30 rounded-lg">
                            <span className="font-bold text-blue-400 block mb-1">CREDIT LEG:</span>
                            <div className="font-medium text-slate-200">{activeLesson.doubleEntryExample.creditAccount}</div>
                            <div className="text-base font-mono font-bold text-blue-300 mt-1">
                              +£{activeLesson.doubleEntryExample.creditAmount.toLocaleString()}
                            </div>
                          </div>
                        </div>

                        <p className="text-[11px] text-slate-400 pt-1">
                          <strong>Accounting Rationale:</strong> {activeLesson.doubleEntryExample.explanation}
                        </p>
                      </div>
                    )}

                    {/* Markdown / Conceptual Notes */}
                    <div className="prose prose-invert max-w-none text-xs leading-relaxed space-y-3 text-slate-300 whitespace-pre-line">
                      {activeLesson.notesMarkdown}
                    </div>
                  </div>
                )}

                {/* 2. SLIDES & PDF DECK TAB */}
                {activeTab === 'slides' && (
                  <div>
                    <SlideDeckViewer />
                  </div>
                )}

                {/* 3. PRACTICAL RESOURCES TAB */}
                {activeTab === 'resources' && (
                  <div className="space-y-4">
                    <div className="border-b border-white/10 pb-3 flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-bold text-white">Downloadable Practice Files & Templates</h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                          Working papers, transaction CSVs, and Excel spreadsheets for this lesson.
                        </p>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-xs font-mono font-bold">
                        {activeResources.length} Files Available
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                      {activeResources.map((res) => (
                        <div
                          key={res.id}
                          className="p-4 bg-[#12182b] hover:bg-[#151f38] rounded-xl border border-white/10 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg"
                        >
                          <div className="flex items-start gap-3">
                            <div className="p-2.5 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shrink-0">
                              {res.type === 'excel' ? <FileSpreadsheet className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">{res.name}</h4>
                              <p className="text-[11px] text-slate-300 mt-0.5 max-w-xl">{res.description}</p>
                              <span className="text-[10px] text-slate-500 font-mono mt-1 inline-block">
                                {res.filename} • {res.size}
                              </span>
                            </div>
                          </div>

                          <a
                            href={res.fileUrl || '#'}
                            download={res.filename}
                            onClick={(e) => {
                              e.preventDefault();
                              alert(`Downloading practice file: ${res.filename}`);
                            }}
                            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all shrink-0"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Exercise</span>
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. KNOWLEDGE CHECK QUIZ TAB */}
                {activeTab === 'quiz' && activeQuiz && (
                  <div>
                    <InteractiveQuiz quiz={activeQuiz} onCompleted={handleToggleComplete} />
                  </div>
                )}

                {/* 5. REAL SOFTWARE WALKTHROUGH TAB */}
                {activeTab === 'software' && (
                  <div className="space-y-6">
                    <SoftwareScreenshotsViewer />

                    {activeLesson.softwareGuide && (
                      <div className="mt-6 p-5 bg-[#12182b] rounded-xl border border-white/10 space-y-3 shadow-lg">
                        <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                          <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-bold text-xs">
                            {activeLesson.softwareGuide.software}
                          </span>
                          <h3 className="text-sm font-bold text-white">{activeLesson.softwareGuide.title}</h3>
                        </div>

                        <ol className="space-y-2.5 text-xs text-slate-300">
                          {activeLesson.softwareGuide.steps.map((step, idx) => (
                            <li key={idx} className="p-3 bg-[#0b0f19] rounded-lg border border-white/10 flex items-start gap-3 shadow-sm">
                              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-sm">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed font-medium text-slate-200">{step}</span>
                            </li>
                          ))}
                        </ol>

                        {activeLesson.softwareGuide.proTip && (
                          <div className="p-4 bg-emerald-950/60 text-white rounded-xl border border-emerald-500/30 text-xs shadow-md">
                            <span className="font-bold uppercase tracking-wider text-emerald-300 block mb-1">Faculty Software Pro-Tip:</span>
                            <p className="text-slate-300">{activeLesson.softwareGuide.proTip}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* 6. DOUBLE ENTRY SANDBOX TAB */}
                {activeTab === 'sandbox' && (
                  <div>
                    <DoubleEntrySandbox />
                  </div>
                )}

                {/* 7. SCRATCHPAD / PERSONAL NOTES TAB */}
                {activeTab === 'scratchpad' && (
                  <form onSubmit={handleSaveNote} className="space-y-4">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-sm font-bold text-white">Personal Lesson Notebook</h3>
                        <p className="text-xs text-slate-400">Auto-saved to your student profile</p>
                      </div>
                      <button
                        type="submit"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow-[0_0_10px_rgba(16,185,129,0.3)] transition-all"
                      >
                        Save Note
                      </button>
                    </div>

                    <textarea
                      rows={6}
                      value={personalNote}
                      onChange={(e) => setPersonalNote(e.target.value)}
                      placeholder="Write your personal bookkeeping notes, debit/credit reminders, or software steps here..."
                      className="w-full text-xs font-mono p-3 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
                    />
                  </form>
                )}
              </div>
            </div>

            {/* Bottom Lesson Navigation Bar */}
            <div className="flex items-center justify-between gap-4 pt-2">
              {prevLesson ? (
                <button
                  onClick={() => handleSwitchLesson(prevLesson.id)}
                  className="px-4 py-2.5 bg-[#0b0f19] hover:bg-[#12182b] border border-white/10 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-lg transition-all"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span className="truncate max-w-[150px]">Previous: {prevLesson.title}</span>
                </button>
              ) : (
                <div />
              )}

              {nextLesson ? (
                <button
                  onClick={handleNextLessonWithComplete}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  <span>Complete & Next Lesson</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleToggleComplete}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Finish Course</span>
                </button>
              )}
            </div>
          </div>

          {/* RIGHT 4 COLS: Curriculum Sidebar */}
          <div className="lg:col-span-4 bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl overflow-hidden sticky top-32">
            <div className="bg-[#070a12] text-white p-4 border-b border-white/10 flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">Course Syllabus</h3>
                <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">
                  {progress?.completedLessonIds.length || 0} of {courseLessons.length} completed
                </p>
              </div>
              <span className="text-xs font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-2 py-1 rounded">
                {percentComplete}%
              </span>
            </div>

            {/* Modules & Lessons tree */}
            <div className="max-h-[calc(100vh-14rem)] overflow-y-auto divide-y divide-white/5">
              {courseModules.map((mod, modIdx) => {
                const modLessons = courseLessons
                  .filter((l) => l.moduleId === mod.id)
                  .sort((a, b) => a.order - b.order);

                return (
                  <div key={mod.id} className="p-3">
                    <div className="text-xs font-bold text-white mb-2 flex items-center gap-2">
                      <span className="w-4 h-4 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] flex items-center justify-center font-bold">
                        {modIdx + 1}
                      </span>
                      <span className="truncate">{mod.title}</span>
                    </div>

                    <div className="space-y-1 pl-2">
                      {modLessons.map((les) => {
                        const isCurrent = les.id === activeLesson.id;
                        const isDone = progress?.completedLessonIds.includes(les.id);

                        return (
                          <button
                            key={les.id}
                            onClick={() => handleSwitchLesson(les.id)}
                            className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 ${
                              isCurrent
                                ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                                : 'hover:bg-[#12182b] text-slate-300'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0">
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : isCurrent ? (
                                <PlayCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border border-slate-600" />
                              )}
                            </div>

                            <div className="min-w-0 flex-1">
                              <p className="leading-snug truncate">{les.title}</p>
                              <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                                <span>{les.duration}</span>
                                {les.quizId && (
                                  <span className="text-emerald-400 font-semibold">• Quiz</span>
                                )}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificateModal && currentUser && (
        <CertificateModal
          course={course}
          user={currentUser}
          onClose={() => setShowCertificateModal(false)}
        />
      )}
    </div>
  );
};
