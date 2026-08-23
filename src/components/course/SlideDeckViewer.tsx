import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Download,
  FileText,
  Layers,
  Sparkles,
  CheckCircle2,
  Eye,
} from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  content: {
    heading: string;
    points: string[];
    formulaOrCode?: string;
    diagramType?: 'equation' | 'flow' | 'table' | 'cards';
    diagramData?: any;
    proTip?: string;
  };
}

const XERO_SLIDES: Slide[] = [
  {
    id: 1,
    title: 'Modern Cloud Bookkeeping & Xero Architecture',
    subtitle: 'Module 1 • Lecture Presentation Deck',
    badge: 'Xero Fundamentals',
    content: {
      heading: 'How Modern Cloud Accounting Automates Transaction Flow',
      points: [
        'Single Source of Truth: Real-time cloud ledger eliminates disconnected desktop spreadsheets.',
        'Automated Direct Bank Feeds: Daily transaction retrieval directly from major banking institutions.',
        'Continuous Reconciliation: Reconcile daily rather than waiting for month-end panic.',
        'Audit-Proof Digital Trail: Source documents and receipts attached directly to ledger transactions.',
      ],
      formulaOrCode: 'Source Document (Receipt/Invoice) ➔ General Journal ➔ General Ledger ➔ Trial Balance ➔ Financial Statements',
      diagramType: 'flow',
      proTip: 'In Xero, every transaction you approve automatically generates the underlying double-entry journal behind the scenes.',
    },
  },
  {
    id: 2,
    title: 'The Double Entry Engine & DEAD CLIC Rules',
    subtitle: 'Module 1 • Lecture Presentation Deck',
    badge: 'Accounting Mechanics',
    content: {
      heading: 'Understanding Debits and Credits in Xero Ledgers',
      points: [
        'D.E.A.D: Debit increases Expenses, Assets, and Drawings.',
        'C.L.I.C: Credit increases Liabilities, Income (Revenue), and Capital (Equity).',
        'Every transaction has at least two equal and opposite monetary effects.',
        'The Fundamental Equation: Assets = Liabilities + Owner Equity must always balance.',
      ],
      formulaOrCode: 'DEBIT (Expenses + Assets + Drawings) === CREDIT (Liabilities + Income + Capital)',
      diagramType: 'equation',
      proTip: 'When you create a Sales Invoice in Xero, it automatically Debits Accounts Receivable (Asset) and Credits Sales Revenue (Income).',
    },
  },
  {
    id: 3,
    title: 'Organisation Setup & Chart of Accounts Architecture',
    subtitle: 'Module 2 • Lecture Presentation Deck',
    badge: 'Xero Setup',
    content: {
      heading: 'Configuring the Nominal Ledger for Maximum Reporting Clarity',
      points: [
        'Standard 3-Digit Nominal Coding Structure ensures clear reporting segmentation.',
        'Tax Rates Mapping: 20% Standard VAT on Income/Expenses, 0% Zero-Rated, and Exempt.',
        'Lock Dates & Conversion Balances: Establishing historic opening balances accurately.',
        'Financial Year & Lock Dates: Protecting historical periods from accidental edits.',
      ],
      diagramType: 'table',
      diagramData: [
        { code: '090 - 099', name: 'Bank & Cash Accounts', type: 'Current Asset' },
        { code: '200 - 299', name: 'Revenue & Sales Accounts', type: 'Operating Income' },
        { code: '400 - 499', name: 'Direct Operating Expenses', type: 'Expense' },
        { code: '800 - 899', name: 'Trade Creditors & VAT Control', type: 'Current Liability' },
        { code: '900 - 999', name: 'Owner Equity & Retained Earnings', type: 'Equity' },
      ],
      proTip: 'Always customize your Chart of Accounts before importing historic transactions to prevent miscategorization.',
    },
  },
  {
    id: 4,
    title: 'Sales Invoicing & Accounts Receivable Lifecycle',
    subtitle: 'Module 3 • Lecture Presentation Deck',
    badge: 'Sales Cycle',
    content: {
      heading: 'Accelerating Cash Inflow with Online Invoicing & Reminders',
      points: [
        'Professional Branded Invoices: Auto-calculated VAT, item codes, and instant payment links.',
        'Debtor Aging & Automated Reminders: Automatic chase emails for overdue invoices at 7, 14, and 21 days.',
        'Credit Notes & Allocations: Handling returns, price adjustments, and customer refunds.',
        'Deposit Reconciliations: Matching partial customer payments to outstanding receivables.',
      ],
      formulaOrCode: 'Invoice Issued: DR Accounts Receivable £1,200 | CR Sales £1,000 | CR VAT Output £200\nPayment Received: DR Bank £1,200 | CR Accounts Receivable £1,200',
      diagramType: 'flow',
      proTip: 'Enabling Stripe or GoCardless in Xero gets invoices paid on average 14 days faster.',
    },
  },
  {
    id: 5,
    title: 'Mastering Bank Feeds & The 3 Rules of Reconciliation',
    subtitle: 'Module 5 • Lecture Presentation Deck',
    badge: 'Bank Reconciliations',
    content: {
      heading: 'Reconciling 100s of Bank Lines with Automation Rules',
      points: [
        'Rule 1 - Green Match: Xero identifies approved invoices/bills matching the exact amount and date.',
        'Rule 2 - Create: For direct spend/receive money with no prior invoice (e.g. coffee, fuel, bank charges).',
        'Rule 3 - Transfer: Moving money between internal accounts (e.g., Current to Savings or Petty Cash).',
        'Bank Rules: Automating recurring monthly transactions with conditional logic.',
      ],
      diagramType: 'cards',
      diagramData: [
        { title: 'Match Tab', desc: '1-click match to outstanding invoice/bill', color: 'emerald' },
        { title: 'Create Tab', desc: 'Direct ledger entry for instant expenses', color: 'blue' },
        { title: 'Transfer Tab', desc: 'Internal bank account inter-transfers', color: 'indigo' },
        { title: 'Bank Rules', desc: 'Pre-set automation for recurring vendor debits', color: 'purple' },
      ],
      proTip: 'Always verify that the Statement Balance matches the Xero Ledger Balance at the end of every week.',
    },
  },
  {
    id: 6,
    title: 'HMRC Making Tax Digital (MTD) VAT Return (VAT 100)',
    subtitle: 'Module 6 • Lecture Presentation Deck',
    badge: 'Tax & Compliance',
    content: {
      heading: 'Understanding the 9-Box VAT Return Mechanism',
      points: [
        'Box 1: VAT due on sales and other outputs in this period.',
        'Box 4: VAT reclaimed on purchases and other inputs.',
        'Box 5: Net VAT to be paid to HMRC or reclaimed by you (Box 3 minus Box 4).',
        'Boxes 6 & 7: Total net value of sales and purchases excluding VAT.',
        'Audit Trail Drilldown: Verifying every transaction before electronic submission.',
      ],
      formulaOrCode: 'Box 5 = Box 3 (Output VAT) - Box 4 (Input VAT)\nIf Output > Input ➔ Pay HMRC | If Input > Output ➔ Reclaim from HMRC',
      diagramType: 'table',
      diagramData: [
        { code: 'Box 1', name: 'VAT due on sales & outputs', type: 'Output VAT' },
        { code: 'Box 4', name: 'VAT reclaimed on purchases', type: 'Input VAT' },
        { code: 'Box 5', name: 'Net VAT to pay to HMRC', type: 'Settlement Amount' },
        { code: 'Box 6 / 7', name: 'Total Net Sales & Purchases (Ex VAT)', type: 'Turnover Basis' },
      ],
      proTip: 'Run the VAT Audit Report in Xero to catch any transactions marked "No VAT" that should have been standard rated.',
    },
  },
];

