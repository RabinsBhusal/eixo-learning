import React from 'react';

export const CourseCardSkeleton: React.FC = () => {
  return (
    <div className="bg-[#0b0f19] rounded-2xl border border-white/10 overflow-hidden shadow-xl animate-pulse">
      <div className="h-48 bg-white/5 w-full" />
      <div className="p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-white/10 rounded-md w-24" />
          <div className="h-4 bg-white/10 rounded-md w-16" />
        </div>
        <div className="h-6 bg-white/10 rounded-md w-4/5" />
        <div className="space-y-2 py-1">
          <div className="h-3.5 bg-white/5 rounded-md w-full" />
          <div className="h-3.5 bg-white/5 rounded-md w-5/6" />
        </div>
        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
          <div className="h-4 bg-white/10 rounded-md w-28" />
          <div className="h-9 bg-white/10 rounded-xl w-28" />
        </div>
      </div>
    </div>
  );
};

export const VideoPlayerSkeleton: React.FC = () => {
  return (
    <div className="w-full aspect-video bg-[#0b0f19] border border-white/10 rounded-2xl overflow-hidden animate-pulse flex items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
        <div className="w-6 h-6 bg-white/20 rounded-xs" />
      </div>
    </div>
  );
};

export const CurriculumSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 animate-pulse">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-white/10 rounded-2xl p-4 bg-[#0b0f19] space-y-3">
          <div className="flex justify-between items-center">
            <div className="h-5 bg-white/10 rounded-md w-2/3" />
            <div className="h-4 bg-white/5 rounded-md w-16" />
          </div>
          <div className="space-y-2 pt-2">
            <div className="h-8 bg-white/5 rounded-xl w-full" />
            <div className="h-8 bg-white/5 rounded-xl w-full" />
            <div className="h-8 bg-white/5 rounded-xl w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const DashboardStatsSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-[#0b0f19] p-5 rounded-2xl border border-white/10 space-y-2">
          <div className="h-4 bg-white/10 rounded-md w-1/2" />
          <div className="h-8 bg-white/20 rounded-md w-3/4" />
          <div className="h-3 bg-white/5 rounded-md w-2/3" />
        </div>
      ))}
    </div>
  );
};
