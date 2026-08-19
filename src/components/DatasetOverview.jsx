import React from 'react';
import { FileSpreadsheet, ShieldCheck, Database, Layers, CheckCircle2 } from 'lucide-react';

export default function DatasetOverview({ datasetInfo, isDemo = true }) {
  if (!datasetInfo) return null;

  const {
    name = 'MBA Leads Dataset.csv',
    rowCount = 1950,
    columnCount = 7,
    missingValPct = 0,
    duplicateCount = 0,
    healthScore = 100
  } = datasetInfo;

  return (
    <div className="bg-[#121824] border border-slate-800 rounded-xl p-3 shadow-lg space-y-2">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-2">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-bold text-white font-mono">{name}</h3>
            <span className={`px-2 py-0.5 text-[9px] font-mono font-semibold rounded uppercase tracking-wider ${
              isDemo
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
            }`}>
              {isDemo ? 'Demo Dataset' : 'Uploaded CSV'}
            </span>
          </div>
        </div>

        {/* Health Score Pill */}
        <div className="flex items-center gap-1.5 bg-[#0B0F17] px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400 text-[11px]">Health:</span>
          <span className="font-bold font-mono text-emerald-400">{healthScore}%</span>
        </div>
      </div>

      {/* Compact 1-Line Stats Ribbon */}
      <div className="grid grid-cols-4 gap-2 text-center text-xs">
        <div className="bg-[#0B0F17] py-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[10px]">Rows</span>
          <span className="font-bold text-white font-mono">{rowCount.toLocaleString()}</span>
        </div>

        <div className="bg-[#0B0F17] py-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[10px]">Cols</span>
          <span className="font-bold text-white font-mono">{columnCount}</span>
        </div>

        <div className="bg-[#0B0F17] py-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[10px]">Missing</span>
          <span className={`font-bold font-mono ${missingValPct > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {missingValPct}%
          </span>
        </div>

        <div className="bg-[#0B0F17] py-1.5 px-2 rounded-lg border border-slate-800/80 flex items-center justify-between">
          <span className="text-slate-400 text-[10px]">Dups</span>
          <span className={`font-bold font-mono ${duplicateCount > 0 ? 'text-amber-400' : 'text-emerald-400'}`}>
            {duplicateCount}
          </span>
        </div>
      </div>
    </div>
  );
}
