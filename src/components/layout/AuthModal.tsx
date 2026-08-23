import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Mail, Lock, User as UserIcon, Shield, GraduationCap, CheckCircle, ArrowRight } from 'lucide-react';
import { UserRole } from '../../types';

export const AuthModal: React.FC = () => {
  const { authModalOpen, authModalMode, closeAuthModal, login, register, openAuthModal } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [submittedMessage, setSubmittedMessage] = useState('');

  if (!authModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authModalMode === 'login') {
      if (!email) return;
      login(email, password);
    } else if (authModalMode === 'register') {
      if (!name || !email) return;
      register(name, email, role);
    } else {
      setSubmittedMessage(`Password reset link sent to ${email}. Check your inbox!`);
    }
  };

  const handleDemoLogin = (demoRole: 'student' | 'admin') => {
    if (demoRole === 'student') {
      login('alex.morgan@finance-student.com');
    } else {
      login('admin@eixolearning.com');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] text-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#070a12] text-white p-6 relative border-b border-white/10">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded bg-emerald-600 border border-emerald-400/30 flex items-center justify-center text-white font-bold text-sm shadow-[0_0_10px_rgba(16,185,129,0.3)]">
              E
            </div>
            <span className="font-bold text-sm tracking-tight text-white">
              EIXO <span className="text-emerald-400 font-light">LEARNING</span>
            </span>
          </div>

          <h2 className="text-xl font-bold text-white mt-1">
            {authModalMode === 'login' && 'Sign in to your account'}
            {authModalMode === 'register' && 'Create your free account'}
            {authModalMode === 'forgot' && 'Reset your password'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authModalMode === 'login' && 'Access your courses, practical exercises, and progress.'}
            {authModalMode === 'register' && 'Join students mastering accounting & finance with real software.'}
            {authModalMode === 'forgot' && 'Enter your email to receive a recovery link.'}
          </p>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="bg-[#0e1628] border-b border-white/10 px-6 py-3">
          <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <span>Instant Demo Access (1-Click)</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('student')}
              className="px-3 py-1.5 bg-[#152038] hover:bg-[#1a2948] border border-emerald-500/30 text-emerald-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />
              <span>Demo Student</span>
            </button>
            <button
              onClick={() => handleDemoLogin('admin')}
              className="px-3 py-1.5 bg-[#152038] hover:bg-[#1a2948] border border-indigo-500/30 text-indigo-300 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
            >
              <Shield className="w-3.5 h-3.5 text-indigo-400" />
              <span>Demo Admin</span>
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-4">
          {submittedMessage ? (
            <div className="p-4 bg-emerald-950/40 text-emerald-300 rounded-xl border border-emerald-500/30 text-xs text-center space-y-2">
              <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
              <p className="font-semibold">{submittedMessage}</p>
              <button
                onClick={() => {
                  setSubmittedMessage('');
                  openAuthModal('login');
                }}
                className="mt-2 text-xs font-bold text-emerald-400 underline"
              >
                Return to Login
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {authModalMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Morgan"
                      className="w-full text-xs pl-9 pr-3 py-2 bg-[#0f1526] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:bg-[#141c33] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                    />
                    <UserIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full text-xs pl-9 pr-3 py-2 bg-[#0f1526] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:bg-[#141c33] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {authModalMode !== 'forgot' && (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-semibold text-slate-300">Password</label>
                    {authModalMode === 'login' && (
                      <button
                        type="button"
                        onClick={() => openAuthModal('forgot')}
                        className="text-[11px] text-emerald-400 hover:underline font-medium"
                      >
                        Forgot?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs pl-9 pr-3 py-2 bg-[#0f1526] border border-white/10 rounded-lg text-white placeholder:text-slate-500 focus:bg-[#141c33] focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500/50 focus:outline-none"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  </div>
                </div>
              )}

              {authModalMode === 'register' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Account Role</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        role === 'student'
                          ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                          : 'border-white/10 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <GraduationCap className="w-3.5 h-3.5" />
                      <span>Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`p-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                        role === 'admin'
                          ? 'border-indigo-500 bg-indigo-500/20 text-indigo-300'
                          : 'border-white/10 text-slate-400 hover:bg-white/5'
                      }`}
                    >
                      <Shield className="w-3.5 h-3.5" />
                      <span>Administrator</span>
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)] mt-2"
              >
                <span>
                  {authModalMode === 'login' && 'Sign In'}
                  {authModalMode === 'register' && 'Create Account'}
                  {authModalMode === 'forgot' && 'Send Reset Link'}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          {/* Switch mode links */}
          <div className="pt-3 border-t border-white/10 text-center text-xs text-slate-400">
            {authModalMode === 'login' ? (
              <p>
                Don't have an account yet?{' '}
                <button
                  onClick={() => openAuthModal('register')}
                  className="text-emerald-400 font-bold hover:underline"
                >
                  Register free
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-emerald-400 font-bold hover:underline"
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
