import React from 'react';
import { useApp } from '../context/AppContext';
import { CourseCard } from '../components/course/CourseCard';
import {
  BookOpen,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  MonitorCheck,
  Scale,
  DollarSign,
  Briefcase,
  Laptop,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { courses, navigateTo, openAuthModal, setSearchQuery } = useApp();

  const featuredCourses = courses.filter((c) => c.published).slice(0, 4);

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-slate-900 text-white pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              {/* Trust Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-xs font-semibold">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Single-Owner Professional Education • UK & Global Accounting Standards</span>
              </div>

              {/* Large Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                Learn Accounting & Finance. <br className="hidden sm:inline" />
                <span className="text-emerald-400 font-serif italic font-normal">
                  Build Practical Skills.
                </span>
              </h1>

              {/* Supporting Text */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
                Master accounting and finance from fundamental theoretical concepts to hands-on software execution with structured courses designed to help you understand why the numbers work and execute them in <strong className="text-white font-semibold">Xero</strong>, <strong className="text-white font-semibold">QuickBooks</strong>, and <strong className="text-white font-semibold">Sage</strong>.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => navigateTo('courses')}
                  className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-emerald-900/40 hover:shadow-emerald-900/60 transition-all flex items-center gap-2"
                >
                  <span>Explore Courses</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => openAuthModal('register')}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-sm font-semibold rounded-xl transition-colors"
                >
                  Create Free Account
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-800/80 text-xs text-slate-400">
                <div>
                  <div className="text-white font-bold text-lg">100%</div>
                  <div>Faculty-Led Curriculum</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Xero & QBO</div>
                  <div>Real Practice Case Files</div>
                </div>
                <div>
                  <div className="text-white font-bold text-lg">Certificates</div>
                  <div>Verified Competency</div>
                </div>
              </div>
            </div>

            {/* Right Hero Image (High Quality Professional Real Finance Photography) */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-700/80 group">
                <img
                  src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=900&auto=format&fit=crop&q=80"
                  alt="Professional accountant working on financial statements and accounting software"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />

                {/* Floating Floating Stat Tag */}
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-slate-900/90 backdrop-blur-md rounded-xl border border-slate-700 text-xs text-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                      <FileSpreadsheet className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-bold text-white">Practical Case Files Included</div>
                      <div className="text-slate-400 text-[11px]">Real downloadable Excel models & Xero trials</div>
                    </div>
                  </div>
                  <span className="px-2 py-1 bg-emerald-900 text-emerald-300 rounded font-mono font-bold text-[11px]">
                    .xlsx + .pdf
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SECTION: WHAT YOU'LL LEARN */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)]">
            Comprehensive Curriculum
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            What You'll Learn at EIXO
          </h2>
          <p className="text-sm sm:text-base text-slate-300">
            From the foundational mechanics of double-entry bookkeeping to executive corporate finance and cloud accounting tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Accounting Track */}
          <div className="bg-[#0b0f19]/90 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Accounting Track</h3>
                <p className="text-xs text-slate-400">The language of business, from transactions to published statements</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-300">
              {[
                'Financial Accounting',
                'Management Accounting',
                'Bookkeeping Fundamentals',
                'Financial Statements',
                'Double Entry (DEAD CLIC)',
                'Adjusting Entries & Accruals',
                'VAT & Tax Rules',
                'Payroll Accounting',
                'Bank Reconciliation',
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    setSearchQuery(topic);
                    navigateTo('courses');
                  }}
                  className="p-2.5 text-left bg-[#12182b]/80 hover:bg-emerald-500/20 hover:text-emerald-300 rounded-lg border border-white/10 hover:border-emerald-500/40 transition-all flex items-center gap-1.5 text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span className="truncate">{topic}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Finance Track */}
          <div className="bg-[#0b0f19]/90 backdrop-blur-md rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-xl shadow-[0_0_12px_rgba(59,130,246,0.2)]">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Finance Track</h3>
                <p className="text-xs text-slate-400">Corporate decision making, valuation, and quantitative models</p>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-semibold text-slate-300">
              {[
                'Corporate Finance',
                'Financial Analysis & Ratios',
                'DCF Company Valuation',
                'Financial Modelling in Excel',
                'Capital Budgeting (NPV/IRR)',
                'Working Capital Management',
                'Budgeting & Forecasting',
                'Dupont ROE Analysis',
                'Cost of Capital (WACC)',
              ].map((topic) => (
                <button
                  key={topic}
                  onClick={() => {
                    setSearchQuery(topic);
                    navigateTo('courses');
                  }}
                  className="p-2.5 text-left bg-[#12182b]/80 hover:bg-blue-500/20 hover:text-blue-300 rounded-lg border border-white/10 hover:border-blue-500/40 transition-all flex items-center gap-1.5 text-slate-200"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span className="truncate">{topic}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. DEDICATED CARDS: PRACTICAL ACCOUNTING SOFTWARE (Xero, QuickBooks, Sage) */}
      <section className="bg-[#070a12] py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Practical Accounting Software
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Direct, real-world instruction on the industry-standard cloud accounting software used by millions of businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Xero Card */}
            <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    Xero
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Core Course Track</span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">Practical Bookkeeping with Xero</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Learn practical bookkeeping and accounting workflows using Xero. Setup charts of accounts, raise sales invoices, process supplier bills, and perform automated bank feed reconciliations.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">42 Lessons • 8 Hours</span>
                <button
                  onClick={() => {
                    setSearchQuery('Xero');
                    navigateTo('courses');
                  }}
                  className="text-xs font-bold text-slate-200 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <span>Explore Xero</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* QuickBooks Card */}
            <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    QuickBooks
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Online Edition</span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">QuickBooks Online in Business</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Learn how modern enterprises use QuickBooks Online for daily bookkeeping, invoicing, VAT submissions, and management reports.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">28 Lessons • 7 Hours</span>
                <button
                  onClick={() => {
                    setSearchQuery('QuickBooks');
                    navigateTo('courses');
                  }}
                  className="text-xs font-bold text-slate-200 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <span>Explore QBO</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Sage Card */}
            <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 shadow-xl flex flex-col justify-between space-y-4 hover:border-emerald-500/50 transition-all group">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-extrabold text-sm rounded-lg shadow-[0_0_10px_rgba(16,185,129,0.2)]">
                    Sage
                  </span>
                  <span className="text-xs font-semibold text-slate-400">Business Cloud</span>
                </div>
                <h3 className="font-bold text-lg text-white group-hover:text-emerald-300 transition-colors">Sage Business Cloud in Practice</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Develop practical skills using Sage accounting software. Master nominal ledger codes, customer batch receipts, and month-end journal adjustments.
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-400">24 Lessons • 6 Hours</span>
                <button
                  onClick={() => {
                    setSearchQuery('Sage');
                    navigateTo('courses');
                  }}
                  className="text-xs font-bold text-slate-200 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                >
                  <span>Explore Sage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THEORY + PRACTICAL LEARNING (Core EIXO Differentiation) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-slate-800 shadow-xl relative overflow-hidden">
          
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-800">
              The EIXO Educational Framework
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Don't Just Learn the Theory. <br />
              <span className="text-emerald-400 font-serif italic font-normal">
                Learn How to Use It.
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              Most online courses teach abstract accounting theory in a vacuum, or teach software clicking without understanding why. EIXO bridges both into an unbroken 4-stage learning progression:
            </p>
          </div>

          {/* 4-Step Progression Visual: Learn -> Understand -> Practise -> Apply */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
            
            {/* Step 1 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  01
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">Step 1: Learn</div>
                <h3 className="font-bold text-base text-white">Accounting Theory</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Understand the foundational accounting equation, double-entry mechanics, and why transactions affect the balance sheet.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Ex: Double-entry rules
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  02
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">Step 2: Understand</div>
                <h3 className="font-bold text-base text-white">Practical Demonstration</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Watch the faculty enter the transaction into Xero, QuickBooks, or Sage in high-definition video walkthroughs.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Ex: Software live entry
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  03
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">Step 3: Practise</div>
                <h3 className="font-bold text-base text-white">Student Practice File</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Download practice transaction data in Excel, enter transactions independently, and take instant knowledge check quizzes.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Ex: Practice Case 01.xlsx
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 relative flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  04
                </div>
                <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">Step 4: Apply</div>
                <h3 className="font-bold text-base text-white">Real-World Competency</h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Perform month-end routines, prepare VAT returns, and produce balanced financial statements for real companies.
                </p>
              </div>
              <div className="pt-2 text-[11px] text-slate-500 font-mono">
                Ex: Production readiness
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED COURSES CATALOGUE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-emerald-950/80 border border-emerald-800/60 px-3 py-1 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.15)]">
              EIXO Curated Courses
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-2">
              Featured Learning Programmes
            </h2>
          </div>
          <button
            onClick={() => navigateTo('courses')}
            className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
          >
            <span>View all {courses.length} courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* 6. SINGLE PROVIDER DISTINCTION */}
      <section className="bg-[#070a12] py-16 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#12182b] border border-white/10 text-slate-300 text-xs font-semibold">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Single-Owner Standard of Quality</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Not a Crowded Marketplace. <br />
                <span className="text-emerald-400 font-serif italic font-normal">One High Standard of Quality.</span>
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed">
                Unlike open marketplaces where anyone can upload mismatched courses with conflicting definitions, every course on EIXO Learning is designed, written, and verified by our unified academic faculty.
              </p>

              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Consistent Terminology:</strong> Seamless continuity from introductory double entry to corporate valuation.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Chartered Faculty:</strong> Authored by ICAEW Chartered Accountants, CFA charterholders, and Certified Software Advisors.</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong className="text-white">Verified Downloadables:</strong> Clean, virus-free Excel models, CSVs, and PDF cheat sheets matching each lesson.</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#0b0f19] rounded-2xl border border-white/10 space-y-2 shadow-lg">
                <div className="text-2xl font-extrabold text-white">8,500+</div>
                <div className="text-xs font-bold text-emerald-400">Lessons Completed</div>
                <p className="text-[11px] text-slate-400">Across accounting and practical software modules.</p>
              </div>

              <div className="p-6 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 space-y-2 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <div className="text-2xl font-extrabold text-emerald-300">4.9 / 5.0</div>
                <div className="text-xs font-bold text-emerald-400">Student Satisfaction</div>
                <p className="text-[11px] text-emerald-200/80">Consistently praised for clear debit/credit intuition.</p>
              </div>

              <div className="p-6 bg-[#0b0f19] rounded-2xl border border-white/10 space-y-2 shadow-lg">
                <div className="text-2xl font-extrabold text-white">100%</div>
                <div className="text-xs font-bold text-emerald-400">Vimeo HD Streaming</div>
                <p className="text-[11px] text-slate-400">Crisp full-screen software resolution on desktop & mobile.</p>
              </div>

              <div className="p-6 bg-[#12182b] text-white rounded-2xl border border-white/10 space-y-2 shadow-lg">
                <div className="text-2xl font-extrabold text-emerald-400">UK GAAP & IFRS</div>
                <div className="text-xs font-bold text-slate-200">Global Standards</div>
                <p className="text-[11px] text-slate-400">Applicable to international corporate reporting.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0b0f19] rounded-3xl p-8 sm:p-14 text-center text-white space-y-6 relative overflow-hidden border border-white/10 shadow-2xl">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Ready to master accounting and finance?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Start with the fundamentals, practise in real software, and build certified skills for your career.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => openAuthModal('register')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.35)] transition-all flex items-center gap-2"
            >
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('courses')}
              className="px-6 py-3 bg-[#151f38] hover:bg-[#1c294a] border border-white/10 text-slate-200 text-xs font-semibold rounded-xl transition-all"
            >
              Browse All Courses
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
