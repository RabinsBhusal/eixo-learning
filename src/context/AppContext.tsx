import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  UserRole,
  Course,
  Module,
  Lesson,
  Resource,
  Quiz,
  QuizAttempt,
  CourseProgress,
  LessonNote,
  CommunityThread,
  CommunityComment,
  BlogPost,
  JobPosting,
  JobApplication,
  CalendarEvent,
} from '../types';
import {
  INITIAL_USERS,
  INITIAL_COURSES,
  INITIAL_MODULES,
  INITIAL_LESSONS,
  INITIAL_RESOURCES,
  INITIAL_QUIZZES,
  INITIAL_PROGRESS,
} from '../data/initialData';
import {
  INITIAL_COMMUNITY_THREADS,
  INITIAL_BLOG_POSTS,
  INITIAL_JOB_POSTINGS,
  INITIAL_CALENDAR_EVENTS,
} from '../data/portalData';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Auth & User
  currentUser: User | null;
  users: User[];
  login: (email: string, password?: string) => boolean;
  register: (name: string, email: string, role?: UserRole) => boolean;
  logout: () => void;
  switchUserRole: (role: UserRole) => void;
  quickSwitchUser: (userId: string) => void;
  
  // Data
  courses: Course[];
  modules: Module[];
  lessons: Lesson[];
  resources: Resource[];
  quizzes: Quiz[];
  progress: CourseProgress[];
  quizAttempts: QuizAttempt[];
  notes: LessonNote[];

  // Community
  threads: CommunityThread[];
  selectedThreadId: string | null;
  setSelectedThreadId: (id: string | null) => void;
  upvoteThread: (threadId: string) => void;
  addThread: (title: string, content: string, category: any, tags: string[]) => void;
  addComment: (threadId: string, content: string) => void;
  upvoteComment: (threadId: string, commentId: string) => void;

  // Blog
  blogPosts: BlogPost[];
  selectedBlogSlug: string | null;
  setSelectedBlogSlug: (slug: string | null) => void;
  likeBlogPost: (postId: string) => void;

  // Job Portal
  jobs: JobPosting[];
  savedJobIds: string[];
  appliedJobIds: string[];
  selectedJobId: string | null;
  setSelectedJobId: (id: string | null) => void;
  applyToJob: (jobId: string, note?: string) => void;
  toggleSaveJob: (jobId: string) => void;

  // Calendar
  calendarEvents: CalendarEvent[];
  toggleRegisterEvent: (eventId: string) => void;

  // Sidebar Collapse
  sidebarCollapsed: boolean;
  toggleSidebar: () => void;

  // Student Actions
  enrollCourse: (courseId: string) => void;
  unenrollCourse: (courseId: string) => void;
  markLessonComplete: (courseId: string, lessonId: string, completed?: boolean) => void;
  updateLastAccessedLesson: (courseId: string, lessonId: string) => void;
  getCourseProgress: (courseId: string) => CourseProgress | undefined;
  submitQuizAttempt: (quizId: string, answers: Record<number, number>) => QuizAttempt;
  getQuizAttempts: (quizId: string) => QuizAttempt[];
  saveLessonNote: (lessonId: string, courseId: string, content: string) => void;
  getLessonNote: (lessonId: string) => string;

  // Admin Actions
  createCourse: (course: Partial<Course>) => Course;
  updateCourse: (courseId: string, updates: Partial<Course>) => void;
  deleteCourse: (courseId: string) => void;
  createModule: (moduleData: Partial<Module>) => Module;
  updateModule: (moduleId: string, updates: Partial<Module>) => void;
  deleteModule: (moduleId: string) => void;
  createLesson: (lessonData: Partial<Lesson>) => Lesson;
  updateLesson: (lessonId: string, updates: Partial<Lesson>) => void;
  deleteLesson: (lessonId: string) => void;
  createOrUpdateQuiz: (quiz: Quiz) => void;
  createResource: (resourceData: Partial<Resource>) => Resource;
  deleteResource: (resourceId: string) => void;
  enrollStudentByAdmin: (userId: string, courseId: string) => void;
  removeStudentByAdmin: (userId: string, courseId: string) => void;
  
  // Navigation & UI
  currentView: string;
  selectedCourseId: string | null;
  selectedLessonId: string | null;
  navigateTo: (view: string, courseId?: string, lessonId?: string) => void;
  authModalOpen: boolean;
  authModalMode: 'login' | 'register' | 'forgot';
  openAuthModal: (mode?: 'login' | 'register' | 'forgot') => void;
  closeAuthModal: () => void;
  
  // Notifications
  notifications: Notification[];
  addNotification: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeNotification: (id: string) => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Reset demo data helper
  resetToInitialData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

  const STORAGE_KEYS = {
  USERS: 'eixo_users_v1',
  CURRENT_USER_ID: 'eixo_current_user_id_v1',
  COURSES: 'eixo_courses_v1',
  MODULES: 'eixo_modules_v1',
  LESSONS: 'eixo_lessons_v1',
  RESOURCES: 'eixo_resources_v1',
  QUIZZES: 'eixo_quizzes_v1',
  PROGRESS: 'eixo_progress_v1',
  ATTEMPTS: 'eixo_quiz_attempts_v1',
  NOTES: 'eixo_lesson_notes_v1',
  THREADS: 'eixo_threads_v1',
  BLOGS: 'eixo_blogs_v1',
  JOBS: 'eixo_jobs_v1',
  SAVED_JOBS: 'eixo_saved_jobs_v1',
  APPLIED_JOBS: 'eixo_applied_jobs_v1',
  CALENDAR: 'eixo_calendar_v1',
  SIDEBAR_COLLAPSED: 'eixo_sidebar_collapsed_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or fallback to seed data
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USERS);
      return saved ? JSON.parse(saved) : INITIAL_USERS;
    } catch {
      return INITIAL_USERS;
    }
  });

  const [currentUserId, setCurrentUserId] = useState<string | null>(() => {
    try {
      return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID) || null;
    } catch {
      return null;
    }
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COURSES);
      return saved ? JSON.parse(saved) : INITIAL_COURSES;
    } catch {
      return INITIAL_COURSES;
    }
  });

  const [modules, setModules] = useState<Module[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MODULES);
      return saved ? JSON.parse(saved) : INITIAL_MODULES;
    } catch {
      return INITIAL_MODULES;
    }
  });

  const [lessons, setLessons] = useState<Lesson[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.LESSONS);
      return saved ? JSON.parse(saved) : INITIAL_LESSONS;
    } catch {
      return INITIAL_LESSONS;
    }
  });

  const [resources, setResources] = useState<Resource[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RESOURCES);
      return saved ? JSON.parse(saved) : INITIAL_RESOURCES;
    } catch {
      return INITIAL_RESOURCES;
    }
  });

  const [quizzes, setQuizzes] = useState<Quiz[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.QUIZZES);
      return saved ? JSON.parse(saved) : INITIAL_QUIZZES;
    } catch {
      return INITIAL_QUIZZES;
    }
  });

  const [progress, setProgress] = useState<CourseProgress[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRESS);
      return saved ? JSON.parse(saved) : INITIAL_PROGRESS;
    } catch {
      return INITIAL_PROGRESS;
    }
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState<LessonNote[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.NOTES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Community State
  const [threads, setThreads] = useState<CommunityThread[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THREADS);
      return saved ? JSON.parse(saved) : INITIAL_COMMUNITY_THREADS;
    } catch {
      return INITIAL_COMMUNITY_THREADS;
    }
  });
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);

  // Blog State
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.BLOGS);
      return saved ? JSON.parse(saved) : INITIAL_BLOG_POSTS;
    } catch {
      return INITIAL_BLOG_POSTS;
    }
  });
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  // Job Portal State
  const [jobs, setJobs] = useState<JobPosting[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.JOBS);
      return saved ? JSON.parse(saved) : INITIAL_JOB_POSTINGS;
    } catch {
      return INITIAL_JOB_POSTINGS;
    }
  });
  const [savedJobIds, setSavedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED_JOBS);
      return saved ? JSON.parse(saved) : ['job-1'];
    } catch {
      return ['job-1'];
    }
  });
  const [appliedJobIds, setAppliedJobIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.APPLIED_JOBS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null);

  // Calendar State
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CALENDAR);
      return saved ? JSON.parse(saved) : INITIAL_CALENDAR_EVENTS;
    } catch {
      return INITIAL_CALENDAR_EVENTS;
    }
  });

  // Collapsible Sidebar State
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SIDEBAR_COLLAPSED);
      return saved ? JSON.parse(saved) : false;
    } catch {
      return false;
    }
  });

  const toggleSidebar = () => {
    setSidebarCollapsed((prev) => !prev);
  };


  // Navigation State
  const [currentView, setCurrentView] = useState<string>('landing');
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // UI Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUserId) {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, currentUserId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
    }
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COURSES, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MODULES, JSON.stringify(modules));
  }, [modules]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LESSONS, JSON.stringify(lessons));
  }, [lessons]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RESOURCES, JSON.stringify(resources));
  }, [resources]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.QUIZZES, JSON.stringify(quizzes));
  }, [quizzes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTES, JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THREADS, JSON.stringify(threads));
  }, [threads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BLOGS, JSON.stringify(blogPosts));
  }, [blogPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.JOBS, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED_JOBS, JSON.stringify(savedJobIds));
  }, [savedJobIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.APPLIED_JOBS, JSON.stringify(appliedJobIds));
  }, [appliedJobIds]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CALENDAR, JSON.stringify(calendarEvents));
  }, [calendarEvents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SIDEBAR_COLLAPSED, JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  const currentUser = users.find((u) => u.id === currentUserId) || null;

  // Notification helper
  const addNotification = (message: string, type: 'success' | 'info' | 'warning' = 'success') => {
    const id = Date.now().toString();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeNotification(id);
    }, 4000);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Auth operations
  const login = (email: string): boolean => {
    const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUserId(user.id);
      addNotification(`Welcome back, ${user.name}!`, 'success');
      setAuthModalOpen(false);
      if (user.role === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('student-dashboard');
      }
      return true;
    }
    // Auto create if demo email
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: email.split('@')[0].replace('.', ' '),
      email,
      role: email.includes('admin') ? 'admin' : 'student',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      enrolledCourseIds: ['course-xero-1'],
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    addNotification(`Account created & signed in as ${newUser.name}!`, 'success');
    setAuthModalOpen(false);
    setCurrentView(newUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
    return true;
  };

  const register = (name: string, email: string, role: UserRole = 'student'): boolean => {
    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      setCurrentUserId(existing.id);
      addNotification(`Signed in as existing user: ${existing.name}`);
      setAuthModalOpen(false);
      setCurrentView(existing.role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
      return true;
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      role,
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      enrolledCourseIds: ['course-xero-1'],
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUserId(newUser.id);
    addNotification(`Welcome to EIXO Learning, ${name}! Your free account is ready.`);
    setAuthModalOpen(false);
    setCurrentView(role === 'admin' ? 'admin-dashboard' : 'student-dashboard');
    return true;
  };

  const logout = () => {
    setCurrentUserId(null);
    setCurrentView('landing');
    addNotification('You have logged out successfully.', 'info');
  };

  const switchUserRole = (role: UserRole) => {
    if (!currentUser) return;
    const updatedUsers = users.map((u) => (u.id === currentUser.id ? { ...u, role } : u));
    setUsers(updatedUsers);
    addNotification(`Role switched to ${role.toUpperCase()}`, 'info');
    if (role === 'admin') {
      setCurrentView('admin-dashboard');
    } else {
      setCurrentView('student-dashboard');
    }
  };

  const quickSwitchUser = (userId: string) => {
    const target = users.find((u) => u.id === userId);
    if (target) {
      setCurrentUserId(target.id);
      addNotification(`Switched profile to ${target.name} (${target.role})`, 'info');
      if (target.role === 'admin') {
        setCurrentView('admin-dashboard');
      } else {
        setCurrentView('student-dashboard');
      }
    }
  };

  // Navigation
  const navigateTo = (view: string, courseId?: string, lessonId?: string) => {
    setCurrentView(view);
    if (courseId !== undefined) {
      setSelectedCourseId(courseId);
    }
    if (lessonId !== undefined) {
      setSelectedLessonId(lessonId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openAuthModal = (mode: 'login' | 'register' | 'forgot' = 'login') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  // Student Actions
  const enrollCourse = (courseId: string) => {
    if (!currentUser) {
      openAuthModal('register');
      return;
    }
    if (currentUser.enrolledCourseIds.includes(courseId)) {
      navigateTo('course-player', courseId);
      return;
    }

    // Update user enrolled list
    const updatedUsers = users.map((u) => {
      if (u.id === currentUser.id) {
        return { ...u, enrolledCourseIds: [...u.enrolledCourseIds, courseId] };
      }
      return u;
    });
    setUsers(updatedUsers);

    // Update course enrolment counter
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolmentsCount: c.enrolmentsCount + 1 } : c))
    );

    // Initialise progress if not present
    const existingProg = progress.find((p) => p.userId === currentUser.id && p.courseId === courseId);
    if (!existingProg) {
      const firstCourseLesson = lessons
        .filter((l) => l.courseId === courseId)
        .sort((a, b) => a.order - b.order)[0];

      const newProgress: CourseProgress = {
        userId: currentUser.id,
        courseId,
        completedLessonIds: [],
        lastAccessedLessonId: firstCourseLesson ? firstCourseLesson.id : undefined,
        lastAccessedAt: new Date().toISOString(),
        percentComplete: 0,
      };
      setProgress((prev) => [...prev, newProgress]);
    }

    const course = courses.find((c) => c.id === courseId);
    addNotification(`Enrolled in "${course?.title || 'Course'}"! Happy learning.`, 'success');
    navigateTo('course-player', courseId);
  };

  const unenrollCourse = (courseId: string) => {
    if (!currentUser) return;
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === currentUser.id) {
          return {
            ...u,
            enrolledCourseIds: u.enrolledCourseIds.filter((id) => id !== courseId),
          };
        }
        return u;
      })
    );
    addNotification('Course removed from your learning list.', 'info');
  };

  const markLessonComplete = (courseId: string, lessonId: string, completed = true) => {
    if (!currentUser) return;
    const courseLessons = lessons.filter((l) => l.courseId === courseId);
    const totalCount = courseLessons.length || 1;

    setProgress((prev) => {
      const existing = prev.find((p) => p.userId === currentUser.id && p.courseId === courseId);
      let currentCompleted = existing ? [...existing.completedLessonIds] : [];

      if (completed) {
        if (!currentCompleted.includes(lessonId)) {
          currentCompleted.push(lessonId);
        }
      } else {
        currentCompleted = currentCompleted.filter((id) => id !== lessonId);
      }

      const percent = Math.min(100, Math.round((currentCompleted.length / totalCount) * 100));

      if (existing) {
        return prev.map((p) =>
          p.userId === currentUser.id && p.courseId === courseId
            ? {
                ...p,
                completedLessonIds: currentCompleted,
                lastAccessedLessonId: lessonId,
                lastAccessedAt: new Date().toISOString(),
                percentComplete: percent,
                completedAt: percent === 100 ? new Date().toISOString() : undefined,
              }
            : p
        );
      } else {
        return [
          ...prev,
          {
            userId: currentUser.id,
            courseId,
            completedLessonIds: currentCompleted,
            lastAccessedLessonId: lessonId,
            lastAccessedAt: new Date().toISOString(),
            percentComplete: percent,
          },
        ];
      }
    });

    if (completed) {
      addNotification('Lesson marked as completed! Progress updated.', 'success');
    }
  };

  const updateLastAccessedLesson = (courseId: string, lessonId: string) => {
    if (!currentUser) return;
    setProgress((prev) => {
      const existing = prev.find((p) => p.userId === currentUser.id && p.courseId === courseId);
      if (existing) {
        return prev.map((p) =>
          p.userId === currentUser.id && p.courseId === courseId
            ? { ...p, lastAccessedLessonId: lessonId, lastAccessedAt: new Date().toISOString() }
            : p
        );
      } else {
        return [
          ...prev,
          {
            userId: currentUser.id,
            courseId,
            completedLessonIds: [],
            lastAccessedLessonId: lessonId,
            lastAccessedAt: new Date().toISOString(),
            percentComplete: 0,
          },
        ];
      }
    });
  };

  const getCourseProgress = (courseId: string): CourseProgress | undefined => {
    if (!currentUser) return undefined;
    return progress.find((p) => p.userId === currentUser.id && p.courseId === courseId);
  };

  const submitQuizAttempt = (quizId: string, answers: Record<number, number>): QuizAttempt => {
    const quiz = quizzes.find((q) => q.id === quizId);
    if (!quiz) {
      throw new Error('Quiz not found');
    }

    let correct = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionIndex) {
        correct++;
      }
    });

    const score = Math.round((correct / (quiz.questions.length || 1)) * 100);
    const passed = score >= quiz.passingScore;

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      userId: currentUser?.id || 'guest',
      quizId,
      score,
      passed,
      completedAt: new Date().toISOString(),
      selectedAnswers: answers,
    };

    setQuizAttempts((prev) => [attempt, ...prev]);

    if (passed && quiz.lessonId && quiz.courseId && currentUser) {
      markLessonComplete(quiz.courseId, quiz.lessonId, true);
    }

    return attempt;
  };

  const getQuizAttempts = (quizId: string): QuizAttempt[] => {
    if (!currentUser) return [];
    return quizAttempts.filter((a) => a.quizId === quizId && a.userId === currentUser.id);
  };

  const saveLessonNote = (lessonId: string, courseId: string, content: string) => {
    if (!currentUser) return;
    setNotes((prev) => {
      const existing = prev.find((n) => n.userId === currentUser.id && n.lessonId === lessonId);
      if (existing) {
        return prev.map((n) =>
          n.userId === currentUser.id && n.lessonId === lessonId
            ? { ...n, content, updatedAt: new Date().toISOString() }
            : n
        );
      } else {
        return [
          ...prev,
          {
            id: `note-${Date.now()}`,
            userId: currentUser.id,
            lessonId,
            courseId,
            content,
            updatedAt: new Date().toISOString(),
          },
        ];
      }
    });
  };

  const getLessonNote = (lessonId: string): string => {
    if (!currentUser) return '';
    const n = notes.find((n) => n.userId === currentUser.id && n.lessonId === lessonId);
    return n ? n.content : '';
  };

  // Admin CRUD operations
  const createCourse = (courseData: Partial<Course>): Course => {
    const id = `course-${Date.now()}`;
    const newCourse: Course = {
      id,
      title: courseData.title || 'Untitled Course',
      slug: (courseData.title || 'untitled-course').toLowerCase().replace(/\s+/g, '-'),
      description: courseData.description || '',
      shortDescription: courseData.shortDescription || '',
      category: courseData.category || 'Accounting',
      subcategory: courseData.subcategory || 'Accounting Fundamentals',
      level: courseData.level || 'Beginner',
      thumbnail: courseData.thumbnail || 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
      duration: courseData.duration || '4 hours',
      totalLessons: 0,
      published: courseData.published ?? true,
      status: courseData.status || 'Published',
      createdAt: new Date().toISOString(),
      lastUpdated: 'Recently updated',
      rating: 5.0,
      ratingCount: 1,
      enrolmentsCount: 0,
      instructor: {
        name: 'EIXO Learning Faculty',
        title: 'Chartered Accountants & Financial Analysts',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        bio: 'Delivered by practicing Chartered Accountants and Financial Analysts with industry leadership.',
        credentials: ['FCA (ICAEW)', 'CFA Charterholder', 'Xero Platinum Advisor'],
      },
      whatYouWillLearn: courseData.whatYouWillLearn || ['Master theoretical concepts', 'Apply workflows in software'],
      requirements: courseData.requirements || ['No prerequisites required'],
      targetAudience: courseData.targetAudience || ['Finance professionals and students'],
      softwareUsed: courseData.softwareUsed || ['Excel'],
    };

    setCourses((prev) => [newCourse, ...prev]);
    addNotification(`Course "${newCourse.title}" created successfully!`, 'success');
    return newCourse;
  };

  const updateCourse = (courseId: string, updates: Partial<Course>) => {
    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, ...updates, lastUpdated: 'Recently updated' } : c))
    );
    addNotification('Course details updated.', 'success');
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setModules((prev) => prev.filter((m) => m.courseId !== courseId));
    setLessons((prev) => prev.filter((l) => l.courseId !== courseId));
    addNotification('Course deleted from catalogue.', 'info');
  };

  const createModule = (moduleData: Partial<Module>): Module => {
    const id = `mod-${Date.now()}`;
    const newModule: Module = {
      id,
      courseId: moduleData.courseId || selectedCourseId || '',
      title: moduleData.title || 'New Module',
      description: moduleData.description || '',
      order: moduleData.order || modules.filter((m) => m.courseId === moduleData.courseId).length + 1,
      duration: moduleData.duration || '45m',
    };
    setModules((prev) => [...prev, newModule]);
    addNotification(`Module "${newModule.title}" added.`, 'success');
    return newModule;
  };

  const updateModule = (moduleId: string, updates: Partial<Module>) => {
    setModules((prev) => prev.map((m) => (m.id === moduleId ? { ...m, ...updates } : m)));
    addNotification('Module updated.', 'success');
  };

  const deleteModule = (moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
    setLessons((prev) => prev.filter((l) => l.moduleId !== moduleId));
    addNotification('Module and associated lessons removed.', 'info');
  };

  const createLesson = (lessonData: Partial<Lesson>): Lesson => {
    const id = `les-${Date.now()}`;
    const newLesson: Lesson = {
      id,
      courseId: lessonData.courseId || selectedCourseId || '',
      moduleId: lessonData.moduleId || '',
      title: lessonData.title || 'New Lesson',
      description: lessonData.description || '',
      vimeoId: lessonData.vimeoId || '76979871',
      duration: lessonData.duration || '10:00',
      order: lessonData.order || 1,
      published: lessonData.published ?? true,
      notesMarkdown: lessonData.notesMarkdown || '### Lesson Overview\nDetailed notes will be posted here.',
      doubleEntryExample: lessonData.doubleEntryExample,
      softwareGuide: lessonData.softwareGuide,
      quizId: lessonData.quizId,
      resourceIds: lessonData.resourceIds || [],
    };
    setLessons((prev) => [...prev, newLesson]);

    // Update totalLessons count on course
    setCourses((prev) =>
      prev.map((c) =>
        c.id === newLesson.courseId ? { ...c, totalLessons: c.totalLessons + 1 } : c
      )
    );

    addNotification(`Lesson "${newLesson.title}" created!`, 'success');
    return newLesson;
  };

  const updateLesson = (lessonId: string, updates: Partial<Lesson>) => {
    setLessons((prev) => prev.map((l) => (l.id === lessonId ? { ...l, ...updates } : l)));
    addNotification('Lesson updated successfully.', 'success');
  };

  const deleteLesson = (lessonId: string) => {
    const target = lessons.find((l) => l.id === lessonId);
    setLessons((prev) => prev.filter((l) => l.id !== lessonId));
    if (target) {
      setCourses((prev) =>
        prev.map((c) =>
          c.id === target.courseId ? { ...c, totalLessons: Math.max(0, c.totalLessons - 1) } : c
        )
      );
    }
    addNotification('Lesson removed.', 'info');
  };

  const createOrUpdateQuiz = (quiz: Quiz) => {
    setQuizzes((prev) => {
      const idx = prev.findIndex((q) => q.id === quiz.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = quiz;
        return next;
      }
      return [...prev, quiz];
    });
    addNotification('Quiz saved successfully.', 'success');
  };

  const createResource = (resourceData: Partial<Resource>): Resource => {
    const id = `res-${Date.now()}`;
    const newRes: Resource = {
      id,
      courseId: resourceData.courseId || selectedCourseId || '',
      lessonId: resourceData.lessonId,
      name: resourceData.name || 'Resource File',
      filename: resourceData.filename || 'resource.xlsx',
      fileUrl: resourceData.fileUrl || '#',
      type: resourceData.type || 'excel',
      size: resourceData.size || '120 KB',
      description: resourceData.description || 'Downloadable practice exercise file.',
      downloadCount: 0,
    };
    setResources((prev) => [...prev, newRes]);
    addNotification(`Resource "${newRes.name}" uploaded.`, 'success');
    return newRes;
  };

  const deleteResource = (resourceId: string) => {
    setResources((prev) => prev.filter((r) => r.id !== resourceId));
    addNotification('Resource removed.', 'info');
  };

  const enrollStudentByAdmin = (userId: string, courseId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId && !u.enrolledCourseIds.includes(courseId)) {
          return { ...u, enrolledCourseIds: [...u.enrolledCourseIds, courseId] };
        }
        return u;
      })
    );
    addNotification('Student enrolled successfully.', 'success');
  };

  const removeStudentByAdmin = (userId: string, courseId: string) => {
    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === userId) {
          return { ...u, enrolledCourseIds: u.enrolledCourseIds.filter((id) => id !== courseId) };
        }
        return u;
      })
    );
    addNotification('Student enrollment revoked.', 'info');
  };

  // Community Handlers
  const upvoteThread = (threadId: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setThreads((prev) =>
      prev.map((th) => {
        if (th.id === threadId) {
          const hasVoted = th.upvotedUserIds.includes(currentUser.id);
          const newUpvoted = hasVoted
            ? th.upvotedUserIds.filter((id) => id !== currentUser.id)
            : [...th.upvotedUserIds, currentUser.id];
          return {
            ...th,
            upvotes: hasVoted ? th.upvotes - 1 : th.upvotes + 1,
            upvotedUserIds: newUpvoted,
          };
        }
        return th;
      })
    );
  };

  const addThread = (title: string, content: string, category: any, tags: string[]) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    const newThread: CommunityThread = {
      id: `thread-${Date.now()}`,
      title,
      content,
      category,
      tags,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      upvotes: 1,
      upvotedUserIds: [currentUser.id],
      viewCount: 1,
      commentsCount: 0,
      createdAt: new Date().toISOString(),
      comments: [],
    };
    setThreads((prev) => [newThread, ...prev]);
    addNotification('Discussion thread posted successfully!', 'success');
  };

  const addComment = (threadId: string, content: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    const newComment: CommunityComment = {
      id: `comment-${Date.now()}`,
      threadId,
      authorId: currentUser.id,
      authorName: currentUser.name,
      authorAvatar: currentUser.avatar,
      authorRole: currentUser.role,
      content,
      upvotes: 0,
      upvotedUserIds: [],
      createdAt: new Date().toISOString(),
      isFacultyVerified: currentUser.role === 'admin',
    };
    setThreads((prev) =>
      prev.map((th) => {
        if (th.id === threadId) {
          return {
            ...th,
            commentsCount: th.commentsCount + 1,
            comments: [...th.comments, newComment],
          };
        }
        return th;
      })
    );
    addNotification('Reply posted!', 'success');
  };

  const upvoteComment = (threadId: string, commentId: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setThreads((prev) =>
      prev.map((th) => {
        if (th.id === threadId) {
          const updatedComments = th.comments.map((c) => {
            if (c.id === commentId) {
              const hasVoted = c.upvotedUserIds.includes(currentUser.id);
              return {
                ...c,
                upvotes: hasVoted ? c.upvotes - 1 : c.upvotes + 1,
                upvotedUserIds: hasVoted
                  ? c.upvotedUserIds.filter((id) => id !== currentUser.id)
                  : [...c.upvotedUserIds, currentUser.id],
              };
            }
            return c;
          });
          return { ...th, comments: updatedComments };
        }
        return th;
      })
    );
  };

  // Blog Handlers
  const likeBlogPost = (postId: string) => {
    setBlogPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: post.likes + 1 };
        }
        return post;
      })
    );
    addNotification('Liked article!', 'info');
  };

  // Job Portal Handlers
  const applyToJob = (jobId: string, note?: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!appliedJobIds.includes(jobId)) {
      setAppliedJobIds((prev) => [...prev, jobId]);
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, applicantsCount: j.applicantsCount + 1 } : j))
      );
      addNotification('Application submitted to employer!', 'success');
    }
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const isSaved = prev.includes(jobId);
      if (isSaved) {
        addNotification('Job removed from saved list.', 'info');
        return prev.filter((id) => id !== jobId);
      } else {
        addNotification('Job saved to your career tracker!', 'success');
        return [...prev, jobId];
      }
    });
  };

  // Calendar Event Handler
  const toggleRegisterEvent = (eventId: string) => {
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    setCalendarEvents((prev) =>
      prev.map((ev) => {
        if (ev.id === eventId) {
          const isReg = !ev.isRegistered;
          addNotification(
            isReg ? `Registered for "${ev.title}"` : `Cancelled registration for "${ev.title}"`,
            isReg ? 'success' : 'info'
          );
          return {
            ...ev,
            isRegistered: isReg,
            attendeesCount: isReg ? ev.attendeesCount + 1 : ev.attendeesCount - 1,
          };
        }
        return ev;
      })
    );
  };

  const resetToInitialData = () => {
    localStorage.clear();
    setUsers(INITIAL_USERS);
    setCurrentUserId('user-student-1');
    setCourses(INITIAL_COURSES);
    setModules(INITIAL_MODULES);
    setLessons(INITIAL_LESSONS);
    setResources(INITIAL_RESOURCES);
    setQuizzes(INITIAL_QUIZZES);
    setProgress(INITIAL_PROGRESS);
    setQuizAttempts([]);
    setNotes([]);
    setThreads(INITIAL_COMMUNITY_THREADS);
    setBlogPosts(INITIAL_BLOG_POSTS);
    setJobs(INITIAL_JOB_POSTINGS);
    setSavedJobIds(['job-1']);
    setAppliedJobIds([]);
    setCalendarEvents(INITIAL_CALENDAR_EVENTS);
    setSidebarCollapsed(false);
    addNotification('Platform reset to pristine initial demo state.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        users,
        login,
        register,
        logout,
        switchUserRole,
        quickSwitchUser,
        courses,
        modules,
        lessons,
        resources,
        quizzes,
        progress,
        quizAttempts,
        notes,
        threads,
        selectedThreadId,
        setSelectedThreadId,
        upvoteThread,
        addThread,
        addComment,
        upvoteComment,
        blogPosts,
        selectedBlogSlug,
        setSelectedBlogSlug,
        likeBlogPost,
        jobs,
        savedJobIds,
        appliedJobIds,
        selectedJobId,
        setSelectedJobId,
        applyToJob,
        toggleSaveJob,
        calendarEvents,
        toggleRegisterEvent,
        sidebarCollapsed,
        toggleSidebar,
        enrollCourse,
        unenrollCourse,
        markLessonComplete,
        updateLastAccessedLesson,
        getCourseProgress,
        submitQuizAttempt,
        getQuizAttempts,
        saveLessonNote,
        getLessonNote,
        createCourse,
        updateCourse,
        deleteCourse,
        createModule,
        updateModule,
        deleteModule,
        createLesson,
        updateLesson,
        deleteLesson,
        createOrUpdateQuiz,
        createResource,
        deleteResource,
        enrollStudentByAdmin,
        removeStudentByAdmin,
        currentView,
        selectedCourseId,
        selectedLessonId,
        navigateTo,
        authModalOpen,
        authModalMode,
        openAuthModal,
        closeAuthModal,
        notifications,
        addNotification,
        removeNotification,
        searchQuery,
        setSearchQuery,
        resetToInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
