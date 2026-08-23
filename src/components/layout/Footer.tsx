import React from 'react';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, BookOpen, Lock, Mail, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, setSearchQuery } = useApp();

  return (
    <footer className="bg-[#070a12] text-slate-300 border-t border-white/10 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-600/90 border border-emerald-400/30 flex items-center justify-center text-white font-extrabold text-base tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                E
              </div>
              <span className="text-lg font-bold tracking-tight text-white">
                EIXO <span className="text-emerald-400 font-light">LEARNING</span>
              </span>
            </div>

            <p className="text-slate-400 leading-relaxed max-w-sm">
              Practical accounting and finance education. Master double-entry theory and apply workflows in Xero, QuickBooks, and Sage.
            </p>

            <div className="flex items-center gap-4 text-[11px] text-slate-400 pt-2">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Single-Standard Curriculum</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>Faculty-Authored Content</span>
              </div>
            </div>
          </div>

          {/* Col 2: Accounting Disciplines */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Accounting Track
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Financial Accounting');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Financial Accounting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Management Accounting');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Management Accounting
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Bookkeeping');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Bookkeeping & Double Entry
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('VAT');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  VAT & Tax Fundamentals
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Payroll');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Payroll Accounting
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Finance & Software */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              Software & Finance
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Xero');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <span>Xero Bookkeeping</span>
                  <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1.5 py-0.2 rounded border border-emerald-800">
                    Core
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('QuickBooks');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  QuickBooks Online
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Sage');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Sage Business Cloud
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Corporate Finance');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Corporate Finance & DCF
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSearchQuery('Financial Modelling');
                    navigateTo('courses');
                  }}
                  className="hover:text-white transition-colors"
                >
                  Excel Financial Modelling
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Platform & Company */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold uppercase tracking-wider text-[11px]">
              EIXO Learning
            </h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-white transition-colors">
                  About Our Methodology
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('courses')} className="hover:text-white transition-colors">
                  Course Catalogue
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('resources-hub')} className="hover:text-white transition-colors">
                  Downloadable Templates
                </button>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Student Verified Credentials</span>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">Contact: support@eixolearning.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} EIXO Learning Ltd. All rights reserved. Professional Accounting & Finance Education.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Terms & Conditions</span>
            <span className="hover:text-slate-300 transition-colors cursor-pointer">Cookie Policy</span>
            <span className="text-emerald-400 font-mono">v1.0 Production</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
