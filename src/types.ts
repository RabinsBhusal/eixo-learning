export type UserRole = 'student' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  jobTitle?: string;
  company?: string;
  enrolledCourseIds: string[];
  createdAt: string;
}

export type CourseCategory = 'Accounting' | 'Finance' | 'Practical Software';

export type CourseSubcategory =
  | 'Accounting Fundamentals'
  | 'Financial Accounting'
  | 'Management Accounting'
  | 'Bookkeeping'
  | 'Tax'
  | 'Payroll'
  | 'Corporate Finance'
  | 'Financial Analysis'
  | 'Financial Modelling'
  | 'Investment'
  | 'Xero'
  | 'QuickBooks'
  | 'Sage';

export type CourseLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
export type CourseStatus = 'Draft' | 'Published' | 'Archived';

export interface Instructor {
  name: string;
  title: string;
  avatar: string;
  bio: string;
  credentials: string[];
}

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: CourseCategory;
  subcategory: CourseSubcategory;
  level: CourseLevel;
  thumbnail: string;
  duration: string;
  totalLessons: number;
  published: boolean;
  status: CourseStatus;
  createdAt: string;
  lastUpdated: string;
  instructor: Instructor;
  whatYouWillLearn: string[];
  requirements: string[];
  targetAudience: string[];
  featured?: boolean;
  rating: number;
  ratingCount: number;
  enrolmentsCount: number;
  softwareUsed?: ('Xero' | 'QuickBooks' | 'Sage' | 'Excel')[];
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  order: number;
  duration?: string;
}

export interface DoubleEntryTransaction {
  description: string;
  date?: string;
  debitAccount: string;
  debitAmount: number;
  creditAccount: string;
  creditAmount: number;
  explanation: string;
}

export interface SoftwareStepGuide {
  software: 'Xero' | 'QuickBooks' | 'Sage' | 'Excel';
  title: string;
  steps: string[];
  proTip?: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  moduleId: string;
  title: string;
  description: string;
  vimeoId: string;
  duration: string;
  order: number;
  published: boolean;
  notesMarkdown?: string;
  doubleEntryExample?: DoubleEntryTransaction;
  softwareGuide?: SoftwareStepGuide;
  quizId?: string;
  resourceIds?: string[];
}

export type ResourceType = 'excel' | 'pdf' | 'template' | 'word' | 'csv' | 'image';

export interface Resource {
  id: string;
  courseId: string;
  lessonId?: string;
  name: string;
  filename: string;
  fileUrl?: string;
  type: ResourceType;
  size: string;
  description: string;
  downloadCount?: number;
}

export type CourseResource = Resource;

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  hint?: string;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  title: string;
  description: string;
  passingScore: number; // percentage (e.g. 80)
  questions: QuizQuestion[];
}

export interface QuizAttempt {
  id: string;
  userId: string;
  quizId: string;
  score: number;
  passed: boolean;
  completedAt: string;
  selectedAnswers: Record<number, number>;
}

export interface CourseProgress {
  userId: string;
  courseId: string;
  completedLessonIds: string[];
  lastAccessedLessonId?: string;
  lastAccessedAt: string;
  percentComplete: number;
  completedAt?: string;
}

export interface Enrolment {
  id: string;
  userId: string;
  courseId: string;
  enrolledAt: string;
  status: 'active' | 'completed';
}

export interface LessonNote {
  id: string;
  userId: string;
  lessonId: string;
  courseId: string;
  content: string;
  updatedAt: string;
}

// ================= COMMUNITY DISCUSSIONS TYPES =================
export type CommunityCategory =
  | 'xero-software'
  | 'double-entry'
  | 'acca-cima-exams'
  | 'career-interviews'
  | 'tax-vat-uk'
  | 'general-discussion';

export interface CommunityComment {
  id: string;
  threadId: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: UserRole;
  content: string;
  upvotes: number;
  upvotedUserIds: string[];
  createdAt: string;
  isFacultyVerified?: boolean;
}

export interface CommunityThread {
  id: string;
  title: string;
  content: string;
  category: CommunityCategory;
  tags: string[];
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  authorRole: UserRole;
  upvotes: number;
  upvotedUserIds: string[];
  viewCount: number;
  commentsCount: number;
  createdAt: string;
  pinned?: boolean;
  isSolved?: boolean;
  comments: CommunityComment[];
}

// ================= BLOG POST TYPES =================
export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  readTime: string;
  authorName: string;
  authorTitle: string;
  authorAvatar: string;
  publishedAt: string;
  tags: string[];
  seoKeywords: string[];
  relatedCourseId?: string;
  views: number;
  likes: number;
}

// ================= JOB PORTAL TYPES =================
export type JobExperienceLevel = 'Graduate / Trainee' | 'Junior' | 'Mid-Level' | 'Senior' | 'Management';
export type JobType = 'Full-Time' | 'Hybrid' | 'Remote UK' | 'Contract';

export interface JobPosting {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  jobType: JobType;
  experienceLevel: JobExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  postedAt: string;
  deadline: string;
  description: string;
  keyResponsibilities: string[];
  requirements: string[];
  softwareRequired: ('Xero' | 'QuickBooks' | 'Sage' | 'Excel' | 'PowerBI')[];
  featured?: boolean;
  applicantsCount: number;
}

export interface JobApplication {
  id: string;
  jobId: string;
  userId: string;
  applicantName: string;
  applicantEmail: string;
  coverNote?: string;
  appliedAt: string;
  status: 'Submitted' | 'In Review' | 'Shortlisted' | 'Interview Scheduled';
}

// ================= CALENDAR & SCHEDULE TYPES =================
export type CalendarEventType = 'live-masterclass' | 'office-hours' | 'exam-workshop' | 'study-group' | 'assignment-deadline';

export interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  eventType: CalendarEventType;
  startTime: string; // ISO format e.g. 2026-08-25T14:00:00Z
  endTime: string;
  tutorName: string;
  tutorAvatar: string;
  meetingLink?: string;
  location: string;
  courseId?: string;
  attendeesCount: number;
  isRegistered?: boolean;
}

