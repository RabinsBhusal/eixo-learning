import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  GraduationCap,
  Shield,
  Lock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  LogIn,
  KeyRound,
  BookOpen,
} from 'lucide-react';

interface PortalAuthGateProps {
  requiredRole?: 'student' | 'admin';
  title?: string;
  subtitle?: string;
}

export const PortalAuthGate: React.FC<PortalAuthGateProps> = ({
  requiredRole = 'student',
  title,
  subtitle,
}) => {
  const { login, openAuthModal, navigateTo } = useApp();

  const isFaculty = requiredRole === 'admin';

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-white text-center">
      <div className="bg-[#0b0f19] border border-white/10 rounded-2xl p-8 sm:p-12 shadow-2xl relative overflow-hidden">
        
        {/* Glow */}
        <div className={`absolute -top-24 -right-24 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
          isFaculty ? 'bg-indigo-500/15' : 'bg-emerald-500/15'
        }`} />

        {/* Badge Icon */}
        <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-6 border shadow-lg ${
          isFaculty
            ? 'bg-indigo-950/80 border-indigo-500/40 text-indigo-400 shadow-indigo-900/30'
            : 'bg-emerald-950/80 border-emerald-500/40 text-emerald-400 shadow-emerald-900/30'
        }`}>
          {isFaculty ? <Shield className="w-8 h-8" /> : <GraduationCap className="w-8 h-8" />}
        </div>

        {/* Title */}
        <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 border ${
          isFaculty
            ? 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40'
            : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
        }`}>
          {isFaculty ? 'Faculty & Administration Portal' : 'Student Learning Campus'}
        </span>

        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
          {title || (isFaculty ? 'Faculty Authentication Required' : 'Student Sign-In Required')}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto mb-8 leading-relaxed">
          {subtitle || (isFaculty
            ? 'You need administrator or faculty credentials to create courses, manage modules, upload resources, and view student progress.'
            : 'Sign in to your EIXO student account to view your enrolled courses, track module progress, download certificates, and access the double-entry sandbox.')}
        </p>

        {/* 1-Click Instant Demo Persona Access */}
        <div className="bg-[#0f1628] border border-white/10 rounded-xl p-5 max-w-lg mx-auto mb-8 text-left">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Instant 1-Click Demo Login
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={() => login('alex.morgan@finance-student.com')}
              className="p-3 bg-[#152038] hover:bg-[#1a2948] border border-emerald-500/30 hover:border-emerald-500/60 rounded-xl text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-emerald-300">
                  Demo Student
                </span>
                <GraduationCap className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Alex Morgan (Enrolled in 3 courses)
              </p>
            </button>

            <button
              onClick={() => login('admin@eixolearning.com')}
              className="p-3 bg-[#152038] hover:bg-[#1a2948] border border-indigo-500/30 hover:border-indigo-500/60 rounded-xl text-left transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white group-hover:text-indigo-300">
                  Demo Faculty Admin
                </span>
                <Shield className="w-4 h-4 text-indigo-400" />
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Prof. David Vance (Curriculum Head)
              </p>
            </button>
          </div>
        </div>

        {/* Standard Auth Options */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={() => openAuthModal('login')}
            className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In with Email</span>
          </button>

          <button
            onClick={() => openAuthModal('register')}
            className="px-6 py-3 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-bold transition-all border border-white/15"
          >
            <span>Create New Free Account</span>
          </button>

          <button
            onClick={() => navigateTo('courses')}
            className="px-6 py-3 text-slate-400 hover:text-white text-xs font-medium transition-colors"
          >
            <span>Browse Public Catalogue</span>
          </button>
        </div>

      </div>
    </div>
  );
};
