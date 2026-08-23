import React, { useState } from 'react';
import { Quiz, QuizAttempt } from '../../types';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, XCircle, HelpCircle, Award, RotateCcw, ArrowRight, ShieldCheck } from 'lucide-react';

interface InteractiveQuizProps {
  quiz: Quiz;
  onCompleted?: () => void;
}

export const InteractiveQuiz: React.FC<InteractiveQuizProps> = ({ quiz, onCompleted }) => {
  const { submitQuizAttempt, getQuizAttempts, currentUser } = useApp();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [latestAttempt, setLatestAttempt] = useState<QuizAttempt | null>(null);

  const priorAttempts = getQuizAttempts(quiz.id);

  const handleSelectOption = (questionIdx: number, optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionIdx]: optionIdx,
    }));
  };

  const handleSubmit = () => {
    if (Object.keys(selectedAnswers).length < quiz.questions.length) {
      alert('Please answer all questions before submitting the quiz.');
      return;
    }

    const attempt = submitQuizAttempt(quiz.id, selectedAnswers);
    setLatestAttempt(attempt);
    setSubmitted(true);
    if (onCompleted && attempt.passed) {
      onCompleted();
    }
  };

  const handleRetry = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setLatestAttempt(null);
  };

  const isAllAnswered = Object.keys(selectedAnswers).length === quiz.questions.length;

  return (
    <div className="bg-[#0b0f19] rounded-xl border border-white/10 overflow-hidden shadow-xl text-slate-200">
      {/* Quiz Header */}
      <div className="bg-[#070a12] text-white p-6 border-b border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold border border-emerald-500/30 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">{quiz.title}</h3>
              <p className="text-xs text-slate-400 mt-0.5">{quiz.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 bg-[#12182b] border border-white/10 text-slate-300 rounded-md text-xs font-semibold">
              Passing Score: {quiz.passingScore}%
            </span>
            <span className="px-2.5 py-1 bg-[#12182b] border border-white/10 text-slate-300 rounded-md text-xs font-semibold">
              {quiz.questions.length} Questions
            </span>
          </div>
        </div>
      </div>

      {/* Result Card if submitted */}
      {submitted && latestAttempt && (
        <div
          className={`p-6 border-b ${
            latestAttempt.passed
              ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200'
              : 'bg-rose-950/40 border-rose-500/30 text-rose-200'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {latestAttempt.passed ? (
                <CheckCircle2 className="w-8 h-8 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-8 h-8 text-rose-400 shrink-0" />
              )}
              <div>
                <h4 className="text-base font-bold text-white">
                  {latestAttempt.passed
                    ? 'Assessment Passed! Competency Verified'
                    : 'Passing Score Not Met'}
                </h4>
                <p className="text-xs mt-0.5 text-slate-300">
                  You scored <span className="font-bold text-sm text-emerald-300">{latestAttempt.score}%</span> (Passing score: {quiz.passingScore}%).
                  {latestAttempt.passed
                    ? ' Your lesson completion progress has been marked.'
                    : ' Review the explanations below and try again.'}
                </p>
              </div>
            </div>

            <button
              onClick={handleRetry}
              className="px-4 py-2 bg-[#12182b] hover:bg-[#1a233d] border border-white/10 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retry Assessment</span>
            </button>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="p-6 space-y-8">
        {quiz.questions.map((q, qIndex) => {
          const selectedOption = selectedAnswers[qIndex];
          const isCorrect = selectedOption === q.correctOptionIndex;

          return (
            <div key={q.id} className="space-y-3 pb-6 border-b border-white/10 last:border-b-0 last:pb-0">
              <div className="flex items-start gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#151f38] border border-white/10 text-slate-300 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {qIndex + 1}
                </span>
                <p className="text-sm font-semibold text-white leading-relaxed">{q.question}</p>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-8">
                {q.options.map((opt, optIndex) => {
                  const isSelected = selectedOption === optIndex;
                  let optionStyles = 'border-white/10 bg-[#0e1424] hover:bg-[#141d33] text-slate-300';

                  if (submitted) {
                    if (optIndex === q.correctOptionIndex) {
                      optionStyles = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold ring-1 ring-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.15)]';
                    } else if (isSelected && !isCorrect) {
                      optionStyles = 'border-rose-500/60 bg-rose-950/40 text-rose-200';
                    } else {
                      optionStyles = 'border-white/5 bg-[#0a0e1a]/60 text-slate-500 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyles = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold ring-1 ring-emerald-500/50 shadow-[0_0_12px_rgba(16,185,129,0.2)]';
                  }

                  return (
                    <button
                      key={optIndex}
                      onClick={() => handleSelectOption(qIndex, optIndex)}
                      disabled={submitted}
                      className={`w-full p-3 text-left rounded-lg border text-xs transition-all flex items-center justify-between ${optionStyles}`}
                    >
                      <span className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full border border-white/20 text-[11px] font-semibold flex items-center justify-center shrink-0">
                          {String.fromCharCode(65 + optIndex)}
                        </span>
                        <span>{opt}</span>
                      </span>

                      {submitted && optIndex === q.correctOptionIndex && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      )}
                      {submitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback explanation after submit */}
              {submitted && (
                <div className="pl-8 pt-1">
                  <div
                    className={`p-3.5 rounded-lg text-xs leading-relaxed border ${
                      isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/20 text-emerald-300'
                        : 'bg-[#12182b] border-white/10 text-slate-300'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-white">{isCorrect ? 'Correct Explanation:' : 'Concept Explanation:'}</span>
                    </div>
                    <p className="text-slate-300">{q.explanation}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Submit */}
      {!submitted && (
        <div className="bg-[#070a12] px-6 py-4 border-t border-white/10 flex items-center justify-between">
          <span className="text-xs text-slate-400">
            {Object.keys(selectedAnswers).length} of {quiz.questions.length} questions answered
          </span>
          <button
            onClick={handleSubmit}
            disabled={!isAllAnswered}
            className={`px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all ${
              isAllAnswered
                ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5'
            }`}
          >
            <span>Submit Assessment</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
