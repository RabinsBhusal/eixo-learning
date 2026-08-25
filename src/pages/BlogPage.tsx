import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BlogPost } from '../types';
import {
  BookOpenCheck,
  Clock,
  Heart,
  Share2,
  Tag,
  ArrowRight,
  ChevronLeft,
  Sparkles,
  Search,
  CheckCircle,
  TrendingUp,
  Bookmark,
  Calendar,
} from 'lucide-react';

export const BlogPage: React.FC = () => {
  const { blogPosts, selectedBlogSlug, setSelectedBlogSlug, likeBlogPost, navigateTo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['all', 'Xero & Cloud', 'Fundamentals', 'Career & Salary', 'UK Tax & Compliance'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const activePost = blogPosts.find((p) => p.slug === selectedBlogSlug);

  return (
    <div className="min-h-screen bg-[#070a12] text-slate-200 pb-20">
      {/* Editorial Header */}
      <div className="bg-linear-to-b from-[#0e1628] to-[#070a12] border-b border-white/10 pt-10 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 uppercase tracking-widest mb-1.5">
            <BookOpenCheck className="w-4 h-4" />
            <span>EIXO Insights & Technical Playbooks</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Modern Accountant's Handbook
          </h1>
          <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-relaxed">
            Practical walkthroughs on Xero automation, double-entry reconciliation edge cases, UK VAT rules, and finance career milestones written by practicing chartered accountants.
          </p>

          {/* Category Tabs & Search */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-white/10">
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedBlogSlug(null);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedCategory === cat
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'text-slate-400 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {cat === 'all' ? 'All Articles' : cat}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0b0f19] border border-white/10 rounded-xl pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {selectedBlogSlug && activePost ? (
          /* Article Detail View */
          <article className="max-w-3xl mx-auto bg-[#0b0f19] p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl space-y-6 animate-in fade-in">
            <button
              onClick={() => setSelectedBlogSlug(null)}
              className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-semibold mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Back to all guides</span>
            </button>

            {/* Post Meta */}
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-300 font-bold rounded-lg border border-emerald-500/30">
                  {activePost.category}
                </span>
                <span className="text-slate-500">•</span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{activePost.readTimeMinutes} min read</span>
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-slate-400">{activePost.publishedAt}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {activePost.title}
              </h1>

              <div className="flex items-center justify-between pt-2 pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={activePost.authorAvatar}
                    alt={activePost.authorName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-emerald-500/30"
                  />
                  <div>
                    <p className="text-xs font-bold text-white">{activePost.authorName}</p>
                    <p className="text-[10px] text-slate-400">{activePost.authorRole}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => likeBlogPost(activePost.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#070a12] border border-white/10 hover:border-rose-500/40 text-slate-300 hover:text-rose-400 text-xs font-semibold transition-all"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500/20 text-rose-500" />
                    <span>{activePost.likes}</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="rounded-2xl overflow-hidden border border-white/10 max-h-80">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content Body */}
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4 whitespace-pre-line font-sans">
              {activePost.content}
            </div>

            {/* Tags & Action Footer */}
            <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-1.5">
                {activePost.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] px-2.5 py-1 bg-slate-800/90 text-slate-300 rounded-lg font-mono"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <button
                onClick={() => navigateTo('courses')}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md"
              >
                <span>Explore Related Courses</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>
        ) : (
          /* Grid of Articles */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedBlogSlug(post.slug)}
                className="bg-[#0b0f19] hover:bg-[#0e1526] rounded-3xl border border-white/10 hover:border-emerald-500/30 overflow-hidden flex flex-col justify-between transition-all duration-300 cursor-pointer group shadow-sm"
              >
                <div>
                  {/* Cover */}
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 px-2 py-0.5 bg-[#070a12]/80 backdrop-blur-xs text-emerald-300 text-[10px] font-bold rounded-md border border-white/10">
                      {post.category}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-5 space-y-2.5">
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-emerald-400" />
                        <span>{post.readTimeMinutes} min read</span>
                      </span>
                      <span>•</span>
                      <span>{post.publishedAt}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-3 text-xs">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.authorAvatar}
                      alt={post.authorName}
                      referrerPolicy="no-referrer"
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span className="text-[11px] text-slate-300 font-medium">{post.authorName}</span>
                  </div>

                  <span className="flex items-center gap-1 text-emerald-400 font-bold group-hover:translate-x-1 transition-transform">
                    <span>Read guide</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
