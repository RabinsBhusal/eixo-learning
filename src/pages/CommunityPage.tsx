import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CommunityCategory, CommunityThread } from '../types';
import {
  MessageSquare,
  ArrowBigUp,
  ArrowBigDown,
  Plus,
  Search,
  Filter,
  Flame,
  Clock,
  Award,
  Share2,
  Tag,
  CheckCircle2,
  User,
  Send,
  Lock,
  Sparkles,
  ChevronLeft,
  BookOpen,
  HelpCircle,
  TrendingUp,
} from 'lucide-react';

const CATEGORIES: { id: CommunityCategory | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Discussions', icon: '🌐' },
  { id: 'xero-software', label: 'Xero & Cloud Software', icon: '☁️' },
  { id: 'double-entry', label: 'Double-Entry & Fundamentals', icon: '⚖️' },
  { id: 'acca-cima-exams', label: 'ACCA & CIMA Exams', icon: '🎓' },
  { id: 'career-interviews', label: 'Careers & Interview Prep', icon: '💼' },
  { id: 'tax-vat-uk', label: 'UK Tax & VAT', icon: '🏛️' },
  { id: 'general-discussion', label: 'General Discussion', icon: '💬' },
];

export const CommunityPage: React.FC = () => {
  const {
    currentUser,
    threads,
    selectedThreadId,
    setSelectedThreadId,
    upvoteThread,
    addThread,
    addComment,
    upvoteComment,
    openAuthModal,
    navigateTo,
  } = useApp();

  const [activeCategory, setActiveCategory] = useState<CommunityCategory | 'all'>('all');
  const [sortMode, setSortMode] = useState<'hot' | 'new' | 'top'>('hot');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreatingThread, setIsCreatingThread] = useState(false);

  // New Thread Form state
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<CommunityCategory>('xero-software');
  const [newTagInput, setNewTagInput] = useState('');

  // Comment input state
  const [commentContent, setCommentContent] = useState('');

  // Filter & Sort
  const filteredThreads = threads.filter((t) => {
    const matchesCategory = activeCategory === 'all' || t.category === activeCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const sortedThreads = [...filteredThreads].sort((a, b) => {
    if (sortMode === 'hot') {
      return b.upvotes + b.commentsCount * 2 - (a.upvotes + a.commentsCount * 2);
    }
    if (sortMode === 'top') {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const activeThread = threads.find((t) => t.id === selectedThreadId);

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!newTitle.trim() || !newContent.trim()) return;

    const tags = newTagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    addThread(newTitle, newContent, newCategory, tags.length > 0 ? tags : ['General']);
    setNewTitle('');
    setNewContent('');
    setNewTagInput('');
    setIsCreatingThread(false);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      openAuthModal('login');
      return;
    }
    if (!commentContent.trim() || !selectedThreadId) return;

    addComment(selectedThreadId, commentContent);
    setCommentContent('');
  };

  const formatDate = (iso: string) => {
    const date = new Date(iso);
    const now = new Date();
    const diffHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${Math.floor(diffHours / 24)}d ago`;
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-200 pb-20">
      {/* Header Banner */}
      <div className="bg-linear-to-b from-[#0e1726] to-[#070a12] border-b border-white/10 pt-8 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1">
              <MessageSquare className="w-4 h-4" />
              <span>EIXO Peer-to-Peer & Faculty Discussions</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Community Forum
            </h1>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Ask real-world Xero bookkeeping questions, clarify double-entry ledger puzzles, share interview experiences, and discuss ACCA/CIMA exam insights.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (!currentUser) {
                  openAuthModal('login');
                } else {
                  setIsCreatingThread(!isCreatingThread);
                  setSelectedThreadId(null);
                }
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-emerald-950/40"
            >
              <Plus className="w-4 h-4" />
              <span>{isCreatingThread ? 'Cancel Post' : 'Start Discussion'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column: Categories / Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0b0f19] p-3.5 rounded-2xl border border-white/10 shadow-xs">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-2">
                Categories
              </h3>
              <nav className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setSelectedThreadId(null);
                      setIsCreatingThread(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                      activeCategory === cat.id
                        ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                        : 'text-slate-400 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{cat.icon}</span>
                      <span>{cat.label}</span>
                    </span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Rules / SEO Card */}
            <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10 text-xs text-slate-400 space-y-2">
              <h4 className="font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span>Community Guidelines</span>
              </h4>
              <p className="text-[11px] leading-relaxed">
                • Public reading is enabled for search indexing & guest reference.
              </p>
              <p className="text-[11px] leading-relaxed">
                • Please sign in to upvote, post questions, or participate.
              </p>
              <p className="text-[11px] leading-relaxed">
                • Faculty verified answers carry an official badge.
              </p>
            </div>
          </div>

          {/* Center & Right Column: Content Feed or Thread Detail */}
          <div className="lg:col-span-3 space-y-4">
            
            {/* Create Thread Form Modal/Inline */}
            {isCreatingThread && (
              <div className="bg-[#0c1220] p-5 rounded-2xl border border-emerald-500/30 shadow-xl animate-in fade-in">
                <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4 text-emerald-400" />
                  <span>Create a New Discussion Thread</span>
                </h3>
                <form onSubmit={handleCreateSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Thread Title *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. How do I reconcile unpresented cheques on Xero without double-counting?"
                      value={newTitle}
                      onChange={(e) => setNewTitle(e.target.value)}
                      className="w-full bg-[#070a12] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Category *
                      </label>
                      <select
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as CommunityCategory)}
                        className="w-full bg-[#070a12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500"
                      >
                        {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                          <option key={c.id} value={c.id}>
                            {c.icon} {c.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        Tags (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="Xero, Bank Rec, Double-Entry"
                        value={newTagInput}
                        onChange={(e) => setNewTagInput(e.target.value)}
                        className="w-full bg-[#070a12] border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      >
                      </input>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Detailed Question / Description *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Provide background, figures, or error screenshots description..."
                      value={newContent}
                      onChange={(e) => setNewContent(e.target.value)}
                      className="w-full bg-[#070a12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-y"
                    />
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsCreatingThread(false)}
                      className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
                    >
                      Publish Thread
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Thread Detail View */}
            {selectedThreadId && activeThread ? (
              <div className="space-y-4 animate-in fade-in">
                <button
                  onClick={() => setSelectedThreadId(null)}
                  className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mb-2"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Back to all discussions</span>
                </button>

                {/* Main Post Card */}
                <div className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 shadow-md">
                  <div className="flex items-start gap-3">
                    {/* Upvote Pill */}
                    <div className="flex flex-col items-center bg-[#070a12] border border-white/10 rounded-xl p-1.5 shrink-0">
                      <button
                        onClick={() => upvoteThread(activeThread.id)}
                        className={`p-1 rounded hover:bg-white/10 transition-colors ${
                          currentUser && activeThread.upvotedUserIds.includes(currentUser.id)
                            ? 'text-emerald-400'
                            : 'text-slate-400'
                        }`}
                        title="Upvote"
                      >
                        <ArrowBigUp className="w-5 h-5 fill-current" />
                      </button>
                      <span className="text-xs font-bold text-white my-0.5 font-mono">
                        {activeThread.upvotes}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Meta */}
                      <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mb-2">
                        <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 font-semibold rounded-md border border-emerald-500/20">
                          {CATEGORIES.find((c) => c.id === activeThread.category)?.label || activeThread.category}
                        </span>
                        <span>•</span>
                        <div className="flex items-center gap-1.5 text-white font-medium">
                          <img
                            src={activeThread.authorAvatar}
                            alt={activeThread.authorName}
                            referrerPolicy="no-referrer"
                            className="w-4 h-4 rounded-full object-cover"
                          />
                          <span>{activeThread.authorName}</span>
                          {activeThread.authorRole === 'admin' && (
                            <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded">
                              Faculty
                            </span>
                          )}
                        </div>
                        <span>•</span>
                        <span>{formatDate(activeThread.createdAt)}</span>
                      </div>

                      <h2 className="text-lg font-bold text-white mb-2 leading-snug">
                        {activeThread.title}
                      </h2>

                      <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line mb-4">
                        {activeThread.content}
                      </p>

                      <div className="flex flex-wrap items-center gap-1.5">
                        {activeThread.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] px-2 py-0.5 bg-slate-800/80 text-slate-300 rounded-md font-mono"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment Box */}
                <div className="bg-[#0b0f19] p-4 rounded-2xl border border-white/10">
                  <h4 className="text-xs font-bold text-white mb-2">
                    Leave a response ({activeThread.comments.length} replies)
                  </h4>

                  {!currentUser ? (
                    <div className="p-4 bg-[#0e1628] rounded-xl border border-emerald-500/20 text-center">
                      <Lock className="w-5 h-5 text-emerald-400 mx-auto mb-1.5" />
                      <p className="text-xs text-slate-300 font-medium mb-2">
                        You must be signed in to contribute to this discussion.
                      </p>
                      <button
                        onClick={() => openAuthModal('login')}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-lg transition-all"
                      >
                        Sign In to Reply
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleCommentSubmit} className="space-y-3">
                      <textarea
                        required
                        rows={3}
                        placeholder="Write your explanation, step-by-step guidance, or answer..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        className="w-full bg-[#070a12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all"
                        >
                          <Send className="w-3 h-3" />
                          <span>Post Reply</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Comments List */}
                <div className="space-y-2.5">
                  {activeThread.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className={`p-4 rounded-2xl border ${
                        comment.isFacultyVerified
                          ? 'bg-[#0a1424] border-indigo-500/30'
                          : 'bg-[#0b0f19] border-white/10'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center bg-[#070a12] border border-white/10 rounded-lg p-1 shrink-0">
                          <button
                            onClick={() => upvoteComment(activeThread.id, comment.id)}
                            className="text-slate-400 hover:text-emerald-400 transition-colors"
                          >
                            <ArrowBigUp className="w-4 h-4 fill-current" />
                          </button>
                          <span className="text-[10px] font-bold text-white my-0.5">
                            {comment.upvotes}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1.5">
                            <img
                              src={comment.authorAvatar}
                              alt={comment.authorName}
                              referrerPolicy="no-referrer"
                              className="w-4 h-4 rounded-full object-cover"
                            />
                            <span className="text-xs font-bold text-white">{comment.authorName}</span>
                            {comment.isFacultyVerified && (
                              <span className="flex items-center gap-1 px-1.5 py-0.2 bg-emerald-500/20 text-emerald-300 text-[9px] font-bold rounded border border-emerald-500/30">
                                <CheckCircle2 className="w-2.5 h-2.5 text-emerald-400" />
                                <span>Faculty Verified Answer</span>
                              </span>
                            )}
                            <span className="text-[10px] text-slate-500">{formatDate(comment.createdAt)}</span>
                          </div>

                          <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Threads Feed View */
              <div className="space-y-3">
                {/* Search & Sort Controls Bar */}
                <div className="bg-[#0b0f19] p-3 rounded-2xl border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                  {/* Search */}
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search questions & tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-[#070a12] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  {/* Sort Mode Buttons */}
                  <div className="flex items-center gap-1 bg-[#070a12] p-1 rounded-xl border border-white/10 text-xs">
                    <button
                      onClick={() => setSortMode('hot')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        sortMode === 'hot' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Flame className="w-3 h-3 text-amber-400" />
                      <span>Hot</span>
                    </button>
                    <button
                      onClick={() => setSortMode('new')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        sortMode === 'new' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Clock className="w-3 h-3 text-cyan-400" />
                      <span>New</span>
                    </button>
                    <button
                      onClick={() => setSortMode('top')}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-semibold transition-all ${
                        sortMode === 'top' ? 'bg-emerald-500/20 text-emerald-300' : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      <Award className="w-3 h-3 text-amber-300" />
                      <span>Top</span>
                    </button>
                  </div>
                </div>

                {/* List of Threads */}
                {sortedThreads.length === 0 ? (
                  <div className="bg-[#0b0f19] p-8 text-center rounded-2xl border border-white/10">
                    <HelpCircle className="w-8 h-8 text-slate-500 mx-auto mb-2" />
                    <h3 className="text-sm font-bold text-white">No discussions found</h3>
                    <p className="text-xs text-slate-400 mt-1">
                      Be the first to ask a question or start a topic in this category!
                    </p>
                  </div>
                ) : (
                  sortedThreads.map((thread) => (
                    <div
                      key={thread.id}
                      onClick={() => setSelectedThreadId(thread.id)}
                      className="bg-[#0b0f19] hover:bg-[#0f1422] p-4 rounded-2xl border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer shadow-xs group"
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Upvote Pill */}
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            upvoteThread(thread.id);
                          }}
                          className="flex flex-col items-center bg-[#070a12] border border-white/10 rounded-xl p-1.5 shrink-0 group-hover:border-emerald-500/30 transition-colors"
                        >
                          <ArrowBigUp
                            className={`w-5 h-5 ${
                              currentUser && thread.upvotedUserIds.includes(currentUser.id)
                                ? 'text-emerald-400 fill-current'
                                : 'text-slate-400'
                            }`}
                          />
                          <span className="text-xs font-bold text-white my-0.5 font-mono">
                            {thread.upvotes}
                          </span>
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Top Badges */}
                          <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                            <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-300 font-semibold rounded-md border border-emerald-500/20 text-[10px]">
                              {CATEGORIES.find((c) => c.id === thread.category)?.label || thread.category}
                            </span>
                            <span>•</span>
                            <span className="text-slate-300 font-medium">{thread.authorName}</span>
                            {thread.authorRole === 'admin' && (
                              <span className="px-1.5 py-0.2 bg-indigo-500/20 text-indigo-300 text-[9px] font-bold rounded">
                                Faculty
                              </span>
                            )}
                            <span>•</span>
                            <span>{formatDate(thread.createdAt)}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug mb-1">
                            {thread.title}
                          </h3>

                          {/* Content Snippet */}
                          <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-3">
                            {thread.content}
                          </p>

                          {/* Footer Tags & Comments Count */}
                          <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                            <div className="flex flex-wrap items-center gap-1.5">
                              {thread.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-[10px] px-1.5 py-0.5 bg-slate-800/80 text-slate-300 rounded font-mono"
                                >
                                  #{tag}
                                </span>
                              ))}
                            </div>

                            <div className="flex items-center gap-1 text-xs text-slate-400 font-semibold">
                              <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                              <span>{thread.commentsCount} replies</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
