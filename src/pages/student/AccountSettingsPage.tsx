import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, Mail, Briefcase, Shield, Check, Lock, Save, Sparkles } from 'lucide-react';

export const AccountSettingsPage: React.FC = () => {
  const { currentUser, updateCurrentUser, switchUserRole } = useApp();

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [jobTitle, setJobTitle] = useState(currentUser?.jobTitle || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCurrentUser({
      name,
      email,
      jobTitle,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-white">
      
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
          Account & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage your personal profile information, student credentials, and platform role.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          <Check className="w-4 h-4 text-emerald-400" />
          <span>Your profile updates have been saved successfully!</span>
        </div>
      )}

      {/* Profile Form */}
      <form onSubmit={handleSubmit} className="bg-[#0b0f19] rounded-2xl border border-white/10 p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center gap-4 pb-6 border-b border-white/10">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
            alt="Profile Avatar"
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-full object-cover border-2 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
          />
          <div>
            <h2 className="text-base font-bold text-white">{currentUser?.name}</h2>
            <p className="text-xs text-slate-400">{currentUser?.email}</p>
            <span className="inline-block mt-1 px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-lg uppercase">
              {currentUser?.role} Account
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Full Name</label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
              />
              <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Email Address</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full text-xs pl-9 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white focus:bg-[#161f38] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Job Title / Career Goal</label>
            <div className="relative">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Trainee Accountant / Assistant Financial Controller"
                className="w-full text-xs pl-9 pr-3 py-2 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:bg-[#161f38] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
              />
              <Briefcase className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>
          </div>
        </div>

        {/* Role toggle */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <label className="block text-xs font-semibold text-slate-300">Platform Persona / Role</label>
          <div className="grid grid-cols-2 gap-3 max-w-md">
            <button
              type="button"
              onClick={() => switchUserRole('student')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                currentUser?.role === 'student'
                  ? 'border-emerald-500/50 bg-emerald-500/20 text-emerald-300 shadow-[0_0_12px_rgba(16,185,129,0.2)]'
                  : 'border-white/10 text-slate-400 bg-[#12182b] hover:bg-[#1a233d]'
              }`}
            >
              <User className="w-4 h-4" />
              <span>Student / Learner</span>
            </button>

            <button
              type="button"
              onClick={() => switchUserRole('admin')}
              className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                currentUser?.role === 'admin'
                  ? 'border-indigo-500/50 bg-indigo-500/20 text-indigo-300 shadow-[0_0_12px_rgba(99,102,241,0.2)]'
                  : 'border-white/10 text-slate-400 bg-[#12182b] hover:bg-[#1a233d]'
              }`}
            >
              <Shield className="w-4 h-4" />
              <span>Platform Admin</span>
            </button>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            type="submit"
            className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Profile</span>
          </button>
        </div>
      </form>
    </div>
  );
};
