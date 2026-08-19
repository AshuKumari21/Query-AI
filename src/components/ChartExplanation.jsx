import React, { useState } from 'react';
import { Sparkles, Eye, TrendingUp, Compass, ChevronDown, ChevronUp } from 'lucide-react';

export default function ChartExplanation({ explanation }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!explanation) return null;

  const {
    whatYouSee = "Distribution breakdown across dataset metrics.",
    whatStandsOut = "Top category accounts for the majority proportion.",
    exploreNext = "Compare this result across different cities or time frames."
  } = explanation;

  return (
    <div className="pt-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 transition-all focus:outline-none shadow-sm"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>{isOpen ? 'Hide Chart Explanation' : '✨ Explain this chart'}</span>
        {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {isOpen && (
        <div className="mt-3 p-4 rounded-xl bg-[#090D15] border border-slate-800 space-y-3 animate-fade-in text-xs">
          {/* What You're Seeing */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <Eye className="w-3.5 h-3.5" />
              <span>What you're seeing</span>
            </div>
            <p className="text-slate-300 pl-5 leading-relaxed">
              {whatYouSee}
            </p>
          </div>

          {/* What Stands Out */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>What stands out</span>
            </div>
            <p className="text-slate-300 pl-5 leading-relaxed">
              {whatStandsOut}
            </p>
          </div>

          {/* Explore Next */}
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <Compass className="w-3.5 h-3.5" />
              <span>Explore next</span>
            </div>
            <p className="text-slate-300 pl-5 leading-relaxed">
              {exploreNext}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
