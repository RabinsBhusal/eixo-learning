import {
  User,
  Course,
  Module,
  Lesson,
  Resource,
  Quiz,
  CourseProgress,
} from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user-student-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@finance-student.com',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Junior Financial Analyst',
    company: 'Northfield Advisory',
    enrolledCourseIds: ['course-xero-1', 'course-fin-acc-1', 'course-corp-fin-1'],
    createdAt: '2026-01-15T09:00:00Z',
  },
  {
    id: 'user-admin-1',
    name: 'EIXO Faculty Administrator',
    email: 'admin@eixolearning.com',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Head of Curriculum & Senior FCA',
    company: 'EIXO Learning Ltd',
    enrolledCourseIds: ['course-xero-1', 'course-fin-acc-1', 'course-corp-fin-1', 'course-quickbooks-1'],
    createdAt: '2025-11-01T08:00:00Z',
  },
  {
    id: 'user-student-2',
    name: 'David Chen',
    email: 'david.chen@enterprise.co.uk',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Accounts Assistant',
    company: 'Vanguard Retail Ltd',
    enrolledCourseIds: ['course-xero-1', 'course-quickbooks-1'],
    createdAt: '2026-02-01T11:20:00Z',
  },
  {
    id: 'user-student-3',
    name: 'Sarah Jenkins',
    email: 'sarah.j@consulting.org',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    jobTitle: 'Finance Manager',
    company: 'Apex Media Partners',
    enrolledCourseIds: ['course-corp-fin-1', 'course-mgmt-acc-1'],
    createdAt: '2026-02-10T14:45:00Z',
  },
];

