import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/course/CourseCard';
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  FileSpreadsheet,
  Scale,
  PlayCircle,
  Star,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { courses, navigateTo, openAuthModal, setSearchQuery, currentUser, login, switchUserRole } = useApp();

  // Udemy-Style Category Tabs State
  const [selectedSkillTab, setSelectedSkillTab] = useState<'all' | 'xero' | 'double-entry' | 'statements' | 'finance'>('all');
  const [demoSandboxDebit, setDemoSandboxDebit] = useState<number>(1200);
  const [demoSandboxCredit, setDemoSandboxCredit] = useState<number>(1200);
  const [demoSelectedTx, setDemoSelectedTx] = useState<string>('inv');

  // Filtered list based on active Udemy skill category
  const filteredCoursesByTab = courses.filter((c) => {
    if (selectedSkillTab === 'all') return true;
    if (selectedSkillTab === 'xero') return c.software?.includes('Xero') || c.title.toLowerCase().includes('xero') || c.category === 'Practical Software';
    if (selectedSkillTab === 'double-entry') return c.title.toLowerCase().includes('double') || c.title.toLowerCase().includes('bookkeeping') || c.subcategory === 'Bookkeeping';
    if (selectedSkillTab === 'statements') return c.title.toLowerCase().includes('statement') || c.subcategory === 'Financial Accounting';
    if (selectedSkillTab === 'finance') return c.category === 'Finance' || c.title.toLowerCase().includes('valuation') || c.title.toLowerCase().includes('model');
    return true;
  });

  // Student testimonials
  const testimonials = [
    {
      id: 't1',
      name: 'Sarah Jenkins',
      role: 'Junior Management Accountant at Deloitte UK',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      courseName: 'Practical Bookkeeping & Accounting with Xero',
      quote: 'EIXO bridged the huge gap between abstract university textbooks and actual Xero client files. Within 3 weeks of completing the bank reconciliation and VAT return modules, I passed my technical interview with confidence.',
      rating: 5,
    },
    {
      id: 't2',
      name: 'David Okafor',
      role: 'Finance Operations Lead at Fintech Scale-up',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      courseName: 'Double-Entry Mechanics & Journal Entries',
      quote: 'The DEAD CLIC breakdown and interactive debit/credit simulation finally clicked for me. Most courses just show static slides, but EIXO makes you enter the numbers and balance the T-accounts yourself.',
      rating: 5,
    },
    {
      id: 't3',
      name: 'Elena Rostova',
      role: 'Corporate Financial Analyst',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
      courseName: 'Financial Modelling & DCF Valuation in Excel',
      quote: 'The Excel financial models provided with each video lesson are institutional-grade. Clean formula structuring, dynamic sensitivity tables, and real company case studies.',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden relative">
      
      {/* Dynamic Animated Ambient Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 40, -20, 0],
            y: [0, -30, 20, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-emerald-500/10 blur-[100px]"
        />
        <motion.div
          animate={{
            x: [0, -40, 20, 0],
            y: [0, 30, -20, 0],
            scale: [1, 1.05, 0.9, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]"
        />
        <motion.div
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute bottom-1/4 left-10 w-[500px] h-[500px] rounded-full bg-indigo-600/5 blur-[140px]"
        />
      </div>

      {/* AUTHENTICATED USER QUICK RETURN BANNER */}
      {currentUser && (
        <div className="relative z-10 bg-[#0b1322] border-b border-emerald-500/30 py-3.5 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-200">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>
                You are viewing the catalogue as <strong className="text-white font-bold">{currentUser.name}</strong> ({currentUser.role === 'admin' ? 'Faculty Admin' : 'Enrolled Student'}).
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigateTo(currentUser.role === 'admin' ? 'admin-dashboard' : 'student-dashboard')}
                className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold flex items-center gap-1.5 transition-all shadow-md shadow-emerald-950/40"
              >
                <span>{currentUser.role === 'admin' ? 'Go to Admin Command' : 'Go to Student Campus'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              {currentUser.role === 'student' && (
                <button
                  onClick={() => navigateTo('course-player', 'course-xero-1')}
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/15 text-slate-200 rounded-lg font-medium transition-colors"
                >
                  Resume Xero Masterclass
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 1. HERO SECTION WITH DYNAMIC PARALLAX & FLOATING TILES */}
      <section className="relative z-10 overflow-hidden pt-8 sm:pt-16 pb-12 sm:pb-20 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Typography & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-7 space-y-6 text-left"
            >
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CPD & UK Accounting Standards Aligned</span>
              </div>

              {/* High-Impact Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
                Master Practical Accounting. <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 font-serif italic font-normal">
                  Execute in Real Cloud Software.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Bridge the divide between theory and employment. Learn double-entry fundamentals, VAT returns, and financial modelling with structured live walkthroughs in <strong className="text-white font-semibold">Xero</strong>, <strong className="text-white font-semibold">QuickBooks</strong>, and <strong className="text-white font-semibold">Sage</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {currentUser?.role === 'student' ? (
                  <>
                    <button
                      onClick={() => navigateTo('student-dashboard')}
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2"
                    >
                      <span>Open Student Campus</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => navigateTo('my-courses')}
                      className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors"
                    >
                      My Enrolled Courses ({currentUser.enrolledCourseIds.length})
                    </button>
                  </>
                ) : currentUser?.role === 'admin' ? (
                  <>
                    <button
                      onClick={() => navigateTo('admin-dashboard')}
                      className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-indigo-900/40 transition-all flex items-center gap-2"
                    >
                      <span>Open Faculty Admin Command</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => switchUserRole('student')}
                      className="px-6 py-3.5 bg-slate-800/80 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors"
                    >
                      Switch to Student View
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => navigateTo('courses')}
                      className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-950/50 transition-all flex items-center gap-2"
                    >
                      <span>Explore Course Catalogue</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => openAuthModal('register')}
                      className="px-6 py-3.5 bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors"
                    >
                      Create Free Account
                    </button>

                    <button
                      onClick={() => login('alex.morgan@finance-student.com')}
                      className="px-4 py-3.5 bg-emerald-950/60 hover:bg-emerald-900/80 border border-emerald-500/30 text-emerald-300 text-xs font-bold rounded-xl transition-colors flex items-center gap-2"
                    >
                      <PlayCircle className="w-4 h-4 text-emerald-400" />
                      <span>Instant Demo Student</span>
                    </button>
                  </>
                )}
              </div>

              {/* Stat Highlights */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-xs text-slate-400">
                <div>
                  <div className="text-white font-extrabold text-lg flex items-center gap-1">
                    <span>100%</span>
                    <span className="text-emerald-400 text-xs font-bold">Faculty Led</span>
                  </div>
                  <div>Chartered & Certified Tutors</div>
                </div>
                <div>
                  <div className="text-white font-extrabold text-lg flex items-center gap-1">
                    <span>Xero & QBO</span>
                    <span className="text-emerald-400 text-xs font-bold">Official</span>
                  </div>
                  <div>Live Practical Screen Demos</div>
                </div>
                <div>
                  <div className="text-white font-extrabold text-lg flex items-center gap-1">
                    <span>CPD Certs</span>
                    <span className="text-emerald-400 text-xs font-bold">Verified</span>
                  </div>
                  <div>Direct Resume Credentials</div>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic Parallax Floating Visuals */}
            <div className="lg:col-span-5 relative">
              <div className="relative">
                
                {/* Main Hero Card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&auto=format&fit=crop&q=80"
                    alt="Professional accountant working on financial statements and cloud software"
                    referrerPolicy="no-referrer"
                    className="w-full h-80 sm:h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                  {/* Bottom Image Caption Tag */}
                  <div className="absolute bottom-4 left-4 right-4 p-3.5 bg-slate-900/90 backdrop-blur-md rounded-xl border border-white/10 text-xs text-slate-200 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                        <FileSpreadsheet className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-white">Full Practice Packs Included</div>
                        <div className="text-slate-400 text-[10px]">Real Excel financial models & Xero trial files</div>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-slate-800 text-emerald-300 border border-emerald-500/30 rounded font-mono font-bold text-[10px]">
                      .xlsx + .pdf
                    </span>
                  </div>
                </motion.div>

                {/* Floating Parallax Badge 1: Top Right (DEAD CLIC Balance) */}
                <motion.div
                  animate={{
                    y: [0, -10, 0],
                    rotate: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="absolute -top-6 -right-4 sm:-right-6 bg-[#0b0f19]/95 backdrop-blur-md p-3.5 rounded-2xl border border-cyan-500/30 shadow-xl text-left hidden sm:flex items-center gap-3 z-20"
                >
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-black">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">
                      Accounting Equation
                    </div>
                    <div className="text-xs font-black text-white">
                      Debits = Credits Balanced
                    </div>
                  </div>
                </motion.div>

                {/* Floating Parallax Badge 2: Bottom Left (Xero Reconciliation) */}
                <motion.div
                  animate={{
                    y: [0, 10, 0],
                    rotate: [0, -1.5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.5,
                  }}
                  className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#0b0f19]/95 backdrop-blur-md p-3.5 rounded-2xl border border-emerald-500/40 shadow-xl text-left hidden sm:flex items-center gap-3 z-20"
                >
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-black">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-emerald-400 tracking-wider">
                      Xero Bank Feed
                    </div>
                    <div className="text-xs font-black text-white">
                      100% Reconciled Match
                    </div>
                  </div>
                </motion.div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. CAREER SKILL INTERACTIVE CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-left mb-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[11px] font-bold uppercase tracking-wider">
              Comprehensive Catalogue
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Skills to Transform Your Accounting & Finance Career
          </h2>
          <p className="text-sm text-slate-400 max-w-2xl">
            Choose from comprehensive courses designed and taught by experienced chartered accountants.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none border-b border-white/10">
          {[
            { id: 'all', label: 'All Courses' },
            { id: 'xero', label: 'Xero & Cloud Tech' },
            { id: 'double-entry', label: 'Double-Entry Bookkeeping' },
            { id: 'statements', label: 'Financial Statements & UK GAAP' },
            { id: 'finance', label: 'Financial Modelling & Valuation' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSkillTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedSkillTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/40 font-bold'
                  : 'bg-[#0f1628] text-slate-300 hover:bg-[#16213c] hover:text-white border border-white/10'
              }`}
            >
              <span>{tab.label}</span>
              {selectedSkillTab === tab.id && (
                <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              )}
            </button>
          ))}
        </div>

        {/* Courses Display Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filteredCoursesByTab.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. PRACTICAL SOFTWARE TRACKS */}
      <section className="bg-[#060911] py-16 border-y border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)]">
                Practical Software Tracks
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
                Industry-Standard Accounting Software
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Learn step-by-step practical workflows inside the market-leading tools employers demand.
              </p>
            </div>
            
            <button
              onClick={() => navigateTo('courses')}
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5 transition-colors"
            >
              <span>Explore all {courses.length} courses</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Xero Card */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-emerald-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold text-xs rounded-lg">
                    Xero Cloud
                  </span>
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded">
                    Bestseller
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">
                  Practical Bookkeeping with Xero
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Master setup of chart of accounts, automated bank feeds, sales invoicing, supplier bill processing, and HMRC Making Tax Digital (MTD) VAT returns.
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center text-emerald-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 mr-1" />
                    <span>4.9</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">(1,840 ratings)</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-semibold">42 Lessons</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-white">£19.99</span>
                  <span className="text-xs text-slate-500 line-through ml-2">£89.99</span>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('Xero');
                    navigateTo('courses');
                  }}
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* QuickBooks Card */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-cyan-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold text-xs rounded-lg">
                    QuickBooks
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Online Edition
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-cyan-300 transition-colors">
                  QuickBooks Online in Business
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Step-by-step navigation of customer receipts, purchase orders, VAT tracking, bank rule automation, and monthly management reporting.
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center text-emerald-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 mr-1" />
                    <span>4.8</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">(920 ratings)</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-semibold">28 Lessons</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-white">£19.99</span>
                  <span className="text-xs text-slate-500 line-through ml-2">£79.99</span>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('QuickBooks');
                    navigateTo('courses');
                  }}
                  className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

            {/* Sage Card */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 shadow-xl flex flex-col justify-between space-y-5 hover:border-indigo-500/50 transition-all group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 font-bold text-xs rounded-lg">
                    Sage Cloud
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">
                    Business Cloud
                  </span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-indigo-300 transition-colors">
                  Sage Accounting in Practice
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Develop real proficiency using Sage. Master nominal ledger codes, customer batch receipts, and month-end journal adjustments.
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                  <div className="flex items-center text-emerald-400 font-bold">
                    <Star className="w-3.5 h-3.5 fill-emerald-400 text-emerald-400 mr-1" />
                    <span>4.8</span>
                  </div>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">(640 ratings)</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-300 font-semibold">24 Lessons</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-base font-black text-white">£19.99</span>
                  <span className="text-xs text-slate-500 line-through ml-2">£69.99</span>
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('Sage');
                    navigateTo('courses');
                  }}
                  className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3.5 PARALLAX CAMPUS ECOSYSTEM SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
            More Than Just Videos
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Complete EIXO Campus Ecosystem
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            From community peer debriefs to live Google Calendar synced surgery sessions and active job opportunities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Community */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => navigateTo('community')}
            className="p-6 bg-[#0b0f19] hover:bg-[#0e1628] rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 text-xl font-bold">
              💬
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                Public Discussion & Faculty Verified
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Community Forum
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Browse real student double-entry questions, vote on top solutions, and get verified answers from chartered faculty.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <span>Enter Community</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* 2. Job Portal */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => navigateTo('jobs')}
            className="p-6 bg-[#0b0f19] hover:bg-[#0e1628] rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/30 text-xl font-bold">
              💼
            </div>
            <div>
              <span className="text-[10px] font-mono text-cyan-400 uppercase font-bold tracking-wider">
                Verified Employers
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mt-0.5">
                Job Portal
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Explore junior accountant, Xero bookkeeper, and analyst opportunities. Direct fast-track interview pathways for certificate holders.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-cyan-400 font-bold">
              <span>View Job Board</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* 3. Calendar */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => navigateTo('calendar')}
            className="p-6 bg-[#0b0f19] hover:bg-[#0e1628] rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30 text-xl font-bold">
              📅
            </div>
            <div>
              <span className="text-[10px] font-mono text-indigo-400 uppercase font-bold tracking-wider">
                Teams & Google Cal Synced
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors mt-0.5">
                Live Masterclass Schedule
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Join weekly office hours, live VAT return problem walkthroughs, and ACCA exam surgery sessions. 1-click sync to your personal calendar.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-indigo-400 font-bold">
              <span>Open Calendar</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* 4. Blog */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => navigateTo('blog')}
            className="p-6 bg-[#0b0f19] hover:bg-[#0e1628] rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 text-xl font-bold">
              📚
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                Technical Playbooks
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Accountant's Handbook Blog
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Deep-dives on UK VAT reverse charge rules, multi-currency journal adjustments, and salary benchmarks for finance professionals.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <span>Read Articles</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* 5. Free Resources & Excel Models */}
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            onClick={() => navigateTo('free-resources')}
            className="p-6 bg-[#0b0f19] hover:bg-[#0e1628] rounded-3xl border border-white/10 hover:border-emerald-500/40 transition-all cursor-pointer shadow-lg space-y-4 group md:col-span-2 lg:col-span-2"
          >
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 text-xl font-bold">
                📊
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                100% Free Open Access
              </span>
            </div>
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                Financial Models & Toolkits
              </span>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-0.5">
                Free Accounting Excel Models, COA Sets & Reference Guides
              </h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                Download unbranded commercial 3-statement Excel models, UK VAT 9-box reconciliation sandboxes, Xero chart of accounts, and DEAD CLIC rulebooks.
              </p>
            </div>
            <div className="pt-2 flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
              <span>Explore Free Templates & Models</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* 4. INTERACTIVE DEMO: DOUBLE-ENTRY BALANCE DEMO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-gradient-to-br from-[#0c1322] to-[#080d19] rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-6 space-y-4 text-left">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/40">
                Interactive Learning Preview
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Experience How We Teach: <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  Instant Debit & Credit Intuition
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                At EIXO, you don't just memorize definitions. You manipulate real journal entries, see why the balance sheet remains in equilibrium, and verify how it posts to cloud software.
              </p>

              <div className="space-y-2 pt-2">
                <div className="text-xs font-bold text-slate-400">Choose a business transaction:</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => {
                      setDemoSelectedTx('inv');
                      setDemoSandboxDebit(1200);
                      setDemoSandboxCredit(1200);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      demoSelectedTx === 'inv'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    1. Issue £1,200 Sales Invoice
                  </button>
                  <button
                    onClick={() => {
                      setDemoSelectedTx('rent');
                      setDemoSandboxDebit(850);
                      setDemoSandboxCredit(850);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      demoSelectedTx === 'rent'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    2. Pay £850 Office Rent
                  </button>
                  <button
                    onClick={() => {
                      setDemoSelectedTx('equip');
                      setDemoSandboxDebit(3500);
                      setDemoSandboxCredit(3500);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      demoSelectedTx === 'equip'
                        ? 'bg-emerald-600 text-white font-bold shadow-xs'
                        : 'bg-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    3. Buy £3,500 Laptops
                  </button>
                </div>
              </div>
            </div>

            {/* Live Interactive Balancing T-Account Sandbox Card */}
            <div className="lg:col-span-6 bg-[#070a12] p-6 rounded-2xl border border-white/10 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Scale className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    General Ledger T-Account Mirror
                  </span>
                </div>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  BALANCED ✓
                </span>
              </div>

              {/* T-Account visual */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                {/* Debit Box */}
                <div className="p-4 bg-[#0e1628] rounded-xl border border-cyan-500/30 space-y-2">
                  <div className="text-[11px] uppercase font-bold text-cyan-400 tracking-wider flex justify-between">
                    <span>DEBIT (Dr)</span>
                    <span>+ Increase</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    {demoSelectedTx === 'inv' && '110 Trade Debtors (Asset)'}
                    {demoSelectedTx === 'rent' && '600 Rent Expense (Expense)'}
                    {demoSelectedTx === 'equip' && '120 Office IT Equipment (Asset)'}
                  </div>
                  <div className="text-xl font-bold text-cyan-300 font-mono">
                    £{demoSandboxDebit.toLocaleString()}.00
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {demoSelectedTx === 'inv' && 'Customer owes money for services delivered.'}
                    {demoSelectedTx === 'rent' && 'Operating expense reduces profit in P&L.'}
                    {demoSelectedTx === 'equip' && 'Capital asset capitalized onto Balance Sheet.'}
                  </div>
                </div>

                {/* Credit Box */}
                <div className="p-4 bg-[#0e1628] rounded-xl border border-emerald-500/30 space-y-2">
                  <div className="text-[11px] uppercase font-bold text-emerald-400 tracking-wider flex justify-between">
                    <span>CREDIT (Cr)</span>
                    <span>- / + Effect</span>
                  </div>
                  <div className="font-bold text-white text-sm">
                    {demoSelectedTx === 'inv' && '400 Sales Revenue (Income)'}
                    {demoSelectedTx === 'rent' && '100 Bank Current Account (Asset)'}
                    {demoSelectedTx === 'equip' && '200 Trade Creditors (Liability)'}
                  </div>
                  <div className="text-xl font-bold text-emerald-300 font-mono">
                    £{demoSandboxCredit.toLocaleString()}.00
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {demoSelectedTx === 'inv' && 'Sales revenue recognized on accrual basis.'}
                    {demoSelectedTx === 'rent' && 'Cash outflows reduce current bank balance.'}
                    {demoSelectedTx === 'equip' && 'Supplier payable obligation created.'}
                  </div>
                </div>
              </div>

              {/* Summary Balance Line */}
              <div className="p-3 bg-white/5 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-300 font-medium">Accounting Equation Equilibrium:</span>
                <span className="font-mono font-bold text-white">
                  Assets = Liabilities + Equity (Balanced)
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 5. REAL STUDENT REVIEWS & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-500/40 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            Student Outcomes
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            How Learners Are Transforming Their Careers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Real feedback from graduates working in practice, industry, and corporate finance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <motion.div
              key={t.id}
              whileHover={{ y: -6 }}
              className="p-6 bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/40 transition-all text-left"
            >
              <div className="space-y-3">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-emerald-400">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-emerald-400 text-emerald-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs text-slate-300 leading-relaxed italic">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                {/* Course Link */}
                <button
                  onClick={() => {
                    setSearchQuery(t.courseName.split(' ')[0]);
                    navigateTo('courses');
                  }}
                  className="text-[11px] font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <span className="truncate">{t.courseName}</span>
                  <ArrowRight className="w-3 h-3 shrink-0" />
                </button>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <div className="font-bold text-white text-xs">{t.name}</div>
                    <div className="text-[10px] text-slate-400">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 6. ACCREDITATION & CERTIFICATE BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-900/90 text-white rounded-3xl p-8 sm:p-12 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4 text-left">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/40">
                Official EIXO Certificates
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Get Certified. Share on LinkedIn. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 font-serif italic font-normal">
                  Stand Out to Employers.
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Every completed course issues an official, verifiable CPD-accredited digital certificate with unique QR code verification. Add your credentials directly to your CV, LinkedIn profile, and job applications.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Unique Certificate ID & QR code</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified 80%+ quiz score badge</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>High-resolution printable PDF</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Lifetime permanent verification</span>
                </div>
              </div>
            </div>

            {/* Certificate Preview Card */}
            <div className="lg:col-span-5 relative">
              <div className="p-5 bg-[#070a12] rounded-2xl border border-emerald-500/30 shadow-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span className="text-xs font-bold tracking-wider text-white uppercase">
                      Certificate of Completion
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-300">EIXO-CPD-2026</span>
                </div>

                <div className="space-y-1.5 text-center py-3">
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">This certifies that</div>
                  <div className="text-base font-extrabold text-white">Alex Morgan</div>
                  <div className="text-[10px] text-slate-400">has successfully mastered all modules and practical case studies in</div>
                  <div className="text-xs font-bold text-emerald-400">Practical Bookkeeping & Accounting with Xero</div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-[10px] text-slate-400">
                  <span>Issued by EIXO Faculty</span>
                  <span className="text-emerald-400 font-bold">100% Verified</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-[#0b0f19] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ready to master accounting and finance?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Start with the fundamentals, practise in real cloud software, and build certified skills for your career.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openAuthModal('register')}
              className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('courses')}
              className="px-6 py-3.5 bg-[#151f38] hover:bg-[#1c294a] border border-white/10 text-slate-200 text-xs font-semibold rounded-xl transition-all"
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
