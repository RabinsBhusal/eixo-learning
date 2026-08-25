import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JobPosting, JobType, JobExperienceLevel } from '../types';
import {
  Briefcase,
  MapPin,
  PoundSterling,
  Building2,
  Clock,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Send,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
  GraduationCap,
  Sparkles,
  Users,
  ShieldCheck,
} from 'lucide-react';

export const JobPortalPage: React.FC = () => {
  const {
    jobs,
    savedJobIds,
    appliedJobIds,
    selectedJobId,
    setSelectedJobId,
    applyToJob,
    toggleSaveJob,
    currentUser,
    openAuthModal,
    navigateTo,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'all' | 'saved' | 'applied'>('all');
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [coverNote, setCoverNote] = useState('');

  const activeJob = jobs.find((j) => j.id === selectedJobId) || jobs[0];

  const filteredJobs = jobs.filter((job) => {
    if (activeTab === 'saved' && !savedJobIds.includes(job.id)) return false;
    if (activeTab === 'applied' && !appliedJobIds.includes(job.id)) return false;

    const matchesLevel = levelFilter === 'all' || job.experienceLevel === levelFilter;
    const matchesType = typeFilter === 'all' || job.jobType === typeFilter;
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.softwareRequired.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesLevel && matchesType && matchesSearch;
  });

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (activeJob) {
      applyToJob(activeJob.id, coverNote);
      setApplyModalOpen(false);
      setCoverNote('');
    }
  };

  const formatSalary = (min: number, max: number, curr = '£') => {
    return `${curr}${min.toLocaleString()} - ${curr}${max.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-200 pb-20">
      {/* Header Banner */}
      <div className="bg-linear-to-b from-[#0d1627] to-[#070a12] border-b border-white/10 pt-8 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
            <Briefcase className="w-4 h-4" />
            <span>EIXO Careers & Hiring Network</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Job Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
            Verified junior accountants, Xero bookkeepers, financial analysts, and trainee roles with verified hiring partners seeking EIXO certified students.
          </p>

          {/* Tab Filter */}
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'all'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Openings ({jobs.length})
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'saved'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved Roles ({savedJobIds.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('applied')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'applied'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>My Applications ({appliedJobIds.length})</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Search & Filter Controls Bar */}
        <div className="bg-[#0b0f19] p-3.5 rounded-2xl border border-white/10 mb-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by job title, company, or software (Xero, Excel)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#070a12] border border-white/10 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="bg-[#070a12] border border-white/10 text-xs text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Experience Levels</option>
              <option value="Graduate / Trainee">Graduate / Trainee</option>
              <option value="Junior">Junior</option>
              <option value="Mid-Level">Mid-Level</option>
              <option value="Senior">Senior</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-[#070a12] border border-white/10 text-xs text-slate-300 rounded-xl px-3 py-1.5 focus:outline-none focus:border-emerald-500"
            >
              <option value="all">All Work Styles</option>
              <option value="Full-Time">Full-Time</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote UK">Remote UK</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>

        {/* Master-Detail Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Job Cards List */}
          <div className="lg:col-span-5 space-y-3">
            {filteredJobs.length === 0 ? (
              <div className="bg-[#0b0f19] p-8 text-center rounded-2xl border border-white/10">
                <Briefcase className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-white">No jobs matched</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Try adjusting your filters or search keywords.
                </p>
              </div>
            ) : (
              filteredJobs.map((job) => {
                const isSelected = activeJob?.id === job.id;
                const isSaved = savedJobIds.includes(job.id);
                const isApplied = appliedJobIds.includes(job.id);

                return (
                  <div
                    key={job.id}
                    onClick={() => setSelectedJobId(job.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative ${
                      isSelected
                        ? 'bg-[#0f182c] border-emerald-500/50 shadow-lg shadow-emerald-950/20'
                        : 'bg-[#0b0f19] border-white/10 hover:border-white/20 hover:bg-[#0d1322]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <img
                          src={job.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80'}
                          alt={job.company}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-xl object-cover border border-white/10 shrink-0"
                        />
                        <div>
                          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {job.company}
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                            {job.title}
                          </h3>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSaveJob(job.id);
                        }}
                        className={`p-1.5 rounded-lg transition-colors ${
                          isSaved
                            ? 'text-emerald-400 bg-emerald-500/20'
                            : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                        title={isSaved ? 'Remove saved job' : 'Save job'}
                      >
                        {isSaved ? (
                          <BookmarkCheck className="w-4 h-4 fill-current" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Details row */}
                    <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                      <span className="flex items-center gap-1 font-medium text-emerald-300 font-mono">
                        <PoundSterling className="w-3 h-3 text-emerald-400" />
                        <span>{formatSalary(job.salaryMin, job.salaryMax, job.currency)}</span>
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <MapPin className="w-3 h-3" />
                        <span>{job.location}</span>
                      </span>
                    </div>

                    {/* Software tags */}
                    <div className="mt-2.5 flex flex-wrap items-center gap-1">
                      <span className="px-1.5 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-semibold rounded">
                        {job.jobType}
                      </span>
                      {job.softwareRequired.map((soft) => (
                        <span
                          key={soft}
                          className="px-1.5 py-0.5 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 text-[9px] font-mono rounded"
                        >
                          {soft}
                        </span>
                      ))}
                    </div>

                    {isApplied && (
                      <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-bold text-emerald-400">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Applied on {new Date().toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          {/* Right Column: Selected Job Full Details */}
          <div className="lg:col-span-7">
            {activeJob ? (
              <div className="bg-[#0b0f19] p-6 rounded-3xl border border-white/10 sticky top-20 shadow-2xl space-y-6 animate-in fade-in">
                {/* Header Profile */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-white/10">
                  <div className="flex items-start gap-4">
                    <img
                      src={activeJob.companyLogo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=100&auto=format&fit=crop&q=80'}
                      alt={activeJob.company}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-2xl object-cover border border-white/10"
                    />
                    <div>
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <span>{activeJob.company}</span>
                        <span className="px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded">
                          Hiring Partner
                        </span>
                      </div>
                      <h2 className="text-lg sm:text-xl font-black text-white mt-0.5 leading-snug">
                        {activeJob.title}
                      </h2>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                        <span className="flex items-center gap-1 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{activeJob.location}</span>
                        </span>
                        <span>•</span>
                        <span className="text-emerald-300 font-bold font-mono">
                          {formatSalary(activeJob.salaryMin, activeJob.salaryMax, activeJob.currency)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleSaveJob(activeJob.id)}
                      className="p-2.5 rounded-xl border border-white/10 hover:border-emerald-500/40 text-slate-300 hover:text-white transition-colors"
                      title="Bookmark"
                    >
                      {savedJobIds.includes(activeJob.id) ? (
                        <BookmarkCheck className="w-4 h-4 text-emerald-400 fill-current" />
                      ) : (
                        <Bookmark className="w-4 h-4" />
                      )}
                    </button>

                    <button
                      onClick={() => {
                        if (!currentUser) {
                          openAuthModal('login');
                        } else {
                          setApplyModalOpen(true);
                        }
                      }}
                      className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>
                        {appliedJobIds.includes(activeJob.id) ? 'Application Sent' : 'Quick Apply'}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Badges / Stats Bar */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#070a12] p-3 rounded-2xl border border-white/10 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Experience</span>
                    <span className="font-bold text-white">{activeJob.experienceLevel}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Work Setup</span>
                    <span className="font-bold text-emerald-400">{activeJob.jobType}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Posted</span>
                    <span className="font-bold text-white">{activeJob.postedAt}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 block uppercase">Applicants</span>
                    <span className="font-bold text-cyan-400">{activeJob.applicantsCount} candidates</span>
                  </div>
                </div>

                {/* Software Stack Needed */}
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-2">
                    Primary Software & Technical Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeJob.softwareRequired.map((software) => (
                      <span
                        key={software}
                        className="px-2.5 py-1 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold rounded-lg"
                      >
                        ✓ {software}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Role Overview
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                    {activeJob.description}
                  </p>
                </div>

                {/* Responsibilities */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeJob.keyResponsibilities.map((resp, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Requirements */}
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    Candidate Requirements
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {activeJob.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Apply Banner */}
                <div className="p-4 bg-linear-to-r from-emerald-950/40 to-teal-950/20 rounded-2xl border border-emerald-500/30 flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-white">EIXO Fast-Track Priority</p>
                    <p className="text-[11px] text-slate-400">
                      Graduates with practical Xero masterclass badges receive expedited interview rounds.
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      if (!currentUser) openAuthModal('login');
                      else setApplyModalOpen(true);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shrink-0"
                  >
                    Submit Application
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-[#0b0f19] p-8 text-center rounded-3xl border border-white/10">
                <p className="text-sm text-slate-400">Select a job from the list to view specifications.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {applyModalOpen && activeJob && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0b0f19] border border-white/10 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4 animate-in zoom-in-95">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-emerald-400" />
              <span>Apply for {activeJob.title}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Applying to <strong className="text-white">{activeJob.company}</strong> as{' '}
              <span className="text-emerald-300">{currentUser?.name} ({currentUser?.email})</span>.
            </p>

            <form onSubmit={handleApply} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Candidate Note / Practical Highlights
                </label>
                <textarea
                  rows={4}
                  placeholder="Share details on your Xero proficiency, ACCA progress, or practical bookkeeping experience..."
                  value={coverNote}
                  onChange={(e) => setCoverNote(e.target.value)}
                  className="w-full bg-[#070a12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="p-3 bg-[#070a12] rounded-xl border border-emerald-500/20 text-[11px] text-slate-300 space-y-1">
                <p className="font-semibold text-emerald-400">Attached Candidate Profile:</p>
                <p>• EIXO Platform Certificate Status: Active Enrollee</p>
                <p>• Verified Practical Coursework: Xero Masterclass, Double-Entry Mastery</p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                >
                  Confirm & Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
