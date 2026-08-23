import React, { useState } from 'react';
import {
  Monitor,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  ArrowRight,
  ExternalLink,
  Layers,
  FileSpreadsheet,
  FileCheck,
  CreditCard,
  Building2,
  DollarSign,
  TrendingUp,
  Receipt,
  Scale,
} from 'lucide-react';

interface SoftwareScreen {
  id: string;
  name: string;
  category: string;
  description: string;
  workflowOverview: string;
  hotspots: {
    title: string;
    description: string;
    position: string;
    tag: string;
  }[];
}

const XERO_SOFTWARE_SCREENS: SoftwareScreen[] = [
  {
    id: 'screen-dashboard',
    name: 'Xero Main Business Dashboard',
    category: 'Executive Overview',
    description: 'The command center of Xero showing live bank balances, debtor tracking, cash in/out curves, and nominal account watchlist.',
    workflowOverview: 'Reviewing bank feed connectivity, overdue debtor receivables, and upcoming supplier liabilities before starting daily bookkeeping.',
    hotspots: [
      {
        title: 'Barclays Current Account Feed',
        description: 'Shows live bank feed balance (£48,250.00) vs Statement balance with direct access to Reconcile 4 items.',
        position: 'Top Left Bank Widget',
        tag: 'Bank Feeds',
      },
      {
        title: 'Invoices Owed to You (£12,450.00)',
        description: 'Categorizes open customer invoices into Draft, Awaiting Payment, and Overdue with aging bar graph.',
        position: 'Top Right Receivables',
        tag: 'Sales',
      },
      {
        title: 'Bills You Need to Pay (£6,890.00)',
        description: 'Supplier accounts payable summary to prevent supplier credit holds and plan cash flow.',
        position: 'Middle Right Payables',
        tag: 'Purchases',
      },
      {
        title: 'Account Watchlist',
        description: 'Pin high-priority nominal accounts (e.g. Sales, Advertising, Office Supplies) to monitor month-to-date spending vs budget.',
        position: 'Bottom Widget',
        tag: 'Control',
      },
    ],
  },
  {
    id: 'screen-bank-rec',
    name: 'Xero Bank Statement Reconciliation Screen',
    category: 'Bank Reconciliations',
    description: 'The core operational engine of Xero. Left side displays imported bank statement lines; right side executes ledger transactions.',
    workflowOverview: 'Matching imported transactions to approved sales invoices or creating instant ledger entries with automated VAT code allocation.',
    hotspots: [
      {
        title: 'Statement Line (Left Column)',
        description: 'Direct imported data from bank feed: Date (24 Feb 2026), Payee (Stripe Payout), Amount (+£2,400.00).',
        position: 'Left Pane',
        tag: 'Source Statement',
      },
      {
        title: 'Green Match Button (Right Column)',
        description: 'Xero finds matching approved Invoice INV-0104. One click on "OK" completes the double-entry reconciliation.',
        position: 'Right Pane Top',
        tag: 'Match Rule',
      },
      {
        title: 'Create Tab (Instant Entry)',
        description: 'For direct expenditure without a prior invoice. Specify Contact (Adobe), Account (400 - Subscriptions), Tax Rate (20% VAT).',
        position: 'Right Pane Bottom',
        tag: 'Create Rule',
      },
      {
        title: 'Reconciliation Balance Check',
        description: 'Continuous comparison between Bank Statement Balance and Xero General Ledger balance.',
        position: 'Top Right Status',
        tag: 'Audit Check',
      },
    ],
  },
  {
    id: 'screen-sales-invoice',
    name: 'Xero New Sales Invoice Interface',
    category: 'Accounts Receivable',
    description: 'Generating compliant customer sales invoices with automated 20% Standard VAT calculations and payment link integration.',
    workflowOverview: 'Inputting customer details, line item nominal codes (Account 200 - Sales), VAT rate, and approving for automated debtor tracking.',
    hotspots: [
      {
        title: 'Customer Contact & Due Date',
        description: 'Customer: Zenith Global Media Ltd. Payment Terms: Net 30 Days (Due 24/03/2026).',
        position: 'Invoice Header',
        tag: 'Contact & Terms',
      },
      {
        title: 'Line Item & Nominal Account (200 - Sales)',
        description: 'Item: Consulting & System Integration. Unit Price: £2,500.00. Account: 200 - Sales Revenue.',
        position: 'Invoice Grid Line 1',
        tag: 'Nominal Code',
      },
      {
        title: 'Tax Rate: 20% (VAT on Income)',
        description: 'Automatically calculates £500.00 Output VAT and posts credit to Nominal 820 (VAT Control).',
        position: 'Tax Column',
        tag: 'VAT Rate',
      },
      {
        title: 'Approve & Email Button',
        description: 'Locks invoice into General Ledger (DR Receivables £3,000 | CR Sales £2,500 | CR VAT £500) and emails PDF to client.',
        position: 'Action Buttons',
        tag: 'Ledger Post',
      },
    ],
  },
  {
    id: 'screen-chart-of-accounts',
    name: 'Xero Chart of Accounts Nominal Hierarchy',
    category: 'General Ledger',
    description: 'The master structural directory of accounts determining how all financial reports (Balance Sheet & P&L) are formatted.',
    workflowOverview: 'Reviewing nominal account codes, description, account type, default tax rates, and Year-to-Date (YTD) balances.',
    hotspots: [
      {
        title: 'Code 090 - Business Bank Account',
        description: 'Type: Bank. Currency: GBP. Automatically linked to open banking feed.',
        position: 'Row 1',
        tag: 'Asset / Bank',
      },
      {
        title: 'Code 200 - Sales Revenue',
        description: 'Type: Revenue. Default Tax Rate: 20% VAT on Income. Used for all trading invoices.',
        position: 'Row 2',
        tag: 'Income',
      },
      {
        title: 'Code 400 - Advertising & Marketing',
        description: 'Type: Direct Expense. Default Tax Rate: 20% VAT on Expenses. Measures customer acquisition costs.',
        position: 'Row 3',
        tag: 'Expense',
      },
      {
        title: 'Code 820 - VAT Control Account',
        description: 'Type: Current Liability. Holds net balance owed to/from HMRC until settlement.',
        position: 'Row 4',
        tag: 'Liability',
      },
    ],
  },
  {
    id: 'screen-vat-return',
    name: 'Xero Making Tax Digital (MTD) VAT 100 Return',
    category: 'Statutory Tax Compliance',
    description: 'The 9-Box statutory VAT Return generated automatically from reconciled transactional records.',
    workflowOverview: 'Verifying Box 1 to 9 totals, checking the transaction audit trail, and electronically submitting to HMRC.',
    hotspots: [
      {
        title: 'Box 1: VAT due on Sales (£5,420.00)',
        description: 'Total Output VAT collected on customer sales during the 3-month period.',
        position: 'Box 1',
        tag: 'Output Tax',
      },
      {
        title: 'Box 4: VAT reclaimed on Purchases (£1,840.00)',
        description: 'Total Input VAT paid on allowable supplier invoices and business expenses.',
        position: 'Box 4',
        tag: 'Input Tax',
      },
      {
        title: 'Box 5: Net VAT to pay to HMRC (£3,580.00)',
        description: 'Calculation: Box 3 (£5,420.00) minus Box 4 (£1,840.00) = £3,580.00 net liability payable to HMRC.',
        position: 'Box 5 (Net)',
        tag: 'Settlement',
      },
      {
        title: 'Transaction Audit Trail Drilldown',
        description: 'Full itemized list of all 142 transactions composing this return with invoice numbers and VAT rates.',
        position: 'Audit Trail Tab',
        tag: 'Audit Defense',
      },
    ],
  },
];

