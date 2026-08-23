import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { GoogleSlidesViewer, CURATED_SLIDE_DECKS } from '../../components/course/GoogleSlidesViewer';
import {
  FileSpreadsheet,
  FileText,
  Download,
  Search,
  Filter,
  CheckCircle2,
  FolderOpen,
  Presentation,
  ExternalLink,
  Layers,
} from 'lucide-react';

export const ResourcesHubPage: React.FC = () => {
  const { resources, courses } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [activeViewMode, setActiveViewMode] = useState<'files' | 'slides'>('slides');

  const filteredResources = resources.filter((res) => {
    if (selectedType !== 'all' && res.type !== selectedType) return false;
    if (selectedCourse !== 'all' && res.courseId !== selectedCourse) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = res.name.toLowerCase().includes(q);
      const matchDesc = res.description.toLowerCase().includes(q);
      const matchFile = res.filename.toLowerCase().includes(q);
      return matchName || matchDesc || matchFile;
    }
    return true;
  });

  const handleDownload = (filename: string) => {
    alert(`Downloading practice resource file: ${filename}\nPractice datasets include sample charts of accounts, bank statement CSVs, and pre-formatted working papers.`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold uppercase tracking-wider">
              Academic Hub
            </span>
            <span className="text-xs text-slate-400 font-medium">Google Workspace & PDF Decks</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Lecture Slides & Resources Hub
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Access interactive Google Slides presentations, PDF lecture decks, and downloadable Excel working models.
          </p>
        </div>

        {/* View Switcher Tabs */}
        <div className="flex items-center p-1 bg-[#0b0f19] border border-white/10 rounded-xl self-start sm:self-auto">
          <button
            onClick={() => setActiveViewMode('slides')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeViewMode === 'slides'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Presentation className="w-3.5 h-3.5" />
            <span>Google Slides Decks</span>
          </button>
          <button
            onClick={() => setActiveViewMode('files')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              activeViewMode === 'files'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Practice Datasets & Files</span>
          </button>
        </div>
      </div>

      {/* 1. GOOGLE SLIDES INTEGRATION TAB */}
      {activeViewMode === 'slides' && (
        <div className="space-y-6">
          <GoogleSlidesViewer />

          {/* All Curated Google Slides Directory */}
          <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
            <div className="border-b border-white/10 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-white">All Syllabus Google Slides & PDF Decks</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Direct links to full presentation decks with PDF export capabilities.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 font-bold">
                {CURATED_SLIDE_DECKS.length} Master Decks
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {CURATED_SLIDE_DECKS.map((deck) => (
                <div
                  key={deck.id}
                  className="p-4 bg-[#12182b] hover:bg-[#151e36] rounded-xl border border-white/10 transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold uppercase">
                        {deck.category}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">{deck.totalSlides} Slides</span>
                    </div>
                    <h4 className="text-xs font-bold text-white leading-snug">{deck.title}</h4>
                    <p className="text-[11px] text-slate-300 leading-relaxed">{deck.description}</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between gap-2">
                    <a
                      href={deck.presentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-[#17223b] hover:bg-[#1f2e50] border border-white/10 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3 text-amber-400" />
                      <span>Google Slides</span>
                    </a>

                    <a
                      href={deck.pdfExportUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                    >
                      <Download className="w-3 h-3" />
                      <span>PDF Deck</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. PRACTICE FILES AND DATASETS TAB */}
      {activeViewMode === 'files' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10 shadow-lg flex flex-wrap items-center justify-between gap-4 text-xs">
            {/* Search */}
            <div className="w-full sm:w-72 relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search templates and practice files..."
                className="w-full text-xs pl-8 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
            </div>

            {/* Filter controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1 text-slate-400 font-semibold">
                <Filter className="w-3.5 h-3.5" />
                <span>Filter:</span>
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="p-2 bg-[#12182b] border border-white/10 rounded-xl font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
              >
                <option value="all" className="bg-[#0b0f19] text-white">All File Types</option>
                <option value="excel" className="bg-[#0b0f19] text-white">Excel (.xlsx)</option>
                <option value="pdf" className="bg-[#0b0f19] text-white">PDF Guides</option>
                <option value="csv" className="bg-[#0b0f19] text-white">CSV Datasets</option>
                <option value="zip" className="bg-[#0b0f19] text-white">ZIP Packages</option>
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="p-2 bg-[#12182b] border border-white/10 rounded-xl font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 max-w-[200px]"
              >
                <option value="all" className="bg-[#0b0f19] text-white">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id} className="bg-[#0b0f19] text-white">
                    {c.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Resources Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredResources.map((res) => {
              const course = courses.find((c) => c.id === res.courseId);

              return (
                <div
                  key={res.id}
                  className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-lg hover:border-emerald-500/40 hover:shadow-[0_0_20px_rgba(16,185,129,0.15)] transition-all flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl">
                          {res.type === 'excel' ? (
                            <FileSpreadsheet className="w-6 h-6" />
                          ) : (
                            <FileText className="w-6 h-6" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-white leading-snug">{res.name}</h3>
                          <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                            {res.filename} • {res.size}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-0.5 bg-[#12182b] text-emerald-300 border border-white/10 rounded text-[10px] font-bold uppercase">
                        {res.type}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">{res.description}</p>

                    {course && (
                      <div className="text-[11px] text-slate-400 bg-[#12182b] p-2.5 rounded-xl border border-white/10 flex items-center gap-1.5 truncate">
                        <span className="font-semibold text-emerald-400">Course:</span>
                        <span className="truncate text-slate-200">{course.title}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verified Dataset</span>
                    </span>

                    <button
                      onClick={() => handleDownload(res.filename)}
                      className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredResources.length === 0 && (
            <div className="text-center py-16 bg-[#0b0f19] rounded-2xl border border-white/10 p-8 space-y-3 shadow-xl">
              <FolderOpen className="w-12 h-12 text-slate-600 mx-auto" />
              <h3 className="text-sm font-bold text-white">No resources found</h3>
              <p className="text-xs text-slate-400">Try adjusting your filter settings or search terms.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
