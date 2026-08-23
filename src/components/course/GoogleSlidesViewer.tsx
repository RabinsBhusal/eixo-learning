import React, { useState } from 'react';
import {
  Presentation,
  ExternalLink,
  Download,
  Maximize2,
  Minimize2,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Layers,
  FileText,
  Link2,
} from 'lucide-react';

interface GoogleSlidesViewerProps {
  courseTitle?: string;
  lessonTitle?: string;
  initialSlideUrl?: string;
  initialPdfUrl?: string;
}

// Curated official Google Slides decks for EIXO Learning courses
export const CURATED_SLIDE_DECKS = [
  {
    id: 'xero-arch',
    title: 'Xero Cloud Architecture & Nominal Coding',
    category: 'Cloud Accounting',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vT1gP8f4R5W6X7Y8Z9-sample-xero-mastery/embed?start=false&loop=false&delayms=3000',
    presentUrl: 'https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/present',
    pdfExportUrl: 'https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/export/pdf',
    totalSlides: 24,
    description: 'Complete visual walkthrough of nominal ledger mapping, bank feed reconciliation, and audit trails.',
  },
  {
    id: 'double-entry',
    title: 'Double Entry Bookkeeping & DEAD CLIC Rules',
    category: 'Accounting Principles',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vT2aB3c4D5e6F7g8H9-sample-double-entry/embed?start=false&loop=false&delayms=3000',
    presentUrl: 'https://docs.google.com/presentation/d/1jFzUfVvC_sample_debit_credit/present',
    pdfExportUrl: 'https://docs.google.com/presentation/d/1jFzUfVvC_sample_debit_credit/export/pdf',
    totalSlides: 18,
    description: 'Interactive visual equations explaining debit/credit dual-entry mechanism, T-accounts, and Trial Balance.',
  },
  {
    id: 'vat-mtd',
    title: 'HMRC Making Tax Digital (MTD) VAT 100 Deck',
    category: 'Tax & Compliance',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vT3xY4z5A6b7C8d9E0-sample-vat-deck/embed?start=false&loop=false&delayms=3000',
    presentUrl: 'https://docs.google.com/presentation/d/1kLxWz_sample_vat_rules/present',
    pdfExportUrl: 'https://docs.google.com/presentation/d/1kLxWz_sample_vat_rules/export/pdf',
    totalSlides: 20,
    description: 'Detailed analysis of 9-box VAT return, input/output VAT treatment, and zero-rated vs exempt transactions.',
  },
  {
    id: 'fin-statements',
    title: 'Financial Statements & Balance Sheet Anatomy',
    category: 'Financial Reporting',
    embedUrl: 'https://docs.google.com/presentation/d/e/2PACX-1vT4mN5o6P7q8R9s0T1-sample-fin-report/embed?start=false&loop=false&delayms=3000',
    presentUrl: 'https://docs.google.com/presentation/d/1mNoPq_sample_financial_statements/present',
    pdfExportUrl: 'https://docs.google.com/presentation/d/1mNoPq_sample_financial_statements/export/pdf',
    totalSlides: 32,
    description: 'Income Statement (P&L), Balance Sheet, and Cash Flow Statement structural interconnectivity.',
  },
];