export const INITIAL_COURSES: Course[] = [
  {
    id: 'course-xero-1',
    title: 'Practical Bookkeeping with Xero',
    slug: 'practical-bookkeeping-with-xero',
    shortDescription: 'Master bookkeeping fundamentals and apply them directly in Xero with real business cases and transaction workflows.',
    description: 'A comprehensive, practice-first masterclass in bookkeeping and Xero software. Learn how double-entry principles translate into modern cloud accounting, setup chart of accounts, process sales invoices, track vendor bills, perform bank feeds reconciliation, and prepare VAT returns.',
    category: 'Practical Software',
    subcategory: 'Xero',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=80',
    duration: '8 hours',
    totalLessons: 42,
    published: true,
    status: 'Published',
    createdAt: '2026-01-10T10:00:00Z',
    lastUpdated: 'February 2026',
    featured: true,
    rating: 4.9,
    ratingCount: 348,
    enrolmentsCount: 1420,
    softwareUsed: ['Xero', 'Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'Chartered Accountants & Certified Xero Advisors',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      bio: 'Delivered by practicing Chartered Accountants (ICAEW/ACCA) with over 15 years of industry experience across SME bookkeeping, audit, and cloud systems setup.',
      credentials: ['FCA (ICAEW)', 'Xero Certified Platinum Advisor', 'Former Big 4 Senior Manager'],
    },
    whatYouWillLearn: [
      'Understand the core Accounting Equation and Double-Entry mechanics in practice',
      'Set up a complete new business organization in Xero from scratch',
      'Configure the Chart of Accounts, VAT rates, and payment terms',
      'Raise sales invoices, credit notes, and manage debtor aging reports',
      'Process supplier purchase bills, payments, and 2-way matching',
      'Master automated bank feeds and multi-line bank reconciliation',
      'Generate Balance Sheet, Profit & Loss, and Trial Balance reports with confidence',
    ],
    requirements: [
      'No prior bookkeeping experience required — concepts explained from first principles',
      'Access to a web browser (free Xero trial or practice demo access provided)',
      'Basic familiarity with spreadsheet software like Microsoft Excel or Google Sheets',
    ],
    targetAudience: [
      'Aspiring Bookkeepers and Junior Accountants',
      'Small Business Owners looking to manage their own financials accurately',
      'Finance Assistants and Office Administrators transitioning to cloud accounting',
      'Commerce and Business students seeking practical software competency',
    ],
  },
  {
    id: 'course-fin-acc-1',
    title: 'Financial Accounting & Double Entry Mastery',
    slug: 'financial-accounting-double-entry-mastery',
    shortDescription: 'Build rock-solid theoretical foundation in financial accounting principles, accruals, prepayments, and statement preparation.',
    description: 'Learn the true language of business. This course takes you systematically through the conceptual framework of financial accounting, debit & credit rules, journal entries, ledger accounts, trial balances, adjusting entries for accruals/prepayments/depreciation, and preparing final published accounts.',
    category: 'Accounting',
    subcategory: 'Financial Accounting',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?w=800&auto=format&fit=crop&q=80',
    duration: '12 hours',
    totalLessons: 35,
    published: true,
    status: 'Published',
    createdAt: '2026-01-05T08:30:00Z',
    lastUpdated: 'January 2026',
    featured: true,
    rating: 4.95,
    ratingCount: 512,
    enrolmentsCount: 1890,
    softwareUsed: ['Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'Chartered Accountants & University Accounting Lecturers',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'EIXO core academic faculty team dedicated to demystifying accounting mechanics with pristine visual clarity and applied practical scenarios.',
      credentials: ['ACA (ICAEW)', 'MSc Accounting & Finance (LSE)', 'Senior Teaching Fellow'],
    },
    whatYouWillLearn: [
      'Master the accounting equation: Assets = Liabilities + Equity with intuition',
      'Post journal entries and T-accounts for complex business transactions',
      'Handle year-end adjustments: Accruals, Prepayments, Bad Debts & Depreciation',
      'Construct a fully balanced Income Statement and Balance Sheet (Statement of Financial Position)',
      'Prepare the Statement of Cash Flows using direct and indirect methods',
      'Understand revenue recognition criteria under IFRS and GAAP',
    ],
    requirements: [
      'No prerequisites. Suitable for absolute beginners through intermediate learners',
      'Basic arithmetic skills and an interest in financial statements',
    ],
    targetAudience: [
      'University students studying Accounting, Finance, or MBA programmes',
      'Entrepreneurs and managers needing to read and interpret company accounts',
      'Career switchers preparing for ACCA, CIMA, AAT, or ACA qualifications',
    ],
  },
  {
    id: 'course-corp-fin-1',
    title: 'Corporate Finance & Financial Modelling with Excel',
    slug: 'corporate-finance-financial-modelling-excel',
    shortDescription: 'Master DCF valuation, capital budgeting, WACC calculations, and dynamic 3-statement integrated financial models.',
    description: 'Bridge the gap between theoretical corporate finance and professional Excel financial modeling. Build integrated 3-statement forecast models, calculate WACC and cost of equity, evaluate capital investments using NPV and IRR, and perform sensitivity and scenario analyses.',
    category: 'Finance',
    subcategory: 'Financial Modelling',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=80',
    duration: '14 hours',
    totalLessons: 40,
    published: true,
    status: 'Published',
    createdAt: '2026-01-18T14:00:00Z',
    lastUpdated: 'February 2026',
    featured: true,
    rating: 4.88,
    ratingCount: 290,
    enrolmentsCount: 980,
    softwareUsed: ['Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'Investment Banking & Corporate Finance Team',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      bio: 'Seasoned financial analysts and M&A practitioners who have advised on over £500m of corporate debt, equity, and restructuring transactions.',
      credentials: ['CFA Charterholder', 'Ex-Goldman Sachs M&A Analyst', 'Financial Modelling Specialist'],
    },
    whatYouWillLearn: [
      'Design modular, error-free 3-statement financial models in Excel from blank canvas',
      'Calculate Free Cash Flows to Firm (FCFF) and Discounted Cash Flow (DCF) enterprise valuations',
      'Compute Weighted Average Cost of Capital (WACC), CAPM beta, and cost of debt',
      'Build Capital Budgeting schedules evaluating NPV, IRR, Payback and Profitability Index',
      'Implement dynamic scenario switchers, data tables, and sensitivity matrices',
    ],
    requirements: [
      'Basic understanding of financial statements (Balance Sheet, P&L, Cash Flow)',
      'Familiarity with basic Microsoft Excel functions (SUM, IF, VLOOKUP/XLOOKUP)',
    ],
    targetAudience: [
      'Financial Analysts, FP&A Professionals, and Corporate Finance Associates',
      'Private Equity and Venture Capital associates',
      'Founders and CFOs building valuation models for fundraising rounds',
    ],
  },
  {
    id: 'course-quickbooks-1',
    title: 'Practical Bookkeeping & VAT with QuickBooks Online',
    slug: 'practical-bookkeeping-quickbooks-online',
    shortDescription: 'Learn how modern businesses utilize QuickBooks Online for daily bookkeeping, invoicing, payroll links, and VAT submissions.',
    description: 'A hands-on, end-to-end practical walkthrough of QuickBooks Online. Experience realistic corporate case studies: establishing vendor files, item master catalogs, sales receipts, bank feeds automation, reconciliations, and generating HMRC Making Tax Digital (MTD) compliant VAT returns.',
    category: 'Practical Software',
    subcategory: 'QuickBooks',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
    duration: '7 hours',
    totalLessons: 28,
    published: true,
    status: 'Published',
    createdAt: '2026-01-22T11:00:00Z',
    lastUpdated: 'February 2026',
    featured: false,
    rating: 4.85,
    ratingCount: 195,
    enrolmentsCount: 840,
    softwareUsed: ['QuickBooks', 'Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'QuickBooks Advanced Certified ProAdvisors',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'EIXO certified software instructors guiding students through exact corporate setups and troubleshooting.',
      credentials: ['QuickBooks Online Advanced Certified', 'AAT Fellow', 'Licensed Accountant'],
    },
    whatYouWillLearn: [
      'Configure QuickBooks Online preferences, company settings, and user access roles',
      'Set up products, inventory tracking, service items, and customer profiles',
      'Record sales orders, invoices, customer payments, and deposits',
      'Manage accounts payable, supplier credits, and expense categorisation',
      'Run the QBO bank feed matching engine and resolve reconciliation discrepancies',
      'Generate Making Tax Digital (MTD) VAT returns and review audit trails',
    ],
    requirements: [
      'No prior QuickBooks knowledge needed',
      'Web browser access for QBO Test Drive account',
    ],
    targetAudience: [
      'Bookkeepers taking on QuickBooks clients',
      'SME owners and operations managers',
    ],
  },
  {
    id: 'course-mgmt-acc-1',
    title: 'Management Accounting: Costing, Budgeting & Variance Analysis',
    slug: 'management-accounting-costing-budgeting',
    shortDescription: 'Master internal decision-making: marginal costing, absorption costing, CVP analysis, standard costing, and flexible budgeting.',
    description: 'Learn how to provide actionable financial intelligence to executives and operating teams. This course covers cost classification, break-even / CVP calculations, pricing decisions, activity-based costing (ABC), annual budgeting cycles, and calculating price/efficiency/volume variances.',
    category: 'Accounting',
    subcategory: 'Management Accounting',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=80',
    duration: '10 hours',
    totalLessons: 30,
    published: true,
    status: 'Published',
    createdAt: '2026-01-25T09:15:00Z',
    lastUpdated: 'February 2026',
    featured: false,
    rating: 4.91,
    ratingCount: 160,
    enrolmentsCount: 650,
    softwareUsed: ['Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'CIMA Qualified Management Accountants',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      bio: 'Former Heads of Commercial Finance and Manufacturing Cost Controllers.',
      credentials: ['ACMA / CGMA (CIMA)', 'Ex-Head of FP&A Unilever'],
    },
    whatYouWillLearn: [
      'Differentiate fixed vs variable, direct vs indirect, and product vs period costs',
      'Calculate Contribution Margin, Break-Even Point, and Margin of Safety',
      'Implement Absorption Costing and Marginal Costing statements and reconcile profits',
      'Develop master budgets, production schedules, and cash flow forecasts',
      'Compute Material, Labour, Variable Overhead, and Sales variances',
    ],
    requirements: [
      'Basic familiarity with Income Statements and cost behavior',
    ],
    targetAudience: [
      'Management accountants, FP&A analysts, factory controllers, and MBA candidates',
    ],
  },
  {
    id: 'course-sage-1',
    title: 'Sage Business Cloud Accounting in Practice',
    slug: 'sage-business-cloud-accounting-in-practice',
    shortDescription: 'Develop practical skills in Sage Business Cloud: nominal ledger, customer/supplier ledgers, VAT return processing, and journal adjustments.',
    description: 'Gain hands-on proficiency in Sage, one of the world’s most venerable accounting software suites. Understand the Sage nominal ledger structure, post recurring journals, handle prepayments and depreciation, manage supplier batches, and extract management reports.',
    category: 'Practical Software',
    subcategory: 'Sage',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1556742049-0a67e55722c0?w=800&auto=format&fit=crop&q=80',
    duration: '6 hours',
    totalLessons: 24,
    published: true,
    status: 'Published',
    createdAt: '2026-02-01T13:00:00Z',
    lastUpdated: 'February 2026',
    featured: false,
    rating: 4.8,
    ratingCount: 110,
    enrolmentsCount: 490,
    softwareUsed: ['Sage', 'Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'Sage Certified Practitioners',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      bio: 'EIXO specialized trainers with extensive practical experience in Sage 50 and Sage Business Cloud implementations.',
      credentials: ['Sage Certified Trainer', 'AAT Qualified'],
    },
    whatYouWillLearn: [
      'Navigate Sage Business Cloud workspace and configure company parameters',
      'Maintain the Nominal Ledger and Chart of Accounts codes',
      'Process customer receipts, credit limits, and debtor statements',
      'Enter supplier invoices, handle disputed invoices, and run payment runs',
      'Perform monthly bank reconciliations and post journal adjustments',
    ],
    requirements: ['Basic understanding of debit and credit concepts'],
    targetAudience: ['Accounts clerks, bookkeepers, and corporate finance administrators working with Sage'],
  },
  {
    id: 'course-ratio-1',
    title: 'Financial Statement Analysis & Ratio Interpretation',
    slug: 'financial-statement-analysis-ratio-interpretation',
    shortDescription: 'Diagnose company health, liquidity, solvency, profitability, and operational efficiency through rigorous ratio analysis and cash flow forensics.',
    description: 'Move beyond simply preparing accounts to interpreting what the numbers actually reveal. Learn Dupont analysis, working capital cycles, interest coverage, asset turnover, free cash flow conversion, and red flags for earnings quality.',
    category: 'Finance',
    subcategory: 'Financial Analysis',
    level: 'Intermediate',
    thumbnail: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=800&auto=format&fit=crop&q=80',
    duration: '9 hours',
    totalLessons: 26,
    published: true,
    status: 'Published',
    createdAt: '2026-02-05T10:00:00Z',
    lastUpdated: 'February 2026',
    featured: false,
    rating: 4.92,
    ratingCount: 142,
    enrolmentsCount: 720,
    softwareUsed: ['Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'Equity Research & Credit Rating Specialists',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      bio: 'Senior financial analysts training corporate lenders and equity investment teams.',
      credentials: ['CFA', 'Chartered Banker', 'Credit Risk Specialist'],
    },
    whatYouWillLearn: [
      'Calculate and benchmark Liquidity Ratios (Current, Quick, Cash ratios)',
      'Assess Solvency and Debt structure (Gearing, Net Debt to EBITDA, Interest Cover)',
      'Analyze Profitability using Dupont Framework (ROE = Margin × Asset Turnover × Leverage)',
      'Examine the Cash Conversion Cycle (DSO, DIO, DPO)',
      'Detect accounting warning signs, revenue pull-forward, and aggressive capitalization',
    ],
    requirements: ['Comfortable reading Balance Sheets and Income Statements'],
    targetAudience: ['Credit analysts, stock investors, financial planners, and commercial banking officers'],
  },
  {
    id: 'course-payroll-1',
    title: 'Payroll Accounting & Statutory Compliance',
    slug: 'payroll-accounting-statutory-compliance',
    shortDescription: 'Master gross-to-net calculations, PAYE income tax, national insurance, workplace pensions, and posting payroll journals into the general ledger.',
    description: 'Understand the end-to-end payroll cycle. Learn how tax codes work, calculate employee & employer National Insurance, student loan deductions, pension auto-enrolment, statutory sick/maternity pay, and post balanced gross-to-net payroll journal entries.',
    category: 'Accounting',
    subcategory: 'Payroll',
    level: 'Beginner',
    thumbnail: 'https://images.unsplash.com/photo-1554224154-26032ffc0d07?w=800&auto=format&fit=crop&q=80',
    duration: '5 hours',
    totalLessons: 18,
    published: true,
    status: 'Published',
    createdAt: '2026-02-12T15:00:00Z',
    lastUpdated: 'February 2026',
    featured: false,
    rating: 4.87,
    ratingCount: 88,
    enrolmentsCount: 390,
    softwareUsed: ['Xero', 'Excel'],
    instructor: {
      name: 'EIXO Learning Faculty',
      title: 'Payroll & Tax Compliance Specialists',
      avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
      bio: 'Chartered Payroll Professionals with expertise in HMRC regulations, RTI submissions, and payroll accounting.',
      credentials: ['MCIPP (Chartered Payroll)', 'CTA (Tax Advisor)'],
    },
    whatYouWillLearn: [
      'Calculate Gross Pay, Taxable Pay, PAYE tax brackets, and National Insurance contributions',
      'Compute statutory sick pay (SSP), maternity pay (SMP), and pension scheme contributions',
      'Draft and post accurate General Ledger Payroll Journals (Debiting Wages Expense, Crediting Net Pay & Liabilities)',
      'Reconcile payroll balance sheet control accounts (PAYE/NI liability, Pension payable)',
    ],
    requirements: ['Basic arithmetic and introduction to double-entry concepts'],
    targetAudience: ['Payroll administrators, HR personnel handling payroll, and small business owners'],
  },
];

