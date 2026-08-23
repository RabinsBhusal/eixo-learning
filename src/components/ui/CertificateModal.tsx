import React from 'react';
import { Course, User } from '../../types';
import { Award, Download, CheckCircle, X, Share2, ShieldCheck, Printer } from 'lucide-react';

interface CertificateModalProps {
  course: Course;
  user: User;
  completionDate?: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  course,
  user,
  completionDate = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
  onClose,
}) => {
  const certificateId = `EIXO-${course.id.replace('course-', '').toUpperCase()}-${user.id.replace('user-', '').toUpperCase()}-2026`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#0b0f19] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/10 animate-in fade-in zoom-in-95 duration-200 text-white">
        {/* Header controls */}
        <div className="bg-[#070a12] px-6 py-4 flex items-center justify-between text-white border-b border-white/10">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-emerald-400" />
            <span className="font-semibold text-sm">Official EIXO Learning Certificate of Completion</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-medium px-2.5 border border-white/10"
              title="Print or Save as PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Canvas Area */}
        <div className="p-8 sm:p-12 bg-[#050508] print:p-0 print:m-0 print:bg-white">
          <div className="border-4 border-emerald-500/40 p-8 sm:p-10 relative bg-[#0b0f19] rounded-xl text-center shadow-[0_0_30px_rgba(16,185,129,0.1)] print:bg-white print:text-black print:border-black">
            
            {/* Top Brand & Emblem */}
            <div className="flex flex-col items-center mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-10 h-10 rounded-lg bg-emerald-600 border border-emerald-400/30 flex items-center justify-center text-white font-bold text-xl tracking-wider shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                  E
                </div>
                <div className="text-left">
                  <div className="text-xl font-bold tracking-tight text-white leading-none">
                    EIXO <span className="text-emerald-400 font-light">LEARNING</span>
                  </div>
                  <div className="text-[10px] tracking-widest uppercase font-semibold text-slate-400 mt-0.5">
                    Accounting & Finance Education
                  </div>
                </div>
              </div>
              <div className="h-0.5 w-24 bg-emerald-500 my-2 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <p className="text-xs uppercase tracking-widest text-emerald-400 font-medium">
                Certificate of Practical & Theoretical Competency
              </p>
            </div>

            {/* Recipient */}
            <div className="my-6">
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-2 font-medium">
                This is to certify that
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight font-serif italic text-emerald-300">
                {user.name}
              </h2>
              <p className="text-xs text-slate-400 mt-2 max-w-lg mx-auto leading-relaxed">
                has successfully completed all modules, practical software walkthroughs, comprehensive exercises, and passed the final assessment for
              </p>
            </div>

            {/* Course Title */}
            <div className="my-6 py-3 px-6 bg-[#12182b] rounded-xl inline-block border border-white/10">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {course.title}
              </h3>
              <div className="flex items-center justify-center gap-3 mt-1.5 text-xs text-slate-300 font-medium">
                <span>Category: {course.category} ({course.subcategory})</span>
                <span>•</span>
                <span>Duration: {course.duration}</span>
                <span>•</span>
                <span>Level: {course.level}</span>
              </div>
            </div>

            {/* Practical Software Badge if applicable */}
            {course.softwareUsed && course.softwareUsed.length > 0 && (
              <div className="flex items-center justify-center gap-2 mb-8">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Verified Software Competency:
                </span>
                <div className="flex gap-1.5">
                  {course.softwareUsed.map((sw) => (
                    <span key={sw} className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-md text-xs font-semibold">
                      {sw}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Signatures & Seal */}
            <div className="grid grid-cols-3 items-end pt-6 border-t border-white/10 text-left text-xs text-slate-400 mt-6">
              <div>
                <div className="font-serif italic text-sm text-white font-semibold mb-1">
                  EIXO Faculty Board
                </div>
                <div className="w-32 h-0.5 bg-slate-600 mb-1" />
                <p className="text-[10px] text-slate-400">Director of Academic Curriculum</p>
                <p className="text-[10px] text-slate-400 font-medium">EIXO Learning UK</p>
              </div>

              {/* Seal */}
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-emerald-500 p-1 flex items-center justify-center bg-[#070a12] shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                  <div className="w-full h-full rounded-full border border-dashed border-emerald-400 flex flex-col items-center justify-center text-center p-1">
                    <ShieldCheck className="w-5 h-5 text-emerald-400" />
                    <span className="text-[7px] uppercase font-bold text-emerald-300 leading-tight">Verified</span>
                  </div>
                </div>
                <span className="text-[9px] text-slate-400 mt-1 font-mono">{certificateId}</span>
              </div>

              <div className="text-right">
                <p className="font-semibold text-white mb-1">{completionDate}</p>
                <div className="w-32 h-0.5 bg-slate-600 ml-auto mb-1" />
                <p className="text-[10px] text-slate-400">Date of Award</p>
                <p className="text-[10px] text-slate-400 font-medium">Single-Standard Accreditation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#070a12] px-6 py-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Digital Certificate ID: <code className="bg-[#12182b] border border-white/10 px-1.5 py-0.5 rounded text-emerald-300 font-mono text-xs">{certificateId}</code></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download / Save Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
