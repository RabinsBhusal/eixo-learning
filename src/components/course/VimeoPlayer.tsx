import React, { useState } from 'react';
import { Play, Maximize, Minimize, CheckCircle, ExternalLink, ShieldAlert, Sparkles, RefreshCw } from 'lucide-react';

interface VimeoPlayerProps {
  vimeoId: string;
  title: string;
  isCompleted?: boolean;
  onCompleteToggle?: () => void;
  onNextLesson?: () => void;
}

export const VimeoPlayer: React.FC<VimeoPlayerProps> = ({
  vimeoId,
  title,
  isCompleted = false,
  onCompleteToggle,
  onNextLesson,
}) => {
  const [isTheater, setIsTheater] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Extract clean ID if full URL is supplied
  const cleanId = (() => {
    if (!vimeoId) return '76979871';
    const match = vimeoId.match(/(?:vimeo\.com\/|video\/)?([0-9]+)/);
    return match ? match[1] : vimeoId.replace(/\D/g, '') || '76979871';
  })();

  const embedUrl = `https://player.vimeo.com/video/${cleanId}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`;

  return (
    <div className={`transition-all duration-300 ${isTheater ? 'fixed inset-0 z-50 bg-black flex flex-col p-4' : 'w-full'}`}>
      <div className="relative w-full rounded-xl overflow-hidden bg-black shadow-2xl border border-white/10">
        
        {/* Top Floating Player Bar */}
        <div className="absolute top-0 left-0 right-0 z-20 px-4 py-2.5 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex items-center justify-between text-white opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity">
          <div className="flex items-center gap-2 truncate pr-4">
            <span className="px-2 py-0.5 rounded-sm bg-emerald-600/90 border border-emerald-400/30 text-[11px] font-semibold tracking-wide uppercase shadow-[0_0_8px_rgba(16,185,129,0.3)]">
              Vimeo Stream
            </span>
            <span className="text-xs font-medium text-slate-200 truncate">{title}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTheater(!isTheater)}
              className="p-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white transition-colors text-xs flex items-center gap-1 border border-white/10"
              title={isTheater ? 'Exit Theater Mode' : 'Theater Mode'}
            >
              {isTheater ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline text-[11px]">{isTheater ? 'Normal' : 'Theater'}</span>
            </button>
          </div>
        </div>

        {/* Video Iframe Container (16:9 ratio) */}
        <div className={`relative w-full ${isTheater ? 'h-[80vh]' : 'aspect-video'}`}>
          {!hasError ? (
            <iframe
              src={embedUrl}
              className="w-full h-full border-0 absolute inset-0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              title={title}
              referrerPolicy="strict-origin-when-cross-origin"
              onError={() => setHasError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-[#070a12] text-white p-6 text-center">
              <ShieldAlert className="w-10 h-10 text-amber-400 mb-2" />
              <p className="font-semibold text-sm">Vimeo Video Preview</p>
              <p className="text-xs text-slate-400 max-w-md mt-1">
                Vimeo video ID <code className="bg-[#12182b] px-1 py-0.5 rounded text-amber-300 border border-white/10">{cleanId}</code> is ready to stream.
              </p>
              <button
                onClick={() => setHasError(false)}
                className="mt-3 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-xs font-medium flex items-center gap-1.5 shadow-[0_0_12px_rgba(16,185,129,0.3)]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload Video</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Under-player Quick Bar */}
      <div className="mt-3 flex flex-wrap items-center justify-between gap-3 bg-[#0d1220] p-3 rounded-xl border border-white/10 shadow-lg text-slate-300">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)] animate-pulse" />
          <span className="text-xs font-medium text-slate-200">HD 1080p Vimeo Video Player</span>
          <span className="text-slate-600">•</span>
          <span className="text-xs text-slate-400 font-mono">ID: {cleanId}</span>
        </div>

        <div className="flex items-center gap-2 ml-auto">
          {onCompleteToggle && (
            <button
              onClick={onCompleteToggle}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                isCompleted
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-[0_0_10px_rgba(16,185,129,0.15)]'
                  : 'bg-[#151f38] hover:bg-[#1c294a] text-slate-300 border border-white/10'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${isCompleted ? 'text-emerald-400' : 'text-slate-400'}`} />
              <span>{isCompleted ? 'Completed' : 'Mark as Complete'}</span>
            </button>
          )}

          {onNextLesson && (
            <button
              onClick={onNextLesson}
              className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition-all shadow-[0_0_12px_rgba(16,185,129,0.25)]"
            >
              <span>Next Lesson</span>
              <Play className="w-3 h-3 fill-current" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
