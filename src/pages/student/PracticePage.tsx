import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  CheckSquare,
  FileCheck2,
  Timer,
  FileSpreadsheet,
  Award,
  Sparkles,
  ArrowRight,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  BookOpen,
  Filter,
  Play,
  Layers,
  ChevronRight,
  TrendingUp,
  Download,
  AlertCircle,
} from 'lucide-react';

type PracticeTab = 'questions' | 'mock-exams' | 'simulations' | 'excel-exercises' | 'case-studies';

interface QuestionItem {
  id: string;
  topic: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  formulaNote?: string;
}

interface MockExam {
  id: string;
  title: string;
  body: 'ACCA Applied' | 'CIMA Cert BA' | 'AAT Level 3' | 'EIXO Certified';
  durationMinutes: number;
  totalQuestions: number;
  passingScore: number;
  description: string;
  topicsCovered: string[];
}

export const PracticePage: React.FC = () => {
  const { navigateTo, currentUser } = useApp();
  const [activeTab, setActiveTab] = useState<PracticeTab>('questions');
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  
  // Interactive Question State
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Active Mock Exam Simulation State
  const [activeExam, setActiveExam] = useState<MockExam | null>(null);
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(45 * 60);

  // Interactive Double-Entry Ledger Simulator
  const [ledgerInputs, setLedgerInputs] = useState<{ debitAccount: string; debitAmount: string; creditAccount: string; creditAmount: string }>({
    debitAccount: '',
    debitAmount: '',
    creditAccount: '',
    creditAmount: '',
  });
  const [ledgerFeedback, setLedgerFeedback] = useState<string | null>(null);

  const practiceQuestions: QuestionItem[] = [
    {
      id: 'q-1',
      topic: 'Double-Entry Bookkeeping',
      difficulty: 'Beginner',
      question: 'A company buys a commercial delivery van for £18,000 paid via bank transfer. Which journal entry correctly records this transaction?',
      options: [
        'Debit: Motor Vehicles £18,000 | Credit: Bank Account £18,000',
        'Debit: Bank Account £18,000 | Credit: Motor Vehicles £18,000',
        'Debit: Vehicle Expense £18,000 | Credit: Trade Creditors £18,000',
        'Debit: Motor Vehicles £18,000 | Credit: Share Capital £18,000',
      ],
      correctOptionIndex: 0,
      explanation: 'Under DEAD CLIC rules, Motor Vehicles is a non-current Asset (increases with Debit). Bank Current Account is an Asset decreasing due to payment (decreases with Credit).',
      formulaNote: 'Asset (+) = Debit | Asset (-) = Credit',
    },
    {
      id: 'q-2',
      topic: 'UK VAT Calculations',
      difficulty: 'Intermediate',
      question: 'A VAT-registered consulting firm issues a gross sales invoice of £6,000 including UK standard 20% VAT. What is the net sales revenue to be recorded in the Profit & Loss?',
      options: [
        '£4,800',
        '£5,000',
        '£5,200',
        '£6,000',
      ],
      correctOptionIndex: 1,
      explanation: 'To strip 20% VAT from a gross amount: Net = Gross / 1.20 = £6,000 / 1.2 = £5,000. The £1,000 VAT is credited to the HMRC VAT Liability control account, not P&L income.',
      formulaNote: 'Net = Gross ÷ 1.20 | VAT = Gross × (1/6)',
    },
    {
      id: 'q-3',
      topic: 'Depreciation & Fixed Assets',
      difficulty: 'Intermediate',
      question: 'Equipment costing £40,000 has a residual scrap value of £4,000 and a 4-year useful economic life. What is the annual straight-line depreciation charge?',
      options: [
        '£10,000 per year',
        '£9,000 per year',
        '£8,000 per year',
        '£12,000 per year',
      ],
      correctOptionIndex: 1,
      explanation: 'Straight-line Depreciation = (Cost - Residual Value) / Useful Life = (£40,000 - £4,000) / 4 = £36,000 / 4 = £9,000 per annum.',
      formulaNote: 'Annual Charge = (Cost - Salvage Value) ÷ Useful Life',
    },
    {
      id: 'q-4',
      topic: 'Working Capital & Ratios',
      difficulty: 'Advanced',
      question: 'A business has Current Assets of £150,000 (including £50,000 Inventory) and Current Liabilities of £80,000. What is its Acid-Test (Quick) Ratio?',
      options: [
        '1.88 : 1',
        '1.25 : 1',
        '1.00 : 1',
        '0.62 : 1',
      ],
      correctOptionIndex: 1,
      explanation: 'Quick Ratio = (Current Assets - Inventory) / Current Liabilities = (£150,000 - £50,000) / £80,000 = £100,000 / £80,000 = 1.25.',
      formulaNote: 'Acid Test = (Current Assets - Inventory) ÷ Current Liabilities',
    },
    {
      id: 'q-5',
      topic: 'Xero Cloud Bank Rules',
      difficulty: 'Intermediate',
      question: 'When reconciling monthly SaaS subscription charges from Zoom on a company credit card in Xero, what is the best practice automation setup?',
      options: [
        'Create a Spend Money Bank Rule matching description containing "Zoom" with 20% VAT on Expenses',
        'Manually enter a bill every month with manual payment allocation',
        'Directly code into the bank feed without selecting a tax code',
        'Create a Receive Money transaction to offset next month',
      ],
      correctOptionIndex: 0,
      explanation: 'Bank Rules in Xero automate regular recurring monthly overheads. Setting conditions for "Description contains Zoom" with 20% VAT auto-generates matching Spend Money transactions with one click.',
      formulaNote: 'Xero Workflow: Settings > Bank Rules > Create Spend Money Rule',
    },
  ];

  const mockExams: MockExam[] = [
    {
      id: 'mock-acca-fa',
      title: 'ACCA Financial Accounting (FA / F3) Full Timed Simulation',
      body: 'ACCA Applied',
      durationMinutes: 120,
      totalQuestions: 50,
      passingScore: 50,
      description: 'Covers ledger accounting, trial balance adjustments, IAS 1 presentation of financial statements, inventory valuation (FIFO/AVCO), and bank reconciliations.',
      topicsCovered: ['Double-Entry Mechanics', 'Trial Balance & Suspense', 'IAS 16 Fixed Assets', 'Control Accounts', 'Company Accounts'],
    },
    {
      id: 'mock-xero-cert',
      title: 'EIXO Xero Advisor Practical Proficiency Certification Exam',
      body: 'EIXO Certified',
      durationMinutes: 60,
      totalQuestions: 30,
      passingScore: 80,
      description: 'Hands-on practical assessment covering chart of accounts setup, bank rules, aged debtors reporting, VAT return generation, and journal corrections.',
      topicsCovered: ['Bank Feed Matching', 'HMRC MTD VAT Return', 'Sales Invoicing & Credit Notes', 'Manual Journals', 'Tracking Categories'],
    },
    {
      id: 'mock-aat-l3',
      title: 'AAT Level 3 Financial Accounting: Preparing Final Accounts',
      body: 'AAT Level 3',
      durationMinutes: 90,
      totalQuestions: 40,
      passingScore: 70,
      description: 'Comprehensive test on extended trial balance prep, accrued/prepaid income and expenses, bad debts & provisions, and partnership profit distribution.',
      topicsCovered: ['Accruals & Prepayments', 'Allowance for Doubtful Debts', 'Partnership Appropriation', 'Cost of Goods Sold'],
    },
  ];

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const toggleReveal = (questionId: string) => {
    setRevealedAnswers((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleVerifyLedger = (e: React.FormEvent) => {
    e.preventDefault();
    const dAcc = ledgerInputs.debitAccount.toLowerCase();
    const cAcc = ledgerInputs.creditAccount.toLowerCase();
    const dAmt = parseFloat(ledgerInputs.debitAmount);
    const cAmt = parseFloat(ledgerInputs.creditAmount);

    if (!dAmt || !cAmt) {
      setLedgerFeedback('Please enter valid numeric amounts for both Debit and Credit.');
      return;
    }

    if (dAmt !== cAmt) {
      setLedgerFeedback(`❌ Imbalance Detected: Debits (£${dAmt.toFixed(2)}) do not equal Credits (£${cAmt.toFixed(2)}). Total debits must equal credits.`);
      return;
    }

    if ((dAcc.includes('rent') || dAcc.includes('expense')) && (cAcc.includes('bank') || cAcc.includes('cash') || cAcc.includes('creditor'))) {
      setLedgerFeedback(`✓ Perfect Journal Entry! Debit: Rent Expense £${dAmt.toLocaleString()} | Credit: Bank £${cAmt.toLocaleString()}. Rent increases (Debit expense), Cash decreases (Credit asset).`);
    } else {
      setLedgerFeedback(`✓ Mathematically balanced at £${dAmt.toLocaleString()}! Verify accounts comply with DEAD CLIC (Debit = Asset/Expense, Credit = Liability/Income/Capital).`);
    }
  };

  const filteredQuestions = practiceQuestions.filter((q) => {
    if (selectedTopic === 'all') return true;
    return q.topic.toLowerCase().includes(selectedTopic.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-200 pb-20">
      {/* Header Banner */}
      <div className="bg-linear-to-b from-[#0d1628] to-[#070a12] border-b border-white/10 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <CheckSquare className="w-4 h-4" />
            <span>Interactive Assessment & Practical Skills Lab</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Practice & Assessments
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Test your accounting reflexes with exam-style questions, timed ACCA/AAT mock simulations, interactive double-entry ledger sandboxes, and financial modeling exercises.
          </p>

          {/* Tab Navigation */}
          <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-white/10">
            {[
              { id: 'questions', label: '📝 Practice Questions', count: practiceQuestions.length },
              { id: 'mock-exams', label: '⏱️ Timed Mock Exams', count: mockExams.length },
              { id: 'simulations', label: '⚖️ Ledger Simulator', count: 'Interactive' },
              { id: 'excel-exercises', label: '📊 Excel Modelling Drills', count: '4 Exercises' },
              { id: 'case-studies', label: '🏢 Real-World Case Studies', count: '3 Studies' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as PracticeTab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span className="px-1.5 py-0.2 rounded-md bg-black/30 text-[10px] text-slate-400 font-mono">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* TAB 1: PRACTICE QUESTIONS */}
        {activeTab === 'questions' && (
          <div className="space-y-6">
            {/* Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-[#0b0f19] p-3 rounded-2xl border border-white/10">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Filter Topic:</span>
                {['all', 'Double-Entry', 'VAT', 'Depreciation', 'Ratios', 'Xero'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setSelectedTopic(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs transition-colors ${
                      selectedTopic === t
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {t === 'all' ? 'All Questions' : t}
                  </button>
                ))}
              </div>

              <div className="text-xs text-slate-400">
                <span>{filteredQuestions.length} Questions Available</span>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-4">
              {filteredQuestions.map((q, qIndex) => {
                const selected = selectedAnswers[q.id];
                const isRevealed = revealedAnswers[q.id];
                const isAnswered = selected !== undefined;
                const isCorrect = isAnswered && selected === q.correctOptionIndex;

                return (
                  <div
                    key={q.id}
                    className="bg-[#0b0f19] p-5 sm:p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-300 flex items-center justify-center text-xs font-bold font-mono">
                          {qIndex + 1}
                        </span>
                        <span className="text-xs font-bold text-white">{q.topic}</span>
                        <span className="px-2 py-0.5 bg-slate-800 text-slate-400 text-[10px] rounded-md font-mono">
                          {q.difficulty}
                        </span>
                      </div>

                      {isAnswered && (
                        <div className="flex items-center gap-1.5 text-xs font-bold">
                          {isCorrect ? (
                            <span className="text-emerald-400 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct (+10 XP)
                            </span>
                          ) : (
                            <span className="text-rose-400 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Question Text */}
                    <p className="text-sm font-semibold text-white leading-relaxed">
                      {q.question}
                    </p>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {q.options.map((opt, optIndex) => {
                        let optionStyle = 'bg-[#070a12] border-white/10 hover:border-white/20 text-slate-300';
                        if (isRevealed || isAnswered) {
                          if (optIndex === q.correctOptionIndex) {
                            optionStyle = 'bg-emerald-950/50 border-emerald-500/60 text-emerald-200 font-bold';
                          } else if (selected === optIndex) {
                            optionStyle = 'bg-rose-950/50 border-rose-500/60 text-rose-200';
                          }
                        } else if (selected === optIndex) {
                          optionStyle = 'bg-emerald-900/30 border-emerald-500 text-emerald-300 font-semibold';
                        }

                        return (
                          <button
                            key={optIndex}
                            onClick={() => handleSelectOption(q.id, optIndex)}
                            className={`p-3 rounded-2xl border text-left text-xs transition-all flex items-start gap-2.5 ${optionStyle}`}
                          >
                            <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-mono shrink-0">
                              {String.fromCharCode(65 + optIndex)}
                            </span>
                            <span className="leading-snug">{opt}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Actions & Explanation */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                      <button
                        onClick={() => toggleReveal(q.id)}
                        className="text-xs text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
                      >
                        <HelpCircle className="w-3.5 h-3.5" />
                        <span>{isRevealed ? 'Hide Explanation' : 'View Faculty Explanation'}</span>
                      </button>

                      {q.formulaNote && (
                        <span className="text-[11px] text-slate-400 font-mono bg-[#070a12] px-2.5 py-1 rounded-lg border border-white/5">
                          Formula: {q.formulaNote}
                        </span>
                      )}
                    </div>

                    {/* Detailed Explanation Reveal */}
                    {isRevealed && (
                      <div className="p-4 bg-[#0d1628] rounded-2xl border border-emerald-500/30 space-y-2 animate-in fade-in">
                        <div className="text-xs font-bold text-emerald-300 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Detailed Working & Rule Breakdown:</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 2: TIMED MOCK EXAMS */}
        {activeTab === 'mock-exams' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockExams.map((exam) => (
                <div
                  key={exam.id}
                  className="bg-[#0b0f19] p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-4 shadow-xl group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                        {exam.body}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-slate-400 font-mono">
                        <Timer className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{exam.durationMinutes} mins</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {exam.title}
                    </h3>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {exam.description}
                    </p>

                    <div className="space-y-1 pt-2">
                      <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">
                        Syllabus Covered:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {exam.topicsCovered.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#070a12] text-slate-300 text-[10px] rounded border border-white/5 font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="text-xs text-slate-400">
                      <span>Pass Mark: </span>
                      <strong className="text-white font-mono">{exam.passingScore}%</strong>
                    </div>

                    <button
                      onClick={() => {
                        setActiveExam(exam);
                        setExamStarted(true);
                      }}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Start Simulation</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Active Simulation Drawer / Notice */}
            {examStarted && activeExam && (
              <div className="bg-[#0f1d33] p-6 rounded-3xl border border-emerald-500/50 shadow-2xl space-y-4 animate-in slide-in-from-bottom-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Active Exam Mode: {activeExam.title}
                      </h4>
                      <p className="text-xs text-slate-300">
                        {activeExam.totalQuestions} questions • Auto-grading enabled upon submission
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="px-3 py-1.5 bg-[#070a12] border border-emerald-500/40 rounded-xl font-mono text-sm font-bold text-emerald-400">
                      44:52
                    </div>
                    <button
                      onClick={() => setExamStarted(false)}
                      className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-slate-300 rounded-xl text-xs font-bold"
                    >
                      Exit Simulator
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: INTERACTIVE DOUBLE-ENTRY SIMULATOR */}
        {activeTab === 'simulations' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-6 bg-[#0b0f19] p-6 rounded-3xl border border-white/10 space-y-5 shadow-xl">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold tracking-wider">
                  Real-Time Sandbox
                </span>
                <h3 className="text-base font-bold text-white">
                  Double-Entry Journal Balancing Engine
                </h3>
                <p className="text-xs text-slate-400">
                  Scenario: Your company pays £1,500 monthly office rent from the primary business bank account. Construct the correct balanced double entry below.
                </p>
              </div>

              <form onSubmit={handleVerifyLedger} className="space-y-4 bg-[#070a12] p-4 rounded-2xl border border-white/10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1">
                      Debit Account (Increases Asset/Expense)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Rent Expense"
                      value={ledgerInputs.debitAccount}
                      onChange={(e) => setLedgerInputs({ ...ledgerInputs, debitAccount: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-emerald-400 mb-1">
                      Debit Amount (£)
                    </label>
                    <input
                      type="number"
                      placeholder="1500"
                      value={ledgerInputs.debitAmount}
                      onChange={(e) => setLedgerInputs({ ...ledgerInputs, debitAmount: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-cyan-400 mb-1">
                      Credit Account (Decreases Asset / Increases Liability)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bank Current Account"
                      value={ledgerInputs.creditAccount}
                      onChange={(e) => setLedgerInputs({ ...ledgerInputs, creditAccount: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-cyan-400 mb-1">
                      Credit Amount (£)
                    </label>
                    <input
                      type="number"
                      placeholder="1500"
                      value={ledgerInputs.creditAmount}
                      onChange={(e) => setLedgerInputs({ ...ledgerInputs, creditAmount: e.target.value })}
                      className="w-full bg-[#0b0f19] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                  >
                    Validate & Post Entry
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setLedgerInputs({ debitAccount: 'Rent Expense', debitAmount: '1500', creditAccount: 'Bank Current Account', creditAmount: '1500' });
                    }}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    Auto-Fill Answer
                  </button>
                </div>
              </form>

              {ledgerFeedback && (
                <div className="p-3.5 bg-[#0e1628] rounded-2xl border border-emerald-500/30 text-xs text-slate-200">
                  {ledgerFeedback}
                </div>
              )}
            </div>

            {/* T-Accounts Visual Representation */}
            <div className="lg:col-span-6 bg-[#0b0f19] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-emerald-400" />
                <span>Live Visual T-Account General Ledger</span>
              </h3>

              <div className="grid grid-cols-2 gap-4">
                {/* Rent Expense T-Account */}
                <div className="bg-[#070a12] p-3 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-center pb-1 border-b border-white/10 font-bold text-xs text-emerald-300">
                    Rent Expense (600)
                  </div>
                  <div className="grid grid-cols-2 text-[10px] font-mono divide-x divide-white/10 min-h-20">
                    <div className="pr-2 space-y-1">
                      <span className="text-slate-500 block">DEBIT (Dr)</span>
                      <span className="text-emerald-400 font-bold">
                        £{ledgerInputs.debitAmount || '1,500.00'}
                      </span>
                    </div>
                    <div className="pl-2 space-y-1 text-right">
                      <span className="text-slate-500 block">CREDIT (Cr)</span>
                      <span className="text-slate-600">-</span>
                    </div>
                  </div>
                </div>

                {/* Bank Current Account T-Account */}
                <div className="bg-[#070a12] p-3 rounded-2xl border border-white/10 space-y-2">
                  <div className="text-center pb-1 border-b border-white/10 font-bold text-xs text-cyan-300">
                    Bank Current Account (100)
                  </div>
                  <div className="grid grid-cols-2 text-[10px] font-mono divide-x divide-white/10 min-h-20">
                    <div className="pr-2 space-y-1">
                      <span className="text-slate-500 block">DEBIT (Dr)</span>
                      <span className="text-slate-600">-</span>
                    </div>
                    <div className="pl-2 space-y-1 text-right">
                      <span className="text-slate-500 block">CREDIT (Cr)</span>
                      <span className="text-cyan-400 font-bold">
                        £{ledgerInputs.creditAmount || '1,500.00'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-[#070a12] rounded-2xl border border-white/5 text-[11px] text-slate-400 space-y-1">
                <p className="font-bold text-white">Diagnostic Check:</p>
                <p>• Total Debits Posted: £{ledgerInputs.debitAmount || '1,500.00'}</p>
                <p>• Total Credits Posted: £{ledgerInputs.creditAmount || '1,500.00'}</p>
                <p className="text-emerald-400 font-bold">Status: Trial Balance Balanced (Variance = £0.00)</p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: EXCEL EXERCISES */}
        {activeTab === 'excel-exercises' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                title: 'Working Capital & DSO / DPO Dashboard Drill',
                difficulty: 'Intermediate',
                file: 'Drill_Working_Capital_Model.xlsx',
                description: 'Calculate Debtor Days (DSO), Creditor Days (DPO), and Cash Conversion Cycle (CCC) from given balance sheet snapshots.',
              },
              {
                title: '3-Statement Model Circular Reference Fix',
                difficulty: 'Advanced',
                file: 'Drill_3Statement_Interest_Reconciliation.xlsx',
                description: 'Solve an intentional balance sheet discrepancy by linking net interest payments to the revolving credit facility schedule.',
              },
              {
                title: 'UK VAT 9-Box MTD Reconciliation Template',
                difficulty: 'Beginner',
                file: 'Drill_VAT_MTD_Box9_Recon.xlsx',
                description: 'Reconcile 150 transaction line items into Box 1 (Output VAT) and Box 4 (Input VAT) with reverse charge handling.',
              },
              {
                title: 'Capital Budgeting NPV & IRR Sensitivity Table',
                difficulty: 'Intermediate',
                file: 'Drill_CapEx_NPV_IRR_Matrix.xlsx',
                description: 'Construct an automated 2-variable Excel Data Table showing Net Present Value sensitivity to discount rates from 6% to 14%.',
              },
            ].map((drill, idx) => (
              <div
                key={idx}
                className="bg-[#0b0f19] p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-4 shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-bold rounded">
                      {drill.difficulty}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                      {drill.file}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mt-3 leading-snug">
                    {drill.title}
                  </h3>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {drill.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Includes Solution Key Tab
                  </span>
                  <button
                    onClick={() => navigateTo('free-resources')}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-white text-xs font-semibold rounded-xl transition-colors border border-white/10"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Exercise</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 5: CASE STUDIES */}
        {activeTab === 'case-studies' && (
          <div className="space-y-6">
            {[
              {
                title: 'Case Study 1: Cloud SaaS Migration from Desktop Sage to Xero',
                company: 'Apex Digital Media Ltd (London)',
                turnover: '£2.4M Revenue',
                challenge: 'The client has 1,200 open invoices, incorrect opening bank balances, and unmapped VAT codes across 3 international currencies.',
                deliverables: ['Mapped Chart of Accounts', 'Clean Bank Feed Rules', 'Multi-currency Currency Realised Gain/Loss audit'],
              },
              {
                title: 'Case Study 2: Fast-Fashion E-Commerce Inventory Write-Down & Working Capital Crisis',
                company: 'Verve Apparel UK',
                turnover: '£5.8M Revenue',
                challenge: 'Dead inventory accumulation causing negative operating cash flows despite reported net accounting profits.',
                deliverables: ['IAS 2 Lower of Cost & Net Realisable Value', 'Aged Inventory Turnover Ratio Analysis', '13-Week Cash Flow Forecast'],
              },
            ].map((cs, idx) => (
              <div
                key={idx}
                className="bg-[#0b0f19] p-6 rounded-3xl border border-white/10 space-y-4 shadow-xl"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/5">
                  <div>
                    <span className="text-[10px] text-emerald-400 uppercase font-bold tracking-wider font-mono">
                      {cs.company}
                    </span>
                    <h3 className="text-base font-bold text-white leading-snug">
                      {cs.title}
                    </h3>
                  </div>
                  <span className="px-3 py-1 bg-emerald-500/15 text-emerald-300 text-xs font-mono font-bold rounded-xl border border-emerald-500/30">
                    {cs.turnover}
                  </span>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Business Problem:
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {cs.challenge}
                  </p>
                </div>

                <div className="space-y-2 bg-[#070a12] p-4 rounded-2xl border border-white/5">
                  <h4 className="text-xs font-bold text-white">Student Assignment Deliverables:</h4>
                  <ul className="space-y-1 text-xs text-slate-400">
                    {cs.deliverables.map((d, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
