import React, { useState } from 'react';
import { ShieldCheck, ChevronDown, ChevronUp, AlertCircle, FileCode, Layers, Info } from 'lucide-react';

export default function DataHealth({ datasetInfo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!datasetInfo) return null;

  const {
    missingValPct = 0,
    duplicateCount = 0,
    typeCounts = { numeric: 4, text: 3, date: 0 },
    recommendation = "Your dataset looks clean and ready for analysis."
  } = datasetInfo;

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-xl overflow-hidden shadow">
      {/* Sleek Header Bar */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-3.5 py-2 bg-[#0F1420] hover:bg-[#151C2C] flex items-center justify-between transition-colors focus:outline-none text-xs"
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span className="font-bold text-white">Data Health Inspection</span>
          <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
            {missingValPct === 0 && duplicateCount === 0 ? 'Optimal Quality' : 'Analysis Ready'}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
          <span>{isExpanded ? 'Hide Details' : 'Inspect Health'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expandable Health Details */}
      {isExpanded && (
        <div className="p-3.5 space-y-2.5 border-t border-slate-800/80 animate-fade-in text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2 bg-[#0B0F17] rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <AlertCircle className={`w-3 h-3 ${missingValPct > 0 ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span>Missing Values</span>
              </div>
              <p className="text-slate-200 font-medium text-[11px] pt-0.5">
                {missingValPct > 0 ? `${missingValPct}% cells missing` : '0 missing cells'}
              </p>
            </div>

            <div className="p-2 bg-[#0B0F17] rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <Layers className={`w-3 h-3 ${duplicateCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`} />
                <span>Duplicate Rows</span>
              </div>
              <p className="text-slate-200 font-medium text-[11px] pt-0.5">
                {duplicateCount > 0 ? `${duplicateCount} duplicate rows` : '0 duplicates'}
              </p>
            </div>

            <div className="p-2 bg-[#0B0F17] rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 font-semibold flex items-center gap-1">
                <FileCode className="w-3 h-3 text-cyan-400" />
                <span>Data Types</span>
              </div>
              <p className="text-slate-200 font-medium font-mono text-[11px] pt-0.5">
                Num: {typeCounts.numeric} • Text: {typeCounts.text}
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 flex items-start gap-2 text-[11px]">
            <Info className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <p className="text-slate-300 leading-snug">"{recommendation}"</p>
          </div>
        </div>
      )}
    </div>
  );
}