export const GoogleSlidesViewer: React.FC<GoogleSlidesViewerProps> = ({
  courseTitle = 'Xero Cloud Accounting Masterclass',
  lessonTitle = 'Lecture Presentation & PDF Deck',
  initialSlideUrl,
  initialPdfUrl,
}) => {
  const [selectedDeckId, setSelectedDeckId] = useState<string>('xero-arch');
  const [customSlideUrl, setCustomSlideUrl] = useState<string>('');
  const [activeCustomUrl, setActiveCustomUrl] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);

  const currentDeck = CURATED_SLIDE_DECKS.find((d) => d.id === selectedDeckId) || CURATED_SLIDE_DECKS[0];

  // Derive embed URL
  const getEmbedUrl = () => {
    if (activeCustomUrl) {
      // If user provided a standard Google Slides link (e.g. /edit, /present, or bare URL), convert to /embed
      if (activeCustomUrl.includes('docs.google.com/presentation/d/')) {
        const matches = activeCustomUrl.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
        if (matches && matches[1]) {
          return `https://docs.google.com/presentation/d/${matches[1]}/embed?start=false&loop=false&delayms=3000`;
        }
      }
      return activeCustomUrl;
    }
    return currentDeck.embedUrl;
  };

  const getPresentUrl = () => {
    if (activeCustomUrl && activeCustomUrl.includes('docs.google.com/presentation/d/')) {
      const matches = activeCustomUrl.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
      if (matches && matches[1]) {
        return `https://docs.google.com/presentation/d/${matches[1]}/present`;
      }
    }
    return currentDeck.presentUrl;
  };

  const getPdfExportUrl = () => {
    if (activeCustomUrl && activeCustomUrl.includes('docs.google.com/presentation/d/')) {
      const matches = activeCustomUrl.match(/\/presentation\/d\/([a-zA-Z0-9_-]+)/);
      if (matches && matches[1]) {
        return `https://docs.google.com/presentation/d/${matches[1]}/export/pdf`;
      }
    }
    return currentDeck.pdfExportUrl;
  };

  const handleApplyCustomUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (customSlideUrl.trim()) {
      setActiveCustomUrl(customSlideUrl.trim());
      setShowUrlInput(false);
    }
  };

  const handleCopyLink = () => {
    const url = getPresentUrl();
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-[#050508] p-4 sm:p-6 flex flex-col justify-between overflow-y-auto' : ''}`}>
      
      {/* Top Header Controls Bar */}
      <div className="bg-[#0b101d] border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
            <Presentation className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                Google Slides Integration
              </span>
              <span className="text-xs text-slate-400 font-medium hidden md:inline">
                • {currentDeck.totalSlides} Interactive Slides
              </span>
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
              {activeCustomUrl ? 'Custom Linked Google Slides Deck' : currentDeck.title}
            </h3>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Deck selector dropdown */}
          <select
            value={activeCustomUrl ? 'custom' : selectedDeckId}
            onChange={(e) => {
              if (e.target.value === 'custom') {
                setShowUrlInput(true);
              } else {
                setSelectedDeckId(e.target.value);
                setActiveCustomUrl(null);
              }
            }}
            className="bg-[#12182b] border border-white/10 rounded-xl text-xs text-slate-200 px-3 py-2 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          >
            {CURATED_SLIDE_DECKS.map((d) => (
              <option key={d.id} value={d.id}>
                {d.title}
              </option>
            ))}
            <option value="custom">+ Link Custom Google Slides URL...</option>
          </select>

          {/* Open in Google Slides */}
          <a
            href={getPresentUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-[#141d33] hover:bg-[#1a2642] border border-white/10 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            title="Open in official Google Slides viewer"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Google Slides</span>
          </a>

          {/* Download PDF Export */}
          <a
            href={getPdfExportUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
            title="Download slide deck in PDF format"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF Deck</span>
          </a>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 bg-[#12182b] hover:bg-[#1a2442] border border-white/10 rounded-xl text-slate-300 hover:text-white transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Slides'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Custom Link Input Modal/Bar */}
      {showUrlInput && (
        <form onSubmit={handleApplyCustomUrl} className="p-4 bg-[#0d1322] border border-amber-500/30 rounded-2xl flex flex-col sm:flex-row items-center gap-3 animate-in fade-in">
          <div className="flex-1 w-full">
            <label className="block text-[11px] font-bold text-amber-300 uppercase tracking-wide mb-1">
              Link Your Own Google Slides Presentation URL:
            </label>
            <input
              type="url"
              value={customSlideUrl}
              onChange={(e) => setCustomSlideUrl(e.target.value)}
              placeholder="https://docs.google.com/presentation/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit"
              className="w-full bg-[#080d1a] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-amber-400"
              required
            />
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto pt-2 sm:pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-colors shadow-md"
            >
              Embed Deck
            </button>
            <button
              type="button"
              onClick={() => setShowUrlInput(false)}
              className="px-3 py-2 text-xs text-slate-400 hover:text-white"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Google Slides Presentation Frame */}
      <div className={`relative rounded-2xl bg-black border border-white/10 shadow-2xl overflow-hidden ${
        isFullscreen ? 'flex-1 min-h-[500px]' : 'aspect-video w-full min-h-[380px] sm:min-h-[480px]'
      }`}>
        
        {/* Interactive Google Slides Embed Frame */}
        <iframe
          src={getEmbedUrl()}
          title="Google Slides Presentation"
          className="w-full h-full border-0 absolute inset-0 rounded-2xl"
          allowFullScreen
          allow="autoplay; fullscreen"
        />

        {/* Fallback Overlay / Presentation Controller Helper in case iframe is sandboxed */}
        <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20 pointer-events-auto bg-[#070b14]/90 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-xl shadow-lg">
          <span className="text-[11px] text-slate-300 font-medium">Google Slides Engine</span>
          <button
            onClick={handleCopyLink}
            className="p-1 text-slate-400 hover:text-white transition-colors"
            title="Copy presentation share link"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
          <a
            href={getPresentUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>Present Mode</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* Slide Deck Navigation Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-2">
        {CURATED_SLIDE_DECKS.map((deck) => {
          const isSelected = !activeCustomUrl && selectedDeckId === deck.id;
          return (
            <button
              key={deck.id}
              onClick={() => {
                setSelectedDeckId(deck.id);
                setActiveCustomUrl(null);
              }}
              className={`p-3 rounded-xl border text-left transition-all relative ${
                isSelected
                  ? 'bg-amber-500/10 border-amber-500/60 shadow-[0_0_15px_rgba(245,158,11,0.15)] ring-1 ring-amber-500/40'
                  : 'bg-[#0b0f19] hover:bg-[#12182b] border-white/10'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  {deck.category}
                </span>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <p className="text-xs font-bold text-white mt-1 line-clamp-1">{deck.title}</p>
              <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                {deck.description}
              </p>
              <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                <span>{deck.totalSlides} Slides</span>
                <span className="text-emerald-400 font-sans font-medium flex items-center gap-0.5">
                  <Download className="w-2.5 h-2.5" /> PDF
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
