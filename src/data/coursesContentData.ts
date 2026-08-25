import { Module, Lesson, Resource, Quiz } from '../types';

// ==========================================
// MODULES FOR ALL COURSES
// ==========================================

export const ADDITIONAL_MODULES: Module[] = [
  // --- Course 4: Practical Bookkeeping with QuickBooks Online (course-quickbooks-1) ---
  {
    id: 'mod-qbo-1',
    courseId: 'course-quickbooks-1',
    title: 'Module 1 — QuickBooks Online Ecosystem & Company Preferences',
    description: 'Setting up QuickBooks Online, navigational dashboard, chart of accounts customization, and sales tax/VAT settings.',
    order: 1,
    duration: '1h 10m',
  },
  {
    id: 'mod-qbo-2',
    courseId: 'course-quickbooks-1',
    title: 'Module 2 — Customers, Invoicing & Accounts Receivable',
    description: 'Managing customer directory, creating estimates, sending invoices, processing payments, and aged debtor reports.',
    order: 2,
    duration: '1h 25m',
  },
  {
    id: 'mod-qbo-3',
    courseId: 'course-quickbooks-1',
    title: 'Module 3 — Suppliers, Bills, Expenses & Accounts Payable',
    description: 'Recording vendor bills, supplier credits, payment runs, and 1099/subcontractor tracking.',
    order: 3,
    duration: '1h 15m',
  },
  {
    id: 'mod-qbo-4',
    courseId: 'course-quickbooks-1',
    title: 'Module 4 — Bank Feeds Automation & Reconciliation Engine',
    description: 'Linking online bank feeds, creating automated bank rules, multi-split transactions, and monthly reconciliations.',
    order: 4,
    duration: '1h 30m',
  },
  {
    id: 'mod-qbo-5',
    courseId: 'course-quickbooks-1',
    title: 'Module 5 — UK Making Tax Digital (MTD) VAT & Financial Statements',
    description: 'Filing MTD VAT returns, audit reports, profit and loss by class/location, and balance sheet preparation.',
    order: 5,
    duration: '1h 10m',
  },

  // --- Course 5: Management Accounting: Costing, Budgeting & Variance (course-mgmt-acc-1) ---
  {
    id: 'mod-mgmt-1',
    courseId: 'course-mgmt-acc-1',
    title: 'Module 1 — Cost Classification & Cost Behavior Analysis',
    description: 'Fixed vs. variable costs, direct vs. indirect costs, step-fixed costs, and high-low method.',
    order: 1,
    duration: '1h 20m',
  },
  {
    id: 'mod-mgmt-2',
    courseId: 'course-mgmt-acc-1',
    title: 'Module 2 — Cost-Volume-Profit (CVP) & Break-Even Analysis',
    description: 'Contribution margin ratio, break-even point, target profit planning, and margin of safety.',
    order: 2,
    duration: '1h 35m',
  },
  {
    id: 'mod-mgmt-3',
    courseId: 'course-mgmt-acc-1',
    title: 'Module 3 — Marginal Costing vs Absorption Costing & ABC',
    description: 'Under/over-absorption of overheads, inventory valuation impact, and Activity-Based Costing (ABC) drivers.',
    order: 3,
    duration: '2h 00m',
  },
  {
    id: 'mod-mgmt-4',
    courseId: 'course-mgmt-acc-1',
    title: 'Module 4 — Master Budgeting & Cash Flow Forecasting',
    description: 'Operating budgets, production schedules, raw materials procurement budgets, and cash forecasts.',
    order: 4,
    duration: '1h 45m',
  },
  {
    id: 'mod-mgmt-5',
    courseId: 'course-mgmt-acc-1',
    title: 'Module 5 — Standard Costing & Flexible Variance Analysis',
    description: 'Material price/usage, labour rate/efficiency, variable overhead, and sales volume/price variances.',
    order: 5,
    duration: '2h 10m',
  },

  // --- Course 6: Sage Business Cloud Accounting (course-sage-1) ---
  {
    id: 'mod-sage-1',
    courseId: 'course-sage-1',
    title: 'Module 1 — Sage Navigation, Settings & Opening Balances',
    description: 'Navigating Sage Business Cloud, setting financial year dates, chart of accounts codes, and opening trial balances.',
    order: 1,
    duration: '1h 05m',
  },
  {
    id: 'mod-sage-2',
    courseId: 'course-sage-1',
    title: 'Module 2 — Sales & Purchase Ledgers in Sage',
    description: 'Generating customer invoices, credit notes, recording supplier bills, and payment processing.',
    order: 2,
    duration: '1h 20m',
  },
  {
    id: 'mod-sage-3',
    courseId: 'course-sage-1',
    title: 'Module 3 — Nominal Ledger Journals, Bank Rec & MTD VAT',
    description: 'Posting recurring manual journals, bank reconciliation workflows, and HMRC digital VAT submissions.',
    order: 3,
    duration: '1h 35m',
  },

  // --- Course 7: Financial Statement Analysis & Ratio Interpretation (course-ratio-1) ---
  {
    id: 'mod-ratio-1',
    courseId: 'course-ratio-1',
    title: 'Module 1 — Liquidity & Solvency Health Diagnostics',
    description: 'Current, quick, cash ratios, working capital cycles, debt-to-equity, gearing, and interest coverage ratios.',
    order: 1,
    duration: '1h 30m',
  },
  {
    id: 'mod-ratio-2',
    courseId: 'course-ratio-1',
    title: 'Module 2 — Profitability, Margins & The DuPont Framework',
    description: 'Gross/operating/net margins, Return on Capital Employed (ROCE), and 3-step & 5-step DuPont ROE decomposition.',
    order: 2,
    duration: '1h 45m',
  },
  {
    id: 'mod-ratio-3',
    courseId: 'course-ratio-1',
    title: 'Module 3 — Working Capital Cycles & Cash Flow Forensics',
    description: 'Days Sales Outstanding (DSO), Days Inventory Outstanding (DIO), Days Payable Outstanding (DPO), and earnings quality checks.',
    order: 3,
    duration: '2h 00m',
  },

  // --- Course 8: Payroll Accounting & Statutory Compliance (course-payroll-1) ---
  {
    id: 'mod-payroll-1',
    courseId: 'course-payroll-1',
    title: 'Module 1 — UK PAYE & National Insurance Foundations',
    description: 'Understanding tax codes, PAYE bands, employee Class 1 NIC, and employer secondary NIC calculations.',
    order: 1,
    duration: '1h 15m',
  },
  {
    id: 'mod-payroll-2',
    courseId: 'course-payroll-1',
    title: 'Module 2 — Workplace Pensions & Statutory Payments (SSP/SMP)',
    description: 'Qualifying earnings, auto-enrolment employer/employee contributions, Statutory Sick Pay, and Maternity Pay.',
    order: 2,
    duration: '1h 20m',
  },
  {
    id: 'mod-payroll-3',
    courseId: 'course-payroll-1',
    title: 'Module 3 — General Ledger Payroll Journals & Control Accounts',
    description: 'Drafting the gross-to-net payroll journal, liability clearing, and month-end HMRC/Pension reconciliations.',
    order: 3,
    duration: '1h 30m',
  },
];