export const SlideDeckViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const slide = XERO_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSlideIndex < XERO_SLIDES.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#050508] p-6 flex flex-col justify-between overflow-y-auto' : ''}`}>
      
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[11px] font-bold">
              {slide.badge}
            </span>
            <h3 className="text-base font-bold text-white">Lecture Presentation Slides</h3>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">{slide.subtitle}</p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 bg-[#12182b] hover:bg-[#1a2442] border border-white/10 rounded-lg text-slate-300 hover:text-white transition-colors text-xs flex items-center gap-1"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Slides'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit' : 'Fullscreen'}</span>
          </button>

          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              alert('Downloading EIXO Xero Master Slide Deck (PDF)...');
            }}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download Deck (PDF)</span>
          </a>
        </div>
      </div>

      {/* Main Slide Canvas (16:9 Presentation Canvas) */}
      <div className="relative rounded-2xl bg-gradient-to-br from-[#0a0f1d] to-[#0f172a] border border-white/10 p-6 sm:p-8 shadow-2xl min-h-[380px] flex flex-col justify-between overflow-hidden">
        {/* Background watermark/glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none -z-0" />

        {/* Slide Top Details */}
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                SLIDE {slide.id} OF {XERO_SLIDES.length}
              </span>
              <h2 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight mt-0.5">
                {slide.title}
              </h2>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-bold text-slate-400">EIXO Academic Faculty</span>
              <div className="text-[10px] text-emerald-400 font-mono">Xero Certified Masterclass</div>
            </div>
          </div>

          <h4 className="text-sm font-bold text-emerald-300">{slide.content.heading}</h4>

          {/* Bullet points */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
            {slide.content.points.map((pt, idx) => (
              <div
                key={idx}
                className="p-3 bg-[#12182b]/80 rounded-xl border border-white/10 flex items-start gap-2.5 shadow-sm"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-xs text-slate-200 leading-relaxed">{pt}</span>
              </div>
            ))}
          </div>

          {/* Optional Diagram / Formula / Code Box */}
          {slide.content.formulaOrCode && (
            <div className="p-3.5 bg-black/60 rounded-xl border border-emerald-500/30 text-xs font-mono text-emerald-300 overflow-x-auto shadow-inner">
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">
                Workflow / Formula Specification:
              </div>
              <pre className="whitespace-pre-wrap leading-relaxed">{slide.content.formulaOrCode}</pre>
            </div>
          )}

          {/* Optional Table */}
          {slide.content.diagramType === 'table' && slide.content.diagramData && (
            <div className="bg-[#0b0f19] rounded-xl border border-white/10 overflow-hidden shadow-inner">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#12182b] text-slate-400 font-semibold border-b border-white/10">
                  <tr>
                    <th className="px-4 py-2">Code Range</th>
                    <th className="px-4 py-2">Category / Nominal Section</th>
                    <th className="px-4 py-2">Classification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                  {slide.content.diagramData.map((row: any, idx: number) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="px-4 py-2 text-emerald-400 font-bold">{row.code}</td>
                      <td className="px-4 py-2 text-white">{row.name}</td>
                      <td className="px-4 py-2 text-slate-300">{row.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Optional 4-card grid */}
          {slide.content.diagramType === 'cards' && slide.content.diagramData && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {slide.content.diagramData.map((c: any, idx: number) => (
                <div key={idx} className="p-3 bg-[#12182b] rounded-xl border border-white/10 space-y-1 text-center">
                  <div className="text-xs font-bold text-emerald-300">{c.title}</div>
                  <div className="text-[10px] text-slate-400">{c.desc}</div>
                </div>
              ))}
            </div>
          )}

          {/* Faculty Pro-tip */}
          {slide.content.proTip && (
            <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/30 text-xs text-slate-200">
              <strong className="text-emerald-400 font-semibold">Faculty Insight: </strong>
              {slide.content.proTip}
            </div>
          )}
        </div>

        {/* Slide Bottom Controls */}
        <div className="relative z-10 pt-6 mt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className="px-3.5 py-2 bg-[#12182b] hover:bg-[#1a2442] disabled:opacity-40 disabled:pointer-events-none text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border border-white/10 shadow-sm"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous Slide</span>
          </button>

          {/* Slide Indicator Dots */}
          <div className="flex items-center gap-1.5">
            {XERO_SLIDES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  idx === currentSlideIndex
                    ? 'bg-emerald-400 w-6 shadow-[0_0_8px_rgba(52,211,153,0.8)]'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                title={`Slide ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === XERO_SLIDES.length - 1}
            className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 disabled:pointer-events-none text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          >
            <span>Next Slide</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Slide Thumbnails Tray */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1">
        {XERO_SLIDES.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setCurrentSlideIndex(idx)}
            className={`p-2.5 rounded-xl border text-left transition-all ${
              idx === currentSlideIndex
                ? 'bg-emerald-500/20 border-emerald-500/60 shadow-[0_0_10px_rgba(16,185,129,0.2)]'
                : 'bg-[#0b0f19] hover:bg-[#12182b] border-white/10'
            }`}
          >
            <div className="text-[9px] font-mono font-bold text-emerald-400">SLIDE {s.id}</div>
            <div className="text-[11px] font-bold text-white truncate mt-0.5">{s.title}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