export const SoftwareScreenshotsViewer: React.FC = () => {
  const [selectedScreenId, setSelectedScreenId] = useState<string>('screen-dashboard');
  const [activeHotspotIndex, setActiveHotspotIndex] = useState<number | null>(0);

  const currentScreen =
    XERO_SOFTWARE_SCREENS.find((s) => s.id === selectedScreenId) || XERO_SOFTWARE_SCREENS[0];

  return (
    <div className="space-y-6">
      
      {/* Top Selector Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10 no-scrollbar">
        {XERO_SOFTWARE_SCREENS.map((screen) => (
          <button
            key={screen.id}
            onClick={() => {
              setSelectedScreenId(screen.id);
              setActiveHotspotIndex(0);
            }}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              screen.id === currentScreen.id
                ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]'
                : 'bg-[#0b0f19] hover:bg-[#12182b] text-slate-300 border border-white/10'
            }`}
          >
            <Monitor className="w-3.5 h-3.5 text-emerald-300" />
            <span>{screen.name.replace('Xero ', '')}</span>
          </button>
        ))}
      </div>

      {/* Screen Overview Card */}
      <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-5 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold rounded uppercase">
                {currentScreen.category}
              </span>
              <h2 className="text-lg font-extrabold text-white">{currentScreen.name}</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">{currentScreen.description}</p>
          </div>
          <div className="px-3 py-1.5 bg-[#12182b] rounded-xl border border-white/10 text-right shrink-0">
            <span className="text-[10px] font-mono uppercase text-slate-400 block">Software Mode</span>
            <span className="text-xs font-bold text-emerald-400">Official Xero Accounting UI</span>
          </div>
        </div>

        {/* Real Software UI Interactive Simulator Box */}
        <div className="rounded-xl bg-[#070b14] border border-white/10 overflow-hidden shadow-2xl">
          
          {/* Simulated Browser / Software Navigation Bar */}
          <div className="bg-[#0e1628] border-b border-white/10 px-4 py-2.5 flex items-center justify-between text-xs text-slate-300 font-medium">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <span className="text-slate-600">|</span>
              <div className="flex items-center gap-1.5 text-white font-bold">
                <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[9px] text-white font-bold">
                  x
                </div>
                <span>Apex Digital Services Ltd (UK)</span>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-4 text-slate-400 text-[11px]">
              <span className="text-emerald-400 font-bold">Dashboard</span>
              <span className="hover:text-white">Business</span>
              <span className="hover:text-white">Accounting</span>
              <span className="hover:text-white">Contacts</span>
              <span className="hover:text-white">Reports</span>
            </div>

            <div className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              Practice Organisation Active
            </div>
          </div>

          {/* Interactive Screen Specific Render */}
          <div className="p-5 space-y-4">
            
            {/* 1. DASHBOARD SCREEN UI */}
            {currentScreen.id === 'screen-dashboard' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Bank Account Widget */}
                  <div className="bg-[#121a2f] p-4 rounded-xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-emerald-400" />
                        <span className="font-bold text-white">Barclays Current Account</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-300 bg-emerald-500/20 px-1.5 py-0.5 rounded">
                        Feed Connected
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/10">
                      <div>
                        <div className="text-[10px] text-slate-400">Statement Balance</div>
                        <div className="text-base font-mono font-extrabold text-white">£48,250.00</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-slate-400">Xero Balance</div>
                        <div className="text-base font-mono font-extrabold text-emerald-400">£48,250.00</div>
                      </div>
                    </div>
                    <div className="pt-2 flex justify-between items-center">
                      <span className="text-[11px] text-amber-300 font-semibold">4 items to reconcile</span>
                      <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-xs font-bold hover:bg-emerald-500">
                        Reconcile 4 items
                      </button>
                    </div>
                  </div>

                  {/* Invoices Owed Widget */}
                  <div className="bg-[#121a2f] p-4 rounded-xl border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Receipt className="w-4 h-4 text-blue-400" />
                        <span className="font-bold text-white">Invoices Owed to You</span>
                      </div>
                      <span className="text-xs font-mono font-bold text-white">Total: £12,450.00</span>
                    </div>
                    <div className="h-3 bg-black/40 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 w-3/5" title="Awaiting Payment: £7,470" />
                      <div className="bg-amber-500 w-1/5" title="Draft: £2,490" />
                      <div className="bg-rose-500 w-1/5" title="Overdue: £2,490" />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 pt-1">
                      <span className="text-emerald-400 font-semibold">Awaiting: £7,470</span>
                      <span className="text-amber-400 font-semibold">Draft: £2,490</span>
                      <span className="text-rose-400 font-semibold">Overdue: £2,490</span>
                    </div>
                    <div className="pt-1 flex justify-end">
                      <button className="px-3 py-1 bg-[#1a2542] hover:bg-[#223158] text-white rounded-lg text-xs font-semibold border border-white/10">
                        + New Sales Invoice
                      </button>
                    </div>
                  </div>
                </div>

                {/* Account Watchlist Table */}
                <div className="bg-[#121a2f] rounded-xl border border-white/10 overflow-hidden">
                  <div className="p-3 bg-[#152038] font-bold text-white text-xs flex justify-between">
                    <span>Account Watchlist (Nominal Tracker)</span>
                    <span className="text-[10px] text-slate-400">YTD Actuals vs Budget</span>
                  </div>
                  <table className="w-full text-left text-xs">
                    <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-2 font-bold text-white">200 - Sales Revenue</td>
                        <td className="px-4 py-2 text-emerald-400">£124,500.00 YTD</td>
                        <td className="px-4 py-2 text-slate-400 text-right">+18% vs Target</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-2 font-bold text-white">400 - Advertising & Marketing</td>
                        <td className="px-4 py-2 text-slate-200">£14,200.00 YTD</td>
                        <td className="px-4 py-2 text-amber-400 text-right">On Budget</td>
                      </tr>
                      <tr className="hover:bg-white/5">
                        <td className="px-4 py-2 font-bold text-white">820 - VAT Control Liability</td>
                        <td className="px-4 py-2 text-rose-400">£3,580.00 Due</td>
                        <td className="px-4 py-2 text-slate-400 text-right">Q1 MTD</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 2. BANK RECONCILIATION SCREEN UI */}
            {currentScreen.id === 'screen-bank-rec' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="p-3 bg-[#121a2f] rounded-xl border border-white/10 flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-white">Reconciling Barclays Current Account</h4>
                    <p className="text-[11px] text-slate-400">Showing 2 of 4 statement lines</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Statement Balance</span>
                    <span className="text-sm font-mono font-bold text-emerald-400">£48,250.00</span>
                  </div>
                </div>

                {/* Line 1: Match Example */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#121a2f] rounded-xl border border-emerald-500/40 shadow-lg">
                  {/* Left statement side */}
                  <div className="space-y-1 pr-2 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Bank Statement Line</div>
                    <div className="text-xs font-bold text-white">24 Feb 2026 • Stripe Payout Ref: ST-99214</div>
                    <div className="text-base font-mono font-extrabold text-emerald-400">+£2,400.00</div>
                  </div>
                  {/* Right Xero Match side */}
                  <div className="space-y-2 flex flex-col justify-between">
                    <div>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded text-[10px] font-bold">
                        MATCH FOUND (Green)
                      </span>
                      <p className="text-xs font-bold text-white mt-1">
                        Invoice INV-0104 • Zenith Media (£2,400.00)
                      </p>
                      <p className="text-[10px] text-slate-400">Approved invoice matches exact transaction amount and date.</p>
                    </div>
                    <div className="flex justify-end">
                      <button className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                        OK (Reconcile)
                      </button>
                    </div>
                  </div>
                </div>

                {/* Line 2: Create Example */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-[#121a2f] rounded-xl border border-white/10">
                  <div className="space-y-1 pr-2 border-b md:border-b-0 md:border-r border-white/10 pb-3 md:pb-0">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Bank Statement Line</div>
                    <div className="text-xs font-bold text-white">22 Feb 2026 • Adobe Systems Ireland</div>
                    <div className="text-base font-mono font-extrabold text-rose-400">-£54.99</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value="Who: Adobe Systems"
                        className="w-1/2 p-1.5 bg-[#0b0f19] border border-white/10 rounded text-[11px] text-white"
                      />
                      <input
                        type="text"
                        readOnly
                        value="What: 400 - Subscriptions"
                        className="w-1/2 p-1.5 bg-[#0b0f19] border border-white/10 rounded text-[11px] text-emerald-300"
                      />
                    </div>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400">Tax: 20% Standard VAT (£9.17)</span>
                      <button className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold">
                        OK (Post & Reconcile)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. SALES INVOICE SCREEN UI */}
            {currentScreen.id === 'screen-sales-invoice' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="p-4 bg-[#121a2f] rounded-xl border border-white/10 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold block">To (Customer)</label>
                      <input
                        type="text"
                        readOnly
                        value="Zenith Global Media Ltd"
                        className="w-full p-2 bg-[#0b0f19] border border-white/10 rounded-lg text-white font-bold"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold block">Date</label>
                      <input
                        type="text"
                        readOnly
                        value="24 Feb 2026"
                        className="w-full p-2 bg-[#0b0f19] border border-white/10 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold block">Due Date</label>
                      <input
                        type="text"
                        readOnly
                        value="24 Mar 2026 (Net 30)"
                        className="w-full p-2 bg-[#0b0f19] border border-white/10 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-semibold block">Invoice #</label>
                      <input
                        type="text"
                        readOnly
                        value="INV-0105"
                        className="w-full p-2 bg-[#0b0f19] border border-white/10 rounded-lg text-emerald-400 font-mono font-bold"
                      />
                    </div>
                  </div>

                  {/* Invoice Line Grid */}
                  <div className="bg-[#0b0f19] rounded-lg border border-white/10 overflow-hidden">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-[#152038] text-slate-300 font-bold border-b border-white/10 text-[10px] uppercase">
                        <tr>
                          <th className="px-3 py-2">Item Description</th>
                          <th className="px-3 py-2">Qty</th>
                          <th className="px-3 py-2">Unit Price</th>
                          <th className="px-3 py-2">Account</th>
                          <th className="px-3 py-2">Tax Rate</th>
                          <th className="px-3 py-2 text-right">Amount GBP</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                        <tr>
                          <td className="px-3 py-2 text-white">Financial Systems Advisory & Implementation</td>
                          <td className="px-3 py-2 text-slate-300">1</td>
                          <td className="px-3 py-2 text-white">£2,500.00</td>
                          <td className="px-3 py-2 text-emerald-400 font-bold">200 - Sales</td>
                          <td className="px-3 py-2 text-slate-300">20% (VAT on Income)</td>
                          <td className="px-3 py-2 text-right font-bold text-white">£2,500.00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Totals Summary */}
                  <div className="flex justify-end pt-2">
                    <div className="w-64 space-y-1.5 text-right font-mono text-xs">
                      <div className="flex justify-between text-slate-400">
                        <span>Subtotal:</span>
                        <span className="text-white font-bold">£2,500.00</span>
                      </div>
                      <div className="flex justify-between text-slate-400">
                        <span>Total VAT (20%):</span>
                        <span className="text-emerald-400 font-bold">£500.00</span>
                      </div>
                      <div className="flex justify-between text-base font-extrabold text-white pt-1 border-t border-white/10">
                        <span>Total Due:</span>
                        <span className="text-emerald-300">£3,000.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. CHART OF ACCOUNTS SCREEN UI */}
            {currentScreen.id === 'screen-chart-of-accounts' && (
              <div className="bg-[#121a2f] rounded-xl border border-white/10 overflow-hidden font-sans text-xs">
                <div className="p-3 bg-[#152038] font-bold text-white text-xs flex justify-between items-center">
                  <span>Chart of Accounts Directory</span>
                  <span className="text-[10px] text-emerald-400 font-mono">Standard UK SME Template</span>
                </div>
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#0b0f19] text-slate-400 font-semibold border-b border-white/10 text-[10px] uppercase">
                    <tr>
                      <th className="px-4 py-2.5">Code</th>
                      <th className="px-4 py-2.5">Account Name</th>
                      <th className="px-4 py-2.5">Type</th>
                      <th className="px-4 py-2.5">Default Tax</th>
                      <th className="px-4 py-2.5 text-right">YTD Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono text-[11px]">
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2 text-emerald-400 font-bold">090</td>
                      <td className="px-4 py-2 text-white font-sans font-bold">Business Current Account</td>
                      <td className="px-4 py-2 text-slate-300">Bank / Asset</td>
                      <td className="px-4 py-2 text-slate-500">Exempt (0%)</td>
                      <td className="px-4 py-2 text-right text-emerald-300 font-bold">£48,250.00</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2 text-emerald-400 font-bold">200</td>
                      <td className="px-4 py-2 text-white font-sans font-bold">Sales Revenue</td>
                      <td className="px-4 py-2 text-slate-300">Operating Revenue</td>
                      <td className="px-4 py-2 text-emerald-400 font-bold">20% (VAT on Income)</td>
                      <td className="px-4 py-2 text-right text-emerald-300 font-bold">£124,500.00</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2 text-emerald-400 font-bold">400</td>
                      <td className="px-4 py-2 text-white font-sans font-bold">Advertising & Promotion</td>
                      <td className="px-4 py-2 text-slate-300">Operating Expense</td>
                      <td className="px-4 py-2 text-slate-300">20% (VAT on Expenses)</td>
                      <td className="px-4 py-2 text-right text-slate-200">£14,200.00</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2 text-emerald-400 font-bold">820</td>
                      <td className="px-4 py-2 text-white font-sans font-bold">VAT Control Account</td>
                      <td className="px-4 py-2 text-slate-300">Current Liability</td>
                      <td className="px-4 py-2 text-slate-500">N/A</td>
                      <td className="px-4 py-2 text-right text-rose-400 font-bold">£3,580.00</td>
                    </tr>
                    <tr className="hover:bg-white/5">
                      <td className="px-4 py-2 text-emerald-400 font-bold">900</td>
                      <td className="px-4 py-2 text-white font-sans font-bold">Owner Equity / Retained Earnings</td>
                      <td className="px-4 py-2 text-slate-300">Equity</td>
                      <td className="px-4 py-2 text-slate-500">N/A</td>
                      <td className="px-4 py-2 text-right text-slate-200">£56,870.00</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {/* 5. VAT RETURN SCREEN UI */}
            {currentScreen.id === 'screen-vat-return' && (
              <div className="bg-[#121a2f] p-5 rounded-xl border border-white/10 space-y-4 font-sans text-xs">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h4 className="font-bold text-white text-sm">HMRC VAT 100 Return (MTD Compliant)</h4>
                    <p className="text-[11px] text-slate-400">Quarter ended 31 March 2026</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded font-mono font-bold text-xs">
                    Ready for Electronic Filing
                  </span>
                </div>

                <div className="space-y-2 font-mono">
                  <div className="p-3 bg-[#0b0f19] rounded-lg border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-emerald-400 font-bold block">Box 1</span>
                      <span className="text-xs text-slate-300 font-sans">VAT due in the period on sales and other outputs</span>
                    </div>
                    <span className="text-sm font-bold text-white">£5,420.00</span>
                  </div>

                  <div className="p-3 bg-[#0b0f19] rounded-lg border border-white/10 flex justify-between items-center">
                    <div>
                      <span className="text-emerald-400 font-bold block">Box 4</span>
                      <span className="text-xs text-slate-300 font-sans">VAT reclaimed in the period on purchases and other inputs</span>
                    </div>
                    <span className="text-sm font-bold text-white">£1,840.00</span>
                  </div>

                  <div className="p-3 bg-emerald-950/60 rounded-lg border border-emerald-500/40 flex justify-between items-center">
                    <div>
                      <span className="text-emerald-300 font-bold block text-sm">Box 5 (Net VAT to pay to HMRC)</span>
                      <span className="text-xs text-slate-300 font-sans">Net settlement calculated as Box 3 minus Box 4</span>
                    </div>
                    <span className="text-lg font-extrabold text-emerald-300">£3,580.00</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <div className="p-2.5 bg-[#0b0f19] rounded-lg border border-white/10 flex justify-between">
                      <span className="text-[11px] text-slate-400 font-sans">Box 6 (Total Net Sales ex VAT)</span>
                      <span className="text-xs font-bold text-white">£27,100.00</span>
                    </div>
                    <div className="p-2.5 bg-[#0b0f19] rounded-lg border border-white/10 flex justify-between">
                      <span className="text-[11px] text-slate-400 font-sans">Box 7 (Total Net Purchases ex VAT)</span>
                      <span className="text-xs font-bold text-white">£9,200.00</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Hotspot Walkthrough Cards */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Interactive Hotspot Explanations ({currentScreen.hotspots.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentScreen.hotspots.map((h, idx) => (
              <div
                key={idx}
                onClick={() => setActiveHotspotIndex(idx)}
                className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                  activeHotspotIndex === idx
                    ? 'bg-emerald-500/15 border-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.15)]'
                    : 'bg-[#12182b] hover:bg-[#162038] border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="px-2 py-0.5 bg-[#0b0f19] text-emerald-300 text-[10px] font-mono font-bold rounded border border-white/10">
                    {h.tag}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{h.position}</span>
                </div>
                <h4 className="text-xs font-bold text-white">{h.title}</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