// ==========================================
// LESSONS FOR COURSES 2 TO 8
// ==========================================

export const ADDITIONAL_LESSONS: Lesson[] = [
  // ----------------------------------------------------
  // Course 2: Financial Accounting & Double Entry Mastery
  // ----------------------------------------------------
  {
    id: 'les-fin-1-2',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-1',
    title: '2. The Fundamental Accounting Equation in Depth',
    description: 'Detailed analysis of Assets = Liabilities + Equity with transaction impact matrices.',
    vimeoId: '90509568',
    duration: '18:40',
    order: 2,
    published: true,
    notesMarkdown: `### The Accounting Equation Mechanics

Every transaction affects at least two accounts to keep the equation balanced:
$$\\text{Assets} = \\text{Liabilities} + \\text{Owner's Equity}$$

#### Expanded Accounting Equation:
$$\\text{Assets} = \\text{Liabilities} + \\text{Capital} + \\text{Revenues} - \\text{Expenses} - \\text{Drawings}$$

* **Revenues** increase Net Profit, which increases Retained Earnings and Equity.
* **Expenses** decrease Net Profit, which reduces Equity.
* **Drawings/Dividends** directly distribute equity back to owners.
`,
    doubleEntryExample: {
      description: 'Owner injects £15,000 cash capital and transfers personal laptop valued at £1,200 into business.',
      date: '02/01/2026',
      debitAccount: 'Cash (£15,000) & IT Equipment (£1,200)',
      debitAmount: 16200,
      creditAccount: "Owner's Capital (Equity)",
      creditAmount: 16200,
      explanation: 'Assets increase by £16,200 in total, balanced by a £16,200 credit increase in Owner\'s Capital.',
    },
    quizId: 'quiz-fin-eq-1',
    resourceIds: ['res-accounting-equation-sheet'],
  },
  {
    id: 'les-fin-2-2',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-2',
    title: '3. Ledger T-Accounts & General Ledger Posting',
    description: 'How individual journal entries translate into structured general ledger T-accounts.',
    vimeoId: '375468729',
    duration: '20:15',
    order: 3,
    published: true,
    notesMarkdown: `### Posting to Ledger Accounts (T-Accounts)

A Ledger Account visually resembles the letter **T**:
* **Left Side**: DEBIT entries
* **Right Side**: CREDIT entries

#### Calculating the Balance Carried Down ($c/d$):
1. Sum both Debit and Credit columns.
2. Determine which side is larger.
3. Insert the difference on the smaller side as **Balance $c/d$** to equalize the totals.
4. Bring the balance forward to the next accounting period on the opposite side as **Balance $b/d$**.
`,
    doubleEntryExample: {
      description: 'Paid £450 utility bill by debit card from company bank account.',
      date: '05/01/2026',
      debitAccount: 'Utilities Expense',
      debitAmount: 450,
      creditAccount: 'Bank Account',
      creditAmount: 450,
      explanation: 'Expenses increase (Debit £450) and liquid Bank Asset decreases (Credit £450).',
    },
  },
  {
    id: 'les-fin-3-1',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-3',
    title: '4. Books of Prime Entry & The Unadjusted Trial Balance',
    description: 'From daybooks to nominal ledgers, extracting and verifying the mathematical equality of debits and credits.',
    vimeoId: '226053498',
    duration: '24:10',
    order: 4,
    published: true,
    notesMarkdown: `### The Role of the Trial Balance

The Trial Balance lists all nominal ledger account balances at a specific reporting date.

#### Errors That DO NOT Affect the Trial Balance:
1. **Error of Omission**: A complete transaction was entirely forgotten.
2. **Error of Commission**: Correct amount posted to the correct side, but in the wrong personal ledger account (e.g. Debited A. Smith instead of B. Smith).
3. **Error of Principle**: Posted to incorrect class of account (e.g. Debited Repairs Expense instead of Machinery Asset).
4. **Compensating Errors**: Two distinct errors coincidentally cancel each other out.
5. **Error of Original Entry**: Incorrect amount entered in source journal (e.g. £45 instead of £54) and posted to both accounts.
6. **Complete Reversal of Entries**: Correct accounts and amounts, but debited what should be credited and vice versa.
`,
    quizId: 'quiz-trial-balance-errors',
    resourceIds: ['res-dead-clic-poster'],
  },
  {
    id: 'les-fin-4-1',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-4',
    title: '5. Accruals, Prepayments & The Matching Principle',
    description: 'Adjusting accounts at period end to ensure revenue and expenses are recognized in the period they occur.',
    vimeoId: '76979871',
    duration: '25:30',
    order: 5,
    published: true,
    notesMarkdown: `### Accruals vs Prepayments

Under the **Accruals Concept (Matching Principle)**, expenses are recognized when incurred, not when paid.

#### 1. Accrued Expenses (Expense incurred, not yet paid/invoiced):
* **DEBIT**: Relevant Expense Account (e.g. Electricity Expense)
* **CREDIT**: Accruals Liability (Current Liability on Balance Sheet)

#### 2. Prepaid Expenses (Paid in advance for future periods):
* **DEBIT**: Prepayments (Current Asset on Balance Sheet)
* **CREDIT**: Relevant Expense Account (Reduces current period expense)
`,
    doubleEntryExample: {
      description: 'Paid £1,200 annual commercial insurance policy covering 01 March 2026 to 28 February 2027.',
      date: '01/03/2026',
      debitAccount: 'Prepaid Insurance (Current Asset)',
      debitAmount: 1200,
      creditAccount: 'Bank Current Account',
      creditAmount: 1200,
      explanation: 'Insurance benefit spans 12 months ahead, so it is capitalized as a Prepaid Asset rather than expensed immediately.',
    },
    quizId: 'quiz-accruals-prepayments',
  },
  {
    id: 'les-fin-5-1',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-5',
    title: '6. Non-Current Assets & Depreciation Accounting',
    description: 'Straight-line method, reducing balance method, accumulated depreciation, and asset disposals.',
    vimeoId: '90509568',
    duration: '22:00',
    order: 6,
    published: true,
    notesMarkdown: `### Depreciation Formulas & Methods

Depreciation is the systematic allocation of the depreciable amount of an asset over its estimated useful economic life.

#### 1. Straight-Line Method:
$$\\text{Annual Depreciation} = \\frac{\\text{Cost} - \\text{Residual Value}}{\\text{Useful Life in Years}}$$

#### 2. Reducing Balance Method:
$$\\text{Annual Depreciation} = \\text{Carrying Amount (Net Book Value)} \\times \\text{Depreciation Rate \\%}$$

#### Depreciation Journal Entry:
* **DEBIT**: Depreciation Expense (Income Statement)
* **CREDIT**: Accumulated Depreciation (Contra-Asset on Balance Sheet)
`,
    doubleEntryExample: {
      description: 'Annual straight-line depreciation charge of £2,500 on company delivery van.',
      date: '31/12/2026',
      debitAccount: 'Depreciation Expense (Income Statement)',
      debitAmount: 2500,
      creditAccount: 'Accumulated Depreciation - Motor Vehicles',
      creditAmount: 2500,
      explanation: 'Recognizes £2,500 wear-and-tear expense while writing down carrying value on the Balance Sheet via contra-asset.',
    },
  },
  {
    id: 'les-fin-6-1',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-6',
    title: '7. Final Accounts: Statement of Profit or Loss & Balance Sheet',
    description: 'Assembling complete, fully balanced, published-ready financial statements from an adjusted trial balance.',
    vimeoId: '115783408',
    duration: '28:45',
    order: 7,
    published: true,
    notesMarkdown: `### Structure of the Final Accounts

#### Statement of Profit or Loss (Income Statement):
* **Revenue (Turnover)**
* *Less: Cost of Sales*
* **= Gross Profit**
* *Less: Administrative & Operating Expenses*
* **= Operating Profit (EBIT)**
* *Less: Finance Costs (Interest)*
* **= Profit Before Tax**
* *Less: Taxation*
* **= Net Profit for the Year**

#### Statement of Financial Position (Balance Sheet):
* **Non-Current Assets**: Property, Plant, Equipment (Cost less Acc. Depr.)
* **Current Assets**: Inventory, Trade Receivables, Prepayments, Bank & Cash
* **Current Liabilities**: Trade Payables, Accruals, Tax Payable, Short-Term Loans
* **Net Current Assets (Working Capital)**
* **Non-Current Liabilities**: Long-term loans, Mortgages
* **NET ASSETS** = **TOTAL EQUITY** (Share Capital + Retained Earnings)
`,
    resourceIds: ['res-month-end-working-papers'],
  },

  // ----------------------------------------------------
  // Course 3: Corporate Finance & Financial Modelling
  // ----------------------------------------------------
  {
    id: 'les-corp-1-1',
    courseId: 'course-corp-fin-1',
    moduleId: 'mod-corp-1',
    title: '1. Time Value of Money, NPV & IRR in Excel',
    description: 'Master Net Present Value, Internal Rate of Return, hurdle rates, and investment decision criteria.',
    vimeoId: '76979871',
    duration: '22:15',
    order: 1,
    published: true,
    notesMarkdown: `### Capital Budgeting & TVM Formulas

$$\\text{PV} = \\frac{\\text{FV}}{(1 + r)^t}$$
$$\\text{NPV} = \\sum_{t=1}^n \\frac{\\text{CF}_t}{(1 + r)^t} - \\text{Initial Outlay}$$

#### Investment Decision Rules:
* **NPV Rule**: Accept investment if $\\text{NPV} > 0$. Reject if $\\text{NPV} < 0$.
* **IRR Rule**: Accept investment if $\\text{IRR} > \\text{Cost of Capital (Hurdle Rate)}$.
`,
    resourceIds: ['res-dcf-model'],
  },
  {
    id: 'les-corp-2-1',
    courseId: 'course-corp-fin-1',
    moduleId: 'mod-corp-2',
    title: '2. Estimating WACC & The Capital Asset Pricing Model (CAPM)',
    description: 'Calculate Cost of Equity using CAPM, after-tax cost of debt, target capital weights, and blended WACC.',
    vimeoId: '90509568',
    duration: '26:00',
    order: 2,
    published: true,
    notesMarkdown: `### WACC & CAPM Mathematical Framework

$$\\text{WACC} = \\left( \\frac{E}{V} \\times K_e \\right) + \\left( \\frac{D}{V} \\times K_d \\times (1 - t) \\right)$$

#### Capital Asset Pricing Model (CAPM):
$$K_e = R_f + \\beta \\times (R_m - R_f)$$

* $R_f$: Risk-Free Rate (e.g. 10-Year UK Gilt or US Treasury yield)
* $\\beta$: Systematic Risk coefficient (sensitivity to broader equity market)
* $(R_m - R_f)$: Equity Risk Premium (ERP)
`,
    quizId: 'quiz-wacc-capm',
  },
  {
    id: 'les-corp-3-1',
    courseId: 'course-corp-fin-1',
    moduleId: 'mod-corp-3',
    title: '3. Building an Integrated 3-Statement Model in Excel',
    description: 'Dynamic forecast mechanics: linking Income Statement, Balance Sheet, and Cash Flow Statement seamlessly.',
    vimeoId: '375468729',
    duration: '34:20',
    order: 3,
    published: true,
    notesMarkdown: `### 3-Statement Integration Architecture

1. **Income Statement**: Net Income feeds into Cash Flow Statement (top line of Operating Cash Flows) and Balance Sheet (Retained Earnings).
2. **Cash Flow Statement**: Net change in cash + opening cash equals the closing cash balance on the Balance Sheet.
3. **Working Capital Schedules**: Accounts Receivable, Inventory, and Accounts Payable drive cash adjustments on the CFS.
4. **Debt & Interest Schedule**: Average debt balance drives interest expense on the Income Statement.
`,
    resourceIds: ['res-dcf-model'],
  },
  {
    id: 'les-corp-4-1',
    courseId: 'course-corp-fin-1',
    moduleId: 'mod-corp-4',
    title: '4. Discounted Cash Flow (DCF) Valuation & Sensitivity Tables',
    description: 'Free Cash Flow to Firm (FCFF), terminal value calculation, and 2-way sensitivity data tables in Excel.',
    vimeoId: '226053498',
    duration: '30:10',
    order: 4,
    published: true,
    notesMarkdown: `### DCF Valuation Methodology

$$\\text{Enterprise Value} = \\sum_{t=1}^n \\frac{\\text{FCFF}_t}{(1 + \\text{WACC})^t} + \\frac{\\text{Terminal Value}}{(1 + \\text{WACC})^n}$$

#### Calculating Unlevered Free Cash Flow (FCFF):
* $\\text{EBIT} \\times (1 - t)$ (NOPAT)
* *+ Depreciation & Amortisation*
* *- Capital Expenditures (CapEx)*
* *- Change in Net Working Capital (\\Delta NWC)*
* **= Free Cash Flow to Firm (FCFF)**
`,
    resourceIds: ['res-dcf-model'],
  },

  // ----------------------------------------------------
  // Course 4: Practical Bookkeeping with QuickBooks Online
  // ----------------------------------------------------
  {
    id: 'les-qbo-1-1',
    courseId: 'course-quickbooks-1',
    moduleId: 'mod-qbo-1',
    title: '1. QuickBooks Online Workspace & Chart of Accounts Setup',
    description: 'Explore the QBO navigation menu, company settings, accounting preferences, and customizing the Chart of Accounts.',
    vimeoId: '76979871',
    duration: '16:15',
    order: 1,
    published: true,
    notesMarkdown: `### QuickBooks Online Interface & COA

QuickBooks Online organizes accounting via the Left Navigation Bar:
* **Dashboard / Bookkeeping**: Real-time snapshot of bank accounts, profit, invoices, and expenses.
* **Sales**: Customers, Invoices, All Sales transactions.
* **Expenses**: Vendors, Bills, Expenses.
* **Accounting**: Chart of Accounts & Reconcile.
`,
    resourceIds: ['res-xero-coa-template'],
  },
  {
    id: 'les-qbo-2-1',
    courseId: 'course-quickbooks-1',
    moduleId: 'mod-qbo-2',
    title: '2. Invoicing, Customer Payments & Receivables in QBO',
    description: 'Create customized professional invoices, apply standard sales tax/VAT rates, and receive payments into undeposited funds.',
    vimeoId: '90509568',
    duration: '19:40',
    order: 2,
    published: true,
    notesMarkdown: `### The QBO Sales Workflow

1. **Estimate / Quote** $\\rightarrow$ Customer accepts.
2. **Convert to Invoice** $\\rightarrow$ Debits Accounts Receivable, Credits Sales Income & VAT.
3. **Receive Payment** $\\rightarrow$ Debits Undeposited Funds / Bank, Credits Accounts Receivable.
4. **Bank Deposit** $\\rightarrow$ Bundles multiple checks/receipts into one bank deposit line to match bank feed.
`,
    doubleEntryExample: {
      description: 'Received customer credit card payment of £1,800 for Invoice #1044.',
      date: '14/02/2026',
      debitAccount: 'Undeposited Funds / Bank Account',
      debitAmount: 1800,
      creditAccount: 'Accounts Receivable (Customer Ledger)',
      creditAmount: 1800,
      explanation: 'Customer debt is settled (Credit A/R) and liquid funds are held for bank clearing (Debit Bank).',
    },
    quizId: 'quiz-qbo-sales',
  },
  {
    id: 'les-qbo-3-1',
    courseId: 'course-quickbooks-1',
    moduleId: 'mod-qbo-3',
    title: '3. Managing Vendor Bills, Expenses & Accounts Payable',
    description: 'Record vendor bills, schedule supplier payments, track business expense receipts, and handle supplier credits.',
    vimeoId: '375468729',
    duration: '17:50',
    order: 3,
    published: true,
    notesMarkdown: `### Bill vs Expense in QuickBooks Online

* **Bill**: Used when you receive an invoice from a supplier that will be paid **later** (accrues into Accounts Payable).
* **Expense / Cheque**: Used when payment is made **immediately** at the point of sale (debits expense, credits bank/credit card directly without touching Accounts Payable).
`,
    doubleEntryExample: {
      description: 'Entered supplier bill from OfficeMax for £600 stationary on 30-day payment terms.',
      date: '16/02/2026',
      debitAccount: 'Office Supplies Expense (£500) & Input VAT (£100)',
      debitAmount: 600,
      creditAccount: 'Accounts Payable / OfficeMax',
      creditAmount: 600,
      explanation: 'Expenses and reclaimable tax increase (Debit £600), supplier liability is recognized (Credit £600).',
    },
  },
  {
    id: 'les-qbo-4-1',
    courseId: 'course-quickbooks-1',
    moduleId: 'mod-qbo-4',
    title: '4. Bank Feeds Automation, Bank Rules & Reconciliations',
    description: 'Harness QBO AI matching, write custom automated bank rules, and perform monthly ledger reconciliations.',
    vimeoId: '226053498',
    duration: '23:30',
    order: 4,
    published: true,
    notesMarkdown: `### Mastering QBO Bank Feed Rules

Bank Rules automatically categorize recurring transactions:
* **Rule Condition**: If description contains "SHELL OIL" or "BP PETROL"
* **Action**: Assign Transaction Type: Expense, Payee: Fuel Vendor, Category: 412 - Vehicle Fuel & Travel, Tax Code: 20% VAT.
* **Auto-add**: Enable with caution only for trusted static transactions.
`,
    resourceIds: ['res-bank-rec-worksheet'],
  },
  {
    id: 'les-qbo-5-1',
    courseId: 'course-quickbooks-1',
    moduleId: 'mod-qbo-5',
    title: '5. Filing MTD VAT Returns & Generating Management Reports',
    description: 'Review the 9-box VAT summary, resolve tax discrepancies, file directly to HMRC, and extract customized P&L and Balance Sheet reports.',
    vimeoId: '115783408',
    duration: '21:10',
    order: 5,
    published: true,
    notesMarkdown: `### QuickBooks Making Tax Digital (MTD) Submission

1. Navigate to **Taxes > VAT**.
2. Select the current quarterly return period.
3. Click **View Summary** to audit Box 1 through 9.
4. Run the **VAT Detail Report** to spot transactions with missing tax codes.
5. Click **Submit to HMRC**.
`,
    resourceIds: ['res-vat-audit-checklist'],
  },

  // ----------------------------------------------------
  // Course 5: Management Accounting
  // ----------------------------------------------------
  {
    id: 'les-mgmt-1-1',
    courseId: 'course-mgmt-acc-1',
    moduleId: 'mod-mgmt-1',
    title: '1. Cost Behavior, Cost Classification & The High-Low Method',
    description: 'Differentiate fixed, variable, and mixed costs. Separate mixed costs into fixed and variable components using the High-Low method.',
    vimeoId: '76979871',
    duration: '19:10',
    order: 1,
    published: true,
    notesMarkdown: `### High-Low Cost Separation Formula

$$\\text{Variable Cost per Unit } (b) = \\frac{\\text{Total Cost at Highest Activity} - \\text{Total Cost at Lowest Activity}}{\\text{Highest Activity Level} - \\text{Lowest Activity Level}}$$

$$\\text{Fixed Cost } (a) = \\text{Total Cost} - (b \\times \\text{Activity Level})$$

$$\\text{Total Cost Formula: } Y = a + bX$$
`,
    quizId: 'quiz-mgmt-costing',
  },
  {
    id: 'les-mgmt-2-1',
    courseId: 'course-mgmt-acc-1',
    moduleId: 'mod-mgmt-2',
    title: '2. Cost-Volume-Profit (CVP) & Break-Even Analysis',
    description: 'Calculate Contribution Margin, Break-Even Point in units and revenue, Margin of Safety, and Target Profit volumes.',
    vimeoId: '90509568',
    duration: '24:45',
    order: 2,
    published: true,
    notesMarkdown: `### Essential CVP Formulas

$$\\text{Contribution per Unit} = \\text{Selling Price} - \\text{Variable Cost per Unit}$$
$$\\text{Contribution Margin Ratio (CMR)} = \\frac{\\text{Contribution per Unit}}{\\text{Selling Price}}$$

$$\\text{Break-Even Point (Units)} = \\frac{\\text{Total Fixed Costs}}{\\text{Contribution per Unit}}$$
$$\\text{Break-Even Point (Revenue)} = \\frac{\\text{Total Fixed Costs}}{\\text{Contribution Margin Ratio}}$$

$$\\text{Margin of Safety (\\%)} = \\frac{\\text{Budgeted Sales} - \\text{Break-Even Sales}}{\\text{Budgeted Sales}} \\times 100\\%$$
`,
    quizId: 'quiz-cvp-breakeven',
  },
  {
    id: 'les-mgmt-3-1',
    courseId: 'course-mgmt-acc-1',
    moduleId: 'mod-mgmt-3',
    title: '3. Marginal Costing vs Absorption Costing & ABC',
    description: 'Compare inventory valuation under marginal vs absorption costing, reconcile profit differences, and implement Activity-Based Costing.',
    vimeoId: '375468729',
    duration: '27:20',
    order: 3,
    published: true,
    notesMarkdown: `### Reconciling Marginal and Absorption Costing Profit

$$\\text{Absorption Profit} - \\text{Marginal Profit} = (\\text{Closing Inventory Units} - \\text{Opening Inventory Units}) \\times \\text{Fixed Overhead Absorption Rate (OAR)}$$

* When **Production > Sales** $\\rightarrow$ Absorption Costing shows **higher** profit because fixed overheads are deferred into closing inventory.
* When **Sales > Production** $\\rightarrow$ Marginal Costing shows **higher** profit because opening inventory fixed overheads are released.
`,
  },
  {
    id: 'les-mgmt-4-1',
    courseId: 'course-mgmt-acc-1',
    moduleId: 'mod-mgmt-4',
    title: '4. Master Budgeting & Cash Flow Forecasting Cycles',
    description: 'Construct integrated sales budgets, production schedules, raw materials procurement, and quarterly rolling cash budgets.',
    vimeoId: '226053498',
    duration: '25:00',
    order: 4,
    published: true,
    notesMarkdown: `### The Master Budget Sequence

1. **Sales Budget** (Forecasted demand is the principal budget factor)
2. **Production Budget**: $\\text{Units to Produce} = \\text{Budgeted Sales} + \\text{Desired Closing Finished Goods} - \\text{Opening Finished Goods}$
3. **Direct Materials Usage & Purchases Budget**
4. **Direct Labour & Factory Overhead Budgets**
5. **Cash Budget** (Inflows from receivables, outflows for suppliers, payroll, tax, CapEx)
6. **Budgeted Income Statement & Balance Sheet**
`,
  },
  {
    id: 'les-mgmt-5-1',
    courseId: 'course-mgmt-acc-1',
    moduleId: 'mod-mgmt-5',
    title: '5. Standard Costing & Flexible Variance Analysis',
    description: 'Calculate Material Price/Usage variances, Labour Rate/Efficiency variances, and construct flexible budget reconciliation reports.',
    vimeoId: '115783408',
    duration: '29:15',
    order: 5,
    published: true,
    notesMarkdown: `### Key Variance Analysis Formulas

#### Direct Material Variances:
* $\\text{Material Price Variance} = (\\text{Standard Price} - \\text{Actual Price}) \\times \\text{Actual Quantity Purchased}$
* $\\text{Material Usage Variance} = (\\text{Standard Quantity for Actual Output} - \\text{Actual Quantity Used}) \\times \\text{Standard Price}$

#### Direct Labour Variances:
* $\\text{Labour Rate Variance} = (\\text{Standard Rate} - \\text{Actual Rate}) \\times \\text{Actual Hours Worked}$
* $\\text{Labour Efficiency Variance} = (\\text{Standard Hours for Actual Output} - \\text{Actual Hours Worked}) \\times \\text{Standard Rate}$
`,
    quizId: 'quiz-variance-analysis',
  },

  // ----------------------------------------------------
  // Course 6: Sage Business Cloud Accounting
  // ----------------------------------------------------
  {
    id: 'les-sage-1-1',
    courseId: 'course-sage-1',
    moduleId: 'mod-sage-1',
    title: '1. Sage Workspace, Nominal Ledgers & Opening Balances',
    description: 'Explore Sage Business Cloud interface, set financial dates, structure nominal ledger codes, and enter opening balance journals.',
    vimeoId: '76979871',
    duration: '18:30',
    order: 1,
    published: true,
    notesMarkdown: `### Sage Nominal Ledger Architecture

Sage uses standard numerical ranges for Nominal Codes:
* **4000 - 4999**: Sales Revenue
* **5000 - 5999**: Direct Cost of Sales
* **6000 - 8999**: Overheads & Administrative Expenses
* **0010 - 0999**: Fixed / Non-Current Assets
* **1000 - 1999**: Current Assets & Bank
* **2000 - 2999**: Current & Long-Term Liabilities
* **3000 - 3999**: Capital & Reserves
`,
    resourceIds: ['res-xero-coa-template'],
  },
  {
    id: 'les-sage-2-1',
    courseId: 'course-sage-1',
    moduleId: 'mod-sage-2',
    title: '2. Customer & Supplier Ledgers Processing in Sage',
    description: 'Post sales invoices, customer receipts, record supplier invoices, manage payment batches, and issue remittance advice.',
    vimeoId: '90509568',
    duration: '21:00',
    order: 2,
    published: true,
    notesMarkdown: `### Sage Invoicing & Payments Processing

* **Sales Invoicing**: Auto-generates VAT audit trails, posts to Debtor Control (Nominal 1100).
* **Purchase Invoicing**: Allocates to Supplier Control (Nominal 2100) and reclaims Input VAT (Nominal 2201).
* **Supplier Payment Batch**: Reconciles multiple supplier allocations in a single payment schedule.
`,
    doubleEntryExample: {
      description: 'Customer settled invoice of £720 via online BACS transfer.',
      date: '20/02/2026',
      debitAccount: 'Sage Bank Account (Nominal 1200)',
      debitAmount: 720,
      creditAccount: 'Trade Debtors Control (Nominal 1100)',
      creditAmount: 720,
      explanation: 'Liquid cash in bank increases (Debit 1200) and debtor sub-ledger balance is cleared (Credit 1100).',
    },
  },
  {
    id: 'les-sage-3-1',
    courseId: 'course-sage-1',
    moduleId: 'mod-sage-3',
    title: '3. Nominal Journals, Sage Bank Reconciliation & MTD VAT',
    description: 'Post recurring journals for prepayments/depreciation, complete bank reconciliations, and file MTD VAT returns in Sage.',
    vimeoId: '375468729',
    duration: '24:15',
    order: 3,
    published: true,
    notesMarkdown: `### Completing Bank Reconciliation in Sage

1. Select **Banking > Reconcile**.
2. Enter Statement End Date and Statement End Balance.
3. Tick matched transaction items until **Difference = £0.00**.
4. Click **Finish**.
`,
    resourceIds: ['res-bank-rec-worksheet'],
  },

  // ----------------------------------------------------
  // Course 7: Financial Statement Analysis & Ratio Interpretation
  // ----------------------------------------------------
  {
    id: 'les-ratio-1-1',
    courseId: 'course-ratio-1',
    moduleId: 'mod-ratio-1',
    title: '1. Liquidity, Working Capital & Solvency Diagnostics',
    description: 'Calculate Current Ratio, Quick Ratio (Acid Test), Cash Ratio, Gearing, Debt-to-Equity, and Interest Coverage.',
    vimeoId: '76979871',
    duration: '23:40',
    order: 1,
    published: true,
    notesMarkdown: `### Liquidity & Solvency Ratios

#### Liquidity Ratios:
$$\\text{Current Ratio} = \\frac{\\text{Current Assets}}{\\text{Current Liabilities}} \\quad (\\text{Benchmark: } 1.5 - 2.0)$$
$$\\text{Quick Ratio (Acid Test)} = \\frac{\\text{Current Assets} - \\text{Inventory}}{\\text{Current Liabilities}} \\quad (\\text{Benchmark: } 1.0)$$

#### Solvency & Debt Ratios:
$$\\text{Gearing Ratio (\\%)} = \\frac{\\text{Long-Term Debt}}{\\text{Total Capital Employed (Debt + Equity)}} \\times 100\\%$$
$$\\text{Interest Cover} = \\frac{\\text{Operating Profit (EBIT)}}{\\text{Finance Costs (Interest Expense)}} \\quad (\\text{Benchmark: } > 3.0x)$$
`,
    quizId: 'quiz-ratio-liquidity',
    resourceIds: ['res-financial-ratios-summary'],
  },
  {
    id: 'les-ratio-2-1',
    courseId: 'course-ratio-1',
    moduleId: 'mod-ratio-2',
    title: '2. Profitability, Operating Efficiency & The DuPont Model',
    description: 'Master Gross/Operating/Net margins, ROCE, Asset Turnover, and decompose Return on Equity (ROE) using DuPont 3-step and 5-step models.',
    vimeoId: '90509568',
    duration: '26:50',
    order: 2,
    published: true,
    notesMarkdown: `### The DuPont Framework for ROE

$$\\text{ROE} = \\frac{\\text{Net Income}}{\\text{Shareholder Equity}}$$

#### 3-Step DuPont Decomposition:
$$\\text{ROE} = \\underbrace{\\frac{\\text{Net Income}}{\\text{Revenue}}}_{\\text{Net Profit Margin}} \\times \\underbrace{\\frac{\\text{Revenue}}{\\text{Total Assets}}}_{\\text{Asset Turnover}} \\times \\underbrace{\\frac{\\text{Total Assets}}{\\text{Shareholder Equity}}}_{\\text{Equity Multiplier (Financial Leverage)}}$$

* **Net Profit Margin**: Operating efficiency (pricing power & cost control)
* **Asset Turnover**: Asset efficiency (how effectively assets generate sales)
* **Equity Multiplier**: Financial leverage (proportion of debt financing)
`,
    quizId: 'quiz-dupont-model',
    resourceIds: ['res-financial-ratios-summary'],
  },
  {
    id: 'les-ratio-3-1',
    courseId: 'course-ratio-1',
    moduleId: 'mod-ratio-3',
    title: '3. Cash Conversion Cycle & Earnings Quality Forensics',
    description: 'Analyze DSO, DIO, DPO, Cash Conversion Cycle days, Cash Flow Conversion ratio, and identify aggressive accounting red flags.',
    vimeoId: '375468729',
    duration: '28:15',
    order: 3,
    published: true,
    notesMarkdown: `### The Cash Conversion Cycle (CCC)

$$\\text{CCC (Days)} = \\text{Days Sales Outstanding (DSO)} + \\text{Days Inventory Outstanding (DIO)} - \\text{Days Payable Outstanding (DPO)}$$

$$\\text{DSO} = \\frac{\\text{Trade Receivables}}{\\text{Credit Sales}} \\times 365$$
$$\\text{DIO} = \\frac{\\text{Inventory}}{\\text{Cost of Goods Sold}} \\times 365$$
$$\\text{DPO} = \\frac{\\text{Trade Payables}}{\\text{Cost of Goods Sold (or Purchases)}} \\times 365$$

#### Earnings Quality Red Flags:
1. Operating Cash Flow persistently lower than Net Income.
2. DSO increasing significantly faster than revenue growth (channel stuffing).
3. Inventory DIO surging while gross margins decline.
`,
    resourceIds: ['res-financial-ratios-summary'],
  },

  // ----------------------------------------------------
  // Course 8: Payroll Accounting & Statutory Compliance
  // ----------------------------------------------------
  {
    id: 'les-payroll-1-1',
    courseId: 'course-payroll-1',
    moduleId: 'mod-payroll-1',
    title: '1. UK PAYE Income Tax, Tax Codes & National Insurance (NIC)',
    description: 'Calculate gross taxable pay, personal tax allowances, 20%/40%/45% PAYE brackets, and Class 1 Primary/Secondary National Insurance.',
    vimeoId: '76979871',
    duration: '21:30',
    order: 1,
    published: true,
    notesMarkdown: `### Understanding UK Tax Codes & Brackets

* Standard UK Tax Code: **1257L** (£12,570 annual tax-free personal allowance).
* **Basic Rate (20%)**: £12,571 to £50,270.
* **Higher Rate (40%)**: £50,271 to £125,140.
* **Additional Rate (45%)**: Over £125,140.

#### National Insurance (Class 1):
* **Employee (Primary)**: Deducted from employee gross pay (8% on main earnings band).
* **Employer (Secondary)**: Additional cost paid directly by the employer (13.8% above secondary threshold).
`,
    quizId: 'quiz-payroll-taxes',
  },
  {
    id: 'les-payroll-2-1',
    courseId: 'course-payroll-1',
    moduleId: 'mod-payroll-2',
    title: '2. Auto-Enrolment Workplace Pensions & Statutory Pay (SSP/SMP)',
    description: 'Calculate qualifying pension earnings (5% employee / 3% employer minimum), Statutory Sick Pay (SSP), and Statutory Maternity Pay (SMP).',
    vimeoId: '90509568',
    duration: '22:45',
    order: 2,
    published: true,
    notesMarkdown: `### Workplace Pension & Statutory Payments

#### Auto-Enrolment Pension Minimum Contributions:
* **Employee Contribution**: 5% of qualifying earnings (receives 1% tax relief so 4% net).
* **Employer Contribution**: 3% minimum of qualifying earnings.
* **Total Contribution**: 8% minimum into the employee pension scheme.
`,
  },
  {
    id: 'les-payroll-3-1',
    courseId: 'course-payroll-1',
    moduleId: 'mod-payroll-3',
    title: '3. Drafting & Posting the Gross-to-Net Payroll Journal',
    description: 'Step-by-step drafting of the General Ledger Payroll Journal: Gross Wages, Employer NI, Employer Pension, Net Wages Payable, and HMRC Liabilities.',
    vimeoId: '375468729',
    duration: '26:00',
    order: 3,
    published: true,
    notesMarkdown: `### The Gross-to-Net General Ledger Journal Entry

| Account Name | Category | Debit (£) | Credit (£) |
|---|---|---|---|
| **Gross Wages & Salaries** | Expense | £10,000 | — |
| **Employer National Insurance** | Expense | £950 | — |
| **Employer Pension Contribution** | Expense | £300 | — |
| **Net Wages Payable (Clearing)** | Current Liability | — | £7,450 |
| **PAYE & NI Liability (HMRC Control)** | Current Liability | — | £3,300 |
| **Pension Scheme Payable** | Current Liability | — | £500 |
| **TOTALS** | Balanced | **£11,250** | **£11,250** |
`,
    doubleEntryExample: {
      description: 'Monthly payroll run for 5 staff: £10,000 Gross Pay, £950 Employer NI, £300 Employer Pension.',
      date: '28/02/2026',
      debitAccount: 'Gross Wages (£10,000) + Employer NI (£950) + Employer Pension (£300)',
      debitAmount: 11250,
      creditAccount: 'Net Pay (£7,450) + HMRC Liability (£3,300) + Pension Payable (£500)',
      creditAmount: 11250,
      explanation: 'Total staff cost to business is £11,250 (Debit Expenses), matched by obligations to employees, HMRC, and pension provider (Credit Liabilities).',
    },
    quizId: 'quiz-payroll-journal',
  },
];

