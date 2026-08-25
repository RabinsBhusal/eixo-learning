import {
  CommunityThread,
  BlogPost,
  JobPosting,
  CalendarEvent,
} from '../types';

export const INITIAL_COMMUNITY_THREADS: CommunityThread[] = [
  {
    id: 'thread-1',
    title: 'How to handle VAT rounding discrepancies on multi-line foreign currency invoices in Xero?',
    content: 'We frequently import sales invoices from Stripe in EUR/USD into Xero UK. Sometimes there is a £0.01 or £0.02 rounding difference between the calculated 20% standard rate VAT and what Stripe charged. What is the standard accounting practice for posting the penny difference without triggering an audit flag on the MTD VAT return?',
    category: 'xero-software',
    tags: ['Xero', 'VAT', 'MTD', 'Foreign Currency'],
    authorId: 'user-student-1',
    authorName: 'Alex Morgan',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'student',
    upvotes: 28,
    upvotedUserIds: ['user-student-1', 'user-student-2'],
    viewCount: 412,
    commentsCount: 3,
    createdAt: '2026-08-20T10:30:00Z',
    pinned: true,
    isSolved: true,
    comments: [
      {
        id: 'comment-1-1',
        threadId: 'thread-1',
        authorId: 'user-admin-1',
        authorName: 'EIXO Faculty Lead',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        authorRole: 'admin',
        content: 'In standard UK practice, you post the rounding penny directly to a dedicated Nominal Account called "Roundings / Currency Discrepancies" (typically coded under 800-series overheads or directly in Account 804 in Xero chart of accounts) with a "Zero Rated / No VAT" tax rate. HMRC specifically permits reasonable line-by-line rounding adjustments under VAT Notice 700 Section 17.',
        upvotes: 42,
        upvotedUserIds: ['user-student-1', 'user-student-2', 'user-student-3'],
        createdAt: '2026-08-20T11:15:00Z',
        isFacultyVerified: true,
      },
      {
        id: 'comment-1-2',
        threadId: 'thread-1',
        authorId: 'user-student-2',
        authorName: 'David Chen',
        authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        authorRole: 'student',
        content: 'Thanks for this! We had the same issue with Shopify feeds last month and setting up the automated rounding rule in Xero fixed our bank feed matching instantly.',
        upvotes: 7,
        upvotedUserIds: ['user-student-1'],
        createdAt: '2026-08-21T09:40:00Z',
      },
    ],
  },
  {
    id: 'thread-2',
    title: 'DEAD CLIC Rule: Best mental model for remembering Deferred Revenue & Accruals?',
    content: 'I always get slightly tripped up on year-end journal adjustments for prepayments vs accrued expenses. Does anyone have an intuitive framework for remembering whether the deferred balance goes to Dr or Cr without double-guessing myself in exams?',
    category: 'double-entry',
    tags: ['Double Entry', 'DEAD CLIC', 'Accruals', 'Prepayments'],
    authorId: 'user-student-3',
    authorName: 'Sarah Jenkins',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    authorRole: 'student',
    upvotes: 35,
    upvotedUserIds: ['user-student-1', 'user-student-3'],
    viewCount: 560,
    commentsCount: 2,
    createdAt: '2026-08-18T14:20:00Z',
    isSolved: true,
    comments: [
      {
        id: 'comment-2-1',
        threadId: 'thread-2',
        authorId: 'user-admin-1',
        authorName: 'EIXO Faculty Lead',
        authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        authorRole: 'admin',
        content: 'Use this 2-second rule:\n1. Prepayment = You paid money before getting the benefit -> You have an Asset (Right to receive future service) -> Asset increases with DEBIT.\n2. Accrual = You received the service before paying cash -> You have a Liability (Obligation to pay later) -> Liability increases with CREDIT.\n\nAlways ask: "Do I have an asset right now, or an obligation?" That instantly gives you Dr vs Cr.',
        upvotes: 51,
        upvotedUserIds: ['user-student-1', 'user-student-2', 'user-student-3'],
        createdAt: '2026-08-18T15:05:00Z',
        isFacultyVerified: true,
      },
    ],
  },
  {
    id: 'thread-3',
    title: 'ACCA Financial Management (FM) vs CIMA P2: Career comparison for industry vs practice',
    content: 'Currently finishing my foundation level and planning out my chartered route. Would love to hear from professionals working in London or Remote UK about whether ACCA or CIMA is preferred for FP&A / Commercial Finance roles.',
    category: 'acca-cima-exams',
    tags: ['ACCA', 'CIMA', 'Career', 'Chartered'],
    authorId: 'user-student-2',
    authorName: 'David Chen',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    authorRole: 'student',
    upvotes: 19,
    upvotedUserIds: [],
    viewCount: 388,
    commentsCount: 1,
    createdAt: '2026-08-15T18:00:00Z',
    comments: [
      {
        id: 'comment-3-1',
        threadId: 'thread-3',
        authorId: 'user-student-1',
        authorName: 'Alex Morgan',
        authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        authorRole: 'student',
        content: 'In my experience at Northfield Advisory, CIMA is heavily focused on business strategy, budgeting, and performance management for corporates, whereas ACCA gives you great versatility for both public practice (audit/tax) and corporate finance. Both command equal £55k+ salaries once qualified!',
        upvotes: 14,
        upvotedUserIds: ['user-student-2'],
        createdAt: '2026-08-16T10:10:00Z',
      },
    ],
  },
  {
    id: 'thread-4',
    title: 'Top technical questions asked in Junior Management Accountant interviews (2026)',
    content: 'Just had 3 interviews with mid-tier firms in Manchester. Here are the exact scenario questions they gave me during the live Excel and Xero test: 1) Reconcile a £14,000 unallocated receipt, 2) Variance analysis on budget vs actual materials cost, 3) Explain the difference between EBIT and Operating Cash Flow.',
    category: 'career-interviews',
    tags: ['Interview', 'Management Accounting', 'Excel Test', 'Xero Test'],
    authorId: 'user-student-1',
    authorName: 'Alex Morgan',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    authorRole: 'student',
    upvotes: 64,
    upvotedUserIds: ['user-student-1', 'user-student-2', 'user-student-3'],
    viewCount: 890,
    commentsCount: 2,
    createdAt: '2026-08-12T09:15:00Z',
    pinned: true,
    comments: [],
  },
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'mastering-xero-bank-reconciliation-2026',
    title: 'Mastering Xero Bank Reconciliation: The Complete Step-by-Step Practical Guide',
    excerpt: 'Learn how to automate bank rules, handle multi-currency transfers, clear split payments, and fix unallocated receipts in Xero like a seasoned management accountant.',
    content: `
### Why Bank Reconciliation is the Heart of Cloud Accounting

In cloud accounting software like Xero, QuickBooks, and Sage, the bank feed is the single source of financial truth. If your bank feed does not reconcile perfectly to the penny against your bank statement, every downstream report—including your Profit & Loss statement, Balance Sheet, and HMRC Making Tax Digital (MTD) VAT returns—will be flawed.

#### 1. Setting Up High-Efficiency Bank Rules in Xero
When handling repetitive transactions like software subscriptions (e.g. Adobe, AWS, Google Workspace) or merchant fees (e.g. Stripe, SumUp), creating automated Bank Rules reduces manual data entry by up to 80%.

- **Condition Matching**: Match on payee name or bank reference keywords.
- **Split Allocations**: Automatically split 80% to Office Expenses and 20% to VAT on standard inputs.
- **Rule Order**: Ensure high-priority specific rules run before generic catch-all rules.

#### 2. Resolving the "Find & Match" Split Invoice Conundrum
When a customer pays £5,000 for three separate invoices (£2,000, £2,000, and £1,000 minus a £50 early settlement discount), standard one-click matching will fail.
1. Click **Find & Match** on the right side of the reconciliation screen.
2. Tick each outstanding sales invoice.
3. Click **Adjustments > Minor Adjustment** to post the settlement discount directly to the discounts allowed nominal ledger.

#### 3. Monthly Audit Checklist
- Run the **Bank Reconciliation Summary Report** on the last working day of each calendar month.
- Verify the *Statement Balance* equals the *Bank Statement Closing Balance*.
- Investigate any *Outstanding Payments* older than 30 days.
    `,
    coverImage: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
    category: 'Cloud Software',
    readTime: '6 min read',
    authorName: 'Marcus Vance, FCA',
    authorTitle: 'Head of Practical Accounting Curriculum',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    publishedAt: '2026-08-19',
    tags: ['Xero', 'Bookkeeping', 'Cloud Accounting', 'Reconciliation'],
    seoKeywords: ['Xero tutorial', 'bank reconciliation Xero guide', 'cloud accounting UK', 'how to reconcile in Xero'],
    relatedCourseId: 'course-xero-1',
    views: 1420,
    likes: 89,
  },
  {
    id: 'blog-2',
    slug: 'dead-clic-rule-double-entry-accounting',
    title: 'The DEAD CLIC Rule: How to Never Confuse Debits and Credits Again',
    excerpt: 'Double-entry bookkeeping is the universal language of business. Here is the definitive mnemonic used by top accounting faculties to master T-accounts in minutes.',
    content: `
### The Universal Mnemonic: DEAD CLIC

Double-entry bookkeeping balances every single business transaction so that Total Debits strictly equal Total Credits.

#### What does DEAD stand for? (Debit to Increase)
- **D**ebit: Increases these accounts:
- **E**xpenses (Rent, salaries, marketing, utilities)
- **A**ssets (Cash, bank balances, accounts receivable/debtors, machinery, inventory)
- **D**rawings / Dividends (Distributions taken by owners)

#### What does CLIC stand for? (Credit to Increase)
- **C**redit: Increases these accounts:
- **L**iabilities (Bank loans, accounts payable/creditors, accrued expenses, VAT owed to HMRC)
- **I**ncome / Revenue (Consulting fees, product sales, interest received)
- **C**apital / Equity (Shareholder investment, retained earnings)

#### Practical Application Example
**Scenario**: Your business purchases a new £1,500 MacBook on credit from an IT supplier.
1. What did the company receive? A new computer (an **Asset**). Assets increase with **DEBIT** -> *Dr IT Equipment £1,500*.
2. What does the company owe? Money to the supplier (a **Liability**). Liabilities increase with **CREDIT** -> *Cr Trade Creditors £1,500*.
    `,
    coverImage: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80',
    category: 'Accounting Fundamentals',
    readTime: '5 min read',
    authorName: 'Dr. Helen Davies, ACA',
    authorTitle: 'Senior Accounting Lecturer & Audit Specialist',
    authorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    publishedAt: '2026-08-14',
    tags: ['Double Entry', 'DEAD CLIC', 'T-Accounts', 'Bookkeeping Basics'],
    seoKeywords: ['DEAD CLIC accounting rule', 'debits and credits explained', 'double entry bookkeeping guide', 'T account tutorial'],
    relatedCourseId: 'course-fin-acc-1',
    views: 2890,
    likes: 215,
  },
  {
    id: 'blog-3',
    slug: 'uk-mtd-vat-returns-compliance-guide',
    title: 'HMRC Making Tax Digital (MTD) for VAT: Compliance, Boxes 1 to 9 Breakdown',
    excerpt: 'A complete breakdown of digital record-keeping rules, automated API submissions, and common pitfalls in Boxes 1 through 9 on UK VAT returns.',
    content: `
### Understanding the 9-Box UK VAT Return

Under Making Tax Digital (MTD) legislation, businesses must maintain electronic accounting software and submit returns directly through HMRC-compatible API software like Xero or QuickBooks.

#### The 9 Boxes Decoded:
- **Box 1**: VAT due on sales and other outputs.
- **Box 2**: VAT due on acquisitions from EU/overseas (if applicable).
- **Box 3**: Total VAT due (Box 1 + Box 2).
- **Box 4**: VAT reclaimed on purchases and other inputs.
- **Box 5**: Net VAT to pay to HMRC or reclaim (Box 3 minus Box 4).
- **Box 6**: Total value of sales and all other outputs excluding any VAT.
- **Box 7**: Total value of purchases and all other inputs excluding any VAT.
- **Box 8**: Total value of all supplies of goods and related costs to EC Member States.
- **Box 9**: Total value of all acquisitions of goods and related costs from EC Member States.
    `,
    coverImage: 'https://images.unsplash.com/photo-1586486855514-8c633cc6fd38?w=1000&auto=format&fit=crop&q=80',
    category: 'Tax & Compliance',
    readTime: '7 min read',
    authorName: 'Marcus Vance, FCA',
    authorTitle: 'Head of Practical Accounting Curriculum',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    publishedAt: '2026-08-08',
    tags: ['VAT', 'HMRC', 'MTD', 'Tax Compliance UK'],
    seoKeywords: ['HMRC VAT 9 boxes explained', 'Making Tax Digital Xero VAT return', 'UK VAT return guide', 'VAT box 1 to 9'],
    relatedCourseId: 'course-xero-1',
    views: 1980,
    likes: 132,
  },
];