export const INITIAL_MODULES: Module[] = [
  // Modules for Course 1: Practical Bookkeeping with Xero
  {
    id: 'mod-xero-1',
    courseId: 'course-xero-1',
    title: 'Module 1 — Accounting Fundamentals & The Double Entry Engine',
    description: 'Core concepts of double-entry bookkeeping, the fundamental equation, and understanding debits & credits.',
    order: 1,
    duration: '1h 15m',
  },
  {
    id: 'mod-xero-2',
    courseId: 'course-xero-1',
    title: 'Module 2 — Setting Up a Business Organisation in Xero',
    description: 'Organisation settings, financial years, Chart of Accounts customisation, and tax rates configuration.',
    order: 2,
    duration: '55m',
  },
  {
    id: 'mod-xero-3',
    courseId: 'course-xero-1',
    title: 'Module 3 — Sales Transactions & Accounts Receivable',
    description: 'Customer records, creating and sending sales invoices, credit notes, and managing payment receipts.',
    order: 3,
    duration: '1h 05m',
  },
  {
    id: 'mod-xero-4',
    courseId: 'course-xero-1',
    title: 'Module 4 — Purchase Transactions & Accounts Payable',
    description: 'Supplier contacts, recording bills, handling expense claims, payment runs, and purchase orders.',
    order: 4,
    duration: '1h 10m',
  },
  {
    id: 'mod-xero-5',
    courseId: 'course-xero-1',
    title: 'Module 5 — Bank Feeds & Automated Bank Reconciliation',
    description: 'Connecting bank feeds, matching transactions, bank rules creation, and resolving reconciliation anomalies.',
    order: 5,
    duration: '1h 20m',
  },
  {
    id: 'mod-xero-6',
    courseId: 'course-xero-1',
    title: 'Module 6 — VAT Return Preparation & Review',
    description: 'Understanding VAT rates, standard vs flat rate schemes, generating the VAT return, and audit checks.',
    order: 6,
    duration: '50m',
  },
  {
    id: 'mod-xero-7',
    courseId: 'course-xero-1',
    title: 'Module 7 — Financial Reports & Month-End Routine',
    description: 'Running the Balance Sheet, Profit & Loss, Trial Balance, Aged Debtors, and Aged Creditors.',
    order: 7,
    duration: '1h 00m',
  },
  {
    id: 'mod-xero-8',
    courseId: 'course-xero-1',
    title: 'Module 8 — Practical Comprehensive Business Simulation',
    description: 'Full end-to-end month 1 transactions for a real enterprise case study from start to final trial balance.',
    order: 8,
    duration: '1h 15m',
  },

  // Modules for Course 2: Financial Accounting & Double Entry Mastery
  {
    id: 'mod-fin-1',
    courseId: 'course-fin-acc-1',
    title: 'Module 1 — Conceptual Framework & The Accounting Equation',
    description: 'Assets, liabilities, equity, revenues, and expenses explained clearly.',
    order: 1,
    duration: '1h 30m',
  },
  {
    id: 'mod-fin-2',
    courseId: 'course-fin-acc-1',
    title: 'Module 2 — The Mechanics of Debits and Credits (DEAD CLIC)',
    description: 'Mastering the rules of double entry without memorization confusion.',
    order: 2,
    duration: '1h 45m',
  },
  {
    id: 'mod-fin-3',
    courseId: 'course-fin-acc-1',
    title: 'Module 3 — General Journals, General Ledgers & Trial Balance',
    description: 'From source documents to the unadjusted trial balance.',
    order: 3,
    duration: '2h 00m',
  },
  {
    id: 'mod-fin-4',
    courseId: 'course-fin-acc-1',
    title: 'Module 4 — Period-End Adjusting Entries: Accruals & Prepayments',
    description: 'Matching principle in action: accrued expenses, accrued revenues, and prepaid expenses.',
    order: 4,
    duration: '2h 15m',
  },
  {
    id: 'mod-fin-5',
    courseId: 'course-fin-acc-1',
    title: 'Module 5 — Non-Current Assets & Depreciation Methods',
    description: 'Straight-line, reducing balance, disposals, and asset schedules.',
    order: 5,
    duration: '1h 50m',
  },
  {
    id: 'mod-fin-6',
    courseId: 'course-fin-acc-1',
    title: 'Module 6 — Final Accounts Preparation (P&L & Balance Sheet)',
    description: 'Constructing complete, compliant financial statements.',
    order: 6,
    duration: '2h 40m',
  },

  // Modules for Course 3: Corporate Finance
  {
    id: 'mod-corp-1',
    courseId: 'course-corp-fin-1',
    title: 'Module 1 — Time Value of Money & Capital Budgeting Principles',
    description: 'NPV, IRR, Discount Rates, and annuity formulas in Excel.',
    order: 1,
    duration: '2h 00m',
  },
  {
    id: 'mod-corp-2',
    courseId: 'course-corp-fin-1',
    title: 'Module 2 — Estimating the Cost of Capital (WACC & CAPM)',
    description: 'Cost of equity, cost of debt, tax shields, and unlevering beta.',
    order: 2,
    duration: '2h 15m',
  },
  {
    id: 'mod-corp-3',
    courseId: 'course-corp-fin-1',
    title: 'Module 3 — Integrated 3-Statement Financial Modelling in Excel',
    description: 'Linking Income Statement, Balance Sheet, and Cash Flow dynamically.',
    order: 3,
    duration: '4h 30m',
  },
  {
    id: 'mod-corp-4',
    courseId: 'course-corp-fin-1',
    title: 'Module 4 — Discounted Cash Flow (DCF) Valuation',
    description: 'Enterprise Value, Terminal Value, and sensitivity tables.',
    order: 4,
    duration: '3h 15m',
  },
];

