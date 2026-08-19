import React, { useState } from 'react';
import { History, Clock, ArrowRight, X, Sparkles } from 'lucide-react';

export default function AnalysisHistory({ history = [], onSelectHistoryItem }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!history || history.length === 0) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/60 text-xs font-medium flex items-center gap-1.5 transition-all"
      >
        <History className="w-3.5 h-3.5 text-emerald-400" />
        <span>Recent History ({history.length})</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md h-full bg-[#121824] border-l border-slate-800 p-6 flex flex-col justify-between space-y-4 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <History className="w-4 h-4 text-emerald-400" />
                  <span>Session Analysis History</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2.5 overflow-y-auto max-h-[75vh] pr-1">
                {history.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectHistoryItem(item);
                      setIsOpen(false);
                    }}
                    className="w-full p-3 rounded-xl bg-[#0B0F17] hover:bg-[#16202E] border border-slate-800 text-left transition-all space-y-1 group"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                      <span>{item.timestamp || 'Just now'}</span>
                      <ArrowRight className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                    </div>
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-emerald-300 transition-colors">
                      "{item.query}"
                    </p>
                    <p className="text-[11px] text-slate-400 line-clamp-1">
                      {item.answer}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-500 font-mono text-center">
              Click any history item to restore previous analysis state
            </div>
          </div>
        </div>
      )}
    </>
  );
}