export const INITIAL_JOB_POSTINGS: JobPosting[] = [
  {
    id: 'job-1',
    title: 'Junior Management Accountant',
    company: 'Northfield Financial Advisory LLP',
    companyLogo: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=100&auto=format&fit=crop&q=80',
    location: 'London, UK (Hybrid 2 days in office)',
    jobType: 'Hybrid',
    experienceLevel: 'Junior',
    salaryMin: 32000,
    salaryMax: 38000,
    currency: '£',
    postedAt: '2026-08-21',
    deadline: '2026-09-30',
    description: 'We are seeking an ambitious Junior Management Accountant with practical hands-on experience in Xero and advanced Excel to assist with month-end close, bank reconciliations, and variance reporting for a portfolio of high-growth tech clients.',
    keyResponsibilities: [
      'Perform monthly multi-currency bank reconciliations and manage automated bank rules in Xero',
      'Prepare monthly draft management accounts including prepayments and accrual schedules',
      'Assist in filing quarterly Making Tax Digital (MTD) VAT returns to HMRC',
      'Maintain the fixed asset register and post monthly depreciation journals',
      'Liaise with client founders regarding payables and cash runway forecasts',
    ],
    requirements: [
      'Studying towards ACCA / CIMA / AAT Level 4 or certified by EIXO Practical Accounting Track',
      'Demonstrated proficiency in Xero Cloud Accounting (bank feeds, sales, bills, MTD VAT)',
      'Solid double-entry fundamentals (DEAD CLIC, balance sheet reconciliation)',
      'Strong Excel capabilities (XLOOKUP, SUMIFS, Pivot Tables)',
    ],
    softwareRequired: ['Xero', 'Excel'],
    featured: true,
    applicantsCount: 18,
  },
  {
    id: 'job-2',
    title: 'Accounts Assistant & Bookkeeper',
    company: 'Vanguard Retail Holdings',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    location: 'Manchester, UK (Hybrid)',
    jobType: 'Hybrid',
    experienceLevel: 'Graduate / Trainee',
    salaryMin: 26000,
    salaryMax: 30000,
    currency: '£',
    postedAt: '2026-08-19',
    deadline: '2026-09-25',
    description: 'Great entry-level opportunity for a recent graduate or career switcher with verified practical bookkeeping skills to join our growing finance team.',
    keyResponsibilities: [
      'Processing supplier invoices and matching purchase orders in QuickBooks and Xero',
      'Reconciling weekly credit card and POS payment gateway transactions',
      'Credit control communication with commercial trade accounts',
      'Assisting the Senior Financial Controller with year-end audit packs',
    ],
    requirements: [
      'AAT / ACCA early stages or completed EIXO certification in Practical Bookkeeping',
      'Familiarity with QuickBooks Online and Xero',
      'High numerical accuracy and attention to detail',
    ],
    softwareRequired: ['QuickBooks', 'Xero', 'Excel'],
    featured: false,
    applicantsCount: 32,
  },
  {
    id: 'job-3',
    title: 'Corporate Financial Analyst (FP&A)',
    company: 'Apex Media & Technology Partners',
    companyLogo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=100&auto=format&fit=crop&q=80',
    location: 'Remote UK / London HQ',
    jobType: 'Remote UK',
    experienceLevel: 'Mid-Level',
    salaryMin: 48000,
    salaryMax: 56000,
    currency: '£',
    postedAt: '2026-08-17',
    deadline: '2026-10-15',
    description: 'Looking for a dynamic FP&A Financial Analyst to lead 3-statement financial modelling, capital budgeting, and DCF investment valuations for media investments.',
    keyResponsibilities: [
      'Construct dynamic 3-statement integrated forecast models and DCF valuations in Excel',
      'Analyze monthly budget vs actual variances across operational business units',
      'Prepare executive board presentation decks highlighting key SaaS financial metrics (ARR, CAC, LTV, Churn)',
    ],
    requirements: [
      'Part-qualified or Qualified ACCA / CIMA / ACA / CFA Level 1',
      'Proven expertise in institutional financial modelling in Excel',
      'Strong communication skills for presenting to leadership',
    ],
    softwareRequired: ['Excel', 'PowerBI'],
    featured: true,
    applicantsCount: 24,
  },
  {
    id: 'job-4',
    title: 'Senior Cloud Accounting Specialist',
    company: 'Kensington Chartered Accountants',
    companyLogo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80',
    location: 'London (City of London)',
    jobType: 'Full-Time',
    experienceLevel: 'Senior',
    salaryMin: 55000,
    salaryMax: 65000,
    currency: '£',
    postedAt: '2026-08-14',
    deadline: '2026-09-28',
    description: 'Lead client cloud accounting onboarding, complex app integrations (Dext, Stripe, Unleashed), and management reporting across our SME client portfolio.',
    keyResponsibilities: [
      'Managing client Xero, Sage, and QuickBooks migrations',
      'Overseeing junior accountants and reviewing quarterly VAT returns',
      'Designing custom PowerBI and Fathom management dashboards',
    ],
    requirements: [
      'ACCA / ACA Qualified with 3+ years in UK practice',
      'Certified Xero Advisor & QuickBooks ProAdvisor',
    ],
    softwareRequired: ['Xero', 'Sage', 'QuickBooks', 'Excel'],
    featured: false,
    applicantsCount: 11,
  },
];

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'event-1',
    title: 'Live Workshop: Advanced Xero Month-End Adjustments & MTD VAT Filing',
    description: 'Join FCA Marcus Vance for a live interactive screen walkthrough solving complex multi-currency bank feeds, prepayments schedules, and live HMRC MTD VAT submission.',
    eventType: 'live-masterclass',
    startTime: '2026-08-26T18:00:00Z',
    endTime: '2026-08-26T19:30:00Z',
    tutorName: 'Marcus Vance, FCA',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/eixo-xero-masterclass',
    location: 'Microsoft Teams Live Stream / EIXO Campus',
    courseId: 'course-xero-1',
    attendeesCount: 78,
    isRegistered: true,
  },
  {
    id: 'event-2',
    title: 'Faculty Office Hours: 1-on-1 Q&A on Double-Entry & ACCA Exam Topics',
    description: 'Open drop-in office hours with Dr. Helen Davies. Bring your T-account balancing questions, mock exam doubts, and technical accounting dilemmas.',
    eventType: 'office-hours',
    startTime: '2026-08-28T14:00:00Z',
    endTime: '2026-08-28T15:30:00Z',
    tutorName: 'Dr. Helen Davies, ACA',
    tutorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/eixo-office-hours',
    location: 'Microsoft Teams Video Call',
    courseId: 'course-fin-acc-1',
    attendeesCount: 34,
    isRegistered: false,
  },
  {
    id: 'event-3',
    title: 'Excel Financial Modelling Speedrun: Building a 3-Statement Model in 45 Mins',
    description: 'Fast-paced masterclass demonstrating professional shortcut formatting, dynamic circular breaker formulas, and debt sweep mechanics in Excel.',
    eventType: 'exam-workshop',
    startTime: '2026-09-02T17:30:00Z',
    endTime: '2026-09-02T19:00:00Z',
    tutorName: 'Marcus Vance, FCA',
    tutorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    meetingLink: 'https://teams.microsoft.com/l/meetup-join/eixo-excel-speedrun',
    location: 'Microsoft Teams Live Stream',
    courseId: 'course-corp-fin-1',
    attendeesCount: 92,
    isRegistered: true,
  },
  {
    id: 'event-4',
    title: 'Student Study Group: Junior Accountant Interview Case Study Preparation',
    description: 'Peer-led group study session walking through real Excel technical tests from Deloitte, PwC, and mid-tier UK accounting practices.',
    eventType: 'study-group',
    startTime: '2026-09-05T11:00:00Z',
    endTime: '2026-09-05T12:30:00Z',
    tutorName: 'Alex Morgan (Peer Lead)',
    tutorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    meetingLink: 'https://meet.google.com/abc-eixo-study',
    location: 'Google Meet Campus Room',
    attendeesCount: 45,
    isRegistered: false,
  },
];