export const INITIAL_LESSONS: Lesson[] = [
  // Course 1: Practical Bookkeeping with Xero - Module 1
  {
    id: 'les-xero-1-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-1',
    title: '1. Introduction to Accounting & The Big Picture',
    description: 'Understand the objective of accounting, difference between bookkeeping and financial accounting, and how transactions flow through business systems.',
    vimeoId: '76979871', // Real Vimeo video ID
    duration: '12:45',
    order: 1,
    published: true,
    notesMarkdown: `### What is Accounting?
Accounting is often termed the "language of business". Its fundamental purpose is to record, summarise, analyze, and communicate financial information about an entity to help stakeholders make informed decisions.

#### Bookkeeping vs. Accounting
* **Bookkeeping**: The procedural, day-to-day recording of financial transactions (invoices, bills, payments, receipts).
* **Accounting**: The design of accounting systems, preparation of financial statements, tax strategy, and interpretation of financial data.

#### The Core Transaction Lifecycle
1. **Source Document** (Invoice, receipt, bank statement)
2. **Book of Prime Entry / Journal** (General journal entry)
3. **Ledger Account** (T-Account in General Ledger)
4. **Trial Balance** (List of debit & credit balances)
5. **Adjustments** (Accruals, prepayments, depreciation)
6. **Financial Statements** (Income Statement & Balance Sheet)
`,
    resourceIds: ['res-xero-cheat-1'],
  },
  {
    id: 'les-xero-1-2',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-1',
    title: '2. Understanding Assets, Liabilities & Equity',
    description: 'Deep dive into the three pillars of the Balance Sheet and how they interlock through the Accounting Equation.',
    vimeoId: '90509568',
    duration: '15:20',
    order: 2,
    published: true,
    notesMarkdown: `### The Accounting Equation
Every financial transaction maintains the mathematical equilibrium:

$$\\text{Assets} = \\text{Liabilities} + \\text{Equity}$$

#### 1. Assets (What the business OWNS or controls)
* **Current Assets**: Cash, Accounts Receivable (Debtors), Inventory, Prepayments (Expected to convert to cash within 12 months).
* **Non-Current Assets**: Machinery, Computer Equipment, Vehicles, Property (Long-term utility).

#### 2. Liabilities (What the business OWES to third parties)
* **Current Liabilities**: Accounts Payable (Creditors), Bank Overdraft, VAT Payable, Accruals.
* **Non-Current Liabilities**: Bank Loans, Long-Term Mortgages.

#### 3. Equity (The Owner's Residual Claim)
* Capital contributed by owners
* Retained Earnings (Cumulative profits retained in the business)
* Less: Drawings / Dividends
`,
    doubleEntryExample: {
      description: 'Owner invests £10,000 cash into the new business bank account to start operations.',
      date: '01/03/2026',
      debitAccount: 'Bank Account (Current Asset)',
      debitAmount: 10000,
      creditAccount: "Owner's Capital (Equity)",
      creditAmount: 10000,
      explanation: 'Cash increases (Debit Asset), while the owner claim on business assets increases equally (Credit Equity).',
    },
    quizId: 'quiz-xero-1',
    resourceIds: ['res-xero-cheat-1', 'res-accounting-equation-sheet'],
  },
  {
    id: 'les-xero-1-3',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-1',
    title: '3. Double Entry Bookkeeping & DEAD CLIC Rules',
    description: 'Learn the definitive mnemonic to never confuse debits and credits again.',
    vimeoId: '375468729',
    duration: '18:10',
    order: 3,
    published: true,
    notesMarkdown: `### The DEAD CLIC Mnemonic

Use this rule every time you analyze a transaction:

| **DEAD** (Debit to Increase) | **CLIC** (Credit to Increase) |
|---|---|
| **D**ebit: | **C**redit: |
| **E**xpenses (Rent, Salaries, Software) | **L**iabilities (Accounts Payable, Loans) |
| **A**ssets (Bank, Equipment, Debtors) | **I**ncome / Revenue (Sales, Fees) |
| **D**rawings (Owner withdrawals) | **C**apital (Owner Equity) |

#### Golden Rule:
* To INCREASE a **DEAD** account $\\rightarrow$ **DEBIT**
* To DECREASE a **DEAD** account $\\rightarrow$ **CREDIT**
* To INCREASE a **CLIC** account $\\rightarrow$ **CREDIT**
* To DECREASE a **CLIC** account $\\rightarrow$ **DEBIT**
`,
    doubleEntryExample: {
      description: 'Business purchases £1,200 of office equipment on credit from Apex Supplies Ltd.',
      date: '03/03/2026',
      debitAccount: 'Office Equipment (Asset)',
      debitAmount: 1200,
      creditAccount: 'Trade Creditors / Apex Supplies (Liability)',
      creditAmount: 1200,
      explanation: 'Asset increases (Debit Equipment), and Liability to supplier increases (Credit Accounts Payable).',
    },
    softwareGuide: {
      software: 'Xero',
      title: 'Manual Journal Entry in Xero',
      steps: [
        'Navigate to Accounting > Manual Journals > New Journal',
        'Enter Narration: "Purchase of Office Equipment from Apex Supplies"',
        'Line 1: Account 720 (Office Equipment) -> Enter 1,200.00 in Debit column',
        'Line 2: Account 800 (Accounts Payable / Trade Creditors) -> Enter 1,200.00 in Credit column',
        'Verify Total Debits equals Total Credits (£1,200.00)',
        'Click "Post"',
      ],
      proTip: 'In normal day-to-day Xero usage, entering a Bill automatically generates this exact journal in the background!',
    },
    quizId: 'quiz-dead-clic',
    resourceIds: ['res-dead-clic-poster'],
  },

  // Course 1: Module 2 - Setting Up Xero
  {
    id: 'les-xero-2-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-2',
    title: '4. Setting Up an Organisation & Chart of Accounts in Xero',
    description: 'Walkthrough creating a new entity in Xero, choosing base currency, financial year end, and tailoring the Chart of Accounts.',
    vimeoId: '226053498',
    duration: '21:05',
    order: 4,
    published: true,
    notesMarkdown: `### The Chart of Accounts (COA)
The Chart of Accounts is the structured index of all nominal ledger accounts used to categorize transactions.

#### Typical Account Code Ranges in Xero:
* **200 - 299**: Sales & Revenue
* **300 - 399**: Cost of Goods Sold (Direct Costs)
* **400 - 499**: Operating & Administrative Expenses
* **600 - 699**: Current Assets & Bank Accounts
* **700 - 799**: Non-Current Assets (Fixed Assets)
* **800 - 899**: Current & Non-Current Liabilities
* **900 - 999**: Equity & Retained Earnings
`,
    softwareGuide: {
      software: 'Xero',
      title: 'Configuring Chart of Accounts in Xero',
      steps: [
        'Click your Organisation Name at top-left -> Settings',
        'Select "Chart of Accounts"',
        'Click "Add Account" to create a custom nominal code',
        'Set Account Type (e.g., Current Asset, Expense, Overhead)',
        'Assign a unique 3-digit Code and descriptive Name',
        'Assign the default Tax Rate (e.g. 20% (VAT on Expenses))',
        'Save account',
      ],
    },
    resourceIds: ['res-xero-coa-template'],
  },
  {
    id: 'les-xero-2-2',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-2',
    title: '5. Setting Up Contacts: Customers & Suppliers',
    description: 'Create customer and vendor records with default payment terms, VAT numbers, discount rules, and bank details.',
    vimeoId: '76979871',
    duration: '14:30',
    order: 5,
    published: true,
    notesMarkdown: `### Managing Contacts Effectively
In Xero, both customers and suppliers are managed through a unified **Contacts** directory.

Key data fields to specify:
* Legal Trading Name & Contact Person
* Primary Billing Address & Delivery Address
* VAT Registration Number (for EU/UK reverse charge or domestic validation)
* Financial Settings: Default Tax Code & Default Nominal Account
* Credit Terms (e.g. Net 30 days, Due 14 days after invoice date)
`,
    resourceIds: ['res-xero-practice-data'],
  },

  // Course 1: Module 3 - Sales & Invoicing
  {
    id: 'les-xero-3-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-3',
    title: '6. Creating & Sending Sales Invoices in Xero',
    description: 'Create itemized sales invoices, apply line discounts, select appropriate VAT rates, and email professional PDF invoices.',
    vimeoId: '90509568',
    duration: '16:40',
    order: 6,
    published: true,
    notesMarkdown: `### Accounting Impact of a Sales Invoice
When you approve a sales invoice in Xero, the background journal is:

$$\\text{DEBIT: Accounts Receivable / Trade Debtors (Asset)}$$
$$\\text{CREDIT: Sales Revenue (Income)}$$
$$\\text{CREDIT: VAT Output Tax (Liability)}$$

Notice how the Balance Sheet and Profit & Loss both update instantaneously!
`,
    doubleEntryExample: {
      description: 'Issued Invoice #INV-0010 to Zenith Consulting for £2,000 + 20% VAT (£400) = £2,400 total.',
      date: '10/03/2026',
      debitAccount: 'Accounts Receivable (Trade Debtors)',
      debitAmount: 2400,
      creditAccount: 'Sales Revenue (£2,000) & Output VAT (£400)',
      creditAmount: 2400,
      explanation: 'Customer owes £2,400 (Debit Asset). Business earned £2,000 revenue (Credit Revenue) and owes £400 VAT to HMRC (Credit Liability).',
    },
    softwareGuide: {
      software: 'Xero',
      title: 'Creating an Invoice in Xero',
      steps: [
        'Click the (+) icon at top right -> Invoice',
        'Type Customer Name in the "To" field',
        'Set Issue Date and Due Date',
        'Select Item or type Description, Quantity, Unit Price',
        'Choose Account: 200 (Sales)',
        'Choose Tax Rate: 20% (VAT on Income)',
        'Click "Approve" (or "Approve & Email")',
      ],
    },
    resourceIds: ['res-xero-practice-exercise-01'],
  },
  {
    id: 'les-xero-3-2',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-3',
    title: '7. Recording Customer Payments & Credit Notes',
    description: 'Process full and partial payments against open invoices and issue credit notes for returned goods or billing corrections.',
    vimeoId: '375468729',
    duration: '13:50',
    order: 7,
    published: true,
    notesMarkdown: `### Recording Inbound Payments
When customer pays their invoice via bank transfer:
* **DEBIT**: Bank Account (Asset increases)
* **CREDIT**: Accounts Receivable (Asset decreases)

Total assets remain unchanged, but the composition transforms from a debtor balance to liquid cash.
`,
    doubleEntryExample: {
      description: 'Received bank transfer of £2,400 from Zenith Consulting paying Invoice #INV-0010 in full.',
      date: '18/03/2026',
      debitAccount: 'Business Current Bank Account',
      debitAmount: 2400,
      creditAccount: 'Accounts Receivable / Zenith Consulting',
      creditAmount: 2400,
      explanation: 'Cash in bank increases (Debit Bank), and customer debt is cleared (Credit Accounts Receivable).',
    },
    quizId: 'quiz-sales-entries',
  },

  // Course 1: Module 5 - Bank Reconciliation
  {
    id: 'les-xero-5-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-5',
    title: '8. Mastering Bank Feeds & The 3 Rules of Reconciliation',
    description: 'Learn the exact logic behind Xero green Match buttons, Create rules, and Transfer entries.',
    vimeoId: '226053498',
    duration: '19:15',
    order: 8,
    published: true,
    notesMarkdown: `### The 4 Reconciliation Tabs in Xero
1. **Match (Green)**: Automatically finds matching approved invoices or bills with identical amounts and dates.
2. **Create**: For direct bank transactions where no prior invoice exists (e.g. bank charges, coffee, fuel).
3. **Transfer**: Moving funds between your internal accounts (e.g. Current Account to Savings Account).
4. **Discuss**: Leaving internal collaboration notes for colleagues or clients.
`,
    softwareGuide: {
      software: 'Xero',
      title: 'Reconciling Bank Statement Lines',
      steps: [
        'Go to Accounting > Bank Accounts',
        'Click "Reconcile [X] Items"',
        'Left side = Actual bank statement line; Right side = Xero ledger action',
        'If matching an invoice: Verify details and click "OK"',
        'If creating a direct expense: Fill "Who", "What (Account)", "Why", and click "OK"',
        'Ensure Statement Balance equals Xero Balance at month-end',
      ],
    },
    quizId: 'quiz-bank-rec',
    resourceIds: ['res-bank-rec-worksheet'],
  },

  // Course 1: Module 4 - Purchases & Accounts Payable
  {
    id: 'les-xero-4-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-4',
    title: '9. Entering Supplier Bills & 2-Way Purchase Order Matching',
    description: 'Record vendor invoices, allocate nominal expense accounts, capture VAT input tax, and match purchase orders.',
    vimeoId: '76979871',
    duration: '17:30',
    order: 9,
    published: true,
    notesMarkdown: `### Accounts Payable Double-Entry Mechanics
When approving a Supplier Bill in Xero:
$$\\text{DEBIT: Relevant Expense or Asset Account (e.g. 400 Advertising / 720 Equipment)}$$
$$\\text{DEBIT: VAT Input Tax Control (820)}$$
$$\\text{CREDIT: Accounts Payable / Trade Creditors (800)}$$

#### 2-Way PO Matching
1. Create Purchase Order for supplier commitment.
2. When supplier goods/invoice arrive, convert Purchase Order to Bill.
3. Verify line item prices, quantities, and terms before approval.
`,
    doubleEntryExample: {
      description: 'Approved vendor bill from CloudHost Ltd for £1,000 server hosting + 20% VAT (£200) = £1,200 total payable.',
      date: '12/03/2026',
      debitAccount: 'IT & Software Hosting (£1,000) & Input VAT (£200)',
      debitAmount: 1200,
      creditAccount: 'Accounts Payable / CloudHost Ltd',
      creditAmount: 1200,
      explanation: 'Expenses increase by £1,000, VAT reclaimable from HMRC increases by £200, and liability to supplier increases by £1,200.',
    },
    softwareGuide: {
      software: 'Xero',
      title: 'Entering a Bill in Xero',
      steps: [
        'Click (+) > Bill',
        'From: Type Supplier Name',
        'Date & Due Date: Enter invoice date and payment due date',
        'Description: Enter goods/services details',
        'Account: 420 (Computer & IT Expenses)',
        'Tax Rate: 20% (VAT on Expenses)',
        'Click "Approve"',
      ],
    },
    quizId: 'quiz-purchases-ap',
    resourceIds: ['res-xero-practice-exercise-01'],
  },
  {
    id: 'les-xero-4-2',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-4',
    title: '10. Supplier Batch Payment Runs & Employee Expense Claims',
    description: 'Execute batch payment runs to generate BACS / ABA payment files for banking and process employee out-of-pocket expenses.',
    vimeoId: '90509568',
    duration: '14:20',
    order: 10,
    published: true,
    notesMarkdown: `### Batch Payments Workflow
Batch payments allow you to pay multiple suppliers simultaneously in one bank transaction:
1. Filter bills due for payment in **Awaiting Payment**.
2. Select bills and click **Make Payment**.
3. Choose Bank Account and download the electronic payment file (.csv or .aba).
4. Upload file to online banking for execution.
5. In Xero, the batch posts one single transaction ready to match on the bank reconciliation screen.
`,
  },

  // Course 1: Module 6 - VAT Return Preparation
  {
    id: 'les-xero-6-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-6',
    title: '11. Preparing and Reviewing Making Tax Digital (MTD) VAT Returns',
    description: 'Step-by-step review of Box 1 through 9 on the HMRC VAT return, running VAT audit trails, and electronic filing.',
    vimeoId: '375468729',
    duration: '22:15',
    order: 11,
    published: true,
    notesMarkdown: `### The HMRC 9-Box VAT Return Explained
* **Box 1**: VAT due on sales and other outputs in the period.
* **Box 2**: VAT due on acquisitions from EU countries.
* **Box 3**: Total VAT due (Box 1 + Box 2).
* **Box 4**: VAT reclaimed on business purchases and expenses.
* **Box 5**: Net VAT to pay to HMRC or reclaim (Box 3 minus Box 4).
* **Box 6**: Total value of sales excluding VAT.
* **Box 7**: Total value of purchases excluding VAT.
* **Box 8 & 9**: Supplies and acquisitions to/from EU.

#### Key Pre-Submission Audit Checks:
1. Review the **VAT Exceptions & Late Claims** report.
2. Confirm zero transactions with 'No VAT' that should have standard 20% applied.
3. Reconcile General Ledger Nominal 820 with Box 5 net liability.
`,
    softwareGuide: {
      software: 'Xero',
      title: 'Generating VAT Return in Xero',
      steps: [
        'Go to Accounting > Reports > UK VAT Return',
        'Select the quarterly reporting period',
        'Review Box 1 to 9 calculations',
        'Click "VAT Audit Report" to inspect individual transactional line items',
        'Click "Finalise Return" and submit via MTD connection to HMRC',
      ],
      proTip: 'Xero automatically posts the VAT Settlement Journal upon filing to transfer the balance from VAT Control (820) to HMRC Payable (821).',
    },
    quizId: 'quiz-vat-mtd',
    resourceIds: ['res-vat-audit-checklist'],
  },

  // Course 1: Module 7 - Financial Reports & Month End Routine
  {
    id: 'les-xero-7-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-7',
    title: '12. Running Month-End Reports: P&L, Balance Sheet & Trial Balance',
    description: 'Generate primary financial statements, analyze variance against budget, and lock historical periods.',
    vimeoId: '226053498',
    duration: '18:50',
    order: 12,
    published: true,
    notesMarkdown: `### Essential Month-End Reports Checklist
1. **Profit and Loss (Income Statement)**: Measures trading performance over the calendar month (Revenue - COGS = Gross Profit - Operating Expenses = Net Profit).
2. **Balance Sheet**: Snapshot of financial condition at a specific date (Assets = Liabilities + Equity).
3. **Trial Balance**: Verification that all debit balances equal credit balances across the general ledger.
4. **Lock Dates**: Set Year-End and Period Lock Dates in Xero settings to prevent unauthorized edits to closed periods.
`,
    quizId: 'quiz-reporting-monthend',
    resourceIds: ['res-month-end-working-papers'],
  },
  {
    id: 'les-xero-7-2',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-7',
    title: '13. Reconciling Aged Debtors & Aged Creditors Sub-Ledgers',
    description: 'Audit sub-ledger balances against general ledger control accounts (Nominal 610 and Nominal 800) to ensure zero discrepancies.',
    vimeoId: '115783408',
    duration: '15:10',
    order: 13,
    published: true,
    notesMarkdown: `### Sub-Ledger Control Account Reconciliation
A critical internal control check:
* Total of **Aged Receivables Summary** MUST equal the **Accounts Receivable** balance on the Balance Sheet.
* Total of **Aged Payables Summary** MUST equal the **Accounts Payable** balance on the Balance Sheet.

Any difference usually indicates a manual journal posted directly to the control account instead of an invoice or credit note.
`,
  },

  // Course 1: Module 8 - Comprehensive Business Simulation
  {
    id: 'les-xero-8-1',
    courseId: 'course-xero-1',
    moduleId: 'mod-xero-8',
    title: '14. Comprehensive Enterprise Simulation: Month 1 Bookkeeping Cycle',
    description: 'Hands-on practical case study: Apex Digital Services Ltd. Import opening trial balance, post 30 live transactions, reconcile bank feed, and produce final financial statements.',
    vimeoId: '76979871',
    duration: '32:00',
    order: 14,
    published: true,
    notesMarkdown: `### Apex Digital Services Ltd — Month 1 Practical Case Study
You will execute the full accounting cycle for a growing UK technology consultancy:

#### Case Study Tasks:
1. **Set Up Practice Org**: Create Apex Digital Services Ltd with conversion date 01 March 2026.
2. **Import Master Data**: Upload Chart of Accounts, Customer List, and Supplier List from exercise files.
3. **Record Sales Invoices**: Post 12 consulting invoices with 20% VAT.
4. **Record Supplier Bills**: Enter 15 operational bills (Hosting, Advertising, Subcontractors, Rent).
5. **Import & Reconcile Bank Statement**: Reconcile 28 bank lines using Match, Create, and Transfer rules.
6. **Period Adjustments**: Post month-end accruals for unpaid utility bills and depreciation on computer hardware.
7. **Publish Final Accounts**: Export verified Profit and Loss, Balance Sheet, and MTD VAT Return.
`,
    resourceIds: ['res-case-study-apex-digital', 'res-xero-practice-exercise-01'],
  },

  // Course 2: Financial Accounting - Sample Lessons
  {
    id: 'les-fin-1-1',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-1',
    title: '1. The Qualitative Characteristics of Financial Information',
    description: 'Fundamental characteristics (Relevance & Faithful Representation) and enhancing characteristics under IFRS conceptual framework.',
    vimeoId: '76979871',
    duration: '16:00',
    order: 1,
    published: true,
    notesMarkdown: `### IFRS Conceptual Framework
Financial statements must satisfy:
1. **Relevance**: Information capable of making a difference in user decisions (Predictive & Confirmatory value). Materiality threshold.
2. **Faithful Representation**: Complete, neutral, and free from material error.

#### Enhancing Characteristics
* Comparability
* Verifiability
* Timeliness
* Understandability
`,
  },
  {
    id: 'les-fin-2-1',
    courseId: 'course-fin-acc-1',
    moduleId: 'mod-fin-2',
    title: '2. Posting Complex Multi-Leg Journal Entries',
    description: 'Handling compound transactions with multiple debits and credits, discounts allowed, and sales taxes.',
    vimeoId: '90509568',
    duration: '22:30',
    order: 2,
    published: true,
    doubleEntryExample: {
      description: 'Purchased delivery vehicle for £25,000. Paid £5,000 cash deposit and financed £20,000 via a 4-year bank loan.',
      date: '15/01/2026',
      debitAccount: 'Motor Vehicles (Asset) £25,000',
      debitAmount: 25000,
      creditAccount: 'Bank (£5,000) & Bank Loan Payable (£20,000)',
      creditAmount: 25000,
      explanation: 'Total debits (£25,000) equal total credits (£5,000 + £20,000 = £25,000).',
    },
  },
];

