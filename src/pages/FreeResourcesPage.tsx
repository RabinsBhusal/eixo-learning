import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Download,
  FileSpreadsheet,
  Sparkles,
  CheckCircle2,
  Search,
  Filter,
  FileText,
  FileCode,
  Layers,
  ArrowRight,
  BookOpen,
  Eye,
  ShieldCheck,
  Building2,
  Table,
} from 'lucide-react';

interface FreeResourceItem {
  id: string;
  title: string;
  category: 'Financial Models' | 'Cloud Software Sets' | 'Tax & VAT' | 'Cheat Sheets' | 'Operational Checklists';
  format: 'Excel .XLSX' | 'CSV .CSV' | 'PDF .PDF';
  formatType: 'excel' | 'csv' | 'pdf';
  fileSize: string;
  downloadsCount: string;
  description: string;
  highlights: string[];
  compatibility: string[];
  sampleContent: string;
}

export const FreeResourcesPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [previewItem, setPreviewItem] = useState<FreeResourceItem | null>(null);

  const resourceCatalog: FreeResourceItem[] = [
    {
      id: 'res-coa-xero',
      title: 'Xero Standard Chart of Accounts (COA) Master Template',
      category: 'Cloud Software Sets',
      format: 'Excel .XLSX',
      formatType: 'excel',
      fileSize: '48 KB',
      downloadsCount: '14,820',
      description: 'Pre-formatted UK standard 3-digit chart of accounts matching Xero, QuickBooks, and Sage defaults with HMRC tax codes pre-mapped for instant migration.',
      highlights: [
        'Complete 100-990 numeric code ranges for Assets, Liabilities, Equity, Revenue, and Cost of Sales',
        'Includes default Xero 20% standard VAT, 5% reduced, and Exempt tax rate mappings',
        'Direct import-ready column headers for CSV batch uploading into Xero Settings',
      ],
      compatibility: ['Microsoft Excel 365', 'Google Sheets', 'Xero Import Module', 'LibreOffice Calc'],
      sampleContent: `Code,Account Name,Type,Tax Rate,Description
100,Bank Current Account,Bank,Exempt,Primary operating bank account
110,Trade Debtors,Current Asset,No VAT,Customer trade receivables
120,Prepayments,Current Asset,No VAT,Paid expenses spanning future periods
200,Trade Creditors,Current Liability,No VAT,Supplier trade payables
220,HMRC VAT Control Account,Current Liability,No VAT,Net VAT payable/receivable
300,Ordinary Share Capital,Equity,No VAT,Issued equity shares
400,Sales - General Products,Revenue,20% (VAT on Income),Standard-rated trading revenue
500,Cost of Goods Sold (COGS),Direct Costs,20% (VAT on Expenses),Direct inventory costs
600,Rent & Utilities,Expense,20% (VAT on Expenses),Office premises rental
700,Staff Salaries,Expense,No VAT,Gross employee payroll`,
    },
    {
      id: 'res-3-statement',
      title: '3-Statement Integrated Financial Model Skeleton',
      category: 'Financial Models',
      format: 'Excel .XLSX',
      formatType: 'excel',
      fileSize: '124 KB',
      downloadsCount: '21,450',
      description: 'Fully dynamically linked Profit & Loss (Income Statement), Balance Sheet, and Cash Flow Statement with automated balance check formula validations and circular reference prevention.',
      highlights: [
        'Dynamic working capital schedules (Debtor Days, Creditor Days, Inventory Turnover)',
        'Depreciation schedule using straight-line and reducing balance methods',
        'Automated Balance Check cell that turns green when Assets equal Liabilities + Equity',
      ],
      compatibility: ['Microsoft Excel 365 / 2019+', 'Google Sheets', 'Apple Numbers'],
      sampleContent: `======================================================
EIXO LEARNING: 3-STATEMENT FINANCIAL MODEL SKELETON
======================================================
1. INCOME STATEMENT (P&L):
   Revenue: £1,200,000
   COGS: (£480,000)
   Gross Profit: £720,000 (60.0% Margin)
   Operating Expenses: (£380,000)
   EBITDA: £340,000
   Depreciation & Amortisation: (£40,000)
   EBIT (Operating Profit): £300,000
   Interest Expense: (£20,000)
   EBT: £280,000
   Corporation Tax (25%): (£70,000)
   NET INCOME: £210,000

2. CASH FLOW STATEMENT:
   Cash Flow from Operations: £225,000
   Cash Flow from Investing (CapEx): (£50,000)
   Cash Flow from Financing: (£60,000)
   Net Increase in Cash: £115,000

3. BALANCE SHEET INTEGRATION:
   Total Assets: £1,450,000
   Total Liabilities & Equity: £1,450,000
   DIAGNOSTIC STATUS: BALANCED (CHECK = £0.00)`,
    },
    {
      id: 'res-vat-9box',
      title: 'HMRC UK VAT Return 9-Box Reconciliation Sandbox',
      category: 'Tax & VAT',
      format: 'Excel .XLSX',
      formatType: 'excel',
      fileSize: '62 KB',
      downloadsCount: '12,390',
      description: 'Step-by-step spreadsheet replicating HMRC Making Tax Digital (MTD) VAT returns with automatic calculations for Box 1 through Box 9, reverse charge calculations, and bad debt relief.',
      highlights: [
        'Box 1 to Box 5 net payment calculation with conditional formatting',
        'Automatic split between 20% Standard rate, 5% Reduced, and 0% Zero-rated purchases',
        'Built-in domestic reverse charge (DRC) formula for construction and CIS subcontractors',
      ],
      compatibility: ['Microsoft Excel 365', 'Google Sheets', 'LibreOffice Calc'],
      sampleContent: `HMRC VAT RETURN 9-BOX SUMMARY SCHEDULE
------------------------------------------------------
Box 1: VAT due in the period on sales and other outputs ............ £24,000.00
Box 2: VAT due on acquisitions from EU Member States .............. £0.00
Box 3: Total VAT due (Box 1 + Box 2) .............................. £24,000.00
Box 4: VAT reclaimed in the period on purchases and inputs ........ £9,600.00
Box 5: Net VAT to be paid to HMRC (or reclaimed) (Box 3 - Box 4) .. £14,400.00
Box 6: Total value of sales and all other outputs (excl. VAT) ..... £120,000.00
Box 7: Total value of purchases and other inputs (excl. VAT) ...... £48,000.00
Box 8: Total value of all supplies of goods to EU States .......... £0.00
Box 9: Total value of all acquisitions of goods from EU States .... £0.00`,
    },
    {
      id: 'res-dead-clic',
      title: 'DEAD CLIC Accounting Mechanics & Debit/Credit Reference Card',
      category: 'Cheat Sheets',
      format: 'PDF .PDF',
      formatType: 'pdf',
      fileSize: '1.2 MB',
      downloadsCount: '28,900',
      description: 'High-resolution printable quick-reference handbook breaking down the universal DEAD CLIC mnemonic for Assets, Expenses, Drawings (Debit) vs Liabilities, Income, Capital (Credit).',
      highlights: [
        'Visual T-Account diagrams showing debit (left) and credit (right) normal balances',
        '20 common journal entry scenarios with line-by-line debit/credit postings',
        'Summary table of permanent vs temporary balance sheet accounts',
      ],
      compatibility: ['PDF Reader', 'Tablets / iPad', 'Print Ready (A4 / US Letter)'],
      sampleContent: `======================================================
THE DEAD CLIC UNIVERSAL DOUBLE-ENTRY FRAMEWORK
======================================================
[D.E.A.D] -> Normal DEBIT Balance (Increases with Debit)
• D - Drawings (Owner drawings reduction of equity)
• E - Expenses (Rent, salaries, marketing, utility bills)
• A - Assets (Bank cash, accounts receivable, equipment, inventory)

[C.L.I.C] -> Normal CREDIT Balance (Increases with Credit)
• C - Capital (Owner equity invested, retained earnings)
• L - Liabilities (Bank loans, accounts payable, HMRC VAT due)
• I - Income / Revenue (Sales invoices, consulting fees)
• C - Credits to Profit & Loss

GOLDEN RULE: Every single financial transaction impacts at least TWO accounts, and Total Debits MUST ALWAYS equal Total Credits.`,
    },
    {
      id: 'res-trial-balance',
      title: 'Double-Entry T-Accounts & Trial Balance Generator',
      category: 'Financial Models',
      format: 'Excel .XLSX',
      formatType: 'excel',
      fileSize: '88 KB',
      downloadsCount: '18,310',
      description: 'Visual ledger posting practice workbook with 12 interconnected T-Accounts automatically feeding into an unadjusted, adjusted, and post-closing Trial Balance.',
      highlights: [
        'Enter journal entries in the journal tab; watch T-Accounts update in real-time',
        'Automatic error detection for unbalanced debit/credit input entries',
        'Separate tabs for year-end prepayments and accruals adjustments',
      ],
      compatibility: ['Microsoft Excel 365', 'Google Sheets'],
      sampleContent: `JOURNAL ENTRY & TRIAL BALANCE GENERATOR
Date       | Account Title              | Ref  | Debit (£)   | Credit (£)
2026-10-01 | 100 Bank Current Account   | J01  | 10,000.00   | 
2026-10-01 | 300 Ordinary Share Capital | J01  |             | 10,000.00
2026-10-03 | 120 Office IT Laptops      | J02  | 3,500.00    | 
2026-10-03 | 100 Bank Current Account   | J02  |             | 3,500.00
2026-10-05 | 600 Rent Expense           | J03  | 1,200.00    | 
2026-10-05 | 200 Trade Creditors        | J03  |             | 1,200.00
--------------------------------------------------------------------------
TOTAL CHECK:                             | £14,700.00  | £14,700.00 (OK)`,
    },
    {
      id: 'res-month-end',
      title: 'Month-End Financial Close 25-Step Master Checklist',
      category: 'Operational Checklists',
      format: 'Excel .XLSX',
      formatType: 'excel',
      fileSize: '54 KB',
      downloadsCount: '15,670',
      description: 'A comprehensive 25-step month-end closing procedure workbook used by financial controllers to guarantee clean reconciliations before publishing management accounts.',
      highlights: [
        'Grouped into 5 phases: Cash & Banking, Accounts Receivable, Accounts Payable, Fixed Assets, and General Ledger',
        'Includes sign-off status flags, preparer/reviewer initials, and deadline trackers (Work Day 1 to Work Day 5)',
        'Built-in Variance Analysis tab for Month-on-Month budget vs actual comparison',
      ],
      compatibility: ['Microsoft Excel 365', 'Google Sheets'],
      sampleContent: `MONTH-END CLOSE WORKFLOW CHECKLIST
Phase 1: Cash & Banking
[x] 1. Download and reconcile all bank statement feeds to £0.00 variance
[x] 2. Reconcile Stripe, PayPal, and merchant clearing accounts
[x] 3. Verify petty cash float and physical voucher receipts

Phase 2: Receivables & Sales
[x] 4. Issue all unbilled revenue and accrued sales invoices
[x] 5. Review Aged Debtors report (>90 days) and calculate Bad Debt Provision
[x] 6. Confirm deferred revenue balance matches unfulfilled service contracts

Phase 3: Payables & Expenses
[x] 7. Process all supplier invoices and credit notes into Xero
[x] 8. Review Aged Creditors report and resolve unallocated debit balances
[x] 9. Reconcile corporate credit card expense reports and receipts`,
    },
    {
      id: 'res-tax-aia',
      title: 'UK Small Business Corporation Tax & Capital Allowances Schedule',
      category: 'Tax & VAT',
      format: 'Excel .XLSX',
      formatType: 'excel',
      fileSize: '76 KB',
      downloadsCount: '9,840',
      description: 'Interactive corporation tax computation schedule incorporating 19% small profits rate, 25% main rate, marginal relief taper, and 100% Annual Investment Allowance (AIA).',
      highlights: [
        'Marginal relief calculation formula for profits between £50,000 and £250,000',
        'Capital allowances pooling: Main Rate Pool (18%), Special Rate Pool (6%), and AIA (100%)',
        'Add-back schedules for disallowable client entertainment and depreciation',
      ],
      compatibility: ['Microsoft Excel 365', 'Google Sheets'],
      sampleContent: `UK CORPORATION TAX COMPUTATION SCHEDULE
Accounting Period: Year Ended 31 March 2026
--------------------------------------------------------------------------
Net Profit per Accounts ................................. £140,000.00
Add Disallowable Items:
  - Depreciation on Fixed Assets ........................ £18,000.00
  - Client Business Entertainment ....................... £4,500.00
  - Fines and Penalties ................................. £500.00
Less Capital Allowances:
  - Annual Investment Allowance (AIA) (100% on Plant) ... (£25,000.00)
  - Main Pool Writing Down Allowance (18%) .............. (£4,200.00)
Adjusted Taxable Trading Profit ......................... £133,800.00

Corporation Tax Calculation (Marginal Relief Active):
Main Rate Tax (25% on £133,800) ......................... £33,450.00
Less Marginal Relief: 3/200 x (£250,000 - £133,800) ..... (£1,743.00)
TOTAL CORPORATION TAX PAYABLE (Due 1 Jan 2027) .......... £31,707.00`,
    },
    {
      id: 'res-shortcuts-guide',
      title: 'Xero & QuickBooks Cloud Accounting Shortcuts & Speed Guide',
      category: 'Cheat Sheets',
      format: 'PDF .PDF',
      formatType: 'pdf',
      fileSize: '950 KB',
      downloadsCount: '23,100',
      description: 'Desk-side cheat sheet containing all keyboard shortcuts, bank feed matching rules, and fast navigation tricks for Xero and QuickBooks Online.',
      highlights: [
        'Over 30 tested keyboard hotkeys for instant invoice creation and bank reconciliation',
        'Bank rule configuration recipes for recurring subscription transactions',
        'Quick find codes for ledger accounts and contact cards',
      ],
      compatibility: ['PDF Reader', 'All Devices'],
      sampleContent: `======================================================
XERO & QBO CLOUD SHORTCUTS & PRODUCTIVITY MANUAL
======================================================
XERO GLOBAL SHORTCUTS:
• / (Slash) ............ Open Global Search (Find Contacts, Invoices, Transactions)
• + (Plus) ............. Open Create New Menu (Invoice, Bill, Contact, Quote)
• [Tab] in Grid ........ Advance to next entry line with auto-tabbing
• [Ctrl] + [Enter] ..... Save and approve invoice immediately

BANK RECONCILIATION MATCH TRICKS:
1. Exact Name + Exact Amount -> Green [OK] match button lights up.
2. Split Invoices -> Click [Find & Match] -> Check multiple bills to combine.
3. Minor Penny Differences -> Adjustments -> Bank Fee or Minor Rounding.

QBO SHORTCUTS:
• [Ctrl] + [Alt] + I ... Create Invoice
• [Ctrl] + [Alt] + X ... Create Expense
• [Ctrl] + [Alt] + C ... Create Customer Contact`,
    },
  ];

  const filteredResources = resourceCatalog.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'models' && item.category === 'Financial Models') ||
      (selectedCategory === 'xero' && item.category === 'Cloud Software Sets') ||
      (selectedCategory === 'tax' && item.category === 'Tax & VAT') ||
      (selectedCategory === 'cheatsheets' && item.category === 'Cheat Sheets') ||
      (selectedCategory === 'checklists' && item.category === 'Operational Checklists');

    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.highlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const handleDownload = (item: FreeResourceItem) => {
    // Generate sample downloadable content
    const extension = item.formatType === 'pdf' ? 'txt' : item.formatType === 'csv' ? 'csv' : 'txt';
    const blob = new Blob([item.sampleContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${item.title.replace(/[^a-zA-Z0-9]/g, '_')}.${extension}`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-200 pb-20">
      {/* Header Banner */}
      <div className="bg-linear-to-b from-[#0e1628] to-[#070a12] border-b border-white/10 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-2">
            <FileSpreadsheet className="w-4 h-4" />
            <span>Open Access Educational Resources</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Free Accounting Toolkits & Excel Models
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
            Download battle-tested Excel financial models, Xero chart of accounts files, HMRC VAT return reconciliation workbooks, and DEAD CLIC cheat sheets. Unlocked, commercial-grade, and 100% free.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300 font-medium">Faculty Reviewed</span>
            </div>
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-cyan-400 shrink-0" />
              <span className="text-slate-300 font-medium">Excel & Sheets Ready</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-400 shrink-0" />
              <span className="text-slate-300 font-medium">No Paywall or Sign-Up</span>
            </div>
            <div className="flex items-center gap-2">
              <Download className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-300 font-medium">100,000+ Downloads</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Category Filter Bar */}
        <div className="bg-[#0b0f19] p-4 rounded-3xl border border-white/10 mb-8 space-y-4 shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search models by name, formula, or software (Xero, VAT, 3-Statement)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#070a12] border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>

            <div className="text-xs text-slate-400 flex items-center gap-1.5 self-end sm:self-center">
              <span>Showing</span>
              <strong className="text-white font-bold">{filteredResources.length}</strong>
              <span>resources</span>
            </div>
          </div>

          {/* Category Badges */}
          <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-white/5">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'models', label: '📊 Financial Models (.xlsx)' },
              { id: 'xero', label: '⚡ Xero & Software Sets' },
              { id: 'tax', label: '🏛️ HMRC Tax & VAT' },
              { id: 'cheatsheets', label: '📑 Cheat Sheets (.pdf)' },
              { id: 'checklists', label: '📋 Month-End Checklists' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === tab.id
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="bg-[#0b0f19] p-12 text-center rounded-3xl border border-white/10 space-y-3">
            <FileSpreadsheet className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-base font-bold text-white">No resources matched your search</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Try adjusting your search query or choosing another category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-emerald-600/20 text-emerald-300 rounded-xl text-xs font-bold hover:bg-emerald-600/30 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((item) => (
              <div
                key={item.id}
                className="bg-[#0b0f19] p-6 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between shadow-xl group space-y-4"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-300 text-[10px] font-mono font-bold rounded-md border border-emerald-500/30">
                        {item.format}
                      </span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.fileSize}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400">
                      {item.downloadsCount} downloads
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-white mt-3 group-hover:text-emerald-300 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="mt-4 space-y-1.5 bg-[#070a12] p-3 rounded-2xl border border-white/5">
                    {item.highlights.map((h, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-3">
                  <button
                    onClick={() => setPreviewItem(item)}
                    className="flex items-center gap-1.5 px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-semibold rounded-xl transition-colors border border-white/5"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>Inspect Model</span>
                  </button>

                  <button
                    onClick={() => handleDownload(item)}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950/40"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Free</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom Educational Upsell Card */}
        <div className="mt-12 bg-linear-to-r from-[#0c182d] to-[#091120] p-8 rounded-3xl border border-emerald-500/30 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Full Video Courseware Available</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-white">
              Want step-by-step video instruction on using these models?
            </h3>
            <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
              Our comprehensive courses walk through every formula, double-entry mechanism, and Xero bank reconciliation scenario in detail.
            </p>
          </div>

          <button
            onClick={() => navigateTo('courses')}
            className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-lg flex items-center gap-2 shrink-0"
          >
            <span>Explore All Courses</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Model Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold rounded-md border border-emerald-500/30">
                  {previewItem.format}
                </span>
                <h3 className="text-lg font-black text-white mt-1 leading-snug">
                  {previewItem.title}
                </h3>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">
                  Description & Use Case
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {previewItem.description}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Key Technical Features
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {previewItem.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Sample Data Structure / Code Snapshot
                </h4>
                <pre className="p-4 bg-[#070a12] rounded-2xl border border-white/10 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {previewItem.sampleContent}
                </pre>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Compatible Platforms
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {previewItem.compatibility.map((c, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-semibold rounded-lg border border-slate-700"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  handleDownload(previewItem);
                  setPreviewItem(null);
                }}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download File</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
