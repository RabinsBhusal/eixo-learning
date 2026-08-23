import React, { useState } from 'react';
import { Scale, CheckCircle2, AlertCircle, RefreshCw, ArrowRight, BookOpen, Layers, Sparkles } from 'lucide-react';

interface AccountOption {
  code: string;
  name: string;
  type: 'Asset' | 'Liability' | 'Equity' | 'Revenue' | 'Expense';
  normalBalance: 'Debit' | 'Credit';
}

const ACCOUNTS: AccountOption[] = [
  { code: '100', name: 'Bank Current Account', type: 'Asset', normalBalance: 'Debit' },
  { code: '110', name: 'Accounts Receivable (Trade Debtors)', type: 'Asset', normalBalance: 'Debit' },
  { code: '120', name: 'Office Equipment & Laptops', type: 'Asset', normalBalance: 'Debit' },
  { code: '130', name: 'Inventory / Stock', type: 'Asset', normalBalance: 'Debit' },
  { code: '200', name: 'Accounts Payable (Trade Creditors)', type: 'Liability', normalBalance: 'Credit' },
  { code: '210', name: 'Bank Loan (Long-Term)', type: 'Liability', normalBalance: 'Credit' },
  { code: '220', name: 'VAT Payable (HMRC)', type: 'Liability', normalBalance: 'Credit' },
  { code: '300', name: "Owner's Capital", type: 'Equity', normalBalance: 'Credit' },
  { code: '310', name: "Owner's Drawings", type: 'Equity', normalBalance: 'Debit' },
  { code: '400', name: 'Sales Revenue', type: 'Revenue', normalBalance: 'Credit' },
  { code: '500', name: 'Rent & Rates Expense', type: 'Expense', normalBalance: 'Debit' },
  { code: '510', name: 'Salaries & Wages Expense', type: 'Expense', normalBalance: 'Debit' },
  { code: '520', name: 'Advertising & Marketing', type: 'Expense', normalBalance: 'Debit' },
];

const PRESET_SCENARIOS = [
  {
    title: '1. Buying Equipment on Credit',
    description: 'Purchased £1,500 of new computer workstations from Apex Supplies on 30-day payment terms.',
    correctDebit: '120',
    correctCredit: '200',
    amount: 1500,
    explanation: 'Equipment is an Asset increasing (Debit £1,500). Accounts Payable is a Liability increasing (Credit £1,500).',
  },
  {
    title: '2. Client Pays Invoice via Bank',
    description: 'Client Zenith Consulting pays £2,400 into the company bank account settling their open invoice.',
    correctDebit: '100',
    correctCredit: '110',
    amount: 2400,
    explanation: 'Bank is an Asset increasing (Debit £2,400). Accounts Receivable is an Asset decreasing (Credit £2,400).',
  },
  {
    title: '3. Paying Monthly Office Rent',
    description: 'Paid £850 for monthly office rent directly by electronic bank transfer.',
    correctDebit: '500',
    correctCredit: '100',
    amount: 850,
    explanation: 'Rent is an Expense increasing (Debit £850). Bank is an Asset decreasing (Credit £850).',
  },
  {
    title: '4. Owner Invests Initial Capital',
    description: 'Owner deposits £10,000 personal funds into the business bank account to fund launch.',
    correctDebit: '100',
    correctCredit: '300',
    amount: 10000,
    explanation: 'Bank is an Asset increasing (Debit £10,000). Owner Capital is Equity increasing (Credit £10,000).',
  },
];