export const INITIAL_RESOURCES: Resource[] = [
  {
    id: 'res-xero-practice-exercise-01',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-3-1',
    name: 'Xero Practice Company — Exercise 01.xlsx',
    filename: 'Xero_Practice_Company_Exercise_01.xlsx',
    fileUrl: '#',
    type: 'excel',
    size: '142 KB',
    description: 'Real-world transaction dataset for Month 1. Contains 35 realistic customer invoices, supplier bills, and bank statement CSV to import into your practice Xero organisation.',
    downloadCount: 1240,
  },
  {
    id: 'res-dead-clic-poster',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-1-3',
    name: 'EIXO Double-Entry Reference Cheat Sheet (DEAD CLIC).pdf',
    filename: 'EIXO_Double_Entry_DEAD_CLIC_Reference.pdf',
    fileUrl: '#',
    type: 'pdf',
    size: '480 KB',
    description: 'High-resolution printable quick reference chart for debit & credit rules across all standard nominal accounts.',
    downloadCount: 2890,
  },
  {
    id: 'res-xero-coa-template',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-2-1',
    name: 'Standard SME Chart of Accounts Template.csv',
    filename: 'EIXO_Standard_SME_Chart_of_Accounts.csv',
    fileUrl: '#',
    type: 'csv',
    size: '28 KB',
    description: 'Pre-formatted Chart of Accounts with standard 3-digit codes ready for one-click import into Xero, QuickBooks, or Sage.',
    downloadCount: 950,
  },
  {
    id: 'res-bank-rec-worksheet',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-5-1',
    name: 'Bank Reconciliation Working Papers & Discrepancy Finder.xlsx',
    filename: 'Bank_Reconciliation_Working_Papers.xlsx',
    fileUrl: '#',
    type: 'excel',
    size: '210 KB',
    description: 'Interactive Excel reconciliation model with timing difference reconcilers for unpresented cheques and outstanding lodgements.',
    downloadCount: 1670,
  },
  {
    id: 'res-accounting-equation-sheet',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-1-2',
    name: 'Accounting Equation Practice Matrix.pdf',
    filename: 'Accounting_Equation_Practice_Matrix.pdf',
    fileUrl: '#',
    type: 'pdf',
    size: '320 KB',
    description: '20 transaction analysis scenarios with step-by-step impact breakdown on Assets, Liabilities, and Equity.',
    downloadCount: 1120,
  },
  {
    id: 'res-xero-practice-data',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-2-2',
    name: 'Sample Customers & Vendors Master List.xlsx',
    filename: 'Sample_Customers_Vendors_Master_List.xlsx',
    fileUrl: '#',
    type: 'excel',
    size: '95 KB',
    description: 'Realistic contact database with UK VAT numbers, credit limits, and addresses for test data entry.',
    downloadCount: 880,
  },
  {
    id: 'res-dcf-model',
    courseId: 'course-corp-fin-1',
    name: 'Dynamic 3-Statement & DCF Valuation Model.xlsx',
    filename: 'Dynamic_3_Statement_DCF_Model_EIXO.xlsx',
    fileUrl: '#',
    type: 'excel',
    size: '580 KB',
    description: 'Wall-Street grade financial model template with automated balance sheet checks, debt schedules, and sensitivity tables.',
    downloadCount: 2150,
  },
  {
    id: 'res-financial-ratios-summary',
    courseId: 'course-ratio-1',
    name: 'Financial Ratios Comprehensive Handbook.pdf',
    filename: 'Financial_Ratios_Comprehensive_Handbook.pdf',
    fileUrl: '#',
    type: 'pdf',
    size: '1.2 MB',
    description: 'Formulas, normal benchmark ranges, and interpretation guidance for 28 essential financial ratios.',
    downloadCount: 1430,
  },
  {
    id: 'res-xero-master-guide-pdf',
    courseId: 'course-xero-1',
    name: 'Xero Cloud Bookkeeping Practitioner Handbook & Full Course Slides.pdf',
    filename: 'EIXO_Xero_Cloud_Bookkeeping_Handbook.pdf',
    fileUrl: '#',
    type: 'pdf',
    size: '2.4 MB',
    description: 'Comprehensive 85-page official lecture slide deck and reference handbook covering all 8 modules, double-entry mappings, and UK tax rules.',
    downloadCount: 3420,
  },
  {
    id: 'res-vat-audit-checklist',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-6-1',
    name: 'HMRC MTD VAT Return 9-Box Audit Checklist.pdf',
    filename: 'HMRC_MTD_VAT_Audit_Checklist.pdf',
    fileUrl: '#',
    type: 'pdf',
    size: '340 KB',
    description: 'Faculty-approved audit protocol before finalising and submitting quarterly UK VAT returns via MTD.',
    downloadCount: 1840,
  },
  {
    id: 'res-month-end-working-papers',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-7-1',
    name: 'Month-End Balance Sheet Reconciliation Working Papers.xlsx',
    filename: 'Month_End_Working_Papers_Model.xlsx',
    fileUrl: '#',
    type: 'excel',
    size: '310 KB',
    description: 'Structured Excel workbooks with schedule lead-sheets for prepayments, accruals, fixed assets, and bank balances.',
    downloadCount: 2100,
  },
  {
    id: 'res-case-study-apex-digital',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-8-1',
    name: 'Apex Digital Services Ltd — Full Simulation Dataset (Month 1).xlsx',
    filename: 'Apex_Digital_Services_Case_Study_Dataset.xlsx',
    fileUrl: '#',
    type: 'excel',
    size: '450 KB',
    description: 'Complete unadjusted trial balance, 30 customer/supplier transactions, bank statement CSV, and solution model.',
    downloadCount: 1980,
  },
];