// ==========================================
// QUIZZES FOR ALL COURSES
// ==========================================

export const ADDITIONAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-fin-eq-1',
    courseId: 'course-fin-acc-1',
    lessonId: 'les-fin-1-2',
    title: 'Financial Accounting Mechanics Check',
    description: 'Assess your intuition on the accounting equation and balance sheet movements.',
    passingScore: 80,
    questions: [
      {
        id: 'q-fe-1',
        question: 'If a company borrows £50,000 from a commercial bank, what is the immediate impact on the accounting equation?',
        options: [
          'Assets increase by £50,000 and Equity increases by £50,000',
          'Assets increase by £50,000 and Liabilities increase by £50,000',
          'Liabilities decrease by £50,000 and Assets increase by £50,000',
          'No change to total assets or liabilities',
        ],
        correctOptionIndex: 1,
        explanation: 'Bank cash asset increases by £50,000 (Debit Cash) and loan liability increases by £50,000 (Credit Bank Loan Payable).',
      },
      {
        id: 'q-fe-2',
        question: 'How do business expenses affect Owner’s Equity?',
        options: [
          'Expenses increase Owner\'s Equity',
          'Expenses directly reduce Net Profit, which decreases Owner\'s Equity (Retained Earnings)',
          'Expenses only affect Liabilities, never Equity',
          'Expenses increase total assets',
        ],
        correctOptionIndex: 1,
        explanation: 'Expenses reduce net income for the period, which reduces the retained earnings portion of owner equity.',
      },
    ],
  },
  {
    id: 'quiz-trial-balance-errors',
    courseId: 'course-fin-acc-1',
    lessonId: 'les-fin-3-1',
    title: 'Trial Balance & Accounting Errors Check',
    description: 'Test your understanding of errors that affect vs do not affect the trial balance.',
    passingScore: 80,
    questions: [
      {
        id: 'q-tbe-1',
        question: 'Which of the following errors WILL cause the Trial Balance total debits and credits to disagree?',
        options: [
          'Posting £200 cash payment as a Debit to Rent Expense £200 and Credit to Bank £20',
          'Completely omitting a supplier invoice of £500',
          'Debiting Computer Equipment £800 instead of Office Repairs £800',
          'Posting a sales invoice to J. Davies ledger instead of M. Davies ledger',
        ],
        correctOptionIndex: 0,
        explanation: 'Posting £200 on debit and £20 on credit creates an unequal debit/credit imbalance of £180, which causes the Trial Balance to fail.',
      },
    ],
  },
  {
    id: 'quiz-accruals-prepayments',
    courseId: 'course-fin-acc-1',
    lessonId: 'les-fin-4-1',
    title: 'Accruals & Prepayments Mastery',
    description: 'Verify your understanding of period-end adjustments under the matching principle.',
    passingScore: 80,
    questions: [
      {
        id: 'q-ap-1',
        question: 'At financial year-end on 31 December, electricity consumed in December estimated at £400 has not yet been invoiced by the utility company. What is the adjusting entry?',
        options: [
          'Debit Electricity Expense £400, Credit Accruals (Current Liability) £400',
          'Debit Prepayments £400, Credit Bank £400',
          'Debit Bank £400, Credit Electricity Expense £400',
          'No entry is allowed until the physical bill arrives',
        ],
        correctOptionIndex: 0,
        explanation: 'Under accrual accounting, the expense incurred in December must be recognized (Debit Expense) with an accrued liability (Credit Accruals).',
      },
    ],
  },
  {
    id: 'quiz-wacc-capm',
    courseId: 'course-corp-fin-1',
    lessonId: 'les-corp-2-1',
    title: 'Cost of Capital & WACC Mastery',
    description: 'Test your knowledge on CAPM cost of equity and interest tax shields.',
    passingScore: 80,
    questions: [
      {
        id: 'q-wacc-1',
        question: 'Why is the Cost of Debt in the WACC formula multiplied by (1 - Tax Rate)?',
        options: [
          'Because banks charge less interest to profitable firms',
          'Because interest payments on debt are tax-deductible, creating an interest tax shield',
          'Because equity holders pay the debt interest',
          'Because corporate taxes only apply to revenue',
        ],
        correctOptionIndex: 1,
        explanation: 'Interest expense reduces taxable income, creating an effective tax shield that lowers the real after-tax cost of debt: Kd * (1 - t).',
      },
    ],
  },
  {
    id: 'quiz-qbo-sales',
    courseId: 'course-quickbooks-1',
    lessonId: 'les-qbo-2-1',
    title: 'QuickBooks Invoicing & Receivables Quiz',
    description: 'Check your understanding of the sales cycle in QuickBooks Online.',
    passingScore: 80,
    questions: [
      {
        id: 'q-qbo-1',
        question: 'What is the purpose of the "Undeposited Funds" clearing account in QuickBooks Online?',
        options: [
          'To hold customer receipts until you deposit them into the bank account, allowing batch matching on bank feeds',
          'To record bad debts that will never be paid',
          'To store sales tax owed to the government',
          'To pay employee salaries in cash',
        ],
        correctOptionIndex: 0,
        explanation: 'Undeposited Funds holds funds from multiple invoices until you group them into a single bank deposit matching the bank statement.',
      },
    ],
  },
  {
    id: 'quiz-cvp-breakeven',
    courseId: 'course-mgmt-acc-1',
    lessonId: 'les-mgmt-2-1',
    title: 'CVP & Break-Even Analysis Quiz',
    description: 'Assess your calculations for contribution margin and break-even points.',
    passingScore: 80,
    questions: [
      {
        id: 'q-cvp-1',
        question: 'A product sells for £50 with variable costs of £20 per unit. Fixed overheads are £30,000 per month. What is the monthly break-even volume in units?',
        options: ['600 units', '1,000 units', '1,500 units', '750 units'],
        correctOptionIndex: 1,
        explanation: 'Contribution per unit = £50 - £20 = £30. Break-Even Units = £30,000 / £30 = 1,000 units.',
      },
    ],
  },
  {
    id: 'quiz-mgmt-costing',
    courseId: 'course-mgmt-acc-1',
    lessonId: 'les-mgmt-1-1',
    title: 'Cost Classification Assessment',
    description: 'Evaluate your ability to identify fixed, variable, and mixed costs.',
    passingScore: 80,
    questions: [
      {
        id: 'q-mc-1',
        question: 'Which of the following is the best example of a Fixed Cost for a manufacturing plant over the short term?',
        options: [
          'Direct raw materials used in production',
          'Factory building rent and property rates',
          'Piece-rate assembly line wages',
          'Sales commissions paid per unit sold',
        ],
        correctOptionIndex: 1,
        explanation: 'Factory rent remains constant regardless of whether the plant produces 10 units or 10,000 units in the short run.',
      },
    ],
  },
  {
    id: 'quiz-variance-analysis',
    courseId: 'course-mgmt-acc-1',
    lessonId: 'les-mgmt-5-1',
    title: 'Standard Costing & Variance Check',
    description: 'Assess price, rate, and efficiency variances in management accounting.',
    passingScore: 80,
    questions: [
      {
        id: 'q-va-1',
        question: 'If standard material price is £10/kg and actual material price paid was £9/kg for 1,000kg purchased, what is the Material Price Variance?',
        options: [
          '£1,000 Favourable',
          '£1,000 Adverse (Unfavourable)',
          '£9,000 Favourable',
          '£0 (No variance)',
        ],
        correctOptionIndex: 0,
        explanation: 'Material Price Variance = (Standard £10 - Actual £9) * 1,000kg = +£1,000 Favourable because less cash was spent than budgeted.',
      },
    ],
  },
  {
    id: 'quiz-ratio-liquidity',
    courseId: 'course-ratio-1',
    lessonId: 'les-ratio-1-1',
    title: 'Liquidity & Solvency Ratios Check',
    description: 'Test your understanding of working capital and debt diagnostic ratios.',
    passingScore: 80,
    questions: [
      {
        id: 'q-rl-1',
        question: 'Why is Inventory deducted from Current Assets when calculating the Quick Ratio (Acid Test)?',
        options: [
          'Because inventory is considered the least liquid current asset and may take significant time or discounts to convert into cash',
          'Because inventory is not owned by the company',
          'Because inventory is always obsolete',
          'Because tax authorities prohibit counting stock as an asset',
        ],
        correctOptionIndex: 0,
        explanation: 'Inventory cannot be converted to immediate cash as quickly as receivables or marketable securities, so it is excluded to evaluate acute short-term solvency.',
      },
    ],
  },
  {
    id: 'quiz-dupont-model',
    courseId: 'course-ratio-1',
    lessonId: 'les-ratio-2-1',
    title: 'DuPont Framework & Profitability Quiz',
    description: 'Master the 3 drivers of Return on Equity.',
    passingScore: 80,
    questions: [
      {
        id: 'q-dp-1',
        question: 'Under the 3-step DuPont equation, what are the three multiplying factors that determine ROE?',
        options: [
          'Gross Margin, Debt Ratio, and Free Cash Flow',
          'Net Profit Margin, Asset Turnover, and Equity Multiplier (Financial Leverage)',
          'Current Ratio, Quick Ratio, and Cash Ratio',
          'Operating Margin, Depreciation Rate, and Tax Rate',
        ],
        correctOptionIndex: 1,
        explanation: 'ROE = (Net Income / Revenue) * (Revenue / Total Assets) * (Total Assets / Equity) = Net Profit Margin * Asset Turnover * Equity Multiplier.',
      },
    ],
  },
  {
    id: 'quiz-payroll-taxes',
    courseId: 'course-payroll-1',
    lessonId: 'les-payroll-1-1',
    title: 'PAYE & National Insurance Knowledge Check',
    description: 'Test your grasp of gross pay, taxable pay, and statutory withholdings.',
    passingScore: 80,
    questions: [
      {
        id: 'q-pt-1',
        question: 'What is the standard personal allowance represented by the 1257L tax code in the UK?',
        options: ['£10,000 per year', '£12,570 per year', '£15,000 per year', '£50,270 per year'],
        correctOptionIndex: 1,
        explanation: 'Tax code 1257L provides an annual tax-free income allowance of £12,570 before PAYE income tax applies.',
      },
    ],
  },
  {
    id: 'quiz-payroll-journal',
    courseId: 'course-payroll-1',
    lessonId: 'les-payroll-3-1',
    title: 'Payroll Journal Posting Check',
    description: 'Verify double-entry mechanics of the monthly gross-to-net payroll journal.',
    passingScore: 80,
    questions: [
      {
        id: 'q-pj-1',
        question: 'When posting the monthly gross-to-net payroll journal, how is Net Wages Payable to employees classified on the Balance Sheet before payment day?',
        options: [
          'As a Current Asset',
          'As a Current Liability',
          'As an Operating Expense',
          'As Owner\'s Equity',
        ],
        correctOptionIndex: 1,
        explanation: 'Net Wages Payable represents a short-term liability owed to employees until the salary payment is transferred from the bank.',
      },
    ],
  },
];
