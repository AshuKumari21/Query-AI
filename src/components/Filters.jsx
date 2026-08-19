import React from 'react';
import { Filter, RotateCcw } from 'lucide-react';

export default function Filters({ availableColumns, rows, activeFilters, onFilterChange, onResetFilters }) {
  if (!availableColumns || availableColumns.length === 0 || !rows) return null;

  const filterableCols = availableColumns.filter(col => {
    const uniqueVals = new Set(rows.map(r => r[col]).filter(Boolean));
    return uniqueVals.size >= 2 && uniqueVals.size <= 12;
  }).slice(0, 3);

  if (filterableCols.length === 0) return null;

  const hasActiveFilters = Object.values(activeFilters).some(val => val && val !== 'All');

  return (
    <div className="bg-[#121824] p-2.5 rounded-xl border border-slate-800 space-y-2 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-bold text-slate-300 text-[11px]">
          <Filter className="w-3.5 h-3.5 text-emerald-400" />
          <span>Dataset Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-[10px] text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-mono transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Filter Dropdowns */}
      <div className="grid grid-cols-3 gap-2">
        {filterableCols.map((col) => {
          const uniqueVals = ['All', ...Array.from(new Set(rows.map(r => r[col]).filter(Boolean)))];
          const selectedVal = activeFilters[col] || 'All';

          return (
            <div key={col} className="space-y-0.5">
              <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block truncate">
                {col}
              </label>
              <select
                value={selectedVal}
                onChange={(e) => onFilterChange(col, e.target.value)}
                className="w-full bg-[#0B0F17] border border-slate-700/80 rounded-lg px-2 py-1 text-xs text-white focus:outline-none focus:border-emerald-500/80 transition-colors font-medium truncate"
              >
                {uniqueVals.map((val, idx) => (
                  <option key={idx} value={val}>
                    {val}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
}