export const INITIAL_QUIZZES: Quiz[] = [
  {
    id: 'quiz-purchases-ap',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-4-1',
    title: 'Purchases & Accounts Payable Check',
    description: 'Assess your knowledge on bill recording, purchase orders, and input VAT reclaim.',
    passingScore: 80,
    questions: [
      {
        id: 'q-ap-1',
        question: 'When a supplier bill is approved in Xero, which account is credited in the nominal ledger?',
        options: [
          'Sales Revenue',
          'Accounts Payable / Trade Creditors (Liability)',
          'Bank Account',
          'Input VAT',
        ],
        correctOptionIndex: 1,
        explanation: 'Approving a bill creates a liability owed to the supplier, so Accounts Payable (Trade Creditors) is credited.',
      },
      {
        id: 'q-ap-2',
        question: 'Why is VAT paid on purchases (Input VAT) recorded on the Debit side?',
        options: [
          'Because it represents an amount the business can reclaim from tax authorities (treated like an asset/reduction of liability)',
          'Because all taxes are penalty expenses',
          'Because suppliers keep the VAT as profit',
          'Because Xero does not support credit VAT',
        ],
        correctOptionIndex: 0,
        explanation: 'Input VAT is reclaimable from tax authorities (HMRC), so it is debited to reduce the net VAT liability owed.',
      },
    ],
  },
  {
    id: 'quiz-vat-mtd',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-6-1',
    title: 'MTD VAT Return Mastery Quiz',
    description: 'Verify your understanding of Box 1-9 calculations and VAT reconciliation.',
    passingScore: 80,
    questions: [
      {
        id: 'q-vat-1',
        question: 'In the standard UK 9-Box VAT return, how is Box 5 (Net VAT payable or refundable) computed?',
        options: [
          'Box 6 minus Box 7',
          'Box 3 (Total Output VAT) minus Box 4 (Total Input VAT)',
          'Box 1 multiplied by 20%',
          'Box 8 plus Box 9',
        ],
        correctOptionIndex: 1,
        explanation: 'Box 5 equals Box 3 (Total Output VAT due) minus Box 4 (Total Input VAT reclaimed). If positive, you pay HMRC; if negative, HMRC refunds you.',
      },
    ],
  },
  {
    id: 'quiz-reporting-monthend',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-7-1',
    title: 'Financial Reporting & Controls Check',
    description: 'Test your understanding of Trial Balance rules and sub-ledger reconciliations.',
    passingScore: 80,
    questions: [
      {
        id: 'q-rep-1',
        question: 'What is the primary purpose of extracting a Trial Balance at month end?',
        options: [
          'To calculate executive bonuses',
          'To verify the mathematical equality of total debits and total credits across all nominal ledger accounts',
          'To replace the audited annual report',
          'To submit directly to the tax authorities',
        ],
        correctOptionIndex: 1,
        explanation: 'The Trial Balance tests that double-entry books are in mathematical balance (Total Debits = Total Credits) before drafting final statements.',
      },
    ],
  },
  {
    id: 'quiz-xero-1',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-1-2',
    title: 'The Accounting Equation Knowledge Check',
    description: 'Test your grasp of the fundamental relationship between assets, liabilities, and owner equity.',
    passingScore: 80,
    questions: [
      {
        id: 'q1',
        question: 'Which of the following correctly states the fundamental Accounting Equation?',
        options: [
          'Assets = Liabilities - Equity',
          'Assets = Liabilities + Equity',
          'Equity = Assets + Liabilities',
          'Liabilities = Assets + Equity',
        ],
        correctOptionIndex: 1,
        explanation: 'Assets represent everything the company controls, which is funded either by external debt (Liabilities) or owner investment (Equity). Thus: Assets = Liabilities + Equity.',
      },
      {
        id: 'q2',
        question: 'If a business purchases a new computer for £1,500 using cash from its bank account, what is the net effect on Total Assets?',
        options: [
          'Total Assets increase by £1,500',
          'Total Assets decrease by £1,500',
          'Total Assets remain unchanged (£0 net change)',
          'Total Liabilities increase by £1,500',
        ],
        correctOptionIndex: 2,
        explanation: 'One asset increases (Computer Equipment +£1,500) while another asset decreases by the exact same amount (Bank Cash -£1,500). Net change on Total Assets is £0.',
      },
      {
        id: 'q3',
        question: 'Which of the following is classified as a Current Liability on the Balance Sheet?',
        options: [
          'Accounts Receivable (Trade Debtors)',
          '20-Year Commercial Property Mortgage',
          'Trade Creditors (Accounts Payable due in 30 days)',
          'Computer Server Equipment',
        ],
        correctOptionIndex: 2,
        explanation: 'Trade Creditors are short-term amounts owed to suppliers due within the normal operating cycle (< 12 months), making them Current Liabilities.',
      },
      {
        id: 'q4',
        question: 'If Total Assets are £150,000 and Total Liabilities are £65,000, what is the Owner’s Equity?',
        options: ['£215,000', '£85,000', '£65,000', '£150,000'],
        correctOptionIndex: 1,
        explanation: 'Rearranging the equation: Equity = Assets (£150,000) - Liabilities (£65,000) = £85,000.',
      },
    ],
  },
  {
    id: 'quiz-dead-clic',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-1-3',
    title: 'Double Entry Rules & Debit/Credit Mastery',
    description: 'Verify your proficiency using the DEAD CLIC framework.',
    passingScore: 75,
    questions: [
      {
        id: 'q-dc-1',
        question: 'Which category of accounts normally has a DEBIT balance and increases with a DEBIT entry?',
        options: [
          'Revenue / Income',
          'Capital / Equity',
          'Asset and Expense accounts',
          'Accounts Payable / Liabilities',
        ],
        correctOptionIndex: 2,
        explanation: 'Under DEAD CLIC, D.E.A.D stands for Debit: Expenses, Assets, Drawings. These increase with debit entries.',
      },
      {
        id: 'q-dc-2',
        question: 'When a business pays £500 for office electricity via bank transfer, what is the correct double-entry journal?',
        options: [
          'Debit Bank £500, Credit Electricity Expense £500',
          'Debit Electricity Expense £500, Credit Bank Account £500',
          'Debit Accounts Payable £500, Credit Electricity Expense £500',
          'Debit Owner Capital £500, Credit Electricity Expense £500',
        ],
        correctOptionIndex: 1,
        explanation: 'Electricity is an expense increasing (Debit Expense £500) and Bank is an asset decreasing (Credit Asset £500).',
      },
      {
        id: 'q-dc-3',
        question: 'When an owner withdraws £800 cash from the business for personal use, which account is debited?',
        options: [
          'Salaries Expense',
          'Sales Revenue',
          "Owner's Drawings",
          'Accounts Payable',
        ],
        correctOptionIndex: 2,
        explanation: 'Personal withdrawals by the owner are recorded in Owner\'s Drawings (or Distribution), which carries a normal debit balance reducing equity.',
      },
    ],
  },
  {
    id: 'quiz-bank-rec',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-5-1',
    title: 'Bank Reconciliation Practice Assessment',
    description: 'Evaluate your understanding of bank matching and reconciling timing differences.',
    passingScore: 80,
    questions: [
      {
        id: 'q-br-1',
        question: 'What does the green "Match" button in Xero indicate on the bank reconciliation screen?',
        options: [
          'The bank account is locked',
          'Xero has identified an existing unpaid invoice, bill, or spend money transaction matching the statement amount and date',
          'The transaction is an unapproved draft',
          'The transaction has been deleted',
        ],
        correctOptionIndex: 1,
        explanation: 'Green Match signifies that Xero has located a matching transaction already recorded in the ledger.',
      },
      {
        id: 'q-br-2',
        question: 'A direct debit of £35 for monthly bank service charges appears on the bank statement with no prior bill entered. What is the correct action in Xero?',
        options: [
          'Reject the line item',
          'Use the "Create" tab to enter "Who: Bank", "Account: 404 - Bank Fees", and click OK',
          'Leave it unreconciled until the end of the year',
          'Create a sales invoice for £35',
        ],
        correctOptionIndex: 1,
        explanation: 'Direct charges without a pre-existing bill should be recorded directly using the Create tab to debit Bank Charges expense and credit the bank.',
      },
    ],
  },
  {
    id: 'quiz-sales-entries',
    courseId: 'course-xero-1',
    lessonId: 'les-xero-3-2',
    title: 'Sales Cycle & Receivables Quiz',
    description: 'Check your mastery of invoicing, credit terms, and cash collection entries.',
    passingScore: 75,
    questions: [
      {
        id: 'q-se-1',
        question: 'When a customer pays their outstanding invoice, why does Total Revenue NOT change on the date of cash receipt?',
        options: [
          'Because the revenue was already recognized when the invoice was issued under accrual accounting',
          'Because cash payments are tax-exempt',
          'Because revenue is only recognized at year-end',
          'Because revenue only increases when cash is spent',
        ],
        correctOptionIndex: 0,
        explanation: 'Under the accrual basis of accounting, revenue is recognized when earned (upon issuing the invoice), not when cash is received.',
      },
    ],
  },
];

export const INITIAL_PROGRESS: CourseProgress[] = [
  {
    userId: 'user-student-1',
    courseId: 'course-xero-1',
    completedLessonIds: ['les-xero-1-1', 'les-xero-1-2', 'les-xero-1-3'],
    lastAccessedLessonId: 'les-xero-2-1',
    lastAccessedAt: '2026-02-23T09:45:00Z',
    percentComplete: 38,
  },
  {
    userId: 'user-student-1',
    courseId: 'course-fin-acc-1',
    completedLessonIds: ['les-fin-1-1'],
    lastAccessedLessonId: 'les-fin-2-1',
    lastAccessedAt: '2026-02-20T14:10:00Z',
    percentComplete: 20,
  },
  {
    userId: 'user-student-1',
    courseId: 'course-corp-fin-1',
    completedLessonIds: [],
    lastAccessedLessonId: undefined,
    lastAccessedAt: '2026-02-18T10:00:00Z',
    percentComplete: 0,
  },
];