export const DoubleEntrySandbox: React.FC = () => {
  const [selectedScenarioIdx, setSelectedScenarioIdx] = useState<number>(0);
  const scenario = PRESET_SCENARIOS[selectedScenarioIdx];

  const [debitAccountCode, setDebitAccountCode] = useState<string>(scenario.correctDebit);
  const [creditAccountCode, setCreditAccountCode] = useState<string>(scenario.correctCredit);
  const [amount, setAmount] = useState<number>(scenario.amount);
  const [feedback, setFeedback] = useState<{ status: 'idle' | 'success' | 'error'; message: string }>({
    status: 'idle',
    message: '',
  });

  const handleScenarioChange = (idx: number) => {
    setSelectedScenarioIdx(idx);
    const sc = PRESET_SCENARIOS[idx];
    setDebitAccountCode(sc.correctDebit);
    setCreditAccountCode(sc.correctCredit);
    setAmount(sc.amount);
    setFeedback({ status: 'idle', message: '' });
  };

  const handleValidate = () => {
    if (debitAccountCode === creditAccountCode) {
      setFeedback({
        status: 'error',
        message: 'Debit and Credit accounts must be distinct nominal accounts.',
      });
      return;
    }

    if (debitAccountCode === scenario.correctDebit && creditAccountCode === scenario.correctCredit) {
      setFeedback({
        status: 'success',
        message: `Correct! ${scenario.explanation}`,
      });
    } else {
      const chosenDebit = ACCOUNTS.find((a) => a.code === debitAccountCode)?.name;
      const chosenCredit = ACCOUNTS.find((a) => a.code === creditAccountCode)?.name;
      setFeedback({
        status: 'error',
        message: `Not quite. You selected [Debit: ${chosenDebit}] and [Credit: ${chosenCredit}]. Review DEAD CLIC: ${scenario.explanation}`,
      });
    }
  };

  const debitAcc = ACCOUNTS.find((a) => a.code === debitAccountCode);
  const creditAcc = ACCOUNTS.find((a) => a.code === creditAccountCode);

  return (
    <div className="bg-[#0b0f19] rounded-xl border border-white/10 overflow-hidden shadow-xl text-slate-200">
      {/* Header */}
      <div className="bg-[#070a12] px-6 py-4 text-white flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-[0_0_10px_rgba(16,185,129,0.2)]">
            <Scale className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white">Interactive Accounting Sandbox</h3>
            <p className="text-xs text-slate-400">Practise real double-entry journal posting & equation balancing</p>
          </div>
        </div>
        <span className="hidden sm:inline-block px-2.5 py-1 bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 rounded-full text-[11px] font-semibold shadow-[0_0_10px_rgba(16,185,129,0.15)]">
          EIXO Practice Engine
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Preset Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            Select Practice Scenario
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
            {PRESET_SCENARIOS.map((sc, i) => (
              <button
                key={sc.title}
                onClick={() => handleScenarioChange(i)}
                className={`p-3 text-left rounded-lg border text-xs font-medium transition-all ${
                  selectedScenarioIdx === i
                    ? 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.2)] ring-1 ring-emerald-500/50'
                    : 'border-white/10 bg-[#0e1424] hover:bg-[#141d33] text-slate-300'
                }`}
              >
                {sc.title}
              </button>
            ))}
          </div>
        </div>

        {/* Scenario Card */}
        <div className="p-4 bg-[#0e1628] rounded-xl border border-emerald-500/20">
          <div className="flex items-start gap-3">
            <BookOpen className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <div className="text-xs font-semibold text-emerald-400 uppercase tracking-wide">Business Event</div>
              <p className="text-sm font-medium text-white mt-0.5">{scenario.description}</p>
            </div>
          </div>
        </div>

        {/* Journal Entry Form */}
        <div className="border border-white/10 rounded-xl overflow-hidden bg-[#070a12]">
          <div className="bg-[#0e1424] px-4 py-2.5 text-xs font-bold text-slate-300 grid grid-cols-12 gap-2 border-b border-white/10">
            <span className="col-span-2">Leg</span>
            <span className="col-span-6">Nominal Account</span>
            <span className="col-span-2 text-right">Debit (£)</span>
            <span className="col-span-2 text-right">Credit (£)</span>
          </div>

          <div className="p-4 space-y-3 bg-[#0a0e1a]">
            {/* Debit Row */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <span className="col-span-2 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                DEBIT
              </span>
              <div className="col-span-6">
                <select
                  value={debitAccountCode}
                  onChange={(e) => {
                    setDebitAccountCode(e.target.value);
                    setFeedback({ status: 'idle', message: '' });
                  }}
                  className="w-full text-xs font-medium bg-[#12182b] border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/50 focus:outline-none"
                >
                  {ACCOUNTS.map((acc) => (
                    <option key={acc.code} value={acc.code} className="bg-[#0b0f19] text-white">
                      [{acc.code}] {acc.name} ({acc.type})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full text-xs font-mono font-semibold text-right bg-[#12182b] border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-emerald-500/40"
                />
              </div>
              <div className="col-span-2 text-right text-xs text-slate-500 font-mono py-2 pr-2">—</div>
            </div>

            {/* Credit Row */}
            <div className="grid grid-cols-12 gap-2 items-center">
              <span className="col-span-2 text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                CREDIT
              </span>
              <div className="col-span-6">
                <select
                  value={creditAccountCode}
                  onChange={(e) => {
                    setCreditAccountCode(e.target.value);
                    setFeedback({ status: 'idle', message: '' });
                  }}
                  className="w-full text-xs font-medium bg-[#12182b] border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-cyan-500/40 focus:border-cyan-500/50 focus:outline-none"
                >
                  {ACCOUNTS.map((acc) => (
                    <option key={acc.code} value={acc.code} className="bg-[#0b0f19] text-white">
                      [{acc.code}] {acc.name} ({acc.type})
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-span-2 text-right text-xs text-slate-500 font-mono py-2 pr-2">—</div>
              <div className="col-span-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full text-xs font-mono font-semibold text-right bg-[#12182b] border border-white/10 rounded-lg p-2 text-white focus:ring-2 focus:ring-cyan-500/40"
                />
              </div>
            </div>
          </div>

          {/* Totals Check */}
          <div className="bg-[#0e1424] px-4 py-2.5 text-xs font-bold text-slate-200 grid grid-cols-12 gap-2 border-t border-white/10">
            <span className="col-span-8">Totals Equilibrium:</span>
            <span className="col-span-2 text-right font-mono text-emerald-400">£{amount.toLocaleString()}</span>
            <span className="col-span-2 text-right font-mono text-cyan-400">£{amount.toLocaleString()}</span>
          </div>
        </div>

        {/* Visual T-Accounts Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="border border-emerald-500/30 bg-emerald-950/20 rounded-xl p-4 shadow-[0_0_15px_rgba(16,185,129,0.08)]">
            <div className="text-center font-bold text-xs text-emerald-300 pb-2 border-b-2 border-emerald-500/60">
              T-Account: {debitAcc?.name} ({debitAcc?.type})
            </div>
            <div className="grid grid-cols-2 pt-2 text-xs font-mono">
              <div className="border-r border-emerald-500/30 pr-2 text-emerald-400 font-bold">
                Debit: +£{amount.toLocaleString()}
              </div>
              <div className="pl-2 text-slate-600 text-right">—</div>
            </div>
          </div>

          <div className="border border-cyan-500/30 bg-cyan-950/20 rounded-xl p-4 shadow-[0_0_15px_rgba(6,182,212,0.08)]">
            <div className="text-center font-bold text-xs text-cyan-300 pb-2 border-b-2 border-cyan-500/60">
              T-Account: {creditAcc?.name} ({creditAcc?.type})
            </div>
            <div className="grid grid-cols-2 pt-2 text-xs font-mono">
              <div className="border-r border-cyan-500/30 pr-2 text-slate-600">—</div>
              <div className="pl-2 text-cyan-400 font-bold text-right">
                Credit: +£{amount.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Feedback message */}
        {feedback.status !== 'idle' && (
          <div
            className={`p-4 rounded-xl text-xs flex items-start gap-2.5 ${
              feedback.status === 'success'
                ? 'bg-emerald-950/40 text-emerald-200 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)]'
                : 'bg-rose-950/40 text-rose-200 border border-rose-500/30 shadow-[0_0_15px_rgba(244,63,94,0.15)]'
            }`}
          >
            {feedback.status === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            )}
            <div>
              <p className="font-semibold text-sm text-white">
                {feedback.status === 'success' ? 'Journal Validated & Balanced' : 'Review Required'}
              </p>
              <p className="mt-0.5 leading-relaxed text-slate-300">{feedback.message}</p>
            </div>
          </div>
        )}

        {/* Action Button */}
        <div className="flex justify-end gap-3">
          <button
            onClick={handleValidate}
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <span>Post & Verify Journal Entry</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
