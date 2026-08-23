import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CourseResource } from '../../types';
import { CURATED_SLIDE_DECKS } from '../../components/course/GoogleSlidesViewer';
import {
  FileSpreadsheet,
  FileText,
  Plus,
  Trash2,
  Download,
  Search,
  CheckCircle2,
  X,
  Presentation,
  ExternalLink,
  Link2,
} from 'lucide-react';

export const AdminResourcesPage: React.FC = () => {
  const { resources, courses, addResource, deleteResource } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isAddingSlideDeck, setIsAddingSlideDeck] = useState(false);

  // New Resource Form
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [courseId, setCourseId] = useState(courses[0]?.id || '');
  const [type, setType] = useState<'excel' | 'pdf' | 'csv' | 'zip'>('excel');
  const [filename, setFilename] = useState('');
  const [size, setSize] = useState('1.2 MB');

  // New Slide Deck Form
  const [slideTitle, setSlideTitle] = useState('');
  const [slideCategory, setSlideCategory] = useState('Cloud Accounting');
  const [slideUrl, setSlideUrl] = useState('');
  const [slideTotal, setSlideTotal] = useState(20);

  const filteredResources = resources.filter((res) => {
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      return (
        res.name.toLowerCase().includes(q) ||
        res.description.toLowerCase().includes(q) ||
        res.filename.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleAddResource = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !filename) return;

    addResource({
      name,
      description,
      courseId,
      type,
      filename,
      size,
    });

    setIsAdding(false);
    setName('');
    setDescription('');
    setFilename('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold uppercase">
              Faculty Command
            </span>
            <span className="text-xs text-slate-400">Curriculum Materials & Google Slides</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Slides & Learning Resources Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Manage linked Google Slides presentation decks, lecture PDF exports, and student exercise files.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAdding(true)}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Upload Practice File</span>
          </button>
        </div>
      </div>

      {/* 1. GOOGLE SLIDES DECKS REPOSITORY */}
      <div className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-xl">
              <Presentation className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Google Slides Presentation Decks & PDF Exports</h2>
              <p className="text-xs text-slate-400">Master slide presentations linked into the student player and resource library.</p>
            </div>
          </div>
          <span className="text-xs font-mono text-amber-400 font-bold px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30">
            {CURATED_SLIDE_DECKS.length} Active Google Slide Decks
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CURATED_SLIDE_DECKS.map((deck) => (
            <div
              key={deck.id}
              className="p-4 bg-[#12182b] rounded-xl border border-white/10 space-y-3 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded text-[10px] font-bold uppercase">
                    {deck.category}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">{deck.totalSlides} Slides</span>
                </div>
                <h4 className="text-xs font-bold text-white mt-1.5">{deck.title}</h4>
                <p className="text-[11px] text-slate-300 mt-1 leading-relaxed">{deck.description}</p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between gap-2">
                <a
                  href={deck.presentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-[#17223b] hover:bg-[#1f2e50] border border-white/10 text-slate-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-amber-400" />
                  <span>Preview in Slides</span>
                </a>
                <a
                  href={deck.pdfExportUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Download className="w-3 h-3" />
                  <span>PDF Export</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. PRACTICE FILES REPOSITORY */}
      <div className="space-y-4">
        {/* Search */}
        <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10 shadow-lg flex items-center justify-between gap-4">
          <div className="w-full sm:w-80 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search templates, datasets..."
              className="w-full text-xs pl-8 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>
          <span className="text-xs text-slate-400">{filteredResources.length} Files</span>
        </div>

        {/* Table */}
        <div className="bg-[#0b0f19] rounded-2xl border border-white/10 shadow-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0e1424] text-slate-400 font-semibold border-b border-white/10">
              <tr>
                <th className="px-5 py-3">Resource Name</th>
                <th className="px-5 py-3">Associated Course</th>
                <th className="px-5 py-3">File Format & Size</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredResources.map((res) => {
                const course = courses.find((c) => c.id === res.courseId);

                return (
                  <tr key={res.id} className="hover:bg-[#12182b]/60 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl shrink-0">
                          {res.type === 'excel' ? (
                            <FileSpreadsheet className="w-5 h-5" />
                          ) : (
                            <FileText className="w-5 h-5" />
                          )}
                        </div>
                        <div>
                          <p className="font-bold text-white">{res.name}</p>
                          <p className="text-[10px] text-slate-400 max-w-sm truncate">{res.description}</p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      <span className="font-medium text-white">{course?.title || 'Global Resource'}</span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="px-2.5 py-1 bg-[#12182b] text-emerald-300 border border-white/10 rounded-md font-mono text-[10px] uppercase font-bold">
                        {res.type} ({res.size})
                      </span>
                    </td>

                    <td className="px-5 py-4 text-right space-x-2">
                      <button
                        onClick={() => deleteResource(res.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 rounded-lg hover:bg-rose-500/10 transition-colors"
                        title="Delete resource"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* UPLOAD MODAL */}
      {isAdding && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] rounded-2xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h2 className="text-lg font-bold text-white">Add Practice File</h2>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddResource} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Resource Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Bank Reconciliations Practice File"
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Target Course</label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                >
                  {courses.map((c) => (
                    <option key={c.id} value={c.id} className="bg-[#0b0f19] text-white">
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Format</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value as any)}
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  >
                    <option value="excel" className="bg-[#0b0f19] text-white">Excel (.xlsx)</option>
                    <option value="pdf" className="bg-[#0b0f19] text-white">PDF Guide</option>
                    <option value="csv" className="bg-[#0b0f19] text-white">CSV Data</option>
                    <option value="zip" className="bg-[#0b0f19] text-white">ZIP Archive</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Filename</label>
                  <input
                    type="text"
                    required
                    value={filename}
                    onChange={(e) => setFilename(e.target.value)}
                    placeholder="e.g. practice_01.xlsx"
                    className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white font-mono focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-300 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Explaining what the file contains..."
                  className="w-full p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 bg-[#12182b] hover:bg-[#1a233d] border border-white/10 text-slate-300 rounded-xl font-semibold transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  Save Resource
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
