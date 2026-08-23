import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  Award,
  BookOpen,
  Scale,
  MonitorCheck,
  CheckCircle2,
  Mail,
  Send,
  ArrowRight,
  Globe,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useApp();
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    setTimeout(() => {
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 1000);
  };

  return (
    <div className="space-y-16 py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
      
      {/* 1. Mission Hero */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.2)]">
          About EIXO Learning
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Practical Accounting & Finance Education.
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
          We founded EIXO to eliminate the painful disconnect between theoretical academic textbooks and the actual daily software used by chartered accountants and financial analysts.
        </p>
      </div>

      {/* 2. The Core Difference */}
      <div className="bg-[#0b0f19] text-white rounded-3xl p-8 sm:p-12 lg:p-16 border border-white/10 shadow-2xl space-y-8 relative overflow-hidden">
        <div className="max-w-2xl space-y-3">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Single-Owner Quality Standard
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Unlike open learning marketplaces where thousands of random instructors upload disjointed courses with conflicting notation and out-of-date software, EIXO maintains one unified, rigorously verified academic standard.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="p-6 bg-[#12182b] rounded-2xl border border-white/10 space-y-3 shadow-lg">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl w-fit">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Consistent Nomenclature</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every lesson uses the exact same double-entry principles (DEAD CLIC) and financial reporting conventions so you never get confused.
            </p>
          </div>

          <div className="p-6 bg-[#12182b] rounded-2xl border border-white/10 space-y-3 shadow-lg">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl w-fit">
              <MonitorCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Current Cloud Software</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Walkthroughs recorded on current UI releases of Xero, QuickBooks Online, and Sage Business Cloud with full bank feed integration.
            </p>
          </div>

          <div className="p-6 bg-[#12182b] rounded-2xl border border-white/10 space-y-3 shadow-lg">
            <div className="p-3 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl w-fit">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white">Direct Excel Practice Files</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Every theoretical explanation is backed by downloadable transaction sheets, working paper templates, and self-scoring quizzes.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Contact & Support Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6 space-y-6">
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Have Questions About Our Curriculum?
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Whether you are a university student preparing for professional exams, a business owner mastering Xero, or an employer training a finance team, we are here to support your learning journey.
          </p>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-emerald-400" />
              <span>Email: <strong className="text-white">support@eixolearning.com</strong></span>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-4 h-4 text-emerald-400" />
              <span>Headquarters: <span className="text-white">London, United Kingdom (Global Online Delivery)</span></span>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Accreditation: <span className="text-white">Certified EIXO Verification Protocols</span></span>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-6 bg-[#0b0f19] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-xl">
          {contactSent ? (
            <div className="text-center py-8 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white">Message Received!</h3>
              <p className="text-xs text-slate-300">
                Thank you for reaching out. An EIXO academic advisor will reply to your inquiry within 24 hours.
              </p>
              <button
                onClick={() => setContactSent(false)}
                className="mt-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="e.g. Sarah Jenkins"
                  className="w-full text-xs p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="sarah@example.com"
                  className="w-full text-xs p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Message or Curriculum Inquiry</label>
                <textarea
                  rows={4}
                  required
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="How can our faculty help you?"
                  className="w-full text-xs p-2.5 bg-[#12182b] border border-white/10 rounded-xl text-white placeholder-slate-500 focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
