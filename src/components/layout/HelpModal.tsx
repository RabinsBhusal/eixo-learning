import React, { useState } from 'react';
import {
  HelpCircle,
  X,
  MessageCircle,
  Mail,
  BookOpen,
  FileQuestion,
  ExternalLink,
  CheckCircle2,
  Send,
  Search,
} from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [supportMessage, setSupportMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: 'How do I submit my Xero practical workbook for review?',
      a: 'Navigate to your course lesson, scroll down to the "Assignment & Exercises" section, and click "Upload Completed .XLSX" or submit your journal postings for instant automated grading.',
    },
    {
      q: 'Can I download course certificates as PDF?',
      a: 'Yes! Upon completing 100% of a course and passing the final exam (>80%), head to "My Progress" and click "Download Verified Certificate".',
    },
    {
      q: 'How do I join the live tutor surgery masterclasses?',
      a: 'Go to the "Calendar" tab in the sidebar, click "Register" on the upcoming Google Meet / Zoom session to receive your calendar invite and direct link.',
    },
    {
      q: 'Are the Excel financial models free for commercial use?',
      a: 'Yes, all Excel models in "Free Resources" are open-source and unrestricted for work, clients, and study.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportMessage.trim()) return;
    setMessageSent(true);
    setTimeout(() => {
      setMessageSent(false);
      setSupportMessage('');
      onClose();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#0b0f19] border border-white/10 rounded-3xl p-6 sm:p-8 max-w-xl w-full shadow-2xl space-y-6 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <HelpCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Help & Support Desk</h3>
              <p className="text-xs text-slate-400">Student & Faculty Assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search FAQs, courses, or technical queries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#070a12] border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Common FAQs */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Frequently Asked Questions
          </h4>
          <div className="space-y-2">
            {filteredFaqs.map((faq, idx) => (
              <div key={idx} className="bg-[#070a12] p-3 rounded-2xl border border-white/5 space-y-1">
                <p className="text-xs font-bold text-white">{faq.q}</p>
                <p className="text-xs text-slate-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Faculty / Support */}
        <div className="space-y-3 pt-2 border-t border-white/10">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Message Course Tutors
          </h4>

          {messageSent ? (
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/30 rounded-2xl flex items-center gap-2 text-xs text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Ticket dispatched! A chartered tutor will respond within 2 hours.</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <textarea
                placeholder="Describe your question, double-entry confusion, or course feedback..."
                rows={3}
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                className="w-full bg-[#070a12] border border-white/10 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 resize-none"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>support@eixolearning.co.uk</span>
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1.5"
                >
                  <Send className="w-3 h-3" />
                  <span>Send Ticket</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
